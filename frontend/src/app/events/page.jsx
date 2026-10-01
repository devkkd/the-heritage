'use client';

import { useEffect, useRef } from 'react';
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
THE HERITAGE RESORT — EVENTS PAGE (REDESIGN)

Primary #60511F | BG 1 #FFFAF0 | BG 2 #FDF2DE
Fonts: Cinzel (headings) + Mona Sans (body)
Desktop: max-width 1400px, side padding 32px
Mobile : side padding 20px
Desktop sizes: heading 30px, lead 22px, body 18px
Mobile sizes : heading 24px, lead 18px, body 16px

Images: /experience/3.jpg, /experience/4.jpg

Section order (bg alternate):
Hero #FFFAF0 → Row 1 #FDF2DE → Row 2 #FFFAF0
→ Occasions #FDF2DE → Closing #FFFAF0

Header fixed hai (desktop ~124px, mobile ~78px), isliye hero
mein top padding di gayi hai.

WhatsApp: WHATSAPP_NUMBER ko real number se replace karo
(bina + aur space ke), e.g. '919876543210'
============================================================
*/

const WHATSAPP_NUMBER = '34610373144';

const EVENTS = [
  {
    id: '01',
    name: 'Private Celebrations',
    image: '/experience/3.jpg',
    eyebrow: 'PRIVATE EVENTS',
    tags: ['CELEBRATIONS', 'GATHERINGS'],
    description:
      'Bring your guests together for a beautifully considered private celebration at The Heritage Resort. From intimate occasions to relaxed social gatherings, create an atmosphere filled with thoughtful hospitality, elegant surroundings and the timeless character of Rajasthan.',
  },
  {
    id: '02',
    name: 'Memorable Gatherings',
    image: '/experience/4.jpg',
    eyebrow: 'SPECIAL EVENTS',
    tags: ['DINNERS', 'OCCASIONS'],
    description:
      'Create an evening made for togetherness, conversation and memorable moments. Whether it is a private dinner, milestone celebration or special gathering, the setting and hospitality come together to make every occasion feel personal and effortless.',
  },
];

const OCCASIONS = [
  'Private Dinners',
  'Milestone Celebrations',
  'Social Gatherings',
  'Intimate Occasions',
  'Special Evenings',
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="ev-arrow">
      <path
        d="M5 12h13M13 7l5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function openInquiry(name) {
  const message =
    `Hello The Heritage Resort Jaipur, I would like to inquire about events and gatherings` +
    (name ? `, specifically ${name}. ` : '. ') +
    `Please share the available venues, packages, inclusions, capacity, dates and booking details.`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function EventRow({ item, index }) {
  const ref = useRef(null);
  // 01: image left, 02: image right (same as original)
  const reverse = index % 2 === 1;

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
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`ev-band ${reverse ? 'ev-band-b' : 'ev-band-a'}`}>
      <div className="ev-container">
        <article
          ref={ref}
          className={`ev-row ${reverse ? 'ev-row-reverse from-right' : 'from-left'}`}
        >
          <div className="ev-image">
            <Image
              src={item.image}
              alt={`${item.name} at The Heritage Resort Jaipur`}
              fill
              sizes="(max-width: 860px) 100vw, 660px"
              quality={90}
              priority={index === 0}
            />
            <span className={`ev-number ${cinzel.className}`}>{item.id}</span>
          </div>

          <div className="ev-info">
            <div className="ev-tags">
              <span className="ev-tag ev-tag-main">{item.eyebrow}</span>
              {item.tags.map((tag) => (
                <span className="ev-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>

            <h2 className={cinzel.className}>{item.name}</h2>

            <div className="ev-line" />

            <p>{item.description}</p>

            <button
              type="button"
              className="ev-button"
              onClick={() => openInquiry(item.name)}
              aria-label={`Inquire about ${item.name} on WhatsApp`}
            >
              INQUIRE NOW
              <ArrowIcon />
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}

export default function EventsPage() {
  return (
    <main className={`ev ${mona.className}`}>
      {/* HERO */}
      <section className="ev-hero">
        <div className="ev-container ev-hero-grid">
          <div className="ev-hero-main">
            <div className="ev-label">
              <span />
              <p>EVENTS AT THE HERITAGE RESORT</p>
            </div>

            <h1 className={cinzel.className}>Moments to Remember</h1>

            <p className="ev-lead">
              Bring people together in the timeless atmosphere of Rajasthan.
            </p>

            <p className="ev-text">
              With thoughtful hospitality, elegant settings and memorable moments created
              around every occasion.
            </p>
          </div>

          <aside className="ev-hero-side">
            <p>Timeless. Elegant.</p>
            <p>Intimate events.</p>
            <div className="ev-line" />
            <h3 className={cinzel.className}>Jaipur</h3>
            <span>Rajasthan, India</span>
          </aside>
        </div>
      </section>

      {/* EVENT ROWS */}
      {EVENTS.map((item, index) => (
        <EventRow key={item.id} item={item} index={index} />
      ))}

      {/* OCCASIONS */}
      <section className="ev-occasions">
        <div className="ev-container ev-occasions-grid">
          <div>
            <div className="ev-label">
              <span />
              <p>OCCASIONS</p>
            </div>
            <h2 className={cinzel.className}>Every gathering, made personal</h2>
            <p className="ev-text">
              Whatever the occasion, the setting and hospitality come together to make it feel
              effortless.
            </p>
            <button type="button" className="ev-button" onClick={() => openInquiry('')}>
              PLAN YOUR EVENT
              <ArrowIcon />
            </button>
          </div>

          <ul className="ev-chips">
            {OCCASIONS.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* CLOSING */}
      <section className="ev-closing">
        <div className="ev-container">
          <div className="ev-line ev-line-center" />
          <blockquote className={cinzel.className}>
            &ldquo;Every gathering becomes a memory, when the moment is made
            special.&rdquo;
          </blockquote>
          <p>THE HERITAGE RESORT · JAIPUR</p>
        </div>
      </section>

      <style>{`
        .ev, .ev *, .ev *::before, .ev *::after { box-sizing: border-box; }

        .ev {
          width: 100%;
          overflow: hidden;
          background: #FFFAF0;
          color: #555555;
          font-size: 18px;
          line-height: 1.6;
        }

        .ev h1, .ev h2, .ev h3, .ev p, .ev blockquote { margin: 0; }
        .ev button { font: inherit; }
        .ev ul { margin: 0; padding: 0; list-style: none; }

        .ev-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 32px;
        }

        .ev-line {
          width: 56px;
          height: 1px;
          margin: 24px 0;
          background: #60511F;
        }
        .ev-line-center { margin-left: auto; margin-right: auto; }

        .ev-label {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }
        .ev-label span { width: 40px; height: 1px; background: #60511F; flex: 0 0 auto; }
        .ev-label p {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 3px;
          color: #60511F;
        }

        /* HERO (fixed header ke liye top padding) */
        .ev-hero {
          padding: 180px 0 64px;
          background: #FFFAF0;
          border-bottom: 1px solid rgba(96,81,31,0.18);
        }

        .ev-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 300px;
          gap: 56px;
          align-items: start;
        }

        .ev-hero h1 {
          font-size: 30px;
          font-weight: 600;
          line-height: 1.3;
          letter-spacing: 0.5px;
          color: #171A18;
        }

        .ev-lead {
          max-width: 760px;
          margin-top: 18px;
          font-size: 22px;
          line-height: 1.5;
          color: #3F3F3A;
        }

        .ev-text {
          max-width: 760px;
          margin-top: 14px;
          font-size: 18px;
          line-height: 1.7;
          color: #555555;
        }

        .ev-hero-side {
          padding-left: 36px;
          border-left: 1px solid rgba(96,81,31,0.45);
        }
        .ev-hero-side p { font-size: 18px; letter-spacing: 1px; color: #494942; }
        .ev-hero-side h3 { font-size: 30px; font-weight: 600; color: #34352F; }
        .ev-hero-side span { display: block; margin-top: 6px; font-size: 18px; color: #5A5A52; }

        /* BANDS (alternate bg) */
        .ev-band { padding: 64px 0; overflow: hidden; }
        .ev-band-a { background: #FDF2DE; }
        .ev-band-b { background: #FFFAF0; }

        .ev-row {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
          gap: 56px;
          align-items: center;
        }
        .ev-row-reverse { grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); }
        .ev-row-reverse .ev-image { order: 2; }
        .ev-row-reverse .ev-info { order: 1; }

        /* IMAGE */
        .ev-image {
          position: relative;
          width: 100%;
          height: 440px;
          overflow: hidden;
          border-radius: 8px;
          background: #EEE6D2;
          opacity: 0;
          transition: transform 1s cubic-bezier(.16,1,.3,1), opacity 0.7s ease;
        }
        .ev-row.from-left .ev-image { transform: translateX(-100px); }
        .ev-row.from-right .ev-image { transform: translateX(100px); }
        .ev-row.is-visible .ev-image { transform: translateX(0); opacity: 1; }

        .ev-image img {
          object-fit: cover;
          object-position: center;
          transition: transform 1.2s cubic-bezier(.16,1,.3,1);
        }
        .ev-image:hover img { transform: scale(1.03); }

        .ev-number {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 2;
          padding: 6px 14px;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 2px;
          color: #60511F;
          background: rgba(255,250,240,0.92);
          border-radius: 3px;
        }
        .ev-row-reverse .ev-number { left: auto; right: 20px; }

        /* INFO */
        .ev-info {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.7s ease 0.12s, transform 0.8s cubic-bezier(.16,1,.3,1) 0.12s;
        }
        .ev-row.is-visible .ev-info { opacity: 1; transform: translateY(0); }

        .ev-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
        .ev-tag {
          padding: 6px 12px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 1.5px;
          color: #60511F;
          border: 1px solid rgba(96,81,31,0.3);
          border-radius: 999px;
          white-space: nowrap;
        }
        .ev-tag-main { background: #60511F; color: #FFFFFF; border-color: #60511F; }

        .ev-info h2 {
          font-size: 30px;
          font-weight: 600;
          line-height: 1.25;
          letter-spacing: 0.5px;
          color: #60511F;
        }

        .ev-info p {
          max-width: 520px;
          font-size: 18px;
          line-height: 1.7;
          color: #555555;
        }

        /* BUTTON */
        .ev-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 28px;
          padding: 14px 26px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 1.5px;
          color: #FFFFFF;
          background: #60511F;
          border: 0;
          border-radius: 3px;
          cursor: pointer;
          transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
        }
        .ev-arrow { width: 18px; height: 18px; transition: transform 0.25s ease; }
        .ev-button:hover {
          transform: translateY(-2px);
          background: #514418;
          box-shadow: 0 8px 18px rgba(96,81,31,0.18);
        }
        .ev-button:hover .ev-arrow { transform: translateX(3px); }
        .ev-button:active { transform: translateY(0); }

        /* OCCASIONS */
        .ev-occasions { padding: 72px 0; background: #FDF2DE; }
        .ev-occasions-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 56px;
          align-items: center;
        }
        .ev-occasions h2 {
          font-size: 30px;
          font-weight: 600;
          line-height: 1.3;
          letter-spacing: 0.5px;
          color: #171A18;
        }
        .ev-occasions .ev-text { max-width: 520px; }

        .ev-chips { display: flex; flex-wrap: wrap; gap: 12px; }
        .ev-chips li {
          padding: 12px 22px;
          font-size: 18px;
          color: #3F3F3A;
          background: #FFFAF0;
          border: 1px solid rgba(96,81,31,0.25);
          border-radius: 999px;
        }

        /* CLOSING */
        .ev-closing {
          padding: 72px 0;
          text-align: center;
          background: #FFFAF0;
          border-top: 1px solid rgba(96,81,31,0.2);
        }
        .ev-closing .ev-line { margin-top: 0; }
        .ev-closing blockquote {
          max-width: 760px;
          margin: 0 auto;
          font-size: 30px;
          font-weight: 500;
          line-height: 1.4;
          color: #60511F;
        }
        .ev-closing p {
          margin-top: 22px;
          font-size: 14px;
          letter-spacing: 3px;
          color: #60615B;
        }

        /* TABLET */
        @media (max-width: 1100px) {
          .ev-hero-grid { grid-template-columns: minmax(0, 1fr) 240px; gap: 36px; }
          .ev-hero-side { padding-left: 28px; }
          .ev-row, .ev-row-reverse { gap: 36px; }
          .ev-image { height: 380px; }
          .ev-occasions-grid { gap: 36px; }
        }

        /* MOBILE */
        @media (max-width: 860px) {
          .ev { font-size: 16px; }
          .ev-container { padding-left: 20px; padding-right: 20px; }

          .ev-hero { padding: 118px 0 44px; }
          .ev-hero-grid { grid-template-columns: 1fr; gap: 32px; }
          .ev-label span { width: 28px; }
          .ev-label p { font-size: 12px; letter-spacing: 2px; }

          .ev-hero h1, .ev-info h2, .ev-occasions h2, .ev-hero-side h3, .ev-closing blockquote {
            font-size: 24px;
          }
          .ev-lead { font-size: 18px; }
          .ev-text, .ev-info p, .ev-hero-side p, .ev-hero-side span { font-size: 16px; }

          .ev-hero-side {
            padding: 24px 0 0;
            border-left: 0;
            border-top: 1px solid rgba(96,81,31,0.35);
          }

          .ev-band { padding: 36px 0; }

          .ev-row, .ev-row-reverse { grid-template-columns: 1fr; gap: 24px; }
          .ev-row-reverse .ev-image, .ev-row-reverse .ev-info { order: 0; }

          .ev-image { height: auto; aspect-ratio: 4 / 3; }
          .ev-row.from-left .ev-image { transform: translateX(-60px); }
          .ev-row.from-right .ev-image { transform: translateX(60px); }
          .ev-row.is-visible .ev-image { transform: translateX(0); }

          .ev-number { top: 16px; left: 16px; font-size: 14px; }
          .ev-row-reverse .ev-number { left: 16px; right: auto; }

          .ev-tag { font-size: 11px; padding: 5px 10px; letter-spacing: 1px; }
          .ev-line { margin: 20px 0; }
          .ev-button { width: 100%; margin-top: 24px; }

          .ev-occasions { padding: 48px 0; }
          .ev-occasions-grid { grid-template-columns: 1fr; gap: 28px; }
          .ev-chips { gap: 10px; }
          .ev-chips li { padding: 10px 16px; font-size: 16px; }

          .ev-closing { padding: 48px 0; }
          .ev-closing p { font-size: 11px; letter-spacing: 2px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ev *, .ev *::before, .ev *::after { transition: none !important; }
          .ev-image, .ev-info { transform: none !important; opacity: 1 !important; }
        }
      `}</style>
    </main>
  );
}