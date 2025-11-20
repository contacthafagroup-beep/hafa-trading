// Script to seed initial categories into Firebase
// This should be run once to populate the database

import { createCategory } from '@/lib/firebase/categories';

const initialCategories = [
  {
    name: 'Agricultural Products',
    slug: 'agricultural',
    description: 'Premium Ethiopian agricultural products including grains, pulses, and oilseeds'
  },
  {
    name: 'Livestock Products',
    slug: 'livestock',
    description: 'Quality livestock and animal products from Ethiopia'
  },
  {
    name: 'Herbs & Spices',
    slug: 'herbs',
    description: 'Traditional Ethiopian herbs, spices, and medicinal plants'
  },
  {
    name: 'Coffee & Tea',
    slug: 'coffee-tea',
    description: 'World-renowned Ethiopian coffee and tea products'
  },
  {
    name: 'Honey & Beeswax',
    slug: 'honey',
    description: 'Pure Ethiopian honey and beeswax products'
  }
];

export async function seedCategories() {
  console.log('Seeding categories...');
  
  for (const category of initialCategories) {
    try {
      const id = await createCategory(category);
      console.log(`✓ Created category: ${category.name} (${id})`);
    } catch (error) {
      console.error(`✗ Failed to create ${category.name}:`, error);
    }
  }
  
  console.log('Done seeding categories!');
}

// Uncomment to run:
// seedCategories();
