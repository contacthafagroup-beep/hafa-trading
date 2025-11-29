#!/bin/bash

# Complete Deployment Script for Hafa Trading PLC
# This script deploys both the Next.js app and Firebase Functions

echo ""
echo "========================================"
echo "  Hafa Trading PLC - Full Deployment"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null
then
    echo -e "${RED}❌ Firebase CLI is not installed.${NC}"
    echo "Install it with: npm install -g firebase-tools"
    exit 1
fi

# Check if logged in to Firebase
echo "🔐 Checking Firebase authentication..."
if ! firebase projects:list &> /dev/null; then
    echo "Please login to Firebase..."
    firebase login
fi

echo ""
echo "========================================"
echo "  Step 1: Build Next.js Application"
echo "========================================"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi

# Build Next.js app
echo "🔨 Building Next.js application..."
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed. Please fix the errors above.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Next.js build completed successfully!${NC}"

echo ""
echo "========================================"
echo "  Step 2: Build Firebase Functions"
echo "========================================"
echo ""

cd functions

echo "📦 Installing function dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install function dependencies${NC}"
    cd ..
    exit 1
fi

echo "🔨 Building TypeScript functions..."
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Function build failed${NC}"
    cd ..
    exit 1
fi

echo -e "${GREEN}✅ Functions build completed successfully!${NC}"

cd ..

echo ""
echo "========================================"
echo "  Step 3: Configure SMTP (Optional)"
echo "========================================"
echo ""

read -p "Do you want to configure SMTP for welcome emails? (y/n): " configure_smtp

if [[ "$configure_smtp" =~ ^[Yy]$ ]]; then
    echo ""
    echo "Please enter your SMTP configuration:"
    echo ""
    
    read -p "SMTP Host (default: smtp.gmail.com): " smtp_host
    smtp_host=${smtp_host:-smtp.gmail.com}
    
    read -p "SMTP Port (default: 587): " smtp_port
    smtp_port=${smtp_port:-587}
    
    read -p "SMTP User (your email): " smtp_user
    
    read -sp "SMTP Password (app password): " smtp_password
    echo ""
    
    echo ""
    echo "Setting Firebase Functions config..."
    firebase functions:config:set \
        smtp.host="$smtp_host" \
        smtp.port="$smtp_port" \
        smtp.user="$smtp_user" \
        smtp.password="$smtp_password"
    
    echo -e "${GREEN}✅ SMTP configuration saved!${NC}"
fi

echo ""
echo "========================================"
echo "  Step 4: Deploy to Firebase"
echo "========================================"
echo ""

echo "🚀 Deploying Firestore rules..."
firebase deploy --only firestore:rules

echo ""
echo "🚀 Deploying Storage rules..."
firebase deploy --only storage:rules

echo ""
echo "🚀 Deploying Firebase Functions..."
firebase deploy --only functions

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Firebase deployment failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Firebase deployment completed successfully!${NC}"

echo ""
echo "========================================"
echo "  Step 5: Deploy to Vercel (Optional)"
echo "========================================"
echo ""

read -p "Do you want to deploy to Vercel now? (y/n): " deploy_vercel

if [[ "$deploy_vercel" =~ ^[Yy]$ ]]; then
    if ! command -v vercel &> /dev/null
    then
        echo "Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    echo ""
    echo "🚀 Deploying to Vercel..."
    echo ""
    read -p "Deploy to production? (y/n): " production
    
    if [[ "$production" =~ ^[Yy]$ ]]; then
        vercel --prod
    else
        vercel
    fi
fi

echo ""
echo "========================================"
echo "  Deployment Summary"
echo "========================================"
echo ""
echo -e "${GREEN}✅ Next.js application built${NC}"
echo -e "${GREEN}✅ Firebase Functions built and deployed${NC}"
echo -e "${GREEN}✅ Firestore rules deployed${NC}"
echo -e "${GREEN}✅ Storage rules deployed${NC}"
[[ "$configure_smtp" =~ ^[Yy]$ ]] && echo -e "${GREEN}✅ SMTP configured for welcome emails${NC}"
[[ "$deploy_vercel" =~ ^[Yy]$ ]] && echo -e "${GREEN}✅ Deployed to Vercel${NC}"
echo ""
echo "========================================"
echo "  Next Steps"
echo "========================================"
echo ""
echo "1. Verify deployment at your Vercel URL"
echo "2. Test user registration and welcome email"
echo "3. Check Firebase Console for any errors"
echo "4. Configure custom domain (if needed)"
echo "5. Set up monitoring and alerts"
echo ""
echo "📚 Documentation:"
echo "   - DEPLOYMENT.md - Full deployment guide"
echo "   - WELCOME_EMAIL_SETUP.md - Email setup"
echo "   - TESTING_WELCOME_EMAIL.md - Testing guide"
echo ""
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo ""
