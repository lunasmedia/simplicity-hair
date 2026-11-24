import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { Gallery } from "@/components/Gallery";
import { influencers, influencerCategories } from "@/data/influencers";

export const metadata: Metadata = { title: "Touched" };

export default function InfluencersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Influencers"
        title={<>Touched by <em className="font-normal">Simplicity.</em></>}
        intro="Creators and tastemakers wearing our custom units and styling — every look made to reflect the person wearing it."
      />
      <Gallery items={influencers} categories={influencerCategories} />
    </>
  );
}
