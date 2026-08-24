import type { Metadata } from "next";
import { Phone, Check, AlertTriangle, Clock } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Reveal } from "@/components/shared/Reveal";
import { FAQ } from "@/components/shared/FAQ";
import { JsonLd } from "@/components/seo/JsonLd";
import { InterventionForm } from "@/components/urgence/InterventionForm";

import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/structured-data";
import { company, hasPhone } from "@/content/company";
import {
  garanties,
  pannesCourantes,
  parcours,
  promesse,
  faqUrgence,
  urgencyLevels,
} from "@/content/urgence";
import { zones } from "@/content/zones";

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: `Dépannage électrique urgent 24h/24 — Paris & Île-de-France`,
  description: `Électricien d'urgence à Paris et en région parisienne. Intervention en ${promesse.delai}, ${promesse.disponibilite}. Panne de courant, disjoncteur, court-circuit, tableau électrique. Devis gratuit avant intervention.`,
  alternates: { canonical: "/urgence" },
};

const breadcrumbs = [
  { name: "Accueil", path: "/" },
  { name: "Dépannage 24/7", path: "/urgence" },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function UrgencePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={faqJsonLd([...faqUrgence])} />
      <JsonLd
        data={serviceJsonLd({
          name: "Dépannage électrique d'urgence",
          description: `Intervention d'un électricien en ${promesse.delai} à Paris et en Île-de-France, ${promesse.disponibilite}.`,
          slug: "depannage-urgence",
          serviceType: "Emergency Electrical Repair",
        })}
      />

      {/* Héros + formulaire ------------------------------------------- */}
      <section className="grain-overlay relative overflow-hidden bg-ink">
        <div
          className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-copper/15 blur-3xl"
          aria-hidden
        />
        <Container className="relative z-10 grid grid-cols-1 gap-14 py-20 sm:py-24 lg:grid-cols-2 lg:gap-20">
          {/* Promesse */}
          <div>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-cream/15 bg-cream/5 px-4 py-2">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-copper-300" />
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-copper-300">
                Urgence {promesse.disponibilite}
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] text-cream sm:text-5xl">
              Dépannage électrique urgent
              <span className="block text-copper-300">
                en {promesse.delai}
              </span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-cream/80">
              Plus de courant, un disjoncteur qui saute, une odeur de brûlé ?
              Nos électriciens sont mobilisables immédiatement partout à Paris
              et en région parisienne. Un seul appel, un diagnostic, un tarif
              annoncé avant de commencer.
            </p>

            {hasPhone && (
              <ButtonLink
                href={company.contact.phoneHref}
                variant="copper"
                size="lg"
                className="mt-8"
              >
                <Phone className="h-5 w-5" aria-hidden />
                {company.contact.phone}
              </ButtonLink>
            )}

            <p className="mt-4 max-w-lg text-xs leading-relaxed text-cream/45">
              Délai de {promesse.delaiCourt} : {promesse.delaiPerimetre}
            </p>

            <ul className="mt-9 flex flex-wrap gap-2">
              {pannesCourantes.map((panne) => (
                <li
                  key={panne}
                  className="rounded-full border border-cream/12 bg-cream/5 px-3.5 py-1.5 text-xs font-medium text-cream/70"
                >
                  {panne}
                </li>
              ))}
            </ul>
          </div>

          {/* Formulaire centralisé */}
          <div
            id="demande"
            className="rounded-2xl border border-anthracite-500 bg-anthracite p-7 shadow-band sm:p-9"
          >
            <h2 className="text-xl font-bold text-cream">
              Demande d'intervention
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-cream/65">
              Toutes les demandes arrivent au même endroit. Rappel sous{" "}
              {promesse.rappel}, {promesse.disponibilite}.
            </p>
            <div className="mt-7">
              <InterventionForm
                tone="dark"
                submitLabel="Envoyer ma demande d'intervention"
              />
            </div>
          </div>
        </Container>
      </section>

      <Breadcrumbs items={breadcrumbs} />

      {/* Sécurité immédiate ------------------------------------------- */}
      <section className="border-y border-line bg-cream-200">
        <Container className="py-12">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <AlertTriangle
              className="h-8 w-8 shrink-0 text-copper"
              strokeWidth={1.8}
              aria-hidden
            />
            <div>
              <h2 className="font-display text-lg font-bold text-anthracite">
                En attendant notre arrivée
              </h2>
              <p className="mt-2 max-w-3xl leading-relaxed text-muted">
                Si vous constatez une odeur de brûlé, des étincelles ou de la
                fumée, coupez immédiatement le disjoncteur général et n'utilisez
                plus l'installation concernée. Ne touchez jamais un câble
                dénudé, et n'ouvrez pas le tableau électrique vous-même. En cas
                de départ de feu, appelez les pompiers au 18 ou le 112.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Degrés d'urgence --------------------------------------------- */}
      <section className="bg-cream">
        <Container className="py-20 sm:py-24">
          <Reveal className="mb-12 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-copper">
              Niveaux de prise en charge
            </span>
            <h2 className="mt-4 text-3xl font-bold text-anthracite sm:text-4xl">
              Vous fixez l'urgence, nous fixons le délai
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Le degré d'urgence que vous indiquez dans le formulaire détermine
              directement notre engagement de délai.
            </p>
          </Reveal>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {urgencyLevels.map((level, i) => (
              <Reveal as="li" key={level.value} delay={Math.min(i * 0.05, 0.25)}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-line bg-white p-6 shadow-soft">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-copper/10 text-copper"
                    aria-hidden
                  >
                    <Clock className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div>
                    <p className="font-display font-bold text-anthracite">
                      {level.delai}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {level.label}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Parcours en 5 étapes ----------------------------------------- */}
      <section className="grain-overlay bg-anthracite">
        <Container className="py-20 sm:py-24">
          <Reveal className="mb-14 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-copper-300">
              Notre processus
            </span>
            <h2 className="mt-4 text-3xl font-bold text-cream sm:text-4xl">
              De votre appel à la garantie
            </h2>
          </Reveal>

          <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {parcours.map((etape, i) => (
              <Reveal as="li" key={etape.n} delay={Math.min(i * 0.06, 0.3)}>
                <span className="font-display text-3xl font-extrabold text-copper-300 tabular">
                  {etape.n}
                </span>
                <h3 className="mt-3 font-bold text-cream">{etape.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">
                  {etape.text}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Garanties + zones -------------------------------------------- */}
      <section className="bg-cream">
        <Container className="grid grid-cols-1 gap-14 py-20 sm:py-24 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-copper">
              Nos garanties urgence
            </span>
            <h2 className="mt-4 text-3xl font-bold text-anthracite sm:text-4xl">
              Ce sur quoi nous nous engageons
            </h2>
            <ul className="mt-8 space-y-4">
              {garanties.map((g) => (
                <li key={g} className="flex items-start gap-3 text-anthracite">
                  <Check
                    className="mt-1 h-4 w-4 shrink-0 text-copper"
                    strokeWidth={3}
                    aria-hidden
                  />
                  <span className="leading-relaxed">{g}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-copper">
              Où nous intervenons
            </span>
            <h2 className="mt-4 text-3xl font-bold text-anthracite sm:text-4xl">
              {promesse.zoneCourte}
            </h2>
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {zones.map((zone) => (
                <div
                  key={zone.slug}
                  className="flex items-center justify-between gap-4 py-3.5"
                >
                  <dt className="text-sm font-medium text-anthracite">
                    <span className="font-display font-bold text-copper tabular">
                      {zone.code}
                    </span>{" "}
                    {zone.name}
                  </dt>
                  <dd className="text-sm font-semibold text-muted tabular">
                    {zone.delai}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      <FAQ
        items={[...faqUrgence]}
        title="Questions fréquentes sur le dépannage d'urgence"
      />
    </>
  );
}
