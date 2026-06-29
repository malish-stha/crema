"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const flows = [
  {
    id: "ordering-kds-inventory",
    title: "Instant Ingestion Flow",
    badge: "Module 01 → 02 → 05",
    steps: [
      { num: "01", name: "Digital Menu", icon: "⬡", color: "oklch(0.62 0.14 50)", desc: "Customer orders tableside." },
      { num: "02", name: "Barista KDS", icon: "◈", color: "oklch(0.72 0.12 70)", desc: "Order ticket loads on KDS grid." },
      { num: "05", name: "Inventory", icon: "◊", color: "oklch(0.68 0.10 150)", desc: "Beans & milk stocks decrement." }
    ],
    packet: "Order & Ticket Data",
    description: "Tableside orders bypass queues entirely. The order is routed instantly to the barista's display while the ingredient reserve is automatically calculated and depleted in real time."
  },
  {
    id: "kds-out-of-stock",
    title: "Zero-Lag Sync Flow",
    badge: "Module 02 → 01",
    steps: [
      { num: "02", name: "Barista KDS", icon: "◈", color: "oklch(0.72 0.12 70)", desc: "Barista marks item sold out." },
      { num: "01", name: "Digital Menu", icon: "⬡", color: "oklch(0.62 0.14 50)", desc: "Menu updates in < 1 second." }
    ],
    packet: "Inventory Sync Signal",
    description: "Avoid awkward 'sorry, we're out of that' customer apologies. A single tap on the barista's screen updates the tableside customer menu web app across the entire shop immediately."
  },
  {
    id: "feedback-crm",
    title: "Retention Loop Flow",
    badge: "Module 07 → 04",
    steps: [
      { num: "07", name: "Feedback", icon: "◬", color: "oklch(0.68 0.16 30)", desc: "1-3 star review caught privately." },
      { num: "04", name: "CRM Profile", icon: "◐", color: "oklch(0.68 0.14 200)", desc: "Auto-triggers apology coupon." }
    ],
    packet: "Apology Promo Trigger",
    description: "Catch unhappy customers before they leave public Google or Yelp reviews. When the owner marks a private complaint resolved, the CRM automatically delivers an apology discount code."
  },
  {
    id: "low-stock-reorder",
    title: "Critical Supply Flow",
    badge: "Module 05 → 09 → 05",
    steps: [
      { num: "05", name: "Inventory", icon: "◊", color: "oklch(0.68 0.10 150)", desc: "Beans fall below threshold." },
      { num: "09", name: "Notifications", icon: "◑", color: "oklch(0.65 0.14 340)", desc: "Low stock alert triggered." },
      { num: "05", name: "Supplier Log", icon: "◊", color: "oklch(0.68 0.10 150)", desc: "Draft order message populated." }
    ],
    packet: "Supplier WhatsApp Draft",
    description: "Never lose sales to stockouts. The inventory engine triggers a notification and immediately drafts a WhatsApp or email message prefilled with your supplier's contract info and order template."
  },
  {
    id: "reconciliation-analytics-staff",
    title: "Close of Day Flow",
    badge: "Module 12 → 08 → 06",
    steps: [
      { num: "12", name: "Daily Cash Log", icon: "◰", color: "oklch(0.65 0.09 60)", desc: "Barista logs daily totals." },
      { num: "08", name: "Analytics", icon: "◆", color: "oklch(0.70 0.13 260)", desc: "Revenue charts recalculate." },
      { num: "06", name: "Staff Shifts", icon: "◫", color: "oklch(0.65 0.12 280)", desc: "Tips auto-pool proportionally." }
    ],
    packet: "Net Cash & Tip Weights",
    description: "Eliminate manual shift spreadsheets. The closing barista registers cash, card, and tip totals, instantly generating owner reports and pooling tips based on shifts worked."
  }
];

export function ConnectionExplorer() {
  const [activeFlowIndex, setActiveFlowIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeFlow = flows[activeFlowIndex];

  // Re-run animation when active flow changes
  useGSAP(
    () => {
      // Clean up previous animations
      gsap.killTweensOf(".node-item, .node-arrow, .packet-indicator");

      // Set initial states
      gsap.set(".node-item", { opacity: 0, y: 15 });
      gsap.set(".node-arrow", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".packet-indicator", { scale: 0, opacity: 0, left: "10%" });

      // Build animation sequence
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to(".node-item", {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.5,
      })
      .to(".node-arrow", {
        scaleX: 1,
        stagger: 0.15,
        duration: 0.4,
      }, "-=0.2")
      .to(".packet-indicator", {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        onComplete: () => {
          gsap.fromTo(".packet-indicator",
            { left: "10%" },
            {
              left: "90%",
              duration: 2,
              repeat: -1,
              ease: "power1.inOut",
            }
          );
        }
      }, "-=0.1");
    },
    { dependencies: [activeFlowIndex], scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-12">
      {/* Flow Selector Sidebar */}
      <div className="lg:col-span-4 flex flex-col gap-3">
        {flows.map((flow, idx) => {
          const isActive = idx === activeFlowIndex;
          const primaryStepColor = flow.steps[0].color;
          return (
            <button
              key={flow.id}
              onClick={() => setActiveFlowIndex(idx)}
              className="text-left w-full transition-all duration-300"
            >
              <div
                className={`bezel-outer p-1 transition-colors duration-300 ${
                  isActive ? "bg-white/5 border-white/10" : "bg-transparent border-transparent hover:bg-white/2"
                }`}
              >
                <div
                  className={`bezel-inner p-4 flex items-center justify-between gap-4 transition-colors duration-300 ${
                    isActive ? "bg-[var(--crema-espresso-700)]" : "bg-[var(--crema-espresso-800)] hover:bg-[var(--crema-espresso-700)]"
                  }`}
                  style={{
                    borderLeft: isActive ? `3px solid ${primaryStepColor}` : "3px solid transparent",
                  }}
                >
                  <div>
                    <h4 className="font-display font-bold text-sm text-[var(--crema-cream-100)]">
                      {flow.title}
                    </h4>
                    <span className="font-mono-code text-[10px] text-[var(--crema-cream-300)] opacity-60">
                      {flow.badge}
                    </span>
                  </div>
                  <span
                    className="text-xs transition-transform duration-300"
                    style={{
                      color: isActive ? primaryStepColor : "var(--crema-cream-300)",
                      transform: isActive ? "translateX(2px)" : "none",
                    }}
                  >
                    →
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Visual Canvas Display */}
      <div className="lg:col-span-8 flex flex-col justify-between bezel-outer p-1 bg-white/2">
        <div className="bezel-inner p-8 flex flex-col h-full justify-between gap-8 bg-[var(--crema-espresso-800)]">
          {/* Animated node connection track */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 relative w-full">
            {activeFlow.steps.map((step, sIdx) => {
              const isLast = sIdx === activeFlow.steps.length - 1;
              return (
                <div key={sIdx} className="contents">
                  {/* Module Node Card */}
                  <div className="node-item bezel-outer p-1 w-full sm:w-48 bg-white/2 shrink-0">
                    <div className="bezel-inner p-4 text-center flex flex-col items-center gap-2 bg-[var(--crema-espresso-900)]">
                      <span
                        className="text-2xl"
                        style={{ color: step.color }}
                        aria-hidden="true"
                      >
                        {step.icon}
                      </span>
                      <h5 className="font-display text-sm font-bold text-[var(--crema-cream-100)] leading-none mt-1">
                        {step.name}
                      </h5>
                      <span className="font-mono-code text-[8px] uppercase tracking-wider text-[var(--crema-cream-300)] opacity-40">
                        Module {step.num}
                      </span>
                      <p className="text-[10px] leading-normal text-[var(--crema-cream-300)] mt-1 opacity-70">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Flow Arrow Connector */}
                  {!isLast && (
                    <div className="hidden sm:flex flex-col items-center justify-center flex-grow relative mx-4 h-0.5 min-w-[50px]">
                      {/* Flow Packet Indicator */}
                      <div
                        className="packet-indicator absolute w-2.5 h-2.5 rounded-full -translate-y-1/2 shadow-[0_0_12px_currentColor]"
                        style={{
                          color: step.color,
                          backgroundColor: step.color,
                          left: "10%",
                          top: "50%",
                        }}
                      />
                      {/* Connection Line */}
                      <div
                        className="node-arrow h-[2px] w-full rounded"
                        style={{ backgroundColor: `oklch(1 0 0 / 16%)` }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Description & Value Card */}
          <div
            className="p-5 rounded-xl border border-white/5 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, var(--crema-espresso-900) 0%, rgba(20,18,17,0.5) 100%)`,
            }}
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="max-w-xl">
                <span className="font-mono-code text-[9px] uppercase tracking-widest text-[var(--crema-terracotta)] block mb-1">
                  Active Data Packet: {activeFlow.packet}
                </span>
                <p className="text-xs text-[var(--crema-cream-200)] leading-relaxed">
                  {activeFlow.description}
                </p>
              </div>
              <div className="shrink-0 flex flex-col items-end">
                <span className="text-[10px] font-mono-code text-[var(--crema-cream-300)] opacity-50 uppercase tracking-widest">
                  Performance Gain
                </span>
                <span className="text-xl font-display font-bold text-[var(--crema-cream-100)]">
                  ~100% Real-Time
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
