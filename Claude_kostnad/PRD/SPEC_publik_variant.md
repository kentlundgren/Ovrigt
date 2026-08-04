# SPEC – Publik variant: bilduppladdning och OCR-tolkning

**Namn:** SPEC_publik_variant
**Plats:** `Claude_kostnad/PRD/SPEC_publik_variant.md`
**Baseras på:** `PRD_publik_variant.md` (fryst, v5, 2026-08-04)
**Skapad:** 2026-08-04
**Författad av:** Claude (per PRD:ns delfråga g — Kent granskar, skriver
inte innehållet själv)
**Status:** Granskad och godkänd av Kent (2026-08-04). Avsnitt 1 och 5
uppdaterade efter en fördjupad diskussion om delfråga d.1 (alternativ C —
endast formlerna delas, se PRD). Kodning kan påbörjas.

Det här dokumentet beskriver **exakt hur** leveransen ska byggas — indata,
utdata, gränsfall och tekniska val. **Varför** den byggs står redan i
`PRD_publik_variant.md` och upprepas inte här. Vid konflikt mellan de två
dokumenten gäller PRD:n för syfte/scope, den här specen för implementation.

---

## 1. Filer som skapas eller ändras

| Fil | Typ | Beskrivning |
|---|---|---|
| `Claude_kostnad/dela/index.html` | Ny | Den publika sidan. Egen HTML-struktur, egen disclaimer, egen rubrik. |
| `Claude_kostnad/js/berakning.js` | Ny (utbruten) | **Endast de rena formlerna** (se avsnitt 5, alternativ C, beslutad i PRD delfråga d.1) — inte hela `calc()`. DOM-inläsning/utskrift rörs inte. |
| `Claude_kostnad/index.html` | Ändrad (minimalt, riktat) | Endast de rader i `calc()` som idag innehåller inline-formler byts mot anrop till motsvarande funktion i `berakning.js`. All `getElementById`-inläsning, DOM-utskrift, tooltip- och kopiera-logik lämnas orörd. |
| `Claude_kostnad/dela/ocr.js` | Ny | OCR-anrop och fältmappning (avsnitt 3–4). Egen fil, inte inline i HTML, så den kan testas och läsas fristående. |
| `Claude_kostnad/README.md`, `Ovrigt/README.md`, `Ovrigt/index.html` | Ändrad | Länk till den nya sidan, enligt checklistan i `Ovrigt/CLAUDE.md`. Görs i produktionsordningens steg 7, inte del av denna spec. |

Ingen byggprocess, inget npm-paket att installera lokalt — Tesseract.js
laddas via CDN i `<script>`-taggen, samma mönster som resten av `Ovrigt`
(inga bundlers i något av de befintliga verktygen).

## 2. Bibliotek

```html
<script src="https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js"></script>
```

Verifierat 2026-08-04 (se Källor i `PRD_publik_variant.md`): ren
JavaScript-port, körs client-side via WebAssembly, ingen server. `Tesseract`
blir tillgängligt globalt efter inläsning. Språkpaket (`eng`) hämtas
automatiskt av biblioteket vid första `createWorker('eng')`-anropet — inga
extra filer att lägga i repot manuellt. Exakt API-signatur (worker-skapande,
`recognize()`-anrop) verifieras mot bibliotekets egen dokumentation vid
implementationstillfället, eftersom v5:s exakta API inte är fullt
verifierat i den här specen och inte ska gissas fram.

## 3. Dataflöde

1. Besökaren väljer eller drar en bildfil (`<input type="file"
   accept="image/*">`).
2. Filen läses in i minnet via `URL.createObjectURL()` (eller motsvarande) —
   **aldrig** `fetch`/`XMLHttpRequest` till någon server.
3. Bilden visas som förhandsgranskning, med en tydlig text: "Bilden skickas
   ingenstans — den analyseras i din egen webbläsare."
4. Tesseract.js körs på bilden, språk `eng` (skärmdumparna är på engelska,
   se `PRD_tokenanvandning.md`s bilder). Resultat: rå text.
5. Fältmappningen (avsnitt 4) tolkar den råa texten och fyller i
   inmatningsfälten — **samma fält som redan finns i dagens verktygs
   manuella formulär**, återanvänds rakt av, inte en ny fältuppsättning.
6. Besökaren ser alla förifyllda fält, rättar vid behov, och klickar en
   uttrycklig "Analysera"-knapp.
7. Vid klick körs `berakning.js` på fälten — identisk logik med dagens
   verktyg, inklusive takt-jämförelsen (obligatorisk, se PRD avsnitt 2).
8. `URL.revokeObjectURL()` anropas på bild-referensen så snart OCR:en är
   klar (lyckad eller misslyckad) — bilden hålls inte kvar i minnet längre
   än nödvändigt.

## 4. Fältmappning — vad OCR:en letar efter

Skärmdumpens layout kan variera (ljust/mörkt läge, beskuren bild, olika
zoomnivå), så mappningen bygger på **nyckelord i närheten av varje tal**,
inte på fasta positioner i texten.

| Fält | Sökmönster i OCR-texten (case-insensitive) | Exempel från Kents skärmdump |
|---|---|---|
| Session % | Ett procenttal (`\d{1,3}\s*%`) som står nära orden `current session` eller `session` | "Current session ... 7% used" → `7` |
| Vecka % | Ett procenttal nära `all models` eller `weekly` | "All models ... 66% used" → `66` |
| Boost aktiv? | Text som innehåller `boost`, `higher`, eller `%` tillsammans med `higher` | "Claude Code limit is 50% higher" → boost = 50, produkt = "Claude Code" |
| Boost-slutdatum | Ett datum (`\w+ \d{1,2}`, ev. med årtal) nära ordet `through` i samma mening som en boost-träff | "through August 19" → 19 augusti |
| Usage credits, spenderat | Ett belopp med valutasymbol (`€\s*\d+[.,]\d{2}` eller `\$\s*...`) nära ordet `spent` | "€6.13 spent" → `6.13` |
| Usage credits, gräns | Ett belopp nära `monthly spend limit` eller `limit` | "€20.00 ... Monthly spend limit" → `20.00` |
| Usage credits, återställningsdatum | Ett datum nära ordet `resets` | "Resets Sep 1" → 1 september |

**Princip vid flera träffar eller osäkerhet:** ta den första matchningen i
läsordning uppifrån och ned (skärmdumparna har alltid session högst upp,
sedan vecka, sedan usage credits — samma ordning som Anthropics eget UI,
verifierat mot Kents skärmdumpar i `Claude_kostnad/Bilder/`). Fyll i fältet
med det hittade värdet, men lägg **aldrig** till en falsk säkerhetskänsla —
se avsnitt 6 om UI-krav för hur osäkerhet visas.

**Regex-mönstren ovan är en startpunkt för implementationen, inte en
uttömmande, testad specifikation.** De ska förfinas och verifieras mot
verkliga OCR-utdata under byggfasen (produktionsordningens steg 5–6), inte
antas fungera perfekt vid första försöket.

## 5. Beräkningslogik (`berakning.js`) — alternativ C

Beslutad efter en separat avstämning med Kent under implementationen
(`PRD_publik_variant.md`, delfråga d.1): **endast de rena formlerna**
delas, inte hela `calc()`. Varje funktion tar emot rena tal/strängar
(inga DOM-referenser) och returnerar ett värde eller ett litet
resultatobjekt — inget läser eller skriver till DOM:et. Motsvarande rader
i dagens `Claude_kostnad/index.html` anges inom parentes, för spårbarhet
vid utbrytningen.

| Funktion | Signatur (ungefärlig) | Källa i dagens `index.html` |
|---|---|---|
| `normalizePct` | `(aktivPct, boostPct) => number` | rad 458: `weekPct * (1 + boostPct/100)` |
| `weekElapsedPct` | `(nu, resetDag, resetHH, resetMM) => number` | rad 386–393, 467–471 (`nextWeeklyReset` + omvandling till andel) |
| `monthElapsedPct` | `(resetDatumISO, nu) => number` | rad 562–568 (kalendermånads-antagandet, flaggat) |
| `paceBuffer` | `(andelTidGången, andelFörbrukad) => number` | rad 474, 572 (`pctTimeElapsed − normalPct` respektive `pctMonthElapsed − pct`) |
| `paceLevel` | `(buffer) => 'ok'\|'warn'\|'danger'` | rad 480–481, 576–577 — tröskeln **−10 procentenheter**, den exakta regel som orsakade v8-bugfixen i `PRD_tokenanvandning.md` |
| `sessionLevel` | `(sessPct) => 'ok'\|'warn'\|'danger'` | rad 421–428 (≥100 danger, ≥85 warn) |
| `weekLevel` | `(weekPct, normalPct, boostPct) => 'ok'\|'warn'\|'danger'` | rad 490–505 |
| `creditLevel` | `(spent, limit, pct) => 'ok'\|'warn'\|'danger'` | rad 587–596 |
| `coreVerdict` | `(sessOk, weekOk, creditOk, harData) => 'ok'\|'danger'\|'no-data'` | rad 613–630 — Kärnfrågan-bannerns sammanvägning, den andra delen av v8-bugfixen |
| `fmtPct`, `fmtEur` | `(n) => string` | rad 365–372 — redan rena idag |
| `todayISO`, `daysBetween` | — | rad 373–382 — redan rena idag |

**Förblir kvar, separat, i respektive sidas egen kod (inte i
`berakning.js`):** all `getElementById`-inläsning av fält, skrivning till
utdata-element (`setHero`, `setStatus`, textinnehåll), CSS-klasser på
hero/bar, `KNOWN_BOOSTS`-autofyllnaden vid produktbyte, tooltip-hantering
(`showTooltip`/`NOTES`), och "kopiera rad till data.md" (`updateLogRow`,
`copyBtn`) — den sistnämnda är dessutom inte relevant för `dela/index.html`
över huvud taget, eftersom publika besökare inte har en `data.md`.

Samma flaggade antagande om att usage credits-cykeln följer
kalendermånader (i `monthElapsedPct`) måste synas i den publika sidans UI,
inte bara i koden — en förstagångsbesökare känner inte till bakgrunden
(se PRD delfråga e).

**Verifieringskrav vid utbrytningen:** varje extraherad funktion ska ge
exakt samma resultat som motsvarande inline-uttryck gjorde innan, testat
mot samma kända kontrollvärden som redan verifierats i
`PRD_tokenanvandning.md` (55%×1,5-boost → 82,5%; gränsfallet 95%×1,5 →
142,5%). Detta är en ren utbrytning, ingen ny logik ska smygas in samtidigt.

## 6. UI-krav

- Disclaimer syns **innan** besökaren laddar upp något, inte bara i
  sidfoten: "Det här är inte ett officiellt Anthropic- eller
  Claude-verktyg. Bilden analyseras i din egen webbläsare och skickas
  aldrig någonstans."
- Alla fält (OCR-förifyllda eller tomma) visas som vanliga, redigerbara
  textfält/nummerfält — aldrig som skrivskyddad text.
- Ett fält som OCR:en inte kunde tolka lämnas **tomt**, inte gissat till
  0 eller något annat default-värde — 0% och "kunde inte läsas" är två
  olika saker och ska aldrig blandas ihop.
- En uttrycklig "Analysera"-knapp krävs — resultatet visas aldrig
  automatiskt bara för att OCR:en är klar.
- Om inget fält alls kunde fyllas i (t.ex. fel bildtyp, tom bild): visa ett
  neutralt meddelande ("Kunde inte läsa av bilden — fyll i talen manuellt
  nedan") och låt formuläret fungera precis som dagens manuella verktyg.
  Detta är inte ett felläge som ska blockera användaren, bara en
  degradering till samma upplevelse som Kents befintliga verktyg redan
  ger.

## 7. Gränsfall

| Situation | Förväntat beteende |
|---|---|
| Bilden är inte en skärmdump av Claude Usage-sidan (t.ex. ett foto av en katt) | OCR hittar ingen matchning → alla fält tomma, meddelande enligt avsnitt 6, inget krasch |
| Korrupt eller ej stödd filtyp | Felmeddelande direkt vid filval, ingen OCR-körning startas |
| OCR tar lång tid (stor bild, långsam enhet) | Visa en laddningsindikator; ingen hård timeout krävs i första versionen, men UI:t får inte låsa sig — testa på en realistisk mobiltelefon, inte bara desktop |
| Besökaren laddar upp flera bilder efter varandra | Varje ny uppladdning nollställer föregående OCR-resultat och frigör den gamla bild-referensen (`revokeObjectURL`) |
| Mörkt läge-skärmdump (ljus text på mörk bakgrund) | Ska fortfarande försöka tolkas av Tesseract.js; om träffsäkerheten visar sig dålig i test (steg 6 i produktionsordningen), notera det som en känd begränsning i README snarare än att bygga egen bildförbehandling (kontrastinvertering etc.) — det är utanför denna specs scope om det krävs |
| Boost saknas i bilden (ingen aktiv boost) | Boost-fälten lämnas tomma/0, precis som i dagens manuella verktyg när Kent inte har en aktiv boost |

## 8. Explicit utanför denna spec (se PRD, "Ingår inte")

- Riktig AI-bildanalys, Firebase/backend, bildförbehandling
  (kontrastjustering, beskärning, rotation) utöver vad Tesseract.js gör
  självt.
- Lagring av bilder, OCR-resultat eller besökares tal — varken i
  `localStorage`, en databas eller en logg.
- Stöd för andra språk än engelska i OCR-tolkningen (skärmdumparna som
  ligger till grund för mönstren i avsnitt 4 är alla engelska).

## 9. Acceptanskriterier

- [ ] Kents egna skärmdumpar i `Claude_kostnad/Bilder/` (minst
      `Claude_Code_usage_boosted_260803.jpg` och skärmdumpen från
      2026-08-04-konversationen) ger rimligt korrekt förifyllning av
      session/vecka/usage credits-fälten.
- [ ] En bild utan relevant text ger tomma fält och ett tydligt meddelande,
      inte ett krasch eller en tom vit sida.
- [ ] Ingen nätverksanropslogg (webbläsarens devtools → Network) visar
      någon uppladdning av bilden till en extern server.
- [ ] Samma numeriska resultat produceras av `dela/index.html` och
      `index.html` givet identiska indata — bekräftar att
      `berakning.js`-utbrytningen inte införde en regression.
- [ ] Disclaimer syns innan uppladdning påbörjas, testat i webbläsaren
      (inte bara läst i koden).

## Ändringslogg

- 2026-08-04 (v1): Skapad av Claude efter att Kent frusit
  `PRD_publik_variant.md` och uttryckligen bett Claude författa SPEC.md
  själv (delfråga g). Väntar på Kents granskning innan kodning.
- 2026-08-04 (v2): Godkänd av Kent utan ändringar ("blir bra, det du
  föreslog") — inklusive filnamnsvalet `SPEC_publik_variant.md`. Kodning
  påbörjas enligt produktionsordningens steg 5.
- 2026-08-04 (v3): Innan kodningen faktiskt startade upptäcktes att
  "delad JS-fil" i avsnitt 1 var otillräckligt precist — en fullständig
  refaktor av `index.html`s `calc()` visade sig vara en betydligt större
  ändring i ett redan testat, veckovis använt verktyg än formuleringen
  antydde. Diskuterat med Kent, som valde alternativ C (se
  `PRD_publik_variant.md` delfråga d.1): bara de rena formlerna delas.
  Avsnitt 1 (filtabellen) och avsnitt 5 (beräkningslogik) omskrivna med en
  exakt funktionslista, källrader i dagens `index.html` för spårbarhet,
  och ett uttryckligt verifieringskrav mot redan kända kontrollvärden.
