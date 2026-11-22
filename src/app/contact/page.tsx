import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { site } from "@/data/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={<>Say <em className="font-normal">hello.</em></>}
        intro="Questions about a custom unit, a service or an order? Send us a message and we'll reply within one working day."
      />
      <section className="container-x grid gap-14 py-16 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-10">
          <div>
            <h2 className="eyebrow mb-3">Studio</h2>
            <address className="font-display text-2xl not-italic leading-snug">
              {site.address.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </address>
            <p className="mt-2 text-sm text-muted">Exact studio address is shared on booking confirmation.</p>
          </div>
          <div>
            <h2 className="eyebrow mb-3">Get in touch</h2>
            <ul className="space-y-2 text-lg">
              <li><a href={`mailto:${site.email}`} className="link-underline">{site.email}</a></li>
              <li><a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="link-underline">{site.phone}</a></li>
              <li><a href={site.instagram} target="_blank" rel="noreferrer" className="link-underline">Instagram {site.instagramHandle}</a></li>
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-3">Hours</h2>
            <dl className="max-w-sm divide-y divide-line border-y border-line text-sm">
              {site.hours.map((h) => (
                <div key={h.day} className="flex justify-between py-3">
                  <dt>{h.day}</dt>
                  <dd className={h.time === "Closed" ? "text-muted" : ""}>{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
