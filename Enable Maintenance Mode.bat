@echo off
if exist portfolio.html goto AlreadyEnabled
if not exist maintenance.html goto NoMaintenanceFile

ren index.html portfolio.html
ren maintenance.html index.html

echo.
echo ==========================================
echo   MAINTENANCE MODE: ENABLED
echo ==========================================
echo.
echo 1. Your local 'index.html' is now the Maintenance Page.
echo 2. Your actual portfolio is saved as 'portfolio.html'.
echo.
echo CRITICAL STEP:
echo To make this live, you MUST commit and push changes to GitHub!
echo.
echo   git add .
echo   git commit -m "Enable maintenance mode"
echo   git push
echo.
goto End

:AlreadyEnabled
echo Maintenance mode is ALREADY enabled!
echo.
echo To restore your portfolio, please run 'Restore Live Portfolio.bat'
echo.
goto End

:NoMaintenanceFile
echo maintenance.html not found! Please check file structure.
goto End

:End
pause
