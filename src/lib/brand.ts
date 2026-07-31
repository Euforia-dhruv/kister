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
    instagram: "https://instagram.com/kitserindia",
    facebook: "https://facebook.com/kitserindia",
    pinterest: "https://pinterest.com/kitserindia",
  },
  founded: 1989,
  yearsOfExperience: 36,
  brandPartners: 35,
  countriesSourced: 12,
} as const;

/* ─── THE SIX PILLARS ───────────────────────────────────── */

export const PILLARS = [
  {
    id: "craft",
    name: "CRAFT",
    headline: "Every product is chosen for how it's made.",
    body: "Scavolini's 0.1mm tolerance on cabinet hinges. 72 layers of steel folded into a damascus blade. 18-hour seasoning process for cast iron.",
  },
  {
    id: "material",
    name: "MATERIAL",
    headline: "The truth of the material is the luxury.",
    body: "Cast iron: porous, dark, alive with seasoning built over decades. Clay: remembers every meal it has held. Copper: hand-hammered, each mark catching light differently.",
  },
  {
    id: "light",
    name: "LIGHT",
    headline: "Premium is chiaroscuro.",
    body: "The interplay of shadow and light. A single spotlight on a copper pot. Dawn light through a kitchen window. Fire — the oldest kitchen light.",
  },
  {
    id: "precision",
    name: "PRECISION",
    headline: "Show obsession, not specifications.",
    body: "The exact moment water reaches the perfect temperature for tea. The tolerance on a hinge measured in fractions of millimetres.",
  },
  {
    id: "ritual",
    name: "RITUAL",
    headline: "Don't show how to use. Show why it matters.",
    body: "The morning ritual of grinding coffee. The Sunday ritual of slow-cooking in clay. The annual ritual of re-seasoning cast iron.",
  },
  {
    id: "warmth",
    name: "WARMTH",
    headline: "The kitchen is where life happens.",
    body: "Every meal is a conversation. Tools that listen. The architecture of nourishment.",
  },
] as const;

/* ─── BRAND VOICE ───────────────────────────────────────── */

export const VOICE = {
  philosophy:
    "We believe that a well-equipped kitchen is the heart of memorable meals and shared moments.",
  manifesto:
    "When passion meets precision, every recipe becomes a masterpiece.",
  quotes: [
    "Some things cannot be rushed. A knife learns your hand. Iron remembers your meals. Stone holds the temperature of your intention.",
    "Every meal is a conversation between the cook, the tools, and the people at the table. We make the tools listen.",
    "A kitchen is not furniture. It is the architecture of nourishment.",
  ],
  notThis: [
    "Discover our curated collection of premium kitchen essentials.",
    "Elevate your cooking experience with our quality products.",
    "Shop our range of modular kitchens.",
  ],
  thisInstead: [
    "Some things cannot be rushed.",
    "Every meal is a conversation.",
    "A kitchen is not furniture.",
  ],
} as const;

/* ─── EMOTIONAL ARC ─────────────────────────────────────── */

export const EMOTIONAL_ARC = [
  { phase: "Curiosity", question: "What is this?", description: "Darkness, mystery, a single light" },
  { phase: "Wonder", question: "This is beautiful.", description: "Materials revealed, textures shown" },
  { phase: "Understanding", question: "This is for me.", description: "Story, philosophy, purpose" },
  { phase: "Desire", question: "I want this.", description: "Craftsmanship, quality, aspiration" },
  { phase: "Belonging", question: "This is us.", description: "Community, values, shared vision" },
] as const;

/* ─── PRODUCT CATEGORIES ────────────────────────────────── */

export const CATEGORIES = [
  {
    name: "Modular Kitchens",
    partners: ["Scavolini"],
    description: "Complete kitchen systems, cabinetry, layouts. Italian design partnership.",
  },
  {
    name: "Countertops & Surfaces",
    partners: ["Porceko", "Quantra", "Dekton"],
    description: "Porcelain, quartz, natural stone surfaces.",
  },
  {
    name: "Hardware & Accessories",
    partners: ["Blum", "Hafele", "Hettich", "Kesseböhmer", "Salice"],
    description: "Hinges, drawer systems, organizers, lighting.",
  },
  {
    name: "Sinks & Faucets",
    partners: ["BLANCO", "Carysil", "Franke", "Futura", "Reginox"],
    description: "Kitchen sinks, faucets, water systems.",
  },
  {
    name: "Built-in Appliances",
    partners: ["Bosch", "Electrolux", "ASKO", "Gaggenau", "Liebherr", "Miele", "Siemens", "Smeg"],
    description: "Ovens, hobs, dishwashers, refrigerators, hoods.",
  },
  {
    name: "Cooking Tools",
    partners: ["Bergner", "Meyer", "Onnni", "Rena"],
    description: "Utensils, tools, accessories.",
  },
  {
    name: "Kitchen Appliances",
    partners: ["Bosch", "De'Longhi", "Dyson", "LG", "Panasonic", "Samsung", "Whirlpool"],
    description: "Standalone appliances, small kitchen electronics.",
  },
  {
    name: "Cook & Bakeware",
    partners: ["Le Creuset", "Meyer", "Bergner"],
    description: "Pans, pots, baking trays, cookware sets.",
  },
  {
    name: "Serveware",
    partners: ["Borosil", "Lucaris", "Organic Kitchen", "Rena"],
    description: "Tableware, serving dishes, glassware.",
  },
  {
    name: "Storage",
    partners: ["Dublin", "Fawn", "Bergner", "Borosil"],
    description: "Containers, organizers, pantry solutions.",
  },
  {
    name: "Barware",
    partners: ["Nachtmann"],
    description: "Glassware, bar tools, cocktail accessories.",
  },
] as const;

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

/* ─── BRAND PARTNERS (key brands for cinematic use) ──────── */

export const KEY_BRANDS = [
  { name: "Scavolini", country: "Italy", since: 1961, category: "Cabinetry", logo: "/images/brands/scavolini/logo.png" },
  { name: "Le Creuset", country: "France", since: 1925, category: "Cookware", logo: "/images/brands/le-creuset/logo.png" },
  { name: "Bosch", country: "Germany", since: 1886, category: "Appliances", logo: "/images/brands/bosch/logo.png" },
  { name: "Miele", country: "Germany", since: 1899, category: "Appliances", logo: "/images/brands/miele/logo.png" },
  { name: "Blum", country: "Austria", since: 1952, category: "Hardware", logo: "/images/brands/blum/logo.png" },
  { name: "BLANCO", country: "Germany", since: 1925, category: "Sinks", logo: "/images/brands/blanco/logo.png" },
  { name: "Smeg", country: "Italy", since: 1948, category: "Appliances", logo: "/images/brands/smeg/logo.png" },
  { name: "Franke", country: "Switzerland", since: 1911, category: "Sinks", logo: "/images/brands/franke/logo.png" },
  { name: "Dyson", country: "UK", since: 1991, category: "Appliances", logo: "/images/brands/dyson/logo.png" },
  { name: "Siemens", country: "Germany", since: 1847, category: "Smart Home", logo: "/images/brands/siemens/logo.png" },
] as const;

/* ─── KITCHEN ANATOMY (from Act2 — real brand data) ──────── */

export const KITCHEN_PARTS = [
  { id: "upper-cabinets", label: "UPPER CABINETS", brand: "Scavolini", detail: "Scavolini DeLinea handleless system. Push-to-open mechanisms." },
  { id: "lower-cabinets", label: "LOWER CABINETS", brand: "Scavolini", detail: "Soft-close hinges. Full-extension drawers." },
  { id: "countertop", label: "COUNTERTOP", brand: "Dekton", detail: "Dekton ultra-compact surface. Scratch-proof. Stain-proof." },
  { id: "sink", label: "SINK", brand: "BLANCO", detail: "BLANCO SILGRANIT. 80% natural granite." },
  { id: "tap", label: "TAP", brand: "BLANCO", detail: "BLANCO Culina. Dual spray. 360 rotation." },
  { id: "oven", label: "OVEN", brand: "Miele", detail: "Miele Generation 7000. Self-cleaning. Precision temperature." },
  { id: "cooktop", label: "COOKTOP", brand: "Bosch", detail: "Bosch FlexInduction. Variable cooking zones." },
  { id: "exhaust-hood", label: "EXHAUST HOOD", brand: "Bosch", detail: "Integrated extractor. 650m3/h airflow." },
  { id: "drawer-system", label: "DRAWER SYSTEM", brand: "Blum", detail: "Blum LEGRABOX. Silent smooth-close. 40kg capacity." },
  { id: "cutlery-drawer", label: "CUTLERY DRAWER", brand: "Blum", detail: "Blum organizational system. Custom dividers." },
  { id: "hinge-system", label: "HINGE SYSTEM", brand: "Blum", detail: "Blum Clips top Blumotion. Integrated soft-close." },
  { id: "task-lighting", label: "TASK LIGHTING", brand: "Hafele", detail: "LED strip 3000K. CRI 95+. Dimmable." },
  { id: "display-lighting", label: "DISPLAY LIGHTING", brand: "Hafele", detail: "Recessed LED. Warm white. Accent illumination." },
  { id: "brass-handles", label: "BRASS HANDLES", brand: "Various", detail: "Unlacquered brass. Living finish. Natural patina." },
  { id: "open-shelving", label: "OPEN SHELVING", brand: "Scavolini", detail: "American black walnut. Floating brackets." },
  { id: "refrigerator", label: "REFRIGERATOR", brand: "Miele", detail: "Integrated column refrigerator. Custom panel-ready." },
  { id: "pull-out-pantry", label: "PULL-OUT PANTRY", brand: "Kesseböhmer", detail: "Kesseböhmer LeMans. Corner optimizer. Full access." },
  { id: "splashback", label: "SPLASHBACK", brand: "Dekton", detail: "Dekton ultra-heat resistant. Seamless installation." },
] as const;

/* ─── SYSTEMS (from Act5 — real brand data) ──────────────── */

export const SYSTEMS = [
  { id: "sink", label: "SINK", detail: "BLANCO SILGRANIT — 80% granite composite", connections: ["tap", "drain", "countertop"] },
  { id: "tap", label: "TAP", detail: "BLANCO Culina — dual spray, 360 rotation", connections: ["sink", "pipewater"] },
  { id: "drain", label: "DRAIN", detail: "Franke overflow system. Anti-odor trap.", connections: ["sink", "pipewater"] },
  { id: "pipewater", label: "PIPEWATER", detail: "Copper supply lines. PEX drainage.", connections: ["tap", "drain", "watersupply"] },
  { id: "watersupply", label: "WATER SUPPLY", detail: "Municipal supply + filtration system", connections: ["pipewater"] },
  { id: "countertop", label: "COUNTERTOP", detail: "Dekton — ultra-compact surface. 12mm thickness", connections: ["sink", "cabinet", "backsplash"] },
  { id: "cabinet", label: "CABINET", detail: "Scavolini DeLinea — handleless push-to-open", connections: ["hinges", "drawers", "countertop"] },
  { id: "hinges", label: "HINGES", detail: "Blum Clips top Blumotion — 80K cycle tested", connections: ["cabinet", "softclose"] },
  { id: "softclose", label: "SOFT-CLOSE", detail: "Integrated damper. Any position. Silent.", connections: ["hinges", "drawers"] },
  { id: "drawers", label: "DRAWERS", detail: "Blum LEGRABOX — 40kg dynamic load capacity", connections: ["softclose", "cabinet"] },
  { id: "lighting", label: "LIGHTING", detail: "LED 3000K — CRI 95+. Dimmable. Warm white.", connections: ["electrical"] },
  { id: "electrical", label: "ELECTRICAL", detail: "Dedicated 20A circuits. Surge protection.", connections: ["lighting", "appliances"] },
  { id: "appliances", label: "APPLIANCES", detail: "Miele Gen 7000. Bosch FlexInduction.", connections: ["electrical"] },
  { id: "backsplash", label: "BACKSPLASH", detail: "Dekton — heat resistant. Seamless.", connections: ["countertop"] },
] as const;

/* ─── BUILD LAYERS (for Act6) ───────────────────────────── */

export const BUILD_LAYERS = [
  { id: "floor", label: "FLOOR", description: "Every great kitchen starts with intention.", image: "/images/materials/06-natural-finish.jpg" },
  { id: "framework", label: "FRAMEWORK", description: "Scavolini. Italian engineering since 1961. Decades of use.", image: "/images/cabinetry/01-scavolini-modular.jpg", brand: "Scavolini" },
  { id: "electrical", label: "ELECTRICAL", description: "Bosch. German precision. Quiet, efficient, built to outlast.", image: "/images/hardware/04-hero.jpg", brand: "Bosch" },
  { id: "plumbing", label: "PLUMBING", description: "BLANCO. SILGRANIT. 80% granite. The sink that outlasts everything.", image: "/images/hardware/sinks-hero.jpg", brand: "BLANCO" },
  { id: "cabinets", label: "CABINETS", description: "Scavolini DeLinea. Handleless. Push-to-open. Italian design.", image: "/images/cabinetry/02-handleless-design.jpg", brand: "Scavolini" },
  { id: "countertop", label: "COUNTERTOP", description: "Dekton. Ultra-compact. Scratch-proof. Stain-proof.", image: "/images/materials/01-marble-countertop.jpg", brand: "Dekton" },
  { id: "accessories", label: "ACCESSORIES", description: "Blum. The invisible backbone. 80,000 cycles tested.", image: "/images/hardware/01-blum-hinge.jpg", brand: "Blum" },
  { id: "lighting", label: "LIGHTING", description: "Hafele. LED 3000K. CRI 95+. Light that makes materials sing.", image: "/images/kitchens/scavolini-poetica-hero.jpg", brand: "Hafele" },
] as const;
