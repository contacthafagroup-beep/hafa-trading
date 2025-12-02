# Instructions to Complete Fresh Fruits Page

## Summary
The Fresh Fruits page is 70% complete. To finish it, we need to copy 5 large sections from the Fresh Vegetables page and adapt them for fruits.

## Quick Completion Steps:

### Step 1: Copy Sample Order Section
**From:** `app/products/categories/fresh-vegetables/page.tsx` lines ~1200-1550
**To:** `app/products/categories/fresh-fruits/page.tsx` before line 1172 (before "Enhanced CTA")
**Changes:**
- Replace "vegetables" with "fruits" throughout
- Replace "vegetable types" with "fruit types"
- Update sample items: "e.g., Avocados, Mangoes, Bananas..."

### Step 2: Copy Why Choose Ethiopian Section  
**From:** `app/products/categories/fresh-vegetables/page.tsx` lines ~1650-2050
**To:** After Sample Order section
**Changes:**
- Replace "Why Choose Ethiopian Vegetables?" with "Why Choose Ethiopian Fruits?"
- Keep all climate/soil advantages (same for both)
- Update specific examples to mention fruits where relevant

### Step 3: Copy Pricing Calculator Section
**From:** `app/products/categories/fresh-vegetables/page.tsx` lines ~2100-2350
**To:** After Why Choose section
**Changes:**
- Update dropdown options to fruits: Avocado ($8-12/kg), Mango ($7-10/kg), Banana ($5-8/kg), Pineapple ($6-9/kg), etc.
- Adjust base prices in calculation (fruits typically 20-30% higher than vegetables)
- Update `selectedVegetable` variable usage to `selectedFruit` (or keep as is)

### Step 4: Copy Partnership Opportunities Section
**From:** `app/products/categories/fresh-vegetables/page.tsx` lines ~2350-2850
**To:** After Pricing Calculator
**Changes:**
- Minimal changes needed (partnership terms are product-agnostic)
- Update any specific mentions of "vegetables" to "fruits"

### Step 5: Add FAQ Section
**Create new content** with fruit-specific FAQs:
```typescript
const faqs = [
  {
    q: "What fruits do you export?",
    a: "We export 15+ varieties including Avocados, Mangoes, Bananas, Pineapples, Oranges, Lemons, Watermelons, Melons, Grapes, Strawberries, Pomegranates, and more. All fruits are export-grade and meet international quality standards."
  },
  {
    q: "What are your minimum order quantities?",
    a: "Minimum order is 100kg for sample orders and 500kg for regular orders. For air freight, we recommend minimum 300kg. Volume discounts available for orders above 5 tons."
  },
  {
    q: "How do you ensure fruit freshness during shipping?",
    a: "We use complete cold chain management from harvest to port. Fruits are cooled immediately after picking, stored in temperature-controlled facilities, and shipped in refrigerated containers. We also use foam wrapping for delicate fruits."
  },
  {
    q: "What certifications do you have?",
    a: "We hold ISO certification, Organic certification, Phytosanitary certificates, Export licenses, and provide lab test results for pesticide residue analysis with every shipment."
  },
  {
    q: "What are your payment terms?",
    a: "We accept T/T (Wire Transfer), L/C (Letter of Credit), and for established customers, we offer 30-60 day payment terms. Sample orders require advance payment."
  },
  {
    q: "How long does shipping take?",
    a: "Air freight: 3-5 days to most destinations. Sea freight: 15-30 days depending on destination. We provide tracking information and updates throughout the journey."
  },
  {
    q: "Do you provide samples?",
    a: "Yes! We offer three sample packs: Basic ($49), Premium ($89), and Custom (price varies). Samples include quality certificates and full documentation."
  },
  {
    q: "Can you handle custom packaging?",
    a: "Absolutely! We offer custom cartons, crates, foam wrapping, and can add your branding/labels. Minimum order quantities may apply for custom packaging."
  }
];
```

## Alternative: Use AI Code Generation
Since the sections are very similar between vegetables and fruits, you could:
1. Copy the entire vegetables page
2. Use Find & Replace:
   - "vegetables" → "fruits"
   - "vegetable" → "fruit"
   - "Vegetables" → "Fruits"
   - "Vegetable" → "Fruit"
   - "green" color references → "orange"
   - "Green" → "Orange"
3. Update specific pricing and product names
4. Test all functionality

## Estimated Time: 20-30 minutes

## After Completion:
✅ Fresh Fruits page will be 100% complete
➡️ Move to Grains & Legumes page
➡️ Repeat for remaining 4 categories
