import "./globals.css";
import StarfieldBackground from "@/components/StarfieldBackground";
import ThemeRegistry from "@/components/ThemeRegistry";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "AstroVeda — Free Kundli, Horoscope & Talk to Astrologers",
  description:
    "AstroVeda offers free Vedic Kundli, daily horoscope, kundli matching, panchang, tarot and numerology. Talk to expert astrologers online.",
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
