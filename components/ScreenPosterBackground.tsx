"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface ScreenPosterBackgroundProps {
  visible: boolean;
  src: string | null;
  title: string;
  year?: string;
}

export function ScreenPosterBackground({
  visible,
  src,
  title,
  year,
}: ScreenPosterBackgroundProps) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="poster-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-[1]"
          aria-hidden
        >
          {src ? (
            <Image src={src} alt="" fill sizes="100vw" className="object-cover" />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-zinc-900 px-6 text-center">
              <p className="font-serif text-2xl text-white/90 sm:text-3xl">{title}</p>
              {year ? <p className="mt-2 text-sm text-white/50 sm:text-base">{year}</p> : null}
            </div>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
