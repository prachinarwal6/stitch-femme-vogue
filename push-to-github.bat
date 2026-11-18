@echo off
cd /d "%~dp0"
echo ===================================================
echo   FEMME VOGUE — PUSHING TO GITHUB
echo ===================================================
echo Target: https://github.com/prachinarwal6/stitch-femme-vogue.git
echo.
"C:\Program Files\Git\cmd\git.exe" push -u origin main
echo.
echo ===================================================
echo Finished. Check your GitHub repository!
echo ===================================================
pause
