import "./globals.css";
import StarfieldBackground from "@/components/StarfieldBackground";
import ThemeRegistry from "@/components/ThemeRegistry";
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
        {/* Fonts loaded at runtime (no compile-time network fetch) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeRegistry>
          <AuthProvider>
            <StarfieldBackground />
            <div className="relative z-[1]">
              <Header />
              <main>{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
