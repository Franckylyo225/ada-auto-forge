import { Mail, Phone, Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";

export function TopBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isIpb = pathname.startsWith("/ipb");
  const phone = isIpb ? "+225 01 05 49 93 13" : "+225 07 00 28 29 30";
  const phoneE164 = isIpb ? "+2250105499313" : "+2250700282930";

  return (
    <div className="bg-ada-yellow text-ada-black">
      <div className="container-ada flex items-center justify-between py-2 text-sm">
        {/* Contact info */}
        <div className="flex items-center gap-4">
          <a
            href="mailto:assistance@ada-africa.com"
            className="flex items-center gap-1.5 hover:underline"
          >
            <Mail className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">assistance@ada-africa.com</span>
          </a>
          <a
            href={`tel:${phoneE164}`}
            className="flex items-center gap-1.5 hover:underline"
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{phone}</span>
          </a>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-2">
          {[
            { Icon: Facebook, label: "Facebook" },
            { Icon: Instagram, label: "Instagram" },
            { Icon: Linkedin, label: "LinkedIn" },
            { Icon: MessageCircle, label: "WhatsApp" },
          ].map(({ Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="h-7 w-7 grid place-items-center rounded-full bg-ada-black/10 hover:bg-ada-black hover:text-ada-yellow transition"
            >
              <Icon className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
