import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { DashboardShell } from "@/components/ada/DashboardShell";
import { rentalsStore, useRentals, type ContractData } from "@/lib/ada-storage";
import { Printer, CheckSquare, Eye } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/contrats")({
  head: () => ({ meta: [{ title: "Contrats actifs — ADA Agent" }] }),
  component: () => <DashboardShell><ActiveContracts /></DashboardShell>,
});

function ActiveContracts() {
  const all = useRentals();
  const list = useMemo(() => all.filter((r) => r.status === "confirmed" || r.status === "active"), [all]);
  const [closingId, setClosingId] = useState<string | null>(null);
  const closing = list.find((r) => r.id === closingId);

  const [endKm, setEndKm] = useState(0);
  const [returnCondition, setReturnCondition] = useState("");
  const [returnNotes, setReturnNotes] = useState("");
  const [returnDocs, setReturnDocs] = useState<ContractData["docs"]>({
    carteGrise: false, attestationAssurance: false, galerie: false,
    kitSecurite: false, roueSecours: false, plombCompteur: false, cric: false,
  });

  const openClose = (id: string) => {
    setClosingId(id);
    setEndKm(0); setReturnCondition(""); setReturnNotes("");
    setReturnDocs({
      carteGrise: true, attestationAssurance: true, galerie: false,
      kitSecurite: true, roueSecours: true, plombCompteur: false, cric: true,
    });
  };

  const submitClose = () => {
    if (!closing?.contract) return;
    rentalsStore.update(closing.id, {
      status: "closed",
      contract: {
        ...closing.contract,
        endKm, returnCondition, returnNotes, returnDocs,
        closedAt: new Date().toISOString(),
      },
    });
    toast.success("Contrat clôturé");
    setClosingId(null);
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-black mb-1">Contrats actifs</h1>
      <p className="text-sm text-muted-foreground mb-6">{list.length} contrat{list.length > 1 ? "s" : ""} en cours</p>

      <div className="rounded-2xl border border-border bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-muted-foreground">
              <tr>
                <th className="text-left text-xs uppercase font-semibold px-4 py-3">Réf.</th>
                <th className="text-left text-xs uppercase font-semibold px-4 py-3">Client</th>
                <th className="text-left text-xs uppercase font-semibold px-4 py-3">Véhicule</th>
                <th className="text-left text-xs uppercase font-semibold px-4 py-3">Immat.</th>
                <th className="text-left text-xs uppercase font-semibold px-4 py-3">Départ</th>
                <th className="text-left text-xs uppercase font-semibold px-4 py-3">Total</th>
                <th className="text-right text-xs uppercase font-semibold px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 && (
                <tr><td colSpan={7} className="p-12 text-center text-muted-foreground">Aucun contrat actif.</td></tr>
              )}
              {list.map((r) => (
                <tr key={r.id} className="border-t border-border hover:bg-muted/30">
                  <td className="px-4 py-3 font-mono font-bold">{r.id}</td>
                  <td className="px-4 py-3">{r.firstName} {r.lastName}</td>
                  <td className="px-4 py-3">{r.contract?.brandModel}</td>
                  <td className="px-4 py-3 font-mono">{r.contract?.plate}</td>
                  <td className="px-4 py-3">{new Date(r.startDate).toLocaleDateString("fr-FR")}</td>
                  <td className="px-4 py-3 font-bold">{(r.contract?.totalAmount || 0).toLocaleString("fr-FR")} F</td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-1">
                      <Link to="/dashboard/demandes/$id" params={{ id: r.id }} className="p-2 rounded-lg hover:bg-muted" title="Voir">
                        <Eye className="h-4 w-4" />
                      </Link>
                      <a href={`/dashboard/contrats/${r.id}/print`} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-muted" title="Imprimer">
                        <Printer className="h-4 w-4" />
                      </a>
                      <button onClick={() => openClose(r.id)} className="p-2 rounded-lg hover:bg-muted text-green-700" title="Clôturer">
                        <CheckSquare className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Closure modal */}
      {closing && (
        <div className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4" onClick={() => setClosingId(null)}>
          <div className="w-full max-w-2xl bg-white rounded-2xl p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-black">Retour du véhicule — {closing.id}</h2>
            <p className="text-sm text-muted-foreground mt-1">{closing.contract?.brandModel} · {closing.contract?.plate}</p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="text-sm font-semibold">Km à l'arrivée</label>
                <input type="number" value={endKm} onChange={(e) => setEndKm(Number(e.target.value) || 0)} className="mt-1.5 w-full rounded-xl border border-border px-4 py-2.5 text-sm" />
              </div>
              <div>
                <label className="text-sm font-semibold">État du véhicule</label>
                <textarea rows={2} value={returnCondition} onChange={(e) => setReturnCondition(e.target.value)} className="mt-1.5 w-full rounded-xl border border-border px-4 py-2.5 text-sm" />
              </div>
              <div>
                <label className="text-sm font-semibold">Documents retournés</label>
                <div className="mt-2 grid sm:grid-cols-2 gap-2">
                  {([
                    ["carteGrise", "Carte grise"], ["attestationAssurance", "Attestation"],
                    ["galerie", "Galerie"], ["kitSecurite", "Kit sécurité"],
                    ["roueSecours", "Roue de secours"], ["plombCompteur", "Plomb compteur"], ["cric", "Cric"],
                  ] as const).map(([k, lbl]) => (
                    <label key={k} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 cursor-pointer hover:bg-muted">
                      <input type="checkbox" checked={returnDocs[k]} onChange={(e) => setReturnDocs({ ...returnDocs, [k]: e.target.checked })} className="h-4 w-4 accent-ada-yellow" />
                      <span className="text-sm">{lbl}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold">Observations retour</label>
                <textarea rows={3} value={returnNotes} onChange={(e) => setReturnNotes(e.target.value)} className="mt-1.5 w-full rounded-xl border border-border px-4 py-2.5 text-sm" />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setClosingId(null)} className="rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-muted">Annuler</button>
              <button onClick={submitClose} className="rounded-full bg-ada-yellow text-ada-black px-4 py-2 text-sm font-bold hover:brightness-95">Valider le retour</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
