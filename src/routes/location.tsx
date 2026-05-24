import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight, Phone, Check, Car, Calendar, ShieldCheck, Handshake,
  Zap, FileText, Headphones, BarChart3, Wrench, UserCog, Repeat,
  Mountain, FileCheck, Receipt, Shield, Users, Settings, Fuel,
  ClipboardList, PhoneCall, FileSignature, KeyRound, Star,
  Building2, Landmark, User as UserIcon, MessageCircle, Sparkles
} from "lucide-react";
import { Reveal } from "@/components/ada/Reveal";
import heroSuv from "@/assets/loc-hero-suv.jpg";
import imgParticuliers from "@/assets/loc-particuliers.jpg";
import imgAssurances from "@/assets/loc-assurances.jpg";
import imgEntreprises from "@/assets/loc-entreprises.jpg";
import imgEtat from "@/assets/loc-etat.jpg";

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: [
      { title: "Location de véhicules — ADA Côte d'Ivoire" },
      { name: "description", content: "Location courte et longue durée pour particuliers, entreprises, assurances et institutions. Flotte récente, disponibilité immédiate." },
      { property: "og:title", content: "Location de véhicules — ADA" },
      { property: "og:description", content: "Votre mobilité, notre engagement." },
    ],
    links: [{ rel: "canonical", href: "/location" }],
  }),
  component: LocationPage,
});

/* ------------------------------- CountUp ------------------------------- */
function CountUp({ end, duration = 1600, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ------------------------------- Data ------------------------------- */
const stats = [
  { icon: Car, end: 100, suffix: "+", label: "Véhicules disponibles" },
  { icon: Sparkles, end: 10, suffix: "+", label: "Années d'expérience" },
  { icon: Handshake, end: 500, suffix: "+", label: "Clients satisfaits" },
  { icon: Building2, end: 3, suffix: "", label: "Agences à Abidjan" },
];

const tabs = [
  { id: "particuliers", label: "Particuliers", icon: UserIcon },
  { id: "assurances", label: "Assurances", icon: Shield },
  { id: "entreprises", label: "Entreprises", icon: Building2 },
  { id: "etat", label: "État", icon: Landmark },
] as const;

type TabId = (typeof tabs)[number]["id"];

const fleet = [
  { t: "Berline citadine", d: "Confort et économie pour vos trajets quotidiens.", seats: "5 places", trans: "Manuelle/Auto", fuel: "Essence" },
  { t: "SUV / 4x4", d: "Puissance et polyvalence, route ou piste.", seats: "5-7 places", trans: "Automatique", fuel: "Diesel" },
  { t: "Pick-up", d: "Robustesse pour les missions terrain difficiles.", seats: "4-5 places", trans: "Manuelle", fuel: "Diesel" },
  { t: "Utilitaire / Minibus", d: "Transport de groupe ou de marchandises.", seats: "9-15 places", trans: "Manuelle", fuel: "Diesel/Essence" },
  { t: "Véhicule de prestige", d: "Représentation et confort premium.", seats: "5 places", trans: "Automatique", fuel: "Essence/Hybride" },
];

const steps = [
  { icon: ClipboardList, t: "Remplissez le formulaire", d: "Décrivez votre besoin en 2 minutes : type de véhicule, dates, usage." },
  { icon: PhoneCall, t: "On vous rappelle", d: "Un agent ADA vous contacte sous 2h pour confirmer la disponibilité et le tarif." },
  { icon: FileSignature, t: "Signez votre contrat", d: "Votre contrat de location est établi et signé lors de la remise des clés." },
  { icon: KeyRound, t: "Prenez la route", d: "Votre véhicule est prêt, entretenu et assuré. Bonne route !" },
];

const testimonials = [
  { q: "J'avais besoin d'un véhicule en urgence pour un déplacement professionnel. ADA m'a rappelé en 1h et j'avais les clés le lendemain matin.", a: "Kouamé A.", r: "Directeur commercial, Abidjan" },
  { q: "Notre compagnie travaille avec ADA pour les véhicules de remplacement. Réactivité et professionnalisme au rendez-vous à chaque sinistre.", a: "Marie-Claire D.", r: "Chargée de sinistres, SAAR" },
  { q: "En tant que responsable logistique, j'apprécie la flotte variée et la facturation claire. Un vrai partenaire de confiance.", a: "Ibrahim T.", r: "Responsable logistique, ONG terrain" },
];

/* ------------------------------- Page ------------------------------- */
function LocationPage() {
  const [active, setActive] = useState<TabId>("particuliers");

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="relative bg-ada-black text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-ada-yellow/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/3 h-72 w-72 rounded-full bg-ada-yellow/5 blur-3xl" />
        </div>
        <div className="container-ada relative grid lg:grid-cols-2 gap-10 items-center py-20 md:py-28">
          <Reveal>
            <span className="inline-flex items-center rounded-full bg-ada-yellow text-ada-black text-xs font-bold px-4 py-1.5">
              Location courte & longue durée
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
              Votre mobilité,<br /><span className="text-ada-yellow">notre engagement.</span>
            </h1>
            <p className="mt-5 max-w-xl text-white/70 text-lg">
              Particuliers, entreprises, compagnies d'assurance ou institutions — ADA met à votre disposition des véhicules adaptés à chaque besoin, immédiatement disponibles.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-bold px-6 py-3 hover:brightness-95 transition">
                Faire une demande <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="tel:+2250700282930" className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white font-semibold px-6 py-3 hover:bg-white/10 transition">
                <Phone className="h-4 w-4" /> Nous appeler
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/70">
              {["Flotte récente et entretenue", "Disponibilité 6j/7", "Livraison possible"].map((t, i) => (
                <span key={t} className="inline-flex items-center gap-2">
                  {i > 0 && <span className="hidden sm:inline text-white/30">•</span>}
                  <Check className="h-4 w-4 text-ada-yellow" /> {t}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-ada-yellow/20 blur-2xl" />
              <img src={heroSuv} alt="SUV noir premium ADA" width={1280} height={1024} className="relative rounded-3xl object-cover w-full aspect-[5/4] shadow-2xl" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 2 — STATS */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-ada">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map(({ icon: Icon, end, suffix, label }, i) => (
              <Reveal key={label} delay={i * 0.08}>
                <div className="rounded-2xl border border-border bg-white p-6 text-center hover:shadow-[var(--shadow-premium)] transition">
                  <div className="mx-auto h-12 w-12 rounded-2xl bg-ada-yellow/15 text-ada-black grid place-items-center">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="mt-4 text-4xl md:text-5xl font-black text-ada-yellow tracking-tight">
                    <CountUp end={end} suffix={suffix} />
                  </div>
                  <div className="mt-2 text-sm font-medium text-ada-black/70">{label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — SOLUTIONS PAR PROFIL */}
      <section className="py-20 md:py-24 bg-[var(--color-ada-yellow-soft)]/40">
        <div className="container-ada">
          <Reveal className="max-w-2xl">
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">Nos solutions</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight">Une solution pour chaque besoin</h2>
            <p className="mt-4 text-muted-foreground">
              Que vous soyez un particulier, une entreprise, une assurance ou une institution, ADA a la formule qu'il vous faut.
            </p>
          </Reveal>

          {/* Tabs */}
          <div className="mt-10 border-b border-border flex flex-wrap gap-1">
            {tabs.map(({ id, label, icon: Icon }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  className={`relative inline-flex items-center gap-2 px-5 py-3 text-sm md:text-base transition ${
                    isActive ? "text-ada-black font-bold" : "text-ada-black/60 hover:text-ada-black font-medium"
                  }`}
                >
                  <Icon className="h-4 w-4" /> {label}
                  {isActive && (
                    <motion.span
                      layoutId="tab-underline"
                      className="absolute left-0 right-0 -bottom-px h-1 bg-ada-yellow rounded-t"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div className="mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {active === "particuliers" && <TabParticuliers />}
                {active === "assurances" && <TabAssurances />}
                {active === "entreprises" && <TabEntreprises />}
                {active === "etat" && <TabEtat />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 4 — FLOTTE */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-ada">
          <Reveal className="max-w-2xl">
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">Notre flotte</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight">Une flotte pour tous les besoins</h2>
            <p className="mt-4 text-muted-foreground">
              Nos véhicules sont sélectionnés pour leur fiabilité, leur confort et leur entretien régulier.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fleet.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.06}>
                <article className="group rounded-2xl border border-border bg-white overflow-hidden hover:shadow-[var(--shadow-premium)] hover:border-ada-yellow transition">
                  <div className="relative aspect-[16/10] bg-gradient-to-br from-muted to-[var(--color-ada-yellow-soft)] grid place-items-center overflow-hidden">
                    <svg viewBox="0 0 200 100" className="h-28 w-auto text-ada-black/80 group-hover:scale-105 transition" fill="currentColor">
                      <path d="M20 70 Q30 40 60 38 L130 38 Q160 40 180 60 L185 70 Q188 78 180 80 L160 80 A14 14 0 1 1 132 80 L80 80 A14 14 0 1 1 52 80 L25 80 Q18 78 20 70 Z" />
                      <circle cx="66" cy="80" r="9" fill="#F5C200" />
                      <circle cx="146" cy="80" r="9" fill="#F5C200" />
                    </svg>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg">{v.t}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {v.seats}</span>
                      <span className="inline-flex items-center gap-1"><Settings className="h-3.5 w-3.5" /> {v.trans}</span>
                      <span className="inline-flex items-center gap-1"><Fuel className="h-3.5 w-3.5" /> {v.fuel}</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <p className="text-muted-foreground">Vous avez un besoin spécifique ? Contactez-nous.</p>
            <Link to="/contact" className="mt-4 inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-bold px-6 py-3 hover:brightness-95 transition">
              Faire une demande <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* SECTION 5 — COMMENT ÇA MARCHE */}
      <section className="py-20 md:py-24" style={{ backgroundColor: "#FFF9E6" }}>
        <div className="container-ada">
          <Reveal className="max-w-2xl">
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">Le process</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight">En 4 étapes simples</h2>
          </Reveal>

          <div className="mt-12 relative">
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] border-t-2 border-dashed border-ada-yellow/60" />
            <div className="grid gap-6 md:grid-cols-4 relative">
              {steps.map(({ icon: Icon, t, d }, i) => (
                <Reveal key={t} delay={i * 0.08}>
                  <div className="text-center md:text-left">
                    <div className="mx-auto md:mx-0 relative h-16 w-16 rounded-2xl bg-ada-yellow text-ada-black grid place-items-center shadow-[var(--shadow-yellow)]">
                      <Icon className="h-7 w-7" />
                      <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-ada-black text-ada-yellow text-xs font-black grid place-items-center">{i + 1}</span>
                    </div>
                    <h3 className="mt-5 font-bold text-lg">{t}</h3>
                    <p className="mt-2 text-sm text-ada-black/70 leading-relaxed">{d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="mt-14 text-center">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-ada-black text-ada-yellow font-bold px-8 py-4 text-lg hover:brightness-110 transition">
              Je fais ma demande maintenant <ArrowRight className="h-5 w-5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* SECTION 6 — TÉMOIGNAGES */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-ada">
          <Reveal className="max-w-2xl">
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">Témoignages</span>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight">Ils nous font confiance</h2>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.a} delay={i * 0.07}>
                <div className="h-full rounded-2xl border border-border bg-white p-7 hover:shadow-[var(--shadow-premium)] transition">
                  <div className="flex gap-0.5 text-ada-yellow">
                    {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="mt-5 text-ada-black/80 leading-relaxed">"{t.q}"</p>
                  <div className="mt-6 pt-5 border-t border-border">
                    <div className="font-bold">{t.a}</div>
                    <div className="text-sm text-muted-foreground">{t.r}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — CTA FINAL */}
      <section className="bg-ada-black text-white">
        <div className="container-ada py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Prêt à louer votre prochain véhicule ?</h2>
            <p className="mt-3 text-white/70">Notre équipe répond sous 2 heures. Aucun engagement avant confirmation.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-3 md:items-end">
              <Link to="/contact" className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-ada-yellow text-ada-black font-bold px-6 py-4 hover:brightness-95 transition">
                Faire une demande <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="https://wa.me/2250700282930" target="_blank" rel="noreferrer" className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/30 text-white font-semibold px-6 py-4 hover:bg-white/10 transition">
                <MessageCircle className="h-4 w-4" /> Contacter via WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
        <Link to="/contact" className="flex items-center justify-center gap-2 rounded-full bg-ada-yellow text-ada-black font-bold px-6 py-4 shadow-[var(--shadow-yellow)]">
          Faire une demande <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}

/* ------------------------------- Tabs ------------------------------- */
function TwoCol({ image, alt, imageLeft = false, children }: { image: string; alt: string; imageLeft?: boolean; children: React.ReactNode }) {
  return (
    <div className="grid lg:grid-cols-2 gap-10 items-center">
      <div className={imageLeft ? "lg:order-1" : "lg:order-2"}>
        <img src={image} alt={alt} width={1024} height={1024} loading="lazy" className="rounded-2xl object-cover w-full aspect-[4/3] shadow-[var(--shadow-premium)]" />
      </div>
      <div className={imageLeft ? "lg:order-2" : "lg:order-1"}>{children}</div>
    </div>
  );
}

function YellowBadge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full bg-ada-yellow text-ada-black text-xs font-bold px-3 py-1">{children}</span>;
}

function BenefitsList({ items }: { items: { icon: React.ComponentType<{ className?: string }>; t: string }[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map(({ icon: Icon, t }) => (
        <li key={t} className="flex items-start gap-3">
          <span className="mt-0.5 h-8 w-8 rounded-lg bg-ada-yellow/15 text-ada-black grid place-items-center shrink-0">
            <Icon className="h-4 w-4" />
          </span>
          <span className="text-ada-black/80">{t}</span>
        </li>
      ))}
    </ul>
  );
}

function TabParticuliers() {
  return (
    <TwoCol image={imgParticuliers} alt="Couple devant un véhicule à Abidjan">
      <YellowBadge>Location courte durée</YellowBadge>
      <h3 className="mt-4 text-2xl md:text-3xl font-black tracking-tight">Partez l'esprit libre, quand vous voulez.</h3>
      <p className="mt-4 text-muted-foreground">
        Besoin d'un véhicule pour un week-end, une semaine ou un voyage ? ADA vous propose des voitures récentes, bien entretenues, à des tarifs transparents et sans mauvaises surprises.
      </p>
      <BenefitsList items={[
        { icon: Car, t: "Large choix : berlines, SUV, monospaces" },
        { icon: Calendar, t: "Réservation flexible, annulation facile" },
        { icon: ShieldCheck, t: "Véhicules assurés et contrôlés" },
        { icon: Handshake, t: "Prise en charge personnalisée" },
      ]} />
      <div className="mt-8">
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-bold px-6 py-3 hover:brightness-95 transition">
          Faire ma demande <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="mt-3 text-xs text-muted-foreground">Réponse de notre équipe sous 2 heures</p>
      </div>
    </TwoCol>
  );
}

function TabAssurances() {
  return (
    <TwoCol image={imgAssurances} alt="Véhicule de remplacement livré" imageLeft>
      <YellowBadge>Véhicules de remplacement</YellowBadge>
      <h3 className="mt-4 text-2xl md:text-3xl font-black tracking-tight">Vos assurés méritent une solution rapide.</h3>
      <p className="mt-4 text-muted-foreground">
        En cas de sinistre, chaque heure compte. ADA est le partenaire des compagnies d'assurance pour la mise à disposition rapide de véhicules de remplacement conformes aux engagements contractuels.
      </p>
      <BenefitsList items={[
        { icon: Zap, t: "Mise à disposition en moins de 24h" },
        { icon: FileText, t: "Facturation directe à la compagnie" },
        { icon: Car, t: "Flotte dédiée toujours disponible" },
        { icon: Headphones, t: "Interlocuteur dédié pour les gestionnaires sinistres" },
      ]} />
      <div className="mt-8 rounded-2xl bg-ada-yellow text-ada-black p-6">
        <p className="font-bold">Vous êtes une compagnie d'assurance ?</p>
        <p className="text-sm mt-1">Discutons d'un accord-cadre.</p>
        <Link to="/contact" className="mt-4 inline-flex items-center gap-2 rounded-full bg-ada-black text-ada-yellow font-bold px-5 py-2.5 hover:brightness-110 transition">
          Prendre contact <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </TwoCol>
  );
}

function TabEntreprises() {
  return (
    <TwoCol image={imgEntreprises} alt="Responsable et flotte d'entreprise">
      <YellowBadge>Location longue durée & flotte</YellowBadge>
      <h3 className="mt-4 text-2xl md:text-3xl font-black tracking-tight">Externalisez votre flotte, concentrez-vous sur votre cœur de métier.</h3>
      <p className="mt-4 text-muted-foreground">
        De la berline de direction au véhicule utilitaire, ADA gère votre mobilité professionnelle en longue durée avec une flotte récente, un entretien inclus et une facturation mensuelle simplifiée.
      </p>
      <BenefitsList items={[
        { icon: BarChart3, t: "Facturation mensuelle et reporting" },
        { icon: Wrench, t: "Entretien et maintenance inclus" },
        { icon: UserCog, t: "Gestionnaire de compte dédié" },
        { icon: Repeat, t: "Remplacement rapide en cas de panne" },
      ]} />
      <div className="mt-6 grid sm:grid-cols-3 gap-3">
        {[
          { t: "Contrat flexible", d: "De 1 mois à 3 ans" },
          { t: "Flotte sur mesure", d: "Selon vos besoins" },
          { t: "Zéro immobilisation", d: "Remplacement garanti" },
        ].map((c) => (
          <div key={c.t} className="rounded-xl border border-border p-4 bg-white">
            <div className="font-bold text-sm">{c.t}</div>
            <div className="text-xs text-muted-foreground mt-1">{c.d}</div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-bold px-6 py-3 hover:brightness-95 transition">
          Obtenir un devis entreprise <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </TwoCol>
  );
}

function TabEtat() {
  return (
    <TwoCol image={imgEtat} alt="4x4 sur terrain rural" imageLeft>
      <YellowBadge>Véhicules de mission terrain</YellowBadge>
      <h3 className="mt-4 text-2xl md:text-3xl font-black tracking-tight">La robustesse au service de l'intérêt général.</h3>
      <p className="mt-4 text-muted-foreground">
        Ministères, mairies, projets de développement, ONG — ADA fournit des véhicules adaptés aux missions terrain les plus exigeantes : 4x4 tout-terrain, pick-ups, véhicules de représentation.
      </p>
      <BenefitsList items={[
        { icon: Mountain, t: "4x4 et pick-ups pour terrains difficiles" },
        { icon: FileCheck, t: "Conformité aux procédures de marchés publics" },
        { icon: Receipt, t: "Facturation institutionnelle et documentée" },
        { icon: Shield, t: "Véhicules assurés tous risques" },
      ]} />
      <div className="mt-6 flex flex-wrap gap-2">
        {["Toyota Land Cruiser", "Pick-up double cabine", "Berline de représentation", "Minibus"].map((tag) => (
          <span key={tag} className="inline-flex items-center rounded-full border border-ada-black/15 bg-white px-3 py-1.5 text-xs font-semibold text-ada-black">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-8">
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-bold px-6 py-3 hover:brightness-95 transition">
          Nous soumettre votre besoin <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </TwoCol>
  );
}
