import Image from "next/image";
import { Cinzel, Mona_Sans } from "next/font/google";

/* ============================================================
   FONTS
   ============================================================ */

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
   ============================================================ */

const WHATSAPP_NUMBER = "34610373144";


/* ============================================================
   EXPERIENCES
   ============================================================ */

const EXPERIENCES = [
  {
    id: "breakfast",
    label: "Morning Sunrise Private Dining",
    title: "Breakfast at First Light",
    image: "/newhome/exp/1.png",
    description:
      "Begin the day in the quiet warmth of Jaipur as the first light settles over the landscape. Enjoy a relaxed breakfast surrounded by nature, with freshly prepared favourites and an unhurried setting made for beautiful mornings.",
  },
  {
    id: "stepwell",
    label: "Evening Heritage Dinner Under the Stars",
    title: "Stepwell Soirée",
    image: "/newhome/exp/2.png",
    description:
      "Step into an atmospheric evening inspired by Rajasthan's timeless heritage. Soft candlelight, intimate dining and the character of an old stepwell create a memorable setting for an elegant night away from the ordinary.",
  },
  {
    id: "rawla",
    label: "Sunset Private Dining",
    title: "The Rawla Sundowner",
    image: "/newhome/exp/3.png",
    description:
      "As the sun begins to set, settle into an intimate setting designed for long conversations and memorable flavours. Warm lights, open air and a beautifully composed dinner create the perfect close to the day.",
  },
];


/* ============================================================
   WHATSAPP
   ============================================================ */

const whatsappLink = (item) => {
  const message = [
    "Hello The Heritage Resort,",
    "",
    `I would like to book the "${item.title}" experience.`,
    "",
    "Experience Details:",
    item.label,
    "",
    "Please share the availability and pricing.",
    "",
    "Thank you.",
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
};


/* ============================================================
   CSS
   ============================================================ */

const CSS = `
.ex,
.ex *,
.ex *::before,
.ex *::after {
  box-sizing: border-box;
}


/* ============================================================
   MAIN SECTION
   ============================================================ */

.ex {
  width: 100%;
  background: #FFFAF0;
  color: #0E0E0E;

  padding-top: clamp(48px, 7.8vw, 108px);
  padding-bottom: clamp(56px, 6vw, 88px);

  overflow: hidden;
}


/* ============================================================
   MAIN CONTAINER

   DESKTOP:
   MAX WIDTH = 1400px
   LEFT = 62px
   RIGHT = 62px

   MOBILE:
   LEFT = 20px
   RIGHT = 20px
   ============================================================ */

.ex-inner {
  width: calc(100% - 124px);

  max-width: 1400px;

  margin-left: auto;
  margin-right: auto;

  display: flex;
  flex-direction: column;

  gap: clamp(36px, 5.5vw, 76px);
}


/* ============================================================
   ROW
   ============================================================ */

.ex-row {
  display: grid;

  grid-template-columns: 542fr 298fr;

  column-gap: clamp(20px, 2.4vw, 34px);

  align-items: center;
}


/* ============================================================
   REVERSE ROW
   ============================================================ */

.ex-row-rev {
  grid-template-columns: 298fr 542fr;
}

.ex-row-rev .ex-media {
  order: 2;
}


/* ============================================================
   IMAGE
   ============================================================ */

.ex-media {
  position: relative;

  width: 100%;

  aspect-ratio: 542 / 358;

  overflow: hidden;

  background: #e9e0c9;
}

.ex-media img {
  object-fit: cover;
  object-position: center;
}


/* ============================================================
   TEXT
   ============================================================ */

.ex-body {
  min-width: 0;
}

.ex-label {
  margin:
    0
    0
    clamp(16px, 1.9vw, 26px);

  color: #0E0E0E;

  font-size: clamp(11px, 0.95vw, 14px);

  line-height: 1.45;

  font-weight: 400;

  text-transform: uppercase;

  letter-spacing: 0.005em;
}

.ex-title {
  margin: 0;

  color: #0E0E0E;

  font-weight: 700;

  font-size: clamp(20px, 2.3vw, 30px);

  line-height: 1.2;

  letter-spacing: 0.005em;
}

.ex-rule {
  display: block;

  width: 100%;
  height: 1px;

  border: 0;
  padding: 0;

  margin:
    clamp(16px, 1.9vw, 26px)
    0
    clamp(14px, 1.7vw, 24px);

  background: rgba(83, 64, 17, 0.55);
}

.ex-desc {
  margin:
    0
    0
    clamp(20px, 2.3vw, 32px);

  color: #0E0E0E;

  font-size: clamp(12.5px, 1.05vw, 14.5px);

  line-height: 1.7;

  font-weight: 400;
}


/* ============================================================
   BOOK BUTTON
   ============================================================ */

.ex-btn {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  gap: 8px;

  height: clamp(38px, 3.4vw, 44px);

  padding: 0 clamp(18px, 1.9vw, 26px);

  background: #534011;

  color: #fff;

  text-decoration: none;

  font-size: clamp(12px, 1vw, 14px);

  font-weight: 400;

  line-height: 1;

  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.ex-btn:hover {
  background: #43330d;
}

.ex-btn:active {
  transform: translateY(1px);
}

.ex-btn:focus-visible {
  outline: 2px solid #534011;
  outline-offset: 3px;
}

.ex-btn svg {
  width: 11px;
  height: 11px;

  flex: 0 0 auto;
}


/* ============================================================
   TABLET
   ============================================================ */

@media (max-width: 900px) {

  .ex {
    padding-top: 48px;
    padding-bottom: 56px;
  }

  /*
    MOBILE/TABLET FIXED SIDE PADDING
    LEFT = 20px
    RIGHT = 20px
  */

  .ex-inner {
    width: calc(100% - 40px);

    max-width: 680px;

    margin-left: auto;
    margin-right: auto;

    gap: 44px;
  }

  .ex-row,
  .ex-row-rev {
    grid-template-columns: 1fr;

    row-gap: 22px;
  }

  .ex-row-rev .ex-media {
    order: 0;
  }

  .ex-media {
    aspect-ratio: 4 / 3.1;
  }

  .ex-label {
    margin-bottom: 14px;

    font-size: 12px;
  }

  .ex-title {
    font-size: clamp(22px, 6.4vw, 30px);
  }

  .ex-rule {
    margin:
      16px
      0
      14px;
  }

  .ex-desc {
    margin-bottom: 22px;

    font-size: 14px;
  }

  .ex-btn {
    height: 42px;

    padding: 0 22px;

    font-size: 13px;
  }
}


/* ============================================================
   MOBILE
   ============================================================ */

@media (max-width: 600px) {

  .ex-inner {
    width: calc(100% - 40px);

    max-width: none;

    margin-left: auto;
    margin-right: auto;
  }

  .ex-row,
  .ex-row-rev {
    row-gap: 20px;
  }

  .ex-media {
    aspect-ratio: 4 / 3;
  }

  .ex-label {
    font-size: 11px;
    line-height: 1.5;
  }

  .ex-title {
    font-size: clamp(21px, 7vw, 27px);
    line-height: 1.22;
  }

  .ex-desc {
    font-size: 13px;
    line-height: 1.7;
  }

  .ex-btn {
    height: 40px;

    padding: 0 20px;

    font-size: 12px;
  }
}


/* ============================================================
   VERY SMALL MOBILE
   ============================================================ */

@media (max-width: 360px) {

  .ex-inner {
    width: calc(100% - 40px);
  }

  .ex-desc {
    font-size: 13px;
  }

  .ex-title {
    font-size: 21px;
  }

  .ex-btn {
    height: 39px;

    padding: 0 18px;

    font-size: 11px;
  }
}


/* ============================================================
   REDUCED MOTION
   ============================================================ */

@media (prefers-reduced-motion: reduce) {

  .ex-btn {
    transition: none;
  }
}
`;


/* ============================================================
   COMPONENT
   ============================================================ */

export default function Experiences() {
  return (
    <section
      className={`ex ${monaSans.className}`}
      id="experiences"
    >

      <style
        dangerouslySetInnerHTML={{
          __html: CSS,
        }}
      />


      <div className="ex-inner">

        {EXPERIENCES.map((item, i) => (

          <article
            key={item.id}
            className={`ex-row ${
              i % 2 === 1
                ? "ex-row-rev"
                : ""
            }`}
          >

            {/* IMAGE */}

            <div className="ex-media">

              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 900px) 100vw, 55vw"
                quality={90}
              />

            </div>


            {/* CONTENT */}

            <div className="ex-body">

              <p className="ex-label">
                {item.label}
              </p>


              <h3
                className={`ex-title ${cinzel.className}`}
              >
                {item.title}
              </h3>


              <hr className="ex-rule" />


              <p className="ex-desc">
                {item.description}
              </p>


              <a
                href={whatsappLink(item)}
                target="_blank"
                rel="noopener noreferrer"
                className="ex-btn"
              >
                Book Now

                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M1.5 6h9M7 2.5L10.5 6 7 9.5" />
                </svg>
              </a>

            </div>

          </article>

        ))}

      </div>

    </section>
  );
}