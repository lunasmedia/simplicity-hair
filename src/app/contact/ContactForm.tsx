"use client";

import { useState } from "react";
import { useMessages } from "@/lib/storage";
import { uid } from "@/lib/format";

export function ContactForm() {
  const [, setMessages] = useMessages();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "General enquiry", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessages((prev) => [...prev, { id: uid(), ...form, read: false, createdAt: new Date().toISOString() }]);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="border border-line bg-white/50 p-10" role="status">
        <p className="eyebrow">Message sent</p>
        <p className="display mt-4 text-4xl">Thank you — we&apos;ll be in touch soon.</p>
        <button type="button" className="btn-outline mt-8" onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "General enquiry", message: "" }); }}>
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-5 border border-line bg-white/40 p-7 sm:grid-cols-2 sm:p-10">
      <div>
        <label htmlFor="c-name" className="label">Name</label>
        <input id="c-name" required autoComplete="name" className="field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div>
        <label htmlFor="c-email" className="label">Email</label>
        <input id="c-email" type="email" required autoComplete="email" className="field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="c-subject" className="label">Subject</label>
        <select id="c-subject" className="field" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
          <option>General enquiry</option>
          <option>Custom unit</option>
          <option>Booking</option>
          <option>Order &amp; delivery</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="c-message" className="label">Message</label>
        <textarea id="c-message" required rows={6} className="field" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      </div>
      <button type="submit" className="btn-primary sm:col-span-2 sm:justify-self-start">
        Send message
      </button>
    </form>
  );
}
