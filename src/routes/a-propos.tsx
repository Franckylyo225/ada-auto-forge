import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/a-propos")({
  component: () => <Navigate to="/ada/a-propos" replace />,
});
