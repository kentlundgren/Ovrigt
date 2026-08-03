# PRD – Tokenanvändning vs. Pro-abonnemangets gränser

**Namn:** PRD_tokenanvandning
**Plats:** `Claude_kostnad/PRD/PRD_tokenanvandning.md`
**Skapad:** 2026-08-03
**Version:** 4 (ny delfråga i tillagd: faktura/påfyllning vs. faktisk
förbrukning av usage credits)
**Status:** Alla delfrågor beslutade, inklusive de två nytillkomna (h om
boostar, i om faktura vs. förbrukning). En fräscha-ögon-genomläsning
(Regel 7) återstår innan PRD:n kan frysas.
**Typ:** Grund-PRD — helt nytt, fristående projekt i `Ovrigt`-repot. Följer
strukturen i [PRD_generell.md](https://github.com/kentlundgren/AI-teknik/blob/main/AI_modeller/Claude/olika_Claude_modeller/PRD/PRD_generell.md)
(AI-teknik-repot, Claude-kompassens PRD-mall) men bygger inte vidare på
kompassen själv.

## 1. Bakgrund

Kent har svårt att i huvudet bedöma om han "ligger i fas" med sitt
Pro-abonnemang — hur mycket han förbrukat senaste dygnet/veckan/månaden, och
hur mycket som är kvar innan nästa återställning. Underlaget är tre
skärmdumpar i `Claude_kostnad/Bilder/`:

- `Claude_Code_ingang.jpg` — Claude Codes egen översikt (sessions,
  meddelanden, totala tokens, aktiva dagar, streak, peak hour).
- `Claude_Code_usage_260803.jpg` — Inställningar → Usage: tre separata
  mätare (Current session, Weekly limits, Usage credits), var och en med
  egen återställningscykel och egen procentsats.
- `Claude_Code_billing_260803.jpg` — Inställningar → Billing: Pro-plan,
  förnyelsedatum, saldo för usage credits, fakturahistorik.

**Tillägg 2026-08-03:** en fjärde bild, `Claude_Code_usage_boosted_260803.jpg`,
visar att veckogränsen inte alltid är den normala 100%-gränsen. En notis i
Usage-vyn ("Your limits are temporarily boosted") anger att Claude Code:s
veckogräns tillfälligt är 50% högre till och med 19 augusti, och Coworks
veckogräns 100% högre till och med 5 augusti — och att gränsen återgår till
det normala när respektive kampanj upphör. Det procenttal Anthropic visar
("55% used") är alltså räknat mot den **tillfälligt boostade** gränsen, inte
mot Kents normala abonnemang. Se delfråga h.

**Tillägg 2026-08-03, Billing-fakturor:** en genomgång av fakturalistan i
`Claude_Code_billing_260803.jpg` visar två olika sorters belopp. Ett
återkommande belopp på 22,50 € (jul, jun, maj, 27 mars, 27 feb) sammanfaller
med abonnemangets angivna förnyelsedatum-mönster och är sannolikt den fasta
Pro-avgiften. Ett antal oregelbundna belopp — koncentrerade till april 2026
(10 apr ×2 á 12,50 €, 13 apr 6,25 €, 27 apr 47,81 €, 28 apr 12,50 €, totalt
≈91,56 € utöver abonnemangsavgiften den månaden) — är sannolikt köp/
påfyllningar av usage credits-saldot. Det går inte att slå fast med säkerhet
utan att öppna respektive fakturas "View"-länk (bilden visar bara datum och
belopp). Viktigt: en fakturarad visar *när Kent fyllde på saldot*, inte
*när han förbrukade det* — det faktiska förbrukningsläget för innevarande
cykel finns bara på Usage-sidan ("€X spent, resets [datum]"). Se delfråga i.

### Terminologi — Kents tidsspråk vs. Anthropics faktiska cykler

Det här är den centrala missmatchningen PRD:n behöver lösa innan ett
verktyg kan byggas. Kent tänker i **dygn / vecka / månad**. Anthropic
exponerar inte de cyklerna rakt av — enligt officiell dokumentation
(se avsnitt 7) finns tre andra cykler:

| Kents begrepp | Anthropics faktiska mätare | Cykel |
|---|---|---|
| "Senaste dygnet / kvar idag" | **Current session** | Återställs var 5:e timme (inte en gång per dygn) |
| "Senaste veckan / kvar denna vecka" | **Weekly limits (all models)** | Återställs en fast dag/tid per vecka, samma varje cykel |
| "Innevarande månad / kvar denna månad" | **Usage credits, förbrukning denna cykel** ("€X spent, resets [datum]" på Usage-sidan) — *inte* fakturabeloppen på Billing-sidan | Månatligt spend-tak; exakt återställningsdag inte specificerad i Anthropics egen dokumentation (se avsnitt 7, källa 1). Fakturor på Billing-sidan visar köp-/påfyllningstillfällen, inte förbrukning — se delfråga i |

Det finns alltså **ingen** mätare som motsvarar "dygn" rakt av — närmaste
proxy är sessionsmätaren (5 timmar), som återställs flera gånger per dygn.
**Beslut (delfråga c):** verktyget konstruerar inget artificiellt
dygnsbegrepp. Det visar de tre faktiska cyklerna som de är — session, vecka,
usage credits — och Kent förhåller sig till dem direkt i stället för att
räkna om till "dygn".

**Tillägg — tillfälliga gränshöjningar ("boostar"):** veckogränsen kan
tillfälligt vara högre än normalt (t.ex. +50% eller +100%, med eget
slutdatum per produkt — Claude Code och Cowork kan boostas olika mycket och
under olika perioder). Anthropics UI visar alltid andelen av den *just nu
gällande* gränsen (normal eller boostad), aldrig andelen av den normala
100%-baslinjen. Kents poäng: dessa två tal kan peka åt helt olika håll —
93,3% av en boostad 150%-gräns motsvarar faktiskt **140% av den normala
100%-gränsen** (0,933 × 1,5 = 1,40). Se delfråga h för hur verktyget
hanterar detta.

## 2. Syfte

- Ge Kent ett sätt att på några sekunder se **förbrukat vs. kvar** i var och
  en av de tre faktiska cyklerna (session, vecka, usage credits), i stället
  för att tolka tre olika UI-sidor mentalt varje gång.
- Skapa en korrekt, källbelagd mappning mellan Kents dygn/vecka/månads-språk
  och Anthropics faktiska återställningscykler, så framtida beslut (t.ex.
  "kan jag köra en tung session till idag?") bygger på rätt modell.

## 3. Omfattning

**Ingår:**
- Terminologi-mappning enligt avsnitt 1 (dygn/vecka/månad → session/vecka/
  usage credits), inklusive beslutet att inte konstruera ett eget
  dygnsbegrepp (delfråga c).
- Ett enkelt, fristående HTML-verktyg i `Claude_kostnad/`, i samma stil som
  Ovrigt:s övriga kalkyler (Ölkalkylen, Släp-kalkylen): Kent matar manuellt
  in avlästa värden (session % + tid till reset, vecka % + tid till reset,
  ev. aktiv boost-% + slutdatum, usage credits € spenderat + gräns),
  verktyget visar förbrukat/kvar per cykel — **både** mot den just nu
  gällande (ev. boostade) gränsen och omräknat mot den normala
  100%-baslinjen (delfråga h). Stateless — ingen historik i webbläsaren
  (se `data.md` nedan för historik).
- En enkel `Claude_kostnad/data.md` — en manuellt förd logg (en rad per
  avläsning: datum, session %, vecka % mot aktiv gräns, aktiv boost-% (0 om
  ingen), boost-slutdatum, vecka % omräknat mot normal baslinje, usage
  credits €) som ger historik utan inbyggd lagring i verktyget (delfråga d).
- En veckovis påminnelse (schemalagt jobb) i takt med veckomätarens
  återställning, som ett separat, senare implementationssteg (delfråga e).
- Ställningstagande till SPEC.md-checkpoint enligt Claude-kompassens
  stående delfråga (delfråga f) — beslutat: nej.

**Ingår inte:**
- Automatisk datahämtning via inloggning/API-skrapning mot claude.ai. Ingen
  sådan yta finns för kontoanvändare, och att bygga en inloggningsbaserad
  skrapning vore en säkerhets- och ToS-risk. Data matas in manuellt (se
  delfråga b, redan beslutad).
- Ändringar i Claude-kompassen (AI-teknik-repot). Det här är ett fristående
  projekt i `Ovrigt`, metodiken lånas — inte kompass-sidans kod eller
  innehåll.
- Djupanalys av Claude Codes egna statistikfält (tokens, sessions, streaks
  i `Claude_Code_ingang.jpg`) som eget kravområde. De är referens/bakgrund,
  inte del av "ligger jag i fas"-frågan, som handlar om plangränser.

## 4. Frågor och beslut

**a) Huvudfokus: plangränser eller rå tokenförbrukning? — BESLUTAT ✓.**
Plangränser ("ligger jag i fas" med Pro-abonnemangets session-, vecko- och
usage credits-tak) — inte en fristående trendanalys av rå tokenförbrukning.

**b) Hur kommer data in i verktyget? — BESLUTAT ✓.** Manuell avläsning:
Kent läser Settings → Usage/Billing då och då och matar in siffrorna själv,
samma mönster som hans befintliga kalkyler i Ovrigt.

**c) Vad ska "dygn" motsvara i verktyget, när Anthropic inte exponerar en
daglig mätare? — BESLUTAT ✓.** Inget artificiellt dygnsbegrepp konstrueras.
Verktyget visar bara de tre faktiska cyklerna (session/vecka/usage credits)
som de faktiskt är, se avsnitt 1.

**d) Ska verktyget spara historik över flera avläsningar (trend över tid),
eller bara visa ett ögonblick? — BESLUTAT ✓, med en tredje lösning Kent
själv föreslog.** Inte inbyggd webbläsarlagring (localStorage) och inte
enbart en ren ögonblicksbild utan spår — i stället en fristående,
manuellt förd `Claude_kostnad/data.md`: en enkel tabell/logg med en rad per
avläsning (datum, session %, vecka %, usage credits €, ev. anteckning).
Håller historiken läsbar, versionshanterad i git och oberoende av
webbläsarens lagring. Det interaktiva HTML-verktyget förblir stateless —
det beräknar bara utifrån de siffror Kent matar in för stunden.

**e) Hur ofta vill Kent mata in data, och vill han ha en påminnelse? —
BESLUTAT ✓.** Veckovis påminnelse, i takt med att veckomätaren återställs.
Implementeras som ett schemalagt jobb i ett senare, separat steg (efter
PRD-frysning) — se Produktionsordning.

**f) Behövs ett SPEC.md-steg härifrån? — BESLUTAT ✓, nej.** Med d beslutat
till en enkel manuell markdown-logg (inte localStorage/appstate) liknar
leveransen strukturellt Ovrigt:s befintliga fristående kalkyler (samma
mönster som Ölkalkylen) — varken tekniskt komplex eller starkt
agent-driven. Inget SPEC.md-steg behövs.

**g) Var ska verktyget/dokumentationen ligga? — BESLUTAT ✓.** I
`Claude_kostnad`-mappen i `Ovrigt`-repot — skapad av Kent specifikt för det
här syftet (känt-nytt enligt mappkontrollen, inget att flagga).

**h) Ska verktyget ta hänsyn till tillfälliga gränshöjningar (boostar)? —
BESLUTAT ✓ (tillagd 2026-08-03, efter `Claude_Code_usage_boosted_260803.jpg`).**
Ja. Anthropics eget UI visar bara andelen av den *just nu gällande* gränsen,
vilket kan dölja att Kent redan ligger över sin normala 100%-baslinje så
fort en tillfällig boost tar slut. Verktyget och `data.md` ska därför
fånga, för veckogränsen: (1) det avlästa procenttalet mot den aktiva
gränsen, (2) ev. aktiv boost i procent (0 om ingen), (3) boostens
slutdatum, och beräkna (4) motsvarande andel av den normala 100%-baslinjen
= avläst% × (1 + boost%/100). Formeln verifierad mot Kents eget exempel:
93,3% av en +50%-boostad gräns = 140% av normalbaslinjen. Boost gäller per
produkt (Claude Code och Cowork boostas olika mycket, med olika slutdatum,
enligt bilden) — verktyget/loggen ska kunna hålla isär dem, inte anta att
en enda boost-procent gäller överallt.

**i) Ska verktyget/`data.md` utgå från fakturabeloppen på Billing-sidan
eller förbrukningssiffran på Usage-sidan för "månad"? — BESLUTAT ✓
(tillagd 2026-08-03, efter Kents fråga om `Claude_Code_billing_260803.jpg`).**
Usage-sidans "€X spent, resets [datum]" är sanningskällan för om Kent just
nu ligger i överanvändning — det är förbrukning under innevarande cykel.
Fakturorna på Billing-sidan är köp-/påfyllningshändelser (när saldot fylldes
på), inte förbrukningshändelser, och loggas *inte* som en del av
månadsmätningen i `data.md`. De kan dock noteras separat som historisk
kontext (t.ex. "april 2026: ovanligt hög påfyllning, ≈91,56 € utöver
abonnemangsavgiften — tecken på att plangränserna nåddes ofta den
månaden") eftersom de visar mönster över tid som kompletterar
ögonblicksbilden.

## 5. Leveranser

- [x] De tre skärmdumparna granskade och förstådda
- [x] Åtkomst till AI-teknik-repot (Claude-kompassens PRD-mall) säkrad
- [x] Två officiella Anthropic-källor verifierade om session-/vecko-/
      usage credits-cyklerna
- [x] Delfråga c (dygns-tolkning) beslutad — inget artificiellt dygnsbegrepp
- [x] Delfråga d (historik) beslutad — manuell `data.md`, inte localStorage
- [x] Delfråga e (inmatningsrutin/påminnelse) beslutad — veckovis
- [x] Delfråga f (SPEC.md-checkpoint) beslutad — nej
- [x] Delfråga h (boost-hantering) beslutad — dubbla procenttal, per produkt
- [x] Delfråga i (faktura vs. förbrukning) beslutad — Usage-sidans
      förbrukningssiffra är sanningskällan, fakturor är valfri historisk kontext
- [ ] Fräscha-ögon-genomläsning genomförd (Regel 7)
- [ ] PRD fryst av Kent
- [ ] `Claude_kostnad/data.md` skapad (tom logg-mall med rätt kolumner,
      inkl. boost-% och boost-slutdatum per produkt)
- [ ] HTML-verktyg byggt (separat steg, efter frysning), med
      boost-omräkningsformeln enligt delfråga h
- [ ] Veckovis påminnelse (schemalagt jobb) skapad
- [ ] README.md + site-nav + GitHub-hörna enligt `Ovrigt/CLAUDE.md` (när
      HTML-sidan skapas)

## 6. Produktionsordning

1. ~~Diskutera och besluta delfrågor c–f med Kent.~~ Klart (v2).
2. Fräscha-ögon-genomläsning av hela PRD:n (Regel 7), innan frysning.
3. Frys PRD:n.
4. Skapa `Claude_kostnad/data.md` — tom logg-mall med kolumnerna datum,
   session %, vecka % (mot aktiv gräns), aktiv boost-% per produkt,
   boost-slutdatum, vecka % (omräknat mot normal baslinje), usage credits €
   spenderat denna cykel (från Usage-sidan, inte fakturor), anteckning
   (valfri plats för att notera ovanliga fakturor/påfyllningar).
5. Bygg HTML-verktyget (`kent-bygg-sidor`-mönstret, samma stil som Ovrigt:s
   övriga kalkyler) — stateless kalkylator som läser Kents manuella
   inmatning för stunden och räknar om mot normal baslinje enligt
   formeln i delfråga h.
6. Sätt upp den veckovisa påminnelsen (schemalagt jobb).
7. Lägg till README.md, site-nav och GitHub-hörna enligt checklistan i
   `Ovrigt/CLAUDE.md`.
8. Påminn Kent om commit (Kent commitar och pushar själv).

## 7. Källor

Claude Help Center (2026a) 'Manage usage credits for paid Claude plans',
*support.claude.com*. Tillgänglig:
https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans
*(Officiell dokumentation om usage credits — bekräftar att de är en
overflow-mekanism efter att plangränsen nåtts, med ett användarinställt
månatligt spend-tak. Anger inte exakt vilken dag den månatliga perioden
återställs — terminologitabellen i avsnitt 1 bygger därför på Kents egen
skärmdump ("Resets Sep 1") för det konkreta datumet, inte på källan.)*

Claude Help Center (2026b) 'What is the Pro plan?', *support.claude.com*.
Tillgänglig: https://support.claude.com/en/articles/8325606-what-is-the-pro-plan
*(Officiell primärkälla för att sessionsgränsen återställs var 5:e timme
och att veckogränsen återställs på en fast dag/tid per konto — grunden för
terminologi-tabellen i avsnitt 1 och delfråga c.)*

## 8. Status

Alla nio delfrågor (a–i) beslutade. Verktyget blir en stateless HTML-
kalkylator (session/vecka/usage credits, inget konstruerat dygnsbegrepp),
som dessutom räknar om veckoprocenten mot Kents normala 100%-baslinje när
en tillfällig boost är aktiv — inte bara mot den boostade gränsen Anthropic
själv visar — och som håller isär förbrukning (Usage-sidan, sanningskällan
för månadsmätningen) från påfyllningshändelser (Billing-sidans fakturor,
valfri historisk kontext). Kompletterad med en manuellt förd `data.md`-logg
för historik och en veckovis påminnelse. Inget SPEC.md-steg behövs.
Kvarstår innan frysning: en fräscha-ögon-genomläsning av hela dokumentet
(Regel 7). Ingen kod skriven ännu, i linje med Kents uttryckliga instruktion
om att detta är planeringsfasen.

## Ändringslogg

- 2026-08-03 (v1): Skapad efter genomgång av tre skärmdumpar i
  `Claude_kostnad/Bilder/` och Kents svar på klargörande frågor (huvudfokus:
  plangränser, inte rå tokenstatistik; datainmatning: manuell avläsning).
  Struktur följer `PRD_generell.md` i AI-teknik-repot. Två officiella
  Anthropic-källor research:ade och verifierade för terminologi-avsnittet.
- 2026-08-03 (v2): Delfrågor c–f beslutade efter Kents svar. c: inget
  konstruerat dygnsbegrepp. d: Kent föreslog själv en tredje lösning —
  en manuellt förd `data.md`-logg i stället för localStorage eller ren
  ögonblicksbild — vilken antogs. e: veckovis påminnelse. f: nej till
  SPEC.md, en direkt följd av d:s enkla lösning. Omfattning, Leveranser och
  Produktionsordning uppdaterade i linje med besluten.
- 2026-08-03 (v3): Ny delfråga h tillagd och beslutad efter att Kent visade
  `Claude_Code_usage_boosted_260803.jpg`: Anthropics UI visar procent mot
  den *just nu gällande* (ev. tillfälligt boostade) gränsen, inte mot den
  normala 100%-baslinjen. Verktyget och `data.md` ska räkna ut båda talen,
  per produkt (Claude Code/Cowork kan ha olika boost-% och slutdatum).
  Formel verifierad mot Kents eget exempel (93,3% av +50%-boost = 140% av
  normalbaslinjen). Bakgrund, Omfattning, Leveranser, Produktionsordning
  och Status uppdaterade.
- 2026-08-03 (v4): Ny delfråga i tillagd och beslutad efter Kents fråga om
  `Claude_Code_billing_260803.jpg`: fakturalistan blandar en återkommande
  abonnemangsavgift (22,50 €) med oregelbundna usage credits-påfyllningar
  (koncentrerade till april 2026, ≈91,56 € utöver abonnemanget den
  månaden). Beslut: Usage-sidans "€X spent, resets [datum]" är
  sanningskällan för månadsmätningen i `data.md`, inte fakturabeloppen —
  fakturor är valfri historisk kontext. Terminologitabellen, Bakgrund,
  Leveranser, Produktionsordning och Status uppdaterade.
