import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { useRentals, type RentalRequest } from "@/lib/ada-storage";
import { Printer, ArrowLeft } from "lucide-react";
import logo from "@/assets/ada-logo.png";

export const Route = createFileRoute("/dashboard/contrats/$id/print")({
  head: () => ({ meta: [{ title: "Contrat de location — ADA" }] }),
  component: PrintPage,
});

function PrintPage() {
  const { id } = Route.useParams();
  const rentals = useRentals();
  const rental = useMemo(() => rentals.find((r) => r.id === id), [rentals, id]);

  useEffect(() => {
    const t = document.title;
    if (rental) document.title = `Contrat ${rental.id} — ${rental.firstName} ${rental.lastName}`;
    return () => { document.title = t; };
  }, [rental]);

  if (!rental) {
    return (
      <div className="p-10 text-center">
        <p>Contrat introuvable.</p>
        <Link to="/dashboard/contrats" className="underline">Retour</Link>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @page { size: A4; margin: 12mm; }
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .contract-sheet { box-shadow: none !important; border: none !important; padding: 0 !important; }
        }
        .contract-sheet { color: #0A0A0A; }
        .contract-sheet h1, .contract-sheet h2, .contract-sheet h3 { letter-spacing: -0.01em; }
        .ck { display:inline-block; width:10px; height:10px; border:1.5px solid #0A0A0A; vertical-align:middle; margin-right:4px; }
        .ck.on { background:#0A0A0A; }
      `}</style>

      <div className="min-h-screen bg-gray-200 py-8">
        <div className="no-print max-w-[210mm] mx-auto mb-4 flex justify-between items-center px-2">
          <Link to="/dashboard/contrats" className="inline-flex items-center gap-1 text-sm text-gray-700 hover:text-black">
            <ArrowLeft className="h-4 w-4" /> Retour
          </Link>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black font-bold px-5 py-2.5 hover:brightness-95"
          >
            <Printer className="h-4 w-4" /> Imprimer
          </button>
        </div>

        <ContractSheet rental={rental} />
      </div>
    </>
  );
}

function ContractSheet({ rental }: { rental: RentalRequest }) {
  const c = rental.contract;
  const Box = ({ checked }: { checked?: boolean }) => <span className={`ck ${checked ? "on" : ""}`} />;
  const today = new Date().toLocaleDateString("fr-FR");

  return (
    <div className="contract-sheet mx-auto bg-white shadow-lg" style={{ width: "210mm", minHeight: "297mm", padding: "12mm", fontSize: "11px", lineHeight: 1.4 }}>
      {/* Header */}
      <div className="flex items-start justify-between border-b-2 border-ada-black pb-3">
        <div className="flex items-center gap-3">
          <img src={logo} alt="ADA" style={{ height: "50px" }} />
          <div>
            <div className="font-black text-base">ASSISTANCE DISTRIBUTION AUTO</div>
            <div style={{ fontSize: "9px" }}>SARL au capital de 5 000 000 FCFA</div>
            <div style={{ fontSize: "9px" }}>Cocody – Riviera Bonoumin, Abidjan 01</div>
            <div style={{ fontSize: "9px" }}>Tél : +225 27 21 252 785 · +225 07 00 282 930</div>
            <div style={{ fontSize: "9px" }}>RCCM N° CI-ABJ-03-2024-B13-04287</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-black text-lg tracking-tight">CONTRAT DE LOCATION</div>
          <div className="mt-1"><b>Réf :</b> <span className="font-mono">{rental.id}</span></div>
          <div><b>Date :</b> {today}</div>
        </div>
      </div>

      {/* Véhicule */}
      <Row3>
        <Cell label="Marque / Type">{c?.brandModel || "—"}</Cell>
        <Cell label="Immatriculation">{c?.plate || "—"}</Cell>
        <Cell label="Livré par">{c?.deliveredBy || "—"}</Cell>
      </Row3>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <Section title="Départ du véhicule">
          <Line label="À partir du" value={fmt(rental.startDate)} />
          <Line label="Durée" value={`${rental.durationDays} jours`} />
          <Line label="Km prévus" value={rental.estimatedKm ? String(rental.estimatedKm) : "—"} />
          <Line label="Circulation hors CI" value={rental.outsideCI ? "Oui" : "Non"} />
        </Section>
        <Section title="Convention de location">
          <Line label="Tarif / jour" value={`${(c?.dailyRate || 0).toLocaleString("fr-FR")} FCFA`} />
          <Line label="Km inclus" value={String(c?.kmPerDay || 0)} />
          <Line label="Km suppl." value={`${(c?.extraKmCost || 0).toLocaleString("fr-FR")} FCFA/km`} />
          <Line label="Total" value={`${(c?.totalAmount || 0).toLocaleString("fr-FR")} FCFA`} bold />
          <Line label="Garantie" value={`${(c?.deposit || 0).toLocaleString("fr-FR")} FCFA`} />
        </Section>
      </div>

      {/* Conducteur */}
      <Section title="Conducteur agréé" className="mt-3">
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <Line label="Nom" value={rental.lastName} />
          <Line label="Prénoms" value={rental.firstName} />
          <Line label="Né(e) le" value={fmt(rental.birthDate)} />
          <Line label="Profession" value={rental.profession || "—"} />
          <div className="col-span-2"><Line label="Adresse" value={rental.address} /></div>
          <Line label="Téléphone" value={rental.phone} />
          <Line label="Permis N°" value={rental.licenseNumber} />
          <Line label="Catégorie" value={rental.licenseCategory} />
          <Line label="Délivré le" value={`${fmt(rental.licenseIssuedAt)} à ${rental.licenseIssuedPlace}`} />
        </div>
      </Section>

      {/* Assurances */}
      <Section title="Assurances" className="mt-3">
        <div className="grid grid-cols-2 gap-y-1">
          <div>Type : <b>{c?.insuranceType || "—"}</b></div>
          <div><Box checked={c?.buybackDamage} /> Rachat franchise dommages</div>
          <div><Box checked={c?.theftFranchise} /> Franchise vol</div>
          <div><Box checked={c?.damageFranchise} /> Franchise dommages</div>
          <div><Box checked={c?.driverPassenger} /> Conducteur & passager</div>
          <div><Box checked={c?.individualAccident} /> Individuelle accident</div>
          <div><Box checked={rental.outsideCI} /> Circulation étranger</div>
        </div>
      </Section>

      {/* Règlement */}
      <Section title="Règlement" className="mt-3">
        <div className="grid grid-cols-3 gap-x-4">
          <Line label="Reçu" value={`${(c?.amountReceived || 0).toLocaleString("fr-FR")} FCFA`} />
          <Line label="Mode" value={c?.paymentMode || "—"} />
          <Line label="Total" value={`${(c?.totalAmount || 0).toLocaleString("fr-FR")} FCFA`} bold />
        </div>
      </Section>

      {/* Documents */}
      <Section title="Documents & accessoires" className="mt-3">
        <div className="grid grid-cols-3 gap-y-1">
          <div><Box checked={c?.docs.carteGrise} /> Carte grise</div>
          <div><Box checked={c?.docs.attestationAssurance} /> Assurance</div>
          <div><Box checked={c?.docs.galerie} /> Galerie</div>
          <div><Box checked={c?.docs.kitSecurite} /> Kit sécurité</div>
          <div><Box checked={c?.docs.roueSecours} /> Roue de secours</div>
          <div><Box checked={c?.docs.plombCompteur} /> Plomb compteur</div>
          <div><Box checked={c?.docs.cric} /> Cric</div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 mt-2">
          <Line label="Km au départ" value={String(c?.startKm ?? "—")} />
          <Line label="Km au retour" value={c?.endKm != null ? String(c.endKm) : "_______________"} />
        </div>
      </Section>

      {/* Observations */}
      <Section title="Observations" className="mt-3">
        <div style={{ minHeight: "30px" }}>{rental.observations || c?.agentNotes || ""}</div>
      </Section>

      {/* Signatures */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="border-t border-ada-black pt-2 text-center">
          <div className="font-bold">Signature Locataire</div>
          <div style={{ fontSize: "9px" }} className="italic text-gray-600">(lu et approuvé)</div>
          <div style={{ height: "50px" }} />
        </div>
        <div className="border-t border-ada-black pt-2 text-center">
          <div className="font-bold">Signature Loueur</div>
          <div style={{ height: "60px" }} />
        </div>
      </div>
    </div>
  );
}

const fmt = (d: string) => d ? new Date(d).toLocaleDateString("fr-FR") : "—";

function Section({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`border border-ada-black rounded ${className}`}>
      <div className="bg-ada-yellow text-ada-black font-bold uppercase tracking-wider px-3 py-1" style={{ fontSize: "10px" }}>{title}</div>
      <div className="px-3 py-2">{children}</div>
    </div>
  );
}
function Row3({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-3 gap-3 mt-3">{children}</div>;
}
function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border border-ada-black rounded px-3 py-2">
      <div className="uppercase font-bold" style={{ fontSize: "9px" }}>{label}</div>
      <div className="font-semibold">{children}</div>
    </div>
  );
}
function Line({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex gap-2">
      <span className="text-gray-700">{label} :</span>
      <span className={bold ? "font-bold" : "font-semibold"}>{value}</span>
    </div>
  );
}
