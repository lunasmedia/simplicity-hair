import Link from "next/link";
import { asset } from "@/lib/format";

export function Logo({ light = false, onClick }: { light?: boolean; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Simplicity Hair & Beauty — home"
      className={`group inline-flex items-center gap-2.5 sm:gap-3 ${light ? "text-ivory" : "text-ink"}`}
    >
      {/* SH monogram (decorative — the link's aria-label names it) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset("/images/logo-mark.webp")}
        alt=""
        width={62}
        height={40}
        className="h-8 w-auto shrink-0 sm:h-10"
      />
      <span className="flex flex-col items-start leading-none">
        <span className="font-display text-[1.35rem] font-medium tracking-[0.2em] sm:text-[1.6rem] sm:tracking-[0.22em]">
          SIMPLICITY
        </span>
        <span
          className={`mt-1 text-[0.5rem] font-medium tracking-[0.38em] sm:text-[0.58rem] sm:tracking-[0.42em] ${
            light ? "text-ivory/70" : "text-muted"
          }`}
        >
          HAIR &amp; BEAUTY
        </span>
      </span>
    </Link>
  );
}
