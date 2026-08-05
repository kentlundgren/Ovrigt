---
name: "kostnad-daglig-analys"
description: "Automatisk daglig analys av kostnader när Kent rapporterar usage via skärmdump eller manuell inmatning. Uppdaterar data.md, genererar analysfil i Harvardformat i Analyser-mappen, och presenterar kostnadstrend med prognoser."
---

# Automatisk analys: Kostnader vid daglig rapportering

Denna skill triggas varje gång Kent rapporterar sin usage — antingen via skärmdump av Inställningar → Usage, eller genom att manuellt ange de aktuella siffrorna. Skillen gör följande **automatiskt**:

1. **Läser in avlästa siffror** från Kents rapport
2. **Uppdaterar data.md** — lägger till nya rader i både huvudtabellen och daglig-förbruknings-tabellen
3. **Uppdaterar data_oversikt.md** — om Sessions/Messages/Tokens/streaks-data rapporteras
4. **Genererar en ny analysfil i Analyser-mappen** — `Analyser/analys_YYYY-MM-DD_HHMM.md` med detaljerad Harvardformaterad analys
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

### Från Usage-sidan (Inställningar → Usage)
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
- Sessions, Messages, Total tokens, Active days, Current streak, Longest streak, Peak hour, Favorite model

Skillen lägger detta i data_oversikt.md.

---

## Analysfil-formatet

Varje dag genereras en ny fil i mappen **Analyser/**: `Analyser/analys_YYYY-MM-DD_HHMM.md`

**Struktur**:
1. Rubrik + metadata — Datum, tid, modeller aktiva
2. Bakgrund — Vad som är nytt sedan förra dagen
3. Situationsbild — Tabell med alla mätvärden
4. Förbrukningstakt — Daglig delta, trender, jämförelser
5. Nya events/policy-ändringar — Om spend-limit höjdes, auto-reload byttes, boost slutade osv.
6. Prognoser — Scenario A (oförändrad takt), Scenario B (med optimering), Scenario C (hybrid)
7. Nyckeltal i korthet — Tabell med de viktigaste värdena
8. Slutsats & rekommendationer — Vad Kent ska fokusera på nästa dag
9. Källor — Harvardformaterade referenser med verifierade länkar och notion

Ton: Svenska, analytisk men mänsklig, Harvardformat för alla externa referenser, konkreta actionable conclusions.

---

## Filer som uppdateras

| Fil | Vad | Frekvens |
|---|---|---|
| `data.md` | Nya tabellrader | Varje rapport |
| `data_oversikt.md` | Sessions/Messages/Tokens | Valfritt vid Overview-avläsning |
| `Analyser/analys_YYYY-MM-DD_HHMM.md` | Ny analysfil | Varje rapport |
| `index.html` | "Förbrukning senaste veckan"-tabell | Varje dag vid kväll |

---

## Triggers

Skillen triggas på:
- "usage" + datum + siffror
- Skärmdump av Usage-sidan
- "analysera min usage från [datum]"
- "kostnad-rapport"

Triggas **inte** på lösa kostnadssamtal utan konkreta siffror.

---

## Uppdateringslogg

- **2026-08-06 (v1):** Skill skapad. Sparad i AppData och synkad till `Skills/kostnad-daglig-analys/SKILL.md` på OneDrive.
