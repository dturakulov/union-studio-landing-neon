"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { LocaleContent } from "@/lib/i18n";
import { RemotionCanvas } from "@/components/remotion/RemotionCanvas";
import { ServiceMotionComposition } from "@/remotion/compositions/ServiceMotionComposition";

interface ServicesSectionProps {
  content: LocaleContent;
  onBookService: (serviceTitle: string) => void;
}

export function ServicesSection({
  content,
  onBookService,
}: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="lut-transition bg-[var(--bg-sky)] py-14 text-[var(--services-ink)] sm:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="grid items-end gap-6 border-b border-[var(--services-line)] pb-10 lg:grid-cols-[1.2fr_1fr_auto] lg:gap-8 lg:pb-12">
          <div>
            <span className="editorial-pill mb-3 text-xl">
              {content.services.pill}
            </span>
            <h2 className="font-display-cine text-[clamp(2.5rem,6vw,5.2rem)] text-[var(--services-ink)]">
              {content.services.title}
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-[var(--services-muted)] sm:text-base">
            {content.services.description}
          </p>

          <div>
            <button
              type="button"
              onClick={() => onBookService(content.bookingModal.serviceOptions[0])}
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border-2 border-[var(--services-ink)] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--services-ink)] transition duration-150 hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-[var(--accent-ink)] sm:w-auto cursor-pointer"
            >
              {content.services.viewAllCta}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="grid gap-5 pt-8 lg:block lg:divide-y lg:divide-[var(--services-line)] lg:pt-0">
          {content.services.items.map((service, idx) => (
            <div
              key={service.index}
              className="grid items-center gap-5 rounded-2xl border-2 border-[var(--services-ink)]/25 bg-[var(--surface-sky)] p-4 sm:p-6 lg:grid-cols-[0.4fr_1.1fr_1.05fr] lg:gap-8 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:py-10"
            >
              {/* Desktop Index Column */}
              <div className="hidden font-display-cine text-[clamp(3rem,6vw,5.4rem)] leading-none text-[var(--services-ink)] lg:block">
                {service.index}
              </div>

              {/* Mobile Inline Number + Title Header */}
              <div className="flex items-baseline gap-3 lg:hidden">
                <span className="font-display-cine text-4xl leading-none text-[var(--accent)]">
                  {service.index}
                </span>
                <div>
                  <h3 className="font-display-cine text-2xl text-[var(--services-ink)] sm:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-0.5 text-xs font-semibold text-[var(--services-muted)]">
                    {service.subtitle}
                  </p>
                </div>
              </div>

              {/* Remotion Motion Preview (Placed right under header on mobile, right column on desktop) */}
              <div className="overflow-hidden rounded-2xl border-2 border-[var(--services-ink)]/30 bg-[#0a0a0a] shadow-lg lg:order-3">
                <RemotionCanvas
                  component={ServiceMotionComposition}
                  inputProps={{
                    serviceKey: service.key,
                    label: service.title,
                    sublabel: `UNION STUDIO · ${service.index}`,
                    imageUrl: service.imageUrl,
                  }}
                  compositionWidth={1280}
                  compositionHeight={720}
                  durationInFrames={180}
                  fps={30}
                  className="w-full"
                />
              </div>

              {/* Service Details & CTA */}
              <div className="space-y-4 lg:order-2">
                <div className="hidden lg:block">
                  <h3 className="font-display-cine text-3xl text-[var(--services-ink)] sm:text-4xl">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-[var(--services-muted)]">
                    {service.subtitle}
                  </p>
                </div>

                <ul className="space-y-2 text-sm text-[var(--services-ink)]/90">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() =>
                    onBookService(
                      content.bookingModal.serviceOptions[idx] ||
                        content.bookingModal.serviceOptions[0],
                    )
                  }
                  className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-[var(--accent-ink)] transition duration-150 hover:bg-[var(--accent-hover)] sm:w-auto cursor-pointer"
                >
                  {service.ctaLabel}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
