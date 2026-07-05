"use client";

import { useState } from "react";
import type { Film } from "@/types/film";
import { PosterCarousel } from "./PosterCarousel";
import { WatchedCaption } from "./WatchedCaption";
import { PauseButton } from "./PauseButton";

interface LandingProps {
  films: Film[];
}

export function Landing({ films }: LandingProps) {
  const [paused, setPaused] = useState(false);

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-black">
      <PosterCarousel paused={paused} />
      <WatchedCaption films={films} />
      <PauseButton paused={paused} onToggle={() => setPaused((p) => !p)} />
    </main>
  );
}
