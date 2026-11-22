import { media } from "./media";

export type Lang = "uz" | "ru";

export type WorkVariant = "reels" | "podcast" | "brand" | "smm";
export type ServiceKey = "backdrops" | "production" | "podcast_reels" | "smm_brand";

export interface WorkItem {
  id: string;
  variant: WorkVariant;
  eyebrow: string;
  title: string;
  subtitle: string;
  metric: string;
  tag: string;
  imageUrl: string;
  accentColor: string;
  deliverables: string[];
  description: string;
}

export interface ServiceItem {
  index: string;
  key: ServiceKey;
  title: string;
  subtitle: string;
  bullets: string[];
  imageUrl: string;
  ctaLabel: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  roleTitle: string;
  author: string;
  company: string;
  avatarUrl: string;
}

export interface BackdropSetItem {
  number: string;
  name: string;
  category: string;
  lighting: string;
  dimensions: string;
  description: string;
  imageUrl: string;
  swatchColors: [string, string, string];
}

export interface BackdropCategoryGroup {
  id: string;
  label: string;
  count: number;
  sets: string[];
}

export interface InsightItem {
  id: string;
  readTime: string;
  title: string;
  excerpt: string;
  tags: string[];
  imageUrl: string;
  paragraphs: string[];
}

export interface LocaleContent {
  langLabel: string;
  brand: {
    name: string;
    city: string;
    tagline: string;
    pillars: string;
  };
  nav: {
    items: { label: string; href: string }[];
    bookBtn: string;
    openMenuLabel: string;
    closeMenuLabel: string;
    drawerLabel: string;
    drawerSubtitle: string;
  };
  hero: {
    topLeftCaption: string;
    topRightCaption: string;
    headlineLine1: string;
    headlineLine2: string;
    headlineLine3: string;
    headlineSerif: string;
    bio: string;
    primaryCta: string;
    showreelCta: string;
    pauseLabel: string;
    playLabel: string;
    motionHint: string;
  };
  logos: {
    label: string;
    items: string[];
  };
  manifesto: {
    statementPrefix: string;
    statementItalic: string;
    statementSuffix: string;
    subtext: string;
    metrics: { value: string; label: string; detail: string }[];
  };
  work: {
    pill: string;
    title: string;
    subtitle: string;
    stickerBlue: string;
    stickerGold: string;
    stampCta: string;
    narrativeHeading: string;
    narrativeBody: string;
    watchMotionCta: string;
    items: WorkItem[];
  };
  services: {
    pill: string;
    title: string;
    description: string;
    viewAllCta: string;
    items: ServiceItem[];
  };
  testimonials: {
    pill: string;
    title: string;
    prevLabel: string;
    nextLabel: string;
    items: TestimonialItem[];
  };
  backdrops: {
    pill: string;
    titlePrefix: string;
    titleItalic: string;
    titleSuffix: string;
    subtitle: string;
    bookSetCta: string;
    catalogToggleOpen: string;
    catalogToggleClose: string;
    allCountBadge: string;
    featuredSets: BackdropSetItem[];
    categories: BackdropCategoryGroup[];
  };
  insights: {
    pill: string;
    title: string;
    subtitle: string;
    readMore: string;
    prevLabel: string;
    nextLabel: string;
    items: InsightItem[];
  };
  footer: {
    ctaPrefix: string;
    ctaItalic: string;
    ctaSuffix: string;
    ctaSubtext: string;
    ctaButton: string;
    links: { label: string; href: string }[];
    contactsLabel: string;
    address: string;
    hours: string;
    phone1: string;
    phone2: string;
    email: string;
    instagram: string;
    legal: string;
  };
  bookingModal: {
    title: string;
    subtitle: string;
    nameLabel: string;
    nameHint: string;
    namePlaceholder: string;
    nameError: string;
    phoneLabel: string;
    phoneHint: string;
    phonePlaceholder: string;
    phoneError: string;
    serviceLabel: string;
    serviceHint: string;
    serviceOptions: string[];
    backdropLabel: string;
    backdropHint: string;
    backdropOptions: string[];
    notesLabel: string;
    notesPlaceholder: string;
    submitBtn: string;
    cancelBtn: string;
    successTitle: string;
    successBody: string;
    newRequestBtn: string;
    closeLabel: string;
  };
  lightboxModal: {
    badge: string;
    bookThisBtn: string;
    closeLabel: string;
  };
  insightModal: {
    closeLabel: string;
    bookFromArticleBtn: string;
  };
}

export const STUDIO_CONTACTS = {
  phone1: "+998 99 740 27 50",
  phone2: "+998 93 566 52 25",
  instagram: "@studio__union",
  instagramUrl: "https://instagram.com/studio__union",
  email: "hello@example.com",
};

export const CONTENT: Record<Lang, LocaleContent> = {
  uz: {
    langLabel: "UZ",
    brand: {
      name: "UNION STUDIO",
      city: "SAMARQAND",
      tagline: "Studio | Студия | Reels | Podcast | Samarkand | Самарканд",
      pillars: "30+ FON · SYOMKA VA MONTAJ · PODCAST · REELS · SMM",
    },
    nav: {
      items: [
        { label: "Ishlarimiz", href: "#work" },
        { label: "Xizmatlar", href: "#services" },
        { label: "30+ Fonlar", href: "#backdrops" },
        { label: "Fikrlar", href: "#testimonials" },
        { label: "Maqolalar", href: "#insights" },
        { label: "Aloqa", href: "#contact" },
      ],
      bookBtn: "Syomka bron qilish",
      openMenuLabel: "Menyuni ochish",
      closeMenuLabel: "Menyuni yopish",
      drawerLabel: "Union Studio navigatsiya menyusi",
      drawerSubtitle: "Samarqand · Bulvar hududi · 09:00 – 22:00",
    },
    hero: {
      topLeftCaption: "STUDIO | СТУДИЯ · REELS & PODCAST",
      topRightCaption: "SAMARQAND · 30+ INTERYER VA RANG FONLAR",
      headlineLine1: "KONTENTNI",
      headlineLine2: "KINO DARAJASIDA",
      headlineLine3: "YARATAMIZ.",
      headlineSerif: "union studio",
      bio: "Samarqanddagi to'liq siklli video studiya: 30 dan ortiq tayyor fonlar, 4K syomka va montaj, Podcast, Reels hamda shaxsiy brend uchun SMM tizimi.",
      primaryCta: "Syomka bron qilish",
      showreelCta: "Showreelni ko'rish",
      pauseLabel: "Showreelni pauza qilish",
      playLabel: "Showreelni davom ettirish",
      motionHint: "JONLI REMOTION SHOWREEL",
    },
    logos: {
      label: "SAMARQAND VA O'ZBEKISTON BRENDLARI ISHONCHI",
      items: [
        "AURA BREND",
        "TECHSTART",
        "SILK ROAD",
        "CODECRAFT",
        "REGISTON MEDIA",
        "AFROSIYOB",
        "SMART ACADEMY",
        "ZAMIN GROUP",
      ],
    },
    manifesto: {
      statementPrefix: "BIZ SHUNCHAKI VIDEO OLMAYMIZ — E'TIBORNI MIJOZGA AYLANTIRADIGAN ",
      statementItalic: "jonli kadrlar",
      statementSuffix: " VA SHAXSIY BREND QURAMIZ.",
      subtext:
        "Bir kunda 15 ta Reels, ikki kamerali Podcast yoki to'liq biznes kampaniya — barchasi Samarqand markazidagi 30+ fonli studiyamizda.",
      metrics: [
        {
          value: "30+",
          label: "TAYYOR STUDIYA FONLARI",
          detail:
            "Tsiklorama, podkast zal, neoklassik arkalar, RGB neon va minimalist teksturali lokatsiyalar.",
        },
        {
          value: "500+",
          label: "REELS VA PODCAST SONLARI",
          detail:
            "Ekspertlar, tadbirkorlar va mahalliy brendlar uchun muntazam sotuvchi video kontentlar.",
        },
        {
          value: "12M+",
          label: "ORGANIK KO'RISHLAR",
          detail:
            "To'g'ri ssenariy, dinamik montaj va shaxsiy brend strategiyasi orqali to'plangan auditoriya.",
        },
      ],
    },
    work: {
      pill: "Ishlarimiz",
      title: "HAR BIR KADR NATIJA UCHUN ISHLAYDI",
      subtitle:
        "Reels, Podcast va brend filmlari — Remotion jonli kadr prevyularini bosing va batafsil ko'ring.",
      stickerBlue: "30+ FON VA LOKATSIYA",
      stickerGold: "SAMARQAND TOP STUDIYA",
      stampCta: "SYOMKA BRON QILISH · UNION STUDIO · ",
      narrativeHeading: "QO'L TELEFONIDAN KINO SIFATIGA BIR QADAM",
      narrativeBody:
        "Siz kamera oldida o'zingizni erkin his qilishingiz uchun yorug'lik, mikrofonlar, 30+ fon va ssenariyni biz tayyorlaymiz. Montaj esa 48 soat ichida tayyor.",
      watchMotionCta: "Remotion kadrni ochish",
      items: [
        {
          id: "aura-reels",
          variant: "reels",
          eyebrow: "REELS PAKET · AURA BREND",
          title: "1 KUNDA 15 TA VIRAL REELS",
          subtitle: "4 ta studiya foni · dinamik montaj",
          metric: "2.4M+ KO'RISH",
          tag: "Reels",
          imageUrl: media.reelsNeon,
          accentColor: "#ec521b",
          deliverables: [
            "15 ta vertikal 9:16 Reels",
            "4 ta turli studiya foni",
            "Kinetik subtitrlar va sound design",
          ],
          description:
            "Samarqanddagi kiyim va aksessuar brendi uchun bir syomka kunida 4 ta fon almashtirib 15 ta Reels ishlab chiqildi. Sotuvlar 3 haftada 2.3 barobar oshdi.",
        },
        {
          id: "founder-podcast",
          variant: "podcast",
          eyebrow: "PODCAST · FOUNDER TALKS",
          title: "IKKI KAMERALI PODCAST SHU YERDA",
          subtitle: "Shure SM7B · 4K multi-cam · Shorts",
          metric: "12 QISM",
          tag: "Podcast",
          imageUrl: media.podcastRoom,
          accentColor: "#7ecbf2",
          deliverables: [
            "3 ta 4K kamera burchagi",
            "Studio akustik ovoz yozuvi",
            "Har qismdan 8 ta Reels kesmasi",
          ],
          description:
            "Tadbirkorlar suhbati uchun iliq lampali podkast zonasi, alohida audio yo'lakchalar va YouTube + Instagram Reels uchun tayyor kesmalar.",
        },
        {
          id: "silkroad-brand",
          variant: "brand",
          eyebrow: "BREND FILMI · SILK ROAD",
          title: "SHAXSIY BREND VA IMIDJ VIDEO",
          subtitle: "Kino linzalar · RAW rang korreksiya",
          metric: "4K CINEMA",
          tag: "Syomka va Montaj",
          imageUrl: media.cameraRig,
          accentColor: "#f2b749",
          deliverables: [
            "Ssenariy va rejissura",
            "Kino rang korreksiya (LUT)",
            "Sayt va Instagram uchun formatlar",
          ],
          description:
            "Samarqand ruhi va zamonaviy biznes estetikasini birlashtirgan imij rolik — ekspertlar va kompaniya rahbarlari ishonchini oshirish uchun.",
        },
        {
          id: "codecraft-smm",
          variant: "smm",
          eyebrow: "SMM VA SHAXSIY BREND · CODECRAFT",
          title: "NOLADAN TIZIMLI SHAXSIY BREND",
          subtitle: "Kontent-reja · Syomka · Oylik boshqaruv",
          metric: "+340% O'SISH",
          tag: "SMM & Brend",
          imageUrl: media.socialFlow,
          accentColor: "#f6b8d0",
          deliverables: [
            "Oylik kontent strategiya",
            "20 ta Reels + storis voronkasi",
            "Analitika va qamrov hisoboti",
          ],
          description:
            "Ekspertning ekspertligini oddiy va ishonchli formatga solib, muntazam Reels va Podcast chiqishlari orqali doimiy lid oqimini yaratdik.",
        },
      ],
    },
    services: {
      pill: "Xizmatlar",
      title: "STUDIYA VA PRODAKSHN XIZMATLARI",
      description:
        "Faqat fon ijarasidan tortib, g'oyadan tayyor SMM natijasigacha bo'lgan to'liq yechimlar.",
      viewAllCta: "Batafsil maslahat olish",
      items: [
        {
          index: "01",
          key: "backdrops",
          title: "30+ STUDIYA FONLARI",
          subtitle: "Samarqanddagi eng boy lokatsiya tanlovi",
          bullets: [
            "30 dan ortiq qog'oz, mato, teksturali va interyer fonlar",
            "Katta oq tsiklorama, arkalar, loft va podkast burchagi",
            "Professional Aputure / Godox yorug'lik jihozlari to'plami",
          ],
          imageUrl: media.archInterior,
          ctaLabel: "Fonni bron qilish",
        },
        {
          index: "02",
          key: "production",
          title: "PROFESSIONAL SYOMKA VA MONTAJ",
          subtitle: "4K kameralar, stabilizatsiya va 48 soatda montaj",
          bullets: [
            "Cinema kameralar, yorug'lik sxemasi va operator xizmati",
            "Dinamik Reels montaji, kinetik titrlar va motion-grafika",
            "Rang korreksiya, sound design va barcha formatlarda eksport",
          ],
          imageUrl: media.editingDesk,
          ctaLabel: "Syomka buyurtma",
        },
        {
          index: "03",
          key: "podcast_reels",
          title: "PODCAST, REELS VA VIDEO KONTENT",
          subtitle: "Bir syomkadan bir oylik tayyor kontent",
          bullets: [
            "2–3 kamerali Podcast va intervyu yozuvi (Shure / Rode)",
            "Ekspert va bizneslar uchun seriyali Reels paketlari",
            "Reklama roliklari, mahsulot obzorlari va YouTube sonlar",
          ],
          imageUrl: media.podcastTwo,
          ctaLabel: "Podcast yozish",
        },
        {
          index: "04",
          key: "smm_brand",
          title: "SMM VA SHAXSIY BREND QURISH",
          subtitle: "Pozitsionirovanie, ssenariy va oylik o'sish",
          bullets: [
            "Shaxsiy brend arxitekturasi va vizual uslub (Tone of Voice)",
            "Trend va sotuvchi ssenariylar, kontent-reja va voronka",
            "Instagram, YouTube Shorts va Telegram kanallarini yuritish",
          ],
          imageUrl: media.meetingTeam,
          ctaLabel: "Strategiya olish",
        },
      ],
    },
    testimonials: {
      pill: "Mijozlar fikri",
      title: "SAMARQAND BRENDLARI TANLOVI.",
      prevLabel: "Oldingi fikr",
      nextLabel: "Keyingi fikr",
      items: [
        {
          id: "t1",
          quote:
            "Birinchi marta bitta studiyada buncha ko'p fon ko'rdim. Bir kunda 12 ta Reels oldik — har biri har xil joyda olingandek chiqdi.",
          roleTitle: "REELS PAKET VA 30+ FON",
          author: "Dilshod Karimov",
          company: "Aura Brend asoschisi",
          avatarUrl: media.portrait1,
        },
        {
          id: "t2",
          quote:
            "Podkast yozishda eng muhimi ovoz va muhit. Union Studio'da akustika ham, uch kamerali montaj ham kutganimizdan a'lo bo'ldi.",
          roleTitle: "PODCAST VA SHORTS",
          author: "Malika Azizova",
          company: "Founder Talks boshlovchisi",
          avatarUrl: media.portrait2,
        },
        {
          id: "t3",
          quote:
            "Shaxsiy brendimni noldan yo'lga qo'ydik. Ssenariydan tortib montaj va SMMgacha bir jamoa qilgani vaqtimni 10 barobar tejadi.",
          roleTitle: "SMM VA SHAXSIY BREND",
          author: "Sardor Rahimov",
          company: "CodeCraft Academy",
          avatarUrl: media.portrait3,
        },
        {
          id: "t4",
          quote:
            "Montajni 48 soatda topshirishadi, ranglar va titrlar juda toza. Samarqandda bunday prodakshn darajasi kam.",
          roleTitle: "SYOMKA VA MONTAJ",
          author: "Nigora Toshmatova",
          company: "Silk Road Boutique",
          avatarUrl: media.portrait4,
        },
        {
          id: "t5",
          quote:
            "Klinikamiz uchun ekspert videolar va Reels oldirdik. Birinchi oydayoq murojaatlar soni sezilarli oshdi.",
          roleTitle: "BIZNES KONTENT",
          author: "Jamshid Norov",
          company: "Zamin Med Clinic",
          avatarUrl: media.portrait5,
        },
      ],
    },
    backdrops: {
      pill: "30+ Fonlar",
      titlePrefix: "30 DAN ORTIQ STUDIYA FONLARI ",
      titleItalic: "har bir g'oya",
      titleSuffix: " UCHUN SAMARQANDDA.",
      subtitle:
        "Pastdagi 01–07 asosiy zonalardan birini bosing — Remotion jonli sahna prevyusi darhol yangilanadi.",
      bookSetCta: "Shu fonni bron qilish",
      catalogToggleOpen: "Barcha 30+ fon ro'yxatini ochish",
      catalogToggleClose: "Ro'yxatni yopish",
      allCountBadge: "32 TA FAOL LOKATSIYA VA FON",
      featuredSets: [
        {
          number: "01",
          name: "OQ TSIKLORAMA",
          category: "Minimalist · Katalog",
          lighting: "5600K Softbox Grid",
          dimensions: "6m × 5m · 3.8m balandlik",
          description:
            "Keng burchaksiz oq tsiklorama — brend lookbook, dinamik Reels va reklama roliklari uchun.",
          imageUrl: media.studioWide,
          swatchColors: ["#FDF6E9", "#E5E2DC", "#111111"],
        },
        {
          number: "02",
          name: "PODCAST LOUNGE",
          category: "Akustik · Intervyu",
          lighting: "3200K Iliq Tungsten",
          dimensions: "4 kishigacha · Shure SM7B",
          description:
            "Yumshoq kreslolar, akustik panellar va iliq chiroqli podkast hamda chuqur suhbatlar zali.",
          imageUrl: media.podcastRoom,
          swatchColors: ["#EC521B", "#3B2820", "#F2B749"],
        },
        {
          number: "03",
          name: "SAMARQAND ARKA",
          category: "Editorial · Arxitektura",
          lighting: "Tabiiy + Key Light",
          dimensions: "4.5m × 4m",
          description:
            "Issiq qum rangli arkasimon devor — shaxsiy brend, psixologlar, dizaynerlar va ekspertlar uchun.",
          imageUrl: media.archInterior,
          swatchColors: ["#D8B994", "#FDF6E9", "#5B4A3F"],
        },
        {
          number: "04",
          name: "NEON REELS BOX",
          category: "RGB · Tech & Youth",
          lighting: "RGB Pixel Tubes 360°",
          dimensions: "3.5m × 3.5m",
          description:
            "Dasturlash, kiberxavfsizlik, musiqa va yoshlar brendlari uchun boshqariladigan RGB neon fon.",
          imageUrl: media.reelsNeon,
          swatchColors: ["#EC521B", "#7ECBF2", "#141414"],
        },
        {
          number: "05",
          name: "CINEMA NOIR",
          category: "Dramatik · Biznes",
          lighting: "Chiaroscuro Spot",
          dimensions: "5m × 4m",
          description:
            "To'q qora mat devor va kontrast chiroq — kuchli ekspert ma'ruzalari va intervyular uchun.",
          imageUrl: media.setDark,
          swatchColors: ["#0A0A0A", "#EC521B", "#8C8C8C"],
        },
        {
          number: "06",
          name: "BETON LOFT",
          category: "Industrial · Urban",
          lighting: "Cool 4800K Rim",
          dimensions: "5m × 4.5m",
          description:
            "Teksturali kulrang beton devor va metall detallar — avtomobil, qurilish va IT kompaniyalar uchun.",
          imageUrl: media.concreteRoom,
          swatchColors: ["#6E7275", "#1F2224", "#7ECBF2"],
        },
        {
          number: "07",
          name: "PASTEL EDITORIAL",
          category: "Fashion · Beauty",
          lighting: "Diffuziya Beauty Dish",
          dimensions: "8 xil pastel rulon",
          description:
            "Shaftoli, osmon ko'k, krem va pushti rulon fonlar — go'zallik va moda brendlari uchun.",
          imageUrl: media.loungeSpace,
          swatchColors: ["#F6B8D0", "#7ECBF2", "#FDF6E9"],
        },
      ],
      categories: [
        {
          id: "cat-paper",
          label: "Colorama Qog'oz Fonlar",
          count: 10,
          sets: [
            "Arctic White",
            "Obsidian Black",
            "Burnt Terracotta",
            "Sky Cyan",
            "Warm Sand",
            "Sage Olive",
            "Crimson Studio",
            "Blush Rose",
            "Slate Grey",
            "Butter Cream",
          ],
        },
        {
          id: "cat-podcast",
          label: "Podcast & Suhbat Zonalari",
          count: 5,
          sets: [
            "Warm Walnut Lounge",
            "Dark Studio Table",
            "Minimalist Sofa Set",
            "Bookshelf Expert Corner",
            "Standing Interview Bar",
          ],
        },
        {
          id: "cat-arch",
          label: "Interyer & Arxitektura",
          count: 6,
          sets: [
            "Samarqand Travertin Arka",
            "Beton Industrial Loft",
            "Klassik Molding Devor",
            "Yog'och Lamelli Zona",
            "Parda & Tabiiy Nur",
            "Ofis Stol Dekori",
          ],
        },
        {
          id: "cat-rgb",
          label: "RGB, Neon & Xromakey",
          count: 5,
          sets: [
            "360° Pixel Tube Box",
            "Chroma Green Screen",
            "Chroma Blue Screen",
            "Laser Haze Stage",
            "Sunset Projection Wall",
          ],
        },
        {
          id: "cat-texture",
          label: "Teksturali Mato & Xolst",
          count: 4,
          sets: [
            "Hand-Painted Taupe Canvas",
            "Charcoal Velvet",
            "Crushed Linen Beige",
            "Metallic Foil Backdrop",
          ],
        },
        {
          id: "cat-cyc",
          label: "Tsiklorama & Katalog",
          count: 2,
          sets: ["Katta Oq Tsiklorama (6×5m)", "Qora Mat Tsiklorama"],
        },
      ],
    },
    insights: {
      pill: "Maqolalar",
      title: "KADR ORTIDAGI TAJRIBA VA STRATEGIYA",
      subtitle:
        "Samarqandda Reels, Podcast va Shaxsiy brend orqali mijoz olib kelish bo'yicha amaliy qo'llanmalar.",
      readMore: "Maqolani o'qish",
      prevLabel: "Oldingi maqolalar",
      nextLabel: "Keyingi maqolalar",
      items: [
        {
          id: "i1",
          readTime: "4 DAQIQA O'QISH",
          title: "BIR SYOMKA KUNIDA QANDAY QILIB 15 TA REELS OLISH MUMKIN?",
          excerpt:
            "30+ fon almashtirish, kiyimlar va tayyor ssenariylar bilan vaqtingizni 4 barobar tejang.",
          tags: ["REELS", "STUDIYA"],
          imageUrl: media.shootOne,
          paragraphs: [
            "Ko'pchilik tadbirkorlar har hafta kamera qarshisiga o'tirishga vaqt topolmaydi. Union Studio'da biz bir kunlik tizimli syomka sessiyasi orqali 15–20 ta tayyor Reels olish metodikasini yo'lga qo'yganmiz.",
            "Jarayon syomkadan 2 kun oldin boshlanadi: 15 ta savol-javob yoki hook ssenariysi yoziladi va ularga 4–5 ta turlicha studiya foni (masalan, Podcast zonasi, Beton Loft, Arka va Rangli qog'oz fon) biriktiriladi.",
            "Natijada tomoshabin barcha videolar bir oyda turlicha joylarda olingan deb o'ylaydi, siz esa atigi 3 soat sarflab bir oylik kontent zaxirasiga ega bo'lasiz.",
          ],
        },
        {
          id: "i2",
          readTime: "5 DAQIQA O'QISH",
          title: "PODCAST FORMATI SHAXSIY BREND ISHONCHINI NEGA TEZ OSHIRADI?",
          excerpt:
            "30 soniyalik Reels e'tiborni tortadi, 20 daqiqalik Podcast esa sizdan sotib olishga ishontiradi.",
          tags: ["PODCAST", "SHAXSIY BREND"],
          imageUrl: media.podcastMic,
          paragraphs: [
            "Auditoriya qisqa videolarda sizni ko'radi, ammo haqiqiy ekspertligingizni chuqur suhbatda his qiladi. Samarqanddagi ko'plab liderlar shuning uchun Podcast formatini asosiy kanalga aylantirmoqda.",
            "Bitta 40 daqiqalik Podcast yozuvidan biz 1 ta to'liq YouTube soni va 8–10 ta eng kuchli fikrlardan iborat vertikal Reels kesmalarini tayyorlaymiz.",
            "Shure SM7B mikrofonlari va uch kamerali sinxron syomka tomoshabinda studiya sifati va professional maqom hissini uyg'otadi.",
          ],
        },
        {
          id: "i3",
          readTime: "3 DAQIQA O'QISH",
          title: "MONTAJ VA RANG KORREKSIYA: NEGA BIRINCHI 3 SONIYA HAL QILUVCHI?",
          excerpt:
            "Kinetik titrlar, sound design va ritm orqali ushlab qolish (retention) ko'rsatkichini oshirish.",
          tags: ["MONTAJ", "MOTION"],
          imageUrl: media.editingSuite,
          paragraphs: [
            "Yaxshi yozilgan video ham sust montaj sababli o'tkazib yuborilishi mumkin. Birinchi 3 soniyada aniq vizual ilgak (visual hook), toza rang va dinamik kadr almashinuvi bo'lishi shart.",
            "Union Studio montaj jamoasi har bir loyiha uchun maxsus Remotion va motion-grafika elementlari, toza subtitrlar hamda professional ovoz balansini qo'llaydi.",
          ],
        },
        {
          id: "i4",
          readTime: "6 DAQIQA O'QISH",
          title: "SAMARQAND BOZORI UCHUN SMM VA VIDEO VORONKA",
          excerpt:
            "Ko'rishlar soni emas, real murojaat va sotuv olib keladigan kontent strukturasi.",
          tags: ["SMM", "STRATEGIYA"],
          imageUrl: media.shootThree,
          paragraphs: [
            "Million ko'rish to'plab, bitta ham sotuv qilmaslik mumkin. Shuning uchun biz har bir kontentni uch qismga bo'lamiz: jalb qiluvchi Reels, ishonch beruvchi Podcast/ekspert video va harakatga undovchi oferta.",
            "O'zbek va rus tillarida auditoriyaga mos til ohangi (Tone of Voice) tanlanishi brendingizni Samarqand va butun O'zbekiston bo'ylab ajralib turishini ta'minlaydi.",
          ],
        },
      ],
    },
    footer: {
      ctaPrefix: "G'OYANGIZNI ",
      ctaItalic: "kinematografik",
      ctaSuffix: " KONTENTGA AYLANTIRING.",
      ctaSubtext:
        "30+ fonli studiyamizni band qiling yoki jamoamiz bilan to'liq prodakshn va SMM loyihasini boshlang.",
      ctaButton: "Hoziroq bog'lanish",
      links: [
        { label: "ISHLARIMIZ", href: "#work" },
        { label: "XIZMATLAR", href: "#services" },
        { label: "30+ FONLAR", href: "#backdrops" },
        { label: "MIJOZLAR FIKRI", href: "#testimonials" },
        { label: "MAQOLALAR", href: "#insights" },
        { label: "BRON QILISH", href: "#contact" },
      ],
      contactsLabel: "SAMARQAND STUDIYA ALOQASI",
      address: "Bulvar hududi, Samarqand shahri",
      hours: "Har kuni: 09:00 – 22:00",
      phone1: STUDIO_CONTACTS.phone1,
      phone2: STUDIO_CONTACTS.phone2,
      email: STUDIO_CONTACTS.email,
      instagram: STUDIO_CONTACTS.instagram,
      legal: "© 2026 UNION STUDIO SAMARKAND · REMOTION BILAN QURILGAN",
    },
    bookingModal: {
      title: "SYOMKA YOKI STUDIYA BRON QILISH",
      subtitle:
        "Ma'lumotlaringizni qoldiring — 15 daqiqa ichida Samarqand studiya administratori aloqaga chiqadi.",
      nameLabel: "Ismingiz",
      nameHint: "Masalan: Azizbek Karimov",
      namePlaceholder: "Ismingizni kiriting",
      nameError: "Iltimos, kamida 2 ta harfdan iborat ismingizni kiriting.",
      phoneLabel: "Telefon raqamingiz",
      phoneHint: "Format: +998 90 123 45 67",
      phonePlaceholder: "+998 90 123 45 67",
      phoneError: "To'g'ri telefon raqami kiriting (kamida 9 ta raqam).",
      serviceLabel: "Xizmat yo'nalishi",
      serviceHint: "Asosiy xizmat turini tanlang",
      serviceOptions: [
        "30+ Studiya fonlari ijarasi",
        "Professional syomka va montaj",
        "Podcast va Reels paket",
        "SMM va Shaxsiy brend qurish",
      ],
      backdropLabel: "Afzal ko'rilgan fon / format",
      backdropHint: "Kerak bo'lsa studiya zonasini tanlang",
      backdropOptions: [
        "Maslahat orqali tanlaymiz (30+ fon)",
        "01 · Oq Tsiklorama",
        "02 · Podcast Lounge",
        "03 · Samarqand Arka",
        "04 · Neon Reels Box",
        "05 · Cinema Noir",
        "06 · Beton Loft",
        "07 · Pastel Editorial",
      ],
      notesLabel: "Loyiha haqida qisqacha (ixtiyoriy)",
      notesPlaceholder: "Reels soni, podcast mehmonlari yoki kerakli sana...",
      submitBtn: "Bron so'rovini yuborish",
      cancelBtn: "Bekor qilish",
      successTitle: "SO'ROVINGIZ QABUL QILINDI!",
      successBody:
        "Rahmat! Jamoamiz tanlangan vaqt va fon bo'yicha tez orada siz bilan bog'lanadi. Shoshilinch bo'lsa, quyidagi raqamlarga qo'ng'iroq qiling.",
      newRequestBtn: "Yana so'rov yuborish",
      closeLabel: "Modalni yopish",
    },
    lightboxModal: {
      badge: "REMOTION 4 JONLI KOMPOZITSIYA",
      bookThisBtn: "Shu formatda syomka buyurtma qilish",
      closeLabel: "Pleyerni yopish",
    },
    insightModal: {
      closeLabel: "Maqolani yopish",
      bookFromArticleBtn: "Syomkaga yozilish",
    },
  },
  ru: {
    langLabel: "RU",
    brand: {
      name: "UNION STUDIO",
      city: "САМАРКАНД",
      tagline: "Studio | Студия | Reels | Podcast | Samarkand | Самарканд",
      pillars: "30+ ФОНОВ · СЪЁМКА И МОНТАЖ · PODCAST · REELS · SMM",
    },
    nav: {
      items: [
        { label: "Работы", href: "#work" },
        { label: "Услуги", href: "#services" },
        { label: "30+ Фонов", href: "#backdrops" },
        { label: "Отзывы", href: "#testimonials" },
        { label: "Блог", href: "#insights" },
        { label: "Контакты", href: "#contact" },
      ],
      bookBtn: "Забронировать съёмку",
      openMenuLabel: "Открыть меню",
      closeMenuLabel: "Закрыть меню",
      drawerLabel: "Навигация Union Studio",
      drawerSubtitle: "Самарканд · Бульвар · 09:00 – 22:00",
    },
    hero: {
      topLeftCaption: "STUDIO | СТУДИЯ · REELS & PODCAST",
      topRightCaption: "САМАРКАНД · 30+ ИНТЕРЬЕРНЫХ И ЦВЕТНЫХ ФОНОВ",
      headlineLine1: "СОЗДАЁМ",
      headlineLine2: "КИНЕМАТОГРАФИЧНЫЙ",
      headlineLine3: "КОНТЕНТ.",
      headlineSerif: "union studio",
      bio: "Видеопродакшн полного цикла в Самарканде: более 30 готовых фонов, профессиональная 4K съёмка и монтаж, Podcast, Reels и системный SMM для личного бренда.",
      primaryCta: "Забронировать съёмку",
      showreelCta: "Смотреть Showreel",
      pauseLabel: "Пауза Showreel",
      playLabel: "Воспроизвести Showreel",
      motionHint: "ЖИВОЙ REMOTION SHOWREEL",
    },
    logos: {
      label: "НАМ ДОВЕРЯЮТ БРЕНДЫ САМАРКАНДА И УЗБЕКИСТАНА",
      items: [
        "AURA BREND",
        "TECHSTART",
        "SILK ROAD",
        "CODECRAFT",
        "REGISTON MEDIA",
        "AFROSIYOB",
        "SMART ACADEMY",
        "ZAMIN GROUP",
      ],
    },
    manifesto: {
      statementPrefix: "МЫ НЕ ПРОСТО СНИМАЕМ ВИДЕО — МЫ СТРОИМ ",
      statementItalic: "живые кадры",
      statementSuffix: " И ЛИЧНЫЙ БРЕНД, КОТОРЫЕ ПРИВОДЯТ КЛИЕНТОВ.",
      subtext:
        "15 Reels за один день, двухкамерный Podcast или имиджевая кампания — всё в одной студии с 30+ локациями в центре Самарканда.",
      metrics: [
        {
          value: "30+",
          label: "ГОТОВЫХ СТУДИЙНЫХ ФОНОВ",
          detail:
            "Циклорама, подкаст-зал, неоклассические арки, RGB-неон и фактурные интерьерные локации.",
        },
        {
          value: "500+",
          label: "ВЫПУСКОВ REELS И PODCAST",
          detail:
            "Регулярный продающий видеоконтент для экспертов, предпринимателей и локальных брендов.",
        },
        {
          value: "12M+",
          label: "ОРГАНИЧЕСКИХ ПРОСМОТРОВ",
          detail:
            "Охваты, собранные за счёт точных сценариев, динамичного монтажа и стратегии личного бренда.",
        },
      ],
    },
    work: {
      pill: "Наши работы",
      title: "КАЖДЫЙ КАДР РАБОТАЕТ НА РЕЗУЛЬТАТ",
      subtitle:
        "Reels, Podcast и бренд-фильмы — нажмите на любую карточку, чтобы открыть живую Remotion-композицию.",
      stickerBlue: "30+ ФОНОВ И ЛОКАЦИЙ",
      stickerGold: "ТОП СТУДИЯ САМАРКАНДА",
      stampCta: "ЗАБРОНИРОВАТЬ · UNION STUDIO · ",
      narrativeHeading: "ОТ СЪЁМКИ НА ТЕЛЕФОН К УРОВНЮ КИНО",
      narrativeBody:
        "Свет, микрофоны, более 30 фонов и сценарий уже готовы к вашему приходу. Вы просто говорите в кадре — монтаж сдаём за 48 часов.",
      watchMotionCta: "Открыть Remotion кадр",
      items: [
        {
          id: "aura-reels",
          variant: "reels",
          eyebrow: "ПАКЕТ REELS · AURA BREND",
          title: "15 ВИРУСНЫХ REELS ЗА 1 ДЕНЬ",
          subtitle: "4 студийных фона · динамичный монтаж",
          metric: "2.4M+ ПРОСМ.",
          tag: "Reels",
          imageUrl: media.reelsNeon,
          accentColor: "#ec521b",
          deliverables: [
            "15 вертикальных Reels 9:16",
            "4 разных студийных фона",
            "Кинетические субтитры и саунд-дизайн",
          ],
          description:
            "Для бренда одежды в Самарканде за одну смену сняли 15 роликов со сменой 4 локаций. Продажи выросли в 2.3 раза за 3 недели.",
        },
        {
          id: "founder-podcast",
          variant: "podcast",
          eyebrow: "PODCAST · FOUNDER TALKS",
          title: "МНОГОКАМЕРНЫЙ PODCAST ПОД КЛЮЧ",
          subtitle: "Shure SM7B · 4K multi-cam · Shorts",
          metric: "12 ВЫПУСКОВ",
          tag: "Podcast",
          imageUrl: media.podcastRoom,
          accentColor: "#7ecbf2",
          deliverables: [
            "3 ракурса в 4K разрешении",
            "Студийная запись звука по дорожкам",
            "8 вертикальных нарезoк Reels с выпуска",
          ],
          description:
            "Тёплая акустическая зона для бесед с предпринимателями, чистое сведение голосов и готовые нарезки для YouTube и Instagram.",
        },
        {
          id: "silkroad-brand",
          variant: "brand",
          eyebrow: "БРЕНД-ФИЛЬМ · SILK ROAD",
          title: "ЛИЧНЫЙ БРЕНД И ИМИДЖЕВОЕ ВИДЕО",
          subtitle: "Кинооптика · цветокоррекция RAW",
          metric: "4K CINEMA",
          tag: "Съёмка и Монтаж",
          imageUrl: media.cameraRig,
          accentColor: "#f2b749",
          deliverables: [
            "Сценарий и режиссура",
            "Киношный цветокор (LUT)",
            "Адаптация для сайта и соцсетей",
          ],
          description:
            "Имиджевый ролик, соединяющий эстетику Самарканда и современный бизнес для усиления доверия к бренду и руководителю.",
        },
        {
          id: "codecraft-smm",
          variant: "smm",
          eyebrow: "SMM И ЛИЧНЫЙ БРЕНД · CODECRAFT",
          title: "СИСТЕМНЫЙ ЛИЧНЫЙ БРЕНД С НУЛЯ",
          subtitle: "Контент-план · Съёмка · Ведение",
          metric: "+340% РОСТ",
          tag: "SMM и Бренд",
          imageUrl: media.socialFlow,
          accentColor: "#f6b8d0",
          deliverables: [
            "Ежемесячная контент-стратегия",
            "20 Reels + воронка в Stories",
            "Аналитика охватов и заявок",
          ],
          description:
            "Упаковали экспертизу спикера в регулярные Reels и Podcast-выпуски, выстроив стабильный поток входящих заявок.",
        },
      ],
    },
    services: {
      pill: "Услуги",
      title: "СТУДИЯ И ПРОДАКШН УСЛУГИ",
      description:
        "От почасовой аренды 30+ фонов до полного цикла: сценарий, съёмка, монтаж, Podcast и SMM.",
      viewAllCta: "Получить консультацию",
      items: [
        {
          index: "01",
          key: "backdrops",
          title: "30+ СТУДИЙНЫХ ФОНОВ",
          subtitle: "Крупнейший выбор локаций в Самарканде",
          bullets: [
            "Более 30 бумажных, тканевых, фактурных и интерьерных фонов",
            "Большая белая циклорама, арки, бетонный лофт и подкаст-зал",
            "Профессиональный свет Aputure / Godox и модификаторы",
          ],
          imageUrl: media.archInterior,
          ctaLabel: "Бронировать фон",
        },
        {
          index: "02",
          key: "production",
          title: "ПРОФЕССИОНАЛЬНАЯ СЪЁМКА И МОНТАЖ",
          subtitle: "4K камеры, постановка света и монтаж за 48 часов",
          bullets: [
            "Кинокамеры, световые схемы и работа оператора-постановщика",
            "Динамичный монтаж Reels, кинетические титры и моушн-графика",
            "Цветокоррекция, саунд-дизайн и экспорт во все форматы",
          ],
          imageUrl: media.editingDesk,
          ctaLabel: "Заказать съёмку",
        },
        {
          index: "03",
          key: "podcast_reels",
          title: "PODCAST, REELS И ВИДЕОКОНТЕНТ",
          subtitle: "Контент на целый месяц за одну съёмочную сессию",
          bullets: [
            "2–3 камерная запись Podcast и интервью (Shure / Rode)",
            "Пакеты серийных Reels для экспертов и бизнеса",
            "Рекламные ролики, обзоры продуктов и YouTube-выпуски",
          ],
          imageUrl: media.podcastTwo,
          ctaLabel: "Записать Podcast",
        },
        {
          index: "04",
          key: "smm_brand",
          title: "SMM И ПОСТРОЕНИЕ ЛИЧНОГО БРЕНДА",
          subtitle: "Позиционирование, сценарии и системный рост",
          bullets: [
            "Архитектура личного бренда и визуальный стиль (Tone of Voice)",
            "Трендовые и продающие сценарии, контент-план и воронки",
            "Ведение Instagram, YouTube Shorts и Telegram-каналов",
          ],
          imageUrl: media.meetingTeam,
          ctaLabel: "Заказать стратегию",
        },
      ],
    },
    testimonials: {
      pill: "Отзывы",
      title: "ВЫБОР БРЕНДОВ САМАРКАНДА.",
      prevLabel: "Предыдущий отзыв",
      nextLabel: "Следующий отзыв",
      items: [
        {
          id: "t1",
          quote:
            "Впервые вижу столько разных фонов в одной студии. За один день сняли 12 Reels — каждый выглядит как отдельная локация.",
          roleTitle: "ПАКЕТ REELS И 30+ ФОНОВ",
          author: "Дильшод Каримов",
          company: "Основатель Aura Brend",
          avatarUrl: media.portrait1,
        },
        {
          id: "t2",
          quote:
            "Для подкаста критичны звук и атмосфера. В Union Studio и акустика, и монтаж с трёх камер превзошли ожидания.",
          roleTitle: "PODCAST И SHORTS",
          author: "Малика Азизова",
          company: "Ведущая Founder Talks",
          avatarUrl: media.portrait2,
        },
        {
          id: "t3",
          quote:
            "Запустили личный бренд с нуля. То, что сценарий, съёмку, монтаж и SMM делает одна команда, сэкономило мне массу времени.",
          roleTitle: "SMM И ЛИЧНЫЙ БРЕНД",
          author: "Сардор Рахимов",
          company: "CodeCraft Academy",
          avatarUrl: media.portrait3,
        },
        {
          id: "t4",
          quote:
            "Монтаж отдают за 48 часов, чистая цветокоррекция и титры. В Самарканде такой уровень продакшна — редкость.",
          roleTitle: "СЪЁМКА И МОНТАЖ",
          author: "Нигора Тошматова",
          company: "Silk Road Boutique",
          avatarUrl: media.portrait4,
        },
        {
          id: "t5",
          quote:
            "Сняли серию экспертных Reels для клиники. Уже в первый месяц заметили ощутимый рост обращений.",
          roleTitle: "БИЗНЕС-КОНТЕНТ",
          author: "Жамшид Норов",
          company: "Zamin Med Clinic",
          avatarUrl: media.portrait5,
        },
      ],
    },
    backdrops: {
      pill: "30+ Фонов",
      titlePrefix: "БОЛЕЕ 30 СТУДИЙНЫХ ФОНОВ ",
      titleItalic: "для любой задачи",
      titleSuffix: " В САМАРКАНДЕ.",
      subtitle:
        "Нажмите на любую из зон 01–07 ниже — живая Remotion-визуализация сразу переключит локацию.",
      bookSetCta: "Забронировать этот фон",
      catalogToggleOpen: "Открыть весь каталог 30+ фонов",
      catalogToggleClose: "Скрыть каталог",
      allCountBadge: "32 АКТИВНЫХ ФОНА И ЛОКАЦИИ",
      featuredSets: [
        {
          number: "01",
          name: "БЕЛАЯ ЦИКЛОРАМА",
          category: "Минимализм · Каталог",
          lighting: "5600K Softbox Grid",
          dimensions: "6м × 5м · высота 3.8м",
          description:
            "Бесшовная белая циклорама для лукбуков, динамичных Reels и рекламных роликов.",
          imageUrl: media.studioWide,
          swatchColors: ["#FDF6E9", "#E5E2DC", "#111111"],
        },
        {
          number: "02",
          name: "PODCAST LOUNGE",
          category: "Акустика · Интервью",
          lighting: "3200K Тёплый Tungsten",
          dimensions: "До 4 гостей · Shure SM7B",
          description:
            "Уютные кресла, акустические панели и тёплый студийный свет для подкастов и интервью.",
          imageUrl: media.podcastRoom,
          swatchColors: ["#EC521B", "#3B2820", "#F2B749"],
        },
        {
          number: "03",
          name: "АРКА САМАРКАНД",
          category: "Editorial · Архитектура",
          lighting: "Дневной + Key Light",
          dimensions: "4.5м × 4м",
          description:
            "Песчаная архитектурная арка — идеальный фон для экспертов, дизайнеров и личного бренда.",
          imageUrl: media.archInterior,
          swatchColors: ["#D8B994", "#FDF6E9", "#5B4A3F"],
        },
        {
          number: "04",
          name: "NEON REELS BOX",
          category: "RGB · Tech & Youth",
          lighting: "RGB Pixel Tubes 360°",
          dimensions: "3.5м × 3.5м",
          description:
            "Управляемый неоновый свет для IT, музыки, молодёжных брендов и ярких вертикальных видео.",
          imageUrl: media.reelsNeon,
          swatchColors: ["#EC521B", "#7ECBF2", "#141414"],
        },
        {
          number: "05",
          name: "CINEMA NOIR",
          category: "Драма · Бизнес",
          lighting: "Chiaroscuro Spot",
          dimensions: "5м × 4м",
          description:
            "Глубокий матовый чёрный и контрастный рисующий свет для сильных экспертных монологов.",
          imageUrl: media.setDark,
          swatchColors: ["#0A0A0A", "#EC521B", "#8C8C8C"],
        },
        {
          number: "06",
          name: "БЕТОННЫЙ ЛОФТ",
          category: "Industrial · Urban",
          lighting: "Холодный 4800K Rim",
          dimensions: "5м × 4.5м",
          description:
            "Фактурный серый бетон и индустриальные акценты для авто, строительства и IT-компаний.",
          imageUrl: media.concreteRoom,
          swatchColors: ["#6E7275", "#1F2224", "#7ECBF2"],
        },
        {
          number: "07",
          name: "ПАСТЕЛЬ EDITORIAL",
          category: "Fashion · Beauty",
          lighting: "Мягкий Beauty Dish",
          dimensions: "8 пастельных рулонов",
          description:
            "Персиковый, небесно-голубой, кремовый и пудровый фоны для бьюти- и fashion-съёмок.",
          imageUrl: media.loungeSpace,
          swatchColors: ["#F6B8D0", "#7ECBF2", "#FDF6E9"],
        },
      ],
      categories: [
        {
          id: "cat-paper",
          label: "Бумажные фоны Colorama",
          count: 10,
          sets: [
            "Arctic White",
            "Obsidian Black",
            "Burnt Terracotta",
            "Sky Cyan",
            "Warm Sand",
            "Sage Olive",
            "Crimson Studio",
            "Blush Rose",
            "Slate Grey",
            "Butter Cream",
          ],
        },
        {
          id: "cat-podcast",
          label: "Podcast и зоны интервью",
          count: 5,
          sets: [
            "Warm Walnut Lounge",
            "Dark Studio Table",
            "Minimalist Sofa Set",
            "Bookshelf Expert Corner",
            "Standing Interview Bar",
          ],
        },
        {
          id: "cat-arch",
          label: "Интерьер и архитектура",
          count: 6,
          sets: [
            "Арка Травертин",
            "Бетонный Лофт",
            "Классические молдинги",
            "Деревянные рейки",
            "Шторы и мягкий свет",
            "Деловой кабинет",
          ],
        },
        {
          id: "cat-rgb",
          label: "RGB, Неон и Хромакей",
          count: 5,
          sets: [
            "360° Pixel Tube Box",
            "Chroma Green Screen",
            "Chroma Blue Screen",
            "Laser Haze Stage",
            "Sunset Projection Wall",
          ],
        },
        {
          id: "cat-texture",
          label: "Фактурный холст и ткань",
          count: 4,
          sets: [
            "Hand-Painted Taupe Canvas",
            "Charcoal Velvet",
            "Crushed Linen Beige",
            "Metallic Foil Backdrop",
          ],
        },
        {
          id: "cat-cyc",
          label: "Циклорамы",
          count: 2,
          sets: ["Большая белая циклорама (6×5м)", "Чёрная матовая циклорама"],
        },
      ],
    },
    insights: {
      pill: "Блог",
      title: "ОПЫТ И СТРАТЕГИЯ ЗА КАДРОМ",
      subtitle:
        "Практические разборы о том, как Reels, Podcast и личный бренд приводят клиентов в Самарканде.",
      readMore: "Читать статью",
      prevLabel: "Предыдущие статьи",
      nextLabel: "Следующие статьи",
      items: [
        {
          id: "i1",
          readTime: "4 МИН ЧТЕНИЯ",
          title: "КАК СНЯТЬ 15 REELS ЗА ОДИН СЪЁМОЧНЫЙ ДЕНЬ?",
          excerpt:
            "Смена 30+ фонов, образов и заранее готовые сценарии экономят до 75% времени.",
          tags: ["REELS", "СТУДИЯ"],
          imageUrl: media.shootOne,
          paragraphs: [
            "Большинство предпринимателей не могут выделять время на камеру каждую неделю. В Union Studio мы выстроили систему пакетной съёмки, где за 3 часа записывается 15–20 готовых Reels.",
            "За 2 дня до смены мы прописываем сценарии-хуки и закрепляем за ними 4–5 разных локаций студии — от подкаст-зала до бетонного лофта.",
            "В итоге ваша лента выглядит разнообразной на протяжении всего месяца, а вы тратите всего один вечер в студии.",
          ],
        },
        {
          id: "i2",
          readTime: "5 МИН ЧТЕНИЯ",
          title: "ПОЧЕМУ PODCAST БЫСТРЕЕ ВСЕГО СТРОИТ ДОВЕРИЕ К ЛИЧНОМУ БРЕНДУ?",
          excerpt:
            "30-секундный Reels привлекает внимание, а 20-минутный подкаст убеждает купить именно у вас.",
          tags: ["PODCAST", "ЛИЧНЫЙ БРЕНД"],
          imageUrl: media.podcastMic,
          paragraphs: [
            "Короткие видео дают первый контакт, но настоящая глубина экспертизы раскрывается в диалоге. Поэтому лидеры мнений в Самарканде выбирают формат Podcast.",
            "Из одного 40-минутного выпуска мы делаем полноценное видео для YouTube и 8–10 вертикальных нарезок Reels с самыми сильными тезисами.",
          ],
        },
        {
          id: "i3",
          readTime: "3 МИН ЧТЕНИЯ",
          title: "МОНТАЖ И ЦВЕТ: ПОЧЕМУ РЕШАЮТ ПЕРВЫЕ 3 СЕКУНДЫ",
          excerpt:
            "Кинетические титры, саунд-дизайн и ритм склеек для максимального удержания зрителя.",
          tags: ["МОНТАЖ", "MOTION"],
          imageUrl: media.editingSuite,
          paragraphs: [
            "Даже сильная мысль теряется без динамики в первых кадрах. Визуальный хук, чистый цвет и точный саунд-дизайн удерживают внимание с первой секунды.",
            "Команда Union Studio использует моушн-графику и Remotion-шаблоны, чтобы каждый ролик выглядел как цельный бренд-продукт.",
          ],
        },
        {
          id: "i4",
          readTime: "6 МИН ЧТЕНИЯ",
          title: "SMM И ВИДЕОВОРONКА ДЛЯ РЫНКА САМАРКАНДА",
          excerpt:
            "Структура контента, которая приносит не просто просмотры, а стабильные заявки.",
          tags: ["SMM", "СТРАТЕГИЯ"],
          imageUrl: media.shootThree,
          paragraphs: [
            "Миллион просмотров без понятного предложения не даёт продаж. Мы делим контент на три уровня: охватные Reels, доверительные подкасты и конверсионные разборы.",
            "Билингвальный подход на узбекском и русском языках позволяет вашему бренду уверенно расти в Самарканде и по всему Узбекистану.",
          ],
        },
      ],
    },
    footer: {
      ctaPrefix: "ПРЕВРАТИТЕ ВАШУ ИДЕЮ В ",
      ctaItalic: "кинематографичный",
      ctaSuffix: " КОНТЕНТ.",
      ctaSubtext:
        "Забронируйте студию с 30+ фонами или запустите полный цикл продакшна и SMM с нашей командой.",
      ctaButton: "Связаться сейчас",
      links: [
        { label: "РАБОТЫ", href: "#work" },
        { label: "УСЛУГИ", href: "#services" },
        { label: "30+ ФОНОВ", href: "#backdrops" },
        { label: "ОТЗЫВЫ", href: "#testimonials" },
        { label: "БЛОГ", href: "#insights" },
        { label: "БРОНЬ", href: "#contact" },
      ],
      contactsLabel: "КОНТАКТЫ СТУДИИ В САМАРКАНДЕ",
      address: "Район Бульвара, г. Самарканд",
      hours: "Ежедневно: 09:00 – 22:00",
      phone1: STUDIO_CONTACTS.phone1,
      phone2: STUDIO_CONTACTS.phone2,
      email: STUDIO_CONTACTS.email,
      instagram: STUDIO_CONTACTS.instagram,
      legal: "© 2026 UNION STUDIO САМАРКАНД · СОЗДАНО С REMOTION",
    },
    bookingModal: {
      title: "ЗАБРОНИРОВАТЬ СЪЁМКУ ИЛИ СТУДИЮ",
      subtitle:
        "Оставьте заявку — администратор Union Studio в Самарканде свяжется с вами в течение 15 минут.",
      nameLabel: "Ваше имя",
      nameHint: "Например: Азизбек Каримов",
      namePlaceholder: "Введите ваше имя",
      nameError: "Пожалуйста, введите имя (минимум 2 буквы).",
      phoneLabel: "Номер телефона",
      phoneHint: "Формат: +998 90 123 45 67",
      phonePlaceholder: "+998 90 123 45 67",
      phoneError: "Введите корректный номер телефона (минимум 9 цифр).",
      serviceLabel: "Услуга",
      serviceHint: "Выберите основное направление",
      serviceOptions: [
        "Аренда 30+ студийных фонов",
        "Профессиональная съёмка и монтаж",
        "Пакет Podcast и Reels",
        "SMM и построение личного бренда",
      ],
      backdropLabel: "Предпочитаемый фон / формат",
      backdropHint: "При необходимости выберите локацию",
      backdropOptions: [
        "Выберем вместе на консультации (30+ фонов)",
        "01 · Белая Циклорама",
        "02 · Podcast Lounge",
        "03 · Арка Самарканд",
        "04 · Neon Reels Box",
        "05 · Cinema Noir",
        "06 · Бетонный Лофт",
        "07 · Пастель Editorial",
      ],
      notesLabel: "Комментарий к проекту (необязательно)",
      notesPlaceholder: "Количество Reels, гости подкаста или желаемая дата...",
      submitBtn: "Отправить заявку",
      cancelBtn: "Отмена",
      successTitle: "ЗАЯВКА ПРИНЯТА!",
      successBody:
        "Спасибо! Наша команда скоро свяжется с вами для подтверждения времени и выбранного фона. Для срочной связи звоните по номерам ниже.",
      newRequestBtn: "Отправить ещё заявку",
      closeLabel: "Закрыть окно",
    },
    lightboxModal: {
      badge: "REMOTION 4 ЖИВАЯ КОМПОЗИЦИЯ",
      bookThisBtn: "Заказать съёмку в этом формате",
      closeLabel: "Закрыть плеер",
    },
    insightModal: {
      closeLabel: "Закрыть статью",
      bookFromArticleBtn: "Записаться на съёмку",
    },
  },
};
