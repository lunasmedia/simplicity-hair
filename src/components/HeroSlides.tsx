"use client";

import { useEffect, useState } from "react";

const INTERVAL_MS = 5000;
const SLIDE_MS = 700;

/**
 * How a hero photo is drawn (shared with the server-rendered first slide in page.tsx):
 * - Phones / tablets: fills the hero, anchored to the top so heads stay in frame.
 * - Large screens (lg+): "scaled out" — the whole photo is shown with headroom above,
 *   and a soft blurred copy of the same photo fills the space around it.
 */
export const HERO_FG =
  "h-full w-full object-cover object-top lg:object-contain lg:object-bottom lg:pt-[7vh]";
export const HERO_BG = "hidden h-full w-full scale-110 object-cover blur-2xl brightness-90 lg:block";

/**
 * Hero slideshow with a "push" transition: each new photo slides in from the
 * right and pushes the current one out to the left, then loops.
 *
 * The first photo is already in the page's own <picture> (so it shows instantly,
 * before any JavaScript runs). This sliding strip is laid over it only when
 * `query` matches the screen, so other screen sizes never download these photos.
 *
 * To loop seamlessly, a copy of the first photo sits at the end of the strip:
 * we push onto that copy, then jump back to the real first photo with no animation.
 */
export function HeroSlides({
  query,
  first,
  slides,
  label,
}: {
  query: string;
  first: string;
  slides: string[];
  label: string;
}) {
  const photos = [first, ...slides];
  const total = photos.length;
  const strip = [...photos, first]; // trailing copy for the seamless loop

  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  // Advance every few seconds. Keyed on `pos`, so tapping a dot restarts the timer.
  useEffect(() => {
    if (!enabled || total < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => {
      setAnimate(true);
      setPos((p) => p + 1);
    }, INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [enabled, pos, total]);

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

  if (!enabled || total < 2) return null;

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
            <div key={`${src}-${i}`} className="relative h-full w-full shrink-0 overflow-hidden bg-sand lg:bg-night">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" decoding="async" className={`absolute inset-0 ${HERO_BG}`} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" decoding="async" className={`relative ${HERO_FG}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center gap-2" role="group" aria-label={label}>
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
                active === i ? "w-5 bg-ivory" : "w-1.5 bg-ivory/50"
              }`}
            />
          </button>
        ))}
      </div>
    </>
  );
}
