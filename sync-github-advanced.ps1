# Script PowerShell avanzato per sincronizzare automaticamente il repository con GitHub
# Autore: Kilo Code
# Data creazione: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
# Versione: 2.0

param(
    [string]$Branch = "master",
    [switch]$SkipPull,
    [switch]$SkipPush,
    [switch]$Force,
    [string]$CustomMessage = ""
)

# Funzione per scrivere messaggi colorati
function Write-ColorMessage {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

# Funzione per gestire gli errori
function Handle-Error {
    param(
        [string]$ErrorMessage,
        [int]$ExitCode = 1
    )
    Write-ColorMessage "ERRORE: $ErrorMessage" "Red"
    Write-ColorMessage "Script interrotto." "Red"
    exit $ExitCode
}

# Inizio script
Write-ColorMessage "=== Script avanzato di sincronizzazione GitHub ===" "Green"
Write-ColorMessage "Branch target: $Branch" "Cyan"
Write-ColorMessage "Inizio sincronizzazione del repository..." "Yellow"

# Imposta il percorso del repository
$repoPath = "C:\FreelanceProjects\Portfolio\restaurant-landing"

# Verifica che la directory esista
if (-not (Test-Path $repoPath)) {
    Handle-Error "La directory del repository non esiste: $repoPath"
}

# Cambia directory del repository
try {
    Set-Location $repoPath
    Write-ColorMessage "Directory corrente: $(Get-Location)" "Cyan"
}
catch {
    Handle-Error "Impossibile cambiare directory: $($_.Exception.Message)"
}

# Verifica che sia un repository Git
if (-not (Test-Path ".git")) {
    Handle-Error "La directory corrente non è un repository Git"
}

# Mostra lo stato attuale
Write-ColorMessage "`n--- Stato attuale del repository ---" "Yellow"
git status

# Pull delle ultime modifiche dal remote (se non specificato SkipPull)
if (-not $SkipPull) {
    Write-ColorMessage "`n--- Pull delle ultime modifiche da GitHub ---" "Yellow"
    try {
        git pull origin $Branch
        Write-ColorMessage "Pull completato con successo" "Green"
    }
    catch {
        Handle-Error "Errore durante il pull: $($_.Exception.Message)"
    }
}
else {
    Write-ColorMessage "`n--- Pull saltato (parametro -SkipPull) ---" "Yellow"
}

# Aggiungi tutti i file modificati
Write-ColorMessage "`n--- Aggiunta dei file modificati ---" "Yellow"
try {
    git add .
    Write-ColorMessage "File aggiunti con successo" "Green"
}
catch {
    Handle-Error "Errore durante l'aggiunta dei file: $($_.Exception.Message)"
}

# Crea un commit con timestamp
$timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
if ($CustomMessage -ne "") {
    $commitMessage = "$CustomMessage - $timestamp"
}
else {
    $commitMessage = "Auto-sync with GitHub - $timestamp"
}

Write-ColorMessage "`n--- Creazione del commit ---" "Yellow"
Write-ColorMessage "Messaggio: $commitMessage" "Cyan"

try {
    git commit -m $commitMessage
    Write-ColorMessage "Commit creato con successo" "Green"
}
catch {
    # Se non ci sono cambiamenti, non è un errore
    if ($_.Exception.Message -like "*nothing to commit*") {
        Write-ColorMessage "Nessun cambiamento da committare" "Yellow"
    }
    else {
        Handle-Error "Errore durante il commit: $($_.Exception.Message)"
    }
}

# Push delle modifiche su GitHub (se non specificato SkipPush)
if (-not $SkipPush) {
    Write-ColorMessage "`n--- Push delle modifiche su GitHub ---" "Yellow"
    
    $pushCommand = "git push origin $Branch"
    if ($Force) {
        $pushCommand += " --force"
        Write-ColorMessage "ATTENZIONE: Push forzato abilitato" "Red"
    }
    
    try {
        Invoke-Expression $pushCommand
        Write-ColorMessage "Push completato con successo" "Green"
    }
    catch {
        Handle-Error "Errore durante il push: $($_.Exception.Message)"
    }
}
else {
    Write-ColorMessage "`n--- Push saltato (parametro -SkipPush) ---" "Yellow"
}

# Verifica finale
Write-ColorMessage "`n--- Verifica finale ---" "Yellow"
git status

Write-ColorMessage "`n=== Sincronizzazione completata con successo! ===" "Green"
Write-ColorMessage "Timestamp: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" "Cyan"

# Mostra log degli ultimi commit
Write-ColorMessage "`n--- Ultimi 5 commit ---" "Yellow"
git log --oneline -5

# Chiedi se premere un tasto per continuare (se eseguito manualmente)
Write-ColorMessage "`nPremi un tasto per continuare..." "Gray"
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")