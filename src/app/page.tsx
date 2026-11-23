import Link from "next/link";
import { site } from "@/data/site";
import { images } from "@/data/images";
import { portfolio } from "@/data/portfolio";
import { SmartImage } from "@/components/SmartImage";
import { HeroSlides, HERO_FG } from "@/components/HeroSlides";
import { SectionHeading } from "@/components/ui";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { SignatureServices } from "@/components/SignatureServices";
import { VideoReel } from "@/components/VideoReel";
import { clips } from "@/data/videos";

export default function Home() {
  const recent = portfolio.slice(0, 5);
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        {/* First hero photo, rendered on the server so it shows instantly.
            Phones get the portrait photo, larger screens the group photo. */}
        <picture>
          <source media="(max-width: 767px)" srcSet={images.heroMobile} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images.hero}
            alt="Simplicity clients wearing custom short units in the studio"
            fetchPriority="high"
            className={`absolute inset-0 -z-10 bg-sand ${HERO_FG}`}
          />
        </picture>
        {/* The rest of each slideshow, added only on the matching screen size */}
        <HeroSlides query="(max-width: 767px)" first={images.heroMobile} slides={images.heroMobileSlides} label="Hero photos" />
        <HeroSlides query="(min-width: 768px)" first={images.hero} slides={images.heroSlides} label="Hero photos" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night/80 via-night/35 to-night/10" />
        <div className="container-x flex min-h-[calc(100svh-5rem)] flex-col justify-end pb-16 pt-32 sm:pb-24">
          <p className="eyebrow mb-6 animate-fade-up text-ivory/80">London Hair Studio · UK Delivery</p>
          <h1
            className="display max-w-4xl animate-fade-up text-6xl text-ivory sm:text-7xl lg:text-8xl"
            style={{ animationDelay: "80ms" }}
          >
            Hair, Made to <em className="font-normal">Reflect You.</em>
          </h1>
          <p
            className="mt-7 max-w-xl animate-fade-up text-lg leading-relaxed text-ivory/85"
            style={{ animationDelay: "160ms" }}
          >
            {site.mission}
          </p>
          <div className="mt-10 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "240ms" }}>
            <Link href="/booking" className="btn bg-ivory text-night hover:bg-white">
              Book an appointment
            </Link>
            <Link href="/shop" className="btn-light">
              Shop products
            </Link>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="container-x py-24 sm:py-32">
        <SectionHeading
          eyebrow="Take it home"
          title={<>The products from your chair, <em className="font-normal">available anytime.</em></>}
          intro="Custom units constructed by hand in our studio and delivered across the UK."
          action={{ href: "/shop", label: "Shop all" }}
        />
        <FeaturedProducts />
      </section>

      {/* Studio statement */}
      <section className="bg-sand/70">
        <div className="container-x grid items-center gap-12 py-24 md:grid-cols-2 md:gap-20">
          <SmartImage src={images.studio} alt="Client in profile showing a sleek side-part pixie with laid edges" className="aspect-[4/5] w-full object-top" />
          <div>
            <p className="eyebrow mb-5">The studio</p>
            <h2 className="display text-4xl sm:text-5xl">
              Unhurried appointments. <em className="font-normal">Honest pricing.</em>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink-soft">
              Every visit begins with a consultation, so we understand your hair, your lifestyle and the
              look you want to leave with. From a precision cut to a fully customised unit, we take the time
              to get it right.
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8">
              {[
                ["Custom", "units, made to measure"],
                ["UK", "tracked delivery"],
                ["1:1", "consultation every visit"],
              ].map(([a, b]) => (
                <div key={a}>
                  <dt className="font-display text-3xl">{a}</dt>
                  <dd className="mt-1 text-xs leading-snug text-muted">{b}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container-x py-24 sm:py-32">
        <SectionHeading
          eyebrow="Signature services"
          title={<>Cut, colour &amp; care — <em className="font-normal">transparent pricing.</em></>}
          intro="All appointments include a consultation."
          action={{ href: "/services", label: "All services" }}
        />
        <SignatureServices />
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/booking" className="btn-primary">
            Book an appointment
          </Link>
          <Link href="/services" className="btn-outline">
            View price list
          </Link>
        </div>
      </section>

      {/* Portfolio preview */}
      <section className="border-t border-line py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="Recent work"
            title={<>From the chair, <em className="font-normal">this week.</em></>}
            action={{ href: "/portfolio", label: "View full portfolio" }}
          />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-4">
            {recent.map((item, i) => (
              <Link
                key={item.id}
                href="/portfolio"
                className={`group relative overflow-hidden ${i === 0 ? "col-span-2 row-span-2" : ""}`}
              >
                <SmartImage
                  src={item.image}
                  alt={item.caption}
                  className={`w-full object-top transition-transform duration-700 group-hover:scale-[1.04] ${
                    i === 0 ? "aspect-square h-full" : "aspect-square"
                  }`}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-ivory/75">{item.category}</p>
                  <p className="font-display text-xl text-ivory">{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/portfolio" className="btn-outline">
              View full portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Video reel */}
      <section className="border-t border-line py-24 sm:py-32" aria-labelledby="reel-heading">
        <div className="container-x">
          <div className="mb-10 max-w-2xl md:mb-12">
            <p className="eyebrow mb-4">In motion</p>
            <h2 id="reel-heading" className="display text-4xl sm:text-5xl">
              Watch the work, <em className="font-normal">start to finish.</em>
            </h2>
          </div>
          <VideoReel clips={clips} />
        </div>
      </section>

      {/* CTA band */}
      <section className="container-x">
        <div className="relative isolate overflow-hidden bg-night px-8 py-20 text-center text-ivory sm:px-16">
          <SmartImage src={images.studio2} alt="" className="absolute inset-0 -z-10 h-full w-full opacity-25" />
          <p className="eyebrow mb-5 text-ivory/70">Ready when you are</p>
          <h2 className="display mx-auto max-w-2xl text-4xl sm:text-6xl">Your chair is waiting.</h2>
          <p className="mx-auto mt-5 max-w-md text-ivory/75">Book online in under a minute — choose your service, pick a time, done.</p>
          <Link href="/booking" className="btn mt-9 bg-ivory text-night hover:bg-white">
            Book an appointment
          </Link>
        </div>
      </section>
    </>
  );
}
