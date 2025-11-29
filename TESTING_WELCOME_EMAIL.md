# Testing Welcome Email Feature

## Quick Test Guide

### 1. Deploy the Function
Run the deployment script:

**Windows:**
```bash
deploy-welcome-email.bat
```

**Mac/Linux:**
```bash
chmod +x deploy-welcome-email.sh
./deploy-welcome-email.sh
```

**Or manually:**
```bash
cd functions
npm install
npm run build
cd ..
firebase deploy --only functions:onUserCreated
```

### 2. Configure SMTP (One-time setup)
If you haven't configured SMTP yet:

```bash
firebase functions:config:set smtp.host="smtp.gmail.com"
firebase functions:config:set smtp.port="587"
firebase functions:config:set smtp.user="your_email@gmail.com"
firebase functions:config:set smtp.password="your_app_password"
```

**For Gmail App Password:**
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and your device
3. Copy the generated 16-character password
4. Use this as your `smtp.password`

### 3. Test the Welcome Email

#### Option A: Create a New Account via UI
1. Go to your website: `http://localhost:3000/auth/register`
2. Fill in the registration form:
   - Full Name: Test User
   - Email: your_test_email@gmail.com
   - Password: test123456
   - Confirm Password: test123456
3. Click "Create Account"
4. Check your email inbox for the welcome message

#### Option B: Create Account via Firebase Console
1. Go to Firebase Console > Authentication
2. Click "Add User"
3. Enter email and password
4. The welcome email should be sent automatically

#### Option C: Test with Google Sign-In
1. Go to `http://localhost:3000/auth/register`
2. Click "Sign up with Google"
3. Complete Google authentication
4. Check email for welcome message

### 4. Verify Email Was Sent

#### Check Firebase Logs
```bash
firebase functions:log --only onUserCreated
```

Look for:
- "Welcome email sent to [email]"
- Any error messages

#### Check Email Inbox
- Check main inbox
- Check spam/junk folder
- Check promotions tab (Gmail)

#### Check Firestore
1. Go to Firebase Console > Firestore
2. Open the `notifications` collection
3. Look for a new notification with:
   - `type: "welcome"`
   - `title: "Welcome to Hafa Trading!"`

### 5. What to Expect

#### Email Content
- Subject: "Welcome to Hafa Trading PLC! 🎉"
- From: Your configured SMTP email
- Beautiful HTML template with:
  - Purple gradient header
  - Personalized greeting
  - List of features
  - "Explore Products" button
  - Contact information
  - Professional footer

#### In-App Notification
- Appears in user's dashboard
- Title: "Welcome to Hafa Trading!"
- Links to `/products` page

### 6. Troubleshooting

#### Email Not Received
1. **Check spam folder** - First place to look
2. **Check Firebase logs** - Look for errors
   ```bash
   firebase functions:log --only onUserCreated
   ```
3. **Verify SMTP config** - Check credentials
   ```bash
   firebase functions:config:get
   ```
4. **Check function deployed** - Verify it's live
   ```bash
   firebase functions:list
   ```

#### Common Errors

**"Invalid login" or "Authentication failed"**
- Gmail: Use App Password, not regular password
- Enable 2FA on Google account first
- Generate new App Password

**"Connection timeout"**
- Check firewall settings
- Verify SMTP port (587 or 465)
- Try different SMTP provider

**"Function not found"**
- Redeploy: `firebase deploy --only functions`
- Check Firebase Console > Functions

**Email in spam**
- Normal for new sending addresses
- Ask recipients to mark as "Not Spam"
- Consider using dedicated email service (SendGrid, etc.)

### 7. Test Different Scenarios

#### Test Case 1: Email/Password Registration
- ✅ User receives welcome email
- ✅ Email contains correct name
- ✅ Notification created in Firestore

#### Test Case 2: Google Sign-In
- ✅ User receives welcome email
- ✅ Email uses Google display name
- ✅ Notification created

#### Test Case 3: Multiple Signups
- ✅ Each user gets individual email
- ✅ No duplicate emails sent
- ✅ All notifications created

#### Test Case 4: User Without Display Name
- ✅ Email uses "Valued Customer" as fallback
- ✅ Email still sends successfully

### 8. Production Checklist

Before going live:
- [ ] Test with real email addresses
- [ ] Verify emails not going to spam
- [ ] Update company contact information in template
- [ ] Add company logo to email
- [ ] Test on mobile email clients
- [ ] Set up email monitoring/alerts
- [ ] Configure proper "from" address
- [ ] Add unsubscribe link (if required)
- [ ] Test with different email providers (Gmail, Outlook, Yahoo)

### 9. Monitoring

#### View Recent Logs
```bash
firebase functions:log --only onUserCreated --limit 50
```

#### Monitor Function Performance
1. Go to Firebase Console > Functions
2. Click on `onUserCreated`
3. View metrics:
   - Invocations
   - Execution time
   - Errors

#### Set Up Alerts
1. Firebase Console > Functions
2. Click on function
3. Set up alerts for:
   - High error rate
   - Slow execution
   - Failed invocations

### 10. Next Steps

After successful testing:
- Customize email template with your branding
- Add company logo
- Update contact information
- Consider A/B testing different email content
- Set up email analytics
- Add more automated emails (order confirmation, etc.)

## Support

If you encounter issues:
1. Check Firebase Functions logs
2. Review SMTP configuration
3. Test with a different email provider
4. Check Firebase Console for errors
5. Refer to WELCOME_EMAIL_SETUP.md for detailed setup

## Quick Commands Reference

```bash
# Deploy function
firebase deploy --only functions:onUserCreated

# View logs
firebase functions:log --only onUserCreated

# Check config
firebase functions:config:get

# Set config
firebase functions:config:set smtp.host="smtp.gmail.com"

# List all functions
firebase functions:list

# Delete function (if needed)
firebase functions:delete onUserCreated
```
