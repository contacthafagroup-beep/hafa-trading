// Quick test to check Firestore data
// Run this in browser console on your site

const testFirestore = async () => {
  try {
    const { db } = await import('./lib/firebase/config');
    const { doc, getDoc } = await import('firebase/firestore');
    
    const docRef = doc(db, 'siteContent', 'whyChoose');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log('✅ Data found in Firestore:');
      console.log(JSON.stringify(docSnap.data(), null, 2));
    } else {
      console.log('❌ No data found in Firestore');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

testFirestore();
