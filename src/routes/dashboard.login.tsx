import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent, useEffect } from "react";
import { toast } from "sonner";
import { agentAuth, useAgent } from "@/lib/ada-storage";
import logo from "@/assets/ada-logo.png";
import { LogIn } from "lucide-react";

export const Route = createFileRoute("/dashboard/login")({
  head: () => ({ meta: [{ title: "Connexion Agent — ADA" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const agent = useAgent();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (agent) navigate({ to: "/dashboard/demandes", replace: true });
  }, [agent, navigate]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      agentAuth.login(email.trim(), password);
      toast.success("Bienvenue !");
      navigate({ to: "/dashboard/demandes" });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-ada-black p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <div className="flex flex-col items-center text-center">
          <img src={logo} alt="ADA" className="h-14 w-auto" />
          <h1 className="mt-5 text-2xl font-black">Espace Agent</h1>
          <p className="mt-1 text-sm text-muted-foreground">Connectez-vous pour gérer les demandes.</p>
        </div>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="agent@ada.ci"
              className="mt-1.5 w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ada-yellow"
            />
          </div>
          <div>
            <label className="text-sm font-semibold">Mot de passe</label>
            <input
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1.5 w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ada-yellow"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ada-yellow text-ada-black font-bold py-3 hover:brightness-95 disabled:opacity-60"
          >
            <LogIn className="h-4 w-4" /> Se connecter
          </button>
          <p className="text-center text-xs text-muted-foreground">
            Mode démo : tout email/mot de passe est accepté.
          </p>
        </form>
      </div>
    </div>
  );
}
