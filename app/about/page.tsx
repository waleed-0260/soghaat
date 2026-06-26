"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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

export default function AboutPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative h-[55vh] min-h-[380px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80"
            alt="Soghaat Restaurant ambiance"
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
            Heritage · Family · Tradition
          </motion.p>
          <motion.h1
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-display text-5xl md:text-7xl text-soghaat-cream"
          >
            Our Story
          </motion.h1>
        </div>
      </section>

      {/* ── Story ─────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-soghaat-bg">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <SectionWrapper>
              <p className="text-soghaat-gold text-xs tracking-[0.2em] uppercase font-medium mb-4">
                Our Beginning
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-soghaat-cream mb-6 leading-tight">
                Born From a Love
                <br />
                of Good Food
              </h2>
              <div className="space-y-4 text-soghaat-cream/75 leading-relaxed">
                <p>
                  Soghaat — meaning &ldquo;gift&rdquo; in Urdu — was founded
                  with a simple but powerful vision: to create a place where
                  families gather, memories are made, and every dish tells a
                  story rooted in tradition.
                </p>
                <p>
                  Nestled near Awan Chowk on Head Muhammad Wala Road, Multan,
                  Soghaat has grown to become the city&apos;s most beloved
                  family restaurant. With a menu of over 344 dishes spanning
                  Turkish, Desi, BBQ, Chinese, and Continental cuisines, there
                  truly is something for everyone.
                </p>
                <p>
                  Our heritage-inspired décor — warm woodwork, lantern-lit
                  evenings, and Mughal arches — creates an atmosphere of
                  elevated tradition. Whether it&apos;s a casual family dinner
                  or a grand celebration, Soghaat promises an experience as
                  unforgettable as the flavors on your plate.
                </p>
              </div>
            </SectionWrapper>

            <SectionWrapper>
              <div className="bg-soghaat-panel rounded-2xl p-8 border border-soghaat-border">
                <p className="text-soghaat-gold font-display italic text-2xl leading-relaxed mb-6">
                  &ldquo;Taste You&apos;ll Always Remember&rdquo;
                </p>
                <p className="text-soghaat-cream/70 leading-relaxed">
                  Our mission has always been simple — serve food that feels
                  like home, in an ambiance that feels like family. Every dish
                  that leaves our kitchen carries the warmth of tradition and
                  the craft of dedicated chefs who take pride in every plate.
                </p>
                <div className="mt-8 pt-6 border-t border-soghaat-border">
                  <p className="text-soghaat-muted text-sm">
                    📍 Near Awan Chowk, Head Muhammad Wala Road, Multan
                  </p>
                  <p className="text-soghaat-muted text-sm mt-1">
                    📞 0316 7676423
                  </p>
                </div>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-soghaat-panel">
        <div className="max-w-7xl mx-auto">
          <SectionWrapper className="text-center mb-14">
            <p className="text-soghaat-gold text-xs tracking-[0.2em] uppercase font-medium mb-3">
              What We Offer
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-soghaat-cream">
              Why Families Choose Soghaat
            </h2>
          </SectionWrapper>

          <motion.div
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: "🍳",
                title: "Multi-Cuisine Kitchen",
                desc: "344 dishes across Turkish, Desi, BBQ, Chinese, and Continental cuisines — our kitchen masters them all with the same passion and precision.",
              },
              {
                icon: "🎵",
                title: "Live Entertainment",
                desc: "Weekly live music performances and surprise magic shows transform your dining experience into a full evening of celebration.",
              },
              {
                icon: "👨‍👩‍👧",
                title: "Family First",
                desc: "Every corner of Soghaat is designed with families in mind — from private dining spaces to kids-friendly options and all-you-can-eat packages.",
              },
            ].map((feat) => (
              <motion.div
                key={feat.title}
                // variants={prefersReducedMotion ? undefined : itemVariants}
                className="bg-soghaat-surface rounded-2xl p-7 border border-soghaat-border text-center hover:border-soghaat-gold/40 transition-colors"
              >
                <span className="text-5xl mb-5 block" aria-hidden>
                  {feat.icon}
                </span>
                <h3 className="font-display text-soghaat-cream text-xl mb-3">
                  {feat.title}
                </h3>
                <p className="text-soghaat-muted text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-soghaat-bg">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={prefersReducedMotion ? undefined : containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: "456+", label: "Google Reviews" },
              { value: "2 AM", label: "Open Until" },
              { value: "6", label: "Cuisines Served" },
              { value: "Weekly", label: "Live Events" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                // variants={prefersReducedMotion ? undefined : itemVariants}
                className="bg-soghaat-surface rounded-2xl p-6 border border-soghaat-border text-center"
              >
                <p className="font-display text-3xl md:text-4xl text-soghaat-gold mb-1">
                  {stat.value}
                </p>
                <p className="text-soghaat-muted text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Quote ─────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-soghaat-panel">
        <div className="max-w-3xl mx-auto">
          <SectionWrapper>
            <div className="bg-soghaat-surface rounded-2xl p-10 border border-soghaat-gold/30 text-center">
              <p className="font-display italic text-soghaat-cream text-2xl md:text-3xl leading-relaxed mb-6">
                &ldquo;With warm ambiance and attentive service, we invite you
                to savor tradition with us.&rdquo;
              </p>
              <div className="w-12 h-0.5 bg-soghaat-gold mx-auto mb-6" />
              <p className="text-soghaat-gold font-medium">
                The Soghaat Family
              </p>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-soghaat-bg text-center">
        <SectionWrapper>
          <h2 className="font-display text-4xl md:text-5xl text-soghaat-cream mb-4">
            Come Dine With Us
          </h2>
          <p className="text-soghaat-muted mb-8 max-w-md mx-auto">
            Reserve your table today and experience the warmth of Soghaat
            firsthand.
          </p>
          <Link href="/reserve">
            <Button className="bg-soghaat-gold text-soghaat-bg hover:bg-soghaat-gold/90 rounded-full h-12 px-10 text-base font-semibold">
              Reserve a Table →
            </Button>
          </Link>
        </SectionWrapper>
      </section>
    </>
  );
}
