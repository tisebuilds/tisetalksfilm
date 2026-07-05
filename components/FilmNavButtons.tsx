import Link from "next/link";
import { NAV_FILMS } from "@/data/nav-films";

interface FilmNavButtonsProps {
  selectedId: string | null;
}

function DocumentIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M9.5 1H3.5A1.5 1.5 0 0 0 2 2.5v11A1.5 1.5 0 0 0 3.5 15h9A1.5 1.5 0 0 0 14 13.5V5.5L9.5 1Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M9.5 1v4.5H14" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M5 8.5h6M5 11h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function FilmNavButtons({ selectedId }: FilmNavButtonsProps) {
  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-3 px-4 sm:gap-4"
      aria-label="Featured films"
    >
      {NAV_FILMS.map((film) => {
        const isSelected = film.id === selectedId;
        const href = isSelected ? "/" : `/films/${film.id}`;
        return (
          <Link
            key={film.id}
            href={href}
            aria-current={isSelected ? "page" : undefined}
            className={`tv-btn flex items-center gap-2 px-4 py-2 font-mono text-[11px] uppercase tracking-wide sm:px-5 sm:py-2.5 sm:text-xs ${
              isSelected ? "tv-btn--selected" : ""
            }`}
          >
            <DocumentIcon />
            {film.label}
          </Link>
        );
      })}
    </nav>
  );
}
