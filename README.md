# ☕️ Crema (BrewOS)

> **The OS Behind Great Coffee.** A premium, white-label, multi-tenant café operating system built for independent cafés that refuse to be ordinary.

🌐 **[Try the Live Demo](https://brew-ruddy-omega.vercel.app/)** — Explore the customer ordering view, barista KDS dashboard, and live analytics.

Crema (BrewOS) is a comprehensive café management platform built as a modern, high-performance web application. Designed to be white-labeled, each tenant receives a fully branded interface scoped to their unique `cafeId`.

---

## 🗺️ Module Map & Architecture

Crema orchestrates café operations through **12 core interconnected modules**, bridging tableside customer interaction directly to back-of-house logistics.

| ID | Module | Route | Target Audience | Core Capability |
| :--- | :--- | :--- | :--- | :--- |
| **01** | **Digital Menu & QR Ordering** | `/menu` | Customer & Owner | Tableside QR scanning, self-checkout, and queue-skipping order placement. |
| **02** | **Barista KDS** | `/kds` | Barista & Owner | Live color-coded ticket grid routing orders instantly from customer to counter. |
| **03** | **3D Interactive Floor Map** | `/floor` | Customer (view), Owner (edit) | Real-time 3D tableside layout visualization showing order state (free, occupied, checkout). |
| **04** | **Customer CRM & Loyalty** | `/crm` | Owner | Tracks regular customer profiles, visit frequencies, loyalty points, and punch cards. |
| **05** | **Inventory & Supplier Log** | `/inventory` | Owner | AI-driven stockout forecasts, batch logging, ingredient depletion, and supplier log. |
| **06** | **Staff & Shift Management** | `/staff` | Owner & Barista | Roster planner, shift swaps, hours tracking, and automatic tip pooling. |
| **07** | **Feedback & Reputation Manager**| `/feedback` | Owner & Customer | Direct customer reviews that trigger CRM coupons privately to recover guest trust. |
| **08** | **Analytics & AI Insights** | `/analytics` | Owner | Revenue trends, best-selling item leaderboards, and AI operational recommendations. |
| **09** | **Notification Center** | `/notifications` | Owner & Barista | Instant low-stock alerts, KDS order notifications, and missed checklist warnings. |
| **10** | **Opening & Closing Checklist** | `/checklist` | Owner & Barista | Timestamped daily routines to ensure shift handovers are clean and standardized. |
| **11** | **Order History & Reorder** | `/orders` | Customer & Owner | Quick reorders for guests and full historical transactional audits for owners. |
| **12** | **Daily Cash Reconciliation** | `/reconciliation`| Owner & Barista | Reconciles daily cash, cards, and wallet totals, auto-pooling tips across shifts. |

### ⚡ Critical Operations Loops

Crema features deep module integration to automate routine café tasks:
* **Instant Ingestion Loop:** Customer Order (`01`) ➔ Barista KDS (`02`) ➔ Inventory Depletion (`05`).
* **Zero-Lag Menu Sync:** Marking an ingredient as out-of-stock on the KDS (`02`) instantly hides matching items from the customer Menu (`01`).
* **Customer Retention Loop:** Private poor feedback (`07`) triggers an apology CRM voucher (`04`) to incentivize a return visit.
* **Smart Supply Loop:** Inventory levels fall below threshold (`05`) ➔ alerts Barista (`09`) ➔ pre-fills WhatsApp message draft to supplier (`05`).
* **Shift Handover Loop:** Daily Cash Log submitted (`12`) ➔ recalculates Analytics (`08`) ➔ auto-pools tips into Staff shifts (`06`).

---

## 🎨 Design System: "Editorial Luxury"

Crema features a curated, editorial visual aesthetic styled for modern premium cafés. It implements a calibrated **OKLCH color system** with responsive typography scales.

* **Palette Strategy:** Deep espresso browns, warm milk creams, and vibrant terracotta highlights.
* **Core Tokens:**
  * Background: `oklch(0.10 0.014 52)` (Deep Espresso Black)
  * Surface: `oklch(0.15 0.016 50)` (Warm Card Ground)
  * Primary Accent: `oklch(0.62 0.14 50)` (Terracotta Orange)
  * Accent Highlight: `oklch(0.80 0.10 80)` (Gold Accent)
  * Text Primary: `oklch(0.93 0.028 85)` (Warm Cream White)
* **Typography:**
  * Display: *Playfair Display* (Editorial headings, serif)
  * Body: *DM Sans* (Clean readable sans-serif)
  * Mono: *JetBrains Mono* (Auditing numbers and values)
* **Animations:** Powered by GSAP and Lenis for ultra-smooth scrolling, responsive parallax, and interactive flow transitions.

---

## 🛠️ Technology Stack

* **Core Framework:** Next.js 16+ (App Router)
* **Runtime Library:** React 19
* **Styling Engine:** Tailwind CSS v4 (native `@import` setup)
* **3D Visuals:** Three.js (r134) (Client-side interactive table floor plan)
* **Motion Engine:** GSAP 3 + `@gsap/react` hook (Parallax and transitions)
* **Scroll Engine:** Lenis Smooth Scroll
* **Database ORM:** Prisma ORM (all queries wrapped in isolated `/lib/db/` functions)
* **Authentication:** NextAuth.js (Role-based server middleware routing for `owner`, `barista`, `customer`)
* **Deploy Platform:** Vercel Edge Runtime

---
