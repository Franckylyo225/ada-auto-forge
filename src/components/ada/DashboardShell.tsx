import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  ClipboardList, FolderOpen, CheckCircle2, Car, Settings,
  LogOut, Menu, X,
} from "lucide-react";
import logo from "@/assets/ada-logo.png";
import { useAgent, useRentals, agentAuth } from "@/lib/ada-storage";

const NAV = [
  { to: "/dashboard/demandes", label: "Demandes en attente", icon: ClipboardList, key: "pending" },
  { to: "/dashboard/contrats", label: "Contrats actifs", icon: FolderOpen, key: "active" },
  { to: "/dashboard/contrats-clotures", label: "Contrats clôturés", icon: CheckCircle2, key: "closed" },
  { to: "/dashboard/flotte", label: "Flotte", icon: Car, key: "fleet" },
  { to: "/dashboard/parametres", label: "Paramètres", icon: Settings, key: "settings" },
] as const;

export function DashboardShell({ children }: { children: ReactNode }) {
  const agent = useAgent();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  const rentals = useRentals();
  const counts = {
    pending: rentals.filter((r) => r.status === "pending" || r.status === "processing").length,
    active: rentals.filter((r) => r.status === "confirmed" || r.status === "active").length,
    closed: rentals.filter((r) => r.status === "closed").length,
    fleet: 0, settings: 0,
  };

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    if (!agent) navigate({ to: "/dashboard/login" });
  }, [agent, navigate]);

  if (!agent) return null;

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-ada-black text-white flex flex-col transition-transform lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="ADA" className="h-9 w-auto bg-white rounded p-1" />
            <span className="font-black tracking-tight">Espace Agent</span>
          </Link>
          <button className="lg:hidden p-1.5 rounded hover:bg-white/10" onClick={() => setMobileOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(({ to, label, icon: Icon, key }) => {
            const active = pathname === to || pathname.startsWith(to + "/");
            const count = counts[key as keyof typeof counts];
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  active ? "bg-ada-yellow text-ada-black" : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="flex-1">{label}</span>
                {count > 0 && (
                  <span className={`text-xs font-bold rounded-full px-2 py-0.5 ${active ? "bg-ada-black text-ada-yellow" : "bg-ada-yellow text-ada-black"}`}>
                    {count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => { agentAuth.logout(); navigate({ to: "/dashboard/login" }); }}
            className="w-full flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-white/70 hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" /> Déconnexion
          </button>
        </div>
      </aside>

      {mobileOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-20 bg-white border-b border-border">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <div className="flex items-center gap-3">
              <button className="lg:hidden p-2 rounded hover:bg-muted" onClick={() => setMobileOpen(true)}>
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <div className="text-xs text-muted-foreground">Bonjour,</div>
                <div className="font-bold">{agent.firstName}</div>
              </div>
            </div>
            <button
              onClick={() => { agentAuth.logout(); navigate({ to: "/dashboard/login" }); }}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ada-black"
              aria-label="Déconnexion"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
