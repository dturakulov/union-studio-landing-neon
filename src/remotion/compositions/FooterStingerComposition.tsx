import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { REMOTION_COLORS, REMOTION_FONTS } from "../theme";

export interface FooterStingerProps extends Record<string, unknown> {
  cityLabel: string;
  imageUrl: string;
}

export const FooterStingerComposition: React.FC<FooterStingerProps> = ({
  cityLabel,
  imageUrl,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const spin = interpolate(frame, [0, durationInFrames], [0, 360]);
  const pulse = 0.7 + 0.3 * Math.sin(frame * 0.16);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: REMOTION_COLORS.orange,
        overflow: "hidden",
      }}
    >
      {/* Duotone background photo */}
      <AbsoluteFill style={{ opacity: 0.44, mixBlendMode: "multiply" }}>
        <Img
          src={imageUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "grayscale(1) contrast(1.45)",
          }}
        />
      </AbsoluteFill>

      {/* Dark ink frame */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at center, rgba(236,82,27,0.12) 25%, rgba(10,10,10,0.88) 92%)",
        }}
      />

      {/* Film strip top & bottom sprocket rails */}
      {[28, 1022].map((yPos) => (
        <div
          key={yPos}
          style={{
            position: "absolute",
            top: yPos,
            left: 24,
            right: 24,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              style={{
                width: 44,
                height: 26,
                borderRadius: 6,
                backgroundColor: REMOTION_COLORS.cream,
                opacity: 0.9,
              }}
            />
          ))}
        </div>
      ))}

      {/* Rotating circular stamp + center wordmark */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: 680,
            height: 680,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            viewBox="0 0 400 400"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              transform: `rotate(${spin}deg)`,
            }}
          >
            <defs>
              <path
                id="union-ring"
                d="M 200, 200 m -155, 0 a 155,155 0 1,1 310,0 a 155,155 0 1,1 -310,0"
              />
            </defs>
            <text
              fill={REMOTION_COLORS.cream}
              fontSize="22"
              fontWeight="700"
              letterSpacing="5.5"
              fontFamily={REMOTION_FONTS.sans}
            >
              <textPath href="#union-ring">
                UNION STUDIO • {cityLabel.toUpperCase()} • 30+ FON • REELS • PODCAST •
              </textPath>
            </text>
          </svg>

          <div
            style={{
              width: 390,
              height: 390,
              borderRadius: "50%",
              backgroundColor: REMOTION_COLORS.obsidian,
              border: `6px solid ${REMOTION_COLORS.cream}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: 32,
            }}
          >
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                backgroundColor: REMOTION_COLORS.orange,
                opacity: pulse,
                marginBottom: 16,
              }}
            />
            <div
              style={{
                fontFamily: REMOTION_FONTS.display,
                fontSize: 96,
                lineHeight: 0.85,
                color: REMOTION_COLORS.cream,
                fontWeight: 900,
              }}
            >
              UNION
            </div>
            <div
              style={{
                fontFamily: REMOTION_FONTS.serif,
                fontStyle: "italic",
                fontSize: 54,
                color: REMOTION_COLORS.orange,
                lineHeight: 1,
                marginTop: 6,
              }}
            >
              studio
            </div>
            <div
              style={{
                marginTop: 14,
                fontFamily: "monospace",
                fontSize: 20,
                letterSpacing: "0.18em",
                color: REMOTION_COLORS.muted,
              }}
            >
              {cityLabel.toUpperCase()} · 4K
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
