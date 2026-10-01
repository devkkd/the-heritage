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
THE HERITAGE RESORT — WEDDINGS PAGE (REDESIGN)

Primary #60511F | BG 1 #FFFAF0 | BG 2 #FDF2DE
Fonts: Cinzel (headings) + Mona Sans (body)
Desktop: max-width 1400px, side padding 32px
Mobile : side padding 20px
Desktop sizes: heading 30px, lead 22px, body 18px
Mobile sizes : heading 24px, lead 18px, body 16px

Images: /experience/1.jpg, /experience/2.jpg

Section order (bg alternate):
Hero #FFFAF0 → Row 1 #FDF2DE → Row 2 #FFFAF0
→ Highlights #FDF2DE → Closing #FFFAF0

Header fixed hai (desktop ~124px, mobile ~78px), isliye hero
mein top padding di gayi hai.

WhatsApp: WHATSAPP_NUMBER ko real number se replace karo
(bina + aur space ke), e.g. '919876543210'
============================================================
*/

const WHATSAPP_NUMBER = '34610373144';

const WEDDINGS = [
  {
    id: '01',
    name: 'A Celebration to Remember',
    image: '/experience/1.jpg',
    eyebrow: 'WEDDINGS',
    tags: ['CELEBRATIONS', 'PRIVATE EVENTS'],
    description:
      'Bring your closest people together for a wedding celebration shaped around the timeless character of Rajasthan. From intimate gatherings to beautifully planned occasions, every moment can be created with thoughtful hospitality, elegant settings and a relaxed sense of grandeur.',
  },
  {
    id: '02',
    name: 'An Evening of Romance',
    image: '/experience/2.jpg',
    eyebrow: 'WEDDING EVENINGS',
    tags: ['DINNER', 'SPECIAL MOMENTS'],
    description:
      'Let the evening unfold with warm lights, beautiful surroundings and the unmistakable atmosphere of Jaipur. From an intimate dinner to a memorable wedding evening, create a celebration filled with togetherness, thoughtful details and moments worth remembering.',
  },
];

const HIGHLIGHTS = [
  {
    title: 'Intimate Gatherings',
    text: 'Close family and friends, together in a warm and relaxed setting.',
  },
  {
    title: 'Elegant Settings',
    text: 'Beautiful surroundings shaped by the timeless character of Rajasthan.',
  },
  {
    title: 'Thoughtful Hospitality',
    text: 'Every detail created with care, from the first welcome to the last dance.',
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="wd-arrow">
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
    `Hello The Heritage Resort Jaipur, I would like to inquire about weddings and celebrations` +
    (name ? `, specifically ${name}. ` : '. ') +
    `Please share the available venues, packages, inclusions, capacity, dates and booking details.`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function WeddingRow({ item, index }) {
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
    <section className={`wd-band ${reverse ? 'wd-band-b' : 'wd-band-a'}`}>
      <div className="wd-container">
        <article
          ref={ref}
          className={`wd-row ${reverse ? 'wd-row-reverse from-right' : 'from-left'}`}
        >
          <div className="wd-image">
            <Image
              src={item.image}
              alt={`${item.name} at The Heritage Resort Jaipur`}
              fill
              sizes="(max-width: 860px) 100vw, 660px"
              quality={90}
              priority={index === 0}
            />
            <span className={`wd-number ${cinzel.className}`}>{item.id}</span>
          </div>

          <div className="wd-info">
            <div className="wd-tags">
              <span className="wd-tag wd-tag-main">{item.eyebrow}</span>
              {item.tags.map((tag) => (
                <span className="wd-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>

            <h2 className={cinzel.className}>{item.name}</h2>

            <div className="wd-line" />

            <p>{item.description}</p>

            <button
              type="button"
              className="wd-button"
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

export default function WeddingsPage() {
  return (
    <main className={`wd ${mona.className}`}>
      {/* HERO */}
      <section className="wd-hero">
        <div className="wd-container wd-hero-grid">
          <div className="wd-hero-main">
            <div className="wd-label">
              <span />
              <p>WEDDINGS AT THE HERITAGE RESORT</p>
            </div>

            <h1 className={cinzel.className}>A Day to Remember</h1>

            <p className="wd-lead">
              Celebrate your most beautiful moments in the timeless atmosphere of Rajasthan.
            </p>

            <p className="wd-text">
              With thoughtful hospitality, elegant settings and memories made together, love
              becomes a story worth telling.
            </p>
          </div>

          <aside className="wd-hero-side">
            <p>Timeless. Romantic.</p>
            <p>Intimate weddings.</p>
            <div className="wd-line" />
            <h3 className={cinzel.className}>Jaipur</h3>
            <span>Rajasthan, India</span>
          </aside>
        </div>
      </section>

      {/* WEDDING ROWS */}
      {WEDDINGS.map((item, index) => (
        <WeddingRow key={item.id} item={item} index={index} />
      ))}

      {/* HIGHLIGHTS */}
      <section className="wd-highlights">
        <div className="wd-container">
          <div className="wd-head">
            <div className="wd-label">
              <span />
              <p>WHY CELEBRATE WITH US</p>
            </div>
            <h2 className={cinzel.className}>Every detail, made with care</h2>
          </div>

          <div className="wd-cards">
            {HIGHLIGHTS.map((h, i) => (
              <div className="wd-card" key={h.title}>
                <span className={`wd-card-num ${cinzel.className}`}>0{i + 1}</span>
                <h3 className={cinzel.className}>{h.title}</h3>
                <p>{h.text}</p>
              </div>
            ))}
          </div>

          <div className="wd-cta">
            <button type="button" className="wd-button" onClick={() => openInquiry('')}>
              PLAN YOUR CELEBRATION
              <ArrowIcon />
            </button>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="wd-closing">
        <div className="wd-container">
          <div className="wd-line wd-line-center" />
          <blockquote className={cinzel.className}>
            &ldquo;Some celebrations become memories, others become part of your
            story.&rdquo;
          </blockquote>
          <p>THE HERITAGE RESORT · JAIPUR</p>
        </div>
      </section>

      <style>{`
        .wd, .wd *, .wd *::before, .wd *::after { box-sizing: border-box; }

        .wd {
          width: 100%;
          overflow: hidden;
          background: #FFFAF0;
          color: #555555;
          font-size: 18px;
          line-height: 1.6;
        }

        .wd h1, .wd h2, .wd h3, .wd p, .wd blockquote { margin: 0; }
        .wd button { font: inherit; }

        .wd-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 32px;
        }

        .wd-line {
          width: 56px;
          height: 1px;
          margin: 24px 0;
          background: #60511F;
        }
        .wd-line-center { margin-left: auto; margin-right: auto; }

        .wd-label {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }
        .wd-label span { width: 40px; height: 1px; background: #60511F; flex: 0 0 auto; }
        .wd-label p {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 3px;
          color: #60511F;
        }

        /* HERO (fixed header ke liye top padding) */
        .wd-hero {
          padding: 180px 0 64px;
          background: #FFFAF0;
          border-bottom: 1px solid rgba(96,81,31,0.18);
        }

        .wd-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 300px;
          gap: 56px;
          align-items: start;
        }

        .wd-hero h1 {
          font-size: 30px;
          font-weight: 600;
          line-height: 1.3;
          letter-spacing: 0.5px;
          color: #171A18;
        }

        .wd-lead {
          max-width: 760px;
          margin-top: 18px;
          font-size: 22px;
          line-height: 1.5;
          color: #3F3F3A;
        }

        .wd-text {
          max-width: 760px;
          margin-top: 14px;
          font-size: 18px;
          line-height: 1.7;
          color: #555555;
        }

        .wd-hero-side {
          padding-left: 36px;
          border-left: 1px solid rgba(96,81,31,0.45);
        }
        .wd-hero-side p { font-size: 18px; letter-spacing: 1px; color: #494942; }
        .wd-hero-side h3 { font-size: 30px; font-weight: 600; color: #34352F; }
        .wd-hero-side span { display: block; margin-top: 6px; font-size: 18px; color: #5A5A52; }

        /* BANDS (alternate bg) */
        .wd-band { padding: 64px 0; overflow: hidden; }
        .wd-band-a { background: #FDF2DE; }
        .wd-band-b { background: #FFFAF0; }

        .wd-row {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
          gap: 56px;
          align-items: center;
        }
        .wd-row-reverse { grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); }
        .wd-row-reverse .wd-image { order: 2; }
        .wd-row-reverse .wd-info { order: 1; }

        /* IMAGE */
        .wd-image {
          position: relative;
          width: 100%;
          height: 440px;
          overflow: hidden;
          border-radius: 8px;
          background: #EEE6D2;
          opacity: 0;
          transition: transform 1s cubic-bezier(.16,1,.3,1), opacity 0.7s ease;
        }
        .wd-row.from-left .wd-image { transform: translateX(-100px); }
        .wd-row.from-right .wd-image { transform: translateX(100px); }
        .wd-row.is-visible .wd-image { transform: translateX(0); opacity: 1; }

        .wd-image img {
          object-fit: cover;
          object-position: center;
          transition: transform 1.2s cubic-bezier(.16,1,.3,1);
        }
        .wd-image:hover img { transform: scale(1.03); }

        .wd-number {
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
        .wd-row-reverse .wd-number { left: auto; right: 20px; }

        /* INFO */
        .wd-info {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.7s ease 0.12s, transform 0.8s cubic-bezier(.16,1,.3,1) 0.12s;
        }
        .wd-row.is-visible .wd-info { opacity: 1; transform: translateY(0); }

        .wd-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
        .wd-tag {
          padding: 6px 12px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 1.5px;
          color: #60511F;
          border: 1px solid rgba(96,81,31,0.3);
          border-radius: 999px;
          white-space: nowrap;
        }
        .wd-tag-main { background: #60511F; color: #FFFFFF; border-color: #60511F; }

        .wd-info h2 {
          font-size: 30px;
          font-weight: 600;
          line-height: 1.25;
          letter-spacing: 0.5px;
          color: #60511F;
        }

        .wd-info p {
          max-width: 520px;
          font-size: 18px;
          line-height: 1.7;
          color: #555555;
        }

        /* BUTTON */
        .wd-button {
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
        .wd-arrow { width: 18px; height: 18px; transition: transform 0.25s ease; }
        .wd-button:hover {
          transform: translateY(-2px);
          background: #514418;
          box-shadow: 0 8px 18px rgba(96,81,31,0.18);
        }
        .wd-button:hover .wd-arrow { transform: translateX(3px); }
        .wd-button:active { transform: translateY(0); }

        /* HIGHLIGHTS */
        .wd-highlights {
          padding: 72px 0;
          background: #FDF2DE;
        }
        .wd-head { max-width: 760px; }
        .wd-head h2 {
          font-size: 30px;
          font-weight: 600;
          line-height: 1.3;
          letter-spacing: 0.5px;
          color: #171A18;
        }

        .wd-cards {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          margin-top: 40px;
        }
        .wd-card {
          padding: 28px 26px;
          background: #FFFAF0;
          border: 1px solid rgba(96,81,31,0.18);
          border-radius: 6px;
        }
        .wd-card-num {
          display: block;
          margin-bottom: 14px;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 2px;
          color: #60511F;
        }
        .wd-card h3 {
          font-size: 20px;
          font-weight: 600;
          line-height: 1.3;
          color: #242721;
        }
        .wd-card p {
          margin-top: 10px;
          font-size: 16px;
          line-height: 1.6;
          color: #62645E;
        }
        .wd-cta { margin-top: 12px; }

        /* CLOSING */
        .wd-closing {
          padding: 72px 0;
          text-align: center;
          background: #FFFAF0;
          border-top: 1px solid rgba(96,81,31,0.2);
        }
        .wd-closing .wd-line { margin-top: 0; }
        .wd-closing blockquote {
          max-width: 760px;
          margin: 0 auto;
          font-size: 30px;
          font-weight: 500;
          line-height: 1.4;
          color: #60511F;
        }
        .wd-closing p {
          margin-top: 22px;
          font-size: 14px;
          letter-spacing: 3px;
          color: #60615B;
        }

        /* TABLET */
        @media (max-width: 1100px) {
          .wd-hero-grid { grid-template-columns: minmax(0, 1fr) 240px; gap: 36px; }
          .wd-hero-side { padding-left: 28px; }
          .wd-row, .wd-row-reverse { gap: 36px; }
          .wd-image { height: 380px; }
          .wd-cards { gap: 16px; }
          .wd-card { padding: 24px 20px; }
        }

        /* MOBILE */
        @media (max-width: 860px) {
          .wd { font-size: 16px; }
          .wd-container { padding-left: 20px; padding-right: 20px; }

          .wd-hero { padding: 118px 0 44px; }
          .wd-hero-grid { grid-template-columns: 1fr; gap: 32px; }
          .wd-label span { width: 28px; }
          .wd-label p { font-size: 12px; letter-spacing: 2px; }

          .wd-hero h1, .wd-info h2, .wd-head h2, .wd-hero-side h3, .wd-closing blockquote {
            font-size: 24px;
          }
          .wd-lead { font-size: 18px; }
          .wd-text, .wd-info p, .wd-hero-side p, .wd-hero-side span { font-size: 16px; }

          .wd-hero-side {
            padding: 24px 0 0;
            border-left: 0;
            border-top: 1px solid rgba(96,81,31,0.35);
          }

          .wd-band { padding: 36px 0; }

          .wd-row, .wd-row-reverse { grid-template-columns: 1fr; gap: 24px; }
          .wd-row-reverse .wd-image, .wd-row-reverse .wd-info { order: 0; }

          .wd-image { height: auto; aspect-ratio: 4 / 3; }
          .wd-row.from-left .wd-image { transform: translateX(-60px); }
          .wd-row.from-right .wd-image { transform: translateX(60px); }
          .wd-row.is-visible .wd-image { transform: translateX(0); }

          .wd-number { top: 16px; left: 16px; font-size: 14px; }
          .wd-row-reverse .wd-number { left: 16px; right: auto; }

          .wd-tag { font-size: 11px; padding: 5px 10px; letter-spacing: 1px; }
          .wd-line { margin: 20px 0; }
          .wd-button { width: 100%; margin-top: 24px; }

          .wd-highlights { padding: 48px 0; }
          .wd-cards { grid-template-columns: 1fr; gap: 14px; margin-top: 28px; }
          .wd-card { padding: 22px 20px; }
          .wd-card h3 { font-size: 18px; }
          .wd-card p { font-size: 15px; }
          .wd-cta { margin-top: 10px; }

          .wd-closing { padding: 48px 0; }
          .wd-closing p { font-size: 11px; letter-spacing: 2px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .wd *, .wd *::before, .wd *::after { transition: none !important; }
          .wd-image, .wd-info { transform: none !important; opacity: 1 !important; }
        }
      `}</style>
    </main>
  );
}