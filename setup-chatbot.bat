@echo off
echo ================================
echo Portfolio Chatbot - Quick Setup
echo ================================
echo.

echo Step 1: Installing backend dependencies...
cd backend
call npm install

echo.
echo ================================
echo Setup Complete!
echo ================================
echo.
echo Next steps:
echo 1. Get your FREE API key from: https://makersuite.google.com/app/apikey
echo 2. Create backend\.env file and add: GEMINI_API_KEY=your_key_here
echo 3. Run: npm run dev (in backend folder)
echo.
echo Then your chatbot will be ready!
echo.
pause
