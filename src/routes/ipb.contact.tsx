import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, ArrowRight, ShieldCheck, BadgeCheck } from "lucide-react";
import { Reveal } from "@/components/ada/Reveal";

export const Route = createFileRoute("/ipb/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Ivoire Pare-Brise by ADA · Atelier Angré, Abidjan" },
      {
        name: "description",
        content:
          "Contactez Ivoire Pare-Brise à Abidjan : atelier d'Angré, téléphone, WhatsApp, email. Réponse sous 2h ouvrables, diagnostic gratuit pour votre pare-brise.",
      },
      { property: "og:title", content: "Contact — Ivoire Pare-Brise by ADA" },
      {
        property: "og:description",
        content:
          "Atelier d'Angré · Réponse sous 2h ouvrables · Diagnostic gratuit pour tout vitrage automobile.",
      },
    ],
    links: [{ rel: "canonical", href: "/ipb/contact" }],
  }),
  component: IPBContactPage,
});

function IPBContactPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-ada-black text-white">
        <div className="container-ada py-20 md:py-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-ada-yellow/15 text-ada-yellow px-3 py-1 text-xs font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-ada-yellow" />
              Contact
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-black tracking-tight leading-[1.05] max-w-3xl">
              Parlons de
              <span className="block text-ada-yellow">votre vitrage.</span>
            </h1>
            <p className="mt-6 max-w-xl text-white/70 text-lg leading-relaxed">
              Notre équipe vous répond en moins de 2 heures pendant les heures d'ouverture.
              Diagnostic gratuit, devis transparent, intervention rapide à Abidjan.
            </p>
          </Reveal>
        </div>
      </section>

      {/* GARANTIES STRIP */}
      <section className="bg-[var(--color-ada-yellow-soft)]/60 border-b border-border">
        <div className="container-ada py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Clock, t: "Réponse sous 2h ouvrables" },
            { icon: BadgeCheck, t: "Diagnostic gratuit" },
            { icon: ShieldCheck, t: "Garantie 12 mois" },
            { icon: MessageCircle, t: "Disponible sur WhatsApp" },
          ].map(({ icon: Icon, t }) => (
            <div key={t} className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-white border border-border grid place-items-center shrink-0">
                <Icon className="h-4 w-4 text-ada-black" />
              </div>
              <span className="text-sm font-semibold text-ada-black">{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* COORDONNÉES + FORM */}
      <section className="bg-white py-20">
        <div className="container-ada grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="rounded-3xl bg-ada-black text-white p-8 md:p-10 h-full">
              <span className="text-xs uppercase tracking-wider text-ada-yellow font-semibold">
                Atelier & coordonnées
              </span>
              <h2 className="mt-2 text-2xl md:text-3xl font-black">À votre service à Abidjan.</h2>
              <ul className="mt-8 space-y-6">
                <li className="flex gap-4">
                  <div className="h-11 w-11 rounded-2xl bg-ada-yellow text-ada-black grid place-items-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-white/50 font-semibold">
                      Atelier Ivoire Pare-Brise
                    </div>
                    <div className="mt-0.5 text-white font-medium">
                      Angré nouveau CHU,
                      <br />
                      Pharmacie Val d'Oise — Abidjan
                    </div>
                  </div>
                </li>
                {[
                  { icon: Phone, t: "Téléphone", v: "+225 07 00 28 29 30", href: "tel:+22507002829830" },
                  { icon: MessageCircle, t: "WhatsApp", v: "Réponse instantanée", href: "https://wa.me/2250700282930" },
                  { icon: Mail, t: "Email", v: "assistance@ada-africa.com", href: "mailto:assistance@ada-africa.com" },
                  { icon: Clock, t: "Horaires", v: "Lun–Sam · 8h–18h" },
                ].map(({ icon: Icon, t, v, href }) => (
                  <li key={t} className="flex gap-4">
                    <div className="h-11 w-11 rounded-2xl bg-ada-yellow text-ada-black grid place-items-center shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-white/50 font-semibold">{t}</div>
                      {href ? (
                        <a href={href} className="mt-0.5 block text-white font-medium hover:text-ada-yellow transition">
                          {v}
                        </a>
                      ) : (
                        <div className="mt-0.5 text-white font-medium">{v}</div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-6 border-t border-white/10">
                <p className="text-sm text-white/70">
                  Besoin d'un créneau précis ?
                </p>
                <Link
                  to="/ipb/rendez-vous"
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-semibold px-5 py-3 hover:brightness-95 transition"
                >
                  Prendre rendez-vous en ligne <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Message envoyé !");
              }}
              className="rounded-3xl border border-border bg-white p-8 md:p-10 h-full shadow-[var(--shadow-premium)]"
            >
              <span className="text-xs uppercase tracking-wider text-ada-yellow font-semibold">
                Formulaire de contact
              </span>
              <h2 className="mt-2 text-2xl md:text-3xl font-black">Envoyez-nous un message.</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Décrivez votre besoin : nous revenons vers vous avec un diagnostic et un devis sous 2h ouvrables.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Nom" required>
                  <input required className="input-ipb" />
                </Field>
                <Field label="Email" required>
                  <input required type="email" className="input-ipb" />
                </Field>
                <Field label="Téléphone">
                  <input className="input-ipb" placeholder="+225 XX XX XX XX" />
                </Field>
                <Field label="Marque & modèle">
                  <input className="input-ipb" placeholder="Ex : Toyota Corolla 2018" />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Votre message" required>
                    <textarea required rows={5} className="input-ipb resize-none" placeholder="Décrivez l'impact, la fissure ou la prestation souhaitée…" />
                  </Field>
                </div>
              </div>
              <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-semibold px-6 py-3.5 hover:brightness-95 transition shadow-[var(--shadow-yellow)]">
                Envoyer mon message <Send className="h-4 w-4" />
              </button>
              <p className="mt-3 text-xs text-muted-foreground">
                Vos données restent confidentielles et ne sont utilisées que pour traiter votre demande.
              </p>
            </form>
          </Reveal>
        </div>
      </section>

      <style>{`
        .input-ipb {
          width: 100%;
          background: var(--color-muted);
          border: 1px solid transparent;
          border-radius: 0.875rem;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          transition: all .15s;
        }
        .input-ipb:focus {
          outline: none;
          border-color: var(--color-ada-yellow);
          background: white;
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-ada-yellow) 25%, transparent);
        }
      `}</style>
    </>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label} {required && <span className="text-ada-yellow">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
