import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";
import { steps } from "@/content/site";

export function Steps() {
  return (
    <section className="grain-overlay relative bg-ink text-cream">
      <Container className="py-24 sm:py-28">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-copper-300">
            Méthodologie
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Votre dépannage en {steps.length} étapes
          </h2>
        </Reveal>

        <div className="relative flex flex-col gap-12 md:flex-row md:justify-between">
          {/* Ligne de liaison (desktop) */}
          <div
            className="absolute left-0 top-8 hidden h-0.5 w-full bg-gradient-to-r from-copper/0 via-copper/50 to-copper/0 md:block"
            aria-hidden
          />
          {steps.map((step, i) => (
            <Reveal
              key={step.n}
              delay={i * 0.08}
              className="relative flex-1 text-center"
            >
              <div className="relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-copper bg-anthracite transition-transform hover:scale-110">
                <span className="font-display text-xl font-bold text-copper-300">
                  {step.n.replace("0", "")}
                </span>
              </div>
              <h3 className="text-lg font-bold">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-xs px-4 text-sm leading-relaxed text-cream/60">
                {step.text}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
