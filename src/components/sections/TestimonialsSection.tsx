"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { LocaleContent } from "@/lib/i18n";

export function TestimonialsSection({ content }: { content: LocaleContent }) {
  const items = content.testimonials.items;
  const [activeIndex, setActiveIndex] = useState(1);

  const prev = () => setActiveIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setActiveIndex((i) => (i + 1) % items.length);

  const visibleIndices = [
    (activeIndex - 1 + items.length) % items.length,
    activeIndex,
    (activeIndex + 1) % items.length,
  ];

  return (
    <section
      id="testimonials"
      className="grain-surface bg-[#0a0a0a] py-20 text-white sm:py-28"
    >
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <span className="editorial-pill text-xl">
              {content.testimonials.pill}
            </span>
          </div>
          <h2 className="font-display-cine text-[clamp(2.8rem,6vw,5rem)] text-white">
            {content.testimonials.title}
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {visibleIndices.map((itemIdx, slot) => {
            const item = items[itemIdx];
            const isCenter = slot === 1;
            return (
              <article
                key={`${item.id}-${slot}`}
                className={`grid gap-5 rounded-2xl border p-6 transition duration-200 sm:grid-cols-[1.25fr_0.85fr] ${
                  isCenter
                    ? "border-[#ec521b] bg-[#ec521b] text-white shadow-[0_24px_60px_rgba(236,82,27,0.3)]"
                    : "border-white/15 bg-[#141414] text-white/90"
                }`}
              >
                <div className="flex flex-col justify-between gap-6">
                  <p className="text-sm leading-relaxed">
                    “{item.quote}”
                  </p>
                  <div>
                    <div
                      className={`text-[11px] font-bold uppercase tracking-[0.14em] ${
                        isCenter ? "text-white/85" : "text-[#ec521b]"
                      }`}
                    >
                      {item.roleTitle}
                    </div>
                    <div className="mt-1 font-display-cine text-2xl text-white">
                      {item.author}
                    </div>
                    <div
                      className={`text-xs ${
                        isCenter ? "text-white/85" : "text-[#b5b0a8]"
                      }`}
                    >
                      {item.company}
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-black/20 bg-black/20">
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

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label={content.testimonials.prevLabel}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition duration-150 hover:border-[#ec521b] hover:bg-[#ec521b] cursor-pointer"
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
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition duration-150 hover:border-[#ec521b] hover:bg-[#ec521b] cursor-pointer"
          >
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
