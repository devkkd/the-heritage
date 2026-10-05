"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mona_Sans } from "next/font/google";

const monaSans = Mona_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const LEFT_LINKS = [
  { label: "About", href: "/about" },
  { label: "Rooms & Suites", href: "/rooms" },
  { label: "Experiences", href: "/experiences" },
  { label: "Gallery", href: "/gallery" },
];

const RIGHT_LINKS = [
  { label: "Weddings", href: "/weddings" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

// Book Now => WhatsApp (message pehle se likha hua)
const WHATSAPP_NUMBER = "34610373144"; // bina + aur space ke
const BOOK_MESSAGE =
  "Hello The Heritage Resort Jaipur, I would like to book a stay. Please share the availability, room options, rates and booking details.";
const BOOK_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(BOOK_MESSAGE)}`;
const LOGO_SRC = "/logo2.png"; // white logo (public/logo2.png)

const CSS = `
/* variables header AUR drawer dono par (drawer header ke bahar hai) */
.hh-header,.hh-drawer{
  --hh-cream:#FBF2DE;
  --hh-page:#FDF8F0;
  --hh-brown:#534011;
  --hh-bar-h:90px;
  --hh-gap-top:34px;
  --hh-logo-w:160px;
  --hh-logo-h:158px;
}
.hh-header{
  position:fixed;top:0;left:0;right:0;z-index:1000;
  height:calc(var(--hh-gap-top) + var(--hh-bar-h));
  color:#fff;
}
.hh-header,.hh-header *,.hh-drawer,.hh-drawer *{box-sizing:border-box}

/* animation sirf mount ke baad on hota hai => refresh par koi flash/hilna nahi */
.hh-header.hh-ready .hh-strip,
.hh-header.hh-ready .hh-bar,
.hh-header.hh-ready .hh-logo,
.hh-header.hh-ready .hh-logo-img,
.hh-header.hh-ready .hh-link,
.hh-header.hh-ready .hh-book,
.hh-header.hh-ready .hh-burger span{
  transition:background-color .35s ease,color .35s ease,border-color .35s ease,transform .3s ease,opacity .3s ease;
}

/* top strip (scroll par solid => page colour) */
.hh-strip{position:absolute;inset:0;background:transparent}
.hh-header.hh-solid .hh-strip{background:var(--hh-page)}

/* bar */
.hh-bar{
  position:absolute;left:0;right:0;top:var(--hh-gap-top);height:var(--hh-bar-h);
  background:rgba(255,255,255,.14);
  -webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);
}
.hh-header.hh-solid .hh-bar{
  background:var(--hh-cream);-webkit-backdrop-filter:none;backdrop-filter:none;
}

.hh-inner{
  position:relative;height:100%;width:100%;
  display:grid;grid-template-columns:1fr var(--hh-logo-w) 1fr;align-items:center;
}
.hh-side{display:flex;align-items:center;height:100%}
.hh-left{justify-content:flex-end;padding-right:clamp(20px,2.4vw,40px)}
.hh-right{justify-content:flex-start;padding-left:clamp(20px,2.4vw,40px);gap:clamp(20px,2.2vw,36px)}
.hh-nav{display:flex;align-items:center;gap:clamp(20px,2.2vw,36px)}

.hh-link{
  font-size:14px;font-weight:400;letter-spacing:.01em;text-transform:uppercase;
  color:#fff;text-decoration:none;white-space:nowrap;line-height:1;
  padding:6px 0;position:relative;
}
.hh-link::after{
  content:"";position:absolute;left:0;bottom:0;height:1px;width:0;background:currentColor;
  transition:width .25s ease;
}
.hh-link:hover::after{width:100%}
.hh-header.hh-solid .hh-link{color:#000}

/* book now */
.hh-book{
  display:inline-flex;align-items:center;justify-content:center;
  height:46px;padding:0 22px;font-size:14px;font-weight:400;text-transform:uppercase;
  text-decoration:none;white-space:nowrap;line-height:1;
  background:#fff;color:#000;border:1px solid #fff;
}
.hh-header.hh-solid .hh-book{
  background:var(--hh-brown);color:#fff;border-color:var(--hh-brown);
}
.hh-book:hover{opacity:.9}

/* logo box */
.hh-logo{
  position:absolute;top:0;left:50%;transform:translateX(-50%);
  width:var(--hh-logo-w);height:var(--hh-logo-h);
  background:rgba(255,255,255,.14);
  -webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);
  z-index:2;
}
.hh-header.hh-solid .hh-logo{
  background:var(--hh-cream);-webkit-backdrop-filter:none;backdrop-filter:none;
}
.hh-logo-link{position:relative;display:block;width:100%;height:100%}

/* EK HI LOGO: white png ko mask banaya, colour CSS se badalta hai */
.hh-logo-img{
  position:absolute;left:15px;right:15px;top:12px;bottom:12px;
  background-color:#fff;
  -webkit-mask:url(${LOGO_SRC}) center / contain no-repeat;
  mask:url(${LOGO_SRC}) center / contain no-repeat;
}
.hh-header.hh-solid .hh-logo-img{background-color:var(--hh-brown)}

/* hamburger (mobile) */
.hh-burger{
  display:none;width:44px;height:44px;background:transparent;border:0;cursor:pointer;
  align-items:center;justify-content:center;flex-direction:column;gap:6px;padding:0;
}
.hh-burger span{display:block;width:24px;height:2px;background:#fff}
.hh-header.hh-solid .hh-burger span{background:#000}
.hh-header.hh-open .hh-burger span:nth-child(1){transform:translateY(8px) rotate(45deg)}
.hh-header.hh-open .hh-burger span:nth-child(2){opacity:0}
.hh-header.hh-open .hh-burger span:nth-child(3){transform:translateY(-8px) rotate(-45deg)}

/* ===== MENU OPEN => poora header solid colour, bina fade ke ===== */
.hh-header.hh-open .hh-strip,
.hh-header.hh-open .hh-bar,
.hh-header.hh-open .hh-logo{
  background:var(--hh-cream) !important;
  -webkit-backdrop-filter:none !important;backdrop-filter:none !important;
  transition:none !important;
}
.hh-header.hh-open .hh-logo-img{background-color:var(--hh-brown) !important;transition:none !important}
.hh-header.hh-open .hh-link{color:#000 !important;transition:none !important}
.hh-header.hh-open .hh-book{
  background:var(--hh-brown) !important;color:#fff !important;border-color:var(--hh-brown) !important;
  transition:none !important;
}
.hh-header.hh-open .hh-burger span{background:#000 !important}

/* ===== mobile drawer: solid cream, bar ke theek neeche ===== */
.hh-drawer{
  position:fixed;left:0;right:0;top:calc(var(--hh-gap-top) + var(--hh-bar-h));
  background-color:var(--hh-cream);
  max-height:0;overflow:hidden;visibility:hidden;
  transition:max-height .4s ease,visibility 0s linear .4s;
  z-index:999;
}
.hh-drawer.hh-drawer-open{
  max-height:calc(100vh - var(--hh-gap-top) - var(--hh-bar-h));
  max-height:calc(100dvh - var(--hh-gap-top) - var(--hh-bar-h));
  overflow-y:auto;visibility:visible;transition:max-height .4s ease,visibility 0s;
  border-top:1px solid rgba(0,0,0,.08);
  box-shadow:0 12px 24px rgba(0,0,0,.08);
}
/* logo box bar se neeche nikalta hai, isliye list us ke neeche se shuru */
.hh-drawer-list{
  list-style:none;margin:0;
  padding:calc(var(--hh-logo-h) - var(--hh-gap-top) - var(--hh-bar-h) + 8px) 24px 28px;
}
.hh-drawer-list li{border-bottom:1px solid rgba(0,0,0,.1)}
.hh-drawer-link{display:block;padding:16px 0;font-size:15px;text-transform:uppercase;color:#000;text-decoration:none;letter-spacing:.02em}
.hh-drawer-book{display:flex;align-items:center;justify-content:center;margin-top:22px;height:48px;background:var(--hh-brown);color:#fff;text-decoration:none;font-size:14px;text-transform:uppercase}

@media (max-width:1100px){
  .hh-nav{display:none}
  .hh-book-desktop{display:none}
  .hh-header,.hh-drawer{--hh-bar-h:64px;--hh-gap-top:14px;--hh-logo-w:112px;--hh-logo-h:104px}
  .hh-inner{padding:0 12px}
  .hh-left{justify-content:flex-start;padding-right:0}
  .hh-right{justify-content:flex-end;padding-left:0}
  .hh-burger{display:flex}
  .hh-logo-img{left:14px;right:14px;top:10px;bottom:10px}
  .hh-book{height:38px;padding:0 14px;font-size:12px}
}
@media (min-width:1101px){
  .hh-book-mobile{display:none}
  .hh-drawer{display:none}
}
@media (max-width:380px){
  .hh-book{padding:0 10px;font-size:11px}
}
@media (prefers-reduced-motion:reduce){
  .hh-header *,.hh-drawer{transition:none!important}
}
`;

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  // Transparent sirf home par + top par. Baaki pages par hamesha colour.
  const solid = !isHome || scrolled;

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 10);
    check(); // mount par turant sahi state (transition abhi off hai)
    const raf = requestAnimationFrame(() => setReady(true));
    window.addEventListener("scroll", check, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", check);
    };
  }, []);

  // page badalne par menu band
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // menu khula ho to page scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // desktop size par aate hi menu band + Escape se band
  useEffect(() => {
    const onResize = () => window.innerWidth > 1100 && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const cls = [
    "hh-header",
    monaSans.className,
    solid ? "hh-solid" : "",
    open ? "hh-open" : "",
    ready ? "hh-ready" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <header className={cls}>
        <div className="hh-strip" />
        <div className="hh-bar">
          <div className="hh-inner">
            <div className="hh-side hh-left">
              <button
                type="button"
                className="hh-burger"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                <span />
                <span />
                <span />
              </button>
              <nav className="hh-nav" aria-label="Primary left">
                {LEFT_LINKS.map((l) => (
                  <Link key={l.href} href={l.href} className="hh-link">
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div />

            <div className="hh-side hh-right">
              <nav className="hh-nav" aria-label="Primary right">
                {RIGHT_LINKS.map((l) => (
                  <Link key={l.href} href={l.href} className="hh-link">
                    {l.label}
                  </Link>
                ))}
              </nav>
              <a
                href={BOOK_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="hh-book hh-book-desktop"
              >
                Book Now
              </a>
              <a
                href={BOOK_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="hh-book hh-book-mobile"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>

        <div className="hh-logo">
          <Link href="/" className="hh-logo-link" aria-label="The Heritage Resort - Home">
            <span className="hh-logo-img" role="img" aria-label="The Heritage Resort" />
          </Link>
        </div>
      </header>

      <div className={`hh-drawer ${monaSans.className} ${open ? "hh-drawer-open" : ""}`}>
        <ul className="hh-drawer-list">
          {[...LEFT_LINKS, ...RIGHT_LINKS].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hh-drawer-link" onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div style={{ padding: "0 24px 28px" }}>
          {/* <a
            href={BOOK_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="hh-drawer-book"
            onClick={() => setOpen(false)}
          >
            Book Now
          </a> */}
        </div>
      </div>
    </>
  );
}