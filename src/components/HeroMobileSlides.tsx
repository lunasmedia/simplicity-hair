"use client";

import { useEffect, useState } from "react";

const MOBILE_QUERY = "(max-width: 767px)";
const INTERVAL_MS = 5000;
const SLIDE_MS = 700;

/**
 * Phone-only hero slideshow with a "push" transition: each new photo slides
 * in from the right and pushes the current one out to the left.
 *
 * The first photo is also in the page's own <picture>, so it shows instantly
 * before any JavaScript runs. Once we know we're on a phone, this sliding strip
 * is laid over it. Tablets and desktops never render it or download its photos.
 *
 * To loop seamlessly, a copy of the first photo sits at the end of the strip:
 * we push onto that copy, then jump back to the real first photo with no animation.
 */
export function HeroMobileSlides({ slides, first }: { slides: string[]; first: string }) {
  const photos = [first, ...slides];
  const total = photos.length;
  const strip = [...photos, first]; // trailing copy for the seamless loop

  const [isMobile, setIsMobile] = useState(false);
  const [pos, setPos] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Advance every few seconds. Keyed on `pos`, so tapping a dot restarts the timer.
  useEffect(() => {
    if (!isMobile) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => {
      setAnimate(true);
      setPos((p) => p + 1);
    }, INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [isMobile, pos]);

  // After pushing onto the trailing copy, snap back to the real first slide.
  useEffect(() => {
    if (pos !== total) return;
    const id = window.setTimeout(() => {
      setAnimate(false);
      setPos(0);
    }, SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [pos, total]);

  // Re-enable the animation on the frame after the silent snap.
  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  if (!isMobile) return null;

  const active = pos % total;

  return (
    <>
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div
          className="flex h-full"
          style={{
            transform: `translateX(-${pos * 100}%)`,
            transition: animate ? `transform ${SLIDE_MS}ms cubic-bezier(0.65, 0, 0.35, 1)` : "none",
          }}
        >
          {strip.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${src}-${i}`}
              src={src}
              alt=""
              decoding="async"
              className="h-full w-full shrink-0 bg-sand object-cover object-top"
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center gap-2" role="group" aria-label="Hero photos">
        {photos.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => {
              setAnimate(true);
              setPos(i);
            }}
            aria-label={`Show photo ${i + 1} of ${total}`}
            aria-current={active === i ? "true" : undefined}
            className="p-1.5"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                active === i ? "w-5 bg-cream" : "w-1.5 bg-cream/50"
              }`}
            />
          </button>
        ))}
      </div>
    </>
  );
}
