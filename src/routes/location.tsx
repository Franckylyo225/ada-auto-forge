import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/location")({
  component: () => <Navigate to="/ada/services" replace />,
});
