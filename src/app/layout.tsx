import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/organisms/footer/footer";
import Navbar from "@/components/organisms/navbar/navbar";
import { Organization, WithContext } from "schema-dts";
import Script from "next/script";
import ThemeContextProvider from "@/hooks/use-theme";
import ThemeToggleButton from "@/components/organisms/theme-toggle-button/theme-toggle-button";
import { GoogleAnalytics } from "@next/third-parties/google";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const jsonLd: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Wouter van der Laan",
  image: "/share.webp",
  description: "Portfolio website of artist Wouter van der Laan",
  url: "https://www.woutervanderlaan.com",
  email: "woutervdlaan93@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jacob Oliepad 8",
    addressLocality: "Amsterdam",
    addressRegion: "Noord-Holland",
    postalCode: "1013 DP",
    addressCountry: "the Netherlands",
  },
  sameAs: ["https://www.instagram.com/wvanderlaan/"],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://wouter-portfolio-next.vercel.app"),
  title: "Wouter van der Laan",
  description: "Portfolio website of artist Wouter van der Laan",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  keywords:
    "wouter van der laan artist art rijksakademie hogeschool van de kunsten utrecht frank mohr institute gronginen hanze university drawing painting sculpting fine art installation performance textile ceramic design skowhegan school",
  openGraph: {
    title: "Wouter van der Laan - Portfolio",
    type: "website",
    description: "Portfolio website of artist Wouter van der Laan",
    images: [
      {
        url: "/share.webp",
        width: 1600,
        height: 1000,
      },
    ],
    siteName: "Wouter van der Laan",
    url: "https://www.woutervanderlaan.com",
  },
  applicationName: "Wouter van der Laan",
  appleWebApp: {
    title: "Wouter van der Laan",
    statusBarStyle: "default",
    capable: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "Wouter van der Laan",
    description: "Wouter van der Laan - Artist",
  },
  formatDetection: { telephone: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="jsonLd"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <ThemeContextProvider>
        <body className={`${montserrat.variable} bg-white dark:bg-black`}>
          <GoogleAnalytics gaId="G-NXGRPWEN5C" />

          <div className="container flex min-h-screen flex-col">
            <div className="flex flex-col justify-between py-4 sm:flex-row md:py-10">
              <Navbar />
              <ThemeToggleButton className="hidden sm:flex" />
            </div>
            {children}
            <Footer />
          </div>
        </body>
      </ThemeContextProvider>
    </html>
  );
}
