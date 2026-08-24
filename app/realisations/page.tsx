import type { Metadata } from "next";
import { Layers, Zap, Droplets, PaintBucket, ChefHat } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { BeforeAfterCard } from "@/components/shared/BeforeAfterCard";
import { CTABand } from "@/components/shared/CTABand";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { realisations } from "@/content/realisations";
import { photo } from "@/content/photos";

/* ─── Metadata ────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Réalisations — chantiers avant/après | AH Elec Renov",
  description:
    "Découvrez nos chantiers d'électricité et de rénovation intérieure dans la région parisienne : salles de bain, cuisines, tableaux électriques et bien plus.",
};

/* ─── Données statiques ───────────────────────────────────────────── */

const breadcrumbItems = [
  { name: "Accueil", path: "/" },
  { name: "Réalisations", path: "/realisations" },
];

const categories = [
  {
    label: "Salle de bain",
    icon: Droplets,
    description: "Rénovation, douche à l'italienne, carrelage",
  },
  {
    label: "Électricité",
    icon: Zap,
    description: "Mise aux normes, tableaux, câblage",
  },
  {
    label: "Cuisine",
    icon: ChefHat,
    description: "Ouverture, circuits, raccordements",
  },
  {
    label: "Plomberie",
    icon: Droplets,
    description: "Colonnes, PER, sanitaires",
  },
  {
    label: "Rénovation",
    icon: PaintBucket,
    description: "Chantiers clé en main, toutes corps d'état",
  },
];

const stats = [
  { value: "8+", label: "Corps de métier maîtrisés" },
  { value: "100 %", label: "Conformité NF C 15-100" },
  { value: "Région parisienne", label: "Zone d'intervention" },
  { value: "1 équipe", label: "Interlocuteur unique" },
];

/* ─── Page ────────────────────────────────────────────────────────── */

export default function RealisationsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />

      {/* Hero */}
      <PageHero
        eyebrow="Réalisations"
        title="Nos chantiers, avant / après"
        intro="Chaque projet ci-dessous illustre notre méthode : un seul interlocuteur, un planning tenu et des finitions soignées. Survolez une image pour voir l'état d'origine."
        image={photo("interieurRenove")}
        imageAlt="Intérieur rénové par AH Elec Renov dans la région parisienne"
      />

      {/* Fil d'Ariane */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Intro + légende des catégories */}
      <section className="border-b border-line bg-cream-200">
        <Container className="py-16 sm:py-20">
          <Reveal className="max-w-2xl">
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              Ces réalisations couvrent l'ensemble de nos savoir-faire : de la
              mise aux normes électriques jusqu'à la rénovation intérieure clé
              en main. Les photos sont illustratives — les visuels de chantiers
              réels seront publiés au fil des mises à jour.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-copper">
              Catégories
            </p>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.label}
                    className="flex items-center gap-2 rounded-full border border-line bg-cream px-4 py-2"
                    title={cat.description}
                  >
                    <Icon
                      className="h-3.5 w-3.5 text-copper"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-anthracite">
                      {cat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Grille des réalisations */}
      <section className="bg-cream">
        <Container className="py-20 sm:py-24">
          <Reveal className="mb-4 flex items-center gap-3">
            <span className="accent-line" aria-hidden />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-copper">
              Portfolio
            </span>
          </Reveal>
          <Reveal delay={0.05} className="mb-14">
            <h2 className="text-2xl font-bold text-anthracite sm:text-3xl">
              {realisations.length} projets récents
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Passez votre souris sur chaque carte pour comparer l'état avant
              et après intervention.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {realisations.map((item, i) => (
              <Reveal key={item.slug} delay={Math.min(i * 0.05, 0.25)}>
                <BeforeAfterCard item={item} />
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.summary}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Bande de confiance — chiffres clés */}
      <section className="grain-overlay relative bg-anthracite">
        <Container className="py-16 sm:py-20">
          <Reveal className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-copper-300">
              Pourquoi nous confier votre chantier
            </p>
            <h2 className="mt-3 text-2xl font-bold text-cream sm:text-3xl">
              Un artisan qui tient ses engagements
            </h2>
          </Reveal>

          <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.07} as="div">
                <dt className="mt-2 text-sm leading-snug text-cream/60">
                  {stat.label}
                </dt>
                <dd className="text-3xl font-extrabold text-copper sm:text-4xl">
                  {stat.value}
                </dd>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.3} className="mt-14 border-t border-cream/10 pt-10">
            <div className="flex items-start gap-4">
              <Layers
                className="mt-0.5 h-5 w-5 shrink-0 text-copper-300"
                aria-hidden="true"
              />
              <p className="text-sm leading-relaxed text-cream/70">
                Chaque chantier est suivi par le même artisan, du devis à la
                réception des travaux. Pas de sous-traitants inconnus, pas de
                mauvaise surprise sur la facture finale.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* CTA final */}
      <CTABand
        title="Votre projet mérite le même soin"
        text="Décrivez-nous vos travaux : nous répondons sous 24 h avec un premier chiffrage honnête, sans engagement."
      />
    </>
  );
}
