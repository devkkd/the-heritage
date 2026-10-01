'use client';

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
THE HERITAGE RESORT — ROOMS PAGE (REDESIGN)

Primary #60511F | BG 1 #FFFAF0 | BG 2 #FDF2DE
Fonts: Cinzel (headings) + Mona Sans (body)
Desktop: max-width 1400px, side padding 32px
Mobile : side padding 20px
Desktop sizes: heading 30px, lead 22px, body 18px
Layout: alternating image / text rows
============================================================
*/

const ROOMS = [
  {
    image: '/newhome/SUITES/1.png',
    title: 'Narlai Suite',
    size: '2002 ft²',
    guests: '2 Guests',
    bed: '1 King Bed',
    description:
      'Encompassing over 2,000 sq ft. of living space, and situated at the highest altitude, the suites exemplify understated luxury, elegance and exclusivity.',
  },
  {
    image: '/newhome/SUITES/2.png',
    title: 'Junior Suite',
    size: '1360 ft²',
    guests: '2 Guests',
    bed: '1 King Bed',
    description:
      'Ideal for those looking for complete privacy and seclusion, and a sumptuous Rajputana regal experience. A private balcony offers stunning glimpses of the medieval village, Elephant Hill, and the placid pool.',
  },
  {
    image: '/newhome/SUITES/3.png',
    title: 'Luxury Grand Heritage Suite',
    size: '650 ft²',
    guests: '2 Guests',
    bed: '1 King Bed',
    description:
      'Nestled in our contemporary wing, our Luxury Grand Heritage rooms are furnished with opulent interiors and innovative local materials. Traditional and modern aesthetic sensibilities intertwine to form the cornerstone of the décor.',
  },
  {
    image: '/newhome/SUITES/4.png',
    title: 'Heritage Room',
    size: '550 ft²',
    guests: '2 Guests',
    bed: '1 King Bed',
    description:
      'A refined heritage stay combining the character of Rajasthan with thoughtful comfort, elegant details and a calm atmosphere for an intimate escape.',
  },
];

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

function RoomRow({ room, index }) {
  const reverse = index % 2 === 1;
  const number = String(index + 1).padStart(2, '0');

  return (
    <section className={`rm-band ${reverse ? 'rm-band-b' : 'rm-band-a'}`}>
    <div className="rm-container">
    <article className={`rm-row ${reverse ? 'rm-row-reverse' : ''}`}>
      <div className="rm-image">
        <Image
          src={room.image}
          alt={room.title}
          fill
          quality={90}
          sizes="(max-width: 860px) 100vw, 660px"
        />
        <span className={`rm-number ${cinzel.className}`}>{number}</span>
      </div>

      <div className="rm-info">
        <h2 className={cinzel.className}>{room.title}</h2>

        <div className="rm-meta">
          <div>
            <SizeIcon />
            <span>{room.size}</span>
          </div>
          <div>
            <GuestIcon />
            <span>{room.guests}</span>
          </div>
          <div>
            <BedIcon />
            <span>{room.bed}</span>
          </div>
        </div>

        <div className="rm-line" />

        <p>{room.description}</p>
      </div>
    </article>
    </div>
    </section>
  );
}

export default function RoomsPage() {
  return (
    <main className={`rm ${mona.className}`}>
      {/* HEADING */}
      <section className="rm-hero">
        <div className="rm-container">
          <div className="rm-label">
            <span />
            <p>OUR SUITES</p>
            <span />
          </div>

          <h1 className={cinzel.className}>Discover our resplendent heritage suites</h1>

          <p className="rm-lead">and feel like royalty throughout your stay</p>
        </div>
      </section>

      {/* ROOMS */}
      {ROOMS.map((room, index) => (
        <RoomRow key={`${room.title}-${index}`} room={room} index={index} />
      ))}

      {/* STRIP */}
      <section className="rm-strip">
        <div className="rm-container">
          <span>Nature</span>
          <i>✦</i>
          <span>Heritage</span>
          <i>✦</i>
          <span>Hospitality</span>
        </div>
      </section>

      <style>{`
        .rm, .rm *, .rm *::before, .rm *::after { box-sizing: border-box; }

        .rm {
          width: 100%;
          overflow: hidden;
          background: #FFFAF0;
          color: #555555;
          font-size: 18px;
          line-height: 1.6;
        }

        .rm h1, .rm h2, .rm p { margin: 0; }

        .rm-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 32px;
        }

        /* HERO */
        .rm-hero {
          padding: 172px 0 56px;
          text-align: center;
          background: #FFFAF0;
          border-bottom: 1px solid rgba(96,81,31,0.18);
        }

        .rm-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-bottom: 18px;
        }
        .rm-label span { width: 44px; height: 1px; background: #60511F; }
        .rm-label p {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 4px;
          color: #60511F;
        }

        .rm-hero h1 {
          max-width: 760px;
          margin: 0 auto;
          font-size: 30px;
          font-weight: 600;
          line-height: 1.3;
          letter-spacing: 0.5px;
          color: #171A18;
        }

        .rm-lead {
          margin-top: 14px;
          font-size: 22px;
          line-height: 1.4;
          color: #6B6861;
        }

        /* LIST */
        .rm-band { padding: 64px 0; }
        .rm-band-a { background: #FDF2DE; }
        .rm-band-b { background: #FFFAF0; }
        .rm-band-b .rm-meta div { background: #FDF2DE; }

        .rm-row {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
          align-items: center;
          gap: 48px;
        }

        .rm-row-reverse { grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); }
        .rm-row-reverse .rm-image { order: 2; }
        .rm-row-reverse .rm-info { order: 1; }

        .rm-image {
          position: relative;
          min-height: 420px;
          background: #EEE6D2;
          overflow: hidden;
          border-radius: 8px;
        }
        .rm-image img {
          object-fit: cover;
          object-position: center;
          transition: transform 0.6s ease;
        }
        .rm-row:hover .rm-image img { transform: scale(1.03); }

        .rm-number {
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
        .rm-row-reverse .rm-number { left: auto; right: 20px; }

        .rm-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0;
        }

        .rm-info h2 {
          font-size: 30px;
          font-weight: 600;
          line-height: 1.25;
          letter-spacing: 0.5px;
          color: #60511F;
        }

        .rm-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 22px;
        }
        .rm-meta div {
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
        .rm-meta svg { width: 22px; height: 22px; flex: 0 0 auto; color: #60511F; }

        .rm-line {
          width: 56px;
          height: 1px;
          margin: 26px 0;
          background: #60511F;
        }

        .rm-info p {
          max-width: 520px;
          font-size: 18px;
          line-height: 1.7;
          color: #555555;
        }

        /* STRIP */
        .rm-strip {
          padding: 22px 0;
          background: #FDF2DE;
          border-top: 1px solid rgba(96,81,31,0.2);
        }
        .rm-strip .rm-container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 18px;
        }
        .rm-strip span {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #60511F;
        }
        .rm-strip i { font-style: normal; font-size: 12px; color: rgba(96,81,31,0.55); }

        /* TABLET */
        @media (max-width: 1000px) {
          .rm-row { gap: 32px; }
          .rm-image { min-height: 380px; }
        }

        /* MOBILE */
        @media (max-width: 860px) {
          .rm { font-size: 16px; }
          .rm-container { padding-left: 20px; padding-right: 20px; }

          .rm-hero { padding: 48px 0 40px; }
          .rm-hero h1, .rm-info h2 { font-size: 24px; }
          .rm-lead { font-size: 18px; }
          .rm-label span { width: 28px; }
          .rm-label p { font-size: 12px; letter-spacing: 3px; }

          .rm-band { padding: 36px 0; }

          .rm-row,
          .rm-row-reverse { grid-template-columns: 1fr; }
          .rm-row, .rm-row-reverse { gap: 24px; }

          .rm-row-reverse .rm-image,
          .rm-row-reverse .rm-info { order: 0; }
          .rm-row-reverse .rm-number { left: 16px; right: auto; }

          .rm-image { min-height: 0; aspect-ratio: 4 / 3; }
          .rm-number { top: 16px; left: 16px; font-size: 14px; }

          .rm-info { padding: 0; }
          .rm-meta { gap: 8px; margin-top: 18px; }
          .rm-meta div { padding: 6px 12px; font-size: 14px; }
          .rm-meta svg { width: 18px; height: 18px; }
          .rm-line { margin: 20px 0; }
          .rm-info p { font-size: 16px; }

          .rm-strip .rm-container { gap: 12px; }
          .rm-strip span { font-size: 11px; letter-spacing: 2px; }
        }

        @media (max-width: 380px) {
          .rm-meta div { font-size: 13px; padding: 6px 10px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .rm *, .rm *::before, .rm *::after { transition: none !important; }
        }
      `}</style>
    </main>
  );
}