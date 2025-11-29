@echo off
REM Complete Deployment Script for Hafa Trading PLC
REM This script deploys both the Next.js app and Firebase Functions

echo.
echo ========================================
echo   Hafa Trading PLC - Full Deployment
echo ========================================
echo.

REM Check if Firebase CLI is installed
where firebase >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Firebase CLI is not installed.
    echo Install it with: npm install -g firebase-tools
    pause
    exit /b 1
)

REM Check if logged in to Firebase
echo 🔐 Checking Firebase authentication...
firebase projects:list >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Please login to Firebase...
    firebase login
)

echo.
echo ========================================
echo   Step 1: Build Next.js Application
echo ========================================
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

REM Build Next.js app
echo 🔨 Building Next.js application...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Build failed. Please fix the errors above.
    pause
    exit /b 1
)

echo ✅ Next.js build completed successfully!

echo.
echo ========================================
echo   Step 2: Build Firebase Functions
echo ========================================
echo.

cd functions

echo 📦 Installing function dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install function dependencies
    cd ..
    pause
    exit /b 1
)

echo 🔨 Building TypeScript functions...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Function build failed
    cd ..
    pause
    exit /b 1
)

echo ✅ Functions build completed successfully!

cd ..

echo.
echo ========================================
echo   Step 3: Configure SMTP (Optional)
echo ========================================
echo.

set /p configure_smtp="Do you want to configure SMTP for welcome emails? (y/n): "

if /i "%configure_smtp%"=="y" (
    echo.
    echo Please enter your SMTP configuration:
    echo.
    
    set /p smtp_host="SMTP Host (default: smtp.gmail.com): "
    if "%smtp_host%"=="" set smtp_host=smtp.gmail.com
    
    set /p smtp_port="SMTP Port (default: 587): "
    if "%smtp_port%"=="" set smtp_port=587
    
    set /p smtp_user="SMTP User (your email): "
    
    set /p smtp_password="SMTP Password (app password): "
    
    echo.
    echo Setting Firebase Functions config...
    call firebase functions:config:set smtp.host="%smtp_host%" smtp.port="%smtp_port%" smtp.user="%smtp_user%" smtp.password="%smtp_password%"
    
    echo ✅ SMTP configuration saved!
)

echo.
echo ========================================
echo   Step 4: Deploy to Firebase
echo ========================================
echo.

echo 🚀 Deploying Firestore rules...
call firebase deploy --only firestore:rules

echo.
echo 🚀 Deploying Storage rules...
call firebase deploy --only storage:rules

echo.
echo 🚀 Deploying Firebase Functions...
call firebase deploy --only functions

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Firebase deployment failed
    pause
    exit /b 1
)

echo ✅ Firebase deployment completed successfully!

echo.
echo ========================================
echo   Step 5: Deploy to Vercel (Optional)
echo ========================================
echo.

set /p deploy_vercel="Do you want to deploy to Vercel now? (y/n): "

if /i "%deploy_vercel%"=="y" (
    where vercel >nul 2>nul
    if %ERRORLEVEL% NEQ 0 (
        echo Installing Vercel CLI...
        call npm install -g vercel
    )
    
    echo.
    echo 🚀 Deploying to Vercel...
    echo.
    set /p production="Deploy to production? (y/n): "
    
    if /i "%production%"=="y" (
        call vercel --prod
    ) else (
        call vercel
    )
)

echo.
echo ========================================
echo   Deployment Summary
echo ========================================
echo.
echo ✅ Next.js application built
echo ✅ Firebase Functions built and deployed
echo ✅ Firestore rules deployed
echo ✅ Storage rules deployed
if /i "%configure_smtp%"=="y" echo ✅ SMTP configured for welcome emails
if /i "%deploy_vercel%"=="y" echo ✅ Deployed to Vercel
echo.
echo ========================================
echo   Next Steps
echo ========================================
echo.
echo 1. Verify deployment at your Vercel URL
echo 2. Test user registration and welcome email
echo 3. Check Firebase Console for any errors
echo 4. Configure custom domain (if needed)
echo 5. Set up monitoring and alerts
echo.
echo 📚 Documentation:
echo    - DEPLOYMENT.md - Full deployment guide
echo    - WELCOME_EMAIL_SETUP.md - Email setup
echo    - TESTING_WELCOME_EMAIL.md - Testing guide
echo.
echo 🎉 Deployment Complete!
echo.

pause
