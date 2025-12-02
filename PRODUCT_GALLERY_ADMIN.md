# Product Gallery Admin System

## Overview
Comprehensive admin panel for managing three key sections on the Fresh Vegetables page:
1. **Product Gallery** - Photos of products in different stages
2. **Before & After** - Transformation process from farm to export
3. **Facilities** - Photos of farms, processing centers, and cold chain

All images are uploaded to **Cloudinary** for optimized delivery.

## Features

### Admin Panel (`/admin/product-gallery`)
Three tabbed sections for managing different content types:

#### 1. Product Gallery Tab
- Upload photos for three categories:
  - Fresh Harvest (farm photos)
  - Processing (washing, grading, quality control)
  - Export Ready (packaging, storage, loading)
- Full CRUD operations
- Display order control
- Emoji fallbacks

#### 2. Before & After Tab
- Upload before and after photos showing transformation
- Separate images for "before" and "after" states
- Customizable features lists (4 items each)
- Color gradient customization
- Product-specific comparisons

#### 3. Facilities Tab
- Upload facility photos (farms, processing centers, cold chain)
- Feature lists for each facility
- Custom descriptions and emojis
- Display order control

### Frontend Display
- **Dynamic Loading**: All content loads from Firestore in real-time
- **Responsive Design**: Adapts to all screen sizes
- **Image Optimization**: Cloudinary handles image delivery
- **Fallback Support**: Shows emojis when images aren't uploaded
- **Loading States**: Smooth loading indicators

## Database Structure

### Firestore Collection: `productGallery`

#### Product Gallery Items
```javascript
{
  section: 'gallery',
  category: 'Fresh Harvest' | 'Processing' | 'Export Ready',
  name: string,
  description: string,
  imageUrl: string,          // Cloudinary URL
  emoji: string,
  order: number,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### Before & After Items
```javascript
{
  section: 'beforeAfter',
  productName: string,       // e.g., "Tomatoes"
  emoji: string,
  beforeTitle: string,
  beforeDesc: string,
  beforeIcon: string,
  beforeFeatures: string[],  // Array of 4 features
  beforeImageUrl: string,    // Optional Cloudinary URL
  afterTitle: string,
  afterDesc: string,
  afterIcon: string,
  afterFeatures: string[],   // Array of 4 features
  afterImageUrl: string,     // Optional Cloudinary URL
  color: string,             // Tailwind gradient class
  order: number,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### Facility Items
```javascript
{
  section: 'facilities',
  name: string,              // e.g., "Partner Farms"
  description: string,
  emoji: string,
  facilityFeatures: string[], // Array of features
  imageUrl: string,          // Cloudinary URL
  order: number,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Cloudinary Storage
- Images uploaded to Cloudinary cloud
- Folder: `chat-media` (shared with chat uploads)
- Automatic optimization and CDN delivery
- Progress tracking during upload

## Security Rules
- **Read**: Public (anyone can view gallery)
- **Write**: Admin only (create, update, delete)

## Usage

### Product Gallery Tab
1. Navigate to `/admin/product-gallery`
2. Select "Product Gallery" tab
3. Click "Add Gallery Item"
4. Fill in the form:
   - Select category (Fresh Harvest, Processing, or Export Ready)
   - Enter name and description
   - Choose emoji
   - Set display order
   - Upload image file
5. Click "Add" to save

### Before & After Tab
1. Select "Before & After" tab
2. Click "Add Before & After"
3. Fill in the form:
   - Enter product name and emoji
   - Set color gradient (Tailwind classes)
   - **Before Section:**
     - Title, icon, description
     - 4 features
     - Optional before image
   - **After Section:**
     - Title, icon, description
     - 4 features
     - Optional after image
   - Set display order
4. Click "Add" to save

### Facilities Tab
1. Select "Facilities" tab
2. Click "Add Facility"
3. Fill in the form:
   - Enter facility name and emoji
   - Enter description
   - Add 4 features
   - Set display order
   - Upload facility image
4. Click "Add" to save

### Editing & Deleting
- Click "Edit" on any item to modify
- Click "Delete" to remove (with confirmation)
- Images remain in Cloudinary after deletion

## Image Recommendations
- **Resolution**: 1200x800px or larger
- **Format**: JPG, PNG, or WebP
- **Aspect Ratio**: 16:9 (landscape) for best results
- **File Size**: Under 5MB (Cloudinary handles optimization)
- **Content**: Clear, well-lit, professional photos

## Navigation
- Added to admin sidebar as "Product Gallery" with Image icon
- Located between "Products" and "Orders" in the menu
- Three tabs for easy section management

## Files Created/Modified
1. `app/admin/product-gallery/page.tsx` - Main admin page with tabs
2. `components/admin/gallery-section.tsx` - Product gallery management
3. `components/admin/before-after-section.tsx` - Before & after management
4. `components/admin/facilities-section.tsx` - Facilities management
5. `app/products/categories/fresh-vegetables/page.tsx` - Updated to load from Firestore
6. `components/admin/admin-nav.tsx` - Added navigation link
7. `firestore.rules` - Security rules for productGallery collection
8. `lib/cloudinary-upload.ts` - Cloudinary upload utility (existing)

## Technical Details
- **Upload Progress**: Real-time progress bars during image upload
- **Error Handling**: Toast notifications for success/error states
- **Loading States**: Skeleton loaders while fetching data
- **Responsive**: Works on all device sizes
- **Type Safe**: Full TypeScript support

## Future Enhancements
- Bulk upload capability
- Image cropping/editing tools
- Drag-and-drop reordering
- Video support for facilities tour
- Multiple images per item (carousel)
- Image compression before upload
