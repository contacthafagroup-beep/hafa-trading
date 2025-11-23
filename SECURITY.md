# Security Documentation

## Overview
This document outlines the security measures implemented in the Hafa General Trading PLC application.

## Authentication

### Firebase Authentication
- Email/password authentication
- Admin role verification (admin@hafatrading.com)
- Session management with secure cookies
- Password reset functionality

### Route Protection
- **Public Routes**: Accessible to everyone (/, /products, /about, /contact, /blog)
- **Protected Routes**: Require authentication (/profile, /orders, /shipments, /rfqs)
- **Admin Routes**: Require admin authentication (/admin/*)

## Firebase Security Rules

### Firestore Rules
Located in `firestore.rules`, these rules enforce:
- User data isolation (users can only access their own data)
- Admin-only access to sensitive collections
- Read-only access for public data (products, blog posts)
- Ownership verification for orders, RFQs, and shipments

### Storage Rules
Located in `storage.rules`, these rules enforce:
- File type validation (images, videos, documents)
- File size limits (5MB for profiles, 50MB for videos)
- User-specific upload permissions
- Admin-only access for sensitive documents

## Environment Variables

### Required Variables
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
NEXT_PUBLIC_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
```

### Optional Variables
```
FIREBASE_ADMIN_PROJECT_ID
FIREBASE_ADMIN_CLIENT_EMAIL
FIREBASE_ADMIN_PRIVATE_KEY
WHATSAPP_API_KEY
WHATSAPP_PHONE_NUMBER
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASSWORD
```

## Deployment Checklist

### Before Deploying to Production

1. **Environment Variables**
   - [ ] All required environment variables are set
   - [ ] API keys are not exposed in client-side code
   - [ ] Production Firebase project is configured

2. **Firebase Security Rules**
   - [ ] Deploy firestore.rules to Firebase
   - [ ] Deploy storage.rules to Firebase
   - [ ] Test rules with Firebase Emulator

3. **Authentication**
   - [ ] Admin account is created (admin@hafatrading.com)
   - [ ] Password is strong and secure
   - [ ] Email verification is enabled

4. **API Security**
   - [ ] Rate limiting is configured
   - [ ] CORS is properly configured
   - [ ] API keys have proper restrictions

5. **SSL/TLS**
   - [ ] HTTPS is enforced
   - [ ] SSL certificate is valid
   - [ ] Secure cookies are enabled

## Deploying Firebase Rules

### Deploy Firestore Rules
```bash
firebase deploy --only firestore:rules
```

### Deploy Storage Rules
```bash
firebase deploy --only storage:rules
```

### Deploy All Rules
```bash
firebase deploy --only firestore:rules,storage:rules
```

## Testing Security

### Test Firestore Rules
```bash
firebase emulators:start --only firestore
```

### Test Storage Rules
```bash
firebase emulators:start --only storage
```

### Test Authentication
1. Create test user accounts
2. Verify route protection
3. Test admin access
4. Verify data isolation

## Security Best Practices

1. **Never commit sensitive data**
   - Use .env.local for secrets
   - Add .env.local to .gitignore
   - Use environment variables for all API keys

2. **Validate all inputs**
   - Client-side validation
   - Server-side validation
   - Firebase security rules validation

3. **Use HTTPS everywhere**
   - Enforce HTTPS in production
   - Use secure cookies
   - Enable HSTS headers

4. **Regular security audits**
   - Review Firebase security rules
   - Check for dependency vulnerabilities
   - Monitor authentication logs

5. **Principle of least privilege**
   - Grant minimum necessary permissions
   - Separate admin and user roles
   - Regularly review access controls

## Incident Response

If a security incident occurs:
1. Immediately revoke compromised credentials
2. Review Firebase authentication logs
3. Check Firestore audit logs
4. Update affected users
5. Patch vulnerabilities
6. Document the incident

## Contact

For security concerns, contact:
- Email: security@hafatrading.com
- Emergency: admin@hafatrading.com

## Updates

This security documentation should be reviewed and updated:
- After major feature additions
- After security incidents
- Quarterly security reviews
- Before production deployments
