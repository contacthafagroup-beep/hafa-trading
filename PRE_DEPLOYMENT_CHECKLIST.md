# Pre-Deployment Checklist

## Before Running Deployment

### ✅ Environment Setup

- [ ] `.env.local` file exists with all required variables
- [ ] Firebase project created and configured
- [ ] Cloudinary account set up
- [ ] Vercel account created (if deploying to Vercel)
- [ ] Node.js 18+ installed
- [ ] Firebase CLI installed (`npm install -g firebase-tools`)

### ✅ Firebase Configuration

- [ ] Firebase API keys added to `.env.local`
- [ ] Firebase Authentication enabled
- [ ] Firestore database created
- [ ] Firebase Storage enabled
- [ ] Admin user created (email: admin@hafatrading.com)

### ✅ Cloudinary Configuration

- [ ] Cloudinary cloud name configured
- [ ] Cloudinary API key and secret added
- [ ] Unsigned upload preset created
- [ ] Upload preset name added to `.env.local`

### ✅ SMTP Configuration (for Welcome Emails)

- [ ] SMTP provider chosen (Gmail, SendGrid, etc.)
- [ ] SMTP credentials ready
- [ ] For Gmail: App Password generated
- [ ] Test email address available for testing

### ✅ Code Quality

- [ ] All TypeScript errors resolved
- [ ] No console errors in development
- [ ] All features tested locally
- [ ] Build completes successfully (`npm run build`)
- [ ] Functions build successfully (`cd functions && npm run build`)

### ✅ Content Ready

- [ ] Products added to Firestore
- [ ] Blog posts created (optional)
- [ ] Company information updated
- [ ] Contact information correct
- [ ] Images uploaded to Cloudinary

### ✅ Security

- [ ] Firestore security rules reviewed
- [ ] Storage security rules reviewed
- [ ] Admin access restricted
- [ ] API keys not exposed in client code
- [ ] CORS configured properly

## Deployment Steps

### Option 1: Automated Deployment (Recommended)

**Windows:**
```bash
deploy-all.bat
```

**Mac/Linux:**
```bash
chmod +x deploy-all.sh
./deploy-all.sh
```

### Option 2: Manual Deployment

#### Step 1: Build Application
```bash
npm install
npm run build
```

#### Step 2: Build Functions
```bash
cd functions
npm install
npm run build
cd ..
```

#### Step 3: Configure SMTP
```bash
firebase functions:config:set smtp.host="smtp.gmail.com"
firebase functions:config:set smtp.port="587"
firebase functions:config:set smtp.user="your_email@gmail.com"
firebase functions:config:set smtp.password="your_app_password"
```

#### Step 4: Deploy Firebase
```bash
# Deploy rules
firebase deploy --only firestore:rules,storage:rules

# Deploy functions
firebase deploy --only functions
```

#### Step 5: Deploy to Vercel
```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## Post-Deployment Verification

### ✅ Basic Functionality

- [ ] Website loads at deployment URL
- [ ] Homepage displays correctly
- [ ] Navigation works
- [ ] All pages accessible

### ✅ Authentication

- [ ] Registration page works
- [ ] Login page works
- [ ] Google sign-in works (if enabled)
- [ ] Password reset works
- [ ] User dashboard accessible

### ✅ Welcome Email

- [ ] Create test account
- [ ] Welcome email received
- [ ] Email displays correctly
- [ ] In-app notification created
- [ ] Check Firebase Functions logs

### ✅ Admin Panel

- [ ] Admin can login
- [ ] Dashboard displays data
- [ ] Can manage products
- [ ] Can manage orders
- [ ] Can manage RFQs
- [ ] Can view analytics

### ✅ Products

- [ ] Product listing page works
- [ ] Product details page works
- [ ] Product search works
- [ ] Product filtering works
- [ ] Images load correctly

### ✅ Orders & RFQs

- [ ] Can create order
- [ ] Order confirmation works
- [ ] Can submit RFQ
- [ ] RFQ confirmation works
- [ ] Email notifications sent

### ✅ Blog (if applicable)

- [ ] Blog listing page works
- [ ] Blog post page works
- [ ] Newsletter subscription works

### ✅ Performance

- [ ] Page load times acceptable
- [ ] Images optimized
- [ ] No console errors
- [ ] Mobile responsive
- [ ] SEO meta tags present

## Monitoring Setup

### ✅ Firebase Console

- [ ] Monitor Authentication usage
- [ ] Check Firestore reads/writes
- [ ] Monitor Storage usage
- [ ] Review Functions logs
- [ ] Set up budget alerts

### ✅ Vercel Dashboard

- [ ] Monitor deployment status
- [ ] Check build logs
- [ ] Review analytics
- [ ] Set up custom domain (if applicable)

### ✅ Error Tracking

- [ ] Firebase Functions logs monitored
- [ ] Vercel error logs checked
- [ ] Set up alerts for critical errors

## Rollback Plan

If deployment fails:

1. **Vercel Rollback:**
   ```bash
   vercel rollback
   ```

2. **Firebase Functions Rollback:**
   - Go to Firebase Console > Functions
   - View previous versions
   - Rollback if needed

3. **Code Rollback:**
   ```bash
   git revert HEAD
   git push
   ```

## Support Contacts

- Firebase Support: https://firebase.google.com/support
- Vercel Support: https://vercel.com/support
- Cloudinary Support: https://support.cloudinary.com

## Documentation References

- **DEPLOYMENT.md** - Complete deployment guide
- **WELCOME_EMAIL_SETUP.md** - Email configuration
- **TESTING_WELCOME_EMAIL.md** - Email testing
- **ADMIN_GUIDE.md** - Admin panel usage
- **API_DOCUMENTATION.md** - API reference

## Final Checklist

Before announcing launch:

- [ ] All features tested in production
- [ ] Welcome email working
- [ ] Admin panel accessible
- [ ] Performance acceptable
- [ ] Mobile experience good
- [ ] SEO configured
- [ ] Analytics tracking
- [ ] Backup strategy in place
- [ ] Monitoring configured
- [ ] Team trained on admin panel

## 🚀 Ready to Deploy!

Once all items are checked, run:

**Windows:**
```bash
deploy-all.bat
```

**Mac/Linux:**
```bash
./deploy-all.sh
```

Good luck with your deployment! 🎉
