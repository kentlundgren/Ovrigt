# CLAUDE.md – Laddboxar, Långkatekesens Samfällighetsförening

**Mapp:** `Ovrigt/Hemma/laddboxar`
**Senast uppdaterad:** 2026-05-21
**Version:** 1.0

---

## Projektbeskrivning

Utredning av elbilsladdning för **Långkatekesens Samfällighetsförening** (23 garage,
Hjalmar Gullbergs Väg 2–46, 22466 Lund). Projektet analyserar tekniska lösningar,
kapacitet, offertpriser och ekonomi.

---

## Filer i projektet

| Fil | Syfte | Korsreferenser |
| --- | ----- | -------------- |
| `index.html` | Projektöversikt: bakgrund, nyckeltal, laddarjämförelse, systemarkitektur | → kalkylator.html, → ekonomisk_kalkyl.html, → offerter/ |
| `kalkylator.html` | Interaktiv kapacitetskalkylator (63 A, 400 V, trefas) | → index.html |
| `ekonomisk_kalkyl.html` | Ekonomisk kalkyl och offertjämförelse | → index.html, → kalkylator.html, → offerter/ |
| `offerter/Offert-3541 kraftringen.pdf` | Nätanslutning 16→63 A, 35 875 kr inkl. moms | Refereras i index.html och ekonomisk_kalkyl.html |
| `offerter/Offert från Elento_...pdf` | Installation laddsystem 23 garage | Refereras i ekonomisk_kalkyl.html |
| `offerter/Offert från Laddboxkillarna AB_...pdf (x2)` | Zaptec Pro i garage / på stolpe | Refereras i ekonomisk_kalkyl.html |
| `README.md` | GitHub-beskrivning med live-länkar | – |
| `CLAUDE.md` | Denna fil – instruktioner för AI | – |

---

## Regler för Claude i detta projekt

### 1. Korsreferenser – ALLTID kontrollera

> **Regel:** När ett dokument skapas eller uppdateras ska Claude alltid undersöka om
> andra dokument i projektet behöver uppdateras med korsreferenser eller nya länkar.

Konkret:
- Läggs en ny fil till → lägg till länk i `index.html` (sektionen "Filer i detta projekt") och i `README.md`
- Uppdateras ett pris eller en beräkning → kontrollera om `ekonomisk_kalkyl.html` eller `index.html` behöver uppdateras
- Skapas en ny HTML-sida → lägg till CTA-box eller länk i `index.html` och navigationslänk i `ekonomisk_kalkyl.html`

### 2. Navigering

Alla HTML-sidor ska ha tydliga navigationslänkar tillbaka till `index.html`. Minst:
- Länk tillbaka till projektöversikten (`index.html`)
- Länk till kalkylatorn (`kalkylator.html`)
- Länk till ekonomisk kalkyl (`ekonomisk_kalkyl.html`)

### 3. Inmatningsfält – gul bakgrund

Fält där användaren ska mata in data ska alltid ha **gul bakgrund** (`background: #fffff0`,
`border-color: #d69e2e`). Detta gäller i `ekonomisk_kalkyl.html` och alla framtida kalkylatorer.

### 4. Belopp och priser

- Alla priser anges i **kronor inkl. moms** om inget annat anges
- Kraftringen offert 3541: **35 875 kr inkl. moms** (28 700 kr exkl. moms), giltig t.o.m. ca 2026-05-27
- Laddboxkillarna AB erbjuder **Zaptec Pro** (22 kW, 3-fas, V2G-redo, OCPP, MID-certifierad)
- Elento – modell och priser fylls i från PDF-offert

### 5. GitHub Pages – live-URL:er

Bas-URL: `https://kentlundgren.github.io/Ovrigt/`

| Sida | Live-URL |
| ---- | -------- |
| Projektöversikt | https://kentlundgren.github.io/Ovrigt/Hemma/laddboxar/index.html |
| Kalkylator | https://kentlundgren.github.io/Ovrigt/Hemma/laddboxar/kalkylator.html |
| Ekonomisk kalkyl | https://kentlundgren.github.io/Ovrigt/Hemma/laddboxar/ekonomisk_kalkyl.html |

### 6. Commit och push

**Kent commitar alltid själv.** Claudes roll är att:
- Påminna om när en commit bör göras (t.ex. efter en substantiell ändring)
- Föreslå ett färdigt commit-meddelande

### 7. Källförteckning

Nya externa källor som citeras i `index.html` ska läggas till i källförteckningen
längst ned i filen (Harvardstil).

---

## Viktiga tekniska fakta att hålla i minnet

- Samfälligheten har **23 garage**
- Nuvarande säkring: **16 A (11 kW)** → uppgradering till **63 A (43,5 kW)** planeras
- Formel: P = √3 × 400 V × 63 A ≈ **43 670 W ≈ 43,5 kW**
- Aktuellt behov: **2 laddboxar** (maj 2026), förväntat växande
- Rekommenderad princip: **Make-Ready** – dra kabel till alla 23 garage vid första installationen
- V2G är hårdvaruförberett men ej kommersiellt tillgängligt i Sverige (maj 2026)

---

_CLAUDE.md v1.0 · 2026-05-21_
