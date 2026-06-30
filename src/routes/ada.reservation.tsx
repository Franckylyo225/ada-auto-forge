import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowRight, User as UserIcon, Shield, Building2, Landmark,
  CheckCircle2, Car, FileText, MessageSquare, Copy, ChevronDown,
} from "lucide-react";
import { Reveal } from "@/components/ada/Reveal";
import { rentalsStore } from "@/lib/ada-storage";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { SITE_URL } from "@/lib/seo";

const TITLE = "Réserver un véhicule à Abidjan — ADA · Devis sous 2h";
const DESC =
  "Réservation en ligne de votre véhicule de location à Abidjan : berline, SUV, 4×4, pick-up, minibus ou utilitaire. Confirmation et tarif sous 2h ouvrables.";

export const Route = createFileRoute("/ada/reservation")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: SITE_URL + "/ada/reservation" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/ada/reservation" }],
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
    toast.success(`Demande enregistrée avec succès`);
  };

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = form;
  const usage = watch("usage");
  const outsideCI = watch("outsideCI");

  return (
    <>
      {/* HERO */}
      <section className="bg-ada-black text-white py-16 md:py-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-ada-yellow/5 skew-x-12 transform translate-x-1/2" />
        <div className="container-ada relative z-10">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-ada-yellow text-ada-black text-[10px] font-black uppercase tracking-widest px-4 py-1.5 mb-6">
              Booking Premium
            </span>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-none">
              Réservez votre <br />
              <span className="text-ada-yellow">liberté de mouvement.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-white/60 text-lg leading-relaxed">
              Choisissez votre véhicule et transmettez-nous vos informations. 
              Un agent ADA vous confirme la réservation sous 2 heures ouvrables.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="bg-[#f8f8f8] py-12 md:py-20">
        <div className="container-ada max-w-5xl">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-border">
            <div className="p-6 md:p-12 space-y-16">
              
              {/* BLOCK 1: VEHICLE */}
              <div className="space-y-10">
                <header className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-ada-yellow text-ada-black grid place-items-center font-black text-xl shadow-lg">1</div>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">Votre véhicule</h2>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Détails de la location</p>
                  </div>
                </header>

                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                  <Field label="Type de véhicule" required error={errors.vehicleType?.message}>
                    <div className="relative">
                      <select {...register("vehicleType")} className="input-ada appearance-none">
                        <option value="">— Sélectionner un modèle —</option>
                        {VEHICLE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </Field>

                  <Field label="Date de départ souhaitée" required error={errors.startDate?.message}>
                    <input type="date" {...register("startDate")} className="input-ada" />
                  </Field>

                  <Field label="Durée de location" required error={errors.durationDays?.message}>
                    <div className="flex">
                      <input type="number" min={1} {...register("durationDays")} className="input-ada rounded-r-none border-r-0" />
                      <span className="inline-flex items-center px-5 rounded-r-xl border border-border bg-muted/30 text-xs font-bold uppercase text-muted-foreground tracking-widest">jours</span>
                    </div>
                  </Field>

                  <Field label="Kilométrage estimé (Optionnel)" error={errors.estimatedKm?.message as string | undefined}>
                    <input type="number" min={0} placeholder="Ex: 500" {...register("estimatedKm")} className="input-ada" />
                  </Field>

                  <div className="md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Type d'usage</label>
                    <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {usages.map(({ id, icon: Icon }) => {
                        const selected = usage === id;
                        return (
                          <button
                            type="button"
                            key={id}
                            onClick={() => setValue("usage", id, { shouldValidate: true })}
                            className={`flex flex-col items-center justify-center gap-3 rounded-2xl border p-4 text-center transition-all duration-300 ${
                              selected
                                ? "border-ada-yellow bg-ada-yellow/5 text-ada-black shadow-md scale-[1.02]"
                                : "border-border text-ada-black/50 hover:border-ada-yellow/40 hover:bg-muted/5"
                            }`}
                          >
                            <Icon className={`h-6 w-6 ${selected ? "text-ada-yellow" : "text-muted-foreground"}`} /> 
                            <span className="text-[10px] font-bold uppercase tracking-tighter leading-tight">{id}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="md:col-span-2 flex items-center justify-between rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-5">
                    <div>
                      <div className="font-bold text-sm">Sortie du territoire ?</div>
                      <div className="text-xs text-muted-foreground font-medium">Cochez si vous prévoyez de circuler hors de Côte d'Ivoire.</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setValue("outsideCI", !outsideCI)}
                      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${outsideCI ? "bg-ada-yellow" : "bg-muted-foreground/30"}`}
                    >
                      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${outsideCI ? "translate-x-6" : "translate-x-1"}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* BLOCK 2: IDENTITY */}
              <div className="space-y-10">
                <header className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-ada-yellow text-ada-black grid place-items-center font-black text-xl shadow-lg">2</div>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">Vos informations</h2>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Identité du conducteur</p>
                  </div>
                </header>

                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                  <Field label="Nom" required error={errors.lastName?.message}>
                    <input {...register("lastName")} className="input-ada" placeholder="Votre nom" />
                  </Field>
                  <Field label="Prénoms" required error={errors.firstName?.message}>
                    <input {...register("firstName")} className="input-ada" placeholder="Vos prénoms" />
                  </Field>
                  <Field label="Date de naissance" required error={errors.birthDate?.message}>
                    <input type="date" {...register("birthDate")} className="input-ada" />
                  </Field>
                  <Field label="Téléphone mobile" required error={errors.phone?.message}>
                    <input type="tel" placeholder="+225 07..." {...register("phone")} className="input-ada" />
                  </Field>
                  <Field label="Adresse de résidence" required error={errors.address?.message} className="md:col-span-2">
                    <input {...register("address")} className="input-ada" placeholder="Ex: Cocody Riviera 3" />
                  </Field>
                  <Field label="Profession" error={errors.profession?.message as string | undefined}>
                    <input {...register("profession")} className="input-ada" placeholder="Votre activité" />
                  </Field>
                  <div className="md:col-span-2 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                    <Field label="N° Permis" required error={errors.licenseNumber?.message} className="lg:col-span-2">
                      <input {...register("licenseNumber")} className="input-ada" />
                    </Field>
                    <Field label="Catégorie" required error={errors.licenseCategory?.message}>
                       <select {...register("licenseCategory")} className="input-ada">
                        {LICENSE_CATS.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </Field>
                    <Field label="Lieu délivrance" required error={errors.licenseIssuedPlace?.message}>
                      <input {...register("licenseIssuedPlace")} className="input-ada" />
                    </Field>
                  </div>
                </div>
              </div>

              {/* BLOCK 3: NOTES */}
              <div className="space-y-10">
                 <header className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-ada-yellow text-ada-black grid place-items-center font-black text-xl shadow-lg">3</div>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">Commentaires</h2>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Précisions éventuelles</p>
                  </div>
                </header>
                <Field label="Observations ou demandes particulières" error={errors.observations?.message as string | undefined}>
                  <textarea rows={4} placeholder="Besoins spécifiques, accessoires (siège bébé), etc." {...register("observations")} className="input-ada resize-none" />
                </Field>
              </div>

            </div>

            {/* SUBMIT FOOTER */}
            <div className="bg-[#fafafa] border-t border-border p-8 md:p-12 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-4 rounded-full bg-ada-black text-white font-black px-12 py-5 text-lg hover:bg-ada-yellow hover:text-ada-black transition-all duration-300 shadow-2xl disabled:opacity-50 group"
              >
                Envoyer ma demande <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </button>
              <p className="mt-6 text-sm text-muted-foreground font-medium max-w-lg mx-auto leading-relaxed">
                En envoyant ce formulaire, un conseiller ADA traitera votre dossier en priorité 
                et vous recontactera pour finaliser les modalités de location.
              </p>
            </div>
          </form>

          <p className="mt-10 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
            © {new Date().getFullYear()} ADA Côte d'Ivoire — Service Mobility
          </p>
        </div>
      </section>

      {/* SUCCESS DIALOG */}
      <Dialog open={!!createdRef} onOpenChange={(o) => !o && setCreatedRef(null)}>
        <DialogContent className="sm:max-w-md rounded-[2rem] border-0 shadow-2xl">
          <DialogHeader className="pt-6">
            <div className="mx-auto h-20 w-20 rounded-full bg-ada-yellow/20 grid place-items-center mb-4">
              <CheckCircle2 className="h-10 w-10 text-ada-black" />
            </div>
            <DialogTitle className="text-center text-3xl font-black tracking-tight">Demande reçue !</DialogTitle>
            <DialogDescription className="text-center text-lg mt-2">
              Votre dossier est en cours de traitement par nos équipes.
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-6 rounded-3xl bg-muted/50 p-6 text-center border border-border">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-black mb-2">Référence dossier</div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl font-black text-ada-black tracking-widest">{createdRef}</span>
              <button
                type="button"
                onClick={() => { if (createdRef) { navigator.clipboard.writeText(createdRef); toast.success("Copié !"); } }}
                className="p-2 rounded-xl bg-white shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>

          <DialogFooter className="pb-6">
            <button
              onClick={() => setCreatedRef(null)}
              className="w-full rounded-full bg-ada-black text-white font-bold py-4 hover:brightness-125 transition-all shadow-xl"
            >
              Compris
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <style>{`
        .input-ada {
          width: 100%;
          background: #fdfdfd;
          border: 1px solid #e5e7eb;
          border-radius: 1.25rem;
          padding: 0.875rem 1.25rem;
          font-size: 0.95rem;
          transition: all .25s ease;
          color: var(--color-ada-black);
          font-weight: 500;
        }
        .input-ada:focus {
          outline: none;
          border-color: var(--color-ada-yellow);
          background: white;
          box-shadow: 0 0 0 5px rgba(255, 232, 0, 0.1);
        }
        .input-ada::placeholder {
          color: #9ca3af;
          font-weight: 400;
        }
      `}</style>
    </>
  );
}

function Field({ label, required, error, className, children }: {
  label: string; required?: boolean; error?: string; className?: string; children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 mb-2">
        {label} {required && <span className="text-ada-yellow">*</span>}
      </label>
      {children}
      {error && <p className="mt-2 text-xs font-bold text-destructive ml-1">{error}</p>}
    </div>
  );
}
