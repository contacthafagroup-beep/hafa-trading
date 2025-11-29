# Welcome Email Setup Guide

## Overview
A welcome email is automatically sent to every new customer when they sign up for an account on Hafa Trading PLC.

## Features
- ✅ Automatic trigger on user registration
- ✅ Beautiful HTML email template with company branding
- ✅ Plain text fallback for email clients that don't support HTML
- ✅ In-app notification created for the user
- ✅ Personalized greeting with user's name
- ✅ Information about available features and services
- ✅ Contact information and support details

## Email Content
The welcome email includes:
- Personalized greeting
- Company introduction
- List of available features (browse products, request quotes, track shipments, etc.)
- Call-to-action button to explore products
- Support contact information
- Professional branding with Hafa Trading colors

## Setup Instructions

### 1. Configure SMTP Settings
Add these environment variables to your Firebase Functions configuration:

```bash
firebase functions:config:set smtp.host="smtp.gmail.com"
firebase functions:config:set smtp.port="587"
firebase functions:config:set smtp.user="your_email@gmail.com"
firebase functions:config:set smtp.password="your_app_password"
```

**For Gmail:**
1. Enable 2-factor authentication on your Google account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the generated password as `smtp.password`

**Alternative SMTP Providers:**
- SendGrid
- Mailgun
- Amazon SES
- Postmark

### 2. Deploy Firebase Functions
```bash
cd functions
npm install
npm run build
firebase deploy --only functions
```

### 3. Test the Welcome Email
Create a new account on your website to trigger the welcome email:
1. Go to `/auth/register`
2. Fill in the registration form
3. Submit the form
4. Check the email inbox for the welcome message

### 4. Verify Function Logs
Check Firebase Functions logs to ensure the email was sent:
```bash
firebase functions:log --only onUserCreated
```

## Function Details

### Trigger
- **Type:** Authentication Trigger
- **Event:** `onCreate`
- **Function Name:** `onUserCreated`

### What Happens
1. User creates an account (email/password or Google sign-in)
2. Firebase Authentication triggers the `onUserCreated` function
3. Function sends a welcome email using nodemailer
4. Function creates an in-app notification in Firestore
5. User receives both email and notification

## Customization

### Update Email Content
Edit the email template in `functions/src/index.ts`:
- Modify the HTML template in the `html` field
- Update the plain text version in the `text` field
- Change colors, styling, or content as needed

### Update Company Information
Replace placeholder contact information:
- Phone number: Currently shows `+251-XXX-XXXX`
- Email: Currently shows `support@hafatrading.com`
- Update these in the email template

### Add Company Logo
To include your company logo in the email:
1. Upload logo to a public URL (Firebase Storage, Cloudinary, etc.)
2. Add an `<img>` tag in the email header:
```html
<img src="https://your-logo-url.com/logo.png" alt="Hafa Trading" style="max-width: 200px;">
```

## Troubleshooting

### Email Not Sending
1. Check Firebase Functions logs for errors
2. Verify SMTP credentials are correct
3. Ensure SMTP port is not blocked by firewall
4. Check if email is in spam folder

### Gmail Blocking Emails
- Use App Password instead of regular password
- Enable "Less secure app access" (not recommended)
- Consider using a dedicated email service (SendGrid, etc.)

### Function Not Triggering
1. Verify function is deployed: `firebase functions:list`
2. Check Firebase Console > Functions for errors
3. Ensure Firebase Authentication is enabled
4. Check function logs for execution

## Cost Considerations
- Firebase Functions: Free tier includes 2M invocations/month
- Each signup = 1 function invocation
- SMTP services may have their own pricing (Gmail is free for low volume)

## Security Notes
- Never commit SMTP credentials to version control
- Use Firebase Functions config or environment variables
- Rotate SMTP passwords regularly
- Monitor for unusual email sending activity

## Next Steps
- Customize the email template with your branding
- Add your actual contact information
- Test with different email providers
- Set up email analytics (optional)
- Consider adding more automated emails (order confirmation, shipping updates, etc.)
