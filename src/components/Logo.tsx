import Link from "next/link";

export function Logo({ light = false, onClick }: { light?: boolean; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Simplicity Hair & Beauty — home"
      className={`group inline-flex flex-col items-start leading-none ${light ? "text-cream" : "text-ink"}`}
    >
      <span className="font-display text-[1.6rem] font-medium tracking-[0.22em]">SIMPLICITY</span>
      <span className={`mt-1 text-[0.58rem] font-medium tracking-[0.42em] ${light ? "text-cream/70" : "text-muted"}`}>
        HAIR &amp; BEAUTY
      </span>
    </Link>
  );
}
