# PRD – Publik variant: besökare laddar upp egen skärmdump

**Namn:** PRD_publik_variant
**Plats:** `Claude_kostnad/PRD/PRD_publik_variant.md`
**Skapad:** 2026-08-04
**Version:** 4 (fryst)
**Status:** **Fryst av Kent (2026-08-04).** Alla delfrågor (a–g) beslutade,
fräscha-ögon-genomläsning genomförd. Nästa steg: SPEC.md, författad av
Claude — se `SPEC_publik_variant.md` i samma mapp.
**Typ:** Vidarebyggnad — ny, fristående leverans i samma mapp
(`Claude_kostnad/`) som den redan frysta `PRD_tokenanvandning.md`, men ett
eget scope, egen målgrupp och egen riskbild. Ersätter eller ändrar inte
det befintliga, personliga verktyget.

## Kärnfrågan

> Kan en anonym besökare på
> https://kentlundgren.github.io/Ovrigt/Claude_kostnad/index.html ladda upp
> en skärmdump av sin egen Claude-användning och få samma typ av
> "ligger jag i fas"-analys som Kent redan får av sitt eget verktyg — utan
> att Kent behöver bygga eller betala för en backend?

**Det som faktiskt gör svaret värt något: takt-jämförelsen.** Anthropics
egen Usage-sida visar redan råa procenttal ("66% used"). Det en
förstagångsbesökare **inte** kan se där är om 66% är bra eller dåligt just
nu — det beror på hur långt in i veckan/månaden man är. 66% förbrukat vid
40% av veckan gången är ett helt annat läge än 66% förbrukat vid 90% av
veckan gången, men Anthropics UI gör ingen skillnad på de två. Just den
jämförelsen — förbrukad andel mot förfluten andel av cykeln — är verktygets
enda faktiska mervärde jämfört med att bara läsa av Claude.ai direkt, och
är därför obligatorisk i den publika varianten, inte en valfri extra
funktion. Se delfråga e för hur beslutet togs och vad som gäller
gränsfallen (t.ex. det flaggade antagandet om usage credits-cykelns
kalendermånad).

## 1. Bakgrund

`PRD_tokenanvandning.md` (fryst, v9) beskriver ett fristående, stateless
HTML-verktyg där **Kent själv** läser av tre mätare i Inställningar →
Usage/Billing och matar in dem manuellt. Den PRD:n avfärdade uttryckligen
automatisk datahämtning ("Ingår inte: Automatisk datahämtning via
inloggning/API-skrapning") — men det beslutet gällde Kents *egen* data och
en inloggningsbaserad skrapning mot claude.ai, inte frågan om andra
människor skulle kunna använda verktyget med sina egna, manuellt avlästa
tal.

Den här PRD:n föddes ur ett konkret rollspel 2026-08-04: Kent skickade in
sin egen skärmdump av Inställningar → Usage (`Current session 7% used`,
`All models 66% used` med aktiv boost-notis, `€6.13 spent` av `€20`
usage credits) och lekte att den kom från "vem som helst" — för att testa
om en anonym besökare skulle få exakt samma analys.

**Slutsats av testet:** ja, redan idag, om personen matar in *samma
siffror*. Verktygets beräkningslogik (Kärnfrågan, boost-omräkning enligt
delfråga h i `PRD_tokenanvandning.md`, takt-jämförelse) är redan generisk
och stateless — den bryr sig om *vad* som matas in, aldrig *vem* som matar
in det. Det som saknas för en riktig bilduppladdning är alltså bara
steget **bild → siffror**, inte omräkningslogiken.

**Teknisk begränsning som styr resten av dokumentet:** en riktig
AI-bildanalys (skicka bilden till en språkmodell för tolkning) kräver en
API-nyckel för anropet. En sådan nyckel kan inte läggas i klientkod på en
publik, statisk GitHub Pages-sida — vem som helst skulle kunna läsa ut den
och belasta Kents konto. Den vägen kräver därför normalt en backend som
håller nyckeln hemlig (t.ex. Firebase, eller en lättare serverless-proxy).
Kent har uttryckligen sagt att han inte är sugen på att koppla in Firebase
eller motsvarande just nu, och efterfrågar en enklare lösning.

**Vald teknisk väg:** klient-side OCR (optisk teckenigenkänning som körs
helt i besökarens egen webbläsare) i stället för AI-bildanalys. Se Källor
(avsnitt 7) — Tesseract.js är verifierat att köra helt client-side via
WebAssembly, utan server, vilket eliminerar både nyckelproblemet och
kostnadsfrågan. Bilden behöver då aldrig lämna besökarens enhet: den
processas i webbläsarens tillfälliga arbetsminne (en JS-variabel) och
försvinner när sidan stängs eller laddas om — ingen serveruppladdning,
ingen databas, ingen bildlagring.

**Firebase som framtida möjlighet (inte del av denna leverans).** Kent har
bekräftat att skälet till att avstå Firebase just nu inte är att han ogillar
tekniken — han har jobbat med Firebase tidigare och vill generellt lära sig
det bättre, men vill inte koppla in det i just det här projektet just nu.
Detta dokumenteras här som en medveten, öppen dörr: om OCR-precisionen
visar sig otillräcklig i praktiken, eller om Kent vid ett senare tillfälle
vill öva på Firebase, är steget "riktig AI-bildanalys via en Firebase-backend
(t.ex. Cloud Functions som håller API-nyckeln hemlig)" en naturlig
vidareutveckling — men ett eget, senare PRD-beslut, inte något som styr
denna leverans.

## 2. Syfte

- Ge en förstagångsbesökare svaret på den enda fråga de faktiska
  procenttalen på Claude.ai inte kan svara på själva: ligger jag **före
  eller efter** en jämn takt, givet hur långt in i cykeln jag är just nu?
  Det är takt-jämförelsen, inte de råa procenttalen, som är hela poängen
  med verktyget — utan den är det bara en omväg till samma information
  Claude.ai redan visar.
- Låta vem som helst som besöker `Claude_kostnad/index.html` få samma
  "ligger jag i fas"-analys som Kent, baserat på sin egen skärmdump —
  utan inloggning, utan backend, utan att Kent bär en löpande kostnad per
  besökare.
- Återanvända den redan verifierade beräkningslogiken från
  `PRD_tokenanvandning.md` rakt av, i stället för att bygga en ny
  analysmodell.
- Hålla lösningen så enkel att den ryms inom dagens statiska
  GitHub Pages-arkitektur — ingen ny infrastruktur, inget nytt
  moln-beroende.

## 3. Omfattning

**Ingår:**
- En egen, ny sida (t.ex. `Claude_kostnad/dela/index.html`, se delfråga d)
  där en besökare kan ladda upp en bild av sin egen Usage-sida. Kents eget
  verktyg på `index.html` förblir orört.
- Klient-side OCR (Tesseract.js eller motsvarande) som läser av bilden
  lokalt i besökarens webbläsare — ingen bild skickas någonstans.
- OCR-resultatet **förifyller** samma inmatningsfält som redan finns i
  dagens manuella verktyg, men besökaren ser och kan rätta talen innan
  analysen körs. Aldrig en helt automatisk "svart låda" — OCR läser fel
  ibland (typsnitt, mörkt/ljust läge, beskuren bild, annat språk).
- Samma kärnberäkning som det befintliga verktyget: session/vecka/usage
  credits, boost-omräkning mot normal 100%-baslinje (delfråga h i
  `PRD_tokenanvandning.md`) — **och, avgörande, takt-jämförelsen** (andel
  förbrukat vs. andel av cykeln som gått, delfråga e). Utan den senare
  levererar sidan inte det verktyget faktiskt är till för; den är alltså
  lika obligatorisk som själva procentavläsningen, inte en tilläggsfunktion.
- En tydlig, synlig disclaimer: verktyget är inte ett officiellt
  Anthropic- eller Claude-verktyg, och Kent ansvarar inte för att OCR:en
  läser rätt — besökaren bekräftar alltid talen själv.

**Ingår inte:**
- Backend, databas eller extern molntjänst (Firebase eller motsvarande) —
  uttryckligen avfärdat av Kent i detta skede.
- Riktig AI-bildanalys (skicka bilden till en språkmodell) — kräver en
  backend för att skydda en API-nyckel; inte del av denna leverans.
- Lagring eller historik av besökares data. Ingen `data.md`-motsvarighet
  för publika besökare — varje analys är en isolerad ögonblicksbild som
  försvinner när sidan lämnas.
- Inloggning, konton eller insamling av personuppgifter om besökaren.
- Ändringar i Kents eget, redan frysta flöde i `PRD_tokenanvandning.md` —
  det förblir orört oavsett hur denna PRD landar.

## 4. Frågor och beslut

**a) AI-bildanalys (backend) eller klient-side OCR? — BESLUTAT ✓.**
Klient-side OCR (Tesseract.js), se resonemang i Bakgrund. Ingen
Firebase-koppling eller annan backend i detta skede — direkt i linje med
Kents uttryckliga önskan om en enklare lösning. Firebase (eller
motsvarande) dokumenterat som en medveten framtida möjlighet, inte en del
av denna leverans — se Bakgrund.

**b) Var lagras den uppladdade bilden? — BESLUTAT ✓.** Ingenstans
permanent. Bilden processas i webbläsarens minne och kastas när sidan
stängs/laddas om. Ingen server-uppladdning, ingen loggning.

**c) Hur hanteras OCR-osäkerhet? — BESLUTAT ✓ (Kent litar på förslaget).**
OCR-resultatet förifyller samma fält som redan finns i dagens verktyg, men
besökaren ser alltid de avlästa talen skrivna ut i vanliga inmatningsfält
och måste själv trycka på en "Analysera"-knapp — inget beräknas automatiskt
i bakgrunden utan att besökaren sett och kunnat rätta talen först. I
praktiken: precis samma upplevelse som när Kent själv skriver in sina tal
idag, förutom att fälten råkar vara förifyllda i stället för tomma.
Verktyget litar alltså aldrig blint på OCR:en — den är en genväg, inte ett
facit.

**d) Sidplacering: samma sida som Kents eget verktyg, eller en egen sida?
— BESLUTAT ✓.** Egen, ny sida (t.ex. `Claude_kostnad/dela/index.html`).
Kents motivering: en helt egen sida gör syftet tydligt redan från första
anblick — en besökare ska direkt förstå att det här är "ladda upp din egen
skärmdump", inte behöva tolka ett läge/flik-val på Kents personliga
verktyg. Kents eget verktyg på `index.html` förblir helt orört.
Beräkningslogiken (Kärnfrågan, boost-omräkning) bryts ut till en delad
JS-fil som båda sidorna importerar, så att en framtida ändring bara behöver
göras på ett ställe.

**e) Ska takt-jämförelsen ingå för publika besökare? — BESLUTAT ✓.**
Förtydligande av frågan (den handlade inte om uppföljning över tid, utan om
en specifik beräkning i dagens verktyg): "takt-jämförelsen" är den del av
Kärnfrågan-logiken som inte bara visar "du har förbrukat 66%", utan också
jämför det mot "hur långt in i veckan/månaden är du just nu" — t.ex. om
40% av veckan gått men 66% av gränsen är förbrukad, ligger man **före**
en jämn takt, inte bara under ett hårt tak. Det är själva kärnan i "ligger
jag i fas"-frågan, inte ett tillval ovanpå den.

Beslut: ja, samma takt-jämförelse ska ingå för publika besökare — annars
svarar verktyget inte på den fråga det är byggt för att svara på. Samma
flaggade antagande som i Kents eget verktyg (att usage credits-cykeln
följer kalendermånader, inte en bekräftad Anthropic-regel) ska vara lika
tydligt synligt för en anonym besökare som för Kent själv — särskilt
viktigt här eftersom en förstagångsbesökare inte känner till den
bakgrunden som Kent gör.

**f) Disclaimer om att verktyget inte är officiellt — BESLUTAT ✓.** Ja,
krävs. En publik sida som analyserar "Claude"-användning måste tydligt
ange att den inte är ett Anthropic-verktyg, och att OCR-avläsningen kan
vara fel — besökaren bekräftar alltid talen själv (kopplat till c).

**g) Behövs ett SPEC.md-steg härifrån? (Regel 6) — BESLUTAT ✓, ja.** Till
skillnad från `PRD_tokenanvandning.md` (som landade i nej, eftersom
leveransen var en enkel stateless kalkylator i en redan etablerad mall)
innehåller den här leveransen genuint ny teknisk komplexitet: integration
av ett tredjepartsbibliotek (OCR), bildhantering i webbläsaren, mappning av
OCR-text till specifika fält med felmarginal, och en tydlig
gränsfallshantering (vad händer om OCR inte hittar något alls, eller läser
fel språk/format). Det är precis den typen av "exakt hur"-precision en
SPEC.md är till för. Kent har bekräftat beslutet men lämnar innehållet till
Claude att författa — SPEC.md:n skrivs av Claude i produktionsordningens
steg 4, Kent granskar och godkänner snarare än skriver den själv.

## 5. Leveranser

- [x] Rollspelstest genomfört — bekräftat att beräkningslogiken redan är
      generisk/stateless
- [x] Teknisk begränsning identifierad — publik sida kan inte skydda en
      API-nyckel för riktig AI-bildanalys
- [x] Klient-side OCR vald som teknisk väg (Tesseract.js verifierad som
      källa, se avsnitt 7)
- [x] Delfråga c (OCR-osäkerhet/redigerbara fält) beslutad — förifyllda,
      redigerbara fält, aldrig blind automatik
- [x] Delfråga d (sidplacering) beslutad — egen ny sida, delad JS-fil för
      beräkningslogiken
- [x] Delfråga e (takt-jämförelse för publika besökare) beslutad — ja,
      ingår, med samma flaggade kalendermånads-antagande synligt
- [x] Delfråga g (SPEC.md-ställningstagande) beslutad — ja, Claude
      författar, Kent granskar
- [x] Fräscha-ögon-genomläsning genomförd (Regel 7) — tre glapp hittade
      och rättade i v2 (stale "preliminärt"-formulering i Omfattning,
      fel sidhänvisning, villkorade SPEC.md-skrivningar)
- [x] PRD fryst av Kent (2026-08-04)
- [ ] SPEC.md skriven för OCR-fältmappning och gränsfall
- [ ] Funktion byggd och testad mot flera olika skärmdumpar (ljust/mörkt
      läge, beskurna bilder, andra produkter än Claude Code)
- [ ] Disclaimer, README-uppdatering och site-nav enligt `Ovrigt/CLAUDE.md`

## 6. Produktionsordning

1. ~~Besluta delfrågor c, d, e och g med Kent.~~ Klart (v2).
2. Fräscha-ögon-genomläsning av hela PRD:n (Regel 7), innan frysning.
3. Frys PRD:n.
4. Skriv SPEC.md: exakt vilka fält OCR:en ska leta efter, hur textmönster
   mappas till respektive mätare, vad som händer vid 0 träffar eller
   flertydiga träffar.
5. Bygg funktionen enligt `kent-bygg-sidor`-mönstret, återanvänd
   beräkningslogiken från det befintliga verktyget via en delad JS-fil.
6. Testa OCR-robusthet mot flera olika skärmdumpar (inte bara Kents egen).
7. Lägg till disclaimer, README-uppdatering, site-nav och
   `{ } GitHub`-hörna enligt checklistan i `Ovrigt/CLAUDE.md`.
8. Påminn Kent om commit (Kent commitar och pushar själv).

## 7. Källor

Tesseract.js (n.d.) 'Tesseract.js – Pure Javascript OCR for 100
Languages', *projectnaptha.com*. Tillgänglig:
https://tesseract.projectnaptha.com/ *(Officiell dokumentation, verifierad
2026-08-04 via direkt sidhämtning — bekräftar att biblioteket är en ren
JavaScript-port av Tesseract OCR-motorn som körs helt client-side via
WebAssembly, utan server. Detta är grunden för beslutet i delfråga a att
välja OCR i stället för en backend-kopplad AI-bildanalys.)*

## 8. Status

**Fryst.** Alla sju delfrågor (a–g) beslutade, en fräscha-ögon-genomläsning
genomförd (tre glapp rättade i v2), och takt-jämförelsen lyft fram som
verktygets faktiska kärna (v3) efter att Kent uttryckligen bad om det.
Kent bekräftade 2026-08-04 att PRD:n är redo att frysas och att han inte
har mer att bidra med till SPEC.md-processen — Claude författar den som
nästa steg, se `SPEC_publik_variant.md`. Ingen kod skrivs förrän SPEC.md
är granskad av Kent.

## Ändringslogg

- 2026-08-04 (v1): Skapad efter diskussion med Kent om en publik variant
  av Claude-kostnad-verktyget, utlöst av ett rollspel där Kent skickade in
  sin egen skärmdump som "vem som helst" för att testa om en anonym
  besökare skulle få samma analys. Etablerat att beräkningslogiken redan
  är generisk (stateless), och att den huvudsakliga nya utmaningen är
  bild-till-siffror-tolkning. Beslutat: klient-side OCR (Tesseract.js) i
  stället för AI-bildanalys plus backend, eftersom Kent uttryckligen inte
  vill koppla in Firebase eller motsvarande just nu. Sidplacering
  (delfråga d) lämnad öppen på Kents uttryckliga begäran.
- 2026-08-04 (v2): Alla återstående delfrågor beslutade efter Kents svar.
  Firebase dokumenterat som en medveten framtida möjlighet (Kent har
  jobbat med det förut och vill lära sig det bättre generellt, men inte
  koppla in det i just detta projekt nu) i stället för att bara avfärdas.
  c: förifyllda, redigerbara fält — aldrig blind automatik. d: egen ny
  sida, för att göra syftet tydligt från start; beräkningslogik bryts ut
  till en delad JS-fil. e: frågan omformulerad i klarspråk efter att Kent
  inte förstod ursprungsformuleringen — takt-jämförelsen (förbrukat vs.
  hur långt in i cykeln man är) är själva kärnan i "ligger jag i
  fas"-frågan och ska ingå. g: SPEC.md beslutat, författas av Claude,
  Kent granskar snarare än skriver den. Leveranser och Status
  uppdaterade.
- 2026-08-04 (v3): På Kents uttryckliga begäran lyft takt-jämförelsen från
  att bara stå i delfråga e till att synas tydligt redan i Kärnfrågan och
  Syfte — riktat mot en förstagångsbesökare som inte känner till
  bakgrunden, inte bara mot Kent själv. Ny förklarande stycke direkt under
  Kärnfrågan ("Det som faktiskt gör svaret värt något"), Syftets första
  punkt omskriven till att leda med takt-jämförelsen i stället för att
  nämna den indirekt, och Omfattningens kärnberäknings-punkt uppdaterad
  för att explicit markera takt-jämförelsen som obligatorisk, inte en
  tilläggsfunktion. Inga nya beslut — samma sakinnehåll som v2, bara
  omprioriterat för att göra verktygets faktiska värde omöjligt att missa
  för en läsare som inte redan vet det.
- 2026-08-04 (v4): PRD fryst av Kent. Kent bekräftade uttryckligen att han
  inte tror sig kunna bidra med innehåll till SPEC.md-processen och bad
  Claude författa den själv — i linje med det redan beslutade delfråga g.
  Leveranser och Status uppdaterade. Nästa steg: `SPEC_publik_variant.md`.
