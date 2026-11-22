import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { REMOTION_COLORS, REMOTION_FONTS } from "../theme";

export interface BackdropsShowcaseProps extends Record<string, unknown> {
  setNumber: string;
  name: string;
  category: string;
  lighting: string;
  dimensions: string;
  imageUrl: string;
  swatchColors: [string, string, string];
}

export const BackdropsShowcaseComposition: React.FC<BackdropsShowcaseProps> = ({
  setNumber,
  name,
  category,
  lighting,
  dimensions,
  imageUrl,
  swatchColors,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const scale = interpolate(frame, [0, durationInFrames], [1.02, 1.09]);
  const spotX = 50 + Math.sin((frame / durationInFrames) * Math.PI * 2) * 18;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: REMOTION_COLORS.obsidian,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        <Img
          src={imageUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "contrast(1.06) brightness(0.84)",
          }}
        />
      </AbsoluteFill>

      {/* Moving Studio Key-Light Glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${spotX}% 36%, rgba(236, 82, 27, 0.28) 0%, rgba(10,10,10,0.18) 46%, rgba(10,10,10,0.88) 92%)`,
        }}
      />

      {/* Camera Viewfinder Grid Overlay */}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            inset: 28,
            border: "1px solid rgba(255,255,255,0.22)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "33.33%",
              top: 0,
              bottom: 0,
              width: 1,
              backgroundColor: "rgba(255,255,255,0.12)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "66.66%",
              top: 0,
              bottom: 0,
              width: 1,
              backgroundColor: "rgba(255,255,255,0.12)",
            }}
          />
        </div>
      </AbsoluteFill>

      {/* Top metadata */}
      <div
        style={{
          position: "absolute",
          top: 48,
          left: 52,
          right: 52,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            padding: "10px 20px",
            borderRadius: 999,
            backgroundColor: REMOTION_COLORS.orange,
            color: REMOTION_COLORS.white,
            fontFamily: REMOTION_FONTS.sans,
            fontWeight: 800,
            fontSize: 20,
            letterSpacing: "0.08em",
          }}
        >
          SET {setNumber} / 30+ · {category.toUpperCase()}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {swatchColors.map((hex) => (
            <span
              key={hex}
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                backgroundColor: hex,
                border: "2px solid rgba(255,255,255,0.8)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom details */}
      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: 52,
          right: 52,
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
              fontSize: 78,
              lineHeight: 0.9,
              fontWeight: 900,
              color: REMOTION_COLORS.white,
            }}
          >
            {name}
          </div>
          <div
            style={{
              marginTop: 10,
              fontFamily: REMOTION_FONTS.sans,
              fontSize: 22,
              color: REMOTION_COLORS.cream,
            }}
          >
            {lighting} · {dimensions}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
