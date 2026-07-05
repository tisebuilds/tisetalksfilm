import { NAV_FILMS } from "./nav-films";

export interface FeaturedPoster {
  title: string;
  src: string;
}

export const FEATURED_POSTERS: FeaturedPoster[] = NAV_FILMS.map((film) => ({
  title: film.title,
  src: film.posterSrc,
}));
