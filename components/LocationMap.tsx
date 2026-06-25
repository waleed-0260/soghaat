export default function LocationMap() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-soghaat-bg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <p className="text-soghaat-gold text-xs tracking-[0.2em] uppercase font-medium mb-3">
            Find Us
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-soghaat-cream">
            Where To Find Us
          </h2>
        </div>

        <div className="rounded-2xl overflow-hidden border border-soghaat-border mb-8">
          <iframe
            src="https://maps.google.com/maps?q=Soghaat+Restaurant+Awan+Chowk+Head+Muhammad+Wala+Road+Multan&output=embed"
            width="100%"
            height="420"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Soghaat Restaurant Location"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-soghaat-surface rounded-xl p-6 border border-soghaat-border">
            <h3 className="font-display text-soghaat-gold text-lg mb-3">
              Address
            </h3>
            <p className="text-soghaat-cream/80 text-sm leading-relaxed">
              Near Awan Chowk, Head Muhammad Wala Road, Multan
            </p>
          </div>
          <div className="bg-soghaat-surface rounded-xl p-6 border border-soghaat-border">
            <h3 className="font-display text-soghaat-gold text-lg mb-3">
              Contact
            </h3>
            <p className="text-soghaat-cream/80 text-sm">
              Phone: 0316 7676423
            </p>
            <p className="text-soghaat-cream/80 text-sm mt-1">
              Email: soghaatrestaurants@gmail.com
            </p>
          </div>
          <div className="bg-soghaat-surface rounded-xl p-6 border border-soghaat-border">
            <h3 className="font-display text-soghaat-gold text-lg mb-3">
              Hours
            </h3>
            <p className="text-soghaat-cream/80 text-sm">
              Open daily till 2 AM
            </p>
            <p className="text-soghaat-cream/80 text-sm mt-1">
              Delivery ends 1:30 AM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
