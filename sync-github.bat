@echo off
title Sync GitHub Repository
color 0A

echo ========================================
echo   Sync GitHub Repository - Quick Start
echo ========================================
echo.

echo Avvio dello script di sincronizzazione...
echo.

powershell -ExecutionPolicy Bypass -File "%~dp0sync-github.ps1"

echo.
echo ========================================
echo Operazione completata!
echo ========================================
echo.

pause