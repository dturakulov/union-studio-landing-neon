"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { InsightItem, LocaleContent } from "@/lib/i18n";

interface InsightsSectionProps {
  content: LocaleContent;
  onSelectArticle: (article: InsightItem) => void;
}

export function InsightsSection({
  content,
  onSelectArticle,
}: InsightsSectionProps) {
  const items = content.insights.items;
  const [startIdx, setStartIdx] = useState(0);

  const prev = () => setStartIdx((i) => (i - 1 + items.length) % items.length);
  const next = () => setStartIdx((i) => (i + 1) % items.length);

  const visibleItems = [
    items[startIdx % items.length],
    items[(startIdx + 1) % items.length],
    items[(startIdx + 2) % items.length],
  ];

  return (
    <section
      id="insights"
      className="border-t border-black/15 bg-[#fdf6e9] py-20 text-[#111111] sm:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-dashed border-black/25 pb-10 lg:flex-row lg:items-end">
          <div>
            <span className="editorial-pill mb-3 text-xl">
              {content.insights.pill}
            </span>
            <h2 className="font-display-cine text-[clamp(2.8rem,5.5vw,4.8rem)] text-[#111111]">
              {content.insights.title}
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6 lg:justify-end">
            <p className="max-w-sm text-sm text-[#4a4a4a]">
              {content.insights.subtitle}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={prev}
                aria-label={content.insights.prevLabel}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/25 text-[#111111] transition duration-150 hover:border-[#ec521b] hover:bg-[#ec521b] hover:text-white cursor-pointer"
              >
                <ArrowLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label={content.insights.nextLabel}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/25 text-[#111111] transition duration-150 hover:border-[#ec521b] hover:bg-[#ec521b] hover:text-white cursor-pointer"
              >
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {visibleItems.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col justify-between rounded-2xl border border-dashed border-black/25 bg-[#f4ead6] p-5 transition duration-150 hover:border-[#ec521b]"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden rounded-xl bg-black">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#ec521b]">
                  {article.readTime}
                </div>
                <h3 className="font-display-cine mt-2 text-2xl text-[#111111]">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4a4a4a]">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-black/15 pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-black/25 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#111111]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => onSelectArticle(article)}
                  className="inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-[0.1em] text-[#111111] transition duration-150 hover:text-[#ec521b] cursor-pointer"
                >
                  {content.insights.readMore}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
