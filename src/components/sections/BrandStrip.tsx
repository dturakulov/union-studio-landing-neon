"use client";

import React from "react";
import { LocaleContent } from "@/lib/i18n";

export function BrandStrip({ content }: { content: LocaleContent }) {
  const marqueeItems = [...content.logos.items, ...content.logos.items];

  return (
    <section
      aria-label={content.logos.label}
      className="lut-transition border-y border-white/12 bg-[var(--bg-obsidian)] py-6 sm:py-8"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b5b0a8] sm:mb-5 sm:text-[11px]">
          {content.logos.label}
        </p>

        {/* Mobile Continuous Horizontal Marquee */}
        <div className="overflow-hidden md:hidden">
          <div className="marquee-track items-center gap-8">
            {marqueeItems.map((brand, idx) => (
              <span
                key={`${brand}-${idx}`}
                className="font-display-cine shrink-0 text-xl tracking-[0.08em] text-white/75"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Desktop Centered Grid */}
        <div className="hidden grid-cols-4 items-center gap-4 text-center md:grid lg:grid-cols-8">
          {content.logos.items.map((brand) => (
            <div
              key={brand}
              className="font-display-cine text-xl tracking-[0.06em] text-white/65 transition duration-150 hover:text-white"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
