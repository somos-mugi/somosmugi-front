"use client";

import { useEffect, useRef, useState } from "react";

export function MugiMascot() {
  const [laughing, setLaughing] = useState(false);
  const ref = useRef<SVGSVGElement>(null);
  const dragging = useRef<{ pointerId: number; startX: number; startY: number } | null>(null);
  const hasMoved = useRef(false);
  const returnTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onDown = (e: PointerEvent) => {
      e.preventDefault();
      clearTimeout(returnTimer.current);
      hasMoved.current = false;
      dragging.current = { pointerId: e.pointerId, startX: e.clientX, startY: e.clientY };
      el.setPointerCapture(e.pointerId);
      el.classList.add("is-dragging");
      setLaughing(true);
    };

    const onMove = (e: PointerEvent) => {
      const d = dragging.current;
      if (!d || d.pointerId !== e.pointerId) return;
      const dx = e.clientX - d.startX;
      const dy = e.clientY - d.startY;
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) hasMoved.current = true;
      if (hasMoved.current) {
        el.style.setProperty("--drag-x", `${dx}px`);
        el.style.setProperty("--drag-y", `${dy}px`);
      }
    };

    const onUp = () => {
      if (!dragging.current) return;
      const wasClick = !hasMoved.current;
      dragging.current = null;
      hasMoved.current = false;
      el.classList.remove("is-dragging");
      el.style.setProperty("--drag-x", "0px");
      el.style.setProperty("--drag-y", "0px");
      returnTimer.current = setTimeout(() => setLaughing(false), wasClick ? 700 : 1100);
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      clearTimeout(returnTimer.current);
    };
  }, []);

  return (
    <svg
      ref={ref}
      className="mugi-mascot"
      data-mugi
      viewBox="0 0 440 430"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="button"
      tabIndex={0}
      aria-label="Mugi, la mascota de SomosMugi con sombrero de paja. Podés arrastrarla."
      style={{ touchAction: "none" }}
    >
      {laughing ? <MugiLaugh /> : <MugiNormal />}
    </svg>
  );
}

function MugiNormal() {
  return (
    <>
      {/* nubes decorativas — sin pointer events */}
      <g fill="#F4F0FF" pointerEvents="none">
        <circle cx="66" cy="288" r="42"/>
        <circle cx="105" cy="273" r="56"/>
        <circle cx="154" cy="291" r="48"/>
        <circle cx="334" cy="154" r="34"/>
        <circle cx="366" cy="168" r="44"/>
        <circle cx="397" cy="154" r="29"/>
      </g>
      <g stroke="#D4C6FF" strokeWidth="2" opacity=".8" pointerEvents="none">
        <path d="M49 277c20-17 43-19 61-4M323 158c19-15 43-12 59 8"/>
      </g>

      {/* cuerpo */}
      <ellipse cx="222" cy="289" rx="130" ry="108" fill="#8B62FF"/>
      <ellipse cx="222" cy="299" rx="113" ry="91" fill="#9C78FF"/>
      {/* ojos */}
      <ellipse cx="170" cy="276" rx="21" ry="26" fill="#24163D"/>
      <ellipse cx="274" cy="276" rx="21" ry="26" fill="#24163D"/>
      <circle cx="177" cy="267" r="7" fill="white"/>
      <circle cx="281" cy="267" r="7" fill="white"/>
      {/* boca */}
      <path d="M207 308c10 13 25 13 35 0" stroke="#24163D" strokeWidth="7" strokeLinecap="round"/>
      {/* mejillas */}
      <ellipse cx="140" cy="311" rx="21" ry="11" fill="#E6D9FF"/>
      <ellipse cx="304" cy="311" rx="21" ry="11" fill="#E6D9FF"/>
      {/* patas */}
      <ellipse cx="151" cy="384" rx="40" ry="22" fill="#7150CC"/>
      <ellipse cx="291" cy="384" rx="40" ry="22" fill="#7150CC"/>
      {/* sombrero */}
      <g transform="translate(0 28)">
        <path d="M87 182c2-42 61-73 135-73s133 31 135 73c-18 22-47 35-83 39H170c-36-4-65-17-83-39Z" fill="#EAD99F" stroke="#D0B86A" strokeWidth="3"/>
        <path d="M100 176c31 20 76 30 122 30s91-10 122-30" stroke="#C4A85A" strokeWidth="3" opacity=".65"/>
        <path d="M109 159c28 19 68 28 113 28s86-9 113-28M127 143c26 15 59 22 95 22s69-7 95-22M154 126c20 9 43 13 68 13s48-4 68-13" stroke="#C4A85A" strokeWidth="3" opacity=".65"/>
        <path d="M126 163c1-57 42-101 96-101s95 44 96 101c-27 14-61 21-96 21s-69-7-96-21Z" fill="#F3E3A9" stroke="#D0B86A" strokeWidth="3"/>
        <path d="M146 151c18 9 47 14 76 14s58-5 76-14M151 132c22 10 45 14 71 14s49-4 71-14M163 113c18 7 38 10 59 10s41-3 59-10M180 94c14 4 27 6 42 6s28-2 42-6" stroke="#C4A85A" strokeWidth="3" opacity=".65"/>
        <path d="M128 151c27 10 58 15 94 15s67-5 94-15v22c-27 10-58 15-94 15s-67-5-94-15v-22Z" fill="#F03A4F" stroke="#D82D43" strokeWidth="2"/>
        <path d="M140 157c24 7 51 10 82 10s58-3 82-10" stroke="#FF9BA5" strokeWidth="3" opacity=".85"/>
      </g>
      {/* nubecitas derecha — sin pointer events */}
      <g pointerEvents="none">
        <circle cx="373" cy="270" r="12" fill="#F4F0FF"/>
        <circle cx="401" cy="251" r="19" fill="#F4F0FF"/>
        <circle cx="414" cy="276" r="13" fill="#F4F0FF"/>
      </g>
    </>
  );
}

function MugiLaugh() {
  return (
    <>
      {/* nubes decorativas — sin pointer events */}
      <g fill="#F4F0FF" pointerEvents="none">
        <circle cx="75" cy="285" r="43"/>
        <circle cx="116" cy="270" r="55"/>
        <circle cx="159" cy="290" r="46"/>
        <circle cx="352" cy="168" r="42"/>
        <circle cx="387" cy="155" r="27"/>
      </g>
      <path d="M93 271c22-17 47-15 65 4M335 168c19-14 40-12 55 5" stroke="#D4C6FF" strokeWidth="3" strokeLinecap="round" pointerEvents="none"/>

      {/* cuerpo */}
      <ellipse cx="220" cy="285" rx="128" ry="105" fill="#8B62FF"/>
      <ellipse cx="220" cy="295" rx="111" ry="88" fill="#9C78FF"/>
      {/* patas */}
      <ellipse cx="107" cy="354" rx="23" ry="46" transform="rotate(-24 107 354)" fill="#7150CC"/>
      <ellipse cx="333" cy="354" rx="23" ry="46" transform="rotate(24 333 354)" fill="#7150CC"/>
      {/* ojos (X de risa) */}
      <path d="M148 271l20 15-20 15M292 271l-20 15 20 15" stroke="#24163D" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
      {/* boca abierta */}
      <path d="M190 310c18 9 42 9 60 0 0 34-13 48-30 48s-30-14-30-48Z" fill="#F16F9D" stroke="#24163D" strokeWidth="5" strokeLinejoin="round"/>
      {/* mejillas */}
      <ellipse cx="141" cy="314" rx="22" ry="11" fill="#E6D9FF"/>
      <ellipse cx="299" cy="314" rx="22" ry="11" fill="#E6D9FF"/>
      {/* sombrero */}
      <g transform="translate(0 28)">
        <path d="M85 181c2-42 61-73 135-73s133 31 135 73c-18 22-47 35-83 39H168c-36-4-65-17-83-39Z" fill="#EAD99F" stroke="#D0B86A" strokeWidth="3"/>
        <path d="M99 175c31 20 76 30 121 30s91-10 122-30M108 158c29 19 68 28 112 28s85-9 113-28" stroke="#C4A85A" strokeWidth="3" opacity=".65"/>
        <path d="M124 162c1-57 42-101 96-101s95 44 96 101c-27 14-61 21-96 21s-69-7-96-21Z" fill="#F3E3A9" stroke="#D0B86A" strokeWidth="3"/>
        <path d="M144 150c18 9 47 14 76 14s58-5 76-14M149 131c22 10 45 14 71 14s49-4 71-14M161 112c18 7 38 10 59 10s41-3 59-10" stroke="#C4A85A" strokeWidth="3" opacity=".65"/>
        <path d="M126 150c27 10 58 15 94 15s67-5 94-15v22c-27 10-58 15-94 15s-67-5-94-15v-22Z" fill="#F03A4F" stroke="#D82D43" strokeWidth="2"/>
        <path d="M138 156c24 7 51 10 82 10s58-3 82-10" stroke="#FF9BA5" strokeWidth="3" opacity=".85"/>
      </g>
      {/* nubecitas derecha — sin pointer events */}
      <g pointerEvents="none">
        <circle cx="385" cy="282" r="12" fill="#F4F0FF"/>
        <circle cx="409" cy="260" r="18" fill="#F4F0FF"/>
      </g>
    </>
  );
}
