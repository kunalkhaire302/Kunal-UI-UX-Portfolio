@echo off
title Kunal Portfolio - Dev Server
color 0A

echo ============================================
echo   Kunal Portfolio - Starting Dev Server
echo ============================================
echo.

:: Navigate to the folder where this bat file lives
cd /d "%~dp0"

:: Install dependencies if node_modules doesn't exist
if not exist "node_modules\" (
    echo [INFO] Installing dependencies... Please wait.
    call npm install
    echo.
)

:: Start the dev server and open browser
echo [INFO] Starting Vite dev server...
echo.
call npm run dev -- --open

pause
