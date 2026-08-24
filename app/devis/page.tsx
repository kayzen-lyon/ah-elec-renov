import type { Metadata } from "next";
import { Phone, ReceiptText, ShieldCheck, Clock, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/shared/PageHero";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Reveal } from "@/components/shared/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { InterventionForm } from "@/components/urgence/InterventionForm";
import { company } from "@/content/company";
import { promesse } from "@/content/urgence";

export const metadata: Metadata = {
  title: "Devis gratuit — électricien Paris & Île-de-France",
  description: `Demandez un devis gratuit à ${company.brandName}. Dépannage électrique, mise aux normes NF C 15-100, installation. Paris et région parisienne, ${promesse.disponibilite}.`,
  alternates: { canonical: "/devis" },
};

const breadcrumbItems = [
  { name: "Accueil", path: "/" },
  { name: "Devis gratuit", path: "/devis" },
];

const reassuranceSidebar = [
  {
    icon: ReceiptText,
    title: "Devis 100 % gratuit",
    text: "Aucuns frais pour le diagnostic ni pour l'établissement du devis, déplacement compris.",
  },
  {
    icon: Clock,
    title: `Rappel sous ${promesse.rappel}`,
    text: `Votre demande est traitée dès réception, ${promesse.disponibilite}.`,
  },
  {
    icon: ShieldCheck,
    title: "Électriciens assurés",
    text: "Interventions garanties, conformes NF C 15-100, couvertes par notre assurance professionnelle.",
  },
  {
    icon: MapPin,
    title: promesse.zoneCourte,
    text: "Paris intra-muros, petite et grande couronne — 75, 77, 78, 91, 92, 93, 94 et 95.",
  },
];

export default function DevisPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />

      <PageHero
        eyebrow="Devis gratuit"
        title="Demandez votre devis gratuit"
        intro={`Une seule demande, quel que soit votre besoin électrique. Urgence ou travaux planifiés : nous vous rappelons sous ${promesse.rappel}.`}
      />

      <Breadcrumbs items={breadcrumbItems} />

      <section className="bg-cream-200">
        <Container className="py-16 sm:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px] lg:gap-16 xl:grid-cols-[1fr_380px]">
            {/* Colonne principale — le formulaire centralisé */}
            <Reveal>
              <div className="rounded-2xl border border-line bg-white px-6 py-8 shadow-soft sm:px-8 sm:py-10">
                <div className="mb-8 border-b border-line pb-6">
                  <h2 className="text-xl font-bold text-anthracite sm:text-2xl">
                    Votre demande en quelques lignes
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Indiquez le degré d'urgence : c'est lui qui détermine notre
                    engagement de délai. Plus la description est précise, plus le
                    devis sera fidèle à la réalité.
                  </p>
                </div>
                <InterventionForm
                  tone="light"
                  submitLabel="Envoyer ma demande de devis"
                />
              </div>
            </Reveal>

            {/* Colonne latérale — réassurance */}
            <aside aria-label={`Pourquoi choisir ${company.brandName}`}>
              <div className="sticky top-8 space-y-5">
                {/* Appel direct */}
                <Reveal className="rounded-2xl border border-line bg-anthracite px-5 py-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-copper-300">
                    Une urgence ? Ne remplissez rien.
                  </p>
                  <p className="mt-2 text-base font-bold text-cream">
                    Appelez directement
                  </p>
                  <p className="mt-1 text-sm text-cream/70">{company.hours}</p>
                  <div className="mt-5 flex flex-col gap-3">
                    <ButtonLink
                      href={company.contact.phoneHref}
                      variant="copper"
                      size="md"
                      className="justify-center"
                    >
                      <Phone className="h-4 w-4" aria-hidden />
                      {company.contact.phone}
                    </ButtonLink>
                    <ButtonLink
                      href={company.contact.phoneFixedHref}
                      variant="outline-light"
                      size="md"
                      className="justify-center"
                    >
                      <Phone className="h-4 w-4" aria-hidden />
                      {company.contact.phoneFixed}
                    </ButtonLink>
                  </div>
                </Reveal>

                {/* Points de réassurance */}
                <ul role="list" className="space-y-4">
                  {reassuranceSidebar.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <Reveal key={item.title} as="li" delay={i * 0.05}>
                        <div className="flex items-start gap-4 rounded-2xl border border-line bg-white px-5 py-4 shadow-soft">
                          <span
                            className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-copper/10 text-copper"
                            aria-hidden
                          >
                            <Icon className="h-4 w-4" strokeWidth={1.8} />
                          </span>
                          <div>
                            <p className="text-sm font-bold text-anthracite">
                              {item.title}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-muted">
                              {item.text}
                            </p>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
