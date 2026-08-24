import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Clock, Phone, Zap } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Button, ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Reveal } from "@/components/shared/Reveal";
import { CTABand } from "@/components/shared/CTABand";
import { JsonLd } from "@/components/seo/JsonLd";

import { breadcrumbJsonLd } from "@/lib/structured-data";
import { blurData } from "@/lib/image";
import { photo } from "@/content/photos";
import { company, hasPhone } from "@/content/company";
import { zones, parisArrondissements, communesCouvertes } from "@/content/zones";
import { promesse } from "@/content/urgence";

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Zone d'intervention — Paris & Île-de-France",
  description: `Électricien d'urgence à Paris (tous arrondissements), en petite couronne (92, 93, 94) et en grande couronne (77, 78, 91, 95). Intervention en ${promesse.delai}, ${promesse.disponibilite}.`,
  alternates: { canonical: "/zone-intervention" },
};

const breadcrumbs = [
  { name: "Accueil", path: "/" },
  { name: "Zone d'intervention", path: "/zone-intervention" },
];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahelecrenov.fr";

const areaServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Dépannage électrique — Paris et Île-de-France",
  serviceType: "Emergency Electrical Repair",
  description: `Dépannage électrique d'urgence, recherche de panne et mise aux normes NF C 15-100 à Paris et dans les huit départements franciliens. Intervention en ${promesse.delai}.`,
  provider: { "@id": `${siteUrl}/#business` },
  areaServed: communesCouvertes.map((name) => ({ "@type": "City", name })),
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: `${siteUrl}/urgence`,
    servicePhone: company.contact.phone,
  },
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const reassurances = [
  {
    icon: Clock,
    label: `Intervention en ${promesse.delaiCourt}`,
    detail: "Paris et petite couronne",
  },
  {
    icon: Zap,
    label: "Disponible en continu",
    detail: promesse.disponibilite,
  },
  {
    icon: MapPin,
    label: "8 départements",
    detail: "Toute l'Île-de-France",
  },
  {
    icon: Phone,
    label: "Un seul numéro",
    detail: "Devis gratuit avant travaux",
  },
] as const;

export default function ZoneInterventionPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={areaServiceJsonLd} />

      {/* Hero --------------------------------------------------------- */}
      <PageHero
        eyebrow="Zone d'intervention"
        title="Électricien d'urgence à Paris et en Île-de-France"
        intro={`Paris intra-muros, petite couronne et grande couronne : nos électriciens couvrent les huit départements franciliens, avec un délai annoncé secteur par secteur.`}
        image={photo("architectureParis")}
        imageAlt="Immeubles parisiens dans la zone d'intervention"
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Bandeau réassurance ------------------------------------------ */}
      <section className="border-b border-line bg-cream-200">
        <Container className="py-10">
          <dl className="grid grid-cols-2 divide-x divide-line md:grid-cols-4">
            {reassurances.map(({ icon: Icon, label, detail }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 px-6 py-4 text-center first:pl-0 last:pr-0"
              >
                <Icon className="h-6 w-6 text-copper" strokeWidth={1.8} aria-hidden />
                <dt className="text-sm font-bold text-anthracite">{label}</dt>
                <dd className="text-xs text-muted">{detail}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Secteurs, département par département ------------------------ */}
      <section className="bg-cream">
        <Container className="py-20 sm:py-24">
          <Reveal className="mb-14 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-copper">
              Secteurs couverts
            </span>
            <h2 className="mt-4 text-3xl font-bold text-anthracite sm:text-4xl">
              Département par département
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Le délai affiché correspond au temps d'intervention constaté sur
              le secteur. Il vous est systématiquement confirmé au téléphone
              avant le départ de l'électricien.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {zones.map((zone, i) => (
              <Reveal as="div" key={zone.slug} delay={Math.min(i * 0.04, 0.24)}>
                <article className="flex h-full flex-col gap-4 rounded-2xl border border-line bg-white p-6 shadow-soft transition-shadow duration-200 hover:shadow-lift sm:p-7">
                  <header className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-copper/10 font-display text-base font-extrabold text-copper tabular"
                        aria-hidden
                      >
                        {zone.code}
                      </span>
                      <div>
                        <h3 className="font-bold text-anthracite">{zone.name}</h3>
                        <p className="text-xs text-muted">{zone.postalCode}</p>
                      </div>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-anthracite px-3 py-1.5 text-xs font-semibold text-cream">
                      <Clock className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                      {zone.delai}
                    </span>
                  </header>

                  <p className="text-sm leading-relaxed text-muted">
                    {zone.blurb}
                  </p>

                  <ul className="flex flex-wrap gap-1.5">
                    {zone.communes.map((commune) => (
                      <li
                        key={commune}
                        className="rounded-full bg-cream-200 px-2.5 py-1 text-xs font-medium text-anthracite"
                      >
                        {commune}
                      </li>
                    ))}
                  </ul>

                  <footer className="mt-auto border-t border-line pt-4">
                    <div className="flex items-center justify-between text-xs font-medium text-muted">
                      <span>Couverture du département</span>
                      <span className="font-bold text-anthracite tabular">
                        {zone.coverage}%
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cream-300" role="presentation">
                      <div
                        className="h-full rounded-full bg-copper"
                        style={{ width: `${zone.coverage}%` }}
                      />
                    </div>
                  </footer>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Paris arrondissement par arrondissement ---------------------- */}
      <section className="border-y border-line bg-cream-200">
        <Container className="py-20 sm:py-24">
          <Reveal className="mb-12 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-copper">
              Paris intra-muros
            </span>
            <h2 className="mt-4 text-3xl font-bold text-anthracite sm:text-4xl">
              Les vingt arrondissements
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Du Marais à la Porte de Vincennes, nos électriciens interviennent
              dans tout Paris — immeubles haussmanniens, copropriétés, locaux
              commerciaux et logements récents.
            </p>
          </Reveal>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {parisArrondissements.map((arr, i) => (
              <Reveal as="li" key={arr.slug} delay={Math.min(i * 0.02, 0.2)}>
                <div className="flex h-full items-start gap-3 rounded-xl border border-line bg-white px-4 py-3.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-copper" aria-hidden />
                  <div>
                    <p className="text-sm font-bold text-anthracite">
                      {arr.name}
                    </p>
                    <p className="text-xs text-muted">
                      {arr.postalCode} · {arr.quartier}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Section photo + texte ---------------------------------------- */}
      <section className="grain-overlay relative overflow-hidden bg-anthracite">
        <div className="absolute inset-0 -z-10">
          <Image
            src={photo("parisVille", 1600, 60)}
            alt="Vue urbaine de la zone d'intervention en Île-de-France"
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL={blurData}
            className="img-craft object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/78 to-ink/50"
            aria-hidden
          />
        </div>

        <Container className="relative z-10 py-20 sm:py-24">
          <div className="max-w-2xl">
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-copper-300">
                Hors zone ?
              </span>
              <h2 className="mt-4 text-3xl font-bold text-cream sm:text-4xl">
                Un doute sur votre commune ?
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-cream/80">
                Nous intervenons exclusivement à Paris et en région parisienne.
                Si votre commune ne figure pas dans les listes ci-dessus mais se
                situe dans l'un des huit départements franciliens, appelez-nous :
                nous vous confirmons immédiatement la faisabilité et le délai
                réel avant tout déplacement.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {hasPhone && (
                  <ButtonLink
                    href={company.contact.phoneHref}
                    variant="copper"
                    size="lg"
                  >
                    <Phone className="h-5 w-5" aria-hidden />
                    {company.contact.phone}
                  </ButtonLink>
                )}
                <Button href="/urgence" variant="outline-light" size="lg">
                  Demander une intervention
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTABand
        title="Une panne électrique en Île-de-France ?"
        text={`Décrivez votre problème en une minute. Nous vous rappelons sous ${promesse.rappel} et nous vous annonçons le délai réel sur votre commune.`}
      />
    </>
  );
}
