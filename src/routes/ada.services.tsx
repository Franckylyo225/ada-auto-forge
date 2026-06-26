import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight, Users, Shield, Building2, Landmark, Car, Truck,
  CheckCircle2, Phone, MessageSquare, FileText, KeyRound, ClipboardCheck,
  Fuel, Settings2,
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
      { name: "description", content: "Location courte & longue durée pour particuliers, assurances, entreprises et institutions. Une flotte moderne et un service ADA premium." },
      { property: "og:title", content: "Location de véhicules — ADA Côte d'Ivoire" },
      { property: "og:description", content: "Location courte & longue durée — flotte moderne, service premium ADA." },
    ],
    links: [{ rel: "canonical", href: "/location" }],
  }),
  component: LocationPage,
});

/* ------------------------------ Animated count ----------------------------- */
function CountUp({ to, suffix = "", duration = 1400 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref}>{n.toLocaleString("fr-FR")}{suffix}</span>;
}

/* --------------------------------- Tabs data -------------------------------- */
const profiles = [
  {
    id: "particuliers",
    label: "Particuliers",
    icon: Users,
    image: imgParticuliers,
    title: "Voyagez en toute sérénité",
    text: "Que ce soit pour un week-end, des vacances en famille ou un déplacement professionnel, ADA vous propose une flotte récente, entretenue et adaptée à tous vos besoins.",
    points: ["Véhicules récents et fiables", "Tarifs transparents", "Assistance 24/7"],
  },
  {
    id: "assurances",
    label: "Assurances",
    icon: Shield,
    image: imgAssurances,
    title: "Véhicules de remplacement",
    text: "Partenaire de référence des compagnies d'assurance, ADA prend en charge vos clients sinistrés avec un véhicule de remplacement rapide et conforme.",
    points: ["Mise à disposition sous 24h", "Facturation directe assurance", "Gestion administrative simplifiée"],
  },
  {
    id: "entreprises",
    label: "Entreprises",
    icon: Building2,
    image: imgEntreprises,
    title: "Mobilité longue durée",
    text: "Optimisez la mobilité de vos collaborateurs avec nos contrats sur-mesure : location longue durée, flotte dédiée, véhicules de fonction.",
    points: ["Contrats longue durée", "Gestion de flotte dédiée", "Conditions négociées"],
  },
  {
    id: "etat",
    label: "État & Institutions",
    icon: Landmark,
    image: imgEtat,
    title: "Missions institutionnelles",
    text: "ADA accompagne les administrations et institutions avec des véhicules adaptés aux missions officielles, protocolaires et de terrain.",
    points: ["Marchés publics", "Véhicules protocolaires", "Conformité administrative"],
  },
] as const;

/* --------------------------------- Fleet ----------------------------------- */
const categories = [
  { name: "Berline", icon: Car, seats: 5, transmission: "Auto/BVM", fuel: "Essence/Diesel" },
  { name: "SUV / 4x4", icon: Car, seats: 5, transmission: "Auto", fuel: "Diesel" },
  { name: "Pick-up", icon: Truck, seats: 5, transmission: "BVM", fuel: "Diesel" },
  { name: "Minibus", icon: Truck, seats: 15, transmission: "BVM", fuel: "Diesel" },
  { name: "Utilitaire", icon: Truck, seats: 3, transmission: "BVM", fuel: "Diesel" },
  { name: "Prestige", icon: Car, seats: 5, transmission: "Auto", fuel: "Essence" },
] as const;

/* --------------------------------- Process --------------------------------- */
const steps = [
  { icon: ClipboardCheck, title: "Faites votre demande", text: "Remplissez le formulaire en ligne en 2 minutes." },
  { icon: Phone, title: "Confirmation ADA", text: "Notre équipe vous rappelle sous 2h ouvrables." },
  { icon: FileText, title: "Signature du contrat", text: "Présentation des pièces et signature en agence." },
  { icon: KeyRound, title: "Prise en charge", text: "Récupérez votre véhicule, prêt à rouler." },
] as const;

/* ============================== PAGE ==================================== */
function LocationPage() {
  const [tab, setTab] = useState<(typeof profiles)[number]["id"]>("particuliers");
  const active = profiles.find((p) => p.id === tab)!;

  return (
    <>
      {/* HERO */}
      <section className="bg-ada-black text-white overflow-hidden">
        <div className="container-ada py-16 md:py-24 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal>
            <span className="inline-flex items-center rounded-full bg-ada-yellow text-ada-black text-xs font-bold px-4 py-1.5">
              Location courte & longue durée
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
              La mobilité <span className="text-ada-yellow">premium</span>, à votre rythme.
            </h1>
            <p className="mt-5 max-w-xl text-white/70 text-lg">
              ADA met à votre disposition une flotte moderne et un service sur-mesure, pour les particuliers, les
              assurances, les entreprises et les institutions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/reservation"
                className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-bold px-6 py-3.5 hover:brightness-95 transition shadow-[var(--shadow-yellow)]"
              >
                Faire une demande <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white font-semibold px-6 py-3.5 hover:bg-white/10 transition"
              >
                Nous contacter
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-ada-yellow/20 blur-3xl" />
              <img
                src={heroSuv}
                alt="SUV premium ADA"
                className="relative rounded-2xl object-cover w-full aspect-[5/4] shadow-2xl"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* KEY FIGURES */}
      <section className="bg-white py-16 md:py-20 border-b border-border">
        <div className="container-ada grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: 150, s: "+", l: "Véhicules dans la flotte" },
            { n: 20, s: "+", l: "Années d'expérience" },
            { n: 5000, s: "+", l: "Clients satisfaits" },
            { n: 24, s: "/7", l: "Assistance disponible" },
          ].map((k) => (
            <Reveal key={k.l}>
              <div className="text-4xl md:text-5xl font-black text-ada-black">
                <CountUp to={k.n} suffix={k.s} />
              </div>
              <div className="mt-2 text-sm text-muted-foreground font-medium">{k.l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROFILES TABS */}
      <section className="bg-[var(--color-ada-yellow-soft)]/40 py-20 md:py-24">
        <div className="container-ada">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">Une solution pour chaque profil</h2>
              <p className="mt-3 text-muted-foreground">
                Découvrez l'offre ADA adaptée à votre besoin.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 flex flex-wrap justify-center gap-2 md:gap-3">
            {profiles.map((p) => {
              const Icon = p.icon;
              const selected = tab === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setTab(p.id)}
                  className="relative px-5 py-3 rounded-full text-sm font-semibold transition"
                >
                  {selected && (
                    <motion.span
                      layoutId="tab-pill"
                      className="absolute inset-0 rounded-full bg-ada-black"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className={`relative inline-flex items-center gap-2 ${selected ? "text-white" : "text-ada-black/70 hover:text-ada-black"}`}>
                    <Icon className="h-4 w-4" /> {p.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="grid lg:grid-cols-2 gap-10 items-center bg-white rounded-3xl p-6 md:p-10 shadow-[var(--shadow-premium)]"
              >
                <img src={active.image} alt={active.label} className="rounded-2xl object-cover w-full aspect-[4/3]" />
                <div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight">{active.title}</h3>
                  <p className="mt-4 text-muted-foreground">{active.text}</p>
                  <ul className="mt-6 space-y-3">
                    {active.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-ada-yellow shrink-0 mt-0.5" />
                        <span className="text-ada-black/80">{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/reservation"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-bold px-6 py-3 hover:brightness-95 transition shadow-[var(--shadow-yellow)]"
                  >
                    Faire une demande <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* FLEET OVERVIEW */}
      <section className="bg-white py-20 md:py-24">
        <div className="container-ada">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">Notre flotte</h2>
              <p className="mt-3 text-muted-foreground">
                Une large gamme de véhicules pour répondre à tous les usages.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.name}>
                  <div className="group h-full rounded-2xl border border-border bg-white p-6 hover:border-ada-yellow hover:shadow-lg transition">
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-xl bg-ada-yellow/15 text-ada-black grid place-items-center group-hover:bg-ada-yellow transition">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Catégorie</span>
                    </div>
                    <h3 className="mt-5 text-xl font-bold">{c.name}</h3>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-ada-black/70">
                      <div className="flex items-center gap-1.5"><Users className="h-4 w-4 text-ada-yellow" /> {c.seats}</div>
                      <div className="flex items-center gap-1.5"><Settings2 className="h-4 w-4 text-ada-yellow" /> {c.transmission}</div>
                      <div className="flex items-center gap-1.5"><Fuel className="h-4 w-4 text-ada-yellow" /> {c.fuel}</div>
                    </div>
                    <Link
                      to="/reservation"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ada-black hover:text-ada-yellow transition"
                    >
                      Demander un devis <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-ada-black text-white py-20 md:py-24">
        <div className="container-ada">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">Comment ça marche ?</h2>
              <p className="mt-3 text-white/60">Un parcours simple, du clic aux clés.</p>
            </div>
          </Reveal>

          <div className="mt-14 relative grid md:grid-cols-4 gap-10">
            <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] border-t-2 border-dashed border-white/15" />
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={i * 0.08}>
                  <div className="relative text-center">
                    <div className="relative mx-auto h-14 w-14 rounded-full bg-ada-yellow text-ada-black grid place-items-center font-black">
                      <Icon className="h-6 w-6" />
                      <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-white text-ada-black text-xs grid place-items-center font-black">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                    <p className="mt-2 text-sm text-white/60">{s.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[var(--color-ada-yellow-soft)]/50 py-20 md:py-24">
        <div className="container-ada">
          <div className="rounded-3xl bg-ada-black text-white p-10 md:p-16 text-center shadow-[var(--shadow-premium)]">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Prêt à prendre la route ?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-white/70">
              Faites votre demande en ligne ou contactez-nous directement sur WhatsApp pour une réponse immédiate.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/reservation"
                className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-bold px-7 py-3.5 hover:brightness-95 transition shadow-[var(--shadow-yellow)]"
              >
                Faire une demande <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="https://wa.me/2250700282930"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white font-semibold px-7 py-3.5 hover:bg-white/10 transition"
              >
                <MessageSquare className="h-5 w-5" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="md:hidden fixed bottom-4 inset-x-4 z-40">
        <Link
          to="/reservation"
          className="flex items-center justify-center gap-2 rounded-full bg-ada-yellow text-ada-black font-bold py-4 shadow-[var(--shadow-yellow)]"
        >
          Faire une demande <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </>
  );
}
