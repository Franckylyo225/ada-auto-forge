// Demo localStorage store for ADA rentals + agent auth.
// Not production. Keys are namespaced under `ada:`.

export type RentalStatus = "pending" | "processing" | "confirmed" | "cancelled" | "active" | "closed";

export interface RentalRequest {
  id: string; // ADA-XXXXXX
  createdAt: string;
  status: RentalStatus;

  // Vehicle block
  vehicleType: string;
  usage: string;
  startDate: string;
  durationDays: number;
  estimatedKm?: number;
  outsideCI: boolean;

  // Client block
  lastName: string;
  firstName: string;
  birthDate: string;
  address: string;
  phone: string;
  profession?: string;
  licenseNumber: string;
  licenseCategory: string;
  licenseIssuedAt: string;
  licenseIssuedPlace: string;

  observations?: string;

  // Agent-filled (optional until processed)
  contract?: ContractData;
}

export interface ContractData {
  brandModel: string;
  plate: string;
  deliveredBy: string;

  dailyRate: number;
  kmPerDay: number;
  extraKmCost: number;
  totalAmount: number;
  deposit: number;

  insuranceType: string;
  buybackDamage: boolean;
  theftFranchise: boolean;
  damageFranchise: boolean;
  driverPassenger: boolean;
  individualAccident: boolean;

  amountReceived: number;
  paymentMode: string;
  startKm: number;

  docs: {
    carteGrise: boolean;
    attestationAssurance: boolean;
    galerie: boolean;
    kitSecurite: boolean;
    roueSecours: boolean;
    plombCompteur: boolean;
    cric: boolean;
  };

  agentNotes?: string;

  // Closure
  endKm?: number;
  returnCondition?: string;
  returnDocs?: ContractData["docs"];
  returnNotes?: string;
  closedAt?: string;
}

const KEY = "ada:rentals:v1";
const AUTH_KEY = "ada:agent:v1";

function read(): RentalRequest[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as RentalRequest[];
  } catch {
    return [];
  }
}

function write(list: RentalRequest[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent("ada:rentals:changed"));
}

export function generateRef() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `ADA-${n}`;
}

export const rentalsStore = {
  list(): RentalRequest[] {
    return read().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  get(id: string): RentalRequest | undefined {
    return read().find((r) => r.id === id);
  },
  create(data: Omit<RentalRequest, "id" | "createdAt" | "status">): RentalRequest {
    const item: RentalRequest = {
      ...data,
      id: generateRef(),
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    const list = read();
    list.push(item);
    write(list);
    return item;
  },
  update(id: string, patch: Partial<RentalRequest>): RentalRequest | undefined {
    const list = read();
    const i = list.findIndex((r) => r.id === id);
    if (i === -1) return undefined;
    list[i] = { ...list[i], ...patch };
    write(list);
    return list[i];
  },
  remove(id: string) {
    write(read().filter((r) => r.id !== id));
  },
};

/* ------------------------------ Demo auth ------------------------------ */

export interface AgentSession {
  email: string;
  firstName: string;
}

export const agentAuth = {
  current(): AgentSession | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      return raw ? (JSON.parse(raw) as AgentSession) : null;
    } catch {
      return null;
    }
  },
  login(email: string, password: string): AgentSession {
    // Demo: accept any non-empty credentials.
    if (!email || !password) throw new Error("Identifiants requis");
    const firstName = email.split("@")[0].split(".")[0];
    const session: AgentSession = {
      email,
      firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    window.dispatchEvent(new CustomEvent("ada:agent:changed"));
    return session;
  },
  logout() {
    localStorage.removeItem(AUTH_KEY);
    window.dispatchEvent(new CustomEvent("ada:agent:changed"));
  },
};

/* ------------------------------ React hooks ----------------------------- */

import { useEffect, useState } from "react";

export function useRentals(): RentalRequest[] {
  const [list, setList] = useState<RentalRequest[]>(() => rentalsStore.list());
  useEffect(() => {
    const handler = () => setList(rentalsStore.list());
    window.addEventListener("ada:rentals:changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("ada:rentals:changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return list;
}

export function useAgent(): AgentSession | null {
  const [agent, setAgent] = useState<AgentSession | null>(() => agentAuth.current());
  useEffect(() => {
    const handler = () => setAgent(agentAuth.current());
    window.addEventListener("ada:agent:changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("ada:agent:changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return agent;
}

export const STATUS_LABEL: Record<RentalStatus, string> = {
  pending: "En attente",
  processing: "En traitement",
  confirmed: "Confirmé",
  cancelled: "Annulé",
  active: "Actif",
  closed: "Clôturé",
};
