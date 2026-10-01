"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Cinzel, Mona_Sans } from "next/font/google";

/* display: "optional" => font swap se text hilta nahi (refresh par glitch nahi) */
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

/* ============================================================
   SETTINGS
   ------------------------------------------------------------
   WHATSAPP_NUMBER: country code ke saath, bina + / space / hyphen.
   Example (India): 919876543210
   ============================================================ */
const WHATSAPP_NUMBER = "34610373144";
const AUTO_SCROLL_MS = 3500; // har card kitni der baad aage badhe
const SECTION_LABEL = "OUR SUITES";
const SECTION_TITLE = "DISCOVER OUR RESPLENDENT HERITAGE SUITES";

/* ============================================================
   SUITES  (abhi wahi 4 images repeat ho rahi hain: 1-4, phir 1-4)
   Images: public/newhome/SUITES/1.png ... 4.png
   ============================================================ */
const BASE_SUITES = [
  {
    title: "Narlai Suite",
    image: "/newhome/SUITES/1.png",
    meta: "2002 ft² | 2 Guests | 1 King Bed",
    description:
      "Encompassing over 2,000 sq ft. of living space, and situated at the highest altitude, the suites exemplify understated luxury, elegance and exclusivity.",
  },
  {
    title: "Junior Suite",
    image: "/newhome/SUITES/2.png",
    meta: "1360 ft² | 2 Guests | 1 King Bed",
    description:
      "Ideal for those looking for complete privacy and seclusion, and a sumptuous Rajputana regal experience. A private balcony offers stunning glimpses of the…",
  },
  {
    title: "Luxury Grand Heritage Suite",
    image: "/newhome/SUITES/3.png",
    meta: "650 ft² | 2 Guests | 1 King Bed",
    description:
      "Nestled in our contemporary wing, our Luxury Grand Heritage rooms are furnished with opulent interiors and innovative local materials.",
  },
  {
    title: "Heritage Room",
    image: "/newhome/SUITES/4.png",
    meta: "550 ft² | 2 Guests | 1 King Bed",
    description:
      "A refined heritage stay combining the character of Rajasthan with thoughtful comfort, elegant details and a calm atmosphere for an intimate escape.",
  },
];

// 8 cards => desktop (4 visible) par 5 dots
const SUITES = [...BASE_SUITES, ...BASE_SUITES].map((s, i) => ({
  ...s,
  id: `suite-${i}`,
}));

/* Book Now => seedha WhatsApp, suite ki details ke saath */
const whatsappLink = (suite) => {
  const message = [
    "Hello The Heritage Resort,",
    "",
    `I would like to book the ${suite.title}.`,
    "",
    "Suite Details:",
    suite.meta,
    "",
    "Please share the availability and pricing.",
    "",
    "Thank you.",
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

/* ============================================================
   FIXED CSS  (plain <style>, server par render => refresh par glitch nahi)
   Desktop >=1024px : 4 cards
   Tablet  768-1023 : 3 cards
   Mobile  <768px   : 2 cards

   Fixed rows: title / meta / description ki height fixed hai aur
   Book Now hamesha card ke bottom me pin hai => sab cards me
   description aur button EK HI position par rehte hain.
   ============================================================ */
const CSS = `
.su,.su *,.su *::before,.su *::after{box-sizing:border-box}
.su{
  --v:4;--gap:28px;
  width:100%;background:#FDF2DE;color:#0E0E0E;overflow:hidden;
}
.su-inner{
  width:100%;max-width:1400px;margin:0 auto;
  padding:52px 32px 64px;
}

/* ---------- header ---------- */
.su-label{
  margin:0 0 18px;font-size:15px;line-height:1.3;font-weight:400;
  letter-spacing:-.02em;text-transform:uppercase;color:#0E0E0E;
}
.su-head{display:flex;align-items:center;margin-bottom:36px}
.su-title{
  margin:0;flex:0 1 auto;color:#0E0E0E;font-weight:700;text-transform:uppercase;
  font-size:clamp(24px,2.1vw,32px);line-height:1.12;letter-spacing:-.02em;
}
.su-line{flex:1 1 40px;min-width:40px;height:1px;background:rgba(14,14,14,.35);margin:0 clamp(24px,3vw,48px)}
.su-controls{display:flex;align-items:center;gap:clamp(16px,2vw,28px);flex:0 0 auto}
.su-arrow{
  width:40px;height:40px;padding:0;border:0;background:transparent;color:#0E0E0E;cursor:pointer;
  display:flex;align-items:center;justify-content:center;transition:opacity .2s ease;
  -webkit-tap-highlight-color:transparent;
}
.su-arrow:hover{opacity:.6}
.su-arrow svg{width:12px;height:22px}
.su-dots{display:flex;align-items:center;gap:8px}
.su-dot{
  width:6px;height:6px;padding:0;border:0;border-radius:50%;cursor:pointer;
  background:rgba(14,14,14,.55);transition:all .3s ease;position:relative;
}
.su-dot.su-dot-on{width:14px;height:14px;background:transparent;border:1.5px solid #0E0E0E}
.su-dot.su-dot-on::after{content:"";position:absolute;inset:2.5px;border-radius:50%;background:#0E0E0E}

/* ---------- slider ---------- */
.su-viewport{width:100%;overflow:hidden;touch-action:pan-y}
.su-track{
  --i:0;display:flex;align-items:stretch;gap:var(--gap);
  transform:translateX(calc(var(--i) * -1 * ((100% - (var(--v) - 1) * var(--gap)) / var(--v) + var(--gap))));
  transition:transform .8s cubic-bezier(.22,.61,.36,1);
  will-change:transform;
}
.su-card{
  flex:0 0 calc((100% - (var(--v) - 1) * var(--gap)) / var(--v));min-width:0;
  display:flex;flex-direction:column;
}
.su-img{position:relative;flex:none;width:100%;aspect-ratio:4 / 4.8;overflow:hidden;background:#e6d8b9}
.su-img img{object-fit:cover;object-position:center}

.su-card-title{
  flex:none;margin:18px 0 0;color:#0E0E0E;font-weight:600;
  font-size:clamp(15px,1.25vw,18px);line-height:1.3;letter-spacing:.005em;min-height:1.3em;
}
.su-meta{flex:none;margin:10px 0 0;font-size:13.5px;line-height:1.5;font-weight:400;color:#0E0E0E;min-height:1.5em}
.su-desc{
  flex:none;margin:4px 0 16px;font-size:13.5px;line-height:1.55;font-weight:400;color:#0E0E0E;
  display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;line-clamp:3;overflow:hidden;
  height:calc(3 * 1.55em);
}
.su-btn{
  margin-top:auto;align-self:flex-start;
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  height:42px;padding:0 22px;
  background:#534011;color:#fff;text-decoration:none;font-size:14px;font-weight:400;line-height:1;
  transition:background-color .2s ease;
}
.su-btn:hover{background:#43330d}
.su-btn svg{width:11px;height:11px}

/* ---------- breakpoints ---------- */
@media (max-width:1280px){
  .su-card-title{min-height:2.6em}
}
@media (max-width:1100px){
  .su{--gap:20px}
  .su-meta{min-height:3em}
}
@media (max-width:1023px){
  .su{--v:3}
}
@media (max-width:767px){
  .su{--v:2;--gap:12px}
  .su-inner{padding:40px 20px 48px}
  .su-label{margin-bottom:12px;font-size:13px}
  .su-head{flex-direction:column;align-items:flex-start;margin-bottom:20px}
  .su-title{font-size:clamp(25px,7.5vw,34px);line-height:1.18}
  .su-line{display:none}
  .su-controls{margin-top:14px;gap:14px}
  .su-arrow{width:34px;height:34px}
  .su-arrow svg{width:11px;height:20px}

  .su-img{aspect-ratio:4 / 4.4}
  .su-card-title{margin-top:12px;font-size:15px;line-height:1.3;min-height:2.6em}
  .su-meta{margin-top:6px;font-size:12px;line-height:1.5;min-height:3em}
  .su-desc{
    margin:2px 0 12px;font-size:12px;line-height:1.55;
    -webkit-line-clamp:4;line-clamp:4;height:calc(4 * 1.55em);
  }
  .su-btn{height:38px;padding:0 16px;font-size:13px}
}
@media (max-width:360px){
  .su{--gap:10px}
  .su-card-title{font-size:14px}
  .su-desc{font-size:11.5px}
  .su-btn{padding:0 13px;font-size:12px}
}
@media (prefers-reduced-motion:reduce){
  .su-track{transition:none}
}
`;

function Chevron({ dir }) {
  return (
    <svg viewBox="0 0 12 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dir === "left" ? <path d="M10.5 1.5L1.5 11l9 9.5" /> : <path d="M1.5 1.5L10.5 11l-9 9.5" />}
    </svg>
  );
}

export default function OurSuites() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(4); // sirf autoplay/dots ke liye (layout CSS se hota hai)
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  const touchX = useRef(null);
  const resumeTimer = useRef(null);

  const maxIndex = Math.max(0, SUITES.length - visible);

  // visible cards ki ginti (CSS breakpoints se match) + reduced motion
  useEffect(() => {
    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const mqTablet = window.matchMedia("(min-width: 768px)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setVisible(mqDesktop.matches ? 4 : mqTablet.matches ? 3 : 2);
      setReduced(mqMotion.matches);
    };
    update();

    mqDesktop.addEventListener("change", update);
    mqTablet.addEventListener("change", update);
    mqMotion.addEventListener("change", update);
    return () => {
      mqDesktop.removeEventListener("change", update);
      mqTablet.removeEventListener("change", update);
      mqMotion.removeEventListener("change", update);
    };
  }, []);

  // resize par index bahar na nikle
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  // AUTO SCROLL — cursor card par jaye to ruk jaata hai
  useEffect(() => {
    if (paused || reduced || maxIndex === 0) return;

    const timer = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, AUTO_SCROLL_MS);

    return () => clearInterval(timer);
  }, [paused, reduced, maxIndex, index]);

  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  const go = useCallback(
    (n) => {
      setIndex(n < 0 ? maxIndex : n > maxIndex ? 0 : n);
    },
    [maxIndex]
  );

  // mobile swipe (touch par autoplay pause, 3s baad resume)
  const onTouchStart = (e) => {
    clearTimeout(resumeTimer.current);
    setPaused(true);
    touchX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchX.current !== null) {
      const dx = e.changedTouches[0].clientX - touchX.current;
      touchX.current = null;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
    }
    resumeTimer.current = setTimeout(() => setPaused(false), 3000);
  };

  return (
    <section className={`su ${monaSans.className}`} id="suites">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div
        className="su-inner"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <p className="su-label">{SECTION_LABEL}</p>

        <div className="su-head">
          <h2 className={`su-title ${cinzel.className}`}>{SECTION_TITLE}</h2>

          <span className="su-line" aria-hidden="true" />

          <div className="su-controls">
            <button type="button" className="su-arrow" onClick={() => go(index - 1)} aria-label="Previous suites">
              <Chevron dir="left" />
            </button>

            <div className="su-dots" role="tablist" aria-label="Suite slides">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`su-dot ${i === index ? "su-dot-on" : ""}`}
                  onClick={() => go(i)}
                />
              ))}
            </div>

            <button type="button" className="su-arrow" onClick={() => go(index + 1)} aria-label="Next suites">
              <Chevron dir="right" />
            </button>
          </div>
        </div>

        <div className="su-viewport" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="su-track" style={{ "--i": index }}>
            {SUITES.map((s) => (
              <article key={s.id} className="su-card">
                <div className="su-img">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
                    quality={90}
                  />
                </div>

                <h3 className={`su-card-title ${cinzel.className}`}>{s.title}</h3>
                <p className="su-meta">{s.meta}</p>
                <p className="su-desc">{s.description}</p>

                <a
                  href={whatsappLink(s)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="su-btn"
                >
                  Book Now
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M1.5 6h9M7 2.5L10.5 6 7 9.5" />
                  </svg>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}