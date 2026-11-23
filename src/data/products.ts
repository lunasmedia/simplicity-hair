import { asset } from "@/lib/format";

// Shop photography reuses the studio shoot in /public/images
const photo = (n: number) => asset(`/images/portfolio/${String(n).padStart(2, "0")}.jpg`);
const hero = asset("/images/hero.jpg");

export type OptionValue = { label: string; priceDelta: number };
export type ProductOption = {
  name: string;
  optional?: boolean;
  values: OptionValue[];
};

export type ProductCategory = "Custom units" | "Full lace" | "Accessories";

export type Product = {
  slug: string;
  name: string;
  tag: string;
  category: ProductCategory;
  price: number; // base price in GBP
  images: string[];
  short: string;
  description: string;
  details: string[];
  options: ProductOption[];
  featured?: boolean;
};

const hdLace: ProductOption = {
  name: "HD Lace (optional)",
  optional: true,
  values: [
    { label: "None", priceDelta: 0 },
    { label: "Extra", priceDelta: 100 },
  ],
};

export const products: Product[] = [
  {
    slug: "teyana-unit",
    name: "Teyana Unit",
    tag: "CUSTOM MADE",
    category: "Custom units",
    price: 450,
    images: [photo(5), photo(12), photo(6)],
    short: "Soft, voluminous layers with a natural hairline.",
    description:
      "Our signature Teyana unit is constructed by hand in the studio to your head measurements, then cut and styled with soft face-framing layers. Every unit is pre-plucked, bleached and ready to wear.",
    details: [
      "100% virgin human hair",
      "Made to your measurements",
      "Pre-plucked hairline, bleached knots",
      "Adjustable band & combs",
    ],
    options: [
      {
        name: "Color",
        values: [
          { label: "Ginger Black", priceDelta: 0 },
          { label: "Natural black", priceDelta: 0 },
        ],
      },
      hdLace,
    ],
    featured: true,
  },
  {
    slug: "rose-unit",
    name: "Rose Unit",
    tag: "CUSTOM MADE",
    category: "Custom units",
    price: 375,
    images: [photo(7), hero],
    short: "Sleek body wave with effortless movement.",
    description:
      "The Rose unit is our everyday luxury — a lightweight body wave that holds its shape and moves beautifully. Custom built and finished with a flawless melt.",
    details: [
      "100% virgin human hair",
      "Body wave texture",
      "Glueless-friendly construction",
      "Ships tracked across the UK",
    ],
    options: [
      {
        name: "Color",
        values: [
          { label: "Natural black", priceDelta: 0 },
          { label: "Dark brown", priceDelta: 0 },
        ],
      },
      {
        name: "Length",
        values: [
          { label: '16"', priceDelta: 0 },
          { label: '18"', priceDelta: 40 },
          { label: '20"', priceDelta: 80 },
        ],
      },
      hdLace,
    ],
    featured: true,
  },
  {
    slug: "toni-pixie",
    name: "Toni Pixie",
    tag: "CUSTOM MADE",
    category: "Custom units",
    price: 450,
    images: [photo(1), photo(3), photo(10)],
    short: "A bold, precision-cut pixie, tailored to you.",
    description:
      "The Toni pixie is precision cut in the chair to suit your face shape. Short, chic and confident — with a hairline so natural it reads as your own.",
    details: [
      "100% virgin human hair",
      "Precision cut & styled",
      "Tapered nape",
      "Low-maintenance wear",
    ],
    options: [
      {
        name: "Color",
        values: [
          { label: "Natural black", priceDelta: 0 },
          { label: "Jet black", priceDelta: 0 },
          { label: "Burgundy", priceDelta: 30 },
        ],
      },
      hdLace,
    ],
    featured: true,
  },
  {
    slug: "ashe-luxe",
    name: "Ashe Luxe",
    tag: "FULL LACE HD",
    category: "Full lace",
    price: 450,
    images: [photo(8), photo(2)],
    short: "Full HD lace for complete versatility.",
    description:
      "Ashe Luxe is built on full HD lace so you can part anywhere and wear it up. Our most versatile unit, finished to an undetectable melt.",
    details: [
      "Full HD lace cap",
      "Part anywhere, wear high ponytails",
      "Bleached knots & pre-plucked",
      "100% virgin human hair",
    ],
    options: [
      {
        name: "Color",
        values: [
          { label: "Natural black", priceDelta: 0 },
          { label: "Honey blonde", priceDelta: 50 },
        ],
      },
      {
        name: "Length",
        values: [
          { label: '20"', priceDelta: 0 },
          { label: '22"', priceDelta: 50 },
          { label: '24"', priceDelta: 100 },
        ],
      },
    ],
    featured: true,
  },
  {
    slug: "nia-bob",
    name: "Nia Bob",
    tag: "CUSTOM MADE",
    category: "Custom units",
    price: 320,
    images: [photo(4), photo(9)],
    short: "A blunt, glossy bob that sits just right.",
    description:
      "Nia is a classic blunt bob, cut sharp and finished glossy. Easy to wear, easy to love.",
    details: ["100% virgin human hair", "Blunt cut", "Glueless-friendly"],
    options: [
      {
        name: "Color",
        values: [
          { label: "Natural black", priceDelta: 0 },
          { label: "Dark brown", priceDelta: 0 },
        ],
      },
      hdLace,
    ],
  },
  {
    slug: "amara-curls",
    name: "Amara Curls",
    tag: "CUSTOM MADE",
    category: "Custom units",
    price: 420,
    images: [photo(11), photo(9)],
    short: "Defined, bouncy curls with real volume.",
    description:
      "Amara is a full, defined curl pattern that keeps its bounce. Custom made and shaped to frame your face.",
    details: ["100% virgin human hair", "Deep curl texture", "Shaped in-studio"],
    options: [
      {
        name: "Color",
        values: [
          { label: "Natural black", priceDelta: 0 },
          { label: "Ginger Black", priceDelta: 0 },
        ],
      },
      hdLace,
    ],
  },
  {
    slug: "wig-care-kit",
    name: "Wig Care Kit",
    tag: "ESSENTIALS",
    category: "Accessories",
    price: 35,
    images: [hero, photo(2)],
    short: "Everything you need to keep your unit fresh.",
    description:
      "The products from your chair, ready for home: sulphate-free shampoo, conditioning mask, lightweight serum and a wide-tooth comb.",
    details: ["Shampoo 250ml", "Mask 200ml", "Serum 50ml", "Wide-tooth comb"],
    options: [],
  },
];

export const productCategories: ProductCategory[] = [
  "Custom units",
  "Full lace",
  "Accessories",
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
