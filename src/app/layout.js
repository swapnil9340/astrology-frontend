import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import StarfieldBackground from "@/components/StarfieldBackground";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  title: "AstroVeda — Free Kundli, Horoscope & Talk to Astrologers",
  description:
    "AstroVeda offers free Vedic Kundli, daily horoscope, kundli matching, panchang, tarot and numerology. Talk to expert astrologers online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable}`}>
      <body>
        <StarfieldBackground />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
