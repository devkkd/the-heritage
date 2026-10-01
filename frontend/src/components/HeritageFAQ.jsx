'use client';

import { useState } from 'react';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-playfair',
  display: 'swap',
});

const FAQS = [
  {
    question: 'Does The Heritage Resort Jaipur have a swimming pool?',
    answer:
      'Yes. The Heritage Resort Jaipur features an outdoor swimming pool, offering guests a relaxed space to unwind during their stay.',
  },

  {
    question: 'What kind of stay does The Heritage Resort Jaipur offer?',
    answer:
      'The resort offers a relaxed heritage-inspired stay in Jaipur, combining comfortable accommodation with gardens, outdoor spaces and the character of Rajasthan.',
  },

  {
    question: 'What time is check-in at The Heritage Resort Jaipur?',
    answer:
      'Check-in is available from 3:00 PM. If you expect to arrive later, it is advisable to coordinate your arrival with the resort in advance.',
  },

  {
    question: 'What time is check-out at The Heritage Resort Jaipur?',
    answer:
      'Check-out is by 11:00 AM. Guests can confirm any special requirements or late check-out possibilities directly with the resort.',
  },

  {
    question: 'Where is The Heritage Resort Jaipur located?',
    answer:
      'The Heritage Resort is located in Jaipur, Rajasthan, in the 302029 area. Its setting offers a quieter stay while remaining connected to Jaipur and its surrounding attractions.',
  },

  {
    question: 'Does The Heritage Resort Jaipur provide parking?',
    answer:
      'Yes. Private parking is available on site for guests staying at the resort.',
  },

  {
    question: 'Is Wi-Fi available at The Heritage Resort Jaipur?',
    answer:
      'Yes. Wi-Fi is available at the property for guests during their stay.',
  },

  {
    question: 'Is The Heritage Resort Jaipur suitable for families?',
    answer:
      'Yes. The property accommodates families and offers spaces suited to a relaxed stay in Jaipur.',
  },
];

export default function HeritageFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((current) =>
      current === index ? null : index
    );
  };

  return (
    <section
      id="faq"
      className={`${playfair.variable} heritage-faq`}
    >

      <style
        dangerouslySetInnerHTML={{
          __html: `

            /* ============================================================
               RESET
            ============================================================ */

            .heritage-faq,
            .heritage-faq *,
            .heritage-faq *::before,
            .heritage-faq *::after {
              box-sizing: border-box;
            }


            /* ============================================================
               MAIN SECTION
            ============================================================ */

            .heritage-faq {
              width: 100%;

              margin: 0;

              padding: 0;

              background: transparent;

              color: #111111;

              overflow: hidden;
            }


            /* ============================================================
               INNER
            ============================================================ */

            .faq-inner {
              width: 100%;

              max-width: 1000px;

              margin: 0 auto;

              padding:
                75px 32px
                100px;
            }


            /* ============================================================
               HEADING
            ============================================================ */

            .faq-heading-wrap {
              width: 100%;

              display: flex;

              align-items: center;

              justify-content: center;

              gap: 25px;

              margin-bottom: 70px;
            }


            .faq-heading-line {
              width: 75px;

              height: 1px;

              background: rgba(96, 81, 31, 0.38);

              flex-shrink: 0;
            }


            .faq-heading {
              margin: 0;

              color: #60511F;

              font-family:
                var(--font-playfair),
                Georgia,
                'Times New Roman',
                serif;

font-size: clamp(30px, 3.2vw, 48px);

              font-weight: 400;

              line-height: 1;

              letter-spacing:
                clamp(2px, 0.25vw, 4px);

              text-align: center;

              text-transform: uppercase;
            }


            /* ============================================================
               FAQ LIST
            ============================================================ */

            .faq-list {
              width: 100%;

              border-top:
                1px solid rgba(96, 81, 31, 0.16);
            }


            /* ============================================================
               FAQ ITEM
            ============================================================ */

            .faq-item {
              width: 100%;

              border-bottom:
                1px solid rgba(96, 81, 31, 0.16);
            }


            /* ============================================================
               QUESTION BUTTON
            ============================================================ */

            .faq-question {
              width: 100%;

              min-height: 96px;

              padding:
                25px 32px;

              display: flex;

              align-items: center;

              justify-content: space-between;

              gap: 30px;

              border: 0;

              outline: 0;

              background: transparent;

              color: #111111;

              font-family:
                var(--font-playfair),
                Georgia,
                'Times New Roman',
                serif;

              font-size:
                clamp(18px, 1.45vw, 24px);

              font-weight: 500;

              line-height: 1.35;

              text-align: left;

              cursor: pointer;

              transition:
                color 0.3s ease,
                background 0.3s ease;
            }


            .faq-question:hover {
              color: #60511F;

              background:
                rgba(96, 81, 31, 0.025);
            }


            /* ============================================================
               QUESTION TEXT
            ============================================================ */

            .faq-question-text {
              flex: 1;

              min-width: 0;
            }


            /* ============================================================
               ICON
            ============================================================ */

            .faq-icon {
              position: relative;

              width: 26px;

              height: 26px;

              flex: 0 0 26px;

              display: flex;

              align-items: center;

              justify-content: center;
            }


            .faq-icon::before,
            .faq-icon::after {
              content: '';

              position: absolute;

              left: 50%;

              top: 50%;

              width: 21px;

              height: 1.5px;

              background: #60511F;

              transform:
                translate(
                  -50%,
                  -50%
                );

              transition:
                transform 0.35s ease,
                opacity 0.35s ease;
            }


            .faq-icon::after {
              transform:
                translate(
                  -50%,
                  -50%
                )
                rotate(90deg);
            }


            /* ============================================================
               OPEN ICON
            ============================================================ */

            .faq-item.open
            .faq-icon::after {

              transform:
                translate(
                  -50%,
                  -50%
                )
                rotate(0deg);

              opacity: 0;
            }


            /* ============================================================
               ANSWER WRAPPER
            ============================================================ */

            .faq-answer-wrapper {
              display: grid;

              grid-template-rows: 0fr;

              transition:
                grid-template-rows 0.45s
                cubic-bezier(
                  0.22,
                  0.61,
                  0.36,
                  1
                );
            }


            .faq-item.open
            .faq-answer-wrapper {
              grid-template-rows: 1fr;
            }


            .faq-answer-inner {
              min-height: 0;

              overflow: hidden;
            }


            /* ============================================================
               ANSWER
            ============================================================ */

            .faq-answer {
              max-width: 900px;

              padding:
                0 90px
                0 32px;

              margin: 0;

              color: #111111;

              font-family:
                var(--font-playfair),
                Georgia,
                'Times New Roman',
                serif;

              font-size:
                clamp(14px, 1.05vw, 17px);

              font-weight: 400;

              line-height: 1.8;

              opacity: 0;

              transform: translateY(-8px);

              transition:
                opacity 0.3s ease 0.05s,
                transform 0.35s ease 0.05s;

              padding-bottom: 0;
            }


            .faq-item.open
            .faq-answer {
              opacity: 0.85;

              transform: translateY(0);

              padding-bottom: 30px;
            }


            /* ============================================================
               ACTIVE QUESTION
            ============================================================ */

            .faq-item.open
            .faq-question {
              color: #60511F;
            }


            /* ============================================================
               LARGE DESKTOP
            ============================================================ */

            @media (min-width: 1500px) {

              .faq-inner {
                padding:
                  90px 32px
                  115px;
              }


              .faq-heading-wrap {
                margin-bottom: 78px;

                gap: 28px;
              }


              .faq-heading-line {
                width: 85px;
              }


              .faq-heading {
                font-size: 62px;
              }


              .faq-question {
                min-height: 105px;

                padding:
                  28px 38px;

                font-size: 24px;
              }


              .faq-answer {
                padding-left: 38px;

                font-size: 17px;
              }


              .faq-item.open
              .faq-answer {
                padding-bottom: 34px;
              }
            }


            /* ============================================================
               TABLET
            ============================================================ */

            @media (max-width: 1100px)
            and (min-width: 768px) {

              .faq-inner {
                padding:
                  60px 32px
                  80px;
              }


              .faq-heading-wrap {
                margin-bottom: 55px;

                gap: 18px;
              }


              .faq-heading-line {
                width: 55px;
              }


              .faq-heading {
                font-size: 45px;

                letter-spacing: 2px;
              }


              .faq-question {
                min-height: 82px;

                padding:
                  22px 24px;

                font-size: 19px;
              }


              .faq-answer {
                padding-left: 24px;

                padding-right: 60px;

                font-size: 14px;

                line-height: 1.7;
              }


              .faq-item.open
              .faq-answer {
                padding-bottom: 25px;
              }


              .faq-icon {
                width: 23px;

                height: 23px;

                flex-basis: 23px;
              }


              .faq-icon::before,
              .faq-icon::after {
                width: 18px;
              }
            }


            /* ============================================================
               MOBILE
            ============================================================ */

            @media (max-width: 767px) {

              .heritage-faq {
                width: 100%;

                overflow: hidden;
              }


              .faq-inner {
                width: 100%;

                padding:
                  50px 20px
                  65px;
              }


              /* --------------------------------------------------------
                 HEADING
              -------------------------------------------------------- */

              .faq-heading-wrap {
                gap: 12px;

                margin-bottom: 40px;
              }


              .faq-heading-line {
                width: 28px;

                background:
                  rgba(96, 81, 31, 0.32);
              }


              .faq-heading {
                font-size:
                  clamp(27px, 8vw, 38px);

                line-height: 1;

                letter-spacing:
                  clamp(1px, 0.4vw, 2px);
              }


              /* --------------------------------------------------------
                 QUESTION
              -------------------------------------------------------- */

              .faq-question {
                min-height: 76px;

                padding:
                  20px 4px;

                gap: 16px;

                font-size:
                  clamp(15px, 4.2vw, 18px);

                line-height: 1.35;
              }


              /* --------------------------------------------------------
                 ICON
              -------------------------------------------------------- */

              .faq-icon {
                width: 22px;

                height: 22px;

                flex-basis: 22px;
              }


              .faq-icon::before,
              .faq-icon::after {
                width: 17px;

                height: 1.5px;
              }


              /* --------------------------------------------------------
                 ANSWER
              -------------------------------------------------------- */

              .faq-answer {
                padding:
                  0 35px
                  0 4px;

                font-size:
                  clamp(12.5px, 3.6vw, 15px);

                line-height: 1.7;
              }


              .faq-item.open
              .faq-answer {
                padding-bottom: 22px;
              }
            }


            /* ============================================================
               SMALL MOBILE
            ============================================================ */

            @media (max-width: 430px) {

              .faq-inner {
                padding:
                  42px 20px
                  55px;
              }


              .faq-heading-wrap {
                gap: 9px;

                margin-bottom: 32px;
              }


              .faq-heading-line {
                width: 20px;
              }


              .faq-heading {
                font-size: 27px;

                letter-spacing: 1px;
              }


              .faq-question {
                min-height: 70px;

                padding:
                  18px 2px;

                gap: 12px;

                font-size: 15px;
              }


              .faq-icon {
                width: 20px;

                height: 20px;

                flex-basis: 20px;
              }


              .faq-icon::before,
              .faq-icon::after {
                width: 16px;
              }


              .faq-answer {
                padding:
                  0 28px
                  0 2px;

                font-size: 12.5px;

                line-height: 1.65;
              }


              .faq-item.open
              .faq-answer {
                padding-bottom: 20px;
              }
            }


            /* ============================================================
               VERY SMALL MOBILE
            ============================================================ */

            @media (max-width: 360px) {

              .faq-inner {
                padding-left: 16px;

                padding-right: 16px;
              }


              .faq-heading-wrap {
                gap: 7px;
              }


              .faq-heading-line {
                width: 16px;
              }


              .faq-heading {
                font-size: 24px;
              }


              .faq-question {
                font-size: 14px;

                min-height: 66px;
              }


              .faq-answer {
                font-size: 12px;
              }
            }

          `,
        }}
      />


      {/* ================================================================
          FAQ CONTENT
      ================================================================= */}

      <div className="faq-inner">


        {/* ==============================================================
            HEADING
        ============================================================== */}

        <div className="faq-heading-wrap">

          <span className="faq-heading-line" />

          <h2 className="faq-heading">
            Frequently Asked Questions
          </h2>

          <span className="faq-heading-line" />

        </div>


        {/* ==============================================================
            FAQ LIST
        ============================================================== */}

        <div className="faq-list">

          {FAQS.map((faq, index) => {

            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={
                  `faq-item ${
                    isOpen ? 'open' : ''
                  }`
                }
              >

                {/* QUESTION */}

                <button
                  type="button"
                  className="faq-question"
                  onClick={() => handleToggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >

                  <span className="faq-question-text">
                    {faq.question}
                  </span>

                  <span
                    className="faq-icon"
                    aria-hidden="true"
                  />

                </button>


                {/* ANSWER */}

                <div
                  id={`faq-answer-${index}`}
                  className="faq-answer-wrapper"
                >

                  <div className="faq-answer-inner">

                    <p className="faq-answer">
                      {faq.answer}
                    </p>

                  </div>

                </div>

              </div>
            );

          })}

        </div>

      </div>

    </section>
  );
}