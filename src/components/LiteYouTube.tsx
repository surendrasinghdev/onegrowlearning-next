"use client";

import { useState } from "react";
import { PlayIcon } from "./icons";

// Shows the thumbnail first and loads the YouTube player only on click, so the page stays fast.
export function LiteYouTube({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-navy">
      {play ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlay(true)} className="group absolute inset-0 size-full" aria-label={`Play video: ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- remote YouTube thumbnail */}
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" className="size-full scale-[1.34] object-cover opacity-90 transition group-hover:opacity-100" />
          <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent" />
          <span className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-brand shadow-lift transition group-hover:scale-110">
            <PlayIcon className="ml-1 size-7" />
          </span>
          <span className="absolute inset-x-0 bottom-0 p-4 text-left text-sm font-semibold text-white">{title}</span>
        </button>
      )}
    </div>
  );
}
