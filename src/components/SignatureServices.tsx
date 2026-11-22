"use client";

import Link from "next/link";
import { useServices } from "@/lib/storage";
import { duration, gbp } from "@/lib/format";

export function SignatureServices() {
  const list = useServices().filter((s) => s.signature);
  return (
    <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
      {list.map((s) => (
        <li key={s.id} className="flex flex-col bg-cream p-7 sm:p-9">
          <p className="eyebrow">{s.category}</p>
          <div className="mt-4 flex items-baseline justify-between gap-4">
            <h3 className="font-display text-3xl">{s.name}</h3>
            <p className="font-display text-2xl">
              {s.from && <span className="mr-1 font-sans text-xs uppercase tracking-[0.16em] text-muted">From</span>}
              {gbp(s.price)}
            </p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.description}</p>
          <div className="mt-6 flex items-center justify-between pt-2">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">{duration(s.duration)}</span>
            <Link href={`/booking?service=${s.id}`} className="link-underline text-[0.75rem] font-medium uppercase tracking-[0.2em]">
              Book →
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
