import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ArrowLeft } from "lucide-react";
import logo from "@/assets/ada-logo.png";
import ipbLogoBlack from "@/assets/ipb-logo-black.png.asset.json";


type Site = "ada" | "ipb";

type NavLink = { to: string; label: string; exact?: boolean };

const ADA_LINKS: NavLink[] = [
  { to: "/ada", label: "Accueil", exact: true },
  { to: "/ada/a-propos", label: "À Propos" },
  { to: "/ada/services", label: "Services" },
  { to: "/ada/contact", label: "Contact" },
];

const IPB_LINKS: NavLink[] = [
  { to: "/ipb", label: "Accueil", exact: true },
  { to: "/ipb/a-propos", label: "À Propos" },
  { to: "/ipb/services", label: "Services" },
  { to: "/ipb/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const site: Site = pathname.startsWith("/ipb") ? "ipb" : "ada";

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = site === "ipb" ? IPB_LINKS : ADA_LINKS;
  const ctaTo = site === "ipb" ? "/ipb/rendez-vous" : "/ada/reservation";
  const ctaLabel = site === "ipb" ? "Prendre rendez-vous" : "Réserver maintenant";

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-white/60 backdrop-blur-md"
      }`}
    >
      <div className="container-ada flex items-center justify-between h-18 py-3">
        <Link to={site === "ipb" ? "/ipb" : "/ada"} className="flex items-center gap-2 shrink-0">
          {site === "ipb" ? (
            <img src={ipbLogoBlack.url} alt="Ivoire Pare-Brise by ADA" className="h-12 w-auto" />
          ) : (
            <img src={logo} alt="ADA — Assistance Distribution Auto" className="h-10 w-auto" />
          )}
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.exact }}
              className="text-sm font-medium text-ada-black/70 hover:text-ada-black transition-colors data-[status=active]:text-ada-black data-[status=active]:font-semibold"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="hidden md:inline-flex items-center gap-1 text-xs font-medium text-ada-black/50 hover:text-ada-black transition px-2"
            title="Retour au portail"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Portail
          </Link>
          <Link
            to={ctaTo}
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-ada-yellow text-ada-black font-semibold px-5 py-2.5 text-sm hover:brightness-95 transition shadow-[var(--shadow-yellow)]"
          >
            {ctaLabel}
          </Link>
          <button
            aria-label="Menu"
            className="lg:hidden p-2 rounded-full hover:bg-muted"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container-ada py-4 flex flex-col gap-1 border-t border-border">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.exact }}
              className="px-3 py-3 rounded-xl text-ada-black/80 hover:bg-muted data-[status=active]:bg-ada-yellow/15 data-[status=active]:text-ada-black font-medium"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to={ctaTo}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-ada-yellow text-ada-black font-semibold px-5 py-3"
          >
            {ctaLabel}
          </Link>
          <Link
            to="/"
            className="mt-1 inline-flex items-center justify-center gap-1 text-xs font-medium text-ada-black/50 py-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Retour au portail
          </Link>
        </div>
      </div>
    </header>
  );
}



