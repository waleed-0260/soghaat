"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOrder } from "@/context/OrderContext";

export default function OrderCart() {
  const [isOpen, setIsOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { items, count, total, updateQty, clearCart } = useOrder();
  const prefersReducedMotion = useReducedMotion();

  const handlePlaceOrder = () => {
    clearCart();
    setIsOpen(false);
    setOrderPlaced(true);
  };

  return (
    <>
      <AnimatePresence>
        {count > 0 && (
          <motion.button
            initial={prefersReducedMotion ? {} : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={prefersReducedMotion ? {} : { scale: 0, opacity: 0 }}
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            onClick={() => setIsOpen(true)}
            aria-label={`Open cart — ${count} item${count !== 1 ? "s" : ""}`}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-soghaat-gold text-soghaat-bg rounded-full shadow-2xl flex items-center justify-center"
          >
            <ShoppingCart size={22} strokeWidth={2} />
            <span
              aria-hidden
              className="absolute -top-1.5 -right-1.5 bg-soghaat-ember text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
            >
              {count > 99 ? "99+" : count}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-50"
              aria-hidden
            />
            <motion.div
              key="drawer"
              initial={prefersReducedMotion ? {} : { y: "100%" }}
              animate={{ y: 0 }}
              exit={prefersReducedMotion ? {} : { y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 md:left-auto md:w-[400px] max-h-[85vh] bg-soghaat-surface border-t md:border-l border-soghaat-border rounded-t-3xl z-50 flex flex-col"
              role="dialog"
              aria-label="Your order"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-soghaat-border shrink-0">
                <h2 className="font-display text-soghaat-cream text-xl">
                  Your Order
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close cart"
                  className="text-soghaat-muted hover:text-soghaat-cream transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <span className="text-2xl shrink-0" aria-hidden>
                      {item.emoji}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-soghaat-cream text-sm font-medium truncate">
                        {item.name}
                      </p>
                      <p className="text-soghaat-gold text-xs">
                        Rs {(item.price * item.qty).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        aria-label={`Decrease ${item.name} quantity`}
                        className="w-7 h-7 rounded-full bg-soghaat-panel border border-soghaat-border text-soghaat-cream flex items-center justify-center hover:border-soghaat-gold transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-soghaat-cream text-sm w-5 text-center tabular-nums">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        aria-label={`Increase ${item.name} quantity`}
                        className="w-7 h-7 rounded-full bg-soghaat-gold text-soghaat-bg flex items-center justify-center hover:bg-soghaat-gold/90 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-6 py-5 border-t border-soghaat-border shrink-0">
                <div className="flex justify-between mb-4">
                  <span className="text-soghaat-muted text-sm">Subtotal</span>
                  <span className="text-soghaat-cream font-semibold">
                    PKR {total.toLocaleString()}
                  </span>
                </div>
                <Button
                  onClick={handlePlaceOrder}
                  className="w-full bg-soghaat-gold text-soghaat-bg hover:bg-soghaat-gold/90 rounded-full h-11 font-semibold"
                >
                  Place Order
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Dialog open={orderPlaced} onOpenChange={setOrderPlaced}>
        <DialogContent
          showCloseButton={false}
          className="bg-soghaat-surface border-soghaat-border text-soghaat-cream max-w-sm"
        >
          <DialogHeader>
            <div className="text-5xl text-center mb-2">🎵</div>
            <DialogTitle className="font-display text-soghaat-gold text-2xl text-center">
              Order Placed!
            </DialogTitle>
          </DialogHeader>
          <p className="text-soghaat-cream/80 text-center text-sm leading-relaxed">
            We&apos;ll call to confirm your order soon.
            <br />
            <span className="text-soghaat-gold font-medium">
              0316 7676423
            </span>
          </p>
          <Button
            onClick={() => setOrderPlaced(false)}
            className="w-full bg-soghaat-gold text-soghaat-bg hover:bg-soghaat-gold/90 rounded-full mt-2"
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
