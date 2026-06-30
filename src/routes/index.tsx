import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Car, Wind } from "lucide-react";
import heroAda from "@/assets/loc-hero-suv.jpg";
import heroIpb from "@/assets/ipb-hero-windshield-cropped.jpg";
import { abs, SITE_URL } from "@/lib/seo";

import adaLogo from "@/assets/ada-logo-white.png.asset.json";
import ipbLogo from "@/assets/ipb-logo-white-v2.png.asset.json";

const TITLE = "Groupe ADA Côte d'Ivoire — Location de véhicules & Pare-brise";
const DESC =
  "Groupe ADA Abidjan : location de véhicules courte/longue durée et expertise pare-brise (Ivoire Pare-Brise). Devis 2h, intervention 45 min, garantie 12 mois.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: SITE_URL + "/" },
      { property: "og:image", content: abs(heroAda) },
      { property: "og:image:alt", content: "Groupe ADA — Location auto & Pare-brise en Côte d'Ivoire" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: abs(heroAda) },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Groupe ADA Côte d'Ivoire",
          url: SITE_URL,
          inLanguage: "fr-CI",
        }),
      },
    ],
  }),
  component: Portal,
});

function Portal() {
  return (
    <div className="min-h-screen bg-ada-black text-white flex">
      {/* Split screen */}
      <div className="flex-1 flex flex-col md:flex-row group/portal">
        {/* ADA half */}
        <Link
          to="/ada"
          className="relative flex-1 min-h-[50vh] md:min-h-screen overflow-hidden transition-[flex] duration-500 ease-out md:hover:flex-[1.4] flex items-center justify-center"
        >
          <img
            src={heroAda}
            alt="Flotte ADA"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-ada-black/65 group-hover/portal:bg-ada-black/80 hover:!bg-ada-yellow/30 transition-colors duration-500" />
          <div className="relative z-10 text-center px-6 max-w-md">
            <div className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black text-xs font-bold uppercase tracking-wider px-4 py-1.5">
              <Car className="h-3.5 w-3.5" /> Mobilité
            </div>
            <img
              src={adaLogo.url}
              alt="ADA — Assistance Distribution Auto"
              className="mt-6 mx-auto h-32 md:h-40 w-auto object-contain"
            />
            <p className="mt-4 text-white/85 text-lg leading-relaxed">
              Location de véhicules
              <br />
              <span className="text-white/60 text-sm">
                Courte & longue durée · Particuliers, entreprises, assurances
              </span>
            </p>
            <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-bold px-6 py-3 shadow-[var(--shadow-yellow)]">
              Entrer sur ADA <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Link>

        {/* Divider */}
        <div className="hidden md:block w-px bg-white/15" />

        {/* IPB half */}
        <Link
          to="/ipb"
          className="relative flex-1 min-h-[50vh] md:min-h-screen overflow-hidden transition-[flex] duration-500 ease-out md:hover:flex-[1.4] flex items-center justify-center"
        >
          <img
            src={heroIpb}
            alt="Atelier Ivoire Pare-Brise"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-ada-black/70 group-hover/portal:bg-ada-black/85 hover:!bg-[#0f2747]/60 transition-colors duration-500" />
          <div className="relative z-10 text-center px-6 max-w-md">
            <div className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black text-xs font-bold uppercase tracking-wider px-4 py-1.5">
              <Wind className="h-3.5 w-3.5" /> Vitrage auto
            </div>
            <img
              src={ipbLogo.url}
              alt="Ivoire Pare-Brise — by ADA"
              className="mt-6 mx-auto h-44 md:h-56 w-auto object-contain"
            />
            <p className="mt-4 text-white/85 text-lg leading-relaxed">
              Réparation & remplacement
              <br />
              <span className="text-white/60 text-sm">
                Toutes marques · Intervention sous 45 min · Garantie 12 mois
              </span>
            </p>
            <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-bold px-6 py-3 shadow-[var(--shadow-yellow)]">
              Entrer sur Ivoire Pare-Brise <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
