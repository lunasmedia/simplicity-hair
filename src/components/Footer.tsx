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
      { href: "/influencers", label: "Influencers" },
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
    <footer className="mt-24 border-t border-line bg-night text-ivory">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/60">
            Simplicity Hair &amp; Beauty — custom wigs, installs and styling from our London studio. UK
            delivery on all units.
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <h2 className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-ivory/50">{col.title}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ivory/85 transition hover:text-ivory">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h2 className="text-[0.7rem] font-medium uppercase tracking-[0.28em] text-ivory/50">Follow</h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href={site.instagram} target="_blank" rel="noreferrer" className="text-ivory/85 transition hover:text-ivory">
                Instagram <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="container-x flex flex-col items-start justify-between gap-3 py-6 text-xs text-ivory/50 sm:flex-row sm:items-center">
          <p>© 2026 Simplicity Hair</p>
          <p>London, UK · Tracked UK delivery</p>
        </div>
      </div>
    </footer>
  );
}
