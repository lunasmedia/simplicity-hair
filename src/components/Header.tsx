"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/data/site";
import { useCart } from "@/lib/cart";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const { count, open } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled ? "border-line bg-cream/90 backdrop-blur-md" : "border-transparent bg-cream"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-9">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative py-2 text-[0.78rem] font-medium uppercase tracking-[0.2em] transition-colors hover:text-ink ${
                    isActive(item.href) ? "text-ink" : "text-ink-soft"
                  } after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-ink after:transition-transform ${
                    isActive(item.href) ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={open}
            aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
            className="group flex items-center gap-2 px-2 py-2 text-[0.78rem] font-medium uppercase tracking-[0.2em]"
          >
            <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M5 8h14l-1.2 12H6.2L5 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            <span className="hidden sm:inline">Cart</span>
            <span
              className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1.5 text-[0.65rem] tracking-normal text-cream"
              aria-hidden
            >
              {count}
            </span>
          </button>

          <button
            type="button"
            className="-mr-2 p-2 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              {menuOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto bg-cream md:hidden"
      >
        <nav aria-label="Mobile" className="container-x py-10">
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.href} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex items-baseline justify-between border-b border-line py-5 font-display text-4xl"
                >
                  {item.label}
                  <span aria-hidden className="text-sm text-muted">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/booking" className="btn-primary mt-10 w-full">
            Book an appointment
          </Link>
        </nav>
      </div>
    </header>
  );
}
