"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ContactCard, type ContactQR } from "@/components/contact/ContactCard";
import { nav } from "@/content/site";
import { company, hasPhone } from "@/content/company";
import { promesse } from "@/content/urgence";

/** Bandeau d'urgence — le numéro reste visible dès le premier pixel. */
function UrgenceBar() {
  return (
    <div className="bg-ink text-cream">
      <Container className="flex h-10 items-center justify-between gap-4">
        <p className="flex items-center gap-2 text-xs font-semibold">
          <Zap className="h-3.5 w-3.5 text-copper-300" strokeWidth={2.5} aria-hidden />
          <span className="hidden sm:inline">
            Dépannage électrique {promesse.disponibilite}
          </span>
          <span className="sm:hidden">Urgence 24h/24</span>
        </p>
        {hasPhone && (
          <a
            href={company.contact.phoneHref}
            className="flex items-center gap-1.5 text-xs font-bold text-copper-300 transition-colors hover:text-cream"
          >
            <Phone className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
            {company.contact.phone}
          </a>
        )}
      </Container>
    </div>
  );
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Accueil">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-anthracite font-display text-base font-extrabold text-copper-300">
        AH
      </span>
      <span className="font-display text-lg font-bold leading-none text-anthracite">
        AH ELEC<span className="text-copper"> RENOV</span>
      </span>
    </Link>
  );
}

export function Header({ qr }: { qr: ContactQR }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-200",
        scrolled
          ? "border-line bg-cream/80 shadow-soft backdrop-blur-md"
          : "border-transparent bg-cream",
      )}
    >
      {/* Le bandeau d'urgence s'efface au scroll pour libérer de la hauteur. */}
      {!scrolled && <UrgenceBar />}

      <Container className="flex h-20 items-center justify-between">
        <Logo />

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Principale"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition-colors hover:text-copper"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ContactCard qr={qr} />
          {hasPhone && (
            <ButtonLink href={company.contact.phoneHref} variant="outline">
              <Phone className="h-4 w-4" aria-hidden />
              {company.contact.phone}
            </ButtonLink>
          )}
          <Button href="/urgence" variant="copper">
            Intervention en {promesse.delaiCourt}
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-anthracite lg:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-line bg-cream lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-anthracite hover:bg-cream-200"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <ContactCard qr={qr} variant="inline" />
              {hasPhone && (
                <ButtonLink
                  href={company.contact.phoneHref}
                  variant="outline"
                  size="lg"
                >
                  <Phone className="h-4 w-4" />
                  {company.contact.phone}
                </ButtonLink>
              )}
              <Button href="/urgence" variant="copper" size="lg">
                Intervention en {promesse.delaiCourt}
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
