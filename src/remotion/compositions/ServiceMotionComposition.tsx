import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { REMOTION_COLORS, REMOTION_FONTS } from "../theme";

export interface ServiceMotionProps extends Record<string, unknown> {
  serviceKey: "backdrops" | "production" | "podcast_reels" | "smm_brand";
  label: string;
  sublabel: string;
  imageUrl: string;
}

export const ServiceMotionComposition: React.FC<ServiceMotionProps> = ({
  serviceKey,
  label,
  sublabel,
  imageUrl,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const scale = interpolate(frame, [0, durationInFrames], [1.02, 1.09]);
  const playheadPct = (frame / durationInFrames) * 100;
  const activeBackdropIdx = Math.floor((frame / durationInFrames) * 6);
  const backdropSwatches = [
    "#FDF6E9",
    "#EC521B",
    "#7ECBF2",
    "#181818",
    "#D8B994",
    "#F6B8D0",
  ];

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
            filter: "contrast(1.08) brightness(0.7)",
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.88) 100%)",
        }}
      />

      {/* Top HUD */}
      <div
        style={{
          position: "absolute",
          top: 28,
          left: 32,
          right: 32,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: REMOTION_FONTS.display,
            fontSize: 44,
            color: REMOTION_COLORS.white,
            fontWeight: 900,
            letterSpacing: "-0.02em",
          }}
        >
          {label}
        </div>
        <div
          style={{
            padding: "8px 16px",
            borderRadius: 999,
            backgroundColor: REMOTION_COLORS.orange,
            color: REMOTION_COLORS.white,
            fontFamily: REMOTION_FONTS.sans,
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          {sublabel}
        </div>
      </div>

      {/* Mode-specific Motion Graphic */}
      {serviceKey === "backdrops" && (
        <div
          style={{
            position: "absolute",
            left: 32,
            right: 32,
            bottom: 32,
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 14,
          }}
        >
          {backdropSwatches.map((color, idx) => {
            const active = idx === activeBackdropIdx;
            return (
              <div
                key={color}
                style={{
                  height: 150,
                  borderRadius: 16,
                  backgroundColor: color,
                  border: active
                    ? `4px solid ${REMOTION_COLORS.orange}`
                    : "2px solid rgba(255,255,255,0.2)",
                  transform: active ? "translateY(-14px)" : "translateY(0)",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: 12,
                  color:
                    color === "#181818" || color === "#EC521B"
                      ? "#FFFFFF"
                      : "#111111",
                  fontFamily: "monospace",
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                SET {(idx * 5 + 1).toString().padStart(2, "0")}
              </div>
            );
          })}
        </div>
      )}

      {serviceKey === "production" && (
        <div
          style={{
            position: "absolute",
            left: 32,
            right: 32,
            bottom: 32,
            padding: 24,
            borderRadius: 18,
            backgroundColor: "rgba(14,14,14,0.88)",
            border: "1px solid rgba(255,255,255,0.16)",
          }}
        >
          <div style={{ position: "relative", display: "grid", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 2fr", gap: 10 }}>
              <div style={{ height: 40, borderRadius: 8, backgroundColor: REMOTION_COLORS.orange, padding: "8px 12px", fontFamily: "monospace", fontSize: 16, color: "#fff" }}>
                V1 · A-CAM 4K
              </div>
              <div style={{ height: 40, borderRadius: 8, backgroundColor: REMOTION_COLORS.sky, padding: "8px 12px", fontFamily: "monospace", fontSize: 16, color: "#111" }}>
                CUT · B-CAM
              </div>
              <div style={{ height: 40, borderRadius: 8, backgroundColor: REMOTION_COLORS.gold, padding: "8px 12px", fontFamily: "monospace", fontSize: 16, color: "#111" }}>
                LUT GRADE
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: 10 }}>
              <div style={{ height: 34, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.15)", padding: "6px 12px", fontFamily: "monospace", fontSize: 15, color: "#fff" }}>
                SFX WHOOSH
              </div>
              <div style={{ height: 34, borderRadius: 8, backgroundColor: "rgba(126,203,242,0.28)", padding: "6px 12px", fontFamily: "monospace", fontSize: 15, color: "#fff" }}>
                A1 · MASTER VOICE & MUSIC
              </div>
            </div>
            {/* Moving Playhead */}
            <div
              style={{
                position: "absolute",
                top: -8,
                bottom: -8,
                left: `${playheadPct}%`,
                width: 3,
                backgroundColor: REMOTION_COLORS.white,
                boxShadow: "0 0 12px rgba(255,255,255,0.8)",
              }}
            />
          </div>
        </div>
      )}

      {serviceKey === "podcast_reels" && (
        <div
          style={{
            position: "absolute",
            left: 32,
            right: 32,
            bottom: 32,
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 20,
            alignItems: "end",
          }}
        >
          <div
            style={{
              padding: 22,
              borderRadius: 18,
              backgroundColor: "rgba(14,14,14,0.86)",
              border: "1px solid rgba(126,203,242,0.4)",
            }}
          >
            <div style={{ fontFamily: "monospace", fontSize: 17, color: REMOTION_COLORS.sky, marginBottom: 12 }}>
              ● ON AIR · SHURE SM7B DUAL
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 84 }}>
              {Array.from({ length: 16 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: 16 + Math.abs(Math.sin(frame * 0.24 + i * 0.6)) * 66,
                    borderRadius: 99,
                    backgroundColor: i % 2 === 0 ? REMOTION_COLORS.orange : REMOTION_COLORS.sky,
                  }}
                />
              ))}
            </div>
          </div>
          <div
            style={{
              height: 156,
              borderRadius: 18,
              border: `2px solid ${REMOTION_COLORS.orange}`,
              backgroundColor: "rgba(236, 82, 27, 0.2)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: REMOTION_FONTS.display,
              color: REMOTION_COLORS.white,
            }}
          >
            <div style={{ fontSize: 56, lineHeight: 1 }}>9:16 + 16:9</div>
            <div style={{ fontFamily: REMOTION_FONTS.sans, fontSize: 18 }}>
              REELS + YOUTUBE CUTS
            </div>
          </div>
        </div>
      )}

      {serviceKey === "smm_brand" && (
        <div
          style={{
            position: "absolute",
            left: 32,
            right: 32,
            bottom: 32,
            padding: 24,
            borderRadius: 18,
            backgroundColor: "rgba(14,14,14,0.88)",
            border: "1px solid rgba(246,184,208,0.4)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 16,
          }}
        >
          {[
            { k: "REELS / OY", v: "20+" },
            { k: "REACH", v: "+340%" },
            { k: "SHAXSIY BREND", v: "100%" },
          ].map((stat, idx) => (
            <div
              key={stat.k}
              style={{
                padding: 18,
                borderRadius: 14,
                backgroundColor:
                  idx === Math.floor((frame / 60) % 3)
                    ? "rgba(236, 82, 27, 0.3)"
                    : "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.14)",
              }}
            >
              <div style={{ fontFamily: REMOTION_FONTS.display, fontSize: 52, color: REMOTION_COLORS.white }}>
                {stat.v}
              </div>
              <div style={{ fontFamily: REMOTION_FONTS.sans, fontSize: 16, color: REMOTION_COLORS.cream }}>
                {stat.k}
              </div>
            </div>
          ))}
        </div>
      )}
    </AbsoluteFill>
  );
};
