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

## Historisk kontext (frivilligt, ej del av mätningen)

Utrymme för att notera ovanliga fakturor/påfyllningar från Billing-sidan,
t.ex. perioder med ovanligt hög förbrukning. Rent informativt — påverkar
inte tabellen ovan.

- 2026-04: Ovanligt hög påfyllning av usage credits, ≈91,56 € utöver den
  ordinarie abonnemangsavgiften (22,50 €) — flera separata köp under
  april. Tecken på att plangränserna nåddes ofta den månaden.
