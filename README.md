# Ovrigt – Kent Lundgrens övriga projekt

_Version 1.3, 2026-08-01_

---

## Live-sida

| Sida | URL |
| ---- | --- |
| Ovrigt – startsida | [index.html – live](https://kentlundgren.github.io/Ovrigt/) |

---

## Innehåll i detta repo

| Mapp / Fil | Projekt |
| ---------- | ------- |
| [`Hemma/laddboxar/`](Hemma/laddboxar/) | Utredning av elbilsladdning – Långkatekesens Samfällighetsförening |
| [`Hemma/VM_tips/`](Hemma/VM_tips/) | VM 2026-tips (familjetips och analys) |
| [`Fritid/ol_Tyskland/`](Fritid/ol_Tyskland/) | Ölkalkylen – lönar det sig att köra till Tyskland? |
| `main_has_no_remote_branch.html` | Biprojekt: Git & GitHub-guide – koppla Cursor till GitHub |
| `KentLundgren/` | **Gitignorerad, spåras inte i det här repot.** Se eget avsnitt nedan. |

---

## Fritid / Ölkalkylen

### Live-sidor (GitHub Pages)

| Sida | URL |
| ---- | --- |
| Fritid – översikt | [index.html – live](https://kentlundgren.github.io/Ovrigt/Fritid/index.html) |
| Ölkalkylen | [index.html – live](https://kentlundgren.github.io/Ovrigt/Fritid/ol_Tyskland/index.html) |

### Om projektet

Interaktiv kalkylator som räknar ut hur många öl du behöver köpa i Tyskland för att resan ska löna sig, givet startort, bil, bro/färja och ölpriser.

Se mer i [`Fritid/ol_Tyskland/README.md`](Fritid/ol_Tyskland/README.md).

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

## KentLundgren (gitignorerad, medvetet utanför detta repo)

**Ingen live-sida** — mappen är privat och innehållet ska aldrig publiceras.

Egen digital synlighet över tid: en daterad ögonblicksbild
(`sokresultat_ÅÅÅÅ-MM-DD.md`) per sökning på "Kent Lundgren", för att se hur
rankningen av olika sidor om honom förändras över tid. Skapad 1/8 2026.

Tre lager skydd mot att den av misstag hamnar på GitHub:
1. **`.gitignore`** i det här repot (`Ovrigt/.gitignore`) — utesluter
   `KentLundgren/` helt från detta repos versionshantering.
2. **Eget, fristående lokalt Git-repo** direkt i `KentLundgren/.git/` —
   ingen remote konfigurerad, så det finns inget att pusha till.
3. **`pre-push`-hook** i det egna repot (`KentLundgren/.git/hooks/pre-push`)
   — blockerar ovillkorligen varje push-försök, oavsett gren eller remote.
   Testat och verifierat (1/8 2026) mot en engångs-testremote.

Se `KentLundgren/README.md` för fullständig beskrivning av innehåll och metod.

---

## GitHub

Repo: [kentlundgren/Ovrigt](https://github.com/kentlundgren/Ovrigt)

Commit och push är alltid användarens (Kents) ansvar.

---

_README v1.2, 2026-07-28_
