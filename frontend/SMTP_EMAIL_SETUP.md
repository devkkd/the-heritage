# SMTP Email Setup - Contact Form

## Overview

Contact form sends emails via **SMTP** (your email provider). Email bhej jaate hi auto-reply aata hai.

**Architecture:**
- Frontend (React) → API Route (Next.js) → SMTP → Email Sent
- Auto-reply bhij jaata hai user ko
- Toast notification dikhata hai form pe

---

## Quick Setup (Gmail - 5 Minutes)

### Step 1: Enable 2-Factor Authentication

Go to: https://myaccount.google.com/security

Scroll to "2-Step Verification" → Enable it

### Step 2: Generate App Password

Go to: https://myaccount.google.com/apppasswords

- Select "Mail" and "Windows Computer"
- Google will generate 16-character password
- **Copy it**

### Step 3: Update `.env.local`

Edit `frontend/.env.local`:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
SMTP_FROM_EMAIL=your-gmail@gmail.com
CONTACT_EMAIL=your-gmail@gmail.com
```

Replace values with yours.

### Step 4: Restart Dev Server

```bash
npm run dev
```

### Step 5: Test

1. Go to http://localhost:3000/contact
2. Fill form and submit
3. See green toast ✓
4. Check email inbox

---

## How It Works

```
User fills contact form
    ↓
Clicks "SEND MESSAGE"
    ↓
Button shows "SENDING..."
    ↓
Frontend calls /api/contact (Next.js API)
    ↓
Backend connects to SMTP server
    ↓
Sends email to CONTACT_EMAIL
    ↓
Sends auto-reply to user's email
    ↓
Returns success response
    ↓
Green toast shows: "✓ Email sent successfully!"
    ↓
Form clears automatically
```

---

## Emails Sent

### 1. To Resort (CONTACT_EMAIL)
- From: `SMTP_FROM_EMAIL`
- To: `CONTACT_EMAIL`
- Contains: Full inquiry details

### 2. To User (Auto-Reply)
- From: `SMTP_FROM_EMAIL`
- To: User's email (from form)
- Subject: "We Received Your Message"
- Contains: Their message + WhatsApp number

---

## Other Email Providers

### Office 365 / Outlook

```
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

### SendGrid (Free Tier)

```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=SG.xxxxx (your API key)
```

### Custom SMTP

Check your email provider's SMTP settings.

---

## Troubleshooting

### "Failed to send email"

**Check 1:** Restart dev server
```bash
npm run dev
```

**Check 2:** Is `.env.local` correct?
- Open `.env.local`
- Compare with `.env.local.example`
- Check for typos

**Check 3:** Gmail app password correct?
- Go to https://myaccount.google.com/apppasswords
- Regenerate if unsure
- 16 characters with spaces

**Check 4:** Check server logs
- Look for "Email error:" in terminal
- Shows what went wrong

### Email not received

1. Check **SPAM folder** first
2. Gmail might flag first emails as spam
3. Add sender email to contacts
4. Try with different email to test

### "Connection refused" error

- Port 587 might be blocked on your network
- Try port 465 with `SMTP_SECURE=true`
- Use different network (mobile hotspot) to test

---

## Environment Variables

| Variable | What | Example |
|----------|------|---------|
| `SMTP_HOST` | Email server | smtp.gmail.com |
| `SMTP_PORT` | Server port | 587 (TLS) or 465 (SSL) |
| `SMTP_SECURE` | Use SSL? | false for 587, true for 465 |
| `SMTP_USER` | Login email | your-email@gmail.com |
| `SMTP_PASS` | Login password | 16-char app password |
| `SMTP_FROM_EMAIL` | Sender email | your-email@gmail.com |
| `CONTACT_EMAIL` | Where to send | info@theheritage.com |

---

## Security

✅ **`.env.local` is in `.gitignore`** - Won't be committed
✅ **Use App Passwords** - Not regular passwords
✅ **Input validated** - XSS protection built-in
✅ **No data stored** - Just sent via SMTP

---

## Files

```
frontend/
├── src/app/
│   ├── api/
│   │   └── contact/
│   │       └── route.js           (Email API)
│   └── contact/
│       └── page.jsx               (Contact form)
├── .env.local                     (Your secrets)
├── .env.local.example             (Template)
└── SMTP_EMAIL_SETUP.md           (This file)
```

---

## Production Deployment

### On Vercel:

1. Go to project settings
2. Add Environment Variables:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_SECURE`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `SMTP_FROM_EMAIL`
   - `CONTACT_EMAIL`
3. Redeploy

### On Other Platforms:

Same process - add env vars to your hosting provider.

---

## Support

- **Nodemailer:** https://nodemailer.com/
- **Gmail SMTP:** https://support.google.com/mail/answer/7126229
- **Next.js API:** https://nextjs.org/docs/app/building-your-application/routing/route-handlers
