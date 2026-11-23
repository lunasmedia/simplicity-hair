"use client";

import { useEffect, useState } from "react";

const MOBILE_QUERY = "(max-width: 767px)";
const INTERVAL_MS = 5000;

/**
 * Phone-only hero slideshow. The first slide is the <picture> already in the
 * page (so it shows instantly, before any JavaScript runs). These extra slides
 * are layered on top and crossfade in turn. They are only added on phones,
 * so tablets and desktops never download them.
 */
export function HeroMobileSlides({ slides, first }: { slides: string[]; first: string }) {
  const [isMobile, setIsMobile] = useState(false);
  const [index, setIndex] = useState(0); // 0 = the base <picture> slide
  const total = slides.length + 1;

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // A timeout keyed on the index restarts the timer whenever a dot is tapped.
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % total), INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [isMobile, index, total]);

  if (!isMobile) return null;

  return (
    <>
      {slides.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden
          decoding="async"
          className={`absolute inset-0 -z-10 h-full w-full object-cover object-top transition-opacity duration-1000 ease-in-out ${
            index === i + 1 ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center gap-2" role="group" aria-label="Hero photos">
        {[first, ...slides].map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show photo ${i + 1} of ${total}`}
            aria-current={index === i ? "true" : undefined}
            className="p-1.5"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                index === i ? "w-5 bg-cream" : "w-1.5 bg-cream/50"
              }`}
            />
          </button>
        ))}
      </div>
    </>
  );
}
