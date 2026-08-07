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

## Viktig regel: Veckotabellen uppdateras ALLTID, även intra-dag

Veckotabellen "Förbrukning senaste veckan" i index.html ska uppdateras vid **varje** avläsning, inte bara vid kväll-slutsumman. Om dagen inte är helt slut (t.ex. avläsning kl 15) markeras värdet som preliminärt med asterisk `*` och en notering i kommentar-kolumnen om tidpunkten (t.ex. "2,94 * — Preliminär lägesbild kl 15"). Vid nästa avläsning (t.ex. kväll kl 24) ersätts det preliminära värdet med slutsumman för dagen.

---

## Viktig regel: Takt-beräkningar (vecka och månad) ska räknas EXAKT som i js/berakning.js — inte fritt i analystexten

**Bakgrund (rättad 7 augusti 2026, i två steg):** Tidiga analysfiler (4–6 augusti) räknade "andel av veckan gången" fritt, utifrån en måndag–söndag-kalendervecka (t.ex. "torsdag = 4 av 7 dagar = 57,1 %"). Det var fel referenspunkt och gav en kraftigt missvisande takt-avvikelse. Verktyget (`js/berakning.js`, funktionen `CKB`) hade hela tiden räknat rätt — problemet fanns bara i de manuellt skrivna analystexterna, som inte följde samma formler eller tröskelvärden som koden. Regeln nedan gör att analysfilerna och verktyget alltid ger samma bedömning.

**Grundprincip:** Använd aldrig egna, fristående trösklar (t.ex. en självpåhittad "±5 procentenheter = i fas"-regel) i analysfilerna. Använd alltid exakt samma formler och gränsvärden som finns i `js/berakning.js`, refererade med funktionsnamn så att det går att spåra.

**Formler att använda (motsvarar `CKB`-funktionerna i `js/berakning.js`):**

1. **Andel av veckan gången** (`CKB.weekElapsedPct` / `CKB.nextWeeklyReset`): räkna från senaste torsdag kl 08:00 (inte måndag), inte till nästa. Hitta senaste torsdag 08:00 före eller vid avläsningstillfället, räkna timmar därifrån till avläsningen, dela med 168 (7 × 24 timmar) för procent.
2. **Andel av veckoransonen förbrukad:** använd `normalPct` — Vecka % normaliserad mot boost (`CKB.normalizePct(weekPct, boostPct)` = Vecka % × (1 + boost/100)) — **inte** rå "Vecka % mot aktiv/boostad gräns". Det är detta värde verktyget själv jämför mot tidsandelen.
3. **Andel av månaden gången** (`CKB.monthElapsedPct`): räknas från kalendermånadens start (cykeln börjar den 1:a, resets nästa 1:a bekräftar detta) — antal dagar gångna delat med totalt antal dagar i cykeln.
4. **Andel av månadsgränsen förbrukad:** spenderat € / månadsgräns € × 100.
5. **Takt-buffert** (`CKB.paceBuffer(andelTidGången, andelFörbrukad)`): **andel tid gången − andel förbrukad** (i den ordningen — notera tecknet: positiv buffert = du ligger före/under takt, vilket är bra).
6. **Nivå** (`CKB.paceLevel(buffer)`, samma tröskel för både vecka och månad):
   - buffert ≥ 0 → **ok** ("i fas eller före takt")
   - −10 ≤ buffert < 0 → **varning** ("något efter takt")
   - buffert < −10 → **fara** ("långt efter takt", samma tröskel som orsakade v8-bugfixen i PRD_tokenanvandning.md)

**Exempel (6 aug, kl 24:00):** Vecka: andel tid gången 9,5 %, normalPct 9 % → buffert +0,5 pp → **ok**. Månad: andel tid gången 19,3 %, förbrukat 89,9 % → buffert −70,6 pp → **fara**.

I analysfilen ska varje takt-uppgift (vecka och månad) redovisas med: (a) vilken formel/CKB-funktion som använts, (b) själva buffert-talet med korrekt tecken, (c) nivå enligt samma tre steg som ovan — aldrig en fristående verbal bedömning som inte går att härleda ur dessa steg.

**Obs — gäller inte veckotabellen:** Detta påverkar bara takt/pace-beräkningen i Förbrukningstakt → Veckovis/Månadsvis. Den separata "Veckosammanställning — förbrukning dag för dag"-tabellen (avsnitt 2 i analysfilen, samma som index.html:s "Förbrukning senaste veckan") fortsätter att visa måndag–söndag som vanliga kalenderdagar — det är bara en visuell logg över daglig EUR-förbrukning per veckodag, inte en takt-jämförelse, och ska INTE ändras.

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
| Veckotabell EUR-kolumn | **ALLTID uppdatera vid varje avläsning** — lägg in dagens delta från avläsningen (oavsett tid på dagen). Om dagen inte är slut, markera värdet med `*` och notera i kommentaren att det är preliminärt (t.ex. "2,94 * — Preliminär lägesbild kl 15"). Slutgiltig dagssumma loggas senare vid nästa avläsning (då ersätts värdet) |
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
| Torsdag  | 2,94 * | Preliminär lägesbild kl 15 (avläsningen slutför dagen senare) |
| Fredag   | –     | Ingen avläsning än |
| Lördag   | –     | Ingen avläsning än |
| Söndag   | –     | Ingen avläsning än |
| **Summa** | **44,87 €*** | *Summan inkluderar färdigt loggade dagar (tis–ons). Torsdag uppdateras när slutsumman är klar |
```

Tabellen speglar altid det aktuella läget i index.html, inklusive preliminära värden markerade med `*`. Kommentarerna ska vara korta och konkreta — ange vad som hände, inte vad som beräknades.

**Obs:** Denna tabell använder måndag–söndag som vanliga kalenderdagar och är bara en visuell logg över daglig EUR-förbrukning. Den ska INTE blandas ihop med takt-beräkningen i avsnitt 5, som räknas enligt CKB-formlerna (se regel ovan).

### 3. Bakgrund
Vad som är nytt sedan förra analysrapporten — policyändringar, modellbyten, boost-avslut, limit-justeringar.

### 4. Situationsbild
Tabell med alla aktuella mätvärden (session %, vecka %, normalbaslinje %, spent €, limit €, saldo, promo, auto-reload).

### 5. Förbrukningstakt
Daglig delta, takt-buffert och nivå (vecka och månad), jämförelse mot föregående dag. **Räknas alltid enligt CKB-formlerna i regeln ovan (`weekElapsedPct`/`monthElapsedPct` + `paceBuffer` + `paceLevel`, tröskel ok ≥0 / varning 0 till −10 / fara <−10) — aldrig en fristående verbal bedömning eller en egen tröskel.**

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

- Cykeln börjar den 1:a varje månad (resets Sep 1 bekräftar detta) — månadstakten räknas alltid från denna punkt, enligt `CKB.monthElapsedPct`
- Veckobandet återställs varje torsdag ~08:00 — detta är referenspunkten för takt-beräkningen i Förbrukningstakt → Veckovis (se separat regel ovan, `CKB.weekElapsedPct`), **inte** måndag–söndag
- Boost-% läggs på normalbaslinjen (100 %) för normalbaslinje-%
- Overflow dras från promotional credit först (observerat mönster, ej officiellt bekräftat)
- Modellbyte noteras alltid och mäts mot daglig delta

---

## Uppdateringslogg

- **2026-08-06 (v1):** Skill skapad.
- **2026-08-06 (v2):** Lade till explicit index.html-regel + checklist + workflow + fält-tabell.
- **2026-08-06 (v3):** Lade till "Veckosammanställning dag för dag" som fast avsnitt #2 i varje analysfil, placerat direkt efter rubriken. Bakgrund: Kent vill ha den enkla dagliga euro-tabellen från index.html med i analysfilerna — den är lättare att förstå än procentberäkningarna.
- **2026-08-06 (v4):** Lade till explicit regel att veckotabellen i index.html alltid uppdateras vid varje avläsning (oavsett tid på dagen), med asterisk `*` för preliminära intra-dag-värden. Detta ger Kent en real-time lägesbild per avläsning, inte bara slutsumma kl 24.
- **2026-08-07 (v5):** Rättade metodfel i takt-beräkningen för veckovis förbrukning. Tidigare analyser räknade "andel av veckan gången" från en måndag–söndag-kalendervecka, trots att veckans gräns faktiskt återställs torsdag ~08:00. Lade till en "Viktig regel"-sektion med beräkningsmetod.
- **2026-08-07 (v6):** Kent påpekade att beräkningsreglerna i analysfilerna måste vara identiska med formlerna i `js/berakning.js`, inte en egen fristående tolkning. Ersatte v5:s ad hoc-tröskel (±5 pp = "i fas") med exakt samma formler och gränsvärden som koden: `CKB.weekElapsedPct`/`CKB.monthElapsedPct` för tidsandel, `CKB.paceBuffer(andelTidGången, andelFörbrukad)` för buffert (obs tecken: positivt = bra), och `CKB.paceLevel` för nivå (ok ≥0 pp, varning 0 till −10 pp, fara <−10 pp — samma tröskel som v8-bugfixen i PRD_tokenanvandning.md). Förtydligade även att veckans "andel förbrukad" ska vara `normalPct` (boost-normaliserad), inte rå "Vecka % mot aktiv gräns", eftersom det är vad verktyget själv jämför mot.
- **2026-08-07 (v6, synk):** Denna OneDrive/GitHub-kopia var utdaterad (stannade vid v3) och synkades nu upp till v6 efter att Kent uppmärksammade avvikelsen mellan Claude-kontots skill-version och GitHub-kopian. Påminnelse: `save_skill`-verktyget uppdaterar bara Claude-kontots version — denna fil måste alltid manuellt hållas i synk (se kent-meta-regler, regel 4) och committas/pushas separat till GitHub av Kent.