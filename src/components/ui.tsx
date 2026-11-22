import Link from "next/link";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h2 className="display text-4xl sm:text-5xl">{title}</h2>
        {intro && <p className="mt-4 text-base leading-relaxed text-ink-soft">{intro}</p>}
      </div>
      {action && (
        <Link href={action.href} className="link-underline shrink-0 text-[0.78rem] font-medium uppercase tracking-[0.2em]">
          {action.label} →
        </Link>
      )}
    </div>
  );
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: ReactNode; intro?: ReactNode }) {
  return (
    <section className="border-b border-line bg-sand/60">
      <div className="container-x py-16 sm:py-24">
        <p className="eyebrow mb-5 animate-fade-up">{eyebrow}</p>
        <h1 className="display max-w-4xl animate-fade-up text-5xl sm:text-7xl" style={{ animationDelay: "60ms" }}>
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-ink-soft" style={{ animationDelay: "120ms" }}>
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}

export function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`border px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.18em] transition ${
        active ? "border-ink bg-ink text-cream" : "border-line text-ink-soft hover:border-ink hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
