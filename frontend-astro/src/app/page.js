import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import ZodiacGrid from "@/components/ZodiacGrid";
import Astrologers from "@/components/Astrologers";
import Panchang from "@/components/Panchang";
import CtaBanner from "@/components/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <ZodiacGrid />
      <Astrologers />
      <Panchang />
      <CtaBanner />
    </>
  );
}
