import { asset } from "@/lib/format";
import { portfolioCategories, type PortfolioItem } from "./portfolio";

// Influencer gallery: same masonry layout and pop-up as the portfolio.
// Every tile is a video — muted and looping in the grid, with sound in the pop-up.
// Clips 1–5 are shared with the home page video reel (public/videos/clip-N.mp4).
const clip = (file: string) => ({
  video: asset(`/videos/${file}.mp4`),
  image: asset(`/videos/${file}.jpg`), // cover image shown before the video loads
});

export const influencers: PortfolioItem[] = [
  { id: "1", title: "Precision Taper", category: "Styling", caption: "Clean, precise taper on a short cut.", ...clip("clip-1") },
  { id: "2", title: "Pixie Reveal", category: "Custom units", caption: "Sleek pixie unit, styled and revealed.", ...clip("influencers/inf-2") },
  { id: "3", title: "Install Day", category: "Wig installs", caption: "From cap to finished install.", ...clip("influencers/inf-3") },
  { id: "4", title: "Laid Edges", category: "Wig installs", caption: "Side-part pixie with sculpted edges.", ...clip("influencers/inf-4") },
  { id: "5", title: "Midnight Bob", category: "Colour", caption: "Blue-black bob with a sweeping fringe.", ...clip("influencers/inf-5") },
  { id: "6", title: "Finger Waves", category: "Styling", caption: "Sculpted finger-wave pixie, finished glossy.", ...clip("clip-2") },
  { id: "7", title: "Silver Transformation", category: "Colour", caption: "From braids to a silver-grey finish.", ...clip("clip-3") },
  { id: "8", title: "Platinum Pixie", category: "Custom units", caption: "Platinum pixie unit, fitted and styled.", ...clip("clip-4") },
  { id: "9", title: "Bob Switch-Up", category: "Wig installs", caption: "Copper unit off, sleek black bob on.", ...clip("influencers/inf-9") },
  { id: "10", title: "Sleek Bob", category: "Wig installs", caption: "Middle-part bob with a soft bend.", ...clip("clip-5") },
  { id: "11", title: "Tailored Pixie", category: "Styling", caption: "Tousled pixie with a tailored pinstripe look.", ...clip("influencers/inf-11") },
  { id: "12", title: "Off-Duty Crop", category: "Custom units", caption: "Sleek short crop, styled for every day.", ...clip("influencers/inf-12") },
];

export const influencerCategories = portfolioCategories;
