"use client";

import React, { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { LocaleContent } from "@/lib/i18n";

export function TestimonialsSection({ content }: { content: LocaleContent }) {
  const items = content.testimonials.items;
  const [activeIndex, setActiveIndex] = useState(1);
  const touchStartX = useRef<number | null>(null);

  const prev = () => setActiveIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setActiveIndex((i) => (i + 1) % items.length);

  const visibleIndices = [
    (activeIndex - 1 + items.length) % items.length,
    activeIndex,
    (activeIndex + 1) % items.length,
  ];

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) next();
    else prev();
  };

  return (
    <section
      id="testimonials"
      className="lut-transition grain-surface bg-[var(--bg-obsidian)] py-14 text-white sm:py-24"
    >
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <span className="editorial-pill text-xl">
              {content.testimonials.pill}
            </span>
          </div>
          <h2 className="font-display-cine text-[clamp(2.5rem,6vw,5rem)] text-white">
            {content.testimonials.title}
          </h2>
        </div>

        <div
          className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-3"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {visibleIndices.map((itemIdx, slot) => {
            const item = items[itemIdx];
            const isCenter = slot === 1;
            return (
              <article
                key={`${item.id}-${slot}`}
                className={`${
                  isCenter ? "grid" : "hidden lg:grid"
                } gap-5 rounded-2xl border p-5 transition duration-200 sm:grid-cols-[1.25fr_0.85fr] sm:p-6 ${
                  isCenter
                    ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)] shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
                    : "border-white/15 bg-[var(--surface-obsidian)] text-white/90"
                }`}
              >
                <div className="flex flex-col justify-between gap-5">
                  <p className="text-sm leading-relaxed sm:text-base lg:text-sm">
                    “{item.quote}”
                  </p>
                  <div className="flex items-center gap-3 sm:block">
                    <img
                      src={item.avatarUrl}
                      alt={item.author}
                      className="h-12 w-12 shrink-0 rounded-full border border-black/25 object-cover grayscale contrast-125 sm:hidden"
                    />
                    <div>
                      <div
                        className={`text-[11px] font-bold uppercase tracking-[0.14em] ${
                          isCenter ? "opacity-85" : "text-[var(--accent)]"
                        }`}
                      >
                        {item.roleTitle}
                      </div>
                      <div
                        className={`mt-1 font-display-cine text-2xl ${
                          isCenter ? "text-[var(--accent-ink)]" : "text-white"
                        }`}
                      >
                        {item.author}
                      </div>
                      <div
                        className={`text-xs ${
                          isCenter ? "opacity-85" : "text-[#b5b0a8]"
                        }`}
                      >
                        {item.company}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden overflow-hidden rounded-xl border border-black/20 bg-black/20 sm:block">
                  <img
                    src={item.avatarUrl}
                    alt={item.author}
                    className="h-full min-h-[180px] w-full object-cover grayscale contrast-125"
                  />
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 sm:mt-10">
          <button
            type="button"
            onClick={prev}
            aria-label={content.testimonials.prevLabel}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition duration-150 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-ink)] cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <span className="font-mono text-xs tracking-widest text-[#b5b0a8]">
            0{activeIndex + 1} / 0{items.length}
          </span>
          <button
            type="button"
            onClick={next}
            aria-label={content.testimonials.nextLabel}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition duration-150 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-ink)] cursor-pointer"
          >
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
