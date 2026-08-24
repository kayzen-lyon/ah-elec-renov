import Image from "next/image";
import { Phone, Clock, ReceiptText, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { company, hasPhone } from "@/content/company";
import { promesse } from "@/content/urgence";
import { blurData } from "@/lib/image";

const trust = [
  { icon: Clock, label: `Intervention en ${promesse.delaiCourt}` },
  { icon: ReceiptText, label: "Devis gratuit & transparent" },
  { icon: ShieldCheck, label: "Électriciens qualifiés & assurés" },
] as const;

export function Hero() {
  return (
    <section className="grain-overlay relative isolate flex min-h-[640px] items-center overflow-hidden sm:min-h-[760px] lg:min-h-[860px]">
      {/* Photo plein cadre */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=2200&q=72"
          alt="Électricien intervenant sur un tableau électrique en urgence"
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={blurData}
          className="img-craft object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/70 to-ink/20"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent"
          aria-hidden
        />
      </div>

      <Container className="w-full py-28">
        <div className="max-w-3xl">
          {/* Badge disponibilité */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-cream/15 bg-cream/5 px-4 py-2 backdrop-blur-sm">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper-300 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-copper-300" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-copper-300">
              Électriciens disponibles maintenant en Île-de-France
            </span>
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.08] text-cream sm:text-5xl lg:text-[64px] lg:leading-[1.05]">
            Dépannage électrique{" "}
            <span className="text-copper-300">en {promesse.delai}</span> à Paris
            et en Île-de-France
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/85">
            Panne de courant, disjoncteur qui saute, court-circuit, tableau
            électrique : un seul numéro, une équipe qui décroche{" "}
            {promesse.disponibilite}. Devis annoncé avant intervention, tarif
            respecté.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            {hasPhone ? (
              <ButtonLink
                href={company.contact.phoneHref}
                variant="copper"
                size="lg"
              >
                <Phone className="h-5 w-5" aria-hidden />
                {company.contact.phone}
              </ButtonLink>
            ) : null}
            <MagneticButton
              href="/urgence"
              className="border-2 border-cream/30 bg-transparent text-cream copper-glow hover:border-copper-300"
            >
              Demander une intervention
            </MagneticButton>
          </div>

          {/* Bandeau de confiance */}
          <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
            {trust.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-cream/75">
                <Icon className="h-4 w-4 text-copper-300" strokeWidth={2} aria-hidden />
                {label}
              </li>
            ))}
          </ul>

          <p className="mt-5 max-w-xl text-xs leading-relaxed text-cream/45">
            Délai de {promesse.delaiCourt} : {promesse.delaiPerimetre}
          </p>
        </div>
      </Container>
    </section>
  );
}
