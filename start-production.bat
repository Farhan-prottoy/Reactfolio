@echo off
echo Building and starting Farhan's Portfolio...
echo.

echo 🔧 Building React application...
call npm run build

echo.
echo 🚀 Starting production server...
echo Your portfolio will be available at: http://localhost:3002
echo.

cd server
node chatAPI.js
