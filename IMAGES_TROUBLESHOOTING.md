# Risoluzione Problemi Immagini - Osteria della Tradizione

## 🔍 Problemi Identificati

### 1. Immagini Mancanti
Nel file HTML ci sono riferimenti a immagini che non esistono nella cartella `images`:
- `favicon.ico` (riga 22)
- `hero-bg.jpg` (riga 9 e usata nella sezione hero)

### 2. Estensione File Errata
Alla riga 366, c'è un riferimento a `map-placeholder.jpg` ma il file esistente è `map-placeholder.png`.

## 🛠️ Soluzioni

### Soluzione 1: Correggere Estensione File
Modifica la riga 366 del file `index.html`:
```html
<!-- DA -->
<img src="images/map-placeholder.jpg" alt="Mappa della posizione">

<!-- A -->
<img src="images/map-placeholder.png" alt="Mappa della posizione">
```

### Soluzione 2: Creare Immagini Mancanti

#### Opzione A: Usare Immagini Esistenti
Possiamo usare una delle immagini esistenti come placeholder:
- Usa `gallery-1.jpg` come `hero-bg.jpg`
- Crea un `favicon.ico` semplice o rimuovi il riferimento

#### Opzione B: Scaricare Nuove Immagini
1. Scarica un'immagine adatta per l'hero section da Unsplash o Pexels
2. Salvala come `hero-bg.jpg` nella cartella `images`
3. Crea o scarica un `favicon.ico` e salvalo nella cartella `images`

## 📋 Azioni Correttive Immediate

### 1. Correggi il Percorso della Mappa
Modifica il file `index.html` alla riga 366:
```html
<img src="images/map-placeholder.png" alt="Mappa della posizione">
```

### 2. Aggiungi Immagine Hero Sfondo
Copia una delle immagini esistenti come temporanea:
```bash
# In PowerShell o Prompt dei comandi
copy "Portfolio\restaurant-landing\images\gallery-1.jpg" "Portfolio\restaurant-landing\images\hero-bg.jpg"
```

### 3. Rimuovi Riferimento Favicon (Temporaneo)
Modifica la riga 22 nel file `index.html`:
```html
<!-- DA -->
<link rel="icon" type="image/x-icon" href="images/favicon.ico">

<!-- A (Commentato) -->
<!-- <link rel="icon" type="image/x-icon" href="images/favicon.ico"> -->
```

## 🎯 Verifica

Dopo aver applicato queste correzioni:
1. Apri il sito con Live Server
2. Verifica che tutte le immagini si carichino correttamente
3. Controlla la console del browser per eventuali errori

## 📚 Note Aggiuntive

- Il problema più comune è la differenza tra maiuscole/minuscole nei nomi dei file
- Assicurati che i percorsi relativi siano corretti rispetto alla posizione del file HTML
- Verifica che tutti i file esistano effettivamente nella cartella `images`

---

**Data**: 6 Ottobre 2025  
**Status**: Problemi identificati e soluzioni proposte