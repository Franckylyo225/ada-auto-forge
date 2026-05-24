import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logo from "@/assets/ada-logo.png";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/location", label: "Location" },
  { to: "/ivoire-pare-brise", label: "Ivoire Pare-Brise" },
  { to: "/a-propos", label: "À Propos" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-white/60 backdrop-blur-md"
      }`}
    >
      <div className="container-ada flex items-center justify-between h-18 py-3">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="ADA — Assistance Distribution Auto" className="h-10 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="text-sm font-medium text-ada-black/70 hover:text-ada-black transition-colors data-[status=active]:text-ada-black data-[status=active]:font-semibold"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/location"
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-ada-yellow text-ada-black font-semibold px-5 py-2.5 text-sm hover:brightness-95 transition shadow-[var(--shadow-yellow)]"
          >
            Réserver maintenant
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
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container-ada py-4 flex flex-col gap-1 border-t border-border">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="px-3 py-3 rounded-xl text-ada-black/80 hover:bg-muted data-[status=active]:bg-ada-yellow/15 data-[status=active]:text-ada-black font-medium"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/location"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-ada-yellow text-ada-black font-semibold px-5 py-3"
          >
            Réserver maintenant
          </Link>
        </div>
      </div>
    </header>
  );
}
