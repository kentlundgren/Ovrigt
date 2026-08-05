---
name: "kostnad-daglig-analys"
description: "Automatisk daglig analys av kostnader när Kent rapporterar usage via skärmdump eller manuell inmatning. Uppdaterar data.md, genererar analysfil i Harvardformat i Analyser-mappen, och presenterar kostnadstrend med prognoser."
---

# Automatisk analys: Kostnader vid daglig rapportering

Denna skill triggas varje gång Kent rapporterar sin usage — antingen via skärmdump av Inställningar → Usage, eller genom att manuellt ange de aktuella siffrorna. Skillen gör följande **automatiskt**:

1. **Läser in avlästa siffror** från Kents rapport
2. **Kontrollerar om data.md redan innehåller denna avläsning** — om ja, hoppa över data.md men gå ändå vidare till steg 4
3. **Uppdaterar data.md** om avläsningen är ny — lägger till nya rader i både huvudtabellen och daglig-förbruknings-tabellen
4. **Uppdaterar index.html** — alltid, oavsett om data.md var ny eller redan uppdaterad (se fält-tabell nedan)
5. **Uppdaterar data_oversikt.md** — om Sessions/Messages/Tokens/streaks-data rapporteras
6. **Genererar en ny analysfil i Analyser-mappen** — `Analyser/analys_YYYY-MM-DD_HHMM.md`
7. **Presenterar en kort sammanfattning** i chatten — vad som hände idag, hur vi står, nästa steg

---

## Viktig regel: index.html uppdateras ALLTID

Även om data.md redan är korrekt (t.ex. avläsningen loggades i en tidigare session), **ska index.html alltid kontrolleras och uppdateras**. Fälten är statiska standardvärden som inte uppdateras automatiskt. Att hoppa över index.html för att "datan redan finns" är ett fel.

---

## Hur skillen triggas

### Trigger 1: Skärmdump av Usage-sidan
Kent laddar upp en .png/.jpg av `Inställningar → Usage`. Skillen läser bilden, bekräftar värden, uppdaterar alla loggar och index.html.

### Trigger 2: Manuell rapportering
Kent skriver t.ex. "Usage 5 aug kl 24: Session 0 %, Vecka 100 %, 51,00 € spenderat, 60,00 € limit..."

### Trigger 3: Explicit anrop
Kent skriver "analysera min usage från igår" eller "gör en kostnad-analys för 6 aug".

---

## Checklist innan uppdatering

- [ ] Datum & tid är rimlig — senare än eller samma dag som förra avläsningen?
- [ ] Session % är 0–100
- [ ] Vecka % är 0–200 (boost kan ge upp till +100%)
- [ ] € spent ökar eller är oförändrat (aldrig bakåt — om det händer: ny cykel?)
- [ ] Balance minskar med ungefär samma belopp som € spent ökar

Om något verkar konstigt — **stoppa, fråga Kent, uppdatera inte förrän han bekräftar.**

---

## Workflow steg för steg

### Steg 1–2: Inmatning & bekräftelse
Presentera avlästa värden och invänta bekräftelse från Kent.

### Steg 3: data.md
Om avläsningen är ny: lägg till rader. Om redan loggad: notera det och gå vidare.

### Steg 4: index.html (ALLTID)

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
Generera `Analyser/analys_YYYY-MM-DD_HHMM.md` enligt strukturen nedan.

### Steg 6: Sammanfattning i chatten
Kort (5–10 rader): vad som hände, nuläge, nästa steg.

---

## Analysfil-struktur

Varje analysfil ska innehålla följande avsnitt **i denna ordning**:

### 1. Rubrik + metadata
Datum, tid, modeller aktiva.

### 2. Veckosammanställning — förbrukning dag för dag

**Detta avsnitt ska alltid vara det första med faktisk data i filen — placerat direkt efter rubriken**, eftersom det är det enklaste och mest lättlästa avsnittet. Det speglar exakt "Förbrukning senaste veckan"-tabellen i index.html:

```
## Veckosammanställning — förbrukning dag för dag

| Veckodag | EUR | Kommentar |
|---|---|---|
| Måndag   | –     | Ingen avläsning (rutinen startade tisdag) |
| Tisdag   | 19,07 | 6,13 € → 25,20 €, hela dygnet |
| Onsdag   | 25,80 | 25,20 € → 51,00 €. Haiku-byte, spend-limit höjd 50→60 €, Cowork-boost slutade |
| Torsdag  | –     | Ingen avläsning än (dagens datum) |
| Fredag   | –     | – |
| Lördag   | –     | – |
| Söndag   | –     | – |
| **Summa** | **44,87 €** | |
```

Tomma dagar = "ingen avläsning än", inte 0 €. Kommentarerna ska vara korta och konkreta — ange vad som hände, inte vad som beräknades. Tabellen hämtas alltid direkt från daglig-förbruknings-tabellen i data.md, inte beräknad på nytt.

### 3. Bakgrund
Vad som är nytt sedan förra analysrapporten — policyändringar, modellbyten, boost-avslut, limit-justeringar.

### 4. Situationsbild
Tabell med alla aktuella mätvärden (session %, vecka %, normalbaslinje %, spent €, limit €, saldo, promo, auto-reload).

### 5. Förbrukningstakt
Daglig delta, takt-avvikelse vecka och månad, jämförelse mot föregående dag.

### 6. Prognoser
- Scenario A: oförändrad takt
- Scenario B: med optimering (t.ex. Haiku-byte eller minskad användning)
- Scenario C: hybrid

### 7. Nyckeltal i korthet
Kompakt tabell med de viktigaste värdena — för snabb referens.

### 8. Slutsats & rekommendationer
Vad Kent ska fokusera på nästa dag. Konkret och actionable — inte bara konstateranden.

### 9. Källor
Harvardformaterade referenser med verifierade och klickbara länkar.

**Ton & språk:** Svenska, analytisk men mänsklig, undvik AI-jargong.

---

## Filer som uppdateras

| Fil | Vad | Frekvens |
|---|---|---|
| `data.md` | Nya tabellrader (Claude Code + Cowork) + daglig delta | Om avläsningen är ny |
| `index.html` | Förifyllda fält + veckotabell + datum | **Alltid** |
| `data_oversikt.md` | Sessions/Messages/Tokens | Valfritt vid Overview-avläsning |
| `Analyser/analys_YYYY-MM-DD_HHMM.md` | Ny analysfil | Varje rapport |

---

## Utgångspunkter & antaganden

- Cykeln börjar den 1:a varje månad (resets Sep 1 bekräftar detta)
- Veckobandet återställs varje torsdag ~08:00
- Boost-% läggs på normalbaslinjen (100 %) för normalbaslinje-%
- Overflow dras från promotional credit först (observerat mönster, ej officiellt bekräftat)
- Modellbyte noteras alltid och mäts mot daglig delta

---

## Uppdateringslogg

- **2026-08-06 (v1):** Skill skapad.
- **2026-08-06 (v2):** Lade till explicit index.html-regel + checklist + workflow + fält-tabell.
- **2026-08-06 (v3):** Lade till "Veckosammanställning dag för dag" som fast avsnitt #2 i varje analysfil, placerat direkt efter rubriken. Bakgrund: Kent vill ha den enkla dagliga euro-tabellen från index.html med i analysfilerna — den är lättare att förstå än procentberäkningarna.
