'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Cinzel, Mona_Sans } from 'next/font/google';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const mona = Mona_Sans({
  subsets: ['latin'],
  display: 'swap',
});

/*
============================================================
THE HERITAGE RESORT — CONTACT PAGE (REDESIGN)

Primary #60511F | BG 1 #FFFAF0 | BG 2 #FDF2DE
Fonts: Cinzel (headings) + Mona Sans (body)
Desktop: max-width 1400px, side padding 32px
Mobile : side padding 20px
Desktop sizes: heading 30px, lead 22px, body 18px
Mobile sizes : heading 24px, lead 18px, body 16px

Section order (bg alternate):
Hero #FFFAF0 → Contact cards #FDF2DE
→ Message + Map #FFFAF0 → Bottom strip #FDF2DE

Form: submit karne par WhatsApp khulta hai, form ka message
pehle se bhara hua (WHATSAPP_NUMBER pe).

Header fixed hai (desktop ~124px, mobile ~78px), isliye hero
mein top padding di gayi hai.
============================================================
*/

const WHATSAPP_NUMBER = '34610373144';

const DETAILS = {
  whatsapp: '+34 610373144',
  phone: '+91 8135041323',
  address: 'The Heritage Resorts, Jaisinghpura Road, Bhakrota, Jaipur',
  instagram: '@thrjaipur',
};

const MAP_QUERY = 'The Heritage Resorts Jaisinghpura Road Bhakrota Jaipur';

const iconProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

function Icon({ type }) {
  if (type === 'whatsapp')
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.85.5 3.62 1.44 5.19L2 22l5.06-1.53a9.9 9.9 0 0 0 4.98 1.34h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2Zm5.8 14.1c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.13.11-1.83-.12-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2 .89 2.15.07.15.12.32.02.51-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.26 1.63 2.04 1.12 1 2.06 1.31 2.35 1.46.29.15.46.13.63-.08.17-.2.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.68.79 1.97.93.29.15.48.22.55.35.07.13.07.75-.17 1.43Z"
        />
      </svg>
    );
  if (type === 'phone')
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M7.1 3.8 5 5.9c-.8.8-.7 2.1-.2 3.2 2 4.2 5.1 7.3 9.3 9.3 1.1.5 2.4.6 3.2-.2l2.1-2.1c.6-.6.6-1.6 0-2.2l-2.2-2.2c-.5-.5-1.3-.6-1.9-.2l-1.7 1.1a14.4 14.4 0 0 1-4.9-4.9l1.1-1.7c.4-.6.3-1.4-.2-1.9L9.3 3.8c-.6-.6-1.6-.6-2.2 0Z"
          {...iconProps}
        />
      </svg>
    );
  if (type === 'pin')
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21s7-6.02 7-12a7 7 0 1 0-14 0c0 5.98 7 12 7 12Z" {...iconProps} />
        <circle cx="12" cy="9" r="2.2" {...iconProps} />
      </svg>
    );
  if (type === 'instagram')
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" {...iconProps} />
        <circle cx="12" cy="12" r="4.2" {...iconProps} />
        <circle cx="17.3" cy="6.7" r="1.15" fill="currentColor" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 7l5 5-5 5" {...iconProps} />
    </svg>
  );
}

const OPTIONS = [
  {
    icon: 'whatsapp',
    kicker: 'INSTANT MESSAGING',
    title: 'WhatsApp',
    value: DETAILS.whatsapp,
    text: 'Chat directly with us for inquiries, availability, and instant bookings.',
    action: 'OPEN WHATSAPP',
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    external: true,
  },
  {
    icon: 'phone',
    kicker: 'DIRECT PHONE',
    title: 'Call Us',
    value: DETAILS.phone,
    text: 'Speak with our desk for guest assistance, group bookings, and event planning.',
    action: 'CALL NOW',
    href: 'tel:+918135041323',
  },
  {
    icon: 'pin',
    kicker: 'RESORT ADDRESS',
    title: 'Location',
    value: DETAILS.address,
    text: 'Conveniently located off Ajmer Road, Bhakrota in Jaipur, Rajasthan.',
    action: 'GET DIRECTIONS',
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`,
    external: true,
  },
  {
    icon: 'instagram',
    kicker: 'SOCIAL MEDIA',
    title: 'Instagram',
    value: DETAILS.instagram,
    text: 'Follow our official Instagram for daily resort stories, photographs, and event updates.',
    action: 'VIEW PROFILE',
    href: 'https://instagram.com/thrjaipur',
    external: true,
  },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [isMounted, setIsMounted] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const data = new FormData(e.currentTarget);
    const name = data.get('name') || '';
    const email = data.get('email') || '';
    const phone = data.get('phone') || '';
    const subject = data.get('subject') || '';
    const message = data.get('message') || '';

    // Validate
    if (!name || !email || !message) {
      setError('Please fill in all required fields');
      setLoading(false);
      showToast('Please fill required fields', 'error');
      return;
    }

    try {
      // Call API to send email via SMTP
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email');
      }

      // Success
      setSent(true);
      setLoading(false);
      
      // Reset form safely
      if (formRef.current) {
        formRef.current.reset();
      }
      
      showToast('✓ Email sent successfully! We will get back to you soon.', 'success');

      setTimeout(() => setSent(false), 3500);
    } catch (err) {
      console.error('Error:', err);
      setLoading(false);
      setError(err.message || 'Failed to send email');
      showToast('Failed to send email. Please try again.', 'error');
    }
  };

  return (
    <>
      {/* TOAST NOTIFICATION - Rendered outside main element */}
      {isMounted && toast.show && createPortal(
        <div className={`ct-toast ct-toast-${toast.type}`}>
          <div className="ct-toast-icon">
            {toast.type === 'success' ? '✓' : '✕'}
          </div>
          <div className="ct-toast-content">
            {toast.message}
          </div>
        </div>,
        document.body
      )}

      <main className={`ct ${mona.className}`}>

      {/* HERO */}
      <section className="ct-hero">
        <div className="ct-container ct-hero-grid">
          <div>
            <div className="ct-label">
              <span />
              <p>GET IN TOUCH</p>
            </div>

            <h1 className={cinzel.className}>Contact Us</h1>

            <p className="ct-lead">
              For room reservations, celebrations and general inquiries, reach out to us
              directly.
            </p>

            <p className="ct-text">
              Message us on WhatsApp, call our desk, or visit the resort. We are always happy
              to help.
            </p>
          </div>

          <aside className="ct-hero-side">
            <p>Nature. Heritage.</p>
            <p>Hospitality.</p>
            <div className="ct-line" />
            <h3 className={cinzel.className}>Jaipur</h3>
            <span>Rajasthan, India</span>
          </aside>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="ct-options">
        <div className="ct-container ct-cards">
          {OPTIONS.map((item) => (
            <article className="ct-card" key={item.title}>
              <div className="ct-icon">
                <Icon type={item.icon} />
              </div>

              <p className="ct-kicker">{item.kicker}</p>
              <h2 className={cinzel.className}>{item.title}</h2>
              <strong>{item.value}</strong>
              <p className="ct-card-text">{item.text}</p>

              <a
                className="ct-link"
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
              >
                {item.action}
                <Icon type="arrow" />
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* MESSAGE + MAP */}
      <section className="ct-message">
        <div className="ct-container ct-message-grid">
          <div className="ct-story">
            <div className="ct-label">
              <span />
              <p>PLAN YOUR VISIT</p>
            </div>

            <h2 className={cinzel.className}>The Heritage Resorts Jaipur</h2>

            <p className="ct-text">
              Whether it&apos;s a peaceful getaway, a grand celebration, or a memorable event,
              we&apos;re here to help make your experience special.
            </p>

            <div className="ct-map">
              <iframe
                title="The Heritage Resorts Jaipur location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          <div className="ct-form-card">
            <h2 className={cinzel.className}>Send Us a Message</h2>
            <div className="ct-line ct-line-form" />

            <p className="ct-form-intro">
              Have a question or special request? Fill out the form below and we&apos;ll get
              back to you soon.
            </p>

            <form onSubmit={handleSubmit} ref={formRef}>
              <div className="ct-grid">
                <input aria-label="Full Name" name="name" placeholder="Full Name" required />
                <input
                  aria-label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  required
                />
                <input aria-label="Phone Number" name="phone" placeholder="Phone Number" />
                <input aria-label="Subject" name="subject" placeholder="Subject" />
                <textarea
                  aria-label="Your Message"
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  required
                />
              </div>

              {error && (
                <div className="ct-error-message">
                  ⚠ {error}
                </div>
              )}

              <button type="submit" className="ct-submit" disabled={loading}>
                {loading ? 'SENDING...' : sent ? 'MESSAGE SENT ✓' : 'SEND MESSAGE'}
                <Icon type="arrow" />
              </button>
            </form>

            <p className="ct-form-note">
              Prefer a direct response? Reach us on WhatsApp or call us.
            </p>
          </div>
        </div>
      </section>

      {/* BOTTOM STRIP */}
      <section className="ct-strip">
        <div className="ct-container">
          <span>Nature</span>
          <i>✦</i>
          <span>Heritage</span>
          <i>✦</i>
          <span>Hospitality</span>
        </div>
      </section>

      <style>{`
        .ct, .ct *, .ct *::before, .ct *::after { box-sizing: border-box; }

        .ct {
          width: 100%;
          overflow: hidden;
          background: #FFFAF0;
          color: #555555;
          font-size: 18px;
          line-height: 1.6;
        }

        .ct h1, .ct h2, .ct h3, .ct p { margin: 0; }
        .ct a { color: inherit; }
        .ct button, .ct input, .ct textarea { font: inherit; }

        .ct-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 32px;
        }

        .ct-line {
          width: 56px;
          height: 1px;
          margin: 24px 0;
          background: #60511F;
        }

        .ct-label {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }
        .ct-label span { width: 40px; height: 1px; background: #60511F; flex: 0 0 auto; }
        .ct-label p {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 3px;
          color: #60511F;
        }

        /* HERO (fixed header ke liye top padding) */
        .ct-hero {
          padding: 180px 0 64px;
          background: #FFFAF0;
          border-bottom: 1px solid rgba(96,81,31,0.18);
        }
        .ct-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 300px;
          gap: 56px;
          align-items: start;
        }
        .ct-hero h1 {
          font-size: 30px;
          font-weight: 600;
          line-height: 1.3;
          letter-spacing: 0.5px;
          color: #171A18;
        }
        .ct-lead {
          max-width: 760px;
          margin-top: 18px;
          font-size: 22px;
          line-height: 1.5;
          color: #3F3F3A;
        }
        .ct-text {
          max-width: 760px;
          margin-top: 14px;
          font-size: 18px;
          line-height: 1.7;
          color: #555555;
        }
        .ct-hero-side {
          padding-left: 36px;
          border-left: 1px solid rgba(96,81,31,0.45);
        }
        .ct-hero-side p { font-size: 18px; letter-spacing: 1px; color: #494942; }
        .ct-hero-side h3 { font-size: 30px; font-weight: 600; color: #34352F; }
        .ct-hero-side span { display: block; margin-top: 6px; font-size: 18px; color: #5A5A52; }

        /* CONTACT CARDS */
        .ct-options { padding: 64px 0; background: #FDF2DE; }
        .ct-cards {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 24px;
        }
        .ct-card {
          display: flex;
          flex-direction: column;
          padding: 28px 24px;
          background: #FFFAF0;
          border: 1px solid rgba(96,81,31,0.18);
          border-radius: 6px;
        }
        .ct-icon {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          border-radius: 50%;
          background: #FDF2DE;
          color: #60511F;
        }
        .ct-icon svg { width: 28px; height: 28px; }

        .ct-kicker {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2.5px;
          color: #777064;
        }
        .ct-card h2 {
          margin-top: 6px;
          font-size: 22px;
          font-weight: 600;
          line-height: 1.25;
          color: #60511F;
        }
        .ct-card strong {
          display: block;
          margin-top: 10px;
          font-size: 18px;
          font-weight: 600;
          line-height: 1.4;
          color: #252A23;
          overflow-wrap: anywhere;
        }
        .ct-card-text {
          flex: 1;
          margin-top: 10px;
          font-size: 16px;
          line-height: 1.6;
          color: #62645E;
        }
        .ct-link {
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
          padding-bottom: 6px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-decoration: none;
          color: #252A23;
          border-bottom: 1px solid #60511F;
          transition: gap 0.25s ease, color 0.25s ease;
        }
        .ct-link svg { width: 18px; height: 18px; }
        .ct-link:hover { gap: 12px; color: #60511F; }

        /* MESSAGE + MAP */
        .ct-message { padding: 72px 0; background: #FFFAF0; }
        .ct-message-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 56px;
          align-items: start;
        }
        .ct-story h2 {
          font-size: 30px;
          font-weight: 600;
          line-height: 1.3;
          letter-spacing: 0.5px;
          color: #171A18;
        }
        .ct-map {
          margin-top: 28px;
          height: 320px;
          overflow: hidden;
          border: 1px solid rgba(96,81,31,0.22);
          border-radius: 8px;
          background: #EEE6D2;
        }
        .ct-map iframe { width: 100%; height: 100%; border: 0; display: block; }

        .ct-form-card {
          padding: 40px;
          background: #FDF2DE;
          border: 1px solid rgba(96,81,31,0.2);
          border-radius: 8px;
        }
        .ct-form-card h2 {
          font-size: 30px;
          font-weight: 600;
          line-height: 1.3;
          letter-spacing: 0.5px;
          color: #60511F;
        }
        .ct-line-form { margin: 18px 0; }
        .ct-form-intro { font-size: 18px; line-height: 1.7; color: #555555; }

        .ct-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          margin-top: 24px;
        }
        .ct-grid input, .ct-grid textarea {
          width: 100%;
          display: block;
          padding: 0 16px;
          font-size: 16px;
          color: #222222;
          background: #FFFAF0;
          border: 1px solid rgba(96,81,31,0.28);
          border-radius: 4px;
          outline: 0;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .ct-grid input { height: 52px; }
        .ct-grid textarea {
          grid-column: 1 / -1;
          min-height: 140px;
          padding: 14px 16px;
          resize: vertical;
        }
        .ct-grid input::placeholder, .ct-grid textarea::placeholder { color: #8A867C; }
        .ct-grid input:focus, .ct-grid textarea:focus {
          border-color: #60511F;
          box-shadow: 0 0 0 3px rgba(96,81,31,0.12);
        }

        .ct-submit {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 18px;
          padding: 16px 26px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 1.5px;
          color: #FFFFFF;
          background: #60511F;
          border: 0;
          border-radius: 3px;
          cursor: pointer;
          transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
        }
        .ct-submit svg { width: 18px; height: 18px; }
        .ct-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          background: #514418;
          box-shadow: 0 8px 18px rgba(96,81,31,0.18);
        }
        .ct-submit:active:not(:disabled) { transform: translateY(0); }
        .ct-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .ct-error-message {
          margin-top: 12px;
          padding: 12px 14px;
          background: #FFF5F0;
          border: 1px solid #E8B4A8;
          border-radius: 4px;
          font-size: 14px;
          color: #D84C38;
          line-height: 1.5;
        }

        .ct-form-note {
          margin-top: 16px;
          text-align: center;
          font-size: 14px;
          color: #777064;
        }

        /* STRIP */
        .ct-strip {
          padding: 22px 0;
          background: #FDF2DE;
          border-top: 1px solid rgba(96,81,31,0.2);
        }
        .ct-strip .ct-container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 18px;
        }
        .ct-strip span {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #60511F;
        }
        .ct-strip i { font-style: normal; font-size: 12px; color: rgba(96,81,31,0.55); }

        /* TABLET */
        @media (max-width: 1100px) {
          .ct-hero-grid { grid-template-columns: minmax(0, 1fr) 240px; gap: 36px; }
          .ct-hero-side { padding-left: 28px; }
          .ct-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .ct-message-grid { gap: 36px; }
          .ct-form-card { padding: 32px 26px; }
        }

        /* MOBILE */
        @media (max-width: 860px) {
          .ct { font-size: 16px; }
          .ct-container { padding-left: 20px; padding-right: 20px; }

          .ct-hero { padding: 118px 0 44px; }
          .ct-hero-grid { grid-template-columns: 1fr; gap: 32px; }
          .ct-label span { width: 28px; }
          .ct-label p { font-size: 12px; letter-spacing: 2px; }

          .ct-hero h1, .ct-story h2, .ct-form-card h2, .ct-hero-side h3 { font-size: 24px; }
          .ct-lead { font-size: 18px; }
          .ct-text, .ct-form-intro, .ct-hero-side p, .ct-hero-side span { font-size: 16px; }

          .ct-hero-side {
            padding: 24px 0 0;
            border-left: 0;
            border-top: 1px solid rgba(96,81,31,0.35);
          }

          .ct-options { padding: 40px 0; }
          .ct-cards { grid-template-columns: 1fr; gap: 14px; }
          .ct-card { padding: 24px 20px; }
          .ct-card h2 { font-size: 20px; }
          .ct-card strong { font-size: 16px; }
          .ct-card-text { font-size: 15px; }

          .ct-message { padding: 48px 0; }
          .ct-message-grid { grid-template-columns: 1fr; gap: 32px; }
          .ct-map { height: 260px; margin-top: 22px; }

          .ct-form-card { padding: 26px 20px; }
          .ct-grid { grid-template-columns: 1fr; gap: 12px; }
          .ct-grid textarea { grid-column: auto; }
          .ct-form-note { font-size: 13px; }

          .ct-strip .ct-container { gap: 12px; }
          .ct-strip span { font-size: 11px; letter-spacing: 2px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ct *, .ct *::before, .ct *::after { transition: none !important; }
        }

        /* TOAST NOTIFICATIONS */
        .ct-toast {
          position: fixed;
          top: 24px;
          right: 24px;
          z-index: 99999;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px 20px;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          font-size: 14px;
          font-weight: 600;
          line-height: 1.4;
          animation: slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          max-width: 380px;
          min-width: 300px;
        }

        .ct-toast-icon {
          font-size: 18px;
          font-weight: 700;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
        }

        .ct-toast-content {
          flex: 1;
          word-wrap: break-word;
        }

        @keyframes slideInRight {
          from {
            transform: translateX(420px);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(420px);
            opacity: 0;
          }
        }

        .ct-toast-success {
          background: #10B981;
          border: 1px solid #059669;
          color: #FFFFFF;
        }

        .ct-toast-success .ct-toast-icon {
          color: #FFFFFF;
        }

        .ct-toast-error {
          background: #EF4444;
          border: 1px solid #DC2626;
          color: #FFFFFF;
        }

        .ct-toast-error .ct-toast-icon {
          color: #FFFFFF;
        }

        @media (max-width: 860px) {
          .ct-toast {
            top: 16px;
            right: 16px;
            left: 16px;
            max-width: calc(100% - 32px);
            min-width: auto;
            font-size: 13px;
            padding: 14px 16px;
            gap: 10px;
          }

          .ct-toast-icon {
            width: 20px;
            height: 20px;
            font-size: 16px;
          }
        }
      `}</style>
    </main>
    </>
  );
}