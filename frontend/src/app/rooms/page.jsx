'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Cinzel, Mona_Sans } from 'next/font/google';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const mona = Mona_Sans({
  subsets: ['latin'],
  display: 'swap',
});

/*
============================================================
THE HERITAGE RESORT — LUXURY GRAND HERITAGE ROOMS

Primary #60511F | BG 1 #FFFAF0 | BG 2 #FDF2DE
Fonts: Cinzel (headings) + Mona Sans (body)

Ek hi section. Saari images slider mein.
Auto-slide + manual (arrows, dots, thumbnails, swipe, keyboard)

Nayi image add karni ho to IMAGES array mein path daal do.
============================================================
*/

const AUTOPLAY_MS = 4000;

const IMAGES = [
  '/newhome/SUITES/1.png',
  '/newhome/SUITES/2.png',
  '/newhome/SUITES/3.png',
  '/newhome/SUITES/4.png',
];

const ROOM = {
  title: 'Luxury Grand Heritage Rooms',
  size: '650 ft²',
  guests: '2 Guests',
  bed: '1 King Bed',
  description:
    'Nestled in our contemporary wing, our Luxury Grand Heritage rooms are furnished with opulent interiors and innovative local materials. Traditional and modern aesthetic sensibilities intertwine to form the cornerstone of the décor.',
};

const iconProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const SizeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 3H3v5M3 3l7 7M16 21h5v-5M21 21l-7-7M21 8V3h-5M21 3l-7 7M3 16v5h5M3 21l7-7" {...iconProps} />
  </svg>
);

const GuestIcon = () => (
  <svg viewBox="0 0 28 24" aria-hidden="true">
    <circle cx="10" cy="7" r="3.2" {...iconProps} />
    <circle cx="19" cy="8" r="2.6" {...iconProps} />
    <path d="M3.5 19c.5-3.7 2.7-5.6 6.5-5.6s6 1.9 6.5 5.6" {...iconProps} />
    <path d="M16.5 14.7c.8-.6 1.7-.9 2.7-.9 2.5 0 4.2 1.6 4.5 5.2" {...iconProps} />
  </svg>
);

const BedIcon = () => (
  <svg viewBox="0 0 30 24" aria-hidden="true">
    <path d="M3 18V8h24v10M3 14h24M3 18v3M27 18v3" {...iconProps} />
    <path d="M6 8V5.5h7.5V8M6 9.5h7.5v3.2H6z" {...iconProps} />
  </svg>
);

/*
============================================================
SLIDER
============================================================
*/

function RoomSlider() {
  const total = IMAGES.length;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  const touchX = useRef(null);

  const next = useCallback(
    () => setActive((i) => (i + 1) % total),
    [total]
  );

  const prev = useCallback(
    () => setActive((i) => (i - 1 + total) % total),
    [total]
  );

  /* reduced motion + tab visibility */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);

    const onMq = (e) => setReduceMotion(e.matches);
    const onVis = () => setTabHidden(document.hidden);

    mq.addEventListener('change', onMq);
    document.addEventListener('visibilitychange', onVis);

    return () => {
      mq.removeEventListener('change', onMq);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  /* AUTOPLAY — active badalte hi timer dobara shuru (manual click ke baad turant nahi badlega) */
  useEffect(() => {
    if (total < 2 || paused || reduceMotion || tabHidden) return;

    const id = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [active, paused, reduceMotion, tabHidden, total, next]);

  /* swipe */
  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
    setPaused(true);
  };

  const onTouchEnd = (e) => {
    if (touchX.current !== null) {
      const diff = e.changedTouches[0].clientX - touchX.current;
      if (Math.abs(diff) > 45) {
        diff < 0 ? next() : prev();
      }
    }
    touchX.current = null;
    setPaused(false);
  };

  /* keyboard */
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };

  return (
    <div className="lg-slider">
      <div
        className="lg-stage"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Luxury Grand Heritage Rooms photos"
        onKeyDown={onKeyDown}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="lg-track"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {IMAGES.map((src, i) => (
            <div
              className="lg-slide"
              key={src}
              aria-hidden={i !== active}
            >
              <Image
                src={src}
                alt={`${ROOM.title} ${i + 1}`}
                fill
                quality={90}
                priority={i === 0}
                sizes="(max-width: 860px) 100vw, 700px"
              />
            </div>
          ))}
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              className="lg-arrow lg-arrow-left"
              onClick={prev}
              aria-label="Previous photo"
            >
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
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>

            <button
              type="button"
              className="lg-arrow lg-arrow-right"
              onClick={next}
              aria-label="Next photo"
            >
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
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <span className={`lg-counter ${cinzel.className}`}>
              {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>

            {/* auto-slide progress line */}
            {!paused && !reduceMotion && !tabHidden && (
              <span
                key={active}
                className="lg-progress"
                style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
              />
            )}
          </>
        )}
      </div>

      {total > 1 && (
        <>
          <div className="lg-dots" role="tablist" aria-label="Choose photo">
            {IMAGES.map((src, i) => (
              <button
                type="button"
                key={`dot-${src}`}
                role="tab"
                aria-selected={i === active}
                aria-label={`Show photo ${i + 1}`}
                className={`lg-dot ${i === active ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>

          <div className="lg-thumbs">
            {IMAGES.map((src, i) => (
              <button
                type="button"
                key={`thumb-${src}`}
                className={`lg-thumb ${i === active ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Show photo ${i + 1}`}
              >
                <Image src={src} alt="" fill sizes="110px" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/*
============================================================
PAGE
============================================================
*/

export default function RoomsPage() {
  return (
    <main className={`lg ${mona.className}`}>
      <section className="lg-band">
        <div className="lg-container">
          <div className="lg-label">
            <span />
            <p>OUR SUITES</p>
            <span />
          </div>

          <article className="lg-row">
            <RoomSlider />

            <div className="lg-info">
              <h1 className={cinzel.className}>{ROOM.title}</h1>

              <div className="lg-meta">
                {/* <div>
                  <SizeIcon />
                  <span>{ROOM.size}</span>
                </div> */}
                <div>
                  <GuestIcon />
                  <span>{ROOM.guests}</span>
                </div>
                <div>
                  <BedIcon />
                  <span>{ROOM.bed}</span>
                </div>
              </div>

              <div className="lg-line" />

              <p>{ROOM.description}</p>
            </div>
          </article>
        </div>
      </section>

      <style>{`
        .lg, .lg *, .lg *::before, .lg *::after { box-sizing: border-box; }

        .lg {
          width: 100%;
          overflow: hidden;
          background: #FFFAF0;
          color: #555555;
          font-size: 18px;
          line-height: 1.6;
        }

        .lg h1, .lg p { margin: 0; }

        .lg-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 32px;
        }

        .lg-band {
          padding: 172px 0 88px;
          background: #FDF2DE;
        }

        .lg-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-bottom: 44px;
        }
        .lg-label span { width: 44px; height: 1px; background: #60511F; }
        .lg-label p {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 4px;
          color: #60511F;
        }

        .lg-row {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
          align-items: center;
          gap: 56px;
        }

        /* SLIDER */

        .lg-slider { min-width: 0; }

        .lg-stage {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border-radius: 8px;
          background: #EEE6D2;
          outline: none;
          touch-action: pan-y;
        }

        .lg-stage:focus-visible {
          outline: 2px solid #60511F;
          outline-offset: 3px;
        }

        .lg-track {
          display: flex;
          width: 100%;
          height: 100%;
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }

        .lg-slide {
          position: relative;
          flex: 0 0 100%;
          width: 100%;
          height: 100%;
        }

        .lg-slide img {
          object-fit: cover;
          object-position: center;
        }

        .lg-arrow {
          position: absolute;
          top: 50%;
          z-index: 3;
          width: 44px;
          height: 44px;
          margin-top: -22px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #60511F;
          background: rgba(255,250,240,0.92);
          border: 0;
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.3s ease, color 0.3s ease;
        }
        .lg-arrow:hover { background: #60511F; color: #fff; }
        .lg-arrow-left { left: 14px; }
        .lg-arrow-right { right: 14px; }

        .lg-counter {
          position: absolute;
          top: 16px;
          left: 16px;
          z-index: 3;
          padding: 6px 14px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 2px;
          color: #60511F;
          background: rgba(255,250,240,0.92);
          border-radius: 3px;
        }

        .lg-progress {
          position: absolute;
          left: 0;
          bottom: 0;
          z-index: 3;
          height: 3px;
          width: 100%;
          background: #60511F;
          transform-origin: left center;
          animation-name: lgProgress;
          animation-timing-function: linear;
          animation-fill-mode: both;
        }

        @keyframes lgProgress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        .lg-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 18px;
        }

        .lg-dot {
          width: 10px;
          height: 10px;
          padding: 0;
          border: 0;
          border-radius: 50%;
          background: rgba(96,81,31,0.3);
          cursor: pointer;
          transition: background 0.3s ease, transform 0.3s ease, width 0.3s ease;
        }
        .lg-dot.is-active {
          width: 28px;
          border-radius: 10px;
          background: #60511F;
        }

        .lg-thumbs {
          display: flex;
          gap: 10px;
          margin-top: 16px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .lg-thumb {
          position: relative;
          flex: 1 0 0;
          min-width: 72px;
          max-width: 130px;
          aspect-ratio: 4 / 3;
          padding: 0;
          overflow: hidden;
          border: 2px solid transparent;
          border-radius: 4px;
          background: #EEE6D2;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.3s ease, border-color 0.3s ease;
        }
        .lg-thumb img { object-fit: cover; }
        .lg-thumb:hover { opacity: 1; }
        .lg-thumb.is-active { opacity: 1; border-color: #60511F; }

        /* INFO */

        .lg-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
        }

        .lg-info h1 {
          font-size: 30px;
          font-weight: 600;
          line-height: 1.25;
          letter-spacing: 0.5px;
          color: #60511F;
        }

        .lg-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 22px;
        }
        .lg-meta div {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          font-size: 16px;
          color: #3F3F3A;
          background: #FFFAF0;
          border: 1px solid rgba(96,81,31,0.22);
          border-radius: 999px;
          white-space: nowrap;
        }
        .lg-meta svg { width: 22px; height: 22px; flex: 0 0 auto; color: #60511F; }

        .lg-line {
          width: 56px;
          height: 1px;
          margin: 26px 0;
          background: #60511F;
        }

        .lg-info p {
          max-width: 520px;
          font-size: 18px;
          line-height: 1.7;
          color: #555555;
        }

        /* TABLET */
        @media (max-width: 1000px) {
          .lg-row { gap: 32px; }
        }

        /* MOBILE */
        @media (max-width: 860px) {
          .lg { font-size: 16px; }
          .lg-container { padding-left: 20px; padding-right: 20px; }

          .lg-band { padding: 118px 0 52px; }

          .lg-label { margin-bottom: 28px; }
          .lg-label span { width: 28px; }
          .lg-label p { font-size: 12px; letter-spacing: 3px; }

          .lg-row { grid-template-columns: 1fr; gap: 26px; }

          .lg-arrow { width: 38px; height: 38px; margin-top: -19px; }
          .lg-arrow-left { left: 10px; }
          .lg-arrow-right { right: 10px; }
          .lg-counter { top: 12px; left: 12px; font-size: 12px; padding: 5px 10px; }

          .lg-thumbs { display: none; }
          .lg-dots { margin-top: 16px; }

          .lg-info h1 { font-size: 24px; }
          .lg-meta { gap: 8px; margin-top: 18px; }
          .lg-meta div { padding: 6px 12px; font-size: 14px; }
          .lg-meta svg { width: 18px; height: 18px; }
          .lg-line { margin: 20px 0; }
          .lg-info p { font-size: 16px; }
        }

        @media (max-width: 380px) {
          .lg-meta div { font-size: 13px; padding: 6px 10px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .lg *, .lg *::before, .lg *::after { transition: none !important; animation: none !important; }
        }
      `}</style>
    </main>
  );
}