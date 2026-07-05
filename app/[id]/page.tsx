import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FilmShell } from "@/components/FilmShell";
import { TvPoster } from "@/components/TvPoster";
import { getNavFilm, NAV_FILMS } from "@/data/nav-films";

interface FilmCritiquePageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return NAV_FILMS.map((film) => ({ id: film.id }));
}

export async function generateMetadata({ params }: FilmCritiquePageProps): Promise<Metadata> {
  const { id } = await params;
  const film = getNavFilm(id);
  if (!film) return {};

  return {
    title: `${film.title} | Tise Talks Film`,
  };
}

export default async function FilmCritiquePage({ params }: FilmCritiquePageProps) {
  const { id } = await params;
  const film = getNavFilm(id);
  if (!film) notFound();

  return (
    <FilmShell activeNavId={id}>
      <TvPoster src={film.posterSrc} alt={`${film.title} poster`} />
    </FilmShell>
  );
}
