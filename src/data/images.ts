// Central image registry. These are stock placeholders — drop real studio
// photos into /public/images and point these entries at them
// (e.g. `${BASE}/images/hero.jpg`, see `asset()` in lib/format.ts).
import { asset } from "@/lib/format";

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  hero: asset("/images/hero-group.jpg"),
  heroMobile: asset("/images/hero-mobile.jpg"),
  heroMobileSlides: [2, 3, 4, 5, 6].map((n) => asset(`/images/hero-mobile-${n}.jpg`)),
  studio: asset("/images/studio.jpg"),
  studio2: u("photo-1562322140-8baeececf3df", 1600),
};
