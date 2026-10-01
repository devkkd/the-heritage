'use client';

import { useState } from 'react';
import Link from 'next/link';
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
THE HERITAGE RESORT — FAQ PAGE

Primary #60511F | BG 1 #FFFAF0 | BG 2 #FDF2DE
Fonts: Cinzel (headings) + Mona Sans (body)
Desktop: max-width 1400px, side padding 32px
Mobile : side padding 20px
Desktop sizes: heading 30px, lead 22px, body 18px
Mobile sizes : heading 24px, lead 18px, body 16px

Section order (bg alternate):
Hero #FFFAF0 -> FAQ #FDF2DE (cards #FFFAF0) -> CTA #FFFAF0 -> Strip #FDF2DE

Header fixed hai, isliye hero mein top padding di gayi hai.

NOTE: Neeche ke saare answers sample hain. Timings, policies,
charges aur services apne resort ke hisaab se zaroor edit karo.
============================================================
*/

const FAQ_DATA = [
  {
    id: 'stay',
    label: 'Stay & Rooms',
    items: [
      {
        q: 'What types of rooms and suites do you offer?',
        a: 'We offer thoughtfully restored Heritage Suites and comfortable air-conditioned rooms, all blending traditional Rajasthani character with modern comforts. Please visit our Rooms & Suites page for the full list, or contact us to help you choose the right one for your group.',
      },
      {
        q: 'What are the check-in and check-out timings?',
        a: 'Standard check-in is from 2:00 PM and check-out is until 11:00 AM. If you would like an early check-in or a late check-out, let us know in advance and we will do our best to arrange it, subject to availability.',
      },
      {
        q: 'Are the rooms air-conditioned?',
        a: 'Yes, our rooms and suites are air-conditioned and come with comfortable bedding, a private bathroom and the essential amenities you need for a relaxed stay.',
      },
      {
        q: 'Can we request an extra bed for children or family members?',
        a: 'Yes, an extra bed can be arranged in most rooms on request. Charges may apply, so please mention it while booking so we can prepare the room before you arrive.',
      },
      {
        q: 'Is the resort suitable for families with children and senior guests?',
        a: 'Absolutely. The resort has open courtyards, gardens and calm spaces that suit guests of all ages. If you have specific needs, such as ground-floor rooms, please tell us when booking.',
      },
    ],
  },
  {
    id: 'dining',
    label: 'Dining',
    items: [
      {
        q: 'What kind of food do you serve?',
        a: 'Our kitchen is inspired by Rajasthan, with regional classics, familiar North Indian favourites and freshly prepared seasonal dishes. Vegetarian options are always available.',
      },
      {
        q: 'Is breakfast included in the room tariff?',
        a: 'Breakfast inclusions depend on the room plan you choose at the time of booking. Please confirm the plan with our team when reserving, and we will be happy to clarify.',
      },
      {
        q: 'Can you accommodate dietary requirements or allergies?',
        a: 'Yes. Please share any allergies or dietary preferences, such as Jain, vegan or gluten-free, in advance and our chefs will plan accordingly.',
      },
      {
        q: 'Can we arrange a private or candlelight dinner?',
        a: 'Yes, we can arrange private dining for celebrations such as anniversaries and birthdays. Contact us a few days ahead with your preferences and we will set it up.',
      },
    ],
  },
  {
    id: 'events',
    label: 'Weddings & Events',
    items: [
      {
        q: 'Do you host weddings and large celebrations?',
        a: 'Yes. With our gardens, open lawns and banquet hall, The Heritage Resort is a beautiful setting for weddings, receptions, engagements and other family celebrations.',
      },
      {
        q: 'What is the guest capacity for events?',
        a: 'Capacity depends on the venue space and the type of event. Share your expected guest count and date with us and we will suggest the best setup for you.',
      },
      {
        q: 'Do you offer decoration, catering and planning support?',
        a: 'Our team assists with catering, decor coordination and event flow, and can work with your preferred vendors. Contact us to discuss packages for your event.',
      },
      {
        q: 'Can we host corporate events, birthdays or small gatherings?',
        a: 'Of course. We host corporate get-togethers, birthday parties, kitty parties and intimate gatherings. Tell us what you have in mind and we will tailor a plan.',
      },
    ],
  },
  {
    id: 'booking',
    label: 'Booking & Policies',
    items: [
      {
        q: 'How can I make a reservation?',
        a: 'You can use the Book Now button on our website or reach out through the Contact page. Our team will confirm availability and guide you through the booking.',
      },
      {
        q: 'What is your cancellation and refund policy?',
        a: 'Cancellation terms vary by season and booking type. Please check the terms shared at the time of booking, or contact us and we will explain them clearly before you confirm.',
      },
      {
        q: 'What documents are required at check-in?',
        a: 'All guests must carry a valid government-issued photo ID, such as an Aadhaar card, passport or driving licence. Foreign guests are required to carry their passport and visa.',
      },
      {
        q: 'Is parking available at the resort?',
        a: 'Yes, there is ample parking space within the resort premises for guests and event visitors.',
      },
      {
        q: 'Are pets allowed?',
        a: 'Pet policies can vary, so please contact us before your visit and we will let you know what can be arranged.',
      },
    ],
  },
];

const ALL_ITEMS = FAQ_DATA.flatMap((c) => c.items);

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: ALL_ITEMS.map((i) => ({
    '@type': 'Question',
    name: i.q,
    acceptedAnswer: { '@type': 'Answer', text: i.a },
  })),
};

function FaqItem({ id, index, item, open, onToggle }) {
  const btnId = `${id}-btn`;
  const panelId = `${id}-panel`;

  return (
    <div
      className={`fq-item ${open ? 'is-open' : ''}`}
      style={{ '--i': index }}
    >
      <h3>
        <button
          type="button"
          id={btnId}
          className="fq-trigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className={`fq-num ${cinzel.className}`}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="fq-q">{item.q}</span>
          <span className="fq-icon" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className="fq-panel"
      >
        <div className="fq-panel-inner">
          <p>{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function HeritageFaqPage() {
  const [activeCat, setActiveCat] = useState(FAQ_DATA[0].id);
  const [openIndex, setOpenIndex] = useState(0);

  const category = FAQ_DATA.find((c) => c.id === activeCat);

  const changeCategory = (id) => {
    setActiveCat(id);
    setOpenIndex(0);
  };

  return (
    <main className={`fq ${mona.className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* HERO */}
      <section className="fq-hero">
        <div className="fq-container">
          <div className="fq-label">
            <span />
            <p>THE HERITAGE RESORT</p>
            <span />
          </div>

          <h1 className={cinzel.className}>Frequently Asked Questions</h1>

          <p className="fq-lead">
            Everything you may wish to know before your stay, from rooms and dining to
            celebrations and bookings, answered in one place.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="fq-section" aria-label="Frequently asked questions">
        <div className="fq-container fq-layout">
          {/* CATEGORY NAV */}
          <aside className="fq-side">
            <div className="fq-side-inner">
              <p className={`fq-side-title ${cinzel.className}`}>BROWSE TOPICS</p>

              <div className="fq-tabs" role="tablist" aria-label="FAQ topics">
                {FAQ_DATA.map((cat) => (
                  <button
                    type="button"
                    key={cat.id}
                    role="tab"
                    aria-selected={cat.id === activeCat}
                    className={`fq-tab ${cat.id === activeCat ? 'is-active' : ''}`}
                    onClick={() => changeCategory(cat.id)}
                  >
                    <span>{cat.label}</span>
                    <em>{String(cat.items.length).padStart(2, '0')}</em>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ACCORDION */}
          <div className="fq-list" key={category.id}>
            <div className="fq-list-head">
              <div className="fq-top-line" />
              <h2 className={cinzel.className}>{category.label}</h2>
            </div>

            {category.items.map((item, index) => (
              <FaqItem
                key={`${category.id}-${index}`}
                id={`${category.id}-${index}`}
                index={index}
                item={item}
                open={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="fq-cta">
        <div className="fq-container fq-cta-inner">
          <div className="fq-label">
            <span />
            <p>NEED MORE HELP?</p>
            <span />
          </div>

          <h2 className={cinzel.className}>Still Have A Question?</h2>

          <p className="fq-lead">
            Our team is happy to help you plan the perfect stay. Reach out and we will get
            back to you at the earliest.
          </p>

          <div className="fq-actions">
            <Link href="/contact" className="fq-btn fq-btn-solid">
              CONTACT US
            </Link>
            <Link href="/gallery" className="fq-btn">
              VIEW GALLERY
            </Link>
          </div>
        </div>
      </section>

      {/* STRIP */}
      <section className="fq-strip">
        <div className="fq-container">
          <span>Nature</span>
          <i>✦</i>
          <span>Heritage</span>
          <i>✦</i>
          <span>Hospitality</span>
        </div>
      </section>

      <style>{`
        .fq, .fq *, .fq *::before, .fq *::after { box-sizing: border-box; }

        .fq {
          width: 100%;
          overflow: hidden;
          background: #FFFAF0;
          color: #555555;
          font-size: 18px;
          line-height: 1.6;
        }

        .fq h1, .fq h2, .fq h3, .fq p { margin: 0; }

        .fq-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 32px;
        }

        /* LABEL */
        .fq-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-bottom: 18px;
        }
        .fq-label span { width: 44px; height: 1px; background: #60511F; }
        .fq-label p {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 3px;
          color: #60511F;
        }

        /* HERO (fixed header ke liye top padding) */
        .fq-hero {
          padding: 180px 0 64px;
          text-align: center;
          background: #FFFAF0;
          border-bottom: 1px solid rgba(96,81,31,0.18);
        }

        .fq-hero h1 {
          max-width: 760px;
          margin: 0 auto;
          font-size: 30px;
          font-weight: 600;
          line-height: 1.3;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #60511F;
        }

        .fq .fq-lead {
          max-width: 720px;
          margin: 18px auto 0;
          font-size: 22px;
          line-height: 1.5;
          color: #3F3F3A;
        }

        /* FAQ SECTION */
        .fq-section { padding: 72px 0 88px; background: #FDF2DE; }

        .fq-layout {
          display: grid;
          grid-template-columns: 300px minmax(0, 1fr);
          column-gap: 56px;
          align-items: start;
        }

        /* SIDE NAV */
        .fq-side { min-width: 0; }
        .fq-side-inner {
          position: sticky;
          top: 150px;
          padding: 28px 24px;
          background: #FFFAF0;
          border: 1px solid rgba(96,81,31,0.16);
          border-radius: 6px;
          box-shadow: 0 14px 28px rgba(64,53,24,0.07);
        }
        .fq-side-title {
          margin-bottom: 18px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 3px;
          color: #60511F;
        }

        .fq-tabs { display: flex; flex-direction: column; gap: 6px; }

        .fq-tab {
          width: 100%;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          font-family: inherit;
          font-size: 16px;
          font-weight: 500;
          line-height: 1.3;
          text-align: left;
          color: #3F3F3A;
          background: transparent;
          border: 1px solid transparent;
          border-left: 2px solid rgba(96,81,31,0.25);
          border-radius: 3px;
          cursor: pointer;
          transition: color 0.3s ease, background 0.3s ease, border-color 0.3s ease;
        }
        .fq-tab em {
          font-style: normal;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1px;
          color: rgba(96,81,31,0.6);
        }
        .fq-tab:hover { background: rgba(96,81,31,0.06); color: #60511F; }
        .fq-tab.is-active {
          color: #60511F;
          font-weight: 600;
          background: #FDF2DE;
          border-left-color: #60511F;
        }
        .fq-tab:focus-visible,
        .fq-trigger:focus-visible,
        .fq-btn:focus-visible {
          outline: 2px solid #60511F;
          outline-offset: 2px;
        }

        /* LIST */
        .fq-list { min-width: 0; display: flex; flex-direction: column; gap: 16px; }

        .fq-list-head { margin-bottom: 10px; }
        .fq-top-line {
          width: 52px;
          height: 1px;
          margin-bottom: 16px;
          background: #60511F;
        }
        .fq-list-head h2 {
          font-size: 30px;
          font-weight: 600;
          line-height: 1.3;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #60511F;
        }

        /* ITEM */
        .fq-item {
          background: #FFFAF0;
          border: 1px solid rgba(96,81,31,0.16);
          border-radius: 6px;
          box-shadow: 0 10px 22px rgba(64,53,24,0.05);
          opacity: 0;
          transform: translateY(20px);
          animation: fqIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: calc(var(--i) * 80ms);
          transition: box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .fq-item:hover { box-shadow: 0 16px 30px rgba(64,53,24,0.1); }
        .fq-item.is-open {
          border-color: rgba(96,81,31,0.45);
          box-shadow: 0 18px 34px rgba(64,53,24,0.12);
        }

        .fq-trigger {
          width: 100%;
          padding: 24px 26px;
          display: flex;
          align-items: center;
          gap: 20px;
          font-family: inherit;
          text-align: left;
          color: inherit;
          background: transparent;
          border: 0;
          border-radius: 6px;
          cursor: pointer;
        }

        .fq-num {
          flex: 0 0 auto;
          min-width: 34px;
          font-size: 20px;
          font-weight: 600;
          letter-spacing: 1px;
          color: rgba(96,81,31,0.5);
          transition: color 0.4s ease;
        }
        .fq-item.is-open .fq-num { color: #60511F; }

        .fq-q {
          flex: 1;
          min-width: 0;
          font-size: 18px;
          font-weight: 600;
          line-height: 1.45;
          color: #3F3F3A;
          transition: color 0.4s ease;
        }
        .fq-trigger:hover .fq-q,
        .fq-item.is-open .fq-q { color: #60511F; }

        .fq-icon {
          position: relative;
          flex: 0 0 auto;
          width: 38px;
          height: 38px;
          border: 1px solid rgba(96,81,31,0.5);
          border-radius: 50%;
          transition: background 0.4s ease, border-color 0.4s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .fq-icon i {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 14px;
          height: 1.5px;
          margin: -0.75px 0 0 -7px;
          background: #60511F;
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), background 0.4s ease;
        }
        .fq-icon i:last-child { transform: rotate(90deg); }
        .fq-trigger:hover .fq-icon { background: rgba(96,81,31,0.08); }
        .fq-item.is-open .fq-icon { background: #60511F; border-color: #60511F; }
        .fq-item.is-open .fq-icon i { background: #FFFFFF; }
        .fq-item.is-open .fq-icon i:last-child { transform: rotate(0deg); }

        /* PANEL */
        .fq-panel {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .fq-item.is-open .fq-panel { grid-template-rows: 1fr; }
        .fq-panel-inner { min-height: 0; overflow: hidden; }
        .fq-panel-inner p {
          margin: 0 26px 26px 80px;
          padding-top: 18px;
          border-top: 1px solid rgba(96,81,31,0.16);
          font-size: 16px;
          line-height: 1.75;
          color: #62645E;
        }

        /* CTA */
        .fq-cta {
          padding: 88px 0;
          text-align: center;
          background: #FFFAF0;
          border-top: 1px solid rgba(96,81,31,0.18);
        }
        .fq-cta h2 {
          max-width: 760px;
          margin: 0 auto;
          font-size: 30px;
          font-weight: 600;
          line-height: 1.3;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #60511F;
        }
        .fq-actions {
          margin-top: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .fq-btn {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          min-width: 180px;
          padding: 15px 30px;
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
        .fq-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          background: #60511F;
          transform: translateY(102%);
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .fq-btn:hover { color: #FFFFFF; border-color: #60511F; transform: translateY(-2px); }
        .fq-btn:hover::before { transform: translateY(0); }

        .fq-btn-solid { color: #FFFFFF; background: #60511F; border-color: #60511F; }
        .fq-btn-solid::before { background: #FFFAF0; }
        .fq-btn-solid:hover { color: #60511F; }

        /* STRIP */
        .fq-strip {
          padding: 22px 0;
          background: #FDF2DE;
          border-top: 1px solid rgba(96,81,31,0.2);
        }
        .fq-strip .fq-container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 18px;
        }
        .fq-strip span {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #60511F;
        }
        .fq-strip i { font-style: normal; font-size: 12px; color: rgba(96,81,31,0.55); }

        @keyframes fqIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* TABLET */
        @media (max-width: 1000px) {
          .fq-layout { grid-template-columns: 1fr; row-gap: 32px; }

          .fq-side-inner {
            position: static;
            padding: 0;
            background: transparent;
            border: 0;
            box-shadow: none;
          }
          .fq-side-title { display: none; }

          .fq-tabs {
            flex-direction: row;
            gap: 10px;
            overflow-x: auto;
            padding: 2px 2px 8px;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
          }
          .fq-tabs::-webkit-scrollbar { display: none; }

          .fq-tab {
            width: auto;
            flex: 0 0 auto;
            white-space: nowrap;
            padding: 12px 20px;
            background: #FFFAF0;
            border: 1px solid rgba(96,81,31,0.3);
            border-radius: 999px;
          }
          .fq-tab em { display: none; }
          .fq-tab.is-active {
            color: #FFFFFF;
            background: #60511F;
            border-color: #60511F;
          }
        }

        /* MOBILE */
        @media (max-width: 700px) {
          .fq { font-size: 16px; }
          .fq-container { padding-left: 20px; padding-right: 20px; }

          .fq-label span { width: 28px; }
          .fq-label p { font-size: 12px; letter-spacing: 2px; }

          .fq-hero { padding: 118px 0 44px; }
          .fq-hero h1 { font-size: 24px; }
          .fq .fq-lead { margin-top: 14px; font-size: 18px; }

          .fq-section { padding: 40px 0 52px; }
          .fq-layout { row-gap: 26px; }

          /* tabs screen ke edge tak scroll ho */
          .fq-tabs { margin: 0 -20px; padding-left: 20px; padding-right: 20px; }
          .fq-tab { padding: 11px 18px; font-size: 15px; }

          .fq-list { gap: 12px; }
          .fq-list-head { margin-bottom: 6px; }
          .fq-list-head h2 { font-size: 24px; }

          .fq-trigger { padding: 18px 16px; gap: 12px; align-items: flex-start; }
          .fq-num { min-width: 26px; padding-top: 2px; font-size: 16px; }
          .fq-q { font-size: 16px; line-height: 1.5; }
          .fq-icon { width: 32px; height: 32px; }
          .fq-icon i { width: 12px; margin-left: -6px; }

          .fq-panel-inner p {
            margin: 0 16px 20px 16px;
            padding-top: 16px;
            font-size: 16px;
            line-height: 1.7;
          }

          .fq-cta { padding: 52px 0; }
          .fq-cta h2 { font-size: 24px; }
          .fq-actions { margin-top: 28px; flex-direction: column; gap: 12px; }
          .fq-btn { width: 100%; }

          .fq-strip .fq-container { gap: 12px; }
          .fq-strip span { font-size: 11px; letter-spacing: 2px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .fq *, .fq *::before, .fq *::after { transition: none !important; animation: none !important; }
          .fq-item { opacity: 1; transform: none; }
        }
      `}</style>
    </main>
  );
}