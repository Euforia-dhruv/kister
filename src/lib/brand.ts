/* ─── KITSER BRAND MODULE ──────────────────────────────────
 * Single source of truth for all brand content, copy, and data.
 * Every act imports from here — no hardcoded brand content elsewhere.
 */

export const BRAND = {
  name: "Kitser",
  tagline: "All about Kitchens",
  legalName: "Kitser Retail Pvt Ltd",
  location: {
    address: "No. 1, Nava India Road",
    city: "Coimbatore",
    pincode: "641028",
    state: "Tamil Nadu",
    country: "India",
    full: "No. 1, Nava India Road, Coimbatore — 641028",
  },
  contact: {
    phone: "+91 422 230 1092",
    email: "showroom@kitser.in",
    website: "kitser.in",
  },
  social: {
    instagram: "https://instagram.com/kitser.in",
    facebook: "https://facebook.com/kitserindia",
    pinterest: "https://pinterest.com/kitserindia",
  },
  founded: 1989,
  yearsOfExperience: 36,
  brandPartners: 35,
  countriesSourced: 12,
} as const;

/* ─── MATERIALS (Brand Pillars + Real Products) ─────────── */

export const MATERIALS = [
  {
    name: "Cast Iron",
    brand: "Le Creuset",
    origin: "France",
    since: 1925,
    image: "/images/cookware/01-cast-iron.jpg",
    description: "Enameled cast iron. Each piece hand-finished in Fresnoy-le-Grand. The material of grandmothers.",
    philosophy: "Cast iron: porous, dark, alive with seasoning built over decades.",
    properties: ["Heat retention", "Durability", "Naturally non-stick"],
  },
  {
    name: "Copper",
    brand: "Mauviel",
    origin: "France",
    since: 1830,
    image: "/images/materials/04-copper-patina.jpg",
    description: "Hand-hammered copper. Each mark catching light differently. The most responsive cooking material known.",
    philosophy: "Copper: hand-hammered, each mark catching light differently.",
    properties: ["Instant response", "Even heating", "Living patina"],
  },
  {
    name: "Stone",
    brand: "Dekton",
    origin: "Spain",
    since: 2013,
    image: "/images/materials/01-marble-countertop.jpg",
    description: "Ultra-compact surface. Scratch-proof. Stain-proof. The surface that outlasts everything.",
    philosophy: "Stone: geological time compressed into a surface.",
    properties: ["Scratch resistant", "Heat resistant", "UV resistant"],
  },
  {
    name: "Walnut",
    brand: "Scavolini",
    origin: "Italy",
    since: 1961,
    image: "/images/cabinetry/02-handleless-design.jpg",
    description: "American black walnut. Dark, rich, warm. Ages from chocolate to amber.",
    philosophy: "Wood absorbs. Ages beautifully. Tells the story of the hands that touch it.",
    properties: ["Warmth", "Grain variation", "Ages beautifully"],
  },
  {
    name: "Brass",
    brand: "Franke",
    origin: "Switzerland",
    since: 1911,
    image: "/images/materials/03-brass-detail.jpg",
    description: "Unlacquered brass develops a living finish. The opposite of disposable.",
    philosophy: "Brass: an alloy that darkens, ages, tells the story of hands that touch it.",
    properties: ["Living finish", "Antimicrobial", "Timeless"],
  },
  {
    name: "Steel",
    brand: "Miele",
    origin: "Germany",
    since: 1899,
    image: "/images/materials/05-steel-finish.jpg",
    description: "German-engineered 18/10 stainless. Mirror-polished. Acid-resistant. Built for commercial kitchens.",
    philosophy: "Steel: the gold standard. Non-reactive, corrosion-resistant, looks new after decades.",
    properties: ["Hygienic", "Corrosion proof", "Professional grade"],
  },
] as const;

/* ─── TIMELINE (from AboutPage) ─────────────────────────── */

export const TIMELINE = [
  { year: 1989, title: "Founded", description: "Kitser opens its first showroom in Coimbatore, bringing premium European cookware to South India." },
  { year: 1995, title: "Le Creuset Partnership", description: "Becomes the exclusive regional distributor of Le Creuset enameled cast iron cookware." },
  { year: 2005, title: "Kitchen Design", description: "Expands into modular kitchen curation, partnering with Scavolini and Bosch for complete kitchen solutions." },
  { year: 2010, title: "Material Library", description: "Opens a dedicated material library — marble, granite, walnut, brass — so clients can touch before they commit." },
  { year: 2015, title: "Showroom Redesign", description: "The Nava India Road showroom is reimagined as an architectural experience — not a store." },
  { year: 2025, title: "Today", description: "36 years. 35+ brand partnerships. One philosophy: build kitchens that last generations." },
] as const;
