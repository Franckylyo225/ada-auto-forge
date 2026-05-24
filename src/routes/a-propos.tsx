import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Car, Shield } from "lucide-react";
import { Reveal } from "@/components/ada/Reveal";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À Propos — ADA" },
      { name: "description", content: "Découvrez ADA — Assistance Distribution Auto : histoire, mission et filiales." },
      { property: "og:title", content: "À Propos — ADA" },
      { property: "og:description", content: "Notre histoire, notre mission, nos équipes." },
    ],
    links: [{ rel: "canonical", href: "/a-propos" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="container-ada pt-20 pb-12">
        <Reveal>
          <span className="text-xs uppercase tracking-wider font-semibold text-ada-yellow">À Propos</span>
          <h1 className="mt-3 text-4xl md:text-6xl font-black tracking-tight max-w-3xl">
            La mobilité ivoirienne, repensée.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Depuis plus de dix ans, ADA accompagne particuliers, entreprises et institutions
            en Côte d'Ivoire avec deux savoir-faire complémentaires : la location de véhicules
            et la réparation de pare-brise.
          </p>
        </Reveal>
      </section>

      {/* Mission / Vision */}
      <section className="container-ada py-12 grid gap-6 md:grid-cols-2">
        {[
          { icon: Target, t: "Notre mission", d: "Offrir des solutions de mobilité fiables, accessibles et premium à tous nos clients." },
          { icon: Eye, t: "Notre vision", d: "Devenir le partenaire automobile de référence en Afrique de l'Ouest." },
        ].map(({ icon: Icon, t, d }, i) => (
          <Reveal key={t} delay={i * 0.08}>
            <div className="rounded-3xl border border-border bg-white p-8 h-full">
              <Icon className="h-7 w-7 text-ada-yellow" />
              <h3 className="mt-5 text-2xl font-bold">{t}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{d}</p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Subsidiaries */}
      <section className="container-ada py-12">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold">Deux filiales, un groupe.</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl bg-ada-black text-white p-8 h-full">
              <Car className="h-8 w-8 text-ada-yellow" />
              <h3 className="mt-4 text-2xl font-bold">ADA Location</h3>
              <p className="mt-2 text-white/70">Location courte et longue durée pour particuliers, entreprises et institutions.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-ada-yellow text-ada-black p-8 h-full">
              <Shield className="h-8 w-8" />
              <h3 className="mt-4 text-2xl font-bold">Ivoire Pare-Brise</h3>
              <p className="mt-2 text-ada-black/80">Réparation et remplacement de pare-brise toutes marques, à l'atelier ou à domicile.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team */}
      <section className="container-ada py-12">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold">Notre équipe.</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {["Directeur Général", "Responsable Flotte", "Responsable Pare-Brise", "Service Client"].map((role, i) => (
            <Reveal key={role} delay={i * 0.06}>
              <div className="rounded-2xl border border-border bg-white p-6 text-center">
                <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-ada-black to-ada-black/60 grid place-items-center text-ada-yellow font-black text-2xl">
                  {role[0]}
                </div>
                <div className="mt-4 font-semibold">Membre ADA</div>
                <div className="text-sm text-muted-foreground">{role}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="container-ada py-16">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-center">Ils nous font confiance.</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-4">
          {["NSIA", "SUNU", "SAAR", "Allianz", "AXA"].map((p, i) => (
            <Reveal key={p} delay={i * 0.05}>
              <div className="rounded-xl border border-border bg-white h-20 grid place-items-center font-bold text-ada-black/60">
                {p}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
