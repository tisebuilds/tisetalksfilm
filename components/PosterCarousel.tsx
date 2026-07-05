"use client";

import { useEffect, useMemo, useState } from "react";
import { FEATURED_POSTERS } from "@/data/featured-posters";
import { PosterSlide } from "./PosterSlide";

interface PosterCarouselProps {
  paused: boolean;
}

const ADVANCE_MS = 3200;
const REPEATS = 3;

export function PosterCarousel({ paused }: PosterCarouselProps) {
  const slides = useMemo(() => {
    return Array.from({ length: FEATURED_POSTERS.length * REPEATS }, (_, i) => ({
      key: i,
      poster: FEATURED_POSTERS[i % FEATURED_POSTERS.length],
    }));
  }, []);

  const [center, setCenter] = useState(Math.floor(slides.length / 2));

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setCenter((c) => (c + 1) % slides.length);
    }, ADVANCE_MS);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  return (
    <div
      className="relative h-full w-full"
      style={{ perspective: "1600px" }}
      aria-label="Featured film posters"
    >
      <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
        {slides.map((slide, i) => (
          <PosterSlide key={slide.key} poster={slide.poster} offset={i - center} />
        ))}
      </div>
    </div>
  );
}
