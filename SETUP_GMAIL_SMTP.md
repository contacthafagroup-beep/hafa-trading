# Setup Gmail SMTP for Firebase Functions

## Email Configuration
Your Cloud Functions will send emails from: **contact.hafagroup@gmail.com**

---

## Step 1: Generate Gmail App Password

Since Gmail requires 2-factor authentication for SMTP, you need to create an "App Password":

1. **Go to Google Account Settings**
   - Visit: https://myaccount.google.com/
   - Sign in with `contact.hafagroup@gmail.com`

2. **Enable 2-Step Verification** (if not already enabled)
   - Go to Security → 2-Step Verification
   - Follow the setup process

3. **Create App Password**
   - Go to Security → 2-Step Verification → App passwords
   - Or visit directly: https://myaccount.google.com/apppasswords
   - Select app: "Mail"
   - Select device: "Other (Custom name)"
   - Enter name: "Firebase Functions - Hafa Trading"
   - Click "Generate"
   - **Copy the 16-character password** (you'll need this in Step 2)

---

## Step 2: Set Firebase Functions Environment Variables

You need to configure these environment variables in Firebase Functions:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=contact.hafagroup@gmail.com
SMTP_PASSWORD=[Your App Password from Step 1]
```

### Option A: Using Firebase CLI

```bash
# Navigate to functions directory
cd functions

# Set environment variables
firebase functions:config:set smtp.host="smtp.gmail.com"
firebase functions:config:set smtp.port="587"
firebase functions:config:set smtp.user="contact.hafagroup@gmail.com"
firebase functions:config:set smtp.password="YOUR_APP_PASSWORD_HERE"

# Verify configuration
firebase functions:config:get

# Deploy functions with new config
firebase deploy --only functions
```

### Option B: Using Firebase Console

1. Go to Firebase Console: https://console.firebase.google.com
2. Select your project: `hafa-general-trading-plc`
3. Go to **Functions** → **Configuration**
4. Add these environment variables:
   - `SMTP_HOST` = `smtp.gmail.com`
   - `SMTP_PORT` = `587`
   - `SMTP_USER` = `contact.hafagroup@gmail.com`
   - `SMTP_PASSWORD` = [Your App Password]

---

## Step 3: Update Functions Code (Already Done)

The code has been updated to use `contact.hafagroup@gmail.com` as the default sender email.

---

## Step 4: Deploy Functions

```bash
cd functions
npm install
npm run build
firebase deploy --only functions
```

---

## Step 5: Test Email Sending

After deployment, test the email functionality:

1. **Test RFQ Reply Email**
   - Go to Admin Panel → RFQs
   - Click on an RFQ
   - Click "Send Email Reply"
   - Send a test email
   - Check if the customer receives it

2. **Test Partnership Reply Email**
   - Go to Admin Panel → Partnerships
   - Click on a partnership
   - Send a reply
   - Check if they receive it

3. **Test Welcome Email**
   - Create a new user account
   - Check if welcome email is received

---

## Troubleshooting

### "Invalid login" or "Authentication failed"
- Make sure you're using the App Password, not your regular Gmail password
- Verify 2-Step Verification is enabled
- Generate a new App Password if needed

### "Less secure app access"
- Gmail no longer supports "less secure apps"
- You MUST use App Passwords (see Step 1)

### Emails going to spam
- Add SPF record to your domain
- Use a custom domain email instead of Gmail (recommended for production)
- Ask recipients to mark your emails as "Not Spam"

### "Daily sending limit exceeded"
- Gmail has a limit of 500 emails per day for free accounts
- Consider using a professional email service like:
  - SendGrid
  - AWS SES
  - Mailgun
  - Postmark

---

## Alternative: Use SendGrid (Recommended for Production)

For better deliverability and higher limits, consider using SendGrid:

1. Sign up at https://sendgrid.com (free tier: 100 emails/day)
2. Get your API key
3. Update environment variables:
   ```bash
   firebase functions:config:set sendgrid.api_key="YOUR_SENDGRID_API_KEY"
   ```
4. Update the transporter code to use SendGrid

---

## Current Configuration

- **From Email**: contact.hafagroup@gmail.com
- **From Name**: Hafa Trading PLC
- **SMTP Host**: smtp.gmail.com
- **SMTP Port**: 587
- **Security**: TLS (STARTTLS)

---

## Quick Setup Commands

```bash
# 1. Set environment variables
firebase functions:config:set smtp.host="smtp.gmail.com"
firebase functions:config:set smtp.port="587"
firebase functions:config:set smtp.user="contact.hafagroup@gmail.com"
firebase functions:config:set smtp.password="YOUR_16_CHAR_APP_PASSWORD"

# 2. Deploy functions
cd functions
npm install
npm run build
firebase deploy --only functions

# 3. Test
# Go to admin panel and send a test email
```

---

## Status

- ✅ Code updated to use contact.hafagroup@gmail.com
- ✅ Default SMTP host set to smtp.gmail.com
- ✅ Changes committed to Git
- ⏳ **PENDING: Set up Gmail App Password** ← You need to do this
- ⏳ **PENDING: Configure Firebase Functions environment variables**
- ⏳ **PENDING: Deploy functions**

Once you complete these steps, all emails will be sent from contact.hafagroup@gmail.com!
