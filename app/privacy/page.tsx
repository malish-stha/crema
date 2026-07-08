import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="bg-[var(--crema-espresso-900)] min-h-[100dvh] flex flex-col justify-between">
      <Nav />
      <div className="flex-1 max-w-3xl mx-auto px-6 py-32 md:py-48">
        <Link href="/" className="font-mono text-xs text-[var(--crema-terracotta)] hover:underline mb-8 inline-block">
          ← Back to home
        </Link>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--crema-cream-100)] tracking-tighter mb-4">
          Privacy Policy
        </h1>
        <p className="font-mono text-xs text-[var(--crema-cream-300)] opacity-50 mb-12">
          Effective date: July 8, 2026
        </p>

        <div className="space-y-10 text-[var(--crema-cream-300)] text-sm md:text-base leading-relaxed">
          <section>
            <h2 className="font-display text-xl md:text-2xl font-semibold text-[var(--crema-cream-100)] mb-4">
              Information We Collect
            </h2>
            <p className="mb-4">
              We collect information to run your café operations. This includes menu details, staff rosters, transaction records, and inventory counts.
            </p>
            <p>
              When guests scan table QR codes or place orders, we collect their phone numbers, email addresses, and loyalty profiles. We store these details securely to manage visits and reward points.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl md:text-2xl font-semibold text-[var(--crema-cream-100)] mb-4">
              How We Use Data
            </h2>
            <p className="mb-4">
              We use collected information to route order tickets, sync live menu availability, and forecast stockouts.
            </p>
            <p>
              We draft customer promotion messages under your control. We do not distribute, sell, or rent customer lists to third-party advertisers.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl md:text-2xl font-semibold text-[var(--crema-cream-100)] mb-4">
              Data Security
            </h2>
            <p>
              We encrypt database fields containing names, phone numbers, and financial transactions. Signed QR codes prevent unauthorized table check-ins and session takeovers.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl md:text-2xl font-semibold text-[var(--crema-cream-100)] mb-4">
              Contact Us
            </h2>
            <p>
              Email privacy@brewos.app for queries regarding data deletion or database exports.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
