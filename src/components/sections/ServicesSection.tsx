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
      className="bg-[#7ecbf2] py-20 text-[#111111] sm:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="grid items-end gap-8 border-b border-black/20 pb-12 lg:grid-cols-[1.2fr_1fr_auto]">
          <div>
            <span className="editorial-pill mb-3 text-xl">
              {content.services.pill}
            </span>
            <h2 className="font-display-cine text-[clamp(2.8rem,6vw,5.2rem)] text-[#111111]">
              {content.services.title}
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-[#111111]/85 sm:text-base">
            {content.services.description}
          </p>

          <div>
            <button
              type="button"
              onClick={() => onBookService(content.bookingModal.serviceOptions[0])}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-[#111111] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.12em] text-[#111111] transition duration-150 hover:bg-[#111111] hover:text-white cursor-pointer"
            >
              {content.services.viewAllCta}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="divide-y divide-black/20">
          {content.services.items.map((service, idx) => (
            <div
              key={service.index}
              className="grid items-center gap-8 py-10 lg:grid-cols-[0.4fr_1.1fr_1.05fr]"
            >
              <div className="font-display-cine text-[clamp(3.6rem,6vw,5.4rem)] leading-none text-[#111111]">
                {service.index}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-display-cine text-3xl text-[#111111] sm:text-4xl">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-[#111111]/75">
                    {service.subtitle}
                  </p>
                </div>

                <ul className="space-y-2 text-sm text-[#111111]/90">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#ec521b]" />
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
                  className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-white transition duration-150 hover:bg-[#ec521b] cursor-pointer"
                >
                  {service.ctaLabel}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div className="overflow-hidden rounded-2xl border-2 border-[#111111] bg-[#0a0a0a] shadow-lg">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
