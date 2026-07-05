export interface NavFilm {
  id: string;
  label: string;
  title: string;
  posterSrc: string;
}

export const NAV_FILMS: NavFilm[] = [
  {
    id: "black-panther",
    label: "BLACK PANTHER",
    title: "Black Panther",
    posterSrc: "/posters/black-panther.png",
  },
  {
    id: "hunger-games",
    label: "THE HUNGER GAMES",
    title: "The Hunger Games",
    posterSrc: "/posters/hunger-games.png",
  },
  {
    id: "tuner",
    label: "TUNER",
    title: "Tuner",
    posterSrc: "/posters/tuner.png",
  },
];

export function getNavFilm(id: string): NavFilm | undefined {
  return NAV_FILMS.find((film) => film.id === id);
}
