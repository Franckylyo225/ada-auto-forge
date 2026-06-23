import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Reveal } from "@/components/ada/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ADA" },
      { name: "description", content: "Contactez ADA — Assistance Distribution Auto à Abidjan, Côte d'Ivoire." },
      { property: "og:title", content: "Contact — ADA" },
      { property: "og:description", content: "Une équipe disponible 7j/7 pour vous répondre." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="container-ada pt-20 pb-12">
        <Reveal>
          <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">Contact</span>
          <h1 className="mt-3 text-4xl md:text-6xl font-black tracking-tight max-w-3xl">
            Parlons de votre projet.
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground">
            Notre équipe vous répond en moins d'une heure pendant les heures d'ouverture.
          </p>
        </Reveal>
      </section>

      <section className="container-ada pb-20 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div className="rounded-3xl bg-ada-black text-white p-8 md:p-10 h-full">
            <h2 className="text-2xl font-bold">Nos coordonnées</h2>
            <ul className="mt-8 space-y-6">
              <li className="flex gap-4">
                <div className="h-11 w-11 rounded-2xl bg-ada-yellow text-ada-black grid place-items-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/50 font-semibold">Bureau ADA</div>
                  <div className="mt-0.5 text-white font-medium">Treichville, Boulevard VGE,<br />Immeuble Chevalier de Clieu, 1er étage</div>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="h-11 w-11 rounded-2xl bg-ada-yellow text-ada-black grid place-items-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/50 font-semibold">Bureau Ivoire Pare-Brise</div>
                  <div className="mt-0.5 text-white font-medium">Angré nouveau CHU,<br />Pharmacie Val d'Oise</div>
                </div>
              </li>
              {[
                { icon: Phone, t: "Téléphone", v: "+225 07 00 28 29 30" },
                { icon: Mail, t: "Email", v: "assistance@ada-africa.com" },
                { icon: Clock, t: "Horaires", v: "Lun–Sam · 8h–18h" },
              ].map(({ icon: Icon, t, v }) => (
                <li key={t} className="flex gap-4">
                  <div className="h-11 w-11 rounded-2xl bg-ada-yellow text-ada-black grid place-items-center shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-white/50 font-semibold">{t}</div>
                    <div className="mt-0.5 text-white font-medium">{v}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10 aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/5 grid place-items-center text-white/40 text-sm">
              <iframe
                title="Carte ADA Abidjan"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-4.10,5.27,-3.90,5.42&layer=mapnik"
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={(e) => { e.preventDefault(); alert("Message envoyé !"); }}
            className="rounded-3xl border border-border bg-white p-8 md:p-10 h-full"
          >
            <h2 className="text-2xl font-bold">Envoyez-nous un message</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Nom"><input required className="input-ada" /></Field>
              <Field label="Email"><input required type="email" className="input-ada" /></Field>
              <Field label="Téléphone"><input className="input-ada" /></Field>
              <Field label="Sujet">
                <select className="input-ada">
                  <option>Location</option>
                  <option>Pare-Brise</option>
                  <option>Partenariat</option>
                  <option>Autre</option>
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Message"><textarea rows={5} className="input-ada resize-none" /></Field>
              </div>
            </div>
            <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-semibold px-6 py-3.5 hover:brightness-95">
              Envoyer <Send className="h-4 w-4" />
            </button>
          </form>
        </Reveal>
      </section>

      <style>{`
        .input-ada {
          width: 100%;
          background: var(--color-muted);
          border: 1px solid transparent;
          border-radius: 0.875rem;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          transition: all .15s;
        }
        .input-ada:focus {
          outline: none;
          border-color: var(--color-ada-yellow);
          background: white;
        }
      `}</style>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
