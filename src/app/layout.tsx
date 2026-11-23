import type { Metadata, Viewport } from "next";
import "@/fonts/fonts.css";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Custom Wigs & Hair Studio, London`,
    template: `%s · ${site.name}`,
  },
  description:
    "London hair studio specialising in custom wigs, wig installs and hair styling. UK delivery and online appointment booking.",
};

export const viewport: Viewport = { themeColor: "#f8f4ee" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className="min-h-screen">
        <CartProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
          >
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
