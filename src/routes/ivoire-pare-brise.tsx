import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/ivoire-pare-brise")({
  component: () => <Navigate to="/ipb" replace />,
});
