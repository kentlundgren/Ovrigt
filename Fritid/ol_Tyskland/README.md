# Ölkalkylen – lönar det sig att köra till Tyskland?

_Version 1.1, 2026-07-31_

---

## Live-sida

| Sida | URL |
| ---- | --- |
| Ölkalkylen | [index.html – live](https://kentlundgren.github.io/Ovrigt/Fritid/ol_Tyskland/index.html) |

> **Obs:** GitHub Pages kan ta några minuter att uppdatera efter push.

---

## Om kalkylen

Interaktiv kalkylator som svarar på frågan: **hur många öl måste du köpa för att Tysklandsresan ska löna sig?**

Du fyller i:

- Startort (t.ex. Lund, Malmö, Kalmar, Stockholm)
- Köpställe i Tyskland (Puttgarden eller Rostock)
- Antal personer i bilen
- Bilklass och bränsleförbrukning
- Ölpriser i Sverige och Tyskland (gul bakgrund = redigerbara fält)
- Bro- och färjealternativ

Kalkylen räknar om direkt och visar break-even: hur många öl som behövs för att täcka rese- och transportkostnaden, med källbelagda värden (**K**) och rimlighetsantaganden (**A**).

### Ölbilder (kul lager)

- Vid start visas en snabb bild med två kalla öl (`tva_kalla_ol.jpg`) – stäng med knappen, klick, Esc eller vänta ca 2,6 s.
- När du ändrat något i kalkylen visas en stängbar ölbild i resultatboxen (Mariestads-burkar eller flaskor beroende på förpackning).
- Stängda bilder går att visa igen via länken *Visa ölbild igen*.

### Släp (tillagt 2026-07-31)

Ett eget "Släp"-kort låter dig räkna med en 750 kg-klass släpvagn (`bil_och_slap.jpg`, `slap.jpg` visar den typ antagandena bygger på):

- Lägger till släpets nyttolast (redigerbar, default 600 kg) till den tekniska viktgränsen
- Dubblerar broavgiften, lägger till färjetillägg och ett bränslepåslag på 25 %
- Två kryssrutor för kostnad: lånat släp (gratis) eller hyrt (schablon 350 kr/dygn)
- Textvarning om 40 km/h-regeln för obromsat släp (gäller bara i Sverige)
- Ny volymbaserad rimlighetskontroll vid sidan av vikt- och lag-gränsen
- Extra "godis": knapp som visar fördelningen släp/bil för ett fast scenario på 90 flak (33 cl)

Bakgrund, antaganden och källor finns i [`PRD_slap.md`](PRD_slap.md) – planeringsdokumentet som togs fram innan funktionen kodades.

---

## Filer

| Fil | Innehåll |
| --- | -------- |
| [`index.html`](https://kentlundgren.github.io/Ovrigt/Fritid/ol_Tyskland/index.html) | Interaktiv ölkalkylator (resa, bil, släp, ölval, resultat) + ölbilder |
| `tva_kalla_ol.jpg` | Startbild (två kalla ölglas) |
| `Mariestad.jpg` | Resultatbild för burköl |
| `olflaskor.jpg` | Resultatbild för glasöl |
| `bil_och_slap.jpg` | Referensbild för antagen släpvagnstyp (bil med släp) |
| `slap.jpg` | Referensbild för antagen släpvagnstyp (närbild) |
| `PRD_slap.md` | Planeringsdokument (PRD) för släp-funktionen: antaganden, kostnader, öppna frågor |
| `README.md` | Denna fil |
| `CLAUDE.md` | Instruktioner för AI i denna mapp |

---

## Placering i repot

```
Ovrigt/
└── Fritid/
    └── ol_Tyskland/     ← denna mapp
```

Repo: [kentlundgren/Ovrigt](https://github.com/kentlundgren/Ovrigt) → `Fritid/ol_Tyskland/`

---

_README v1.1, 2026-07-31_
