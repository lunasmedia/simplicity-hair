"use client";

export function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  label = "Quantity",
  size = "md",
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  label?: string;
  size?: "sm" | "md";
}) {
  const h = size === "sm" ? "h-8 w-8 text-sm" : "h-12 w-12 text-lg";
  return (
    <div role="group" aria-label={label} className="inline-flex items-center border border-line bg-white/50">
      <button
        type="button"
        className={`${h} transition hover:bg-sand disabled:opacity-40`}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span aria-live="polite" className={`${size === "sm" ? "w-7 text-sm" : "w-10"} text-center tabular-nums`}>
        {value}
      </span>
      <button
        type="button"
        className={`${h} transition hover:bg-sand disabled:opacity-40`}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
