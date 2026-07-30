# PRD – Släpvagnsstöd i Ölkalkylen

**Status:** Planering, inget kodat än
**Mapp:** `Ovrigt/Fritid/ol_Tyskland`
**Berör fil:** `index.html`
**Skapad:** 2026-07-31

---

## 1. Mål

Lägg till möjligheten att räkna på bil **med släpvagn** i Ölkalkylen, med fokus på
resan Lund → Tyskland. Puttgarden är huvudfokus (källbelagda priser finns redan).
Rostock är sekundärt – om data saknas görs ett tydligt flaggat antagande istället
för att lämna det oräknat.

Ingenting nedan är kodat. Detta är en samlad kravbild inför kodning.

---

## 2. Antagen släpspecifikation (A – ej källbelagt, generisk 750 kg-klass)

Baserat på de två bilderna i projektmappen (`bil_och_slap.jpg`, `slap.jpg`):
öppen, galvaniserad, obromsad kaross-släpvagn.

| Egenskap | Antaget värde |
|---|---|
| Totalvikt | 750 kg |
| Nyttolast | ~600 kg |
| Lastyta | ~250 × 125 cm |
| Sidohöjd (nätgrindar) | ~35–40 cm |
| Volym (innan kapellbula) | ~1 170 liter |
| Broms | Obromsad |

Om Kent har ett verkligt släp med kända mått ersätts dessa värden.

---

## 3. Lastkapacitet – tre separata tal, alltid synliga

Ingen av gränserna får tyst dölja/ersätta en annan. Alla tre visas parallellt:

1. **Ekonomiskt motiverat antal** (dagens break-even-beräkning, oförändrad grundlogik)
2. **Tekniskt max (vikt)** – bilens nyttolast + släpets nyttolast, minus 90 kg/person
3. **Lagligt max** – EU:s riktmärke 110 liter/person (oförändrad, redan i koden)
4. **Volymmässigt rimligt (NYTT)** – ny, mjuk sanity-check

### Nya volymantaganden (A)

| Bilklass | Antagen bagagevolym |
|---|---|
| Liten bil (20 000 kr) | 320 liter |
| Mellanklass (100 000 kr) | 420 liter |
| Stor bil (400 000 kr) | 550 liter |

Släpets volym: ~1 170 liter (se ovan). Ett flak (24 × 33 cl) ≈ 13 liter volym (A).

### Räkneexempel som redan verifierats i konversationen

- Stor bil, 3 personer, **utan** släp: tekniskt max 942 öl (under lagligt max 1 000 öl – vikten binder här)
- Släp lastat med 600 kg öl: 1 714 öl rent viktmässigt, **71 hela flak** (1 704 öl), kräver **3 lager**
  (~37–38 cm) – maxar ut både vikt och antagen sidohöjd (35–40 cm) ungefär samtidigt

---

## 4. Extra kostnader med släp

| Post | Belopp | Status |
|---|---|---|
| Öresundsbron | 745 → **1 490 kr** (ordinarie, dubbelt pris) | **K** – [Öresundsbron priser](https://www.oresundsbron.com/sv/priser) |
| Scandlines (Puttgarden) | + ca 340 kr per 2 extra löpmeter | **A** |
| Stena Line (Rostock) | Antaget ~dubblat pris jämfört med utan släp | **A** – ingen källa hittad trots sökning |
| Bränsle | **+25 % påslag** på kr/mil | **A** |
| Släpvagnshyra | 0 kr (lånat) ELLER ~350 kr/dygn (hyrt) | **K** – [Circle K](https://www.circlek.se/biluthyrning-slap) 369 kr/dygn, [OKQ8](https://www.okq8.se/hyrbil/hyra-slap/priser/) 339 kr/dygn |

### Kodplacering för bränslepåslaget

Ny konstant i `<script>`-blocket i `index.html`, direkt efter `const FUEL_PRICE = 15.99;`
och `CAR_CLASSES`-definitionen (samma ställe som `fuelRate`/`depreciationRate` räknas ut idag):

```js
const TRAILER_FUEL_SURCHARGE = 0.25; // +25% bränsleförbrukning vid dragning av släp – ANTAGET, ej källbelagt
```

Ska även få en egen post i `NOTES`-objektet så den syns i "Källor och antaganden".

---

## 5. Hastighetsregler med släp (K – verifierat direkt mot Transportstyrelsen)

Källa: [Transportstyrelsen – Släpvagn och husvagn](https://www.transportstyrelsen.se/sv/vagtrafik/fordon/fordonsregler/regler-for-olika-fordonsslag/slap/slapvagn-husvagn/)

| Land | Regel |
|---|---|
| Sverige | Bromsat släp: alltid max 80 km/h. **Obromsat släp:** 80 km/h om lastad totalvikt ≤ halva bilens tjänstevikt, annars **40 km/h** |
| Danmark | 80 km/h med släp (mot 130 km/h utan) |
| Tyskland | 80 km/h, kan höjas till 100 km/h med Tempo 100-intyg (DEKRA, ~1 990 kr) |

**Viktigt:** 40 km/h-risken gäller bara i Sverige, och bara för obromsat släp.

### Antagna tjänstevikter (A) – avgör om 40 eller 80 km/h gäller

| Bilklass | Antagen tjänstevikt | Halva tjänstevikten | Fullastat 750 kg-släp klarar 80 km/h? |
|---|---|---|---|
| Liten bil | 1 050 kg | 525 kg | Nej – 40 km/h |
| Mellanklass | 1 450 kg | 725 kg | Nästan – tekniskt nej vid full last (750 > 725) |
| Stor bil | 1 900 kg | 950 kg | Ja, gott om marginal |

---

## 6. UI-tillägg

- Kryssruta: **"Kör med släpvagn (750 kg-klass)"** – aktiverar allt ovan
- Två kryssrutor för kostnad (ömsesidigt uteslutande):
  - "Lånat släp (gratis)" → 0 kr
  - "Hyrt släp (rimlig kostnad)" → ~350 kr/dygn
- Ny varning: 40 km/h-risk baserat på vald bilklass + släpvikt
- Ny volym-varning vid sidan av dagens vikt- och lag-varningar
- Knapp/växel: **"Visa: vad blir det om jag köper 90 flak (33 cl)?"** – fast scenario,
  inte ett fritt inmatningsfält. Visar fördelning släp/bil och totalkostnad för exakt 90 flak.
- Avgångstid som eget fält: dropdown med hela klockslag **04:00–20:00**, default **06:00** (Lund)

---

## 7. Nya defaultvärden

| Fält | Nytt default |
|---|---|
| Startort | Lund (oförändrat) |
| Destination | Puttgarden (oförändrat) |
| Antal personer | **3** (ändrat från 2) |
| Avgångstid | **06:00** (nytt fält) |
| Bilklass | 100 000 kr / mellanklass (oförändrat) |

---

## 8. Öppna frågor inför/under kodning

- [ ] Är antagna tjänstevikter (1 050/1 450/1 900 kg) rimliga, eller ska de justeras?
- [ ] Är bagagevolym-antagandena (320/420/550 liter) rimliga?
- [ ] Är 25 % bränslepåslag okej som schablon?
- [ ] Ska 40 km/h-varningen påverka tidsschemat automatiskt (dubblar körtiden), eller bara visas som text?
- [ ] Exakt UI-placering: eget "Släp"-kort, eller inbyggt i befintligt "Bil"-kort?
- [ ] Ska släp-alternativet aktiveras för Rostock-rutten också, trots att Stena Lines
      släptillägg är ett rent antagande?

---

## 9. Relation till CLAUDE.md

Detta är ett funktionsspecifikt kravdokument (PRD), inte en instruktion till Claude.
`CLAUDE.md` i den här mappen förblir oförändrad och handlar om arbetssätt
(site-nav, README-regler, humanizer). Om släp-funktionen byggs klart kan
`CLAUDE.md` få en kort rad som nämner att funktionen finns och pekar hit –
detaljerna ska inte dupliceras dit.
