"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const testimonials = [
  {
    quote: "We cut our manual closing tasks by 40 minutes every night. The checklist module alone paid for the subscription.",
    author: "Priya Shrestha",
    role: "Owner, Himalayan Brew · Kathmandu",
    initials: "PS",
    accent: "var(--crema-terracotta)",
  },
  {
    quote: "The KDS is a game changer. My baristas no longer shout across the counter. Everything is silent and clear.",
    author: "Bikash Tamang",
    role: "Head Barista, Cloud Nine Coffee",
    initials: "BT",
    accent: "var(--crema-gold)",
  },
  {
    quote: "Our loyalty program grew 3× in 2 months just from the automated birthday coupons. Customers love it.",
    author: "Sunita Rai",
    role: "Owner, Third Wave Pokhara",
    initials: "SR",
    accent: "oklch(0.68 0.14 200)",
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        gsap.set(".testimonial-card", { opacity: 1, y: 0 });
        return;
      }

      // Z-axis stacked cascade reveal
      ScrollTrigger.batch(".testimonial-card", {
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { y: 80, opacity: 0, rotateX: 8, filter: "blur(4px)" },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              filter: "blur(0px)",
              stagger: 0.15,
              duration: 1,
              ease: "power3.out",
            }
          ),
        once: true,
        start: "top 85%",
      });

      // Heading reveal
      gsap.from(".testimonials-heading", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-32 md:py-40 px-6 md:px-12 bg-[var(--crema-espresso-800)]"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="testimonials-heading mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="eyebrow-badge mb-4">Early Access Café Owners</div>
            <h2
              id="testimonials-heading"
              className="font-display text-[clamp(2.5rem,4.5vw,3.5rem)] font-bold text-[var(--crema-cream-100)] leading-tight max-w-xl"
            >
              The cafés already running on Crema.
            </h2>
          </div>
          <p className="text-[var(--crema-cream-300)] max-w-xs text-sm leading-relaxed">
            Real feedback from café owners using BrewOS in early access across Nepal.
          </p>
        </div>

        {/* Testimonial cards — Z-axis cascade */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5" style={{ perspective: "1000px" }}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card"
            >
              <div className="bezel-outer h-full">
                <div className="bezel-inner h-full p-7 flex flex-col justify-between gap-8">
                  {/* Quote mark */}
                  <div
                    className="font-display text-5xl font-bold leading-none"
                    style={{ color: t.accent, opacity: 0.4 }}
                    aria-hidden="true"
                  >
                    &ldquo;
                  </div>

                  {/* Quote text */}
                  <p className="text-[var(--crema-cream-200)] text-base leading-relaxed flex-1">
                    {t.quote}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-[var(--crema-cream-100)] shrink-0"
                      style={{ backgroundColor: t.accent, opacity: 0.9 }}
                      aria-hidden="true"
                    >
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[var(--crema-cream-100)]">
                        {t.author}
                      </div>
                      <div className="font-mono-code text-[10px] text-[var(--crema-cream-300)] uppercase tracking-wider">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
