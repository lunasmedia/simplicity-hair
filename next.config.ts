import type { NextConfig } from "next";

// For GitHub Pages the site lives under /<repo-name>. Set NEXT_PUBLIC_BASE_PATH
// (e.g. "/simplicity-hair") at build time; leave empty for a root domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
