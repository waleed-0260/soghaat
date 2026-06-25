"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormState {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  requests: string;
}

const TIME_SLOTS: { value: string; label: string }[] = [];
for (let totalMins = 12 * 60; totalMins <= 25 * 60; totalMins += 30) {
  const h = Math.floor(totalMins / 60) % 24;
  const m = totalMins % 60;
  const period = h < 12 ? "AM" : "PM";
  const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
  TIME_SLOTS.push({
    value: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
    label: `${displayHour}:${String(m).padStart(2, "0")} ${period}`,
  });
}

const GUESTS = Array.from({ length: 20 }, (_, i) => String(i + 1));

const OCCASIONS = [
  { value: "regular", label: "Regular Dining" },
  { value: "birthday", label: "Birthday Celebration" },
  { value: "anniversary", label: "Anniversary" },
  { value: "corporate", label: "Corporate Event" },
];

export default function ReserveForm() {
  const prefersReducedMotion = useReducedMotion();
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    occasion: "regular",
    requests: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof FormState) => (val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Table reserved! See you at Soghaat 🎵");
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3 bg-soghaat-surface rounded-2xl p-6 md:p-8 border border-soghaat-border">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="text-6xl mb-4">🎵</div>
              <h3 className="font-display text-2xl text-soghaat-gold mb-2">
                Table Reserved!
              </h3>
              <p className="text-soghaat-cream/80 mb-6">
                See you at Soghaat. We&apos;ll confirm your booking shortly.
              </p>
              <Button
                onClick={() => setSubmitted(false)}
                className="bg-soghaat-gold text-soghaat-bg hover:bg-soghaat-gold/90 rounded-full px-8"
              >
                Make Another Reservation
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="res-name"
                    className="block text-soghaat-cream/80 text-sm mb-1.5"
                  >
                    Full Name *
                  </label>
                  <Input
                    id="res-name"
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
                    htmlFor="res-phone"
                    className="block text-soghaat-cream/80 text-sm mb-1.5"
                  >
                    Phone *
                  </label>
                  <Input
                    id="res-phone"
                    type="tel"
                    required
                    placeholder="03xx xxxxxxx"
                    value={form.phone}
                    onChange={(e) => set("phone")(e.target.value)}
                    className="bg-soghaat-panel border-soghaat-border text-soghaat-cream placeholder:text-soghaat-muted focus-visible:border-soghaat-gold focus-visible:ring-soghaat-gold/20 h-10 w-full"
                    aria-required="true"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="res-date"
                    className="block text-soghaat-cream/80 text-sm mb-1.5"
                  >
                    Date *
                  </label>
                  <Input
                    id="res-date"
                    type="date"
                    required
                    min={todayStr}
                    value={form.date}
                    onChange={(e) => set("date")(e.target.value)}
                    className="bg-soghaat-panel border-soghaat-border text-soghaat-cream focus-visible:border-soghaat-gold focus-visible:ring-soghaat-gold/20 h-10 w-full [color-scheme:dark]"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label
                    htmlFor="res-time"
                    className="block text-soghaat-cream/80 text-sm mb-1.5"
                  >
                    Time *
                  </label>
                  <Select
                    value={form.time}
                    onValueChange={set("time")}
                    required
                  >
                    <SelectTrigger
                      id="res-time"
                      className="bg-soghaat-panel border-soghaat-border text-soghaat-cream focus-visible:border-soghaat-gold h-10 w-full"
                      aria-required="true"
                    >
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="bg-soghaat-surface border-soghaat-border text-soghaat-cream max-h-60">
                      {TIME_SLOTS.map((slot) => (
                        <SelectItem
                          key={slot.value}
                          value={slot.value}
                          className="focus:bg-soghaat-panel focus:text-soghaat-cream"
                        >
                          {slot.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="res-guests"
                    className="block text-soghaat-cream/80 text-sm mb-1.5"
                  >
                    Guests *
                  </label>
                  <Select value={form.guests} onValueChange={set("guests")}>
                    <SelectTrigger
                      id="res-guests"
                      className="bg-soghaat-panel border-soghaat-border text-soghaat-cream focus-visible:border-soghaat-gold h-10 w-full"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-soghaat-surface border-soghaat-border text-soghaat-cream max-h-60">
                      {GUESTS.map((g) => (
                        <SelectItem
                          key={g}
                          value={g}
                          className="focus:bg-soghaat-panel focus:text-soghaat-cream"
                        >
                          {g} {Number(g) === 1 ? "Guest" : "Guests"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label
                    htmlFor="res-occasion"
                    className="block text-soghaat-cream/80 text-sm mb-1.5"
                  >
                    Occasion
                  </label>
                  <Select
                    value={form.occasion}
                    onValueChange={set("occasion")}
                  >
                    <SelectTrigger
                      id="res-occasion"
                      className="bg-soghaat-panel border-soghaat-border text-soghaat-cream focus-visible:border-soghaat-gold h-10 w-full"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-soghaat-surface border-soghaat-border text-soghaat-cream">
                      {OCCASIONS.map((o) => (
                        <SelectItem
                          key={o.value}
                          value={o.value}
                          className="focus:bg-soghaat-panel focus:text-soghaat-cream"
                        >
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="res-requests"
                  className="block text-soghaat-cream/80 text-sm mb-1.5"
                >
                  Special Requests
                </label>
                <Textarea
                  id="res-requests"
                  placeholder="Any dietary requirements, seating preferences, or special occasions..."
                  value={form.requests}
                  onChange={(e) => set("requests")(e.target.value)}
                  rows={3}
                  className="bg-soghaat-panel border-soghaat-border text-soghaat-cream placeholder:text-soghaat-muted focus-visible:border-soghaat-gold focus-visible:ring-soghaat-gold/20 resize-none w-full"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-soghaat-gold text-soghaat-bg hover:bg-soghaat-gold/90 rounded-full h-11 font-semibold text-base"
              >
                Reserve My Table
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="bg-soghaat-surface rounded-2xl p-6 border border-soghaat-border">
          <h3 className="font-display text-soghaat-gold text-xl mb-4">
            Visit Us
          </h3>
          <div className="space-y-4 text-sm">
            <div className="flex gap-3">
              <span className="text-soghaat-gold text-base">📍</span>
              <div>
                <p className="text-soghaat-cream font-medium">Address</p>
                <p className="text-soghaat-muted leading-relaxed">
                  Near Awan Chowk, Head Muhammad Wala Road, Multan
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-soghaat-gold text-base">📞</span>
              <div>
                <p className="text-soghaat-cream font-medium">Phone</p>
                <p className="text-soghaat-muted">0316 7676423</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-soghaat-gold text-base">✉️</span>
              <div>
                <p className="text-soghaat-cream font-medium">Email</p>
                <p className="text-soghaat-muted break-all">
                  soghaatrestaurants@gmail.com
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-soghaat-gold text-base">🕑</span>
              <div>
                <p className="text-soghaat-cream font-medium">Hours</p>
                <p className="text-soghaat-muted">Open daily till 2 AM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-soghaat-panel rounded-2xl p-5 border border-soghaat-border">
          <p className="text-soghaat-muted text-xs leading-relaxed">
            <span className="text-soghaat-gold font-medium">Note:</span> For
            large groups (10+) or private events, please call us directly at{" "}
            <span className="text-soghaat-cream">0316 7676423</span> so we can
            prepare the perfect experience for you.
          </p>
        </div>
      </div>
    </div>
  );
}
