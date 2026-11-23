export type LutId = "editorial" | "noir" | "ice";

export interface StudioLut {
  id: LutId;
  label: string;
  swatch: string;
  accentHex: string;
  secondaryHex: string;
  accentInkHex: string;
}

export const STUDIO_LUTS: StudioLut[] = [
  {
    id: "editorial",
    label: "Editorial",
    swatch: "#ec521b",
    accentHex: "#ec521b",
    secondaryHex: "#84ccf0",
    accentInkHex: "#ffffff",
  },
  {
    id: "noir",
    label: "Noir Gold",
    swatch: "#d49b35",
    accentHex: "#d49b35",
    secondaryHex: "#f4efe6",
    accentInkHex: "#0a0a0a",
  },
  {
    id: "ice",
    label: "Ice Studio",
    swatch: "#2563eb",
    accentHex: "#2563eb",
    secondaryHex: "#cde6f8",
    accentInkHex: "#ffffff",
  },
];

export function getStudioLut(id: LutId): StudioLut {
  return STUDIO_LUTS.find((item) => item.id === id) ?? STUDIO_LUTS[0];
}
