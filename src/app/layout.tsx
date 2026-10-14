import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { jost, manrope } from "./fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyWhatsApp } from "@/components/layout/StickyWhatsApp";
import { Logo } from "@/components/brand/Logo";
import { buildWhatsAppUrl, defaultGreeting } from "@/lib/whatsapp";
import { getSiteUrl, isIndexingAllowed } from "@/config/site";
import { StructuredData } from "@/components/sections/StructuredData";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: "MAPASA | Eucaliptos & Planejados",
    template: "%s | MAPASA",
  },
  description:
    "Conheça a MAPASA: eucalipto e móveis planejados com atendimento próximo, participação nas escolhas e compromisso com cada projeto.",
  applicationName: "MAPASA",
  robots: isIndexingAllowed() ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { locale: "pt_BR", siteName: "MAPASA", type: "website" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#1F4D36",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const whatsappUrl = buildWhatsAppUrl(defaultGreeting);
  return (
    <html lang="pt-BR" className={`${jost.variable} ${manrope.variable}`}>
      <body>
        <Header logo={<Logo variant="principal" heights={{ base: 36, lg: 46 }} priority />} whatsappUrl={whatsappUrl} />
        <main id="conteudo">{children}</main>
        <Footer />
        <StickyWhatsApp url={whatsappUrl} />
        <StructuredData />
      </body>
    </html>
  );
}
