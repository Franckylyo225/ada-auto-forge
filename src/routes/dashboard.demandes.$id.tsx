import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { DashboardShell } from "@/components/ada/DashboardShell";
import { rentalsStore, useRentals, type ContractData } from "@/lib/ada-storage";
import { ArrowLeft, Save, CheckCircle2, Printer } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/demandes/$id")({
  head: () => ({ meta: [{ title: "Traitement demande — ADA Agent" }] }),
  component: () => <DashboardShell><ProcessPage /></DashboardShell>,
});

const DEFAULT_CONTRACT: ContractData = {
  brandModel: "", plate: "", deliveredBy: "",
  dailyRate: 0, kmPerDay: 200, extraKmCost: 0, totalAmount: 0, deposit: 0,
  insuranceType: "Tous risques",
  buybackDamage: false, theftFranchise: false, damageFranchise: false,
  driverPassenger: false, individualAccident: false,
  amountReceived: 0, paymentMode: "Espèces", startKm: 0,
  docs: {
    carteGrise: false, attestationAssurance: false, galerie: false,
    kitSecurite: false, roueSecours: false, plombCompteur: false, cric: false,
  },
  agentNotes: "",
};

function ProcessPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const rentals = useRentals();
  const rental = useMemo(() => rentals.find((r) => r.id === id), [rentals, id]);

  const [c, setC] = useState<ContractData>(DEFAULT_CONTRACT);

  useEffect(() => {
    if (rental?.contract) setC(rental.contract);
  }, [rental?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const total = (Number(c.dailyRate) || 0) * (rental?.durationDays || 0);
  useEffect(() => {
    setC((prev) => (prev.totalAmount === total ? prev : { ...prev, totalAmount: total }));
  }, [total]);

  if (!rental) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Demande introuvable.</p>
        <Link to="/dashboard/demandes" className="mt-4 inline-block underline">Retour</Link>
      </div>
    );
  }

  const save = (newStatus?: "processing" | "confirmed") => {
    rentalsStore.update(rental.id, {
      contract: c,
      ...(newStatus ? { status: newStatus } : {}),
    });
    toast.success(newStatus === "confirmed" ? "Contrat validé" : "Brouillon sauvegardé");
  };

  const validate = () => {
    if (!c.brandModel || !c.plate) {
      toast.error("Marque/modèle et immatriculation requis");
      return;
    }
    save("confirmed");
    setTimeout(() => navigate({ to: "/dashboard/contrats" }), 600);
  };

  const goPrint = () => {
    save();
    window.open(`/dashboard/contrats/${rental.id}/print`, "_blank");
  };

  return (
    <div>
      <Link to="/dashboard/demandes" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-ada-black mb-4">
        <ArrowLeft className="h-4 w-4" /> Retour aux demandes
      </Link>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black">Traitement <span className="text-ada-yellow">{rental.id}</span></h1>
          <p className="text-sm text-muted-foreground">{rental.firstName} {rental.lastName} · {rental.vehicleType}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => save("processing")} className="inline-flex items-center gap-2 rounded-full bg-white border border-border px-4 py-2 text-sm font-semibold hover:bg-muted">
            <Save className="h-4 w-4" /> Sauvegarder
          </button>
          <button onClick={goPrint} className="inline-flex items-center gap-2 rounded-full bg-ada-black text-white px-4 py-2 text-sm font-semibold hover:brightness-110">
            <Printer className="h-4 w-4" /> Imprimer
          </button>
          <button onClick={validate} className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black px-4 py-2 text-sm font-bold hover:brightness-95">
            <CheckCircle2 className="h-4 w-4" /> Valider le contrat
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* LEFT: client info */}
        <section className="rounded-2xl border border-border bg-white p-6">
          <h2 className="font-bold text-lg mb-4">Informations client</h2>
          <DL>
            <DI label="Nom complet">{rental.firstName} {rental.lastName}</DI>
            <DI label="Né(e) le">{fmt(rental.birthDate)}</DI>
            <DI label="Téléphone">{rental.phone}</DI>
            <DI label="Adresse">{rental.address}</DI>
            <DI label="Profession">{rental.profession || "—"}</DI>
            <DI label="N° Permis">{rental.licenseNumber} (cat. {rental.licenseCategory})</DI>
            <DI label="Délivré">{fmt(rental.licenseIssuedAt)} à {rental.licenseIssuedPlace}</DI>
          </DL>
          <h3 className="font-bold mt-6 mb-3">Véhicule demandé</h3>
          <DL>
            <DI label="Type">{rental.vehicleType}</DI>
            <DI label="Usage">{rental.usage}</DI>
            <DI label="Départ">{fmt(rental.startDate)}</DI>
            <DI label="Durée">{rental.durationDays} jours</DI>
            <DI label="Km estimé">{rental.estimatedKm ?? "—"}</DI>
            <DI label="Hors CI">{rental.outsideCI ? "Oui" : "Non"}</DI>
          </DL>
          {rental.observations && (
            <div className="mt-5 rounded-xl bg-muted p-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Observations client</div>
              <p className="text-sm">{rental.observations}</p>
            </div>
          )}
        </section>

        {/* RIGHT: agent fields */}
        <section className="space-y-6">
          <Card title="Affectation véhicule">
            <Grid>
              <In label="Marque & Modèle *" value={c.brandModel} onChange={(v) => setC({ ...c, brandModel: v })} />
              <In label="N° Immatriculation *" value={c.plate} onChange={(v) => setC({ ...c, plate: v.toUpperCase() })} />
              <In label="Livré par" value={c.deliveredBy} onChange={(v) => setC({ ...c, deliveredBy: v })} />
            </Grid>
          </Card>

          <Card title="Tarification">
            <Grid>
              <Num label="Tarif journalier (FCFA) *" value={c.dailyRate} onChange={(v) => setC({ ...c, dailyRate: v })} />
              <Num label="Km inclus par jour" value={c.kmPerDay} onChange={(v) => setC({ ...c, kmPerDay: v })} />
              <Num label="Coût km supplémentaire (FCFA)" value={c.extraKmCost} onChange={(v) => setC({ ...c, extraKmCost: v })} />
              <div>
                <Lbl>Montant total</Lbl>
                <div className="mt-1.5 rounded-xl bg-ada-yellow/15 border border-ada-yellow px-4 py-2.5 font-black text-lg">
                  {total.toLocaleString("fr-FR")} FCFA
                </div>
              </div>
              <Num label="Garantie / Caution (FCFA)" value={c.deposit} onChange={(v) => setC({ ...c, deposit: v })} />
            </Grid>
          </Card>

          <Card title="Assurances & options">
            <In label="Type d'assurance" value={c.insuranceType} onChange={(v) => setC({ ...c, insuranceType: v })} />
            <div className="mt-4 grid sm:grid-cols-2 gap-2">
              <Toggle label="Rachat de franchise dommages" checked={c.buybackDamage} onChange={(v) => setC({ ...c, buybackDamage: v })} />
              <Toggle label="Franchise vol" checked={c.theftFranchise} onChange={(v) => setC({ ...c, theftFranchise: v })} />
              <Toggle label="Franchise dommages" checked={c.damageFranchise} onChange={(v) => setC({ ...c, damageFranchise: v })} />
              <Toggle label="Conducteur & passager" checked={c.driverPassenger} onChange={(v) => setC({ ...c, driverPassenger: v })} />
              <Toggle label="Individuelle accident" checked={c.individualAccident} onChange={(v) => setC({ ...c, individualAccident: v })} />
            </div>
          </Card>

          <Card title="Règlement">
            <Grid>
              <Num label="Montant reçu (FCFA)" value={c.amountReceived} onChange={(v) => setC({ ...c, amountReceived: v })} />
              <div>
                <Lbl>Mode de règlement</Lbl>
                <select
                  value={c.paymentMode}
                  onChange={(e) => setC({ ...c, paymentMode: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-border px-4 py-2.5 text-sm"
                >
                  {["Espèces", "Chèque", "Virement", "CB", "Autre"].map((m) => <option key={m}>{m}</option>)}
                </select>
              </div>
              <Num label="Km au départ" value={c.startKm} onChange={(v) => setC({ ...c, startKm: v })} />
            </Grid>
          </Card>

          <Card title="Documents & accessoires">
            <div className="grid sm:grid-cols-2 gap-2">
              {([
                ["carteGrise", "Carte grise"],
                ["attestationAssurance", "Attestation d'assurance"],
                ["galerie", "Galerie"],
                ["kitSecurite", "Kit sécurité"],
                ["roueSecours", "Roue de secours"],
                ["plombCompteur", "Plomb compteur"],
                ["cric", "Cric"],
              ] as const).map(([k, label]) => (
                <label key={k} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 cursor-pointer hover:bg-muted">
                  <input
                    type="checkbox"
                    checked={c.docs[k]}
                    onChange={(e) => setC({ ...c, docs: { ...c.docs, [k]: e.target.checked } })}
                    className="h-4 w-4 accent-ada-yellow"
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

const fmt = (d: string) => d ? new Date(d).toLocaleDateString("fr-FR") : "—";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="rounded-2xl border border-border bg-white p-6"><h2 className="font-bold text-lg mb-4">{title}</h2>{children}</div>;
}
function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid sm:grid-cols-2 gap-4">{children}</div>;
}
function Lbl({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-semibold text-ada-black/80">{children}</label>;
}
function In({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <Lbl>{label}</Lbl>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="mt-1.5 w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ada-yellow" />
    </div>
  );
}
function Num({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <Lbl>{label}</Lbl>
      <input
        type="number" min={0} value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="mt-1.5 w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ada-yellow"
      />
    </div>
  );
}
function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between rounded-lg border border-border px-3 py-2 cursor-pointer hover:bg-muted">
      <span className="text-sm">{label}</span>
      <button
        type="button" role="switch" aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${checked ? "bg-ada-yellow" : "bg-muted-foreground/30"}`}
      >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${checked ? "translate-x-6" : "translate-x-1"}`} />
      </button>
    </label>
  );
}

function DL({ children }: { children: React.ReactNode }) {
  return <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</dl>;
}
function DI({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-sm font-medium">{children}</dd>
    </div>
  );
}
