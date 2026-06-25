import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Menu", href: "/menu" },
  { label: "Contact", href: "/contact" },
  { label: "Reserve", href: "/reserve" },
];

export default function Footer() {
  return (
    <footer className="bg-soghaat-bg border-t-2 border-soghaat-border relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, #C9962A, transparent)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="font-display text-2xl text-soghaat-gold tracking-[0.15em] mb-3">
              SOGHAAT
            </p>
            <p className="text-soghaat-muted text-sm leading-relaxed max-w-xs">
              Taste You&apos;ll Always Remember. Multan&apos;s most beloved
              family restaurant — where every meal is a gift.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.youtube.com/@soghaatrestaurants"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Soghaat on YouTube"
                className="text-soghaat-muted hover:text-soghaat-gold transition-colors text-sm"
              >
                YouTube
              </a>
              <a
                href="https://www.facebook.com/soghaatrestaurants"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Soghaat on Facebook"
                className="text-soghaat-muted hover:text-soghaat-gold transition-colors text-sm"
              >
                Facebook
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-soghaat-cream text-lg mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-soghaat-muted hover:text-soghaat-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-soghaat-cream text-lg mb-5">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-soghaat-muted">
              <li className="leading-relaxed">
                Near Awan Chowk, Head Muhammad Wala Road, Multan
              </li>
              <li>
                <a
                  href="tel:+923167676423"
                  className="hover:text-soghaat-gold transition-colors"
                >
                  📞 0316 7676423
                </a>
              </li>
              <li>
                <a
                  href="mailto:soghaatrestaurants@gmail.com"
                  className="hover:text-soghaat-gold transition-colors break-all"
                >
                  ✉️ soghaatrestaurants@gmail.com
                </a>
              </li>
              <li>🕑 Open daily till 2 AM</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-soghaat-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-soghaat-muted text-xs">
            © 2024 Soghaat Restaurant, Multan. All rights reserved.
          </p>
          <p className="text-soghaat-muted text-xs">
            Multan&apos;s Most Beloved Family Restaurant
          </p>
        </div>
      </div>
    </footer>
  );
}
