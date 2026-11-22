export type ServiceCategory = "Wigs" | "Cut" | "Colour" | "Treatments";

export type Service = {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  duration: number; // minutes
  price: number; // GBP
  from?: boolean;
  signature?: boolean;
};

export const services: Service[] = [
  {
    id: "wig-install",
    name: "Wig Install",
    category: "Wigs",
    description:
      "Lace customisation, bleach & pluck, melt and style — finished so it looks like it grows from your scalp.",
    duration: 120,
    price: 95,
    signature: true,
  },
  {
    id: "custom-unit-consultation",
    name: "Custom Unit Consultation",
    category: "Wigs",
    description:
      "Measurements, colour matching and texture planning for a unit made just for you. Redeemable against your order.",
    duration: 30,
    price: 25,
  },
  {
    id: "wig-revamp",
    name: "Wig Revamp",
    category: "Wigs",
    description: "Deep cleanse, condition and restyle to bring a well-loved unit back to life.",
    duration: 90,
    price: 60,
    from: true,
  },
  {
    id: "cut-and-style",
    name: "Cut & Style",
    category: "Cut",
    description:
      "Precision cut and blowout tailored to your face shape and texture.",
    duration: 45,
    price: 65,
    signature: true,
  },
  {
    id: "silk-press",
    name: "Silk Press",
    category: "Cut",
    description: "Cleanse, treatment and heat-protected press for glossy, swing-ready hair.",
    duration: 90,
    price: 85,
  },
  {
    id: "trim",
    name: "Trim & Finish",
    category: "Cut",
    description: "Ends refreshed and a polished finish to keep your shape sharp.",
    duration: 30,
    price: 40,
  },
  {
    id: "full-colour",
    name: "Full Colour",
    category: "Colour",
    description: "Root-to-tip colour with a gloss finish, formulated for your tone and texture.",
    duration: 120,
    price: 110,
    from: true,
    signature: true,
  },
  {
    id: "root-touch-up",
    name: "Root Touch-Up",
    category: "Colour",
    description: "Regrowth coverage blended seamlessly into your existing colour.",
    duration: 75,
    price: 70,
  },
  {
    id: "deep-conditioning",
    name: "Deep Conditioning Treatment",
    category: "Treatments",
    description: "Moisture-restoring mask with steam to strengthen and soften.",
    duration: 45,
    price: 45,
    signature: true,
  },
  {
    id: "scalp-treatment",
    name: "Scalp Treatment",
    category: "Treatments",
    description: "Exfoliating scalp cleanse and massage to support healthy growth.",
    duration: 40,
    price: 40,
  },
];

export const serviceCategories: ServiceCategory[] = ["Wigs", "Cut", "Colour", "Treatments"];
