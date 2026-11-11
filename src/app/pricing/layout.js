import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/pricing",
  title: "Astrology Plans and Pricing | AstroVedji",
  description: "Compare AstroVedji free and paid plans, AI-reading limits and available subscription features before you choose.",
});

export default function PricingLayout({ children }) {
  return children;
}
