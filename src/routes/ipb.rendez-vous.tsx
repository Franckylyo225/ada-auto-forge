import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, MessageCircle, CheckCircle2, Phone } from "lucide-react";
import { Reveal } from "@/components/ada/Reveal";

export const Route = createFileRoute("/ipb/rendez-vous")({
  head: () => ({
    meta: [
      { title: "Prendre rendez-vous — Ivoire Pare-Brise by ADA" },
      {
        name: "description",
        content:
          "Demandez un devis ou un rendez-vous pour votre pare-brise. Réponse sous 2h ouvrables, intervention sous 45 min à Abidjan.",
      },
      { property: "og:title", content: "Prendre rendez-vous — Ivoire Pare-Brise" },
    ],
    links: [{ rel: "canonical", href: "/ipb/rendez-vous" }],
  }),
  component: IPBRdvPage,
});

function IPBRdvPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="bg-ada-black text-white">
        <div className="container-ada py-16 md:py-20">
          <Reveal>
            <span className="inline-flex items-center rounded-full bg-ada-yellow text-ada-black text-xs font-bold px-4 py-1.5">
              Devis gratuit & sans engagement
            </span>
            <h1 className="mt-5 text-4xl md:text-5xl font-black tracking-tight">
              Prendre rendez-vous
            </h1>
            <p className="mt-4 max-w-2xl text-white/70 text-lg">
              Remplissez le formulaire ci-dessous : notre équipe vous rappelle
              sous 2 heures ouvrables avec un devis précis et un créneau
              d'intervention.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[var(--color-ada-yellow-soft)]/40 py-14 md:py-20">
        <div className="container-ada max-w-3xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="bg-white rounded-3xl shadow-[var(--shadow-premium)] p-6 md:p-10 space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Nom complet" required>
                <input required className="input-rdv" />
              </Field>
              <Field label="Téléphone" required>
                <input type="tel" required placeholder="+225 XX XX XX XX" className="input-rdv" />
              </Field>
              <Field label="Marque & modèle" required>
                <input required placeholder="Ex: Toyota Corolla 2018" className="input-rdv" />
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
                  <textarea rows={4} className="input-rdv resize-none" />
                </Field>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ada-yellow text-ada-black font-bold px-8 py-4 text-lg hover:brightness-95 transition shadow-[var(--shadow-yellow)]"
              >
                Envoyer ma demande <ArrowRight className="h-5 w-5" />
              </button>
              <p className="mt-3 text-xs text-muted-foreground">
                Réponse sous 2h ouvrables · Diagnostic gratuit
              </p>
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Ou contactez-nous directement :
            <a
              href="https://wa.me/2250700282930"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-2 rounded-full border-2 border-[#25D366] text-[#1f9d52] font-semibold px-4 py-1.5 hover:bg-[#25D366] hover:text-white transition"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href="tel:+22507002829830"
              className="ml-2 inline-flex items-center gap-2 rounded-full border-2 border-ada-black text-ada-black font-semibold px-4 py-1.5 hover:bg-ada-black hover:text-white transition"
            >
              <Phone className="h-4 w-4" /> Appeler
            </a>
          </div>
        </div>
      </section>

      {sent && (
        <div className="fixed inset-0 z-50 bg-ada-black/60 backdrop-blur-sm grid place-items-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center">
            <div className="mx-auto h-14 w-14 rounded-full bg-ada-yellow/20 grid place-items-center">
              <CheckCircle2 className="h-7 w-7 text-ada-black" />
            </div>
            <h2 className="mt-4 text-2xl font-bold">Demande envoyée !</h2>
            <p className="mt-2 text-muted-foreground">
              Notre équipe Ivoire Pare-Brise vous rappelle sous 2 heures.
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-6 w-full rounded-full bg-ada-black text-white font-semibold py-3"
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
