import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { DashboardShell } from "@/components/ada/DashboardShell";
import { useRentals, STATUS_LABEL, rentalsStore, type RentalStatus } from "@/lib/ada-storage";
import { Eye, Settings as SettingsIcon, Ban, Search } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/demandes")({
  head: () => ({ meta: [{ title: "Demandes — ADA Agent" }] }),
  component: () => <DashboardShell><DemandesList /></DashboardShell>,
});

const statusColors: Record<RentalStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  processing: "bg-blue-100 text-blue-800 border-blue-300",
  confirmed: "bg-green-100 text-green-800 border-green-300",
  cancelled: "bg-red-100 text-red-800 border-red-300",
  active: "bg-green-100 text-green-800 border-green-300",
  closed: "bg-gray-100 text-gray-700 border-gray-300",
};

function DemandesList() {
  const all = useRentals();
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const items = all.filter((r) => ["pending", "processing", "cancelled"].includes(r.status));
    if (!q.trim()) return items;
    const s = q.toLowerCase();
    return items.filter((r) =>
      r.id.toLowerCase().includes(s) ||
      r.lastName.toLowerCase().includes(s) ||
      r.firstName.toLowerCase().includes(s) ||
      r.phone.includes(s),
    );
  }, [all, q]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black">Demandes en attente</h1>
          <p className="text-sm text-muted-foreground mt-1">{list.length} demande{list.length > 1 ? "s" : ""}</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher (réf, nom, tél)…"
            className="pl-9 pr-4 py-2.5 w-full md:w-80 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ada-yellow"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-muted-foreground">
              <tr>
                <Th>Réf.</Th><Th>Date</Th><Th>Client</Th><Th>Véhicule</Th>
                <Th>Usage</Th><Th>Départ</Th><Th>Durée</Th><Th>Statut</Th><Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 && (
                <tr><td colSpan={9} className="p-12 text-center text-muted-foreground">Aucune demande pour le moment.</td></tr>
              )}
              {list.map((r) => (
                <tr key={r.id} className="border-t border-border hover:bg-muted/30">
                  <Td className="font-mono font-bold">{r.id}</Td>
                  <Td>{new Date(r.createdAt).toLocaleDateString("fr-FR")}</Td>
                  <Td>{r.firstName} {r.lastName}<div className="text-xs text-muted-foreground">{r.phone}</div></Td>
                  <Td>{r.vehicleType}</Td>
                  <Td>{r.usage}</Td>
                  <Td>{new Date(r.startDate).toLocaleDateString("fr-FR")}</Td>
                  <Td>{r.durationDays} j</Td>
                  <Td>
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusColors[r.status]}`}>
                      {STATUS_LABEL[r.status]}
                    </span>
                  </Td>
                  <Td className="text-right">
                    <div className="inline-flex gap-1">
                      <Link to="/dashboard/demandes/$id" params={{ id: r.id }} className="p-2 rounded-lg hover:bg-muted" title="Traiter">
                        <SettingsIcon className="h-4 w-4" />
                      </Link>
                      <Link to="/dashboard/demandes/$id" params={{ id: r.id }} className="p-2 rounded-lg hover:bg-muted" title="Voir">
                        <Eye className="h-4 w-4" />
                      </Link>
                      {r.status !== "cancelled" && (
                        <button
                          onClick={() => {
                            if (confirm("Annuler cette demande ?")) {
                              rentalsStore.update(r.id, { status: "cancelled" });
                              toast.success("Demande annulée");
                            }
                          }}
                          className="p-2 rounded-lg hover:bg-muted text-red-600" title="Annuler"
                        >
                          <Ban className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <th className={`text-left font-semibold uppercase tracking-wider text-xs px-4 py-3 ${className}`}>{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-top ${className}`}>{children}</td>;
}
