"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Film } from "@/types/film";

interface FilmPosterPopoverProps {
  film: Film;
  children: ReactNode;
  className?: string;
}

export function FilmPosterPopover({ film, children, className }: FilmPosterPopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <span
      tabIndex={0}
      className={`relative inline-block cursor-default outline-none ${className ?? ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-4 -translate-x-1/2"
          >
            <div className="overflow-hidden rounded-sm shadow-[0_16px_40px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
              {film.image ? (
                <div className="relative h-[210px] w-[140px]">
                  <Image
                    src={film.image}
                    alt={`${film.filmTitle} poster`}
                    fill
                    sizes="140px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-[210px] w-[140px] flex-col items-center justify-center bg-zinc-900 px-3 text-center">
                  <p className="font-serif text-sm text-white/90">{film.filmTitle}</p>
                  {film.filmYear ? (
                    <p className="mt-1 text-xs text-white/50">{film.filmYear}</p>
                  ) : null}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
