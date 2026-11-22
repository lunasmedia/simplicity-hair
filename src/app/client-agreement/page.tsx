import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Client agreement" };

const sections = [
  {
    title: "Bookings & deposits",
    body: [
      "A non-refundable deposit is required to secure every appointment. Your booking is confirmed once the deposit has been received.",
      "The deposit is deducted from the total cost of your service on the day.",
      "Please provide accurate contact details so we can confirm or update your appointment.",
    ],
  },
  {
    title: "Lateness, cancellations & rescheduling",
    body: [
      "Please arrive on time. A grace period of 15 minutes applies; after this your appointment may be shortened, incur a late fee or be cancelled with the deposit forfeited.",
      "Appointments may be rescheduled once with at least 48 hours' notice. Cancellations with less than 48 hours' notice, or no-shows, forfeit the deposit.",
      "No additional guests or children, unless agreed in advance.",
    ],
  },
  {
    title: "Arriving prepared",
    body: [
      "For wig installs, please arrive with your hair braided down or washed, as advised at booking.",
      "If you are bringing your own unit, please let us know in advance so we can allow time for customisation.",
    ],
  },
  {
    title: "Custom units & orders",
    body: [
      "Custom units are made to order using your measurements and preferences. Production typically takes 10–14 working days.",
      "Because each unit is made specifically for you, custom orders cannot be cancelled once production has started and are non-refundable, except where faulty.",
      "Any concerns about your order must be raised within 48 hours of delivery, with the unit unworn and in its original condition.",
      "All orders are dispatched with tracked UK delivery. We are not responsible for delays caused by the courier.",
    ],
  },
  {
    title: "Aftercare & satisfaction",
    body: [
      "Please follow the aftercare advice given at your appointment. Results depend on proper maintenance at home.",
      "If you are unhappy with your service, please tell us within 48 hours so we can put it right.",
    ],
  },
  {
    title: "Privacy",
    body: [
      "Your details are only used to manage your appointments and orders. Photos of your hair may be shared on our portfolio or social media only with your consent.",
    ],
  },
];

export default function ClientAgreementPage() {
  return (
    <>
      <PageHeader
        eyebrow="Studio policy"
        title={<>Client <em className="font-normal">agreement.</em></>}
        intro="By booking an appointment or placing an order with Simplicity Hair & Beauty, you agree to the following terms."
      />
      <section className="container-x grid gap-12 py-16 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Sections" className="hidden lg:block">
          <ol className="sticky top-28 space-y-3 text-sm text-muted">
            {sections.map((s, i) => (
              <li key={s.title}>
                <a href={`#s${i}`} className="hover:text-ink">{s.title}</a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-3xl space-y-14">
          {sections.map((s, i) => (
            <article key={s.title} id={`s${i}`} className="scroll-mt-28">
              <h2 className="display text-3xl sm:text-4xl">
                <span className="mr-3 font-sans text-sm text-clay">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              <ul className="mt-5 space-y-3 leading-relaxed text-ink-soft">
                {s.body.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span aria-hidden className="text-clay">—</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
          <p className="border-t border-line pt-8 text-sm text-muted">
            Questions about these terms? <a href={`mailto:${site.email}`} className="link-underline text-ink">{site.email}</a> ·{" "}
            <Link href="/booking" className="link-underline text-ink">Book an appointment</Link>
          </p>
        </div>
      </section>
    </>
  );
}
