import LovePrediction from "@/components/LovePrediction";

export const metadata = {
  title: "Love Prediction — AstroVedji",
  description: "Explore relationship guidance based on your Vedic birth chart.",
  robots: { index: false, follow: false },
};

export default function LovePage() {
  return <LovePrediction />;
}
