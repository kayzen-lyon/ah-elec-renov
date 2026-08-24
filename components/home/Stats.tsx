"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { stats } from "@/content/urgence";

/** Compteur animé — démarre quand la valeur entre dans le viewport. */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Mouvement réduit : on affiche directement la valeur finale. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          /* easeOutExpo — rapide puis freine, plus lisible qu'un linéaire */
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          setDisplay(Math.round(eased * value));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular">
      {display.toLocaleString("fr-FR")}
      <span className="text-copper-300">{suffix}</span>
    </span>
  );
}

/** Bandeau de preuve chiffrée, juste sous le héros. */
export function Stats() {
  return (
    <section className="border-b border-anthracite-500 bg-anthracite">
      <Container className="py-14">
        <dl className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-4xl font-extrabold text-cream sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </dd>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-cream/55">
                {stat.label}
              </p>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
