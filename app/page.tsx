import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { UrgenceSection } from "@/components/home/UrgenceSection";
import { WhyUs } from "@/components/home/WhyUs";
import { RealisationsPreview } from "@/components/home/RealisationsPreview";
import { Steps } from "@/components/home/Steps";
import { ZoneSection } from "@/components/home/ZoneSection";
import { CTABand } from "@/components/shared/CTABand";
import { FAQ } from "@/components/shared/FAQ";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessJsonLd, faqJsonLd } from "@/lib/structured-data";
import { faqUrgence } from "@/content/urgence";

/** Les 6 questions les plus décisives avant un appel — le reste vit sur /urgence. */
const faqHome = faqUrgence.slice(0, 6);

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={faqJsonLd([...faqHome])} />
      <Hero />
      <Stats />
      <ServicesGrid />
      <UrgenceSection />
      <WhyUs />
      <RealisationsPreview />
      <Steps />
      <ZoneSection />
      <FAQ items={[...faqHome]} />
      <CTABand />
    </>
  );
}
