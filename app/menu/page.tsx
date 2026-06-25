"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import MenuSection from "@/components/MenuSection";
import type { MenuItem } from "@/types";

// ─────────────────────── Menu Data ───────────────────────

const APPETIZERS: MenuItem[] = [
  { id: "buf-wings", name: "Buffalo Wings", price: 1390, emoji: "🍗", desc: "Crispy wings tossed in classic buffalo hot sauce", spicy: true },
  { id: "cajun-fries", name: "Cajun Fries", price: 599, emoji: "🍟", desc: "Golden fries with house cajun seasoning", spicy: true },
  { id: "corn-cheese", name: "Corn Cheese Balls", price: 1890, emoji: "🧀", desc: "Crispy golden balls with sweet corn and melted cheese" },
  { id: "dynamite", name: "Dynamite (Shrimp)", price: 1340, emoji: "🦐", desc: "Crispy shrimp tossed in fiery sriracha mayo", spicy: true },
  { id: "finger-fish", name: "Finger Fish", price: 1890, emoji: "🐟", desc: "Crispy battered fish fingers with tartare sauce" },
  { id: "fish-chips", name: "Fish & Chips", price: 1990, emoji: "🐠", desc: "Classic British-style fish and chips" },
  { id: "garlic-bread-pizza", name: "Garlic Bread Pizza", price: 899, emoji: "🫓", desc: "Cheesy garlic bread with pizza toppings", veg: true },
  { id: "gp-wings", name: "Garlic Parmesan Wings", price: 1390, emoji: "🍗", desc: "Wings in buttery garlic parmesan sauce" },
  { id: "honey-wings", name: "Honey Wings", price: 1390, emoji: "🍯", desc: "Sweet honey glazed crispy wings" },
  { id: "korean-wings", name: "Korean Spicy Wings", price: 1390, emoji: "🍗", desc: "Wings in gochujang-inspired Korean glaze", spicy: true },
  { id: "lgc-fries", name: "Loaded Grilled Chicken Fries", price: 1099, emoji: "🍟", desc: "Fries topped with grilled chicken and cheese sauce" },
  { id: "mezze", name: "Mezze Tabagi", price: 3599, emoji: "🫙", desc: "Turkish starter platter — hummus, dips, pita, pickles & more", popular: true },
  { id: "paneer-q", name: "Paneer Quesadilla", price: 1199, emoji: "🫓", desc: "Grilled flatbread with spiced paneer and cheese", veg: true },
  { id: "plain-fries", name: "Plain Fries", price: 499, emoji: "🍟", desc: "Classic golden salted fries", veg: true },
  { id: "dumplings", name: "Steam Dumplings", price: 990, emoji: "🥟", desc: "Soft steamed dumplings with seasoned chicken filling" },
  { id: "tacos", name: "Tacos", price: 1499, emoji: "🌮", desc: "Soft shell tacos with seasoned filling, salsa, and sour cream" },
  { id: "till-prawns-a", name: "Till Prawns", price: 2190, emoji: "🦐", desc: "Sesame-crusted tiger prawns, pan-fried to golden perfection", popular: true },
];

const TURKISH: MenuItem[] = [
  { id: "lentil-corbasi", name: "Lentil Corbasi", price: 799, emoji: "🥣", desc: "Traditional Turkish red lentil soup with lemon and spices", veg: true },
  { id: "ezogelin", name: "Ezogelin Soup", price: 799, emoji: "🍲", desc: "Hearty Turkish soup with lentils, bulgur, and tomatoes", veg: true },
  { id: "mucver", name: "Mücver Zucchini Fritters", price: 999, emoji: "🥬", desc: "Crispy zucchini fritters with dill and feta cheese", veg: true },
  { id: "turkish-mix-grill", name: "Turkish Mix Grill", price: 2999, emoji: "🍖", desc: "Authentic Turkish BBQ platter — kebabs, kofta & more", popular: true },
];

const KARAHI: MenuItem[] = [
  { id: "chicken-karahi", name: "Chicken Karahi", price: 1499, emoji: "🫕", desc: "Juicy chicken in tomato-based spices cooked in a wok" },
  { id: "mutton-karahi", name: "Mutton Karahi", price: 1899, emoji: "🫕", desc: "Slow-cooked mutton in aromatic karahi masala", spicy: true },
  { id: "chicken-handi", name: "Chicken Handi", price: 1499, emoji: "🍲", desc: "Creamy chicken slow-cooked in traditional handi pot" },
  { id: "mutton-handi", name: "Mutton Handi", price: 1899, emoji: "🍲", desc: "Rich mutton curry slow-cooked in a sealed handi" },
  { id: "shinwari-karahi", name: "Special Mutton Shinwari Karahi", price: 2199, emoji: "🫕", desc: "Peshawari-style Shinwari karahi with minimal spices", popular: true },
  { id: "sulemani-karahi", name: "Mutton Sulemani Karahi", price: 2099, emoji: "🫕", desc: "White karahi with cream, black pepper, and whole spices" },
  { id: "madrasi", name: "Chicken Madrasi", price: 1599, emoji: "🍛", desc: "South Indian-inspired spicy chicken curry", spicy: true },
];

const BBQ: MenuItem[] = [
  { id: "malai-boti", name: "Chicken Malai Boti", price: 1300, emoji: "🍢", desc: "Tender chicken in cream and mild spices, BBQ-fired", popular: true },
  { id: "seekh-kabab", name: "Chicken Seekh Kabab", price: 1199, emoji: "🍢", desc: "Minced chicken kabab with herbs, grilled on skewers", spicy: true },
  { id: "chicken-tikka", name: "Chicken Tikka", price: 1299, emoji: "🔥", desc: "Marinated chicken pieces grilled over charcoal", spicy: true },
  { id: "fish-tikka", name: "Fish Tikka", price: 1799, emoji: "🐟", desc: "Marinated fish fillets grilled to smoky perfection" },
  { id: "sajji", name: "Mutton Khadda Sajji", price: 2999, emoji: "🍖", desc: "Traditional whole-leg sajji marinated with Balochi spices", popular: true },
  { id: "beef-kabuli", name: "Beef Kabuli Pulao", price: 1899, emoji: "🍚", desc: "Afghan-style rice with tender beef, raisins, and carrots" },
];

const CONTINENTAL: MenuItem[] = [
  { id: "moroccan-chicken", name: "Grilled Moroccan Chicken", price: 1799, emoji: "🍗", desc: "Herb-spiced Moroccan-style grilled chicken breast" },
  { id: "tarragon-chicken", name: "Tarragon Chicken", price: 1699, emoji: "🍗", desc: "Creamy French-inspired tarragon chicken in white wine sauce" },
  { id: "thai-cashew", name: "Thai Cashew Nut Chicken", price: 1599, emoji: "🥜", desc: "Stir-fried chicken with cashews, bell peppers in Thai sauce" },
  { id: "steak-chicken", name: "Sizzling Chicken Steak", price: 1999, emoji: "🥩", desc: "Grilled chicken steak on a sizzling plate with mushroom sauce" },
  { id: "steak-beef", name: "Sizzling Beef Steak", price: 2499, emoji: "🥩", desc: "Prime beef steak served on a sizzler with peppercorn sauce" },
  { id: "steak-fish", name: "Sizzling Fish Steak", price: 2199, emoji: "🐟", desc: "Pan-seared fish fillet on a sizzler with lemon butter" },
];

const CHINESE: MenuItem[] = [
  { id: "chowmein", name: "Chicken Chowmein", price: 799, emoji: "🍜", desc: "Stir-fried egg noodles with chicken and mixed vegetables" },
  { id: "manchurian", name: "Chicken Manchurian", price: 899, emoji: "🥡", desc: "Crispy chicken in Manchurian sauce — a desi Chinese classic" },
  { id: "kung-pao", name: "Kung Pao Chicken", price: 999, emoji: "🌶️", desc: "Spicy Sichuan stir-fry with peanuts and dried chilies", spicy: true },
  { id: "sweet-sour", name: "Sweet & Sour Chicken", price: 899, emoji: "🍋", desc: "Classic Chinese sweet and sour sauce with crispy chicken" },
  { id: "szechuan", name: "Szechuan Chicken", price: 999, emoji: "🫑", desc: "Szechuan pepper-spiced chicken stir-fry with vegetables", spicy: true },
];

const BURGERS: MenuItem[] = [
  { id: "classic-burger", name: "Classic Burger", price: 599, emoji: "🍔", desc: "Juicy beef patty with lettuce, tomato, and house sauce" },
  { id: "zinger-burger", name: "Chicken Zinger", price: 799, emoji: "🍔", desc: "Crispy fried chicken fillet with coleslaw and cheese" },
  { id: "bbq-burger", name: "BBQ Burger", price: 899, emoji: "🍔", desc: "Beef patty with caramelized onions and smoky BBQ sauce" },
  { id: "mushroom-burger", name: "Mushroom Swiss Burger", price: 999, emoji: "🍔", desc: "Beef patty topped with sautéed mushrooms and Swiss cheese" },
];

const RICE: MenuItem[] = [
  { id: "chicken-biryani", name: "Chicken Biryani", price: 699, emoji: "🍛", desc: "Slow-cooked aromatic biryani with tender chicken pieces" },
  { id: "mutton-biryani", name: "Mutton Biryani", price: 999, emoji: "🍛", desc: "Rich aromatic biryani with succulent mutton pieces" },
  { id: "kabuli-pulao", name: "Beef Kabuli Pulao", price: 1199, emoji: "🍚", desc: "Afghan-style rice with slow-cooked beef and sweet raisins" },
  { id: "chicken-fried-rice", name: "Chicken Fried Rice", price: 799, emoji: "🍚", desc: "Wok-tossed fried rice with chicken, eggs, and vegetables" },
  { id: "veg-fried-rice", name: "Vegetable Fried Rice", price: 699, emoji: "🍚", desc: "Wok-tossed fried rice with mixed seasonal vegetables", veg: true },
];

const SEAFOOD: MenuItem[] = [
  { id: "s-till-prawns", name: "Till Prawns", price: 2190, emoji: "🦐", desc: "Sesame-crusted tiger prawns pan-fried to golden perfection", popular: true },
  { id: "s-finger-fish", name: "Finger Fish", price: 1890, emoji: "🐟", desc: "Crispy battered fish fingers with house tartare sauce" },
  { id: "s-fish-chips", name: "Fish & Chips", price: 1990, emoji: "🐠", desc: "Classic British-style fish and chips with mushy peas" },
  { id: "s-dynamite", name: "Dynamite Shrimp", price: 1340, emoji: "🦐", desc: "Crispy shrimp tossed in fiery sriracha mayo", spicy: true },
];

const DESSERTS: MenuItem[] = [
  { id: "gulab-jamun", name: "Gulab Jamun", price: 499, emoji: "🍩", desc: "Soft milk-solid dumplings soaked in rose-saffron syrup", veg: true },
  { id: "kheer", name: "Kheer", price: 499, emoji: "🍚", desc: "Creamy rice pudding with cardamom, rose water, and pistachios", veg: true },
  { id: "brownie", name: "Brownie with Ice Cream", price: 799, emoji: "🍫", desc: "Warm fudgy brownie served with vanilla ice cream", veg: true },
  { id: "tiramisu", name: "Tiramisu", price: 899, emoji: "☕", desc: "Italian coffee-flavored dessert with mascarpone cream", veg: true },
  { id: "creme-brulee", name: "Crème Brûlée", price: 899, emoji: "🍮", desc: "French custard with a caramelized sugar crust", veg: true },
];

const BEVERAGES: MenuItem[] = [
  { id: "coca-cola", name: "Coca Cola", price: 150, emoji: "🥤", desc: "Classic Coca Cola, chilled", veg: true },
  { id: "pepsi", name: "Pepsi", price: 150, emoji: "🥤", desc: "Ice-cold Pepsi", veg: true },
  { id: "mango-juice", name: "Mango Juice", price: 250, emoji: "🥭", desc: "Fresh mango juice, sweetened to taste", veg: true },
  { id: "mint-lemonade", name: "Mint Lemonade", price: 299, emoji: "🍋", desc: "Refreshing mint lemonade with fresh lime", veg: true },
  { id: "lassi-sweet", name: "Lassi (Sweet)", price: 299, emoji: "🥛", desc: "Chilled sweet yogurt drink with rose water", veg: true },
  { id: "lassi-salty", name: "Lassi (Salty)", price: 299, emoji: "🥛", desc: "Traditional salty lassi with cumin", veg: true },
  { id: "green-tea", name: "Green Tea", price: 199, emoji: "🍵", desc: "Soothing green tea, served hot or iced", veg: true },
  { id: "chai-karak", name: "Chai Karak", price: 199, emoji: "☕", desc: "Rich milky tea brewed with cardamom — Multan's own", veg: true },
];

const SECTIONS = [
  { id: "appetizers", label: "Appetizers", items: APPETIZERS },
  { id: "turkish", label: "Turkish", items: TURKISH },
  { id: "karahi", label: "Karahi & Handi", items: KARAHI },
  { id: "bbq", label: "BBQ & Grill", items: BBQ },
  { id: "continental", label: "Continental", items: CONTINENTAL },
  { id: "chinese", label: "Chinese", items: CHINESE },
  { id: "burgers", label: "Burgers", items: BURGERS },
  { id: "rice", label: "Rice & Biryani", items: RICE },
  { id: "seafood", label: "Seafood", items: SEAFOOD },
  { id: "desserts", label: "Desserts", items: DESSERTS },
  { id: "beverages", label: "Beverages", items: BEVERAGES },
];

export default function MenuPage() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToSection = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative h-[50vh] min-h-[340px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80"
            alt="Soghaat Restaurant menu dishes"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-soghaat-bg" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-soghaat-gold text-xs tracking-[0.25em] uppercase font-medium mb-4"
          >
            344 Dishes · 6 Cuisines
          </motion.p>
          <motion.h1
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-display text-5xl md:text-7xl text-soghaat-cream mb-4"
          >
            Our Menu
          </motion.h1>
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-soghaat-cream/60 text-lg tracking-wider"
          >
            Turkish · Desi · BBQ · Chinese · Continental
          </motion.p>
        </div>
      </section>

      {/* ── Sticky Category Tabs ──────────────────────────── */}
      <div className="sticky top-16 z-30 bg-soghaat-bg/95 backdrop-blur-sm border-b border-soghaat-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto py-3 gap-2 scrollbar-none">
            {SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className="shrink-0 px-4 py-1.5 rounded-full text-sm border border-soghaat-border text-soghaat-cream/70 hover:border-soghaat-gold hover:text-soghaat-gold transition-all bg-soghaat-surface"
              >
                {sec.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Menu Sections ────────────────────────────────── */}
      <div className="bg-soghaat-bg py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {SECTIONS.map((sec) => (
            <section
              key={sec.id}
              id={sec.id}
              ref={(el) => { sectionRefs.current[sec.id] = el; }}
              className="scroll-mt-32"
            >
              <MenuSection title={sec.label} items={sec.items} />
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
