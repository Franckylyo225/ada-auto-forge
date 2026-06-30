import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Car, Shield, ArrowRight, Zap, Clock, Star, ChevronLeft, ChevronRight,
  CheckCircle2, Phone, Building2, Landmark, User as UserIcon, Award, ChevronDown,
  KeyRound, Headphones, MapPin, ShieldCheck,
} from "lucide-react";
import heroImg from "@/assets/hero-loc-key.png";
import locHeroSuv from "@/assets/loc-hero-suv.jpg";
import locParticuliers from "@/assets/loc-particuliers.jpg";
import locAssurances from "@/assets/loc-assurances.jpg";
import locEntreprises from "@/assets/loc-entreprises.jpg";
import locEtat from "@/assets/loc-etat.jpg";
import ctaCar from "@/assets/cta-car-cdn.png";
import { Reveal } from "@/components/ada/Reveal";
import PartnersMarquee from "@/components/ada/PartnersMarquee";

import { abs, SITE_URL } from "@/lib/seo";

const TITLE = "ADA Côte d'Ivoire — Location de véhicules à Abidjan (CDD & LLD)";
const DESC =
  "Louez berline, SUV, 4×4, pick-up ou utilitaire à Abidjan avec ADA : courte & longue durée, flotte récente assurée tous risques, mise à disposition sous 2h, assistance 24/7.";

export const Route = createFileRoute("/ada/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: SITE_URL + "/ada" },
      { property: "og:image", content: abs(locHeroSuv) },
      { property: "og:image:alt", content: "Flotte ADA — SUV et berlines premium à Abidjan" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: abs(locHeroSuv) },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/ada" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoRental",
          name: "ADA — Location de véhicules Côte d'Ivoire",
          image: abs(locHeroSuv),
          url: SITE_URL + "/ada",
          telephone: "+225 07 00 28 29 30",
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Boulevard VGE, Immeuble Chevalier de Clieu",
            addressLocality: "Treichville, Abidjan",
            addressCountry: "CI",
          },
          areaServed: "Côte d'Ivoire",
        }),
      },
    ],
  }),
  component: Home,
});

function HeroCarousel() {
  const [emblaRef, api] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(1);

  const onSelect = useCallback(() => {
    if (!api) return;
    setSelected(api.selectedScrollSnap() + 1);
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    return () => { api.off("select", onSelect); };
  }, [api, onSelect]);

  useEffect(() => {
    if (!api) return;
    const timer = setInterval(() => api.scrollNext(), 6000);
    return () => clearInterval(timer);
  }, [api]);

  const scrollTo = useCallback((index: number) => api && api.scrollTo(index), [api]);

  const slides = [
    {
      img: heroImg,
      badge: (
        <>
          <span className="h-1.5 w-1.5 rounded-full bg-ada-yellow" />
          ADA · Assistance Distribution Auto
        </>
      ),
      title: (
        <>
          La mobilité,<br />
          <span className="text-ada-yellow">à votre service.</span>
        </>
      ),
      desc:
        "Une flotte récente, un service premium, une assistance 24/7. ADA accompagne particuliers, entreprises et institutions partout en Côte d'Ivoire.",
      ctaPrimary: { to: "/ada/reservation", label: "Réserver un véhicule" },
      ctaSecondary: { to: "/ada/services", label: "Découvrir nos offres" },
    },
    {
      img: locHeroSuv,
      badge: (
        <>
          <Building2 className="h-3.5 w-3.5 text-ada-yellow" />
          Entreprises & Institutions
        </>
      ),
      title: (
        <>
          Location longue durée,<br />
          <span className="text-ada-yellow">flotte sur-mesure.</span>
        </>
      ),
      desc:
        "Optimisez la mobilité de vos équipes avec des contrats personnalisés, une gestion de flotte dédiée et des conditions négociées.",
      ctaPrimary: { to: "/ada/services", label: "Solutions entreprises" },
      ctaSecondary: { to: "/ada/contact", label: "Parler à un conseiller" },
    },
  ];

  return (
    <div className="relative overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {slides.map((s, i) => (
          <div key={i} className="flex-[0_0_100%] min-w-0 relative">
            <div className="absolute inset-0">
              <img src={s.img} alt="" className="h-full w-full object-cover" width={1920} height={1080} />
              <div className="absolute inset-0 bg-gradient-to-r from-ada-black via-ada-black/85 to-ada-black/30" />
            </div>
            <div className="relative container-ada pt-20 pb-28 md:pt-32 md:pb-40 text-white">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-medium border border-white/15">
                  {s.badge}
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-6 text-5xl md:text-7xl font-black tracking-tight leading-[1.05] max-w-3xl">
                  {s.title}
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-xl text-lg text-white/75 leading-relaxed">{s.desc}</p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to={s.ctaPrimary.to} className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-semibold px-6 py-3.5 hover:brightness-95 transition shadow-[var(--shadow-yellow)]">
                    {s.ctaPrimary.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to={s.ctaSecondary.to} className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white font-semibold px-6 py-3.5 hover:bg-white hover:text-ada-black transition">
                    {s.ctaSecondary.label}
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 flex items-center pl-2 md:pl-6 z-10">
        <button
          onClick={() => api?.scrollPrev()}
          className="hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur border border-white/20 text-white hover:bg-white/30 transition"
          aria-label="Précédent"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:pr-6 z-10">
        <button
          onClick={() => api?.scrollNext()}
          className="hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur border border-white/20 text-white hover:bg-white/30 transition"
          aria-label="Suivant"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-2 rounded-full transition-all ${selected === i + 1 ? "w-8 bg-ada-yellow" : "w-2 bg-white/40 hover:bg-white/70"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function Home() {
  return (
    <>
      {/* HERO */}
      <HeroCarousel />

      {/* SERVICE — LOCATION */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-ada grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-ada-yellow/15 blur-3xl" />
              <img
                src={locHeroSuv}
                alt="Flotte ADA — Location de véhicules"
                className="relative rounded-3xl object-cover w-full aspect-[5/4] shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 hidden md:flex items-center gap-3 rounded-2xl bg-white shadow-[var(--shadow-premium)] p-4 border border-border">
                <div className="h-10 w-10 rounded-full bg-ada-yellow grid place-items-center">
                  <Award className="h-5 w-5 text-ada-black" />
                </div>
                <div>
                  <div className="text-sm font-bold">Flotte récente</div>
                  <div className="text-xs text-muted-foreground">Entretenue & assurée</div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="inline-flex items-center gap-2 rounded-full bg-ada-yellow/20 text-ada-black text-xs font-bold uppercase tracking-wider px-4 py-1.5">
              <Car className="h-3.5 w-3.5" /> Notre métier — Location
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight">
              Location courte & longue durée
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Berlines, SUV, 4×4, pick-up, utilitaires et minibus : une flotte premium régulièrement renouvelée,
              entretenue par nos équipes certifiées et assurée tous risques pour votre tranquillité.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {[
                "Véhicules récents et assurés tous risques",
                "Mise à disposition sous 2 heures à Abidjan",
                "Avec ou sans chauffeur professionnel",
                "Tarifs dégressifs en longue durée",
                "Véhicule de remplacement pour assureurs",
                "Assistance routière 24h/7j",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-ada-yellow shrink-0 mt-0.5" />
                  <span className="text-sm text-ada-black/85">{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/ada/reservation" className="inline-flex items-center gap-2 rounded-full bg-ada-black text-white font-semibold px-6 py-3.5 hover:brightness-110 transition">
                Réserver maintenant <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/ada/services" className="inline-flex items-center gap-2 rounded-full border border-ada-black/15 text-ada-black font-semibold px-6 py-3.5 hover:bg-ada-black hover:text-white transition">
                Découvrir l'offre
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* AUDIENCES */}
      <section className="bg-[var(--color-ada-yellow-soft)]/40 py-20">
        <div className="container-ada">
          <Reveal className="max-w-2xl">
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">Pour qui</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-black">Une solution adaptée à chaque besoin.</h2>
            <p className="mt-3 text-muted-foreground">
              Que vous soyez un particulier exigeant, une entreprise structurée ou une institution,
              ADA conçoit une offre à votre image.
            </p>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: UserIcon, img: locParticuliers, t: "Particuliers", d: "Week-ends, vacances ou déplacements professionnels — un véhicule fiable et confortable, livré à l'heure." },
              { icon: Shield, img: locAssurances, t: "Assurances", d: "Véhicule de remplacement sous 24h pour vos assurés sinistrés, avec facturation directe." },
              { icon: Building2, img: locEntreprises, t: "Entreprises", d: "Contrats longue durée, véhicules de fonction et gestion de flotte clé en main." },
              { icon: Landmark, img: locEtat, t: "État & Institutions", d: "Marchés publics, missions de terrain et véhicules protocolaires conformes aux exigences." },
            ].map(({ icon: Icon, img, t, d }, i) => (
              <Reveal key={t} delay={i * 0.08}>
                <Link to="/ada/services" className="group block rounded-2xl bg-white border border-border overflow-hidden hover:shadow-[var(--shadow-premium)] hover:-translate-y-1 transition h-full">
                  <div className="relative h-40 overflow-hidden">
                    <img src={img} alt={t} className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute top-3 left-3 h-9 w-9 rounded-xl bg-white/95 backdrop-blur grid place-items-center">
                      <Icon className="h-4 w-4 text-ada-black" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-ada-black">{t}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{d}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ada-black group-hover:text-ada-yellow transition">
                      Voir l'offre <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GARANTIES PREMIUM */}
      <section className="bg-white py-20">
        <div className="container-ada">
          <Reveal className="max-w-2xl">
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">Nos engagements</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-black">L'exigence ADA, à chaque kilomètre.</h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: ShieldCheck, t: "Sécurité garantie", d: "Véhicules révisés avant chaque location, assurance tous risques incluse." },
              { icon: Clock, t: "Réactivité 2h", d: "Mise à disposition sous 2 heures dans toute la zone d'Abidjan." },
              { icon: Headphones, t: "Conseiller dédié", d: "Un interlocuteur unique pour vos demandes et vos urgences." },
              { icon: MapPin, t: "Couverture nationale", d: "Abidjan et villes de l'intérieur, livraison sur site possible." },
            ].map(({ icon: Icon, t, d }, i) => (
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

      {/* PROCESS */}
      <section className="bg-[var(--color-ada-yellow-soft)]/40 py-20">
        <div className="container-ada">
          <Reveal className="max-w-2xl">
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">Comment ça marche</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-black">Simple, rapide, transparent.</h2>
            <p className="mt-3 text-muted-foreground">
              De la demande en ligne à la remise des clés, un parcours pensé pour vous faire gagner du temps.
            </p>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] border-t-2 border-dashed border-ada-black/15" />
            {[
              { icon: KeyRound, t: "Demande en ligne", d: "Formulaire ou WhatsApp, en 2 minutes top chrono." },
              { icon: Phone, t: "Confirmation 2h", d: "Un conseiller ADA vous rappelle pour finaliser." },
              { icon: CheckCircle2, t: "Signature sécurisée", d: "En agence ou à distance, contrat clair et détaillé." },
              { icon: Car, t: "Véhicule prêt", d: "Récupération en agence ou livraison sur votre site." },
            ].map(({ icon: Icon, t, d }, i) => (
              <Reveal key={t} delay={i * 0.08}>
                <div className="relative text-center bg-white rounded-2xl p-6 border border-border">
                  <div className="mx-auto h-14 w-14 rounded-full bg-ada-yellow text-ada-black grid place-items-center">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="mt-3 text-xs font-bold text-ada-yellow">ÉTAPE {String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-1 font-bold">{t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-ada-black text-white py-24">
        <div className="container-ada">
          <Reveal className="max-w-2xl">
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">Pourquoi ADA</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">Une référence sur le marché ivoirien.</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { v: "150+", l: "Véhicules dans la flotte" },
              { v: "20+", l: "Années d'expérience" },
              { v: "5 000+", l: "Clients satisfaits" },
              { v: "24/7", l: "Assistance disponible" },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 0.08}>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <div className="text-4xl md:text-5xl font-black text-ada-yellow">{s.v}</div>
                  <div className="mt-2 text-white/70 text-sm">{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { icon: Zap, t: "Réactivité absolue", d: "Mise à disposition d'un véhicule en moins de 2 heures dans la zone d'Abidjan." },
              { icon: Car, t: "Flotte premium", d: "Berlines, SUV, 4×4, utilitaires — entretenus, fiables, parfaitement confortables." },
              { icon: Clock, t: "Service 7j/7", d: "Une équipe disponible chaque jour pour répondre à vos urgences et imprévus." },
            ].map(({ icon: Icon, t, d }, i) => (
              <Reveal key={t} delay={i * 0.08}>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-6 h-full">
                  <Icon className="h-7 w-7 text-ada-yellow" />
                  <h3 className="mt-4 text-lg font-semibold">{t}</h3>
                  <p className="mt-2 text-sm text-white/65">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-ada py-24">
        <Reveal className="max-w-2xl">
          <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">Témoignages</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">Ils nous font confiance.</h2>
        </Reveal>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { n: "Aminata K.", r: "Particulier · Cocody", q: "Service impeccable, véhicule récent et propre, livré à l'heure devant chez moi. La référence à Abidjan." },
            { n: "Groupe Sifca", r: "Entreprise · Plateau", q: "Partenaire fiable depuis 3 ans pour la flotte de notre direction commerciale. Zéro mauvaise surprise." },
            { n: "NSIA Assurances", r: "Assureur partenaire", q: "Réactivité exemplaire pour les véhicules de remplacement de nos assurés sinistrés. Un vrai gain de temps." },
          ].map((t, i) => (
            <Reveal key={t.n} delay={i * 0.08}>
              <div className="rounded-2xl border border-border bg-white p-6 h-full hover:shadow-[var(--shadow-premium)] transition">
                <div className="flex gap-1 text-ada-yellow">
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-ada-yellow" />)}
                </div>
                <p className="mt-4 text-ada-black/85 leading-relaxed">"{t.q}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-ada-black text-ada-yellow grid place-items-center font-bold">{t.n[0]}</div>
                  <div>
                    <div className="font-semibold text-sm">{t.n}</div>
                    <div className="text-xs text-muted-foreground">{t.r}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PARTNERS */}
      <PartnersMarquee />

      {/* FAQ */}
      <section className="container-ada py-20">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12">
          <Reveal>
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">FAQ</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-black">Vos questions, nos réponses.</h2>
            <p className="mt-4 text-muted-foreground">
              Tout ce qu'il faut savoir avant de louer un véhicule chez ADA Côte d'Ivoire.
            </p>
            <Link to="/ada/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ada-black hover:text-ada-yellow transition">
              Une autre question ? Contactez-nous <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="divide-y divide-border rounded-2xl border border-border bg-white">
              {[
                { q: "Quels documents pour louer un véhicule ?", a: "Une pièce d'identité valide, un permis de conduire en cours de validité (catégorie B minimum, 2 ans d'ancienneté) et un justificatif de domicile. Pour les entreprises, le RCCM et un mandat de l'employeur suffisent." },
                { q: "Combien de temps pour avoir mon véhicule ?", a: "Sous 2 heures ouvrables dans la zone d'Abidjan après confirmation du dossier. Compter 24 heures maximum pour une livraison dans les villes de l'intérieur." },
                { q: "Êtes-vous agréés par les assurances ?", a: "Oui. ADA est partenaire de référence des principales compagnies d'assurance (NSIA, SUNU, Atlantique, COLINA…) pour la mise à disposition rapide de véhicules de remplacement." },
                { q: "Proposez-vous la location avec chauffeur ?", a: "Oui. Nos chauffeurs sont expérimentés, formés à l'accueil et discrets — disponibles à la demi-journée, à la journée ou en contrat longue durée." },
                { q: "L'assurance est-elle incluse ?", a: "Chaque véhicule est livré avec une assurance tous risques. Des options complémentaires (rachat de franchise, conducteur additionnel) sont disponibles à la demande." },
                { q: "Comment fonctionne la longue durée ?", a: "Nous construisons un contrat sur-mesure (durée, kilométrage, services inclus) avec un tarif dégressif. Idéal pour les entreprises et les expatriés en mission." },
              ].map((f) => (
                <details key={f.q} className="group p-5 md:p-6">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="font-semibold text-ada-black pr-4">{f.q}</span>
                    <ChevronDown className="h-5 w-5 text-ada-black/60 group-open:rotate-180 transition" />
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container-ada pb-24">
        <Reveal>
          <div className="rounded-3xl bg-ada-yellow text-ada-black relative overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-10 md:p-14 lg:p-16 relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-ada-black/10 mb-6">
                  <Car className="h-6 w-6 text-ada-black" />
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">Prêt à prendre la route ?</h2>
                <p className="mt-4 text-ada-black/80 text-lg max-w-md">
                  Réservez votre véhicule en quelques clics — notre équipe vous confirme votre prise en charge en moins d'une heure.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/ada/reservation" className="inline-flex items-center gap-2 rounded-full bg-ada-black text-white font-semibold px-7 py-4 hover:bg-ada-black/90 transition shadow-lg shadow-ada-black/20">
                    Réserver maintenant <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/ada/contact" className="inline-flex items-center gap-2 rounded-full border-2 border-ada-black/20 text-ada-black font-semibold px-7 py-4 hover:bg-ada-black hover:text-white transition">
                    Nous contacter
                  </Link>
                </div>
              </div>
              <div className="relative h-64 md:h-auto md:min-h-[420px] lg:min-h-[480px]">
                <img
                  src={ctaCar}
                  alt="Véhicule SUV premium ADA"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ada-yellow via-ada-yellow/40 to-transparent md:from-ada-yellow md:via-ada-yellow/20 md:to-transparent" />
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
