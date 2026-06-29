"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const stats = [
  { value: 12, suffix: "", label: "Modules Connected", desc: "One organism" },
  { value: 3, suffix: " roles", label: "User Types", desc: "Owner · Barista · Customer" },
  { value: 99, suffix: "%", label: "Uptime Target", desc: "Always on" },
  { value: 60, suffix: "fps", label: "3D Floor Map", desc: "Three.js powered" },
];

function animateCounter(el: HTMLElement, target: number, suffix: string) {
  const obj = { value: 0 };
  gsap.to(obj, {
    value: target,
    duration: 2,
    ease: "power2.out",
    onUpdate: () => {
      el.textContent = Math.round(obj.value) + suffix;
    },
  });
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const countersStarted = useRef(false);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Set initial state without inline styles
      gsap.set(".stats-card", { y: 40, opacity: 0 });

      // Section reveal
      gsap.to(".stats-card", {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
          onEnter: () => {
            if (countersStarted.current || prefersReducedMotion) return;
            countersStarted.current = true;
            // Start counters
            document.querySelectorAll<HTMLElement>(".counter-value").forEach((el) => {
              const target = Number(el.dataset.target);
              const suffix = el.dataset.suffix ?? "";
              if (prefersReducedMotion) {
                el.textContent = target + suffix;
              } else {
                animateCounter(el, target, suffix);
              }
            });
          },
        },
      });

      // Decorative line grow
      gsap.from(".stats-divider", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-40 px-6 md:px-12 bg-[var(--crema-espresso-900)]"
      aria-label="Platform statistics"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className="stats-divider w-full h-px mb-20"
          style={{ backgroundColor: "oklch(1 0 0 / 8%)" }}
          aria-hidden="true"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stats-card flex flex-col gap-2"
            >
              <div
                className="counter-value font-display text-[clamp(3rem,6vw,5rem)] font-bold leading-none"
                style={{ color: "var(--crema-cream-100)" }}
                data-target={stat.value}
                data-suffix={stat.suffix}
                aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
              >
                0{stat.suffix}
              </div>
              <div className="font-medium text-sm text-[var(--crema-cream-200)]">
                {stat.label}
              </div>
              <div className="font-mono-code text-[10px] uppercase tracking-[0.15em] text-[var(--crema-cream-300)] opacity-60">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>

        <div
          className="stats-divider w-full h-px mt-20"
          style={{ backgroundColor: "oklch(1 0 0 / 8%)" }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
