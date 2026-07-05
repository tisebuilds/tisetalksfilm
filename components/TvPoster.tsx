import Image from "next/image";

interface TvPosterProps {
  src: string;
  alt: string;
}

export function TvPoster({ src, alt }: TvPosterProps) {
  return (
    <div className="relative h-[min(55vh,420px)] w-[min(42vw,280px)] overflow-hidden rounded-sm shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="280px"
        className="object-cover"
        priority
      />
    </div>
  );
}
