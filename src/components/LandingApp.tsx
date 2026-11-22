"use client";

import React, { useEffect, useState } from "react";
import { CONTENT, InsightItem, Lang, WorkItem } from "@/lib/i18n";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { BrandStrip } from "@/components/sections/BrandStrip";
import { ManifestoMetricsSection } from "@/components/sections/ManifestoMetricsSection";
import { SelectedWorkSection } from "@/components/sections/SelectedWorkSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BackdropsSpotlightSection } from "@/components/sections/BackdropsSpotlightSection";
import { InsightsSection } from "@/components/sections/InsightsSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { MobileActionBar } from "@/components/sections/MobileActionBar";
import { NavigationDrawer } from "@/components/modals/NavigationDrawer";
import { BookingDialog } from "@/components/modals/BookingDialog";
import {
  LightboxTarget,
  RemotionLightboxDialog,
} from "@/components/modals/RemotionLightboxDialog";
import { InsightReaderDialog } from "@/components/modals/InsightReaderDialog";

export function LandingApp() {
  const [lang, setLang] = useState<Lang>("uz");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<
    string | undefined
  >(undefined);
  const [preselectedBackdrop, setPreselectedBackdrop] = useState<
    string | undefined
  >(undefined);
  const [lightboxTarget, setLightboxTarget] = useState<LightboxTarget | null>(
    null,
  );
  const [activeArticle, setActiveArticle] = useState<InsightItem | null>(null);

  const content = CONTENT[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const openBooking = (opts?: { service?: string; backdrop?: string }) => {
    setPreselectedService(opts?.service);
    setPreselectedBackdrop(opts?.backdrop);
    setBookingOpen(true);
  };

  return (
    <>
      <Navbar
        content={content}
        lang={lang}
        onLangChange={setLang}
        drawerOpen={drawerOpen}
        onOpenDrawer={() => setDrawerOpen(true)}
        onOpenBooking={() => openBooking()}
      />

      <main>
        <HeroSection
          content={content}
          onOpenBooking={() => openBooking()}
          onOpenShowreel={() => setLightboxTarget({ kind: "showreel" })}
        />
        <BrandStrip content={content} />
        <ManifestoMetricsSection content={content} />
        <SelectedWorkSection
          content={content}
          onSelectWork={(item: WorkItem) =>
            setLightboxTarget({ kind: "work", item })
          }
          onOpenBooking={() => openBooking()}
        />
        <ServicesSection
          content={content}
          onBookService={(service) => openBooking({ service })}
        />
        <TestimonialsSection content={content} />
        <BackdropsSpotlightSection
          content={content}
          onBookBackdrop={(backdrop) =>
            openBooking({
              service: content.bookingModal.serviceOptions[0],
              backdrop,
            })
          }
        />
        <InsightsSection
          content={content}
          onSelectArticle={(article) => setActiveArticle(article)}
        />
      </main>

      <FooterSection
        content={content}
        onOpenBooking={() => openBooking()}
      />

      <MobileActionBar
        lang={lang}
        onOpenBooking={() => openBooking()}
      />

      <NavigationDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        content={content}
        lang={lang}
        onLangChange={setLang}
        onOpenBooking={() => openBooking()}
      />

      <BookingDialog
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        content={content}
        initialService={preselectedService}
        initialBackdrop={preselectedBackdrop}
      />

      <RemotionLightboxDialog
        target={lightboxTarget}
        onClose={() => setLightboxTarget(null)}
        content={content}
        onBookFormat={(service) => openBooking({ service })}
      />

      <InsightReaderDialog
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        content={content}
        onBookFromArticle={() => openBooking()}
      />
    </>
  );
}
