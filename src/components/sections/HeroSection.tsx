"use client";

import React from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { LocaleContent } from "@/lib/i18n";
import { RemotionCanvas } from "@/components/remotion/RemotionCanvas";
import {
  HERO_DEFAULT_SCENES,
  HeroShowreelComposition,
} from "@/remotion/compositions/HeroShowreelComposition";

interface HeroSectionProps {
  content: LocaleContent;
  onOpenBooking: () => void;
  onOpenShowreel: () => void;
}

export function HeroSection({
  content,
  onOpenBooking,
  onOpenShowreel,
}: HeroSectionProps) {
  return (
    <section className="grain-surface relative min-h-[88svh] overflow-hidden bg-[#0a0a0a] pt-16">
      {/* Live Remotion Showreel Stage Backdrop */}
      <div className="absolute inset-0">
        <RemotionCanvas
          component={HeroShowreelComposition}
          inputProps={{
            scenes: HERO_DEFAULT_SCENES,
            studioBadge: `${content.brand.name} · ${content.brand.city}`,
          }}
          compositionWidth={1920}
          compositionHeight={1080}
          durationInFrames={300}
          fps={30}
          showPauseControl
          pauseLabel={content.hero.pauseLabel}
          playLabel={content.hero.playLabel}
          ariaLabel={content.hero.motionHint}
          className="h-full w-full"
        />
      </div>

      {/* Foreground CineX Labs Editorial Overlay */}
      <div className="relative z-10 mx-auto flex min-h-[calc(88svh-4rem)] max-w-[1440px] flex-col justify-between px-4 pb-20 pt-24 pointer-events-none sm:px-8 sm:pb-24 sm:pt-28">
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">
          <span>{content.hero.topLeftCaption}</span>
          <span>{content.hero.topRightCaption}</span>
        </div>

        <div className="grid items-end gap-8 pt-14 lg:grid-cols-[1.45fr_0.75fr]">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#f05a24]">
              {content.brand.tagline}
            </p>
            <h1 className="font-display-cine text-[clamp(3rem,8vw,7rem)] leading-[0.88] text-white">
              <span className="block">{content.hero.headlineLine1}</span>
              <span className="block">{content.hero.headlineLine2}</span>
              <span className="inline-block pr-4">
                {content.hero.headlineLine3}
              </span>
              <span className="font-serif-editorial inline-block text-[clamp(2.6rem,6.8vw,6rem)] font-semibold lowercase tracking-normal text-[#ec521b]">
                {content.hero.headlineSerif}
              </span>
            </h1>
          </div>

          <div className="pointer-events-auto space-y-5 rounded-2xl border border-white/15 bg-[#0a0a0a]/75 p-5 backdrop-blur-md sm:p-6">
            <p className="text-sm leading-relaxed text-[#e6e0d6]">
              {content.hero.bio}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex shrink-0 whitespace-nowrap items-center gap-2 rounded-full bg-[#ec521b] px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white transition duration-150 hover:bg-[#d84310] active:scale-[0.98] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {content.hero.primaryCta}
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onOpenShowreel}
                className="inline-flex shrink-0 whitespace-nowrap items-center gap-2 rounded-full border border-white/30 bg-white/5 px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white transition duration-150 hover:border-[#ec521b] hover:bg-white/10 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Play className="h-3.5 w-3.5 shrink-0 fill-current" aria-hidden="true" />
                {content.hero.showreelCta}
              </button>
            </div>
            <div className="border-t border-white/10 pt-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#b5b0a8]">
              {content.brand.pillars}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
