"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ConnectionExplorer } from "./ConnectionExplorer";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const modules = [
  {
    id: "menu",
    num: "01",
    title: "Digital Menu & QR Ordering",
    desc: "Tableside dine-in and pre-arrival pickup. Custom modifiers, allergen badges, one-tap reorder.",
    accent: "oklch(0.62 0.14 50)",      // terracotta
    icon: "⬡",
    size: "md:col-span-2 md:row-span-1",
    connects: "KDS · CRM · Analytics",
  },
  {
    id: "kds",
    num: "02",
    title: "Barista KDS",
    desc: "Live colour-coded tickets. One-tap out-of-stock hides items from the menu instantly.",
    accent: "oklch(0.72 0.12 70)",      // amber
    icon: "◈",
    size: "md:col-span-1 md:row-span-1",
    connects: "Menu · Inventory",
  },
  {
    id: "floormap",
    num: "03 ⭐",
    title: "3D Interactive Floor Map",
    desc: "2.5D isometric view. Real-time table status — free, ordering, occupied. Tap a table to start a QR order session. Owner drag-and-drop edit mode.",
    accent: "oklch(0.70 0.18 160)",     // mint
    icon: "◉",
    size: "md:col-span-1 md:row-span-2",
    connects: "Menu · KDS",
    star: true,
  },
  {
    id: "crm",
    num: "04",
    title: "Customer CRM & Loyalty",
    desc: "Points, punch cards, birthday discounts, and 14-day re-engagement — automated.",
    accent: "oklch(0.68 0.14 200)",     // teal
    icon: "◐",
    size: "md:col-span-1 md:row-span-1",
    connects: "Analytics · Feedback",
  },
  {
    id: "inventory",
    num: "05",
    title: "Inventory & Suppliers",
    desc: "Track beans, milk, syrups. Critical stock pre-fills a reorder message to the supplier.",
    accent: "oklch(0.68 0.10 150)",     // sage
    icon: "◊",
    size: "md:col-span-1 md:row-span-1",
    connects: "KDS · Analytics",
  },
  {
    id: "staff",
    num: "06",
    title: "Staff & Shift Management",
    desc: "Weekly shift grid, swap requests, and a tip estimator that distributes proportionally by hours.",
    accent: "oklch(0.65 0.12 280)",     // lavender
    icon: "◫",
    size: "md:col-span-1 md:row-span-1",
    connects: "Analytics · Notifications",
  },
  {
    id: "feedback",
    num: "07 ⭐",
    title: "Feedback & Reputation Manager",
    desc: "4–5 stars → Google review prompt. 1–3 stars → private owner inbox. Resolved complaints auto-trigger apology coupons.",
    accent: "oklch(0.68 0.16 30)",      // burnt orange
    icon: "◬",
    size: "md:col-span-2 md:row-span-1",
    connects: "CRM · Notifications",
    star: true,
  },
  {
    id: "analytics",
    num: "08",
    title: "Analytics & AI Copilot",
    desc: "Peak hour charts, bestseller leaderboard, slow-mover alerts. AI drafts promos for your worst sellers.",
    accent: "oklch(0.70 0.13 260)",     // periwinkle
    icon: "◆",
    size: "md:col-span-2 md:row-span-1",
    connects: "Inventory · CRM · Menu",
  },
  {
    id: "notifications",
    num: "09",
    title: "Notification Center",
    desc: "One inbox for everything — low stock, bad reviews, shift swaps, loyalty milestones.",
    accent: "oklch(0.65 0.14 340)",     // rose
    icon: "◑",
    size: "md:col-span-1 md:row-span-1",
    connects: "← All modules",
  },
  {
    id: "checklist",
    num: "10",
    title: "Opening & Closing Checklist",
    desc: "Timestamped daily tasks. Missed closing items surface as next-morning notifications.",
    accent: "oklch(0.70 0.10 100)",     // lime
    icon: "◧",
    size: "md:col-span-1 md:row-span-1",
    connects: "Notifications",
  },
  {
    id: "history",
    num: "11",
    title: "Order History & Reorder",
    desc: "One-tap reorder sends past items straight to KDS and accrues loyalty points automatically.",
    accent: "oklch(0.65 0.12 230)",     // sky
    icon: "◩",
    size: "md:col-span-1 md:row-span-1",
    connects: "KDS · CRM · Loyalty",
  },
  {
    id: "cash",
    num: "12",
    title: "Daily Cash Reconciliation",
    desc: "End-of-day cash, card, and tip totals. Syncs to Analytics and flags discrepancies automatically.",
    accent: "oklch(0.65 0.09 60)",      // gold
    icon: "◰",
    size: "md:col-span-1 md:row-span-1",
    connects: "Analytics · Staff",
  },
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showExplorer, setShowExplorer] = useState(false);
  const explorerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      // Heading reveal
      gsap.from(".features-heading", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Staggered card reveals via ScrollTrigger.batch
      ScrollTrigger.batch(".feature-card", {
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { y: 56, opacity: 0, filter: "blur(6px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              stagger: 0.07,
              duration: 0.85,
              ease: "power3.out",
            }
          ),
        once: true,
        start: "top 88%",
      });
    },
    { scope: sectionRef }
  );

  const toggleExplorer = () => {
    if (!showExplorer) {
      setShowExplorer(true);
      // Wait for React to render, then animate height
      setTimeout(() => {
        if (explorerRef.current) {
          gsap.fromTo(
            explorerRef.current,
            { height: 0, opacity: 0 },
            {
              height: "auto",
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
              onComplete: () => {
                ScrollTrigger.refresh();
              },
            }
          );
        }
      }, 50);
    } else {
      if (explorerRef.current) {
        gsap.to(explorerRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power3.inOut",
          onComplete: () => {
            setShowExplorer(false);
            ScrollTrigger.refresh();
          },
        });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-32 md:py-40 px-6 md:px-12 bg-[var(--crema-espresso-900)]"
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="features-heading mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="eyebrow-badge mb-6">12 Modules · All Connected</div>
            <h2
              id="features-heading"
              className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-[var(--crema-cream-100)] max-w-2xl leading-tight"
            >
              Every module talks to the next.
            </h2>
          </div>
          <p className="text-[var(--crema-cream-300)] max-w-xs text-sm leading-relaxed md:text-right">
            Crema isn&apos;t twelve separate tools bolted together. It&apos;s one organism where every action propagates.
          </p>
        </div>

        {/* 12-card asymmetric bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)] [grid-auto-flow:dense]">
          {modules.map((mod) => (
            <div
              key={mod.id}
              className={`feature-card ${mod.size}`}
            >
              {/* Double-Bezel shell */}
              <div className="bezel-outer h-full transition-[transform,border-color] duration-500 hover:border-white/15">
                <div
                  className="bezel-inner relative h-full p-6 md:p-7 flex flex-col justify-between group cursor-pointer transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[var(--crema-espresso-700)] [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:scale-[1.015] active:scale-[0.98] active:translate-y-0"
                  style={{
                    borderTop: mod.star ? `1px solid ${mod.accent}40` : undefined,
                  }}
                >
                  {/* Top row: icon + module number */}
                  <div className="flex items-start justify-between">
                    <span
                      className="text-2xl leading-none transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-115 group-hover:rotate-12"
                      style={{ color: mod.accent }}
                      aria-hidden="true"
                    >
                      {mod.icon}
                    </span>
                    <span className="font-mono-code text-[10px] uppercase tracking-[0.18em] text-[var(--crema-cream-300)] opacity-50">
                      Module {mod.num}
                    </span>
                  </div>

                  {/* Bottom: title + desc + connects */}
                  <div className="mt-6">
                    <h3
                      className="font-display text-lg md:text-xl font-bold mb-2 leading-snug"
                      style={{ color: "var(--crema-cream-100)" }}
                    >
                      {mod.title}
                    </h3>
                    <p className="text-sm text-[var(--crema-cream-300)] leading-relaxed">
                      {mod.desc}
                    </p>
                    {/* Connects badge */}
                    <div
                      className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-mono-code uppercase tracking-[0.14em] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: mod.accent }}
                      aria-hidden="true"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full inline-block"
                        style={{ backgroundColor: mod.accent }}
                      />
                      {mod.connects}
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ backgroundColor: mod.accent }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Connection CTA Toggle */}
        <div className="mt-12 text-center">
          <button
            onClick={toggleExplorer}
            className="inline-flex items-center gap-2 text-[var(--crema-terracotta)] font-medium text-sm group cursor-pointer hover:text-[var(--crema-terracotta-l)] transition-colors duration-300"
            aria-expanded={showExplorer}
            aria-label="Toggle interactive connection explorer"
          >
            {showExplorer ? "Hide connection explorer" : "See how they all connect"}
            <span
              className={`transition-transform duration-300 ${showExplorer ? "rotate-90" : "group-hover:translate-x-1"}`}
              aria-hidden="true"
            >
              →
            </span>
          </button>
        </div>

        {/* Expandable Explorer Container */}
        {showExplorer && (
          <div ref={explorerRef} className="overflow-hidden opacity-0">
            <ConnectionExplorer />
          </div>
        )}
      </div>
    </section>
  );
}
