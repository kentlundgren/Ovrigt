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

**Usage credits denna cykel** kommer från Usage-sidans "€X spent, resets
[datum]" — *inte* från fakturorna på Billing-sidan (de är påfyllningar,
inte förbrukning, se delfråga i).

| Datum | Session % (just nu) | Vecka-produkt | Vecka % (mot aktiv gräns) | Aktiv boost % | Boost slutdatum | Vecka % (normalbaslinje) | Usage credits denna cykel (€) | Usage credits-gräns (€) | Anteckning |
|---|---|---|---|---|---|---|---|---|---|
| | | | | | | | | | |

## Historisk kontext (frivilligt, ej del av mätningen)

Utrymme för att notera ovanliga fakturor/påfyllningar från Billing-sidan,
t.ex. perioder med ovanligt hög förbrukning. Rent informativt — påverkar
inte tabellen ovan.

- 2026-04: Ovanligt hög påfyllning av usage credits, ≈91,56 € utöver den
  ordinarie abonnemangsavgiften (22,50 €) — flera separata köp under
  april. Tecken på att plangränserna nåddes ofta den månaden.
