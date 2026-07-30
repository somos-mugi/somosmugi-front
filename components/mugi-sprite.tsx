"use client";

import { useEffect, useState } from "react";
import type { MugiAnimation } from "../lib/mugi-animations";

export function MugiSprite({ animation }: { animation: MugiAnimation }) {
  const [frame, setFrame] = useState(0);
  const frameCount = animation.kind === "frames" ? animation.frames.length : animation.frameCount;

  useEffect(() => {
    setFrame(0);
    if (frameCount < 2) return;
    const timer = window.setInterval(() => setFrame((current) => (current + 1) % frameCount), 1000 / animation.fps);
    return () => window.clearInterval(timer);
  }, [animation, frameCount]);

  const isSheet = animation.kind === "sheet";
  const column = isSheet ? frame % animation.columns : 0;
  const row = isSheet ? Math.floor(frame / animation.columns) : 0;
  const x = isSheet && animation.columns > 1 ? (column / (animation.columns - 1)) * 100 : 50;
  const y = isSheet && animation.rows > 1 ? (row / (animation.rows - 1)) * 100 : 50;

  return (
    <span
      className="mugi-sprite"
      aria-hidden="true"
      style={{
        backgroundImage: `url(${isSheet ? animation.src : animation.frames[frame]})`,
        backgroundSize: isSheet ? `${animation.columns * 100}% ${animation.rows * 100}%` : "contain",
        backgroundPosition: `${x}% ${y}%`,
      }}
    />
  );
}
