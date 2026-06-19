import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/ada/Navbar";
import { Footer } from "@/components/ada/Footer";
import { WhatsAppButton } from "@/components/ada/WhatsAppButton";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-black text-ada-black">404</h1>
        <p className="mt-3 text-muted-foreground">Cette page n'existe pas.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-ada-yellow px-5 py-2.5 text-sm font-semibold text-ada-black"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold">Une erreur est survenue</h1>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-ada-yellow px-5 py-2.5 text-sm font-semibold text-ada-black"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ADA — Assistance Distribution Auto" },
      { name: "description", content: "Location de véhicules courte & longue durée et réparation de pare-brise en Côte d'Ivoire." },
      { property: "og:site_name", content: "ADA" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "ADA — Assistance Distribution Auto" },
      { name: "twitter:title", content: "ADA — Assistance Distribution Auto" },
      { property: "og:description", content: "Location de véhicules courte & longue durée et réparation de pare-brise en Côte d'Ivoire." },
      { name: "twitter:description", content: "Location de véhicules courte & longue durée et réparation de pare-brise en Côte d'Ivoire." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/afb8ad39-2452-494f-b9ee-3295a5dbf7e7/id-preview-60a2de57--bdd29baf-067a-47c5-b52e-ee9bf4354281.lovable.app-1781876893137.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/afb8ad39-2452-494f-b9ee-3295a5dbf7e7/id-preview-60a2de57--bdd29baf-067a-47c5-b52e-ee9bf4354281.lovable.app-1781876893137.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "shortcut icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isDashboard = pathname.startsWith("/dashboard");
  const isPrint = pathname.includes("/print");
  const hideChrome = isDashboard || isPrint;
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        {!hideChrome && <Navbar />}
        <main className="flex-1">
          <Outlet />
        </main>
        {!hideChrome && <Footer />}
        {!hideChrome && <WhatsAppButton />}
      </div>
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}
