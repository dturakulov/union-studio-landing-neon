"use client";

import React, { useState } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
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
  const [heroPaused, setHeroPaused] = useState(() =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  return (
    <section className="grain-surface relative flex min-h-[100svh] flex-col overflow-hidden bg-[#0a0a0a] pt-16 lg:min-h-[min(100svh,742px)]">
      {/* Full-Bleed Remotion Showreel Stage Backdrop */}
      <div className="absolute inset-0">
        <RemotionCanvas
          fit="cover"
          component={HeroShowreelComposition}
          inputProps={{
            scenes: HERO_DEFAULT_SCENES,
            studioBadge: `${content.brand.name} · ${content.brand.city}`,
            showEmbeddedHud: false,
          }}
          compositionWidth={1920}
          compositionHeight={1080}
          durationInFrames={300}
          fps={30}
          externalPaused={heroPaused}
          showPauseControl={false}
          ariaLabel={content.hero.motionHint}
          className="h-full w-full"
        />
      </div>

      {/* Foreground CineX Labs Editorial Overlay */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-between gap-6 px-4 pb-24 pt-4 sm:px-8 sm:pb-24 sm:pt-5 lg:pb-7">
        {/* Responsive Cinema HUD Row (Safely Below Fixed Navbar) */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#0a0a0a]/75 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
              <span
                className="h-2 w-2 rounded-full bg-[#ec521b]"
                aria-hidden="true"
              />
              REC · {content.brand.name}
            </span>
            <span className="rounded-full border border-[#ec521b]/55 bg-[#ec521b]/20 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
              {content.hero.topRightCaption}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2.5">
            <span className="hidden rounded-full border border-white/15 bg-[#0a0a0a]/70 px-3 py-1.5 font-mono text-[11px] tracking-[0.16em] text-white/80 backdrop-blur-sm md:inline-flex">
              {content.hero.topLeftCaption}
            </span>
            <button
              type="button"
              onClick={() => setHeroPaused((p) => !p)}
              aria-label={
                heroPaused ? content.hero.playLabel : content.hero.pauseLabel
              }
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-[#0a0a0a]/80 text-white backdrop-blur-sm transition duration-150 hover:border-[#ec521b] hover:bg-[#ec521b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
            >
              {heroPaused ? (
                <Play className="h-4 w-4 translate-x-0.5" aria-hidden="true" />
              ) : (
                <Pause className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Main Hero Typography + Action Glass Card */}
        <div className="grid items-end gap-6 py-2 lg:grid-cols-[1.45fr_0.78fr] lg:gap-10">
          <div>
            <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#f05a24] sm:text-xs">
              {content.brand.tagline}
            </p>
            <h1 className="font-display-cine text-[clamp(2.85rem,11.2vw,6.25rem)] leading-[0.88] text-white">
              <span className="block">{content.hero.headlineLine1}</span>
              <span className="block">{content.hero.headlineLine2}</span>
              <span className="inline-block pr-3 sm:pr-4">
                {content.hero.headlineLine3}
              </span>
              <span className="font-serif-editorial inline-block text-[clamp(2.45rem,9.2vw,5.3rem)] font-semibold lowercase tracking-normal text-[#ec521b]">
                {content.hero.headlineSerif}
              </span>
            </h1>
          </div>

          <div className="space-y-4 rounded-2xl border border-white/15 bg-[#0a0a0a]/80 p-4 backdrop-blur-md sm:p-5">
            <p className="text-sm leading-relaxed text-[#e6e0d6]">
              {content.hero.bio}
            </p>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex min-h-[46px] w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#ec521b] px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white transition duration-150 hover:bg-[#d84310] active:scale-[0.98] sm:w-auto cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {content.hero.primaryCta}
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onOpenShowreel}
                className="inline-flex min-h-[46px] w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/30 bg-white/5 px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white transition duration-150 hover:border-[#ec521b] hover:bg-white/10 sm:w-auto cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Play
                  className="h-3.5 w-3.5 shrink-0 fill-current"
                  aria-hidden="true"
                />
                {content.hero.showreelCta}
              </button>
            </div>
            <div className="border-t border-white/10 pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b5b0a8]">
              {content.brand.pillars}
            </div>
          </div>
        </div>

        {/* Bottom 4-Stage Visual Progress Strip (Aligned to Page Container) */}
        <div className="grid grid-cols-2 gap-3 pt-1 sm:grid-cols-4 sm:gap-4">
          {HERO_DEFAULT_SCENES.map((scene, idx) => (
            <button
              key={scene.tag}
              type="button"
              onClick={onOpenShowreel}
              className="group text-left transition duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.14em] text-white/75 group-hover:text-white">
                <span>{scene.tag}</span>
                <span className="font-mono text-[10px] text-[#ec521b]">
                  0{idx + 1}
                </span>
              </div>
              <div className="mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-white/20">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    idx === 0
                      ? "w-full bg-[#ec521b]"
                      : "w-1/3 bg-white/40 group-hover:w-full group-hover:bg-[#ec521b]"
                  }`}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
