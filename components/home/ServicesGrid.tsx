import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";
import { ServiceIcon } from "@/components/shared/ServiceIcon";
import { getService, type Service } from "@/content/services";
import { blurData } from "@/lib/image";
import { cn } from "@/lib/utils";

function MoreLink({ slug, dark = false }: { slug: string; dark?: boolean }) {
  return (
    <span
      className={cn(
        "mt-auto inline-flex items-center gap-1 pt-2 text-sm font-bold transition-all group-hover:gap-2.5",
        dark ? "text-copper-300" : "text-copper",
      )}
    >
      Voir le service <ArrowRight className="h-4 w-4" />
    </span>
  );
}

/** Carte large avec visuel (Électricité). */
function LargeCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="bento-card group flex flex-col items-stretch gap-8 rounded-2xl border border-anthracite/10 bg-white p-7 transition-all hover:border-copper/30 hover:shadow-lift md:flex-row md:p-8 lg:col-span-8"
    >
      <div className="flex flex-1 flex-col">
        <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-anthracite text-copper-300">
          <ServiceIcon name={service.icon} className="h-7 w-7" />
        </span>
        <h3 className="font-display text-2xl font-bold text-anthracite">
          {service.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          {service.description}
        </p>
        <MoreLink slug={service.slug} />
      </div>
      <div className="relative h-52 w-full overflow-hidden rounded-xl md:h-auto md:w-1/2">
        {service.image && (
          <Image
            src={service.image}
            alt={`${service.title} — AH ELEC RENOV`}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            placeholder="blur"
            blurDataURL={blurData}
            className="img-craft object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
    </Link>
  );
}

/** Carte standard. */
function Card({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="bento-card group flex flex-col rounded-2xl border border-anthracite/10 bg-white p-7 transition-all hover:border-copper/30 hover:shadow-lift lg:col-span-4"
    >
      <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-anthracite text-copper-300 transition-colors group-hover:bg-copper group-hover:text-cream">
        <ServiceIcon name={service.icon} className="h-7 w-7" />
      </span>
      <h3 className="font-display text-xl font-bold text-anthracite">
        {service.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{service.short}</p>
      <MoreLink slug={service.slug} />
    </Link>
  );
}

/** Carte sombre (Rénovation globale). */
function DarkCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="bento-card group flex flex-col rounded-2xl bg-anthracite p-7 text-cream transition-all hover:shadow-lift lg:col-span-4"
    >
      <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-anthracite-700 text-copper-300">
        <ServiceIcon name={service.icon} className="h-7 w-7" />
      </span>
      <h3 className="font-display text-xl font-bold">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-cream/65">
        {service.short}
      </p>
      <MoreLink slug={service.slug} dark />
    </Link>
  );
}

export function ServicesGrid() {
  const depannage = getService("depannage-urgence")!;
  const electricite = getService("electricite")!;
  const salleDeBain = getService("salle-de-bain")!;
  const cuisine = getService("cuisine")!;
  const plomberie = getService("plomberie")!;
  const renovation = getService("renovation-interieure")!;

  return (
    <section id="services" className="bg-cream">
      <Container className="py-24 sm:py-28">
        <Reveal className="mb-14 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-copper">
            Nos expertises
          </span>
          <h2 className="mt-4 text-3xl font-bold text-anthracite sm:text-4xl">
            L'électricité de A à Z, urgence comprise
          </h2>
          <p className="mt-4 text-lg text-muted">
            Le dépannage d'urgence 24h/24 est notre cœur de métier. Nous
            assurons aussi l'installation, la mise aux normes et les travaux qui
            en découlent, avec un seul interlocuteur.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
          {/* Le dépannage d'urgence occupe la place dominante. */}
          <Reveal className="sm:col-span-2 lg:col-span-8">
            <LargeCard service={depannage} />
          </Reveal>
          <Reveal delay={0.05} className="sm:col-span-2 lg:col-span-4">
            <DarkCard service={electricite} />
          </Reveal>

          <Reveal delay={0.05} className="lg:col-span-3">
            <Card service={renovation} />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-3">
            <Card service={salleDeBain} />
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-3">
            <Card service={cuisine} />
          </Reveal>
          <Reveal delay={0.2} className="lg:col-span-3">
            <Card service={plomberie} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
