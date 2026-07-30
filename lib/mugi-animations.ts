export type FrameSequence = {
  kind: "frames";
  fps: number;
  frames: readonly string[];
};

export type SpriteSheet = {
  kind: "sheet";
  fps: number;
  src: string;
  frameCount: number;
  columns: number;
  rows: number;
};

export type MugiAnimation = FrameSequence | SpriteSheet;

// Add new animations here. A one-frame sequence is useful as a starting template.
// When an animation has multiple PNGs, add them in order to `frames`.
// For a sprite sheet, switch to `kind: "sheet"` and set its grid dimensions.
export const MUGI_ANIMATIONS = {
  idle: {
    kind: "frames",
    fps: 6,
    frames: ["/mugi/idle/mugi-idle.webp"],
  },
  laugh: {
    kind: "sheet",
    fps: 9,
    src: "/mugi/laugh/mugi-laugh-sheet.webp",
    frameCount: 4,
    columns: 2,
    rows: 2,
  },
} as const satisfies Record<string, MugiAnimation>;
