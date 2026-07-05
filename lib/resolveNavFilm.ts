import { NAV_FILMS } from "@/data/nav-films";
import type { Film } from "@/types/film";

export function resolveNavFilm(films: Film[], navId: string): Film | null {
  const nav = NAV_FILMS.find((item) => item.id === navId);
  if (!nav) return null;

  const match = films.find(
    (film) => film.filmTitle.toLowerCase() === nav.title.toLowerCase(),
  );

  if (match) return match;

  return {
    guid: `nav-${nav.id}`,
    watchedDate: "",
    image: null,
    filmTitle: nav.title,
    filmYear: "",
    memberRating: null,
    memberLike: false,
  };
}
