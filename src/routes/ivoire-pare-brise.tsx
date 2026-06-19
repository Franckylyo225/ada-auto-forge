import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
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
import heroNew from "@/assets/ipb-hero-new.png.asset.json";
import cardRep from "@/assets/ipb-card-reparation.jpg";
import cardRemp from "@/assets/ipb-card-remplacement.jpg";
import cardLat from "@/assets/ipb-card-lateral.jpg";

export const Route = createFileRoute("/ivoire-pare-brise")({
  head: () => ({
    meta: [
      { title: "Ivoire Pare-Brise by ADA — Réparation & remplacement vitrage auto Abidjan" },
      {
        name: "description",
        content:
          "Pare-brise fissuré ? Ivoire Pare-Brise by ADA intervient sous 45min à Abidjan. Réparation d'impact, remplacement, vitrage latéral — toutes marques, garantie 12 mois.",
      },
      { property: "og:title", content: "Ivoire Pare-Brise by ADA" },
      { property: "og:description", content: "Réparation & remplacement de pare-brise sous 45min à Abidjan." },
      { property: "og:image", content: heroNew.url },
    ],
    links: [{ rel: "canonical", href: "/ivoire-pare-brise" }],
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
  "Toyota", "Renault", "Peugeot", "Citroën", "Hyundai", "Kia",
  "Mercedes-Benz", "Volkswagen", "Ford", "Nissan", "Honda", "Mitsubishi",
  "Suzuki", "Dacia", "Opel", "BMW", "Fiat", "Land Rover",
  "Isuzu", "Mahindra", "BYD", "MG", "BAIC", "Chery",
];

const TESTIMONIALS = [
  {
    quote:
      "Un impact sur mon pare-brise un lundi matin. J'ai appelé Ivoire Pare-Brise, ils sont venus à mon bureau, réparation faite en 45 min. Impeccable !",
    name: "Adjoua K.",
    meta: "Toyota Corolla · Cocody",
    initials: "AK",
  },
  {
    quote:
      "Remplacement complet de mon pare-brise suite à un accident. Devis honnête, pièce d'origine, pose soignée. Je recommande sans hésiter.",
    name: "Issa D.",
    meta: "Hyundai Tucson · Marcory",
    initials: "ID",
  },
  {
    quote:
      "En tant que responsable flotte d'une entreprise, j'ai confié tous nos vitrages à IPB. Réactivité et tarifs compétitifs. Notre partenaire de confiance.",
    name: "Sylvie M.",
    meta: "Responsable flotte · Plateau",
    initials: "SM",
  },
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

function IPBPage() {
  const [devisOpen, setDevisOpen] = useState(false);
  const openDevis = () => setDevisOpen(true);
  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="bg-white">
        <div className="container-ada grid lg:grid-cols-5 gap-10 py-14 lg:py-20 items-center">
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-ada-yellow/15 text-ada-black px-3 py-1 text-xs font-semibold">
              Toutes marques · Abidjan
            </div>
            <h1 className="mt-5 text-4xl md:text-6xl font-black tracking-tight text-ada-black leading-[1.05]">
              Votre pare-brise fissuré ?
              <span className="block text-ada-yellow">On intervient sous 45min.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">
              Réparation d'impact ou remplacement complet — Ivoire Pare-Brise by ADA prend en charge
              votre vitrage avec des techniciens certifiés, des pièces homologuées et une garantie
              sur chaque intervention.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={openDevis}
                className="inline-flex items-center gap-2 rounded-full bg-ada-black text-ada-yellow font-semibold px-6 py-3.5 hover:brightness-110 transition"
              >
                Demander un devis gratuit <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="tel:+22507002829830"
                className="inline-flex items-center gap-2 rounded-full border-2 border-ada-black text-ada-black font-semibold px-6 py-3 hover:bg-ada-black hover:text-white transition"
              >
                <Phone className="h-4 w-4" /> Nous appeler maintenant
              </a>
            </div>
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ada-black/80">
              {["Diagnostic gratuit", "Intervention en atelier ou à domicile", "Garantie pièces & pose"].map((t) => (
                <li key={t} className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-ada-yellow" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <div className="relative rounded-3xl overflow-hidden shadow-[var(--shadow-premium)]">
              <img
                src={heroNew.url}
                alt="Stock de pare-brises neufs Ivoire Pare-Brise by ADA"
                className="w-full h-auto object-cover aspect-[4/5]"
                width={1024}
                height={1280}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — CHIFFRES */}
      <section className="bg-ada-black text-white py-16">
        <div className="container-ada grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: 300, s: "+", l: "Véhicules traités" },
            { n: 30, s: "+", l: "Marques couvertes" },
            { n: 45, s: "min", l: "Délai max d'intervention" },
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
                "Intervention en moins d'1 heure",
                "Résine haute résistance certifiée",
                "Traitement invisible après séchage",
                "Économique vs remplacement",
              ],
              tag: "À partir de XX 000 FCFA",
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

      {/* SECTION 4 — ENGAGEMENT */}
      <section style={{ backgroundColor: "#FFFBEC" }} className="py-20">
        <div className="container-ada">
          <Reveal className="max-w-2xl">
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-black/60">Pourquoi nous</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">Notre engagement qualité</h2>
            <p className="mt-3 text-muted-foreground">
              Chaque intervention est réalisée dans les règles de l'art, avec les bons matériaux et les bons techniciens.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              {
                icon: BadgeCheck,
                t: "Techniciens certifiés",
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
            Nous intervenons sur tous les véhicules particuliers et utilitaires du marché ivoirien.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {BRANDS.map((b) => (
            <div
              key={b}
              className="rounded-full border border-border bg-white text-ada-black text-center text-sm font-semibold px-4 py-2.5 hover:border-ada-black transition"
            >
              {b}
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


      {/* SECTION 8 — TÉMOIGNAGES */}
      <section className="container-ada py-20">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold">Ce que disent nos clients</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div className="h-full rounded-2xl bg-white border border-border p-6 flex flex-col">
                <div className="flex gap-0.5 text-ada-yellow">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 italic text-ada-black/85">"{t.quote}"</p>
                <div className="mt-6 pt-4 border-t border-border flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-ada-yellow text-ada-black grid place-items-center text-sm font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.meta}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
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
              Demandez votre devis en 1 minute, notre équipe vous rappelle sous 2 heures avec un prix précis.
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
