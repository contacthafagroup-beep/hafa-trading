# 🚀 Quick Setup Guide - Hafa General Trading PLC

## ✅ What's Already Done:
- ✅ Firebase project connected: `hafa-general-trading-plc`
- ✅ Environment variables configured
- ✅ Firestore security rules deployed
- ✅ App running at http://localhost:3000

## 🔥 Enable Firebase Services (5 minutes)

### 1. Enable Authentication
1. Go to: https://console.firebase.google.com/project/hafa-general-trading-plc/authentication
2. Click **"Get started"**
3. Enable these sign-in methods:
   - ✅ **Email/Password** → Enable → Save
   - ✅ **Google** → Enable → Add your email → Save
   - ✅ **Phone** (optional) → Enable → Save

### 2. Create Firestore Database
1. Go to: https://console.firebase.google.com/project/hafa-general-trading-plc/firestore
2. Click **"Create database"**
3. Select location: **europe-west** (closest to Ethiopia)
4. Start in **production mode** (rules already deployed)
5. Click **"Enable"**

### 3. Enable Storage
1. Go to: https://console.firebase.google.com/project/hafa-general-trading-plc/storage
2. Click **"Get started"**
3. Start in **production mode** (rules already deployed)
4. Use same location as Firestore
5. Click **"Done"**

### 4. Test Your App

Open http://localhost:3000 and test:
- ✅ Browse products (Export & Import)
- ✅ View product details
- ✅ Submit RFQ (Request for Quotation)
- ✅ Track shipment
- ✅ Contact form
- ✅ Dark mode toggle

## 🎨 What's Working Now:

### Public Pages (No Firebase needed):
- Home page with animations
- About Us page
- Export Products (42 products)
- Import Products (34 products)
- Contact page
- RFQ form
- Shipment tracking
- Blog listing

### Needs Firebase (After setup above):
- User registration/login
- Save products to Firestore
- Upload product images
- Admin panel functionality
- Real-time notifications
- Email notifications (needs Cloud Functions)

## 📱 Admin Panel Access

After enabling Authentication:
1. Create an admin user in Firestore:
   - Go to Firestore Database
   - Create collection: `users`
   - Add document with your user ID
   - Set field `role` = `"superadmin"`

2. Access admin panel: http://localhost:3000/admin

## 🚀 Deploy to Production (Later)

When ready to deploy:

```bash
# Build the app
npm run build

# Export static files
npx next export -o out

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

Your site will be live at:
https://hafa-general-trading-plc.web.app

## 🆘 Need Help?

- Firebase Console: https://console.firebase.google.com/project/hafa-general-trading-plc
- Documentation: See README.md
- API Docs: See API_DOCUMENTATION.md

---

**Current Status**: ✅ App running locally, Firebase services need manual enablement
