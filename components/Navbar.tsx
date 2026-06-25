"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Menu", href: "/menu" },
  { label: "Contact", href: "/contact" },
  { label: "Reserve", href: "/reserve" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    return scrollY.on("change", (y) => setIsScrolled(y > 60));
  }, [scrollY]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-soghaat-bg/90 backdrop-blur-md border-b border-soghaat-border"
            : "bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 relative">
            <Link
              href="/"
              className="font-display text-xl text-soghaat-gold tracking-[0.15em] z-10"
              aria-label="Soghaat Restaurant — Home"
            >
              SOGHAAT
            </Link>

            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm text-soghaat-cream/80 hover:text-soghaat-gold transition-colors py-1"
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-soghaat-gold rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center z-10">
              <Link href="/reserve">
                <Button className="rounded-full bg-soghaat-gold text-soghaat-bg hover:bg-soghaat-gold/90 px-5 h-9 text-sm font-semibold">
                  Reserve a Table
                </Button>
              </Link>
            </div>

            <button
              className="md:hidden text-soghaat-cream z-10 p-1"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReducedMotion ? {} : { opacity: 0 }}
              className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-soghaat-gold/60 to-transparent"
            />
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed inset-0 bg-soghaat-bg z-40 flex flex-col pt-24 px-8 md:hidden"
            role="dialog"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    className={`block text-3xl font-display py-3 border-b border-soghaat-border/50 transition-colors ${
                      pathname === link.href
                        ? "text-soghaat-gold"
                        : "text-soghaat-cream hover:text-soghaat-gold"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-8">
              <Link href="/reserve">
                <Button className="w-full rounded-full bg-soghaat-gold text-soghaat-bg hover:bg-soghaat-gold/90 h-12 text-base font-semibold">
                  Reserve a Table
                </Button>
              </Link>
            </div>
            <div className="mt-8 text-soghaat-muted text-sm">
              <p>📞 0316 7676423</p>
              <p className="mt-1">Open daily till 2 AM</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
