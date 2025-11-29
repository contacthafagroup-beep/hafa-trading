# Quick Start: Welcome Email Feature

## 🚀 Deploy in 3 Steps

### Step 1: Configure SMTP (One-time)
```bash
firebase functions:config:set smtp.host="smtp.gmail.com"
firebase functions:config:set smtp.port="587"
firebase functions:config:set smtp.user="your_email@gmail.com"
firebase functions:config:set smtp.password="your_app_password"
```

**Get Gmail App Password:**
https://myaccount.google.com/apppasswords

### Step 2: Deploy Function
```bash
cd functions
npm install
npm run build
cd ..
firebase deploy --only functions:onUserCreated
```

### Step 3: Test
1. Go to `/auth/register`
2. Create a new account
3. Check email inbox

## ✅ Done!

Every new signup now receives a welcome email automatically.

## 📖 Full Documentation
- **WELCOME_EMAIL_SETUP.md** - Complete setup guide
- **TESTING_WELCOME_EMAIL.md** - Testing procedures
- **WELCOME_EMAIL_FEATURE.md** - Feature overview

## 🔍 Check Logs
```bash
firebase functions:log --only onUserCreated
```

## 🎨 Customize
Edit email template in: `functions/src/index.ts`
