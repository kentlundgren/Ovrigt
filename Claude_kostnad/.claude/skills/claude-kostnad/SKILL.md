---
name: claude-kostnad
description: Håller koll på om Kent ligger i fas med sitt Claude Pro-abonnemang (session/vecka/månad), via verktyget i Ovrigt/Claude_kostnad. Använd när Kent delar en ny skärmdump av Inställningar → Usage (eller Billing) i claude.ai, ber om en "veckouppdatering"/"månadsuppdatering" av Claude-kostnad, frågar om han ligger i fas med sitt abonnemang, eller nämner boost/usage credits/veckogräns i samband med Claude Code eller Cowork. Uppdaterar då index.html:s defaultvärden, loggar nya rader i data.md, och ger en trendanalys mot tidigare loggade rader.
---

# Claude-kostnad — håll koll på om Kent ligger i fas med Pro-abonnemanget

*Skapad: 2026-08-04. Detta är den kanoniska versionen av skillen —
projektlokal, så den kan pushas till GitHub tillsammans med resten av
`Ovrigt`-repot och länkas till direkt. Det finns en kort pekare till den
här filen i den globala skill-mappen
(`C:\Users\kentl\.claude\skills\claude-kostnad\SKILL.md`) — uppdatera
**bara den här filen**, inte den globala, så de inte glider isär (se
`kent-meta-regler-for-code`, Regel 4, om skill-synkproblem).*

## Var allt ligger

- **Projektmapp:** `C:\Users\kentl\OneDrive\AI\Claude\Ovrigt\Claude_kostnad\`
- **Verktyg (live):** https://kentlundgren.github.io/Ovrigt/Claude_kostnad/index.html
  — lokal fil: `Claude_kostnad/index.html`
- **Logg:** `Claude_kostnad/data.md` — manuellt förd historik, en rad per avläsning
- **PRD:** `Claude_kostnad/PRD/PRD_tokenanvandning.md` — fryst (v7), fullständig
  bakgrund, alla beslut (a–i), källor
- **Skärmdumpar:** `Claude_kostnad/Bilder/`
- **Den här skillen (kanonisk):** `Claude_kostnad/.claude/skills/claude-kostnad/SKILL.md`
  — när Kent pushat, länka till
  `https://github.com/kentlundgren/Ovrigt/blob/main/Claude_kostnad/.claude/skills/claude-kostnad/SKILL.md`

## Kärnfrågan verktyget svarar på

> Ligger Kent i fas med sitt Pro-abonnemang — just nu (session), senaste
> veckan, och denna månad (usage credits)?

Anthropic exponerar inga "dygn"-mätare, bara tre cykler: **session** (5h,
rullande från första meddelandet — inte fasta klockslag), **vecka** (fast
dag/tid, kan vara tillfälligt boostad), **usage credits** (€, månatligt
tak, aktiveras först när plangränsen nås).

## Nyckelbegrepp — samma definitioner överallt

De här tre begreppen återkommer i `data.md`, `index.html`, `dela/index.html` och
`testad_260804.html`. Texten nedan är **ordagrant samma** som badge-tooltipsen i
verktygen (mönstret tillagt i `testad_260804.html` 2026-08-04) — ändras definitionen,
ändra den på båda ställena samtidigt, annars glider skill och verktyg isär. Syftet är
att framtida vecka-mot-vecka-jämförelser (vecka X mot X+1, X+2, osv.) alltid utgår från
samma betydelse, oavsett vilken session eller vilket verktyg som gör jämförelsen.

**Vecka, normalbaslinje** — Andelen av din NORMALA (icke-boostade) 100%-veckogräns som
är förbrukad. Anthropic visar bara andelen mot den just nu gällande (ev. tillfälligt
höjda) gränsen — det talet omräknas hit med formeln `avläst% × (1 + boost%/100)`, så
att veckor med olika boost-nivå blir jämförbara med varandra. Källa:
`PRD_tokenanvandning.md`, delfråga h.

**Takt-avvikelse (vecka eller månad)** — Hur många procentenheter du ligger före eller
efter en jämn (linjär) förbrukningstakt: `(förbrukad andel av gränsen) − (andel av
cykeln som redan gått)`. Positivt tal = du förbrukar snabbare än en jämn takt (ligger
"före"). Negativt tal = du har marginal kvar. Samma tröskel (över 10 procentenheter)
styr när Kärnfrågan-bannern visar "Inte i fas". Källa: `PRD_tokenanvandning.md`, v8
(takt-jämförelsen).

**Usage credits** — Anthropics overflow-mekanism: ett belopp i euro som dras när du
överskrider dina vanliga plangränser (session/vecka). Det loggade beloppet är vad som
förbrukats av DIN egen satta månadsgräns denna cykel — inte ditt totala förbetalda
saldo, som är en separat pott (se de rena referensfälten i `index.html`). Källa: Claude
Help Center, "Manage usage credits for paid Claude plans".

## Den återkommande veckorutinen

När Kent delar en ny skärmdump av Inställningar → Usage (en enda bild
räcker — session, vecka och usage credits visas där tillsammans):

1. **Läs av bilden direkt** (Claude kan läsa skärmdumpar utan att Kent
   skriver av siffrorna).
2. **Uppdatera `index.html`:s defaultvärden** (`value=`-attributen på
   inputs) till de nya siffrorna, sub-header-textens datum/tid, **och**
   Kärnfrågan-bannerns `<p class="meta">`-rad (tillagd 2026-08-04) — håll
   alla tre datum-nämningar i synk i samma redigering. Viktigt: datumet där
   är **tidpunkten för själva programuppdateringen** (när Claude faktiskt
   redigerar filen), inte en gissning på när Kent tog skärmdumpen — annars
   riskerar texten bli fel så fort Kent skriver in nya siffror manuellt
   utan att be om en full uppdatering.
3. **Logga nya rader i `data.md`** — en rad per produkt om vecko-läget
   skiljer sig åt mellan Claude Code och Cowork (vilket det gjorde första
   gången: 21,5 pp vs 51 pp över takt, se raderna för 2026-08-04).
4. **Testa i webbläsaren** innan leverans (samma mönster som all annan
   sidbyggnad i Ovrigt — se `kent-bygg-sidor`-skillen).
5. **Ge en trendanalys**: jämför nya värden mot senast loggade rad(er) i
   `data.md` — särskilt "Takt-avvikelse"-kolumnerna (positivt = över
   linjär takt, negativt = marginal kvar). Har läget förbättrats eller
   försämrats sedan förra avläsningen?

## Viktiga mekaniker att komma ihåg

- **Boost-omräkning (delfråga h):** Anthropics UI visar % mot den *just nu
  gällande* (ev. boostade) gränsen, inte mot normalbaslinjen. Formel:
  `normal% = avläst% × (1 + boost%/100)`. Claude Code och Cowork kan ha
  olika boost-% och olika slutdatum samtidigt — byts produkt i verktyget
  fylls kända värden i automatiskt (`KNOWN_BOOSTS` i `index.html`), men
  "Annat/alla modeller" rör **aldrig** boost-fälten (lämnar dem orörda
  snarare än att anta 0%, efter ett verkligt missförstånd 2026-08-03).
  **Bekräftat i praktiken 2026-08-04:** Claude Codes egen in-app-varning
  ("Approaching weekly usage limit") räknar också mot den aktiva
  (boostade) gränsen, precis som Usage-sidan — den visade bara
  "approaching" trots att verktyget samtidigt räknade ut 114 % av
  normalbaslinjen. Ingen motsägelse: två olika referensramar för samma
  tal. Poängen (och boost-omräkningens hela syfte) är att den 19 augusti,
  när boosten upphör, återgår gränsen till 100 % — och ett läge som redan
  motsvarar >100 % av normalbaslinjen blir då genast "exceeded", utan att
  någon ny användning skett. Nämn alltid den här skillnaden när Kent
  visar en Anthropic-varning (Usage-sidan eller Claude Codes egen
  in-app-banner) som verkar mildare än verktygets normalbaslinje-tal —
  det beror nästan alltid på att varningen räknar mot den boostade
  gränsen, inte på att något är fel i beräkningen.
- **"All models"-osäkerhet:** trolig tolkning är att "All models 59% used"
  i Usage-vyn betyder "alla Claude-modeller inom Claude Code-vecko-potten"
  — inte Claude Code + Cowork kombinerat, eftersom Cowork inte syns i
  samma ruta. Inte bekräftat av Anthropic — flaggat i verktygets card-note.
- **Takt-jämförelse (vecka och månad):** jämför andel av cykeln som gått
  (räknat mot verklig klocka, `new Date()` i webbläsaren) med andel av
  ransonen förbrukad. Vecka: 168 timmar, källbelagt (Claude Help Center).
  Månad: **antar kalendermånad (1:a–1:a)** eftersom "Resets Sep 1" pekar på
  det — **inte bekräftat**, flaggat som antagande i verktyget.
- **Fakturor ≠ förbrukning (delfråga i):** Billing-sidans fakturor visar
  när Kent fyllde på sitt usage credits-saldo, inte vad han förbrukat.
  Verktyget använder bara Usage-sidans "€X spent, resets [datum]".
- **Usage credits "Current balance" ≠ "Monthly spend limit":** två skilda
  pooler (Claude Help Center) — balance är förbetalt saldo, monthly spend
  limit är ett eget tak på hur mycket av det som får förbrukas per månad.
  "Promotional credit" med utgångsdatum är en delmängd av balance — inte
  officiellt dokumenterad av Anthropic, men ett community-buggärende
  (`anthropics/claude-code#76087`) tyder på att den kan försvinna vid
  utgång om oanvänd. Verktyget har rena referensfält för dessa tre
  begrepp (påverkar ingen beräkning) med hover/klick-tooltips + källor,
  samma badge/tooltip-mönster som Ölkalkylen (`Fritid/ol_Tyskland/index.html`).
- **"Monthly spend limit" ≠ Pro-abonnemangets fasta avgift — ett verkligt
  missförstånd 2026-08-04.** Kent förväxlade sitt eget satta usage
  credits-tak (ursprungligen 20 €, höjt till 25 € samma dag) med sin
  fasta månadsavgift för Pro-planen (~22,50 €, ett separat, återkommande
  belopp på Billing-sidan, se delfråga i i `PRD_tokenanvandning.md`) —
  lätt hänt eftersom talen råkar ligga nära varandra. De är två helt
  olika saker: abonnemangsavgiften betalas oavsett användning, medan
  Monthly spend limit bara är ett självvalt tak för hur mycket
  *overflow*-betalning (usage credits) som får dras automatiskt när
  session- eller veckogränsen är nådd. Var tydlig med den skillnaden
  varje gång usage credits-gränsen diskuteras, särskilt om Kent nämner
  ett belopp som "vad jag betalar per månad" — kontrollera om han menar
  abonnemangsavgiften eller usage credits-taket innan du svarar.
- **Session/vecka 100 %+ → usage credits stiger — verifierat konkret
  2026-08-04.** När Kent låg på session 100 % ("Resets in 4 min") och
  vecka 114 % av normalbaslinjen, steg usage credits "spent" med exakt
  4,04 € på kort tid, och både "Current balance" och "Promotional
  credit" minskade med precis samma 4,04 € — en direkt, siffermässigt
  bekräftad demonstration av att overflow-mekanismen (Claude Help Center)
  faktiskt triggas när plangränserna nås, inte bara en teoretisk
  beskrivning. Använd gärna den här typen av saldo-avstämning (spent upp
  = balance/promo ner, med samma belopp) för att verifiera att en
  avläsning är rimlig, inte bara för att förklara mekaniken.
- **Månadstakt (samma mönster som veckan):** andel av usage credits-cykeln
  som gått jämförs med andel av gränsen förbrukad. Cykelstart härleds som
  "en kalendermånad före reset-datumet" — ett antagande, flaggat i verktyget.
- **"Kärnfrågan"-bannern (toppen av sidan) måste räkna på takt, inte bara
  hårda gränser.** Ett verkligt fel 2026-08-04: bannern visade grönt "I fas"
  fast både vecka och månad låg >20 procentenheter över linjär takt, för att
  dess ok/danger-logik bara kollade `normalPct > 100` och liknande hårda
  villkor — aldrig `paceBuffer`. Rättat genom att koppla in samma tröskel
  (>10 procentenheter över takt) som redan färgar de enskilda korten. Om du
  lägger till fler mätvärden eller fler jämförelser i framtiden: kontrollera
  alltid att den övergripande bannerns logik faktiskt speglar allt som visas
  längre ner på sidan, inte bara de ursprungliga hårda gränserna.
- **En isolerad procentsats säger nästan ingenting — den måste alltid kopplas
  till hur långt in i cykeln man är.** Kent lyfte detta explicit 2026-08-04
  efter en avläsning som visade "56 % av usage credits förbrukat" när bara
  ~4 av ~31 dagar (≈11–13 %) av cykeln hade gått — en takt-avvikelse på
  över +44 procentenheter, inte ett harmlöst "drygt hälften kvar". **Gäller
  inte bara verktygets egna beräkningar, utan även löpande konversation:**
  när Kent (eller en framtida session) nämner en usage credits- eller
  veckoprocent i chatten, utan att gå via verktyget, räkna alltid ut och
  säg också hur långt in i cykeln man är (dagar eller andel), inte bara
  den råa procenten. Samma 56 % betyder helt olika saker på dag 4 kontra
  dag 25 av en ~31-dagarscykel.

## Arbetssätt att respektera (gäller alla projekt i Ovrigt, inte bara detta)

- **Fråga innan du gissar** (Regel 1) — särskilt vid tolkning av
  skärmdumpar eller nya siffror.
- **Bygg och testa lokalt i webbläsaren innan leverans** — `kent-bygg-sidor`.
- **Kent committar och pushar själv** — påminn, gör det aldrig proaktivt.
  Han gör det ofta tyst utan att nämna det i chatten — nya commits i
  git-loggen är inte ett tecken på ett fel (se minnet
  `feedback_kent_committar_sjalv_tyst`).
- **PRD_tokenanvandning.md är fryst** — nya beslut/ändringar i verktygets
  logik ska ändå dokumenteras där (nya delfrågor/Ändringslogg-poster), inte
  bara göras tyst i koden.

## Uppdateringslogg

- 2026-08-04 (v1): Skapad efter en hel session av PRD-arbete
  (`PRD_tokenanvandning.md` v1→v7, fryst) och byggarbete (`index.html`,
  `data.md`, README/nav). Fångar boost-omräkning, takt-jämförelse
  (vecka+månad), "All models"-osäkerheten, kalendermånads-antagandet, och
  den återkommande veckorutinen Kent bad om.
- 2026-08-04 (v2): Flyttad hit (projektlokal, kanonisk) från den globala
  skill-mappen, på Kents begäran — han vill kunna se/pusha/länka till
  skillen tillsammans med resten av `Ovrigt`-repot. Den globala kopian är
  nu bara en kort pekare hit. Tillägg: hover/klick-tooltips (badge-mönster
  från Ölkalkylen) för "Monthly spend limit", "Current balance" och
  "Promotional credit" i usage credits-kortet, med källor.
- 2026-08-04 (v3): Månadstakt tillagd (samma mönster som veckan). H1
  omformulerad på Kents begäran. Bugg rättad: produktväljaren "Annat"
  nollställde boost-fälten. **Viktigare bugg rättad: Kärnfrågan-bannern
  räknade bara på hårda gränser, aldrig på takt-avvikelsen** — se egen
  punkt under "Viktiga mekaniker" ovan.
- 2026-08-04 (v4): Ny sektion "Nyckelbegrepp" tillagd, på Kents uttryckliga
  fråga om definitionerna (vecka normalbaslinje, takt-avvikelse, usage
  credits) också borde finnas i en skill — inte bara som tooltips i
  verktygen — för att garantera samma uppfattning i framtida vecka-mot-
  vecka-jämförelser. Texten är ordagrant identisk med badge-tooltipsen i
  `testad_260804.html`, medvetet, så de två inte kan glida isär över tid.
  Föddes ur den nya publika varianten (`dela/`) och dess testrapport —
  se `PRD/PRD_publik_variant.md` och `testad_260804.html`.
- 2026-08-04 (v5): Kärnfrågan-bannern i `index.html` fick en ny
  `<p class="meta">`-rad som stavar ut själva frågan ("Är du i fas med
  ditt Claude-abonnemang?") och anger när verktyget senast uppdaterades.
  Kent föreslog ursprungligen ett fast klockslag för avläsningen, men vi
  landade i att i stället använda tidpunkten för själva
  programuppdateringen (som Claude faktiskt känner till) — se skärpt
  instruktion i den återkommande veckorutinens steg 2 ovan.
- 2026-08-04 (v6): Ny punkt under "Viktiga mekaniker" — en isolerad
  procentsats utan cykel-kontext är missvisande, gäller lika mycket i
  löpande konversation som i verktyget. Tillagd efter att Kent visade en
  tredje avläsning samma dag (56 % av usage credits, dag ~4 av 31 —
  takt-avvikelse +44 pp) och uttryckligen bad om att frågeställningen
  skrevs in i en skill så den inte glöms bort. `index.html` och `data.md`
  uppdaterade med avläsningen (se raderna för 2026-08-04, tredje/fjärde
  posten). `index.html` fick även en frivillig OCR-uppladdningsruta
  (delfråga j i `PRD_tokenanvandning.md`).
- 2026-08-04 (v7): Två nya punkter under "Viktiga mekaniker" efter en
  femte avläsning samma dag: (1) Kent förväxlade Monthly spend limit
  (självvalt usage credits-tak, höjt 20 € → 25 €) med Pro-planens fasta
  abonnemangsavgift (~22,50 €, separat post på Billing-sidan) — nu
  explicit dokumenterat som två olika saker. (2) En konkret, siffermässig
  bekräftelse på overflow-mekanismen: session 100 % + vecka 114 % av
  normalbaslinjen sammanföll med att usage credits steg 4,04 € medan
  balance/promo minskade med exakt samma belopp. `index.html` och
  `data.md` uppdaterade (femte/sjätte raden för 2026-08-04).
- 2026-08-04 (v8): Boost-omräknings-punkten under "Viktiga mekaniker"
  utökad efter att Kent visade Claude Codes egen in-app-varning
  ("Approaching weekly usage limit") och undrade varför den bara varnade
  för att närma sig gränsen, trots att verktyget redan visade 114 % av
  normalbaslinjen. Bekräftat: varningen räknar mot den aktiva (boostade)
  gränsen, precis som Usage-sidan — ingen motsägelse, bara ytterligare
  ett konkret exempel på det delfråga h redan förutsåg. Skärmdumpen
  bekräftade också veckoåterställningen (torsdag ~08:00) som verktyget
  redan antog.
