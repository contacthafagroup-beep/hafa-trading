# Hafa General Trading PLC - Enterprise Web Application

**Trading Beyond Borders** 🌍

A full-stack, enterprise-level web application for Hafa General Trading PLC - an import & export company specializing in agricultural products, livestock, electronics, and industrial machinery.

## 🚀 Technology Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Forms**: React Hook Form
- **Theme**: next-themes (Dark/Light mode)

### Backend
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth (Email, Phone, Google)
- **Storage**: Firebase Storage
- **Functions**: Firebase Cloud Functions
- **Hosting**: Firebase Hosting
- **Messaging**: Firebase Cloud Messaging

### Admin Panel
- React + TypeScript
- Firebase Admin SDK
- Role-based Access Control (RBAC)
- Real-time data synchronization

## 📦 Features

### Public Website (20+ Pages)
- ✅ Home Page with hero section
- ✅ About Us (Vision, Mission, Certifications)
- ✅ Export Products (30+ agricultural products, livestock, herbs)
- ✅ Import Products (25+ electronics, machinery, vehicles)
- ✅ Product Categories & Details
- ✅ Services Pages (Export, Import, Logistics)
- ✅ Live Shipment Tracking
- ✅ RFQ (Request for Quotation) System
- ✅ Contact Page with form
- ✅ Blog System
- ✅ Customer Login/Register
- ✅ Customer Dashboard
- ✅ Multi-language Support (English + Amharic ready)
- ✅ Dark Mode
- ✅ Responsive Design

### Admin Panel Features
- ✅ Dashboard with Analytics
- ✅ Product Management (CRUD)
- ✅ Category Management
- ✅ Order Management
- ✅ RFQ Management
- ✅ Shipment Tracking Manager
- ✅ Customer Management
- ✅ Supplier Management
- ✅ Blog Manager
- ✅ Notification System
- ✅ Real-time Updates
- ✅ Role-based Access Control
- ✅ PDF Invoice Generator (ready)

### Advanced Features
- 🔥 Real-time Database Listeners
- 🔐 Firebase Security Rules
- 📧 Auto Email Notifications
- 📱 WhatsApp Integration (ready)
- 🔍 AI Search (ready for implementation)
- 💬 AI Chatbot (ready for implementation)
- 📊 Analytics Dashboard
- 🌐 SEO Optimized
- 🎨 Framer Motion Animations

## 📁 Project Structure

```
hafa-general-trading/
├── app/                          # Next.js app directory
│   ├── page.tsx                  # Home page
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── about/                    # About page
│   ├── contact/                  # Contact page
│   ├── export-products/          # Export products listing
│   ├── import-products/          # Import products listing
│   ├── track/                    # Shipment tracking
│   ├── rfq/                      # Request for quotation
│   ├── admin/                    # Admin panel
│   │   ├── layout.tsx            # Admin layout with sidebar
│   │   ├── page.tsx              # Admin dashboard
│   │   ├── products/             # Product management
│   │   ├── orders/               # Order management
│   │   ├── rfqs/                 # RFQ management
│   │   └── ...                   # Other admin pages
│   └── auth/                     # Authentication pages
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── layout/                   # Layout components
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   └── theme-provider.tsx
├── lib/                          # Utilities and configurations
│   ├── firebase/
│   │   ├── config.ts             # Firebase client config
│   │   ├── admin.ts              # Firebase Admin SDK
│   │   └── firestore-schema.ts  # TypeScript interfaces
│   ├── data/                     # Static data
│   │   ├── export-products.ts   # 42 export products
│   │   └── import-products.ts   # 34 import products
│   └── utils.ts                  # Helper functions
├── functions/                    # Firebase Cloud Functions
│   ├── src/
│   │   └── index.ts              # Cloud Functions
│   ├── package.json
│   └── tsconfig.json
├── public/                       # Static assets
├── firestore.rules               # Firestore security rules
├── firestore.indexes.json        # Firestore indexes
├── storage.rules                 # Storage security rules
├── firebase.json                 # Firebase configuration
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ installed
- Firebase account
- Git

### Step 1: Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd hafa-general-trading

# Install dependencies
npm install

# Install Firebase CLI globally
npm install -g firebase-tools
```

### Step 2: Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project named "hafa-trading"
   - Enable Google Analytics (optional)

2. **Enable Firebase Services**
   - **Authentication**: Enable Email/Password, Phone, and Google providers
   - **Firestore Database**: Create database in production mode
   - **Storage**: Enable Firebase Storage
   - **Hosting**: Enable Firebase Hosting
   - **Functions**: Upgrade to Blaze plan (pay-as-you-go)

3. **Get Firebase Configuration**
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Click "Web" icon to add web app
   - Copy the configuration object

4. **Configure Environment Variables**

```bash
# Copy example env file
cp .env.example .env.local

# Edit .env.local with your Firebase credentials
```

Add your Firebase configuration to `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Firebase Admin SDK
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=your_service_account_email
FIREBASE_ADMIN_PRIVATE_KEY="your_private_key"

# Email Configuration (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

### Step 3: Deploy Firebase Rules and Functions

```bash
# Login to Firebase
firebase login

# Initialize Firebase (if not already done)
firebase init

# Deploy Firestore rules and indexes
firebase deploy --only firestore

# Deploy Storage rules
firebase deploy --only storage

# Install Functions dependencies
cd functions
npm install
cd ..

# Deploy Cloud Functions
firebase deploy --only functions
```

### Step 4: Run Development Server

```bash
# Start Next.js development server
npm run dev

# Open browser at http://localhost:3000
```

### Step 5: Build for Production

```bash
# Build Next.js app
npm run build

# Export static files for Firebase Hosting
npm run export

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

## 🔐 Security

### Firestore Security Rules
- Role-based access control (Customer, Supplier, Staff, Admin, SuperAdmin)
- Users can only read/write their own data
- Staff and Admin have elevated permissions
- Public read access for products and categories

### Storage Security Rules
- Public read for product images
- Authenticated write with file type and size validation
- Role-based write permissions for admin content

## 📧 Email Notifications

Automated emails are sent for:
- Order confirmations
- RFQ submissions
- Quotation ready notifications
- Shipment status updates

Configure SMTP settings in `.env.local` to enable email notifications.

## 🎨 Customization

### Branding
- Company: **Hafa General Trading PLC**
- Motto: **"Trading Beyond Borders"**
- Primary Color: Blue (#2563eb)
- Secondary Color: Green (#16a34a)

### Adding Products
Products are currently stored in static files:
- `lib/data/export-products.ts` - 42 export products
- `lib/data/import-products.ts` - 34 import products

To use Firestore instead, create a data migration script or use the admin panel.

### Multi-language Support
The app is ready for Amharic translation:
- Add translations to product/category schemas
- Implement language switcher in navbar
- Use `nameAm`, `descriptionAm` fields

## 📱 Admin Panel Access

Default admin route: `/admin`

**Note**: Implement authentication guard to protect admin routes in production.

## 🚀 Deployment

### Firebase Hosting

```bash
# Build and deploy
npm run build
firebase deploy
```

### Vercel (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📊 Database Schema

See `lib/firebase/firestore-schema.ts` for complete TypeScript interfaces:
- Users
- Categories
- Products
- Orders
- RFQs
- Shipments
- Blog Posts
- Suppliers
- Reviews
- Notifications
- Analytics

## 🤝 Support

For issues or questions:
- Email: info@hafatrading.com
- Phone: +251 11 XXX XXXX

## 📄 License

Copyright © 2024 Hafa General Trading PLC. All rights reserved.

---

**Built with ❤️ for Hafa General Trading PLC**

*Last updated: November 24, 2024*
