"use client";

import React, { useEffect, useId, useRef } from "react";
import { ArrowUpRight, Film, X } from "lucide-react";
import { LocaleContent, WorkItem } from "@/lib/i18n";
import { RemotionCanvas } from "@/components/remotion/RemotionCanvas";
import {
  HERO_DEFAULT_SCENES,
  HeroShowreelComposition,
} from "@/remotion/compositions/HeroShowreelComposition";
import { ReelShowcaseComposition } from "@/remotion/compositions/ReelShowcaseComposition";

export type LightboxTarget =
  | { kind: "showreel" }
  | { kind: "work"; item: WorkItem };

interface RemotionLightboxDialogProps {
  target: LightboxTarget | null;
  onClose: () => void;
  content: LocaleContent;
  onBookFormat: (serviceName?: string) => void;
}

export function RemotionLightboxDialog({
  target,
  onClose,
  content,
  onBookFormat,
}: RemotionLightboxDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (target && !dialog.open) {
      dialog.showModal();
    } else if (!target && dialog.open) {
      dialog.close();
    }
  }, [target]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = "";
      onClose();
    };
    dialog.addEventListener("close", handleClose);

    let detachClosedByFallback: (() => void) | undefined;
    if (
      typeof HTMLDialogElement !== "undefined" &&
      !("closedBy" in HTMLDialogElement.prototype)
    ) {
      const outside = (e: PointerEvent) => {
        const r = dialog.getBoundingClientRect();
        return (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        );
      };
      let pressedOutside = false;
      const onDown = (e: PointerEvent) => {
        pressedOutside = outside(e);
      };
      const onUp = (e: PointerEvent) => {
        if (pressedOutside && outside(e) && dialog.open) dialog.close();
      };
      dialog.addEventListener("pointerdown", onDown);
      dialog.addEventListener("pointerup", onUp);
      detachClosedByFallback = () => {
        dialog.removeEventListener("pointerdown", onDown);
        dialog.removeEventListener("pointerup", onUp);
      };
    }

    return () => {
      dialog.removeEventListener("close", handleClose);
      detachClosedByFallback?.();
    };
  }, [onClose]);

  const title =
    target?.kind === "work"
      ? target.item.title
      : `${content.brand.name} — ${content.hero.showreelCta}`;

  return (
    <dialog
      ref={dialogRef}
      id="union-remotion-lightbox"
      className="cine-modal cine-modal-wide"
      aria-labelledby={titleId}
      {...({ closedby: "any" } as Record<string, string>)}
    >
      <div className="flex items-start justify-between gap-3 border-b border-white/15 bg-[#0a0a0a] px-4 py-4 sm:items-center sm:px-6">
        <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-3">
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#ec521b] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white sm:text-[11px]">
            <Film className="h-3.5 w-3.5" aria-hidden="true" />
            {content.lightboxModal.badge}
          </span>
          <h2 id={titleId} className="font-display-cine text-xl text-white sm:text-2xl">
            {title}
          </h2>
        </div>
        <button
          type="button"
          autoFocus
          onClick={() => dialogRef.current?.close()}
          aria-label={content.lightboxModal.closeLabel}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition duration-150 hover:border-[#ec521b] hover:bg-[#ec521b] cursor-pointer"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {target && (
        <div className="grid gap-5 overflow-y-auto p-4 sm:gap-6 sm:p-6 lg:grid-cols-[1.25fr_0.9fr]">
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0a]">
            {target.kind === "showreel" ? (
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
                controls
                loop
                autoPlay
                className="w-full"
              />
            ) : (
              <div className="mx-auto max-w-[300px] sm:max-w-[380px]">
                <RemotionCanvas
                  component={ReelShowcaseComposition}
                  inputProps={{
                    variant: target.item.variant,
                    title: target.item.title,
                    subtitle: target.item.subtitle,
                    metric: target.item.metric,
                    tag: target.item.tag,
                    imageUrl: target.item.imageUrl,
                    accentColor: target.item.accentColor,
                  }}
                  compositionWidth={1080}
                  compositionHeight={1350}
                  durationInFrames={180}
                  fps={30}
                  controls
                  loop
                  autoPlay
                  className="w-full"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between gap-6">
            <div className="space-y-4">
              {target.kind === "work" ? (
                <>
                  <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#ec521b]">
                    {target.item.eyebrow}
                  </div>
                  <p className="text-sm leading-relaxed text-[#e4dfd5]">
                    {target.item.description}
                  </p>
                  <ul className="space-y-2 border-t border-white/15 pt-4 text-sm text-white">
                    {target.item.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#ec521b]" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#ec521b]">
                    {content.brand.tagline}
                  </div>
                  <p className="text-sm leading-relaxed text-[#e4dfd5]">
                    {content.hero.bio}
                  </p>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                dialogRef.current?.close();
                onBookFormat(
                  target.kind === "work"
                    ? content.bookingModal.serviceOptions[1]
                    : undefined,
                );
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#ec521b] px-5 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-white transition duration-150 hover:bg-[#d84310] cursor-pointer"
            >
              {content.lightboxModal.bookThisBtn}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
