import { asset } from "@/lib/format";

export type Clip = { src: string; poster: string; label: string };

// Clips play left to right, one after another, then loop.
// Files live in /public/videos (540×960, H.264, no audio).
export const clips: Clip[] = [1, 2, 3, 4, 5].map((n) => ({
  src: asset(`/videos/clip-${n}.mp4`),
  poster: asset(`/videos/clip-${n}.jpg`),
  label: `Studio clip ${n}`,
}));
