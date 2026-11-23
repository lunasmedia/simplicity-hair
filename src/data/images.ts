// Central image registry. These are stock placeholders — drop real studio
// photos into /public/images and point these entries at them
// (e.g. `${BASE}/images/hero.jpg`, see `asset()` in lib/format.ts).
import { asset } from "@/lib/format";

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  hero: asset("/images/hero.jpg"),
  studio: u("photo-1521590832167-7bcbfaa6381f", 1600),
  studio2: u("photo-1562322140-8baeececf3df", 1600),
};
