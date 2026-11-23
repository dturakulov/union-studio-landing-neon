"use client";

import React from "react";
import {
  ArrowUpRight,
  Camera,
  Film,
  Mail,
  MapPin,
  Mic,
  Phone,
} from "lucide-react";
import { LocaleContent, STUDIO_CONTACTS } from "@/lib/i18n";
import { media } from "@/lib/media";
import { RemotionCanvas } from "@/components/remotion/RemotionCanvas";
import { FooterStingerComposition } from "@/remotion/compositions/FooterStingerComposition";

interface FooterSectionProps {
  content: LocaleContent;
  onOpenBooking: () => void;
}

export function FooterSection({ content, onOpenBooking }: FooterSectionProps) {
  return (
    <footer
      id="contact"
      className="lut-transition grain-surface bg-[var(--bg-obsidian)] pt-14 text-white sm:pt-20"
    >
      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-8">
        {/* Top 2-Column Split */}
        <div className="grid items-center gap-10 border-b border-dotted border-white/25 pb-16 lg:grid-cols-[1.25fr_0.85fr]">
          <div className="space-y-6">
            <div className="font-display-cine text-2xl tracking-wider text-[var(--accent)]">
              {content.brand.name} · {content.brand.city}
            </div>
            <h2 className="font-display-cine text-[clamp(3rem,6.5vw,5.8rem)] leading-[0.88] text-white">
              {content.footer.ctaPrefix}
              <span className="font-serif-editorial font-semibold lowercase text-[var(--accent)]">
                {content.footer.ctaItalic}
              </span>
              {content.footer.ctaSuffix}
            </h2>
            <p className="max-w-lg text-sm leading-relaxed text-[#b5b0a8] sm:text-base">
              {content.footer.ctaSubtext}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent-ink)] transition duration-150 hover:bg-[var(--accent-hover)] active:scale-[0.98] cursor-pointer"
              >
                {content.footer.ctaButton}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <a
                href={`tel:${STUDIO_CONTACTS.phone1.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3.5 text-xs font-bold uppercase tracking-[0.1em] text-white transition duration-150 hover:border-[var(--accent)]"
              >
                <Phone className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                {content.footer.phone1}
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-3xl border border-white/20 bg-[#141414]">
            <RemotionCanvas
              component={FooterStingerComposition}
              inputProps={{
                cityLabel: content.brand.city,
                imageUrl: media.filmCamera,
              }}
              compositionWidth={1080}
              compositionHeight={1080}
              durationInFrames={180}
              fps={30}
              className="w-full"
            />
          </div>
        </div>

        {/* Middle Links + Samarkand Contacts + Social Squares */}
        <div className="grid gap-10 border-b border-dotted border-white/25 py-12 md:grid-cols-3">
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            {content.footer.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.14em] text-white/80 transition duration-150 hover:text-[#ec521b]"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="space-y-2 text-sm">
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#ec521b]">
              {content.footer.contactsLabel}
            </div>
            <p className="flex items-center gap-2 text-white">
              <MapPin className="h-4 w-4 text-[#ec521b]" aria-hidden="true" />
              {content.footer.address}
            </p>
            <p className="text-[#b5b0a8]">{content.footer.hours}</p>
            <div className="flex flex-wrap gap-4 pt-1 text-white">
              <a
                href={`tel:${STUDIO_CONTACTS.phone1.replace(/\s+/g, "")}`}
                className="hover:text-[#ec521b]"
              >
                {content.footer.phone1}
              </a>
              <a
                href={`tel:${STUDIO_CONTACTS.phone2.replace(/\s+/g, "")}`}
                className="hover:text-[#ec521b]"
              >
                {content.footer.phone2}
              </a>
            </div>
            <p className="text-xs text-[#b5b0a8]">{content.footer.email}</p>
          </div>

          <div className="flex items-center gap-3 md:justify-end">
            <a
              href={STUDIO_CONTACTS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 text-white transition duration-150 hover:border-[#ec521b] hover:bg-[#ec521b]"
            >
              <Camera className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="#work"
              aria-label="Reels & Video"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 text-white transition duration-150 hover:border-[#ec521b] hover:bg-[#ec521b]"
            >
              <Film className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="#services"
              aria-label="Podcast"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 text-white transition duration-150 hover:border-[#ec521b] hover:bg-[#ec521b]"
            >
              <Mic className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={`mailto:${STUDIO_CONTACTS.email}`}
              aria-label="Email"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 text-white transition duration-150 hover:border-[#ec521b] hover:bg-[#ec521b]"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-24 pt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b5b0a8] lg:pb-6">
          <span>{content.footer.legal}</span>
          <span>{content.brand.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
