"use client";

import React from "react";
import { ArrowUpRight, Layers, Phone } from "lucide-react";
import { Lang, STUDIO_CONTACTS } from "@/lib/i18n";

interface MobileActionBarProps {
  lang: Lang;
  onOpenBooking: () => void;
}

export function MobileActionBar({
  lang,
  onOpenBooking,
}: MobileActionBarProps) {
  const backdropsLabel = lang === "uz" ? "30+ Fon" : "30+ Фонов";
  const ctaLabel = lang === "uz" ? "Bron qilish" : "Забронировать";
  const callLabel =
    lang === "uz" ? "Studiyaga qo'ng'iroq qilish" : "Позвонить в студию";

  return (
    <div
      className="fixed inset-x-3 bottom-3 z-40 lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="mx-auto flex max-w-md items-center gap-2 rounded-2xl border border-white/20 bg-[#0e0e0e]/92 p-1.5 shadow-[0_14px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl">
        <a
          href={`tel:${STUDIO_CONTACTS.phone1.replace(/\s+/g, "")}`}
          aria-label={callLabel}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white transition duration-150 active:scale-95 hover:border-[#ec521b] hover:bg-[#ec521b]"
        >
          <Phone className="h-4 w-4 text-[#ec521b]" aria-hidden="true" />
        </a>

        <a
          href="#backdrops"
          className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-3 text-xs font-bold uppercase tracking-[0.08em] text-white transition duration-150 active:scale-95 hover:border-[#ec521b]"
        >
          <Layers className="h-3.5 w-3.5 text-[#ec521b]" aria-hidden="true" />
          <span>{backdropsLabel}</span>
        </a>

        <button
          type="button"
          onClick={onOpenBooking}
          className="inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-[#ec521b] px-4 text-xs font-bold uppercase tracking-[0.08em] text-white transition duration-150 hover:bg-[#d84310] active:scale-[0.98] cursor-pointer"
        >
          <span>{ctaLabel}</span>
          <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
