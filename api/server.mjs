// Vercel serverless function — adapts Node IncomingMessage/ServerResponse to the
// Web Fetch handler exported by dist/server/server.js (built from src/server.ts).
import { Readable } from "node:stream";

let handlerPromise;

async function getHandler() {
  if (!handlerPromise) {
    handlerPromise = import("../dist/server/server.js").then(
      (m) => m.default ?? m,
    );
  }
  return handlerPromise;
}

export default async function handler(req, res) {
  try {
    const proto = req.headers["x-forwarded-proto"] ?? "https";
    const host = req.headers["x-forwarded-host"] ?? req.headers.host;
    const url = `${proto}://${host}${req.url}`;

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (Array.isArray(value)) {
        for (const v of value) headers.append(key, v);
      } else if (value != null) {
        headers.set(key, String(value));
      }
    }

    const init = { method: req.method, headers };
    if (req.method !== "GET" && req.method !== "HEAD") {
      init.body = Readable.toWeb(req);
      init.duplex = "half";
    }

    const request = new Request(url, init);
    const server = await getHandler();
    const response = await server.fetch(request, {}, {});

    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (response.body) {
      Readable.fromWeb(response.body).pipe(res);
    } else {
      res.end();
    }
  } catch (error) {
    console.error("[vercel-adapter] unhandled error:", error);
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Internal Server Error");
  }
}
