---
name: "kostnad-daglig-analys"
description: "Automatisk daglig analys av kostnader när Kent rapporterar usage via skärmdump eller manuell inmatning. Uppdaterar data.md, genererar analysfil i Harvardformat i Analyser-mappen, och presenterar kostnadstrend med prognoser."
---

# Automatisk analys: Kostnader vid daglig rapportering

Denna skill triggas varje gång Kent rapporterar sin usage — antingen via skärmdump av Inställningar → Usage, eller genom att manuellt ange de aktuella siffrorna. Skillen gör följande **automatiskt**:

1. **Läser in avlästa siffror** från Kents rapport
2. **Kontrollerar om data.md redan innehåller denna avläsning** — om ja, hoppa över data.md men gå ändå vidare till steg 4
3. **Uppdaterar data.md** om avläsningen är ny — lägger till nya rader i både huvudtabellen och daglig-förbruknings-tabellen
4. **Uppdaterar index.html** — alltid, oavsett om data.md var ny eller redan uppdaterad:
   - Förifyllda inputfält (session %, vecka %, spenderat €, gräns €, saldo, promo-credit)
   - "Förbrukning senaste veckan"-tabellen (daglig delta-tabell)
   - `today`-klassen i veckotabellen (flytta till rätt dag)
   - Datum-texter i rubrik/meta ("senast kända avläsningen")
   - KNOWN_BOOSTS om boost ändrats
5. **Uppdaterar data_oversikt.md** — om Sessions/Messages/Tokens/streaks-data rapporteras
6. **Genererar en ny analysfil i Analyser-mappen** — `Analyser/analys_YYYY-MM-DD_HHMM.md` med detaljerad Harvardformaterad analys
7. **Presenterar en kort sammanfattning** i chatten — vad som hände idag, hur vi står, nästa steg

---

## Viktig regel: index.html uppdateras ALLTID

Även om data.md redan är korrekt (t.ex. avläsningen loggades i en tidigare session), **ska index.html alltid kontrolleras och uppdateras**. Fälten i index.html är statiska standardvärden som inte uppdateras automatiskt — de måste skrivas om manuellt varje gång. Att hoppa över index.html för att "datan redan finns" är ett fel.

---

## Hur skillen triggas

### Trigger 1: Skärmdump av Usage-sidan
Kent laddar upp en .png/.jpg av `Inställningar → Usage` i Claude.ai eller Cowork. Skillen:
- Läser skärmdumpen och extraherar de relevanta värdena
- Bekräftar värden med Kent innan de läggs in ("Jag läste av X %, Y €... stämmer det?")
- Uppdaterar alla loggar och index.html

### Trigger 2: Manuell rapportering
Kent skriver något i stil med:
- "Usage 5 aug kl 24: Session 0 %, Vecka 100 %, 51,00 € spenderat, 60,00 € limit..."
- Eller: "Rapport: 2026-08-06 kl 17 — 32 %, 89 %, 61,34 €..."

### Trigger 3: Explicit anrop
Kent skriver: "analysera min usage från igår" eller "gör en kostnad-analys för 6 aug"
- Skillen hämtar den senaste raden från data.md
- Uppdaterar och genererar analys

---

## Checklist innan uppdatering

Skillen kontrollerar alltid **innan** det fyller i data.md:

- [ ] **Datum & tid är rimlig** — Är det samma dag eller senare än förra avläsningen?
- [ ] **Session % är mellan 0–100** — Om >100 eller värde verkar dublett, flagga
- [ ] **Vecka % är mellan 0–200 (med boost upp till +100%)** — Om högre, bekräfta
- [ ] **€ spent ökar eller är oförändrat** — Aldrig bakåt (om det händer: ny cykel? Refund?)
- [ ] **Usage credits < Monthly spend limit (eller bara lite över)** — Om mycket över sedan igår: auto-reload?
- [ ] **Balance minskar motsvarande € spent-ökningen** — Om inte: ny påfyllning eller redovisningsfel

Om något verkar konstigt — **stoppa, fråga Kent, uppdatera inte förrän han bekräftar.**

---

## Workflow steg för steg

### Steg 1: Inmatning
Kent: "Här är usage från 6 aug kl 17 — [skärmdump eller siffror]"

### Steg 2: Tolkning & bekräftelse
Claude presenterar avlästa värden:
```
Jag läste av följande:
- Session: 24 %
- Vecka: 89 % (Claude Code, +50%-boost till 19 aug → normalbaslinje 133,5 %)
- Usage credits: €61,34 av €60,00 limit
- Balance: €56,10 | Promo: €18,43 | Auto-reload: OFF

Stämmer detta? (Tryck Enter för att bekräfta eller korrigera)
```

### Steg 3: data.md
Om avläsningen är ny: lägg till rader. Om redan loggad: notera det och gå vidare.

### Steg 4: index.html (ALLTID)
Uppdatera dessa fält i index.html med de nya värdena:

| Fält (id) | Värde |
|---|---|
| `sessPct` | Session % |
| `sessReset` | Återstår till reset (t.ex. "4h 30min") |
| `weekPct` | Vecka % mot aktiv gräns |
| `boostPct` | Aktiv boost % |
| `boostEnd` | Boostens slutdatum |
| `creditSpent` | €spent (decimaltal med punkt: 51.00) |
| `creditLimit` | Månadsgräns € |
| `refBalance` | Nuvarande saldo € |
| `refPromo` | Promotional credit € |
| `refPromoExpiry` | Promo-utgångsdatum |
| KNOWN_BOOSTS cowork pct | 0 om boostens slutdatum passerat |
| Veckotabell `today`-klass | Flytta till rätt veckodag |
| Veckotabell EUR-kolumn | Lägg till dagens delta (kl 24-avläsning) |
| Datumtexter i `<p class="sub">` och `coreBanner` | Uppdatera till senaste avläsningsdatum |

### Steg 5: Analysfil
Generera `Analyser/analys_YYYY-MM-DD_HHMM.md` med:
- Situationsbild (tabell med alla mätvärden)
- Förbrukningstrend (daglig delta, jämförelse mot föregående dag)
- Prognoser: Scenario A (oförändrad takt), Scenario B (optimering), Scenario C (hybrid)
- Slutsats & rekommendationer
- Källor i Harvardformat med verifierade länkar

### Steg 6: Sammanfattning i chatten
Kort sammanfattning (5–10 rader) med vad som hände, nuläge och nästa steg.

---

## Filer som uppdateras

| Fil | Vad | Frekvens |
|---|---|---|
| `data.md` | Nya tabellrader (Claude Code + Cowork) | Om avläsningen är ny |
| `data.md` → Daglig förbrukning | Delta €; anteckning | Om avläsningen är ny |
| `index.html` | Förifyllda fält + veckotabell + datum | **Alltid** |
| `data_oversikt.md` | Sessions/Messages/Tokens | Valfritt vid Overview-avläsning |
| `Analyser/analys_YYYY-MM-DD_HHMM.md` | Ny analysfil | Varje rapport |

---

## Utgångspunkter & antaganden

- Cykeln antas börja den 1:a varje månad (resets Sep 1 → bekräftar detta)
- Veckobandet återställs varje torsdag ~08:00
- Boost-% läggs på normalbaslinjen (100 %) för att beräkna normalbaslinje-%
- Overflow dras från promotional credit först (observerat mönster, ej officiellt bekräftat av Anthropic)
- Om Kent byter standardmodell — notera det och mät påverkan på daglig delta

---

## Uppdateringslogg

- **2026-08-06 (v1):** Skill skapad.
- **2026-08-06 (v2):** Förbättrad efter incident där index.html inte uppdaterades (data.md var redan korrekt men index.html glömdes). Lade till: explicit regel om att index.html alltid uppdateras, detaljerad fält-tabell för index.html, workflow-steg, checklist, antaganden. Slogs samman med innehållet från SKILL_claude-kostnad-daglig-analys.md (som raderades som duplikat).
