# Email Setup Guide - The Heritage Resorts

## Overview

The contact form page now sends emails via SMTP. When a user submits the form:
1. Email is sent to the resort (configured in `CONTACT_EMAIL`)
2. A confirmation email is sent to the user

## Quick Setup

### Step 1: Create `.env.local` file

Copy `.env.local.example` and rename to `.env.local`:

```bash
cp .env.local.example .env.local
```

### Step 2: Add your SMTP credentials

Edit `.env.local` with your email provider's SMTP settings.

### Step 3: Restart dev server

```bash
npm run dev
```

## Email Provider Setup

### Gmail (Recommended for Testing)

1. Enable 2-Factor Authentication:
   - Go to https://myaccount.google.com/security
   - Scroll to "2-Step Verification" and enable it

2. Generate App Password:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer" (or your device)
   - Copy the 16-character password

3. Update `.env.local`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-gmail@gmail.com
   SMTP_PASS=xxxx xxxx xxxx xxxx (16-character password)
   SMTP_FROM_EMAIL=your-gmail@gmail.com
   CONTACT_EMAIL=your-gmail@gmail.com (or the resort's email)
   ```

### Office 365 / Outlook

```
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
SMTP_FROM_EMAIL=your-email@outlook.com
CONTACT_EMAIL=contact@theheritage.com
```

### SendGrid

1. Sign up at https://sendgrid.com
2. Create an API key
3. Update `.env.local`:
   ```
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=apikey
   SMTP_PASS=SG.xxxxx (your API key)
   SMTP_FROM_EMAIL=info@theheritage.com
   CONTACT_EMAIL=contact@theheritage.com
   ```

### Mailgun

1. Sign up at https://www.mailgun.com
2. Get SMTP credentials from dashboard
3. Update `.env.local` with their SMTP settings

### AWS SES

```
SMTP_HOST=email-smtp.region.amazonaws.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
SMTP_FROM_EMAIL=verified-email@your-domain.com
CONTACT_EMAIL=contact@theheritage.com
```

## Testing

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Go to http://localhost:3000/contact

3. Fill out the form and submit

4. Check:
   - Browser console for errors
   - Server logs for email sending status
   - Your email inbox for incoming messages

## Troubleshooting

### "Failed to send email"

**Check 1:** Are environment variables set correctly?
- Make sure `.env.local` exists in the root of the frontend folder
- Check for typos in variable names

**Check 2:** Are SMTP credentials correct?
- Test your credentials with a tool like Telnet or a mail client (Thunderbird, Outlook)
- Make sure you're using an app-specific password for Gmail

**Check 3:** Is the server running?
- Make sure you restarted the dev server after creating/editing `.env.local`
- Check that the API endpoint exists at `/api/contact`

**Check 4:** Firewall/Network issues
- Some corporate firewalls block SMTP ports
- Try port 465 with `SMTP_SECURE=true` if port 587 fails

### "Invalid sender email"
- Make sure `SMTP_FROM_EMAIL` matches your SMTP_USER or is authorized by your email provider

### Gmail showing "Less secure app access"
- You must use an App Password, not your regular password
- Generate one at https://myaccount.google.com/apppasswords

## File Structure

```
frontend/
├── src/
│   └── app/
│       ├── api/
│       │   └── contact/
│       │       └── route.js          (API endpoint)
│       └── contact/
│           └── page.jsx               (Contact form UI)
├── .env.local.example                 (Template)
├── .env.local                         (Your secrets - NEVER commit!)
└── SMTP_SETUP.md                      (This file)
```

## API Endpoint Details

**Route:** `POST /api/contact`

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Booking Inquiry",
  "message": "I'd like to book a room..."
}
```

**Success response (200):**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "messageId": "email-message-id"
}
```

**Error response (400/500):**
```json
{
  "error": "Error message",
  "details": "Error details"
}
```

## Security Notes

1. **Never commit `.env.local`** - It contains sensitive credentials
2. **Use app-specific passwords** for Gmail (not your regular password)
3. **Enable 2FA** on your email account for better security
4. **Rotate API keys** regularly if using services like SendGrid
5. **Use HTTPS** in production (required for secure email transmission)

## Production Deployment

Before deploying to production:

1. Set environment variables in your hosting platform:
   - Vercel: Settings → Environment Variables
   - Heroku: Settings → Config Vars
   - Others: Check your provider's documentation

2. Use a dedicated "no-reply" email address if possible

3. Set up email templates and branding

4. Consider adding rate limiting to prevent abuse

5. Test the form thoroughly with your production email setup

## Support

For issues with:
- **Gmail:** https://support.google.com/mail/answer/7126229
- **Office 365:** https://support.microsoft.com/en-us/office/pop-imap-and-smtp-settings
- **SendGrid:** https://docs.sendgrid.com/for-developers/sending-email/smtp-service
- **Mailgun:** https://documentation.mailgun.com/en/latest/user_manual.html
- **AWS SES:** https://docs.aws.amazon.com/ses/latest/dg/send-email-smtp.html
