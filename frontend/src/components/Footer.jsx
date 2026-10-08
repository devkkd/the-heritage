"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Cinzel, Mona_Sans } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const monaSans = Mona_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mona",
  display: "swap",
});

const LINK_COLS = [
  [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Rooms & Suites", href: "/rooms" },
  ],
  [
    { label: "Experiences", href: "/experiences" },
     { label: "Gallery", href: "/gallery" },


  ],
  [

    { label: "Weddings & Events", href: "/weddings" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
  ],
];

const PHONE_LABEL = "+91 81350 41323";
const PHONE_HREF = "tel:+918135041323";

const WA_LABEL = "+34 610 37 31 44";
const WA_HREF = "https://wa.me/34610373144";

const CSS = `
.ft,
.ft *,
.ft *::before,
.ft *::after {
  box-sizing: border-box;
}

.ft {
  --ink: #FFFAF0;
  --line: rgba(255, 250, 240, 0.38);

  position: relative;
  width: 100%;

  color: var(--ink);

  background-color: #524012;
  background-image: url("/home/footerbg3.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  font-family:
    var(--font-mona),
    system-ui,
    -apple-system,
    "Segoe UI",
    Arial,
    sans-serif;

  font-weight: 300;

  overflow: hidden;
}

.ft a {
  color: inherit;
  text-decoration: none;
}


/* =========================================================
   MAIN CONTAINER
========================================================= */

.ft-inner {
  width: calc(100% - 124px);
  max-width: 1400px;

  margin-left: auto;
  margin-right: auto;
}


/* =========================================================
   LOGO
========================================================= */

.ft-logo {
  display: flex;
  justify-content: center;

  padding-top: 36px;
}

.ft-logo img {
  width: 150px;
  height: 150px;

  object-fit: contain;
  display: block;
}


/* =========================================================
   ACCORDION
========================================================= */

.ft-acc-head {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  background: none;
  border: 0;

  padding: 0;
  margin: 0;

  color: inherit;
  font: inherit;
  text-align: inherit;

  cursor: default;
  pointer-events: none;
}

.ft-chev {
  display: none;

  width: 18px;
  height: 18px;

  flex-shrink: 0;

  stroke: currentColor;
  fill: none;
  stroke-width: 1.6;

  transition: transform 0.3s ease;
}

.ft-acc-body {
  display: grid;
  grid-template-rows: 1fr;
}

.ft-acc-inner {
  min-height: 0;
  overflow: visible;
}


/* =========================================================
   BRAND
========================================================= */

.ft-brand {
  text-align: center;
  margin-top: 34px;
}

.ft-brand .ft-acc-head {
  justify-content: center;
}

.ft-brand-title {
  font-family: var(--font-cinzel), Georgia, serif;

  font-weight: 700;
  font-size: 17px;

  letter-spacing: 0.3px;
  text-transform: uppercase;

  line-height: 1.2;
}

.ft-brand-desc {
  max-width: 800px;

  margin: 14px auto 0;

  font-size: 12px;
  line-height: 1.55;
}


/* =========================================================
   MAIN FOOTER CONTENT
========================================================= */

.ft-main {
  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    1px
    minmax(0, 1.15fr);

  column-gap: 60px;

  align-items: stretch;

  margin-top: 44px;

  padding-bottom: 44px;
}

.ft-divider {
  background: var(--line);

  width: 1px;

  align-self: stretch;
}

.ft-main-left,
.ft-main-right {
  min-width: 0;
}


/* =========================================================
   QUICK LINKS
========================================================= */

.ft-h {
  font-weight: 600;

  font-size: 11.5px;

  letter-spacing: 0.2px;

  text-transform: uppercase;

  line-height: 1.2;
}

.ft-links {
  display: grid;

  grid-template-columns: repeat(3, auto);

  justify-content: start;

  column-gap: 52px;

  margin-top: 10px;
}

.ft-links-col {
  display: flex;

  flex-direction: column;

  justify-content: flex-end;

  gap: 7px;
}

.ft-links-col a {
  font-size: 11.5px;

  line-height: 1.3;

  transition: opacity 0.2s ease;
}

.ft-links-col a:hover {
  opacity: 0.7;
}


/* =========================================================
   CONTACT & RESERVATIONS
   SCREENSHOT STYLE
========================================================= */

.ft-contact-grid {
  display: grid;

  /*
    Three equal areas:

    Column 1 → Reservations
    Column 2 → WhatsApp
    Column 3 → Resort Address
  */
  grid-template-columns:
    minmax(0, 1fr)
    minmax(0, 1fr)
    minmax(0, 1fr);

  column-gap: 48px;

  row-gap: 40px;

  margin-top: 20px;

  align-items: start;
}


/* CONTACT HEADING */

.ft-contact-grid .ft-h {
  grid-column: 1 / span 2;

  margin: 0;

  font-size: 11.5px;

  font-weight: 600;

  line-height: 1.2;

  text-transform: uppercase;

  letter-spacing: 0.2px;
}


/* CONTACT ITEMS */

.ft-c-item {
  font-size: 11.5px;

  line-height: 1.5;

  min-width: 0;
}

.ft-c-item b {
  display: block;

  font-weight: 300;

  margin-bottom: 0;
}

.ft-c-item a {
  display: inline-block;

  margin-top: 0;

  transition: opacity 0.2s ease;
}

.ft-c-item a:hover {
  opacity: 0.7;
}


/* RESORT ADDRESS */

.ft-address {
  grid-column: 3;

  grid-row: 1 / span 2;

  font-size: 11.5px;

  line-height: 1.5;

  min-width: 0;

  margin: 0;
}

.ft-address b {
  display: block;

  font-weight: 300;

  margin-bottom: 0;
}


/* =========================================================
   HORIZONTAL DIVIDER
========================================================= */

.ft-hr {
  height: 1px;

  background: var(--line);

  width: 100%;
}


/* =========================================================
   BOTTOM
========================================================= */

.ft-bottom {
  text-align: center;

  padding: 40px 0 54px;
}


/* =========================================================
   BOOK YOUR STAY
========================================================= */

.ft-book .ft-acc-head {
  justify-content: center;
}

.ft-book-title {
  font-family: var(--font-cinzel), Georgia, serif;

  font-weight: 600;

  font-size: 14px;

  letter-spacing: 0.3px;

  line-height: 1.2;
}

.ft-book-text {
  margin: 14px 0 0;

  font-size: 11.5px;

  line-height: 1.5;
}


/* =========================================================
   COPYRIGHT
========================================================= */

.ft-copy {
  margin-top: 28px;

  font-size: 11.5px;

  line-height: 1.55;
}


/* =========================================================
   KONTENT KRAFT DIGITAL
========================================================= */

.ft-kontent-link {
  display: inline-block;

  color: inherit;

  text-decoration: none;

  transition:
    opacity 0.25s ease,
    color 0.25s ease;
}

.ft-kontent-link:hover {
  opacity: 0.72;
}

.ft-kontent-link:focus-visible {
  outline: 1px solid var(--ink);

  outline-offset: 4px;
}


/* =========================================================
   FOOTER TAG
========================================================= */

.ft-tag {
  margin-top: 22px;

  font-size: 11.5px;

  line-height: 1.5;
}


/* =========================================================
   TABLET
========================================================= */

@media (max-width: 1100px) {

  .ft-inner {
    width: calc(100% - 96px);
  }

  .ft-main {
    column-gap: 40px;
  }

  .ft-links {
    column-gap: 32px;
  }

  .ft-contact-grid {
    column-gap: 30px;
  }
}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 767px) {

  .ft {
    background-image: url("/home/footerbg5.png");
  }

  .ft-inner {
    width: calc(100% - 40px);

    max-width: none;

    margin-left: auto;
    margin-right: auto;
  }


  /* LOGO */

  .ft-logo {
    padding-top: 36px;
  }

  .ft-logo img {
    width: 110px;
    height: 94px;
  }


  /* REMOVE DESKTOP DIVIDERS */

  .ft-hr {
    display: none;
  }


  /* ACCORDION SECTIONS */

  .ft-brand,
  .ft-links-wrap,
  .ft-contact-wrap,
  .ft-book {
    text-align: left;

    margin: 0;

    border-bottom: 1px solid var(--line);
  }

  .ft-brand {
    margin-top: 26px;

    border-top: 1px solid var(--line);
  }


  /* MAIN */

  .ft-main {
    display: block;

    padding: 0;

    margin-top: 0;
  }

  .ft-divider {
    display: none;
  }


  /* ACCORDION */

  .ft-acc-head {
    padding: 18px 0;

    cursor: pointer;

    pointer-events: auto;

    justify-content: space-between !important;

    -webkit-tap-highlight-color: transparent;
  }

  .ft-chev {
    display: block;
  }

  .ft-open .ft-chev {
    transform: rotate(180deg);
  }


  /* ACCORDION ANIMATION */

  .ft-acc-body {
    grid-template-rows: 0fr;

    transition: grid-template-rows 0.35s ease;
  }

  .ft-open .ft-acc-body {
    grid-template-rows: 1fr;
  }

  .ft-acc-inner {
    overflow: hidden;

    visibility: hidden;

    transition: visibility 0s linear 0.35s;
  }

  .ft-open .ft-acc-inner {
    visibility: visible;

    transition-delay: 0s;
  }

  .ft-acc-content {
    padding: 0 0 20px;
  }


  /* BRAND */

  .ft-brand-title {
    font-size: 15px;
  }

  .ft-brand-desc {
    margin: 0;

    max-width: 100%;

    font-size: 12.5px;

    line-height: 1.65;
  }


  /* HEADINGS */

  .ft-h {
    font-size: 13px;
  }

  .ft-book-title {
    font-size: 15px;

    font-weight: 700;

    text-transform: uppercase;
  }


  /* QUICK LINKS */

  .ft-links {
    grid-template-columns: 1fr 1fr;

    column-gap: 20px;

    margin-top: 0;

    justify-content: stretch;
  }

  .ft-links-col {
    justify-content: flex-start;

    gap: 14px;
  }

  .ft-links-col:nth-child(1) {
    grid-column: 1;

    grid-row: 1;
  }

  .ft-links-col:nth-child(2) {
    grid-column: 2;

    grid-row: 1;
  }

  .ft-links-col:nth-child(3) {
    grid-column: 1 / span 2;

    grid-row: 2;

    margin-top: 14px;
  }

  .ft-links-col a {
    font-size: 13px;
  }


  /* =====================================================
     MOBILE CONTACT
  ===================================================== */

  .ft-contact-grid {
    display: flex;

    flex-direction: column;

    gap: 16px;
  }

  .ft-c-item,
  .ft-address {
    font-size: 13px;

    line-height: 1.6;
  }

  .ft-c-item b {
    font-weight: 500;

    margin-bottom: 2px;
  }

  .ft-address b {
    font-weight: 500;

    display: block;

    margin-bottom: 2px;
  }

  .ft-address {
    order: 3;
  }


  /* BOOK */

  .ft-book-text {
    margin: 0;

    font-size: 12.5px;

    line-height: 1.65;
  }


  /* BOTTOM */

  .ft-bottom {
    padding: 24px 0 36px;

    text-align: center;
  }

  .ft-copy {
    margin-top: 0;

    font-size: 12px;
  }

  .ft-tag {
    margin-top: 16px;

    font-size: 12px;
  }

  .ft-kontent-link {
    display: inline-block;
  }
}
`;


/* =========================================================
   CHEVRON
========================================================= */

const Chevron = () => (
  <svg
    className="ft-chev"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);


/* =========================================================
   ACCORDION
========================================================= */

function Acc({
  id,
  open,
  onToggle,
  className = "",
  head,
  children,
}) {
  return (
    <div className={`${className} ${open ? "ft-open" : ""}`}>
      <button
        type="button"
        className="ft-acc-head"
        aria-expanded={open}
        aria-controls={`ft-panel-${id}`}
        onClick={() => onToggle(id)}
      >
        {head}

        <Chevron />
      </button>

      <div
        className="ft-acc-body"
        id={`ft-panel-${id}`}
      >
        <div className="ft-acc-inner">
          <div className="ft-acc-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}


/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((cur) => (cur === id ? null : id));
  };

  return (
    <footer
      className={`ft ${cinzel.variable} ${monaSans.variable}`}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: CSS,
        }}
      />

      <div className="ft-inner">

        {/* =================================================
            LOGO
        ================================================= */}

        <div className="ft-logo">
          <Image
            src="/logo2.png"
            alt="The Heritage Resort"
            width={130}
            height={110}
            priority
          />
        </div>


        {/* =================================================
            BRAND
        ================================================= */}

        <Acc
          id="about"
          className="ft-brand"
          open={openId === "about"}
          onToggle={toggle}
          head={
            <h2 className="ft-brand-title">
              The Heritage Resort Jaipur
            </h2>
          }
        >
          <p className="ft-brand-desc">
            An authentic heritage retreat in Jaipur,
            blending traditional Rajasthani architecture
            with refined comfort. Discover luxury Swiss
            tents, private pools, landscaped lawns,
            memorable experiences, and gracious Rajasthani
            hospitality.
            <br />
            Jaipur, Rajasthan, India
          </p>
        </Acc>


        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div className="ft-main">

          {/* =================================================
              QUICK LINKS
          ================================================= */}

          <Acc
            id="links"
            className="ft-links-wrap ft-main-left"
            open={openId === "links"}
            onToggle={toggle}
            head={
              <h3 className="ft-h">
                Quick Links
              </h3>
            }
          >
            <nav
              className="ft-links"
              aria-label="Footer"
            >
              {LINK_COLS.map((col, i) => (
                <div
                  className="ft-links-col"
                  key={i}
                >
                  {col.map((l) => (
                    <Link
                      key={
                        l.label +
                        l.href +
                        i
                      }
                      href={l.href}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
          </Acc>


          {/* =================================================
              CENTER DIVIDER
          ================================================= */}

          <div className="ft-divider" />


          {/* =================================================
              CONTACT & RESERVATIONS
          ================================================= */}

          <Acc
            id="contact"
            className="ft-contact-wrap ft-main-right"
            open={openId === "contact"}
            onToggle={toggle}
            head={
              <h3 className="ft-h">
                Contact &amp; Reservations
              </h3>
            }
          >

            <div className="ft-contact-grid">

              {/* RESERVATIONS */}

              <div className="ft-c-item">
                <b>
                  Reservations &amp; Enquiries
                </b>

                <a href={PHONE_HREF}>
                  {PHONE_LABEL}
                </a>
              </div>


              {/* WHATSAPP */}

              <div className="ft-c-item">
                <b>
                  WhatsApp Support
                </b>

                <a
                  href={WA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {WA_LABEL}
                </a>
              </div>


              {/* RESORT ADDRESS */}

              <div className="ft-address">
                <b>
                  Resort Address
                </b>

                The Heritage Resort,
                <br />
                Jaisinghpura Road, Bhokrota,
                <br />
                Jaipur, Rajasthan, India
              </div>

            </div>

          </Acc>

        </div>

      </div>


      {/* =================================================
          HORIZONTAL DIVIDER
      ================================================= */}

      <div className="ft-hr" />


      <div className="ft-inner">

        <div className="ft-bottom">

          {/* =================================================
              BOOK YOUR STAY
          ================================================= */}

          <Acc
            id="book"
            className="ft-book"
            open={openId === "book"}
            onToggle={toggle}
            head={
              <h3 className="ft-book-title">
                Book Your Stay
              </h3>
            }
          >
            <p className="ft-book-text">
              Plan your escape to Jaipur and
              experience heritage, hospitality,
              and timeless comfort.
            </p>
          </Acc>


          {/* =================================================
              COPYRIGHT
          ================================================= */}

          <div className="ft-copy">

            © 2026 The Heritage Resort Jaipur.
            All Rights Reserved.

            <br />

            <a
              href="https://www.kontentkraftdigital.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="ft-kontent-link"
            >
              Crafted by Kontent Kraft Digital
            </a>

          </div>


          {/* =================================================
              FOOTER TAG
          ================================================= */}

          <div className="ft-tag">
            Jaipur, Rajasthan · WhatsApp Support · Direct Contact
          </div>

        </div>

      </div>

    </footer>
  );
}