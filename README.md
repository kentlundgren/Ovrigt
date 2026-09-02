# Ovrigt – Kent Lundgrens övriga projekt

_Version 1.7, 2026-09-02_

---

## 🗂️ Lokalt repo

`C:\Users\kentl\OneDrive\Kent – Personligt\AI\Claude\Ovrigt`

⚠️ Ligger nästlat inuti föräldramappen `...\AI\Claude\`, som **också är ett eget
git-repo** — se avsnittet [Nested Git-repo](#️-nested-git-repo) längre ner för
vad det innebär i praktiken och hur du verifierar vilken mapp som faktiskt är
kopplad till `github.com/kentlundgren/Ovrigt`.

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
| [`Hemma/Matlagning/Pasta/`](Hemma/Matlagning/Pasta/) | Italienska pastarätter med historia – Prästdödaren, Carbonara, Arrabbiata |
| [`Fritid/ol_Tyskland/`](Fritid/ol_Tyskland/) | Ölkalkylen – lönar det sig att köra till Tyskland? |
| [`Claude_kostnad/`](Claude_kostnad/) | Claude-kostnad – ligger jag i fas med mitt Pro-abonnemang? |
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

## Claude-kostnad

### Live-sidor (GitHub Pages)

| Sida | URL |
| ---- | --- |
| Claude-kostnad (Kents eget verktyg) | [index.html – live](https://kentlundgren.github.io/Ovrigt/Claude_kostnad/index.html) |
| Dela — publik variant | [dela/index.html – live](https://kentlundgren.github.io/Ovrigt/Claude_kostnad/dela/index.html) |

### Om projektet

Litet, fristående verktyg som svarar på: ligger jag i fas med mitt Claude
Pro-abonnemang — just nu (session), senaste veckan, och denna månad (usage
credits)? Räknar dessutom om veckoprocenten mot den normala 100%-baslinjen
när en tillfällig gränshöjning ("boost") är aktiv, med separat hantering
per produkt (Claude Code/Cowork). Usage credits-kortet har hover/klick-
förklaringar (med källor) för begrepp som saldo, månadsgräns och
promotional credit. Data matas in manuellt; historik sparas i
[`Claude_kostnad/data.md`](Claude_kostnad/data.md), inte i webbläsaren.

**Dela-varianten** (`dela/index.html`) är en separat, publik sida där vem
som helst kan ladda upp sin egen skärmdump och få samma analys — ingen
inloggning, inget sparas, bilden analyseras lokalt i besökarens webbläsare
med OCR (Tesseract.js), skickas aldrig till någon server.

Se mer i [`Claude_kostnad/README.md`](Claude_kostnad/README.md),
[`Claude_kostnad/PRD/PRD_tokenanvandning.md`](Claude_kostnad/PRD/PRD_tokenanvandning.md)
och [`Claude_kostnad/PRD/PRD_publik_variant.md`](Claude_kostnad/PRD/PRD_publik_variant.md),
eller läs bakgrunden som blogginlägg:
[Ligger jag i fas med Claude?](https://klel.wordpress.com/2026/08/04/ligger-jag-i-fas-med-claude/)
(klel.wordpress.com, 4/8 2026).

**Claude Code-skill:** arbetssättet, mekaniken och den återkommande
veckorutinen för det här projektet är dokumenterade som en egen,
projektlokal skill —
[`Claude_kostnad/.claude/skills/claude-kostnad/SKILL.md`](Claude_kostnad/.claude/skills/claude-kostnad/SKILL.md).

---

## Hemma / Matlagning / Pasta

### Live-sidor (GitHub Pages)

| Sida | URL |
| ---- | --- |
| Pasta – översikt | [index.html – live](https://kentlundgren.github.io/Ovrigt/Hemma/Matlagning/Pasta/index.html) |
| Strozzapreti (Prästdödaren) | [index.html – live](https://kentlundgren.github.io/Ovrigt/Hemma/Matlagning/Pasta/strozzapreti/index.html) |
| Spaghetti alla Carbonara | [index.html – live](https://kentlundgren.github.io/Ovrigt/Hemma/Matlagning/Pasta/carbonara/index.html) |
| Penne all'Arrabbiata | [index.html – live](https://kentlundgren.github.io/Ovrigt/Hemma/Matlagning/Pasta/arrabbiata/index.html) |

### Om projektet

En växande samling italienska pastarätter, alla kopplade till en spännande historia
eller legend bakom rätten — precis som "Prästdödaren" (Strozzapreti). Varje receptsida
har en fyllig historia-sektion på webben, ingredienser/instruktioner, och
Harvard-formaterade källor med verifierade länkar. Bilderna är hämtade från Wikimedia
Commons med kontrollerad CC-licens och fotokreditering. Varje recept kan skrivas ut på
en enda A4-sida (`@media print` visar då en kortare version av historien, så allt
ryms på en sida).

Strozzapreti-receptet är byggt i Amatriciana-stil (guanciale, pecorino romano, tomat,
chili) efter Kents egen variant, med milda tomatbaserade alternativ länkade som
"bygg vidare"-tips.

Se mer i [`Hemma/Matlagning/Pasta/README.md`](Hemma/Matlagning/Pasta/README.md).

**Claude Code-skill:** mönstret för hur nya pastarätter byggs (filstruktur,
breadcrumb-nav, bildhämtning, print-CSS, hörn-länkar) är dokumenterat som en egen,
projektlokal skill —
[`Hemma/Matlagning/.claude/skills/pasta-recept-byggare/SKILL.md`](Hemma/Matlagning/.claude/skills/pasta-recept-byggare/SKILL.md).
Skillen är synkad så att både Claude Code och Claude Cowork kan använda den i samma
projektmapp, se [`Hemma/Matlagning/Skills/README.md`](Hemma/Matlagning/Skills/README.md).

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

## ⚠️ Nested Git-repo

Mappen `Ovrigt` ligger inuti en föräldramapp som **också** är ett eget git-repo:

```
C:\Users\kentl\OneDrive\Kent – Personligt\AI\Claude\   ← Föräldramapp (egen .git, egen CLAUDE.md/.gitignore)
    ├── ArbetenSokta/
    ├── ClaudeCowork/
    ├── Ekonomi/                        ← Eget nästlat repo (remote: Ekonomi)
    │   └── .git/
    └── Ovrigt/                         ← DETTA repo (remote: Ovrigt)
        └── .git/
```

(Bekräftat via skärmbild 2026-09-02: `.git`, `.gitignore` och en egen `CLAUDE.md`
ligger direkt i `AI\Claude\`, separat från `Ovrigt`-undermappens eget innehåll.)

**Osäkerhet värd att flagga:** Ekonomi-repots README beskriver föräldramappen
`AI\Claude\` som att den har **remote: `Ovrigt`** på GitHub. Det stämmer dåligt
överens med vad mappen faktiskt innehåller (fyra projektmappar — `ArbetenSokta`,
`ClaudeCowork`, `Ekonomi`, `Ovrigt` — inte `Hemma/`, `Fritid/`, `index.html` som
är det här repots faktiska innehåll). Sannolikt en felskrivning i Ekonomi-repots
README, men **inte verifierat**. Kör detta för att få 100 % säkert svar:

```powershell
cd "C:\Users\kentl\OneDrive\Kent – Personligt\AI\Claude"
git remote -v

cd "C:\Users\kentl\OneDrive\Kent – Personligt\AI\Claude\Ovrigt"
git remote -v
```

Den mapp som svarar med `github.com/kentlundgren/Ovrigt` är den du ska öppna i
Cursor. Om båda gör det har du en dubbel-klon som bör redas ut.

**Regel:** Öppna alltid `Ovrigt`-mappen direkt i Cursor – aldrig föräldramappen
`AI\Claude\`. Verifiera remote med `git remote -v` om du är osäker.

| Situation | Risk | Åtgärd |
|-----------|------|---------|
| Öppnar `AI\Claude` i Cursor | Arbetar mot fel repo | Öppna `Ovrigt`-mappen separat |
| Glömmer committa efter redigering | Ändringar saknas i git-historik | Committa manuellt i Cursor |
| Föräldra-repot visar `Ovrigt` som modified | Förvirring | Normalt – ignorera det |

---

## 🌿 Grenar (branches) – vad är det, och varför finns de?

En **branch** (gren) är en separat, parallell version av koden i samma repo –
en kopia där ändringar kan göras utan att påverka `main` (huvudgrenen, den
som GitHub Pages faktiskt publicerar från). Man kan ha hur många grenar som
helst samtidigt; de slås ihop (**mergas**) till `main` när innehållet är klart
och godkänt, eller så öppnas en **pull request (PR)** – ett förslag till
sammanslagning som går att granska diff-rad-för-rad innan den mergas.

**En feature-branch** är specifikt en gren skapad för *en avgränsad uppgift
eller ett tema* (t.ex. "lägg till kalenderhändelse", en bugfix, en ny sida) –
namnet syftar på att den bär en enskild "feature" (funktion/ändring), till
skillnad från `main` som ska hålla den färdiga, driftsatta koden.

### Grenen `claude/lagg-in-i-kalendern-9aipez` i det här repot

- **Vem skapade den:** Claude (den här AI-sessionen), inte Kent manuellt.
- **Varför:** När en Claude Code-session på webben/molnet ("Claude Code on the
  web") kopplas till ett repo, tilldelar systemet automatiskt en egen
  feature-branch för just den sessionen – namnet genereras av plattformen
  utifrån sessionens första uppgift (här: "lägg in i kalendern", plus en
  slumpad kod `9aipez` för att göra namnet unikt). Claude pushar sina commits
  dit istället för direkt till `main`, så att ändringarna kan granskas innan
  de blir en del av den publicerade sidan.
- **Vad som ligger på den just nu:** regeln om initialer för personnamn samt
  Lokalt repo-/Nested Git-repo-sektionerna i den här README:n (se
  `git log` eller PR:en för fullständig historik).

### Var du ser alla grenar

- **Alla grenar i repot:** [github.com/kentlundgren/Ovrigt/branches](https://github.com/kentlundgren/Ovrigt/branches)
- **Öppna pull requests:** [github.com/kentlundgren/Ovrigt/pulls](https://github.com/kentlundgren/Ovrigt/pulls)

---

## GitHub

Repo: [kentlundgren/Ovrigt](https://github.com/kentlundgren/Ovrigt)

Commit och push är alltid användarens (Kents) ansvar.

---

_README v1.7, 2026-09-02_
