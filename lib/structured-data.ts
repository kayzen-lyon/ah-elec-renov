import { company, establishment } from "@/content/company";
import { communesCouvertes } from "@/content/zones";
import { promesse } from "@/content/urgence";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahelecrenov.fr";

/** Départements franciliens servis — repris tel quel par tous les JSON-LD. */
const areaServed = [
  { "@type": "AdministrativeArea", name: "Île-de-France" },
  ...communesCouvertes.map((name) => ({ "@type": "City", name })),
];

/**
 * Adresse déclarée à Google.
 *
 * Tant qu'aucun établissement francilien n'est renseigné, on ne déclare que la
 * région servie : déclarer le siège lyonnais alors que la zone commerciale est
 * l'Île-de-France dégraderait le référencement local et induirait en erreur.
 * Le siège légal reste affiché dans les mentions légales, où il est obligatoire.
 */
function postalAddress() {
  const base = {
    "@type": "PostalAddress",
    addressRegion: establishment.region,
    addressCountry: establishment.countryCode,
  };
  if (!establishment.active) return base;
  return {
    ...base,
    streetAddress: establishment.street,
    postalCode: establishment.postalCode,
    addressLocality: establishment.city,
  };
}

/**
 * JSON-LD principal : électricien d'urgence en Île-de-France, ouvert 24h/24.
 * Les champs vides ne sont pas émis tant qu'ils ne sont pas renseignés.
 */
export function localBusinessJsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["Electrician", "EmergencyService", "LocalBusiness"],
    "@id": `${siteUrl}/#business`,
    name: company.brandName,
    description: `Dépannage électrique d'urgence à Paris et en Île-de-France. Intervention en ${promesse.delai}, ${promesse.disponibilite}.`,
    url: siteUrl,
    address: postalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: establishment.latitude,
      longitude: establishment.longitude,
    },
    areaServed,
    /* Standard d'urgence ouvert en continu. */
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    founder: { "@type": "Person", name: company.director },
  };

  if (company.legal.tva) data.vatID = company.legal.tva;
  if (company.contact.phone) data.telephone = company.contact.phone;
  if (company.contact.email) data.email = company.contact.email;
  if (company.social.googleBusinessUrl)
    data.sameAs = [company.social.googleBusinessUrl];

  return data;
}

/** JSON-LD `Service` pour une page service. */
export function serviceJsonLd(opts: {
  name: string;
  description: string;
  slug: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    serviceType: opts.serviceType ?? opts.name,
    description: opts.description,
    url: `${siteUrl}/services/${opts.slug}`,
    provider: { "@id": `${siteUrl}/#business` },
    areaServed,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${siteUrl}/urgence`,
      servicePhone: company.contact.phone,
    },
  };
}

/** JSON-LD `FAQPage` à partir d'une liste de Q/R. */
export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

/** JSON-LD `BreadcrumbList`. items = [{name, path}], path relatif ("/services"). */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteUrl}${it.path}`,
    })),
  };
}
