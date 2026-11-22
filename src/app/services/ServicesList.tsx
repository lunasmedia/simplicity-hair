"use client";

import { useState } from "react";
import { serviceCategories, type ServiceCategory } from "@/data/services";
import { useServices } from "@/lib/storage";
import { ServiceRow } from "@/components/ServiceRow";
import { Chip } from "@/components/ui";

export function ServicesList() {
  const all = useServices();
  const [cat, setCat] = useState<ServiceCategory | "All">("All");
  const cats = cat === "All" ? serviceCategories : [cat];

  return (
    <section className="container-x py-14">
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter services">
        {(["All", ...serviceCategories] as const).map((c) => (
          <Chip key={c} active={cat === c} onClick={() => setCat(c)}>
            {c}
          </Chip>
        ))}
      </div>
      <div className="space-y-16">
        {cats.map((c) => {
          const list = all.filter((s) => s.category === c);
          if (!list.length) return null;
          return (
            <div key={c} className="grid gap-6 lg:grid-cols-[240px_1fr]">
              <h2 className="display pt-7 text-4xl lg:sticky lg:top-24 lg:self-start">{c}</h2>
              <ul className="border-t border-line">
                {list.map((s) => (
                  <ServiceRow key={s.id} service={s} />
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
