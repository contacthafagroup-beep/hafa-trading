# Remaining Sections to Add to Fresh Fruits Page

## Current Status: 70% Complete

The Fresh Fruits page currently has all the major sections working. The remaining 30% consists of 5 large sections that need to be inserted before the "Enhanced CTA" section (around line 1172).

## Sections to Add (in order):

### 1. Sample Order Section (~300 lines)
**Location:** Before Enhanced CTA
**Content:**
- Animated background with fruit emojis
- Section header with animated icons
- "How to Order Samples" (4-step process)
- Sample Pricing (3 packs: Basic $49, Premium $89, Custom)
- What's Included in Sample Packs (2 cards)
- Testimonials (3 customer reviews)
- CTA button to open sample order dialog
- Sample Order Dialog form (already has state variables)

**Adaptations needed:**
- Change "vegetables" to "fruits"
- Update sample pack contents (e.g., "3 fruit types" instead of "3 vegetable types")
- Adjust pricing if needed (fruits may be slightly higher)
- Update testimonials to mention fruits

### 2. Why Choose Ethiopian Fruits Section (~400 lines)
**Location:** After Sample Order, before Enhanced CTA
**Content:**
- Animated background pattern
- Section header with Ethiopian flag emoji
- Unique Advantages (4 cards):
  - Highland Altitude (1,500-3,000m)
  - Year-Round Sunshine (12hrs daily)
  - Natural Irrigation (1,200mm annual rain)
  - Perfect Climate (15-25°C)
- Climate Advantages (3 cards):
  - Two Growing Seasons
  - Natural Cooling
  - Diverse Microclimates
- Superior Soil Quality (2 cards):
  - Volcanic Soil
  - Organic Practices
- Competitive Pricing vs Other Origins (comparison with Europe, Asia, Americas)
- Final CTA card

**Adaptations needed:**
- Keep climate/soil advantages (same for fruits and vegetables)
- Adjust specific examples to fruit-related benefits
- Update competitive pricing percentages if needed

### 3. Pricing Calculator Section (~250 lines)
**Location:** After Why Choose, before Enhanced CTA
**Content:**
- Animated background with money emojis
- Section header
- Calculator Form (left column):
  - Select Fruit dropdown
  - Quantity input
  - Destination dropdown
  - Shipping Method (Sea/Air cards)
  - Calculate button
- Results Display (right column):
  - Estimated price display
  - Breakdown of selections
  - Request Official Quote button
- Important Notes card
- Why Use This Tool card

**Adaptations needed:**
- Update fruit options in dropdown (Avocado, Mango, Banana, Pineapple, etc.)
- Adjust base prices in calculation logic (fruits typically $7-15/kg vs vegetables $3-8/kg)
- Update placeholder text to mention fruits

### 4. Partnership Opportunities Section (~500 lines)
**Location:** After Pricing Calculator, before Enhanced CTA
**Content:**
- Animated background
- Section header
- Become a Distributor (3-step process)
- Long-term Contract Benefits (4 cards)
- Volume Discount Tiers (4 tiers: Bronze 5%, Silver 10%, Gold 15%, Platinum 20%+)
- Exclusive Territory Rights (requirements and available territories)
- Final CTA card
- Partnership Application Dialog (already has state variables)
- Schedule Call Dialog (already has state variables)

**Adaptations needed:**
- Update volume tiers to reflect fruit quantities (may be slightly lower than vegetables)
- Update territory-specific mentions to fruits
- Keep most content the same (partnership terms are similar)

### 5. FAQ Section (~200 lines)
**Location:** After Partnership, before Enhanced CTA
**Content:**
- Section header
- Accordion-style FAQ items (8-10 questions):
  - What fruits do you export?
  - What are your minimum order quantities?
  - How do you ensure fruit freshness?
  - What certifications do you have?
  - What are your payment terms?
  - How long does shipping take?
  - Do you provide samples?
  - Can you handle custom packaging?
  - What are your quality standards?
  - How do I become a distributor?

**Adaptations needed:**
- Write fruit-specific questions and answers
- Mention fruit varieties, ripeness handling, cold chain for fruits
- Update MOQ to reflect fruit quantities

## Implementation Strategy:

### Option A: Add All at Once (Recommended)
1. Copy the entire Sample Order section from vegetables page
2. Adapt all text from "vegetables" to "fruits"
3. Update pricing and quantities
4. Insert before Enhanced CTA
5. Repeat for each section
6. Test all dialogs and forms

### Option B: Add One by One
1. Add Sample Order section first
2. Test and commit
3. Add Why Choose section
4. Test and commit
5. Continue for each section

## Estimated Time:
- Copying and adapting all sections: 30-45 minutes
- Testing: 10-15 minutes
- Total: 40-60 minutes

## After Completion:
- Fresh Fruits page will be 100% complete
- Move to Grains & Legumes page
- Repeat process for remaining 4 product categories
- All 6 product pages should be complete in 3-4 hours total
