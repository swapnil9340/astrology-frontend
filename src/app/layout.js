import "./globals.css";
import StarfieldBackground from "@/components/StarfieldBackground";
import ThemeRegistry from "@/components/ThemeRegistry";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { SITE_URL, SITE_NAME, SITE_DESC, SITE_KEYWORDS } from "@/lib/site";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "AstroVedji — Free Kundli, Horoscope & Talk to Astrologers",
  description: SITE_DESC,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": `${SITE_URL}/feed.xml` },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "AstroVedji — Free Kundli, Horoscope & Talk to Astrologers",
    description: SITE_DESC,
  },
  twitter: {
    card: "summary_large_image",
    title: "AstroVedji — Free Kundli, Horoscope & Astrologers",
    description: SITE_DESC,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* astro_swap brand fonts are self-hosted via @font-face in globals.css
            (files in /public/fonts/astro_swap) — no external font fetch needed. */}
      </head>
      <body>
        <ThemeRegistry>
          <LanguageProvider>
            <AuthProvider>
              <StarfieldBackground />
              <div className="relative z-[1]">
                <Header />
                <main>{children}</main>
                <Footer />
              </div>
            </AuthProvider>
          </LanguageProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
