import { Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "./Reveal";
import { MagneticButton } from "./MagneticButton";
import { company, hasPhone } from "@/content/company";
import { promesse } from "@/content/urgence";

export function CTABand({
  title = "Une urgence électrique ? On arrive.",
  text = `Un seul numéro, une équipe qui décroche ${promesse.disponibilite}. Devis annoncé avant intervention, tarif respecté.`,
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-cream">
      <Container className="py-24 sm:py-28">
        <Reveal className="grain-overlay relative overflow-hidden rounded-[2rem] bg-anthracite px-6 py-16 text-center sm:px-12 sm:py-24">
          {/* Halos cuivre */}
          <div
            className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-copper/15 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-copper/15 blur-3xl"
            aria-hidden
          />
          <div className="relative z-10">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold text-cream sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-cream/70">{text}</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
              <MagneticButton
                href="/urgence"
                className="border-2 border-cream/30 bg-transparent text-cream hover:border-copper-300"
              >
                Demander une intervention
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
