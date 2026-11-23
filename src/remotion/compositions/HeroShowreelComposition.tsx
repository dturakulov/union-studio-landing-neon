import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { REMOTION_COLORS, REMOTION_FONTS, formatTimecode } from "../theme";

export interface HeroScene {
  label: string;
  tag: string;
  imageUrl: string;
}

export interface HeroShowreelProps extends Record<string, unknown> {
  scenes: HeroScene[];
  studioBadge: string;
  showEmbeddedHud?: boolean;
  accentColor?: string;
  framingMode?: "backdrop" | "cinema";
}

export const HERO_DEFAULT_SCENES: HeroScene[] = [
  {
    label: "SET 01/30+ · CYCLORAMA",
    tag: "SOUNDSTAGE",
    imageUrl:
      "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=1600&fit=crop&q=80&auto=format",
  },
  {
    label: "SET 08/30+ · PODCAST LOUNGE",
    tag: "PODCAST 4K",
    imageUrl:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1600&fit=crop&q=80&auto=format",
  },
  {
    label: "SET 17/30+ · NEON REELS",
    tag: "REELS STAGE",
    imageUrl:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1600&fit=crop&q=80&auto=format",
  },
  {
    label: "SET 24/30+ · CINEMA RIG",
    tag: "BRAND FILM",
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1600&fit=crop&q=80&auto=format",
  },
];

export const HeroShowreelComposition: React.FC<HeroShowreelProps> = ({
  scenes,
  studioBadge,
  showEmbeddedHud = true,
  accentColor = REMOTION_COLORS.orange,
  framingMode = "backdrop",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const activeScenes = scenes.length > 0 ? scenes : HERO_DEFAULT_SCENES;
  const sceneSpan = durationInFrames / activeScenes.length;
  const currentIdx = Math.min(
    activeScenes.length - 1,
    Math.floor(frame / sceneSpan),
  );
  const localFrame = frame - currentIdx * sceneSpan;

  const panX = interpolate(frame, [0, durationInFrames], [-14, 14]);
  const jibSwing = Math.sin((frame / durationInFrames) * Math.PI * 2) * 1.4;
  const recPulse = 0.55 + 0.45 * Math.sin(frame * 0.14);

  const wipeSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 28, stiffness: 115 },
  });
  const flareX = interpolate(localFrame, [0, 26], [-25, 125], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flareOpacity = interpolate(localFrame, [0, 10, 26], [0, 0.42, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isCinema = framingMode === "cinema";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: REMOTION_COLORS.obsidian,
        overflow: "hidden",
      }}
    >
      {activeScenes.map((scene, idx) => {
        const start = idx * sceneSpan;
        const isCurrent = idx === currentIdx;
        const isPrev = idx === currentIdx - 1;

        if (!isCurrent && !isPrev) {
          return null;
        }

        const scale = interpolate(
          frame,
          [start, start + sceneSpan],
          [1.02, 1.09],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        const revealPct =
          isCurrent && idx > 0 ? Math.max(0, (1 - wipeSpring) * 100) : 0;

        return (
          <AbsoluteFill
            key={scene.label + idx}
            style={{
              zIndex: isCurrent ? 2 : 1,
              clipPath:
                revealPct > 0 ? `inset(0% ${revealPct}% 0% 0%)` : undefined,
              transform: `scale(${scale}) translateX(${panX * 0.35}px)`,
            }}
          >
            <Img
              src={scene.imageUrl}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: isCinema
                  ? "contrast(1.08) saturate(1.14) brightness(0.92)"
                  : "contrast(1.08) saturate(1.12) brightness(0.84)",
              }}
            />
          </AbsoluteFill>
        );
      })}

      {/* Passing Anamorphic Light Flare on Scene Cut */}
      {currentIdx > 0 && flareOpacity > 0.01 && (
        <AbsoluteFill
          style={{
            zIndex: 3,
            pointerEvents: "none",
            opacity: flareOpacity,
            background: `linear-gradient(90deg, transparent ${flareX - 16}%, ${accentColor}55 ${flareX}%, transparent ${flareX + 16}%)`,
          }}
        />
      )}

      {/* Crisp Studio Vignette (Zero Muddy Brown Wash) */}
      <AbsoluteFill
        style={{
          zIndex: 4,
          background: isCinema
            ? "linear-gradient(180deg, rgba(7,7,9,0.52) 0%, rgba(7,7,9,0.06) 35%, rgba(7,7,9,0.12) 65%, rgba(7,7,9,0.82) 100%)"
            : "linear-gradient(90deg, rgba(7,7,9,0.88) 0%, rgba(7,7,9,0.48) 46%, rgba(7,7,9,0.72) 100%), linear-gradient(180deg, rgba(7,7,9,0.68) 0%, rgba(7,7,9,0.12) 40%, rgba(7,7,9,0.92) 100%)",
        }}
      />

      {/* Backdrop Soundstage Jib Silhouette (Desktop Backdrop Only) */}
      {!isCinema && (
        <AbsoluteFill style={{ zIndex: 5, pointerEvents: "none" }}>
          <svg
            viewBox="0 0 1920 1080"
            style={{ width: "100%", height: "100%" }}
            preserveAspectRatio="xMidYMid slice"
          >
            <rect x="0" y="0" width="1920" height="44" fill="#070709" />
            <line
              x1="0"
              y1="44"
              x2="1920"
              y2="44"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="2"
            />
            <path
              d="M150 920 L215 620 L248 620 L315 920 M230 620 L230 495 M185 480 L285 450 L292 520 L185 520 Z"
              fill="#070709"
              opacity="0.72"
            />
            <g transform={`translate(0, ${jibSwing * 4})`} opacity="0.78">
              <path
                d="M1920 690 L1320 430 L1312 458 L1920 742 Z"
                fill="#070709"
              />
              <rect
                x="1285"
                y="420"
                width="68"
                height="42"
                rx="6"
                fill="#070709"
              />
              <rect
                x="1262"
                y="478"
                width="106"
                height="84"
                rx="10"
                fill="#09090b"
              />
              <circle
                cx="1315"
                cy="520"
                r="24"
                fill="#17171c"
                stroke={accentColor}
                strokeWidth="3"
              />
              <path
                d="M1670 620 L1670 1080 L1715 1080 L1715 640 Z"
                fill="#070709"
              />
            </g>
          </svg>
        </AbsoluteFill>
      )}

      {/* Mobile Cinema Viewfinder Brackets & Live Scene Tag */}
      {isCinema && (
        <AbsoluteFill style={{ zIndex: 5, pointerEvents: "none" }}>
          <svg
            viewBox="0 0 1920 1080"
            style={{ width: "100%", height: "100%" }}
            preserveAspectRatio="none"
          >
            <path
              d="M 56 118 L 56 56 L 128 56 M 1792 56 L 1864 56 L 1864 118 M 56 962 L 56 1024 L 128 1024 M 1792 1024 L 1864 1024 L 1864 962"
              fill="none"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="4"
            />
          </svg>

          <div
            style={{
              position: "absolute",
              top: 52,
              left: 72,
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "10px 22px",
              borderRadius: 999,
              backgroundColor: "rgba(7,7,9,0.72)",
              border: `2px solid ${accentColor}`,
              color: REMOTION_COLORS.white,
              fontFamily: REMOTION_FONTS.sans,
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: "0.1em",
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: accentColor,
                opacity: recPulse,
              }}
            />
            {activeScenes[currentIdx].label}
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 52,
              left: 72,
              right: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "monospace",
              fontSize: 26,
              color: REMOTION_COLORS.white,
              letterSpacing: "0.16em",
            }}
          >
            <span style={{ fontWeight: 700 }}>
              0{currentIdx + 1} · {activeScenes[currentIdx].tag}
            </span>
            <span style={{ opacity: 0.85 }}>{formatTimecode(frame, fps)}</span>
          </div>
        </AbsoluteFill>
      )}

      {/* Embedded Cinema HUD Top Bar (Used in Remotion Studio / CLI / Lightbox) */}
      {showEmbeddedHud && (
        <div
          style={{
            position: "absolute",
            top: 96,
            left: 64,
            right: 64,
            zIndex: 6,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: REMOTION_FONTS.sans,
            color: "rgba(255,255,255,0.88)",
            fontSize: 18,
            letterSpacing: "0.14em",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 999,
                backgroundColor: "rgba(10,10,10,0.68)",
                border: "1px solid rgba(255,255,255,0.18)",
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  backgroundColor: accentColor,
                  opacity: recPulse,
                }}
              />
              REC · {studioBadge}
            </span>
            <span
              style={{
                padding: "6px 14px",
                borderRadius: 999,
                backgroundColor: "rgba(7, 7, 9, 0.72)",
                border: `1px solid ${accentColor}`,
                color: REMOTION_COLORS.white,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {activeScenes[currentIdx].label}
            </span>
          </div>

          <div
            style={{
              fontFamily: "monospace",
              fontSize: 18,
              letterSpacing: "0.18em",
              padding: "6px 14px",
              borderRadius: 999,
              backgroundColor: "rgba(10,10,10,0.62)",
              border: "1px solid rgba(255,255,255,0.14)",
            }}
          >
            {formatTimecode(frame, fps)}
          </div>
        </div>
      )}

      {/* Embedded Scene Progress Bars (Used in Remotion Studio / CLI / Lightbox) */}
      {showEmbeddedHud && (
        <div
          style={{
            position: "absolute",
            bottom: 34,
            left: 64,
            right: 64,
            zIndex: 6,
            display: "grid",
            gridTemplateColumns: `repeat(${activeScenes.length}, 1fr)`,
            gap: 12,
          }}
        >
          {activeScenes.map((scene, idx) => {
            const fillRatio =
              idx < currentIdx
                ? 1
                : idx > currentIdx
                  ? 0
                  : Math.min(1, localFrame / sceneSpan);
            return (
              <div
                key={scene.tag + idx}
                style={{ display: "flex", flexDirection: "column", gap: 6 }}
              >
                <span
                  style={{
                    fontFamily: REMOTION_FONTS.sans,
                    fontSize: 13,
                    letterSpacing: "0.14em",
                    color:
                      idx === currentIdx
                        ? REMOTION_COLORS.white
                        : "rgba(255,255,255,0.48)",
                    fontWeight: idx === currentIdx ? 700 : 500,
                  }}
                >
                  {scene.tag}
                </span>
                <div
                  style={{
                    height: 3,
                    width: "100%",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    borderRadius: 999,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${fillRatio * 100}%`,
                      backgroundColor: accentColor,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AbsoluteFill>
  );
};
