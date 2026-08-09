import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useInView } from "framer-motion";

import brandToyota from "@/assets/brands/toyota.svg";
import brandRenault from "@/assets/brands/renault.svg";
import brandPeugeot from "@/assets/brands/peugeot.svg";
import brandCitroen from "@/assets/brands/citroen.svg";
import brandHyundai from "@/assets/brands/hyundai.svg";
import brandKia from "@/assets/brands/kia.svg";
import brandMercedes from "@/assets/brands/mercedes-benz.svg";
import brandVolkswagen from "@/assets/brands/volkswagen.svg";
import brandFord from "@/assets/brands/ford.svg";
import brandNissan from "@/assets/brands/nissan.svg";
import brandHonda from "@/assets/brands/honda.svg";
import brandMitsubishi from "@/assets/brands/mitsubishi.svg";
import brandSuzuki from "@/assets/brands/suzuki.svg";
import brandDacia from "@/assets/brands/dacia.svg";
import brandOpel from "@/assets/brands/opel.svg";
import brandBmw from "@/assets/brands/bmw.svg";
import brandFiat from "@/assets/brands/fiat.svg";
import brandLandRover from "@/assets/brands/land-rover.svg";
import brandIsuzu from "@/assets/brands/isuzu.svg";
import brandMahindra from "@/assets/brands/mahindra.svg";
import brandByd from "@/assets/brands/byd.svg";
import brandMg from "@/assets/brands/mg.svg";
import brandBaic from "@/assets/brands/baic.png";
import brandChery from "@/assets/brands/chery.svg";


import {
  ArrowRight,
  Phone,
  Check,
  Wrench,
  ShieldCheck,
  Home,
  BadgeCheck,
  PhoneCall,
  Search,
  ClipboardList,
  CheckCircle2,
  Clock,
  Star,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Reveal } from "@/components/ada/Reveal";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import heroNew from "@/assets/ipb-hero-new-cdn.png";
import heroWindshield from "@/assets/ipb-hero-windshield-cropped.jpg";
import heroAtelier from "@/assets/hero-parebrise.jpg";
import heroGifts from "@/assets/ipb-hero-gifts.jpg";
import cardRep from "@/assets/ipb-card-reparation-cdn.png";
import cardRemp from "@/assets/ipb-card-remplacement-cdn.png";
import cardLat from "@/assets/ipb-card-lateral-cdn.png";
import mobileInterventionAsset from "@/assets/ipb-mobile-intervention.jpg.asset.json";
const mobileIntervention = mobileInterventionAsset.url;





import { abs, SITE_URL } from "@/lib/seo";

const TITLE = "Ivoire Pare-Brise Abidjan — Réparation & remplacement pare-brise";
const DESC =
  "Ivoire Pare-Brise by ADA à Abidjan (Angré) : réparation d'impact, remplacement pare-brise et vitrages latéraux. Pièces homologuées, garantie 12 mois, intervention 45 min.";

export const Route = createFileRoute("/ipb/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: SITE_URL + "/ipb" },
      { property: "og:image", content: abs(heroNew) },
      { property: "og:image:alt", content: "Ivoire Pare-Brise — Atelier d'Angré, Abidjan" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: abs(heroNew) },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/ipb" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoRepair",
          name: "Ivoire Pare-Brise by ADA",
          image: abs(heroNew),
          url: SITE_URL + "/ipb",
          telephone: "+225 07 00 28 29 30",
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Angré nouveau CHU, Pharmacie Val d'Oise",
            addressLocality: "Cocody, Abidjan",
            addressCountry: "CI",
          },
          areaServed: "Abidjan",
          openingHours: "Mo-Sa 08:00-18:00",
        }),
      },
    ],
  }),
  component: IPBPage,
});

function CountUp({ end, suffix = "", duration = 1400 }: { end: number; suffix?: string; duration?: number }) {
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

const BRANDS = [
  { n: "Toyota", src: brandToyota }, { n: "Renault", src: brandRenault },
  { n: "Peugeot", src: brandPeugeot }, { n: "Citroën", src: brandCitroen },
  { n: "Hyundai", src: brandHyundai }, { n: "Kia", src: brandKia },
  { n: "Mercedes-Benz", src: brandMercedes }, { n: "Volkswagen", src: brandVolkswagen },
  { n: "Ford", src: brandFord }, { n: "Nissan", src: brandNissan },
  { n: "Honda", src: brandHonda }, { n: "Mitsubishi", src: brandMitsubishi },
  { n: "Suzuki", src: brandSuzuki }, { n: "Dacia", src: brandDacia },
  { n: "Opel", src: brandOpel }, { n: "BMW", src: brandBmw },
  { n: "Fiat", src: brandFiat }, { n: "Land Rover", src: brandLandRover },
  { n: "Isuzu", src: brandIsuzu }, { n: "Mahindra", src: brandMahindra },
  { n: "BYD", src: brandByd }, { n: "MG", src: brandMg },
  { n: "BAIC", src: brandBaic }, { n: "Chery", src: brandChery },
];


const FAQ = [
  {
    q: "Puis-je réparer mon pare-brise plutôt que le remplacer ?",
    a: "Dans la majorité des cas, un impact inférieur à 3 cm et éloigné du champ de vision peut être réparé. Si la fissure dépasse 30 cm ou traverse le champ de vision du conducteur, le remplacement est obligatoire. Notre diagnostic gratuit vous oriente vers la meilleure solution.",
  },
  {
    q: "Combien de temps dure une intervention ?",
    a: "Une réparation d'impact prend environ 45 minutes à 1 heure. Un remplacement complet de pare-brise nécessite 2 à 4 heures, plus un temps de séchage de 1 à 2 heures avant de pouvoir reprendre la route en toute sécurité.",
  },
  {
    q: "Intervenez-vous à domicile ou au bureau ?",
    a: "Oui, nous proposons des interventions en déplacement pour les réparations d'impact et certains remplacements. Contactez-nous pour vérifier la faisabilité selon votre localisation à Abidjan.",
  },
  {
    q: "Mon assurance prend-elle en charge le remplacement ?",
    a: "Si votre contrat d'assurance couvre les bris de glace, votre compagnie peut prendre en charge tout ou partie du coût. Ivoire Pare-Brise travaille directement avec plusieurs compagnies ivoiriennes. Apportez votre attestation d'assurance et nous gérons les démarches avec votre assureur.",
  },
  {
    q: "Utilisez-vous des pièces d'origine ?",
    a: "Nous utilisons des vitrages homologués OEM (équivalent constructeur) ou d'origine selon votre préférence et votre budget. Dans tous les cas, les pièces respectent les normes de sécurité constructeur.",
  },
  {
    q: "Quelle est la garantie sur votre travail ?",
    a: "Chaque remplacement de vitrage est garanti 12 mois pièces et pose. En cas de défaut d'étanchéité ou de problème lié à la pose, nous intervenons à nouveau sans frais supplémentaires.",
  },
];

function HeroCarousel({ onDevis }: { onDevis: () => void }) {
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
      img: heroWindshield,
      badge: (
        <>
          <span className="h-1.5 w-1.5 rounded-full bg-ada-yellow" />
          Ivoire Pare-Brise · by ADA
        </>
      ),
      title: (
        <>
          Votre pare-brise mérite<br />
          <span className="text-ada-yellow">une expertise.</span>
        </>
      ),
      desc:
        "Impact, fissure ou bris complet : techniciens professionnels, vitrages homologués constructeur et garantie 12 mois pièces & pose. Toutes marques, partout en Côte d'Ivoire.",
      ctaPrimaryLabel: "Demander un devis gratuit",
      ctaSecondary: { href: "tel:+22507002829830", label: "Nous appeler" },
    },
    {
      img: mobileIntervention,
      badge: (
        <>
          <Home className="h-3.5 w-3.5 text-ada-yellow" />
          Interventions à domicile & au bureau
        </>
      ),
      title: (
        <>
          Interventions mobiles,<br />
          <span className="text-ada-yellow">où vous êtes.</span>
        </>
      ),
      desc:
        "À domicile, au bureau ou sur votre lieu de travail, nos techniciens se déplacent pour une réparation d'impact ou un remplacement rapide. Vous ne bougez pas, nous venons à vous.",
      ctaPrimaryLabel: "Prendre rendez-vous",
      ctaSecondary: { href: "tel:+22507002829830", label: "Nous appeler" },
    },
    {
      img: heroGifts,
      badge: (
        <>
          <Star className="h-3.5 w-3.5 text-ada-yellow" />
          Offre partenaire
        </>
      ),
      title: (
        <>
          Cadeaux offerts à chaque pose,<br />
          <span className="text-ada-yellow">10 000 à 50 000 F.</span>
        </>
      ),
      desc:
        "À chaque intervention, repartez avec un bon d'essence et un bon d'achat supermarché. Une valeur de 10 000 F à 50 000 F offerte selon le partenariat en cours.",
      ctaPrimaryLabel: "Profiter de l'offre",
      ctaSecondary: { href: "tel:+22507002829830", label: "En savoir plus" },
    },
  ];

  return (
    <div className="relative overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {slides.map((s, i) => (
          <div key={i} className="flex-[0_0_100%] min-w-0 relative">
            <div className="absolute inset-0">
              <img src={s.img} alt="" className="h-full w-full object-cover" width={1920} height={1080} />
              <div className="absolute inset-0 bg-gradient-to-r from-ada-black/80 via-ada-black/55 to-ada-black/10" />
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
                  <button
                    type="button"
                    onClick={onDevis}
                    className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-semibold px-6 py-3.5 hover:brightness-95 transition shadow-[var(--shadow-yellow)]"
                  >
                    {s.ctaPrimaryLabel} <ArrowRight className="h-4 w-4" />
                  </button>
                  <a
                    href={s.ctaSecondary.href}
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white font-semibold px-6 py-3.5 hover:bg-white hover:text-ada-black transition"
                  >
                    <Phone className="h-4 w-4" /> {s.ctaSecondary.label}
                  </a>
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



function IPBPage() {
  const [devisOpen, setDevisOpen] = useState(false);
  const openDevis = () => setDevisOpen(true);
  return (
    <>
      {/* SECTION 1 — HERO */}
      <HeroCarousel onDevis={openDevis} />


      {/* SECTION 2 — CHIFFRES */}
      <section className="bg-ada-black text-white py-16">
        <div className="container-ada grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: 1000, s: "+", l: "Véhicules traités" },
            { n: 30, s: "+", l: "Marques en référence" },
            { n: 90, s: " min", l: "Délai max d'intervention" },
            { n: 100, s: "%", l: "Garantie pièces & pose" },
          ].map((stat, i) => (
            <Reveal key={stat.l} delay={i * 0.08}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                <div className="text-4xl md:text-5xl font-black text-ada-yellow tabular-nums">
                  <CountUp end={stat.n} suffix={stat.s} />
                </div>
                <div className="mt-2 text-sm text-white/70">{stat.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SECTION 3 — SERVICES */}
      <section className="container-ada py-20">
        <Reveal className="max-w-2xl">
          <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">Nos services</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">Ce que nous faisons</h2>
          <p className="mt-3 text-muted-foreground">
            Du simple impact à la vitre complète, nous avons la solution adaptée à votre véhicule.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              img: cardRep,
              icon: "🔧",
              title: "Réparation d'impact",
              desc:
                "Votre pare-brise présente un impact ou une petite fissure ? Dans la plupart des cas, il n'est pas nécessaire de le remplacer. Notre résine spéciale restaure la solidité et la transparence du verre en moins d'une heure.",
              feats: [
                "Intervention en moins de 90 minutes",
                "Résine haute résistance certifiée",
                "Traitement invisible après séchage",
                "Économique vs remplacement",
                "Nettoyage du véhicule après intervention",
              ],
              tag: "",
              featured: false,
            },
            {
              img: cardRemp,
              icon: "🪟",
              title: "Remplacement pare-brise",
              desc:
                "Quand la fissure est trop longue ou l'impact trop central, le remplacement s'impose. Nous utilisons uniquement des vitrages homologués, adaptés à votre modèle exact, posés selon les normes constructeur.",
              feats: [
                "Vitrage homologué constructeur ou équivalent OEM",
                "Mastic et joints neufs à chaque pose",
                "Temps de séchage respecté avant remise du véhicule",
                "Garantie 12 mois sur la pose",
                "Nettoyage du véhicule après intervention",
              ],
              featured: true,
            },
            {
              img: cardLat,
              icon: "🚘",
              title: "Vitrage latéral & lunette arrière",
              desc:
                "Vitre latérale cassée suite à un accident, une tentative d'effraction ou une panne de lève-vitre ? Nous remplaçons également les lunettes arrière, vitres de portes et déflecteurs toutes marques.",
              feats: [
                "Vitres de portes avant et arrière",
                "Lunette arrière (avec ou sans désembuage)",
                "Déflecteurs et triangles de custode",
                "Intervention rapide en atelier",
                "Nettoyage du véhicule après intervention",
              ],
              featured: false,
            },
          ].map((c, i) => (
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
                  <div className="h-11 w-11 rounded-2xl bg-ada-yellow text-ada-black grid place-items-center text-xl">
                    {c.icon}
                  </div>
                  <h3 className="mt-4 font-bold text-xl">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {c.feats.map((f) => (
                      <li key={f} className="flex gap-2">
                        <Check className="h-4 w-4 text-ada-yellow shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center justify-between">
                    {c.tag ? (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">{c.tag}</span>
                    ) : (
                      <span />
                    )}
                    <button type="button" onClick={openDevis} className="inline-flex items-center gap-1 text-sm font-semibold text-ada-yellow hover:underline">
                      En savoir plus <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SECTION 3b — INTERVENTIONS MOBILES */}
      <section className="bg-ada-black text-white py-20">
        <div className="container-ada">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={mobileIntervention}
                  alt="Technicien Ivoire Pare-Brise en intervention à domicile sur un pare-brise"
                  className="w-full h-full object-cover"
                  width={1024}
                  height={768}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ada-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/10 backdrop-blur border border-white/15 p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-ada-yellow text-ada-black grid place-items-center">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Service mobile</div>
                    <div className="text-xs text-white/70">+225 07 00 28 29 30</div>
                  </div>
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">Interventions à domicile</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold">
                  Nous venons à vous, où que vous soyez
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 text-white/75 leading-relaxed">
                  Pas le temps de passer à l'atelier ? Notre équipe mobile se déplace à votre domicile, au bureau, dans un parking ou sur le lieu de votre choix à Abidjan et environs. Même matériel, même qualité, même garantie.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    { icon: Home, label: "À domicile", desc: "Intervention dans votre cour ou devant chez vous" },
                    { icon: ShieldCheck, label: "Au bureau", desc: "Réparation pendant vos heures de travail" },
                    { icon: Clock, label: "Rapide", desc: "Même délai garanti qu'en atelier" },
                    { icon: CheckCircle2, label: "Sans surprise", desc: "Devis fixé avant déplacement" },
                  ].map(({ icon: Icon, label, desc }, i) => (
                    <div key={label} className="flex gap-3">
                      <div className="h-10 w-10 shrink-0 rounded-xl bg-white/10 border border-white/10 grid place-items-center">
                        <Icon className="h-5 w-5 text-ada-yellow" />
                      </div>
                      <div>
                        <div className="font-semibold">{label}</div>
                        <div className="text-sm text-white/60">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={openDevis}
                    className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-semibold px-6 py-3.5 hover:brightness-95 transition shadow-[var(--shadow-yellow)]"
                  >
                    Planifier un déplacement <ArrowRight className="h-4 w-4" />
                  </button>
                  <a
                    href="tel:+22507002829830"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white font-semibold px-6 py-3.5 hover:bg-white hover:text-ada-black transition"
                  >
                    <Phone className="h-4 w-4" /> Appeler maintenant
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — ENGAGEMENT */}

      <section style={{ backgroundColor: "#FFFBEC" }} className="py-20">
        <div className="container-ada">
          <Reveal className="max-w-2xl">
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-black/60">Pourquoi nous</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">Notre engagement qualité</h2>
            <p className="mt-3 text-muted-foreground">
              Chaque intervention est réalisée dans les règles de l'art, avec des matériaux de qualité et des techniciens professionnels.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              {
                icon: BadgeCheck,
                t: "Techniciens professionnels",
                d: "Notre équipe est formée aux techniques de pose et de réparation les plus récentes. Chaque intervention est réalisée avec précision et professionnalisme.",
              },
              {
                icon: Wrench,
                t: "Pièces homologuées",
                d: "Nous utilisons exclusivement des vitrages et consommables conformes aux normes constructeurs. Zéro compromis sur la qualité des matériaux.",
              },
              {
                icon: Home,
                t: "Atelier ou à domicile",
                d: "Venez nous rendre visite dans notre atelier ou demandez une intervention à votre domicile ou lieu de travail. Nous nous adaptons à votre emploi du temps.",
              },
              {
                icon: ShieldCheck,
                t: "Garantie sur chaque intervention",
                d: "Chaque remplacement est garanti 12 mois pièces et main d'œuvre. En cas de problème, nous intervenons à nouveau sans frais supplémentaires.",
              },
            ].map(({ icon: Icon, t, d }, i) => (
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

          <Reveal>
            <div className="mt-10 rounded-2xl bg-ada-black text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="text-lg md:text-xl font-semibold">
                Vous avez un doute sur votre pare-brise ?
              </div>
              <button
                type="button"
                onClick={openDevis}
                className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-semibold px-6 py-3 w-fit"
              >
                Diagnostic gratuit — Prendre RDV <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 5 — MARQUES */}
      <section className="container-ada py-20">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold">Toutes les marques, sans exception</h2>
          <p className="mt-3 text-muted-foreground">
            Nous intervenons sur tous les véhicules de tourisme et utilitaires du marché ivoirien.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {BRANDS.map((b) => (
            <div
              key={b.n}
              title={b.n}
              className="flex items-center justify-center rounded-xl border border-border bg-white h-20 px-4 hover:border-ada-black transition"
            >
              <img
                src={b.src}
                alt={`Logo ${b.n}`}
                loading="lazy"
                className="max-h-10 max-w-[85%] w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition"
              />
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Votre marque n'est pas listée ? Contactez-nous — nous intervenons sur la quasi-totalité des véhicules.
        </p>
      </section>

      {/* SECTION 6 — COMMENT ÇA MARCHE */}
      <section className="bg-white py-20 border-y border-border">
        <div className="container-ada">
          <Reveal className="max-w-2xl">
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">Process</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">Une intervention simple et rapide</h2>
          </Reveal>

          <div className="relative mt-12">
            <div className="hidden md:block absolute top-7 left-[8%] right-[8%] border-t-2 border-dashed border-ada-yellow/60" />
            <div className="grid gap-8 md:grid-cols-4 relative">
              {[
                { icon: PhoneCall, t: "Contactez-nous", d: "Par téléphone, WhatsApp ou via notre formulaire. Décrivez le problème et votre véhicule." },
                { icon: Search, t: "Diagnostic gratuit", d: "Apportez votre véhicule ou recevez notre technicien. Le diagnostic est offert, sans engagement." },
                { icon: ClipboardList, t: "Devis immédiat", d: "Vous recevez un devis clair et détaillé sur place. Pas de mauvaise surprise." },
                { icon: CheckCircle2, t: "Intervention & garantie", d: "Réparation ou remplacement effectué. Votre véhicule vous est rendu avec sa garantie." },
              ].map(({ icon: Icon, t, d }, i) => (
                <Reveal key={t} delay={i * 0.08}>
                  <div className="text-center md:px-2">
                    <div className="mx-auto h-14 w-14 rounded-full bg-ada-yellow text-ada-black grid place-items-center shadow-[var(--shadow-yellow)] relative z-10">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="mt-4 text-xs font-bold text-ada-yellow">ÉTAPE {i + 1}</div>
                    <div className="mt-1 font-semibold text-ada-black">{t}</div>
                    <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {[
              "Réparation impact : ~1h",
              "Remplacement pare-brise : 2 à 4h",
              "Vitrage latéral : 1 à 2h",
            ].map((t) => (
              <div
                key={t}
                className="inline-flex items-center gap-2 rounded-full bg-ada-yellow/15 text-ada-black px-4 py-2 text-sm font-medium"
              >
                <Clock className="h-4 w-4 text-ada-black/70" /> {t}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* SECTION 8 — CADEAUX OFFERTS */}
      <section className="bg-ada-black text-white py-20 overflow-hidden">
        <div className="container-ada">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal className="order-2 lg:order-1">
              <div className="relative grid grid-cols-2 gap-3">
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={giftClient}
                    alt="Cliente recevant un cadeau après son intervention pare-brise"
                    className="w-full h-72 md:h-96 object-cover"
                    width={512}
                    height={768}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ada-black/60 via-transparent to-transparent" />
                </div>
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={giftTaxi}
                    alt="Chauffeur de taxi recevant un bon de carburant et un bon d'achat"
                    className="w-full h-72 md:h-96 object-cover"
                    width={512}
                    height={768}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ada-black/60 via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-xl bg-ada-yellow text-ada-black px-5 py-2 text-center shadow-lg">
                  <div className="text-xs font-semibold">Valeur offerte</div>
                  <div className="text-lg font-black">10 000 F à 50 000 F</div>
                </div>
              </div>
            </Reveal>

            <div className="order-1 lg:order-2">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-ada-yellow/15 text-ada-yellow px-3 py-1 text-xs font-semibold">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  Offre partenaire exclusive
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 text-3xl md:text-4xl font-bold">
                  Des cadeaux offerts à chaque intervention
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 text-white/75 leading-relaxed">
                  Faites confiance à Ivoire Pare-Brise et repartez avec un cadeau utile. À chaque pose ou remplacement, nous vous offrons un <span className="text-ada-yellow font-semibold">bon de carburant</span> et un <span className="text-ada-yellow font-semibold">bon d'achat supermarché</span> selon notre partenariat en cours.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    { icon: "⛽", label: "Bon de carburant", desc: "Repartez avec le plein d'essence offert pour votre véhicule." },
                    { icon: "🛒", label: "Bon d'achat supermarché", desc: "Faites vos courses grâce à un chèque cadeau utilisable en grande surface." },
                  ].map(({ icon, label, desc }) => (
                    <div key={label} className="rounded-2xl bg-white/5 border border-white/10 p-5">
                      <div className="text-3xl">{icon}</div>
                      <div className="mt-3 font-semibold text-lg">{label}</div>
                      <p className="mt-1 text-sm text-white/60">{desc}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={openDevis}
                    className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-semibold px-6 py-3.5 hover:brightness-95 transition shadow-[var(--shadow-yellow)]"
                  >
                    Profiter de l'offre <ArrowRight className="h-4 w-4" />
                  </button>
                  <a
                    href="tel:+22507002829830"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white font-semibold px-6 py-3.5 hover:bg-white hover:text-ada-black transition"
                  >
                    <Phone className="h-4 w-4" /> Nous appeler
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 9 — FAQ */}
      <section className="bg-muted/40 py-20">
        <div className="container-ada max-w-3xl">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center">Questions fréquentes</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="mt-10 rounded-2xl bg-white border border-border px-6">
              {FAQ.map((item, i) => (
                <AccordionItem key={i} value={`q${i}`} className={i === FAQ.length - 1 ? "border-b-0" : ""}>
                  <AccordionTrigger className="text-left font-semibold py-5">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* SECTION 10 — CTA FINAL */}
      <section id="devis" className="bg-ada-black text-white py-20">
        <div className="container-ada grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full bg-ada-yellow/15 text-ada-yellow px-3 py-1 text-xs font-semibold">
              Devis gratuit & sans engagement
            </div>
            <h2 className="mt-5 text-4xl md:text-5xl font-bold">Votre pare-brise mérite le meilleur.</h2>
            <p className="mt-4 text-white/60 text-lg max-w-md">
              Devis en 1 minute, rappel sous 2 heures par un conseiller IPB avec un prix précis et un créneau d'intervention.
            </p>

          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
              <button
                type="button"
                onClick={openDevis}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ada-yellow text-ada-black font-semibold px-6 py-3.5 hover:brightness-95 transition"
              >
                Demander un devis gratuit <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="https://wa.me/2250700282930"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#25D366] text-[#25D366] font-semibold px-6 py-3 hover:bg-[#25D366] hover:text-white transition"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DIALOG — FORMULAIRE DE DEVIS */}
      <Dialog open={devisOpen} onOpenChange={setDevisOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto p-0">
          <div className="bg-ada-black text-white px-6 md:px-8 pt-6 pb-5 rounded-t-lg">
            <div className="inline-flex items-center gap-2 rounded-full bg-ada-yellow/15 text-ada-yellow px-3 py-1 text-xs font-semibold">
              Devis gratuit & sans engagement
            </div>
            <DialogHeader className="mt-3 space-y-1 text-left">
              <DialogTitle className="text-2xl font-bold text-white">Demander un devis</DialogTitle>
              <DialogDescription className="text-white/60">
                Remplissez le formulaire, notre équipe vous rappelle sous 2 heures.
              </DialogDescription>
            </DialogHeader>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDevisOpen(false);
              alert("Demande envoyée — notre équipe vous rappelle sous 2h.");
            }}
            className="bg-white text-ada-black p-6 md:p-8 space-y-4"
          >
            <div>
              <Label htmlFor="brand">Marque du véhicule *</Label>
              <Input id="brand" required placeholder="Ex: Toyota Corolla" className="mt-1.5" />
            </div>
            <div>
              <Label>Type d'intervention *</Label>
              <Select required>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Sélectionnez un service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reparation">Réparation d'impact</SelectItem>
                  <SelectItem value="pb-avant">Remplacement pare-brise avant</SelectItem>
                  <SelectItem value="lunette">Remplacement lunette arrière</SelectItem>
                  <SelectItem value="lateral">Vitrage latéral / vitre de porte</SelectItem>
                  <SelectItem value="diag">Je ne sais pas — diagnostic souhaité</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nom complet *</Label>
                <Input id="name" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone *</Label>
                <Input id="phone" type="tel" required placeholder="+225 XX XX XX XX" className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label htmlFor="msg">Message / précisions</Label>
              <Textarea id="msg" rows={3} className="mt-1.5" />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ada-yellow text-ada-black font-semibold px-6 py-3.5 hover:brightness-95 transition"
            >
              Envoyer ma demande <ArrowRight className="h-4 w-4" />
            </button>
            <div className="pt-1 text-center text-sm text-muted-foreground">
              Ou contactez-nous directement :
              <a
                href="https://wa.me/2250700282930"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 inline-flex items-center gap-2 rounded-full border-2 border-[#25D366] text-[#1f9d52] font-semibold px-4 py-1.5 hover:bg-[#25D366] hover:text-white transition"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </form>
        </DialogContent>
      </Dialog>


      {/* SECTION 11 — LOGOS ASSURANCES */}
      <section className="bg-white py-16 border-t border-border">
        <div className="container-ada">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">Ils nous font confiance</span>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold">Nos partenaires assureurs</h2>
            <p className="mt-2 text-muted-foreground text-sm">
              Prise en charge directe et facturation simplifiée avec les principales compagnies d'assurance en Côte d'Ivoire.
            </p>
          </Reveal>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {[
              "NSIA Assurance",
              "SUNU",
              "GRAS SAVOYE",
              "GNA Assurances",
              "ASACO",
              "SIA Assurances",
              "SICOM",
              "COLINA",
              "AFRICA RE",
              "MISCO",
            ].map((assurance) => (
              <Reveal key={assurance}>
                <div className="rounded-full border border-border bg-white text-ada-black text-center text-sm font-semibold px-5 py-2.5 hover:border-ada-yellow hover:bg-ada-yellow/5 transition shadow-sm">
                  {assurance}
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Votre assurance n'est pas listée ? Contactez-nous — nous pouvons très probablement aussi gérer votre prise en charge.
          </p>
        </div>
      </section>
    </>
  );
}
