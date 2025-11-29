@echo off
REM Deploy Welcome Email Function for Windows
REM This script deploys the Firebase Functions including the new welcome email feature

echo.
echo 🚀 Deploying Welcome Email Function...
echo.

REM Check if Firebase CLI is installed
where firebase >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Firebase CLI is not installed.
    echo Install it with: npm install -g firebase-tools
    exit /b 1
)

REM Navigate to functions directory
cd functions

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Build TypeScript
echo 🔨 Building TypeScript...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Build failed. Please fix the errors above.
    exit /b 1
)

REM Go back to root
cd ..

REM Set SMTP configuration
echo.
echo ⚙️  Configuring SMTP settings...
echo Please enter your SMTP configuration:
echo.

set /p smtp_host="SMTP Host (default: smtp.gmail.com): "
if "%smtp_host%"=="" set smtp_host=smtp.gmail.com

set /p smtp_port="SMTP Port (default: 587): "
if "%smtp_port%"=="" set smtp_port=587

set /p smtp_user="SMTP User (your email): "

set /p smtp_password="SMTP Password (app password): "

REM Set Firebase Functions config
call firebase functions:config:set smtp.host="%smtp_host%" smtp.port="%smtp_port%" smtp.user="%smtp_user%" smtp.password="%smtp_password%"

REM Deploy only the new function
echo.
echo 🚀 Deploying functions to Firebase...
call firebase deploy --only functions:onUserCreated

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Welcome email function deployed successfully!
    echo.
    echo 📧 Test it by creating a new account at your website.
    echo 📊 View logs with: firebase functions:log --only onUserCreated
) else (
    echo.
    echo ❌ Deployment failed. Check the errors above.
    exit /b 1
)

pause
