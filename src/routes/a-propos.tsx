import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import {
  Target,
  Telescope,
  Heart,
  Car,
  Wrench,
  Check,
  ArrowRight,
  Zap,
  Award,
  Handshake,
  MessageSquare,
  Phone,
  Smartphone,
  MapPin,
  Building2,
  Briefcase,
  Linkedin,
} from "lucide-react";
import { Reveal } from "@/components/ada/Reveal";
import heroAbout from "@/assets/about-hero-cdn.png";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À Propos — ADA · Assistance Distribution Auto Abidjan" },
      {
        name: "description",
        content:
          "ADA, entreprise ivoirienne spécialisée dans la location de véhicules et la réparation de pare-brise. Notre histoire, notre mission, notre équipe à Abidjan.",
      },
      { property: "og:title", content: "À Propos — ADA" },
      {
        property: "og:description",
        content:
          "Depuis plus de 10 ans à Abidjan, ADA met la mobilité au service des Ivoiriens.",
      },
      { property: "og:image", content: heroAbout },
    ],
    links: [{ rel: "canonical", href: "/a-propos" }],
  }),
  component: AboutPage,
});

function CountUp({
  end,
  suffix = "",
  duration = 1400,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}


const TEAM = [
  {
    initials: "DG",
    name: "Directeur Général",
    role: "Fondateur & Direction générale",
    bio:
      "À l'origine du projet ADA, il en définit la stratégie et les ambitions depuis la création.",
  },
  {
    initials: "RL",
    name: "Responsable Location",
    role: "Direction des opérations location",
    bio:
      "Garant de la qualité de service et de la satisfaction des clients location.",
  },
  {
    initials: "RT",
    name: "Responsable Ivoire Pare-Brise",
    role: "Direction technique vitrages",
    bio:
      "Supervise les interventions techniques et la relation avec les compagnies d'assurance.",
  },
];

const ENGAGEMENTS = [
  {
    icon: Zap,
    t: "Réactivité",
    d:
      "Nous savons que le temps est précieux. Chaque demande est traitée sous 2 heures ouvrables. Nos équipes sont mobilisées pour vous répondre vite et bien.",
  },
  {
    icon: Award,
    t: "Qualité sans compromis",
    d:
      "Véhicules entretenus et contrôlés régulièrement. Vitrages homologués et garantis. Nous ne coupons jamais les coins ronds sur la sécurité et la qualité.",
  },
  {
    icon: Handshake,
    t: "Proximité humaine",
    d:
      "ADA est une entreprise ivoirienne, ancrée localement. Nous comprenons vos réalités et parlons votre langue. Un vrai partenaire de confiance.",
  },
  {
    icon: MessageSquare,
    t: "Transparence totale",
    d:
      "Devis clair, tarifs honnêtes, pas de frais cachés. Ce que nous disons, nous le faisons. Votre confiance est notre bien le plus précieux.",
  },
];

const PARTNERS = [
  {
    label: "Assurances partenaires",
    items: [
      "SAAR",
      "Allianz CI",
      "NSIA Assurances",
      "Saham",
      "Atlantique Assurances",
      "SUNU",
      "COLINA",
    ],
  },
  {
    label: "Clients entreprises",
    items: [
      "Multinationales",
      "PME ivoiriennes",
      "Cabinets conseil",
      "Groupes industriels",
    ],
  },
  {
    label: "Institutions & État",
    items: [
      "Ministères",
      "Collectivités territoriales",
      "Organisations internationales",
      "ONG & projets",
    ],
  },
];

function AboutPage() {
  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="bg-ada-black text-white">
        <div className="container-ada py-20 md:py-28 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-ada-yellow/15 text-ada-yellow px-3 py-1 text-xs font-semibold">
              Depuis plus de 10 ans à Abidjan
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
              Nous mettons la mobilité
              <span className="block text-ada-yellow">au service des Ivoiriens.</span>
            </h1>
            <p className="mt-6 text-white/70 text-lg max-w-xl leading-relaxed">
              ADA — Assistance Distribution Auto — est une entreprise ivoirienne
              spécialisée dans la location de véhicules et la réparation de
              vitrages automobiles. Fondée à Abidjan, elle accompagne chaque jour
              particuliers, entreprises, institutions et compagnies d'assurance
              avec des services fiables, rapides et professionnels.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/location"
                className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-semibold px-6 py-3.5 hover:brightness-95 transition"
              >
                Nos services <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
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
                src={heroAbout}
                alt="Agence ADA à Abidjan — flotte de véhicules et showroom"
                width={1280}
                height={1024}
                className="relative w-full aspect-[5/4] object-cover rounded-2xl shadow-[var(--shadow-premium)]"
              />
            </div>
          </Reveal>
        </div>

        <div className="border-t border-white/10">
          <div className="container-ada py-5 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 md:divide-x md:divide-white/15 text-sm text-white/70">
            <div className="px-6 inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-ada-yellow" />
              Siège : Cocody – Riviera Bonoumin, Abidjan
            </div>
            <div className="px-6 inline-flex items-center gap-2">
              <Building2 className="h-4 w-4 text-ada-yellow" />
              RCCM N° CI-ABJ-03-2024-B13-04287
            </div>
            <div className="px-6 inline-flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-ada-yellow" />
              SARL au capital de 5 000 000 FCFA
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — MISSION · VISION · VALEURS */}
      <section style={{ backgroundColor: "#FFFBEC" }} className="py-20">
        <div className="container-ada">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-black/60">
              Notre ADN
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold">Ce qui nous guide</h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Target,
                t: "Notre mission",
                d:
                  "Offrir aux Ivoiriens des solutions de mobilité automobile fiables, accessibles et professionnelles — que ce soit pour louer un véhicule ou réparer un vitrage — avec la réactivité et le sérieux que chaque client mérite.",
              },
              {
                icon: Telescope,
                t: "Notre vision",
                d:
                  "Devenir le partenaire de référence en mobilité automobile en Côte d'Ivoire, reconnu pour la qualité de ses services, la fiabilité de ses engagements et son ancrage local profond.",
              },
            ].map(({ icon: Icon, t, d }, i) => (
              <Reveal key={t} delay={i * 0.06}>
                <div className="h-full rounded-2xl bg-white p-7 border border-border">
                  <div className="h-1 w-12 bg-ada-yellow rounded-full" />
                  <Icon className="mt-5 h-9 w-9 text-ada-black" />
                  <h3 className="mt-4 text-xl font-bold">{t}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{d}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.12}>
              <div className="h-full rounded-2xl bg-white p-7 border border-border">
                <div className="h-1 w-12 bg-ada-yellow rounded-full" />
                <Heart className="mt-5 h-9 w-9 text-ada-black" />
                <h3 className="mt-4 text-xl font-bold">Nos valeurs</h3>
                <ul className="mt-3 space-y-2">
                  {[
                    "Proximité et écoute client",
                    "Réactivité et efficacité",
                    "Transparence et honnêteté",
                    "Excellence opérationnelle",
                  ].map((v) => (
                    <li key={v} className="flex items-start gap-2 text-ada-black">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-ada-yellow shrink-0" />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 3 — NOS DEUX ACTIVITÉS */}
      <section className="bg-white py-20">
        <div className="container-ada">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">
              Le groupe ADA
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold">
              Un groupe, deux expertises
            </h2>
            <p className="mt-3 text-muted-foreground">
              ADA s'articule autour de deux activités complémentaires, unies par
              la même exigence de qualité.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {/* ADA Location */}
            <Reveal>
              <div className="h-full rounded-2xl bg-ada-black text-white p-8 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-ada-yellow font-black tracking-wider">
                    <Car className="h-5 w-5" /> ADA
                  </div>
                  <span className="text-xs font-semibold rounded-full bg-ada-yellow text-ada-black px-3 py-1">
                    Activité principale
                  </span>
                </div>
                <h3 className="mt-6 text-2xl md:text-3xl font-bold">
                  Location de véhicules
                </h3>
                <p className="mt-3 text-white/70 leading-relaxed">
                  Courte et longue durée pour particuliers, entreprises,
                  compagnies d'assurance et institutions publiques. Une flotte
                  récente, des formules flexibles, un service personnalisé.
                </p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {[
                    "Location courte durée — dès 1 jour",
                    "Location longue durée — jusqu'à 36 mois",
                    "Véhicules de remplacement assurance",
                    "Flotte dédiée entreprises & État",
                  ].map((s) => (
                    <li key={s} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-ada-yellow mt-0.5 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <Link
                    to="/location"
                    className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-semibold px-6 py-3 hover:brightness-95 transition"
                  >
                    Découvrir la location <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Ivoire Pare-Brise */}
            <Reveal delay={0.08}>
              <div className="h-full rounded-2xl bg-white text-ada-black p-8 border-2 border-ada-black flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 font-black tracking-wider">
                    <Wrench className="h-5 w-5" /> IVOIRE PARE-BRISE
                    <span className="text-xs font-normal text-muted-foreground">
                      by ADA
                    </span>
                  </div>
                  <span className="text-xs font-semibold rounded-full bg-ada-black text-white px-3 py-1">
                    Filiale spécialisée
                  </span>
                </div>
                <h3 className="mt-6 text-2xl md:text-3xl font-bold">
                  Réparation & remplacement de vitrages
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Toutes marques, en atelier ou à domicile. Techniciens
                  certifiés, pièces homologuées, garantie 12 mois sur chaque
                  intervention.
                </p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {[
                    "Réparation d'impact (dès 1h)",
                    "Remplacement pare-brise avant",
                    "Vitrage latéral & lunette arrière",
                    "Prise en charge assurance directe",
                  ].map((s) => (
                    <li key={s} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-ada-yellow mt-0.5 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <Link
                    to="/ivoire-pare-brise"
                    className="inline-flex items-center gap-2 rounded-full bg-ada-black text-ada-yellow font-semibold px-6 py-3 hover:brightness-110 transition"
                  >
                    Découvrir Ivoire Pare-Brise <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 4 — CHIFFRES CLÉS */}
      <section className="bg-ada-black text-white py-20">
        <div className="container-ada">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">
              En un coup d'œil
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold">ADA en chiffres</h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { n: 10, s: "+", l: "Années d'expérience" },
              { n: 500, s: "+", l: "Clients satisfaits" },
              { n: 100, s: "+", l: "Véhicules disponibles" },
              { n: 30, s: "+", l: "Marques vitrages" },
              { n: 48, s: "h", l: "Délai max d'intervention" },
              { n: 2, s: "", l: "Activités complémentaires" },
            ].map((stat, i) => (
              <Reveal key={stat.l} delay={i * 0.05}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                  <div className="text-5xl md:text-6xl font-black text-ada-yellow">
                    <CountUp end={stat.n} suffix={stat.s} />
                  </div>
                  <div className="mt-2 text-sm text-white/60">{stat.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — ÉQUIPE */}
      <section className="bg-white py-20">
        <div className="container-ada">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">
              L'équipe
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold">
              Les personnes derrière ADA
            </h2>
            <p className="mt-3 text-muted-foreground">
              Une équipe engagée, expérimentée et passionnée par la mobilité
              automobile.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.06}>
                <div className="rounded-2xl border border-border bg-white p-7 text-center h-full hover:border-ada-yellow transition">
                  <div className="mx-auto h-24 w-24 rounded-full bg-ada-yellow text-ada-black grid place-items-center text-2xl font-black">
                    {m.initials}
                  </div>
                  <div className="mt-5 font-bold text-lg">{m.name}</div>
                  <div className="text-sm font-semibold text-ada-yellow mt-0.5">
                    {m.role}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {m.bio}
                  </p>
                  <div className="mt-4 flex justify-center">
                    <a
                      href="#"
                      aria-label={`LinkedIn — ${m.name}`}
                      className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-border text-muted-foreground hover:text-ada-black hover:border-ada-black transition"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-10 text-center text-muted-foreground italic max-w-2xl mx-auto">
            « Derrière chaque clé remise et chaque vitrage posé, il y a une
            équipe dédiée à votre satisfaction. »
          </p>
        </div>
      </section>

      {/* SECTION 6 — NOS ENGAGEMENTS */}
      <section style={{ backgroundColor: "#FFFBEC" }} className="py-20">
        <div className="container-ada">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-black/60">
              Notre promesse
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold">
              Nos engagements envers vous
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ENGAGEMENTS.map(({ icon: Icon, t, d }, i) => (
              <Reveal key={t} delay={i * 0.05}>
                <div className="h-full rounded-2xl bg-white p-6 border border-border">
                  <div className="h-11 w-11 rounded-2xl bg-ada-yellow text-ada-black grid place-items-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-bold text-lg">{t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — NOS PARTENAIRES */}
      <section className="bg-white py-20">
        <div className="container-ada">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">
              Confiance
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold">
              Ils nous font confiance
            </h2>
            <p className="mt-3 text-muted-foreground">
              ADA collabore avec des entreprises, des institutions et des
              compagnies d'assurance reconnues en Côte d'Ivoire.
            </p>
          </Reveal>

          <div className="mt-12 space-y-10 max-w-5xl mx-auto">
            {PARTNERS.map((row) => (
              <Reveal key={row.label}>
                <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground text-center">
                  {row.label}
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-3">
                  {row.items.map((p) => (
                    <span
                      key={p}
                      className="rounded-full bg-white border border-border text-ada-black text-sm font-semibold px-5 py-2.5 hover:border-ada-yellow hover:bg-ada-yellow/5 transition shadow-sm"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-12 text-center text-muted-foreground italic">
            Votre organisation souhaite travailler avec ADA ? Parlons-en.{" "}
            <Link
              to="/contact"
              className="not-italic font-semibold text-ada-black underline decoration-ada-yellow decoration-2 underline-offset-4 hover:text-ada-yellow transition"
            >
              Nous contacter
            </Link>
          </p>
        </div>
      </section>

      {/* SECTION 8 — CTA FINAL */}
      <section className="relative py-24">
        <div className="absolute inset-0 grid grid-cols-2">
          <div className="bg-ada-black" />
          <div className="bg-ada-yellow" />
        </div>
        <div className="relative container-ada">
          <Reveal>
            <div className="max-w-3xl mx-auto rounded-3xl bg-white p-8 md:p-12 text-center shadow-[var(--shadow-premium)] border border-border">
              <h2 className="text-3xl md:text-5xl font-bold">Faisons connaissance.</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Que vous ayez un besoin en location, en réparation de vitrage, ou
                un projet de partenariat — notre équipe est disponible et à votre
                écoute.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link
                  to="/location"
                  className="inline-flex items-center gap-2 rounded-full bg-ada-black text-white font-semibold px-6 py-3.5 hover:brightness-110 transition"
                >
                  Découvrir nos services <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-semibold px-6 py-3.5 hover:brightness-95 transition"
                >
                  Nous contacter
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <a href="tel:+22527212527850" className="inline-flex items-center gap-2 hover:text-ada-black transition">
                  <Phone className="h-4 w-4 text-ada-yellow" /> +225 27 21 252 785
                </a>
                <a href="tel:+2250700282930" className="inline-flex items-center gap-2 hover:text-ada-black transition">
                  <Smartphone className="h-4 w-4 text-ada-yellow" /> +225 07 00 282 930
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
