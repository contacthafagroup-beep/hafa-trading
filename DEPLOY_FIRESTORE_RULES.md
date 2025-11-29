# Deploy Firestore Rules

The admin live-chat page requires updated Firestore rules to work properly.

## Steps to Deploy:

1. Make sure you have Firebase CLI installed:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase (if not already logged in):
   ```bash
   firebase login
   ```

3. Deploy the Firestore rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

## What Changed:

- Fixed collection name from `chat_messages` to `chatMessages`
- Added `allow list: if isAdmin()` permission for admins to query all messages
- Removed the `userId` check requirement for creating messages

## Verify Deployment:

After deploying, check the browser console in the admin panel. You should see:
- ✅ Snapshot received, total documents: X
- 📨 Message document: [message data]
- 👥 Chat users extracted: X

If you see:
- ❌ Error loading chat users
- 🚫 PERMISSION DENIED

Then the rules haven't been deployed yet or there's an authentication issue.

## Alternative: Update Rules in Firebase Console

If you can't use the CLI, you can manually update the rules in the Firebase Console:

1. Go to https://console.firebase.google.com
2. Select your project
3. Go to Firestore Database > Rules
4. Copy the contents of `firestore.rules` file
5. Paste and publish
