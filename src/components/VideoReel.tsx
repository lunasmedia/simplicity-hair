"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Clip } from "@/data/videos";

/**
 * A horizontal row of portrait videos that play one after another.
 * - Only the active clip plays; when it ends, the next one starts (then loops).
 * - Playback only runs while the section is on screen.
 * - Clips are muted (browsers only allow muted autoplay) and only the active
 *   one is preloaded, so visitors don't download every video up front.
 * - On phones the row scrolls sideways and follows the playing clip.
 */
export function VideoReel({ clips }: { clips: Clip[] }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(false);
  const [near, setNear] = useState(false); // section is close to the screen: OK to start loading
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLUListElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Respect "reduce motion": start paused, visitor can press play.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPaused(true);
  }, []);

  // Only play while the section is visible.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    // Start loading the first clip a little before the section scrolls into view.
    const pre = new IntersectionObserver(([entry]) => entry.isIntersecting && setNear(true), { rootMargin: "600px 0px" });
    io.observe(el);
    pre.observe(el);
    return () => {
      io.disconnect();
      pre.disconnect();
    };
  }, []);

  // Play the active clip, pause the rest.
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active && inView && !paused) {
        v.play().catch(() => {
          /* autoplay blocked (e.g. low-power mode) — poster stays visible */
        });
      } else {
        v.pause();
      }
    });
  }, [active, inView, paused]);

  // On narrow screens, keep the playing clip in view inside the row
  // (scrolls the row sideways only, never the page).
  useEffect(() => {
    const row = rowRef.current;
    const tile = row?.children[active] as HTMLElement | undefined;
    if (!row || !tile || !inView || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: tile.offsetLeft - row.offsetLeft - 20, behavior: "smooth" });
  }, [active, inView]);

  const goTo = useCallback((i: number) => {
    const v = videoRefs.current[i];
    if (v) v.currentTime = 0;
    setProgress(0);
    setActive(i);
  }, []);

  const onEnded = (i: number) => {
    if (i !== active) return;
    goTo((i + 1) % clips.length);
  };

  return (
    <div ref={sectionRef}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-muted" aria-live="polite">
          Clip {active + 1} of {clips.length}
        </p>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="inline-flex items-center gap-2 border border-line px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition hover:border-ink"
          aria-pressed={paused}
        >
          {paused ? (
            <svg aria-hidden width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4v16l13-8z" /></svg>
          ) : (
            <svg aria-hidden width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>
          )}
          {paused ? "Play" : "Pause"}
        </button>
      </div>

      <ul
        ref={rowRef}
        className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-4 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {clips.map((clip, i) => {
          const isActive = i === active;
          return (
            <li key={clip.src} className="w-[62%] shrink-0 snap-center sm:w-[38%] lg:w-auto">
              <button
                type="button"
                onClick={() => {
                  goTo(i);
                  setPaused(false);
                }}
                aria-label={`Play ${clip.label}`}
                aria-current={isActive ? "true" : undefined}
                className={`group relative block w-full overflow-hidden bg-night transition duration-500 ${
                  isActive ? "opacity-100" : "opacity-55 hover:opacity-85"
                }`}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  src={clip.src}
                  poster={clip.poster}
                  muted
                  playsInline
                  preload={isActive && near ? "auto" : "none"}
                  onEnded={() => onEnded(i)}
                  onTimeUpdate={(e) => {
                    if (!isActive) return;
                    const v = e.currentTarget;
                    if (v.duration) setProgress(v.currentTime / v.duration);
                  }}
                  controlsList="nodownload noplaybackrate"
                  disablePictureInPicture
                  disableRemotePlayback
                  className="aspect-[9/16] w-full object-cover"
                />
                {/* Progress bar on the playing clip */}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-ivory/25" aria-hidden>
                  <span
                    className="block h-full origin-left bg-ivory"
                    style={{ transform: `scaleX(${isActive ? progress : 0})` }}
                  />
                </span>
                {!isActive && (
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/85 text-night opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4v16l13-8z" /></svg>
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
