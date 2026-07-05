"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Film } from "@/types/film";
import { formatWatchedDate } from "@/lib/formatWatchedDate";

interface WatchedCaptionProps {
  films: Film[];
}

const ROTATE_MS = 3500;

export function WatchedCaption({ films }: WatchedCaptionProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (films.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % films.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [films.length]);

  const film = films[index];

  return (
    <div className="fixed bottom-8 left-1/2 z-40 w-full max-w-[90vw] -translate-x-1/2 text-center">
      <AnimatePresence mode="wait">
        {film ? (
          <motion.p
            key={film.guid}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-serif text-lg text-white/90 sm:text-xl"
          >
            I watched <span className="italic">{film.filmTitle}</span> on{" "}
            {formatWatchedDate(film.watchedDate)}.
          </motion.p>
        ) : (
          <p className="font-serif text-lg text-white/60 sm:text-xl">I just watched&hellip;</p>
        )}
      </AnimatePresence>
    </div>
  );
}
