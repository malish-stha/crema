"use client";

import { useEffect, useRef } from "react";

/**
 * FeatureVideo — a looping, muted product clip styled to match the Crema
 * bezel system. Autoplays only while on-screen (pauses when scrolled away),
 * and respects prefers-reduced-motion by showing the poster frame instead.
 *
 * Drop the exported clips into /public/videos/  (e.g. /public/videos/menu.mp4)
 * and reference them as src="/videos/menu.mp4".
 */
export function FeatureVideo({
  src,
  poster,
  aspect = "16 / 9",
  className = "",
}: {
  src: string;
  poster?: string;
  aspect?: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // leave paused on the poster frame

    // Play/pause as the clip enters and leaves the viewport
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`bezel-outer overflow-hidden ${className}`}>
      <div className="bezel-inner overflow-hidden bg-[var(--crema-espresso-900)]">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="block w-full h-full object-cover"
          style={{ aspectRatio: aspect }}
        />
      </div>
    </div>
  );
}
