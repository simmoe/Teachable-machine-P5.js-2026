# 🎓 Guide til Teachable Machine Template

## Sådan kommer du i gang

### 1. Lav din model på Teachable Machine
- Gå til [teachablemachine.withgoogle.com](https://teachablemachine.withgoogle.com)
- Lav et **Image Project**
- Træn din model med dine billeder
- Klik på **Export Model** → **Upload my model**
- Kopiér linket (f.eks. `https://teachablemachine.withgoogle.com/models/ABC123/`)

### 2. Opdater `sketch.js` ELLER `config.json`

**Måde 1: Ret direkte i sketch.js (nemt for begyndere)**
Åbn `sketch.js` og find disse linjer i toppen:
```javascript
var modelURL = "https://teachablemachine.withgoogle.com/models/6yFjg-Itx/"
var klassificeringsDelay = 1500
var sikkerhedsTaerskel = 0.8
var visVideo = true
```

**Måde 2: Brug config.json (mere avanceret)**
Ret indstillingerne i `config.json`:
```json
"settings": {
  "modelURL": "https://teachablemachine.withgoogle.com/models/DIN-MODEL/",
  "klassificeringsDelay": 1500,
  "sikkerhedsTaerskel": 0.8,
  "visVideo": true
}
```

💡 **TIP:** Hvis du sætter noget i `config.json`, overskriver det hvad der står i `sketch.js`!

### 3. Tilføj dine billeder
1. Læg dine billeder i `assets/` mappen
2. Navngiv dem efter dine klasser (f.eks. `Play.png`, `Stop.png`)

### 4. Opdater `config.json` med dine billeder
Ret klassenavnene og billedstier til at matche dine egne:

```json
{
  "debug": {
    "showVideo": true
  },
  "classes": {
    "MinKlasse1": {
      "image": "assets/MinKlasse1.png"
    },
    "MinKlasse2": {
      "image": "assets/MinKlasse2.png"
    }
  }
}
```

**VIGTIGT:** Klassenavnene SKAL matche præcis det du kaldte dem i Teachable Machine!

### 5. Åbn `index.html` i browseren
- Dobbeltklik på `index.html`
- Tillad kameraadgang når browseren spørger
- Se konsollen (Cmd+Option+I på Mac) for feedback

## Troubleshooting 🔧

### "Klassen findes ikke i config.json"
→ Tjek at navnet i `config.json` matcher præcis med Teachable Machine

### Stadig langsom? Computeren laver støj?
→ Prøv at **øge delay** i toppen af `sketch.js`:
```javascript
var klassificeringsDelay = 2000  // ← Ændre fra 1500 til 2000 (eller 3000)
```

Eller i `config.json`:
```json
"klassificeringsDelay": 2000
```
Jo højere tal, jo sjældnere tjekker AI'en = mindre belastning!

### Modellen er for følsom / registrerer forkerte ting?
→ Øg sikkerhedstærsklen i `sketch.js`:
```javascript
var sikkerhedsTaerskel = 0.9  // ← Kræver 90% sikkerhed i stedet for 80%
```

Eller i `config.json`:
```json
"sikkerhedsTaerskel": 0.9
```

### Vil ikke vise videoen?
→ Sæt `visVideo` til `true` i toppen af `sketch.js`:
```javascript
var visVideo = true
```

## Tips til bedre performance 🚀

1. **Luk andre tabs** i browseren - især YouTube, Netflix osv.
2. **Brug god belysning** så modellen kan se tydeligt
3. **Hold objekterne tæt på kameraet** med tydelige bevægelser
4. **Juster hastigheden** ved at ændre `klassificeringsDelay`:
   - Hurtigere computer? → Sæt til `1000` (1 sekund)
   - Langsommere computer? → Sæt til `2000-3000` (2-3 sekunder)
5. **Brug Chrome** (bedre performance end Safari til ML)

## Hvad betyder variablerne? 📚

- **modelURL**: Link til din Teachable Machine model
- **klassificeringsDelay**: Millisekunder mellem AI-tjek (1000 = 1 sekund)
- **sikkerhedsTaerskel**: Hvor sikker AI'en skal være (0.8 = 80%)
- **visVideo**: Om webcam-preview skal vises (true/false)

## Sådan læser du konsollen

Konsollen viser kun de vigtige beskeder (tekniske TensorFlow/WebGL advarsler er filtreret væk):

```
🤖 Indlæser AI-model...        // Modellen downloades
✅ Model klar!                  // Model er loaded
✅ Starter klassificering...    // Alt virker
   Delay: 1500ms                // Indstillinger der bruges
   Sikkerhed: 80%               // Indstillinger der bruges
🎯 Fundet: Play (sikkerhed: 95%)  // Når modellen finder noget med høj sikkerhed
```

**Note:** Vi har automatisk filtreret tekniske advarsler fra TensorFlow.js og ml5.js væk, så konsollen kun viser det som er relevant for jer! 🧹

---
**Spørgsmål?** Se [ml5js.org](https://ml5js.org) eller spørg din lærer!
