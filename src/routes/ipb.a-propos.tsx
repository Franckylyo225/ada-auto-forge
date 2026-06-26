import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, BadgeCheck, Wrench, Home, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ada/Reveal";
import heroParebrise from "@/assets/hero-parebrise.jpg";

export const Route = createFileRoute("/ipb/a-propos")({
  head: () => ({
    meta: [
      { title: "À Propos — Ivoire Pare-Brise by ADA" },
      {
        name: "description",
        content:
          "Ivoire Pare-Brise by ADA : spécialiste du vitrage automobile à Abidjan. Techniciens certifiés, pièces homologuées, garantie 12 mois.",
      },
      { property: "og:title", content: "À Propos — Ivoire Pare-Brise" },
      {
        property: "og:description",
        content:
          "Spécialiste de la réparation et du remplacement de pare-brise en Côte d'Ivoire.",
      },
      { property: "og:image", content: heroParebrise },
    ],
    links: [{ rel: "canonical", href: "/ipb/a-propos" }],
  }),
  component: IPBAboutPage,
});

const VALEURS = [
  {
    icon: BadgeCheck,
    t: "Techniciens certifiés",
    d: "Une équipe formée aux dernières techniques de pose et de réparation, capable d'intervenir sur tous les modèles du marché ivoirien.",
  },
  {
    icon: Wrench,
    t: "Pièces homologuées",
    d: "Nous utilisons exclusivement des vitrages OEM ou d'origine constructeur. Aucun compromis sur la qualité.",
  },
  {
    icon: Home,
    t: "Atelier ou à domicile",
    d: "Nous nous adaptons à votre emploi du temps : intervention en atelier à Angré ou directement chez vous, au bureau.",
  },
  {
    icon: ShieldCheck,
    t: "Garantie 12 mois",
    d: "Chaque remplacement est couvert pièces et main d'œuvre. En cas de problème d'étanchéité, nous intervenons sans frais.",
  },
];

function IPBAboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-ada-black text-white">
        <div className="container-ada py-20 md:py-28 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-ada-yellow/15 text-ada-yellow px-3 py-1 text-xs font-semibold">
              Filiale du groupe ADA
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
              Le vitrage automobile,
              <span className="block text-ada-yellow">notre seule expertise.</span>
            </h1>
            <p className="mt-6 text-white/70 text-lg max-w-xl leading-relaxed">
              Ivoire Pare-Brise by ADA est la filiale spécialisée du groupe ADA
              dédiée à la réparation et au remplacement de vitrages automobiles
              en Côte d'Ivoire. Nos techniciens interviennent en atelier à Angré
              ou directement sur votre lieu de vie, avec des pièces homologuées
              et une garantie sur chaque intervention.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/ipb/rendez-vous"
                className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-semibold px-6 py-3.5 hover:brightness-95 transition"
              >
                Prendre rendez-vous <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/ipb/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 text-white font-semibold px-6 py-3 hover:bg-white hover:text-ada-black transition"
              >
                Nous contacter
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="absolute -top-3 -left-3 h-16 w-16 border-t-4 border-l-4 border-ada-yellow rounded-tl-2xl" />
              <div className="absolute -bottom-3 -right-3 h-16 w-16 border-b-4 border-r-4 border-ada-yellow rounded-br-2xl" />
              <img
                src={heroParebrise}
                alt="Atelier Ivoire Pare-Brise"
                className="relative w-full aspect-[5/4] object-cover rounded-2xl"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALEURS */}
      <section className="bg-white py-20">
        <div className="container-ada">
          <Reveal className="max-w-2xl">
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">
              Nos engagements
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">Ce qui fait la différence</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {VALEURS.map(({ icon: Icon, t, d }, i) => (
              <Reveal key={t} delay={i * 0.06}>
                <div className="h-full rounded-2xl bg-white border border-border p-6 flex gap-4">
                  <div className="h-11 w-11 shrink-0 rounded-2xl bg-ada-yellow text-ada-black grid place-items-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">{t}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ada-black text-white py-16">
        <div className="container-ada flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Un impact ? Une fissure ?</h2>
            <p className="mt-2 text-white/70">Notre équipe vous rappelle sous 2h ouvrables.</p>
          </div>
          <Link
            to="/ipb/rendez-vous"
            className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-bold px-6 py-3.5"
          >
            Demander un devis <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
