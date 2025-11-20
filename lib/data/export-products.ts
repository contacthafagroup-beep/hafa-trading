export const exportCategories = [
  {
    id: 'agricultural',
    name: 'Agricultural Exports',
    slug: 'agricultural-exports',
    description: 'Fresh agricultural products from Ethiopia',
    subcategories: ['Fresh Vegetables', 'Fruits', 'Pulses & Grains', 'Spices & Seeds']
  },
  {
    id: 'livestock',
    name: 'Livestock Exports',
    slug: 'livestock-exports',
    description: 'Quality livestock for international markets',
    subcategories: ['Cattle', 'Small Ruminants', 'Poultry']
  },
  {
    id: 'herbs',
    name: 'Herbs & Medicinal Plants',
    slug: 'herbs-medicinal-plants',
    description: 'Organic herbs and medicinal plants',
    subcategories: ['Culinary Herbs', 'Medicinal Plants']
  }
];

export const exportProducts = [
  // Fresh Vegetables
  { id: 'exp-001', name: 'Fresh Rosemary', category: 'agricultural', subcategory: 'Fresh Vegetables', price: 12, unit: 'kg', minOrder: 100, hsCode: '1211.90', certifications: ['Organic', 'HACCP'], image: '/products/rosemary.jpg' },
  { id: 'exp-002', name: 'Ginger', category: 'agricultural', subcategory: 'Fresh Vegetables', price: 8, unit: 'kg', minOrder: 500, hsCode: '0910.11', certifications: ['Organic'], image: '/products/ginger.jpg' },
  { id: 'exp-003', name: 'Turmeric', category: 'agricultural', subcategory: 'Fresh Vegetables', price: 10, unit: 'kg', minOrder: 500, hsCode: '0910.30', certifications: ['Organic'], image: '/products/turmeric.jpg' },
  { id: 'exp-004', name: 'Garlic', category: 'agricultural', subcategory: 'Fresh Vegetables', price: 6, unit: 'kg', minOrder: 1000, hsCode: '0703.20', certifications: ['GAP'], image: '/products/garlic.jpg' },
  { id: 'exp-005', name: 'Red Onions', category: 'agricultural', subcategory: 'Fresh Vegetables', price: 4, unit: 'kg', minOrder: 2000, hsCode: '0703.10', certifications: ['GAP'], image: '/products/red-onions.jpg' },
  { id: 'exp-006', name: 'White Onions', category: 'agricultural', subcategory: 'Fresh Vegetables', price: 4, unit: 'kg', minOrder: 2000, hsCode: '0703.10', certifications: ['GAP'], image: '/products/white-onions.jpg' },
  { id: 'exp-007', name: 'Potatoes', category: 'agricultural', subcategory: 'Fresh Vegetables', price: 3, unit: 'kg', minOrder: 5000, hsCode: '0701.90', certifications: ['GAP'], image: '/products/potatoes.jpg' },
  { id: 'exp-008', name: 'Tomatoes', category: 'agricultural', subcategory: 'Fresh Vegetables', price: 5, unit: 'kg', minOrder: 1000, hsCode: '0702.00', certifications: ['GAP'], image: '/products/tomatoes.jpg' },
  { id: 'exp-009', name: 'Green Chili', category: 'agricultural', subcategory: 'Fresh Vegetables', price: 7, unit: 'kg', minOrder: 500, hsCode: '0709.60', certifications: ['Organic'], image: '/products/green-chili.jpg' },
  
  // Fruits
  { id: 'exp-010', name: 'Avocado', category: 'agricultural', subcategory: 'Fruits', price: 15, unit: 'kg', minOrder: 500, hsCode: '0804.40', certifications: ['Organic', 'GlobalGAP'], image: '/products/avocado.jpg' },
  { id: 'exp-011', name: 'Papaya', category: 'agricultural', subcategory: 'Fruits', price: 8, unit: 'kg', minOrder: 1000, hsCode: '0807.20', certifications: ['GAP'], image: '/products/papaya.jpg' },
  { id: 'exp-012', name: 'Mango', category: 'agricultural', subcategory: 'Fruits', price: 12, unit: 'kg', minOrder: 1000, hsCode: '0804.50', certifications: ['GAP'], image: '/products/mango.jpg' },
  { id: 'exp-013', name: 'Banana', category: 'agricultural', subcategory: 'Fruits', price: 6, unit: 'kg', minOrder: 2000, hsCode: '0803.90', certifications: ['GAP'], image: '/products/banana.jpg' },
  
  // Pulses & Grains
  { id: 'exp-014', name: 'Coffee (Arabica)', category: 'agricultural', subcategory: 'Pulses & Grains', price: 25, unit: 'kg', minOrder: 1000, hsCode: '0901.21', certifications: ['Organic', 'Fair Trade'], image: '/products/coffee.jpg' },
  { id: 'exp-015', name: 'Green Mung Beans', category: 'agricultural', subcategory: 'Pulses & Grains', price: 9, unit: 'kg', minOrder: 5000, hsCode: '0713.32', certifications: ['Organic'], image: '/products/mung-beans.jpg' },
  { id: 'exp-016', name: 'Red Kidney Beans', category: 'agricultural', subcategory: 'Pulses & Grains', price: 10, unit: 'kg', minOrder: 5000, hsCode: '0713.33', certifications: ['Organic'], image: '/products/kidney-beans.jpg' },
  { id: 'exp-017', name: 'Soybeans', category: 'agricultural', subcategory: 'Pulses & Grains', price: 8, unit: 'kg', minOrder: 10000, hsCode: '1201.90', certifications: ['Non-GMO'], image: '/products/soybeans.jpg' },
  { id: 'exp-018', name: 'Chickpeas', category: 'agricultural', subcategory: 'Pulses & Grains', price: 11, unit: 'kg', minOrder: 5000, hsCode: '0713.20', certifications: ['Organic'], image: '/products/chickpeas.jpg' },
  { id: 'exp-019', name: 'Lentils', category: 'agricultural', subcategory: 'Pulses & Grains', price: 9, unit: 'kg', minOrder: 5000, hsCode: '0713.40', certifications: ['Organic'], image: '/products/lentils.jpg' },
  { id: 'exp-020', name: 'Teff', category: 'agricultural', subcategory: 'Pulses & Grains', price: 18, unit: 'kg', minOrder: 1000, hsCode: '1008.90', certifications: ['Organic'], image: '/products/teff.jpg' },
  { id: 'exp-021', name: 'Maize (Corn)', category: 'agricultural', subcategory: 'Pulses & Grains', price: 5, unit: 'kg', minOrder: 20000, hsCode: '1005.90', certifications: ['Non-GMO'], image: '/products/maize.jpg' },
  { id: 'exp-022', name: 'Wheat', category: 'agricultural', subcategory: 'Pulses & Grains', price: 6, unit: 'kg', minOrder: 20000, hsCode: '1001.99', certifications: [], image: '/products/wheat.jpg' },
  { id: 'exp-023', name: 'Barley', category: 'agricultural', subcategory: 'Pulses & Grains', price: 5, unit: 'kg', minOrder: 10000, hsCode: '1003.90', certifications: [], image: '/products/barley.jpg' },
  { id: 'exp-024', name: 'Sorghum', category: 'agricultural', subcategory: 'Pulses & Grains', price: 4, unit: 'kg', minOrder: 10000, hsCode: '1007.90', certifications: [], image: '/products/sorghum.jpg' },
  
  // Spices & Seeds
  { id: 'exp-025', name: 'Sesame Seeds', category: 'agricultural', subcategory: 'Spices & Seeds', price: 14, unit: 'kg', minOrder: 5000, hsCode: '1207.40', certifications: ['Organic'], image: '/products/sesame.jpg' },
  { id: 'exp-026', name: 'Niger Seeds', category: 'agricultural', subcategory: 'Spices & Seeds', price: 12, unit: 'kg', minOrder: 5000, hsCode: '1207.70', certifications: [], image: '/products/niger-seeds.jpg' },
  { id: 'exp-027', name: 'Black Cumin', category: 'agricultural', subcategory: 'Spices & Seeds', price: 16, unit: 'kg', minOrder: 1000, hsCode: '0909.62', certifications: ['Organic'], image: '/products/black-cumin.jpg' },
  { id: 'exp-028', name: 'White Cumin', category: 'agricultural', subcategory: 'Spices & Seeds', price: 15, unit: 'kg', minOrder: 1000, hsCode: '0909.61', certifications: ['Organic'], image: '/products/white-cumin.jpg' },
  { id: 'exp-029', name: 'Fennel Seeds', category: 'agricultural', subcategory: 'Spices & Seeds', price: 13, unit: 'kg', minOrder: 1000, hsCode: '0909.62', certifications: [], image: '/products/fennel.jpg' },
  { id: 'exp-030', name: 'Coriander Seeds', category: 'agricultural', subcategory: 'Spices & Seeds', price: 11, unit: 'kg', minOrder: 2000, hsCode: '0909.21', certifications: ['Organic'], image: '/products/coriander.jpg' },
  { id: 'exp-031', name: 'Cardamom', category: 'agricultural', subcategory: 'Spices & Seeds', price: 45, unit: 'kg', minOrder: 100, hsCode: '0908.31', certifications: ['Organic'], image: '/products/cardamom.jpg' },
  { id: 'exp-032', name: 'Cinnamon', category: 'agricultural', subcategory: 'Spices & Seeds', price: 35, unit: 'kg', minOrder: 500, hsCode: '0906.11', certifications: ['Organic'], image: '/products/cinnamon.jpg' },
  { id: 'exp-033', name: 'Fenugreek', category: 'agricultural', subcategory: 'Spices & Seeds', price: 10, unit: 'kg', minOrder: 1000, hsCode: '1209.91', certifications: ['Organic'], image: '/products/fenugreek.jpg' },
  
  // Livestock
  { id: 'exp-034', name: 'Goats', category: 'livestock', subcategory: 'Small Ruminants', price: 150, unit: 'head', minOrder: 100, hsCode: '0104.10', certifications: ['Veterinary Certificate'], image: '/products/goats.jpg' },
  { id: 'exp-035', name: 'Sheep', category: 'livestock', subcategory: 'Small Ruminants', price: 180, unit: 'head', minOrder: 100, hsCode: '0104.20', certifications: ['Veterinary Certificate'], image: '/products/sheep.jpg' },
  { id: 'exp-036', name: 'Oxen / Bulls', category: 'livestock', subcategory: 'Cattle', price: 800, unit: 'head', minOrder: 50, hsCode: '0102.29', certifications: ['Veterinary Certificate'], image: '/products/oxen.jpg' },
  { id: 'exp-037', name: 'Camel', category: 'livestock', subcategory: 'Cattle', price: 1200, unit: 'head', minOrder: 20, hsCode: '0102.39', certifications: ['Veterinary Certificate'], image: '/products/camel.jpg' },
  { id: 'exp-038', name: 'Live Poultry (Chicken)', category: 'livestock', subcategory: 'Poultry', price: 8, unit: 'head', minOrder: 1000, hsCode: '0105.11', certifications: ['Veterinary Certificate'], image: '/products/chicken.jpg' },
  
  // Herbs & Medicinal Plants
  { id: 'exp-039', name: 'Basil', category: 'herbs', subcategory: 'Culinary Herbs', price: 15, unit: 'kg', minOrder: 100, hsCode: '1211.90', certifications: ['Organic'], image: '/products/basil.jpg' },
  { id: 'exp-040', name: 'Thyme', category: 'herbs', subcategory: 'Culinary Herbs', price: 18, unit: 'kg', minOrder: 100, hsCode: '1211.90', certifications: ['Organic'], image: '/products/thyme.jpg' },
  { id: 'exp-041', name: 'Oregano', category: 'herbs', subcategory: 'Culinary Herbs', price: 16, unit: 'kg', minOrder: 100, hsCode: '1211.90', certifications: ['Organic'], image: '/products/oregano.jpg' },
  { id: 'exp-042', name: 'Lemongrass', category: 'herbs', subcategory: 'Medicinal Plants', price: 12, unit: 'kg', minOrder: 200, hsCode: '1211.90', certifications: ['Organic'], image: '/products/lemongrass.jpg' },
];
