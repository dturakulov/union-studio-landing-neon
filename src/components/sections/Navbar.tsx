"use client";

import React from "react";
import { Menu } from "lucide-react";
import { Lang, LocaleContent } from "@/lib/i18n";

interface NavbarProps {
  content: LocaleContent;
  lang: Lang;
  onLangChange: (lang: Lang) => void;
  drawerOpen: boolean;
  onOpenDrawer: () => void;
  onOpenBooking: () => void;
}

export function Navbar({
  content,
  lang,
  onLangChange,
  drawerOpen,
  onOpenDrawer,
  onOpenBooking,
}: NavbarProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#0a0a0a]/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-8">
        <a
          href="#"
          className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <img
            src="/studio-union-logo.svg"
            alt="Union Studio"
            className="h-8 w-8 rounded-md"
          />
          <div className="leading-none">
            <div className="font-display-cine text-xl text-white sm:text-2xl">
              {content.brand.name}
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b5b0a8]">
              {content.brand.city}
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {content.nav.items.slice(0, 5).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80 transition duration-150 hover:text-[#ec521b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <div
            className="inline-flex items-center rounded-full border border-white/20 bg-[#141414] p-0.5"
            role="group"
            aria-label="Language"
          >
            {(["uz", "ru"] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => onLangChange(code)}
                className={`rounded-full px-2.5 py-1 text-[11px] font-bold tracking-[0.12em] transition duration-150 cursor-pointer ${
                  lang === code
                    ? "bg-[#ec521b] text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onOpenBooking}
            className="hidden shrink-0 whitespace-nowrap rounded-full bg-[#ec521b] px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-white transition duration-150 hover:bg-[#d84310] active:scale-[0.98] sm:inline-flex cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {content.nav.bookBtn}
          </button>

          <button
            type="button"
            onClick={onOpenDrawer}
            aria-label={content.nav.openMenuLabel}
            aria-expanded={drawerOpen}
            aria-controls="union-navigation-drawer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#111111] transition duration-150 hover:bg-[#ec521b] hover:text-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
