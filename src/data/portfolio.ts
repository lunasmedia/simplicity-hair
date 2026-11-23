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
  { id: "6", title: "Textured Crop", category: "Colour", image: photo(6), caption: "Textured short unit with a rich jet-black finish." },
  { id: "7", title: "Sleek Middle Part", category: "Styling", image: photo(7), caption: "Sleek middle-part pixie with soft sculpted edges." },
  { id: "8", title: "Laid Edges", category: "Custom units", image: photo(8), caption: "Side-part unit with detailed, laid baby hairs." },
  { id: "9", title: "Sweeping Fringe", category: "Wig installs", image: photo(9), caption: "Short unit with a full, sweeping side fringe." },
  { id: "10", title: "Pixie Polish", category: "Colour", image: photo(10), caption: "Tousled pixie, finished with a glossy shine." },
  { id: "11", title: "Soft Layers", category: "Styling", image: images.teyana2, caption: "Layered cut and blowout." },
  { id: "12", title: "Sleek Finish", category: "Wig installs", image: images.toni2, caption: "Middle part, bone straight finish." },
];

export const portfolioCategories: PortfolioCategory[] = ["Wig installs", "Custom units", "Styling", "Colour"];
