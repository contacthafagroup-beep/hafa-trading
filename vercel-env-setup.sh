#!/bin/bash
# Script to add environment variables to Vercel via CLI
# Run this after installing Vercel CLI: npm i -g vercel

echo "Adding environment variables to Vercel..."

vercel env add NEXT_PUBLIC_FIREBASE_API_KEY production preview development
# When prompted, paste: AIzaSyD62-dCUR8TFYF5Bfh60jhYfUhp0Yq4IDo

vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN production preview development
# When prompted, paste: hafa-general-trading-plc.firebaseapp.com

vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID production preview development
# When prompted, paste: hafa-general-trading-plc

vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET production preview development
# When prompted, paste: hafa-general-trading-plc.firebasestorage.app

vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID production preview development
# When prompted, paste: 232834763444

vercel env add NEXT_PUBLIC_FIREBASE_APP_ID production preview development
# When prompted, paste: 1:232834763444:web:4d20c75e3a96e509b565e1

vercel env add NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID production preview development
# When prompted, paste: G-06V93DL2G4

vercel env add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME production preview development
# When prompted, paste: dlozdqyku

vercel env add NEXT_PUBLIC_CLOUDINARY_API_KEY production preview development
# When prompted, paste: 594668792645654

vercel env add CLOUDINARY_API_SECRET production preview development
# When prompted, paste: lOmOx3fGAekPVxjLnK2P-G-DgEg

vercel env add NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET production preview development
# When prompted, paste: hafa_unsigned

echo "Done! Now redeploy your project."
