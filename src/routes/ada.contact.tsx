import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react";
import { Reveal } from "@/components/ada/Reveal";

export const Route = createFileRoute("/ada/contact")({
  head: () => ({
    meta: [
      { title: "Contactez ADA — Mobilité & Location à Abidjan" },
      { name: "description", content: "Une question ? Un devis ? Contactez l'équipe ADA à Abidjan par téléphone, WhatsApp ou via notre formulaire en ligne." },
      { property: "og:title", content: "Contact ADA" },
      { property: "og:description", content: "Une équipe à votre écoute 6j/7 pour toutes vos demandes de mobilité." },
    ],
    links: [{ rel: "canonical", href: "/ada/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      {/* HERO HEADER */}
      <section className="bg-ada-black text-white py-20 md:py-28">
        <div className="container-ada">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-ada-yellow/15 text-ada-yellow px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-ada-yellow animate-pulse" />
              Service Client ADA
            </span>
            <h1 className="mt-6 text-4xl md:text-7xl font-black tracking-tighter max-w-4xl leading-[0.95]">
              Parlons de votre <br />
              <span className="text-ada-yellow">prochaine destination.</span>
            </h1>
            <p className="mt-8 max-w-xl text-white/60 text-lg leading-relaxed">
              Une question sur nos tarifs, une demande de partenariat ou un besoin urgent ? 
              Nos conseillers vous répondent en moins d'une heure.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="container-ada -mt-12 md:-mt-20 pb-20 relative z-10 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <div className="rounded-[2rem] bg-ada-black text-white p-8 md:p-12 h-full shadow-2xl border border-white/5">
            <h2 className="text-2xl font-bold tracking-tight">Nos bureaux</h2>
            <div className="mt-10 space-y-8">
              <div className="group flex gap-5">
                <div className="h-12 w-12 rounded-2xl bg-ada-yellow text-ada-black grid place-items-center shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40 font-black mb-1">Siège ADA (Location)</div>
                  <div className="text-white font-semibold leading-relaxed">
                    Treichville, Boulevard VGE,<br />
                    Immeuble Chevalier de Clieu, 1er étage
                  </div>
                </div>
              </div>

              <div className="group flex gap-5">
                <div className="h-12 w-12 rounded-2xl bg-ada-yellow text-ada-black grid place-items-center shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40 font-black mb-1">Ivoire Pare-Brise (Atelier)</div>
                  <div className="text-white font-semibold leading-relaxed">
                    Angré nouveau CHU,<br />
                    Pharmacie Val d'Oise
                  </div>
                </div>
              </div>

              <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-white/10">
                {[
                  { icon: Phone, t: "Téléphone", v: "+225 07 00 28 29 30" },
                  { icon: MessageSquare, t: "WhatsApp", v: "+225 07 00 28 29 30" },
                  { icon: Mail, t: "Email", v: "assistance@ada-africa.com" },
                  { icon: Clock, t: "Horaires", v: "Lun–Sam · 8h–18h" },
                ].map(({ icon: Icon, t, v }) => (
                  <div key={t} className="group flex gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white/5 text-ada-yellow grid place-items-center shrink-0 group-hover:bg-ada-yellow group-hover:text-ada-black transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-white/40 font-black">{t}</div>
                      <div className="mt-0.5 text-sm text-white font-medium">{v}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 aspect-video rounded-3xl overflow-hidden grayscale contrast-125 opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
               <iframe
                title="Carte ADA Abidjan"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-4.10,5.27,-3.90,5.42&layer=mapnik"
                className="h-full w-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-[2rem] bg-white border border-border p-8 md:p-14 h-full shadow-xl">
            <h2 className="text-3xl font-black tracking-tight text-ada-black">Envoyez un message</h2>
            <p className="mt-2 text-muted-foreground">Nous traitons vos demandes sous 2h ouvrables.</p>
            
            <form
              onSubmit={(e) => { e.preventDefault(); alert("Message envoyé !"); }}
              className="mt-10 space-y-6"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Votre Nom full"><input required className="input-ada" placeholder="Ex: Jean Koffi" /></Field>
                <Field label="Adresse Email"><input required type="email" className="input-ada" placeholder="jean@email.com" /></Field>
                <Field label="Téléphone"><input required className="input-ada" placeholder="+225 07..." /></Field>
                <Field label="Objet de la demande">
                  <select className="input-ada">
                    <option>Location de véhicule</option>
                    <option>Réparation de pare-brise</option>
                    <option>Partenariat Entreprise</option>
                    <option>Autre</option>
                  </select>
                </Field>
              </div>
              <Field label="Votre message">
                <textarea rows={6} className="input-ada resize-none py-4" placeholder="Dites-nous comment nous pouvons vous aider..." />
              </Field>
              
              <div className="pt-4">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-ada-black text-white font-bold px-10 py-5 hover:bg-ada-yellow hover:text-ada-black transition-all duration-300 shadow-xl group">
                  Envoyer le message <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </Reveal>
      </section>

      <style>{`
        .input-ada {
          width: 100%;
          background: #f9f9f9;
          border: 1px solid #e5e7eb;
          border-radius: 1rem;
          padding: 0.875rem 1.25rem;
          font-size: 0.95rem;
          transition: all .2s;
          color: var(--color-ada-black);
        }
        .input-ada:focus {
          outline: none;
          border-color: var(--color-ada-yellow);
          background: white;
          box-shadow: 0 0 0 4px rgba(255, 232, 0, 0.1);
        }
        .input-ada::placeholder {
          color: #9ca3af;
        }
      `}</style>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
