# Deployment Guide - Hafa General Trading PLC

Complete step-by-step deployment instructions for production.

## 📋 Pre-Deployment Checklist

- [ ] Firebase project created
- [ ] All Firebase services enabled
- [ ] Environment variables configured
- [ ] Email SMTP configured
- [ ] Domain name purchased (optional)
- [ ] SSL certificate ready (Firebase provides free SSL)

## 🔥 Firebase Setup (Detailed)

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `hafa-trading`
4. Enable/disable Google Analytics (recommended: enable)
5. Click "Create project"

### 2. Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click "Get started"
3. Enable sign-in methods:
   - **Email/Password**: Enable
   - **Phone**: Enable (requires verification)
   - **Google**: Enable and configure OAuth consent screen

### 3. Create Firestore Database

1. Go to **Firestore Database**
2. Click "Create database"
3. Select location: `us-central` or closest to your users
4. Start in **production mode**
5. Click "Enable"

### 4. Enable Storage

1. Go to **Storage**
2. Click "Get started"
3. Start in **production mode**
4. Select same location as Firestore
5. Click "Done"

### 5. Set up Cloud Functions

1. Go to **Functions**
2. Click "Get started"
3. Upgrade to **Blaze (Pay as you go)** plan
   - Required for Cloud Functions
   - Free tier includes: 2M invocations/month
4. Set up billing account

### 6. Get Service Account Key

1. Go to **Project Settings** (gear icon)
2. Click **Service accounts** tab
3. Click "Generate new private key"
4. Save the JSON file securely
5. Extract values for `.env.local`:
   - `project_id` → `FIREBASE_ADMIN_PROJECT_ID`
   - `client_email` → `FIREBASE_ADMIN_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_ADMIN_PRIVATE_KEY`

## 🌐 Domain Configuration (Optional)

### Using Firebase Hosting with Custom Domain

1. Go to **Hosting** in Firebase Console
2. Click "Add custom domain"
3. Enter your domain: `hafatrading.com`
4. Follow DNS configuration instructions:
   - Add A records pointing to Firebase IPs
   - Add TXT record for verification
5. Wait for SSL certificate provisioning (automatic)

### DNS Records Example

```
Type    Name    Value
A       @       151.101.1.195
A       @       151.101.65.195
TXT     @       [verification-code]
CNAME   www     hafa-trading.web.app
```

## 📧 Email Configuration

### Using Gmail SMTP

1. Enable 2-Factor Authentication on Gmail
2. Generate App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Copy the 16-character password
3. Add to `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-16-char-app-password
```

### Alternative: SendGrid

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
```

## 🚀 Deployment Steps

### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase

```bash
firebase login
```

### Step 3: Initialize Firebase

```bash
firebase init

# Select:
# - Firestore
# - Functions
# - Hosting
# - Storage

# Use existing project: hafa-trading
# Accept default file names
# Configure as single-page app: Yes
# Set up automatic builds: No
```

### Step 4: Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

### Step 5: Deploy Storage Rules

```bash
firebase deploy --only storage
```

### Step 6: Deploy Cloud Functions

```bash
# Install function dependencies
cd functions
npm install

# Return to root
cd ..

# Deploy functions
firebase deploy --only functions
```

### Step 7: Build Next.js App

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Export static files
npx next export -o out
```

### Step 8: Deploy to Firebase Hosting

```bash
firebase deploy --only hosting
```

### Step 9: Verify Deployment

1. Visit your Firebase Hosting URL: `https://hafa-trading.web.app`
2. Test all pages and features
3. Check admin panel access
4. Verify email notifications
5. Test authentication flows

## 🔄 Continuous Deployment

### GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
          # Add other env variables
      
      - name: Export
        run: npx next export -o out
      
      - name: Deploy to Firebase
        uses: w9jds/firebase-action@master
        with:
          args: deploy --only hosting
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

Generate Firebase token:

```bash
firebase login:ci
# Copy the token and add to GitHub Secrets
```

## 📊 Post-Deployment Tasks

### 1. Create Admin User

```javascript
// Run in Firebase Console > Firestore
// Create document in 'users' collection:
{
  id: "admin-user-id",
  email: "admin@hafatrading.com",
  displayName: "Admin User",
  role: "superadmin",
  createdAt: new Date(),
  updatedAt: new Date()
}
```

### 2. Seed Initial Data

Option A: Use Admin Panel to add products manually

Option B: Create seed script:

```bash
# Create seed script
node scripts/seed-data.js
```

### 3. Configure Analytics

1. Go to Firebase Console > Analytics
2. Set up conversion events
3. Link to Google Analytics 4

### 4. Set up Monitoring

1. Enable Firebase Performance Monitoring
2. Set up error tracking
3. Configure alerts for:
   - High error rates
   - Slow page loads
   - Function failures

## 🔐 Security Hardening

### 1. Review Security Rules

```bash
# Test rules locally
firebase emulators:start --only firestore,storage
```

### 2. Enable App Check

1. Go to Firebase Console > App Check
2. Register your web app
3. Enable reCAPTCHA v3
4. Enforce App Check for:
   - Firestore
   - Storage
   - Functions

### 3. Set up CORS

Add to `firebase.json`:

```json
{
  "hosting": {
    "headers": [
      {
        "source": "**",
        "headers": [
          {
            "key": "X-Frame-Options",
            "value": "DENY"
          },
          {
            "key": "X-Content-Type-Options",
            "value": "nosniff"
          }
        ]
      }
    ]
  }
}
```

## 💰 Cost Optimization

### Firebase Pricing (Blaze Plan)

**Free Tier Includes:**
- Firestore: 50K reads, 20K writes, 20K deletes per day
- Storage: 5GB, 1GB downloads per day
- Functions: 2M invocations, 400K GB-seconds per month
- Hosting: 10GB storage, 360MB/day transfer

**Optimization Tips:**
1. Use Firestore indexes efficiently
2. Implement pagination for large lists
3. Cache static content
4. Optimize images before upload
5. Use Cloud Functions sparingly

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Function Deployment Fails

```bash
# Check Node version
node --version  # Should be 18+

# Reinstall function dependencies
cd functions
rm -rf node_modules
npm install
cd ..
```

### Authentication Issues

1. Check Firebase Auth configuration
2. Verify authorized domains in Firebase Console
3. Check browser console for errors

## 📞 Support

For deployment issues:
- Firebase Support: https://firebase.google.com/support
- Next.js Docs: https://nextjs.org/docs

---

**Deployment completed! Your app is now live! 🎉**
