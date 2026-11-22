import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { PortfolioGallery } from "./PortfolioGallery";

export const metadata: Metadata = { title: "Portfolio" };

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title={<>Recent work, <em className="font-normal">from our chair.</em></>}
        intro="Wig installs, custom units, styling and colour — every look made to reflect the person wearing it."
      />
      <PortfolioGallery />
    </>
  );
}
