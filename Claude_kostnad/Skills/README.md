# Skills-mapp — Dokumentation och synk

Denna mapp innehåller **OneDrive-kopior** av alla skills som Claude skapar i Cowork för Claude_kostnad-projektet.

## Struktur

```
Skills/
├── README.md (denna fil)
├── kostnad-daglig-analys/
│   └── SKILL.md
└── [framtida skills]/
    └── SKILL.md
```

## Hur det fungerar

1. **Claude skapar skillen i Cowork** och sparar den i AppData via `save_skill`
2. **Claude synkar en OneDrive-kopia** här under `Skills/[skill-namn]/SKILL.md`
3. **Du kan se och redigera SKILL.md** direkt i editorn
4. **Om du ändrar SKILL.md**, uppdateras den även i AppData nästa gång Claude använder skillen

## Nuvarande skills

### kostnad-daglig-analys
- **Skapad:** 2026-08-06
- **Ändamål:** Automatisk daglig analys av Claude-kostnader
- **Triggers:** Usage-rapporter (skärmdump eller manuell inmatning)
- **Vad den gör:**
  - Uppdaterar `data.md` med nya avläsningsrader
  - Genererar ny analysfil i `Analyser/`
  - Presenterar kostnadstrend och prognoser
- **Status:** Aktiv

## Framtida skills

Nya skills för Claude_kostnad-projektet läggs här när de skapas.

## Tips för redigering

- Ändra `description` för att uppdatera när skillen triggas
- Uppdatera innehållet för att ändra vad skillen gör
- Redigera `triggers`-avsnittet för att lägga till nya triggord
- **Spara filen** — Claude synkar automatiskt till AppData nästa gång skillen används

---

*Uppdaterad: 2026-08-06*
