"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import ReserveForm from "@/components/ReserveForm";
import LocationMap from "@/components/LocationMap";

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

const HIGHLIGHTS = [
  {
    icon: "🔥",
    label: "Fireplace Ambiance",
    desc: "Cozy evenings by the fireside",
  },
  {
    icon: "🎵",
    label: "Live Music",
    desc: "Weekly performances for the whole family",
  },
  {
    icon: "🍽️",
    label: "All-You-Can-Eat",
    desc: "Available on select packages",
  },
  {
    icon: "🎉",
    label: "Private Events",
    desc: "Birthdays, anniversaries, corporate dinners",
  },
];

export default function ReservePage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative h-[50vh] min-h-[340px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80"
            alt="Soghaat Restaurant table setting"
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
            Open Daily · Bookings Accepted
          </motion.p>
          <motion.h1
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-display text-5xl md:text-7xl text-soghaat-cream mb-4"
          >
            Reserve Your Table
          </motion.h1>
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-soghaat-cream/60 text-lg"
          >
            Secure your spot for an unforgettable evening
          </motion.p>
        </div>
      </section>

      {/* ── Highlights ────────────────────────────────────── */}
      <section className="bg-soghaat-panel py-10 px-4 sm:px-6 lg:px-8 border-b border-soghaat-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.label}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center p-4"
              >
                <span className="text-3xl mb-2 block" aria-hidden>
                  {h.icon}
                </span>
                <p className="text-soghaat-cream font-medium text-sm">
                  {h.label}
                </p>
                <p className="text-soghaat-muted text-xs mt-0.5">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form ──────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-soghaat-bg">
        <div className="max-w-7xl mx-auto">
          <SectionWrapper className="text-center mb-12">
            <p className="text-soghaat-gold text-xs tracking-[0.2em] uppercase font-medium mb-3">
              Reservations
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-soghaat-cream mb-4">
              Book Your Experience
            </h2>
            <p className="text-soghaat-muted max-w-md mx-auto">
              Fill in the form below and we&apos;ll confirm your reservation via
              phone within a few hours.
            </p>
          </SectionWrapper>

          <ReserveForm />
        </div>
      </section>

      {/* ── Map ───────────────────────────────────────────── */}
      <LocationMap />
    </>
  );
}
