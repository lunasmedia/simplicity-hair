"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { portfolio, portfolioCategories, type PortfolioCategory } from "@/data/portfolio";
import { SmartImage } from "@/components/SmartImage";
import { Chip } from "@/components/ui";
import { site } from "@/data/site";

export function PortfolioGallery() {
  const [cat, setCat] = useState<PortfolioCategory | "All">("All");
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const list = cat === "All" ? portfolio : portfolio.filter((p) => p.category === cat);

  useEffect(() => {
    if (open === null) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % list.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + list.length) % list.length));
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, list.length]);

  const current = open !== null ? list[open] : null;

  return (
    <section className="container-x py-14">
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter portfolio">
        {(["All", ...portfolioCategories] as const).map((c) => (
          <Chip key={c} active={cat === c} onClick={() => setCat(c)}>
            {c}
          </Chip>
        ))}
      </div>

      <ul className="columns-2 gap-4 md:columns-3 [&>li]:mb-4">
        {list.map((item, i) => (
          <li key={item.id} className="break-inside-avoid">
            <button type="button" onClick={() => setOpen(i)} className="group relative block w-full overflow-hidden text-left" aria-label={`View ${item.title}`}>
              <SmartImage
                src={item.image}
                alt={item.caption}
                className={`w-full object-top transition-transform duration-700 group-hover:scale-[1.03] ${i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"}`}
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="block text-[0.62rem] uppercase tracking-[0.2em] text-cream/75">{item.category}</span>
                <span className="block font-display text-xl text-cream">{item.title}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-16 flex flex-col items-center gap-4 text-center">
        <p className="font-display text-3xl">See more on Instagram</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={site.instagram} target="_blank" rel="noreferrer" className="btn-outline">
            {site.instagramHandle}
          </a>
          <Link href="/booking" className="btn-primary">
            Book your look
          </Link>
        </div>
      </div>

      {current && (
        <div role="dialog" aria-modal="true" aria-label={current.title} className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 animate-fade-up">
          <button type="button" className="absolute inset-0 cursor-default" aria-hidden tabIndex={-1} onClick={() => setOpen(null)} />
          <figure className="relative z-10 max-h-full w-full max-w-3xl">
            <SmartImage src={current.image} alt={current.caption} eager className="max-h-[78vh] w-full object-contain" />
            <figcaption className="mt-4 flex items-baseline justify-between gap-4 text-cream">
              <span>
                <span className="block text-[0.62rem] uppercase tracking-[0.2em] text-cream/60">{current.category}</span>
                <span className="font-display text-2xl">{current.title}</span>
              </span>
              <span className="text-sm text-cream/70">{current.caption}</span>
            </figcaption>
          </figure>
          <button ref={closeRef} type="button" onClick={() => setOpen(null)} aria-label="Close" className="absolute right-4 top-4 z-10 p-2 text-cream">
            <svg aria-hidden width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
          <button type="button" onClick={() => setOpen((i) => ((i ?? 0) - 1 + list.length) % list.length)} aria-label="Previous image" className="absolute left-2 top-1/2 z-10 -translate-y-1/2 p-3 text-3xl text-cream/80 hover:text-cream">‹</button>
          <button type="button" onClick={() => setOpen((i) => ((i ?? 0) + 1) % list.length)} aria-label="Next image" className="absolute right-2 top-1/2 z-10 -translate-y-1/2 p-3 text-3xl text-cream/80 hover:text-cream">›</button>
        </div>
      )}
    </section>
  );
}
