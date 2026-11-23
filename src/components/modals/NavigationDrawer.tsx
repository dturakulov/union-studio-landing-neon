"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { ArrowUpRight, Camera, Phone, X } from "lucide-react";
import { Lang, LocaleContent, STUDIO_CONTACTS } from "@/lib/i18n";
import { LutId, STUDIO_LUTS } from "@/lib/lut";

interface NavigationDrawerProps {
  open: boolean;
  onClose: () => void;
  content: LocaleContent;
  lang: Lang;
  onLangChange: (lang: Lang) => void;
  lut: LutId;
  onLutChange: (lut: LutId) => void;
  onOpenBooking: () => void;
}

export function NavigationDrawer({
  open,
  onClose,
  content,
  lang,
  onLangChange,
  lut,
  onLutChange,
  onOpenBooking,
}: NavigationDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLElement>(null);
  const onCloseRef = useRef(onClose);
  const hasOpenedRef = useRef(false);
  const isClosingRef = useRef(false);
  const closeFallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const finishClose = useCallback(() => {
    if (closeFallbackTimerRef.current) {
      clearTimeout(closeFallbackTimerRef.current);
      closeFallbackTimerRef.current = null;
    }
    const dialog = dialogRef.current;
    hasOpenedRef.current = false;
    isClosingRef.current = false;
    if (dialog?.open) {
      dialog.close();
    }
    onCloseRef.current();
  }, []);

  const slideOutAndClose = useCallback(() => {
    const scroller = scrollerRef.current;
    const dialog = dialogRef.current;
    const sheet = sheetRef.current;
    if (!dialog || !dialog.open || !scroller || isClosingRef.current) return;

    isClosingRef.current = true;

    const alreadyOffscreen =
      sheet && scroller.scrollLeft >= sheet.offsetWidth - 2;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (alreadyOffscreen || prefersReduced) {
      finishClose();
      return;
    }

    scroller.scrollTo({ left: scroller.offsetWidth, behavior: "auto" });

    if (closeFallbackTimerRef.current) {
      clearTimeout(closeFallbackTimerRef.current);
    }
    closeFallbackTimerRef.current = setTimeout(() => {
      if (isClosingRef.current && dialog.open) {
        finishClose();
      }
    }, 450);
  }, [finishClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const scroller = scrollerRef.current;
    const sheet = sheetRef.current;
    if (!dialog || !scroller || !sheet) return;

    const visibleThreshold = Math.min(0.05, 1 / Math.max(window.innerWidth, 1));
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (!entry) return;
        if (entry.intersectionRatio >= visibleThreshold) {
          hasOpenedRef.current = true;
        }
        if (
          entry.intersectionRatio < visibleThreshold &&
          dialog.open &&
          (hasOpenedRef.current || isClosingRef.current)
        ) {
          finishClose();
        }
      },
      { root: dialog, threshold: [visibleThreshold, 0.5, 1] },
    );
    observer.observe(sheet);

    const handleNativeClose = () => {
      hasOpenedRef.current = false;
      isClosingRef.current = false;
      if (closeFallbackTimerRef.current) {
        clearTimeout(closeFallbackTimerRef.current);
        closeFallbackTimerRef.current = null;
      }
      onCloseRef.current();
    };
    dialog.addEventListener("close", handleNativeClose);

    let detachScrollFallback: (() => void) | undefined;
    if (
      typeof CSS !== "undefined" &&
      !CSS.supports("animation-timeline: scroll()")
    ) {
      const handleScroll = () => {
        const width = sheet.offsetWidth || 1;
        const ratio = Math.max(0, Math.min(1, 1 - scroller.scrollLeft / width));
        dialog.style.setProperty("--drawer-backdrop", ratio.toFixed(3));
      };
      scroller.addEventListener("scroll", handleScroll, { passive: true });
      detachScrollFallback = () =>
        scroller.removeEventListener("scroll", handleScroll);
    }

    return () => {
      observer.disconnect();
      dialog.removeEventListener("close", handleNativeClose);
      detachScrollFallback?.();
      if (closeFallbackTimerRef.current) {
        clearTimeout(closeFallbackTimerRef.current);
      }
    };
  }, [finishClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const scroller = scrollerRef.current;
    if (!dialog || !scroller) return;

    let cancelled = false;
    const runOpen = async () => {
      if (open && !dialog.open) {
        hasOpenedRef.current = false;
        isClosingRef.current = false;
        dialog.showModal();

        if (
          typeof CSS !== "undefined" &&
          !CSS.supports("scroll-initial-target", "nearest")
        ) {
          scroller.scrollTo({ left: scroller.offsetWidth, behavior: "instant" });
          await new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
          );
        } else {
          await new Promise<void>((resolve) =>
            requestAnimationFrame(() => resolve()),
          );
        }

        if (!cancelled && dialog.open) {
          scroller.scrollTo({ left: 0, behavior: "auto" });
        }
      } else if (!open && dialog.open) {
        slideOutAndClose();
      }
    };

    void runOpen();
    return () => {
      cancelled = true;
    };
  }, [open, slideOutAndClose]);

  const handleLinkClick = () => {
    slideOutAndClose();
  };

  const handleCancel = (e: React.SyntheticEvent<HTMLDialogElement>) => {
    if (e.nativeEvent.cancelable) {
      e.preventDefault();
      slideOutAndClose();
    } else {
      finishClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const sheet = sheetRef.current;
    if (sheet && !sheet.contains(e.target as Node)) {
      slideOutAndClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      id="union-navigation-drawer"
      className="Drawer"
      aria-label={content.nav.drawerLabel}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
    >
      <div ref={scrollerRef} className="Drawer-scroller">
        <nav ref={sheetRef} className="Drawer-sheet p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-white/15 pb-5">
            <div>
              <div className="font-display-cine text-2xl text-white">
                {content.brand.name}
              </div>
              <div className="text-xs tracking-[0.14em] text-[#b5b0a8]">
                {content.brand.city}
              </div>
            </div>
            <button
              type="button"
              autoFocus
              onClick={slideOutAndClose}
              aria-label={content.nav.closeMenuLabel}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition duration-150 hover:border-[#ec521b] hover:bg-[#ec521b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-col justify-between gap-8 py-8">
            <ul className="space-y-3">
              {content.nav.items.map((item, idx) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={handleLinkClick}
                    className="group flex items-baseline justify-between border-b border-white/10 pb-3 transition duration-150 hover:border-[#ec521b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-[#ec521b]">
                        0{idx + 1}
                      </span>
                      <span className="font-display-cine text-3xl text-white transition duration-150 group-hover:text-[#ec521b]">
                        {item.label}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="h-5 w-5 text-white/40 transition duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ec521b]"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {(["uz", "ru"] as const).map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => onLangChange(code)}
                      className={`rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.14em] transition duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                        lang === code
                          ? "bg-[var(--accent)] text-[var(--accent-ink)]"
                          : "border border-white/25 text-white/75 hover:border-white"
                      }`}
                    >
                      {code.toUpperCase()}
                    </button>
                  ))}
                </div>

                <div
                  className="flex items-center gap-1.5"
                  role="group"
                  aria-label="Studio LUT"
                >
                  {STUDIO_LUTS.map((preset) => {
                    const selected = preset.id === lut;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => onLutChange(preset.id)}
                        aria-pressed={selected}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] transition cursor-pointer ${
                          selected
                            ? "border-white bg-white/15 text-white"
                            : "border-white/20 text-white/70 hover:border-white/45"
                        }`}
                      >
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: preset.swatch }}
                        />
                        {preset.label.split(" ")[0]}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  slideOutAndClose();
                  setTimeout(onOpenBooking, 220);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-[var(--accent-ink)] transition duration-150 hover:bg-[var(--accent-hover)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
              >
                {content.nav.bookBtn}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="space-y-2 border-t border-white/15 pt-5 text-xs text-[#b5b0a8]">
            <p className="font-medium text-white">{content.nav.drawerSubtitle}</p>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href={`tel:${STUDIO_CONTACTS.phone1.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-1.5 hover:text-white"
              >
                <Phone className="h-3.5 w-3.5 text-[#ec521b]" aria-hidden="true" />
                {STUDIO_CONTACTS.phone1}
              </a>
              <a
                href={STUDIO_CONTACTS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white"
              >
                <Camera
                  className="h-3.5 w-3.5 text-[#ec521b]"
                  aria-hidden="true"
                />
                {STUDIO_CONTACTS.instagram}
              </a>
            </div>
          </div>
        </nav>
      </div>
    </dialog>
  );
}
