"use client";

import { useState, useRef, type FormEvent, type ChangeEvent } from "react";
import { AlertCircle, CheckCircle2, ChevronDown, Loader2, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { company } from "@/content/company";
import {
  interventionTypes,
  urgencyLevels,
  promesse,
} from "@/content/urgence";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type FormState = "idle" | "sending" | "success" | "error";

interface Fields {
  nom: string;
  telephone: string;
  email: string;
  codePostal: string;
  typeIntervention: string;
  urgence: string;
  description: string;
  consentement: boolean;
  /** Honeypot — doit rester vide */
  entreprise: string;
}

type FieldErrors = Partial<Record<keyof Omit<Fields, "entreprise">, string>>;

const EMPTY: Fields = {
  nom: "",
  telephone: "",
  email: "",
  codePostal: "",
  typeIntervention: "",
  urgence: "",
  description: "",
  consentement: false,
  entreprise: "",
};

/** Départements couverts — Paris et région parisienne uniquement. */
const DEPARTEMENTS_IDF = ["75", "77", "78", "91", "92", "93", "94", "95"];

/* ------------------------------------------------------------------ */
/*  Validation                                                          */
/* ------------------------------------------------------------------ */

function validate(fields: Fields): FieldErrors {
  const errs: FieldErrors = {};

  if (!fields.nom.trim()) errs.nom = "Votre nom est requis.";

  if (!fields.telephone.trim()) {
    errs.telephone = "Le téléphone est requis — c'est par là que nous vous rappelons.";
  } else if (!/^[\d\s().+/-]{6,20}$/.test(fields.telephone)) {
    errs.telephone = "Numéro de téléphone invalide.";
  }

  if (fields.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errs.email = "Adresse email invalide.";
  }

  const cp = fields.codePostal.trim();
  if (!cp) {
    errs.codePostal = "Le code postal est requis.";
  } else if (!/^\d{5}$/.test(cp)) {
    errs.codePostal = "Le code postal doit comporter 5 chiffres.";
  } else if (!DEPARTEMENTS_IDF.includes(cp.slice(0, 2))) {
    errs.codePostal =
      "Nous intervenons uniquement à Paris et en région parisienne.";
  }

  if (!fields.typeIntervention)
    errs.typeIntervention = "Précisez le type d'intervention.";
  if (!fields.urgence) errs.urgence = "Précisez le degré d'urgence.";
  if (!fields.consentement)
    errs.consentement = "Vous devez accepter le traitement de vos données.";

  return errs;
}

/* ------------------------------------------------------------------ */
/*  Encodage mailto — toutes les demandes arrivent au même endroit      */
/* ------------------------------------------------------------------ */

function buildMailto(fields: Fields): string {
  const type =
    interventionTypes.find((t) => t.value === fields.typeIntervention)?.label ??
    fields.typeIntervention;
  const niveau = urgencyLevels.find((u) => u.value === fields.urgence);

  const subject = encodeURIComponent(
    `[${niveau?.delai ?? "Demande"}] ${type} — ${fields.codePostal} — ${fields.nom}`,
  );

  const body = encodeURIComponent(
    [
      `DEMANDE D'INTERVENTION`,
      ``,
      `Degré d'urgence : ${niveau?.label ?? "Non précisé"}`,
      `Type d'intervention : ${type}`,
      `Code postal : ${fields.codePostal}`,
      ``,
      `Nom : ${fields.nom}`,
      `Téléphone : ${fields.telephone}`,
      `Email : ${fields.email || "Non précisé"}`,
      ``,
      `Description :`,
      fields.description || "Non précisée",
    ].join("\n"),
  );

  return `mailto:${company.contact.email}?subject=${subject}&body=${body}`;
}

/* ------------------------------------------------------------------ */
/*  Styles selon le fond                                                */
/* ------------------------------------------------------------------ */

type Tone = "dark" | "light";

function styles(tone: Tone) {
  const dark = tone === "dark";
  return {
    label: cn(
      "block text-xs font-semibold uppercase tracking-wider mb-1.5",
      dark ? "text-cream/70" : "text-muted",
    ),
    input: cn(
      "w-full rounded-xl border px-4 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper/60 focus-visible:border-copper disabled:opacity-60",
      dark
        ? "border-anthracite-500 bg-anthracite-700 text-cream placeholder:text-cream/40"
        : "border-line bg-white text-anthracite placeholder:text-muted/60",
    ),
    error: "border-red-400 focus-visible:ring-red-400/40 focus-visible:border-red-400",
    hint: cn("text-xs", dark ? "text-cream/50" : "text-muted/70"),
    body: cn("text-sm leading-relaxed", dark ? "text-cream/75" : "text-muted"),
    strong: dark ? "text-cream" : "text-anthracite",
    placeholder: dark ? "text-cream/40" : "text-muted/60",
  };
}

/* ------------------------------------------------------------------ */
/*  Composant                                                           */
/* ------------------------------------------------------------------ */

export function InterventionForm({
  tone = "light",
  submitLabel = "Envoyer ma demande",
  className,
}: {
  tone?: Tone;
  submitLabel?: string;
  className?: string;
}) {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [fields, setFields] = useState<Fields>(EMPTY);

  const formRef = useRef<HTMLFormElement>(null);
  const s = styles(tone);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, type } = e.target;
    const value =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;

    setFields((prev) => {
      const next = { ...prev, [name]: value };
      /* Une fois la première soumission tentée, les erreurs se corrigent en
         direct : sans cela un message resterait affiché sous un champ déjà
         valide jusqu'à la soumission suivante. */
      if (submitted) setErrors(validate(next));
      return next;
    });
  }

  function handleBlur(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }

  function fieldError(name: keyof Fields): string | undefined {
    return touched[name] || state === "error"
      ? errors[name as keyof FieldErrors]
      : undefined;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (fields.entreprise) return; /* honeypot */

    setSubmitted(true);
    const errs = validate(fields);
    setErrors(errs);
    setTouched({
      nom: true,
      telephone: true,
      email: true,
      codePostal: true,
      typeIntervention: true,
      urgence: true,
      consentement: true,
    });

    if (Object.keys(errs).length > 0) {
      setState("error");
      const firstErr = Object.keys(errs)[0];
      const el = formRef.current?.elements.namedItem(firstErr) as HTMLElement | null;
      el?.focus();
      return;
    }

    setState("sending");
    try {
      window.location.href = buildMailto(fields);
      setTimeout(() => setState("success"), 800);
    } catch {
      setState("error");
    }
  }

  /* ---------------------------------------------------------------- */
  /*  Succès                                                           */
  /* ---------------------------------------------------------------- */
  if (state === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "flex flex-col items-start gap-5 rounded-2xl border p-8",
          tone === "dark"
            ? "border-anthracite-500 bg-anthracite-700"
            : "border-line bg-white",
          className,
        )}
      >
        <CheckCircle2 className="h-10 w-10 shrink-0 text-copper" strokeWidth={1.6} aria-hidden />
        <div>
          <h3 className={cn("text-lg font-bold", s.strong)}>
            Demande préparée — envoyez-la depuis votre messagerie
          </h3>
          <p className={cn("mt-2", s.body)}>
            Un email contenant toutes vos informations a été préparé pour{" "}
            <strong className={s.strong}>{company.contact.email}</strong>. Nous
            vous rappelons sous {promesse.rappel} après réception.
          </p>
          <p className={cn("mt-4 font-semibold", s.strong)}>
            Une urgence ? N'attendez pas l'email, appelez-nous.
          </p>
        </div>
        <a
          href={company.contact.phoneHref}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-copper px-8 py-3.5 text-sm font-semibold text-cream copper-glow transition-colors hover:bg-copper-600"
        >
          <Phone className="h-4 w-4" aria-hidden />
          {company.contact.phone}
        </a>
        <button
          type="button"
          onClick={() => {
            setState("idle");
            setErrors({});
            setTouched({});
            setSubmitted(false);
            setFields(EMPTY);
          }}
          className={cn("text-xs font-semibold underline decoration-current/40", s.hint)}
        >
          Faire une nouvelle demande
        </button>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Formulaire                                                       */
  /* ---------------------------------------------------------------- */
  const isSending = state === "sending";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Demande d'intervention"
      className={cn("space-y-5", className)}
    >
      {/* Honeypot */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
      >
        <label htmlFor="if-entreprise">Entreprise (ne pas remplir)</label>
        <input
          id="if-entreprise"
          name="entreprise"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={fields.entreprise}
          onChange={handleChange}
        />
      </div>

      {state === "error" && Object.keys(errors).length > 0 && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-start gap-3 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-500"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>Certains champs nécessitent votre attention.</span>
        </div>
      )}

      {/* Nom + Téléphone */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="if-nom" className={s.label}>
            Nom et prénom <span className="text-copper" aria-hidden>*</span>
          </label>
          <input
            id="if-nom"
            name="nom"
            type="text"
            required
            autoComplete="name"
            placeholder="Jean Dupont"
            value={fields.nom}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSending}
            aria-invalid={Boolean(fieldError("nom"))}
            aria-describedby={fieldError("nom") ? "if-err-nom" : undefined}
            className={cn(s.input, fieldError("nom") && s.error)}
          />
          {fieldError("nom") && (
            <p id="if-err-nom" role="alert" className="mt-1.5 text-xs text-red-500">
              {fieldError("nom")}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="if-telephone" className={s.label}>
            Téléphone <span className="text-copper" aria-hidden>*</span>
          </label>
          <input
            id="if-telephone"
            name="telephone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="06 12 34 56 78"
            value={fields.telephone}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSending}
            aria-invalid={Boolean(fieldError("telephone"))}
            aria-describedby={fieldError("telephone") ? "if-err-telephone" : undefined}
            className={cn(s.input, fieldError("telephone") && s.error)}
          />
          {fieldError("telephone") && (
            <p id="if-err-telephone" role="alert" className="mt-1.5 text-xs text-red-500">
              {fieldError("telephone")}
            </p>
          )}
        </div>
      </div>

      {/* Code postal + Email */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="if-code-postal" className={s.label}>
            Code postal <span className="text-copper" aria-hidden>*</span>
          </label>
          <input
            id="if-code-postal"
            name="codePostal"
            type="text"
            inputMode="numeric"
            maxLength={5}
            required
            autoComplete="postal-code"
            placeholder="75011"
            value={fields.codePostal}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSending}
            aria-invalid={Boolean(fieldError("codePostal"))}
            aria-describedby={fieldError("codePostal") ? "if-err-cp" : "if-hint-cp"}
            className={cn(s.input, fieldError("codePostal") && s.error)}
          />
          {fieldError("codePostal") ? (
            <p id="if-err-cp" role="alert" className="mt-1.5 text-xs text-red-500">
              {fieldError("codePostal")}
            </p>
          ) : (
            <p id="if-hint-cp" className={cn("mt-1.5", s.hint)}>
              Paris et région parisienne (75, 77, 78, 91 à 95).
            </p>
          )}
        </div>

        <div>
          <label htmlFor="if-email" className={s.label}>
            Email <span className={s.hint}>(facultatif)</span>
          </label>
          <input
            id="if-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jean@exemple.fr"
            value={fields.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSending}
            aria-invalid={Boolean(fieldError("email"))}
            aria-describedby={fieldError("email") ? "if-err-email" : undefined}
            className={cn(s.input, fieldError("email") && s.error)}
          />
          {fieldError("email") && (
            <p id="if-err-email" role="alert" className="mt-1.5 text-xs text-red-500">
              {fieldError("email")}
            </p>
          )}
        </div>
      </div>

      {/* Type d'intervention */}
      <div>
        <label htmlFor="if-type" className={s.label}>
          Type d'intervention <span className="text-copper" aria-hidden>*</span>
        </label>
        <div className="relative">
          <select
            id="if-type"
            name="typeIntervention"
            required
            value={fields.typeIntervention}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSending}
            aria-invalid={Boolean(fieldError("typeIntervention"))}
            aria-describedby={fieldError("typeIntervention") ? "if-err-type" : undefined}
            className={cn(
              s.input,
              "appearance-none pr-10",
              fieldError("typeIntervention") && s.error,
              !fields.typeIntervention && s.placeholder,
            )}
          >
            <option value="" disabled>
              Choisir le type d'intervention
            </option>
            {interventionTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className={cn("pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2", s.placeholder)}
            aria-hidden
          />
        </div>
        {fieldError("typeIntervention") && (
          <p id="if-err-type" role="alert" className="mt-1.5 text-xs text-red-500">
            {fieldError("typeIntervention")}
          </p>
        )}
      </div>

      {/* Degré d'urgence */}
      <div>
        <label htmlFor="if-urgence" className={s.label}>
          Degré d'urgence <span className="text-copper" aria-hidden>*</span>
        </label>
        <div className="relative">
          <select
            id="if-urgence"
            name="urgence"
            required
            value={fields.urgence}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSending}
            aria-invalid={Boolean(fieldError("urgence"))}
            aria-describedby={fieldError("urgence") ? "if-err-urgence" : undefined}
            className={cn(
              s.input,
              "appearance-none pr-10",
              fieldError("urgence") && s.error,
              !fields.urgence && s.placeholder,
            )}
          >
            <option value="" disabled>
              Choisir le degré d'urgence
            </option>
            {urgencyLevels.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className={cn("pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2", s.placeholder)}
            aria-hidden
          />
        </div>
        {fieldError("urgence") && (
          <p id="if-err-urgence" role="alert" className="mt-1.5 text-xs text-red-500">
            {fieldError("urgence")}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="if-description" className={s.label}>
          Décrivez la panne <span className={s.hint}>(facultatif)</span>
        </label>
        <textarea
          id="if-description"
          name="description"
          rows={3}
          placeholder="Ex. : plus de courant dans tout l'appartement depuis ce matin, le disjoncteur ne se réenclenche pas."
          value={fields.description}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSending}
          className={cn(s.input, "min-h-[90px] resize-y")}
        />
      </div>

      {/* Consentement RGPD */}
      <div>
        <div className="flex items-start gap-3">
          <input
            id="if-consentement"
            name="consentement"
            type="checkbox"
            required
            checked={fields.consentement}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSending}
            aria-invalid={Boolean(fieldError("consentement"))}
            aria-describedby={fieldError("consentement") ? "if-err-consent" : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded accent-copper"
          />
          <label htmlFor="if-consentement" className={cn("cursor-pointer", s.body)}>
            J'accepte que mes informations soient utilisées pour traiter ma
            demande d'intervention, conformément à la{" "}
            <a
              href="/politique-confidentialite"
              target="_blank"
              rel="noopener noreferrer"
              className={cn("font-semibold underline decoration-copper/40 hover:text-copper", s.strong)}
            >
              politique de confidentialité
            </a>
            . <span className="text-copper" aria-hidden>*</span>
          </label>
        </div>
        {fieldError("consentement") && (
          <p id="if-err-consent" role="alert" className="mt-1.5 text-xs text-red-500">
            {fieldError("consentement")}
          </p>
        )}
      </div>

      {/* Soumission */}
      <button
        type="submit"
        disabled={isSending}
        className={cn(
          "inline-flex w-full items-center justify-center gap-2 rounded-full bg-copper px-8 py-4 text-sm font-semibold text-cream copper-glow transition-all duration-200",
          "hover:bg-copper-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper",
          "disabled:cursor-not-allowed disabled:opacity-60",
        )}
      >
        {isSending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Envoi en cours…
          </>
        ) : (
          submitLabel
        )}
      </button>

      <p className={s.hint}>
        Rappel sous {promesse.rappel}, {promesse.disponibilite}. Pour une
        urgence immédiate, appelez le{" "}
        <a
          href={company.contact.phoneHref}
          className={cn("font-semibold underline decoration-copper/40 hover:text-copper", s.strong)}
        >
          {company.contact.phone}
        </a>
        .
      </p>
    </form>
  );
}
