# Union Studio — Samarkand (Remotion Landing Page)

Samarqanddagi **Union Studio** (`Studio | Студия | Reels | Podcast | Samarkand | Самарканд`) uchun **Next.js App Router**, **Tailwind CSS v4** va **Remotion 4** (`@remotion/player` + `@remotion/cli`) asosida yaratilgan ikki tilli (**UZ / RU**) kinematografik landing sahifasi.

## Asosiy imkoniyatlar

- **6 ta mustaqil Remotion kompozitsiyasi** (`src/remotion/`):
  - `HeroShowreel` (`1920x1080`) — jonli studiya showreel va SMPTE timecode HUD
  - `StudioIntroReel` (`1280x720`) — `30+` fonlar va yoritish sizzle roligi
  - `ReelShowcase` (`1080x1350`) — Reels, Podcast to'lqinlari, RAW/LUT wipe va SMM grafigi
  - `ServiceMotion` (`1280x720`) — xizmatlar uchun motion-grafika vizuallari
  - `BackdropsShowcase` (`1280x800`) — `01–07` studiya fonlari vizualizatori
  - `FooterStinger` (`1080x1080`) — aylanuvchi Union Studio Samarkand final stingeri
- **30+ studiya fonlari vitrinasi**: 7 ta interaktiv zona va 6 toifadan iborat 32 ta faol lokatsiya katalogi.
- **Ikki tilli interfeys (UZ / RU)** va nativ `<dialog>` modallar (`NavigationDrawer`, `BookingDialog`, `RemotionLightboxDialog`, `InsightReaderDialog`).

## Ishga tushirish

```bash
npm install

# Veb-sayt (dev server)
npm run dev

# Remotion Studio (kompozitsiyalarni ko'rish va tahrirlash)
npm run remotion:studio

# Hero va Reels videolarini MP4 qilib render qilish
npm run remotion:render:hero
npm run remotion:render:reel
```

## Aloqa (Samarqand)

- Manzil: Bulvar hududi, Samarqand shahri (Har kuni `09:00 – 22:00`)
- Telefon: `+998 99 740 27 50` / `+998 93 566 52 25`
- Instagram: `@studio__union`
- Email: `hello@example.com`
