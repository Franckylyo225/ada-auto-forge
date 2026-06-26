import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowRight, User as UserIcon, Shield, Building2, Landmark,
  CheckCircle2, Car, FileText, MessageSquare, Copy,
} from "lucide-react";
import { Reveal } from "@/components/ada/Reveal";
import { rentalsStore } from "@/lib/ada-storage";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/ada/reservation")({
  head: () => ({
    meta: [
      { title: "Réserver un véhicule — ADA" },
      { name: "description", content: "Demandez votre véhicule de location en 2 minutes. Notre équipe ADA vous rappelle sous 2h." },
    ],
    links: [{ rel: "canonical", href: "/ada/reservation" }],
  }),
  component: ReservationPage,
});

const VEHICLE_TYPES = ["Berline", "SUV / 4x4", "Pick-up", "Minibus", "Utilitaire", "Véhicule de prestige"] as const;
const LICENSE_CATS = ["A", "B", "C", "D", "E"] as const;

const usages = [
  { id: "Personnel", icon: UserIcon },
  { id: "Remplacement assurance", icon: Shield },
  { id: "Professionnel", icon: Building2 },
  { id: "Mission institutionnelle", icon: Landmark },
] as const;

const schema = z.object({
  vehicleType: z.enum(VEHICLE_TYPES, { message: "Sélectionnez un type de véhicule" }),
  usage: z.enum(["Personnel", "Remplacement assurance", "Professionnel", "Mission institutionnelle"]),
  startDate: z.string().min(1, "Date requise"),
  durationDays: z.coerce.number().int().min(1, "Min 1 jour").max(365),
  estimatedKm: z.coerce.number().int().min(0).max(100000).optional().or(z.literal("").transform(() => undefined)),
  outsideCI: z.boolean(),

  lastName: z.string().trim().min(1, "Nom requis").max(80),
  firstName: z.string().trim().min(1, "Prénoms requis").max(80),
  birthDate: z.string().min(1, "Date requise"),
  address: z.string().trim().min(5, "Adresse trop courte").max(300),
  phone: z.string().trim().min(8, "Téléphone invalide").max(20),
  profession: z.string().trim().max(80).optional().or(z.literal("")),
  licenseNumber: z.string().trim().min(2, "N° permis requis").max(40),
  licenseCategory: z.enum(LICENSE_CATS),
  licenseIssuedAt: z.string().min(1, "Date requise"),
  licenseIssuedPlace: z.string().trim().min(2, "Lieu requis").max(80),

  observations: z.string().trim().max(1000).optional().or(z.literal("")),
});

type FormValues = z.input<typeof schema>;

function ReservationPage() {
  const [createdRef, setCreatedRef] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema) as never,
    defaultValues: {
      vehicleType: undefined as never,
      usage: "Personnel",
      startDate: "",
      durationDays: 1 as never,
      estimatedKm: "" as never,
      outsideCI: false,
      lastName: "", firstName: "", birthDate: "", address: "", phone: "",
      profession: "", licenseNumber: "", licenseCategory: "B",
      licenseIssuedAt: "", licenseIssuedPlace: "", observations: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    const parsed = schema.parse(values);
    const item = rentalsStore.create({
      vehicleType: parsed.vehicleType,
      usage: parsed.usage,
      startDate: parsed.startDate,
      durationDays: parsed.durationDays,
      estimatedKm: parsed.estimatedKm as number | undefined,
      outsideCI: parsed.outsideCI,
      lastName: parsed.lastName,
      firstName: parsed.firstName,
      birthDate: parsed.birthDate,
      address: parsed.address,
      phone: parsed.phone,
      profession: parsed.profession || undefined,
      licenseNumber: parsed.licenseNumber,
      licenseCategory: parsed.licenseCategory,
      licenseIssuedAt: parsed.licenseIssuedAt,
      licenseIssuedPlace: parsed.licenseIssuedPlace,
      observations: parsed.observations || undefined,
    });
    setCreatedRef(item.id);
    form.reset();
    toast.success(`Demande envoyée — ${item.id}`);
  };

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = form;
  const usage = watch("usage");
  const outsideCI = watch("outsideCI");

  return (
    <>
      {/* Hero */}
      <section className="bg-ada-black text-white">
        <div className="container-ada py-16 md:py-20">
          <Reveal>
            <span className="inline-flex items-center rounded-full bg-ada-yellow text-ada-black text-xs font-bold px-4 py-1.5">
              Demande de location
            </span>
            <h1 className="mt-5 text-4xl md:text-5xl font-black tracking-tight">Réservez votre véhicule</h1>
            <p className="mt-4 max-w-2xl text-white/70 text-lg">
              Remplissez le formulaire ci-dessous, notre équipe vous contacte sous 2h pour confirmer votre réservation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Form */}
      <section className="bg-[var(--color-ada-yellow-soft)]/40 py-14 md:py-20">
        <div className="container-ada max-w-5xl">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl shadow-[var(--shadow-premium)] p-6 md:p-10 space-y-12">
            {/* BLOC 1 */}
            <FormBlock icon={Car} index={1} title="Votre véhicule">
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Type de véhicule" required error={errors.vehicleType?.message}>
                  <select {...register("vehicleType")} className={inputCls}>
                    <option value="">— Sélectionner —</option>
                    {VEHICLE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>

                <Field label="Date de départ" required error={errors.startDate?.message}>
                  <input type="date" {...register("startDate")} className={inputCls} />
                </Field>

                <Field label="Durée souhaitée" required error={errors.durationDays?.message}>
                  <div className="flex">
                    <input type="number" min={1} {...register("durationDays")} className={`${inputCls} rounded-r-none`} />
                    <span className="inline-flex items-center px-4 rounded-r-xl border border-l-0 border-border bg-muted text-sm font-semibold">jours</span>
                  </div>
                </Field>

                <Field label="Kilométrage estimé" error={errors.estimatedKm?.message as string | undefined}>
                  <input type="number" min={0} placeholder="Optionnel" {...register("estimatedKm")} className={inputCls} />
                </Field>

                <div className="md:col-span-2">
                  <Label>Usage <Req /></Label>
                  <div className="mt-2 grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {usages.map(({ id, icon: Icon }) => {
                      const selected = usage === id;
                      return (
                        <button
                          type="button"
                          key={id}
                          onClick={() => setValue("usage", id, { shouldValidate: true })}
                          className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                            selected
                              ? "border-ada-yellow bg-ada-yellow/15 text-ada-black"
                              : "border-border text-ada-black/70 hover:border-ada-yellow/60"
                          }`}
                        >
                          <Icon className="h-4 w-4" /> {id}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="md:col-span-2 flex items-center justify-between rounded-xl border border-border bg-muted/40 px-4 py-3">
                  <div>
                    <div className="font-semibold text-sm">Circulation hors Côte d'Ivoire ?</div>
                    <div className="text-xs text-muted-foreground">Cochez si le véhicule sortira du pays.</div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={outsideCI}
                    onClick={() => setValue("outsideCI", !outsideCI)}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${outsideCI ? "bg-ada-yellow" : "bg-muted-foreground/30"}`}
                  >
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${outsideCI ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>
              </div>
            </FormBlock>

            {/* BLOC 2 */}
            <FormBlock icon={FileText} index={2} title="Vos informations">
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Nom" required error={errors.lastName?.message}>
                  <input {...register("lastName")} className={inputCls} />
                </Field>
                <Field label="Prénoms" required error={errors.firstName?.message}>
                  <input {...register("firstName")} className={inputCls} />
                </Field>
                <Field label="Date de naissance" required error={errors.birthDate?.message}>
                  <input type="date" {...register("birthDate")} className={inputCls} />
                </Field>
                <Field label="Téléphone" required error={errors.phone?.message}>
                  <input type="tel" placeholder="+225 07 00 00 00 00" {...register("phone")} className={inputCls} />
                </Field>
                <Field label="Adresse complète" required error={errors.address?.message} className="md:col-span-2">
                  <textarea rows={2} {...register("address")} className={inputCls} />
                </Field>
                <Field label="Profession" error={errors.profession?.message as string | undefined}>
                  <input {...register("profession")} className={inputCls} />
                </Field>
                <Field label="N° Permis de conduire" required error={errors.licenseNumber?.message}>
                  <input {...register("licenseNumber")} className={inputCls} />
                </Field>
                <Field label="Catégorie permis" required error={errors.licenseCategory?.message}>
                  <select {...register("licenseCategory")} className={inputCls}>
                    {LICENSE_CATS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Date de délivrance permis" required error={errors.licenseIssuedAt?.message}>
                  <input type="date" {...register("licenseIssuedAt")} className={inputCls} />
                </Field>
                <Field label="Lieu de délivrance permis" required error={errors.licenseIssuedPlace?.message} className="md:col-span-2">
                  <input {...register("licenseIssuedPlace")} className={inputCls} />
                </Field>
              </div>
            </FormBlock>

            {/* BLOC 3 */}
            <FormBlock icon={MessageSquare} index={3} title="Message">
              <Field label="Observations / Demandes particulières" error={errors.observations?.message as string | undefined}>
                <textarea rows={4} placeholder="Optionnel" {...register("observations")} className={inputCls} />
              </Field>
            </FormBlock>

            {/* Submit */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ada-yellow text-ada-black font-bold px-8 py-4 text-lg hover:brightness-95 transition shadow-[var(--shadow-yellow)] disabled:opacity-60"
              >
                Envoyer ma demande <ArrowRight className="h-5 w-5" />
              </button>
              <p className="mt-3 text-xs text-muted-foreground max-w-md mx-auto">
                Un agent ADA vous contactera dans les 2 heures ouvrables suivant votre demande pour confirmer la disponibilité et le tarif.
              </p>
            </div>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Vous êtes un agent ADA ? <Link to="/dashboard/login" className="underline hover:text-ada-black">Espace agent</Link>
          </p>
        </div>
      </section>

      {/* Success modal */}
      <Dialog open={!!createdRef} onOpenChange={(o) => !o && setCreatedRef(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto h-14 w-14 rounded-full bg-ada-yellow/20 grid place-items-center">
              <CheckCircle2 className="h-7 w-7 text-ada-black" />
            </div>
            <DialogTitle className="text-center text-2xl">Demande envoyée !</DialogTitle>
            <DialogDescription className="text-center">
              Notre équipe vous contacte très prochainement.
            </DialogDescription>
          </DialogHeader>
          <div className="my-2 rounded-xl bg-muted p-4 text-center">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Votre référence</div>
            <div className="mt-1 flex items-center justify-center gap-2">
              <span className="text-2xl font-black tracking-tight">{createdRef}</span>
              <button
                type="button"
                aria-label="Copier"
                onClick={() => { if (createdRef) { navigator.clipboard.writeText(createdRef); toast.success("Référence copiée"); } }}
                className="p-1.5 rounded-md hover:bg-background"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={() => setCreatedRef(null)}
              className="w-full rounded-full bg-ada-black text-white font-semibold py-3 hover:brightness-110 transition"
            >
              Fermer
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* --------------------------------- UI bits --------------------------------- */

const inputCls = "w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ada-yellow focus:border-ada-yellow transition";

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-semibold text-ada-black/80">{children}</label>;
}
function Req() { return <span className="text-ada-yellow">*</span>; }

function Field({ label, required, error, className, children }: {
  label: string; required?: boolean; error?: string; className?: string; children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <Label>{label} {required && <Req />}</Label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function FormBlock({ icon: Icon, index, title, children }: {
  icon: React.ComponentType<{ className?: string }>; index: number; title: string; children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border">
        <span className="h-10 w-10 rounded-xl bg-ada-yellow text-ada-black grid place-items-center font-black">{index}</span>
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Bloc {index}</div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Icon className="h-5 w-5 text-ada-yellow" /> {title}
          </h2>
        </div>
      </div>
      {children}
    </div>
  );
}
