import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { Checkout } from "./Checkout";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <>
      <PageHeader eyebrow="Checkout" title={<>Complete your <em className="font-normal">order.</em></>} />
      <Checkout />
    </>
  );
}
