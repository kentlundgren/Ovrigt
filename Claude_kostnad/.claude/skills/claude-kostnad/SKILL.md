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

## Den återkommande veckorutinen

När Kent delar en ny skärmdump av Inställningar → Usage (en enda bild
räcker — session, vecka och usage credits visas där tillsammans):

1. **Läs av bilden direkt** (Claude kan läsa skärmdumpar utan att Kent
   skriver av siffrorna).
2. **Uppdatera `index.html`:s defaultvärden** (`value=`-attributen på
   inputs) till de nya siffrorna, och sub-header-textens datum/tid.
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
