# Script PowerShell per sincronizzare automaticamente il repository con GitHub
# Autore: Kilo Code
# Data creazione: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')

Write-Host "=== Script di sincronizzazione GitHub ===" -ForegroundColor Green
Write-Host "Inizio sincronizzazione del repository..." -ForegroundColor Yellow

# Imposta il percorso del repository
$repoPath = "C:\FreelanceProjects\Portfolio\restaurant-landing"

# Cambia directory del repository
Set-Location $repoPath
Write-Host "Directory corrente: $(Get-Location)" -ForegroundColor Cyan

# Mostra lo stato attuale
Write-Host "`n--- Stato attuale del repository ---" -ForegroundColor Yellow
git status

# Pull delle ultime modifiche dal remote
Write-Host "`n--- Pull delle ultime modifiche da GitHub ---" -ForegroundColor Yellow
git pull origin master

# Aggiungi tutti i file modificati
Write-Host "`n--- Aggiunta dei file modificati ---" -ForegroundColor Yellow
git add .

# Crea un commit con timestamp
$timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
$commitMessage = "Auto-sync with GitHub - $timestamp"
Write-Host "`n--- Creazione del commit ---" -ForegroundColor Yellow
Write-Host "Messaggio: $commitMessage" -ForegroundColor Cyan
git commit -m $commitMessage

# Push delle modifiche su GitHub
Write-Host "`n--- Push delle modifiche su GitHub ---" -ForegroundColor Yellow
git push origin master

# Verifica finale
Write-Host "`n--- Verifica finale ---" -ForegroundColor Yellow
git status

Write-Host "`n=== Sincronizzazione completata con successo! ===" -ForegroundColor Green
Write-Host "Timestamp: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Cyan

# Chiedi se premere un tasto per continuare (se eseguito manualmente)
Write-Host "`nPremi un tasto per continuare..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")