# Crema feature clips → website integration

You now have two new things:

- **`Crema Feature Clips.dc.html`** — the clip generator. Open it, pick a feature
  from the **Clip** dropdown (Tweaks panel), and export that scene to MP4.
- **`integration/FeatureVideo.tsx`** — a reusable React component for your repo.

---

## 1. Export each clip to MP4

For every clip you want:

1. Open **Crema Feature Clips.dc.html**.
2. In the Tweaks panel set **Clip** to the feature (e.g. `kds`).
3. **Share → Export → Video** (or the ⬇ button on the playback bar). It renders
   just that scene, retimed to start at 0 and length-matched so it loops cleanly.
4. Save it as `<clip>.mp4` (match the dropdown value: `menu.mp4`, `kds.mp4`, …).

Repeat for each clip. Captions default to **off** for a clean in-card look — flip
to `minimal`/`bold` if you want the on-screen labels.

Then drop them all into your repo at **`public/videos/`**:

```
crema/public/videos/menu.mp4
crema/public/videos/kds.mp4
crema/public/videos/inventory.mp4
...
```

## 2. Add the component

Copy `integration/FeatureVideo.tsx` into `crema/components/landing/FeatureVideo.tsx`.
It autoplays muted + loops, pauses when scrolled off-screen, and respects
`prefers-reduced-motion`. Uses your existing `bezel-outer` / `bezel-inner` classes.

## 3. Clip → module map

The 14 clips line up with your `modules` array in `FeaturesSection.tsx`:

| module id      | clip value  | scene shown                          |
|----------------|-------------|--------------------------------------|
| `menu`         | `menu`      | Guest ordering from the table        |
| `kds`          | `kds`       | Barista Kitchen Display              |
| `crm`          | `crm`       | CRM directory & loyalty              |
| `inventory`    | `inventory` | AI inventory reorder timeline        |
| `staff`        | `staff`     | Weekly roster                        |
| `feedback`     | `drafts`    | AI outreach / apology draft          |
| `analytics`    | `analytics` | Analytics dashboard + AI             |
| `notifications`| `auto86`    | Inventory alert → menu auto-updates  |
| `checklist`    | `checklist` | Opening checklist ticking off        |
| `cash`         | `cash`      | Daily cash reconciliation            |

`floormap` and `history` have no matching scene — leave them as-is.

**Spare clips** not tied to a bento card — great for the hero, Story, or CTA
sections: `qr` (table QR codes), `gift` (gift cards), `briefing` (AI morning
brief), `ask` (Ask CafeOS chat).

## 4. Wire clips into the feature cards

In `FeaturesSection.tsx`, add a `video` field to the modules that have a clip:

```ts
{
  id: "kds",
  num: "02",
  title: "Barista KDS",
  desc: "...",
  accent: "oklch(0.72 0.12 70)",
  icon: "◈",
  size: "md:col-span-1 md:row-span-1",
  connects: "Menu · Inventory",
  video: "/videos/kds.mp4",   // ← add this
},
```

Import the component at the top:

```ts
import { FeatureVideo } from "./FeatureVideo";
```

Then render it at the top of the card body, just inside `bezel-inner`, before
the icon/number row:

```tsx
<div className="bezel-inner relative h-full p-6 md:p-7 flex flex-col justify-between group ...">
  {mod.video && (
    <FeatureVideo
      src={mod.video}
      className="mb-5 -mt-1 rounded-xl"
    />
  )}

  {/* Top row: icon + module number */}
  <div className="flex items-start justify-between">
  ...
```

Because `FeatureVideo` only plays while in view, having several across the grid
stays light — at most a couple play at once.

> Tip: the wide cards (`md:col-span-2` — `menu`, `feedback`, `analytics`) have the
> most room and look best with a clip. If 10 videos feels busy, start with just
> those three plus `kds`, and add the rest once you're happy.

## 5. (Optional) poster frames

For an instant first paint before the video loads, export one PNG per clip
(screenshot the generator at t=0) into `public/videos/menu.png` and pass
`poster="/videos/menu.png"` to `FeatureVideo`.
