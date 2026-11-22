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

export interface ReelShowcaseProps extends Record<string, unknown> {
  variant: "reels" | "podcast" | "brand" | "smm";
  title: string;
  subtitle: string;
  metric: string;
  tag: string;
  imageUrl: string;
  accentColor: string;
}

export const ReelShowcaseComposition: React.FC<ReelShowcaseProps> = ({
  variant,
  title,
  subtitle,
  metric,
  tag,
  imageUrl,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1.02, 1.12]);
  const pop = spring({
    frame: frame % 90,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const wipePct =
    50 + Math.sin((frame / durationInFrames) * Math.PI * 2) * 34;

  const waveBars = Array.from({ length: 18 }, (_, i) => {
    const h = 18 + Math.abs(Math.sin(frame * 0.22 + i * 0.65)) * 68;
    return h;
  });

  const graphProgress = interpolate(frame, [0, durationInFrames * 0.7], [280, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: REMOTION_COLORS.obsidian,
        overflow: "hidden",
      }}
    >
      {/* Background media */}
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <Img
          src={imageUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter:
              variant === "brand"
                ? "contrast(1.1) saturate(1.2) brightness(0.8)"
                : "contrast(1.06) brightness(0.75)",
          }}
        />
      </AbsoluteFill>

      {/* Brand RAW -> LUT Split Wipe */}
      {variant === "brand" && (
        <AbsoluteFill
          style={{
            clipPath: `inset(0 ${100 - wipePct}% 0 0)`,
          }}
        >
          <Img
            src={imageUrl}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${zoom})`,
              filter: "grayscale(0.92) contrast(0.88) brightness(0.76)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 120,
              left: 36,
              padding: "8px 16px",
              backgroundColor: "rgba(10,10,10,0.78)",
              color: REMOTION_COLORS.white,
              fontFamily: "monospace",
              fontSize: 20,
              borderRadius: 8,
            }}
          >
            RAW LOG
          </div>
        </AbsoluteFill>
      )}

      {variant === "brand" && (
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${wipePct}%`,
            width: 4,
            backgroundColor: accentColor,
            boxShadow: `0 0 24px ${accentColor}`,
          }}
        />
      )}

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.68) 0%, rgba(10,10,10,0.12) 45%, rgba(10,10,10,0.94) 100%)",
        }}
      />

      {/* Top Tag & Metric Pill */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          right: 40,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            padding: "10px 22px",
            borderRadius: 999,
            backgroundColor: accentColor,
            color:
              accentColor === REMOTION_COLORS.cream ||
              accentColor === REMOTION_COLORS.sky ||
              accentColor === REMOTION_COLORS.gold ||
              accentColor === REMOTION_COLORS.pink
                ? REMOTION_COLORS.obsidian
                : REMOTION_COLORS.white,
            fontFamily: REMOTION_FONTS.sans,
            fontWeight: 800,
            fontSize: 22,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {tag}
        </span>

        <span
          style={{
            padding: "10px 22px",
            borderRadius: 999,
            backgroundColor: "rgba(10,10,10,0.78)",
            border: "1px solid rgba(255,255,255,0.22)",
            color: REMOTION_COLORS.white,
            fontFamily: REMOTION_FONTS.display,
            fontSize: 30,
            fontWeight: 900,
            transform: `scale(${0.94 + pop * 0.06})`,
          }}
        >
          {metric}
        </span>
      </div>

      {/* Variant-specific Remotion HUD Overlay */}
      {variant === "reels" && (
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 40,
            right: 40,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
          }}
        >
          {[0, 1, 2, 3].map((seg) => {
            const p = Math.max(
              0,
              Math.min(1, (frame / durationInFrames) * 4 - seg),
            );
            return (
              <div
                key={seg}
                style={{
                  height: 5,
                  borderRadius: 99,
                  backgroundColor: "rgba(255,255,255,0.25)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${p * 100}%`,
                    backgroundColor: REMOTION_COLORS.white,
                  }}
                />
              </div>
            );
          })}
        </div>
      )}

      {variant === "podcast" && (
        <div
          style={{
            position: "absolute",
            left: 44,
            right: 44,
            bottom: 330,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            height: 110,
            padding: "18px 24px",
            borderRadius: 20,
            backgroundColor: "rgba(10,10,10,0.74)",
            border: "1px solid rgba(126, 203, 242, 0.45)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: REMOTION_COLORS.orange,
              }}
            />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 20,
                color: REMOTION_COLORS.sky,
                fontWeight: 700,
              }}
            >
              {frame % 80 < 40 ? "CAM A · WIDE" : "CAM B · CLOSE"}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              height: 76,
            }}
          >
            {waveBars.map((h, i) => (
              <div
                key={i}
                style={{
                  width: 7,
                  height: h,
                  borderRadius: 99,
                  backgroundColor:
                    i % 3 === 0 ? REMOTION_COLORS.orange : REMOTION_COLORS.sky,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {variant === "smm" && (
        <div
          style={{
            position: "absolute",
            left: 44,
            right: 44,
            bottom: 330,
            padding: "22px 26px",
            borderRadius: 22,
            backgroundColor: "rgba(10,10,10,0.78)",
            border: "1px solid rgba(246, 184, 208, 0.45)",
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 18,
              color: REMOTION_COLORS.pink,
              marginBottom: 10,
            }}
          >
            REACH & PERSONAL BRAND VELOCITY
          </div>
          <svg viewBox="0 0 400 90" style={{ width: "100%", height: 90 }}>
            <path
              d="M 10 78 C 80 72, 130 58, 195 44 C 260 30, 310 20, 390 8"
              fill="none"
              stroke={REMOTION_COLORS.pink}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="420"
              strokeDashoffset={graphProgress}
            />
          </svg>
        </div>
      )}

      {/* Bottom Headline Block */}
      <div
        style={{
          position: "absolute",
          bottom: 44,
          left: 44,
          right: 44,
        }}
      >
        <div
          style={{
            fontFamily: REMOTION_FONTS.display,
            fontSize: 78,
            lineHeight: 0.9,
            fontWeight: 900,
            color: REMOTION_COLORS.white,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 14,
            fontFamily: REMOTION_FONTS.sans,
            fontSize: 28,
            color: REMOTION_COLORS.cream,
            opacity: 0.9,
          }}
        >
          {subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};
