import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  ClipboardList,
  Search,
  Wrench,
  ShieldCheck,
  Clock,
  BadgeCheck,
  Home,
  PhoneCall,
} from "lucide-react";
import { Reveal } from "@/components/ada/Reveal";
import cardRep from "@/assets/ipb-card-reparation-cdn.png";
import cardRemp from "@/assets/ipb-card-remplacement-cdn.png";
import cardLat from "@/assets/ipb-card-lateral-cdn.png";

import { abs, SITE_URL } from "@/lib/seo";

const TITLE = "Services pare-brise Abidjan — Réparation, remplacement & latéraux";
const DESC =
  "Réparation d'impact, remplacement pare-brise, vitrage latéral et lunette arrière à Abidjan. Pièces OEM homologuées, pose par technicien certifié, garantie 12 mois.";

export const Route = createFileRoute("/ipb/services")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: SITE_URL + "/ipb/services" },
      { property: "og:image", content: abs(cardRemp) },
      { property: "og:image:alt", content: "Remplacement de pare-brise — Ivoire Pare-Brise Abidjan" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: abs(cardRemp) },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/ipb/services" }],
  }),
  component: IPBServicesPage,
});

const SERVICES = [
  {
    img: cardRep,
    icon: "🔧",
    title: "Réparation d'impact",
    desc:
      "Un impact inférieur à 3 cm, éloigné du champ de vision du conducteur ? La réparation est non seulement possible, elle est préférable : plus rapide, plus économique, et elle préserve l'étanchéité d'origine de votre vitrage.",
    feats: [
      "Diagnostic gratuit & sans engagement",
      "Résine haute résistance certifiée constructeur",
      "Intervention en moins d'une heure",
      "Traitement quasi invisible après séchage",
    ],
    tag: "Solution la plus économique",
  },
  {
    img: cardRemp,
    icon: "🪟",
    title: "Remplacement pare-brise",
    desc:
      "Fissure de plus de 30 cm, impact dans le champ de vision, vitrage feuilleté endommagé : le remplacement complet s'impose. Nous appliquons la procédure constructeur de bout en bout, pour restituer un véhicule sûr et étanche.",
    feats: [
      "Vitrage homologué OEM ou origine constructeur",
      "Mastic uréthane et joints neufs systématiques",
      "Temps de séchage respecté avant remise du véhicule",
      "Garantie 12 mois pièces & pose",
    ],
    featured: true,
  },
  {
    img: cardLat,
    icon: "🚘",
    title: "Vitrage latéral & lunette arrière",
    desc:
      "Vitre de porte brisée suite à une effraction, lunette arrière à remplacer, déflecteur abîmé : nos techniciens interviennent sur l'ensemble du vitrage périphérique, toutes marques, toutes générations.",
    feats: [
      "Vitres de portes avant et arrière",
      "Lunette arrière, avec ou sans désembuage",
      "Déflecteurs et triangles de custode",
      "Intervention rapide en atelier ou à domicile",
    ],
  },
];

const PROCESS = [
  {
    icon: PhoneCall,
    t: "Prise de contact",
    d: "Appelez-nous, envoyez un message WhatsApp ou remplissez le formulaire de rendez-vous. Un conseiller vous répond sous 2 heures ouvrables.",
  },
  {
    icon: Search,
    t: "Diagnostic gratuit",
    d: "À l'atelier ou sur photos, nous évaluons précisément l'étendue des dégâts et la solution la plus adaptée à votre véhicule.",
  },
  {
    icon: ClipboardList,
    t: "Devis transparent",
    d: "Vous recevez un devis détaillé pièce par pièce, sans surprise. Prise en charge assurance possible, nous gérons les démarches.",
  },
  {
    icon: Wrench,
    t: "Intervention & garantie",
    d: "Pose dans le respect des normes constructeur, temps de séchage observé, garantie 12 mois remise par écrit.",
  },
];

const GARANTIES = [
  { icon: BadgeCheck, t: "Pièces homologuées constructeur" },
  { icon: ShieldCheck, t: "Garantie 12 mois pièces & pose" },
  { icon: Clock, t: "Intervention sous 45 min" },
  { icon: Home, t: "Atelier ou à votre adresse" },
];

function IPBServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-ada-black text-white">
        <div className="container-ada py-20 md:py-28">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-ada-yellow/15 text-ada-yellow px-3 py-1 text-xs font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-ada-yellow" />
              Nos services vitrage
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-black tracking-tight leading-[1.05] max-w-3xl">
              Une solution adaptée
              <span className="block text-ada-yellow">à chaque vitrage.</span>
            </h1>
            <p className="mt-6 max-w-xl text-white/70 text-lg leading-relaxed">
              Du simple impact au remplacement complet, Ivoire Pare-Brise by ADA prend en charge
              l'intégralité de vos vitrages automobiles avec des pièces homologuées et une
              garantie écrite sur chaque intervention.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/ipb/rendez-vous"
                className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-semibold px-6 py-3.5 hover:brightness-95 transition shadow-[var(--shadow-yellow)]"
              >
                Demander un devis gratuit <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+22507002829830"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white font-semibold px-6 py-3.5 hover:bg-white hover:text-ada-black transition"
              >
                <PhoneCall className="h-4 w-4" /> Nous appeler
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GARANTIES STRIP */}
      <section className="bg-[var(--color-ada-yellow-soft)]/60 border-y border-border">
        <div className="container-ada py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {GARANTIES.map(({ icon: Icon, t }) => (
            <div key={t} className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-white border border-border grid place-items-center shrink-0">
                <Icon className="h-4 w-4 text-ada-black" />
              </div>
              <span className="text-sm font-semibold text-ada-black">{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-white py-20 md:py-24">
        <div className="container-ada">
          <Reveal className="max-w-2xl">
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">
              Nos prestations
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight">
              Trois expertises, une seule exigence.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {SERVICES.map((c, i) => (
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
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                    <ul className="mt-4 space-y-2 text-sm">
                      {c.feats.map((f) => (
                        <li key={f} className="flex gap-2">
                          <Check className="h-4 w-4 text-ada-yellow shrink-0 mt-0.5" />
                          <span className="text-ada-black/85">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex items-center justify-between">
                      {c.tag ? (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-semibold">
                          {c.tag}
                        </span>
                      ) : (
                        <span />
                      )}
                      <Link
                        to="/ipb/rendez-vous"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ada-black hover:text-ada-yellow transition"
                      >
                        Demander un devis <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
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
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">
              Comment ça marche
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight">
              Un parcours simple, transparent, rassurant.
            </h2>
            <p className="mt-3 text-muted-foreground">
              De la prise de contact à la remise du véhicule garanti, chaque étape est cadrée pour vous faire gagner du temps.
            </p>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] border-t-2 border-dashed border-ada-black/15" />
            {PROCESS.map(({ icon: Icon, t, d }, i) => (
              <Reveal key={t} delay={i * 0.08}>
                <div className="relative text-center bg-white rounded-2xl p-6 border border-border h-full">
                  <div className="mx-auto h-14 w-14 rounded-full bg-ada-yellow text-ada-black grid place-items-center">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="mt-3 text-xs font-bold text-ada-yellow">
                    ÉTAPE {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-1 font-bold">{t}</h3>
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
                  Prêt à confier votre vitrage à l'expert ?
                </h2>
                <p className="mt-3 text-white/70 text-lg">
                  Diagnostic gratuit, devis détaillé sous 2 heures ouvrables, intervention sous 45 min à Abidjan.
                </p>
              </div>
              <Link
                to="/ipb/rendez-vous"
                className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-bold px-7 py-4 hover:brightness-95 transition shadow-[var(--shadow-yellow)] shrink-0"
              >
                Prendre rendez-vous <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
