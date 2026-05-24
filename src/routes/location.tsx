import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Users, Settings, Fuel, ArrowRight, Building2, Shield, Landmark, User, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ada/Reveal";

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: [
      { title: "Location de véhicules — ADA" },
      { name: "description", content: "Location courte et longue durée de véhicules en Côte d'Ivoire : berlines, SUV, 4x4, utilitaires." },
      { property: "og:title", content: "Location de véhicules — ADA" },
      { property: "og:description", content: "Votre véhicule idéal, disponible maintenant." },
    ],
    links: [{ rel: "canonical", href: "/location" }],
  }),
  component: LocationPage,
});

const segments = ["Particuliers", "Assurances", "Entreprises", "État & Institutions"] as const;

const vehicles = [
  { name: "Toyota Corolla", cat: "Berline", seats: 5, trans: "Automatique", fuel: "Essence", price: 35 },
  { name: "Hyundai Tucson", cat: "SUV", seats: 5, trans: "Automatique", fuel: "Essence", price: 55 },
  { name: "Toyota Hilux", cat: "Pick-up", seats: 5, trans: "Manuelle", fuel: "Diesel", price: 75 },
  { name: "Renault Kangoo", cat: "Utilitaire", seats: 2, trans: "Manuelle", fuel: "Diesel", price: 40 },
  { name: "Mercedes Classe C", cat: "Berline", seats: 5, trans: "Automatique", fuel: "Essence", price: 95 },
  { name: "Toyota Land Cruiser", cat: "SUV", seats: 7, trans: "Automatique", fuel: "Diesel", price: 120 },
];

const segmentCards = [
  { icon: User, t: "Particuliers", d: "Location courte durée flexible, week-end ou semaine." },
  { icon: Shield, t: "Maisons d'Assurance", d: "Véhicules de remplacement rapides pour vos assurés sinistrés. Partenariat direct avec les compagnies." },
  { icon: Building2, t: "Entreprises", d: "Flotte dédiée en longue durée avec gestion simplifiée et facturation mensuelle." },
  { icon: Landmark, t: "État & Institutions", d: "Véhicules de mission terrain robustes : 4x4, pick-ups, berlines de représentation." },
];

function LocationPage() {
  const [active, setActive] = useState<(typeof segments)[number]>("Particuliers");

  return (
    <>
      <section className="bg-gradient-to-b from-[var(--color-ada-yellow-soft)] to-white pt-20 pb-16">
        <div className="container-ada">
          <Reveal>
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-black/60">Location</span>
            <h1 className="mt-3 text-4xl md:text-6xl font-black tracking-tight max-w-3xl">
              Votre véhicule idéal,<br /><span className="text-ada-yellow">disponible maintenant.</span>
            </h1>
            <p className="mt-5 max-w-xl text-muted-foreground">
              Une flotte récente entretenue, des tarifs transparents, une réservation en quelques clics.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Tabs */}
      <section className="container-ada -mt-8">
        <div className="bg-white rounded-2xl shadow-[var(--shadow-premium)] p-2 flex flex-wrap gap-1">
          {segments.map((s) => (
            <button
              key={s}
              onClick={() => setActive(s)}
              className={`flex-1 min-w-[140px] rounded-xl px-4 py-3 text-sm font-semibold transition ${
                active === s ? "bg-ada-black text-white" : "text-ada-black/70 hover:bg-muted"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      {/* Vehicle grid */}
      <section className="container-ada py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((v, i) => (
            <Reveal key={v.name} delay={i * 0.05}>
              <article className="group rounded-2xl border border-border bg-white overflow-hidden hover:shadow-[var(--shadow-premium)] transition">
                <div className="relative aspect-[16/10] bg-gradient-to-br from-muted to-[var(--color-ada-yellow-soft)] grid place-items-center overflow-hidden">
                  <div className="absolute top-3 right-3 rounded-full bg-ada-black text-ada-yellow text-[11px] font-bold px-3 py-1">
                    {v.cat}
                  </div>
                  <svg viewBox="0 0 200 100" className="h-32 w-auto text-ada-black/80 group-hover:scale-105 transition" fill="currentColor">
                    <path d="M20 70 Q30 40 60 38 L130 38 Q160 40 180 60 L185 70 Q188 78 180 80 L160 80 A14 14 0 1 1 132 80 L80 80 A14 14 0 1 1 52 80 L25 80 Q18 78 20 70 Z" />
                    <circle cx="66" cy="80" r="9" fill="#F5C200" />
                    <circle cx="146" cy="80" r="9" fill="#F5C200" />
                  </svg>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold">{v.name}</h3>
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {v.seats} places</span>
                    <span className="inline-flex items-center gap-1"><Settings className="h-3.5 w-3.5" /> {v.trans}</span>
                    <span className="inline-flex items-center gap-1"><Fuel className="h-3.5 w-3.5" /> {v.fuel}</span>
                  </div>
                  <div className="mt-5 flex items-end justify-between">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">À partir de</div>
                      <div className="text-xl font-black text-ada-black">{v.price} 000 <span className="text-xs font-medium text-muted-foreground">FCFA / jour</span></div>
                    </div>
                    <button className="inline-flex items-center gap-1 rounded-full bg-ada-yellow text-ada-black font-semibold px-4 py-2 text-sm hover:brightness-95">
                      Réserver <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Segments */}
      <section className="container-ada py-16">
        <Reveal className="max-w-2xl">
          <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">Nos clients</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">Une solution pour chaque besoin.</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {segmentCards.map(({ icon: Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 0.07}>
              <div className="rounded-2xl border border-border bg-white p-6 h-full hover:border-ada-yellow transition">
                <div className="h-12 w-12 rounded-2xl bg-ada-yellow/15 text-ada-black grid place-items-center">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-bold text-lg">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="container-ada py-16">
        <Reveal className="max-w-2xl">
          <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">Comment ça marche</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">Quatre étapes, et c'est parti.</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-4 relative">
          {["Choisissez votre véhicule", "Indiquez vos dates", "Confirmez & payez", "Récupérez votre clé"].map((step, i) => (
            <Reveal key={step} delay={i * 0.08}>
              <div className="rounded-2xl bg-ada-black text-white p-6 h-full relative">
                <div className="text-ada-yellow font-black text-4xl">{String(i + 1).padStart(2, "0")}</div>
                <div className="mt-4 font-semibold flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-ada-yellow shrink-0 mt-0.5" />
                  {step}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
