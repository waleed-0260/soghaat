import type { Metadata } from "next";
import { Yeseva_One, DM_Sans } from "next/font/google";
import "./globals.css";
import { OrderProvider } from "@/context/OrderContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderCart from "@/components/OrderCart";
import { Toaster } from "sonner";

const yesevaOne = Yeseva_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-yeseva-one",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Soghaat Restaurant — Multan's Most Beloved Family Restaurant",
  description:
    "Experience 344 dishes spanning Turkish, Desi, BBQ, Chinese, and Continental cuisine at Soghaat Restaurant. Live music, magic shows, and family-friendly fireside ambiance near Awan Chowk, Multan.",
  keywords:
    "Soghaat Restaurant, Multan restaurant, Turkish food Multan, BBQ Multan, family restaurant Multan, Awan Chowk restaurant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${yesevaOne.variable} ${dmSans.variable}`}>
      <body className="bg-soghaat-bg text-soghaat-cream antialiased min-h-screen flex flex-col">
        <OrderProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <OrderCart />
          <Toaster
            theme="dark"
            richColors
            position="top-right"
            toastOptions={{
              style: {
                background: "#181208",
                border: "1px solid #2E2318",
                color: "#F5EDD8",
              },
            }}
          />
        </OrderProvider>
      </body>
    </html>
  );
}
