"use client";

import { useEffect, useState } from "react";
import type { Film } from "@/types/film";
import { FilmShell } from "./FilmShell";
import { PauseButton } from "./PauseButton";
import { WatchedCaption } from "./WatchedCaption";

interface LandingProps {
  films: Film[];
}

const ROTATE_MS = 3500;

export function Landing({ films }: LandingProps) {
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);
  const [posterHovered, setPosterHovered] = useState(false);

  useEffect(() => {
    if (index >= films.length) {
      setIndex(0);
    }
  }, [films.length, index]);

  useEffect(() => {
    if (paused || films.length <= 1) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % films.length);
    }, ROTATE_MS);

    return () => clearInterval(id);
  }, [paused, films.length]);

  const currentFilm = films[index] ?? null;

  return (
    <FilmShell
      posterVisible={posterHovered && currentFilm !== null}
      posterSrc={currentFilm?.image ?? null}
      posterTitle={currentFilm?.filmTitle ?? ""}
      posterYear={currentFilm?.filmYear}
      screenOverlay={
        <PauseButton paused={paused} onToggle={() => setPaused((wasPaused) => !wasPaused)} />
      }
    >
      <WatchedCaption film={currentFilm} onPosterHover={setPosterHovered} />
    </FilmShell>
  );
}
