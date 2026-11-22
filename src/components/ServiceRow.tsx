import Link from "next/link";
import type { Service } from "@/data/services";
import { duration, gbp } from "@/lib/format";

export function ServiceRow({ service }: { service: Service }) {
  return (
    <li className="grid grid-cols-[1fr_auto] items-start gap-x-6 gap-y-3 border-b border-line py-7 sm:grid-cols-[1fr_auto_auto] sm:items-center">
      <div>
        <h3 className="font-display text-2xl">{service.name}</h3>
        <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-soft">{service.description}</p>
        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted">{duration(service.duration)}</p>
      </div>
      <p className="text-right font-display text-2xl">
        {service.from && <span className="mr-1 font-sans text-xs uppercase tracking-[0.16em] text-muted">From</span>}
        {gbp(service.price)}
      </p>
      <Link
        href={`/booking?service=${service.id}`}
        className="btn-outline col-span-2 px-5 py-2.5 sm:col-span-1"
        aria-label={`Book ${service.name}`}
      >
        Book
      </Link>
    </li>
  );
}
