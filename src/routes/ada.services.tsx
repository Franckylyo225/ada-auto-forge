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

export const Route = createFileRoute("/ada/services")({
  head: () => ({
    meta: [
      { title: "Services de Location — ADA Côte d'Ivoire · Particuliers & Entreprises" },
      { name: "description", content: "Location courte et longue durée à Abidjan. Berlines, SUV, 4x4 et utilitaires. Service premium pour assurances, entreprises et institutions." },
      { property: "og:title", content: "Services de Location ADA" },
      { property: "og:description", content: "La mobilité premium à votre rythme : courte et longue durée." },
    ],
    links: [{ rel: "canonical", href: "/ada/services" }],
  }),
  component: LocationPage,
});

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

const profiles = [
  {
    id: "particuliers",
    label: "Particuliers",
    icon: Users,
    image: imgParticuliers,
    title: "Voyagez en toute sérénité",
    text: "Une flotte récente, entretenue et adaptée à tous vos besoins : week-ends, vacances ou déplacements quotidiens.",
    points: ["Véhicules récents et fiables", "Tarifs transparents", "Assistance 24/7"],
  },
  {
    id: "assurances",
    label: "Assurances",
    icon: Shield,
    image: imgAssurances,
    title: "Véhicules de remplacement",
    text: "Partenaire de référence des assureurs, nous prenons en charge vos clients sinistrés avec rapidité et professionnalisme.",
    points: ["Mise à disposition sous 2h", "Facturation directe assurance", "Gestion administrative simplifiée"],
  },
  {
    id: "entreprises",
    label: "Entreprises",
    icon: Building2,
    image: imgEntreprises,
    title: "Mobilité longue durée (LLD)",
    text: "Optimisez votre parc automobile avec nos contrats sur-mesure et une gestion de flotte externalisée performante.",
    points: ["Contrats longue durée flexibles", "Maintenance incluse", "Avantages fiscaux"],
  },
  {
    id: "etat",
    label: "État & Institutions",
    icon: Landmark,
    image: imgEtat,
    title: "Missions institutionnelles",
    text: "Accompagnement des administrations avec des véhicules conformes aux exigences officielles et protocolaires.",
    points: ["Marchés publics", "Véhicules protocolaires", "Disponibilité immédiate"],
  },
] as const;

const categories = [
  { name: "Berline", icon: Car, seats: 5, transmission: "Auto/BVM", fuel: "Essence/Diesel" },
  { name: "SUV / 4x4", icon: Car, seats: 5, transmission: "Auto", fuel: "Diesel" },
  { name: "Pick-up", icon: Truck, seats: 5, transmission: "BVM", fuel: "Diesel" },
  { name: "Minibus", icon: Truck, seats: 15, transmission: "BVM", fuel: "Diesel" },
  { name: "Utilitaire", icon: Truck, seats: 3, transmission: "BVM", fuel: "Diesel" },
  { name: "Prestige", icon: Car, seats: 5, transmission: "Auto", fuel: "Essence" },
] as const;

const steps = [
  { icon: ClipboardCheck, title: "Demande", text: "Formulaire en ligne ou WhatsApp." },
  { icon: Phone, title: "Confirmation", text: "Rappel sous 2h ouvrables." },
  { icon: FileText, title: "Contrat", text: "Signature simplifiée en agence." },
  { icon: KeyRound, title: "Départ", text: "Clés en main, prêt à rouler." },
] as const;

function LocationPage() {
  const [tab, setTab] = useState<(typeof profiles)[number]["id"]>("particuliers");
  const active = profiles.find((p) => p.id === tab)!;

  return (
    <>
      {/* HERO */}
      <section className="bg-ada-black text-white">
        <div className="container-ada py-20 md:py-28 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-ada-yellow/15 text-ada-yellow px-3 py-1 text-xs font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-ada-yellow" />
              Location Courte & Longue Durée
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
              La mobilité <span className="text-ada-yellow text-shadow-yellow">premium</span>,
              <span className="block italic font-serif font-light text-white/90">à votre rythme.</span>
            </h1>
            <p className="mt-6 text-white/70 text-lg max-w-xl leading-relaxed">
              Que vous soyez un particulier ou une organisation, ADA propose une flotte 
              diversifiée et un service sur-mesure pour garantir votre liberté de mouvement.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/ada/reservation"
                className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-semibold px-6 py-3.5 hover:brightness-95 transition shadow-[var(--shadow-yellow)]"
              >
                Réserver en ligne <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://wa.me/2250700282930"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white font-semibold px-6 py-3.5 hover:bg-white hover:text-ada-black transition"
              >
                <MessageSquare className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="absolute -inset-10 bg-ada-yellow/10 blur-[100px] rounded-full" />
              <img
                src={heroSuv}
                alt="Flotte Premium ADA"
                className="relative w-full aspect-[5/4] object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white border-b border-border">
        <div className="container-ada py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          {[
            { n: 150, s: "+", l: "Véhicules en flotte" },
            { n: 10, s: "+", l: "Années d'expérience" },
            { n: 5000, s: "+", l: "Clients satisfaits" },
            { n: 2, s: "h", l: "Délai de réponse max" },
          ].map((stat, i) => (
            <Reveal key={stat.l} delay={i * 0.05}>
              <div className="text-3xl md:text-4xl font-black text-ada-black">
                <CountUp to={stat.n} suffix={stat.s} />
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                {stat.l}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROFILES TABS */}
      <section className="bg-[var(--color-ada-yellow-soft)]/40 py-20 md:py-24">
        <div className="container-ada">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">Sur-mesure</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight">Une solution pour chaque besoin.</h2>
          </Reveal>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {profiles.map((p) => {
              const selected = tab === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setTab(p.id)}
                  className={`relative px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                    selected ? "bg-ada-black text-white shadow-lg" : "bg-white text-ada-black/60 hover:text-ada-black border border-border"
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <p.icon className="h-4 w-4" /> {p.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid lg:grid-cols-[1fr_1.1fr] gap-8 md:gap-12 items-center bg-white rounded-[2.5rem] p-6 md:p-12 shadow-[var(--shadow-premium)]"
              >
                <div className="relative group overflow-hidden rounded-2xl">
                  <img src={active.image} alt={active.label} className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight">{active.title}</h3>
                  <p className="mt-5 text-muted-foreground text-lg leading-relaxed">{active.text}</p>
                  <ul className="mt-8 grid sm:grid-cols-1 gap-4">
                    {active.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-ada-yellow/20 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="h-4 w-4 text-ada-black" />
                        </div>
                        <span className="text-ada-black/80 font-medium">{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10">
                    <Link
                      to="/ada/reservation"
                      className="inline-flex items-center gap-2 rounded-full bg-ada-black text-white font-bold px-8 py-4 hover:brightness-110 transition shadow-xl"
                    >
                      Demander un devis <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* FLOTTE */}
      <section className="bg-white py-20 md:py-24 text-ada-black">
        <div className="container-ada">
          <Reveal>
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">Notre Flotte</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight">Le choix de la performance.</h2>
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.05}>
                <div className="group h-full rounded-2xl border border-border bg-white p-6 hover:border-ada-yellow hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-center justify-between">
                    <div className="h-14 w-14 rounded-2xl bg-ada-yellow text-ada-black grid place-items-center group-hover:scale-110 transition-transform">
                      <c.icon className="h-7 w-7" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Catégorie</span>
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{c.name}</h3>
                  <div className="mt-6 flex flex-wrap gap-4 text-xs text-ada-black/60 font-semibold">
                    <div className="flex items-center gap-1.5"><Users className="h-4 w-4 text-ada-yellow" /> {c.seats} pers.</div>
                    <div className="flex items-center gap-1.5"><Settings2 className="h-4 w-4 text-ada-yellow" /> {c.transmission}</div>
                    <div className="flex items-center gap-1.5"><Fuel className="h-4 w-4 text-ada-yellow" /> {c.fuel}</div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                     <Link to="/ada/reservation" className="text-sm font-bold hover:text-ada-yellow transition-colors">Réserver</Link>
                     <ArrowRight className="h-4 w-4 text-ada-yellow group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-ada-black text-white py-20 md:py-24">
        <div className="container-ada">
          <Reveal className="text-center max-w-2xl mx-auto">
             <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">Simplicité</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight">Votre véhicule en 4 étapes.</h2>
          </Reveal>

          <div className="mt-16 relative grid md:grid-cols-4 gap-12">
            <div className="hidden md:block absolute top-7 left-[12%] right-[12%] border-t border-dashed border-white/20" />
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="relative text-center group">
                  <div className="relative mx-auto h-16 w-16 rounded-full bg-ada-yellow text-ada-black grid place-items-center font-black group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,232,0,0.3)]">
                    <s.icon className="h-7 w-7" />
                    <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-white text-ada-black text-xs grid place-items-center font-black border-2 border-ada-black">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-white">{s.title}</h3>
                  <p className="mt-3 text-sm text-white/50 leading-relaxed max-w-[200px] mx-auto">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-white py-20">
        <div className="container-ada">
          <Reveal>
            <div className="rounded-[3rem] bg-[var(--color-ada-yellow-soft)]/60 border border-ada-yellow/20 p-10 md:p-20 text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-ada-yellow/10 rounded-full -mr-32 -mt-32 blur-3xl" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-ada-yellow/10 rounded-full -ml-32 -mb-32 blur-3xl" />
               
               <h2 className="relative text-3xl md:text-5xl font-black tracking-tight">Prêt à prendre la route ?</h2>
               <p className="relative mt-6 max-w-2xl mx-auto text-muted-foreground text-lg leading-relaxed">
                 Nos agents sont à votre écoute pour vous proposer le véhicule idéal 
                 au meilleur tarif. Réponse garantie sous 2 heures.
               </p>
               <div className="relative mt-10 flex flex-wrap justify-center gap-4">
                 <Link
                   to="/ada/reservation"
                   className="inline-flex items-center gap-2 rounded-full bg-ada-black text-white font-bold px-8 py-4 hover:brightness-110 transition shadow-2xl"
                 >
                   Faire une demande <ArrowRight className="h-4 w-4" />
                 </Link>
                 <a
                   href="https://wa.me/2250700282930"
                   target="_blank"
                   rel="noreferrer"
                   className="inline-flex items-center gap-2 rounded-full bg-white text-ada-black font-bold px-8 py-4 border border-border hover:bg-muted transition"
                 >
                   <MessageSquare className="h-5 w-5" /> Parler à un conseiller
                 </a>
               </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
