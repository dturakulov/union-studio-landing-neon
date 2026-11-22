"use client";

import React, { useEffect, useId, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { InsightItem, LocaleContent } from "@/lib/i18n";

interface InsightReaderDialogProps {
  article: InsightItem | null;
  onClose: () => void;
  content: LocaleContent;
  onBookFromArticle: () => void;
}

export function InsightReaderDialog({
  article,
  onClose,
  content,
  onBookFromArticle,
}: InsightReaderDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (article && !dialog.open) {
      dialog.showModal();
    } else if (!article && dialog.open) {
      dialog.close();
    }
  }, [article]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = "";
      onClose();
    };
    dialog.addEventListener("close", handleClose);

    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      id="union-insight-dialog"
      className="cine-modal"
      aria-labelledby={titleId}
      {...({ closedby: "any" } as Record<string, string>)}
    >
      <div className="flex items-start justify-between gap-4 border-b border-white/15 bg-[#0a0a0a] px-6 py-5">
        <div>
          {article && (
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#ec521b]">
              {article.readTime}
            </span>
          )}
          <h2
            id={titleId}
            className="font-display-cine mt-1 text-3xl text-white"
          >
            {article?.title}
          </h2>
        </div>
        <button
          type="button"
          autoFocus
          onClick={() => dialogRef.current?.close()}
          aria-label={content.insightModal.closeLabel}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition duration-150 hover:border-[#ec521b] hover:bg-[#ec521b] cursor-pointer"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {article && (
        <div className="space-y-5 overflow-y-auto p-6">
          {article.imageUrl && (
            <div className="aspect-[16/9] overflow-hidden rounded-xl border border-white/15">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="space-y-4 text-sm leading-relaxed text-[#e6e1d7]">
            {article.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-4">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                dialogRef.current?.close();
                onBookFromArticle();
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[#ec521b] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-white hover:bg-[#d84310] cursor-pointer"
            >
              {content.insightModal.bookFromArticleBtn}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
