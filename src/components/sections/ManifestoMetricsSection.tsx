"use client";

import React from "react";
import { LocaleContent } from "@/lib/i18n";
import { RemotionCanvas } from "@/components/remotion/RemotionCanvas";
import { AnimatedMetric, MotionReveal } from "@/components/ui/MotionReveal";
import {
  STUDIO_INTRO_DEFAULT_FRAMES,
  StudioIntroReelComposition,
} from "@/remotion/compositions/StudioIntroReelComposition";

export function ManifestoMetricsSection({
  content,
}: {
  content: LocaleContent;
}) {
  return (
    <section className="lut-transition grain-surface bg-[var(--bg-obsidian)] py-14 sm:py-24">
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-8">
        <MotionReveal>
          <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.15fr] lg:gap-14">
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-[var(--surface-obsidian)] shadow-2xl">
              <RemotionCanvas
                component={StudioIntroReelComposition}
                inputProps={{
                  title: content.brand.name,
                  subtitle: content.brand.pillars,
                  frames: STUDIO_INTRO_DEFAULT_FRAMES,
                }}
                compositionWidth={1280}
                compositionHeight={720}
                durationInFrames={240}
                fps={30}
                showPauseControl
                pauseButtonClassName="absolute bottom-3 right-3 z-30"
                pauseLabel={content.hero.pauseLabel}
                playLabel={content.hero.playLabel}
                className="w-full"
              />
            </div>

            <div className="space-y-4 sm:space-y-5">
              <h2 className="font-display-cine text-[clamp(2.15rem,4.9vw,4.3rem)] leading-[0.92] text-[var(--accent)]">
                {content.manifesto.statementPrefix}
                <span className="font-serif-editorial font-semibold lowercase text-white">
                  {content.manifesto.statementItalic}
                </span>
                {content.manifesto.statementSuffix}
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-[#b5b0a8] sm:text-base">
                {content.manifesto.subtext}
              </p>
            </div>
          </div>
        </MotionReveal>

        {/* Mobile High-Impact 3-Column KPI Strip */}
        <MotionReveal delayMs={80}>
          <div className="mt-10 grid grid-cols-3 gap-2 border-y border-white/15 py-5 md:hidden">
            {content.manifesto.metrics.map((metric, idx) => (
              <div
                key={metric.label}
                className={`text-center ${
                  idx > 0 ? "border-l border-white/15 pl-2" : ""
                }`}
              >
                <div className="font-display-cine text-[2.4rem] leading-none text-[var(--accent)]">
                  <AnimatedMetric value={metric.value} />
                </div>
                <div className="mt-1.5 text-[10px] font-bold uppercase leading-tight tracking-[0.08em] text-white/90">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </MotionReveal>

        {/* Desktop 3-Column Bordered KPI Grid */}
        <div className="mt-16 hidden border-y border-white/15 md:grid md:grid-cols-3">
          {content.manifesto.metrics.map((metric, idx) => (
            <div
              key={metric.label}
              className={`py-8 md:px-8 ${
                idx > 0
                  ? "border-t border-white/15 md:border-l md:border-t-0"
                  : "md:pl-0"
              }`}
            >
              <div className="font-display-cine text-[clamp(3.6rem,6vw,5.5rem)] leading-none text-[var(--accent)]">
                <AnimatedMetric value={metric.value} />
              </div>
              <div className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-white">
                {metric.label}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#b5b0a8]">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
