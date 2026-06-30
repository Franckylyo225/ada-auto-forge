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
import { TopBar } from "@/components/ada/TopBar";
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

import { ORG_JSONLD } from "@/lib/seo";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "theme-color", content: "#FFE800" },
      { property: "og:site_name", content: "Groupe ADA Côte d'Ivoire" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fr_CI" },
      { name: "twitter:card", content: "summary_large_image" },
      // No og:image / twitter:image here — leaf routes own their share preview.
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "shortcut icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(ORG_JSONLD),
      },
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
  const isPortal = pathname === "/";
  const hideChrome = isDashboard || isPrint || isPortal;
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        {!hideChrome && <TopBar />}
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
