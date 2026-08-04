# Data – Översikt (Sessions/Messages/Tokens/streaks)

Separat logg från [`data.md`](data.md), medvetet — den här filen fångar en
**annan sorts data**: kumulativ användningsstatistik från fliken
**Inställningar → Usage → Overview** (bredvid "Models"), med en
period-väljare **All / 30d / 7d**. Det är inte samma sak som
`data.md`:s cykel-bundna mätvärden (session/vecka/usage credits, som alla
är knutna till en specifik återställningsklocka) — det här är istället ett
löpande, kumulativt "hur mycket/ofta använder jag Claude"-mått.

**Vad som loggas** (samtliga fält syns i samma översiktsruta i Usage-vyn):

- **Sessions** — antal sessioner inom vald period
- **Messages** — antal skickade meddelanden inom vald period
- **Total tokens** — total tokenförbrukning inom vald period
- **Active days** — antal dagar med aktivitet inom vald period
- **Current streak** — sammanhängande dagar med aktivitet, just nu
- **Longest streak** — längsta sammanhängande streak inom vald period
- **Peak hour** — den timme på dygnet flest meddelanden skickas
- **Favorite model** — mest använda modell inom vald period

**Varför en egen fil och inte en till kolumn i `data.md`:** olika
tidsperspektiv (kumulativt/period-filtrerat mot cykel-bundet), olika
källa (en annan flik i Usage-vyn), och olika uppdateringstakt förväntad
(streaks och active days ändras inte meningsfullt timme för timme, till
skillnad från session/usage credits). Att blanda dem i samma tabell hade
gjort `data.md` svårläst.

**Hur denna data kan förbättra trendanalysen:** en enskild avläsning här
säger inte mycket om takt (det gör redan `data.md`). Värdet kommer när
flera avläsningar över tid jämförs — deltan i Sessions/Messages/Total
tokens mellan två avläsningar visar hur *intensivt* Claude användes under
mellanperioden, vilket kan förklara **varför** usage credits-takten i
`data.md` samtidigt gick upp eller ner. Peak hour och streaks ger
dessutom beteendekontext (t.ex. om långa arbetspass sent på kvällen
sammanfaller med overflow-perioder). Ett obekräftat antagande: exakt vad
"All" räknar sitt startdatum från (kontots skapelsedatum, eller något
annat) är inte känt — flaggat här tills det bekräftas.

| Datum | Period | Sessions | Messages | Total tokens | Active days | Current streak | Longest streak | Peak hour | Favorite model | Anteckning |
|---|---|---|---|---|---|---|---|---|---|---|
| 2026-08-04 | All | 32 | 13 558 | 9,3M | 13 | 0d | 9d | 21:00 (9 PM) | Sonnet 5 | Första loggade avläsningen av denna datatyp. Delades samtidigt som kl 24-avläsningen i `data.md` (session/vecka/usage credits), men är ett separat, kumulativt mått — ingen delta att jämföra mot ännu. |
