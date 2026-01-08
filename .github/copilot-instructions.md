# Copilot Instructions - Spielesammlung (AUT Quiz)

## Projektübersicht
Eine modulare Quiz-App für österreichisches Wissen mit erweitertem Statistik-System.

## Technologie-Stack
- **Frontend**: Vanilla JavaScript (ES5+), HTML5, CSS3
- **Styling**: CSS Custom Properties (Design Tokens), modulares CSS
- **Storage**: localStorage für Persistenz
- **Build**: Kein Build-Prozess, direkt im Browser lauffähig

## Architektur

### Verzeichnisstruktur
```
/
├── css/
│   ├── variables.css      # Design Tokens
│   ├── base.css           # Reset & Base Styles
│   ├── layout.css         # Layout System
│   ├── utilities.css      # Utility Classes
│   ├── components/        # Komponenten-CSS
│   ├── pages/             # Seiten-spezifisches CSS
│   └── styles.css         # Kombiniertes CSS (generiert)
├── js/
│   ├── core/              # Kern-Module
│   │   ├── config.js      # AppConfig
│   │   ├── storage.js     # localStorage Wrapper
│   │   ├── statistics.js  # Statistik-System
│   │   ├── events.js      # EventBus
│   │   ├── theme.js       # Theme-Management
│   │   └── cache-buster.js
│   ├── components/        # UI-Komponenten
│   │   ├── toast.js
│   │   ├── navbar.js
│   │   └── bottom-nav.js
│   ├── games/             # Spiel-Engine
│   │   ├── GameEngine.js  # Basis-Klasse
│   │   ├── QuizGame.js    # Quiz-Erweiterung
│   │   └── registry.js    # Spiel-Registry
│   ├── data/              # Spiel-Daten
│   │   ├── austria.js     # Österreich-Daten
│   │   └── worldCapitals.js
│   └── app.js             # Haupt-Entry-Point
└── *.html                 # Seiten
```

### Kern-Module

#### Storage (`js/core/storage.js`)
```javascript
Storage.get(key, defaultValue)  // Wert abrufen
Storage.set(key, value)         // Wert speichern
Storage.remove(key)             // Wert löschen
Storage.clear()                 // Alles löschen
```

#### Statistics (`js/core/statistics.js`)
Umfassendes Statistik-System mit unabhängigen Countern pro Spiel.

**Storage Keys:**
- `stats_global` - Globale Statistiken
- `stats_games` - Pro-Spiel Statistiken (Object mit gameId als Key)
- `stats_sessions` - Letzte 100 Sessions
- `stats_achievements` - Freigeschaltete Achievements
- `stats_daily` - Tägliche Stats (Auto-Reset)

**Pro-Spiel Statistiken:**
| Counter | Beschreibung |
|---------|--------------|
| `timesPlayed` | Anzahl gespielter Runden |
| `questionsAnswered` | Beantwortete Fragen |
| `correctAnswers` | Richtige Antworten |
| `wrongAnswers` | Falsche Antworten |
| `pointsEarned` | Verdiente Punkte |
| `totalTimePlayedMs` | Gesamtspielzeit in ms |
| `currentStreak` | Aktuelle Streak |
| `bestStreak` | Beste Streak |
| `bestScore` | Beste Punktzahl |
| `bestPercentage` | Beste Prozent |
| `worstScore` | Schlechteste Punktzahl |
| `worstPercentage` | Schlechteste Prozent |
| `perfectGames` | Anzahl 100%-Spiele |
| `fastestGameMs` | Schnellstes Spiel |
| `slowestGameMs` | Längstes Spiel |
| `fastestAnswerMs` | Schnellste Antwort |
| `slowestAnswerMs` | Langsamste Antwort |
| `averageAnswerTimeMs` | Ø Antwortzeit |
| `answerHistory` | Tracking pro Frage |

**Globale Statistiken:**
- `totalGamesPlayed`, `totalQuestionsAnswered`
- `totalCorrectAnswers`, `totalWrongAnswers`
- `totalPointsEarned`, `totalTimePlayedMs`
- `currentStreak`, `bestStreak`
- `currentDailyStreak`, `bestDailyStreak`
- `averageAccuracy`, `averageTimePerQuestion`

**API:**
```javascript
Statistics.recordAnswer({ gameId, question, correct, answerTimeMs })
Statistics.recordGame({ gameId, gameName, score, total, percentage, streak, timeMs, points })
Statistics.getGlobal()
Statistics.getGame(gameId)
Statistics.getAllGames()
Statistics.getSessions(limit)
Statistics.getDaily()
Statistics.getAchievements()
Statistics.resetAll()
Statistics.resetGame(gameId)
Statistics.exportAll()
Statistics.importAll(data)
```

#### EventBus (`js/core/events.js`)
```javascript
EventBus.on(event, callback)
EventBus.off(event, callback)
EventBus.emit(event, data)
```

**Events:**
- `GAME_START`, `GAME_END`
- `QUESTION_ANSWERED`
- `POINTS_UPDATE`, `STATS_UPDATE`
- `THEME_CHANGE`

### Spiel-System

#### Spielmodi (`js/games/GameModes.js`)
Für Hauptstädte-Quizze verfügbare Modi:

| Modus | ID | Beschreibung | Punkte |
|-------|-----|--------------|--------|
| Amateur Quizzer | `amateur` | 4 Auswahlmöglichkeiten | 10 + Streak |
| Pro Quizzer | `pro` | Texteingabe ohne Hilfe | 20 + Streak |
| Regenbogen Quizzer | `rainbow` | Texteingabe, Hinweise für 100P kaufbar | 10 + Streak |

```javascript
// Modus setzen
game.setMode(GameModes.PRO);

// Prüfen ob Spiel Modi unterstützt
if (gameSupportsMode('hauptstaedte')) { ... }

// Unterstützte Spiele: hauptstaedte, welthauptstaedte
```

#### Neues Spiel hinzufügen
1. Daten in `js/data/` erstellen
2. In `js/app.js` → `registerGames()` registrieren:

```javascript
const neuesSpiel = new QuizGame({
    id: 'unique-id',
    name: 'Anzeigename',
    icon: 'fa-icon-name',
    description: 'Beschreibung',
    questionCount: 10,
    data: DataArray,
    questionGenerator: (item, allData) => ({
        question: 'Fragetext',
        correct: 'Richtige Antwort',
        options: ['Option1', 'Option2', 'Option3', 'Option4']
    })
});
GameRegistry.register('unique-id', neuesSpiel);
```

### CSS Konventionen

#### Design Tokens (variables.css)
```css
--spacing-1 bis --spacing-8
--font-xs bis --font-3xl
--radius-sm, --radius-md, --radius-lg, --radius-full
--shadow-sm, --shadow-md, --shadow-lg
--accent-color, --accent-bg
--text-primary, --text-secondary, --text-muted
--card-bg, --border-color
```

#### CSS regenerieren
Nach Änderungen an CSS-Dateien:
```bash
cd css && cat variables.css base.css layout.css utilities.css components/*.css pages/*.css > styles.css
```

### HTML Struktur

#### Script-Reihenfolge
```html
<script src="js/core/config.js"></script>
<script src="js/core/cache-buster.js"></script>
<script src="js/core/storage.js"></script>
<script src="js/core/statistics.js"></script>
<script src="js/core/events.js"></script>
<script src="js/core/theme.js"></script>
<script src="js/components/toast.js"></script>
<script src="js/components/navbar.js"></script>
<script src="js/components/bottom-nav.js"></script>
<script src="js/games/GameEngine.js"></script>
<script src="js/games/QuizGame.js"></script>
<script src="js/games/registry.js"></script>
<script src="js/data/austria.js"></script>
<script src="js/data/worldCapitals.js"></script>  <!-- nur auf index.html -->
<script src="js/app.js"></script>
```

#### Body Attribute
```html
<body data-page="game|settings|points|stats|help|impressum" class="has-bottom-nav">
```

### Wichtige Regeln

1. **Keine externen Dependencies** - Nur Vanilla JS, Font Awesome via CDN
2. **Modulares Design** - Jedes Modul ist eigenständig
3. **Abwärtskompatibilität** - Legacy Storage-Keys werden unterstützt
4. **Deutsche Sprache** - UI-Texte auf Deutsch
5. **Mobile-First** - Responsive Design für alle Bildschirmgrößen
6. **Accessibility** - ARIA-Labels, semantisches HTML

### Version
- Aktuelle Version: `2.0.0`
- Build-Datum: in `js/core/config.js` und `js/app.js`

### Achievements (18 Stück)
| ID | Name | Bedingung |
|----|------|-----------|
| `first_game` | Erster Schritt | 1 Spiel |
| `games_10` | Anfänger | 10 Spiele |
| `games_50` | Fortgeschritten | 50 Spiele |
| `games_100` | Experte | 100 Spiele |
| `games_500` | Meister | 500 Spiele |
| `streak_5` | Auf Kurs | 5er Streak |
| `streak_10` | Unaufhaltsam | 10er Streak |
| `streak_25` | Fehlerfrei | 25er Streak |
| `streak_50` | Perfektionist | 50er Streak |
| `points_100` | Punktesammler | 100 Punkte |
| `points_1000` | Punktejäger | 1000 Punkte |
| `points_10000` | Punktekönig | 10000 Punkte |
| `daily_streak_3` | Regelmäßig | 3 Tage |
| `daily_streak_7` | Wochenstreak | 7 Tage |
| `daily_streak_30` | Monatsstreak | 30 Tage |
| `perfect_game` | Perfektes Spiel | 1x 100% |
| `perfect_10` | 10x Perfekt | 10x 100% |
| `all_games_played` | Allrounder | 3+ Spieltypen |
