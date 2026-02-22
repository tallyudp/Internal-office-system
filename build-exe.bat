@echo off
title Build Standalone Executable
color 0B

echo ===============================================================
echo   OFFICE TASK DISPLAY SYSTEM - BUILD STANDALONE EXECUTABLE
echo ===============================================================
echo.
echo This process will:
echo 1. Build the React frontend into static files
echo 2. Copy those files into the backend server
echo 3. Package the entire NodeJS backend into a single .exe file
echo.

echo [1/3] Building Frontend...
cd frontend
call npm install
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Frontend build failed.
    pause
    exit /b
)

echo.
echo [2/3] Preparing Backend Assets...
cd ..\backend
if exist public rmdir /s /q public
mkdir public
xcopy /E /I /Y ..\frontend\dist public

echo.
echo [3/3] Compiling Executable File (this might take a minute)...
call npm install
call npm install -g pkg
call pkg . --targets node18-win-x64 --output OfficeTaskSystem.exe
if %errorlevel% neq 0 (
    echo [ERROR] Package compilation failed.
    pause
    exit /b
)

echo.
echo ===============================================================
echo BUILD COMPLETE AND SUCCESSFUL!
echo ===============================================================
echo You can now find your standalone application here:
echo   D:\Proj\task-display-system\backend\OfficeTaskSystem.exe
echo.
echo You can copy this file to your client's computer on a USB drive!
echo.
pause
