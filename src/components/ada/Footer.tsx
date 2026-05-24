import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ada-black text-white mt-24">
      <div className="container-ada py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="text-3xl font-black tracking-tight">
            <span className="text-white">ada</span>
            <span className="text-ada-yellow">.</span>
          </div>
          <p className="mt-4 text-white/60 max-w-sm leading-relaxed">
            Assistance Distribution Auto — La mobilité premium au service des particuliers,
            des entreprises et des institutions en Côte d'Ivoire.
          </p>
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
        </div>
        <div>
          <h4 className="font-semibold text-ada-yellow mb-4">Navigation</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            <li><Link to="/location" className="hover:text-white">Location</Link></li>
            <li><Link to="/ivoire-pare-brise" className="hover:text-white">Pare-Brise</Link></li>
            <li><Link to="/a-propos" className="hover:text-white">À Propos</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            <li><a href="#" className="hover:text-white">CGV</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-ada-yellow mb-4">Contact</h4>
          <ul className="space-y-2 text-white/70 text-sm">
            <li>Abidjan, Côte d'Ivoire</li>
            <li>+225 XX XX XX XX XX</li>
            <li>contact@ada-ci.com</li>
            <li>Lun–Sam · 8h–18h</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-ada py-6 text-center text-white/50 text-sm">
          © 2025 ADA — Assistance Distribution Auto. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
