import allianz from "@/assets/partners/allianz.png";
import atlantique from "@/assets/partners/atlantique.png";
import saar from "@/assets/partners/saar.jpeg";
import afg from "@/assets/partners/afg.png";
import amsa from "@/assets/partners/amsa.png";
import sunu from "@/assets/partners/sunu.jpg";
import serenity from "@/assets/partners/serenity.png";
import nsia from "@/assets/partners/nsia.webp";
import sanlam from "@/assets/partners/sanlam.png";

const row1 = [
  { src: allianz, alt: "Allianz" },
  { src: nsia, alt: "NSIA Assurances" },
  { src: sunu, alt: "SUNU Assurances" },
  { src: atlantique, alt: "Atlantique Assurances" },
  { src: amsa, alt: "AMSA Assurances" },
];

const row2 = [
  { src: afg, alt: "AFG Assurances" },
  { src: sanlam, alt: "Sanlam" },
  { src: serenity, alt: "Serenity S.A" },
  { src: saar, alt: "SAAR Vie" },
];


function Track({
  items,
  reverse = false,
  duration = 40,
}: {
  items: { src: string; alt: string }[];
  reverse?: boolean;
  duration?: number;
}) {
  const loop = [...items, ...items];
  return (
    <div className="group relative overflow-hidden">
      <div
        className="marquee-track flex w-max gap-12 md:gap-16"
        style={{
          animation: `marquee-x ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {loop.map((it, i) => (
          <div
            key={`${it.alt}-${i}`}
            className="shrink-0 h-16 md:h-20 w-32 md:w-40 grid place-items-center"
          >
            <img
              src={it.src}
              alt={it.alt}
              className="max-h-full max-w-full object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}


export default function PartnersMarquee() {
  return (
    <section className="bg-white border-y border-border py-12">
      <div className="container-ada">
        <p className="text-center text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground">
          Ils nous font confiance
        </p>
      </div>
      <div className="mt-8 space-y-6">
        <Track items={row1} duration={45} />
        <Track items={row2} reverse duration={40} />
      </div>
      <style>{`
        @keyframes marquee-x {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .group:hover .marquee-track { animation-play-state: paused; }
        .marquee-track:focus-within { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; transform: none !important; }
        }
      `}</style>

    </section>
  );
}
