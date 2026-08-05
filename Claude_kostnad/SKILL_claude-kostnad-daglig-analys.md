---
name: "claude-kostnad-daglig-analys"
description: "Automatisk daglig analys av Claude-kostnader när Kent rapporterar usage. Triggas när Kent laddar upp en Usage-skärmdump eller manuellt rapporterar siffror (kumulativt €spent, session %, vecka %, balance etc.). Skillen uppdaterar data.md, data_oversikt.md, genererar en ny analysfil (analys_YYYY-MM-DD_HHMM.md) i Harvardformat, och presenterar en kort sammanfattning av vad som hände samt nästa steg."
---

# Automatisk analys: Claude-kostnader vid daglig rapportering

Denna skill triggas varje gång Kent rapporterar sin Claude-användning — antingen via skärmdump av Inställningar → Usage, eller genom att manuellt ange de aktuella siffrorna. Skillen gör följande **automatiskt**:

1. **Läser in avlästa siffror** från Kents rapport
2. **Uppdaterar data.md** — lägger till nya rader i både huvudtabellen och daglig-förbruknings-tabellen
3. **Uppdaterar data_oversikt.md** — om Sessions/Messages/Tokens/streaks-data rapporteras
4. **Genererar en ny analysfil** — `analys_YYYY-MM-DD_HHMM.md` med detaljerad Harvardformaterad analys
5. **Presenterar en kort sammanfattning** i chatten — vad som hände idag, hur vi står, nästa steg

---

## Hur skillen triggas

### Trigger 1: Skärmdump av Usage-sidan
Kent laddar upp en .png/.jpg av `Inställningar → Usage` i Claude.ai eller Cowork. Skillen:
- Läser skärmdumpen och extraherar de relevanta värdena
- Bekräftar värden med Kent innan de läggs in ("Jag läste av X %, Y €... stämmer det?")
- Uppdaterar alla loggar

### Trigger 2: Manuell rapportering
Kent skriver något i stil med:
- "Usage 5 aug kl 24: Session 0 %, Vecka 100 %, 51,00 € spenderat, 60,00 € limit..."
- Eller: "Rapport: 2026-08-06 kl 17 — 32 %, 89 %, 61,34 €..."

Skillen:
- Tolkar de inmatade värdena
- Bekräftar om någon siffra verkar märklig ("Vecka 89 % — låter låg jämfört med igår. Menar du 98 %?")
- Fyller i alla uppdateringar

### Trigger 3: Explicit anrop
Kent skriver: "analysera min usage från igår" eller "gör en kostnad-analys för 6 aug"
- Skillen hämtar den senaste raden från data.md
- Uppdaterar och genererar analys

---

## Vad skillen fyller i automatiskt

Allt nedan beräknas och fylls i automatiskt — Kent behöver bara rapportera två–tre källa-siffror:

### Från Usage-sidan (Inställningar → Usage i claude.ai)
Kent rapporterar **dessa** (direkt från sidan):
- Session % (återställs när?)
- Vecka % (motsvarar All models)
- Vecka-boost (Claude Code %, Cowork %)
- Boost-slutdatum
- Usage credits spenderat (€X)
- Balance (€X)
- Auto-reload (ON/OFF)
- Monthly spend limit (€X)

Skillen **beräknar** automatiskt:
- Vecka % (normalbaslinje) = avläst % × (1 + boost/100)
- Andel av veckan gången = (tid gången denna vecka) / (7 dagar)
- Takt-avvikelse vecka = normalbaslinje % − andel av veckan gången
- Takt-avvikelse månad = (€spent / €limit) − (dag / 31)
- Budget återstår = €limit − €spent
- Andel av cykeln gången (%) = (dag av cykel) / (31 dagar)
- Daglig delta = €spent idag − €spent igår (från tidigare avläsning)

### Från Usage/Overview-fliken (valfritt)
Om Kent rapporterar från Inställningar → Usage → Overview:
- Sessions
- Messages
- Total tokens
- Active days
- Current streak
- Longest streak
- Peak hour
- Favorite model

Skillen lägger detta i data_oversikt.md (separat tabell).

---

## Analysfil-formatet

Varje dag genereras en ny fil i mappen `Analyser/`: `Analyser/analys_YYYY-MM-DD_HHMM.md`

**Struktur** (samma som analys_2026-08-05_kl24.md):
1. **Rubrik + metadata** — Datum, tid, modeller aktiva
2. **Bakgrund** — Vad som är nytt sedan förra dagen
3. **Situationsbild** — Tabell med alla mätvärden
4. **Förbrukningstakt** — Daglig delta, trender, jämförelser
5. **Nya events/policy-ändringar** — Om spend-limit höjdes, auto-reload byttes, boost slutade osv.
6. **Prognoser** — Scenario A (oförändrad takt), Scenario B (med Haiku-bromsbyte), Scenario C (hybrid)
7. **Nyckeltal i korthet** — Tabell med de viktigaste värdena
8. **Slutsats & rekommendationer** — Vad Kents ska fokusera på nästa dag
9. **Källor** — Harvardformaterade referenser med verifierade länkar och notion

**Ton & språk:**
- Svenska
- Analytisk men mänsklig — undvik AI-jargong
- Harvardformat för alla externa références
- Konkreta actionable conclusions — inte bara konstateranden

---

## Utgångspunkter & antaganden

### Cykelstart
- Cykeln antas börja den 1:a varje månad
- Usage credits-siffran ("€X spent") är kumulativ från cykelstart
- Monthly spend limit är månadsgräns, inte vecka eller session

### Veckobandet
- Veckobandet återställs varje vecka (day of week: torsdag ~06:00–08:00 morgningstid)
- "Andel av veckan gången" beräknas som tid från veckostart → nu / 7 dagar
- Boost-%-värdena läggs på normalbaslinjen (100 %)

### Promo-credit & balance
- Tracking: Vilken del av balance som är promo-credit och vilken som är "egna köpta"
- Overflow: Vilken stack dras först när €spent går över limit (antagande: promo först)

### Modellbyte & taktförändringar
- Om Kent byter standardmodell — notera det och mät påverkan på efterföljande dagar
- Jämför daglig delta före/efter bytena

---

## Checklist innan analysgenering

Skillen kontrollerar alltid **innan** det fyller i:

- [ ] **Datum & tid är rimlig** — Är det samma dag eller senare än förra avläsningen?
- [ ] **Session % är mellan 0–100** — Om >100 eller värde verkar dublett, flagga
- [ ] **Vecka % är mellan 0–200 (med boost upp till +100%)** — Om högre, bekräfta
- [ ] **€ spent ökar eller är oförändrat** — Aldrig bakåt (om det händer: ny cykel? Refund?)
- [ ] **Usage credits < Monthly spend limit (eller bara lite över)** — Om mycket över sedan igår: auto-reload?
- [ ] **Balance minskar motsvarande € spent-ökningen** — Om inte: ny påfyllning eller redovisningsfel

Om något verkar konstigt — **stoppa, fråga Kent, uppdatera inte förrän han bekräftar.**

---

## Workflow i chatt

### Steg 1: Inmatning
Kent: "Här är usage från 6 aug kl 17 — [skärmdump eller siffror]"

### Steg 2: Tolkning & bekräftelse
Claude (skillen):
```
Jag läste av följande från skärmdumpen:
- Session: 24 %
- Vecka: 89 %
- Claude Code boost: +50 % (till 19 aug)
- Usage credits: €61,34 av €60,00 limit
- Balance: €56,10

Stämmer detta?
```

### Steg 3: Uppdatering
Om Kent bekräftar:
- Uppdatera data.md (två nya rader: Claude Code + Cowork)
- Beräkna alla härledda värden
- Uppdatera data_oversikt.md om nya sessions/messages-siffror rapporteras

### Steg 4: Analys-generering
Skillen genererar `analys_2026-08-06_1700.md` med:
- Situationsbild
- Förbrukningstrend (jämförelse mot igår, trend över veckan)
- Prognoser för återstoden av cykeln
- Rekommendation för nästa steg

### Steg 5: Presentation i chatt
Skillen presenterar en **kort sammanfattning** (5–10 rader):
```
## Dag 6 — Haiku-effekten på test

**Förbrukning idag:** €8,14 (jämfört mot €25,80 igår med Sonnet) 
→ **68 % minskning — Haiku-bytet fungerar!**

**Status nu:** €61,34 / €60,00 = 102 % av gränsen (redan överskridande)
**Takt-avvikelse:** +54,2 pp (blir bättre — var +68,9 igår)

**Veckobandet:** 89 % (reset idag kl 08:00 gav "andel av veckan" boost)
**Promo-credit kvar:** ~€18 (används för overflow)

**Nästa:** Se på dag 7 — om takten håller ~8 €/dag kan vi nå Scenario B.
```

---

## Filer som uppdateras

| Fil | Vad som uppdateras | Frekvens |
|---|---|---|
| `data.md` | Nytt tabellrader (Claude Code + Cowork) | Varje rapport |
| `data.md` → Daglig förbrukning | Delta €; anteckning | Varje rapport (kväll) |
| `data_oversikt.md` | Sessions/Messages/Tokens om rapporterade | Vartannat (vid Overview-avläsning) |
| `analys_YYYY-MM-DD_HHMM.md` | Ny fil per rapport | Varje rapport |
| `index.html` | "Förbrukning senaste veckan"-tabell | Varje dag vid kväll |

---

## Triggers och nyckelord

Skillen triggas automatiskt på:
- "usage" + "[datum]" + siffror (session %, vecka %, €)
- "Claude kostnad" + skärmdump
- "kostnad-rapport" eller "usage-rapport"
- "analysera min usage från [datum]"
- "här är min dagliga avläsning"

Undvik trigger på:
- Bara "vad är min usage?" (detta är en fråga, inte en rapport)
- Lösa samtal om kostnad (trigger bara om konkreta siffror ges)

---

## Uppdateringslogg

- **2026-08-06 (v1):** Skill skapad. Första version med full workflow.
- **2026-08-06:** Dokumentation uppdaterad efter initial analys av dag 5 kl 24.

---

## Länkade dokument

- [data.md](data.md) — Huvudloggen med kumulativ avläsningsdata
- [data_oversikt.md](data_oversikt.md) — Sessions/Messages/Tokens-data
- [index.html](index.html) — Interaktiv dashboard
- [analys_2026-08-05.md](analys_2026-08-05.md) — Första analys (kl 17)
- [analys_2026-08-05_kl24.md](analys_2026-08-05_kl24.md) — Uppdaterad analys (kl 24)
