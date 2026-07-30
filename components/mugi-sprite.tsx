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

  if (animation.kind === "frames") {
    return <img className="mugi-sprite" src={animation.frames[frame]} alt="" draggable={false} />;
  }

  const column = frame % animation.columns;
  const row = Math.floor(frame / animation.columns);
  const x = animation.columns === 1 ? 0 : (column / (animation.columns - 1)) * 100;
  const y = animation.rows === 1 ? 0 : (row / (animation.rows - 1)) * 100;

  return (
    <span
      className="mugi-sprite mugi-sprite-sheet"
      aria-hidden="true"
      style={{
        backgroundImage: `url(${animation.src})`,
        backgroundSize: `${animation.columns * 100}% ${animation.rows * 100}%`,
        backgroundPosition: `${x}% ${y}%`,
      }}
    />
  );
}
