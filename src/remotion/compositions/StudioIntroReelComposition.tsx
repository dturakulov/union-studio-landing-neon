import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { REMOTION_COLORS, REMOTION_FONTS } from "../theme";

export interface StudioIntroReelProps extends Record<string, unknown> {
  title: string;
  subtitle: string;
  frames: string[];
}

export const STUDIO_INTRO_DEFAULT_FRAMES = [
  "https://images.unsplash.com/photo-1581368135153-a506cf13b1e1?w=1200&fit=crop&q=80&auto=format",
  "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&fit=crop&q=80&auto=format",
  "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200&fit=crop&q=80&auto=format",
];

export const StudioIntroReelComposition: React.FC<StudioIntroReelProps> = ({
  title,
  subtitle,
  frames,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const imgs = frames.length > 0 ? frames : STUDIO_INTRO_DEFAULT_FRAMES;
  const segment = durationInFrames / imgs.length;
  const activeIdx = Math.min(imgs.length - 1, Math.floor(frame / segment));
  const local = frame - activeIdx * segment;

  const scale = interpolate(local, [0, segment], [1.03, 1.11]);
  const wipe = spring({
    frame: local,
    fps,
    config: { damping: 18, stiffness: 130 },
  });
  const kelvin = Math.round(
    interpolate(frame, [0, durationInFrames], [3200, 5600]),
  );
  const setCounter = Math.min(
    32,
    Math.max(1, Math.round(interpolate(frame, [0, durationInFrames], [1, 32]))),
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: REMOTION_COLORS.surface,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        <Img
          src={imgs[activeIdx]}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "contrast(1.06) brightness(0.84)",
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.12) 45%, rgba(10,10,10,0.92) 100%)",
        }}
      />

      {/* Clapperboard top stripe */}
      <div
        style={{
          position: "absolute",
          top: 26,
          left: 28,
          right: 28,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            padding: "8px 16px",
            borderRadius: 999,
            backgroundColor: REMOTION_COLORS.orange,
            color: REMOTION_COLORS.white,
            fontFamily: REMOTION_FONTS.sans,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.1em",
            transform: `translateY(${(1 - wipe) * -12}px)`,
          }}
        >
          SET {setCounter.toString().padStart(2, "0")} / 30+
        </div>
        <div
          style={{
            padding: "8px 16px",
            borderRadius: 999,
            backgroundColor: "rgba(10,10,10,0.75)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: REMOTION_COLORS.cream,
            fontFamily: "monospace",
            fontSize: 18,
          }}
        >
          {kelvin}K · 4K RAW
        </div>
      </div>

      {/* Bottom Slate */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: 28,
          right: 28,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 24,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: REMOTION_FONTS.display,
              fontSize: 54,
              lineHeight: 0.9,
              fontWeight: 900,
              color: REMOTION_COLORS.white,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 8,
              fontFamily: REMOTION_FONTS.sans,
              fontSize: 20,
              color: REMOTION_COLORS.muted,
            }}
          >
            {subtitle}
          </div>
        </div>
        <div
          style={{
            width: 84,
            height: 84,
            borderRadius: "50%",
            border: "2px solid rgba(236, 82, 27, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: REMOTION_FONTS.serif,
            fontStyle: "italic",
            fontSize: 26,
            color: REMOTION_COLORS.orange,
            backgroundColor: "rgba(10,10,10,0.7)",
            flexShrink: 0,
          }}
        >
          0{activeIdx + 1}
        </div>
      </div>
    </AbsoluteFill>
  );
};
