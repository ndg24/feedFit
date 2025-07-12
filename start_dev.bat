@echo off
echo 🎨 FeedFit Development Startup
echo ========================================

REM Check if Python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python not found. Please install Python first.
    pause
    exit /b 1
)

REM Check if Node.js is available
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js not found. Please install Node.js first.
    pause
    exit /b 1
)

echo ✅ Dependencies found
echo 📦 Installing backend dependencies...

REM Install backend dependencies
cd backend
pip install -r requirements.txt
if errorlevel 1 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..

echo ✅ Backend dependencies installed
echo 🚀 Starting development servers...

REM Start backend server in background
start "FeedFit Backend" python backend/main.py

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend server
echo 🎨 Starting frontend server...
npm run dev

echo 🛑 Development servers stopped
pause 