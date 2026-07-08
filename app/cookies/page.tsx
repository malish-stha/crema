import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";

export default function CookiesPage() {
  return (
    <main className="bg-[var(--crema-espresso-900)] min-h-[100dvh] flex flex-col justify-between">
      <Nav />
      <div className="flex-1 max-w-3xl mx-auto px-6 py-32 md:py-48">
        <Link href="/" className="font-mono text-xs text-[var(--crema-terracotta)] hover:underline mb-8 inline-block">
          ← Back to home
        </Link>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--crema-cream-100)] tracking-tighter mb-4">
          Cookie Policy
        </h1>
        <p className="font-mono text-xs text-[var(--crema-cream-300)] opacity-50 mb-12">
          Last updated: July 8, 2026
        </p>

        <div className="space-y-10 text-[var(--crema-cream-300)] text-sm md:text-base leading-relaxed">
          <section>
            <h2 className="font-display text-xl md:text-2xl font-semibold text-[var(--crema-cream-100)] mb-4">
              What are Cookies
            </h2>
            <p>
              Cookies are small text files that your browser stores on your phone or computer. They help browser sessions remember preferences and stay authenticated.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl md:text-2xl font-semibold text-[var(--crema-cream-100)] mb-4">
              Necessary Cookies
            </h2>
            <p className="mb-4">
              We use necessary cookies to hold active table orders and manager sessions.
            </p>
            <p>
              Disabling these cookies in your browser settings will prevent you from placing digital orders or logging into the barista KDS dashboard.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl md:text-2xl font-semibold text-[var(--crema-cream-100)] mb-4">
              Preferences and Analytics
            </h2>
            <p>
              We use preference cookies to remember your language choice and dark mode toggle. We use anonymous analytics cookies to track visitor patterns on our marketing website.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl md:text-2xl font-semibold text-[var(--crema-cream-100)] mb-4">
              Managing Cookies
            </h2>
            <p>
              You can block or delete cookies via your browser settings. Consult the help menu of your browser to adjust your cookie preferences.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
