import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/ada/DashboardShell";
import { useAgent } from "@/lib/ada-storage";

export const Route = createFileRoute("/dashboard/parametres")({
  head: () => ({ meta: [{ title: "Paramètres — ADA Agent" }] }),
  component: () => <DashboardShell><Page /></DashboardShell>,
});

function Page() {
  const agent = useAgent();
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-black">Paramètres</h1>
      <div className="mt-6 max-w-lg rounded-2xl bg-white border border-border p-6">
        <h2 className="font-bold">Compte agent</h2>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between"><dt className="text-muted-foreground">Email</dt><dd className="font-semibold">{agent?.email}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">Prénom</dt><dd className="font-semibold">{agent?.firstName}</dd></div>
        </dl>
      </div>
    </div>
  );
}
