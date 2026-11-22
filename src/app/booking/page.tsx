import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui";
import { BookingFlow } from "./BookingFlow";

export const metadata: Metadata = { title: "Booking" };

export default function BookingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Booking"
        title={<>Book your <em className="font-normal">appointment.</em></>}
        intro="Wig installs, consultations and salon services. Choose a service, pick a time and you're done."
      />
      <Suspense fallback={<div className="container-x py-20 text-muted">Loading…</div>}>
        <BookingFlow />
      </Suspense>
    </>
  );
}
