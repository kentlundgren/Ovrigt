# CLAUDE.md – Ölkalkylen (ol_Tyskland)

**Mapp:** `Ovrigt/Fritid/ol_Tyskland`
**Live:** https://kentlundgren.github.io/Ovrigt/Fritid/ol_Tyskland/index.html
**Senast uppdaterad:** 2026-07-31

---

## Projekt

Interaktiv kalkylator: hur många öl måste köpas för att en bilresa till Tyskland
ska löna sig (break-even mot rese- och transportkostnad). Sedan 2026-07-31 går
det även att räkna med en tillkopplad släpvagn (750 kg-klass) – se
[`PRD_slap.md`](PRD_slap.md) för antaganden, kostnader och källor bakom den
funktionen. Ändra inte släp-logiken utan att först läsa den filen.

---

## Claude-kompassen – Kents bild av hur kodningsprocessen går till

Det här projektet är, precis som alla Kents kodningsprojekt, tänkt att förhålla
sig till [Claude-kompassen](https://kentlundgren.github.io/AI-teknik/AI_modeller/Claude/olika_Claude_modeller/)
– Kents egen dokumenterade bild av processen (styrfiler → ytor → Cursor/Git/GitHub).
Kopplingen underhålls via skillen `kent-ekosystem-analys-for-code`
(`C:\Users\kentl\.claude\skills\kent-ekosystem-analys-for-code\SKILL.md`).

Konkret exempel: PRD-arbetet inför släp-funktionen (se `PRD_slap.md` ovan) ledde
till att Claude-kompassen fick ett nytt kort tillägg om PRD-begreppet 2026-07-31.
Om ett liknande processteg dyker upp här igen – fråga om det bör spegla sig på
Claude-kompassen, inte bara i den här filen.

---

## Regler (ärver från Ovrigt-roten)

Följ alltid [`../../CLAUDE.md`](../../CLAUDE.md):

- Uppdatera `README.md` (denna mapp + `Fritid/` + rot) vid nya filer
- Behåll site-nav: `{ O } Ovrigt / Fritid / Ölkalkylen`
- Live-länk i README under **Live-sida**
- Kent commitar själv

### Specifikt för denna sida

- Indatafält har **gul bakgrund** (`--input-bg`)
- Vid större omskrivning av `index.html`: fråga Kent om befintlig fil ska
  uppdateras eller om `index_verX.html` ska skapas

### Löpande text – ta aktivt hänsyn till humanizer_ton

När blogginlägg, längre prosa, synliga texter på sidan eller annan löpande
text ska **skrivas, granskas eller skrivas om**:

1. Läs och följ användarskillen  
   `C:\Users\kentl\.claude\skills\humanizer_ton\SKILL.md`
2. Läs vid behov även `humanizer.md` i samma skill-mapp
3. Gör detta **aktivt** – vänta inte på att Kent säger “kör humanizer”

Gäller tillsammans med skrivstil-skillen `kent-skrivstil` när nya blogginlägg
skapas. Humanizer_ton är förmågan som gör texten mer mänsklig; använd den
medvetet i det här projektet.
