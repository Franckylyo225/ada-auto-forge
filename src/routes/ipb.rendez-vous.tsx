import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Phone,
  Clock,
  BadgeCheck,
  ShieldCheck,
  Home,
} from "lucide-react";
import { Reveal } from "@/components/ada/Reveal";

import { SITE_URL } from "@/lib/seo";

const TITLE = "Rendez-vous pare-brise Abidjan — Devis gratuit sous 2h | Ivoire Pare-Brise";
const DESC =
  "Prenez rendez-vous en ligne avec Ivoire Pare-Brise à Abidjan : devis gratuit sous 2h, intervention sous 45 min, atelier Angré ou à domicile, garantie 12 mois.";

export const Route = createFileRoute("/ipb/rendez-vous")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: SITE_URL + "/ipb/rendez-vous" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/ipb/rendez-vous" }],
  }),
  component: IPBRdvPage,
});

const REASSURE = [
  { icon: Clock, t: "Réponse sous 2h ouvrables" },
  { icon: BadgeCheck, t: "Diagnostic gratuit & sans engagement" },
  { icon: ShieldCheck, t: "Garantie 12 mois pièces & pose" },
  { icon: Home, t: "Atelier Angré ou à votre adresse" },
];

function IPBRdvPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      {/* HERO */}
      <section className="bg-ada-black text-white">
        <div className="container-ada py-20 md:py-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-ada-yellow/15 text-ada-yellow px-3 py-1 text-xs font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-ada-yellow" />
              Devis gratuit & sans engagement
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-black tracking-tight leading-[1.05] max-w-3xl">
              Prendre rendez-vous,
              <span className="block text-ada-yellow">en quelques secondes.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-white/70 text-lg leading-relaxed">
              Remplissez le formulaire ci-dessous : un conseiller Ivoire Pare-Brise vous rappelle
              sous 2 heures ouvrables avec un devis précis et un créneau d'intervention adapté à votre emploi du temps.
            </p>
          </Reveal>
        </div>
      </section>

      {/* REASSURE STRIP */}
      <section className="bg-[var(--color-ada-yellow-soft)]/60 border-b border-border">
        <div className="container-ada py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {REASSURE.map(({ icon: Icon, t }) => (
            <div key={t} className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-white border border-border grid place-items-center shrink-0">
                <Icon className="h-4 w-4 text-ada-black" />
              </div>
              <span className="text-sm font-semibold text-ada-black">{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section className="bg-white py-14 md:py-20">
        <div className="container-ada grid lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
          <Reveal>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="bg-white rounded-3xl border border-border shadow-[var(--shadow-premium)] p-6 md:p-10 space-y-6"
            >
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">
                  Votre demande
                </span>
                <h2 className="mt-2 text-2xl md:text-3xl font-black">Décrivez-nous votre besoin.</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Nom complet" required>
                  <input required className="input-rdv" />
                </Field>
                <Field label="Téléphone" required>
                  <input type="tel" required placeholder="+225 XX XX XX XX" className="input-rdv" />
                </Field>
                <Field label="Marque & modèle" required>
                  <input required placeholder="Ex : Toyota Corolla 2018" className="input-rdv" />
                </Field>
                <Field label="Type d'intervention" required>
                  <select required className="input-rdv">
                    <option value="">— Sélectionner —</option>
                    <option>Réparation d'impact</option>
                    <option>Remplacement pare-brise avant</option>
                    <option>Remplacement lunette arrière</option>
                    <option>Vitrage latéral / vitre de porte</option>
                    <option>Je ne sais pas — diagnostic souhaité</option>
                  </select>
                </Field>
                <Field label="Lieu d'intervention souhaité">
                  <select className="input-rdv">
                    <option>Atelier Angré</option>
                    <option>À mon domicile</option>
                    <option>À mon bureau</option>
                  </select>
                </Field>
                <Field label="Disponibilité">
                  <input type="date" className="input-rdv" />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Précisions">
                    <textarea
                      rows={4}
                      className="input-rdv resize-none"
                      placeholder="Décrivez l'impact, la fissure, ou ajoutez toute info utile…"
                    />
                  </Field>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-ada-yellow text-ada-black font-bold px-8 py-4 text-lg hover:brightness-95 transition shadow-[var(--shadow-yellow)]"
                >
                  Envoyer ma demande <ArrowRight className="h-5 w-5" />
                </button>
                <p className="mt-3 text-xs text-muted-foreground">
                  Réponse sous 2h ouvrables · Diagnostic gratuit · Données confidentielles
                </p>
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="lg:sticky lg:top-24 space-y-6">
              <div className="rounded-3xl bg-ada-black text-white p-8">
                <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">
                  Contact direct
                </span>
                <h3 className="mt-2 text-xl md:text-2xl font-black">Préférez-vous nous parler ?</h3>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">
                  Un conseiller Ivoire Pare-Brise est disponible du lundi au samedi, de 8h à 18h.
                </p>
                <div className="mt-6 space-y-3">
                  <a
                    href="tel:+22507002829830"
                    className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-4 py-3 hover:bg-white/10 transition"
                  >
                    <div className="h-10 w-10 rounded-xl bg-ada-yellow text-ada-black grid place-items-center shrink-0">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-white/50 font-semibold">Téléphone</div>
                      <div className="text-sm font-bold text-white">+225 07 00 28 29 30</div>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/2250700282930"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-4 py-3 hover:bg-white/10 transition"
                  >
                    <div className="h-10 w-10 rounded-xl bg-[#25D366] text-white grid place-items-center shrink-0">
                      <MessageCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-white/50 font-semibold">WhatsApp</div>
                      <div className="text-sm font-bold text-white">Réponse instantanée</div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="rounded-3xl bg-[var(--color-ada-yellow-soft)] border border-border p-6">
                <div className="text-sm font-bold text-ada-black">Bon à savoir</div>
                <ul className="mt-3 space-y-2 text-sm text-ada-black/80">
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-ada-yellow shrink-0 mt-0.5" />
                    <span>Facturation directe avec les principales compagnies d'assurance ivoiriennes.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-ada-yellow shrink-0 mt-0.5" />
                    <span>Véhicule de remplacement disponible pendant la durée d'intervention (sur demande).</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-ada-yellow shrink-0 mt-0.5" />
                    <span>Tarifs préférentiels pour les flottes d'entreprise et institutions.</span>
                  </li>
                </ul>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {sent && (
        <div className="fixed inset-0 z-50 bg-ada-black/60 backdrop-blur-sm grid place-items-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center">
            <div className="mx-auto h-14 w-14 rounded-full bg-ada-yellow/20 grid place-items-center">
              <CheckCircle2 className="h-7 w-7 text-ada-black" />
            </div>
            <h2 className="mt-4 text-2xl font-bold">Demande bien reçue.</h2>
            <p className="mt-2 text-muted-foreground">
              Un conseiller Ivoire Pare-Brise vous rappelle sous 2 heures ouvrables avec un devis détaillé.
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-6 w-full rounded-full bg-ada-black text-white font-semibold py-3 hover:brightness-110 transition"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      <style>{`
        .input-rdv {
          width: 100%;
          background: var(--color-muted);
          border: 1px solid transparent;
          border-radius: 0.875rem;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          transition: all .15s;
        }
        .input-rdv:focus {
          outline: none;
          border-color: var(--color-ada-yellow);
          background: white;
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-ada-yellow) 25%, transparent);
        }
      `}</style>
    </>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label} {required && <span className="text-ada-yellow">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
