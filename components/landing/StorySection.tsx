"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const chapters = [
  {
    number: "01",
    label: "The Problem",
    title: "Twelve tabs for one espresso",
    body: "The average café owner juggles inventory on spreadsheets, schedules on WhatsApp, and sales data in their head. We built Crema because the best coffee shouldn't come with the worst software.",
  },
  {
    number: "02",
    label: "The Insight",
    title: "Everything connects. Your tools shouldn't.",
    body: "An out-of-stock item should vanish from the menu instantly. A bad review should trigger a loyalty coupon. Tip totals should flow into staff payroll automatically. Crema sees the whole organism.",
  },
  {
    number: "03",
    label: "The Vision",
    title: "Built for the craft, not the spreadsheet",
    body: "Starting in Nepal, scaling globally. One white-label platform that an independent café owner can brand as their own, give to their baristas, and hand to their customers — all from a single codebase.",
  },
];

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      if (prefersReducedMotion) return;

      // Horizontal scroll pin (gsap-scrolltrigger: pin + scrub)
      const totalWidth = track.scrollWidth - section.offsetWidth;

      gsap.to(track, {
        x: () => -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Stagger chapter reveals as they enter view
      const cards = track.querySelectorAll(".chapter-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            once: true,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="story"
      className="overflow-hidden bg-[var(--crema-espresso-900)]"
      aria-label="Our story"
    >
      <div ref={trackRef} className="flex will-change-transform" style={{ width: "300vw" }}>
        {chapters.map((ch, i) => (
          <div
            key={i}
            className="chapter-card w-screen min-h-[100dvh] flex items-center px-8 md:px-24"
          >
            <div className="max-w-2xl">
              {/* Chapter label */}
              <div className="eyebrow-badge mb-8">
                <span className="font-mono-code">{ch.number}</span>
                &nbsp;/&nbsp;{ch.label}
              </div>

              {/* Title */}
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-[var(--crema-cream-100)] leading-tight mb-6">
                {ch.title}
              </h2>

              {/* Body */}
              <p className="text-lg text-[var(--crema-cream-300)] leading-relaxed max-w-lg">
                {ch.body}
              </p>

              {/* Progress indicator */}
              <div className="mt-16 flex items-center gap-3" aria-hidden="true">
                {chapters.map((_, j) => (
                  <div
                    key={j}
                    className="h-px transition-all duration-500"
                    style={{
                      width: j === i ? "3rem" : "1.5rem",
                      backgroundColor:
                        j === i
                          ? "var(--crema-terracotta)"
                          : "oklch(1 0 0 / 20%)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
