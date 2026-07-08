"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      // Set initial state via GSAP (not inline style) — ensures visible without JS
      gsap.set(".cta-heading-line", { y: 40, opacity: 0 });
      gsap.set(".cta-body", { y: 20, opacity: 0 });
      gsap.set(".cta-btn", { scale: 0.9, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(".cta-heading-line", { y: 0, opacity: 1, stagger: 0.1, duration: 1 })
        .to(".cta-body", { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
        .to(".cta-btn", { scale: 1, opacity: 1, duration: 0.7 }, "-=0.4");

      // Ambient glow pulse
      gsap.to(".cta-glow", {
        scale: 1.15,
        opacity: 0.5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: sectionRef }
  );

  // Magnetic button — subtle position tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.4, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-40 md:py-56 px-6 md:px-12 overflow-hidden bg-[var(--crema-espresso-900)]"
      aria-labelledby="cta-heading"
    >
      {/* Ambient glow */}
      <div
        className="cta-glow absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.62 0.14 50 / 18%) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="eyebrow-badge mb-10 mx-auto w-fit">Limited Early Access · Nepal</div>

        <h2
          id="cta-heading"
          className="font-display text-[clamp(3rem,7vw,5.5rem)] font-bold leading-none mb-8"
        >
          <div className="cta-heading-line text-[var(--crema-cream-100)]">
            Your café deserves
          </div>
          <div className="cta-heading-line text-[var(--crema-terracotta)] mt-1">
            better software.
          </div>
        </h2>

        <p className="cta-body text-lg text-[var(--crema-cream-300)] max-w-lg mx-auto mb-12 leading-relaxed">
          Join the waitlist. We onboard independent cafés across Kathmandu,
          Pokhara, and beyond, one neighbourhood at a time.
        </p>

        {/* Magnetic CTA button */}
        <a
          ref={btnRef}
          href="#"
          className="cta-btn group inline-flex items-center gap-4 px-8 py-5 rounded-full bg-[var(--crema-terracotta)] text-[var(--crema-cream-100)] font-medium text-lg will-change-transform"
          style={{
            transition: "background-color 350ms cubic-bezier(0.32,0.72,0,1)",
            boxShadow: "0 0 0 1px oklch(1 0 0 / 8%), 0 8px 32px oklch(0.62 0.14 50 / 30%)",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--crema-terracotta-l)";
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--crema-terracotta)";
          }}
          aria-label="Join the early access waitlist"
        >
          Join the Waitlist
          {/* Button-in-button trailing icon */}
          <span
            className="w-9 h-9 rounded-full bg-black/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px"
            aria-hidden="true"
          >
            →
          </span>
        </a>

        <p className="mt-6 font-mono-code text-[10px] uppercase tracking-[0.2em] text-[var(--crema-cream-300)] opacity-50">
          No credit card · Cancel any time
        </p>
      </div>
    </section>
  );
}
