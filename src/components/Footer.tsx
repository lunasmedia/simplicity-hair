import Link from "next/link";
import { site } from "@/data/site";
import { Logo } from "./Logo";

const cols = [
  {
    title: "Explore",
    links: [
      { href: "/shop", label: "Shop" },
      { href: "/services", label: "Services" },
      { href: "/portfolio", label: "Portfolio" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: "/booking", label: "Booking" },
      { href: "/contact", label: "Contact" },
      { href: "/client-agreement", label: "Client agreement" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-cream">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/60">
            Simplicity Hair &amp; Beauty — custom wigs, installs and styling from our London studio. UK
            delivery on all units.
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <h2 className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-cream/50">{col.title}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-cream/85 transition hover:text-cream">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h2 className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-cream/50">Follow</h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href={site.instagram} target="_blank" rel="noreferrer" className="text-cream/85 transition hover:text-cream">
                Instagram <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-x flex flex-col items-start justify-between gap-3 py-6 text-xs text-cream/50 sm:flex-row sm:items-center">
          <p>© 2026 Simplicity Hair</p>
          <p>London, UK · Tracked UK delivery</p>
        </div>
      </div>
    </footer>
  );
}
