# Deployment Guide

## Prerequisites

- Node.js 18+ installed
- Firebase CLI installed (`npm install -g firebase-tools`)
- Firebase project created
- Cloudinary account created
- Vercel account (for deployment)

## Step 1: Environment Setup

1. Copy `.env.local.example` to `.env.local`
2. Fill in all required environment variables:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset
```

## Step 2: Firebase Setup

### Initialize Firebase
```bash
firebase login
firebase init
```

Select:
- Firestore
- Storage
- Hosting (optional)

### Deploy Security Rules
```bash
# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Storage rules
firebase deploy --only storage:rules

# Deploy both
firebase deploy --only firestore:rules,storage:rules
```

### Create Admin User
1. Go to Firebase Console > Authentication
2. Add user with email: `admin@hafatrading.com`
3. Set a strong password
4. Enable email verification (optional)

## Step 3: Cloudinary Setup

1. Go to Cloudinary Dashboard
2. Create an unsigned upload preset:
   - Settings > Upload > Upload presets
   - Click "Add upload preset"
   - Set signing mode to "Unsigned"
   - Name it (e.g., "hafa_unsigned")
   - Configure folder structure (optional)
3. Copy the preset name to `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`

## Step 4: Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Step 5: Build and Test

```bash
# Build for production
npm run build

# Test production build locally
npm start
```

## Step 6: Deploy to Vercel

### Option A: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option B: Deploy via GitHub

1. Push code to GitHub
2. Go to Vercel Dashboard
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables
6. Deploy

### Environment Variables in Vercel

Add all environment variables from `.env.local` to Vercel:
1. Go to Project Settings > Environment Variables
2. Add each variable
3. Select environments (Production, Preview, Development)
4. Save

## Step 7: Post-Deployment

### Verify Deployment
- [ ] Website loads correctly
- [ ] Authentication works
- [ ] Admin panel is accessible
- [ ] Products are displayed
- [ ] Blog posts are visible
- [ ] Forms submit correctly
- [ ] Images upload successfully

### Configure Custom Domain (Optional)
1. Go to Vercel Project Settings > Domains
2. Add your custom domain
3. Configure DNS records
4. Wait for SSL certificate

### Enable Analytics
1. Firebase Analytics is already configured
2. Verify events in Firebase Console
3. Set up custom events (optional)

## Step 8: Monitoring

### Firebase Console
- Monitor authentication
- Check Firestore usage
- Review Storage usage
- Monitor errors

### Vercel Dashboard
- Monitor deployments
- Check build logs
- Review analytics
- Monitor performance

## Troubleshooting

### Build Errors

**Error: Missing environment variables**
- Solution: Add all required variables to Vercel

**Error: Firebase not initialized**
- Solution: Check Firebase configuration in `.env.local`

**Error: Cloudinary upload failed**
- Solution: Verify Cloudinary credentials and upload preset

### Runtime Errors

**Error: Permission denied (Firestore)**
- Solution: Deploy security rules with `firebase deploy --only firestore:rules`

**Error: Storage upload failed**
- Solution: Deploy storage rules with `firebase deploy --only storage:rules`

**Error: Admin access denied**
- Solution: Verify admin user email is exactly `admin@hafatrading.com`

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Review Firebase usage
- Check for security updates
- Monitor error logs
- Backup Firestore data

### Backup Strategy
```bash
# Export Firestore data
firebase firestore:export gs://your-bucket/backups/$(date +%Y%m%d)

# Export Storage files (use Firebase Console or gsutil)
```

## Rollback

If deployment fails:
```bash
# Revert to previous deployment in Vercel
vercel rollback

# Or redeploy previous commit
git revert HEAD
git push
```

## Support

For deployment issues:
- Check Vercel documentation: https://vercel.com/docs
- Check Firebase documentation: https://firebase.google.com/docs
- Contact: admin@hafatrading.com

## Checklist

Before going live:
- [ ] All environment variables configured
- [ ] Firebase rules deployed
- [ ] Admin account created
- [ ] SSL certificate active
- [ ] Custom domain configured (if applicable)
- [ ] Analytics enabled
- [ ] Backup strategy in place
- [ ] Monitoring configured
- [ ] Error tracking enabled
- [ ] Performance optimized
