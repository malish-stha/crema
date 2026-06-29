"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const menuItems = [
  { name: "Single Origin Pour-Over", price: "Rs. 280", category: "Filter Coffee", tag: "Signature" },
  { name: "Cardamom Flat White", price: "Rs. 220", category: "Espresso", tag: "Best Seller" },
  { name: "Cascara Cold Brew", price: "Rs. 350", category: "Cold Coffee", tag: "Seasonal" },
  { name: "Brown Butter Latte", price: "Rs. 310", category: "Espresso", tag: null },
  { name: "Oat Matcha Cloud", price: "Rs. 290", category: "Matcha", tag: "New" },
  { name: "Ethiopian Natural V60", price: "Rs. 320", category: "Filter Coffee", tag: null },
];

export function MenuPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      // Background parallax (different speed from text = depth)
      gsap.to(bgRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Text block moves slower (creates parallax depth)
      gsap.from(textRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      // Menu item stagger reveal
      ScrollTrigger.batch(".menu-item-row", {
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: "power2.out" }
          ),
        once: true,
        start: "top 85%",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="relative py-32 md:py-40 overflow-hidden bg-[var(--crema-espresso-800)]"
      aria-labelledby="menu-heading"
    >
      {/* Parallax atmospheric bg */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        aria-hidden="true"
      >
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, var(--crema-terracotta) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-8"
          style={{
            background: "radial-gradient(circle, var(--crema-gold) 0%, transparent 70%)",
            filter: "blur(120px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Header */}
          <div ref={textRef}>
            <div className="eyebrow-badge mb-6">Digital Menu · Module 01</div>
            <h2
              id="menu-heading"
              className="font-display text-[clamp(2.5rem,4.5vw,3.5rem)] font-bold text-[var(--crema-cream-100)] leading-tight mb-6"
            >
              Your menu, alive and always current.
            </h2>
            <p className="text-lg text-[var(--crema-cream-300)] leading-relaxed mb-8">
              When a barista marks an item out of stock on the KDS, it disappears
              from the customer menu in under a second. No manual updates. No awkward
              &ldquo;sorry, we&apos;re out of that&rdquo; conversations.
            </p>
            <a
              href="#features"
              className="inline-flex items-center gap-2 text-[var(--crema-terracotta)] font-medium hover:text-[var(--crema-terracotta-l)] transition-colors duration-200"
            >
              See all 12 modules
              <span className="text-lg">→</span>
            </a>
          </div>

          {/* Right: Menu items list */}
          <div className="space-y-0">
            {menuItems.map((item, i) => (
              <div
                key={i}
                className="menu-item-row group flex items-center justify-between py-5 border-b last:border-b-0"
                style={{
                  borderColor: "oklch(1 0 0 / 8%)",
                  opacity: 0, // initial state for GSAP
                }}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-[var(--crema-cream-100)] font-medium group-hover:text-[var(--crema-terracotta)] transition-colors duration-200">
                      {item.name}
                    </span>
                    {item.tag && (
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-medium"
                        style={{
                          backgroundColor: "var(--crema-terracotta)",
                          color: "var(--crema-cream-100)",
                          opacity: 0.9,
                        }}
                      >
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <span className="font-mono-code text-xs text-[var(--crema-cream-300)] uppercase tracking-wider mt-1 block">
                    {item.category}
                  </span>
                </div>
                <span className="font-mono-code text-[var(--crema-cream-200)] font-medium">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
