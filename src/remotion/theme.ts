import { interpolate } from "remotion";

export const REMOTION_COLORS = {
  obsidian: "#0a0a0a",
  surface: "#141414",
  cream: "#fdf6e9",
  sky: "#7ecbf2",
  orange: "#ec521b",
  orangeSoft: "#f05a24",
  gold: "#f2b749",
  pink: "#f6b8d0",
  white: "#ffffff",
  muted: "#b5b0a8",
};

export const REMOTION_FONTS = {
  display: "var(--font-sofia-condensed), 'Arial Narrow', 'Impact', sans-serif",
  serif: "var(--font-cormorant), Georgia, serif",
  sans: "var(--font-manrope), system-ui, -apple-system, sans-serif",
};

export const clamp = (
  value: number,
  inputRange: [number, number],
  outputRange: [number, number],
) =>
  interpolate(value, inputRange, outputRange, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const formatTimecode = (frame: number, fps: number) => {
  const totalSeconds = Math.floor(frame / fps);
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  const subFrame = Math.floor(frame % fps)
    .toString()
    .padStart(2, "0");
  return `00:${minutes}:${seconds}:${subFrame}`;
};
