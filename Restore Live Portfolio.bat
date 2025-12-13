@echo off
if not exist portfolio.html goto NoPortfolio
if exist maintenance.html goto MaintenanceExists

ren index.html maintenance.html
ren portfolio.html index.html

echo.
echo ==========================================
echo   LIVE PORTFOLIO: RESTORED
echo ==========================================
echo.
echo 1. Your 'index.html' is now your Portfolio.
echo 2. The Maintenance Page is saved as 'maintenance.html'.
echo.
echo CRITICAL STEP:
echo To make this live, you MUST commit and push changes to GitHub!
echo.
echo   git add .
echo   git commit -m "Restore live portfolio"
echo   git push
echo.
goto End

:NoPortfolio
echo Live Portfolio (portfolio.html) not found!
echo.
echo Maybe you are already in Live Mode? 
echo Check if 'Enable Maintenance Mode' was run previously.
echo.
goto End

:MaintenanceExists
echo It seems maintenance.html already exists.
echo This script expects to rename current index.html back to maintenance.html.
echo Please check your files manually to avoid overwriting.
goto End

:End
pause
