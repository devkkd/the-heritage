"use client";

import { useEffect, useRef, useState } from "react";
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

/* =========================================================
   GOOGLE REVIEWS
========================================================= */

const REVIEWS = [
  {
    name: "Yash Agarwal",
    url: "https://www.google.com/maps/contrib/101924814817872885965?hl=en-GB",
    time: "3 weeks ago",
    rating: 5,
    tags: ["Holiday", "Friends"],
    scores: "Rooms 5.0 · Service 5.0 · Location 5.0",
    text: "Hello guys, i must say totally worth it property. I have visited multiple times and always a best service provided by them with affordable rates. Do visit and enjoy! Tent rooms with the vibe of luxury and perfectly spacious!",
  },
  {
    name: "Sanat Sharma",
    url: "https://www.google.com/maps/contrib/111818452663736755770?hl=en-GB",
    time: "2 months ago",
    rating: 5,
    text: "This resort is a hidden gem right near Bhankrota for a casual swim day. The swimming pool is massive, super clean, and surrounded by beautiful lawns. Love that the location allows you to easily order food or snacks from Swiggy, Zomato, and Blinkit straight to the venue. Perfect spot to enjoy a hassle-free, refreshing day outing with your group.",
  },
  {
    name: "Aayush Baradia",
    url: "https://www.google.com/maps/contrib/116229992210734546906?hl=en-GB",
    time: "3 months ago",
    rating: 5,
    text: "New Airbnb in town. Great host, great hospitality and great ambience. Close to the city, so you've got all the food / grocery delivery options as per your need. Blinkit and Zomato available 24×7.",
  },
  {
    name: "Vijay Vyas",
    url: "https://www.google.com/maps/contrib/106984054062407364413?hl=en-GB",
    time: "7 months ago",
    rating: 4,
    text: "Nice place. Good green grass.",
  },
  {
    name: "Sunil Choudhary",
    url: "https://www.google.com/maps/contrib/116276400891839430786?hl=en-GB",
    time: "7 months ago",
    rating: 5,
    text: "Nice experience. Hotel rooms are very clean.",
  },
  {
    name: "basu gaddi",
    url: "https://www.google.com/maps/contrib/106950390535641085143?hl=en-GB",
    time: "10 months ago",
    rating: 5,
    text: "We went there for lunch in their newly opened restaurant. Food was delicious, service was great and the quantity was surprisingly good.",
  },
  {
    name: "satish kulshreshtha",
    url: "https://www.google.com/maps/contrib/104571847926671335409?hl=en-GB",
    time: "11 months ago",
    rating: 5,
    text: "Big open area. Suitable for big gathering programs.",
  },
  {
    name: "SWECHHA YADAV",
    url: "https://www.google.com/maps/contrib/105479595822070073786?hl=en-GB",
    time: "a year ago",
    rating: 5,
    text: "Nice resort, I attended a marriage there. The resort is very beautiful and large in area. They have made the rooms in tents look which is really a new concept. The pool is really central attraction.",
  },
  {
    name: "priyalata singh",
    url: "https://www.google.com/maps/contrib/112773175636707019746?hl=en-GB",
    time: "a year ago",
    rating: 5,
    text: "Its a Nice Place ♥️. Loved their service ♥️👍 and Arrangements 👍♥️",
  },
  {
    name: "Amit Singh Rajawat",
    url: "https://www.google.com/maps/contrib/117615150868361641617?hl=en-GB",
    time: "2 years ago",
    rating: 5,
    text: "Best place for any family function and gathering, although parking is small and swimming pool is also small but overall garden area is really big. Contains separate big hall also.",
  },
];

const AUTO_MS = 5000;

const CSS = `
.rv{--bg:#FFFAF0;--brand:#534011;--gold:#C99A2E;--green:#34C759;--pv:2;background:var(--bg);width:100%;padding:64px 0 72px;font-family:var(--font-mona),system-ui,-apple-system,"Segoe UI",Arial,sans-serif;color:#111}
.rv *{box-sizing:border-box}
.rv-inner{max-width:1400px;margin:0 auto;padding:0 32px}
.rv-head{display:flex;justify-content:space-between;align-items:flex-start;gap:32px}
.rv-title{font-family:var(--font-cinzel),Georgia,serif;font-weight:700;font-size:28px;line-height:1.2;color:#000;margin:0}
.rv-sub{margin:26px 0 0;font-size:11px;line-height:1.5;max-width:560px}
.rv-rating{display:flex;flex-direction:column;align-items:flex-end;flex-shrink:0}
.rv-rating-label{font-family:var(--font-cinzel),Georgia,serif;font-weight:700;font-size:14px;letter-spacing:.3px;line-height:1.2;text-align:right;white-space:nowrap;color:#000}
.rv-rating-row{display:flex;align-items:center;gap:20px;margin-top:14px}
.rv-stars{display:flex;gap:6px;flex-shrink:0}
.rv-stars svg{width:18px;height:18px;fill:#34C759;display:block}
.rv-google{display:block;height:22px;width:auto;flex-shrink:0}
.rv-tp{display:flex;align-items:center;gap:3px;flex-shrink:0}
.rv-tp svg{width:20px;height:20px;display:block}
.rv-tp span{font-family:var(--font-mona),system-ui,Arial,sans-serif;font-size:18px;font-weight:600;letter-spacing:-.4px;line-height:1;color:#191919}
.rv-quote{font-family:Georgia,serif;font-weight:700;font-size:170px;line-height:.75;height:80px;color:var(--brand);margin-top:44px;user-select:none}
.rv-slider{margin-top:34px}
.rv-viewport{overflow:hidden;width:100%;padding:6px 0 14px}
.rv-track{display:flex;align-items:stretch;transform:translateX(calc(var(--index,0) * -100% / var(--pv)));transition:transform .6s cubic-bezier(.4,0,.2,1);will-change:transform}
.rv-slide{flex:0 0 calc(100% / var(--pv));min-width:0;padding-right:28px;display:flex}
.rv-slide:last-child{padding-right:0}

/* ---------- CARD ---------- */
.rv-card{position:relative;flex:1;min-width:0;display:flex;flex-direction:column;padding:28px 30px 24px;background:#fff;border:1px solid #eadfc6;border-radius:20px;box-shadow:0 1px 0 rgba(83,64,17,.04),0 14px 34px -18px rgba(83,64,17,.28);overflow:hidden;transition:box-shadow .3s ease,transform .3s ease}
.rv-card::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:linear-gradient(180deg,#d9b25a,#534011)}
.rv-card:hover{transform:translateY(-3px);box-shadow:0 1px 0 rgba(83,64,17,.04),0 22px 40px -18px rgba(83,64,17,.34)}
.rv-card-top{display:flex;align-items:center;justify-content:space-between;gap:12px}
.rv-card-rating{display:flex;align-items:center;gap:10px}
.rv-card-stars{display:flex;gap:3px}
.rv-card-stars svg{width:16px;height:16px;display:block;fill:var(--gold)}
.rv-card-stars svg.off{fill:#e4dccb}
.rv-card-score{font-size:12.5px;font-weight:600;color:var(--brand)}
.rv-badge{display:flex;align-items:center;gap:7px;padding:5px 11px 5px 8px;border:1px solid #eadfc6;border-radius:999px;background:#FFFAF0;font-size:10.5px;font-weight:500;letter-spacing:.3px;color:#6b6150;white-space:nowrap}
.rv-badge svg{width:14px;height:14px;display:block}
.rv-text{margin:20px 0 0;font-size:14px;line-height:1.7;font-weight:400;color:#2b2618;display:-webkit-box;-webkit-line-clamp:6;-webkit-box-orient:vertical;overflow:hidden}
.rv-extra{margin-top:16px;display:flex;flex-wrap:wrap;align-items:center;gap:8px}
.rv-chip{padding:4px 11px;border-radius:999px;background:#f5ecd6;color:var(--brand);font-size:11px;font-weight:600;letter-spacing:.2px}
.rv-scores{font-size:11px;color:#7a705a;font-weight:500}
.rv-foot{margin-top:auto;padding-top:22px}
.rv-foot-inner{display:flex;align-items:center;gap:14px;padding-top:18px;border-top:1px solid #f0e8d5}
.rv-avatar{flex:0 0 auto;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,#8a6a1f,#534011);color:#fff;font-family:var(--font-cinzel),Georgia,serif;font-weight:700;font-size:17px;box-shadow:0 0 0 3px #f5ecd6}
.rv-person{min-width:0}
.rv-name{display:block;font-size:14px;font-weight:600;color:#111;text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rv-name:hover{color:var(--brand);text-decoration:underline}
.rv-when{margin-top:2px;font-size:12px;color:#7a705a;font-weight:400}

/* ---------- CONTROLS ---------- */
.rv-controls{display:flex;justify-content:center;align-items:center;gap:36px;margin-top:22px}
.rv-arrow{background:none;border:0;cursor:pointer;width:36px;height:36px;display:grid;place-items:center;color:#000}
.rv-arrow svg{width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:1.6}
.rv-dots{display:flex;align-items:center;gap:8px}
.rv-dot{width:6px;height:6px;border-radius:50%;background:#777;border:0;padding:0;cursor:pointer;position:relative;transition:.3s}
.rv-dot.active{background:#000;margin:0 4px}
.rv-dot.active::after{content:"";position:absolute;inset:-4px;border:1px solid #000;border-radius:50%}

@media(max-width:1024px){
  .rv-title{font-size:24px}
  .rv-slide{padding-right:20px}
  .rv-card{padding:24px 24px 20px}
}
@media(max-width:767px){
  .rv{--pv:1;padding:40px 0 48px}
  .rv-inner{padding:0 20px}
  .rv-head{flex-direction:column;gap:24px}
  .rv-title{font-size:22px}
  .rv-sub{margin-top:14px}
  .rv-rating{align-items:flex-start;width:100%}
  .rv-rating-label{text-align:left;white-space:normal;font-size:13px}
  .rv-rating-row{gap:16px;margin-top:12px;flex-wrap:wrap;row-gap:12px}
  .rv-quote{font-size:120px;height:56px;margin-top:28px}
  .rv-slider{margin-top:22px}
  .rv-slide{padding-right:0}
  .rv-card{padding:22px 20px 18px;border-radius:18px}
  .rv-text{font-size:13.5px;line-height:1.65;margin-top:16px;-webkit-line-clamp:8}
  .rv-foot{padding-top:18px}
  .rv-foot-inner{padding-top:16px}
  .rv-controls{gap:24px;margin-top:16px}
}
@media(max-width:480px){
  .rv-rating-row{gap:14px}
  .rv-stars{gap:5px}
  .rv-stars svg{width:16px;height:16px}
  .rv-google{height:20px}
  .rv-tp svg{width:18px;height:18px}
  .rv-tp span{font-size:16px}
  .rv-card-stars svg{width:15px;height:15px}
  .rv-badge{padding:4px 9px 4px 7px;font-size:10px}
}
@media(prefers-reduced-motion:reduce){
  .rv-track,.rv-card{transition:none!important}
}
`;

const Star = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7.3L12 17.8 5.7 21.5l1.7-7.3L2 9.5l7.1-.6z" />
  </svg>
);

const GoogleG = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
  </svg>
);

const GoogleLogo = () => (
  <svg className="rv-google" viewBox="0 0 272 92" role="img" aria-label="Google" xmlns="http://www.w3.org/2000/svg">
    <path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" />
    <path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" />
    <path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" />
    <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z" />
    <path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" />
    <path fill="#4285F4" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" />
  </svg>
);

const TrustpilotLogo = () => (
  <div className="rv-tp" role="img" aria-label="Trustpilot">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <polygon fill="#00B67A" points="12,1 14.9,8.6 23,9 16.7,14.2 18.8,22.2 12,17.7 5.2,22.2 7.3,14.2 1,9 9.1,8.6" />
      <polygon fill="#005128" opacity="0.55" points="12,15 18.8,22.2 12,17.7" />
    </svg>
    <span>Trustpilot</span>
  </div>
);

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(2);
  const paused = useRef(false);
  const touchX = useRef(0);

  const maxIndex = REVIEWS.length - perView;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => {
      setPerView(mq.matches ? 1 : 2);
      setIndex(0);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const go = (i) => setIndex(i > maxIndex ? 0 : i < 0 ? maxIndex : i);

  useEffect(() => {
    const t = setInterval(() => {
      if (!paused.current) setIndex((p) => (p >= maxIndex ? 0 : p + 1));
    }, AUTO_MS);
    return () => clearInterval(t);
  }, [maxIndex, index]);

  const onTouchStart = (e) => {
    paused.current = true;
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? index + 1 : index - 1);
    setTimeout(() => (paused.current = false), 1500);
  };

  return (
    <section className={`rv ${cinzel.variable} ${monaSans.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="rv-inner">
        {/* Header */}
        <div className="rv-head">
          <div>
            <h2 className="rv-title">Why Our Guests Love Staying With Us</h2>
            <p className="rv-sub">
              Not A Room In A Building We Manage From A Distance A Home Someone From Our Team Actually Looks After.
            </p>
          </div>

          <div className="rv-rating">
            <div className="rv-rating-label">Consistently Highly Rated Across</div>
            <div className="rv-rating-row">
              <div className="rv-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} />
                ))}
              </div>
              <GoogleLogo />
              <TrustpilotLogo />
            </div>
          </div>
        </div>

        <div className="rv-quote" aria-hidden="true">&ldquo;</div>

        {/* Slider */}
        <div
          className="rv-slider"
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="rv-viewport">
            <div className="rv-track" style={{ "--index": index }}>
              {REVIEWS.map((r, i) => (
                <div className="rv-slide" key={r.name}>
                  <article className="rv-card">
                    {/* Top: stars + Google badge */}
                    <div className="rv-card-top">
                      <div className="rv-card-rating">
                        <div className="rv-card-stars" aria-label={`${r.rating} out of 5 stars`}>
                          {[...Array(5)].map((_, s) => (
                            <svg key={s} viewBox="0 0 24 24" aria-hidden="true" className={s < r.rating ? "" : "off"}>
                              <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7.3L12 17.8 5.7 21.5l1.7-7.3L2 9.5l7.1-.6z" />
                            </svg>
                          ))}
                        </div>
                        <span className="rv-card-score">{r.rating}.0</span>
                      </div>

                      <div className="rv-badge">
                        <GoogleG />
                        <span>Google Review</span>
                      </div>
                    </div>

                    {/* Review text */}
                    <p className="rv-text">&ldquo;{r.text}&rdquo;</p>

                    {/* Optional tags / sub-ratings */}
                    {(r.tags || r.scores) && (
                      <div className="rv-extra">
                        {r.tags && r.tags.map((t) => (
                          <span className="rv-chip" key={t}>{t}</span>
                        ))}
                        {r.scores && <span className="rv-scores">{r.scores}</span>}
                      </div>
                    )}

                    {/* Footer: person */}
                    <div className="rv-foot">
                      <div className="rv-foot-inner">
                        <div className="rv-avatar" aria-hidden="true">
                          {r.name.trim().charAt(0).toUpperCase()}
                        </div>

                        <div className="rv-person">
                          <a
                            className="rv-name"
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {r.name}
                          </a>
                          <div className="rv-when">{r.time} on Google</div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <div className="rv-controls">
            <button className="rv-arrow" onClick={() => go(index - 1)} aria-label="Previous">
              <svg viewBox="0 0 24 24"><path d="M15 3 6 12l9 9" /></svg>
            </button>
            <div className="rv-dots">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  className={`rv-dot ${i === index ? "active" : ""}`}
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button className="rv-arrow" onClick={() => go(index + 1)} aria-label="Next">
              <svg viewBox="0 0 24 24"><path d="m9 3 9 9-9 9" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}