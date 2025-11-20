// Seed Firestore with initial data
const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Import product data
const { exportProducts } = require('../lib/data/export-products');
const { importProducts } = require('../lib/data/import-products');

async function seedData() {
  console.log('🌱 Starting to seed Firestore...');

  try {
    // Add export products
    console.log('📦 Adding export products...');
    for (const product of exportProducts) {
      await db.collection('products').doc(product.id).set({
        ...product,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        isActive: true,
        isFeatured: false,
        views: 0,
        tags: [],
        images: [product.image || ''],
        specifications: {},
        currency: 'USD',
      });
    }
    console.log(`✅ Added ${exportProducts.length} export products`);

    // Add import products
    console.log('📦 Adding import products...');
    for (const product of importProducts) {
      await db.collection('products').doc(product.id).set({
        ...product,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        isActive: true,
        isFeatured: false,
        views: 0,
        tags: [],
        images: [product.image || ''],
        specifications: product.warranty ? { warranty: product.warranty } : {},
        currency: 'USD',
      });
    }
    console.log(`✅ Added ${importProducts.length} import products`);

    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

seedData();
