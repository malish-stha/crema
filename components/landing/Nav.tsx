"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

const navLinks = [
  { href: "#story", label: "Our Story" },
  { href: "#menu", label: "Menu" },
  { href: "#features", label: "Platform" },
  { href: "#testimonials", label: "Reviews" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  // Nav appears after hero intro settles (slight fade-down)
  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -24,
      opacity: 0,
      duration: 0.8,
      delay: 1.6,
      ease: "power3.out",
    });
  });

  // Mobile menu staggered reveal
  useGSAP(
    () => {
      const links = linksRef.current?.querySelectorAll(".mobile-link");
      if (!links) return;
      if (open) {
        gsap.to(overlayRef.current, {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.4,
          ease: "power2.out",
        });
        gsap.fromTo(
          links,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.07,
            duration: 0.6,
            delay: 0.1,
            ease: "power3.out",
          }
        );
      } else {
        gsap.to(overlayRef.current, {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.3,
          ease: "power2.in",
        });
      }
    },
    { scope: navRef, dependencies: [open] }
  );

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-6 left-0 right-0 z-40 flex justify-center opacity-0"
        aria-label="Primary navigation"
      >
        {/* Floating glass pill — outer bezel */}
        <div className="bezel-outer">
          <div className="bezel-inner flex items-center gap-1 px-5 py-3">
            {/* Logo */}
            <Link
              href="/"
              className="font-display text-base font-bold tracking-tight text-[var(--crema-cream-100)] mr-6 shrink-0"
              aria-label="Crema home"
            >
              crema
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1" role="list">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  role="listitem"
                  className="px-3 py-1.5 rounded-full text-sm text-[var(--crema-cream-300)] hover:text-[var(--crema-cream-100)] transition-colors duration-300 hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#features"
              className="hidden md:flex ml-4 items-center gap-2 px-4 py-2 rounded-full bg-[var(--crema-terracotta)] text-[var(--crema-cream-100)] text-sm font-medium transition-all duration-300 hover:bg-[var(--crema-terracotta-l)] hover:scale-[1.03] active:scale-[0.97]"
              style={{ transition: "all 350ms cubic-bezier(0.32,0.72,0,1)" }}
            >
              Get Early Access
              <span className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center text-xs group-hover:translate-x-0.5">
                →
              </span>
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setOpen((p) => !p)}
              className="md:hidden ml-3 w-9 h-9 flex flex-col items-center justify-center gap-1.5 relative"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span
                className="block w-5 h-0.5 bg-[var(--crema-cream-200)] origin-center transition-all duration-300"
                style={{
                  transform: open ? "rotate(45deg) translateY(4px)" : "none",
                }}
              />
              <span
                className="block w-5 h-0.5 bg-[var(--crema-cream-200)] transition-all duration-300"
                style={{
                  transform: open ? "rotate(-45deg) translateY(-4px)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-30 opacity-0 pointer-events-none"
        style={{
          backdropFilter: "blur(24px)",
          backgroundColor: "oklch(0.10 0.014 52 / 90%)",
        }}
        aria-hidden={!open}
      >
        <div
          ref={linksRef}
          className="flex flex-col items-center justify-center h-full gap-8"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="mobile-link font-display text-4xl font-bold text-[var(--crema-cream-100)] hover:text-[var(--crema-terracotta)] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#features"
            onClick={() => setOpen(false)}
            className="mobile-link mt-4 px-8 py-4 rounded-full bg-[var(--crema-terracotta)] text-[var(--crema-cream-100)] font-medium text-lg"
          >
            Get Early Access
          </a>
        </div>
      </div>
    </>
  );
}
