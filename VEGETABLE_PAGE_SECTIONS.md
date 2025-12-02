# Fresh Vegetables Page - All Sections Added

## Complete List of Sections (in order):

1. **Hero Section with Floating Icons** - Animated vegetable emojis floating in background
2. **Stats Section** - 4 key statistics with animated icons
3. **Features Section** - 6 feature cards (Cold Chain, Custom Packaging, etc.)
4. **Product Icons Grid** - Interactive product cards with hover effects and detail modals
5. **Before & After Gallery** - Transformation process with animated backgrounds
6. **Quality Control Process** - 4-step process with animated icons
7. **Facility Tour** - 3 facility cards with animated backgrounds
8. **Real Product Photos Gallery** - Dynamic gallery loaded from Firestore with 3 categories
9. **Sample Order Section** - Complete sample ordering system with:
   - How to Order (4 steps)
   - Sample Pricing (3 tiers)
   - Sample Pack Contents
   - Testimonials
   - CTA with dialog form
10. **Why Choose Ethiopian Vegetables** - Comprehensive section with:
    - Unique Selling Propositions (4 cards)
    - Climate Advantages (3 cards)
    - Soil Quality (2 cards)
    - Competitive Pricing (comparison with other origins)
    - Final CTA
11. **Pricing Calculator/Estimator** - Interactive calculator with:
    - Product selection
    - Quantity input
    - Destination selector
    - Shipping method
    - Real-time price calculation
    - Results display
12. **Partnership Opportunities** - Complete partnership system with:
    - Become a Distributor (3 steps)
    - Long-term Contract Benefits (4 benefits)
    - Volume Discount Tiers (4 tiers: Bronze, Silver, Gold, Platinum)
    - Exclusive Territory Rights
    - Partnership application dialog
    - Schedule call dialog
13. **Admin Video Section** (existing)
14. **Certifications** (existing)
15. **Export Markets** (existing)
16. **Origin Regions** (existing)
17. **Downloadables** (existing)
18. **FAQ** (existing)
19. **Contact CTA** (existing)

## Key Features Added:
- Animated floating icons in multiple sections
- Framer Motion animations throughout
- Interactive dialogs for forms
- Dynamic content loading from Firestore
- Cloudinary image integration
- Responsive design
- Dark mode support
- Professional color schemes
- Hover effects and transitions

## State Variables Added:
- galleryItems, beforeAfterItems, facilityItems (Firestore data)
- loadingGallery
- isSampleOrderOpen, selectedSamplePack
- selectedVegetable, quantity, destination, shippingMethod, estimatedPrice
- isPartnershipFormOpen, isScheduleCallOpen

## New Imports Added:
- Input, Label, Textarea, Select components
- Additional Lucide icons
- Firestore functions (collection, getDocs, query, orderBy)
