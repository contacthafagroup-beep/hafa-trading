# GitHub Deployment Guide

## ✅ Git Repository Initialized

Your code has been committed locally with:
- 93 files
- 25,654+ lines of code
- Complete enterprise application

## 📝 Next Steps to Push to GitHub

### 1. Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `hafa-trading-plc` (or your preferred name)
3. Description: "Enterprise web application for Hafa General Trading PLC - Ethiopian export business"
4. Choose: **Private** or **Public**
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### 2. Push to GitHub

After creating the repository, run these commands:

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/hafa-trading-plc.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Alternative: Using SSH
If you have SSH keys set up:
```bash
git remote add origin git@github.com:YOUR_USERNAME/hafa-trading-plc.git
git branch -M main
git push -u origin main
```

## 🚀 Deploy to Vercel (Recommended)

### Option 1: Deploy via Vercel Dashboard
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import your `hafa-trading-plc` repository
5. Configure:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Add Environment Variables:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAK0j_HCF2oP2UWDuMVZpz4Qwk4YBysN6U
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=hafa-trading.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=hafa-trading
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=hafa-trading.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1095191275274
   NEXT_PUBLIC_FIREBASE_APP_ID=1:1095191275274:web:9f7b752b44fc8e30587cf3
   
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dlozdqyku
   NEXT_PUBLIC_CLOUDINARY_API_KEY=594668792645654
   CLOUDINARY_API_SECRET=lOmOx3fGAekPVxjLnK2P-G-DgEg
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=hafa_unsigned
   ```
7. Click "Deploy"

### Option 2: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## 🔧 Pre-Deployment Checklist

### 1. Environment Variables
✅ Firebase configuration
✅ Cloudinary configuration
⚠️ Remove any sensitive data from code

### 2. Firebase Configuration
- ✅ Authentication enabled
- ✅ Firestore database created
- ⚠️ Set Firestore security rules (see below)
- ⚠️ Add your Vercel domain to Firebase authorized domains

### 3. Cloudinary Configuration
- ✅ Account created
- ✅ Upload preset configured
- ✅ Credentials added

## 🔐 Important: Firebase Security Rules

Before going live, update your Firestore rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Products - public read, admin write
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'superadmin'];
    }
    
    // Categories - public read, admin write
    match /categories/{categoabove!
nds mmapush co run the pository and rete thereatHub. Just c to Gipushready to nd ted ade is commitco

Your Ready!e u'r Yoe

## 🎉storagy media oudinarion
- ✅ Cl integrataseirebpanel
- ✅ Fn te admi✅ Comple
- ashboard dtics
- ✅ Analytmanagemen✅ Supplier nt
- r manageme
- ✅ Customeia uploads with med- ✅ Blogking
ment trac
- ✅ Shipsystemem
- ✅ RFQ stement syrder managckout
- ✅ Ocart & che Shopping ducts
- ✅ort pron exp42 Ethiopia

- ✅ destion Incluur ApplicaYon"

## 📊 miadsuper"le to hange ror → Cseur und yoe
4. Fi→ Firestor Console  Firebase tount
3. Goaccoeate Crgister
2. uth/re/avercel.appyour-domain.1. Go to Account
dmin  Create A
### 3.oads work
e upl Imagworks
- ✅cation Authentiaccess
- ✅ el n pan
- ✅ Admit processckou Chey
- ✅onalitt functi ✅ Carks
-wor page roductsads
- ✅ P lo ✅ Homepage
-loymentDept Your 
### 2. Tesapp`
ng.vercel.`hafa-tradi- Example:   mains"
 orized doto "Authmain cel doVer2. Add your  Settings
ntication → → Authese ConsoleGo to Firebairebase
1. Domain to Fel ercAdd V. t

### 1meneployfter D

## 🌐 A  }
}
```}
;
    dmin']peradmin', 'su.role in ['auid)).datah.st.aut$(reques/nts/userdocume)/tabasetabases/$(da     get(/da
   null && = auth !request.write: if     allow );
  eradmin'] 'sup['admin',role in .uid)).data..authuestusers/$(req/documents/base)(dataatabases/$/dt(       gel && 
  h != nulutrequest.a     (   
 ' ||shed 'publi.status ==ce.data if resourlow read:     al {
 ts/{postId}osog_ph /bltc
    maiteadmin wrd,  publisheeadpublic r  // Blog - }
    
  min'];
    , 'superad in ['admin'le)).data.roidst.auth.u$(requeusers/ts/mendocuase)/s/$(databdatabase get(/& 
       l &uth != nul request.arite: iflow w      all;
uth != nulrequest.aad: if allow re {
      erId}iers/{supplimatch /suppln only
     - admirs // Supplie    
}
     '];
  dmin'supera ['admin',  inroleata..did))t.auth.u(requessers/$nts/use)/documeatabas/$(d/database get(     
   ull &&st.auth != nreque if e:low writall;
      nul!= .auth requestd: if w realo     ald} {
 mentIents/{shipshipm  match /
  dmin only - aents// Shipm    
  
    }
  uperadmin'];in', 'sadmole in ['.rid)).dataquest.auth.u$(rements/users/se)/docu$(datababases/et(/data     g 
   ull &&st.auth != nf requete: idelete, llow upda
      a: if true;atereallow c   null;
    st.auth !=eque if row read: all
     qId} {/rfqs/{rfatch age
    manin mte, admea- public crs 
    // RFQ}
    in'];
    radmupe'admin', 'sole in [).data.ruth.uid)request.ausers/$(ents/base)/documdatadatabases/$(   get(/ 
     = null &&auth !st.que: if reate upd      allow != null;
uthquest.ate: if re allow crea;
     peradmin']), 'sumin' ['adle indata.routh.uid)).request.as/users/$(e)/documentases/$(databdatabas(/        get| 
 id |h.u.autequestrId == ra.use.datource  (res  ll && 
    .auth != nuest requ ifow read:all  rId} {
    orders/{ordech /  matad all
  s can ren, admind their ow can reas - users  // Order
    
  
    }];'superadmin'admin', ole in ['data.rh.uid)).equest.auts/$(rs/user)/documentatabasees/$(dabaset(/dat        g && 
= nulluest.auth ! if reqllow write:
      a true;ifow read:     all
  {ryId} 