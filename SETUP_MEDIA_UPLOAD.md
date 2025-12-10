# Setup Media Upload for Live Chat

## Current Issue
The live chat media upload is failing because Cloudinary environment variables are not configured.

---

## Option 1: Use Cloudinary (Current Implementation)

### Step 1: Create Cloudinary Account
1. Go to https://cloudinary.com/users/register/free
2. Sign up for a free account (25GB storage, 25GB bandwidth/month)
3. Verify your email

### Step 2: Get Cloudinary Credentials
1. Go to Dashboard: https://cloudinary.com/console
2. Copy these values:
   - **Cloud Name**: (e.g., `dxxxxx`)
   - **API Key**: (e.g., `123456789012345`)
   - **API Secret**: (keep this secret!)

### Step 3: Create Upload Preset
1. Go to Settings → Upload
2. Scroll to "Upload presets"
3. Click "Add upload preset"
4. Set:
   - **Preset name**: `chat_media`
   - **Signing Mode**: `Unsigned`
   - **Folder**: `chat-media`
   - **Access mode**: `Public`
5. Save

### Step 4: Add Environment Variables

Add to `.env.local`:
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=chat_media
```

Add to Vercel:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` = `your_cloud_name`
   - `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` = `chat_media`
3. Redeploy

---

## Option 2: Use Firebase Storage (Recommended - Already Configured)

Firebase Storage is already set up in your project. Let me create an alternative upload function.

### Advantages:
- ✅ Already configured
- ✅ No additional service needed
- ✅ Integrated with Firebase
- ✅ Secure with Firebase rules

---

## Quick Fix: Switch to Firebase Storage

I'll create a new upload function that uses Firebase Storage instead of Cloudinary.

---

## Comparison

| Feature | Cloudinary | Firebase Storage |
|---------|-----------|------------------|
| Free Tier | 25GB storage | 5GB storage |
| Bandwidth | 25GB/month | 1GB/day |
| Image Optimization | ✅ Automatic | ❌ Manual |
| Video Support | ✅ Excellent | ✅ Good |
| Setup Complexity | Medium | Easy (already done) |
| Cost | Free → $89/month | Free → Pay as you go |

---

## Recommendation

**Use Firebase Storage** since it's already configured and integrated with your project. I'll update the code to use Firebase Storage instead of Cloudinary.

