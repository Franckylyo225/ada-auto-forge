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
  { name: "Abidjan", color: "blue" },
  { name: "Yamoussoukro", color: "emerald" },
  { name: "Bouaké", color: "rose" },
  { name: "Korhogo", color: "amber" },
  { name: "Ferkessédougou", color: "indigo" },
  { name: "San pedro", color: "cyan" },
  { name: "Man", color: "violet" },
  { name: "Daloa", color: "orange" },
  { name: "Bondougou", color: "teal" },
  { name: "Abengourou", color: "fuchsia" },
  { name: "Odienné", color: "lime" },
  { name: "Bongouanou", color: "red" },
] as const;

type CityColor = (typeof defaultCities)[number]["color"];

const colorMap: Record<CityColor, { bg: string; border: string; dot: string; text: string }> = {
  blue: { bg: "bg-blue-50", border: "border-blue-200", dot: "bg-blue-500", text: "text-blue-900" },
  emerald: { bg: "bg-emerald-50", border: "border-emerald-200", dot: "bg-emerald-500", text: "text-emerald-900" },
  rose: { bg: "bg-rose-50", border: "border-rose-200", dot: "bg-rose-500", text: "text-rose-900" },
  amber: { bg: "bg-amber-50", border: "border-amber-200", dot: "bg-amber-500", text: "text-amber-900" },
  indigo: { bg: "bg-indigo-50", border: "border-indigo-200", dot: "bg-indigo-500", text: "text-indigo-900" },
  cyan: { bg: "bg-cyan-50", border: "border-cyan-200", dot: "bg-cyan-500", text: "text-cyan-900" },
  violet: { bg: "bg-violet-50", border: "border-violet-200", dot: "bg-violet-500", text: "text-violet-900" },
  orange: { bg: "bg-orange-50", border: "border-orange-200", dot: "bg-orange-500", text: "text-orange-900" },
  teal: { bg: "bg-teal-50", border: "border-teal-200", dot: "bg-teal-500", text: "text-teal-900" },
  fuchsia: { bg: "bg-fuchsia-50", border: "border-fuchsia-200", dot: "bg-fuchsia-500", text: "text-fuchsia-900" },
  lime: { bg: "bg-lime-50", border: "border-lime-200", dot: "bg-lime-500", text: "text-lime-900" },
  red: { bg: "bg-red-50", border: "border-red-200", dot: "bg-red-500", text: "text-red-900" },
};

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
  items: { name: string; color: CityColor }[];
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
        {loop.map((city, i) => {
          const palette = colorMap[city.color];
          return (
            <div
              key={`${city.name}-${i}`}
              className={`shrink-0 h-12 md:h-14 px-6 md:px-8 rounded-full ${palette.bg} border ${palette.border} shadow-sm grid place-items-center transition-transform hover:scale-105`}
            >
              <span className={`flex items-center gap-2 text-sm md:text-base font-bold whitespace-nowrap ${palette.text}`}>
                <span className={`h-2 w-2 rounded-full ${palette.dot}`} />
                {city.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

type CityItem = { name: string; color: CityColor };

export default function PartnersMarquee({
  cities,
}: {
  cities?: string[] | CityItem[];
}) {
  const cityList: CityItem[] =
    cities && cities.length > 0
      ? cities.map((c, i) =>
          typeof c === "string"
            ? { name: c, color: defaultCities[i % defaultCities.length].color }
            : c
        )
      : defaultCities;
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

