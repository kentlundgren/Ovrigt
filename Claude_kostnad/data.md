# Data – manuellt förd logg över Claude-förbrukning

Se [PRD_tokenanvandning.md](PRD/PRD_tokenanvandning.md) för bakgrund och
beslut (särskilt delfråga d, h och i). En rad per avläsning. Läs av
Inställningar → Usage (session, vecka, ev. boost) och Inställningar →
Usage/Billing (usage credits denna cykel) i claude.ai, mata in här —
eller använd "Kopiera rad"-knappen i [index.html](index.html) och klistra
in raden nedan.

Kolumnen **Vecka % (normalbaslinje)** är den viktiga när en boost är aktiv
— den visar var du står mot ditt *normala* abonnemang, inte mot den
tillfälligt höjda gränsen. Formel: `avläst % × (1 + boost % / 100)`.

Kolumnerna **Andel av veckan gången** och **Takt-avvikelse** visar om du
ligger i fas *över tid*, inte bara just nu: andel av veckan gången jämförs
med Vecka % (normalbaslinje) — om de är lika ligger du precis i fas.
Takt-avvikelse = normalbaslinje % − andel av veckan gången, i
procentenheter. Positivt tal = du ligger över linjär takt (förbrukar
snabbare än tiden går), negativt = du ligger under (marginal kvar).

**Usage credits denna cykel** kommer från Usage-sidans "€X spent, resets
[datum]" — *inte* från fakturorna på Billing-sidan (de är påfyllningar,
inte förbrukning, se delfråga i).

Samma takt-jämförelse görs för månaden: **Andel av månaden gången** och
**Takt-avvikelse (månad)**, samma tecken-konvention (positivt = över
takt). Bygger på ett **antagande** att usage credits-cykeln följer
kalendermånader (1:a till 1:a) — inte bekräftat av Anthropic, se
`index.html`.

| Datum | Session % (just nu) | Vecka-produkt | Vecka % (mot aktiv gräns) | Aktiv boost % | Boost slutdatum | Vecka % (normalbaslinje) | Andel av veckan gången (%) | Takt-avvikelse vecka (pp) | Usage credits denna cykel (€) | Usage credits-gräns (€) | Andel av månaden gången (%) | Takt-avvikelse månad (pp) | Anteckning |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-08-04 | 68 | Claude Code | 59 | 50 | 2026-08-19 | 88,5 | 67 | 21,5 | 6,13 | 20 | 9,7 | 20,9 | Första loggade avläsningen. Session/månad delas mellan produkter — bara vecko-fälten skiljer mellan denna rad och Cowork-raden nedan. |
| 2026-08-04 | 68 | Cowork | 59 | 100 | 2026-08-05 | 118 | 67 | 51 | 6,13 | 20 | 9,7 | 20,9 | Samma avläsningstillfälle som raden ovan, men räknat mot Coworks +100%-boost — se osäkerheten i index.html om "All models" verkligen gäller Cowork också. |
| 2026-08-04 | 7 | Claude Code | 66 | 50 | 2026-08-19 | 99 | 73,7 | 25,3 | 6,13 | 20 | 11,3 | 19,4 | Andra loggade avläsningen, samma dag. Session lägre pga 5-timmarsreset sedan förra avläsningen (inte jämförbart som "mindre använt"). Vecka: normalbaslinje upp från 88,5 % till 99 % (+10,5 pp), takt-avvikelsen försämrad från 21,5 till 25,3 pp. Usage credits oförändrat (6,13 €) — ingen ytterligare överanvändning. Jämförd mot dela/index.html-analysen i samma konversation: identiskt resultat (skillnad på 0,1 pp i "andel av tiden gången" pga någon minuts tidsskillnad mellan de två avläsningarna). |
| 2026-08-04 | 7 | Cowork | 66 | 100 | 2026-08-05 | 132 | 73,7 | 58,3 | 6,13 | 20 | 11,3 | 19,4 | Samma avläsningstillfälle som raden ovan, men räknat mot Coworks +100%-boost (fortfarande aktiv till och med 5 augusti) — se osäkerheten i index.html om "All models" verkligen gäller Cowork också. |
| 2026-08-04 | 7 | Claude Code | 76 | 50 | 2026-08-19 | 114 | 74,9 | 39,1 | 11,13 | 20 | 11,5 | 44,1 | **Tredje loggade avläsningen, samma dag — beskuren skärmdump (bara "nedre delen": vecka + usage credits, ingen session/boost-notis synlig).** Boost-% här är **oförändrad från förra avläsningen, inte ombekräftad i denna bild** — flaggat, inte verifierat. Vecka nu över normal 100%-baslinje (114 %) för första gången. Usage credits nästan fördubblat: 6,13 € → 11,13 € (55,7 % av månadsgränsen, dag ~4 av 31 i cykeln) — takt-avvikelse månad försämrad kraftigt, 19,4 → 44,1 pp över takt. |
| 2026-08-04 | 7 | Cowork | 76 | 100 | 2026-08-05 | 152 | 74,9 | 77,1 | 11,13 | 20 | 11,5 | 44,1 | Samma avläsningstillfälle som raden ovan, räknat mot Coworks +100%-boost (sista dagen den gäller, till och med 5 augusti) — samma boost-osäkerhet som ovan. |
| 2026-08-04 | 100 | Claude Code | 76 | 50 | 2026-08-19 | 114 | 75 | 39 | 15,17 | 25 | 11,6 | 49,1 | **Fjärde loggade avläsningen, samma dag.** Boost nu **bekräftad** oförändrad (50 %/Claude Code till 19 aug, 100 %/Cowork till 5 aug — synlig i denna bild). **Session: 100 % — sessionsgränsen helt nådd**, "Resets in 4 min". Detta är den konkreta bekräftelsen på att överanvändning nu faktiskt sker: usage credits gick från 11,13 € → 15,17 € (+4,04 €) på kort tid, samtidigt som saldot (104,75 → 99,75 → 95,71 €) och promotional credit (64,54 → 59,54 → 55,50 €) minskade med exakt samma 4,04 € — bekräftar att det är den automatiska overflow-mekanismen som drar ner saldot, inte en redovisningsavvikelse. **Kent höjde samtidigt sin Monthly spend limit från 20 € till 25 €** (syns som ändrad gräns i denna avläsning) efter att ha förväxlat den med sin fasta Pro-abonnemangsavgift (~22,50 €, en helt separat post på Billing-sidan) — se förtydligandet i `claude-kostnad`-skillen. Andelen (61 %) ser lägre ut än föregående rad (55,7 %) enbart för att nämnaren ändrades, inte för att läget förbättrats — takt-avvikelsen försämrades i själva verket vidare, från 44,1 till 49,1 pp. |
| 2026-08-04 | 100 | Cowork | 76 | 100 | 2026-08-05 | 152 | 75,1 | 76,9 | 15,17 | 25 | 11,6 | 49,1 | Samma avläsningstillfälle som raden ovan, räknat mot Coworks +100%-boost (sista dagen den gäller) — samma "All models"-osäkerhet som tidigare rader. |
| 2026-08-04 | 100 | Claude Code | 79 | 50 | 2026-08-19 | 118,5 | 75,9 | 42,6 | 15,17 | 25 | 11,8 | 48,9 | **Femte loggade avläsningen, samma dag.** Vecka upp 76→79 % (118,5 % av normalbaslinjen). Usage credits **oförändrat** (15,17 €/95,71 €/55,50 €) — inget tecken på nytt köp, se Historisk kontext nedan för avstämningen mot Billing → Invoices (april) och saldo-matchningen (augusti). |
| 2026-08-04 | 32 | Claude Code | 89 | 50 | 2026-08-19 | 133,5 | 81 | 52,5 | 25,20 | 25 | 12,9 | 87,9 | **Sjätte loggade avläsningen — kl 24, gränsen mellan tisdag och onsdag (Kents egen tidsstämpel).** Session lägre (32 %) pga nytt 5-timmarsreset. Vecka fortsatt uppåt: 79→89 % av aktiv gräns, 133,5 % av normalbaslinjen. **Usage credits passerade för första gången 100 % av månadsgränsen** (25,20 €/25,00 € = 101 %, jämfört med screenshotens avrundning). Balance 95,71→85,69 € (−10,02) och promotional credit 55,50→45,48 € (−10,02) minskade med i princip exakt samma belopp som spent ökade (+10,03) — "egna köpta credits" (balance−promo) ligger fortsatt dödstilla på 40,21 €, samma mönster som föregående avläsningar: hela overflow-uttaget dras alltjämt från promotional-delen. |
| 2026-08-04 | 32 | Cowork | 89 | 100 | 2026-08-05 | 178 | 81 | 97 | 25,20 | 25 | 12,9 | 87,9 | Samma avläsningstillfälle som raden ovan, räknat mot Coworks +100%-boost — sista dagen den anges gälla (5 augusti), se osäkerheten i index.html om "All models" verkligen gäller Cowork också. |
| 2026-08-05 kl 17 | 24 | Claude Code | 100 | 50 | 2026-08-19 | 150 | 91,4 | +58,6 | 42,89 | 50 | 15,2 | +70,6 | **Avläsning kl 17, 5 aug** (preliminär — inte kväll). Vecka 100% nådd (återst. ca 07:25 den 6 aug). Normalbaslinje 150 % (50%-boost bekräftad). Andel av veckan gången ≈ 91,4 % (168 h − 14 h 25 min kvar). Takt-avvikelse vecka +58,6 pp. Usage credits 42,89/50 = 85,78%, dag 5,7 av 31 ≈ 15,2 %, takt-avvikelse månad +70,6 pp. Balance 67,99 €; promo-credit 27,78 € (exp. 19 sep). Auto-reload ON (nytt sedan gårdagen). Cowork-boost 100% slutar idag. Kent nedgraderade till Haiku 4.5 — se analys_2026-08-05.md. |
| 2026-08-05 kl 17 | 24 | Cowork | 100 | 0 | 2026-08-05 (slutar idag) | 100 | 91,4 | +8,6 | 42,89 | 50 | 15,2 | +70,6 | Samma avläsning som raden ovan. Cowork-boostens sista dag — från och med 6 aug återgår Cowork till normal gräns (0 % boost). Vecka-normalbaslinje = 100 % (boost noll eller avslutad). |
| 2026-08-05 kl 24 | 0 | Claude Code | 100 | 50 | 2026-08-19 | 150 | 95,2 | +54,8 | 51,00 | 60 | 16,1 | +68,9 | **Slutgiltig kvällsavläsning kl 24, 5 aug.** Session 0 % — precis återställt. Vecka 100 % (återst. 8 h 2 min → reset ca 08:00 den 6 aug). Normalbaslinje 150 % (50%-boost bekräftad). Takt-avvikelse vecka +54,8 pp. **Monthly spend limit höjd: 50 € → 60 €** (nytt sedan kl-17-avläsningen). Usage credits 51,00/60 = 85,0 %, dag 5 av 31 ≈ 16,1 %, takt-avvikelse månad +68,9 pp. Balance 59,88 €; promo-credit 19,67 € (exp. 19 sep 2026) — promo minskat med exakt 8,11 € sedan kl 17 (42,89→51,00 = +8,11 €), allt overflow dras fortfarande från promo. **Auto-reload ändrat tillbaka till OFF** (var ON vid kl-17-avläsningen). Egna köpta credits 59,88−19,67 = 40,21 € — oförändrat. |
| 2026-08-05 kl 24 | 0 | Cowork | 100 | 0 | 2026-08-05 (avslutad) | 100 | 95,2 | +4,8 | 51,00 | 60 | 16,1 | +68,9 | Samma avläsning som raden ovan. Sista mätningen med Cowork-boost — från och med 6 aug gäller normal gräns (0 % boost). Normalbaslinje = 100 %. |
| 2026-08-06 kl 15 | 10 | Claude Code | 4 | 50 | 2026-08-19 | 6 | 35,7 | −29,7 | 53,94 | 60 | 16,3 | +73,8 | **Avläsning kl 15, 6 aug** — förstagången efter vecko-reset vid ~08:00. Vecka återställd till 4 %, boost fortfarande aktiv (50 % Claude Code, gäller till 19 aug). Normalbaslinje 6 % (väl under takt ännu — bara ~36% av veckan gången). Takt-avvikelse vecka −29,7 pp (ligger under linjär förbrukning, vilket är bra). Usage credits 53,94 €, motsvarar 89,9% av 60 €-gränsen — redan långt över normal takt för månaden. Takt-avvikelse månad +73,8 pp (redan ~16% in i cykeln, men förbrukat nästan 90% av månadsgränsen). Balance 56,95 €, promo-credit 16,74 € (utgår 19 sep). Auto-reload OFF. |
| 2026-08-06 kl 15 | 10 | Cowork | 4 | 0 | 2026-08-05 (avslutad) | 4 | 35,7 | −64,3 | 53,94 | 60 | 16,3 | +73,8 | Samma avläsning som raden ovan, räknat mot Coworks gräns (boost avslutad, så 0 % boost). Normalbaslinje = 4 %. Takt-avvikelse vecka −64,3 pp — väldigt långt under takt. |
| 2026-08-06 kl 24 | 2 | Claude Code | 6 | 50 | 2026-08-19 | 9 | 57,1 | −48,1 | 53,94 | 60 | 19,3 | +70,6 | **Slutgiltig kvällsavläsning kl 24, 6 aug.** Session 2% — återställt tidigare under dagen vid vecko-reset ~08:00. Vecka 6% (återst. ca 1h 59min kvar → reset ca 08:00 den 7 aug). Normalbaslinje 9% (50%-boost fortsätter till 19 aug). Takt-avvikelse vecka −48,1 pp (långt under linjär förbrukning — bra utveckling från förra dagen). Usage credits 53,94/60 = 89,9%, dag 6 av 31 ≈ 19,3%, takt-avvikelse månad +70,6 pp (fortfarande långt över takt för månaden; kritisk situation kvar). Balance 56,95 €; promo-credit 16,74 € (exp. 19 sep 2026) — oförändrat sedan kl 15 (ingen ny överförbrukning mellan kl 15 och kl 24, trots att Kent använt Claude och veckan ökade från 4% till 6%). Egna köpta credits 40,21 € — oförändrat. Auto-reload OFF. |
| 2026-08-06 kl 24 | 2 | Cowork | 6 | 0 | 2026-08-05 (avslutad) | 6 | 57,1 | −51,1 | 53,94 | 60 | 19,3 | +70,6 | Samma avläsning som raden ovan, räknat mot Coworks gräns (boost avslutad helt sedan 5 aug, så 0 % boost). Normalbaslinje = 6 %. Takt-avvikelse vecka −51,1 pp. |
| 2026-08-09 kl 24 | 0 | Claude Code | – | 50 | 2026-08-19 | – | – | – | 53,94 | 60 | – | – | **Avläsning kl 24, 9 aug (helgavläsning efter två arbetsfria dagar).** Kent arbetade inte på lördag 8 aug eller söndag 9 aug — ingen avläsning skickades in dessa dagar. Denna skärmdump från slutet av 9 aug visar att spent förblev oförändrat (53,94 €, samma som 6 aug), vilket bekräftar noll förbrukning under perioden 7–9 aug. Vecka och månad-korten är tomma (–) eftersom ingen aktuell avläsning gjordes dessa dagars slut — endast usage credits-värdet är bekräftat från denna ögonblicksbild. Session 0 % (återställt tidigare denna dag vid vecko-reset). |
| 2026-08-09 kl 24 | 0 | Cowork | – | 0 | 2026-08-05 (avslutad) | – | – | – | 53,94 | 60 | – | – | Samma avläsning som raden ovan, räknad för Cowork (boost avslutad helt sedan 5 aug). Vecka och månad-värden saknas — endast spent-bekräftelse från denna ögonblicksbild. |
| 2026-08-10 kl 14 | 8 | Claude Code | 10 | 50 | 2026-08-19 | 15 | 3,6 | +11,4 | 53,94 | 60 | 32,3 | +57,6 | **Avläsning kl 14, 10 aug (måndagsmorgon).** Session 8% — återställs senare denna vecka. Vecka 10% (återst. ~08:00 den 17 aug). Normalbaslinje 15% (50%-boost bekräftad fortsatt aktiv). Takt-avvikelse vecka +11,4 pp — mycket låg förbrukning ännu (bara ~3,6% av veckan gången, men redan 15% förbrukad av normal budget). Usage credits 53,94/60 = 89,9% — fortsatt kritisk situation. Dag 10 av ~31 (32,3% in i cykeln), men redan förbrukat 90% av månadsgränsen. Takt-avvikelse månad +57,6 pp (samma kritiska läge som 6 aug trots tre arbetsfria dagar). Balance och promo-credit förväntas oförändrade (56,95 € och 16,74 €). Auto-reload OFF. |
| 2026-08-10 kl 14 | 8 | Cowork | 10 | 0 | 2026-08-05 (avslutad) | 10 | 3,6 | +6,4 | 53,94 | 60 | 32,3 | +57,6 | Samma avläsning som raden ovan, räknat mot Coworks gräns (boost avslutad helt sedan 5 aug, så 0% boost). Vecka-normalbaslinje = 10% (ingen boost att omräkna). Takt-avvikelse vecka +6,4 pp. |
| 2026-08-13 kl 13 | 4 | Claude Code | 1 | 50 | 2026-08-19 | 1,5 | 3,0 | −1,5 | 53,94 | 60 | 40,5 | +49,4 | **Avläsning kl 13, 13 aug (torsdag).** Skärmdumpen visade bara "All models" (ingen produktuppdelning) — tolkat som Claude Code + Cowork-rader enligt etablerat mönster. Vecka precis återställd i morse (~07:59), bara 1% förbrukat på ~5h — normalbaslinje 1,5% (50%-boost fortsatt aktiv till 19 aug), gott om marginal (−1,5 pp). **Nyckelfynd: usage credits (53,94 €), balance (56,95 €) och promo-credit (16,74 €) är exakt oförändrade sedan 6 aug kl 24** — noll ny overflow-förbrukning sju dagar i rad (7–13 aug). Takt-avvikelse månad fortsatt över takt (+49,4 pp) men förbättras dag för dag eftersom nämnaren (andel av cykeln gången) växer utan att täljaren gör det. |
| 2026-08-13 kl 13 | 4 | Cowork | 1 | 0 | 2026-08-05 (avslutad) | 1 | 3,0 | −2,0 | 53,94 | 60 | 40,5 | +49,4 | Samma avläsning som raden ovan, räknat mot Coworks gräns (boost avslutad sedan 5 aug, 0% boost). Normalbaslinje = 1%. Takt-avvikelse vecka −2,0 pp. |

## Historisk kontext (frivilligt, ej del av mätningen)

Utrymme för att notera ovanliga fakturor/påfyllningar från Billing-sidan,
t.ex. perioder med ovanligt hög förbrukning. Rent informativt — påverkar
inte tabellen ovan.

- 2026-04: Ovanligt hög påfyllning av usage credits, **91,56 €** utöver den
  ordinarie abonnemangsavgiften (22,50 €, betald separat 27 apr) — nu
  itemiserat mot fakturalistan (2026-08-04, efter att Kent skickade en
  skärmdump av Billing → Invoices): 10 apr ×2 á 12,50 € (25,00 €), 13 apr
  6,25 €, 27 apr 47,81 €, 28 apr 12,50 €. Summa 25,00+6,25+47,81+12,50 =
  91,56 €. Kent hade själv först räknat till 66,56 € (missade de två
  12,50 €-fakturorna från 10 april) — rättat efter avstämning mot den
  fullständiga fakturalistan. Tecken på att plangränserna nåddes ofta den
  månaden.
- 2026-08 (hittills): Inget tecken på nytt köp utöver ordinarie
  abonnemangsavgift. "€15,17 spent" oförändrat mellan två avläsningar
  samma dag, och saldot har minskat med exakt lika mycket som "spent"
  ökat sedan cykelns första avläsning (104,75 € → 95,71 €, −9,04 €; spent
  6,13 € → 15,17 €, +9,04 €) — ett rent avdrag från befintligt saldo, inte
  ett nytt köp. Auto-reload avstängt (Off), vilket utesluter automatisk
  ny fakturering vid lågt saldo. Obekräftat mot Billing → Invoices för
  augusti specifikt (bara Usage-sidan avläst) — kolla där för att vara
  helt säker.

## Daglig förbrukning (usage credits, €) — kvällsrutin

Startad 2026-08-04, på Kents begäran, för att få bättre grepp om
förbrukningstakten dag för dag. **Mäter usage credits-överförbrukning i
euro, inte råa tokens** — det är den enda datan verktyget har tillgång
till (se `PRD_tokenanvandning.md`, delfråga a). Rutin: Kent skickar en
skärmdump av Usage-sidan innan han går och lägger sig, samma sätt som
han redan gör. Claude läser av det kumulativa "€X spent"-talet och
räknar ut dagens mellanskillnad mot föregående kvälls avläsning.
`index.html` har en motsvarande tabell ("Förbrukning senaste veckan",
Måndag–Söndag) som Claude uppdaterar manuellt varje kväll utifrån den
här loggen — sidan är stateless och kan inte hålla egen historik.

**Undantag för första dagen:** 2026-08-04 fanns ingen föregående kvälls
avläsning att jämföra mot, så dagens "delta" (9,04 €) är i stället
räknat mellan dagens första och senaste avläsning (6,13 € → 15,17 €),
inte kväll-till-kväll. Från och med 2026-08-05 räknas deltat alltid
kväll-till-kväll.

| Datum | Veckodag | Kumulativt spenderat denna cykel (€) | Daglig förbrukning (€) | Anteckning |
|---|---|---|---|---|
| 2026-08-04 | Tisdag | 25,20 | 19,07 | **Slutgiltig dagssumma** — uppdaterad efter en kl 24-avläsning som avslutar dygnet. Ersätter den tidigare preliminära raden (15,17 €/9,04 €, mitt på dagen). Hela dygnets delta: dagens första avläsning (6,13 €) → sista (25,20 €) = 19,07 €. Från och med 2026-08-05 räknas deltat kväll-till-kväll mot denna slutsumma, enligt rutinen. |
| 2026-08-05 | Onsdag | 51,00 | 25,80 | **Slutgiltig dagssumma** — uppdaterad efter kl 24-avläsningen. Delta 25,20 € → 51,00 € = +25,80 €. Varav kl 00–17: +17,69 € (Haiku 4.5 från byte under förmiddagen), kl 17–24: +8,11 € (fortsatt Haiku/blandning). Hela tillskottet dras från promo-credit (45,48 € → 19,67 €, −25,81 € inkl. avrundning). Egna köpta credits orörda (40,21 €). Kent höjde monthly spend limit 50 € → 60 € under kvällen. Auto-reload, som sattes ON under dagen, ändrades tillbaka till OFF vid kvällsavläsningen. Cowork +100%-boost avslutades vid midnatt. |
| 2026-08-06 | Torsdag | 53,94 | 2,94 | **Slutgiltig dagssumma** — uppdaterad efter kl 24-avläsningen. Delta 51,00 € → 53,94 € = +2,94 €. Mycket låg förbrukning jämfört med föregående dag, tyder på att Haiku-optimering fungerar väl. Veckan återställdes under dagen (~kl 08:00), session återställdes flera gånger (5h-reset). Från kl 15 till kl 24 användes Claude utan att överskrida plangränser (vecka ökade 4%→6%, men € spent oförändrat 53,94 €). Saldo och promo-credit oförändrat (56,95 € och 16,74 € respektive). Auto-reload OFF. Takt-avvikelse månad fortsatt kritisk på +70,6 pp. |
| 2026-08-09 | Fredag–Söndag | 53,94 | 0 | **Helgavläsning, 7–9 aug.** Kent arbetade inte på lördag 8 aug och söndag 9 aug. Denna skärmdump från slutet av söndag visar att spent förblev oförändrat (53,94 €) över hela perioden, ett noll-delta på tre dagar. Fredag 7 aug: ingen avläsning inrapporterad (okänt arbete denna dag). Lördag 8 aug: ingen avläsning (Kent arbetade inte, satt inte vid datorn). Söndag 9 aug: denna avläsning från kl 24 bekräftar noll förbrukning. Uppdateringshistorik: saldo och promo-credit förväntas oförändrade (56,95 € och 16,74 € från 6 aug, all overflow-begränsning redan använd fram till 19 aug pga +50% boost på vecko-gränsen). |
| 2026-08-10 till 2026-08-13 | Måndag–Torsdag (hittills) | 53,94 | 0 | **Ingen daglig avläsning rapporterad 10–12 aug** — Kent bad uttryckligen att förbrukningen sedan senaste loggade raden (9 aug, 53,94 €) delas jämnt mellan de dagar som gått. Ny avläsning 13 aug kl 13 visar spent fortsatt exakt 53,94 € — totaldeltat över hela perioden (10–13 aug) är alltså 0 €, så en jämn fördelning ger 0 €/dag oavsett metod. Torsdag 13 aug är en pågående dag (avläsning kl 13, inte en kl 24-slutsumma) — inget tyder på förändring senare samma dag, men markerad som pågående. Sju dagar i rad (7–13 aug) utan någon overflow-förbrukning alls. |
