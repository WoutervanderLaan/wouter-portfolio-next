import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/organisms/footer/footer";
import Navbar from "@/components/organisms/navbar/navbar";
// import { ThemeProviderWrapper } from "@/components/molecules/theme-provider-wrapper/theme-provider-wrapper";
import { Organization, WithContext } from "schema-dts";
// import ThemeToggleButton from "@/components/organisms/theme-toggle-button/theme-toggle-button";
import Script from "next/script";

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

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-NXGRPWEN5C"
        />

        <Script id="analytics">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-NXGRPWEN5C');`}
        </Script>
      </head>
      <body className={`${montserrat.variable}`}>
        {/* <ThemeProviderWrapper> */}
        <div className="container flex min-h-screen flex-col">
          <div className="flex flex-col justify-between py-4 sm:flex-row md:py-10">
            <Navbar />
            {/* <ThemeToggleButton className="hidden sm:flex" /> */}
          </div>
          {children}
          <Footer />
        </div>
        {/* </ThemeProviderWrapper> */}
      </body>
    </html>
  );
}
