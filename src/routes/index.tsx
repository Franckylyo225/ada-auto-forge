import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Car, Wind } from "lucide-react";
import heroAda from "@/assets/loc-hero-suv.jpg";
import heroIpb from "@/assets/ipb-hero-split.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Groupe ADA — Location auto & Ivoire Pare-Brise · Côte d'Ivoire" },
      {
        name: "description",
        content:
          "Deux expertises au service de votre mobilité en Côte d'Ivoire : ADA pour la location de véhicules, Ivoire Pare-Brise pour la réparation et le remplacement de pare-brise.",
      },
      { property: "og:title", content: "Groupe ADA — Choisissez votre service" },
      {
        property: "og:description",
        content:
          "ADA · Location de véhicules — Ivoire Pare-Brise · Réparation & remplacement de vitrages.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portal,
});

function Portal() {
  return (
    <div className="min-h-screen bg-ada-black text-white flex flex-col">
      {/* Top brand bar */}
      <div className="container-ada py-5 flex items-center justify-between text-sm">
        <div className="font-black tracking-tight text-base">
          <span className="text-white">Groupe</span>{" "}
          <span className="text-ada-yellow">ADA</span>
        </div>
        <a
          href="tel:+22507002829830"
          className="text-white/70 hover:text-white transition"
        >
          +225 07 00 28 29 30
        </a>
      </div>

      {/* Split screen */}
      <div className="flex-1 flex flex-col md:flex-row group/portal">
        {/* ADA half */}
        <Link
          to="/ada"
          className="relative flex-1 min-h-[55vh] md:min-h-0 overflow-hidden transition-[flex] duration-500 ease-out md:hover:flex-[1.4] flex items-center justify-center"
        >
          <img
            src={heroAda}
            alt="Flotte ADA"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover/portal:scale-100 hover:scale-110"
          />
          <div className="absolute inset-0 bg-ada-black/65 group-hover/portal:bg-ada-black/80 hover:!bg-ada-yellow/30 transition-colors duration-500" />
          <div className="relative z-10 text-center px-6 max-w-md">
            <div className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black text-xs font-bold uppercase tracking-wider px-4 py-1.5">
              <Car className="h-3.5 w-3.5" /> Mobilité
            </div>
            <div className="mt-6 text-6xl md:text-7xl font-black tracking-tight">
              ada<span className="text-ada-yellow">.</span>
            </div>
            <p className="mt-4 text-white/85 text-lg leading-relaxed">
              Location de véhicules
              <br />
              <span className="text-white/60 text-sm">
                Courte & longue durée · Particuliers, entreprises, assurances
              </span>
            </p>
            <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-bold px-6 py-3 shadow-[var(--shadow-yellow)] group-hover/portal:translate-y-0">
              Entrer sur ADA <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Link>

        {/* Divider */}
        <div className="hidden md:block w-px bg-white/15" />

        {/* IPB half */}
        <Link
          to="/ipb"
          className="relative flex-1 min-h-[55vh] md:min-h-0 overflow-hidden transition-[flex] duration-500 ease-out md:hover:flex-[1.4] flex items-center justify-center"
        >
          <img
            src={heroIpb}
            alt="Atelier Ivoire Pare-Brise"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-ada-black/70 group-hover/portal:bg-ada-black/85 hover:!bg-[#0f2747]/60 transition-colors duration-500" />
          <div className="relative z-10 text-center px-6 max-w-md">
            <div className="inline-flex items-center gap-2 rounded-full bg-white text-ada-black text-xs font-bold uppercase tracking-wider px-4 py-1.5">
              <Wind className="h-3.5 w-3.5" /> Vitrage auto
            </div>
            <div className="mt-6 text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Ivoire
              <br />
              Pare-Brise
            </div>
            <p className="mt-4 text-white/85 text-lg leading-relaxed">
              Réparation & remplacement
              <br />
              <span className="text-white/60 text-sm">
                Toutes marques · Intervention sous 45 min · Garantie 12 mois
              </span>
            </p>
            <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-white text-ada-black font-bold px-6 py-3 shadow-lg">
              Entrer sur IPB <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
      </div>

      <div className="container-ada py-5 text-center text-white/40 text-xs">
        © 2025 Groupe ADA — Assistance Distribution Auto.
      </div>
    </div>
  );
}
