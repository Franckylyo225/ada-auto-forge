# Plan : Portail + deux mini-sites ADA / Ivoire Pare-Brise

## 1. Nouvelle arborescence de routes

```
/                        → Page portail split-screen (ADA gauche | IPB droite)

/ada                     → Accueil ADA (contenu actuel de /)
/ada/a-propos            → contenu actuel de /a-propos
/ada/services            → nouvelle page (location courte/longue durée, flotte, etc.)
/ada/contact             → contenu actuel de /contact (variante ADA)
/ada/reservation         → contenu actuel de /reservation

/ipb                     → Accueil IPB (contenu actuel de /ivoire-pare-brise)
/ipb/a-propos            → nouvelle page À Propos dédiée IPB
/ipb/services            → page services détaillée (réparation, remplacement, latéral…)
/ipb/contact             → page Contact dédiée IPB
/ipb/rendez-vous         → page CTA "Prendre rendez-vous / Demander un devis"

/dashboard/*             → inchangé
```

Anciennes URL (`/a-propos`, `/contact`, `/reservation`, `/ivoire-pare-brise`, `/location`) : redirection client vers la nouvelle URL équivalente (composant `Navigate`) pour ne pas casser les liens externes.

## 2. Page portail `/`

Split-screen plein écran 50/50, immersif type "choose your experience" :

- Moitié gauche : fond image flotte ADA + voile jaune `#FFD400` au hover, logo ADA centré, tagline "Location de véhicules", bouton "Entrer".
- Moitié droite : fond image atelier pare-brise + voile bleu marque IPB au hover, logo IPB centré, tagline "Réparation & remplacement de pare-brise", bouton "Entrer".
- Au hover d'un côté : ce côté passe à 60% de largeur (transition fluide), l'autre à 40%, légère teinte sombre sur le côté non survolé.
- Mobile : empilement vertical 50/50, sans effet de largeur.
- En haut, petite barre neutre avec mention "Groupe ADA" + lien discret Contact global (= /ada/contact pour l'instant).

## 3. Chrome partagé, logo + CTA dynamiques

Une seule `Navbar` et un seul `Footer`, mais leur contenu dépend du préfixe d'URL :

- `useRouterState` → si pathname commence par `/ada` → mode ADA ; `/ipb` → mode IPB ; `/` → portail (chrome masqué).
- Navbar mode ADA : logo ADA, liens `Accueil /ada`, `À Propos /ada/a-propos`, `Services /ada/services`, `Contact /ada/contact`, CTA **"Réserver maintenant"** → `/ada/reservation`.
- Navbar mode IPB : logo IPB, liens `Accueil /ipb`, `À Propos /ipb/a-propos`, `Services /ipb/services`, `Contact /ipb/contact`, CTA **"Prendre rendez-vous"** → `/ipb/rendez-vous`.
- Footer idem : logo, liens et mentions adaptés au site courant.
- Page portail (`/`) et `/dashboard/*` : Navbar/Footer masqués (déjà le cas pour dashboard).
- Un petit lien discret "← Retour au portail" en bout de navbar pour repasser à `/`.

## 4. Réutilisation du contenu existant

- `routes/index.tsx` actuel (home ADA) → déplacé en `routes/ada.index.tsx`.
- `routes/a-propos.tsx` → `routes/ada.a-propos.tsx`.
- `routes/contact.tsx` → dupliqué en `routes/ada.contact.tsx` et `routes/ipb.contact.tsx` (variante couleurs/CTA IPB).
- `routes/reservation.tsx` → `routes/ada.reservation.tsx`.
- `routes/ivoire-pare-brise.tsx` → `routes/ipb.index.tsx` (devient l'accueil IPB).
- `routes/location.tsx` → fusionné dans `routes/ada.services.tsx` (page Services ADA).
- Nouvelles pages à créer : `ada.services.tsx`, `ipb.a-propos.tsx`, `ipb.services.tsx`, `ipb.rendez-vous.tsx`.
- Le bloc "Ils nous font confiance" (PartnersMarquee) reste sur l'accueil ADA uniquement.
- Le nouveau `routes/index.tsx` devient la page portail.

## 5. SEO par route

Chaque route définit son propre `head()` avec titre / description / og:title / og:description distincts :
- Portail : "Groupe ADA — Location auto & Pare-brise en Côte d'Ivoire".
- Accueil ADA, À Propos ADA, Services ADA, Contact ADA, Réservation : titres préfixés "ADA — …".
- Accueil IPB, À Propos IPB, Services IPB, Contact IPB, Rendez-vous : titres préfixés "Ivoire Pare-Brise — …".

Pas d'`og:image` sur `__root.tsx`, uniquement au niveau leaf (image hero correspondante).

## 6. Détails techniques

- Toutes les images réutilisées via imports Vite (`@/assets/...`) déjà locales → pas de régression visuelle sur Vercel.
- Le logo IPB sera ajouté en local (`src/assets/ipb-logo.png`) ; si absent, on utilisera un placeholder texte stylé jusqu'à fourniture du logo.
- Redirections legacy via des routes minimales du type :
  ```tsx
  // routes/a-propos.tsx
  export const Route = createFileRoute("/a-propos")({
    component: () => <Navigate to="/ada/a-propos" replace />,
  });
  ```
- `routeTree.gen.ts` se régénère automatiquement, ne pas l'éditer.
- WhatsAppButton conservé sur les deux sites (numéro identique pour l'instant).

## 7. Hors scope (à confirmer si besoin plus tard)

- Logo officiel Ivoire Pare-Brise (si tu en as un fichier, je l'intègre).
- Charte couleur dédiée IPB distincte de celle d'ADA (pour l'instant je garde la palette actuelle + accent bleu IPB déjà en place).
- Contenu rédactionnel précis des nouvelles pages (À Propos IPB, Services détaillés) : je proposerai un premier jet, à amender ensuite.
