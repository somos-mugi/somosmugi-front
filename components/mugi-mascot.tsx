"use client";

import { useRef, useState } from "react";
import { MUGI_ANIMATIONS } from "../lib/mugi-animations";
import { MugiSprite } from "./mugi-sprite";

export function MugiMascot() {
  const [laughing, setLaughing] = useState(false);
  const dragging = useRef<{ pointerId: number; startX: number; startY: number } | null>(null);
  const hasMoved = useRef(false);
  const returnTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    clearTimeout(returnTimer.current);
    hasMoved.current = false;
    dragging.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add("is-dragging");
    setLaughing(true);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const activeDrag = dragging.current;
    if (!activeDrag || activeDrag.pointerId !== event.pointerId) return;

    const x = event.clientX - activeDrag.startX;
    const y = event.clientY - activeDrag.startY;
    if (Math.abs(x) > 5 || Math.abs(y) > 5) hasMoved.current = true;
    event.currentTarget.style.setProperty("--drag-x", `${x}px`);
    event.currentTarget.style.setProperty("--drag-y", `${y}px`);
  };

  const release = (element: HTMLDivElement) => {
    if (!dragging.current) return;
    const wasClick = !hasMoved.current;
    dragging.current = null;
    hasMoved.current = false;
    element.classList.remove("is-dragging");
    element.style.setProperty("--drag-x", "0px");
    element.style.setProperty("--drag-y", "0px");
    returnTimer.current = setTimeout(() => setLaughing(false), wasClick ? 700 : 1100);
  };

  return (
    <div
      className="mugi-mascot"
      data-mugi
      role="button"
      tabIndex={0}
      aria-label="Mugi, la mascota de SomosMugi con sombrero de paja. Podés arrastrarla."
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={(event) => release(event.currentTarget)}
      onPointerCancel={(event) => release(event.currentTarget)}
    >
      <MugiSprite animation={laughing ? MUGI_ANIMATIONS.laugh : MUGI_ANIMATIONS.idle} />
    </div>
  );
}
