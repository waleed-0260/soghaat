"use client";

import { motion, useReducedMotion } from "framer-motion";
import DishCard from "./DishCard";
import type { MenuSectionProps } from "@/types";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function MenuSection({
  title,
  subtitle,
  items,
}: MenuSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="mb-20">
      <div className="mb-8">
        <h2 className="font-display text-3xl md:text-4xl text-soghaat-cream mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-soghaat-muted text-sm">{subtitle}</p>
        )}
        <div className="mt-3 w-12 h-0.5 bg-soghaat-gold" />
      </div>
      <motion.div
        variants={prefersReducedMotion ? undefined : container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        {items.map((menuItem) => (
          <motion.div
            key={menuItem.id}
            variants={prefersReducedMotion ? undefined : item}
          >
            <DishCard item={menuItem} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
