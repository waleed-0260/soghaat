"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import DishCard from "@/components/DishCard";
import ReserveForm from "@/components/ReserveForm";
import LocationMap from "@/components/LocationMap";
import type { MenuItem } from "@/types";

const FEATURED: MenuItem[] = [
  {
    id: "mezze-tabagi",
    name: "Mezze Tabagi",
    price: 3599,
    emoji: "🫙",
    desc: "Turkish starter platter — hummus, dips, pita, pickles & more",
    popular: true,
  },
  {
    id: "chicken-malai-boti",
    name: "Chicken Malai Boti",
    price: 1300,
    emoji: "🍢",
    desc: "Tender chicken marinated in cream and mild spices, BBQ-fired",
    popular: true,
  },
  {
    id: "buffalo-wings",
    name: "Buffalo Wings",
    price: 1390,
    emoji: "🍗",
    desc: "Crispy wings tossed in classic buffalo hot sauce",
    spicy: true,
  },
  {
    id: "corn-cheese-balls",
    name: "Corn Cheese Balls",
    price: 1890,
    emoji: "🧀",
    desc: "Golden crispy balls filled with sweet corn and melted cheese",
  },
];

const MENU_CATEGORIES = [
  "Turkish",
  "Desi & BBQ",
  "Karahi & Handi",
  "Appetizers",
  "Continental",
  "Chinese",
  "Burgers",
  "Rice & Biryani",
  "Seafood",
  "Desserts",
  "Beverages",
];

const PREVIEW_DISHES: MenuItem[] = [
  {
    id: "p-turkish-mix-grill",
    name: "Turkish Mix Grill",
    price: 2999,
    emoji: "🍖",
    desc: "A platter of authentic Turkish BBQ meats — kebabs, kofta & more",
    popular: true,
  },
  {
    id: "p-till-prawns",
    name: "Till Prawns",
    price: 2190,
    emoji: "🦐",
    desc: "Sesame-crusted tiger prawns pan-fried to golden perfection",
    popular: true,
  },
  {
    id: "p-chicken-biryani",
    name: "Chicken Biryani",
    price: 699,
    emoji: "🍛",
    desc: "Slow-cooked aromatic biryani with tender chicken pieces",
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "The Mezze Tabagi was absolutely divine — I felt like I was dining in Istanbul. And the live music made the evening truly magical. We'll definitely be back!",
    author: "Ayesha M.",
    location: "Multan",
    stars: 5,
  },
  {
    id: 2,
    quote:
      "Soghaat is where we celebrate every family milestone. The fireplace ambiance, attentive staff, and that Mutton Shinwari Karahi — nothing compares. A true gift to Multan.",
    author: "Tariq S.",
    location: "Multan",
    stars: 5,
  },
  {
    id: 3,
    quote:
      "We had our anniversary dinner here and the team went above and beyond. The Till Prawns and Turkish Mix Grill were outstanding. Best restaurant experience in Multan, hands down.",
    author: "Sana & Bilal",
    location: "Multan",
    stars: 5,
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function SectionWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0]);

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80"
            alt="Soghaat Restaurant warm interior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-soghaat-bg" />
        </div>

        {/* Ambient particles */}
        {!prefersReducedMotion &&
          Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              aria-hidden
              className={`absolute w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? "bg-soghaat-gold" : "bg-soghaat-ember"}`}
              style={{
                left: `${12 + i * 14}%`,
                top: `${25 + ((i * 17) % 50)}%`,
              }}
              animate={{ y: [-8, 8], opacity: [0.2, 0.5] }}
              transition={{
                duration: 2.5 + i * 0.4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto py-20">
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-soghaat-gold text-xs sm:text-sm tracking-[0.25em] uppercase font-medium mb-6"
          >
            Multan&apos;s Most Beloved Family Restaurant
          </motion.p>

          <motion.h1
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="font-display text-5xl sm:text-7xl md:text-8xl text-soghaat-cream leading-[1.05] mb-6"
          >
            Taste The
            <br />
            <span className="text-soghaat-gold">Authentic</span> Flavors
            <br />
            of Home
          </motion.h1>

          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="text-soghaat-cream/70 text-lg sm:text-xl mb-10 tracking-wide"
          >
            Desi · BBQ · Turkish · Chinese · Continental
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link href="/menu">
              <Button className="bg-soghaat-gold text-soghaat-bg hover:bg-soghaat-gold/90 rounded-full h-12 px-8 text-base font-semibold w-full sm:w-auto">
                Explore Menu
              </Button>
            </Link>
            <Link href="/reserve">
              <Button
                variant="outline"
                className="border-soghaat-cream/60 text-soghaat-cream hover:bg-soghaat-cream/10 hover:border-soghaat-cream rounded-full h-12 px-8 text-base bg-transparent w-full sm:w-auto"
              >
                Reserve a Table
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-5 text-sm"
          >
            {[
              "⭐ 3.9 · 456 Reviews",
              "🎵 Live Music Weekly",
              "🎩 Magic Shows",
            ].map((badge) => (
              <span
                key={badge}
                className="bg-black/40 border border-soghaat-border backdrop-blur-sm text-soghaat-cream/80 px-4 py-1.5 rounded-full text-xs sm:text-sm"
              >
                {badge}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          animate={
            prefersReducedMotion ? {} : { y: [0, 10, 0], opacity: [0.6, 1, 0.6] }
          }
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-soghaat-cream/50"
          aria-hidden
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────── */}
      <section className="bg-soghaat-gold text-soghaat-bg py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x divide-soghaat-bg/20"
          >
            {[
              { value: "3.9 ★", label: "Google Rating" },
              { value: "456+", label: "Happy Reviews" },
              { value: "2 AM", label: "Open Until" },
              { value: "Rs 1,000–6,000", label: "Price Range" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={prefersReducedMotion ? undefined : itemVariants}
                className="text-center px-4 py-1"
              >
                <p className="font-display text-2xl md:text-3xl font-normal">
                  {stat.value}
                </p>
                <p className="text-soghaat-bg/70 text-xs font-medium mt-0.5 tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Featured Dishes ────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-soghaat-bg">
        <div className="max-w-7xl mx-auto">
          <SectionWrapper className="text-center mb-14">
            <p className="text-soghaat-gold text-xs tracking-[0.2em] uppercase font-medium mb-3">
              Must Try
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-soghaat-cream">
              Flavors Worth Gathering For
            </h2>
            <p className="text-soghaat-muted mt-4 max-w-lg mx-auto">
              House signatures that keep families coming back, week after week.
            </p>
          </SectionWrapper>

          <motion.div
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {FEATURED.map((dish) => (
              <motion.div
                key={dish.id}
                variants={prefersReducedMotion ? undefined : itemVariants}
              >
                <DishCard item={dish} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Experience Banner ─────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-soghaat-panel">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <SectionWrapper>
              <p className="text-soghaat-gold text-xs tracking-[0.2em] uppercase font-medium mb-4">
                The Experience
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-soghaat-cream mb-6 leading-tight">
                More Than a Meal
              </h2>
              <p className="text-soghaat-cream/70 leading-relaxed mb-8 text-lg">
                Live music every week, magic shows, fireplace ambiance,
                all-you-can-eat options, and happy hour — all in one
                family-friendly space near Awan Chowk.
              </p>
              <Link href="/menu">
                <Button
                  variant="outline"
                  className="border-soghaat-gold text-soghaat-gold hover:bg-soghaat-gold hover:text-soghaat-bg rounded-full px-8 h-11 bg-transparent"
                >
                  View Full Menu →
                </Button>
              </Link>
            </SectionWrapper>

            <SectionWrapper>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: "🎵",
                    label: "Live Music",
                    sub: "Every Week",
                    color: "border-soghaat-gold",
                  },
                  {
                    icon: "🎩",
                    label: "Magic Shows",
                    sub: "Surprise Evenings",
                    color: "border-soghaat-ember",
                  },
                  {
                    icon: "🔥",
                    label: "Fireplace",
                    sub: "Cozy Ambiance",
                    color: "border-soghaat-ember",
                  },
                  {
                    icon: "🍽️",
                    label: "All-You-Can-Eat",
                    sub: "Select Packages",
                    color: "border-soghaat-sage",
                  },
                ].map((feat) => (
                  <div
                    key={feat.label}
                    className={`bg-soghaat-surface rounded-xl p-5 border-l-2 ${feat.color} border border-soghaat-border`}
                  >
                    <span className="text-3xl mb-3 block" aria-hidden>
                      {feat.icon}
                    </span>
                    <p className="text-soghaat-cream font-medium text-sm">
                      {feat.label}
                    </p>
                    <p className="text-soghaat-muted text-xs mt-0.5">
                      {feat.sub}
                    </p>
                  </div>
                ))}
              </div>
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* ── Menu Preview ──────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-soghaat-bg">
        <div className="max-w-7xl mx-auto">
          <SectionWrapper className="text-center mb-12">
            <p className="text-soghaat-gold text-xs tracking-[0.2em] uppercase font-medium mb-3">
              344 Items
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-soghaat-cream mb-4">
              What&apos;s on the Table
            </h2>
            <p className="text-soghaat-muted max-w-md mx-auto">
              From Turkish mezze to Desi karahi, we have something for every
              craving.
            </p>
          </SectionWrapper>

          <div className="flex overflow-x-auto pb-4 gap-2 mb-12 scrollbar-none -mx-4 px-4">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-5 py-2 rounded-full text-sm border transition-all ${
                  activeCategory === cat
                    ? "bg-soghaat-gold text-soghaat-bg border-soghaat-gold font-semibold"
                    : "bg-soghaat-surface border-soghaat-border text-soghaat-cream/70 hover:border-soghaat-gold/50 hover:text-soghaat-cream"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {PREVIEW_DISHES.map((dish) => (
              <motion.div
                key={dish.id}
                variants={prefersReducedMotion ? undefined : itemVariants}
              >
                <DishCard item={dish} />
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center">
            <Link href="/menu">
              <Button className="bg-soghaat-gold text-soghaat-bg hover:bg-soghaat-gold/90 rounded-full h-12 px-10 text-base font-semibold">
                View Full Menu →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Compact Reserve ───────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-soghaat-panel">
        <div className="max-w-7xl mx-auto">
          <SectionWrapper className="text-center mb-12">
            <p className="text-soghaat-gold text-xs tracking-[0.2em] uppercase font-medium mb-3">
              Reservations
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-soghaat-gold mb-4">
              Book Your Table
            </h2>
            <p className="text-soghaat-cream/70 max-w-md mx-auto">
              Reserve your spot for an unforgettable evening at Soghaat.
            </p>
          </SectionWrapper>
          <ReserveForm />
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-soghaat-bg">
        <div className="max-w-7xl mx-auto">
          <SectionWrapper className="text-center mb-14">
            <p className="text-soghaat-gold text-xs tracking-[0.2em] uppercase font-medium mb-3">
              Reviews
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-soghaat-cream">
              What Families Are Saying
            </h2>
          </SectionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.id}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="bg-soghaat-surface rounded-2xl p-6 border border-soghaat-border border-l-2 border-l-soghaat-gold"
              >
                <div className="flex mb-4">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <span key={si} className="text-soghaat-gold text-sm">
                      ★
                    </span>
                  ))}
                </div>
                <blockquote className="font-display italic text-soghaat-cream/90 text-lg leading-relaxed mb-5">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="text-soghaat-cream font-medium text-sm">
                    {t.author}
                  </p>
                  <p className="text-soghaat-muted text-xs">{t.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location Map ──────────────────────────────────── */}
      <LocationMap />
    </>
  );
}
