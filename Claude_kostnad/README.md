# Claude-kostnad – ligger jag i fas med mitt Pro-abonnemang?

_Version 1.0, 2026-08-03_

## Live-sida

| Sida | URL |
| ---- | --- |
| Claude-kostnad | [index.html – live](https://kentlundgren.github.io/Ovrigt/Claude_kostnad/index.html) |

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

Data matas in manuellt (ingen inloggning/API-hämtning). Historik sparas
inte i webbläsaren utan i en enkel, git-spårad logg: [`data.md`](data.md).
Verktyget har en "Kopiera rad"-knapp som formaterar en färdig markdown-rad
att klistra in där.

Se [`PRD/PRD_tokenanvandning.md`](PRD/PRD_tokenanvandning.md) för fullständig
bakgrund, alla beslut och källor, eller blogginlägget
[Ligger jag i fas med Claude?](https://klel.wordpress.com/2026/08/04/ligger-jag-i-fas-med-claude/)
(klel.wordpress.com, 4/8 2026) för en mer berättande version av samma
resonemang.

## Filer

| Fil | Innehåll |
| --- | -------- |
| `index.html` | Det interaktiva verktyget |
| `data.md` | Manuellt förd historik-logg |
| `PRD/PRD_tokenanvandning.md` | Kravdokument — bakgrund, terminologi, beslut, källor |
| `Bilder/` | Skärmdumpar som underlag för PRD:n |
