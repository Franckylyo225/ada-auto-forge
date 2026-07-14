import { cpSync, existsSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const source = join(projectRoot, "dist", "server");
const target = join(projectRoot, "api", "_server");

if (!existsSync(join(source, "index.mjs"))) {
  throw new Error(
    "Le build serveur TanStack est introuvable: dist/server/index.mjs. Vérifiez la configuration Nitro/Vite avant de déployer sur Vercel.",
  );
}

rmSync(target, { recursive: true, force: true });
cpSync(source, target, { recursive: true });