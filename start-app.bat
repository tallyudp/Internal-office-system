@echo off
title Office Task Display System Startup
color 0B

echo ===============================================================
echo          OFFICE TASK DISPLAY SYSTEM - STARTUP
echo ===============================================================
echo.
echo This script will automatically start both the Backend and Frontend.
echo Make sure you have Node.js installed on this computer.
echo.

echo [1/2] Preparing and Starting Backend...
start "Task Display - Backend Server(DO NOT CLOSE)" cmd /k "cd backend && npm install && npm start"

echo [2/2] Preparing and Starting Frontend...
start "Task Display - Frontend Server (DO NOT CLOSE)" cmd /k "cd frontend && npm install && npm run dev -- --host"

echo.
echo ===============================================================
echo ALL DONE! 
echo Two new black console windows have opened to run the system. 
echo DO NOT close those windows while you want the system to run.
echo.
echo Look at the Frontend Server window to see the "Network" URL 
echo to access this on your local Wi-Fi.
echo ===============================================================
echo.
pause
