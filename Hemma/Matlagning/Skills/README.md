# Skills-mapp — Dokumentation och synk

Denna mapp innehåller **OneDrive-kopior** av skills som gäller Matlagning-projektet,
så att både **Claude Code** och **Claude Cowork** kan arbeta med samma förmåga när Kent
växlar mellan de två i samma projektmapp.

## Struktur

```
Matlagning/
├── .claude/skills/
│   └── pasta-recept-byggare/
│       └── SKILL.md          ← KANONISK version, projektlokal, läses av Claude Code
├── Skills/ (denna mapp)
│   ├── README.md (denna fil)
│   └── pasta-recept-byggare/
│       └── SKILL.md          ← Synk-kopia, identisk, Cowork synkar denna till AppData
└── Pasta/ …
```

## Hur det fungerar

Till skillnad från `Claude_kostnad`-projektet (där `claude-kostnad` har sitt ursprung i
Claude Code och `kostnad-daglig-analys` har sitt ursprung i Cowork — två olika skills,
en kanonisk plats var) gäller för `pasta-recept-byggare` att **samma skill** ska kunna
användas av båda verktygen:

1. **Claude Code** läser projektlokala skills direkt från `.claude/skills/` när den
   arbetar i den här mappen (eller en undermapp till den) — ingen extra åtgärd krävs.
2. **Claude Cowork** sparar sina egna skill-ändringar i AppData via `save_skill`, och
   känner inte automatiskt till `.claude/skills/`-mappen. Kopian här i `Skills/` är
   bryggan: när Kent använder skillen i Cowork synkas den in i Cowork's AppData-lagring.
3. **Om du redigerar SKILL.md** — i endera mappen — kopiera ändringen manuellt till den
   andra i samma arbetspass, så de inte glider isär. Den kanoniska sanningen är alltid
   `.claude/skills/pasta-recept-byggare/SKILL.md` (den som Claude Code läser och som
   pushas till GitHub tillsammans med resten av `Ovrigt`-repot).

Det finns dessutom en tredje, kort kopia i den **globala** skill-mappen
(`C:\Users\kentl\.claude\skills\pasta-recept-byggare\SKILL.md`) för Claude Code-sessioner
som körs utanför den här projektmappen — den är bara en pekare hit, inte fullständigt
innehåll, och behöver inte uppdateras vid vanliga innehållsändringar.

## Nuvarande skills

### pasta-recept-byggare
- **Skapad:** 2026-08-10 (Claude Code)
- **Ändamål:** Bygger nya pastarätts-sidor i receptsamlingen `Pasta/` — historia,
  ingredienser/instruktioner, Harvard-källor, verifierad CC-bild, print-CSS för A4,
  hörn-länkar (GitHub + teknik-modal)
- **Status:** Aktiv

## Framtida skills

Nya skills för Matlagning-projektet läggs här när de skapas — oavsett om de har sitt
ursprung i Claude Code eller Cowork, för att undvika att samma förmåga behöver byggas
upp två gånger.

---

*Uppdaterad: 2026-08-10*
