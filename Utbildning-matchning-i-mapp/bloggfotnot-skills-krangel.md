# Fotnot: Varför samma information måste finnas på två ställen

Det som till en början verkar som en detalj visar sig snabbt vara en strukturell egenhet i hur Claude Cowork fungerar — och det är värt att förklara.

När Claude skapar en "skill" (ett specialiserat minne eller en arbetsregel) lagras den automatiskt i en mapp djupt inne i Windows AppData-katalogen. Det är en teknisk lösning som fungerar bra för Claude, men som är praktiskt taget osynlig för mig som användare. Mappen har en lång, kryptisk sökväg som ingen människa rimligen kan memorera, och den döljer sig bakom flera lager av systemkatalognamn. Filen finns, den fungerar — men att hitta tillbaka till den för att läsa, kontrollera eller uppdatera innehållet är i det närmaste omöjligt utan hjälp.

Lösningen vi kom fram till är pragmatisk men innebär ett nytt problem: vi skapar en synlig kopia av skill-filen i en OneDrive-mapp med ett begripligt namn. Där kan jag läsa, följa med och kontrollera att informationen stämmer. Men — och det är kärnan i "krånglet" — den kopian är just bara en kopia. Den aktiva versionen, den som Claude faktiskt använder när den svarar mig, lever kvar i AppData. Det innebär att varje gång informationen uppdateras måste det ske på båda ställena: via ett kommando som uppdaterar AppData-versionen, och via en separat skrivoperation som uppdaterar OneDrive-kopian.

Det är egentligen inte mer komplicerat än att ha ett original och en säkerhetskopia — men det bryter mot den intuitiva känslan av att en fil på ett ställe borde räcka. Och det kräver att Claude (och jag) alltid kommer ihåg att hålla de två versionerna i synk.

Varför är det så här konstruerat? Claude Coworks skills är designade för att triggas automatiskt utifrån vad jag skriver — systemet måste ha snabb, direkt tillgång till dem, och AppData är det tekniska lagret som hanterar det. Det finns ingen inbyggd funktion för att peka en skill till en fil i OneDrive i stället. Det är en begränsning i produkten som förmodligen inte märks för de flesta användare — men som blir påtaglig så fort man vill ha kontroll och insyn i vad Claude faktiskt minns och arbetar utifrån.

Lärdomen: om du arbetar med Claude Cowork och skapar skills som innehåller viktig, uppdaterbar information — bestäm från början var den synliga kopian ska ligga, och instruera Claude att alltid hålla båda versionerna identiska.

---

*Denna fotnot hör till blogginlägget [Tappade bort mig i Claudes ekosystem](https://klel.wordpress.com/2026/07/27/tappade-bort-mig-i-claudes-ekosystem/) (Lundgren, 2026-07-27).*
