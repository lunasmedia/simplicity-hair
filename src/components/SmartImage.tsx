"use client";

import { useState } from "react";

/**
 * <img> with a warm, on-brand fallback panel if the source fails to load,
 * so placeholder imagery never leaves a broken-image icon.
 */
export function SmartImage({
  src,
  alt,
  className = "",
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-end bg-gradient-to-br from-linen via-sand to-linen p-5 ${className}`}
      >
        <span className="font-display text-lg italic text-cocoa/70">{alt}</span>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={`bg-sand ${className.includes("object-contain") ? "" : "object-cover"} ${className}`}
    />
  );
}
