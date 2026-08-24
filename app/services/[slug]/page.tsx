import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQ } from "@/components/shared/FAQ";
import { Gallery } from "@/components/shared/Gallery";
import { CTABand } from "@/components/shared/CTABand";
import { Reveal } from "@/components/shared/Reveal";
import { ServiceIcon } from "@/components/shared/ServiceIcon";
import { JsonLd } from "@/components/seo/JsonLd";

import { services, getService } from "@/content/services";
import { servicesContent, getBySlug } from "@/content/services-content";
import { photo } from "@/content/photos";
import { blurData } from "@/lib/image";
import {
  serviceJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
} from "@/lib/structured-data";

/* ------------------------------------------------------------------ */
/* Static params                                                        */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return servicesContent.map((s) => ({ slug: s.slug }));
}

/* ------------------------------------------------------------------ */
/* Metadata                                                             */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = getBySlug(slug);
  if (!content) return {};
  return {
    title: content.metaTitle,
    description: content.metaDescription,
  };
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = getBySlug(slug);
  const service = getService(slug);
  if (!content || !service) notFound();

  const heroImage = photo(content.heroImageKey, 1600, 72);
  const breadcrumbItems = [
    { name: "Accueil", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path: `/services/${slug}` },
  ];

  const relatedServices = services.filter((s) => s.slug !== slug);

  const galleryItems = content.galleryKeys.map((key) => ({
    src: photo(key, 1000, 72),
    alt: `${service.title} — AH ELEC RENOV`,
  }));

  return (
    <>
      {/* Structured data */}
      <JsonLd
        data={serviceJsonLd({
          name: service.title,
          description: service.description,
          slug,
          serviceType: content.serviceType,
        })}
      />
      <JsonLd data={faqJsonLd(content.faq)} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />

      {/* Hero */}
      <PageHero
        eyebrow="Service"
        title={service.title}
        intro={content.intro[0]}
        image={heroImage}
        imageAlt={`${service.title} à Paris — AH ELEC RENOV`}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/devis" variant="copper" size="lg">
            Devis gratuit
          </Button>
          <Button href="/contact" variant="outline-light" size="lg">
            Nous contacter
          </Button>
        </div>
      </PageHero>

      {/* Fil d'Ariane */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Intro + prestations */}
      <section className="bg-cream">
        <Container className="py-20 sm:py-24">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Paragraphes d'intro (2e et 3e) */}
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="accent-line" aria-hidden />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-copper">
                  Notre approche
                </span>
              </div>
              <h2 className="text-2xl font-bold text-anthracite sm:text-3xl">
                Comment nous travaillons
              </h2>
              <div className="mt-6 space-y-5">
                {content.intro.slice(1).map((para, i) => (
                  <p
                    key={i}
                    className="text-[15px] leading-relaxed text-muted"
                  >
                    {para}
                  </p>
                ))}
              </div>
              {/* Réassurances */}
              <ul className="mt-8 space-y-3">
                {content.reassurances.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-copper/15 text-copper">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-sm font-medium text-anthracite">
                      {r}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Grille des prestations */}
            <Reveal delay={0.06}>
              <div className="flex items-center gap-3 mb-6">
                <span className="accent-line" aria-hidden />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-copper">
                  Prestations
                </span>
              </div>
              <h2 className="text-2xl font-bold text-anthracite sm:text-3xl">
                Ce que nous réalisons
              </h2>
              <ul className="mt-6 space-y-4">
                {content.prestations.map((p, i) => (
                  <Reveal as="li" key={i} delay={i * 0.04}>
                    <div className="rounded-xl border border-anthracite/10 bg-white p-5 transition-shadow hover:shadow-soft">
                      <h3 className="font-display text-base font-bold text-anthracite">
                        {p.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {p.text}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Bandeau réassurance sombre */}
      <section className="grain-overlay relative bg-anthracite">
        <div
          className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-copper/10 blur-3xl"
          aria-hidden
        />
        <Container className="relative py-16 sm:py-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {content.reassurances.map((r, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-anthracite-700 text-copper-300">
                    <ServiceIcon name={service.icon} className="h-5 w-5" />
                  </span>
                  <p className="text-sm font-semibold leading-snug text-cream">
                    {r}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Galerie */}
      {galleryItems.length > 0 && (
        <section className="bg-cream-200">
          <Container className="py-20 sm:py-24">
            <Reveal className="mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-copper">
                Nos réalisations
              </span>
              <h2 className="mt-4 text-2xl font-bold text-anthracite sm:text-3xl">
                Quelques exemples de chantiers
              </h2>
            </Reveal>
            <Gallery items={galleryItems} variant="mosaic" />
          </Container>
        </section>
      )}

      {/* FAQ */}
      <FAQ items={content.faq} />

      {/* Services associés */}
      <section className="bg-cream-200">
        <Container className="py-20 sm:py-24">
          <Reveal className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-copper">
              Nos autres prestations
            </span>
            <h2 className="mt-4 text-2xl font-bold text-anthracite sm:text-3xl">
              Découvrez le reste de notre offre
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedServices.map((related, i) => (
              <Reveal key={related.slug} delay={i * 0.05}>
                <Link
                  href={`/services/${related.slug}`}
                  className="group flex flex-col rounded-2xl border border-anthracite/10 bg-white p-6 transition-all hover:border-copper/30 hover:shadow-lift"
                >
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-anthracite text-copper-300 transition-colors group-hover:bg-copper group-hover:text-cream">
                    <ServiceIcon name={related.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="font-display text-base font-bold text-anthracite">
                    {related.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {related.short}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-bold text-copper transition-all group-hover:gap-2">
                    Voir le service <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}
