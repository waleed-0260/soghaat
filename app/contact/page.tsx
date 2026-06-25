"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const set = (key: keyof typeof form) => (val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you shortly.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <>
      {/* ── Header ────────────────────────────────────────── */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-soghaat-bg text-center">
        <SectionWrapper>
          <p className="text-soghaat-gold text-xs tracking-[0.25em] uppercase font-medium mb-4">
            We&apos;d Love to Hear From You
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-soghaat-cream mb-4">
            Get In Touch
          </h1>
          <p className="text-soghaat-muted max-w-md mx-auto">
            Have a question, feedback, or want to plan a special event? Reach
            out and we&apos;ll respond promptly.
          </p>
        </SectionWrapper>
      </section>

      {/* ── Form + Info ───────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-soghaat-bg">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3">
              <SectionWrapper>
                <div className="bg-soghaat-surface rounded-2xl p-6 md:p-8 border border-soghaat-border">
                  <h2 className="font-display text-soghaat-cream text-2xl mb-6">
                    Send a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-soghaat-cream/80 text-sm mb-1.5"
                        >
                          Full Name *
                        </label>
                        <Input
                          id="contact-name"
                          required
                          placeholder="Your name"
                          value={form.name}
                          onChange={(e) => set("name")(e.target.value)}
                          className="bg-soghaat-panel border-soghaat-border text-soghaat-cream placeholder:text-soghaat-muted focus-visible:border-soghaat-gold focus-visible:ring-soghaat-gold/20 h-10 w-full"
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-soghaat-cream/80 text-sm mb-1.5"
                        >
                          Phone
                        </label>
                        <Input
                          id="contact-phone"
                          type="tel"
                          placeholder="03xx xxxxxxx"
                          value={form.phone}
                          onChange={(e) => set("phone")(e.target.value)}
                          className="bg-soghaat-panel border-soghaat-border text-soghaat-cream placeholder:text-soghaat-muted focus-visible:border-soghaat-gold focus-visible:ring-soghaat-gold/20 h-10 w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-soghaat-cream/80 text-sm mb-1.5"
                      >
                        Email *
                      </label>
                      <Input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => set("email")(e.target.value)}
                        className="bg-soghaat-panel border-soghaat-border text-soghaat-cream placeholder:text-soghaat-muted focus-visible:border-soghaat-gold focus-visible:ring-soghaat-gold/20 h-10 w-full"
                        aria-required="true"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-soghaat-cream/80 text-sm mb-1.5"
                      >
                        Message *
                      </label>
                      <Textarea
                        id="contact-message"
                        required
                        placeholder="Your message..."
                        value={form.message}
                        onChange={(e) => set("message")(e.target.value)}
                        rows={5}
                        className="bg-soghaat-panel border-soghaat-border text-soghaat-cream placeholder:text-soghaat-muted focus-visible:border-soghaat-gold focus-visible:ring-soghaat-gold/20 resize-none w-full"
                        aria-required="true"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-soghaat-gold text-soghaat-bg hover:bg-soghaat-gold/90 rounded-full h-11 font-semibold text-base"
                    >
                      Send Message
                    </Button>
                  </form>
                </div>
              </SectionWrapper>
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-4">
              <SectionWrapper>
                <div className="bg-soghaat-surface rounded-2xl p-6 border border-soghaat-border">
                  <h2 className="font-display text-soghaat-gold text-xl mb-5">
                    Contact Details
                  </h2>
                  <div className="space-y-4 text-sm">
                    <div className="flex gap-3">
                      <span className="text-soghaat-gold text-base shrink-0">📍</span>
                      <div>
                        <p className="text-soghaat-cream font-medium mb-0.5">Address</p>
                        <p className="text-soghaat-muted leading-relaxed">
                          Near Awan Chowk, Head Muhammad Wala Road, Multan
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-soghaat-gold text-base shrink-0">📞</span>
                      <div>
                        <p className="text-soghaat-cream font-medium mb-0.5">Phone</p>
                        <a
                          href="tel:+923167676423"
                          className="text-soghaat-muted hover:text-soghaat-gold transition-colors"
                        >
                          0316 7676423
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-soghaat-gold text-base shrink-0">✉️</span>
                      <div>
                        <p className="text-soghaat-cream font-medium mb-0.5">Email</p>
                        <a
                          href="mailto:soghaatrestaurants@gmail.com"
                          className="text-soghaat-muted hover:text-soghaat-gold transition-colors break-all"
                        >
                          soghaatrestaurants@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-soghaat-gold text-base shrink-0">🕑</span>
                      <div>
                        <p className="text-soghaat-cream font-medium mb-0.5">Hours</p>
                        <p className="text-soghaat-muted">Open daily till 2 AM</p>
                        <p className="text-soghaat-muted">Delivery ends 1:30 AM</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-soghaat-surface rounded-2xl p-6 border border-soghaat-border mt-4">
                  <h3 className="font-display text-soghaat-cream text-lg mb-4">
                    Follow Us
                  </h3>
                  <div className="flex flex-col gap-2">
                    <a
                      href="https://www.youtube.com/@soghaatrestaurants"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-soghaat-muted hover:text-soghaat-gold transition-colors text-sm"
                      aria-label="Soghaat on YouTube"
                    >
                      <span>▶️</span> @soghaatrestaurants
                    </a>
                    <a
                      href="https://www.facebook.com/soghaatrestaurants"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-soghaat-muted hover:text-soghaat-gold transition-colors text-sm"
                      aria-label="Soghaat on Facebook"
                    >
                      <span>📘</span> soghaatrestaurants
                    </a>
                  </div>
                </div>
              </SectionWrapper>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map ───────────────────────────────────────────── */}
      <LocationMap />
    </>
  );
}
