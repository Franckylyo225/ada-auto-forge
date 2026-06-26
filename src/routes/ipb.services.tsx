import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/ada/Reveal";
import cardRep from "@/assets/ipb-card-reparation-cdn.png";
import cardRemp from "@/assets/ipb-card-remplacement-cdn.png";
import cardLat from "@/assets/ipb-card-lateral-cdn.png";

export const Route = createFileRoute("/ipb/services")({
  head: () => ({
    meta: [
      { title: "Services — Ivoire Pare-Brise by ADA · Abidjan" },
      {
        name: "description",
        content:
          "Réparation d'impact, remplacement de pare-brise, vitrage latéral et lunette arrière. Toutes marques, garantie 12 mois.",
      },
      { property: "og:title", content: "Services — Ivoire Pare-Brise" },
      {
        property: "og:description",
        content: "Tous les services vitrage automobile d'Ivoire Pare-Brise by ADA.",
      },
      { property: "og:image", content: cardRemp },
    ],
    links: [{ rel: "canonical", href: "/ipb/services" }],
  }),
  component: IPBServicesPage,
});

const SERVICES = [
  {
    img: cardRep,
    title: "Réparation d'impact",
    desc:
      "Votre pare-brise présente un impact ou une petite fissure ? Notre résine spéciale restaure la solidité et la transparence du verre en moins d'une heure, sans remplacement.",
    feats: [
      "Intervention en moins d'1 heure",
      "Résine haute résistance certifiée",
      "Traitement invisible après séchage",
      "Économique vs remplacement",
    ],
  },
  {
    img: cardRemp,
    title: "Remplacement pare-brise",
    desc:
      "Quand la fissure est trop longue ou l'impact trop central, le remplacement s'impose. Vitrages homologués, mastic neuf, pose selon les normes constructeur.",
    feats: [
      "Vitrage homologué OEM ou origine",
      "Mastic et joints neufs à chaque pose",
      "Temps de séchage respecté",
      "Garantie 12 mois sur la pose",
    ],
    featured: true,
  },
  {
    img: cardLat,
    title: "Vitrage latéral & lunette arrière",
    desc:
      "Vitre latérale cassée, lunette arrière à remplacer, déflecteur abîmé : nous intervenons sur tous types de vitrages, toutes marques.",
    feats: [
      "Vitres de portes avant et arrière",
      "Lunette arrière (avec/sans désembuage)",
      "Déflecteurs et triangles de custode",
      "Intervention rapide en atelier",
    ],
  },
];

function IPBServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-ada-black text-white py-20">
        <div className="container-ada">
          <Reveal>
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">
              Nos services
            </span>
            <h1 className="mt-3 text-4xl md:text-6xl font-black tracking-tight">
              Tout ce que nous faisons.
            </h1>
            <p className="mt-5 max-w-xl text-white/70 text-lg">
              Du simple impact au remplacement complet, Ivoire Pare-Brise prend
              en charge l'intégralité de vos vitrages automobiles.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-white py-20">
        <div className="container-ada grid gap-6 md:grid-cols-3">
          {SERVICES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div
                className={`relative h-full rounded-2xl bg-white overflow-hidden flex flex-col transition hover:-translate-y-1 hover:shadow-[var(--shadow-premium)] ${
                  c.featured ? "border-2 border-ada-yellow" : "border border-border"
                }`}
              >
                {c.featured && (
                  <div className="absolute top-4 left-4 z-10 inline-flex items-center rounded-full bg-ada-yellow text-ada-black text-xs font-bold px-3 py-1">
                    Service le plus demandé
                  </div>
                )}
                <div className="aspect-[5/3] overflow-hidden">
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-xl">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {c.feats.map((f) => (
                      <li key={f} className="flex gap-2">
                        <Check className="h-4 w-4 text-ada-yellow shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link
                      to="/ipb/rendez-vous"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-ada-black hover:text-ada-yellow"
                    >
                      Demander un devis <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
