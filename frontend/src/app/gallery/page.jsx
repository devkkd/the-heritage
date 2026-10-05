"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Cinzel, Mona_Sans } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mona = Mona_Sans({
  subsets: ["latin"],
  display: "swap",
});

/*
============================================================
THE HERITAGE RESORT — GALLERY PAGE (IMAGE ONLY)

Primary #60511F | BG 1 #FFFAF0 | BG 2 #FDF2DE
Fonts: Cinzel (title) + Mona Sans

Sirf images. Koi description / text nahi.
Click => fullscreen lightbox (arrows, swipe, ESC, outside click)

Nayi image add karni ho to bas IMAGES array mein path daal do.
============================================================
*/

const IMAGES = [
  "/gallery/swimming.png",
  "/gallery/1.png",
  "/gallery/2.png",
  "/gallery/3.png",
  "/gallery/4.png",
  "/gallery/5.png",
  "/gallery/6.png",
  "/gallery/7.png",
  "/newhome/SUITES/1.png",
  "/home/history1.jpg",
  "/home/food.jpg",
  "/home/food2.jpg",
  "/home/e1.jpg",
  "/home/e2.jpg",
];

/*
============================================================
TILE
============================================================
*/

function Tile({ src, index, onOpen }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      className="gl-tile"
      onClick={() => onOpen(index)}
      aria-label={`Open photo ${index + 1}`}
    >
      <Image
        src={src}
        alt={`The Heritage Resort photo ${index + 1}`}
        fill
        quality={85}
        sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 25vw"
      />

      <span className="gl-tile-shade" />

      <span className="gl-tile-icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
        </svg>
      </span>
    </button>
  );
}

/*
============================================================
LIGHTBOX
============================================================
*/

function Lightbox({ start, onClose }) {
  const [active, setActive] = useState(start);
  const touchX = useRef(null);
  const total = IMAGES.length;

  const next = useCallback(
    () => setActive((i) => (i + 1) % total),
    [total]
  );

  const prev = useCallback(
    () => setActive((i) => (i - 1 + total) % total),
    [total]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, next, prev]);

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(diff) > 50) {
      diff < 0 ? next() : prev();
    }
  };

  return createPortal(
    <div className={`gl gl-portal ${mona.className}`}>
      <div
        className="gl-lb"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Gallery photo"
      >
        <button
          type="button"
          className="gl-lb-close"
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>

        <div
          className="gl-lb-stage"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <Image
            key={IMAGES[active]}
            src={IMAGES[active]}
            alt={`The Heritage Resort photo ${active + 1}`}
            fill
            quality={90}
            sizes="100vw"
            className="gl-lb-img"
            priority
          />
        </div>

        <button
          type="button"
          className="gl-lb-arrow gl-lb-left"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          aria-label="Previous photo"
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>

        <button
          type="button"
          className="gl-lb-arrow gl-lb-right"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          aria-label="Next photo"
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <span className="gl-lb-count">
          {active + 1} / {total}
        </span>
      </div>
    </div>,
    document.body
  );
}

/*
============================================================
MAIN PAGE
============================================================
*/

export default function HeritageGalleryPage() {
  const [selected, setSelected] = useState(null);

  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <main className={`gl ${mona.className}`}>
      {/* TITLE */}
      <section className="gl-hero">
        <div className="gl-container">
          <div className="gl-label">
            <span />
            <p>THE HERITAGE RESORT</p>
            <span />
          </div>

          <h1 className={cinzel.className}>Gallery</h1>
        </div>
      </section>

      {/* GRID */}
      <section className="gl-section" aria-label="Heritage gallery">
        <div className="gl-container gl-grid">
          {IMAGES.map((src, index) => (
            <Tile
              key={src}
              src={src}
              index={index}
              onOpen={setSelected}
            />
          ))}
        </div>
      </section>

      {/* LIGHTBOX */}
      {selected !== null && (
        <Lightbox start={selected} onClose={handleClose} />
      )}

      <style>{`

        .gl,
        .gl *,
        .gl *::before,
        .gl *::after {
          box-sizing: border-box;
        }

        .gl {
          width: 100%;
          overflow: hidden;
          background: #FFFAF0;
          color: #555555;
          font-size: 16px;
          line-height: 1.6;
        }

        .gl h1,
        .gl p {
          margin: 0;
        }

        .gl-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 32px;
        }

        /* TITLE */

        .gl-hero {
          padding: 170px 0 40px;
          text-align: center;
          background: #FFFAF0;
        }

        .gl-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-bottom: 14px;
        }

        .gl-label span {
          width: 44px;
          height: 1px;
          background: #60511F;
        }

        .gl-label p {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 3px;
          color: #60511F;
        }

        .gl-hero h1 {
          font-size: 34px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #60511F;
        }

        /* GRID */

        .gl-section {
          padding: 24px 0 72px;
          background: #FFFAF0;
        }

        .gl-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          grid-auto-rows: 270px;
          grid-auto-flow: dense;
          gap: 12px;
        }

        /* TILE */

        .gl-tile {
          position: relative;
          display: block;
          width: 100%;
          height: 100%;
          min-width: 0;
          padding: 0;
          overflow: hidden;
          border: 0;
          border-radius: 4px;
          background: #EEE6D2;
          cursor: pointer;
          opacity: 0;
          transform: translateY(26px);
          transition:
            opacity 0.7s ease,
            transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .gl-tile.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* bade / wide tiles — pattern har 7 images par repeat hota hai */
        .gl-tile:nth-child(7n + 1) {
          grid-column: span 2;
          grid-row: span 2;
        }

        .gl-tile:nth-child(7n + 5) {
          grid-column: span 2;
        }

        .gl-tile img {
          object-fit: cover;
          object-position: center;
          transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .gl-tile:hover img {
          transform: scale(1.06);
        }

        .gl-tile-shade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: rgba(38, 30, 10, 0);
          transition: background 0.4s ease;
        }

        .gl-tile:hover .gl-tile-shade {
          background: rgba(38, 30, 10, 0.28);
        }

        .gl-tile-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 46px;
          height: 46px;
          margin: -23px 0 0 -23px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #60511F;
          background: rgba(255, 250, 240, 0.95);
          border-radius: 50%;
          opacity: 0;
          transform: scale(0.8);
          transition:
            opacity 0.35s ease,
            transform 0.35s ease;
          pointer-events: none;
        }

        .gl-tile:hover .gl-tile-icon {
          opacity: 1;
          transform: scale(1);
        }

        .gl-tile:focus-visible {
          outline: 2px solid #60511F;
          outline-offset: 3px;
        }

        /* LIGHTBOX */

        .gl.gl-portal {
          width: auto;
          height: 0;
          overflow: visible;
          background: transparent;
        }

        .gl-lb {
          position: fixed;
          inset: 0;
          z-index: 2147483000;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          height: 100dvh;
          background: rgba(20, 15, 5, 0.9);
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
          animation: glFade 0.3s ease both;
        }

        .gl-lb-stage {
          position: relative;
          width: min(92vw, 1300px);
          height: min(84vh, 860px);
          height: min(84dvh, 860px);
        }

        .gl-lb-stage .gl-lb-img {
          object-fit: contain;
          object-position: center;
          animation: glFade 0.4s ease both;
        }

        .gl-lb-close,
        .gl-lb-arrow {
          position: absolute;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #60511F;
          background: rgba(255, 250, 240, 0.95);
          border: 0;
          border-radius: 50%;
          cursor: pointer;
          transition:
            background 0.3s ease,
            color 0.3s ease,
            transform 0.3s ease;
        }

        .gl-lb-close:hover,
        .gl-lb-arrow:hover {
          background: #60511F;
          color: #FFFFFF;
        }

        .gl-lb-close {
          top: 18px;
          right: 18px;
          width: 44px;
          height: 44px;
        }

        .gl-lb-close:hover {
          transform: rotate(90deg);
        }

        .gl-lb-arrow {
          top: 50%;
          width: 48px;
          height: 48px;
          margin-top: -24px;
        }

        .gl-lb-left {
          left: 18px;
        }

        .gl-lb-right {
          right: 18px;
        }

        .gl-lb-count {
          position: absolute;
          left: 50%;
          bottom: 18px;
          z-index: 5;
          transform: translateX(-50%);
          padding: 6px 14px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          color: #FFFAF0;
          background: rgba(38, 30, 10, 0.6);
          border-radius: 20px;
        }

        @keyframes glFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* TABLET */

        @media (max-width: 1100px) {
          .gl-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            grid-auto-rows: 240px;
          }
        }

        /* MOBILE */

        @media (max-width: 700px) {
          .gl-container {
            padding-left: 10px;
            padding-right: 10px;
          }

          .gl-hero {
            padding: 112px 0 24px;
          }

          .gl-label span {
            width: 28px;
          }

          .gl-label p {
            font-size: 11px;
            letter-spacing: 2px;
          }

          .gl-hero h1 {
            font-size: 26px;
          }

          .gl-section {
            padding: 12px 0 44px;
          }

          .gl-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-auto-rows: 170px;
            gap: 8px;
          }

          /* mobile par bada tile poori width + 2 row, wide tile normal */
          .gl-tile:nth-child(7n + 1) {
            grid-column: span 2;
            grid-row: span 2;
          }

          .gl-tile:nth-child(7n + 5) {
            grid-column: span 1;
          }

          .gl-tile-icon {
            display: none;
          }

          .gl-lb-stage {
            width: 100vw;
            height: 76vh;
            height: 76dvh;
          }

          .gl-lb-arrow {
            width: 40px;
            height: 40px;
            margin-top: -20px;
          }

          .gl-lb-left {
            left: 8px;
          }

          .gl-lb-right {
            right: 8px;
          }

          .gl-lb-close {
            top: 12px;
            right: 12px;
            width: 40px;
            height: 40px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gl *,
          .gl *::before,
          .gl *::after {
            transition: none !important;
            animation: none !important;
          }

          .gl-tile {
            opacity: 1;
            transform: none;
          }
        }

      `}</style>
    </main>
  );
}