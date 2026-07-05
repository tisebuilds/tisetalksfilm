"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Film } from "@/types/film";

interface WatchedCaptionProps {
  film: Film | null;
  onPosterHover?: (hovered: boolean) => void;
}

const TITLE_EASE = [0.22, 1, 0.36, 1] as const;
const TITLE_TRANSITION = { duration: 0.45, ease: TITLE_EASE };
const TITLE_CLASS =
  "whitespace-nowrap underline decoration-dotted decoration-white/40 underline-offset-4";

export function WatchedCaption({ film, onPosterHover }: WatchedCaptionProps) {
  const measureRef = useRef<HTMLSpanElement>(null);
  const [titleWidth, setTitleWidth] = useState<number>();

  useLayoutEffect(() => {
    if (!film || !measureRef.current) return;
    setTitleWidth(measureRef.current.offsetWidth);
  }, [film?.filmTitle, film?.guid]);

  if (!film) {
    return (
      <p className="vhs-text text-center text-lg text-white/70 sm:text-xl md:text-2xl">
        I&apos;ve watched&hellip;
      </p>
    );
  }

  return (
    <p className="vhs-text flex flex-wrap items-baseline justify-center px-6 text-center text-lg sm:text-xl md:text-2xl">
      <span>I&apos;ve watched&nbsp;</span>
      <motion.span
        className="relative inline-block"
        initial={false}
        animate={{ width: titleWidth }}
        transition={TITLE_TRANSITION}
      >
        <span
          ref={measureRef}
          aria-hidden
          className={`pointer-events-none invisible absolute left-0 top-0 ${TITLE_CLASS}`}
        >
          {film.filmTitle}
        </span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={film.guid}
            initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
            transition={TITLE_TRANSITION}
            className="inline-block"
          >
            <span
              tabIndex={0}
              className={`cursor-default outline-none ${TITLE_CLASS}`}
              onMouseEnter={() => onPosterHover?.(true)}
              onMouseLeave={() => onPosterHover?.(false)}
              onFocus={() => onPosterHover?.(true)}
              onBlur={() => onPosterHover?.(false)}
            >
              {film.filmTitle}
            </span>
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </p>
  );
}
