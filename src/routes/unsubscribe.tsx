import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/unsubscribe")({
  component: UnsubscribePage,
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === "string" ? search.token : "",
  }),
});

type State =
  | { kind: "loading" }
  | { kind: "ready" }
  | { kind: "already" }
  | { kind: "invalid" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

function UnsubscribePage() {
  const { token } = Route.useSearch();
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    if (!token) {
      setState({ kind: "invalid" });
      return;
    }
    fetch(`/email/unsubscribe?token=${encodeURIComponent(token)}`)
      .then(async (r) => {
        const data = await r.json().catch(() => ({}));
        if (!r.ok) return setState({ kind: "invalid" });
        if (data.valid === false && data.reason === "already_unsubscribed")
          return setState({ kind: "already" });
        if (data.valid) return setState({ kind: "ready" });
        setState({ kind: "invalid" });
      })
      .catch(() => setState({ kind: "invalid" }));
  }, [token]);

  async function confirm() {
    setState({ kind: "submitting" });
    try {
      const r = await fetch("/email/unsubscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) return setState({ kind: "error", message: data.error || "Erreur" });
      if (data.success) return setState({ kind: "success" });
      if (data.reason === "already_unsubscribed") return setState({ kind: "already" });
      setState({ kind: "error", message: "Erreur inconnue" });
    } catch (e) {
      setState({ kind: "error", message: (e as Error).message });
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center rounded-3xl border border-border bg-white p-8 shadow-[var(--shadow-premium)]">
        <h1 className="text-2xl font-black text-ada-black">Désabonnement</h1>
        {state.kind === "loading" && (
          <p className="mt-4 text-muted-foreground">Vérification…</p>
        )}
        {state.kind === "invalid" && (
          <p className="mt-4 text-muted-foreground">
            Ce lien de désabonnement est invalide ou a expiré.
          </p>
        )}
        {state.kind === "already" && (
          <p className="mt-4 text-muted-foreground">
            Cette adresse est déjà désabonnée. Vous ne recevrez plus d'emails de notre part.
          </p>
        )}
        {state.kind === "ready" && (
          <>
            <p className="mt-4 text-muted-foreground">
              Confirmez-vous vouloir vous désabonner de nos emails&nbsp;?
            </p>
            <button
              onClick={confirm}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-ada-yellow px-6 py-3 text-sm font-semibold text-ada-black hover:brightness-95 transition"
            >
              Confirmer le désabonnement
            </button>
          </>
        )}
        {state.kind === "submitting" && (
          <p className="mt-4 text-muted-foreground">Traitement…</p>
        )}
        {state.kind === "success" && (
          <p className="mt-4 text-muted-foreground">
            Vous êtes désabonné(e). Merci et à bientôt.
          </p>
        )}
        {state.kind === "error" && (
          <p className="mt-4 text-destructive">Erreur : {state.message}</p>
        )}
      </div>
    </div>
  );
}
