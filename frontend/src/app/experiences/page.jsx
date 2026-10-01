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
THE HERITAGE RESORT — EXPERIENCES PAGE (REDESIGN)

Primary #60511F | BG 1 #FFFAF0 | BG 2 #FDF2DE
Fonts: Cinzel (headings) + Mona Sans (body)
Desktop: max-width 1400px, side padding 32px
Mobile : side padding 20px
Desktop sizes: heading 30px, lead 22px, body 18px

Header fixed hai (desktop ~124px, mobile ~78px), isliye hero
mein top padding di gayi hai.

WhatsApp: WHATSAPP_NUMBER ko real number se replace karo
(bina + aur space ke), e.g. '919876543210'
============================================================
*/

const WHATSAPP_NUMBER = '34610373144';

const EXPERIENCES = [
  {
    id: '01',
    name: 'Breakfast at First Light',
    image: '/experience/1.jpg',
    eyebrow: 'MORNING',
    tags: ['SUNRISE', 'PRIVATE DINING'],
    description:
      'Begin the day in the quiet warmth of Jaipur as the first light settles over the landscape. Enjoy a relaxed breakfast surrounded by nature, with freshly prepared favourites and an unhurried setting made for beautiful mornings.',
  },
  {
    id: '02',
    name: 'Stepwell Soirée',
    image: '/experience/2.jpg',
    eyebrow: 'EVENING',
    tags: ['HERITAGE', 'DINNER UNDER THE STARS'],
    description:
      'Step into an atmospheric evening inspired by Rajasthan’s timeless heritage. Soft candlelight, intimate dining and the character of an old stepwell create a memorable setting for an elegant night away from the ordinary.',
  },
  {
    id: '03',
    name: 'Alfresco Lunch',
    image: '/experience/3.jpg',
    eyebrow: 'DAY EXPERIENCE',
    tags: ['OUTDOOR DINING', 'RELAXED MOMENTS'],
    description:
      'Take lunch outdoors and slow the afternoon down. Surrounded by open skies and peaceful views, enjoy a leisurely meal in a setting that brings together the natural beauty of Rajasthan and the relaxed rhythm of a resort escape.',
  },
  {
    id: '04',
    name: 'The Rawla Sundowner',
    image: '/experience/4.jpg',
    eyebrow: 'SUNSET',
    tags: ['SUNSET', 'PRIVATE DINING'],
    description:
      'As the sun begins to set, settle into an intimate setting designed for long conversations and memorable flavours. Warm lights, open air and a beautifully composed dinner create the perfect close to the day.',
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="ex-arrow">
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

function ExperienceRow({ item, index }) {
  const ref = useRef(null);
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

  const handleBooking = () => {
    const message = `Hello The Heritage Resort Jaipur, I would like to inquire about the experience ${item.name}. Please share the availability, timings, inclusions and booking details.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className={`ex-band ${reverse ? 'ex-band-b' : 'ex-band-a'}`}>
      <div className="ex-container">
        <article
          ref={ref}
          className={`ex-row ${reverse ? 'ex-row-reverse from-right' : 'from-left'}`}
        >
          <div className="ex-image">
            <Image
              src={item.image}
              alt={`${item.name} at The Heritage Resort Jaipur`}
              fill
              sizes="(max-width: 860px) 100vw, 660px"
              quality={90}
              priority={index === 0}
            />
            <span className={`ex-number ${cinzel.className}`}>{item.id}</span>
          </div>

          <div className="ex-info">
            <div className="ex-tags">
              <span className="ex-tag ex-tag-main">{item.eyebrow}</span>
              {item.tags.map((tag) => (
                <span className="ex-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>

            <h2 className={cinzel.className}>{item.name}</h2>

            <div className="ex-line" />

            <p>{item.description}</p>

            <button
              type="button"
              className="ex-button"
              onClick={handleBooking}
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

export default function ExperiencesPage() {
  return (
    <main className={`ex ${mona.className}`}>
      {/* HERO */}
      <section className="ex-hero">
        <div className="ex-container ex-hero-grid">
          <div className="ex-hero-main">
            <div className="ex-label">
              <span />
              <p>EXPERIENCES AT THE HERITAGE RESORT</p>
            </div>

            <h1 className={cinzel.className}>A Journey of Experiences</h1>

            <p className="ex-lead">
              From peaceful mornings to magical evenings, discover thoughtfully curated
              experiences.
            </p>

            <p className="ex-text">
              Each one brings together Rajasthan&apos;s natural beauty, heritage, warm
              hospitality and unforgettable moments.
            </p>
          </div>

          <aside className="ex-hero-side">
            <p>Timeless heritage.</p>
            <p>Natural experiences.</p>
            <div className="ex-line" />
            <h3 className={cinzel.className}>Jaipur</h3>
            <span>Rajasthan, India</span>
          </aside>
        </div>
      </section>

      {/* EXPERIENCES */}
      {EXPERIENCES.map((item, index) => (
        <ExperienceRow key={item.id} item={item} index={index} />
      ))}

      {/* CLOSING */}
      <section className="ex-closing">
        <div className="ex-container">
          <div className="ex-line ex-line-center" />
          <blockquote className={cinzel.className}>
            &ldquo;The finest experiences are the ones you remember long after the
            journey.&rdquo;
          </blockquote>
          <p>THE HERITAGE RESORT · JAIPUR</p>
        </div>
      </section>

      <style>{`
        .ex, .ex *, .ex *::before, .ex *::after { box-sizing: border-box; }

        .ex {
          width: 100%;
          overflow: hidden;
          background: #FFFAF0;
          color: #555555;
          font-size: 18px;
          line-height: 1.6;
        }

        .ex h1, .ex h2, .ex h3, .ex p, .ex blockquote { margin: 0; }
        .ex button { font: inherit; }

        .ex-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 32px;
        }

        .ex-line {
          width: 56px;
          height: 1px;
          margin: 24px 0;
          background: #60511F;
        }
        .ex-line-center { margin-left: auto; margin-right: auto; }

        /* HERO (fixed header ke liye top padding) */
        .ex-hero {
          padding: 180px 0 64px;
          background: #FFFAF0;
          border-bottom: 1px solid rgba(96,81,31,0.18);
        }

        .ex-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 300px;
          gap: 56px;
          align-items: start;
        }

        .ex-label {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }
        .ex-label span { width: 40px; height: 1px; background: #60511F; flex: 0 0 auto; }
        .ex-label p {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 3px;
          color: #60511F;
        }

        .ex-hero h1 {
          font-size: 30px;
          font-weight: 600;
          line-height: 1.3;
          letter-spacing: 0.5px;
          color: #171A18;
        }

        .ex-lead {
          max-width: 760px;
          margin-top: 18px;
          font-size: 22px;
          line-height: 1.5;
          color: #3F3F3A;
        }

        .ex-text {
          max-width: 760px;
          margin-top: 14px;
          font-size: 18px;
          line-height: 1.7;
          color: #555555;
        }

        .ex-hero-side {
          padding-left: 36px;
          border-left: 1px solid rgba(96,81,31,0.45);
        }
        .ex-hero-side p { font-size: 18px; letter-spacing: 1px; color: #494942; }
        .ex-hero-side h3 { font-size: 30px; font-weight: 600; color: #34352F; }
        .ex-hero-side span { display: block; margin-top: 6px; font-size: 18px; color: #5A5A52; }

        /* BANDS (alternate bg) */
        .ex-band { padding: 64px 0; overflow: hidden; }
        .ex-band-a { background: #FDF2DE; }
        .ex-band-b { background: #FFFAF0; }

        .ex-row {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
          gap: 56px;
          align-items: center;
        }
        .ex-row-reverse { grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); }
        .ex-row-reverse .ex-image { order: 2; }
        .ex-row-reverse .ex-info { order: 1; }

        /* IMAGE */
        .ex-image {
          position: relative;
          width: 100%;
          height: 440px;
          overflow: hidden;
          border-radius: 8px;
          background: #EEE6D2;
          opacity: 0;
          transition: transform 1s cubic-bezier(.16,1,.3,1), opacity 0.7s ease;
        }
        .ex-row.from-left .ex-image { transform: translateX(-100px); }
        .ex-row.from-right .ex-image { transform: translateX(100px); }
        .ex-row.is-visible .ex-image { transform: translateX(0); opacity: 1; }

        .ex-image img {
          object-fit: cover;
          object-position: center;
          transition: transform 1.2s cubic-bezier(.16,1,.3,1);
        }
        .ex-image:hover img { transform: scale(1.03); }

        .ex-number {
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
        .ex-row-reverse .ex-number { left: auto; right: 20px; }

        /* INFO */
        .ex-info {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.7s ease 0.12s, transform 0.8s cubic-bezier(.16,1,.3,1) 0.12s;
        }
        .ex-row.is-visible .ex-info { opacity: 1; transform: translateY(0); }

        .ex-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
        .ex-tag {
          padding: 6px 12px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 1.5px;
          color: #60511F;
          border: 1px solid rgba(96,81,31,0.3);
          border-radius: 999px;
          white-space: nowrap;
        }
        .ex-tag-main { background: #60511F; color: #FFFFFF; border-color: #60511F; }

        .ex-info h2 {
          font-size: 30px;
          font-weight: 600;
          line-height: 1.25;
          letter-spacing: 0.5px;
          color: #60511F;
        }

        .ex-info p {
          max-width: 520px;
          font-size: 18px;
          line-height: 1.7;
          color: #555555;
        }

        .ex-button {
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
        .ex-arrow { width: 18px; height: 18px; transition: transform 0.25s ease; }
        .ex-button:hover {
          transform: translateY(-2px);
          background: #514418;
          box-shadow: 0 8px 18px rgba(96,81,31,0.18);
        }
        .ex-button:hover .ex-arrow { transform: translateX(3px); }
        .ex-button:active { transform: translateY(0); }

        /* CLOSING */
        .ex-closing {
          padding: 72px 0;
          text-align: center;
          background: #FDF2DE;
          border-top: 1px solid rgba(96,81,31,0.2);
        }
        .ex-closing .ex-line { margin-top: 0; }
        .ex-closing blockquote {
          max-width: 760px;
          margin: 0 auto;
          font-size: 30px;
          font-weight: 500;
          line-height: 1.4;
          color: #60511F;
        }
        .ex-closing p {
          margin-top: 22px;
          font-size: 14px;
          letter-spacing: 3px;
          color: #60615B;
        }

        /* TABLET */
        @media (max-width: 1100px) {
          .ex-hero-grid { grid-template-columns: minmax(0, 1fr) 240px; gap: 36px; }
          .ex-hero-side { padding-left: 28px; }
          .ex-row, .ex-row-reverse { gap: 36px; }
          .ex-image { height: 380px; }
        }

        /* MOBILE */
        @media (max-width: 860px) {
          .ex { font-size: 16px; }
          .ex-container { padding-left: 20px; padding-right: 20px; }

          .ex-hero { padding: 118px 0 44px; }
          .ex-hero-grid { grid-template-columns: 1fr; gap: 32px; }
          .ex-label span { width: 28px; }
          .ex-label p { font-size: 12px; letter-spacing: 2px; }

          .ex-hero h1, .ex-info h2, .ex-hero-side h3, .ex-closing blockquote { font-size: 24px; }
          .ex-lead { font-size: 18px; }
          .ex-text, .ex-info p, .ex-hero-side p, .ex-hero-side span { font-size: 16px; }

          .ex-hero-side {
            padding: 24px 0 0;
            border-left: 0;
            border-top: 1px solid rgba(96,81,31,0.35);
          }

          .ex-band { padding: 36px 0; }

          .ex-row, .ex-row-reverse { grid-template-columns: 1fr; gap: 24px; }
          .ex-row-reverse .ex-image, .ex-row-reverse .ex-info { order: 0; }

          .ex-image { height: auto; aspect-ratio: 4 / 3; }
          .ex-row.from-left .ex-image { transform: translateX(-60px); }
          .ex-row.from-right .ex-image { transform: translateX(60px); }
          .ex-row.is-visible .ex-image { transform: translateX(0); }

          .ex-number { top: 16px; left: 16px; font-size: 14px; }
          .ex-row-reverse .ex-number { left: 16px; right: auto; }

          .ex-tag { font-size: 11px; padding: 5px 10px; letter-spacing: 1px; }
          .ex-line { margin: 20px 0; }
          .ex-button { width: 100%; margin-top: 24px; }

          .ex-closing { padding: 48px 0; }
          .ex-closing p { font-size: 11px; letter-spacing: 2px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ex *, .ex *::before, .ex *::after { transition: none !important; }
          .ex-image, .ex-info { transform: none !important; opacity: 1 !important; }
        }
      `}</style>
    </main>
  );
}