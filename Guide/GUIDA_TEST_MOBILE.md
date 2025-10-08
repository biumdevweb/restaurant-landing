# 📱 Guida Test Mobile Semplice

## 🚀 Metodo Più Semplice: Live Server + ngrok

### 1. Installa ngrok
```bash
npm install -g ngrok
```

### 2. Avvia Live Server
- Tasto destro su `index.html` → "Open with Live Server"
- Si aprirà automaticamente su `http://localhost:5500`

### 3. Crea Tunnel Pubblico
```bash
ngrok http 5500
```

### 4. Test su Mobile
- Copia l'URL https fornito (es. `https://abc123.ngrok.io`)
- Apri questo URL sul tuo telefono
- Il sito sarà accessibile da qualsiasi dispositivo

## 📊 Test Lighthouse Mobile

### Su Chrome Desktop (Device Mode)
1. Vai su `http://localhost:5500`
2. Apri DevTools (F12)
3. Clicca icona dispositivo (Toggle device toolbar)
4. Seleziona "iPhone 12" o "Samsung Galaxy S21"
5. Network: "Fast 3G" (per test realistici)
6. Esegui Lighthouse

### Su Telefono Reale
1. Apri l'URL ngrok sul telefono
2. Apri Chrome DevTools sul desktop
3. Menu → More Tools → Remote Devices
4. Seleziona il tuo telefono dalla lista
5. Esegui audit Lighthouse

## 🎯 Cosa Verificare

### Performance
- [ ] CLS < 0.1 (nessun spostamento contenuti)
- [ ] LCP < 2.5s (contenuto visibile veloce)
- [ ] Speed Index < 4.0s

### Visivo
- [ ] Nessuno shift durante caricamento
- [ ] Testo visibile immediatamente
- [ ] Immagini proporzionate correttamente
- [ ] Menu responsive funzionale

## 🔧 Troubleshooting

### Se ngrok non funziona
- Prova `ngrok http 5500 --host-header=localhost`
- Verifica che Live Server sia attivo su porta 5500

### Se il sito è lento su mobile
- Controlla dimensioni immagini
- Verifica critical CSS coverage
- Testa con network throttling

## 📈 Metriche Target

| Metrica | Target | Accettabile |
|---------|--------|-------------|
| Performance | 85+/100 | 80+ |
| CLS | <0.1 | <0.15 |
| LCP | <2.5s | <3.0s |
| Speed Index | <4.0s | <4.5s |

## 🎉 Successo!

Se ottieni Performance >80 su mobile, le ottimizzazioni hanno funzionato!