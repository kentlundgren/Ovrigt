# CLAUDE.md – Ovrigt-repot

**Mapp:** `C:\Users\kentl\OneDrive\AI\Claude\Ovrigt`
**Repo:** [kentlundgren/Ovrigt](https://github.com/kentlundgren/Ovrigt)
**Live:** https://kentlundgren.github.io/Ovrigt/
**Senast uppdaterad:** 2026-07-28
**Version:** 1.0

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
3. Lägg till `{ } GitHub`-hörna (nedre vänstra hörnet) som pekar på
   `https://github.com/kentlundgren/Ovrigt`

### Brand

- Text: `{ O } Ovrigt`
- Bakgrund: `#1a3a5c` (samma marinblå som Ekonomi)
- Typsnitt i nav: `"Courier New", monospace`

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
- [ ] `{ } GitHub`-hörna
- [ ] Påminn Kent om commit

---

_CLAUDE.md v1.0, 2026-07-28_
