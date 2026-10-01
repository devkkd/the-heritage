'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
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
THE HERITAGE RESORT — GALLERY PAGE (REDESIGN + POPUP)

Primary #60511F | BG 1 #FFFAF0 | BG 2 #FDF2DE
Fonts: Cinzel (headings) + Mona Sans (body)

Har item mein:
  image   -> card ki cover image
  images  -> popup mein dikhne wali saari images (jitni chaho add karo)
  details -> popup ki right side ka text, highlights list

Popup: bg blur + dark overlay, left = image slider + thumbnails,
right = details. ESC / bahar click / X se band hota hai.
============================================================
*/

const GALLERY_ITEMS = [
  {
    image: '/newhome/SUITES/1.png',
    images: [
      '/newhome/SUITES/1.png',
      // yahan aur suite images add karo, e.g. '/newhome/SUITES/2.png',
    ],
    title: 'HERITAGE SUITES',
    description:
      'Step into thoughtfully restored spaces where timeless Rajasthani character meets refined contemporary comfort.',
    details:
      'Each suite has been restored with care, blending hand-finished walls, traditional motifs and warm textures with modern comforts. Wake up to soft light, quiet courtyards and interiors that feel both regal and relaxed.',
    highlights: [
      'Handcrafted Rajasthani interiors',
      'Modern comforts and premium bedding',
      'Peaceful courtyard and garden views',
      'Designed for slow, restful stays',
    ],
  },
  {
    image: '/home/history1.jpg',
    images: [
      '/home/history1.jpg',
      // '/home/history2.jpg',
    ],
    title: 'HERITAGE ARCHITECTURE',
    description:
      'Discover graceful courtyards, handcrafted details and the quiet beauty of a historic Jaipur-inspired retreat.',
    details:
      'Arches, jharokhas, carved stonework and open courtyards tell the story of Rajasthan’s architectural legacy. Every corner of the property has been shaped to honour that character while keeping guests comfortable.',
    highlights: [
      'Traditional arches and jharokhas',
      'Open courtyards and shaded walkways',
      'Hand-carved details throughout',
      'Best enjoyed in the golden-hour light',
    ],
  },
  {
    image: '/home/food.jpg',
    images: [
      '/home/food.jpg',
      '/home/food2.jpg',
    ],
    title: 'HERITAGE DINING',
    description:
      'A visual journey through elegant dining spaces, intimate moments and flavours inspired by Rajasthan.',
    details:
      'From lovingly plated regional classics to relaxed family-style spreads, dining here is an experience in itself. Our spaces are set up for celebrations, quiet dinners and everything in between.',
    highlights: [
      'Authentic Rajasthani flavours',
      'Elegant indoor and open-air settings',
      'Seasonal menus with fresh ingredients',
      'Perfect for families and celebrations',
    ],
  },
  {
    image: '/home/food2.jpg',
    images: [
      '/home/food2.jpg',
      '/home/food.jpg',
    ],
    title: 'THE DINING EXPERIENCE',
    description:
      'Explore warm interiors and memorable settings created for relaxed evenings and unhurried conversations.',
    details:
      'Soft lighting, warm interiors and attentive service set the tone for evenings that are meant to be savoured. Take your time, share a table and let the meal unfold at its own pace.',
    highlights: [
      'Warm, softly lit interiors',
      'Attentive and personal service',
      'Ideal for long, unhurried evenings',
      'Private dining on request',
    ],
  },
  {
    image: '/home/e1.jpg',
    images: [
      '/home/e1.jpg',
      '/home/e2.jpg',
    ],
    title: 'HERITAGE EXPERIENCES',
    description:
      'From peaceful surroundings to curated experiences, every frame reflects the character of a timeless stay.',
    details:
      'Beyond the rooms and the table, the resort offers curated experiences rooted in local culture, from quiet garden mornings to evenings of music and tradition.',
    highlights: [
      'Curated cultural experiences',
      'Calm gardens and open spaces',
      'Activities for all ages',
      'Moments that stay with you',
    ],
  },
  {
    image: '/home/e2.jpg',
    images: [
      '/home/e2.jpg',
      '/home/e1.jpg',
    ],
    title: 'MOMENTS AT HERITAGE',
    description:
      'Take a closer look at the atmosphere, details and experiences that make every stay feel distinctly special.',
    details:
      'It is the small things that make a stay memorable: the light through a carved window, the sound of the courtyard in the evening, a warm welcome at the door. Here are a few of those moments.',
    highlights: [
      'Details worth a closer look',
      'Golden mornings and calm evenings',
      'Warm hospitality at every step',
      'A stay that feels distinctly yours',
    ],
  },
];

function GalleryCard({ item, index, onOpen }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.16 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className="gl-card"
      style={{ '--card-delay': `${(index % 3) * 110}ms` }}
    >
      <div className="gl-image">
        <Image
          src={item.image}
          alt={item.title}
          fill
          quality={90}
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 440px"
        />
        <div className="gl-overlay" />
      </div>

      <div className="gl-body">
        <div className="gl-top-line" />

        <h2 className={cinzel.className}>{item.title}</h2>

        <p>{item.description}</p>

        <button
          type="button"
          className="gl-button"
          onClick={() => onOpen(item)}
        >
          VIEW
        </button>
      </div>
    </article>
  );
}

function GalleryModal({ item, onClose }) {
  const [active, setActive] = useState(0);
  const images = item.images && item.images.length ? item.images : [item.image];
  const total = images.length;

  const next = useCallback(() => setActive((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setActive((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, next, prev]);

  return createPortal(
    <div className={`gl gl-portal ${mona.className}`}>
    <div
      className="gl-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div className="gl-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="gl-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>

        <div className="gl-modal-scroll">
        {/* LEFT: IMAGES */}
        <div className="gl-modal-media">
          <div className="gl-modal-stage">
            <Image
              key={images[active]}
              src={images[active]}
              alt={`${item.title} ${active + 1}`}
              fill
              quality={90}
              sizes="(max-width: 800px) 100vw, 640px"
              className="gl-modal-img"
              priority
            />

            {total > 1 && (
              <>
                <button
                  type="button"
                  className="gl-arrow gl-arrow-left"
                  onClick={prev}
                  aria-label="Previous image"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 5l-7 7 7 7" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="gl-arrow gl-arrow-right"
                  onClick={next}
                  aria-label="Next image"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <span className="gl-counter">
                  {active + 1} / {total}
                </span>
              </>
            )}
          </div>

          {total > 1 && (
            <div className="gl-thumbs">
              {images.map((src, i) => (
                <button
                  type="button"
                  key={`${src}-${i}`}
                  className={`gl-thumb ${i === active ? 'is-active' : ''}`}
                  onClick={() => setActive(i)}
                  aria-label={`Show image ${i + 1}`}
                >
                  <Image src={src} alt="" fill sizes="88px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: DETAILS */}
        <div className="gl-modal-info">
          <div className="gl-label gl-label-left">
            <span />
            <p>THE HERITAGE RESORT</p>
          </div>

          <h2 className={cinzel.className}>{item.title}</h2>

          <p className="gl-modal-lead">{item.description}</p>

          <div className="gl-modal-divider" />

          <p className="gl-modal-text">{item.details}</p>

          {item.highlights && item.highlights.length > 0 && (
            <ul className="gl-modal-list">
              {item.highlights.map((h) => (
                <li key={h}>
                  <i>✦</i>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        </div>
      </div>
    </div>
    </div>,
    document.body
  );
}

export default function HeritageGalleryPage() {
  const [selected, setSelected] = useState(null);
  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <main className={`gl ${mona.className}`}>
      {/* HERO */}
      <section className="gl-hero">
        <div className="gl-container gl-hero-inner">
          <div className="gl-label">
            <span />
            <p>THE HERITAGE RESORT</p>
            <span />
          </div>

          <h1 className={cinzel.className}>Visualise Your Stay With Heritage</h1>

          <p className="gl-lead">
            Explore the spaces, architecture, dining and experiences that define the spirit
            of The Heritage Resort.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="gl-section" aria-label="Heritage gallery">
        <div className="gl-container gl-grid">
          {GALLERY_ITEMS.map((item, index) => (
            <GalleryCard
              key={`${item.title}-${index}`}
              item={item}
              index={index}
              onOpen={setSelected}
            />
          ))}
        </div>
      </section>

      {/* STRIP */}
      <section className="gl-strip">
        <div className="gl-container">
          <span>Nature</span>
          <i>✦</i>
          <span>Heritage</span>
          <i>✦</i>
          <span>Hospitality</span>
        </div>
      </section>

      {/* POPUP */}
      {selected && <GalleryModal item={selected} onClose={handleClose} />}

      <style>{`
        .gl, .gl *, .gl *::before, .gl *::after { box-sizing: border-box; }

        .gl {
          width: 100%;
          overflow: hidden;
          background: #FFFAF0;
          color: #555555;
          font-size: 18px;
          line-height: 1.6;
        }

        .gl h1, .gl h2, .gl p { margin: 0; }

        .gl-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 32px;
        }

        /* HERO */
        .gl-hero {
          padding: 180px 0 64px;
          text-align: center;
          background: #FFFAF0;
          border-bottom: 1px solid rgba(96,81,31,0.18);
        }

        .gl-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-bottom: 18px;
        }
        .gl-label span { width: 44px; height: 1px; background: #60511F; }
        .gl-label p {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 3px;
          color: #60511F;
        }

        .gl-hero h1 {
          max-width: 760px;
          margin: 0 auto;
          font-size: 30px;
          font-weight: 600;
          line-height: 1.3;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #60511F;
        }

        .gl .gl-lead {
          max-width: 720px;
          margin: 18px auto 0;
          font-size: 22px;
          line-height: 1.5;
          color: #3F3F3A;
        }

        /* GRID */
        .gl-section { padding: 72px 0 88px; background: #FDF2DE; }

        .gl-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          column-gap: 30px;
          row-gap: 64px;
          align-items: start;
        }

        /* CARD */
        .gl-card {
          min-width: 0;
          opacity: 0;
          transform: translateY(38px);
          transition:
            opacity 0.75s ease var(--card-delay),
            transform 0.75s cubic-bezier(0.22, 1, 0.36, 1) var(--card-delay);
        }
        .gl-card.is-visible { opacity: 1; transform: translateY(0); }

        .gl-image {
          position: relative;
          width: 100%;
          height: 320px;
          overflow: hidden;
          border-radius: 6px;
          background: #EEE6D2;
        }
        .gl-image img {
          object-fit: cover;
          object-position: center;
          transform: scale(1.01);
          transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .gl-card:hover .gl-image img { transform: scale(1.07); }

        .gl-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(to bottom, rgba(0,0,0,0.02), rgba(96,81,31,0.1));
          transition: opacity 0.5s ease;
        }
        .gl-card:hover .gl-overlay { opacity: 0.35; }

        .gl-body {
          position: relative;
          z-index: 2;
          width: calc(100% - 40px);
          min-height: 320px;
          margin: -44px auto 0;
          padding: 32px 28px 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background: #FFFAF0;
          border: 1px solid rgba(96,81,31,0.16);
          border-radius: 6px;
          box-shadow: 0 14px 28px rgba(64,53,24,0.07);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.55s ease;
        }
        .gl-card:hover .gl-body {
          transform: translateY(-8px);
          box-shadow: 0 20px 38px rgba(64,53,24,0.12);
        }

        .gl-top-line {
          width: 52px;
          height: 1px;
          margin-bottom: 16px;
          background: rgba(96,81,31,0.5);
          transition: width 0.45s ease, background 0.45s ease;
        }
        .gl-card:hover .gl-top-line { width: 82px; background: #60511F; }

        .gl-body h2 {
          min-height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 600;
          line-height: 1.3;
          letter-spacing: 0.5px;
          color: #60511F;
        }

        .gl-body p {
          max-width: 400px;
          margin-top: 12px;
          font-size: 16px;
          line-height: 1.7;
          color: #62645E;
        }

        .gl-button {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          min-width: 150px;
          margin-top: auto;
          padding: 14px 26px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-decoration: none;
          color: #60511F;
          background: transparent;
          border: 1px solid rgba(96,81,31,0.6);
          border-radius: 3px;
          cursor: pointer;
          transition: color 0.35s ease, border-color 0.35s ease, transform 0.35s ease;
        }
        .gl-body p + .gl-button { margin-top: 24px; }
        .gl-button::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          background: #60511F;
          transform: translateY(102%);
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .gl-button:hover { color: #FFFFFF; border-color: #60511F; transform: translateY(-2px); }
        .gl-button:hover::before { transform: translateY(0); }

        /* STRIP */
        .gl-strip {
          padding: 22px 0;
          background: #FFFAF0;
          border-top: 1px solid rgba(96,81,31,0.2);
        }
        .gl-strip .gl-container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 18px;
        }
        .gl-strip span {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #60511F;
        }
        .gl-strip i { font-style: normal; font-size: 12px; color: rgba(96,81,31,0.55); }

        /* ============ POPUP ============ */
        .gl-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 2147483000;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          height: 100dvh;
          padding: 24px;
          background: rgba(38, 30, 10, 0.55);
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
          animation: glFade 0.35s ease both;
        }

        .gl-modal {
          position: relative;
          width: 100%;
          max-width: 1180px;
          height: min(660px, calc(100vh - 48px));
          height: min(660px, calc(100dvh - 48px));
          background: #FFFAF0;
          border: 1px solid rgba(96,81,31,0.2);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(20,15,5,0.45);
          animation: glPop 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .gl-modal-close {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 5;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #60511F;
          background: #FFFAF0;
          border: 1px solid rgba(96,81,31,0.35);
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;
        }
        .gl-modal-close:hover { background: #60511F; color: #FFFFFF; transform: rotate(90deg); }

        .gl.gl-portal { width: auto; height: 0; overflow: visible; background: transparent; }

        .gl-modal-scroll {
          height: 100%;
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
          grid-template-rows: minmax(0, 1fr);
        }

        /* left media */
        .gl-modal-media {
          min-width: 0;
          min-height: 0;
          display: flex;
          flex-direction: column;
          background: #EEE6D2;
        }

        .gl-modal-stage {
          position: relative;
          flex: 1;
          min-height: 0;
          overflow: hidden;
        }
        .gl-modal-stage .gl-modal-img {
          object-fit: cover;
          object-position: center;
          animation: glFade 0.5s ease both;
        }

        .gl-arrow {
          position: absolute;
          top: 50%;
          z-index: 3;
          width: 42px;
          height: 42px;
          margin-top: -21px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #60511F;
          background: rgba(255,250,240,0.92);
          border: 1px solid rgba(96,81,31,0.3);
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.3s ease, color 0.3s ease;
        }
        .gl-arrow:hover { background: #60511F; color: #FFFFFF; }
        .gl-arrow-left { left: 14px; }
        .gl-arrow-right { right: 14px; }

        .gl-counter {
          position: absolute;
          left: 14px;
          bottom: 14px;
          z-index: 3;
          padding: 6px 12px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1.5px;
          color: #FFFAF0;
          background: rgba(38,30,10,0.6);
          border-radius: 3px;
        }

        .gl-thumbs {
          display: flex;
          gap: 10px;
          padding: 12px;
          overflow-x: auto;
          background: #FDF2DE;
          border-top: 1px solid rgba(96,81,31,0.18);
        }
        .gl-thumb {
          position: relative;
          flex: 0 0 auto;
          width: 88px;
          height: 62px;
          padding: 0;
          overflow: hidden;
          border: 2px solid transparent;
          border-radius: 4px;
          background: #EEE6D2;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.3s ease, border-color 0.3s ease;
        }
        .gl-thumb img { object-fit: cover; }
        .gl-thumb:hover { opacity: 1; }
        .gl-thumb.is-active { opacity: 1; border-color: #60511F; }

        /* right info */
        .gl-modal-info {
          min-width: 0;
          min-height: 0;
          padding: 48px 40px 36px;
          overflow-y: auto;
          background: #FFFAF0;
        }

        .gl-label-left { justify-content: flex-start; margin-bottom: 16px; }
        .gl-label-left span { width: 32px; }

        .gl-modal-info h2 {
          font-size: 30px;
          font-weight: 600;
          line-height: 1.3;
          letter-spacing: 0.5px;
          color: #60511F;
        }

        .gl .gl-modal-lead {
          margin-top: 14px;
          font-size: 18px;
          line-height: 1.6;
          color: #3F3F3A;
        }

        .gl-modal-divider {
          width: 64px;
          height: 1px;
          margin: 24px 0;
          background: rgba(96,81,31,0.55);
        }

        .gl .gl-modal-text {
          font-size: 16px;
          line-height: 1.75;
          color: #62645E;
        }

        .gl-modal-list {
          margin: 24px 0 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .gl-modal-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 16px;
          line-height: 1.5;
          color: #3F3F3A;
        }
        .gl-modal-list i {
          flex: 0 0 auto;
          margin-top: 3px;
          font-style: normal;
          font-size: 12px;
          color: #60511F;
        }

        @keyframes glFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes glPop {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* TABLET */
        @media (max-width: 1100px) {
          .gl-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 24px; row-gap: 56px; }
          .gl-image { height: 300px; }
          .gl-card { --card-delay: 0ms !important; }

          .gl-modal-scroll { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
          .gl-modal-info { padding: 44px 28px 28px; }
        }

        /* MOBILE */
        @media (max-width: 800px) {
          .gl-modal-backdrop { padding: 12px; }
          .gl-modal {
            height: calc(100vh - 24px);
            height: calc(100dvh - 24px);
          }
          .gl-modal-scroll {
            display: block;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
          }
          .gl-modal-media { display: block; }
          .gl-modal-stage { height: auto; aspect-ratio: 4 / 3; }
          .gl-modal-info { overflow: visible; padding: 26px 20px 32px; }
          .gl-modal-close { top: 10px; right: 10px; width: 38px; height: 38px; box-shadow: 0 4px 14px rgba(20,15,5,0.25); }
          .gl-modal-info h2 { font-size: 24px; }
          .gl .gl-modal-lead { font-size: 18px; }
          .gl-thumb { width: 72px; height: 52px; }
        }

        @media (max-width: 700px) {
          .gl { font-size: 16px; }
          .gl-container { padding-left: 20px; padding-right: 20px; }

          .gl-hero { padding: 118px 0 44px; }
          .gl-label span { width: 28px; }
          .gl-label p { font-size: 12px; letter-spacing: 2px; }
          .gl-hero h1 { font-size: 24px; }
          .gl .gl-lead { margin-top: 14px; font-size: 18px; }

          .gl-section { padding: 40px 0 52px; }
          .gl-grid { grid-template-columns: 1fr; row-gap: 40px; }

          .gl-card { transform: translateY(28px); }

          .gl-image { height: auto; aspect-ratio: 4 / 3; }

          .gl-body { width: calc(100% - 28px); min-height: 0; margin-top: -32px; padding: 26px 20px 24px; }
          .gl-body h2 { min-height: 0; font-size: 20px; }
          .gl-body p { font-size: 16px; }
          .gl-body p + .gl-button { margin-top: 22px; }
          .gl-button { width: 100%; }

          .gl-card:hover .gl-body { transform: translateY(-4px); }

          .gl-strip .gl-container { gap: 12px; }
          .gl-strip span { font-size: 11px; letter-spacing: 2px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .gl *, .gl *::before, .gl *::after { transition: none !important; animation: none !important; }
          .gl-card { opacity: 1; transform: none; }
        }
      `}</style>
    </main>
  );
}