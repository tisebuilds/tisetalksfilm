"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Film } from "@/types/film";
import { FilmPosterPopover } from "@/components/FilmPosterPopover";

interface WatchedCaptionProps {
  films: Film[];
}

const ROTATE_MS = 3500;
const TITLE_EASE = [0.22, 1, 0.36, 1] as const;
const TITLE_TRANSITION = { duration: 0.45, ease: TITLE_EASE };
const TITLE_CLASS =
  "whitespace-nowrap text-white underline decoration-dotted decoration-white/50 underline-offset-4";

export function WatchedCaption({ films }: WatchedCaptionProps) {
  const [index, setIndex] = useState(0);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [titleWidth, setTitleWidth] = useState<number>();

  useEffect(() => {
    if (films.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % films.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [films.length]);

  const film = films[index];

  useLayoutEffect(() => {
    if (!film || !measureRef.current) return;
    setTitleWidth(measureRef.current.offsetWidth);
  }, [film?.filmTitle, film?.guid]);

  if (!film) {
    return (
      <div className="fixed bottom-8 left-1/2 z-40 w-full max-w-[90vw] -translate-x-1/2 text-center">
        <p className="font-serif text-lg text-white/60 sm:text-xl">I just watched&hellip;</p>
      </div>
    );
  }

  return (
    <div className="fixed bottom-8 left-1/2 z-40 w-full max-w-[90vw] -translate-x-1/2 text-center">
      <p className="flex items-baseline justify-center font-serif text-lg text-white/90 sm:text-xl">
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
              <FilmPosterPopover film={film} className={TITLE_CLASS}>
                {film.filmTitle}
              </FilmPosterPopover>
            </motion.span>
          </AnimatePresence>
        </motion.span>
      </p>
    </div>
  );
}
