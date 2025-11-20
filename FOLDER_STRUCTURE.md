# Complete Folder Structure - Hafa General Trading PLC

```
hafa-general-trading/
│
├── 📁 app/                                    # Next.js 14 App Directory
│   ├── 📄 layout.tsx                          # Root layout with providers
│   ├── 📄 page.tsx                            # Home page
│   ├── 📄 globals.css                         # Global styles & Tailwind
│   │
│   ├── 📁 about/                              # About Us page
│   │   └── 📄 page.tsx
│   │
│   ├── 📁 contact/                            # Contact page
│   │   └── 📄 page.tsx
│   │
│   ├── 📁 export-products/                    # Export products listing
│   │   └── 📄 page.tsx
│   │
│   ├── 📁 import-products/                    # Import products listing
│   │   └── 📄 page.tsx
│   │
│   ├── 📁 products/                           # Product details
│   │   └── 📁 [id]/
│   │       └── 📄 page.tsx
│   │
│   ├── 📁 services/                           # Services pages
│   │   ├── 📁 export/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 import/
│   │   │   └── 📄 page.tsx
│   │   └── 📁 logistics/
│   │       └── 📄 page.tsx
│   │
│   ├── 📁 track/                              # Shipment tracking
│   │   └── 📄 page.tsx
│   │
│   ├── 📁 rfq/                                # Request for Quotation
│   │   └── 📄 page.tsx
│   │
│   ├── 📁 blog/                               # Blog listing
│   │   ├── 📄 page.tsx
│   │   └── 📁 [slug]/                         # Blog post details
│   │       └── 📄 page.tsx
│   │
│   ├── 📁 auth/                               # Authentication pages
│   │   ├── 📁 login/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 register/
│   │   │   └── 📄 page.tsx
│   │   └── 📁 forgot-password/
│   │       └── 📄 page.tsx
│   │
│   ├── 📁 dashboard/                          # Customer dashboard
│   │   ├── 📄 layout.tsx
│   │   ├── 📄 page.tsx
│   │   ├── 📁 orders/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 rfqs/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 profile/
│   │   │   └── 📄 page.tsx
│   │   └── 📁 settings/
│   │       └── 📄 page.tsx
│   │
│   └── 📁 admin/                              # Admin Panel
│       ├── 📄 layout.tsx                      # Admin layout with sidebar
│       ├── 📄 page.tsx                        # Dashboard
│       ├── 📁 products/                       # Product management
│       │   ├── 📄 page.tsx                    # Products list
│       │   ├── 📁 new/
│       │   │   └── 📄 page.tsx                # Add product
│       │   └── 📁 [id]/
│       │       └── 📄 page.tsx                # Edit product
│       ├── 📁 categories/                     # Category management
│       │   └── 📄 page.tsx
│       ├── 📁 orders/                         # Order management
│       │   ├── 📄 page.tsx
│       │   └── 📁 [id]/
│       │       └── 📄 page.tsx
│       ├── 📁 rfqs/                           # RFQ management
│       │   ├── 📄 page.tsx
│       │   └── 📁 [id]/
│       │       └── 📄 page.tsx
│       ├── 📁 shipments/                      # Shipment management
│       │   └── 📄 page.tsx
│       ├── 📁 customers/                      # Customer management
│       │   └── 📄 page.tsx
│       ├── 📁 suppliers/                      # Supplier management
│       │   └── 📄 page.tsx
│       ├── 📁 blog/                           # Blog management
│       │   ├── 📄 page.tsx
│       │   └── 📁 new/
│       │       └── 📄 page.tsx
│       ├── 📁 analytics/                      # Analytics dashboard
│       │   └── 📄 page.tsx
│       └── 📁 settings/                       # Admin settings
│           └── 📄 page.tsx
│
├── 📁 components/                             # React Components
│   ├── 📁 ui/                                 # shadcn/ui components
│   │   ├── 📄 badge.tsx
│   │   ├── 📄 button.tsx
│   │   ├── 📄 card.tsx
│   │   ├── 📄 input.tsx
│   │   ├── 📄 textarea.tsx
│   │   ├── 📄 select.tsx
│   │   ├── 📄 dialog.tsx
│   │   ├── 📄 dropdown-menu.tsx
│   │   ├── 📄 table.tsx
│   │   ├── 📄 tabs.tsx
│   │   └── 📄 ...
│   │
│   ├── 📁 layout/                             # Layout components
│   │   ├── 📄 navbar.tsx                      # Main navigation
│   │   ├── 📄 footer.tsx                      # Footer
│   │   ├── 📄 sidebar.tsx                     # Admin sidebar
│   │   └── 📄 mobile-menu.tsx
│   │
│   ├── 📁 products/                           # Product components
│   │   ├── 📄 product-card.tsx
│   │   ├── 📄 product-grid.tsx
│   │   ├── 📄 product-filter.tsx
│   │   └── 📄 product-search.tsx
│   │
│   ├── 📁 forms/                              # Form components
│   │   ├── 📄 contact-form.tsx
│   │   ├── 📄 rfq-form.tsx
│   │   └── 📄 product-form.tsx
│   │
│   ├── 📁 dashboard/                          # Dashboard components
│   │   ├── 📄 stats-card.tsx
│   │   ├── 📄 recent-orders.tsx
│   │   └── 📄 analytics-chart.tsx
│   │
│   └── 📄 theme-provider.tsx                  # Theme context provider
│
├── 📁 lib/                                    # Utilities & Configurations
│   ├── 📁 firebase/                           # Firebase setup
│   │   ├── 📄 config.ts                       # Client-side config
│   │   ├── 📄 admin.ts                        # Admin SDK config
│   │   └── 📄 firestore-schema.ts             # TypeScript interfaces
│   │
│   ├── 📁 data/                               # Static data
│   │   ├── 📄 export-products.ts              # 42 export products
│   │   └── 📄 import-products.ts              # 34 import products
│   │
│   ├── 📁 hooks/                              # Custom React hooks
│   │   ├── 📄 use-auth.ts
│   │   ├── 📄 use-products.ts
│   │   └── 📄 use-orders.ts
│   │
│   ├── 📁 store/                              # Zustand stores
│   │   ├── 📄 auth-store.ts
│   │   ├── 📄 cart-store.ts
│   │   └── 📄 ui-store.ts
│   │
│   └── 📄 utils.ts                            # Helper functions
│
├── 📁 functions/                              # Firebase Cloud Functions
│   ├── 📁 src/
│   │   └── 📄 index.ts                        # All cloud functions
│   ├── 📄 package.json
│   ├── 📄 tsconfig.json
│   └── 📄 .gitignore
│
├── 📁 public/                                 # Static Assets
│   ├── 📁 images/
│   │   ├── 📁 products/
│   │   ├── 📁 categories/
│   │   └── 📁 blog/
│   ├── 📁 icons/
│   ├── 📄 favicon.ico
│   └── 📄 logo.svg
│
├── 📁 styles/                                 # Additional styles (if needed)
│   └── 📄 custom.css
│
├── 📁 types/                                  # TypeScript type definitions
│   ├── 📄 index.d.ts
│   └── 📄 firebase.d.ts
│
├── 📁 scripts/                                # Utility scripts
│   ├── 📄 seed-data.js                        # Seed database
│   └── 📄 migrate-products.js                 # Migrate products to Firestore
│
├── 📁 .github/                                # GitHub configuration
│   └── 📁 workflows/
│       └── 📄 deploy.yml                      # CI/CD workflow
│
├── 📄 .env.example                            # Environment variables template
├── 📄 .env.local                              # Local environment variables (gitignored)
├── 📄 .gitignore                              # Git ignore rules
├── 📄 .firebaserc                             # Firebase project config
├── 📄 firebase.json                           # Firebase configuration
├── 📄 firestore.rules                         # Firestore security rules
├── 📄 firestore.indexes.json                  # Firestore indexes
├── 📄 storage.rules                           # Storage security rules
├── 📄 next.config.js                          # Next.js configuration
├── 📄 tailwind.config.js                      # Tailwind CSS configuration
├── 📄 postcss.config.js                       # PostCSS configuration
├── 📄 tsconfig.json                           # TypeScript configuration
├── 📄 package.json                            # Dependencies & scripts
├── 📄 package-lock.json                       # Dependency lock file
├── 📄 README.md                               # Project documentation
├── 📄 DEPLOYMENT.md                           # Deployment guide
├── 📄 API_DOCUMENTATION.md                    # API reference
└── 📄 FOLDER_STRUCTURE.md                     # This file
```

## 📊 File Count Summary

- **Total Pages**: 30+ pages
- **Components**: 40+ reusable components
- **Cloud Functions**: 7 functions
- **Products**: 76 products (42 export + 34 import)
- **Categories**: 8 main categories

## 🎯 Key Directories Explained

### `/app` - Next.js App Router
All pages and routes using Next.js 14 App Router with server and client components.

### `/components` - Reusable Components
UI components built with shadcn/ui and custom components for specific features.

### `/lib` - Business Logic
Firebase configuration, data models, utilities, and custom hooks.

### `/functions` - Backend Logic
Firebase Cloud Functions for email notifications, analytics, and background tasks.

### `/public` - Static Files
Images, icons, and other static assets served directly.

## 🔥 Firebase Structure

```
Firebase Project: hafa-trading
│
├── 🔐 Authentication
│   ├── Email/Password
│   ├── Phone
│   └── Google
│
├── 🗄️ Firestore Database
│   ├── users/
│   ├── categories/
│   ├── products/
│   ├── orders/
│   ├── rfqs/
│   ├── shipments/
│   ├── blog/
│   ├── suppliers/
│   ├── reviews/
│   ├── notifications/
│   └── analytics/
│
├── 📦 Storage
│   ├── products/
│   ├── categories/
│   ├── blog/
│   ├── users/
│   ├── rfqs/
│   ├── certificates/
│   └── orders/
│
├── ⚡ Cloud Functions
│   ├── onOrderCreated
│   ├── onRFQCreated
│   ├── onRFQQuoted
│   ├── onShipmentUpdated
│   ├── incrementProductViews
│   ├── generateDailyAnalytics
│   └── sendWhatsAppNotification
│
└── 🌐 Hosting
    └── Static site deployment
```

## 📝 Notes

- All TypeScript files use strict mode
- Components follow atomic design principles
- Firebase security rules enforce role-based access
- Real-time listeners used for live updates
- Responsive design for all screen sizes
- Dark mode support throughout
- SEO optimized with Next.js metadata
- Accessibility compliant (WCAG 2.1)

---

**Last Updated**: 2024
**Version**: 1.0.0
