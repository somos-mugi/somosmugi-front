"use client";

import { useEffect } from "react";

export function MotionEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const hero = document.querySelector<HTMLElement>(".hero");
    if (!hero) return;

    const parallaxItems = Array.from(hero.querySelectorAll<HTMLElement>("[data-parallax]"));
    const mascot = hero.querySelector<HTMLElement>("[data-mugi]");
    let frame = 0;

    const reset = () => {
      parallaxItems.forEach((item) => {
        item.style.setProperty("--parallax-x", "0px");
        item.style.setProperty("--parallax-y", "0px");
      });
      mascot?.style.setProperty("--mugi-x", "0px");
      mascot?.style.setProperty("--mugi-y", "0px");
    };

    const onMove = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        parallaxItems.forEach((item) => {
          const depth = Number(item.dataset.parallax ?? 1);
          item.style.setProperty("--parallax-x", `${x * depth * 18}px`);
          item.style.setProperty("--parallax-y", `${y * depth * 12}px`);
        });
        mascot?.style.setProperty("--mugi-x", `${x * 13}px`);
        mascot?.style.setProperty("--mugi-y", `${y * 8}px`);
      });
    };

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", reset);

    return () => {
      cancelAnimationFrame(frame);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", reset);
    };
  }, []);

  return null;
}
