import React from "react";
import { Composition } from "remotion";
import {
  HERO_DEFAULT_SCENES,
  HeroShowreelComposition,
} from "./compositions/HeroShowreelComposition";
import {
  STUDIO_INTRO_DEFAULT_FRAMES,
  StudioIntroReelComposition,
} from "./compositions/StudioIntroReelComposition";
import { ReelShowcaseComposition } from "./compositions/ReelShowcaseComposition";
import { ServiceMotionComposition } from "./compositions/ServiceMotionComposition";
import { BackdropsShowcaseComposition } from "./compositions/BackdropsShowcaseComposition";
import { FooterStingerComposition } from "./compositions/FooterStingerComposition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HeroShowreel"
        component={HeroShowreelComposition}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          scenes: HERO_DEFAULT_SCENES,
          studioBadge: "UNION STUDIO · SAMARQAND",
        }}
      />
      <Composition
        id="StudioIntroReel"
        component={StudioIntroReelComposition}
        durationInFrames={240}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          title: "UNION STUDIO",
          subtitle: "30+ fonlar · Syomka · Montaj · Podcast",
          frames: STUDIO_INTRO_DEFAULT_FRAMES,
        }}
      />
      <Composition
        id="ReelShowcase"
        component={ReelShowcaseComposition}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1350}
        defaultProps={{
          variant: "reels" as const,
          title: "1 KUNDA 15 TA VIRAL REELS",
          subtitle: "4 ta studiya foni · dinamik montaj",
          metric: "2.4M+ KO'RISH",
          tag: "Reels",
          imageUrl:
            "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&fit=crop&q=80&auto=format",
          accentColor: "#ec521b",
        }}
      />
      <Composition
        id="ServiceMotion"
        component={ServiceMotionComposition}
        durationInFrames={180}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          serviceKey: "production" as const,
          label: "PROFESSIONAL SYOMKA VA MONTAJ",
          sublabel: "4K · 48 SOAT",
          imageUrl:
            "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&fit=crop&q=80&auto=format",
        }}
      />
      <Composition
        id="BackdropsShowcase"
        component={BackdropsShowcaseComposition}
        durationInFrames={180}
        fps={30}
        width={1280}
        height={800}
        defaultProps={{
          setNumber: "03",
          name: "SAMARQAND ARKA",
          category: "Editorial · Arxitektura",
          lighting: "Tabiiy + Key Light",
          dimensions: "4.5m × 4m",
          imageUrl:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&fit=crop&q=80&auto=format",
          swatchColors: ["#D8B994", "#FDF6E9", "#5B4A3F"] as [
            string,
            string,
            string,
          ],
        }}
      />
      <Composition
        id="FooterStinger"
        component={FooterStingerComposition}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          cityLabel: "Samarkand",
          imageUrl:
            "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&fit=crop&q=80&auto=format",
        }}
      />
    </>
  );
};
