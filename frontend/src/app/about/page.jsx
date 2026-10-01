'use client';

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
THE HERITAGE RESORT — ABOUT PAGE (REDESIGN)

Primary   #60511F
BG 1      #FFFAF0
BG 2      #FDF2DE
Dark      #222222
Body      #555555

Fonts: Cinzel (headings) + Mona Sans (body)
Desktop: max-width 1400px, side padding 32px
Mobile : side padding 20px
Desktop sizes: heading 30px, lead 22px, body 18px
============================================================
*/

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const LeafIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <path d="M39 8C23 8 11 15 9 29c-1 7 3 11 9 11 14-1 21-13 21-32Z" {...stroke} />
    <path d="M10 39C17 28 24 21 35 14" {...stroke} />
  </svg>
);

const PalaceIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <path
      d="M8 40h32M11 40V20h26v20M8 20h32M14 20v-5h20v5M18 15v-5h12v5M23 40V28h2v12M15 26h5M28 26h5"
      {...stroke}
    />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <path
      d="M24 39S8 29 8 18c0-5 4-9 9-9 3 0 6 2 7 5 1-3 4-5 7-5 5 0 9 4 9 9 0 11-16 21-16 21Z"
      {...stroke}
    />
  </svg>
);

const PeopleIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <circle cx="24" cy="15" r="6" {...stroke} />
    <circle cx="11" cy="20" r="4" {...stroke} />
    <circle cx="37" cy="20" r="4" {...stroke} />
    <path d="M12 39c0-8 5-13 12-13s12 5 12 13M4 38c0-5 3-9 8-9M44 38c0-5-3-9-8-9" {...stroke} />
  </svg>
);

function Label({ children, light = false }) {
  return (
    <div className={`ab-label ${light ? 'ab-label-light' : ''}`}>
      <span />
      <p>{children}</p>
    </div>
  );
}

const POINTS = [
  {
    icon: <LeafIcon />,
    title: 'Nature Around You',
    text: 'Lush green surroundings for a peaceful and refreshing stay.',
  },
  {
    icon: <PalaceIcon />,
    title: 'Rajasthani Charm',
    text: "Experience the essence of Jaipur's heritage with a modern touch.",
  },
  {
    icon: <HeartIcon />,
    title: 'Warm Hospitality',
    text: 'Personalized service that makes you feel at home.',
  },
  {
    icon: <PeopleIcon />,
    title: 'Perfect for Every Occasion',
    text: 'Ideal for stays, family gatherings, celebrations, and events.',
  },
];

const STATS = [
  { value: '50+', label: 'Happy Guests' },
  { value: '10+', label: 'Events Hosted' },
  { value: '100%', label: 'Memorable Stays' },
];

export default function AboutPage() {
  return (
    <main className={`ab ${mona.className}`}>
      {/* HERO IMAGE (TOP) */}
      <section className="ab-hero">
        <img src="/gate.png" alt="The Heritage Resort Jaipur gate" />
        <div className="ab-hero-shade" />
        <div className="ab-container ab-hero-content">
          <Label light>ABOUT US</Label>
          <h1 className={cinzel.className}>The Heritage Resort</h1>
          <p>More than a stay, a story in Jaipur.</p>
        </div>
      </section>

      {/* INTRO */}
      <section className="ab-section ab-bg1">
        <div className="ab-container ab-intro">
          <div>
            <Label>WELCOME</Label>
            <h2 className={cinzel.className}>A serene escape in the heart of Jaipur</h2>
            <p className="ab-lead">
              Where nature, hospitality, and heritage come together to create unforgettable
              experiences.
            </p>
            <p className="ab-text">
              The Heritage Resort, Jaipur is a perfect blend of Rajasthani charm and modern
              comfort. Nestled in the peaceful surroundings of Jaisinghpura Road, Bhakrota, our
              resort offers a refreshing retreat away from the city&apos;s chaos, while keeping
              you close to Jaipur&apos;s rich cultural heritage.
            </p>
          </div>

          <aside className="ab-side">
            <p>Rooted in heritage.</p>
            <p>Designed for today.</p>
            <div className="ab-line" />
            <h3 className={cinzel.className}>Jaipur</h3>
            <span>Rajasthan, India</span>
          </aside>
        </div>
      </section>

      {/* STATS */}
      <section className="ab-section ab-bg2 ab-stats-section">
        <div className="ab-container ab-stats">
          {STATS.map((s) => (
            <div className="ab-stat" key={s.label}>
              <strong className={cinzel.className}>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="ab-section ab-bg1">
        <div className="ab-container">
          <div className="ab-head">
            <Label>OUR PHILOSOPHY</Label>
            <h2 className={cinzel.className}>Inspired by Rajasthan. Designed for You.</h2>
            <p className="ab-text">
              We believe in creating spaces that feel genuine — where traditional values meet
              contemporary comfort. Every detail reflects our commitment to warm hospitality,
              natural beauty, and meaningful experiences.
            </p>
          </div>

          <div className="ab-cards">
            {POINTS.map((p) => (
              <div className="ab-card" key={p.title}>
                <div className="ab-icon">{p.icon}</div>
                <h3 className={cinzel.className}>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="ab-section ab-bg2">
        <div className="ab-container ab-vision">
          <div className="ab-quote">
            <blockquote className={cinzel.className}>
              &ldquo;A destination to feel, not just visit.&rdquo;
            </blockquote>
            <div className="ab-line ab-line-center" />
            <p>THE HERITAGE RESORT · JAIPUR</p>
          </div>

          <div className="ab-vision-card">
            <Label light>OUR VISION</Label>
            <h2 className={cinzel.className}>Creating Timeless Experiences</h2>
            <p>
              Our vision is to be Jaipur&apos;s most loved resort — where guests come not just to
              stay, but to experience the perfect balance of nature, heritage, and heartfelt
              hospitality.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL STRIP */}
      <section className="ab-strip">
        <div className="ab-container">
          <span>Nature</span>
          <i>✦</i>
          <span>Heritage</span>
          <i>✦</i>
          <span>Hospitality</span>
        </div>
      </section>

      <style>{`
        .ab, .ab *, .ab *::before, .ab *::after { box-sizing: border-box; }

        .ab {
          width: 100%;
          overflow: hidden;
          background: #FFFAF0;
          color: #222222;
          font-size: 18px;
          line-height: 1.6;
        }

        .ab h1, .ab h2, .ab h3, .ab p, .ab blockquote { margin: 0; }

        .ab-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 32px;
        }

        .ab-bg1 { background: #FFFAF0; }
        .ab-bg2 { background: #FDF2DE; }

        .ab-section { padding: 72px 0; }

        /* LABEL */
        .ab-label {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          
        }
        .ab-label span { width: 40px; height: 1px; background: #60511F; }
        .ab-label p {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 3px;
          color: #60511F;
        }
        .ab-label-light span { background: rgba(255,255,255,0.8); }
        .ab-label-light p { color: #FFFFFF; }

        /* HERO */
        .ab-hero {
          position: relative;
          margin-top: 120px;
          
          width: 100%;
          height: clamp(360px, 46vw, 620px);
          background: #60511F;
        }
        .ab-hero img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .ab-hero-shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(20,15,5,0.72), rgba(20,15,5,0.1) 65%);
        }
        .ab-hero-content {
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          padding-bottom: 48px;
          color: #FFFFFF;
        }
        .ab-hero h1 {
          font-size: 30px;
          font-weight: 600;
          letter-spacing: 2px;
          line-height: 1.25;
        }
        .ab-hero-content > p {
          margin-top: 10px;
          font-size: 18px;
          color: rgba(255,255,255,0.92);
        }

        /* HEADINGS */
        .ab h2 {
          font-size: 30px;
          font-weight: 600;
          line-height: 1.3;
          letter-spacing: 0.5px;
          color: #171A18;
        }

        .ab-lead {
          margin-top: 18px;
          font-size: 22px;
          line-height: 1.5;
          color: #3F3F3A;
        }

        .ab-text {
          margin-top: 18px;
          font-size: 18px;
          line-height: 1.7;
          color: #555555;
        }

        .ab-line {
          width: 56px;
          height: 1px;
          margin: 22px 0;
          background: #60511F;
        }
        .ab-line-center { margin-left: auto; margin-right: auto; }

        /* INTRO */
        .ab-intro {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 320px;
          gap: 56px;
          align-items: start;
        }
        .ab-intro > div { max-width: 820px; }

        .ab-side {
          padding-left: 40px;
          border-left: 1px solid rgba(96,81,31,0.45);
        }
        .ab-side p {
          font-size: 18px;
          letter-spacing: 1px;
          color: #494942;
        }
        .ab-side h3 {
          font-size: 30px;
          font-weight: 600;
          color: #34352F;
        }
        .ab-side span {
          display: block;
          margin-top: 6px;
          font-size: 18px;
          color: #5A5A52;
        }
        .ab-side .ab-line { margin: 22px 0; }

        /* STATS */
        .ab-stats-section { padding: 48px 0; background: #60511F; color: #FFFFFF; }
        .ab-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }
        .ab-stat {
          text-align: center;
          padding: 8px 16px;
        }
        .ab-stat + .ab-stat { border-left: 1px solid rgba(255,255,255,0.35); }
        .ab-stat strong {
          display: block;
          font-size: 30px;
          font-weight: 600;
          line-height: 1.2;
        }
        .ab-stat span {
          display: block;
          margin-top: 6px;
          font-size: 16px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.9);
        }

        /* PHILOSOPHY */
        .ab-head { max-width: 760px; }

        .ab-cards {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 24px;
          margin-top: 44px;
        }
        .ab-card {
          padding: 28px 24px;
          background: #FDF2DE;
          border: 1px solid rgba(96,81,31,0.18);
          border-radius: 6px;
        }
        .ab-icon {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          border-radius: 50%;
          background: #FFFAF0;
          color: #60511F;
        }
        .ab-icon svg { width: 32px; height: 32px; }
        .ab-card h3 {
          font-size: 20px;
          font-weight: 600;
          line-height: 1.3;
          color: #242721;
        }
        .ab-card p {
          margin-top: 10px;
          font-size: 16px;
          line-height: 1.6;
          color: #62645E;
        }

        /* VISION */
        .ab-vision {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .ab-quote {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 48px 32px;
          background: #FFFAF0;
          border: 1px solid rgba(96,81,31,0.2);
          border-radius: 6px;
        }
        .ab-quote blockquote {
          font-size: 30px;
          font-weight: 500;
          line-height: 1.35;
          color: #60511F;
        }
        .ab-quote p {
          font-size: 14px;
          letter-spacing: 3px;
          color: #60615B;
        }
        .ab-vision-card {
          padding: 48px 40px;
          background: #60511F;
          color: #FFFFFF;
          border-radius: 6px;
        }
        .ab-vision-card h2 { color: #FFFFFF; }
        .ab-vision-card > p {
          margin-top: 18px;
          font-size: 18px;
          line-height: 1.7;
          color: rgba(255,255,255,0.92);
        }

        /* STRIP */
        .ab-strip {
          padding: 22px 0;
          background: #FFFAF0;
          border-top: 1px solid rgba(96,81,31,0.2);
        }
        .ab-strip .ab-container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 18px;
        }
        .ab-strip span {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #60511F;
        }
        .ab-strip i { font-style: normal; font-size: 12px; color: rgba(96,81,31,0.55); }

        /* TABLET */
        @media (max-width: 1100px) {
          .ab-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .ab-intro { grid-template-columns: minmax(0, 1fr) 260px; gap: 36px; }
          .ab-side { padding-left: 28px; }
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .ab { font-size: 16px; }
          .ab-container { padding-left: 20px; padding-right: 20px; }
          .ab-section { padding: 48px 0; }

          .ab-hero { height: clamp(320px, 95vw, 480px); }
          .ab-hero-content { padding-bottom: 32px; }
          .ab-hero h1, .ab h2, .ab-side h3, .ab-stat strong, .ab-quote blockquote {
            font-size: 24px;
          }
          .ab-hero-content > p { font-size: 16px; }

          .ab-lead { font-size: 18px; }
          .ab-text, .ab-vision-card > p, .ab-side p, .ab-side span { font-size: 16px; }

          .ab-intro { grid-template-columns: 1fr; gap: 32px; }
          .ab-side {
            padding: 24px 0 0;
            border-left: 0;
            border-top: 1px solid rgba(96,81,31,0.35);
          }

          .ab-stats-section { padding: 36px 0; }
          .ab-stat { padding: 4px 6px; }
          .ab-stat span { font-size: 11px; letter-spacing: 1px; }

          .ab-cards { grid-template-columns: 1fr; gap: 16px; margin-top: 32px; }
          .ab-card { padding: 24px 20px; }
          .ab-card h3 { font-size: 18px; }
          .ab-card p { font-size: 15px; }

          .ab-vision { grid-template-columns: 1fr; gap: 16px; }
          .ab-quote { padding: 40px 20px; }
          .ab-vision-card { padding: 36px 22px; }

          .ab-strip .ab-container { gap: 12px; }
          .ab-strip span { font-size: 11px; letter-spacing: 2px; }
        }

        @media (max-width: 380px) {
          .ab-stat span { font-size: 9px; letter-spacing: 0.5px; }
        }
      `}</style>
    </main>
  );
}