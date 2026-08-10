---
name: pasta-recept-byggare
description: >
  Bygger nya pastarätts-sidor i Kents receptsamling
  `Ovrigt/Hemma/Matlagning/Pasta/` — samma mönster som Strozzapreti (Prästdödaren),
  Carbonara och Arrabbiata: en spännande historia bakom rätten, recept med
  ingredienser/instruktioner, Harvard-källor med verifierade länkar, en verifierad
  CC-bild, och print-CSS optimerad för en enda A4-sida. Använd ALLTID denna skill när
  Kent ber om att lägga till, bygga eller utöka en pastarätt i receptsamlingen — även
  om han bara nämner en rätts namn ("lägg till Cacio e Pepe", "bygg vidare med en till
  pastarätt"). Skillen finns för att undvika tre faktiska buggar som redan inträffat en
  gång: gissade/hallucinerade bild-URL:er, felräknade "../"-nivåer i breadcrumb-navet,
  och en boxig footer-GitHub-knapp istället för det etablerade hörn-länksmönstret.
metadata:
  type: process
---

# Bygga en ny pastarätt i receptsamlingen

*Skapad: 2026-08-10. Detta är den kanoniska versionen av skillen — projektlokal, så
den kan pushas till GitHub tillsammans med resten av `Ovrigt`-repot och läsas av
**Claude Code** direkt när den arbetar i `Hemma/Matlagning/` eller någon undermapp
till den. Det finns även en synkad kopia i `Skills/pasta-recept-byggare/SKILL.md` (samma
mapp-nivå) som **Claude Cowork** använder — Cowork sparar sina egna skill-ändringar i
AppData via `save_skill`, och den kopian är bryggan mellan AppData och det här
projektet. Det finns dessutom en kort pekare i den globala skill-mappen
(`C:\Users\kentl\.claude\skills\pasta-recept-byggare\SKILL.md`) för Claude Code-sessioner
som körs utanför den här projektmappen. Uppdatera **den här filen** när innehållet
ändras, och kopiera ändringen manuellt till `Skills/`-kopian i samma arbetspass — annars
glider de isär (se `kent-meta-regler-for-code`, Regel 4, och samma lösning för
`Claude_kostnad/.claude/skills/claude-kostnad/SKILL.md` +
`Claude_kostnad/Skills/kostnad-daglig-analys/SKILL.md`).*

## Var allt ligger

- **Projektmapp:** `C:\Users\kentl\OneDrive\AI\Claude\Ovrigt\Hemma\Matlagning\`
- **Receptsamlingen (live):** https://kentlundgren.github.io/Ovrigt/Hemma/Matlagning/Pasta/
  — lokal mapp: `Pasta/`
- **Den här skillen (kanonisk, Claude Code):**
  `Hemma/Matlagning/.claude/skills/pasta-recept-byggare/SKILL.md` — när Kent pushat,
  länka till
  `https://github.com/kentlundgren/Ovrigt/blob/main/Hemma/Matlagning/.claude/skills/pasta-recept-byggare/SKILL.md`
- **Synk-kopia (Cowork):** `Hemma/Matlagning/Skills/pasta-recept-byggare/SKILL.md`
- **Global pekare:** `C:\Users\kentl\.claude\skills\pasta-recept-byggare\SKILL.md`

Receptsamlingen ligger i `Ovrigt/Hemma/Matlagning/Pasta/` och följer ett etablerat
mönster (byggt 2026-08-10, se Strozzapreti/Carbonara/Arrabbiata som levande exempel).
Den här skillen kodar in mönstret **plus** tre konkreta buggar som redan hänt en gång i
det här projektet, så de inte händer igen.

## 0. Fråga innan start, om något är oklart

Följ `kent-meta-regler-for-code` (fråga innan start, Harvard-källor, inga fabricerade
fakta). Är det oklart vilken "vinkel" på receptet Kent vill ha (t.ex. en specifik
variant han själv lagat, kontra den vanligaste svenska butiksversionen) — fråga, gissa
inte. Se hur Strozzapreti-sidan fick göras om i grunden när det visade sig att Kents
egen variant (guanciale/pecorino/Amatriciana-stil) skilde sig från den första, mer
generiska tomatsåsvarianten som byggdes innan han klargjorde vilket recept han menade.

## 1. Filstruktur — en mapp per rätt

```
Pasta/
├── index.html              ← översiktssida, recipe-grid med kort för alla rätter
├── css/style.css            ← DELAD CSS, en enda fil för alla recept
├── README.md                ← lista över alla rätter
└── <rätt>/
    ├── index.html
    └── README.md
```

Skapa alltid `<rätt>/index.html` + `<rätt>/README.md`, lägg till ett nytt kort i
`Pasta/index.html`s `.recipe-grid`, och en ny rad i `Pasta/README.md`s lista.

## 2. Breadcrumb-nav — RÄKNA "../"-nivåerna, gissa aldrig

**Detta gick fel en gång:** en receptsidas breadcrumb länkade till `../Pasta/index.html`
istället för `../index.html`, vilket från `Pasta/<rätt>/index.html` resolvar till
`Pasta/Pasta/index.html` — en riktig 404 på den publicerade sidan. Orsaken var att
navet kopierades från en annan sidnivå utan att räkna om djupet.

Filträdet är `Ovrigt/Hemma/Matlagning/Pasta/<rätt>/index.html` — fyra nivåer under
`Ovrigt/`. Från den nivån:

```html
<nav class="site-nav">
  { O } <a href="https://kentlundgren.github.io/Ovrigt/">Ovrigt</a> /
  <a href="../../../index.html">Hemma</a> /
  <a href="../../index.html">Matlagning</a> /
  <a href="../index.html">Pasta</a> /
  <span>Rättens namn</span>
</nav>
```

Från `Pasta/index.html` själv (en nivå högre upp) blir det istället:

```html
<nav class="site-nav">
  { O } <a href="https://kentlundgren.github.io/Ovrigt/">Ovrigt</a> /
  <a href="../../index.html">Hemma</a> /
  <a href="../index.html">Matlagning</a> /
  <span>Pasta</span>
</nav>
```

**Verifiera alltid** efter att en ny sida skapats — öppna den i webbläsarförhandsvisningen
och kör:

```js
Array.from(document.querySelectorAll('.site-nav a')).map(a => ({text: a.textContent.trim(), resolved: a.href}))
```

och kontrollera att varje `resolved`-sökväg pekar dit den ska, INTE bara att länken
"ser rimlig ut" i koden. `Hemma/index.html` och `Matlagning/index.html` fanns inte som
faktiska filer när detta skrevs (2026-08-10) — breadcrumb-länkarna dit är alltså
matematiskt korrekta men kommer 404:a tills de sidorna skapas. Flagga det för Kent, gissa
inte om han vill ha placeholder-sidor.

## 3. Bilder — hämta ALDRIG en gissad Wikimedia-URL

**Detta gick fel en gång:** en bild-URL byggdes som
`.../commons/thumb/e/e1/Strozzapreti_Basilicata.jpg/640px-....jpg` utan att verifiera
att hash-katalogen (`e/e1`) eller ens filen existerade. Filen fanns inte — 404, trasig
bild på både översikts- och receptsidan.

**Gör alltid såhär i stället:**

1. Sök på Wikimedia Commons efter rätten (`WebSearch` eller Commons MediaSearch).
2. `WebFetch` **filens egen `File:`-sida** (t.ex.
   `https://commons.wikimedia.org/wiki/File:Namn.jpg`) och läs ut den riktiga
   **direkta bild-URL:en** (`upload.wikimedia.org/wikipedia/commons/<hash>/<fil>`,
   *inte* en gissad `/thumb/.../NNNpx-...`-variant), **licensen**, och **fotografens
   namn**.
3. Om filen ger 404 vid `WebFetch` — den existerar inte under det namnet. Sök igen,
   testa andra kandidatfiler tills en verifierad URL hittas. Gissa aldrig en hash.
4. Lägg till bilden med en `.photo-credit`-rad direkt under `<img class="recipe-image">`:
   ```html
   <p class="photo-credit">Foto: <fotograf>, <a href="<Commons File:-sida>">Wikimedia Commons</a> (<licens>)</p>
   ```
   — obligatoriskt för CC BY/CC BY-SA (attribution krävs), god sed även för CC0.
5. Lägg samma kredit som en post i `.sources`-listan (Harvard-format).
6. Testa i webbläsaren att bilden faktiskt laddar:
   ```js
   Array.from(document.querySelectorAll('img')).map(img => ({src: img.src, ok: img.naturalWidth > 0}))
   ```
   `ok: false` betyder trasig bild — fixa innan du går vidare.

## 4. Förhandsgranskningen kan visa gammal, cachad CSS/HTML

Filer utanför webbläsarverktygets "projektmapp" renderas som en **statisk
ögonblicksbild**. Vanlig `navigate` (även med `force: true`) kan fortsätta visa gammalt
CSS/HTML efter en redigering. Om en ändring inte syns i skärmdumpen trots att filen på
disk är uppdaterad (kontrollera t.ex. med `Array.from(document.styleSheets[0].cssRules).length`
mot ett känt antal):

- Öppna en ny flik (`tabs_create`) och navigera dit på nytt, **eller**
- Navigera tabben till en helt annan URL (t.ex. `https://example.com`) och sedan
  tillbaka till fil-URL:en.

Lita inte på en skärmdump som "ser oförändrad ut" som bevis på att en CSS-ändring inte
fungerade — kontrollera cssRules/DOM direkt via `javascript_tool` först.

## 5. Sidans innehållsstruktur

I den ordning sektionerna ska ligga i `<div class="container">`:

1. `.recipe-header` — `<h1>` rättens namn + `.subtitle` (kort, säljande underrubrik)
2. `<img class="recipe-image">` + `.photo-credit`
3. `.history` — `<h2>` + 2–4 `<p>`. **Print-CSS visar bara den FÖRSTA `<p>`** (se
   `.history p:nth-child(n+3)` i style.css — den regeln matchar allt utom den allra
   första `<p>` efter `<h2>`). Skriv alltså den första paragrafen så att den ensam bär
   den roliga/spännande kärnhistorien (legenden, ursprungsberättelsen) — resten
   (kulturell bakgrund, personliga kopplingar, vin/ost-parningar) kan vara längre och
   syns bara på webben.
4. (valfritt) `.callout-box` — t.ex. kommersiell produktreferens (svensk butik/märke)
5. `.recipe-content` — `.ingredients` + `.instructions`, två kolumner
6. (valfritt) `.callout-box` med `.tomato-comparison`/liknande — använd detta mönster
   när receptet har en meningsfull vägvals-punkt (t.ex. två sorters tomat, färsk vs.
   torkad pasta) värd att jämföra sida vid sida
7. (valfritt) `.variations` — lista med anpassningar (mildare/starkare/vegetariskt/etc.)
8. (valfritt) `.build-on-note` — om det finns milda/alternativa varianter att nämna,
   länka dem **inline i löptexten** (inte bara "se källor nedan" — Kent har bett om
   detta explicit), t.ex. `<a href="...">Zetas eget recept</a>`
9. `.sources` — Harvard-format, numrerad lista, alla länkar verifierade (se punkt 6)

`.callout-box`, `.variations`, `.build-on-note` och `.photo-credit` är redan dolda vid
utskrift i den delade CSS:en (se punkt 7). Ny valfri sektion du lägger till ska läggas
till i samma print-dölj-regel om den inte är kärninnehåll (ingredienser/instruktioner).

## 6. Källor — Harvard-format, verifiera varje länk

- Använd `WebSearch` för att hitta bakgrund/historia, `WebFetch` för att verifiera att
  en specifik länk faktiskt laddar (inte bara att den dök upp i sökresultat).
- Om en länk ger fel (t.ex. 403 Forbidden för en inloggningskrävande käll-URL som Kent
  själv gett) — skriv INTE ut den som en vanlig klickbar källa. Notera i klartext i
  källistan att länken inte gick att verifiera offentligt, som gjordes för
  Grok-skill-länken på Strozzapreti-sidan.
- Numrerad `<ol>` i `.sources`, varje post: `Författare/sajt. (År om känt). "Titel".
  Hämtad från <a href="...">URL</a>`.
- Print-CSS visar bara de första 4 källorna (`.sources ol li:nth-child(n+5)`) plus en
  auto-genererad "Fler källor på webbversionen"-rad. Ordna därför källistan med de
  viktigaste/mest centrala källorna FÖRST.

## 7. CSS — dela filen, bryt aldrig ut egen CSS per recept

All CSS bor i `Pasta/css/style.css`, som redan är byggd flexibelt via CSS-variabler i
`:root` (`--brand-primary` m.fl.) för enkelt temabyte. Lägg till nya komponentklasser
där (inte inline `<style>`), och lägg till motsvarande `@media print`-regler i samma
fil så att en ny sektion antingen (a) visas kort och prydligt på en A4-sida, eller (b)
döljs helt vid utskrift om den är webb-only.

Målet är alltid: **hela receptet (bild + kort historia + ingredienser + instruktioner +
korta källor) ska få plats på EN A4-sida vid utskrift**, oavsett hur mycket extra
webbinnehåll (variationer, jämförelser, bygg-vidare-noter) sidan har.

## 8. Hörn-länkar — GitHub (vänster) + Teknik-modal (höger), på VARJE sida

**Detta missades en gång:** de fyra Pasta-sidorna byggdes först med en boxig
`{ } GitHub`-knapp inline i footern, istället för det etablerade diskreta
hörn-mönstret. Kent bad om rättning och att det dokumenteras här så det inte händer
igen (se `Ovrigt/CLAUDE.md`, regeln "Hörn-länkar").

Varje receptsida (och `Pasta/index.html`) ska ha, direkt före `</body>`:

1. `<a class="github-corner" href="https://github.com/kentlundgren/Ovrigt" target="_blank" rel="noopener">{ } GitHub</a>`
   — nedre vänstra hörnet
2. `<button type="button" class="tech-corner" id="techBtn" aria-label="Tekniköversikt">&lt;/&gt; teknik</button>`
   — nedre högra hörnet
3. En `#techModal`-overlay med 3–4 `.tech-card`-rutor: konkreta, sanna fakta om just
   den sidans uppbyggnad (statisk HTML, delad CSS-fil, print-optimering, verifierad
   bildkälla) — aldrig påhittat, aldrig generiska floskler
4. `addEventListener`-baserad öppna/stäng-logik för modalen (öppna-knapp, stäng-knapp,
   klick utanför modal-rutan) — inte inline `onclick`

CSS för `.github-corner`, `.tech-corner`, `.modal-overlay`, `.modal`, `.tech-grid`,
`.tech-card` m.fl. ligger redan i `Pasta/css/style.css` (kopierat från
`Claude_kostnad/index.html`, men med Pastas egna CSS-variabler istället för hårdkodade
färger) — återanvänd den, duplicera den inte per receptsida. Print-CSS döljer redan
båda hörn-elementen och modalen vid utskrift (`.github-corner, .tech-corner,
.modal-overlay { display: none !important; }`).

**Ta bort** den gamla, boxiga `.github-link`-footer-knappen om den finns kvar på en
sida du redigerar — hörn-länken ersätter den, två GitHub-länkar på samma sida är
onödigt dubbelt.

Verifiera efter implementation, i webbläsaren:
```js
JSON.stringify({hasGithubCorner: !!document.querySelector('.github-corner'), hasTechBtn: !!document.getElementById('techBtn'), hasModal: !!document.getElementById('techModal')})
```
— och klicka igenom öppna/stäng manuellt minst en gång innan sidan kallas klar.

## 9. README.md-uppdateringar (Ovrigt-repots regel)

Enligt `Ovrigt/CLAUDE.md`: när en ny mapp/HTML-sida skapas, uppdatera README samma
arbetspass:

- Ny `<rätt>/README.md` (kort beskrivning, huvudingredienser, hänvisning till
  index.html för fullständigt recept)
- `Pasta/README.md` — lägg till raden för den nya rätten i receptlistan

## 10. Git — Kent commitar och pushar själv

Gör aldrig `git add`/`commit`/`push` proaktivt. Gör filändringarna, lämna dem
ocommittade, och föreslå ett färdigt commit-meddelande Kent kan köra i Cursor (se
`Ovrigt/CLAUDE.md`).

## 11. Skill-synk — Claude Code och Claude Cowork i samma projekt

Kent arbetar med det här projektet ibland i Claude Code, ibland i Claude Cowork.
Håll de tre skill-kopiorna i synk:

1. **Kanonisk (Claude Code, projektlokal):**
   `Hemma/Matlagning/.claude/skills/pasta-recept-byggare/SKILL.md` — den här filen.
   Redigera alltid här först.
2. **Synk-kopia (Cowork):** `Hemma/Matlagning/Skills/pasta-recept-byggare/SKILL.md` —
   kopiera manuellt över samma ändring hit i samma arbetspass. Cowork läser/synkar
   denna in i sin egen AppData-lagring nästa gång skillen används där.
3. **Global pekare:** `C:\Users\kentl\.claude\skills\pasta-recept-byggare\SKILL.md` —
   rör INTE innehållet där, det är bara en kort hänvisning hit. Uppdateras enbart om
   filsökvägen till den kanoniska filen ändras.

Om de tre kopiorna glider isär: den här filen (`.claude/skills/`, projektlokal) är
alltid den som gäller. Se även `kent-meta-regler-for-code`, Regel 4.

## Checklista innan en ny pastarätt kan kallas klar

- [ ] `<rätt>/index.html` + `<rätt>/README.md` skapade
- [ ] Nytt kort i `Pasta/index.html` (`.recipe-grid`) med bild, rubrik, kort summering
- [ ] Ny rad i `Pasta/README.md`
- [ ] Breadcrumb-nav räknad korrekt (`../` × rätt antal) — verifierad med
      `resolved`-check i webbläsaren, inte bara läst i koden
- [ ] Bild hämtad via verifierad Commons `File:`-sida (aldrig gissad hash-URL),
      `.photo-credit` tillagd, källa i `.sources`
- [ ] Bild bekräftat laddad (`naturalWidth > 0`) i en FÄRSK flik/reload (se punkt 4)
- [ ] Historia: kort, stark första paragraf (visas ensam vid print) + längre bakgrund
- [ ] Alla käll-länkar verifierade att de faktiskt laddar (inte bara sökträffar)
- [ ] Print-CSS testad/rimlighetsbedömd — nya sektioner antingen A4-anpassade eller
      dolda vid utskrift
- [ ] `{ } GitHub`-hörna (vänster) + `</> teknik`-modal (höger) tillagda och testade
      (öppna, stäng via ×, stäng via klick utanför)
- [ ] Kent påmind om att committa (inte gjort automatiskt)

## Uppdateringslogg

- 2026-08-10 (v1): Skapad efter att Strozzapreti-, Carbonara- och Arrabbiata-sidorna
  byggts klart, inklusive rättning av två faktiska buggar (trasiga bild-URL:er från
  gissade Wikimedia-hashar, och en `Pasta/Pasta/`-loop i breadcrumb-navet orsakad av
  felräknade `../`-nivåer på receptundersidorna).
- 2026-08-10 (v2): Ny punkt 8 — hörn-länkar (`{ } GitHub` vänster + `</> teknik`-modal
  höger) tillagd som obligatoriskt steg, efter att en tredje bugg upptäcktes: sidorna
  byggdes först med en boxig footer-GitHub-knapp istället för det etablerade diskreta
  hörn-mönstret från `Claude_kostnad/index.html`. Regeln är nu även dokumenterad i
  `Ovrigt/CLAUDE.md`.
- 2026-08-10 (v3): Flyttad hit — projektlokal, kanonisk (`Hemma/Matlagning/.claude/skills/`)
  — från den globala skill-mappen, på Kents begäran, samma mönster som
  `Claude_kostnad/.claude/skills/claude-kostnad/SKILL.md`. Ny punkt 11 om skill-synk
  mellan Claude Code och Cowork tillagd. Global kopia omgjord till en kort pekare hit.
  Ny synk-kopia skapad i `Skills/pasta-recept-byggare/SKILL.md` för Cowork.
