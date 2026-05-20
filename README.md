# Ovrigt – Kent Lundgrens övriga projekt

_Version 1.1, 2026-05-21_

---

## Innehåll i detta repo

| Mapp / Fil | Projekt |
| ---------- | ------- |
| `Hemma/laddboxar/` | Utredning av elbilsladdning – Långkatekesens Samfällighetsförening |
| `main_has_no_remote_branch.html` | Biprojekt: Git & GitHub-guide – koppla Cursor till GitHub |

---

## Hemma / laddboxar

### Live-sidor (GitHub Pages)

> **Obs:** GitHub Pages kan ta några minuter att aktiveras första gången.

| Sida | URL |
| ---- | --- |
| Projektöversikt – laddboxar | [index.html – live](https://kentlundgren.github.io/Ovrigt/Hemma/laddboxar/index.html) |
| Kapacitetskalkylator (63 A) | [kalkylator.html – live](https://kentlundgren.github.io/Ovrigt/Hemma/laddboxar/kalkylator.html) |

### Om projektet

Utredning av förutsättningarna för elbilsladdning i **Långkatekesens Samfällighetsförening** (23 garage).

Projektet undersöker:
- Hur stor laddeffekt varje elbil kan få när ett givet antal bilar delar på en **63 A trefassäkring** (≈ 43,5 kW totalt)
- Olika laddarmodeller och styrningssystem (statisk likadelning, dynamisk lastbalansering, V2G)
- Kostnader, tekniska krav och praktiska rekommendationer för samfälligheten

AI-verktyg (Claude/Cursor) har använts som assistent för struktur, beräkningar och dokumentation – med Kent Lundgren som ansvarig.

### Filer

| Fil | Innehåll |
| --- | -------- |
| `Hemma/laddboxar/index.html` | Projektöversikt: nyckeltal, parametrar, sammanfattning av laddarmodeller och V2G, källförteckning (Harvardstil) |
| `Hemma/laddboxar/kalkylator.html` | Interaktiv kapacitetskalkylator: visar effekt per bil beroende på antal anslutna bilar (63 A, 400 V, trefas) |

---

## Biprojekt – Git & GitHub-guide

### Live-sida (GitHub Pages)

| Sida | URL |
| ---- | --- |
| Git & GitHub – koppla Cursor till GitHub | [main_has_no_remote_branch.html – live](https://kentlundgren.github.io/Ovrigt/main_has_no_remote_branch.html) |

### Om biprojektet

Referensdokument skapat parallellt med laddboxar-projektet. Förklarar:
- Vad felmeddelandena **"main has no remote branch"** och **"Can't push refs to remote"** betyder
- Hela processen att koppla ett lokalt Cursor-projekt till GitHub och sätta upp GitHub Pages
- Problemet med `.git` på flera nivåer i mappträdet och hur man löser det i Cursor

---

## GitHub

Repo: [kentlundgren/Ovrigt](https://github.com/kentlundgren/Ovrigt)

Commit och push är alltid användarens (Kents) ansvar.

---

_README v1.1, 2026-05-21_
