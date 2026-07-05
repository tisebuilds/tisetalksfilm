"use client";

interface PauseButtonProps {
  paused: boolean;
  onToggle: () => void;
}

const VHS_SHADOWS = [
  { dx: 2, dy: 2, color: "rgba(0, 0, 0, 0.85)" },
  { dx: -1, dy: 0, color: "rgba(255, 0, 60, 0.6)" },
  { dx: 1, dy: 0, color: "rgba(0, 200, 255, 0.6)" },
] as const;

const ICON_CLASS = "block h-[0.78em] overflow-visible -translate-y-[0.08em]";

function PauseIcon() {
  const bars = (
    <>
      <rect x="0" y="0" width="4.5" height="14" />
      <rect x="7.5" y="0" width="4.5" height="14" />
    </>
  );

  return (
    <svg
      viewBox="0 0 12 14"
      fill="currentColor"
      aria-hidden
      className={`${ICON_CLASS} w-[0.95em]`}
    >
      {VHS_SHADOWS.map((shadow) => (
        <g
          key={`${shadow.dx}-${shadow.dy}`}
          fill={shadow.color}
          transform={`translate(${shadow.dx} ${shadow.dy})`}
        >
          {bars}
        </g>
      ))}
      <g fill="currentColor">{bars}</g>
    </svg>
  );
}

function PlayIcon() {
  const triangle = <path d="M0 0v14l11-7z" />;

  return (
    <svg
      viewBox="0 0 11 14"
      fill="currentColor"
      aria-hidden
      className={`${ICON_CLASS} w-[0.72em]`}
    >
      {VHS_SHADOWS.map((shadow) => (
        <g
          key={`${shadow.dx}-${shadow.dy}`}
          fill={shadow.color}
          transform={`translate(${shadow.dx} ${shadow.dy})`}
        >
          {triangle}
        </g>
      ))}
      <g fill="currentColor">{triangle}</g>
    </svg>
  );
}

export function PauseButton({ paused, onToggle }: PauseButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={paused ? "Play film rotation" : "Pause film rotation"}
      className="vhs-text absolute top-6 left-6 z-[7] inline-flex items-center gap-1.5 text-sm leading-none transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
    >
      <span>{paused ? "PLAY" : "PAUSE"}</span>
      {paused ? <PlayIcon /> : <PauseIcon />}
    </button>
  );
}
