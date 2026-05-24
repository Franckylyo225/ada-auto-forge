import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { DashboardShell } from "@/components/ada/DashboardShell";
import { useRentals } from "@/lib/ada-storage";
import { Printer } from "lucide-react";

export const Route = createFileRoute("/dashboard/contrats-clotures")({
  head: () => ({ meta: [{ title: "Contrats clôturés — ADA Agent" }] }),
  component: () => <DashboardShell><Closed /></DashboardShell>,
});

function Closed() {
  const all = useRentals();
  const list = useMemo(() => all.filter((r) => r.status === "closed"), [all]);
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-black mb-1">Contrats clôturés</h1>
      <p className="text-sm text-muted-foreground mb-6">{list.length} contrat{list.length > 1 ? "s" : ""}</p>

      <div className="rounded-2xl border border-border bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-muted-foreground">
              <tr>
                {["Réf.", "Client", "Véhicule", "Clôturé le", "Km parcourus", "Total", "Actions"].map((h) => (
                  <th key={h} className="text-left text-xs uppercase font-semibold px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.length === 0 && (
                <tr><td colSpan={7} className="p-12 text-center text-muted-foreground">Aucun contrat clôturé.</td></tr>
              )}
              {list.map((r) => {
                const km = (r.contract?.endKm || 0) - (r.contract?.startKm || 0);
                return (
                  <tr key={r.id} className="border-t border-border hover:bg-muted/30">
                    <td className="px-4 py-3 font-mono font-bold">{r.id}</td>
                    <td className="px-4 py-3">{r.firstName} {r.lastName}</td>
                    <td className="px-4 py-3">{r.contract?.brandModel} · <span className="font-mono">{r.contract?.plate}</span></td>
                    <td className="px-4 py-3">{r.contract?.closedAt ? new Date(r.contract.closedAt).toLocaleDateString("fr-FR") : "—"}</td>
                    <td className="px-4 py-3">{km > 0 ? `${km} km` : "—"}</td>
                    <td className="px-4 py-3 font-bold">{(r.contract?.totalAmount || 0).toLocaleString("fr-FR")} F</td>
                    <td className="px-4 py-3">
                      <a href={`/dashboard/contrats/${r.id}/print`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm underline">
                        <Printer className="h-3.5 w-3.5" /> Contrat
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
