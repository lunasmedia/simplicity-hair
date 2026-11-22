import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { ShopCatalog } from "./ShopCatalog";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shop"
        title={<>Custom wigs &amp; <em className="font-normal">hair units.</em></>}
        intro={site.delivery}
      />
      <ShopCatalog />
    </>
  );
}
