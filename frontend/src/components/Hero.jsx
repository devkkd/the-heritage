"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Cinzel, Mona_Sans } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const monaSans = Mona_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/* ============================================================
   WHATSAPP NUMBER
   Country code ke saath daalo. +, space, bracket, hyphen mat lagana.
   Example (India): 919876543210
   ============================================================ */
const WHATSAPP_NUMBER = "34610373144";

/* ============================================================
   DESKTOP IMAGES
   Jitni images array me hongi utni automatically alternate hongi.
   ============================================================ */
const DESKTOP_SLIDES = ["/home/h1.jpg", "/home/h2.jpg"];

/* ============================================================
   MOBILE IMAGES
   Mobile ke liye alag images (767px se neeche).
   Tip: DESKTOP_SLIDES jitni hi rakhna, taaki dono sync me chalein.
   ============================================================ */
const MOBILE_SLIDES = ["/home/h1.jpg", "/home/h2.jpg"];

/* 5000 = 5 seconds */
const SLIDE_INTERVAL = 5000;

const HEADLINE_1 = "Iconic Destinations,";
const HEADLINE_2 = "Timeless Experiences";

/* ============================================================
   CSS
   NOTE: Desktop + tablet CSS bilkul same hai (koi change nahi).
   Sirf sabse neeche wala MOBILE block naya/improve kiya hai.
   ============================================================ */
const CSS = `
.hr,
.hr * { box-sizing: border-box; }

/* ---------- HERO ---------- */
.hr {
  --hr-brown: #534011;
  position: relative;
  width: 100%;
  height: 100vh;
  height: 100svh;
  min-height: 680px;
  overflow: hidden;
  background: #2b230c;
  color: #fff;
}

/* ---------- SLIDES ---------- */
.hr-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 1.2s ease;
  z-index: 0;
}
.hr-slide.hr-on { opacity: 1; z-index: 1; }
.hr-slide img { object-fit: cover; object-position: center; }

/* ---------- DARK OVERLAY ---------- */
.hr-shade {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background:
    linear-gradient(180deg, rgba(20, 15, 4, 0.35) 0%, rgba(20, 15, 4, 0) 28%),
    linear-gradient(0deg, rgba(20, 15, 4, 0.55) 0%, rgba(20, 15, 4, 0) 42%);
}

/* ---------- ARROWS ---------- */
.hr-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  width: 56px;
  height: 56px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;
}
.hr-arrow:hover { opacity: 0.7; }
.hr-arrow svg { width: 22px; height: 40px; }
.hr-prev { left: clamp(10px, 2.4vw, 50px); }
.hr-next { right: clamp(10px, 2.4vw, 50px); }

/* ---------- HEADLINE ---------- */
.hr-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  z-index: 4;
  text-align: center;
  padding: 0 20px;
  pointer-events: none;
}
.hr-title {
  margin: 0;
  font-weight: 600;
  color: #fff;
  font-size: clamp(20px, 2.6vw, 40px);
  line-height: 1.5;
  letter-spacing: 0.005em;
  text-shadow: 0 2px 18px rgba(0, 0, 0, 0.25);
}
.hr-title span { display: block; }

/* ---------- SCROLL BUTTON ---------- */
.hr-scroll {
  display: inline-block;
  margin-top: clamp(16px, 2.4vw, 30px);
  pointer-events: auto;
  padding: 6px 8px;
  font-size: clamp(13px, 1vw, 16px);
  font-weight: 400;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #fff;
  text-decoration: none;
  background: none;
  border: 0;
  cursor: pointer;
}
.hr-scroll:hover { opacity: 0.75; }

/* ---------- BOOKING BAR ---------- */
.hr-bar {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: clamp(60px, 9.2vh, 96px);
  z-index: 6;
  width: min(45.5vw, 880px);
  min-width: 760px;
  height: 96px;
  padding: 0 39px 0 40px;
  display: flex;
  align-items: center;
  background: rgba(66, 52, 17, 0.58);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.22);
}

/* ---------- BOOKING FIELD ---------- */
.hr-field {
  position: relative;
  flex: 1 1 0;
  height: 58px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  padding: 0 24px 0 0;
  margin-right: 24px;
  border-right: 1px solid rgba(255, 255, 255, 0.35);
  background: none;
  border-top: 0;
  border-left: 0;
  border-bottom: 0;
  color: #fff;
  text-align: left;
  cursor: pointer;
  font: inherit;
}
.hr-field:nth-child(3) { border-right: 0; margin-right: 0; }
.hr-field-label {
  font-size: 12px;
  line-height: 1;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
  letter-spacing: 0.02em;
}
.hr-field-value {
  font-size: 13px;
  line-height: 1;
  color: #fff;
  white-space: nowrap;
}

/* ---------- DATE INPUT ---------- */
.hr-date-input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  border: 0;
  padding: 0;
  margin: 0;
  z-index: 2;
}

/* ---------- GUEST WRAPPER ---------- */
.hr-guest-wrap {
  position: relative;
  flex: 1.15 1 0;
  display: flex;
  min-width: 0;
}
.hr-guest-wrap .hr-field {
  flex: 1;
  margin-right: 24px;
  border-right: 0;
}

/* ---------- WHATSAPP BUTTON ---------- */
.hr-submit {
  flex: 0 0 auto;
  width: 176px;
  height: 58px;
  border: 0;
  cursor: pointer;
  background: #fff;
  color: #1c1608;
  font: inherit;
  font-size: 14px;
  font-weight: 400;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.hr-submit:hover { background: var(--hr-brown); color: #fff; }

/* ---------- GUEST POPUP ---------- */
.hr-pop {
  position: absolute;
  left: 0;
  bottom: calc(100% + 16px);
  width: 300px;
  padding: 16px 18px;
  z-index: 20;
  background: #fbf2de;
  color: #1c1608;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
}
.hr-pop-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 15px;
}
.hr-pop-ctr { display: flex; align-items: center; gap: 12px; }
.hr-pop-ctr button {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid rgba(83, 64, 17, 0.5);
  background: transparent;
  color: var(--hr-brown);
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  padding: 0;
}
.hr-pop-ctr span { min-width: 16px; text-align: center; font-weight: 500; }
.hr-pop-done {
  width: 100%;
  height: 40px;
  margin-top: 14px;
  border: 0;
  background: var(--hr-brown);
  color: #fff;
  font: inherit;
  font-size: 14px;
  cursor: pointer;
}

/* ---------- SLIDE DOTS ---------- */
.hr-dots {
  position: absolute;
  left: 0;
  right: 0;
  bottom: clamp(22px, 3.4vh, 34px);
  z-index: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.hr-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  padding: 0;
  border: 0;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.55);
  transition: all 0.3s ease;
}
.hr-dot.hr-dot-on {
  width: 14px;
  height: 14px;
  background: transparent;
  border: 2px solid #fff;
  position: relative;
}
.hr-dot.hr-dot-on::after {
  content: "";
  position: absolute;
  inset: 2px;
  border-radius: 50%;
  background: #fff;
}

/* ---------- TABLET (unchanged) ---------- */
@media (max-width: 1100px) {
  .hr-bar { width: calc(100% - 48px); min-width: 0; padding: 0 24px; }
  .hr-submit { width: 150px; }
}

/* ============================================================
   MOBILE (improved) — sirf 767px se neeche apply hota hai
   ============================================================ */
@media (max-width: 767px) {

  .hr { min-height: 640px; }

  /* arrows: chhote aur edge par, headline se takrayenge nahi */
  .hr-arrow { width: 32px; height: 44px; top: 40%; }
  .hr-arrow svg { width: 14px; height: 26px; }
  .hr-prev { left: 4px; }
  .hr-next { right: 4px; }

  /* headline: header/logo ke neeche, booking bar ke upar */
  .hr-content { top: 34%; padding: 0 20px; }
  .hr-title {
    font-size: clamp(18px, 5.8vw, 32px);
    line-height: 1.45;
  }
  .hr-title span { white-space: nowrap; }
  .hr-scroll { margin-top: 14px; font-size: 13px; }

  /* booking bar: compact grid (dates side-by-side) */
  .hr-bar {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: stretch;
    bottom: calc(52px + env(safe-area-inset-bottom, 0px));
    width: calc(100% - 28px);
    min-width: 0;
    height: auto;
    padding: 4px 16px 16px;
    background: rgba(66, 52, 17, 0.72);
  }

  .hr-field {
    flex: none;
    height: auto;
    min-height: 62px;
    padding: 12px 0;
    margin: 0;
    gap: 8px;
    border-right: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.28);
  }
  .hr-bar > .hr-field:nth-child(1) {
    padding-right: 12px;
    border-right: 1px solid rgba(255, 255, 255, 0.28);
  }
  .hr-bar > .hr-field:nth-child(2) { padding-left: 16px; }

  .hr-guest-wrap { grid-column: 1 / -1; width: 100%; flex: none; }
  .hr-guest-wrap .hr-field {
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    min-height: 56px;
    margin: 0;
    padding: 12px 0;
    border-right: 0;
  }

  .hr-field-label { font-size: 11px; }
  .hr-field-value { font-size: 14px; }

  /* iOS auto-zoom rokne ke liye */
  .hr-date-input { font-size: 16px; }

  .hr-submit {
    grid-column: 1 / -1;
    width: 100%;
    height: 48px;
    margin-top: 14px;
    font-size: 15px;
  }

  .hr-pop {
    left: 0;
    right: 0;
    width: 100%;
    bottom: calc(100% + 8px);
  }

  .hr-dots { bottom: 22px; }
}

/* ---------- SMALL PHONES ---------- */
@media (max-width: 360px) {
  .hr-bar { padding: 2px 12px 14px; }
  .hr-bar > .hr-field:nth-child(2) { padding-left: 12px; }
  .hr-field-value { font-size: 13px; }
}

/* ---------- REDUCED MOTION ---------- */
@media (prefers-reduced-motion: reduce) {
  .hr-slide { transition: none; }
}
`;

/* ============================================================
   HELPERS
   ============================================================ */
const fmt = (value) => {
  if (!value) return "Not Selected";
  const [year, month, day] = value.split("-");
  return `${day}-${month}-${year}`;
};

const todayStr = () => {
  const date = new Date();
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
};

/* ============================================================
   HERO
   ============================================================ */
export default function Hero() {
  const [index, setIndex] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [popOpen, setPopOpen] = useState(false);
  const [minDate, setMinDate] = useState("");

  const popRef = useRef(null);
  const touchX = useRef(null);

  useEffect(() => {
    setMinDate(todayStr());
  }, []);

  /* AUTOMATIC SLIDER */
  useEffect(() => {
    if (DESKTOP_SLIDES.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % DESKTOP_SLIDES.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  /* MANUAL SLIDE */
  const go = useCallback((number) => {
    setIndex((number + DESKTOP_SLIDES.length) % DESKTOP_SLIDES.length);
  }, []);

  /* MOBILE SWIPE (left/right) */
  const onTouchStart = (event) => {
    touchX.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event) => {
    if (touchX.current === null) return;
    const dx = event.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
  };

  /* GUEST POPUP OUTSIDE CLICK / TAP */
  useEffect(() => {
    if (!popOpen) return;

    const handleOutside = (event) => {
      if (popRef.current && !popRef.current.contains(event.target)) {
        setPopOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [popOpen]);

  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  /* WHATSAPP BOOKING */
  const sendToWhatsApp = () => {
    const message = `
Hello The Heritage Resort,

I would like to check availability.

Booking Details:
━━━━━━━━━━━━━━━━━━

Check-in: ${fmt(checkIn)}

Check-out: ${fmt(checkOut)}

Guests: ${guests}

Rooms: ${rooms}

━━━━━━━━━━━━━━━━━━

Please let me know the availability, room options and pricing.

Thank you.
The Heritage Resort
    `.trim();

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      className={`hr ${monaSans.className}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* SLIDES — desktop image + mobile <source> */}
      {DESKTOP_SLIDES.map((src, slideIndex) => (
        <div
          key={`slide-${src}`}
          className={`hr-slide ${slideIndex === index ? "hr-on" : ""}`}
          aria-hidden={slideIndex !== index}
        >
          <picture>
            {/* FIX: pehle yahan `index` tha, isliye mobile par har slide me
                same image aati thi aur crossfade nahi hota tha.
                Ab har slide ki apni mobile image hai. */}
            <source
              media="(max-width: 767px)"
              srcSet={MOBILE_SLIDES[slideIndex % MOBILE_SLIDES.length]}
            />
            <Image
              src={src}
              alt="The Heritage Resort"
              fill
              sizes="100vw"
              quality={90}
              priority={slideIndex === 0}
            />
          </picture>
        </div>
      ))}

      <div className="hr-shade" />

      {/* PREVIOUS */}
      <button
        type="button"
        className="hr-arrow hr-prev"
        onClick={() => go(index - 1)}
        aria-label="Previous slide"
      >
        <svg viewBox="0 0 22 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 2L3 20l16 18" />
        </svg>
      </button>

      {/* NEXT */}
      <button
        type="button"
        className="hr-arrow hr-next"
        onClick={() => go(index + 1)}
        aria-label="Next slide"
      >
        <svg viewBox="0 0 22 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 2l16 18L3 38" />
        </svg>
      </button>

      {/* HEADLINE */}
      <div className="hr-content">
        <h1 className={`hr-title ${cinzel.className}`}>
          <span>{HEADLINE_1}</span>
          <span>{HEADLINE_2}</span>
        </h1>

        <button type="button" className="hr-scroll" onClick={scrollDown}>
          Scroll to explore ↓
        </button>
      </div>

      {/* BOOKING BAR */}
      <div className="hr-bar">
        {/* CHECK IN */}
        <div className="hr-field">
          <span className="hr-field-label">Check In</span>
          <span className="hr-field-value">{fmt(checkIn)}</span>

          <input
            className="hr-date-input"
            type="date"
            value={checkIn}
            min={minDate}
            aria-label="Check in date"
            onClick={(event) => event.currentTarget.showPicker?.()}
            onChange={(event) => {
              const value = event.target.value;
              setCheckIn(value);
              if (checkOut && checkOut <= value) setCheckOut("");
            }}
          />
        </div>

        {/* CHECK OUT */}
        <div className="hr-field">
          <span className="hr-field-label">Check Out</span>
          <span className="hr-field-value">{fmt(checkOut)}</span>

          <input
            className="hr-date-input"
            type="date"
            value={checkOut}
            min={checkIn || minDate}
            aria-label="Check out date"
            onClick={(event) => event.currentTarget.showPicker?.()}
            onChange={(event) => setCheckOut(event.target.value)}
          />
        </div>

        {/* GUESTS + ROOMS */}
        <div className="hr-guest-wrap" ref={popRef}>
          <button
            type="button"
            className="hr-field"
            onClick={() => setPopOpen((open) => !open)}
            aria-expanded={popOpen}
          >
            <span className="hr-field-label">Guests</span>
            <span className="hr-field-value">
              {guests} {guests > 1 ? "Guests" : "Guest"}, {rooms} {rooms > 1 ? "Rooms" : "Room"}
            </span>
          </button>

          {popOpen && (
            <div className="hr-pop">
              {/* GUESTS */}
              <div className="hr-pop-row">
                <span>Guests</span>
                <div className="hr-pop-ctr">
                  <button type="button" onClick={() => setGuests((v) => Math.max(1, v - 1))} aria-label="Less guests">−</button>
                  <span>{guests}</span>
                  <button type="button" onClick={() => setGuests((v) => Math.min(20, v + 1))} aria-label="More guests">+</button>
                </div>
              </div>

              {/* ROOMS */}
              <div className="hr-pop-row">
                <span>Rooms</span>
                <div className="hr-pop-ctr">
                  <button type="button" onClick={() => setRooms((v) => Math.max(1, v - 1))} aria-label="Less rooms">−</button>
                  <span>{rooms}</span>
                  <button type="button" onClick={() => setRooms((v) => Math.min(10, v + 1))} aria-label="More rooms">+</button>
                </div>
              </div>

              <button type="button" className="hr-pop-done" onClick={() => setPopOpen(false)}>
                Done
              </button>
            </div>
          )}
        </div>

        {/* WHATSAPP */}
        <button type="button" className="hr-submit" onClick={sendToWhatsApp}>
          Check Availability
        </button>
      </div>

      {/* DOTS */}
      <div className="hr-dots" role="tablist" aria-label="Hero slides">
        {DESKTOP_SLIDES.map((_, slideIndex) => (
          <button
            key={slideIndex}
            type="button"
            className={`hr-dot ${slideIndex === index ? "hr-dot-on" : ""}`}
            onClick={() => go(slideIndex)}
            aria-label={`Go to slide ${slideIndex + 1}`}
            aria-selected={slideIndex === index}
            role="tab"
          />
        ))}
      </div>
    </section>
  );
}