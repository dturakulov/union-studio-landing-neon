"use client";

import React, { useState } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { LocaleContent } from "@/lib/i18n";
import { RemotionCanvas } from "@/components/remotion/RemotionCanvas";
import { BackdropsShowcaseComposition } from "@/remotion/compositions/BackdropsShowcaseComposition";

interface BackdropsSpotlightSectionProps {
  content: LocaleContent;
  onBookBackdrop: (backdropLabel: string) => void;
}

export function BackdropsSpotlightSection({
  content,
  onBookBackdrop,
}: BackdropsSpotlightSectionProps) {
  const [selectedIdx, setSelectedIdx] = useState(2);
  const [showFullCatalog, setShowFullCatalog] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const activeSet =
    content.backdrops.featuredSets[selectedIdx] ||
    content.backdrops.featuredSets[0];

  const filteredCategories =
    activeCategory === "all"
      ? content.backdrops.categories
      : content.backdrops.categories.filter((c) => c.id === activeCategory);

  return (
    <section
      id="backdrops"
      className="lut-transition bg-[var(--bg-cream)] py-14 text-[#111111] sm:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex justify-center">
            <span className="editorial-pill text-xl">
              {content.backdrops.pill}
            </span>
          </div>
          <h2 className="font-display-cine text-[clamp(2.4rem,5.8vw,5rem)] text-[#111111]">
            {content.backdrops.titlePrefix}
            <span className="font-serif-editorial font-semibold lowercase text-[var(--accent)]">
              {content.backdrops.titleItalic}
            </span>
            {content.backdrops.titleSuffix}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-[#4a4a4a] sm:text-base">
            {content.backdrops.subtitle}
          </p>
        </div>

        {/* Centered Spotlight Frame */}
        <div className="mx-auto mt-10 max-w-4xl rounded-3xl bg-[var(--accent)] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.2)] sm:mt-12 sm:p-5">
          <div className="overflow-hidden rounded-2xl bg-[#0a0a0a]">
            <RemotionCanvas
              component={BackdropsShowcaseComposition}
              inputProps={{
                setNumber: activeSet.number,
                name: activeSet.name,
                category: activeSet.category,
                lighting: activeSet.lighting,
                dimensions: activeSet.dimensions,
                imageUrl: activeSet.imageUrl,
                swatchColors: activeSet.swatchColors,
              }}
              compositionWidth={1280}
              compositionHeight={800}
              durationInFrames={180}
              fps={30}
              showPauseControl
              pauseButtonClassName="absolute bottom-3 right-3 z-30"
              pauseLabel={content.hero.pauseLabel}
              playLabel={content.hero.playLabel}
              className="w-full"
            />
          </div>

          <div className="flex flex-col justify-between gap-4 px-2 pb-2 pt-4 text-[var(--accent-ink)] sm:flex-row sm:items-center">
            <div>
              <div className="font-display-cine text-3xl text-[var(--accent-ink)]">
                {activeSet.number} · {activeSet.name}
              </div>
              <p className="mt-1 max-w-xl text-sm opacity-90">
                {activeSet.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                onBookBackdrop(`${activeSet.number} · ${activeSet.name}`)
              }
              className="inline-flex min-h-[46px] w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#111111] px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white transition duration-150 hover:bg-white hover:text-[#111111] sm:w-auto cursor-pointer"
            >
              {content.backdrops.bookSetCta}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* 7-Column Numbered Horizontal Snap Filmstrip (Mobile swipeable, Desktop 7-col) */}
        <div className="mt-10 border-t border-dashed border-black/25 pt-6 sm:mt-12 sm:pt-8">
          <div className="mb-3 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-[#4a4a4a] lg:hidden">
            <span>01–07 · {content.backdrops.pill}</span>
            <span>← →</span>
          </div>

          <div className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-7 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
            {content.backdrops.featuredSets.map((setItem, idx) => {
              const active = idx === selectedIdx;
              return (
                <button
                  key={setItem.number}
                  type="button"
                  onClick={() => setSelectedIdx(idx)}
                  aria-pressed={active}
                  className={`group w-[148px] shrink-0 snap-start rounded-2xl border p-3 text-left transition duration-150 lg:w-auto cursor-pointer ${
                    active
                      ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)] shadow-md"
                      : "border-black/15 bg-[var(--surface-cream)] text-[#111111] hover:border-[var(--accent)]"
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between font-mono text-xs font-bold">
                    <span>{setItem.number}</span>
                    <span className="h-2 w-2 rounded-full bg-current opacity-70" />
                  </div>
                  <div className="aspect-[4/3] overflow-hidden rounded-xl bg-black">
                    <img
                      src={setItem.imageUrl}
                      alt={setItem.name}
                      className={`h-full w-full object-cover transition duration-200 ${
                        active
                          ? "grayscale-0 scale-105"
                          : "grayscale group-hover:grayscale-0"
                      }`}
                    />
                  </div>
                  <div className="mt-2.5 font-display-cine text-xl leading-none">
                    {setItem.name}
                  </div>
                  <div
                    className={`mt-1 text-[11px] ${
                      active ? "opacity-85" : "text-[#4a4a4a]"
                    }`}
                  >
                    {setItem.category}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Expandable 30+ Full Catalog Directory with Interactive Category Filters */}
        <div className="mt-8 flex flex-col items-center sm:mt-10">
          <button
            type="button"
            onClick={() => setShowFullCatalog((v) => !v)}
            aria-expanded={showFullCatalog}
            className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full border-2 border-[#111111] bg-transparent px-6 py-3 text-xs font-extrabold uppercase tracking-[0.12em] text-[#111111] transition duration-150 hover:bg-[#111111] hover:text-white sm:w-auto cursor-pointer"
          >
            {showFullCatalog
              ? content.backdrops.catalogToggleClose
              : content.backdrops.catalogToggleOpen}
            {showFullCatalog ? (
              <ChevronUp className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          {showFullCatalog && (
            <div className="mt-8 w-full rounded-3xl border border-black/20 bg-[var(--surface-cream)] p-5 sm:p-8">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-black/15 pb-4">
                <span className="rounded-full bg-[var(--accent)] px-4 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent-ink)]">
                  {content.backdrops.allCountBadge}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4a4a4a]">
                  {content.brand.city}
                </span>
              </div>

              <div className="scrollbar-none -mx-2 mb-6 flex gap-2 overflow-x-auto px-2 pb-1 sm:flex-wrap sm:overflow-visible">
                <button
                  type="button"
                  onClick={() => setActiveCategory("all")}
                  aria-pressed={activeCategory === "all"}
                  className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-bold uppercase tracking-[0.08em] transition cursor-pointer ${
                    activeCategory === "all"
                      ? "bg-[#111111] text-white"
                      : "border border-black/20 bg-white text-[#111111] hover:border-[var(--accent)]"
                  }`}
                >
                  {content.backdrops.allFilterLabel}
                </button>
                {content.backdrops.categories.map((group) => (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => setActiveCategory(group.id)}
                    aria-pressed={activeCategory === group.id}
                    className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                      activeCategory === group.id
                        ? "bg-[var(--accent)] text-[var(--accent-ink)]"
                        : "border border-black/20 bg-white text-[#111111] hover:border-[var(--accent)]"
                    }`}
                  >
                    {group.label} ({group.count})
                  </button>
                ))}
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filteredCategories.map((group) => (
                  <div
                    key={group.id}
                    className="rounded-2xl border border-black/15 bg-[var(--bg-cream)] p-5"
                  >
                    <div className="flex items-baseline justify-between gap-2 border-b border-black/10 pb-3">
                      <h3 className="font-display-cine text-2xl text-[#111111]">
                        {group.label}
                      </h3>
                      <span className="font-mono text-xs font-bold text-[var(--accent)]">
                        {group.count}×
                      </span>
                    </div>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {group.sets.map((setName) => (
                        <li key={setName}>
                          <button
                            type="button"
                            onClick={() => onBookBackdrop(setName)}
                            className="rounded-full border border-black/15 bg-white px-3 py-1.5 text-xs font-medium text-[#111111] transition hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-pointer"
                          >
                            {setName}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
