"use client";

import React, { useState } from "react";
import { ArrowUpRight, Maximize2, Pause, Play } from "lucide-react";
import { Lang, LocaleContent } from "@/lib/i18n";
import { LutId, STUDIO_LUTS, getStudioLut } from "@/lib/lut";
import { RemotionCanvas } from "@/components/remotion/RemotionCanvas";
import {
  HERO_DEFAULT_SCENES,
  HeroShowreelComposition,
} from "@/remotion/compositions/HeroShowreelComposition";

interface HeroSectionProps {
  content: LocaleContent;
  lang: Lang;
  lut: LutId;
  onLutChange: (lut: LutId) => void;
  onOpenBooking: () => void;
  onOpenShowreel: () => void;
}

const CHAPTER_FRAMES = [0, 75, 150, 225];
const MOBILE_CHAPTER_NAMES: Record<Lang, string[]> = {
  uz: ["Stage", "Podcast", "Reels", "Brand"],
  ru: ["Сцена", "Podcast", "Reels", "Бренд"],
};

export function HeroSection({
  content,
  lang,
  lut,
  onLutChange,
  onOpenBooking,
  onOpenShowreel,
}: HeroSectionProps) {
  const [heroPaused, setHeroPaused] = useState(() =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  const [activeChapter, setActiveChapter] = useState(0);
  const [seekRequest, setSeekRequest] = useState<{
    frame: number;
    nonce: number;
  } | null>(null);

  const activeLut = getStudioLut(lut);
  const mobilePitch =
    lang === "uz"
      ? "30+ tayyor fon · 4K syomka va montaj · Podcast, Reels va SMM."
      : "30+ готовых фонов · 4K съёмка и монтаж · Podcast, Reels и SMM.";
  const mobileBookLabel = lang === "uz" ? "Bron qilish" : "Бронировать";
  const mobileReelLabel = lang === "uz" ? "Showreel" : "Showreel";
  const expandShowreelLabel =
    lang === "uz" ? "To'liq showreelni ochish" : "Открыть полный Showreel";

  const handleSelectChapter = (idx: number) => {
    setActiveChapter(idx);
    setHeroPaused(false);
    setSeekRequest((prev) => ({
      frame: CHAPTER_FRAMES[idx] ?? 0,
      nonce: (prev?.nonce ?? 0) + 1,
    }));
  };

  return (
    <section
      id="hero-stage"
      className="lut-transition grain-surface relative flex flex-col overflow-hidden bg-[var(--bg-obsidian)] pt-16 lg:min-h-[min(100svh,742px)]"
    >
      {/* Desktop Full-Bleed Remotion Showreel Stage Backdrop */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <RemotionCanvas
          fit="cover"
          component={HeroShowreelComposition}
          inputProps={{
            scenes: HERO_DEFAULT_SCENES,
            studioBadge: `${content.brand.name} · ${content.brand.city}`,
            showEmbeddedHud: false,
            framingMode: "backdrop",
            accentColor: activeLut.accentHex,
          }}
          compositionWidth={1920}
          compositionHeight={1080}
          durationInFrames={300}
          fps={30}
          externalPaused={heroPaused}
          seekRequest={seekRequest}
          showPauseControl={false}
          ariaLabel={content.hero.motionHint}
          className="h-full w-full"
        />
      </div>

      {/* MOBILE SHOWSTOPPER HERO (< lg) */}
      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col gap-3.5 px-4 pb-6 pt-3 lg:hidden">
        {/* Top Mobile Cinema HUD + 3-Dot Studio LUT Switcher */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md">
            <span
              className="h-2 w-2 rounded-full bg-[var(--accent)]"
              aria-hidden="true"
            />
            REC · {content.brand.city}
          </span>

          <div className="flex items-center gap-2">
            <div
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-2 py-1 backdrop-blur-md"
              role="group"
              aria-label="Studio LUT"
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/60">
                LUT
              </span>
              {STUDIO_LUTS.map((preset) => {
                const selected = preset.id === lut;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => onLutChange(preset.id)}
                    aria-label={preset.label}
                    aria-pressed={selected}
                    title={preset.label}
                    className={`h-4 w-4 rounded-full border transition duration-150 cursor-pointer ${
                      selected
                        ? "scale-110 border-white ring-2 ring-white/40"
                        : "border-white/30 opacity-75 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: preset.swatch }}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setHeroPaused((p) => !p)}
              aria-label={
                heroPaused ? content.hero.playLabel : content.hero.pauseLabel
              }
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] text-white transition hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-ink)] cursor-pointer"
            >
              {heroPaused ? (
                <Play className="h-3.5 w-3.5 translate-x-0.5" aria-hidden="true" />
              ) : (
                <Pause className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Punchy Mobile Editorial Headline */}
        <div>
          <p className="mb-1.5 truncate text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
            {content.brand.pillars}
          </p>
          <h1 className="font-display-cine text-[clamp(2.55rem,10.6vw,3.3rem)] leading-[0.88] text-white">
            <span className="block">
              {content.hero.headlineLine1} {content.hero.headlineLine2}
            </span>
            <span className="inline-block pr-2.5">
              {content.hero.headlineLine3}
            </span>
            <span className="font-serif-editorial inline-block text-[clamp(2.2rem,9vw,2.8rem)] font-semibold lowercase tracking-normal text-[var(--accent)]">
              {content.hero.headlineSerif}
            </span>
          </h1>
        </div>

        {/* Framed Live Remotion Cinema Viewport */}
        <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-[#0d0d10] shadow-[0_22px_55px_rgba(0,0,0,0.7)]">
          <RemotionCanvas
            component={HeroShowreelComposition}
            inputProps={{
              scenes: HERO_DEFAULT_SCENES,
              studioBadge: `${content.brand.name} · ${content.brand.city}`,
              showEmbeddedHud: false,
              framingMode: "cinema",
              accentColor: activeLut.accentHex,
            }}
            compositionWidth={1600}
            compositionHeight={1000}
            durationInFrames={300}
            fps={30}
            externalPaused={heroPaused}
            seekRequest={seekRequest}
            showPauseControl={false}
            ariaLabel={content.hero.motionHint}
            className="w-full"
          />
          <button
            type="button"
            onClick={onOpenShowreel}
            aria-label={expandShowreelLabel}
            className="absolute right-2.5 top-2.5 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-[#070709]/75 text-white backdrop-blur-sm transition hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-ink)] cursor-pointer"
          >
            <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        {/* Interactive Mobile Remotion Chapter Pills */}
        <div className="grid grid-cols-4 gap-1.5">
          {MOBILE_CHAPTER_NAMES[lang].map((name, idx) => {
            const active = idx === activeChapter;
            return (
              <button
                key={name}
                type="button"
                onClick={() => handleSelectChapter(idx)}
                aria-pressed={active}
                className={`whitespace-nowrap rounded-xl border px-1.5 py-2 text-center text-[10px] font-bold uppercase tracking-[0.06em] transition duration-150 cursor-pointer ${
                  active
                    ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-ink)]"
                    : "border-white/15 bg-white/[0.04] text-white/75 hover:border-white/35"
                }`}
              >
                0{idx + 1} · {name}
              </button>
            );
          })}
        </div>

        {/* Clean Unboxed Mobile Pitch + Dual Action Row */}
        <p className="text-xs leading-relaxed text-[#cfc9bf]">{mobilePitch}</p>

        <div className="grid grid-cols-[1.25fr_1fr] gap-2.5">
          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex min-h-[48px] items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[var(--accent)] px-4 text-xs font-extrabold uppercase tracking-[0.09em] text-[var(--accent-ink)] transition duration-150 hover:bg-[var(--accent-hover)] active:scale-[0.98] cursor-pointer"
          >
            {mobileBookLabel}
            <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onOpenShowreel}
            className="inline-flex min-h-[48px] items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-white/25 bg-white/[0.06] px-4 text-xs font-bold uppercase tracking-[0.09em] text-white transition duration-150 hover:border-[var(--accent)] active:scale-[0.98] cursor-pointer"
          >
            <Play className="h-3.5 w-3.5 shrink-0 fill-current" aria-hidden="true" />
            {mobileReelLabel}
          </button>
        </div>
      </div>

      {/* DESKTOP CINEX LABS EDITORIAL HERO (lg+ — Verified 1536x742) */}
      <div className="relative z-10 mx-auto hidden w-full max-w-[1440px] flex-1 flex-col justify-between gap-6 px-8 pb-7 pt-5 lg:flex">
        {/* Responsive Cinema HUD Row + Live 3-LUT Switcher */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#070709]/75 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
              <span
                className="h-2 w-2 rounded-full bg-[var(--accent)]"
                aria-hidden="true"
              />
              REC · {content.brand.name}
            </span>
            <span className="rounded-full border border-[var(--accent)]/60 bg-[var(--accent)]/20 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
              {content.hero.topRightCaption}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2.5">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#070709]/75 px-3 py-1.5 backdrop-blur-sm"
              role="group"
              aria-label="Studio LUT"
            >
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white/65">
                LUT
              </span>
              {STUDIO_LUTS.map((preset) => {
                const selected = preset.id === lut;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => onLutChange(preset.id)}
                    aria-label={preset.label}
                    aria-pressed={selected}
                    title={preset.label}
                    className={`h-4 w-4 rounded-full border transition duration-150 cursor-pointer ${
                      selected
                        ? "scale-110 border-white ring-2 ring-white/40"
                        : "border-white/30 opacity-75 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: preset.swatch }}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setHeroPaused((p) => !p)}
              aria-label={
                heroPaused ? content.hero.playLabel : content.hero.pauseLabel
              }
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-[#070709]/80 text-white backdrop-blur-sm transition duration-150 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
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
        <div className="grid items-end gap-10 py-2 lg:grid-cols-[1.45fr_0.78fr]">
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--accent-soft)]">
              {content.brand.tagline}
            </p>
            <h1 className="font-display-cine text-[clamp(3.6rem,6.6vw,6.25rem)] leading-[0.88] text-white">
              <span className="block">{content.hero.headlineLine1}</span>
              <span className="block">{content.hero.headlineLine2}</span>
              <span className="inline-block pr-4">
                {content.hero.headlineLine3}
              </span>
              <span className="font-serif-editorial inline-block text-[clamp(3.2rem,5.8vw,5.3rem)] font-semibold lowercase tracking-normal text-[var(--accent)]">
                {content.hero.headlineSerif}
              </span>
            </h1>
          </div>

          <div className="space-y-4 rounded-2xl border border-white/15 bg-[#070709]/78 p-5 backdrop-blur-md">
            <p className="text-sm leading-relaxed text-[#e6e0d6]">
              {content.hero.bio}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[var(--accent)] px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] text-[var(--accent-ink)] transition duration-150 hover:bg-[var(--accent-hover)] active:scale-[0.98] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {content.hero.primaryCta}
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onOpenShowreel}
                className="inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/30 bg-white/5 px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white transition duration-150 hover:border-[var(--accent)] hover:bg-white/10 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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

        {/* Interactive Desktop 4-Stage Chapter Strip */}
        <div className="grid grid-cols-4 gap-4 pt-1">
          {HERO_DEFAULT_SCENES.map((scene, idx) => {
            const active = idx === activeChapter;
            return (
              <button
                key={scene.tag}
                type="button"
                onClick={() => handleSelectChapter(idx)}
                className="group text-left transition duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <div
                  className={`flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.14em] ${
                    active ? "text-white" : "text-white/65 group-hover:text-white"
                  }`}
                >
                  <span>{scene.tag}</span>
                  <span className="font-mono text-[10px] text-[var(--accent)]">
                    0{idx + 1}
                  </span>
                </div>
                <div className="mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-white/20">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      active
                        ? "w-full bg-[var(--accent)]"
                        : "w-1/3 bg-white/35 group-hover:w-full group-hover:bg-[var(--accent)]"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
