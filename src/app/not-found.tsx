import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="display mt-4 text-6xl">This page has moved on.</h1>
      <p className="mt-4 text-ink-soft">Let&apos;s get you back to something beautiful.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn-primary">Home</Link>
        <Link href="/shop" className="btn-outline">Shop</Link>
      </div>
    </section>
  );
}
