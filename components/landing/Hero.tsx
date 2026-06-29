"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        // Instantly show everything without animation
        gsap.set(
          [
            badgeRef.current,
            line1Ref.current?.querySelectorAll(".word-inner"),
            line2Ref.current?.querySelectorAll(".word-inner"),
            subRef.current,
            ctaRef.current,
            overlayRef.current,
          ],
          { opacity: 1, y: 0, filter: "blur(0px)" }
        );
        return;
      }

      // ─── Hero intro timeline (gsap-timeline skill) ───
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.2,
      });

      // Fade out initial overlay
      tl.to(overlayRef.current, { opacity: 0, duration: 0.6, ease: "power2.inOut" });

      // Badge appears
      tl.from(
        badgeRef.current,
        { y: 12, opacity: 0, duration: 0.6 },
        "-=0.2"
      );

      // Line 1 words cascade up from clip
      const words1 = line1Ref.current?.querySelectorAll(".word-inner");
      if (words1) {
        tl.to(
          words1,
          { y: 0, duration: 1, stagger: 0.08, ease: "power4.out" },
          "<0.1"
        );
      }

      // Line 2 words follow
      const words2 = line2Ref.current?.querySelectorAll(".word-inner");
      if (words2) {
        tl.to(
          words2,
          { y: 0, duration: 1, stagger: 0.08, ease: "power4.out" },
          "<0.15"
        );
      }

      // Subtext
      tl.from(
        subRef.current,
        { y: 20, opacity: 0, duration: 0.8, filter: "blur(4px)" },
        "-=0.5"
      );

      // CTA
      tl.from(
        ctaRef.current,
        { y: 16, opacity: 0, duration: 0.7, filter: "blur(4px)" },
        "-=0.4"
      );

      // ─── Hero image parallax (gsap-scrolltrigger skill) ───
      gsap.to(imageRef.current, {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,  // CLAUDE.md: use scrub: 1.5 for physical feel
        },
      });

      // ─── Text parallax (slower, creates depth) ───
      gsap.to(".hero-text-block", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // ─── Scroll indicator fade out ───
      gsap.to(".scroll-indicator", {
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "20% top",
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  // Helper to split text into word-inner spans
  const splitWords = (text: string) =>
    text.split(" ").map((word, i) => (
      <span key={i} className="word-split inline-block overflow-hidden mr-[0.22em] last:mr-0">
        <span className="word-inner inline-block" style={{ transform: "translateY(110%)" }}>
          {word}
        </span>
      </span>
    ));

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Initial page overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10 bg-[var(--crema-espresso-900)]"
      />

      {/* Background hero image with parallax */}
      <div
        ref={imageRef}
        className="absolute inset-0 will-change-transform"
        style={{ transform: "scale(1.1)" }}
      >
        {/* Layered gradient atmosphere */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 40%, oklch(0.22 0.04 50 / 40%) 0%, transparent 70%),
              linear-gradient(to bottom, oklch(0.08 0.012 52) 0%, oklch(0.12 0.016 50) 40%, oklch(0.08 0.012 52) 100%)
            `,
          }}
        />
        {/* Coffee steam rings — CSS radial glows for atmosphere */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, oklch(0.55 0.10 52) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background: "linear-gradient(to top, var(--crema-espresso-900), transparent)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Hero content */}
      <div className="hero-text-block relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        {/* Eyebrow badge */}
        <div ref={badgeRef} className="eyebrow-badge mb-10">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[var(--crema-terracotta)] inline-block"
            aria-hidden="true"
          />
          Now in early access · Nepal &amp; beyond
        </div>

        {/* Display headline — split into word-inner for mask reveal */}
        <h1 className="font-display" aria-label="The OS Behind Great Coffee">
          <div ref={line1Ref} className="text-[clamp(3rem,8vw,6rem)] font-bold text-[var(--crema-cream-100)] leading-none">
            {splitWords("The OS Behind")}
          </div>
          <div ref={line2Ref} className="text-[clamp(3rem,8vw,6rem)] font-bold leading-none mt-1">
            <span className="text-[var(--crema-terracotta)]">
              {splitWords("Great Coffee.")}
            </span>
          </div>
        </h1>

        {/* Subheading */}
        <p
          ref={subRef}
          className="mt-8 text-lg md:text-xl text-[var(--crema-cream-300)] max-w-xl leading-relaxed mx-auto"
        >
          Orders, baristas, inventory, loyalty, and analytics — all connected.
          One platform built for the independent café that refuses to be ordinary.
        </p>

        {/* CTA group */}
        <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#features"
            className="group flex items-center gap-3 px-7 py-4 rounded-full bg-[var(--crema-terracotta)] text-[var(--crema-cream-100)] font-medium text-base"
            style={{ transition: "all 400ms cubic-bezier(0.32,0.72,0,1)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--crema-terracotta-l)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--crema-terracotta)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
            }}
          >
            Explore the Platform
            <span className="w-7 h-7 rounded-full bg-black/25 flex items-center justify-center text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px">
              →
            </span>
          </a>
          <a
            href="#story"
            className="px-6 py-3.5 text-[var(--crema-cream-300)] text-sm hover:text-[var(--crema-cream-100)] transition-colors duration-200 underline underline-offset-4 decoration-white/20"
          >
            Our Story
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator mt-20 flex flex-col items-center gap-2 text-[var(--crema-cream-300)]">
          <span className="font-mono-code text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[var(--crema-cream-300)] to-transparent" />
        </div>
      </div>
    </section>
  );
}
