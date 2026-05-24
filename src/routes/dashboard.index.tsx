import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAgent } from "@/lib/ada-storage";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
});

function DashboardIndex() {
  const navigate = useNavigate();
  const agent = useAgent();
  useEffect(() => {
    navigate({ to: agent ? "/dashboard/demandes" : "/dashboard/login", replace: true });
  }, [agent, navigate]);
  return null;
}
