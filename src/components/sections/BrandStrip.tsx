"use client";

import React from "react";
import { LocaleContent } from "@/lib/i18n";

export function BrandStrip({ content }: { content: LocaleContent }) {
  return (
    <section
      aria-label={content.logos.label}
      className="border-y border-white/12 bg-[#0a0a0a] py-8"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b5b0a8]">
          {content.logos.label}
        </p>
        <div className="grid grid-cols-2 items-center gap-4 text-center sm:grid-cols-4 lg:grid-cols-8">
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
