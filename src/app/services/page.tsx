import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui";
import { ServicesList } from "./ServicesList";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services & pricing"
        title={<>Transparent pricing, <em className="font-normal">no surprises.</em></>}
        intro="Cuts, colour, treatments and wig services. All appointments include a consultation."
      />
      <ServicesList />
      <section className="container-x mt-8">
        <div className="flex flex-col items-start justify-between gap-6 border border-line bg-sand/50 p-8 sm:flex-row sm:items-center sm:p-12">
          <div>
            <h2 className="display text-3xl">Not sure what to book?</h2>
            <p className="mt-2 text-ink-soft">Start with a consultation — we&apos;ll build a plan together.</p>
          </div>
          <Link href="/booking?service=custom-unit-consultation" className="btn-primary">
            Book a consultation
          </Link>
        </div>
      </section>
    </>
  );
}
