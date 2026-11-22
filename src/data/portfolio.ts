import { images } from "./images";

export type PortfolioCategory = "Wig installs" | "Custom units" | "Styling" | "Colour";

export type PortfolioItem = {
  id: string;
  title: string;
  category: PortfolioCategory;
  image: string;
  caption: string;
};

export const portfolio: PortfolioItem[] = [
  { id: "1", title: "Teyana, Ginger Black", category: "Custom units", image: images.teyana, caption: "Custom Teyana unit with soft face-framing layers." },
  { id: "2", title: "HD Melt", category: "Wig installs", image: images.ashe, caption: "Full lace HD install, parted to the side." },
  { id: "3", title: "Studio Curls", category: "Styling", image: images.styling, caption: "Wand curls finished in the chair." },
  { id: "4", title: "Toni Pixie", category: "Custom units", image: images.toni, caption: "Precision-cut pixie, tapered nape." },
  { id: "5", title: "Body Wave", category: "Wig installs", image: images.rose, caption: "Rose unit, glueless install." },
  { id: "6", title: "Honey Tones", category: "Colour", image: images.ashe2, caption: "Honey blonde colour on full lace." },
  { id: "7", title: "Silk Press", category: "Styling", image: images.p1, caption: "Glossy silk press on natural hair." },
  { id: "8", title: "Blunt Bob", category: "Custom units", image: images.nia, caption: "Nia bob, cut sharp and glossy." },
  { id: "9", title: "Defined Curls", category: "Wig installs", image: images.amara, caption: "Amara curls, shaped to frame the face." },
  { id: "10", title: "Rich Brunette", category: "Colour", image: images.p2, caption: "Dimensional brunette with gloss." },
  { id: "11", title: "Soft Layers", category: "Styling", image: images.teyana2, caption: "Layered cut and blowout." },
  { id: "12", title: "Sleek Finish", category: "Wig installs", image: images.toni2, caption: "Middle part, bone straight finish." },
];

export const portfolioCategories: PortfolioCategory[] = ["Wig installs", "Custom units", "Styling", "Colour"];
