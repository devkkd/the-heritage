"use client";

import { Cinzel, Mona_Sans } from "next/font/google";

/*
 * display: "optional" => font late aane par text swap/reflow nahi hota.
 * (pehle "swap" tha, isliye refresh par text hilta tha)
 */
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "optional",
});

const monaSans = Mona_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "optional",
});

/*
 * FIXED CSS — plain <style> tag (styled-jsx nahi).
 * styled-jsx App Router me hydration ke baad inject hota tha, isliye
 * refresh par pehle unstyled content dikhta tha aur phir jump karta tha.
 * Ye CSS server HTML ke saath hi aata hai => koi glitch nahi.
 * Design bilkul same hai.
 */
const CSS = `
.resort-story {
  width: 100%;
  background: #fdf2de;
  overflow: hidden;
  box-sizing: border-box;
}

.resort-story *,
.resort-story *::before,
.resort-story *::after {
  box-sizing: border-box;
}

.resort-story-inner {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 88px 32px 92px;
}

.resort-story-label {
  margin: 0 0 24px;
  color: #0E0E0E;
  font-size: 16px;
  line-height: 1.3;
  font-weight: 400;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.resort-story-title {
  margin: 0;
  color: #0E0E0E;
  font-size: clamp(24px, 2.1vw, 40px);
  line-height: 1.12;
  font-weight: 600;
  letter-spacing: -0.035em;
  text-transform: uppercase;
}

.resort-story-description {
  max-width: 1340px;
  margin: 32px 0 0;
  color: #0E0E0E;
  font-size: clamp(12px, 1.5vw, 16px);
  line-height: 1.7;
  font-weight: 400;
  letter-spacing: -0.012em;
  text-transform: uppercase;
}

@media (max-width: 900px) {
  .resort-story-inner {
    padding-top: 72px;
    padding-bottom: 76px;
  }

  .resort-story-label {
    margin-bottom: 20px;
    font-size: 16px;
  }

  .resort-story-title {
    font-size: clamp(30px, 5vw, 42px);
  }

  .resort-story-description {
    margin-top: 26px;
    font-size: 16px;
    line-height: 1.65;
  }
}

@media (max-width: 767px) {
  .resort-story-inner {
    max-width: none;
    padding: 58px 20px 62px;
  }

  .resort-story-label {
    margin-bottom: 17px;
    font-size: 13px;
    line-height: 1.3;
    letter-spacing: -0.015em;
  }

  .resort-story-title {
    font-size: clamp(25px, 7.5vw, 34px);
    line-height: 1.18;
    letter-spacing: -0.03em;
  }

  .resort-story-description {
    margin-top: 23px;
    max-width: 100%;
    font-size: 13px;
    line-height: 1.75;
    letter-spacing: -0.005em;
  }
}

@media (max-width: 420px) {
  .resort-story-inner {
    padding: 50px 20px 54px;
  }

  .resort-story-label {
    margin-bottom: 15px;
    font-size: 12px;
  }

  .resort-story-title {
    font-size: 24px;
    line-height: 1.2;
  }

  .resort-story-description {
    margin-top: 20px;
    font-size: 12px;
    line-height: 1.78;
  }
}

@media (max-width: 360px) {
  .resort-story-inner {
    padding: 44px 20px 48px;
  }

  .resort-story-label {
    font-size: 11px;
  }

  .resort-story-title {
    font-size: 22px;
  }

  .resort-story-description {
    font-size: 11px;
    line-height: 1.8;
  }
}
`;

export default function ResortStory() {
  return (
    <section className="resort-story">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="resort-story-inner">
        <div className={`resort-story-label ${monaSans.className}`}>
          THE RESORT STORY
        </div>

        <h2 className={`resort-story-title ${cinzel.className}`}>
          AN AUTHENTIC HERITAGE EXPERIENCE
        </h2>

        <p className={`resort-story-description ${cinzel.className}`}>
          THE HERITAGE RESORTS OFFERS A TRANQUIL RETREAT IN JAIPUR, FEATURING
          TRADITIONAL STONE ARCHITECTURE, LUXURY SWISS TENTS, AN OUTDOOR
          SWIMMING POOL, CELEBRATION LAWNS, AND CUSTOMIZED CATERING SERVICES.
        </p>
      </div>
    </section>
  );
}