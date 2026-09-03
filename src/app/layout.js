import "./globals.css";
import StarfieldBackground from "@/components/StarfieldBackground";
import ThemeRegistry from "@/components/ThemeRegistry";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { SITE_URL, SITE_NAME, SITE_DESC } from "@/lib/site";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "AstroVeda — Free Kundli, Horoscope & Talk to Astrologers",
  description: SITE_DESC,
  applicationName: SITE_NAME,
  keywords: [
    // English — high-volume
    "free kundli", "online kundli", "janam kundli", "birth chart", "online astrology",
    "daily horoscope", "today horoscope", "horoscope 2026", "zodiac signs", "moon sign",
    "kundli matching", "horoscope matching", "guna milan", "mangal dosha", "marriage prediction",
    "panchang", "aaj ka panchang", "rahu kaal", "shubh muhurat", "numerology",
    "tarot reading", "palmistry", "lal kitab", "gemstones", "talk to astrologer",
    "online astrologer", "best astrologer", "love horoscope", "career horoscope",
    // Hindi — high-volume
    "फ्री कुंडली", "जन्म कुंडली", "कुंडली मिलान", "गुण मिलान", "मंगल दोष",
    "राशिफल", "आज का राशिफल", "दैनिक राशिफल", "राशिफल 2026", "पंचांग",
    "आज का पंचांग", "राहु काल", "शुभ मुहूर्त", "अंक ज्योतिष", "ज्योतिषी से बात करें",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "AstroVeda — Free Kundli, Horoscope & Talk to Astrologers",
    description: SITE_DESC,
  },
  twitter: {
    card: "summary_large_image",
    title: "AstroVeda — Free Kundli, Horoscope & Astrologers",
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
