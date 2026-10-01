"use client";

import { useEffect, useRef, useState } from "react";
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

const IMAGES = ["/newhome/review/1.png", "/newhome/review/2.png"];
const TITLE = "A Beautiful Stay with an Amazing Experience";
const TEXT =
  "We had a wonderful stay at Seven Mirror Stays. The property was beautifully maintained, comfortable, and exactly as shown in the photos. The location was convenient, and the entire check-in experience was smooth.";

const REVIEWS = [
  { name: "Priya S.", nights: 2, date: "September 2026" },
  { name: "Emily R.", nights: 2, date: "September 2026" },
  { name: "Ananya M.", nights: 3, date: "August 2026" },
  { name: "Sophie L.", nights: 1, date: "August 2026" },
  { name: "Riya K.", nights: 4, date: "July 2026" },
  { name: "Olivia T.", nights: 2, date: "July 2026" },
].map((r, i) => ({ ...r, img: IMAGES[i % 2], title: TITLE, text: TEXT }));

const AUTO_MS = 4000;

const CSS = `
.rv{--bg:#FFFAF0;--brand:#534011;--green:#34C759;--pv:2;background:var(--bg);width:100%;padding:64px 0 72px;font-family:var(--font-mona),system-ui,-apple-system,"Segoe UI",Arial,sans-serif;color:#111}
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
.rv-viewport{overflow:hidden;width:100%}
.rv-track{display:flex;transform:translateX(calc(var(--index,0) * -100% / var(--pv)));transition:transform .6s cubic-bezier(.4,0,.2,1);will-change:transform}
.rv-slide{flex:0 0 calc(100% / var(--pv));min-width:0;padding-right:32px}
.rv-card{display:flex;gap:20px;align-items:stretch;height:202px;padding-right:32px;border-right:1px solid #cfc9bd}
.rv-img{flex:0 0 162px;width:162px;height:202px;border-radius:16px;object-fit:cover;background:#e9e2d2;display:block}
.rv-body{display:flex;flex-direction:column;justify-content:space-between;min-width:0}
.rv-card-title{font-size:13px;font-weight:600;margin:0}
.rv-text{font-size:13px;line-height:1.5;font-weight:300;margin:14px 0 0}
.rv-meta{font-size:13px;font-weight:600;line-height:1.5}
.rv-meta-stars{letter-spacing:1px}
.rv-controls{display:flex;justify-content:center;align-items:center;gap:36px;margin-top:28px}
.rv-arrow{background:none;border:0;cursor:pointer;width:36px;height:36px;display:grid;place-items:center;color:#000}
.rv-arrow svg{width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:1.6}
.rv-dots{display:flex;align-items:center;gap:8px}
.rv-dot{width:6px;height:6px;border-radius:50%;background:#777;border:0;padding:0;cursor:pointer;position:relative;transition:.3s}
.rv-dot.active{background:#000;margin:0 4px}
.rv-dot.active::after{content:"";position:absolute;inset:-4px;border:1px solid #000;border-radius:50%}
@media(max-width:1024px){
  .rv-title{font-size:24px}
  .rv-slide{padding-right:20px}
  .rv-card{padding-right:20px}
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
  .rv-card{height:auto;padding-right:0;border-right:0;gap:16px;align-items:flex-start}
  .rv-img{flex:0 0 110px;width:110px;height:150px;border-radius:14px}
  .rv-body{gap:10px;justify-content:flex-start}
  .rv-text{margin-top:8px;font-size:12.5px}
  .rv-meta{font-size:12.5px}
  .rv-controls{gap:24px;margin-top:22px}
}
@media(max-width:480px){
  .rv-rating-row{gap:14px}
  .rv-stars{gap:5px}
  .rv-stars svg{width:16px;height:16px}
  .rv-google{height:20px}
  .rv-tp svg{width:18px;height:18px}
  .rv-tp span{font-size:16px}
  .rv-card{flex-direction:column}
  .rv-img{flex:none;width:100%;height:230px}
}
`;

const Star = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7.3L12 17.8 5.7 21.5l1.7-7.3L2 9.5l7.1-.6z" />
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
                <div className="rv-slide" key={i}>
                  <article className="rv-card">
                    <Image className="rv-img" src={r.img} alt={r.name} width={162} height={202} priority={i < 2} />
                    <div className="rv-body">
                      <div>
                        <h3 className="rv-card-title">“{r.title}”</h3>
                        <p className="rv-text">{r.text}</p>
                      </div>
                      <div className="rv-meta">
                        <div>- {r.name}</div>
                        <div className="rv-meta-stars">★★★★★ 5.0</div>
                        <div>
                          Stayed for {r.nights} night{r.nights > 1 ? "s" : ""} · {r.date}
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