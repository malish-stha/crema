import Link from "next/link";

const footerLinks = {
  Platform: ["Digital Menu", "Barista KDS", "3D Floor Map", "Loyalty CRM", "Analytics"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export function Footer() {
  return (
    <footer
      className="bg-[var(--crema-espresso-800)] border-t"
      style={{ borderColor: "oklch(1 0 0 / 8%)" }}
      aria-label="Site footer"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-24">
        {/* Top: Brand + links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="font-display text-2xl font-bold text-[var(--crema-cream-100)] block mb-4"
              aria-label="Crema home"
            >
              crema
            </Link>
            <p className="text-sm text-[var(--crema-cream-300)] leading-relaxed max-w-[200px]">
              The café management OS for independent coffee shops.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--crema-terracotta)" }}
                aria-hidden="true"
              />
              <span className="font-mono-code text-[10px] uppercase tracking-[0.15em] text-[var(--crema-cream-300)]">
                Early Access Open
              </span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="font-mono-code text-[10px] uppercase tracking-[0.2em] text-[var(--crema-cream-300)] mb-5">
                {group}
              </h3>
              <ul className="space-y-3" role="list">
                {links.map((link) => (
                  <li key={link} role="listitem">
                    <a
                      href="#"
                      className="text-sm text-[var(--crema-cream-300)] hover:text-[var(--crema-cream-100)] transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom: copyright + tagline */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t"
          style={{ borderColor: "oklch(1 0 0 / 8%)" }}
        >
          <p className="font-mono-code text-[11px] text-[var(--crema-cream-300)] opacity-50">
            © {new Date().getFullYear()} BrewOS / Crema. Built in Nepal.
          </p>
          <p className="font-display text-sm italic text-[var(--crema-cream-300)] opacity-40">
            &ldquo;Every great cup starts with great ops.&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
