"use client";

import { useEffect, useRef } from "react";
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

const HANDLE = "thrjaipur";
const INSTA_URL = `https://www.instagram.com/${HANDLE}/`;
const VIDEOS = ["/home/card1.mp4", "/home/card2.mp4", "/home/card3.mp4", "/home/card4.mp4", "/home/card5.mp4"];

// 5 tiles, videos alternate between card1 and card2
const TILES = Array.from({ length: 5 }, (_, i) => ({
  src: VIDEOS[i % 5],
  type: i === 0 ? "multi" : "reel",
}));

const CSS = `
.ig{--bg:#FFFAF0;--ink:#0E0E0E;background:var(--bg);width:100%;padding:88px 0 96px;font-family:var(--font-mona),system-ui,-apple-system,"Segoe UI",Arial,sans-serif;color:var(--ink)}
.ig *{box-sizing:border-box}
.ig-inner{max-width:1400px;margin:0 auto;padding:0 32px}
.ig-head{display:flex;flex-direction:column;align-items:center;text-align:center}
.ig-title{font-family:var(--font-cinzel),Georgia,serif;font-weight:700;font-size:28px;line-height:1.2;color:var(--ink);margin:0}
.ig-sub{margin:36px 0 0;max-width:640px;font-size:12px;line-height:1.6;font-weight:400;color:var(--ink)}
.ig-follow{display:flex;align-items:center;justify-content:center;gap:14px;margin-top:32px;flex-wrap:wrap}
.ig-icon{width:36px;height:36px;border-radius:50%;display:block;object-fit:cover;flex-shrink:0}
.ig-handle{font-size:13px;font-weight:400;color:var(--ink);text-decoration:none}
.ig-btn{display:inline-flex;align-items:center;justify-content:center;height:42px;padding:0 28px;border-radius:999px;background:var(--ink);color:#fff;font-family:inherit;font-size:14px;font-weight:400;text-decoration:none;margin-left:2px;transition:opacity .25s}
.ig-btn:hover{opacity:.85}
.ig-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:2px;margin-top:36px;border-radius:4px;overflow:hidden;background:var(--bg)}
.ig-tile{position:relative;aspect-ratio:3/4;background:#e9e2d2;overflow:hidden}
.ig-tile video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;pointer-events:none}
.ig-badge{position:absolute;top:10px;right:10px;width:18px;height:18px;display:block;z-index:2;filter:drop-shadow(0 0 2px rgba(0,0,0,.35))}
@media(max-width:1024px){
  .ig{padding:72px 0 80px}
  .ig-title{font-size:24px}
}
@media(max-width:767px){
  .ig{padding:48px 0 56px}
  .ig-inner{padding:0 20px}
  .ig-title{font-size:22px}
  .ig-sub{margin-top:20px;font-size:12px;max-width:100%}
  .ig-follow{margin-top:22px;gap:12px}
  .ig-grid{display:flex;gap:6px;margin-top:26px;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;border-radius:0;margin-left:-20px;margin-right:-20px;padding:0 20px;scroll-padding:0 20px}
  .ig-grid::-webkit-scrollbar{display:none}
  .ig-tile{flex:0 0 62%;scroll-snap-align:start;border-radius:10px}
}
@media(max-width:400px){
  .ig-btn{height:40px;padding:0 24px;font-size:13px}
  .ig-tile{flex-basis:70%}
}
`;

const MultiIcon = () => (
  <svg className="ig-badge" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
    <rect x="8" y="2" width="14" height="14" rx="3" />
    <rect x="2" y="8" width="14" height="14" rx="3" fillOpacity=".8" stroke="#000" strokeOpacity=".15" />
  </svg>
);

const ReelIcon = () => (
  <svg className="ig-badge" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="1" y="1" width="22" height="22" rx="6" fill="#fff" />
    <path d="M9.5 7.5v9l7.5-4.5z" fill="#000" />
  </svg>
);

export default function InstagramSection() {
  const refs = useRef([]);

  // make sure every video keeps playing (autoplay policies / SSR muted quirk)
  useEffect(() => {
    refs.current.forEach((v) => {
      if (!v) return;
      v.muted = true;
      v.defaultMuted = true;
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    });

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const v = e.target;
          if (e.isIntersecting) {
            const p = v.play();
            if (p && p.catch) p.catch(() => {});
          } else {
            v.pause();
          }
        }),
      { threshold: 0.1 }
    );
    refs.current.forEach((v) => v && io.observe(v));
    return () => io.disconnect();
  }, []);

  return (
    <section className={`ig ${cinzel.variable} ${monaSans.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="ig-inner">
        <div className="ig-head">
          <h2 className="ig-title">Stay Inspired, Follow Along</h2>
          <p className="ig-sub">
            Discover beautiful stays, hidden escapes, and unforgettable moments from Seven Mirror Stays. Follow us on
            Instagram for travel inspiration, new properties, guest experiences, and a glimpse into life at our stays.
          </p>

          <div className="ig-follow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="ig-icon"
              src="https://www.google.com/s2/favicons?domain=instagram.com&sz=64"
              alt="Instagram"
              width="36"
              height="36"
            />
            <a className="ig-handle" href={INSTA_URL} target="_blank" rel="noopener noreferrer">
              @{HANDLE}
            </a>
            <a className="ig-btn" href={INSTA_URL} target="_blank" rel="noopener noreferrer">
              Follow us
            </a>
          </div>
        </div>

        <div className="ig-grid">
          {TILES.map((t, i) => (
            <div className="ig-tile" key={i}>
              <video
                ref={(el) => (refs.current[i] = el)}
                src={t.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
              />
              {t.type === "multi" ? <ReelIcon /> : <ReelIcon />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}