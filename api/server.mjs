// Vercel serverless function — adapts Node IncomingMessage/ServerResponse to the
// Web Fetch handler exported by the production server bundle.
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize, relative } from "node:path";
import { Readable } from "node:stream";
import { fileURLToPath, pathToFileURL } from "node:url";

let handlerPromise;

const rootDir = normalize(join(fileURLToPath(new URL("..", import.meta.url))));
const rootCandidates = [...new Set([rootDir, process.cwd(), join(rootDir, "..")].map((dir) => normalize(dir)))];

const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".gif", "image/gif"],
  [".ico", "image/x-icon"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".map", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"],
  [".xml", "application/xml; charset=utf-8"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

async function getHandler() {
  if (!handlerPromise) {
    handlerPromise = resolveExistingFile("dist/server/index.mjs")
      .then((filePath) => import(pathToFileURL(filePath).href))
      .then((m) => m.default ?? m)
      .catch((error) => {
        handlerPromise = undefined;
        throw error;
      });
  }
  return handlerPromise;
}

async function resolveExistingFile(relativePath) {
  for (const baseDir of rootCandidates) {
    const filePath = normalize(join(baseDir, relativePath));
    try {
      const fileStat = await stat(filePath);
      if (fileStat.isFile()) return filePath;
    } catch {
      // Try the next likely Vercel bundle root.
    }
  }
  throw new Error(`Unable to find ${relativePath} from ${rootCandidates.join(", ")}`);
}

function sendErrorPage(res) {
  res.statusCode = 500;
  res.setHeader("content-type", "text/html; charset=utf-8");
  res.end(`<!doctype html><html lang="fr"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>Page momentanément indisponible</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;font:15px/1.5 system-ui,-apple-system,sans-serif;background:#fafafa;color:#111}.card{max-width:448px;text-align:center}h1{font-size:24px;margin:0 0 8px}p{color:#4b5563;margin:0 0 24px}.actions{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}a,button{border:1px solid transparent;border-radius:8px;padding:10px 16px;font:inherit;text-decoration:none;cursor:pointer}.primary{background:#111;color:#fff}.secondary{background:#fff;color:#111;border-color:#d1d5db}</style></head><body><main class="card"><h1>Page momentanément indisponible</h1><p>Un problème technique est survenu. Vous pouvez actualiser la page ou revenir à l’accueil.</p><div class="actions"><button class="primary" onclick="location.reload()">Réessayer</button><a class="secondary" href="/">Accueil</a></div></main></body></html>`);
}

async function tryServeStatic(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") return false;

  let path;
  try {
    path = decodeURIComponent(new URL(req.url, "https://local.invalid").pathname);
  } catch {
    return false;
  }
  const requestedPath = path === "/favicon.ico" ? "/favicon.ico" : path;

  for (const baseDir of rootCandidates) {
    const clientDir = join(baseDir, "dist", "client");
    const filePath = normalize(join(clientDir, requestedPath));
    if (relative(clientDir, filePath).startsWith("..")) continue;

    try {
      const fileStat = await stat(filePath);
      if (!fileStat.isFile()) continue;

      res.statusCode = 200;
      res.setHeader("content-type", mimeTypes.get(extname(filePath).toLowerCase()) ?? "application/octet-stream");
      res.setHeader("cache-control", requestedPath.startsWith("/assets/") ? "public, max-age=31536000, immutable" : "public, max-age=3600");
      res.setHeader("content-length", fileStat.size);

      if (req.method === "HEAD") {
        res.end();
      } else {
        createReadStream(filePath).pipe(res);
      }
      return true;
    } catch {
      // Try the next likely Vercel bundle root.
    }
  }

  return false;
}

export default async function handler(req, res) {
  try {
    if (await tryServeStatic(req, res)) return;

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
    const waitUntil = (promise) => {
      if (promise && typeof promise.catch === "function") {
        promise.catch((error) => console.error("[vercel-adapter] waitUntil error:", error));
      }
    };
    const response = await server.fetch(request, process.env, { waitUntil });

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
    sendErrorPage(res);
  }
}
