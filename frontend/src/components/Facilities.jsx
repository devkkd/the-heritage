"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Cinzel, Mona_Sans } from "next/font/google";

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
   EASY LAYOUT SETTINGS
   ============================================================ */

const DESKTOP_MAX_WIDTH = "1400px";
const DESKTOP_SIDE_PADDING = "62px";
const MOBILE_SIDE_PADDING = "20px";


/* ============================================================
   CONTENT
   ============================================================ */

const FACILITIES = [
  {
    id: "swiss",
    title: "Swiss Tents",
    image: "/newhome/swiss.png",
    description:
      "Our Swiss tents combine outdoor serenity with comfort. Each tent features climate control, comfortable bedding, interior seating, and private en-suite bathrooms.",
    details: [
      "Air-conditioned tented living spaces with tasteful furnishings",
      "Attached private bathrooms with modern fittings",
      "Private sit-out area facing the landscaped gardens",
    ],
  },
  {
    id: "pool",
    title: "Swimming Pool",
    image: "/newhome/swimming.png",
    description:
      "Relax by our outdoor swimming pool surrounded by stone decks and shaded chhatris. An ideal spot for morning swims, lounging under the sun, or relaxing in the evening.",
    details: [
      "Outdoor swimming pool with stone sun decks",
      "Shaded chhatris and loungers for relaxing by the water",
      "Perfect for morning swims and unhurried evenings",
    ],
  },
  {
    id: "lawns",
    title: "Expansive Lawns & Heritage Sittings",
    image: "/experience/2.jpg",
    description:
      "Wide, open lawns shaded by mature trees, with heritage-style seating placed around the grounds. A relaxed setting for family gatherings, quiet afternoons and evening get-togethers.",
    details: [
      "Spacious green lawns for gatherings and leisure",
      "Heritage-style seating in shaded corners",
      "Softly lit evenings under open skies",
    ],
  },
  {
    id: "kitchen",
    title: "Kitchen",
    image: "/experience/1.jpg",
    description:
      "The heart of our dining experience, where regional classics and freshly prepared dishes come together. Every meal is cooked with care, from relaxed family spreads to special celebrations.",
    details: [
      "Authentic Rajasthani flavours",
      "Seasonal menus with fresh ingredients",
      "Perfect for families and celebrations",
    ],
  },
];

const SECTION_TITLE = "Facilities & Amenities";

const SECTION_SUBTITLE =
  "Discover our accommodations, leisure zones, and event spaces.";


/* ============================================================
   CSS
   ============================================================ */

const CSS = `
.fa,
.fa *,
.fa-modal,
.fa-modal * {
  box-sizing: border-box;
}


/* ============================================================
   MAIN SECTION
   ============================================================ */

.fa {
  --fa-max-width: ${DESKTOP_MAX_WIDTH};
  --fa-side-padding: ${DESKTOP_SIDE_PADDING};
  --fa-mobile-side-padding: ${MOBILE_SIDE_PADDING};

  width: 100%;
  background: #FFFAF0;
  color: #1a1408;

  padding-top: clamp(56px, 8vw, 104px);
  padding-bottom: clamp(64px, 9vw, 120px);

  overflow: hidden;
}


/* ============================================================
   MAIN CONTENT CONTAINER

   CHANGE ONLY THESE VALUES ABOVE:

   --fa-max-width
   --fa-side-padding
   --fa-mobile-side-padding
   ============================================================ */

.fa-stage {
  position: relative;

  width: calc(
    100% - (var(--fa-side-padding) * 2)
  );

  max-width: var(--fa-max-width);

  margin-left: auto;
  margin-right: auto;

  /* 4 cards ke liye stage lamba kiya (pehle 954 / 846) */
  aspect-ratio: 954 / 1299;
}


/* ============================================================
   HEADING
   ============================================================ */

.fa-head {
  position: absolute;
  left: 0;
  top: 0;
  width: 37.4%;
}

.fa-title {
  margin: 0;

  font-weight: 700;
  color: #1a1408;

  font-size: clamp(20px, 2.2vw, 30px);
  line-height: 1.2;
  letter-spacing: 0.005em;
}

.fa-rule {
  height: 1px;

  background: #B8A98A;

  margin:
    clamp(16px, 2.2vw, 31px)
    0
    clamp(12px, 1.75vw, 25px);

  border: 0;
  padding: 0;
}

.fa-sub {
  margin: 0;

  font-weight: 400;
  color: #2a2417;

  font-size: clamp(12px, 1vw, 15px);
  line-height: 1.7;
  letter-spacing: 0.02em;

  max-width: 92%;
}


/* ============================================================
   CARDS
   ============================================================ */

.fa-card {
  position: absolute;

  display: block;
  overflow: hidden;

  padding: 0;
  border: 0;
  margin: 0;

  background: #d8cfb8;

  cursor: pointer;
  text-align: left;

  font: inherit;
  color: #fff;

  -webkit-tap-highlight-color: transparent;
}

.fa-card img {
  object-fit: cover;
  object-position: center;

  transition: transform 0.8s ease;
}

.fa-card:hover img {
  transform: scale(1.04);
}

.fa-card:focus-visible {
  outline: 2px solid #534011;
  outline-offset: 3px;
}


/* ============================================================
   DESKTOP CARD POSITIONS (zig-zag: right, left, right, left)
   ============================================================ */

.fa-swiss {
  left: 43.71%;
  top: 0;

  width: 56.29%;
  height: 30.25%;
}

.fa-pool {
  left: 0;
  top: 17.09%;

  width: 31.13%;
  height: 36.64%;
}

.fa-lawns {
  left: 36.16%;
  top: 34.87%;

  width: 63.84%;
  height: 30.25%;
}

.fa-kitchen {
  left: 0;
  top: 69.75%;

  width: 63.84%;
  height: 30.25%;
}


/* ============================================================
   GLASS CAPTION
   ============================================================ */

.fa-cap {
  position: absolute;

  left: clamp(10px, 1.6vw, 23px);
  right: clamp(10px, 1.6vw, 23px);
  bottom: clamp(10px, 1.5vw, 21px);

  display: block;
  text-align: left;

  padding:
    clamp(12px, 1.45vw, 20px)
    clamp(14px, 1.6vw, 23px);

  background:
    linear-gradient(
      100deg,
      rgba(38, 30, 10, 0.66) 0%,
      rgba(74, 62, 22, 0.44) 100%
    );

  -webkit-backdrop-filter: blur(14px) saturate(1.1);
  backdrop-filter: blur(14px) saturate(1.1);

  border: 1px solid rgba(255, 255, 255, 0.16);
}

.fa-cap-top {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 12px;
}

.fa-cap-title {
  font-weight: 500;
  color: #fff;

  letter-spacing: 0.01em;

  font-size: clamp(15px, 1.5vw, 20px);
  line-height: 1.2;
}

.fa-cap-icon {
  flex: 0 0 auto;

  width: clamp(16px, 1.6vw, 22px);
  height: clamp(16px, 1.6vw, 22px);

  color: #fff;
  opacity: 0.9;

  transition: transform 0.3s ease;
}

.fa-card:hover .fa-cap-icon {
  transform: scale(1.15);
}

.fa-cap-desc {
  display: block;

  margin-top: clamp(8px, 1.2vw, 16px);

  color: rgba(255, 255, 255, 0.92);

  font-size: clamp(11px, 0.86vw, 13px);
  line-height: 1.65;
  font-weight: 400;
}


/* ============================================================
   POPUP
   ============================================================ */

.fa-modal {
  position: fixed;
  inset: 0;

  z-index: 2147483000;

  display: flex;
  align-items: center;
  justify-content: center;

  padding:
    clamp(16px, 5vh, 48px)
    24px;

  background: rgba(18, 14, 5, 0.5);

  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);

  animation: fa-fade 0.25s ease both;
}

.fa-dialog {
  position: relative;

  width: min(1040px, 100%);

  max-height:
    calc(
      100vh -
      2 * clamp(16px, 5vh, 48px)
    );

  max-height:
    calc(
      100dvh -
      2 * clamp(16px, 5vh, 48px)
    );

  overflow: auto;
  overscroll-behavior: contain;

  background: #fff;
  color: #111;

  padding: 16px;

  display: grid;

  grid-template-columns: 55% 1fr;

  gap: clamp(24px, 3vw, 44px);

  animation: fa-pop 0.3s ease both;
}

.fa-dialog-img {
  position: relative;

  aspect-ratio: 359 / 342;

  overflow: hidden;

  background: #d8cfb8;
}

.fa-dialog-img img {
  object-fit: cover;
  object-position: center;
}

.fa-dialog-body {
  padding: 14px 8px 14px 0;
  min-width: 0;
}

.fa-dialog-title {
  margin: 0;

  padding-right: 44px;

  font-weight: 600;
  color: #111;

  font-size: clamp(22px, 2.7vw, 32px);
  line-height: 1.2;
}

.fa-dialog-desc {
  margin:
    clamp(14px, 1.6vw, 20px)
    0
    0;

  font-size: clamp(14px, 1.35vw, 16px);
  line-height: 1.65;

  color: #1b1b1b;
}

.fa-list {
  list-style: none;

  margin:
    clamp(16px, 2vw, 26px)
    0
    0;

  padding: 0;
}

.fa-list li {
  display: flex;
  align-items: flex-start;

  gap: 12px;

  margin-top:
    clamp(14px, 1.8vw, 22px);

  font-size: clamp(14px, 1.3vw, 15.5px);
  line-height: 1.55;

  color: #1b1b1b;
}

.fa-list svg {
  flex: 0 0 auto;

  width: 15px;
  height: 15px;

  margin-top: 4px;
}

.fa-x {
  position: absolute;

  top: 22px;
  right: 22px;

  width: 32px;
  height: 32px;

  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid #111;
  border-radius: 50%;

  background: #fff;
  color: #111;

  cursor: pointer;

  z-index: 3;

  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.fa-x:hover {
  background: #111;
  color: #fff;
}

.fa-x svg {
  width: 14px;
  height: 14px;
}

.fa-x:focus-visible {
  outline: 2px solid #534011;
  outline-offset: 2px;
}


/* ============================================================
   ANIMATIONS
   ============================================================ */

@keyframes fa-fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fa-pop {
  from {
    opacity: 0;
    transform: translateY(14px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: none;
  }
}


/* ============================================================
   TABLET + MOBILE
   Sabhi images CENTER mein, ek hi width, ek hi size
   ============================================================ */

@media (max-width: 900px) {

  .fa {
    padding: 56px 0 64px;
  }

  .fa-stage {
    width: calc(
      100% - (var(--fa-mobile-side-padding) * 2)
    );

    max-width: 560px;

    margin-left: auto;
    margin-right: auto;

    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 20px;

    aspect-ratio: auto;
  }

  .fa-head {
    position: static;

    width: 100%;
    align-self: stretch;

    margin-bottom: 8px;
  }

  .fa-title {
    font-size: clamp(24px, 7vw, 32px);
  }

  .fa-rule {
    margin: 18px 0 16px;
  }

  .fa-sub {
    font-size: 14px;
    max-width: 100%;
  }

  /* saare cards: full width, center, same size */
  .fa-card,
  .fa-swiss,
  .fa-pool,
  .fa-lawns,
  .fa-kitchen {
    position: relative;

    left: auto;
    top: auto;

    width: 100%;
    height: auto;

    margin-left: auto;
    margin-right: auto;

    aspect-ratio: 4 / 4.4;
  }

  .fa-cap {
    left: 12px;
    right: 12px;
    bottom: 12px;

    padding: 14px 16px;
  }

  .fa-cap-title {
    font-size: clamp(16px, 4.8vw, 21px);
  }

  .fa-cap-icon {
    width: 20px;
    height: 20px;
  }

  .fa-cap-desc {
    margin-top: 8px;

    font-size: 12.5px;
    line-height: 1.6;
  }
}


/* ============================================================
   MOBILE
   ============================================================ */

@media (max-width: 600px) {

  .fa-stage {
    width: calc(
      100% - (var(--fa-mobile-side-padding) * 2)
    );

    max-width: none;

    gap: 18px;
  }

  .fa-card,
  .fa-swiss,
  .fa-pool,
  .fa-lawns,
  .fa-kitchen {
    width: 100%;

    aspect-ratio: 4 / 4.6;
  }

  .fa-cap {
    left: 10px;
    right: 10px;
    bottom: 10px;

    padding: 12px 14px;
  }

  .fa-cap-desc {
    font-size: 12px;
    line-height: 1.55;
  }
}


/* ============================================================
   MOBILE POPUP
   ============================================================ */

@media (max-width: 767px) {

  .fa-modal {
    padding: 16px;

    align-items: center;
  }

  .fa-dialog {
    grid-template-columns: 1fr;

    gap: 0;

    padding: 0;

    max-height: calc(100vh - 32px);
    max-height: calc(100dvh - 32px);
  }

  .fa-dialog-img {
    aspect-ratio: 4 / 3;
  }

  .fa-dialog-body {
    padding: 20px 20px 26px;
  }

  .fa-dialog-title {
    padding-right: 0;

    font-size: 24px;
  }

  .fa-dialog-desc {
    font-size: 14.5px;
  }

  .fa-list li {
    font-size: 14px;
  }

  .fa-x {
    top: 12px;
    right: 12px;

    width: 34px;
    height: 34px;

    border: 0;

    background: rgba(255, 255, 255, 0.94);

    box-shadow:
      0 2px 10px rgba(0, 0, 0, 0.25);
  }
}


/* ============================================================
   SMALL MOBILE
   ============================================================ */

@media (max-width: 360px) {

  .fa-cap {
    padding: 10px 12px;
  }

  .fa-cap-title {
    font-size: 15px;
  }

  .fa-cap-desc {
    font-size: 11.5px;
  }
}


/* ============================================================
   REDUCED MOTION
   ============================================================ */

@media (prefers-reduced-motion: reduce) {

  .fa-modal,
  .fa-dialog {
    animation: none;
  }

  .fa-card img {
    transition: none;
  }
}
`;


/* ============================================================
   EXPAND ICON
   ============================================================ */

function ExpandIcon() {
  return (
    <svg
      className="fa-cap-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 3h7v7" />
      <path d="M21 3l-8 8" />
      <path d="M10 21H3v-7" />
      <path d="M3 21l8-8" />
    </svg>
  );
}


/* ============================================================
   MAIN COMPONENT
   ============================================================ */

export default function Facilities() {

  const [active, setActive] = useState(null);

  const [mounted, setMounted] = useState(false);

  const lastTrigger = useRef(null);

  const closeRef = useRef(null);


  /* ==========================================================
     PORTAL
     ========================================================== */

  useEffect(() => {
    setMounted(true);
  }, []);


  /* ==========================================================
     OPEN
     ========================================================== */

  const open = (item, event) => {
    lastTrigger.current = event.currentTarget;
    setActive(item);
  };


  /* ==========================================================
     CLOSE
     ========================================================== */

  const close = () => {
    setActive(null);
    lastTrigger.current?.focus?.();
  };


  /* ==========================================================
     MODAL SCROLL LOCK + ESC
     ========================================================== */

  useEffect(() => {

    if (!active) {
      return;
    }

    const html = document.documentElement;

    const prevOverflow = html.style.overflow;

    const prevGutter = html.style.scrollbarGutter;

    html.style.scrollbarGutter = "stable";

    html.style.overflow = "hidden";


    const onKey = (event) => {

      if (event.key === "Escape") {
        setActive(null);
        lastTrigger.current?.focus?.();
      }

    };


    document.addEventListener(
      "keydown",
      onKey
    );

    closeRef.current?.focus();


    return () => {

      document.removeEventListener(
        "keydown",
        onKey
      );

      html.style.overflow =
        prevOverflow;

      html.style.scrollbarGutter =
        prevGutter;

    };

  }, [active]);


  /* ============================================================
     MODAL
     ============================================================ */

  const modal =
    mounted && active
      ? createPortal(
          <div
            className={`fa-modal ${monaSans.className}`}
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                close();
              }
            }}
          >

            <div
              className="fa-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="fa-dialog-title"
            >

              <button
                ref={closeRef}
                type="button"
                className="fa-x"
                onClick={close}
                aria-label="Close"
              >

                <svg
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M2 2l10 10M12 2L2 12" />
                </svg>

              </button>


              <div className="fa-dialog-img">

                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  sizes="(max-width: 767px) 100vw, 600px"
                  quality={90}
                />

              </div>


              <div className="fa-dialog-body">

                <h3
                  id="fa-dialog-title"
                  className={`fa-dialog-title ${cinzel.className}`}
                >
                  {active.title}
                </h3>


                <p className="fa-dialog-desc">
                  {active.description}
                </p>


                <ul className="fa-list">

                  {active.details.map((line) => (

                    <li key={line}>

                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M3 8.5l3.2 3.2L13 4.8" />
                      </svg>

                      <span>
                        {line}
                      </span>

                    </li>

                  ))}

                </ul>

              </div>

            </div>

          </div>,

          document.body
        )
      : null;


  /* ============================================================
     RETURN
     ============================================================ */

  return (
    <section
      className={`fa ${monaSans.className}`}
      id="facilities"
    >

      <style
        dangerouslySetInnerHTML={{
          __html: CSS,
        }}
      />


      <div className="fa-stage">

        {/* HEADING */}

        <div className="fa-head">

          <h2
            className={`fa-title ${cinzel.className}`}
          >
            {SECTION_TITLE}
          </h2>

          <hr className="fa-rule" />

          <p
            className={`fa-sub ${cinzel.className}`}
          >
            {SECTION_SUBTITLE}
          </p>

        </div>


        {/* CARDS */}

        {FACILITIES.map((item) => (

          <button
            key={item.id}
            type="button"
            className={`fa-card fa-${item.id}`}
            onClick={(event) =>
              open(item, event)
            }
            aria-haspopup="dialog"
            aria-label={`${item.title} — view details`}
          >

            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 900px) 100vw, 60vw"
              quality={90}
            />


            <span className="fa-cap">

              <span className="fa-cap-top">

                <span
                  className={`fa-cap-title ${cinzel.className}`}
                >
                  {item.title}
                </span>

                <ExpandIcon />

              </span>


              <span className="fa-cap-desc">
                {item.description}
              </span>

            </span>

          </button>

        ))}

      </div>


      {modal}

    </section>
  );
}