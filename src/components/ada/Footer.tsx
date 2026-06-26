import { Link, useRouterState } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";
import ipbLogoWhite from "@/assets/ipb-logo-white-v2.png.asset.json";


export function Footer() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isIpb = pathname.startsWith("/ipb");

  const links = isIpb
    ? [
        { to: "/ipb", label: "Accueil" },
        { to: "/ipb/a-propos", label: "À Propos" },
        { to: "/ipb/services", label: "Services" },
        { to: "/ipb/contact", label: "Contact" },
        { to: "/ipb/rendez-vous", label: "Prendre rendez-vous" },
      ]
    : [
        { to: "/ada", label: "Accueil" },
        { to: "/ada/a-propos", label: "À Propos" },
        { to: "/ada/services", label: "Services" },
        { to: "/ada/contact", label: "Contact" },
        { to: "/ada/reservation", label: "Réserver" },
      ];

  const address = isIpb
    ? { title: "Atelier Ivoire Pare-Brise", body: <>Angré nouveau CHU,<br />Pharmacie Val d'Oise</> }
    : { title: "Bureau ADA", body: <>Treichville, Boulevard VGE,<br />Immeuble Chevalier de Clieu, 1er étage</> };

  const tagline = isIpb
    ? "Ivoire Pare-Brise by ADA — Réparation et remplacement de vitrages automobiles à Abidjan. Toutes marques, garantie 12 mois."
    : "Assistance Distribution Auto — La mobilité premium au service des particuliers, des entreprises et des institutions en Côte d'Ivoire.";

  return (
    <footer className="bg-ada-black text-white mt-24">
      <div className="container-ada py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          {isIpb ? (
            <img src={ipbLogoWhite.url} alt="Ivoire Pare-Brise by ADA" className="h-20 w-auto" />
          ) : (

            <div className="text-3xl font-black tracking-tight">
              <span className="text-white">ada</span>
              <span className="text-ada-yellow">.</span>
            </div>
          )}
          <p className="mt-4 text-white/60 max-w-sm leading-relaxed">{tagline}</p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Instagram, Linkedin, MessageCircle].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="h-10 w-10 grid place-items-center rounded-full bg-white/5 hover:bg-ada-yellow hover:text-ada-black transition"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-white/40 hover:text-white transition"
          >
            ← Retour au portail Groupe ADA
          </Link>
        </div>
        <div>
          <h4 className="font-semibold text-ada-yellow mb-4">Navigation</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            {links.map((l) => (
              <li key={l.to}><Link to={l.to} className="hover:text-white">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-ada-yellow mb-4">Contact</h4>
          <ul className="space-y-3 text-white/70 text-sm">
            <li>
              <div className="text-white font-semibold">{address.title}</div>
              <div>{address.body}</div>
            </li>
            <li>+225 07 00 28 29 30</li>
            <li>assistance@ada-africa.com</li>
            <li>Lun–Sam · 8h–18h</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-ada py-6 text-center text-white/50 text-sm">
          © 2025 {isIpb ? "Ivoire Pare-Brise by ADA" : "ADA — Assistance Distribution Auto"}. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
