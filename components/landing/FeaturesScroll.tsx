"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const modulesWithClips = [
  {
    id: "menu",
    title: "Digital Menu & QR Ordering",
    tagline: "Dine-in ordering & pre-arrival pickup",
    desc: "Guests browse, customize, and order from the table. Skip the queue and the server.",
    accent: "oklch(0.62 0.14 50)",      // terracotta
    video: "/videos/menu.mp4",
  },
  {
    id: "kds",
    title: "Barista KDS",
    tagline: "Bridging the kitchen to the counter",
    desc: "Tickets route to the counter when guests order. Color-coded views keep the kitchen in sync.",
    accent: "oklch(0.72 0.12 70)",      // amber
    video: "/videos/kds.mp4",
  },
  {
    id: "floormap",
    title: "3D Interactive Floor Map",
    tagline: "Real-time table layout & status",
    desc: "Monitor tables in real time to see free, ordering, or occupied status. Tap any table to start a session.",
    accent: "oklch(0.70 0.18 160)",     // mint
    video: "/videos/floormap.mp4",
  },
  {
    id: "auto86",
    title: "Live Menu Sync",
    tagline: "Instant stock synchronization",
    desc: "Mark an ingredient out of stock to make dependent items unavailable across guest devices.",
    accent: "oklch(0.68 0.10 150)",     // sage
    video: "/videos/auto86.mp4",
  },
  {
    id: "qr",
    title: "Table QR Codes",
    tagline: "Signed table check-ins",
    desc: "One signed QR code per table. A scan seats guests and opens the active order.",
    accent: "oklch(0.62 0.14 50)",      // terracotta
    video: "/videos/qr.mp4",
  },
  {
    id: "checklist",
    title: "Opening & Closing Checklist",
    tagline: "Standardize shift routines",
    desc: "Timestamped daily routines keep shift handovers consistent.",
    accent: "oklch(0.70 0.10 100)",     // lime
    video: "/videos/checklist.mp4",
  },
  {
    id: "cash",
    title: "Cash Reconciliation",
    tagline: "End-of-day balances, resolved",
    desc: "Balance end-of-day cash, card, and wallet totals. Detect and flag discrepancies.",
    accent: "oklch(0.65 0.09 60)",      // gold
    video: "/videos/cash.mp4",
  },
  {
    id: "staff",
    title: "Staff & Shift Management",
    tagline: "Rosters, swaps & tips",
    desc: "Plan weekly rosters, cover shift gaps, and organize the team on one schedule.",
    accent: "oklch(0.65 0.12 280)",     // lavender
    video: "/videos/staff.mp4",
  },
  {
    id: "crm",
    title: "Customer CRM & Loyalty",
    tagline: "Loyalty points & regular profiles",
    desc: "Track customer visits, reward points, and punch cards to recognize regulars.",
    accent: "oklch(0.68 0.14 200)",     // teal
    video: "/videos/crm.mp4",
  },
  {
    id: "gift",
    title: "Gift Card Vouchers",
    tagline: "Redeem and track balances",
    desc: "Issue and redeem gift cards with balances tracked to the rupee.",
    accent: "oklch(0.68 0.14 200)",     // teal
    video: "/videos/gift.mp4",
  },
  {
    id: "briefing",
    title: "AI Morning Briefing",
    tagline: "Morning operations digest",
    desc: "Review sales, top sellers, and operational highlights before opening.",
    accent: "oklch(0.70 0.13 260)",     // periwinkle
    video: "/videos/briefing.mp4",
  },
  {
    id: "ask",
    title: "Ask CafeOS",
    tagline: "Conversational dashboard search",
    desc: "Query café metrics in plain English for data-backed answers.",
    accent: "oklch(0.70 0.13 260)",     // periwinkle
    video: "/videos/ask.mp4",
  },
  {
    id: "inventory",
    title: "AI Inventory Predictions",
    tagline: "Smart stockout forecasts",
    desc: "Forecast stockouts from usage rates and lead times to reorder before running out.",
    accent: "oklch(0.68 0.10 150)",     // sage
    video: "/videos/inventory.mp4",
  },
  {
    id: "analytics",
    title: "Analytics & AI Copilot",
    tagline: "Revenue trends & leaderboards",
    desc: "Analyze revenue trends, bestseller leaderboards, and suggestions on inventory.",
    accent: "oklch(0.70 0.13 260)",     // periwinkle
    video: "/videos/analytics.mp4",
  },
  {
    id: "drafts",
    title: "AI Outreach Drafts",
    tagline: "Automated campaign reviews",
    desc: "Write win-back and promo messages for review. Send with one tap.",
    accent: "oklch(0.68 0.16 30)",      // burnt orange
    video: "/videos/draft.mp4",
  },
];

export function FeaturesScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const bezelRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bezel = bezelRef.current;
    if (!bezel) return;
    const rect = bezel.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    bezel.style.setProperty("--mouse-x", `${x}px`);
    bezel.style.setProperty("--mouse-y", `${y}px`);
  };

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const blocks = gsap.utils.toArray(".showcase-block") as HTMLElement[];

      blocks.forEach((block, index) => {
        // Intersection tracking
        ScrollTrigger.create({
          trigger: block,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveIndex(index);
            }
          },
        });

        // Vertical scroll progress bar fill tracking using height (avoids vertical scale squishing on child dot)
        const progressLine = block.querySelector(".progress-line-fill") as HTMLElement;
        if (progressLine) {
          gsap.fromTo(
            progressLine,
            { height: "0%" },
            {
              height: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: block,
                start: "top center",
                end: "bottom center",
                scrub: true,
              },
            }
          );
        }
      });

      // Pause all videos when showcase is out of view
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          const activeVideo = videoRefs.current[activeIndex];
          if (activeVideo && activeVideo.getAttribute("src")) {
            if (self.isActive) {
              activeVideo.play().catch(() => {});
            } else {
              activeVideo.pause();
            }
          }
        },
      });
    },
    { scope: containerRef }
  );

  useEffect(() => {
    // 1. Play active video and fade in with zoom parallax / pause others and zoom out
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex) {
        if (video.getAttribute("src")) {
          video.play().catch(() => {});
          gsap.fromTo(
            video,
            { opacity: 0, scale: 1.06 },
            { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out", overwrite: "auto" }
          );
        }
      } else {
        if (video.getAttribute("src")) {
          gsap.to(video, {
            opacity: 0,
            scale: 0.95,
            duration: 0.6,
            ease: "power2.inOut",
            overwrite: "auto",
            onComplete: () => {
              video.pause();
              video.currentTime = 0;
            },
          });
        }
      }
    });

    if (containerRef.current) {
      // 2. Elastic recoil tilt effect on browser bezel (momentum physics)
      if (bezelRef.current) {
        gsap.fromTo(
          bezelRef.current,
          { scale: 0.985, rotateX: -2, rotateY: 1 },
          {
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            duration: 0.8,
            ease: "elastic.out(1.1, 0.7)",
            overwrite: "auto",
          }
        );
      }

      // 3. Browser loader bar simulation
      const loadLine = containerRef.current.querySelector(".browser-load-line") as HTMLElement;
      if (loadLine) {
        gsap.fromTo(
          loadLine,
          { width: "0%", opacity: 1 },
          {
            width: "100%",
            opacity: 0,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
          }
        );
      }

      // 4. Staggered text slide-up reveal on active block text elements
      const activeBlock = containerRef.current.querySelector(`.showcase-block[data-index="${activeIndex}"]`);
      if (activeBlock) {
        const elements = activeBlock.querySelectorAll(".reveal-text");
        gsap.fromTo(
          elements,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            overwrite: "auto",
          }
        );
      }
    }
  }, [activeIndex]);

  return (
    <section
      ref={containerRef}
      id="features-showcase"
      className="relative bg-[var(--crema-espresso-900)] py-32 md:py-48"
      aria-label="Features showcase"
    >
      {/* Ambient radial blur background */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[var(--crema-terracotta)]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[var(--crema-gold)]/5 blur-[120px]" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-20">
          <div className="eyebrow-badge mb-6">Interactive Showcase</div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-[var(--crema-cream-100)] leading-tight max-w-4xl">
            See CafeOS in action.
          </h2>
        </div>

        {/* Content split grid */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
          {/* Left Column: Scrolling content */}
          <div
            ref={leftColumnRef}
            className="order-2 md:order-1 w-full md:w-[32%] flex flex-col"
          >
            {modulesWithClips.map((mod, index) => (
              <div
                key={mod.id}
                className={`showcase-block relative transition-all duration-500 py-16 md:py-32 flex flex-col justify-center min-h-[50vh] md:min-h-[100dvh] pl-6 md:pl-8 ${
                  activeIndex === index ? "opacity-100" : "opacity-25"
                }`}
                data-index={index}
              >
                {/* Vertical Scroll Progress bar */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/10 rounded-full">
                  <div
                    className="progress-line-fill w-full h-0 relative rounded-full"
                    style={{
                      backgroundColor: mod.accent,
                      opacity: activeIndex === index ? 1 : 0.3,
                      transition: "opacity 0.4s ease",
                    }}
                  >
                    {/* Glowing head dot (remains circular, does not squish) */}
                    {activeIndex === index && (
                      <div
                        className="absolute bottom-0 left-[-2px] w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor: mod.accent,
                          boxShadow: `0 0 8px ${mod.accent}, 0 0 16px ${mod.accent}`,
                        }}
                      />
                    )}
                  </div>
                </div>

                <span
                  className="reveal-text font-mono-code text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-300 block"
                  style={{ color: activeIndex === index ? mod.accent : "var(--crema-cream-300)" }}
                >
                  {mod.tagline}
                </span>
                <h3 className="reveal-text font-display text-2xl md:text-3xl font-bold mt-3 mb-6 text-[var(--crema-cream-100)] block">
                  {mod.title}
                </h3>
                <p className="reveal-text text-sm md:text-base text-[var(--crema-cream-300)] leading-relaxed max-w-md block">
                  {mod.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column: Sticky video player */}
          <div
            ref={rightColumnRef}
            className="order-1 md:order-2 w-full md:w-[68%] sticky top-[80px] md:top-[12vh] h-[40vh] md:h-[76vh] z-20 flex items-center justify-center bg-[var(--crema-espresso-900)] md:bg-transparent py-4 md:py-0 border-b border-white/5 md:border-b-0"
            style={{ perspective: "1200px" }}
          >
            {/* Space-grey physical MacBook screen casing with mouse spotlight effect */}
            <div
              ref={bezelRef}
              onMouseMove={handleMouseMove}
              className="bezel-outer w-full aspect-[16/10] relative rounded-[24px] md:rounded-[32px] p-2 md:p-3 shadow-2xl origin-center group/bezel bg-gradient-to-b from-[#2e2e30] via-[#1c1c1e] to-[#0f0f10] border border-white/10"
              style={{
                background: "radial-gradient(500px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255,255,255,0.08), transparent 80%), linear-gradient(to bottom, #2c2c2e, #1c1c1e, #0e0e10)",
              }}
            >
              {/* Internal display glass frame with thin black bezel */}
              <div className="bezel-inner w-full h-full relative overflow-hidden bg-black rounded-[18px] md:rounded-[24px] border border-black/80 shadow-[inset_0_1px_3px_rgba(255,255,255,0.15)] flex flex-col">
                
                {/* Physical MacBook front camera and status LED light */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-40">
                  {/* Camera lens */}
                  <div className="w-1.5 h-1.5 rounded-full bg-[#040404] border border-white/5 shadow-inner" />
                  {/* Green status LED indicator */}
                  <div className="w-1 h-1 rounded-full bg-emerald-500/50 animate-pulse shadow-[0_0_4px_#10b981]" />
                </div>

                {/* macOS Safari top window header */}
                <div className="h-9 bg-black/40 border-b border-white/5 flex items-center px-4 relative z-30 pt-1">
                  {/* Left traffic lights */}
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-[#dfa123]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] border border-[#1aab2f]" />
                  </div>
                  
                  {/* Center address bar */}
                  <div className="mx-auto flex items-center justify-center bg-black/30 border border-white/5 rounded-md px-3 py-0.5 text-[10px] font-mono tracking-wider text-[var(--crema-cream-300)] w-[200px] md:w-[280px]">
                    {/* SVG Secure Lock icon (banning emojis) */}
                    <svg className="w-2.5 h-2.5 text-emerald-500 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span className="truncate">brewos.app/{modulesWithClips[activeIndex].id}</span>
                  </div>

                  {/* Right options layout placeholder */}
                  <div className="flex gap-2 opacity-30 text-[10px] text-white select-none font-sans">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 10.742l-5.464 2.732m0 0l5.464 2.73m-5.464-2.73L14 19.5" />
                    </svg>
                  </div>
                  
                  {/* Glowing browser loader line */}
                  <div
                    className="browser-load-line absolute bottom-0 left-0 h-[1.5px] bg-[var(--crema-terracotta)] opacity-0 w-0"
                    style={{ boxShadow: "0 0 6px var(--crema-terracotta)" }}
                  />
                </div>

                {/* Video canvas viewport content */}
                <div className="w-full flex-1 relative overflow-hidden bg-[var(--crema-espresso-800)]">
                  {modulesWithClips.map((mod, index) => {
                    const isVisible = activeIndex === index;
                    const isNear =
                      index === activeIndex ||
                      index === (activeIndex + 1) % modulesWithClips.length ||
                      index === (activeIndex - 1 + modulesWithClips.length) % modulesWithClips.length;

                    return (
                      <video
                        key={mod.id}
                        src={isNear ? mod.video : undefined}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                        style={{
                          opacity: isVisible ? 1 : 0,
                          zIndex: isVisible ? 20 : 10,
                        }}
                        ref={(el) => {
                          videoRefs.current[index] = el;
                        }}
                      />
                    );
                  })}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
