## Constat

Le projet utilise le template **TanStack Start + Cloudflare Workers** :
- `vite.config.ts` → `@lovable.dev/vite-tanstack-config` (active automatiquement `@cloudflare/vite-plugin`)
- `src/server.ts` → entrée au format **Worker** (`fetch(request, env, ctx)`), pas Node
- `wrangler.jsonc` → config Cloudflare (ignorée par Vercel)

Résultat actuel sur Vercel : aucun handler exécutable, donc page blanche / 404.

TanStack Start n'a **pas de preset Vercel officiel** (contrairement à Next/Nuxt). Il faut donc construire manuellement l'adaptateur.

## Plan

### 1. Désactiver Cloudflare dans le build
Modifier `vite.config.ts` :
- Passer `cloudflare: false` au wrapper Lovable
- Retirer l'override `tanstackStart.server.entry`
- Conséquence : le build produit une sortie SSR standard (Node/ESM) au lieu d'un bundle Worker

### 2. Réécrire l'entrée serveur en Node
Remplacer `src/server.ts` par une version compatible Node (Web `Request`/`Response` via `@tanstack/react-start/server-entry`), sans `env` ni `ctx` Cloudflare. Le wrapper d'erreur SSR existant (`renderErrorPage`, `normalizeCatastrophicSsrResponse`) est conservé.

### 3. Ajouter l'adaptateur Vercel
Créer :
- `api/index.mjs` → Vercel Serverless Function (Node 20) qui convertit la requête Node en `Request` Web, appelle le handler SSR, puis re-streame la `Response`
- `vercel.json` → rewrite catch-all `/(.*)` vers `/api/index`, et déclaration de la build des assets statiques (`dist/client`)

### 4. Supprimer la config Cloudflare
- Supprimer `wrangler.jsonc`
- Retirer la dépendance `@cloudflare/vite-plugin` du `package.json` (optionnel mais propre)

### 5. Réglages Vercel (à faire côté dashboard Vercel)
- Build command : `npm run build`
- Output directory : `dist/client`
- Node version : 20.x
- Variables d'env : reporter manuellement celles dont l'app a besoin (aucune secrète détectée pour l'instant)

## Détails techniques

```text
.
├── api/
│   └── index.mjs           # NOUVEAU — adaptateur Node → Web Fetch
├── src/
│   └── server.ts           # MODIFIÉ — handler Web standard (sans env/ctx)
├── vite.config.ts          # MODIFIÉ — cloudflare: false
├── vercel.json             # NOUVEAU — rewrites + build config
└── wrangler.jsonc          # SUPPRIMÉ
```

Squelette `api/index.mjs` :
```js
import handler from "../dist/server/server.js";
import { Readable } from "node:stream";

export default async function (req, res) {
  const url = `https://${req.headers.host}${req.url}`;
  const request = new Request(url, {
    method: req.method,
    headers: req.headers,
    body: ["GET","HEAD"].includes(req.method) ? undefined : Readable.toWeb(req),
    duplex: "half",
  });
  const response = await handler.fetch(request, {}, {});
  res.statusCode = response.status;
  response.headers.forEach((v, k) => res.setHeader(k, v));
  if (response.body) Readable.fromWeb(response.body).pipe(res);
  else res.end();
}
```

## Risques et points d'attention

1. **La preview Lovable peut régresser.** Le sandbox Lovable est testé avec la config Cloudflare. Passer `cloudflare: false` est supporté par le wrapper, mais on sort du chemin par défaut — il faudra vérifier que la preview fonctionne toujours après les modifications.
2. **Pas de preset officiel = maintenance à votre charge.** Toute mise à jour majeure de TanStack Start peut casser l'adaptateur `api/index.mjs`.
3. **Alternative recommandée si vous n'êtes pas attaché à Vercel** : déployer sur **Cloudflare Pages/Workers** (zéro changement, c'est la cible native du template) ou **publier via Lovable** en un clic.

## Validation

Après application :
- Build local : `npm run build` doit produire `dist/client/` + `dist/server/server.js` (au lieu d'un bundle `.cloudflare/`)
- Preview Lovable : rechargement et vérification que la page d'accueil s'affiche toujours
- Déploiement Vercel : push sur la branche connectée, puis vérification de l'URL Vercel

Confirmez-vous que je peux procéder, ou préférez-vous l'alternative Cloudflare/Lovable (plus simple, sans risque) ?
