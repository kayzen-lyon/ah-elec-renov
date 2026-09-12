import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MobileFAB } from "@/components/site/MobileFAB";
import { CookieBanner } from "@/components/legal/CookieBanner";
import { MotionProvider } from "@/components/shared/MotionProvider";
import { company } from "@/content/company";
import { promesse } from "@/content/urgence";
import { qrSvg } from "@/lib/qr";
import { mapsUrl } from "@/content/company";
import type { ContactQR } from "@/components/contact/ContactCard";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahelecrenov.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.brandName} — Dépannage électrique 24h/24 à Paris & Île-de-France`,
    template: `%s | ${company.brandName}`,
  },
  description: `Électricien d'urgence à Paris et en région parisienne. Intervention en ${promesse.delai}, ${promesse.disponibilite}. Panne de courant, disjoncteur, court-circuit, tableau électrique. Devis gratuit avant intervention.`,
  keywords: [
    "électricien urgence Paris",
    "dépannage électrique Île-de-France",
    "panne de courant Paris",
    "électricien 24h/24 Paris",
    "mise aux normes NF C 15-100",
    "dépannage tableau électrique",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: company.brandName,
    title: `${company.brandName} — Dépannage électrique en ${promesse.delai}`,
    description: `Un seul numéro pour toutes vos urgences électriques. ${promesse.zoneLongue}, ${promesse.disponibilite}.`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.brandName} — Dépannage électrique en ${promesse.delai}`,
    description: `Un seul numéro pour toutes vos urgences électriques. ${promesse.zoneLongue}, ${promesse.disponibilite}.`,
  },
  robots: { index: true, follow: true },
};

async function buildContactQR(): Promise<ContactQR> {
  const [site, maps, avis] = await Promise.all([
    qrSvg(siteUrl),
    qrSvg(mapsUrl),
    company.social.googleReviewUrl
      ? qrSvg(company.social.googleReviewUrl)
      : Promise.resolve(null),
  ]);
  return { site, maps, avis };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const qr = await buildContactQR();

  return (
    <html lang="fr" className={`${bricolage.variable} ${inter.variable}`}>
      <body>
        <MotionProvider>
          <a
            href="#contenu"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-anthracite focus:px-4 focus:py-2 focus:text-cream"
          >
            Aller au contenu
          </a>
          <Header qr={qr} />
          <main id="contenu">{children}</main>
          <Footer />
          <MobileFAB />
          <CookieBanner />
        </MotionProvider>
      </body>
    </html>
  );
}
