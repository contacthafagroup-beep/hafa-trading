# Guide to Apply Enhancements to Other Product Pages

## Status:
- ✅ Fresh Vegetables - COMPLETE
- ✅ Fresh Fruits - COMPLETE (All sections added: Stats, Features, Enhanced Product Grid with detailed modal, Before/After, Quality Control, Facilities, Product Gallery, Sample Order, FAQ)
- ⏳ Grains & Legumes - PENDING
- ⏳ Herbs & Spices - PENDING
- ⏳ Livestock & Meat - PENDING
- ⏳ Specialty Products - PENDING

## What Needs to Be Added to Each Page:

### 1. Update Imports (at top of file)
Add these imports:
```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect } from 'react'; // Add to existing useState import
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
```

Add icons: `X, Info, Loader2` to lucide-react imports

### 2. Add GalleryItem Interface (before component)

### 3. Add State Variables (in component)
- Gallery states
- Sample order states
- Pricing calculator states
- Partnership states

### 4. Add loadAllItems() function

### 5. Enhance Hero Section
- Add floating animated product emojis in background

### 6. Add Stats Section (if not exists)

### 7. Add/Enhance Features Section

### 8. Enhance Product Grid
- Add product detail modal
- Add hover effects
- Add info badges

### 9. Add Before & After Gallery Section
- With animated backgrounds
- Dynamic loading from Firestore

### 10. Add Quality Control Section

### 11. Add/Enhance Facilities Section
- Dynamic loading from Firestore
- Animated backgrounds

### 12. Add Product Gallery Section
- 3 categories
- Dynamic loading

### 13. Add Sample Order Section
- Complete with dialog

### 14. Add Why Choose Ethiopian [Product] Section
- Adapt text for each product type

### 15. Add Pricing Calculator Section

### 16. Add Partnership Opportunities Section
- With dialogs

### 17. Keep Existing Sections
- Videos
- Certifications
- Origin regions
- Downloadables
- FAQ
- Contact CTA

## Product-Specific Adaptations Needed:

### Fresh Fruits:
- Change "vegetables" to "fruits"
- Use fruit emojis in backgrounds
- Adapt pricing (fruits typically higher)
- Keep fruit-specific origin regions

### Grains & Legumes:
- Change to "grains"
- Use grain emojis
- Adapt climate advantages (different growing conditions)
- Different origin regions

### Herbs & Spices:
- Change to "herbs & spices"
- Use herb/spice emojis
- Emphasize aroma and potency
- Different processing methods

### Livestock & Meat:
- Change to "meat products"
- Different quality control (halal, health certificates)
- Cold chain emphasis
- Different certifications

### Specialty Products:
- Change to "specialty products"
- Mixed product types
- Unique selling points

## Next Steps:
1. Complete Fresh Fruits page
2. Test thoroughly
3. Move to next product category
4. Repeat for all 5 remaining pages
