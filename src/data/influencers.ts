import { asset } from "@/lib/format";
import { portfolio, portfolioCategories, type PortfolioItem } from "./portfolio";

// Influencer gallery: same layout as the portfolio. Tiles with a `video`
// play it (muted in the grid, with sound in the pop-up); the rest still
// show portfolio photos until their videos are added.
const clip = (file: string) => ({
  video: asset(`/videos/${file}.mp4`),
  image: asset(`/videos/${file}.jpg`),
});

const videos: Partial<PortfolioItem>[] = [
  { title: "Precision Taper", category: "Styling", caption: "Clean, precise taper on a short cut.", ...clip("clip-1") },
  { title: "Pixie Reveal", category: "Custom units", caption: "Sleek pixie unit, styled and revealed.", ...clip("influencers/inf-2") },
  { title: "Install Day", category: "Wig installs", caption: "From cap to finished install.", ...clip("influencers/inf-3") },
  { title: "Laid Edges", category: "Wig installs", caption: "Side-part pixie with sculpted edges.", ...clip("influencers/inf-4") },
  { title: "Midnight Bob", category: "Colour", caption: "Blue-black bob with a sweeping fringe.", ...clip("influencers/inf-5") },
  { title: "Finger Waves", category: "Styling", caption: "Sculpted finger-wave pixie, finished glossy.", ...clip("clip-2") },
  { title: "Silver Transformation", category: "Colour", caption: "From braids to a silver-grey finish.", ...clip("clip-3") },
  { title: "Platinum Pixie", category: "Custom units", caption: "Platinum pixie unit, fitted and styled.", ...clip("clip-4") },
  { title: "Bob Switch-Up", category: "Wig installs", caption: "Copper unit off, sleek black bob on.", ...clip("influencers/inf-9") },
  { title: "Sleek Bob", category: "Wig installs", caption: "Middle-part bob with a soft bend.", ...clip("clip-5") },
];

export const influencers: PortfolioItem[] = portfolio.map((item, i) => ({ ...item, ...videos[i] }));
export const influencerCategories = portfolioCategories;
