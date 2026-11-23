"use client";

import React from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { LocaleContent, WorkItem } from "@/lib/i18n";
import { RemotionCanvas } from "@/components/remotion/RemotionCanvas";
import { ReelShowcaseComposition } from "@/remotion/compositions/ReelShowcaseComposition";

interface SelectedWorkSectionProps {
  content: LocaleContent;
  onSelectWork: (item: WorkItem) => void;
  onOpenBooking: () => void;
}

export function SelectedWorkSection({
  content,
  onSelectWork,
  onOpenBooking,
}: SelectedWorkSectionProps) {
  const [first, second, third, fourth] = content.work.items;

  return (
    <section
      id="work"
      className="lut-transition bg-[var(--bg-cream)] py-14 text-[#111111] sm:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        {/* Centered Header with Tilted Orange Pill */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex justify-center">
            <span className="editorial-pill text-xl sm:text-2xl">
              {content.work.pill}
            </span>
          </div>
          <h2 className="font-display-cine text-[clamp(2.8rem,6.5vw,5.6rem)] text-[#111111]">
            {content.work.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#4a4a4a] sm:text-base">
            {content.work.subtitle}
          </p>
        </div>

        <div className="my-12 border-t border-black/15" />

        {/* Asymmetric 2-Column Masonry Grid */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left Column */}
          <div className="space-y-12">
            {first && (
              <WorkPosterCard
                item={first}
                watchLabel={content.work.watchMotionCta}
                sticker={{
                  text: content.work.stickerBlue,
                  tone: "sky",
                }}
                onSelect={() => onSelectWork(first)}
              />
            )}

            {third && (
              <WorkPosterCard
                item={third}
                watchLabel={content.work.watchMotionCta}
                sticker={{
                  text: content.work.stickerGold,
                  tone: "gold",
                }}
                onSelect={() => onSelectWork(third)}
              />
            )}
          </div>

          {/* Right Column (Staggered Down) */}
          <div className="space-y-12 lg:pt-20">
            {second && (
              <WorkPosterCard
                item={second}
                watchLabel={content.work.watchMotionCta}
                onSelect={() => onSelectWork(second)}
              />
            )}

            {/* Narrative Block + Rotating Pink Stamp */}
            <div className="flex flex-col justify-between gap-6 rounded-2xl border border-black/15 bg-[var(--surface-cream)] p-6 sm:flex-row sm:items-center sm:p-8">
              <div className="max-w-sm space-y-2">
                <h3 className="font-display-cine text-3xl text-[#111111]">
                  {content.work.narrativeHeading}
                </h3>
                <p className="text-sm leading-relaxed text-[#4a4a4a]">
                  {content.work.narrativeBody}
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenBooking}
                aria-label={content.nav.bookBtn}
                className="group relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-[var(--sticker-pink)] text-[#111111] transition duration-200 hover:scale-105 hover:bg-[var(--accent)] hover:text-[var(--accent-ink)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111]"
              >
                <svg
                  viewBox="0 0 140 140"
                  className="stamp-spin h-28 w-28"
                  aria-hidden="true"
                >
                  <defs>
                    <path
                      id="work-stamp-circle"
                      d="M 70, 70 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
                    />
                  </defs>
                  <text
                    fill="currentColor"
                    fontSize="10.5"
                    fontWeight="800"
                    letterSpacing="2.2"
                  >
                    <textPath href="#work-stamp-circle">
                      {content.work.stampCta}
                    </textPath>
                  </text>
                </svg>
                <ArrowUpRight
                  className="absolute h-6 w-6 transition duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </button>
            </div>

            {fourth && (
              <WorkPosterCard
                item={fourth}
                watchLabel={content.work.watchMotionCta}
                onSelect={() => onSelectWork(fourth)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkPosterCard({
  item,
  watchLabel,
  sticker,
  onSelect,
}: {
  item: WorkItem;
  watchLabel: string;
  sticker?: { text: string; tone: "sky" | "gold" };
  onSelect: () => void;
}) {
  return (
    <article className="group relative">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#4a4a4a]">
          {item.eyebrow}
        </span>
        <span className="rounded-full border border-black/20 px-3 py-0.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#111111]">
          {item.metric}
        </span>
      </div>

      <div className="relative overflow-hidden rounded-2xl border-2 border-[#111111] bg-[#0a0a0a] shadow-[0_18px_40px_rgba(17,17,17,0.14)]">
        <RemotionCanvas
          component={ReelShowcaseComposition}
          inputProps={{
            variant: item.variant,
            title: item.title,
            subtitle: item.subtitle,
            metric: item.metric,
            tag: item.tag,
            imageUrl: item.imageUrl,
            accentColor: item.accentColor,
          }}
          compositionWidth={1080}
          compositionHeight={1350}
          durationInFrames={180}
          fps={30}
          className="w-full"
        />

        <button
          type="button"
          onClick={onSelect}
          className="absolute inset-0 z-20 flex items-end justify-between bg-gradient-to-t from-black/75 via-transparent to-transparent p-4 text-left opacity-100 transition duration-200 sm:p-5 lg:opacity-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100 cursor-pointer"
        >
          <span className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[var(--accent-ink)] shadow-lg">
            <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            {watchLabel}
          </span>
        </button>

        {sticker && (
          <div
            className={`pointer-events-none absolute right-3 top-14 z-20 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#111111] p-2 text-center text-[9px] font-extrabold uppercase leading-tight tracking-wider text-[#111111] shadow-md -rotate-6 sm:right-4 sm:top-16 sm:h-24 sm:w-24 sm:text-[10px] ${
              sticker.tone === "sky"
                ? "bg-[var(--sticker-sky)]"
                : "bg-[var(--sticker-gold)]"
            }`}
          >
            {sticker.text}
          </div>
        )}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-[#4a4a4a]">
        {item.description}
      </p>
    </article>
  );
}
