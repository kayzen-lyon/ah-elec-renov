import { MapPin, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/Button";
import { zones, villesPhares } from "@/content/zones";
import { promesse } from "@/content/urgence";

export function ZoneSection() {
  return (
    <section className="bg-cream">
      <Container className="py-24 sm:py-28">
        <Reveal className="mb-14 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-copper">
            Zones d'intervention
          </span>
          <h2 className="mt-4 text-3xl font-bold text-anthracite sm:text-4xl">
            Partout à Paris et en région parisienne
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Paris intra-muros, petite et grande couronne : nos électriciens
            couvrent les huit départements franciliens, avec un délai annoncé
            secteur par secteur.
          </p>
        </Reveal>

        {/* Secteurs */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {zones.map((zone, i) => (
            <Reveal as="div" key={zone.slug} delay={Math.min(i * 0.05, 0.3)}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-soft transition-shadow duration-200 hover:shadow-lift">
                <header className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-2xl font-extrabold text-copper tabular">
                    {zone.code}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-anthracite px-2.5 py-1 text-xs font-semibold text-cream">
                    <Clock className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                    {zone.delai}
                  </span>
                </header>

                <h3 className="mt-3 font-bold text-anthracite">{zone.name}</h3>
                <p className="mt-1.5 text-sm text-muted">
                  {zone.communes.slice(0, 3).join(", ")}…
                </p>

                {/* Barre de couverture */}
                <div className="mt-auto pt-6">
                  <div className="flex items-center justify-between text-xs font-medium text-muted">
                    <span>Couverture</span>
                    <span className="font-bold text-anthracite tabular">
                      {zone.coverage}%
                    </span>
                  </div>
                  <div
                    className="mt-2 h-1.5 overflow-hidden rounded-full bg-cream-300"
                    role="presentation"
                  >
                    <div
                      className="h-full rounded-full bg-copper"
                      style={{ width: `${zone.coverage}%` }}
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Nuage de villes */}
        <Reveal delay={0.15} className="mt-14 rounded-2xl bg-cream-200 p-8 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-copper">
            Villes couvertes (extrait)
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {villesPhares.map((ville) => (
              <li
                key={ville}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium text-anthracite"
              >
                <MapPin className="h-3.5 w-3.5 text-copper" aria-hidden />
                {ville}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/zone-intervention" variant="dark">
              Voir toutes les zones
            </Button>
            <Button href="/urgence" variant="outline">
              Intervention en {promesse.delaiCourt}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
