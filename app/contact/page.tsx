import type { Metadata } from "next";
import {
  Phone,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button, ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Reveal } from "@/components/shared/Reveal";
import { CTABand } from "@/components/shared/CTABand";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import {
  company,
  mapsDirectionsUrl,
  mapsUrl,
  displayLocation,
} from "@/content/company";

export const metadata: Metadata = {
  title: "Contact — AH ELEC RENOV Paris",
  description:
    "Contactez AH ELEC RENOV à Paris 15e : mobile, fixe, email et accès en voiture. Hocine ASLI répond du lundi au vendredi, 8h–18h.",
};

const breadcrumbItems = [
  { name: "Accueil", path: "/" },
  { name: "Contact", path: "/contact" },
];

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact — AH ELEC RENOV",
  url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahelecrenov.fr"}/contact`,
  mainEntity: { "@id": `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahelecrenov.fr"}/#business` },
};

const contactMethods = [
  {
    icon: Phone,
    label: "Mobile",
    value: company.contact.phone,
    href: company.contact.phoneHref,
    note: "CTA principal — joignable 7j/7",
    isLink: true,
  },
  {
    icon: PhoneCall,
    label: "Fixe",
    value: company.contact.phoneFixed,
    href: company.contact.phoneFixedHref,
    note: "Lun.–ven. 8h–18h",
    isLink: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: company.contact.email,
    href: `mailto:${company.contact.email}`,
    note: "Réponse sous 24 h ouvrées",
    isLink: true,
  },
  {
    icon: MapPin,
    label: "Zone d'intervention",
    value: displayLocation,
    href: mapsUrl,
    note: "75 · 77 · 78 · 91 · 92 · 93 · 94 · 95",
    isLink: false,
    external: true,
  },
  {
    icon: Clock,
    label: "Horaires",
    value: company.hours,
    href: null,
    note: "Standard d'urgence ouvert en continu",
    isLink: false,
    external: false,
  },
] as const;

const reassuranceItems = [
  { title: "Rappel sous 5 minutes", text: "Toute demande envoyée depuis le site est traitée dès réception, 24h/24." },
  { title: "Devis gratuit", text: "Diagnostic et devis offerts, déplacement compris. Tarif annoncé avant intervention." },
  { title: "Un seul point d'entrée", text: "Un numéro et un formulaire uniques : vous ne décrivez votre panne qu'une seule fois." },
  { title: "Paris & Île-de-France", text: "Paris intra-muros, petite et grande couronne — intervention en 30 min sur le cœur de zone." },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
      <JsonLd data={contactPageJsonLd} />

      <PageHero
        eyebrow="Contact"
        title="Parlons de votre projet"
        intro="Appelez directement ou envoyez un email — Hocine ASLI vous répond personnellement et sans intermédiaire."
      />

      <Breadcrumbs items={breadcrumbItems} />

      {/* Bloc principal : coordonnées + carte */}
      <section className="bg-cream">
        <Container className="py-16 sm:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">

            {/* Colonne gauche — méthodes de contact */}
            <div>
              <Reveal>
                <h2 className="text-xl font-bold text-anthracite sm:text-2xl">
                  Coordonnées
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Toutes les façons de nous joindre, directement depuis votre appareil.
                </p>
              </Reveal>

              <ul className="mt-8 space-y-5" role="list">
                {contactMethods.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={item.label} as="li" delay={i * 0.06}>
                      <div className="flex items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft transition-shadow hover:shadow-lift">
                        <span
                          className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-copper/10 text-copper"
                          aria-hidden
                        >
                          <Icon className="h-5 w-5" strokeWidth={1.8} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                            {item.label}
                          </p>
                          {item.isLink ? (
                            <a
                              href={item.href as string}
                              className="mt-0.5 block text-base font-semibold text-anthracite hover:text-copper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
                            >
                              {item.value}
                            </a>
                          ) : item.external ? (
                            <a
                              href={item.href as string}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-0.5 inline-flex items-center gap-1 text-base font-semibold text-anthracite hover:text-copper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
                            >
                              {item.value}
                              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted/60" aria-hidden />
                            </a>
                          ) : (
                            <p className="mt-0.5 text-base font-semibold text-anthracite">
                              {item.value}
                            </p>
                          )}
                          {item.note && (
                            <p className="mt-1 text-xs text-muted">{item.note}</p>
                          )}
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </ul>
            </div>

            {/* Colonne droite — carte Google Maps + bouton itinéraire */}
            <Reveal className="flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-bold text-anthracite sm:text-2xl">
                  Notre zone d'intervention
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {displayLocation} — Paris intra-muros, petite couronne (92,
                  93, 94) et grande couronne (77, 78, 91, 95).
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-line shadow-soft" style={{ aspectRatio: "4/3" }}>
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    "Île-de-France, France",
                  )}&z=9&output=embed`}
                  title={`Zone d'intervention de ${company.brandName} — Paris et Île-de-France`}
                  loading="lazy"
                  className="h-full w-full border-0"
                  aria-label="Carte Google Maps de la zone d'intervention"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  href={mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="copper"
                  size="md"
                  className="flex-1 justify-center"
                >
                  <MapPin className="h-4 w-4" aria-hidden />
                  Voir la zone sur Maps
                </Button>
                <ButtonLink
                  href={company.contact.phoneHref}
                  variant="outline"
                  size="md"
                  className="flex-1 justify-center"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  {company.contact.phone}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Bandeau de réassurance */}
      <section className="border-y border-line bg-cream-200">
        <Container className="py-12 sm:py-14">
          <Reveal>
            <h2 className="mb-8 text-xs font-bold uppercase tracking-[0.18em] text-copper">
              Ce que vous pouvez attendre
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reassuranceItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="flex flex-col gap-2">
                  <span className="accent-line" aria-hidden />
                  <h3 className="text-sm font-bold text-anthracite">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTABand
        title="Préférez un devis écrit ?"
        text="Remplissez le formulaire en ligne — réponse personnalisée sous 24 h ouvrées, sans engagement."
      />
    </>
  );
}
