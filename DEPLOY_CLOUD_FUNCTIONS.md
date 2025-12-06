# Deploy Cloud Functions - Fix CORS Error

## Problem
Getting CORS error when trying to send RFQ/Partnership replies:
```
Access to fetch at 'https://us-central1-hafa-general-trading-plc.cloudfunctions.net/sendRFQReply' 
from origin 'https://hafa-trading-te78.vercel.app' has been blocked by CORS policy
```

## Solution
The Cloud Functions have been updated with proper CORS configuration. You need to deploy them to Firebase.

---

## Deploy Cloud Functions

### Step 1: Navigate to Functions Directory
```bash
cd functions
```

### Step 2: Install Dependencies (if needed)
```bash
npm install
```

### Step 3: Build TypeScript
```bash
npm run build
```

### Step 4: Login to Firebase (if not already logged in)
```bash
npx firebase-tools login
```

### Step 5: Deploy Functions
```bash
npx firebase-tools deploy --only functions
```

Or deploy specific functions:
```bash
npx firebase-tools deploy --only functions:sendRFQReply,functions:sendPartnershipReply
```

### Step 6: Verify Deployment
After deployment completes, you should see:
```
✔ Deploy complete!
```

---

## What Was Fixed

Added CORS configuration to all callable Cloud Functions:

```typescript
export const sendRFQReply = functions.https.onCall({
  cors: ['https://hafa-trading-te78.vercel.app', 'https://hafatrading.com', 'http://localhost:3000']
}, async (data, context) => {
  // ... function code
});
```

### Functions Updated:
1. ✅ `sendRFQReply` - Send email replies to RFQ customers
2. ✅ `sendPartnershipReply` - Send email replies to partnership applicants
3. ✅ `incrementProductViews` - Track product views
4. ✅ `sendWhatsAppNotification` - WhatsApp notifications

### Allowed Origins:
- `https://hafa-trading-te78.vercel.app` (Your Vercel deployment)
- `https://hafatrading.com` (Your custom domain)
- `http://localhost:3000` (Local development)

---

## Quick Deploy Commands

```bash
# From project root
cd functions
npm install
npm run build
npx firebase-tools deploy --only functions

# Return to project root
cd ..
```

---

## Troubleshooting

### "Firebase CLI not found"
```bash
npm install -g firebase-tools
```

### "Not authenticated"
```bash
npx firebase-tools login
```

### "Permission denied"
Make sure your Firebase account has Owner or Editor role in the project.

### "Build errors"
```bash
cd functions
npm install
npm run build
```

### Still getting CORS errors after deployment?
1. Wait 2-3 minutes for functions to fully deploy
2. Clear browser cache
3. Hard refresh (Ctrl+Shift+R)
4. Check Firebase Console → Functions to verify deployment

---

## Verify Functions Are Working

After deployment, test the functions:

1. **Test RFQ Reply:**
   - Go to Admin Panel → RFQs
   - Click on an RFQ
   - Try sending a reply
   - Should work without CORS error

2. **Test Partnership Reply:**
   - Go to Admin Panel → Partnerships
   - Click on a partnership
   - Try sending a reply
   - Should work without CORS error

---

## Status
- ✅ CORS configuration added to Cloud Functions
- ✅ Changes committed to Git
- ✅ Changes pushed to GitHub
- ⏳ **PENDING: Deploy functions to Firebase** ← You need to do this

Once deployed, the CORS errors will be resolved!
