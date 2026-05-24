import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/ada/DashboardShell";

export const Route = createFileRoute("/dashboard/flotte")({
  head: () => ({ meta: [{ title: "Flotte — ADA Agent" }] }),
  component: () => (
    <DashboardShell>
      <h1 className="text-2xl md:text-3xl font-black">Flotte</h1>
      <p className="mt-4 text-muted-foreground">Module à venir — gestion de la flotte (véhicules, disponibilité, entretien).</p>
    </DashboardShell>
  ),
});
