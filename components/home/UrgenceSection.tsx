import { Phone, Check, Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { InterventionForm } from "@/components/urgence/InterventionForm";
import { company, hasPhone } from "@/content/company";
import { garanties, pannesCourantes, promesse } from "@/content/urgence";

/**
 * Section de centralisation des demandes : tout le trafic du site converge ici.
 * Deux sorties possibles, jamais plus — l'appel, ou le formulaire unique.
 */
export function UrgenceSection() {
  return (
    <section id="urgence" className="grain-overlay relative overflow-hidden bg-ink">
      <Container className="relative z-10 grid grid-cols-1 gap-14 py-24 sm:py-28 lg:grid-cols-2 lg:gap-20">
        {/* Colonne gauche — la promesse */}
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-copper/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-copper-300">
            <Zap className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
            Urgence {promesse.disponibilite}
          </span>

          <h2 className="mt-6 text-3xl font-bold leading-tight text-cream sm:text-4xl lg:text-5xl">
            Une panne électrique ?<br />
            <span className="text-copper-300">On arrive.</span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-cream/80">
            Nos électriciens sont mobilisables immédiatement partout à Paris et
            en région parisienne. Un seul appel suffit : diagnostic rapide,
            intervention express, tarif annoncé à l'avance.
          </p>

          {hasPhone && (
            <ButtonLink
              href={company.contact.phoneHref}
              variant="copper"
              size="lg"
              className="mt-8"
            >
              <Phone className="h-5 w-5" aria-hidden />
              {company.contact.phone}
            </ButtonLink>
          )}

          {/* Pannes courantes */}
          <ul className="mt-9 flex flex-wrap gap-2">
            {pannesCourantes.map((panne) => (
              <li
                key={panne}
                className="rounded-full border border-cream/12 bg-cream/5 px-3.5 py-1.5 text-xs font-medium text-cream/70"
              >
                {panne}
              </li>
            ))}
          </ul>

          {/* Garanties */}
          <div className="mt-10 border-t border-cream/10 pt-8">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-copper-300">
              Nos garanties
            </p>
            <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {garanties.map((g) => (
                <li key={g} className="flex items-start gap-2.5 text-sm text-cream/75">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-copper-300"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Colonne droite — le formulaire unique */}
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-anthracite-500 bg-anthracite p-7 shadow-band sm:p-9">
            <h3 className="text-xl font-bold text-cream">
              Demande d'intervention
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-cream/65">
              Rappel sous {promesse.rappel}, {promesse.disponibilite}.
            </p>
            <div className="mt-7">
              <InterventionForm tone="dark" submitLabel="Envoyer ma demande" />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
