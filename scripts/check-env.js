// Script to check if environment variables are loaded
console.log('Checking environment variables...\n');
console.log('All environment variables:', Object.keys(process.env).filter(k => k.startsWith('NEXT_PUBLIC')).join(', '));
console.log('\n');

const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
];

let allPresent = true;

requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✓ ${varName}: ${value.substring(0, 10)}...`);
  } else {
    console.log(`✗ ${varName}: MISSING`);
    allPresent = false;
  }
});

if (!allPresent) {
  console.log('\n⚠️  Some environment variables are missing, but continuing build...');
  console.log('The app will initialize Firebase only when variables are available.\n');
} else {
  console.log('\n✅ All environment variables are present!');
}
