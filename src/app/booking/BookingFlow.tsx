"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { serviceCategories } from "@/data/services";
import { useBookings, useServices, type Booking } from "@/lib/storage";
import { duration, formatDate, gbp, uid } from "@/lib/format";

const OPEN_DAYS: Record<number, { open: string; close: string }> = {
  2: { open: "09:30", close: "18:30" },
  3: { open: "09:30", close: "18:30" },
  4: { open: "09:30", close: "18:30" },
  5: { open: "09:30", close: "18:30" },
  6: { open: "09:00", close: "17:00" },
};

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const toTime = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const steps = ["Service", "Date & time", "Your details", "Confirmed"];

export function BookingFlow() {
  const services = useServices();
  const params = useSearchParams();
  const [bookings, setBookings] = useBookings();
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "", agree: false });
  const [confirmed, setConfirmed] = useState<Booking | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const q = params.get("service");
    if (q && services.some((s) => s.id === q)) {
      setServiceId(q);
      setStep(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const service = services.find((s) => s.id === serviceId);

  const days = useMemo(() => {
    const out: Date[] = [];
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 1);
    while (out.length < 18) {
      if (OPEN_DAYS[d.getDay()]) out.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
    return out;
  }, []);

  const slots = useMemo(() => {
    if (!date || !service) return [];
    const hours = OPEN_DAYS[new Date(date + "T00:00:00").getDay()];
    const taken = bookings
      .filter((b) => b.date === date && b.status !== "cancelled")
      .map((b) => [toMin(b.time), toMin(b.time) + b.duration] as const);
    const out: { time: string; available: boolean }[] = [];
    for (let m = toMin(hours.open); m + service.duration <= toMin(hours.close); m += 30) {
      const end = m + service.duration;
      out.push({ time: toTime(m), available: !taken.some(([s, e]) => m < e && end > s) });
    }
    return out;
  }, [date, service, bookings]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!service || !date || !time) return;
    const booking: Booking = {
      id: uid(),
      serviceId: service.id,
      serviceName: service.name,
      price: service.price,
      duration: service.duration,
      date,
      time,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      notes: form.notes.trim() || undefined,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [...prev, booking]);
    setConfirmed(booking);
    setStep(3);
  };

  const reset = () => {
    setStep(0);
    setServiceId(null);
    setDate(null);
    setTime(null);
    setForm({ name: "", email: "", phone: "", notes: "", agree: false });
    setConfirmed(null);
  };

  return (
    <section className="container-x grid gap-12 py-14 lg:grid-cols-[1fr_340px]">
      <div>
        {/* Progress */}
        <ol className="mb-12 grid grid-cols-4 gap-2" aria-label="Booking progress">
          {steps.map((s, i) => (
            <li key={s} aria-current={i === step ? "step" : undefined}>
              <div className={`h-0.5 ${i <= step ? "bg-ink" : "bg-line"} transition-colors`} />
              <p className={`mt-3 text-[0.65rem] uppercase tracking-[0.18em] ${i <= step ? "text-ink" : "text-muted"}`}>
                <span className="hidden sm:inline">{i + 1}. </span>
                {s}
              </p>
            </li>
          ))}
        </ol>

        {step === 0 && (
          <div className="animate-fade-up">
            <h2 ref={headingRef} tabIndex={-1} className="display mb-8 text-4xl outline-none">
              Choose a service
            </h2>
            <div className="space-y-10">
              {serviceCategories.map((c) => (
                <fieldset key={c}>
                  <legend className="eyebrow mb-3">{c}</legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {services
                      .filter((s) => s.category === c)
                      .map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            setServiceId(s.id);
                            setTime(null);
                            setStep(1);
                          }}
                          className={`flex flex-col border p-5 text-left transition hover:border-ink ${
                            serviceId === s.id ? "border-ink bg-white" : "border-line bg-white/40"
                          }`}
                        >
                          <span className="flex w-full items-baseline justify-between gap-3">
                            <span className="font-display text-xl">{s.name}</span>
                            <span className="font-display text-lg">
                              {s.from && <span className="mr-1 font-sans text-[0.6rem] uppercase text-muted">From</span>}
                              {gbp(s.price)}
                            </span>
                          </span>
                          <span className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">{duration(s.duration)}</span>
                        </button>
                      ))}
                  </div>
                </fieldset>
              ))}
            </div>
          </div>
        )}

        {step === 1 && service && (
          <div className="animate-fade-up">
            <h2 ref={headingRef} tabIndex={-1} className="display mb-8 text-4xl outline-none">
              Pick a date &amp; time
            </h2>
            <p className="eyebrow mb-3">Date</p>
            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-3 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Available dates">
              {days.map((d) => {
                const v = iso(d);
                const sel = date === v;
                return (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={sel}
                    onClick={() => {
                      setDate(v);
                      setTime(null);
                    }}
                    className={`flex w-16 shrink-0 flex-col items-center border py-3 transition ${
                      sel ? "border-ink bg-ink text-cream" : "border-line bg-white/40 hover:border-ink"
                    }`}
                  >
                    <span className="text-[0.6rem] uppercase tracking-[0.16em] opacity-70">
                      {d.toLocaleDateString("en-GB", { weekday: "short" })}
                    </span>
                    <span className="font-display text-2xl">{d.getDate()}</span>
                    <span className="text-[0.6rem] uppercase tracking-[0.16em] opacity-70">
                      {d.toLocaleDateString("en-GB", { month: "short" })}
                    </span>
                  </button>
                );
              })}
            </div>

            {date && (
              <div className="mt-8">
                <p className="eyebrow mb-3">Time — {formatDate(date)}</p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5" role="group" aria-label="Available times">
                  {slots.map((s) => (
                    <button
                      key={s.time}
                      type="button"
                      disabled={!s.available}
                      aria-pressed={time === s.time}
                      onClick={() => setTime(s.time)}
                      className={`border py-3 text-sm tabular-nums transition disabled:cursor-not-allowed disabled:line-through disabled:opacity-35 ${
                        time === s.time ? "border-ink bg-ink text-cream" : "border-line bg-white/40 hover:border-ink"
                      }`}
                    >
                      {s.time}
                    </button>
                  ))}
                </div>
                {slots.length === 0 && <p className="text-sm text-muted">No times available — please choose another day.</p>}
              </div>
            )}

            <div className="mt-10 flex gap-3">
              <button type="button" onClick={() => setStep(0)} className="btn-outline">
                Back
              </button>
              <button type="button" disabled={!date || !time} onClick={() => setStep(2)} className="btn-primary">
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 2 && service && date && time && (
          <form onSubmit={submit} className="animate-fade-up">
            <h2 ref={headingRef} tabIndex={-1} className="display mb-8 text-4xl outline-none">
              Your details
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="b-name" className="label">Full name</label>
                <input id="b-name" required autoComplete="name" className="field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label htmlFor="b-email" className="label">Email</label>
                <input id="b-email" type="email" required autoComplete="email" className="field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label htmlFor="b-phone" className="label">Phone</label>
                <input id="b-phone" type="tel" required autoComplete="tel" className="field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="b-notes" className="label">Notes (optional)</label>
                <textarea id="b-notes" rows={4} className="field" placeholder="Hair goals, inspiration, unit you're bringing…" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </div>
              <label className="flex items-start gap-3 text-sm text-ink-soft sm:col-span-2">
                <input type="checkbox" required checked={form.agree} onChange={(e) => setForm({ ...form, agree: e.target.checked })} className="mt-1 h-4 w-4 accent-[#1d1916]" />
                <span>
                  I have read and agree to the{" "}
                  <Link href="/client-agreement" target="_blank" className="link-underline text-ink">
                    client agreement
                  </Link>
                  , including the deposit and cancellation policy.
                </span>
              </label>
            </div>
            <div className="mt-10 flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="btn-outline">
                Back
              </button>
              <button type="submit" className="btn-primary">
                Confirm booking
              </button>
            </div>
          </form>
        )}

        {step === 3 && confirmed && (
          <div className="animate-fade-up border border-line bg-white/50 p-8 sm:p-12">
            <p className="eyebrow">Booking received</p>
            <h2 ref={headingRef} tabIndex={-1} className="display mt-4 text-5xl outline-none">
              Thank you, {confirmed.name.split(" ")[0]}.
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-ink-soft">
              Your request for <strong className="font-medium text-ink">{confirmed.serviceName}</strong> on{" "}
              <strong className="font-medium text-ink">{formatDate(confirmed.date)}</strong> at{" "}
              <strong className="font-medium text-ink">{confirmed.time}</strong> has been received. We&apos;ll be in touch at{" "}
              {confirmed.email} to confirm and take your deposit.
            </p>
            <p className="allow-copy mt-4 text-xs uppercase tracking-[0.18em] text-muted">Reference {confirmed.id.toUpperCase()}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <button type="button" onClick={reset} className="btn-outline">
                Book another
              </button>
              <Link href="/shop" className="btn-primary">
                Shop products
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Summary */}
      <aside className="h-fit border border-line bg-sand/50 p-7 lg:sticky lg:top-28" aria-label="Booking summary">
        <p className="eyebrow">Summary</p>
        {service ? (
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="text-muted">Service</dt>
              <dd className="font-display text-2xl">{service.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Duration</dt>
              <dd>{duration(service.duration)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Date</dt>
              <dd>{date ? formatDate(date) : "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Time</dt>
              <dd>{time ?? "—"}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-4">
              <dt className="text-muted">Price</dt>
              <dd className="font-display text-2xl">
                {service.from && <span className="mr-1 font-sans text-[0.6rem] uppercase text-muted">From</span>}
                {gbp(service.price)}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="mt-4 text-sm text-muted">Select a service to get started.</p>
        )}
        <p className="mt-6 border-t border-line pt-5 text-xs leading-relaxed text-muted">
          All appointments include a consultation. A deposit secures your booking; see our client agreement for details.
        </p>
      </aside>
    </section>
  );
}
