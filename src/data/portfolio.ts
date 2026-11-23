import { images } from "./images";
import { asset } from "@/lib/format";

const photo = (n: number) => asset(`/images/portfolio/${String(n).padStart(2, "0")}.jpg`);

export type PortfolioCategory = "Wig installs" | "Custom units" | "Styling" | "Colour";

export type PortfolioItem = {
  id: string;
  title: string;
  category: PortfolioCategory;
  image: string;
  caption: string;
};

export const portfolio: PortfolioItem[] = [
  { id: "1", title: "Textured Pixie", category: "Custom units", image: photo(1), caption: "Textured pixie unit with a soft swept fringe." },
  { id: "2", title: "Sleek Side Part", category: "Wig installs", image: photo(2), caption: "Slicked side-part install with a seamless hairline." },
  { id: "3", title: "Tailored Pixie", category: "Styling", image: photo(3), caption: "Tousled pixie, styled for a sharp tailored look." },
  { id: "4", title: "Swept Pixie", category: "Custom units", image: photo(4), caption: "Custom pixie with a deep side part and sweeping fringe." },
  { id: "5", title: "Soft Crop", category: "Wig installs", image: photo(5), caption: "Short cropped unit, finished soft and natural." },
  { id: "6", title: "Honey Tones", category: "Colour", image: images.ashe2, caption: "Honey blonde colour on full lace." },
  { id: "7", title: "Silk Press", category: "Styling", image: images.p1, caption: "Glossy silk press on natural hair." },
  { id: "8", title: "Blunt Bob", category: "Custom units", image: images.nia, caption: "Nia bob, cut sharp and glossy." },
  { id: "9", title: "Defined Curls", category: "Wig installs", image: images.amara, caption: "Amara curls, shaped to frame the face." },
  { id: "10", title: "Rich Brunette", category: "Colour", image: images.p2, caption: "Dimensional brunette with gloss." },
  { id: "11", title: "Soft Layers", category: "Styling", image: images.teyana2, caption: "Layered cut and blowout." },
  { id: "12", title: "Sleek Finish", category: "Wig installs", image: images.toni2, caption: "Middle part, bone straight finish." },
];

export const portfolioCategories: PortfolioCategory[] = ["Wig installs", "Custom units", "Styling", "Colour"];
