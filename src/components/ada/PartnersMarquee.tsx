import allianz from "@/assets/partners/allianz.png";
import atlantique from "@/assets/partners/atlantique.png";
import saar from "@/assets/partners/saar.jpeg";
import afg from "@/assets/partners/afg.png";
import amsa from "@/assets/partners/amsa.png";
import sunu from "@/assets/partners/sunu.jpg";
import serenity from "@/assets/partners/serenity.png";
import nsia from "@/assets/partners/nsia.webp";
import sanlam from "@/assets/partners/sanlam.png";

const defaultRow1 = [
  { src: allianz, alt: "Allianz" },
  { src: nsia, alt: "NSIA Assurances" },
  { src: sunu, alt: "SUNU Assurances" },
  { src: atlantique, alt: "Atlantique Assurances" },
  { src: amsa, alt: "AMSA Assurances" },
];

const defaultRow2 = [
  { src: afg, alt: "AFG Assurances" },
  { src: sanlam, alt: "Sanlam" },
  { src: serenity, alt: "Serenity S.A" },
  { src: saar, alt: "SAAR Vie" },
];

const defaultCities = [
  "Abidjan",
  "Yamoussoukro",
  "Bouaké",
  "Korhogo",
  "Ferkessédougou",
  "San pedro",
  "Man",
  "Daloa",
  "Bondougou",
  "Abengourou",
  "Odienné",
  "Bongouanou",
];

function LogoTrack({
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

function CityTrack({
  items,
  reverse = false,
  duration = 40,
}: {
  items: string[];
  reverse?: boolean;
  duration?: number;
}) {
  const loop = [...items, ...items];
  return (
    <div className="group relative overflow-hidden">
      <div
        className="marquee-track flex w-max gap-4 md:gap-6"
        style={{
          animation: `marquee-x ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {loop.map((city, i) => (
          <div
            key={`${city}-${i}`}
            className="shrink-0 h-12 md:h-14 px-6 md:px-8 rounded-full bg-[var(--color-ada-yellow-soft)]/60 border border-ada-yellow/30 grid place-items-center"
          >
            <span className="text-sm md:text-base font-bold text-ada-black whitespace-nowrap">
              {city}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PartnersMarquee({
  cities,
}: {
  cities?: string[];
}) {
  const cityList = cities && cities.length > 0 ? cities : defaultCities;
  const cityRow1 = cityList.slice(0, Math.ceil(cityList.length / 2));
  const cityRow2 = cityList.slice(Math.ceil(cityList.length / 2));

  return (
    <section className="bg-white border-y border-border py-12">
      <div className="container-ada">
        <p className="text-center text-xs uppercase tracking-[0.2em] font-semibold text-muted-foreground">
          PARTOUT EN CÔTE D'IVOIRE
        </p>
      </div>
      <div className="mt-8 space-y-6">
        {cities && cities.length > 0 ? (
          <>
            <CityTrack items={cityRow1} duration={45} />
            <CityTrack items={cityRow2} reverse duration={40} />
          </>
        ) : (
          <>
            <LogoTrack items={defaultRow1} duration={45} />
            <LogoTrack items={defaultRow2} reverse duration={40} />
          </>
        )}
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

