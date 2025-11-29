#!/bin/bash

# Deploy Welcome Email Function
# This script deploys the Firebase Functions including the new welcome email feature

echo "🚀 Deploying Welcome Email Function..."
echo ""

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null
then
    echo "❌ Firebase CLI is not installed."
    echo "Install it with: npm install -g firebase-tools"
    exit 1
fi

# Navigate to functions directory
cd functions

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build TypeScript
echo "🔨 Building TypeScript..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors above."
    exit 1
fi

# Go back to root
cd ..

# Set SMTP configuration (if not already set)
echo ""
echo "⚙️  Configuring SMTP settings..."
echo "Please enter your SMTP configuration:"
echo ""

read -p "SMTP Host (default: smtp.gmail.com): " smtp_host
smtp_host=${smtp_host:-smtp.gmail.com}

read -p "SMTP Port (default: 587): " smtp_port
smtp_port=${smtp_port:-587}

read -p "SMTP User (your email): " smtp_user

read -sp "SMTP Password (app password): " smtp_password
echo ""

# Set Firebase Functions config
firebase functions:config:set \
  smtp.host="$smtp_host" \
  smtp.port="$smtp_port" \
  smtp.user="$smtp_user" \
  smtp.password="$smtp_password"

# Deploy only the new function
echo ""
echo "🚀 Deploying functions to Firebase..."
firebase deploy --only functions:onUserCreated

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Welcome email function deployed successfully!"
    echo ""
    echo "📧 Test it by creating a new account at your website."
    echo "📊 View logs with: firebase functions:log --only onUserCreated"
else
    echo ""
    echo "❌ Deployment failed. Check the errors above."
    exit 1
fi
