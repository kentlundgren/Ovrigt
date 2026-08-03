# PRD – Tokenanvändning vs. Pro-abonnemangets gränser

**Namn:** PRD_tokenanvandning
**Plats:** `Claude_kostnad/PRD/PRD_tokenanvandning.md`
**Skapad:** 2026-08-03
**Version:** 8 (vidareutvecklat efter frysning)
**Status:** **Genomfört och vidareutvecklat.** Verktyg, `data.md`,
README/nav, veckovis kalenderpåminnelse, månadstakt, hover-tooltips och
en rättad Kärnfrågan-banner är levererade och verifierade. Skillen
`claude-kostnad` är projektlokal och kanonisk. Väntar på att Kent
committar och pushar (se Ändringslogg).
**Typ:** Grund-PRD — helt nytt, fristående projekt i `Ovrigt`-repot. Följer
strukturen i [PRD_generell.md](https://github.com/kentlundgren/AI-teknik/blob/main/AI_modeller/Claude/olika_Claude_modeller/PRD/PRD_generell.md)
(AI-teknik-repot, Claude-kompassens PRD-mall) men bygger inte vidare på
kompassen själv.

## Kärnfrågan

> Ligger jag i fas med mitt Pro-abonnemang — **just nu**, **senaste veckan**
> och **denna månad (innevarande cykel)**?

Det är den enda fråga verktyget faktiskt måste besvara. Allt annat i det
här dokumentet — terminologi-mappningen, boostar (delfråga h), fakturor vs.
förbrukning (delfråga i) — är hinder på vägen dit: saker som annars gör att
ett rakt "ja/nej-svar just nu" blir fel om de ignoreras. Tre svar,
kopplade till Anthropics tre faktiska cykler (se Terminologi nedan):

| Kents fråga | Besvaras av | Delfråga att räkna med |
|---|---|---|
| Ligger jag i fas **just nu**? | Current session — förbrukat/kvar av 5h-cykeln | — |
| Har jag legat i fas **senaste veckan**? | Weekly limits — förbrukat/kvar, omräknat mot normal baslinje om boost är aktiv | h |
| Ligger jag i fas **denna månad**? | Usage credits — förbrukning denna cykel (Usage-sidan, inte fakturor) | i |

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

- **Svara direkt på Kärnfrågan** (se ovan): ligger Kent i fas med sitt
  Pro-abonnemang just nu, senaste veckan och denna månad — utan att han
  själv behöver räkna om eller tolka tre olika UI-sidor mentalt varje gång.
- Ge Kent ett sätt att på några sekunder se **förbrukat vs. kvar** i var och
  en av de tre faktiska cyklerna (session, vecka, usage credits).
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
- [x] Fräscha-ögon-genomläsning genomförd (Regel 7) — en felaktig
      korsreferens hittad och rättad i Källor
- [x] PRD fryst av Kent (2026-08-03)
- [x] `Claude_kostnad/data.md` skapad (tom logg-mall med rätt kolumner,
      inkl. boost-% och boost-slutdatum per produkt)
- [x] HTML-verktyg byggt, testat i webbläsaren (räknar korrekt: 55%×1,5
      boost = 82,5%; gränsfallet 95%×1,5 = 142,5% ger rätt varning) —
      boost-omräkningsformeln enligt delfråga h verifierad
- [x] Veckovis påminnelse skapad — återkommande kalenderhändelse (måndagar
      09:00, Europe/Stockholm), inte ett schemalagt Claude-jobb (se
      resonemang i produktionsordningen nedan)
- [x] README.md + site-nav + GitHub-hörna enligt `Ovrigt/CLAUDE.md`

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
6. Sätt upp den veckovisa påminnelsen. **Genomfört som:** en återkommande
   kalenderhändelse (måndagar 09:00, Europe/Stockholm) i stället för ett
   schemalagt Claude-jobb — avvägning gjord vid implementation: ett
   session-bundet cron-jobb överlever inte mellan sessioner (max 7 dagar,
   session-only), och en fullständig molnbaserad Claude Code-rutin är
   tyngre infrastruktur än en påminnelse kräver och kan ändå inte läsa
   Kents inloggade claude.ai-session — den skulle bara skicka ett
   textmeddelande, precis som kalenderhändelsen redan gör.
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

Kärnfrågan ("ligger jag i fas — just nu, senaste veckan, denna månad?")
är nu explicit högst upp i dokumentet, med en direkt koppling till
respektive Anthropic-cykel och delfråga, så den inte tappas bort bland
detaljerna. Alla nio delfrågor (a–i) beslutade. Verktyget blir en stateless
HTML-kalkylator (session/vecka/usage credits, inget konstruerat
dygnsbegrepp), som dessutom räknar om veckoprocenten mot Kents normala
100%-baslinje när en tillfällig boost är aktiv — inte bara mot den boostade
gränsen Anthropic själv visar — och som håller isär förbrukning
(Usage-sidan, sanningskällan för månadsmätningen) från
påfyllningshändelser (Billing-sidans fakturor, valfri historisk kontext).
Kompletterad med en manuellt förd `data.md`-logg för historik och en
veckovis kalenderpåminnelse. Inget SPEC.md-steg behövdes. Allt är nu
byggt och verifierat: `index.html` testat i webbläsaren mot Kents egna
siffror (inklusive gränsfallet över normal baslinje), `data.md` skapad,
README/site-nav/GitHub-hörna på plats i både `Claude_kostnad/` och
`Ovrigt`-roten, och en återkommande kalenderhändelse skapad (måndagar
09:00). Enda återstående steget är att Kent committar och pushar själv.

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
- 2026-08-03 (v5): Ny "Kärnfrågan"-sektion tillagd direkt efter header-
  fälten, på Kents begäran — huvudfrågan ("ligger jag i fas: just nu,
  senaste veckan, denna månad?") riskerade att drunkna bland delfrågorna
  c–i. Sektionen kopplar varje delfråga (h, i) till exakt vilken av de tre
  frågorna den påverkar. Syfte-avsnittets första punkt omformulerad för att
  leda med samma formulering. Status uppdaterad.
- 2026-08-03 (v6): PRD fryst av Kent. Kodningsfasen startad.
- 2026-08-03 (v7): Genomfört. `index.html` byggt och testat i webbläsaren
  (verifierat mot Kents egna siffror: 55%×1,5-boost → 82,5% normalbaslinje;
  gränsfallet 95%×1,5 → 142,5% ger korrekt "inte i fas"-varning med
  boost-slutdatum). `data.md` skapad med rätt kolumner. README.md skapad i
  `Claude_kostnad/`, `Ovrigt/index.html` och `Ovrigt/README.md` uppdaterade
  med länk, nav-post och section-card. Veckovis påminnelse implementerad
  som en återkommande kalenderhändelse (måndagar 09:00, Europe/Stockholm)
  i stället för ett schemalagt Claude-jobb — motivering i
  Produktionsordning, punkt 6. Leveranser och Status uppdaterade.
- 2026-08-04 (v8): Efter frysning, ytterligare iteration på begäran av Kent:
  (1) samma takt-jämförelse (andel av cykeln gången vs. förbrukad andel)
  tillagd för månaden/usage credits, inte bara veckan — bygger på ett nytt,
  flaggat antagande om att usage credits-cykeln följer kalendermånader.
  (2) Bugg rättad: produktväljaren ("Annat/alla modeller") nollställde
  boost-fälten i stället för att lämna dem orörda — kunde ge falskt lågt
  resultat. (3) Hover/klick-tooltips (badge-mönster från Ölkalkylen) för
  "Monthly spend limit", "Current balance" och "Promotional credit", med
  källor — plus rena referensfält för dessa i usage credits-kortet.
  (4) H1 omformulerad till att explicit nämna tokens/vecka/månad, på Kents
  begäran. (5) **Bugg rättad: "Kärnfrågan"-bannern (Status: I fas/Inte i
  fas) räknade bara på hårda gränser (>100%), aldrig på takt-avvikelsen —
  kunde visa grönt "I fas" trots att både vecka och månad låg >20
  procentenheter över linjär takt.** Kent upptäckte detta genom att
  jämföra bannerns slutsats med de redan beräknade takt-talen. Samma
  tröskel (>10 procentenheter över takt = "inte i fas") som redan färgar
  de enskilda korten kopplades nu in i den övergripande bannerns logik.
  (6) Skillen `claude-kostnad` flyttad från global till projektlokal
  kanonisk plats (`Claude_kostnad/.claude/skills/claude-kostnad/SKILL.md`),
  med bara en kort pekare kvar globalt — Kent ville kunna se/pusha/länka
  skillen tillsammans med `Ovrigt`-repot.
