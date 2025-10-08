# Script di Sincronizzazione GitHub

Questo repository contiene due script PowerShell per automatizzare la sincronizzazione con GitHub.

## Script disponibili

### 1. sync-github.ps1
Script base per la sincronizzazione automatica del repository con GitHub.

**Utilizzo:**
```powershell
.\sync-github.ps1
```

**Funzionalità:**
- Esegue pull delle ultime modifiche da GitHub
- Aggiunge tutti i file modificati
- Crea un commit con timestamp automatico
- Esegue push delle modifiche su GitHub
- Mostra lo stato del repository prima e dopo la sincronizzazione

### 2. sync-github-advanced.ps1
Script avanzato con opzioni aggiuntive e gestione degli errori.

**Utilizzo base:**
```powershell
.\sync-github-advanced.ps1
```

**Utilizzo con parametri:**
```powershell
# Solo commit e push (senza pull)
.\sync-github-advanced.ps1 -SkipPull

# Solo pull e commit (senza push)
.\sync-github-advanced.ps1 -SkipPush

# Con messaggio di commit personalizzato
.\sync-github-advanced.ps1 -CustomMessage "Aggiornamento funzionalità X"

# Sync su branch diverso
.\sync-github-advanced.ps1 -Branch "develop"

# Push forzato (usare con cautela)
.\sync-github-advanced.ps1 -Force
```

**Parametri disponibili:**
- `-Branch <nome>`: Specifica il branch target (default: master)
- `-SkipPull`: Salta il pull da GitHub
- `-SkipPush`: Salta il push su GitHub
- `-Force`: Esegue un push forzato
- `-CustomMessage <messaggio>`: Usa un messaggio di commit personalizzato

## Prerequisiti

1. **Git installato**: Assicurati che Git sia installato e configurato
2. **PowerShell**: Gli script richiedono PowerShell 5.1 o superiore
3. **Permessi di esecuzione**: Potrebbe essere necessario modificare la policy di esecuzione di PowerShell

### Configurazione permessi PowerShell

Se ricevi un errore di esecuzione, esegui questo comando in PowerShell come amministratore:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Configurazione del repository

Gli script sono preconfigurati per funzionare con il repository in:
```
C:\FreelanceProjects\Portfolio\restaurant-landing
```

Se il tuo repository si trova in un'altra posizione, modifica la variabile `$repoPath` negli script.

## Flusso di sincronizzazione

1. **Verifica stato**: Mostra lo stato attuale del repository
2. **Pull**: Scarica le ultime modifiche dal remote
3. **Add**: Aggiunge tutti i file modificati all'area di staging
4. **Commit**: Crea un commit con timestamp automatico
5. **Push**: Carica le modifiche su GitHub
6. **Verifica finale**: Mostra lo stato finale e gli ultimi commit

## Automazione

### Esecuzione programmata con Task Scheduler

1. Apri "Task Scheduler" di Windows
2. Crea un nuovo task
3. Imposta un trigger (es. giornaliero, settimanale)
4. Imposta l'azione:
   - Programma: `powershell.exe`
   - Argomenti: `-ExecutionPolicy Bypass -File "C:\FreelanceProjects\Portfolio\restaurant-landing\sync-github.ps1"`
   - Directory iniziale: `C:\FreelanceProjects\Portfolio\restaurant-landing`

### Esecuzione rapida

Crea un file batch `.bat` per esecuzione rapida:
```batch
@echo off
powershell -ExecutionPolicy Bypass -File "C:\FreelanceProjects\Portfolio\restaurant-landing\sync-github.ps1"
pause
```

## Troubleshooting

### Errori comuni

1. **"Git non è riconosciuto"**: Installa Git o aggiungilo al PATH di sistema
2. **"Impossibile eseguire script"**: Modifica la policy di esecuzione di PowerShell
3. **"Authentication failed"**: Configura le credenziali Git con `git config` o usa SSH keys
4. **"Merge conflicts"**: Risolvi i conflitti manualmente prima di eseguire lo script

### Log e debug

Gli script mostrano output dettagliato durante l'esecuzione. Per salvare l'output in un file:
```powershell
.\sync-github.ps1 > sync-log.txt 2>&1
```

## Sicurezza

- Non salvare credenziali negli script
- Usa SSH keys invece di password quando possibile
- Fai backup regolari del repository
- Testa lo script su un repository di prova prima di usarlo in produzione

## Supporto

Per problemi o suggerimenti, controlla:
1. La configurazione di Git (`git config --list`)
2. Lo stato del repository (`git status`)
3. La connessione a GitHub (`git remote -v`)