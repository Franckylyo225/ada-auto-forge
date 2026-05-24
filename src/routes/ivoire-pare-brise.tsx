import { createFileRoute, Link } from "@tanstack/react-router";
import { Wrench, Shield, Car, CheckCircle2, BadgeCheck, MapPin, Clock, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ada/Reveal";

export const Route = createFileRoute("/ivoire-pare-brise")({
  head: () => ({
    meta: [
      { title: "Ivoire Pare-Brise by ADA" },
      { name: "description", content: "Réparation et remplacement de pare-brise toutes marques en Côte d'Ivoire. Intervention 24-48h." },
      { property: "og:title", content: "Ivoire Pare-Brise by ADA" },
      { property: "og:description", content: "Votre pare-brise, notre priorité." },
    ],
    links: [{ rel: "canonical", href: "/ivoire-pare-brise" }],
  }),
  component: IPBPage,
});

function IPBPage() {
  return (
    <>
      <section className="relative bg-ada-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-ada-yellow blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-ada-yellow/40 blur-3xl" />
        </div>
        <div className="container-ada relative pt-24 pb-20">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium">
              <Shield className="h-3.5 w-3.5 text-ada-yellow" /> by ADA
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 text-5xl md:text-7xl font-black tracking-tight">
              <span className="text-ada-yellow">IVOIRE</span> PARE-BRISE
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-lg text-white/75 max-w-xl">Votre pare-brise, notre priorité.</p>
          </Reveal>
          <Reveal delay={0.3}>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-semibold px-6 py-3.5">
              Demander un devis <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="container-ada py-20">
        <Reveal className="max-w-2xl">
          <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">Nos services</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">Une expertise complète du vitrage auto.</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { icon: Wrench, t: "Réparation Impact", d: "Réparation rapide d'impacts et fissures sans remplacement." },
            { icon: Shield, t: "Remplacement Pare-brise", d: "Remplacement toutes marques avec vitrages homologués." },
            { icon: Car, t: "Toutes Marques", d: "Citroën, Toyota, Renault, Hyundai, Mercedes, Kia, Suzuki…" },
          ].map(({ icon: Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 0.08}>
              <div className="rounded-2xl border border-border bg-white p-7 h-full hover:shadow-[var(--shadow-premium)] hover:-translate-y-1 transition">
                <div className="h-12 w-12 rounded-2xl bg-ada-yellow text-ada-black grid place-items-center">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-bold text-xl">{t}</h3>
                <p className="mt-2 text-muted-foreground">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-[var(--color-ada-yellow-soft)] py-20">
        <div className="container-ada">
          <Reveal className="max-w-2xl">
            <span className="text-xs uppercase tracking-wider font-semibold text-ada-black/60">Process</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">Comment ça marche ?</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {["Diagnostique gratuit", "Devis immédiat", "Intervention rapide", "Garantie posée"].map((step, i) => (
              <Reveal key={step} delay={i * 0.08}>
                <div className="rounded-2xl bg-white border border-border p-6 h-full">
                  <div className="text-ada-yellow font-black text-4xl">{String(i + 1).padStart(2, "0")}</div>
                  <div className="mt-3 font-semibold text-ada-black">{step}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="container-ada py-20">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: BadgeCheck, t: "Techniciens certifiés" },
            { icon: CheckCircle2, t: "Pièces d'origine" },
            { icon: MapPin, t: "Atelier ou à domicile" },
            { icon: Clock, t: "Délai : 24 à 48h" },
          ].map(({ icon: Icon, t }, i) => (
            <Reveal key={t} delay={i * 0.06}>
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-white p-5">
                <Icon className="h-6 w-6 text-ada-yellow" />
                <div className="font-semibold">{t}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-ada pb-24">
        <Reveal>
          <div className="rounded-3xl bg-ada-black text-white p-10 md:p-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Besoin d'un devis ?</h2>
              <p className="mt-2 text-white/70">Réponse en moins d'une heure, diagnostic gratuit.</p>
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-semibold px-6 py-3.5 w-fit">
              Obtenir mon devis <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
