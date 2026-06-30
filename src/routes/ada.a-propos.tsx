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
  MapPin,
  Building2,
  Briefcase,
} from "lucide-react";
import { Reveal } from "@/components/ada/Reveal";
import heroAbout from "@/assets/about-hero-cdn.png";

import { abs, SITE_URL } from "@/lib/seo";

const TITLE = "À propos d'ADA — Mobilité premium à Abidjan depuis +10 ans";
const DESC =
  "ADA Côte d'Ivoire : entreprise ivoirienne de location de véhicules et de réparation pare-brise (Ivoire Pare-Brise). Notre mission, notre équipe, nos engagements à Abidjan.";

export const Route = createFileRoute("/ada/a-propos")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: SITE_URL + "/ada/a-propos" },
      { property: "og:image", content: abs(heroAbout) },
      { property: "og:image:alt", content: "Équipe ADA Côte d'Ivoire" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: abs(heroAbout) },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/ada/a-propos" }],
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

const ENGAGEMENTS = [
  {
    icon: Zap,
    t: "Réactivité absolue",
    d: "Chaque demande est traitée en moins de 2 heures. Nous comprenons que votre mobilité n'attend pas.",
  },
  {
    icon: Award,
    t: "Qualité Premium",
    d: "Véhicules récents, entretien rigoureux et pièces homologuées. La sécurité est notre priorité non négociable.",
  },
  {
    icon: Handshake,
    t: "Partenaire de Confiance",
    d: "Une entreprise ivoirienne qui comprend vos enjeux, que vous soyez un particulier ou une grande institution.",
  },
  {
    icon: MessageSquare,
    t: "Transparence Totale",
    d: "Des tarifs clairs, des contrats sans surprises et un accompagnement honnête à chaque étape.",
  },
];

function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-ada-black text-white">
        <div className="container-ada py-20 md:py-28 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-ada-yellow/15 text-ada-yellow px-3 py-1 text-xs font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-ada-yellow" />
              Expertise Mobilité en Côte d'Ivoire
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
              Redéfinir la mobilité
              <span className="block text-ada-yellow">avec exigence.</span>
            </h1>
            <p className="mt-6 text-white/70 text-lg max-w-xl leading-relaxed">
              Assistance Distribution Auto (ADA) est l'acteur de référence de la mobilité à Abidjan. 
              À travers nos pôles Location et Ivoire Pare-Brise, nous offrons une qualité de service 
              héritée d'une culture du premium et d'une rigueur opérationnelle sans faille.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/ada/services"
                className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-semibold px-6 py-3.5 hover:brightness-95 transition shadow-[var(--shadow-yellow)]"
              >
                Découvrir nos solutions <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/ada/contact"
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
                src={heroAbout}
                alt="ADA Côte d'Ivoire — Service Premium"
                className="relative w-full aspect-[5/4] object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </Reveal>
        </div>

        <div className="border-t border-white/10 bg-white/5">
          <div className="container-ada py-6 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-ada-yellow" />
              Cocody – Riviera Bonoumin, Abidjan
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-ada-yellow" />
              RCCM CI-ABJ-03-2024-B13-04287
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-ada-yellow" />
              Capital : 5 000 000 FCFA
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white border-b border-border">
        <div className="container-ada py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { n: 10, s: "+", l: "Années d'expérience" },
            { n: 150, s: "+", l: "Véhicules en flotte" },
            { n: 5000, s: "+", l: "Clients satisfaits" },
            { n: 24, s: "/7", l: "Assistance routière" },
          ].map((stat, i) => (
            <Reveal key={stat.l} delay={i * 0.05} className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-black text-ada-black">
                <CountUp end={stat.n} suffix={stat.s} />
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                {stat.l}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ADN & VISION */}
      <section className="bg-[var(--color-ada-yellow-soft)]/40 py-20 md:py-24">
        <div className="container-ada">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Reveal>
              <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">
                Notre Vision
              </span>
              <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight leading-tight">
                Accompagner le dynamisme ivoirien par une mobilité sans faille.
              </h2>
              <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
                Plus qu'un simple loueur, ADA se positionne comme un partenaire stratégique 
                pour ses clients. Notre ambition est de devenir la référence incontestée 
                du service automobile premium en Côte d'Ivoire, en alliant innovation digitale 
                et proximité humaine.
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Target,
                  t: "Notre Mission",
                  d: "Offrir des solutions de mobilité fiables, du particulier à la grande institution.",
                },
                {
                  icon: Telescope,
                  t: "Notre Vision",
                  d: "Être le premier choix pour la qualité et la réactivité en Afrique de l'Ouest.",
                },
                {
                  icon: Handshake,
                  t: "Nos Valeurs",
                  d: "Proximité, Transparence, Excellence et Engagement local.",
                },
                {
                  icon: Heart,
                  t: "Engagement",
                  d: "Zéro compromis sur la sécurité et le confort de nos passagers.",
                },
              ].map(({ icon: Icon, t, d }, i) => (
                <Reveal key={t} delay={i * 0.1}>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-ada-yellow/10">
                    <Icon className="h-8 w-8 text-ada-yellow" />
                    <h3 className="mt-4 font-bold text-lg">{t}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISES */}
      <section className="bg-white py-20 md:py-24">
        <div className="container-ada">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">
              Le Groupe ADA
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight">
              Un savoir-faire, deux expertises majeures.
            </h2>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {/* LOCATION */}
            <Reveal>
              <div className="group h-full rounded-3xl bg-ada-black text-white p-8 md:p-10 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-ada-yellow font-black tracking-widest text-xl">
                    <Car className="h-6 w-6" /> ADA
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-ada-yellow text-ada-black px-3 py-1 rounded-full">
                    Location
                  </span>
                </div>
                <h3 className="mt-8 text-2xl md:text-3xl font-bold">Location de véhicules Premium</h3>
                <p className="mt-4 text-white/60 leading-relaxed">
                  Courte et longue durée pour les particuliers, les flottes d'entreprises 
                  et les missions institutionnelles. Un parc automobile moderne et diversifié.
                </p>
                <div className="mt-auto pt-8 flex items-center justify-between">
                  <Link
                    to="/ada/services"
                    className="inline-flex items-center gap-2 text-ada-yellow font-bold hover:gap-3 transition-all"
                  >
                    Voir l'offre <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* IPB */}
            <Reveal delay={0.1}>
              <div className="group h-full rounded-3xl bg-white border-2 border-ada-black p-8 md:p-10 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-ada-black font-black tracking-widest text-xl">
                    <Wrench className="h-6 w-6" /> IPB
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-ada-black text-white px-3 py-1 rounded-full">
                    Vitrage
                  </span>
                </div>
                <h3 className="mt-8 text-2xl md:text-3xl font-bold">Expertise Vitrage Automobile</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Réparation et remplacement de pare-brise par des techniciens certifiés. 
                  Pièces homologuées et prise en charge assurance simplifiée.
                </p>
                <div className="mt-auto pt-8 flex items-center justify-between">
                  <Link
                    to="/ipb"
                    className="inline-flex items-center gap-2 text-ada-black font-bold hover:gap-3 transition-all"
                  >
                    Découvrir IPB <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ENGAGEMENTS */}
      <section className="bg-ada-black py-20 md:py-24 text-white">
        <div className="container-ada">
          <Reveal className="max-w-2xl">
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">
              Nos engagements
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight">
              Pourquoi choisir ADA ?
            </h2>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ENGAGEMENTS.map((e, i) => (
              <Reveal key={e.t} delay={i * 0.1}>
                <div className="group">
                  <div className="h-12 w-12 rounded-2xl bg-ada-yellow text-ada-black grid place-items-center mb-6 group-hover:scale-110 transition-transform">
                    <e.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold">{e.t}</h3>
                  <p className="mt-3 text-sm text-white/50 leading-relaxed">{e.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-ada text-center">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
              Votre mobilité mérite <br className="hidden md:block" />
              <span className="text-ada-yellow italic">l'excellence ADA.</span>
            </h2>
            <p className="mt-8 text-muted-foreground text-lg max-w-2xl mx-auto">
              Que vous ayez besoin d'un véhicule pour demain ou d'un conseil pour votre flotte, 
              nos experts sont à votre disposition.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/ada/reservation"
                className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-bold px-8 py-4 hover:brightness-95 transition shadow-[var(--shadow-yellow)]"
              >
                Réserver un véhicule <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/ada/contact"
                className="inline-flex items-center gap-2 rounded-full bg-ada-black text-white font-bold px-8 py-4 hover:brightness-110 transition"
              >
                Nous contacter
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
