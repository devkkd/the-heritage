# Frontend-Only Email Setup with EmailJS

## Overview

**NO BACKEND NEEDED!** 

Your contact form now sends emails directly from the browser using **EmailJS** (free service). When a user submits the form:

1. ✉️ Email sent directly to your inbox
2. ✉️ No server involved
3. 🎉 Toast notification shows success
4. ✅ Form clears automatically

---

## Step-by-Step Setup (5 minutes)

### Step 1: Sign Up for EmailJS (Free)

Go to https://www.emailjs.com and create a free account.

### Step 2: Add Email Service

1. Dashboard → **Email Services** → **Add Service**
2. Choose your email provider:
   - Gmail
   - Outlook/Office 365
   - Yahoo
   - Custom SMTP
3. Follow the authentication steps
4. **Copy the SERVICE ID** (looks like: `service_abc123xyz`)

### Step 3: Create Email Template

1. Dashboard → **Email Templates** → **Create New Template**
2. Add this template code:

```
Subject: New Inquiry from {{from_name}}

---

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Subject: {{subject}}

Message:
{{message}}

---
User's Reply-To: {{reply_to}}
```

3. **Copy the TEMPLATE ID** (looks like: `template_abc123xyz`)

### Step 4: Get Public Key

1. **Account Settings** → **API Keys**
2. **Copy the PUBLIC KEY** (looks like: `abc123xyz...`)

### Step 5: Add to `.env.local`

Edit `.env.local` in the `frontend` folder:

```
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxxxx
```

Replace with your actual values from EmailJS dashboard.

### Step 6: Restart Dev Server

```bash
npm run dev
```

### Step 7: Test

1. Go to http://localhost:3000/contact
2. Fill out the form
3. Click "SEND MESSAGE"
4. You'll see a **green toast notification** ✓
5. Check your email inbox

---

## What Happens Inside

```
┌─────────────────────┐
│  User Fills Form    │
└────────┬────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Clicks "SEND MESSAGE" Button   │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Browser Calls EmailJS API      │
│  (No server needed!)            │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  EmailJS Sends Email via SMTP   │
│  (Gmail, Outlook, etc.)         │
└────────┬────────────────────────┘
         │
         ▼
┌──────────────────────────┐
│  Email in Your Inbox ✓   │
└──────────────────────────┘
         │
         ▼
┌────────────────────────────────┐
│  Green Toast Shows Success     │
│  Form Clears & Ready Again     │
└────────────────────────────────┘
```

---

## EmailJS Dashboard Reference

### Finding Your Credentials

**Service ID:**
- Dashboard → Email Services → Click your service → Copy ID

**Template ID:**
- Dashboard → Email Templates → Click your template → Copy ID

**Public Key:**
- Account Settings (⚙️ icon) → API Keys → Copy Public Key

---

## Troubleshooting

### "Failed to send email" Error

**Check 1:** Are env variables correct?
```bash
# Make sure .env.local has these EXACT lines:
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxx
```

**Check 2:** Did you restart dev server?
```bash
# Stop (Ctrl+C) and run:
npm run dev
```

**Check 3:** Are they the RIGHT values?
- Go to https://dashboard.emailjs.com
- Double-check copy-paste (no extra spaces)

**Check 4:** Does template have right variables?
- Must use: `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{subject}}`, `{{message}}`, `{{reply_to}}`

### Email Sent but Not Received

1. Check **SPAM folder** (might be there initially)
2. Add sender email to contacts
3. Verify **Email Service is Active** in dashboard

### "Env variable undefined" Error

- Make sure `.env.local` file exists
- Variables must start with `NEXT_PUBLIC_`
- Restart dev server after editing `.env.local`

### Template Not Found

- Go to EmailJS dashboard
- Verify template exists
- Copy exact TEMPLATE_ID (case-sensitive)

---

## Security & Privacy

✅ **Your Email Safe:**
- EmailJS handles all email securely
- Free tier has rate limits (fine for testing)
- No backend = no server to hack

✅ **Environment Variables:**
- `.env.local` is in `.gitignore` (won't be committed)
- Public key is safe (it's meant to be public)

✅ **User Data:**
- EmailJS doesn't store form data
- Only transmits to SMTP server

---

## Free Plan Limits

EmailJS free plan includes:
- ✅ Up to **200 emails/month**
- ✅ Multiple email services
- ✅ Email templates
- ✅ No credit card required
- 📈 Upgrade anytime if needed

---

## Production Deployment

### On Vercel/Netlify:

1. Go to project settings
2. Add Environment Variables:
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
3. Redeploy
4. Test on live site

---

## Want More Control?

If you need:
- Custom email templates with more styling
- Different email for different form types
- Email cc/bcc
- Attachments

You can:
1. Edit the email template in EmailJS dashboard
2. Add more template variables
3. Update `.next_PUBLIC_` to use them
4. Modify the form to pass new data

---

## File Structure

```
frontend/
├── src/
│   └── app/
│       └── contact/
│           └── page.jsx           ← Updated with EmailJS
├── .env.local                      ← Your credentials (SECRET - not in git)
├── .env.local.emailjs              ← Setup instructions template
└── EMAILJS_SETUP.md               ← This file
```

---

## Support

- **EmailJS Help**: https://www.emailjs.com/docs
- **EmailJS Status**: https://www.emailjs.com/
- **Contact Form Code**: See `src/app/contact/page.jsx`

---

## Quick Reference

| What | Where | Example |
|------|-------|---------|
| Create Account | https://www.emailjs.com | Free signup |
| Dashboard | https://dashboard.emailjs.com | Manage services |
| API Keys | Account Settings → API Keys | `abc123...` |
| Service ID | Email Services → Your Service | `service_abc123...` |
| Template ID | Email Templates → Your Template | `template_abc123...` |

---

## Testing Email Template Variables

Your template should include these variables:

| Variable | What it is | Example |
|----------|-----------|---------|
| `{{from_name}}` | User's name | John Doe |
| `{{from_email}}` | User's email | john@example.com |
| `{{phone}}` | User's phone | +1234567890 |
| `{{subject}}` | Email subject | Booking Inquiry |
| `{{message}}` | User's message | I'd like to book... |
| `{{reply_to}}` | Reply-to email | john@example.com |

**Important:** Template variable names are case-sensitive!

---

Done! Your contact form is now live with **zero backend code** 🎉
