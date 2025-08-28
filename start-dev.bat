@echo off
echo Starting Farhan's Portfolio Development Environment...
echo.

REM Start the backend server in a new window
echo Starting backend server on port 3002...
start "Backend Server" cmd /k "cd /d %~dp0server && node chatAPI.js"

REM Wait a moment for the backend to start
timeout /t 3 /nobreak >nul

REM Start the frontend development server
echo Starting frontend development server on port 5173...
echo.
npm run dev

echo.
echo Both servers are starting...
echo Backend: http://localhost:3002
echo Frontend: http://localhost:5173
echo.
pause
