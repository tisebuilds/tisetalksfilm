import { FilmNavButtons } from "./FilmNavButtons";
import { ScreenPosterBackground } from "./ScreenPosterBackground";

interface FilmShellProps {
  activeNavId?: string | null;
  children: React.ReactNode;
  screenOverlay?: React.ReactNode;
  posterVisible?: boolean;
  posterSrc?: string | null;
  posterTitle?: string;
  posterYear?: string;
}

export function FilmShell({
  activeNavId = null,
  children,
  screenOverlay,
  posterVisible = false,
  posterSrc = null,
  posterTitle = "",
  posterYear,
}: FilmShellProps) {
  return (
    <main className="flex h-dvh w-full flex-col overflow-hidden bg-[#0a0a0a]">
      <div className="tv-body flex min-h-0 w-full flex-1 flex-col">
        <div className="tv-bezel flex min-h-0 flex-1 flex-col">
          <section className="vhs-screen relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
            <ScreenPosterBackground
              visible={posterVisible}
              src={posterSrc}
              title={posterTitle}
              year={posterYear}
            />
            <div className="vhs-noise" aria-hidden />
            <div className="vhs-tracking" aria-hidden />
            <div className="vhs-content flex items-center justify-center">{children}</div>
            {screenOverlay}
          </section>
        </div>
        <div className="tv-nav-wrap">
          <FilmNavButtons selectedId={activeNavId} />
        </div>
        <div className="tv-speaker-wrap" aria-hidden>
          <div className="tv-speaker speaker-grill" />
        </div>
      </div>
    </main>
  );
}
