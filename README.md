# 🇦🇹 AUT Quiz

Eine interaktive Quiz-App zum Lernen von österreichischem Allgemeinwissen.

## 🎮 Verfügbare Spiele

| Spiel | Beschreibung |
|-------|--------------|
| 🚗 **KFZ-Kennzeichen** | Lerne die Kennzeichen der österreichischen Bezirke |
| 🏛️ **Landeshauptstädte** | Teste dein Wissen über die Hauptstädte der Bundesländer |
| 🌍 **Welt-Hauptstädte** | Erweitere dein Wissen über Hauptstädte weltweit |

## ✨ Features

- 🎨 **Dark/Light Mode** - Automatische Anpassung oder manuelle Auswahl
- 📏 **Schriftgröße** - Anpassbare Textgröße (Klein, Normal, Groß)
- 🎯 **Akzentfarbe** - Personalisierbare Primärfarbe
- 📊 **Statistiken** - Detaillierte Spielstatistiken und Verlauf
- 🏆 **Punktesystem** - Punkte für richtige Antworten + Streak-Bonus
- 💾 **Offline-fähig** - Alle Daten lokal im Browser gespeichert

## 🛠️ Technologie

- **HTML5** - Semantisches Markup
- **CSS3** - Modulare Architektur mit CSS Custom Properties
- **JavaScript** - Vanilla JS mit klassenbasierter Game Engine
- **Font Awesome** - Icons
- **Inter** - Schriftart (Google Fonts)

## 📁 Projektstruktur

```
├── css/
│   ├── variables.css      # Design Tokens
│   ├── base.css           # Reset & Grundstile
│   ├── layout.css         # Grid & Utilities
│   ├── main.css           # Import-Aggregator
│   ├── components/        # UI-Komponenten
│   │   ├── navbar.css
│   │   ├── bottom-nav.css
│   │   ├── buttons.css
│   │   ├── cards.css
│   │   ├── forms.css
│   │   ├── toast.css
│   │   └── modal.css
│   └── pages/
│       ├── game.css
│       └── pages.css
├── js/
│   ├── app.js             # Hauptanwendung
│   ├── core/              # Kernmodule
│   │   ├── storage.js     # LocalStorage Wrapper
│   │   ├── theme.js       # Theme Management
│   │   └── events.js      # Event Bus
│   ├── components/        # UI-Komponenten
│   │   ├── toast.js
│   │   ├── navbar.js
│   │   └── bottom-nav.js
│   ├── games/             # Spiel-Engine
│   │   ├── GameEngine.js  # Basis-Klasse
│   │   ├── QuizGame.js    # Quiz-Implementierung
│   │   └── registry.js    # Spiel-Registry
│   └── data/
│       └── austria.js     # Österreich-Daten
├── index.html             # Hauptseite
├── settings.html          # Einstellungen
├── points.html            # Punkte
├── stats.html             # Statistik
├── help.html              # Hilfe
└── impressum.html         # Impressum
```

## 🎯 Neues Spiel hinzufügen

```javascript
// 1. Daten erstellen (js/data/mydata.js)
const MyData = [
    { question: 'Frage 1', answer: 'Antwort 1' },
    // ...
];

// 2. Spiel registrieren (js/app.js)
const myGame = new QuizGame({
    id: 'mygame',
    name: 'Mein Spiel',
    icon: 'fa-star',
    description: 'Beschreibung',
    questionCount: 10,
    data: MyData,
    questionGenerator: (item, allData) => ({
        question: item.question,
        correct: item.answer,
        options: [item.answer, ...getWrongOptions(item, allData)]
    })
});
GameRegistry.register('mygame', myGame);
```

## 🚀 Entwicklung

```bash
# Lokaler Server
python3 -m http.server 8080

# Öffne http://localhost:8080
```

## 📱 Screenshots

Die App ist vollständig responsive und funktioniert auf Desktop und Mobilgeräten.

## 🔒 Datenschutz

- ✅ Keine Cookies von Drittanbietern
- ✅ Kein Tracking oder Analytics
- ✅ Alle Daten bleiben lokal im Browser
- ✅ Keine Registrierung erforderlich

## 📄 Lizenz

MIT License - Frei zur Verwendung und Modifikation.

---

Made with ❤️ in Austria
