@echo off
title MT1-LABEXAM - One Click Launcher
cd /d "%~dp0"

echo ==========================================
echo       MT1-LABEXAM - PageTurn Library
echo ==========================================
echo.

if not exist "package.json" (
    echo ERROR: package.json not found.
    echo Please run this file from the extracted MT1-LABEXAM folder.
    pause
    exit /b 1
)

if not exist "node_modules\express" (
    echo Installing project dependencies...
    call npm install
    if errorlevel 1 (
        echo.
        echo npm install failed. Check that Node.js and npm are installed.
        pause
        exit /b 1
    )
)

echo Starting HTTP server on port 3000...
start "MT1 HTTP Server - Port 3000" cmd /k "cd /d ""%~dp0"" && node httpServer.js"

echo Starting Express API on port 4000...
start "MT1 Express API - Port 4000" cmd /k "cd /d ""%~dp0"" && node expressApp.js"

timeout /t 3 /nobreak >nul
start "" "http://localhost:3000/home"

echo.
echo Both server windows have been opened.
echo Website: http://localhost:3000/home
echo HTTP books: http://localhost:3000/books
echo Express API: http://localhost:4000/books
echo Keep both server windows open while testing.
echo.
pause
