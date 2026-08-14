import { MessageCircle } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";

export function WhatsAppButton() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isIpb = pathname.startsWith("/ipb");
  const wa = isIpb ? "2250105499313" : "2250700282930";

  return (
    <a
      href={`https://wa.me/${wa}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactez-nous sur WhatsApp"
      className="fixed bottom-5 right-5 z-50 group flex items-center gap-2 rounded-full bg-[#25D366] text-white pl-4 pr-5 py-3 shadow-[0_15px_40px_-10px_rgba(37,211,102,0.6)] hover:scale-105 transition"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline text-sm font-semibold">WhatsApp</span>
    </a>
  );
}
