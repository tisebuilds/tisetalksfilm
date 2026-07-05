"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { FeaturedPoster } from "@/data/featured-posters";

interface PosterSlideProps {
  poster: FeaturedPoster;
  offset: number;
}

const SPACING = 232;
const ROTATION = 34;
const MAX_TILTED = 3;

export function PosterSlide({ poster, offset }: PosterSlideProps) {
  const clamped = Math.max(-MAX_TILTED, Math.min(MAX_TILTED, offset));
  const isCenter = offset === 0;

  const x = clamped * SPACING;
  const rotateY = clamped === 0 ? 0 : clamped < 0 ? ROTATION : -ROTATION;
  const scale = isCenter ? 1 : 0.92;
  const opacity = Math.abs(offset) > MAX_TILTED ? 0 : 1;
  const zIndex = MAX_TILTED - Math.abs(clamped);

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-1/2"
      style={{ zIndex }}
      initial={false}
      animate={{
        x: x - 105,
        y: -158,
        rotateY,
        scale,
        opacity,
      }}
      transition={{ type: "spring", stiffness: 90, damping: 20 }}
    >
      <div className="relative h-[316px] w-[210px] overflow-hidden rounded-sm shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
        <Image
          src={poster.src}
          alt={poster.title}
          fill
          sizes="210px"
          className="object-cover"
          priority={isCenter}
        />
      </div>
    </motion.div>
  );
}
