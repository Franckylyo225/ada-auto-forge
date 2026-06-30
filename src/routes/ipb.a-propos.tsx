import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  BadgeCheck,
  Wrench,
  Home,
  ArrowRight,
  Award,
  Users,
  Building2,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/ada/Reveal";
import heroParebrise from "@/assets/hero-parebrise.jpg";
import heroAtelier from "@/assets/ipb-hero-windshield-cropped.jpg";

export const Route = createFileRoute("/ipb/a-propos")({
  head: () => ({
    meta: [
      { title: "À Propos — Ivoire Pare-Brise by ADA · L'expertise vitrage premium d'Abidjan" },
      {
        name: "description",
        content:
          "Filiale spécialisée du groupe ADA, Ivoire Pare-Brise est l'expert du vitrage automobile en Côte d'Ivoire : techniciens certifiés, pièces homologuées constructeur, garantie 12 mois sur chaque intervention.",
      },
      { property: "og:title", content: "À Propos — Ivoire Pare-Brise by ADA" },
      {
        property: "og:description",
        content:
          "L'expertise vitrage premium du groupe ADA : techniciens certifiés, pièces homologuées, garantie 12 mois.",
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
    d: "Une équipe formée aux dernières techniques de pose et de réparation, capable d'intervenir avec précision sur tous les modèles du marché ivoirien — du véhicule familial au SUV premium.",
  },
  {
    icon: Wrench,
    t: "Pièces homologuées constructeur",
    d: "Nous travaillons exclusivement avec des vitrages OEM ou d'origine, mastics et joints neufs systématiques. La sécurité de votre véhicule ne souffre aucun compromis.",
  },
  {
    icon: Home,
    t: "Atelier ou à votre adresse",
    d: "Intervention en atelier à Angré ou directement à votre domicile, au bureau, sur votre chantier. Nous nous adaptons à votre emploi du temps, pas l'inverse.",
  },
  {
    icon: ShieldCheck,
    t: "Garantie 12 mois pièces & pose",
    d: "Chaque remplacement est couvert pièces et main d'œuvre pendant un an. En cas de défaut d'étanchéité ou de pose, nous intervenons à nouveau sans frais.",
  },
];

const STATS = [
  { v: "200+", l: "Véhicules traités chaque année" },
  { v: "80+", l: "Marques couvertes, toutes générations" },
  { v: "45 min", l: "Délai moyen pour une réparation d'impact" },
  { v: "12 mois", l: "Garantie pièces & pose systématique" },
];

const PILIERS = [
  {
    icon: Award,
    t: "Adossé au groupe ADA",
    d: "+5 années d'expertise mobilité en Côte d'Ivoire. Une rigueur de gestion, des process éprouvés, une exigence de service héritée du métier de la location premium.",
  },
  {
    icon: Users,
    t: "Une équipe à taille humaine",
    d: "Un interlocuteur dédié du diagnostic au suivi de garantie. Pas de standard impersonnel : un technicien qui connaît votre véhicule et votre dossier.",
  },
  {
    icon: Building2,
    t: "Partenaire des assureurs & flottes",
    d: "Facturation directe avec les principales compagnies d'assurance ivoiriennes. Contrats cadres pour les entreprises et institutions gérant un parc automobile.",
  },
  {
    icon: Sparkles,
    t: "Méthodologie constructeur",
    d: "Chaque pose respecte les normes constructeur : préparation du cadre, primaire d'accrochage, mastic uréthane, temps de séchage. Aucun raccourci.",
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
              <span className="h-1.5 w-1.5 rounded-full bg-ada-yellow" />
              Filiale spécialisée du groupe ADA
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
              Le vitrage automobile,
              <span className="block text-ada-yellow">notre seule expertise.</span>
            </h1>
            <p className="mt-6 text-white/70 text-lg max-w-xl leading-relaxed">
              Ivoire Pare-Brise by ADA est la filiale dédiée à la réparation et au remplacement
              de vitrages automobiles en Côte d'Ivoire. Nous mettons au service de chaque
              véhicule la rigueur d'un groupe leader de la mobilité : pièces homologuées,
              techniciens certifiés, garantie écrite — sans exception.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/ipb/rendez-vous"
                className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-semibold px-6 py-3.5 hover:brightness-95 transition shadow-[var(--shadow-yellow)]"
              >
                Prendre rendez-vous <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/ipb/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white font-semibold px-6 py-3.5 hover:bg-white hover:text-ada-black transition"
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
                src={heroAtelier}
                alt="Atelier Ivoire Pare-Brise — pose de pare-brise par un technicien certifié"
                className="relative w-full aspect-[5/4] object-cover rounded-2xl"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="bg-white border-b border-border">
        <div className="container-ada py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.05}>
              <div className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-black text-ada-black">{s.v}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  {s.l}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* NOTRE HISTOIRE */}
      <section className="bg-white py-20 md:py-24">
        <div className="container-ada grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-ada-yellow/15 blur-3xl" />
              <img
                src={heroParebrise}
                alt="Pare-brise impact en gros plan — diagnostic Ivoire Pare-Brise"
                className="relative w-full aspect-[5/4] object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">
              Notre histoire
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight">
              Née d'un constat simple, portée par une exigence : la vôtre.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              En gérant pendant deux décennies une flotte de véhicules de location, le groupe ADA
              a vu passer des centaines de pare-brises impactés, des poses approximatives, des
              vitrages non conformes. Le constat était sans appel : à Abidjan, le marché du
              vitrage automobile méritait un acteur premium, transparent et garanti.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Ivoire Pare-Brise by ADA est née de cette exigence. Un atelier moderne à Angré, des
              équipes formées, des pièces sourcées chez les fabricants homologués, et un
              engagement écrit sur chaque intervention. Particuliers, assureurs, flottes
              d'entreprise : la même rigueur pour tous.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/ipb/services"
                className="inline-flex items-center gap-2 rounded-full bg-ada-black text-white font-semibold px-6 py-3.5 hover:brightness-110 transition"
              >
                Découvrir nos services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PILIERS */}
      <section className="bg-[var(--color-ada-yellow-soft)]/40 py-20">
        <div className="container-ada">
          <Reveal className="max-w-2xl">
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">
              Nos piliers
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight">
              Quatre raisons de nous confier votre vitrage.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Une promesse simple : la sécurité de votre véhicule, traitée avec le sérieux qu'elle mérite.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {PILIERS.map(({ icon: Icon, t, d }, i) => (
              <Reveal key={t} delay={i * 0.06}>
                <div className="h-full rounded-2xl bg-white border border-border p-6 md:p-7 flex gap-4 hover:border-ada-yellow transition">
                  <div className="h-11 w-11 shrink-0 rounded-2xl bg-ada-yellow text-ada-black grid place-items-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">{t}</div>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ENGAGEMENTS */}
      <section className="bg-white py-20">
        <div className="container-ada">
          <Reveal className="max-w-2xl">
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">
              Nos engagements
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight">
              Ce qui fait la différence, à chaque intervention.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {VALEURS.map(({ icon: Icon, t, d }, i) => (
              <Reveal key={t} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-border bg-white p-6 hover:border-ada-yellow transition">
                  <div className="h-11 w-11 rounded-2xl bg-ada-yellow grid place-items-center">
                    <Icon className="h-5 w-5 text-ada-black" />
                  </div>
                  <h3 className="mt-4 font-bold text-lg">{t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ada-black text-white py-20">
        <div className="container-ada">
          <Reveal>
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                  Un impact ? Une fissure ? Un doute ?
                </h2>
                <p className="mt-3 text-white/70 text-lg">
                  Diagnostic gratuit, devis précis sous 2 heures ouvrables, intervention sous 45 min à Abidjan.
                </p>
              </div>
              <Link
                to="/ipb/rendez-vous"
                className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-bold px-7 py-4 hover:brightness-95 transition shadow-[var(--shadow-yellow)] shrink-0"
              >
                Demander un devis <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
