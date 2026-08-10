# CLAUDE.md – Ovrigt-repot

**Mapp:** `C:\Users\kentl\OneDrive\AI\Claude\Ovrigt`
**Repo:** [kentlundgren/Ovrigt](https://github.com/kentlundgren/Ovrigt)
**Live:** https://kentlundgren.github.io/Ovrigt/
**Senast uppdaterad:** 2026-08-10
**Version:** 1.2

---

## Om detta repo

Samlar övriga webbprojekt (inte Ekonomi, inte ArbetenSokta):

| Mapp | Innehåll |
| ---- | -------- |
| `Hemma/` | Laddboxar, VM-tips m.m. |
| `Fritid/` | Fritidskalkyler, t.ex. Ölkalkylen |
| `index.html` | Rot-TOC med site-nav |

Det finns **ingen** `agents.md` i detta repo. Regler för Claude ligger i denna fil
samt i eventuella undermappars egna `CLAUDE.md`.

### Skills för löpande text

Humanizer ligger som **användarskill** (inte i detta repo):

`C:\Users\kentl\.claude\skills\humanizer_ton\SKILL.md`

Aktivera den när blogginlägg eller annan löpande text ska skrivas/granskas.
(Originalet finns kvar i Ekonomi-repot under `skills/humanizer_ton/`.)

Referens för samma nav-/README-mönster: Ekonomi-projektets
`CLAUDE.md` och `skills/projekt_struktur/SKILL.md`.

---

## 📌 Regel – README.md när ny mapp eller HTML-sida skapas

När en **ny mapp** eller **ny `index.html` / HTML-sida** skapas ska Claude
**direkt i samma arbetspass**:

1. Skapa eller uppdatera `README.md` **i den nya mappen**
2. Uppdatera `README.md` i **överliggande mappar** (t.ex. `Fritid/README.md`
   och rotens `README.md`) så att den nya sidan syns i innehållstabellen
3. Varje README som beskriver en HTML-sida ska ha en tydlig rubrik
   **Live-sida** / **Live-sidor** med klickbar GitHub Pages-URL:
   `https://kentlundgren.github.io/Ovrigt/<sökväg>`

Gäller även enligt den globala regeln i `AI\Claude\CLAUDE.md`:
README ska länka till Live-sidan när GitHub Pages används.

Påminn Kent om att committa README-filerna tillsammans med HTML-sidorna.

---

## 📌 Regel – Site-nav (struktur uppe till vänster)

Alla HTML-sidor i Ovrigt ska ha en **site-nav** längst upp, samma idé som i
[Ekonomi](https://kentlundgren.github.io/Ekonomi/):

```
{ O } Ovrigt / Fritid / Ölkalkylen
```

### Sidtyper

| Typ | Exempel | Nav |
| --- | ------- | --- |
| **Rot-TOC** | `index.html` | Brand `{ O } Ovrigt` + dropdown för Hemma/Fritid |
| **Sektions-TOC** | `Fritid/index.html` | Breadcrumb: `{ O } Ovrigt / Fritid` |
| **Innehållssida** | `Fritid/ol_Tyskland/index.html` | Breadcrumb uppåt i hierarkin |

### När ny sida skapas

1. Lägg till breadcrumb/site-nav på den nya sidan
2. Uppdatera dropdown/länkar på **roten** (`index.html`) och relevant sektions-TOC
3. Lägg till `{ } GitHub`-hörna (nedre vänstra hörnet) **tillsammans med** en
   `</> teknik`-knapp (nedre högra hörnet) — se nästa regel

### Brand

- Text: `{ O } Ovrigt`
- Bakgrund: `#1a3a5c` (samma marinblå som Ekonomi)
- Typsnitt i nav: `"Courier New", monospace`

---

## 📌 Regel – Hörn-länkar: GitHub (vänster) + Teknik-modal (höger)

**Alla** HTML-sidor i Ovrigt-repot ska ha två diskreta, fasta hörn-element längst ner —
inte bara sidor byggda som interaktiva verktyg/dashboards:

- **Nedre vänstra hörnet:** `{ } GitHub`-länk till
  `https://github.com/kentlundgren/Ovrigt` (eller relevant undermapp i repot)
- **Nedre högra hörnet:** `</> teknik`-knapp som öppnar en modal med korta,
  konkreta, verifierbara fakta om just den sidans uppbyggnad (inga floskler)

Båda ska vara **diskreta** — låg opacitet (~0.55) i vila, tydligare vid hover, aldrig
konkurrera visuellt med sidans faktiska innehåll. De hör ihop som ett par och ska alltid
läggas till tillsammans, inte den ena utan den andra.

**Referensimplementation (fullständig CSS/HTML/JS att kopiera):**
`Claude_kostnad/index.html` — klasser `.github-corner`, `.tech-corner`,
`.modal-overlay`, `.modal`, `.tech-grid`, `.tech-card`, med
`addEventListener`-baserad öppna/stäng-logik (inte inline `onclick`).

**Bakgrund:** Denna regel fanns tidigare bara delvis dokumenterad — GitHub-hörnan i
denna fil, teknik-modal-knappen bara i skillen `kent-bygg-sidor`. När
`Hemma/Matlagning/Pasta/`-receptsidorna byggdes 2026-08-10 användes först en boxig
GitHub-knapp inline i footern istället för det etablerade diskreta hörn-mönstret. Kent
påpekade det och bad att båda hörn-elementen läggs till som standard, och att detta
dokumenteras här så det inte missas igen.

Se även `kent-bygg-sidor`-skillens Regel 6 för fullständig teknik-modal-specifikation
(färger, storlekar, innehållskrav på tech-card-texten).

---

## 📌 Regel – Commit och push

**Kent commitar och pushar själv.** Claude commitar endast om Kent uttryckligen ber om det.

Föreslå gärna:

```powershell
cd "C:\Users\kentl\OneDrive\AI\Claude\Ovrigt"
git add .
git commit -m "Kort beskrivning"
git push
```

---

## Checklist vid ny HTML-sida / ny mapp

- [ ] `README.md` i mappen (med Live-sida-länk)
- [ ] Överliggande README:er uppdaterade
- [ ] Site-nav / breadcrumb på sidan
- [ ] Rot- eller sektions-`index.html` länkar till den nya sidan
- [ ] `{ } GitHub`-hörna (nedre vänster) **+** `</> teknik`-modal (nedre höger)
- [ ] Påminn Kent om commit

---

## Uppdateringslogg

- 2026-07-29 (v1.1): Tidigare version.
- 2026-08-10 (v1.2): Ny regel — `{ } GitHub`-hörna ska alltid paras med en
  `</> teknik`-modal-knapp i nedre högra hörnet, på alla HTML-sidor i repot (inte bara
  interaktiva verktyg). Tillagd efter att `Hemma/Matlagning/Pasta/`-receptsidorna först
  byggdes med en boxig footer-knapp istället för det etablerade hörn-mönstret.

---

_CLAUDE.md v1.2, 2026-08-10_
