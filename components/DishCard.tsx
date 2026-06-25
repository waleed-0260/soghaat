"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/context/OrderContext";
import type { MenuItem } from "@/types";

interface DishCardProps {
  item: MenuItem;
}

export default function DishCard({ item }: DishCardProps) {
  const { addItem } = useOrder();
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="bg-soghaat-surface rounded-2xl overflow-hidden border-t-2 border-soghaat-gold flex flex-col"
    >
      <div className="aspect-video bg-soghaat-panel flex items-center justify-center text-6xl relative">
        <span role="img" aria-label={item.name}>
          {item.emoji}
        </span>
        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
          {item.popular && (
            <span className="bg-soghaat-gold/20 text-soghaat-gold text-[10px] px-2 py-0.5 rounded-full font-medium">
              ⭐ Popular
            </span>
          )}
          {item.spicy && (
            <span className="bg-red-900/70 text-red-300 text-[10px] px-2 py-0.5 rounded-full font-medium">
              🌶️ Spicy
            </span>
          )}
          {item.veg && (
            <span className="bg-soghaat-sage/20 text-soghaat-sage text-[10px] px-2 py-0.5 rounded-full font-medium">
              🌿 Veg
            </span>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display text-soghaat-cream text-lg leading-tight mb-1">
          {item.name}
        </h3>
        {item.desc && (
          <p className="text-soghaat-muted text-sm leading-relaxed line-clamp-2 flex-1 mb-3">
            {item.desc}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-soghaat-gold font-semibold text-sm">
            Rs {item.price.toLocaleString()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addItem(item)}
            aria-label={`Add ${item.name} to order`}
            className="border-soghaat-gold text-soghaat-gold hover:bg-soghaat-gold hover:text-soghaat-bg rounded-full h-8 px-4 text-xs bg-transparent"
          >
            + Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
