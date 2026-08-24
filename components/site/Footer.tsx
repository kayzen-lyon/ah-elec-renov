import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import {
  company,
  agency,
  hasPhone,
  hasPhoneFixed,
  hasEmail,
  displayLocation,
} from "@/content/company";
import { nav, interventionZones } from "@/content/site";
import { services } from "@/content/services";

const year = 2026;

export function Footer() {
  return (
    <footer className="grain-overlay relative bg-ink text-cream/65">
      <Container className="grid gap-12 py-20 sm:grid-cols-2 lg:grid-cols-4">
        {/* Marque + NAP */}
        <div className="lg:col-span-1">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-anthracite font-display text-base font-extrabold text-copper-300">
              AH
            </span>
            <span className="font-display text-lg font-bold leading-none text-cream">
              AH ELEC RENOV
            </span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed">
            Dépannage électrique d'urgence et travaux aux normes à Paris et en
            région parisienne. Un seul numéro, 24h/24.
          </p>
          <address className="mt-5 space-y-2.5 text-sm not-italic">
            <span className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-copper-300" />
              {displayLocation}
            </span>
            {hasPhone && (
              <a
                href={company.contact.phoneHref}
                className="flex items-center gap-2.5 hover:text-copper-300"
              >
                <Phone className="h-4 w-4 shrink-0 text-copper-300" />
                {company.contact.phone}
              </a>
            )}
            {hasPhoneFixed && (
              <a
                href={company.contact.phoneFixedHref}
                className="flex items-center gap-2.5 hover:text-copper-300"
              >
                <Phone className="h-4 w-4 shrink-0 text-copper-300" />
                {company.contact.phoneFixed}
              </a>
            )}
            {hasEmail && (
              <a
                href={`mailto:${company.contact.email}`}
                className="flex items-center gap-2.5 hover:text-copper-300"
              >
                <Mail className="h-4 w-4 shrink-0 text-copper-300" />
                {company.contact.email}
              </a>
            )}
          </address>
        </div>

        {/* Services */}
        <nav aria-label="Services">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-copper-300">
            Prestations
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="hover:text-copper-300"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Navigation */}
        <nav aria-label="Pages">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-copper-300">
            Liens utiles
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-copper-300">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/devis" className="hover:text-copper-300">
                Demande de devis
              </Link>
            </li>
            <li>
              <Link href="/mentions-legales" className="hover:text-copper-300">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/cgu" className="hover:text-copper-300">
                CGU
              </Link>
            </li>
            <li>
              <Link href="/cgp" className="hover:text-copper-300">
                Conditions de prestation
              </Link>
            </li>
            <li>
              <Link
                href="/politique-confidentialite"
                className="hover:text-copper-300"
              >
                Politique de confidentialité
              </Link>
            </li>
          </ul>
        </nav>

        {/* Zone */}
        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-copper-300">
            Zone d'intervention
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 text-sm">
            {interventionZones.map((z) => (
              <li
                key={z}
                className="after:ml-3 after:text-cream/25 after:content-['·'] last:after:content-['']"
              >
                {z}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-cream/10">
        <Container className="flex flex-col gap-3 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName} — {company.legal.form}. Tous droits
            réservés.
          </p>
          <p>
            <a
              href={agency.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-cream/70 transition-colors hover:text-copper-300"
            >
              {agency.creditLabel}
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
