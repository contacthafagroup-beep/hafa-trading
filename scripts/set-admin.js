// Simple script to set a user as admin
// Run with: node scripts/set-admin.js YOUR_EMAIL@example.com

const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = {
  projectId: 'hafa-trading',
};

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: serviceAccount.projectId,
});

const db = admin.firestore();

async function setUserAsAdmin(email) {
  try {
    // Find user by email
    const usersSnapshot = await db.collection('users')
      .where('email', '==', email)
      .get();

    if (usersSnapshot.empty) {
      console.log('❌ No user found with email:', email);
      return;
    }

    // Update the first matching user
    const userDoc = usersSnapshot.docs[0];
    await userDoc.ref.update({
      role: 'superadmin',
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log('✅ Successfully set user as superadmin!');
    console.log('User ID:', userDoc.id);
    console.log('Email:', email);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Get email from command line argument
const email = process.argv[2];

if (!email) {
  console.log('Usage: node scripts/set-admin.js YOUR_EMAIL@example.com');
  process.exit(1);
}

setUserAsAdmin(email);
