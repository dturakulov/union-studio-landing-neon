"use client";

import React from "react";
import { LocaleContent } from "@/lib/i18n";
import { RemotionCanvas } from "@/components/remotion/RemotionCanvas";
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
    <section className="grain-surface bg-[#0a0a0a] py-20 sm:py-28">
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.15fr] lg:gap-14">
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#141414] shadow-2xl">
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
              pauseLabel={content.hero.pauseLabel}
              playLabel={content.hero.playLabel}
              className="w-full"
            />
          </div>

          <div className="space-y-6">
            <h2 className="font-display-cine text-[clamp(2.4rem,4.9vw,4.3rem)] leading-[0.92] text-[#ec521b]">
              {content.manifesto.statementPrefix}
              <span className="font-serif-editorial font-semibold lowercase text-white">
                {content.manifesto.statementItalic}
              </span>
              {content.manifesto.statementSuffix}
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-[#b5b0a8]">
              {content.manifesto.subtext}
            </p>
          </div>
        </div>

        <div className="mt-16 grid border-y border-white/15 md:grid-cols-3">
          {content.manifesto.metrics.map((metric, idx) => (
            <div
              key={metric.label}
              className={`py-8 md:px-8 ${
                idx > 0
                  ? "border-t border-white/15 md:border-l md:border-t-0"
                  : "md:pl-0"
              }`}
            >
              <div className="font-display-cine text-[clamp(3.6rem,6vw,5.5rem)] leading-none text-[#ec521b]">
                {metric.value}
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
