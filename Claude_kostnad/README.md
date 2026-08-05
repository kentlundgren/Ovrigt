# Claude-kostnad – ligger jag i fas med mitt Pro-abonnemang?

_Version 2.1, 2026-08-05_

## Live-sidor

| Sida | URL |
| ---- | --- |
| Claude-kostnad (Kents eget verktyg) | [index.html – live](https://kentlundgren.github.io/Ovrigt/Claude_kostnad/index.html) |
| Dela — publik variant | [dela/index.html – live](https://kentlundgren.github.io/Ovrigt/Claude_kostnad/dela/index.html) |

## Om projektet

Ett litet, fristående verktyg som svarar på en enda fråga: **ligger jag i
fas med mitt Claude Pro-abonnemang — just nu, senaste veckan, och denna
månad?**

Anthropic exponerar inte de tre tidshorisonterna rakt av (ingen daglig
mätare finns) — bara tre andra cykler: session (var 5:e timme), vecka
(fast dag/tid) och usage credits (€, månatligt spend-tak). Verktyget
mappar Kents dygn/vecka/månads-språk mot dessa, och räknar dessutom om
veckoprocenten mot den **normala** 100%-baslinjen när en tillfällig
gränshöjning ("boost") är aktiv — något Anthropics eget UI inte visar.

Data matas in manuellt (ingen inloggning/API-hämtning), eller via en
frivillig OCR-genväg (samma bibliotek som den publika varianten, se
nedan) — men huvudvägen är fortfarande att skicka skärmdumpen direkt till
Claude i en chatt, som då uppdaterar fälten, loggar en rad i `data.md`
och ger en trendanalys i samma svep. Se delfråga j i
`PRD/PRD_tokenanvandning.md` för resonemanget bakom den avvägningen.
Historik sparas inte i webbläsaren utan i en enkel, git-spårad logg:
[`data.md`](data.md). Verktyget har en "Kopiera rad"-knapp som formaterar
en färdig markdown-rad att klistra in där.

Vid kritiska lägen eller på begäran tar Claude fram en **fördjupad analys-rapport**
(format: `analys_ÅÅÅÅ-MM-DD.md`) som dokumenterar situationen, förbrukningstakt,
orsaker och nästa steg. Se [`analys_2026-08-05.md`](analys_2026-08-05.md) för
det första exemplet — skrivet den dag veckogränsen nåddes och modellen nedgraderades
till Haiku 4.5. Dispositionen för dessa rapporter är beskriven i
[`.claude/skills/claude-kostnad/SKILL.md`](.claude/skills/claude-kostnad/SKILL.md).

Se [`PRD/PRD_tokenanvandning.md`](PRD/PRD_tokenanvandning.md) för fullständig
bakgrund, alla beslut och källor, eller blogginläggen
[Ligger jag i fas med Claude?](https://klel.wordpress.com/2026/08/04/ligger-jag-i-fas-med-claude/)
(klel.wordpress.com, 4/8 2026) och
[Jämför Haiku 4.5 med Sonnet 5](https://klel.wordpress.com/2026/08/05/jamfor-haiku-4-5-med-sonnet-5/)
(klel.wordpress.com, 5/8 2026) för mer berättande versioner av samma resonemang.

## Publik variant — `dela/`

En separat, publik sida där **vem som helst** kan ladda upp sin egen
skärmdump av Inställningar → Usage och få samma "ligger jag i fas"-analys
— utan inloggning, utan att något sparas. Bilden analyseras helt lokalt i
besökarens egen webbläsare med [Tesseract.js](https://tesseract.projectnaptha.com/)
(OCR/teckenigenkänning) — den skickas aldrig till någon server. Beräknings-
logiken (session/vecka/usage credits, boost-omräkning, takt-jämförelse) är
utbruten till [`js/berakning.js`](js/berakning.js) och delas mellan Kents
eget verktyg och den publika sidan, så att en framtida ändring i formlerna
bara behöver göras på ett ställe.

Föddes ur ett rollspel där Kent testade om en anonym besökares skärmdump
skulle ge samma analys som hans egen — se
[`PRD/PRD_publik_variant.md`](PRD/PRD_publik_variant.md) och
[`PRD/SPEC_publik_variant.md`](PRD/SPEC_publik_variant.md) för fullständigt
resonemang, delfrågor och tekniska beslut.

## Filer

| Fil | Innehåll |
| --- | -------- |
| `index.html` | Kents eget interaktiva verktyg |
| `data.md` | Manuellt förd historik-logg — session/vecka/usage credits (bara för Kents eget verktyg) |
| `data_oversikt.md` | Separat logg — kumulativ användningsstatistik (Sessions/Messages/Tokens/streaks) från Usage-vyns Overview-flik |
| `js/berakning.js` | Delade beräkningsformler — används av båda sidorna |
| `dela/index.html` | Den publika sidan — bilduppladdning + manuell inmatning |
| `dela/ocr.js` | OCR-anrop (Tesseract.js) och fältmappning för den publika sidan |
| `PRD/PRD_tokenanvandning.md` | Kravdokument för Kents eget verktyg — bakgrund, terminologi, beslut, källor |
| `PRD/PRD_publik_variant.md` | Kravdokument för den publika varianten |
| `PRD/SPEC_publik_variant.md` | Teknisk spec för OCR-fältmappning och gränsfall |
| `testad_260804.html` | Testrapport 2026-08-04 — verifierar att `index.html` och `dela/index.html` ger samma resultat, och loggar OCR-testet mot en riktig skärmdump |
| `analys_2026-08-05.md` | Fördjupad analys 5 aug 2026 — dokumenterar det kritiska läget (veckogräns nådd, spend-limit 86% förbrukad dag 5), beslutet att byta till Haiku 4.5, och rekommendationer framåt |
| `.claude/skills/claude-kostnad/SKILL.md` | Projektlokal Claude-skill — innehåller rutiner, begrepp, mekaniker och (v13) disposition för analys-rapporter |
| `Bilder/` | Skärmdumpar som underlag för PRD:erna |
