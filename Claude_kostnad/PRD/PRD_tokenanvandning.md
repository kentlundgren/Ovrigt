# PRD – Tokenanvändning vs. Pro-abonnemangets gränser

**Namn:** PRD_tokenanvandning
**Plats:** `Claude_kostnad/PRD/PRD_tokenanvandning.md`
**Skapad:** 2026-08-03
**Version:** 1 (första utkastet — planeringsfas, ingen kod ännu)
**Status:** Under arbete. Bakgrund, syfte och omfattning utkastade. Fyra
delfrågor (c–f) återstår innan PRD:n kan frysas.
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

### Terminologi — Kents tidsspråk vs. Anthropics faktiska cykler

Det här är den centrala missmatchningen PRD:n behöver lösa innan ett
verktyg kan byggas. Kent tänker i **dygn / vecka / månad**. Anthropic
exponerar inte de cyklerna rakt av — enligt officiell dokumentation
(se avsnitt 7) finns tre andra cykler:

| Kents begrepp | Anthropics faktiska mätare | Cykel |
|---|---|---|
| "Senaste dygnet / kvar idag" | **Current session** | Återställs var 5:e timme (inte en gång per dygn) |
| "Senaste veckan / kvar denna vecka" | **Weekly limits (all models)** | Återställs en fast dag/tid per vecka, samma varje cykel |
| "Innevarande månad / kvar denna månad" | **Usage credits** (€, aktiveras först när plangränsen nåtts) | Månatligt spend-tak; exakt återställningsdag inte specificerad i Anthropics egen dokumentation (se avsnitt 7, källa 1) |

Det finns alltså **ingen** mätare som motsvarar "dygn" rakt av — närmaste
proxy är sessionsmätaren (5 timmar), som återställs flera gånger per dygn.
Se delfråga c för hur detta ska hanteras i verktyget.

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
  usage credits).
- Ett enkelt, fristående HTML-verktyg i `Claude_kostnad/`, i samma stil som
  Ovrigt:s övriga kalkyler (Ölkalkylen, Släp-kalkylen): Kent matar manuellt
  in avlästa värden (t.ex. session % + tid till reset, vecka % + tid till
  reset, usage credits € spenderat + gräns), verktyget visar förbrukat/kvar
  per cykel.
- Beslut om verktyget ska spara historik över flera avläsningar (för trend)
  eller bara visa ett ögonblick (delfråga d).
- Beslut om SPEC.md-checkpoint enligt Claude-kompassens stående delfråga
  (delfråga f).

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
daglig mätare? — ÖPPEN.** Tre alternativ att välja mellan:
  1. Använd sessionsmätaren (5h) rakt av som "just nu"-bild, utan att
     försöka konstruera ett dygnsbegrepp — visa bara session/vecka/
     usage credits som de tre faktiska cyklerna.
  2. Härled ett dygnssnitt genom att dela veckoförbrukningen (%) med antal
     dagar sedan senaste veckoreset — en beräknad approximation, inte en
     Anthropic-mätare.
  3. Låt Kent mata in sessionsmätaren flera gånger under samma dygn och
     summera manuellt till en dygnssiffra (kräver flera avläsningar/dag).

**d) Ska verktyget spara historik över flera avläsningar (trend över tid),
eller bara visa ett ögonblick? — ÖPPEN.** Påverkar tekniskt scope
(localStorage/enkel lagring) och om ett SPEC.md-steg motiveras (se f).

**e) Hur ofta vill Kent mata in data, och vill han ha en påminnelse (t.ex.
ett schemalagt jobb)? — ÖPPEN.**

**f) Behövs ett SPEC.md-steg härifrån? — ÖPPEN, preliminär lutning: nej.**
Om svaret på d blir "bara ögonblicksbild" liknar verktyget strukturellt
Ovrigt:s befintliga fristående kalkyler (samma mönster som Ölkalkylen) —
inte tekniskt komplext eller starkt agent-drivet. Om svaret på d blir
"spara historik" kan bedömningen behöva omprövas. Ställningstagandet görs
i nästa version, efter d.

**g) Var ska verktyget/dokumentationen ligga? — BESLUTAT ✓.** I
`Claude_kostnad`-mappen i `Ovrigt`-repot — skapad av Kent specifikt för det
här syftet (känt-nytt enligt mappkontrollen, inget att flagga).

## 5. Leveranser

- [x] De tre skärmdumparna granskade och förstådda
- [x] Åtkomst till AI-teknik-repot (Claude-kompassens PRD-mall) säkrad
- [x] Två officiella Anthropic-källor verifierade om session-/vecko-/
      usage credits-cyklerna
- [ ] Delfråga c (dygns-tolkning) beslutad
- [ ] Delfråga d (historik vs. ögonblicksbild) beslutad
- [ ] Delfråga e (inmatningsrutin/påminnelse) beslutad
- [ ] Delfråga f (SPEC.md-checkpoint) slutgiltigt beslutad
- [ ] Fräscha-ögon-genomläsning genomförd (Regel 7)
- [ ] PRD fryst av Kent
- [ ] HTML-verktyg byggt (separat steg, efter frysning)
- [ ] README.md + site-nav + GitHub-hörna enligt `Ovrigt/CLAUDE.md` (när
      HTML-sidan skapas)

## 6. Produktionsordning

1. Diskutera och besluta delfrågor c–f med Kent.
2. Fräscha-ögon-genomläsning av hela PRD:n (Regel 7), innan frysning.
3. Frys PRD:n.
4. Bygg HTML-verktyget (`kent-bygg-sidor`-mönstret, samma stil som Ovrigt:s
   övriga kalkyler).
5. Lägg till README.md, site-nav och GitHub-hörna enligt checklistan i
   `Ovrigt/CLAUDE.md`.
6. Påminn Kent om commit (Kent commitar och pushar själv).

## 7. Källor

Claude Help Center (2026a) 'Manage usage credits for paid Claude plans',
*support.claude.com*. Tillgänglig:
https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans
*(Officiell dokumentation om usage credits — bekräftar att de är en
overflow-mekanism efter att plangränsen nåtts, med ett användarinställt
månatligt spend-tak. Anger inte exakt vilken dag den månatliga perioden
återställs, vilket är skälet till att delfråga c/g i avsnitt 4 inte kan
besvaras enbart utifrån källan — Kents skärmdump anger "Resets Sep 1" som
det konkreta datumet för hans eget konto.)*

Claude Help Center (2026b) 'What is the Pro plan?', *support.claude.com*.
Tillgänglig: https://support.claude.com/en/articles/8325606-what-is-the-pro-plan
*(Officiell primärkälla för att sessionsgränsen återställs var 5:e timme
och att veckogränsen återställs på en fast dag/tid per konto — grunden för
terminologi-tabellen i avsnitt 1 och delfråga c.)*

## 8. Status

Tidigt planeringsskede. Bakgrund, terminologi-mappning, syfte och omfattning
är utkastade utifrån de tre bilder Kent delat och två verifierade
Anthropic-källor. Fyra delfrågor (c–f) återstår — främst hur "dygn" ska
tolkas när Anthropic inte exponerar en daglig mätare (c), och om verktyget
ska spara historik (d), vilket i sin tur påverkar SPEC.md-bedömningen (f).
Ingen kod skriven, i linje med Kents uttryckliga instruktion om att detta
är planeringsfasen.

## Ändringslogg

- 2026-08-03 (v1): Skapad efter genomgång av tre skärmdumpar i
  `Claude_kostnad/Bilder/` och Kents svar på klargörande frågor (huvudfokus:
  plangränser, inte rå tokenstatistik; datainmatning: manuell avläsning).
  Struktur följer `PRD_generell.md` i AI-teknik-repot. Två officiella
  Anthropic-källor research:ade och verifierade för terminologi-avsnittet.
