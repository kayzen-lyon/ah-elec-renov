import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import {
  MapPin,
  UserCheck,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTABand } from "@/components/shared/CTABand";
import { Reveal } from "@/components/shared/Reveal";
import { ServiceIcon } from "@/components/shared/ServiceIcon";
import { JsonLd } from "@/components/seo/JsonLd";

import { services } from "@/content/services";
import { photo } from "@/content/photos";
import { blurData } from "@/lib/image";
import { breadcrumbJsonLd } from "@/lib/structured-data";

/* ------------------------------------------------------------------ */
/* Metadata                                                             */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  title: "Électricité & rénovation intérieure à Paris",
  description:
    "Électricité, salle de bain, cuisine, plomberie et rénovation intérieure à Paris et en Île-de-France. Un seul artisan, devis gratuit.",
};

/* ------------------------------------------------------------------ */
/* Données locales                                                      */
/* ------------------------------------------------------------------ */

/**
 * Associations image / service pour les cards de la grille.
 * On évite de stocker les URLs dans services.ts pour ne pas dupliquer
 * la logique de construction Unsplash.
 */
const serviceImages: Record<string, ReturnType<typeof photo>> = {
  electricite: photo("tableauElectrique", 800, 70),
  "salle-de-bain": photo("sdbApres", 800, 70),
  cuisine: photo("cuisineModerne", 800, 70),
  plomberie: photo("plomberie", 800, 70),
  "renovation-interieure": photo("interieurRenove", 800, 70),
};

const serviceImageAlts: Record<string, string> = {
  electricite: "Tableau électrique rénové, mise aux normes NF C 15-100",
  "salle-de-bain": "Salle de bain rénovée avec douche à l'italienne",
  cuisine: "Cuisine moderne aménagée sur mesure",
  plomberie: "Plomberie professionnelle, installation de sanitaires",
  "renovation-interieure": "Intérieur rénové clé en main à Paris",
};

const reassurances = [
  {
    icon: UserCheck,
    title: "Un seul interlocuteur",
    text: "Du premier rendez-vous à la livraison, vous n'avez qu'un seul contact. Pas de coordination entre artisans, pas d'excuse entre corps de métier.",
  },
  {
    icon: MapPin,
    title: "Ancré dans la région parisienne",
    text: "Basés à Paris 15e, nous intervenons à Boulogne-Billancourt, Neuilly, Levallois-Perret, Vincennes, Montreuil et Charbonnières. Réactivité garantie.",
  },
  {
    icon: ShieldCheck,
    title: "Aucune sous-traitance",
    text: "Chaque intervention est réalisée par notre équipe. Vous savez exactement qui travaille chez vous.",
  },
  {
    icon: Workflow,
    title: "Devis gratuit et détaillé",
    text: "Visite de chantier offerte, devis postes par postes remis sous 48 h. Aucune surprise en cours de chantier.",
  },
];

const breadcrumbItems = [
  { name: "Accueil", path: "/" },
  { name: "Services", path: "/services" },
];

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />

      {/* Hero */}
      <PageHero
        eyebrow="Nos prestations"
        title="Électricité & rénovation intérieure à Paris"
        intro="Cinq domaines d'expertise, un seul artisan qualifié. AH ELEC RENOV intervient de la mise aux normes électriques à la rénovation complète de votre logement, sans sous-traitance, dans la région parisienne."
      />

      {/* Fil d'Ariane */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Grille des 5 services */}
      <section id="services" className="bg-cream">
        <Container className="py-20 sm:py-24">
          <Reveal className="mb-14 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-copper">
              Nos expertises
            </span>
            <h2 className="mt-4 text-3xl font-bold text-anthracite sm:text-4xl">
              Cinq domaines, un même artisan
            </h2>
            <p className="mt-4 text-lg text-muted">
              Chaque prestation peut être réalisée séparément ou intégrée dans
              un chantier global. Dans les deux cas, vous avez un interlocuteur
              unique, de la conception à la livraison.
            </p>
          </Reveal>

          {/* Bento grid — premier service en grand, les quatre autres en petits */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            {/* Grande carte — Électricité */}
            {(() => {
              const electricite = services.find(
                (s) => s.slug === "electricite",
              )!;
              return (
                <Reveal className="lg:col-span-7">
                  <Link
                    href={`/services/${electricite.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-anthracite/10 bg-white shadow-soft transition-all hover:border-copper/30 hover:shadow-lift md:flex-row lg:h-full"
                  >
                    <div className="flex flex-1 flex-col p-7 md:p-8">
                      <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-anthracite text-copper-300 transition-colors group-hover:bg-copper group-hover:text-cream">
                        <ServiceIcon
                          name={electricite.icon}
                          className="h-7 w-7"
                        />
                      </span>
                      <h3 className="font-display text-2xl font-bold text-anthracite">
                        {electricite.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-muted">
                        {electricite.description}
                      </p>
                      <ul className="mt-5 space-y-2">
                        {electricite.highlights.slice(0, 3).map((h) => (
                          <li
                            key={h}
                            className="flex items-center gap-2 text-sm text-muted"
                          >
                            <Check
                              className="h-3.5 w-3.5 shrink-0 text-copper"
                              strokeWidth={3}
                            />
                            {h}
                          </li>
                        ))}
                      </ul>
                      <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-bold text-copper transition-all group-hover:gap-2.5">
                        Voir le service <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="relative h-48 w-full md:h-auto md:w-2/5">
                      <Image
                        src={serviceImages[electricite.slug]}
                        alt={serviceImageAlts[electricite.slug]}
                        fill
                        sizes="(max-width: 768px) 100vw, 35vw"
                        placeholder="blur"
                        blurDataURL={blurData}
                        className="img-craft object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                </Reveal>
              );
            })()}

            {/* Colonne droite — Salle de bain + Plomberie */}
            <div className="flex flex-col gap-5 lg:col-span-5">
              {["salle-de-bain", "plomberie"].map((slug, i) => {
                const svc = services.find((s) => s.slug === slug)!;
                return (
                  <Reveal key={slug} delay={0.05 + i * 0.05}>
                    <Link
                      href={`/services/${svc.slug}`}
                      className="group flex overflow-hidden rounded-2xl border border-anthracite/10 bg-white shadow-soft transition-all hover:border-copper/30 hover:shadow-lift"
                    >
                      <div className="flex flex-1 flex-col p-6">
                        <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-anthracite text-copper-300 transition-colors group-hover:bg-copper group-hover:text-cream">
                          <ServiceIcon name={svc.icon} className="h-6 w-6" />
                        </span>
                        <h3 className="font-display text-lg font-bold text-anthracite">
                          {svc.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {svc.short}
                        </p>
                        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-bold text-copper transition-all group-hover:gap-2">
                          Voir le service <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                      <div className="relative hidden w-36 sm:block">
                        <Image
                          src={serviceImages[svc.slug]}
                          alt={serviceImageAlts[svc.slug]}
                          fill
                          sizes="144px"
                          placeholder="blur"
                          blurDataURL={blurData}
                          className="img-craft object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>

            {/* Ligne du bas — Cuisine (claire) + Rénovation (sombre) */}
            {["cuisine", "renovation-interieure"].map((slug, i) => {
              const svc = services.find((s) => s.slug === slug)!;
              const dark = slug === "renovation-interieure";
              return (
                <Reveal
                  key={slug}
                  delay={0.1 + i * 0.05}
                  className="lg:col-span-6"
                >
                  <Link
                    href={`/services/${svc.slug}`}
                    className={`group flex overflow-hidden rounded-2xl shadow-soft transition-all hover:shadow-lift ${
                      dark
                        ? "bg-anthracite hover:border-copper/40"
                        : "border border-anthracite/10 bg-white hover:border-copper/30"
                    }`}
                  >
                    <div className="flex flex-1 flex-col p-7">
                      <span
                        className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl transition-colors ${
                          dark
                            ? "bg-anthracite-700 text-copper-300"
                            : "bg-anthracite text-copper-300 group-hover:bg-copper group-hover:text-cream"
                        }`}
                      >
                        <ServiceIcon name={svc.icon} className="h-7 w-7" />
                      </span>
                      <h3
                        className={`font-display text-xl font-bold ${dark ? "text-cream" : "text-anthracite"}`}
                      >
                        {svc.title}
                      </h3>
                      <p
                        className={`mt-2 text-[15px] leading-relaxed ${dark ? "text-cream/65" : "text-muted"}`}
                      >
                        {svc.description}
                      </p>
                      <span
                        className={`mt-auto inline-flex items-center gap-1 pt-5 text-sm font-bold transition-all group-hover:gap-2.5 ${dark ? "text-copper-300" : "text-copper"}`}
                      >
                        Voir le service <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="relative hidden w-44 sm:block">
                      <Image
                        src={serviceImages[svc.slug]}
                        alt={serviceImageAlts[svc.slug]}
                        fill
                        sizes="176px"
                        placeholder="blur"
                        blurDataURL={blurData}
                        className={`img-craft object-cover transition-transform duration-500 group-hover:scale-105 ${dark ? "opacity-50" : ""}`}
                      />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Bandeau de réassurance */}
      <section className="grain-overlay relative bg-ink">
        <div
          className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-copper/8 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-copper/8 blur-3xl"
          aria-hidden
        />
        <Container className="relative py-20 sm:py-24">
          <Reveal className="mx-auto mb-16 max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-copper-300">
              Notre engagement
            </span>
            <h2 className="mt-4 text-3xl font-bold text-cream sm:text-4xl">
              Pourquoi choisir AH ELEC RENOV
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {reassurances.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.06}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-anthracite-700 text-copper-300">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <h3 className="mt-5 text-base font-bold text-cream">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">
                  {text}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}
