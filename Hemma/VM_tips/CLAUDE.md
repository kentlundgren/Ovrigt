# CLAUDE.md — VM_tips-projektet

Instruktioner för Claude Cowork när du arbetar i den här mappen.

---

## Projektöversikt

HTML-webbpresentation av 6 personers VM-tips för FIFA VM 2026.
Publiceras via GitHub Pages på `kentlundgren.github.io/Ovrigt/Hemma/VM_tips/`.

Masterskapstipset.se kräver inloggning — hämta data via **Claude in Chrome**
(Browser 2, deviceId: `7dbf99b1-26c6-46e8-acdc-051356a6bb7d`).

---

## Filstruktur

```
VM_tips/
├── index.html                    # Startsida / navigation (3 kort)
├── vmtips_familj_2026.html       # Alla tippares bracket, klickbar
├── analys.html                   # Analyssida mot odds
├── kent_vmtips_2026.html         # Kents fullständiga gruppspelstips
├── bloggtext_vm2026.txt          # Råtext för blogg/LinkedIn
├── wordpress-linkedin-artikel.skill  # Claude-skill för artiklar
├── README.md
└── CLAUDE.md                     # Den här filen
```

---

## Tippare — aktuell lista

Ordning i PERSONS-arrayerna (båda filerna måste vara synkroniserade):

| Index | id | Namn | Relation | Färg |
|-------|----|------|----------|------|
| 0 | `kent` | Kent Lundgren | Du | `#7F77DD` |
| 1 | `bengt` | Bengt Sjöquist | Kompis | `#1D9E75` |
| 2 | `benita` | Benita Sjöquist | Kompis | `#D16BA5` |
| 3 | `lotta` | Lotta Lundgren | Fru | `#E05252` |
| 4 | `erik` | Erik Lundgren | Son | `#378ADD` |
| 5 | `elin` | Elin Lundgren | Dotter | `#F59E0B` |

---

## Lägga till ny tippare

Hämta tipsdata via Claude in Chrome från:
`https://masterskapstipset.se/vmtips2026.aspx?p=[PID]&refid=`

Tre filer måste uppdateras:

### 1. `vmtips_familj_2026.html`
Lägg till i `PERSONS`-arrayen (sist). Välj en färg som inte krockar med
befintliga. Fyll i `bracket`-arrayen med hela slutspelsträdet.

```javascript
{
  id: 'xxx', name: 'Förnamn Efternamn', relation: 'Relation',
  initials: 'XX', color: '#HEXKOD', done: true,
  bracket: [
    { name: 'Sextondelfinaler (1)', matches: [ ... ] },
    { name: 'Sextondelfinaler (2)', matches: [ ... ] },
    { name: 'Åttondelsfinaler',     matches: [ ... ] },
    { name: 'Kvartsfinaler',        matches: [ ... ] },
    { name: 'Semifinaler',          matches: [ ... ] },
    { name: 'Final 🏆', isFinal: true,   matches: [ ... ] },
    { name: 'Bronsmatch 🥉', isBronze: true, matches: [ ... ] },
  ],
},
```

### 2. `analys.html` — PERSONS-array

```javascript
{
  name:'Förnamn Efternamn', relation:'Relation', initials:'XX',
  color:'#HEXKOD',
  podium:['Land1','Land2','Land3','Land4'],
  final:{ t1:'Land1', s1:X, t2:'Land2', s2:Y },
  bronze:{ t1:'LandA', s1:X, t2:'LandB', s2:Y },
},
```

### 3. `analys.html` — ANALYSIS-array
Lägg till i **exakt samma index** som i PERSONS (ordningen måste matcha):

```javascript
{
  id: 'xxx',
  verdict: 'safe'|'ok'|'bold'|'wild',
  verdictLabel: 'Välmotiverat'|'Rimligt'|'Djärvt'|'Vilt!',
  text: `Förklaringstext mot odds...`,
  extra: `Jämförelse med övriga tippare...`,
},
```

---

## Odds-referens (för analystext)

| Lag | Odds | Placering |
|-----|------|-----------|
| Spanien | +450 | 1:a favorit |
| Frankrike | +500 | 2:a |
| Argentina | +650 | 3:e |
| England | +650 | 3:e |
| Brasilien | +800 | 4:e |
| Portugal | +900 | 5:e |
| Tyskand | +1400 | 6:e |
| Norge | +5000 | lång outsider |

---

## Designkonventioner

- **Tema:** mörkt, bakgrund `#0F1117`, yta `#1A1D27`, yta2 `#242736`
- **Accentfärg:** guld `#FFD700`, brons `#CD7F32`
- **Typsnitt:** `'Inter', system-ui, sans-serif`
- **Charset:** `<meta charset="UTF-8">` alltid i `<head>` — utan den bryts å/ä/ö
- **Single-file:** all CSS och JS inbäddad i varje HTML-fil, inga externa beroenden

---

## Artikelfiler (WordPress / LinkedIn)

Använd skillet `wordpress-linkedin-artikel` när Kent vill publicera text.
Det skapar två separata HTML-filer:
- `*_wordpress.html` — klistra in i WP Gutenberg "Anpassad HTML"-block
- `*_linkedin_pulse.html` — öppna i Chrome → Ctrl+A → Ctrl+C → klistra i Pulse-editorn

**Viktigt:** WordPress-filen MÅSTE ha `<meta charset="UTF-8">` annars visas
å/ä/ö som `Ã¥`/`Ã¤`/`Ã¶`.

---

## GitHub Pages

Repo: `kentlundgren/Ovrigt`, undermapp `Hemma/VM_tips/`.
Push till `main` publicerar automatiskt. Kontrollera att filer är committade
innan du säger åt Kent att testa länken.
