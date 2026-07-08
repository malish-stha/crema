import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="bg-[var(--crema-espresso-900)] min-h-[100dvh] flex flex-col justify-between">
      <Nav />
      <div className="flex-1 max-w-3xl mx-auto px-6 py-32 md:py-48">
        <Link href="/" className="font-mono text-xs text-[var(--crema-terracotta)] hover:underline mb-8 inline-block">
          ← Back to home
        </Link>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--crema-cream-100)] tracking-tighter mb-4">
          Terms of Service
        </h1>
        <p className="font-mono text-xs text-[var(--crema-cream-300)] opacity-50 mb-12">
          Last updated: July 8, 2026
        </p>

        <div className="space-y-10 text-[var(--crema-cream-300)] text-sm md:text-base leading-relaxed">
          <section>
            <h2 className="font-display text-xl md:text-2xl font-semibold text-[var(--crema-cream-100)] mb-4">
              Agreement to Terms
            </h2>
            <p>
              By creating a CafeOS account, you agree to these Terms. If you manage a café, you confirm you have authority to bind the business to this agreement.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl md:text-2xl font-semibold text-[var(--crema-cream-100)] mb-4">
              Account Responsibilities
            </h2>
            <p className="mb-4">
              You must maintain the security of your staff logins and manager passwords. You are responsible for all actions taken under your account credentials.
            </p>
            <p>
              We provide QR codes for tables. You must secure physical access to these codes to prevent guest disruption.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl md:text-2xl font-semibold text-[var(--crema-cream-100)] mb-4">
              Uptime and Services
            </h2>
            <p>
              We aim for continuous service availability. However, local internet failures or power drops in your café will affect menu display and KDS sync. You must arrange backup offline operational procedures.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl md:text-2xl font-semibold text-[var(--crema-cream-100)] mb-4">
              Fees and Billing
            </h2>
            <p>
              Subscribers pay monthly fees based on selected operating modules. We process refunds only when system failures prevent transaction logging for over twelve consecutive hours.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
