/**
 * SEO helpers shared across routes.
 * Keep canonical and og:url self-referencing the route, og:image absolute.
 */
export const SITE_URL = "https://ada-auto-forge.lovable.app";

export const abs = (path: string): string => {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ADA — Assistance Distribution Auto",
  alternateName: "Groupe ADA Côte d'Ivoire",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  description:
    "Groupe ivoirien de mobilité : location de véhicules ADA et expertise vitrage automobile Ivoire Pare-Brise.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Boulevard VGE, Immeuble Chevalier de Clieu",
    addressLocality: "Treichville, Abidjan",
    addressCountry: "CI",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+225 07 00 28 29 30",
      contactType: "customer service",
      areaServed: "CI",
      availableLanguage: ["French"],
    },
  ],
  sameAs: [],
};
