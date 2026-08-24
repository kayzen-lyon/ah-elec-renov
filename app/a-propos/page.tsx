import type { Metadata } from "next";
import Image from "next/image";
import {
  ShieldCheck,
  Clock,
  ReceiptText,
  MapPin,
  UserCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTABand } from "@/components/shared/CTABand";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { blurData } from "@/lib/image";
import { photo } from "@/content/photos";
import { company, activeCertifications } from "@/content/company";
import { steps } from "@/content/site";
import { bio, valeurs, engagements, stats } from "@/content/about";

/* ------------------------------------------------------------------ */
/*  Metadata                                                            */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "À propos — Hocine ASLI, artisan électricien à Paris",
  description:
    "Hocine ASLI, artisan électricien et rénovation intérieure à Paris 15e. Parcours, valeurs et engagements d'AH ELEC RENOV.",
};

/* ------------------------------------------------------------------ */
/*  Données locales                                                     */
/* ------------------------------------------------------------------ */

const breadcrumbItems = [
  { name: "Accueil", path: "/" },
  { name: "À propos", path: "/a-propos" },
];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahelecrenov.fr";

function aboutJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${siteUrl}/a-propos`,
    name: `À propos — ${company.brandName}`,
    url: `${siteUrl}/a-propos`,
    description: metadata.description as string,
    mainEntity: {
      "@type": "Person",
      name: company.director,
      jobTitle: "Artisan électricien et rénovateur",
      worksFor: {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#business`,
        name: company.brandName,
      },
      address: {
        "@type": "PostalAddress",
        addressRegion: "Île-de-France",
        addressCountry: "FR",
      },
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Icônes des valeurs                                                  */
/* ------------------------------------------------------------------ */

const valeurIcons = {
  "shield-check": ShieldCheck,
  clock: Clock,
  "receipt-text": ReceiptText,
  "map-pin": MapPin,
  "user-check": UserCheck,
} as const;

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function AProposPage() {
  return (
    <>
      <JsonLd data={aboutJsonLd()} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />

      {/* ── Hero ── */}
      <PageHero
        eyebrow="À propos"
        title="L'artisan derrière AH ELEC RENOV"
        intro="Hocine ASLI, électricien et rénovateur à Paris 15e — un seul interlocuteur pour vos travaux, de l'électricité aux finitions."
        image={photo("artisanTravail", 2000, 72)}
        imageAlt="Hocine ASLI en intervention électrique sur un chantier de la région parisienne"
      />

      {/* ── Fil d'Ariane ── */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* ── Histoire / portrait ── */}
      <section className="bg-cream">
        <Container className="py-24 sm:py-28">
          <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2 lg:gap-20">
            {/* Texte */}
            <div>
              <Reveal>
                <div className="mb-4 flex items-center gap-3">
                  <span className="accent-line" aria-hidden />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-copper">
                    Parcours
                  </span>
                </div>
                <h2 className="text-3xl font-bold leading-tight text-anthracite sm:text-4xl">
                  Deux métiers, un seul artisan
                </h2>
              </Reveal>

              <Reveal delay={0.05}>
                <p className="mt-6 text-lg leading-relaxed text-muted">
                  {bio.intro}
                </p>
              </Reveal>

              {bio.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.08 + i * 0.05}>
                  <p className="mt-5 leading-relaxed text-muted">{p}</p>
                </Reveal>
              ))}

              <Reveal delay={0.25}>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Button href="/devis" variant="copper" size="lg">
                    Demander un devis gratuit
                  </Button>
                  <Button href="/contact" variant="outline" size="lg">
                    Me contacter
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Photo portrait */}
            <Reveal delay={0.1} className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lift">
                <Image
                  src={photo("artisanPortrait", 900, 72)}
                  alt="Hocine ASLI, artisan électricien et rénovateur, AH ELEC RENOV Paris"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  placeholder="blur"
                  blurDataURL={blurData}
                  className="img-craft object-cover"
                />
              </div>
              {/* Étiquette flottante */}
              <div className="absolute -bottom-5 -left-5 rounded-xl bg-anthracite px-5 py-4 shadow-lift sm:-left-8">
                <p className="text-xs font-bold uppercase tracking-widest text-copper-300">
                  {company.brandName}
                </p>
                <p className="mt-0.5 font-bold text-cream">{company.director}</p>
                <p className="text-sm text-cream/60">Paris 15e · région parisienne</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Valeurs ── */}
      <section className="bg-cream-200">
        <Container className="py-24 sm:py-28">
          <SectionHeading
            eyebrow="Valeurs"
            title="Ce qui guide chaque chantier"
            intro="Des principes de travail concrets, pas des slogans. Voici ce que vous pouvez attendre à chaque intervention."
            align="center"
            className="mb-14"
          />

          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {valeurs.map((val, i) => {
              const Icon = valeurIcons[val.icon];
              return (
                <Reveal key={val.title} delay={i * 0.06}>
                  <article className="rounded-2xl bg-cream p-7 shadow-soft transition-shadow hover:shadow-lift">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-copper/12 text-copper">
                      <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-anthracite">
                      {val.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {val.text}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── Comment je travaille (étapes) ── */}
      <section className="grain-overlay relative bg-ink text-cream">
        <Container className="py-24 sm:py-28">
          <Reveal className="mx-auto mb-16 max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-copper-300">
              Méthode de travail
            </span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Comment se déroule votre chantier
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-cream/70">
              Quatre étapes claires pour passer de la demande à la réception,
              sans mauvaise surprise.
            </p>
          </Reveal>

          <div className="relative flex flex-col gap-12 md:flex-row md:justify-between">
            {/* Ligne de liaison (desktop) */}
            <div
              className="absolute left-0 top-8 hidden h-0.5 w-full bg-gradient-to-r from-copper/0 via-copper/50 to-copper/0 md:block"
              aria-hidden
            />
            {steps.map((step, i) => (
              <Reveal
                key={step.n}
                delay={i * 0.08}
                className="relative flex-1 text-center"
              >
                <div className="relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-copper bg-anthracite transition-transform hover:scale-110">
                  <span className="font-display text-xl font-bold text-copper-300">
                    {step.n.replace("0", "")}
                  </span>
                </div>
                <h3 className="text-lg font-bold">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-xs px-4 text-sm leading-relaxed text-cream/60">
                  {step.text}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Engagements ou certifications ── */}
      <section className="bg-cream">
        <Container className="py-24 sm:py-28">
          <SectionHeading
            eyebrow={
              activeCertifications.length > 0
                ? "Certifications"
                : "Engagements qualité"
            }
            title={
              activeCertifications.length > 0
                ? "Qualifications et habilitations"
                : "Des garanties concrètes, par écrit"
            }
            intro={
              activeCertifications.length > 0
                ? "Reconnu par des organismes indépendants pour la qualité et la conformité des travaux réalisés."
                : "Avant de signer quoi que ce soit, vous savez exactement ce que vous obtenez et sur quoi vous êtes couvert."
            }
            align="center"
            className="mb-14"
          />

          {activeCertifications.length > 0 ? (
            <ul className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
              {activeCertifications.map((cert, i) => (
                <Reveal key={cert.name} delay={i * 0.06} as="li">
                  <div className="flex items-center gap-4 rounded-2xl border border-line bg-cream-200 px-6 py-5">
                    <ShieldCheck
                      className="h-8 w-8 shrink-0 text-copper"
                      strokeWidth={1.6}
                      aria-hidden
                    />
                    <div>
                      <p className="font-bold text-anthracite">{cert.name}</p>
                      <p className="text-sm text-muted">{cert.label}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {engagements.map((eng, i) => (
                <Reveal key={eng.title} delay={i * 0.06}>
                  <div className="flex gap-5 rounded-2xl border border-line bg-cream-200 p-6">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-copper/12 text-copper">
                      <ShieldCheck
                        className="h-5 w-5"
                        strokeWidth={2}
                        aria-hidden
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-anthracite">{eng.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {eng.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* ── Chiffres ── */}
      <section className="border-y border-line bg-anthracite">
        <Container className="py-14 sm:py-16">
          <dl className="grid grid-cols-3 divide-x divide-line/30">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="flex flex-col items-center px-4 text-center">
                  <dt className="tabular text-4xl font-extrabold text-copper-300 sm:text-5xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-2 text-xs font-semibold uppercase tracking-wider text-cream/50 sm:text-sm">
                    {stat.label}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* ── CTA ── */}
      <CTABand
        title="Un projet en tête ? Parlons-en."
        text="Devis gratuit, déplacement sans engagement dans toute la région parisienne. Je vous réponds sous 24 h."
      />
    </>
  );
}
