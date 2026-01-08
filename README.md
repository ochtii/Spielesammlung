# 🎮 Österreich Spielesammlung (AUT Quiz)

<div align="center">

![GitHub](https://img.shields.io/github/license/ochtii/Spielesammlung)
![GitHub last commit](https://img.shields.io/github/last-commit/ochtii/Spielesammlung)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

**Eine interaktive Quiz-Anwendung zum Lernen österreichischer Geographie, KFZ-Kennzeichen und Hauptstädte**

[Live Demo](https://ochtii.github.io/Spielesammlung) • [Dokumentation](#-features) • [Bug Report](https://github.com/ochtii/Spielesammlung/issues)

</div>

---

## 📋 Inhaltsverzeichnis

- [Über das Projekt](#-über-das-projekt)
- [Features](#-features)
- [Technologie-Stack](#-technologie-stack)
- [Installation](#-installation)
- [Verwendung](#-verwendung)
- [Projekt-Struktur](#-projekt-struktur)
- [Spielmodi](#-spielmodi)
- [Einstellungen](#-einstellungen)
- [Punktesystem](#-punktesystem)
- [Entwicklung](#-entwicklung)
- [Lizenz](#-lizenz)

---

## 🎯 Über das Projekt

**AUT Quiz** ist eine moderne, interaktive Web-Anwendung, die Nutzer auf spielerische Weise mit österreichischer Geographie, KFZ-Kennzeichen und internationalen Hauptstädten vertraut macht. Die Anwendung bietet verschiedene Spielmodi, ein umfassendes Punktesystem und zahlreiche Anpassungsmöglichkeiten.

### Highlights

✨ **3 Spielmodi** - KFZ-Kennzeichen, Österreichische Hauptstädte, Internationale Hauptstädte  
🎨 **Dark Mode** - Vollständige Dark-Mode-Unterstützung  
⏱️ **Timer-Funktion** - Optional mit konfigurierbarer Zeitbegrenzung (5-120s)  
🏆 **Punktesystem** - Globales Punktesystem mit detaillierter Statistik  
💡 **Intelligente Tipps** - 6 verschiedene Tipp-Typen mit optionalem Punkteabzug  
📱 **Responsive Design** - Optimiert für Desktop, Tablet und Mobile  
🎯 **Wappen-Sammlung** - 54 österreichische Wappen mit Filterfunktion  
📊 **Statistiken** - Umfassende Spiel- und Punktehistorie  
⚙️ **Hochgradig anpassbar** - Zahlreiche Einstellungsmöglichkeiten  

---

## 🚀 Features

### 🎮 Spielmodi

#### 1. KFZ-Kennzeichen
- **Bundesländer** - Teste dein Wissen über Bundesland-Kennzeichen
- **Bezirke** - Lerne alle österreichischen Bezirks-Kennzeichen
- **Alle** - Kombinierter Modus mit allen Kennzeichen

#### 2. Hauptstädte Österreich
- **Landeshauptstädte** - 9 Hauptstädte der Bundesländer
- **Bezirkshauptstädte** - Hauptstädte aller Bezirke
- **Kombiniert** - Alle österreichischen Hauptstädte

#### 3. Internationale Hauptstädte
- Über 150 Hauptstädte aus aller Welt
- Mehrsprachige Unterstützung (DE/EN/Native)
- Schwierigkeitsgrade: Einfach, Mittel, Schwer

### 🎯 Schwierigkeitsgrade

1. **Quiz-Modus** - 4 Antwort-Optionen zur Auswahl
2. **Kombiniert** - Freie Eingabe mit optionaler 4-Optionen-Hilfe (kostet 100 Punkte)
3. **Profi-Modus** - Freie Eingabe ohne Hilfe

### 💡 Tipp-System

6 verschiedene Tipp-Typen verfügbar:

| Tipp | Beschreibung | Kosten |
|------|-------------|--------|
| 50:50 | Entfernt 2 falsche Antworten | 30P |
| Eine Antwort entfernen | Entfernt 1 falsche Antwort | 20P |
| Erster Buchstabe | Zeigt den ersten Buchstaben | 15P |
| Zufälliger Buchstabe | Zeigt einen zufälligen Buchstaben | 15P |
| Länge | Zeigt die Anzahl der Buchstaben | 10P |
| Wappen | Zeigt das Wappen (bei KFZ/Hauptstädten) | 15P |

*Hinweis: Kosten nur wenn "Kostenpflichtige Tipps" aktiviert ist*

### ⏱️ Timer-Funktion

- **Optional aktivierbar** in den Einstellungen
- **Konfigurierbar** von 5 bis 120 Sekunden
- **Visuelles Feedback:**
  - 🔵 Normal (>10s)
  - 🟠 Warnung (≤10s)
  - 🔴 Gefahr (≤5s)
- Automatischer Countdown mit animierter Anzeige

### 🎨 Anpassungsmöglichkeiten

#### Darstellung
- **Dark Mode** - Dunkles Farbschema
- **Bottom Navigation** - Ein/Aus, Fixiert, Größe (Klein/Normal/Groß)
- **Button-Sichtbarkeit** - Individuell anpassbar (Home, Punkte, Hilfe, FAQ, Settings)

#### Spieloptionen
- **Tippfehler-Toleranz** - Akzeptiert kleine Schreibfehler
- **Kostenpflichtige Tipps** - Tipps kosten Punkte
- **Guthaben-Anzeige** - Floating Widget oder Header
- **Timer** - Zeitbegrenzung pro Frage

#### Datenspeicherung
- **Verlaufslimit** - 50/100/200/500 Einträge
- **Entwicklermodus** - Erweiterte Funktionen und Statistiken

### 🏆 Punktesystem

- **Basispunkte:** 100 Punkte pro richtiger Antwort
- **Tipp-Abzug:** -30 Punkte pro verwendetem Tipp
- **Minimalpunkte:** 10 Punkte (garantiert bei richtiger Antwort)
- **Globales Punktekonto:** Kumulativ über alle Spiele
- **Detaillierte Statistiken:**
  - Gesamtpunkte
  - Spiele gespielt
  - Richtige Antworten
  - Verwendete Tipps
  - Längste Serie

### 📊 Statistik-Features

- **Verlauf** - Chronologische Auflistung aller gespielten Spiele
- **Diagramme** - Visuelle Darstellung der Punkteentwicklung
- **Kategorien** - Aufschlüsselung nach Spieltyp
- **Export** - Download als JSON

### 🛡️ Wappen-Sammlung

- **54 österreichische Wappen:**
  - 9 Bundesländer
  - 9 Landeshauptstädte
  - 37 Städte
- **Alphabet-Navigation** - Schnellzugriff von A-Z
- **Filter** - Nach Kategorie filtern
- **Hochauflösend** - Alle Wappen von Wikimedia Commons

---

## 🛠️ Technologie-Stack

### Frontend
- **HTML5** - Semantisches Markup
- **CSS3** - Modern CSS mit Variablen, Flexbox, Grid, Animationen
- **Vanilla JavaScript (ES6+)** - Keine Frameworks, reine JavaScript-OOP

### Bibliotheken & APIs
- **Font Awesome 6.4.0** - Icons
- **Google Fonts** - Inter & Roboto Condensed
- **GitHub API** - Commit-Informationen
- **Wikimedia Commons** - Wappen-Bilder

### Datenspeicherung
- **LocalStorage** - Persistente Datenspeicherung im Browser
- **JSON** - Datenformat für Import/Export

### Design-Prinzipien
- **Responsive Design** - Mobile-First-Ansatz
- **Progressive Enhancement** - Funktioniert auch ohne JavaScript-Features
- **Accessibility** - Semantisches HTML, ARIA-Labels
- **Performance** - Lazy Loading, optimierte Bilder

---

## 📦 Installation

### Voraussetzungen
- Moderner Webbrowser (Chrome, Firefox, Safari, Edge)
- Webserver (optional, für lokale Entwicklung)

### Schnellstart

1. **Repository klonen**
```bash
git clone https://github.com/ochtii/Spielesammlung.git
cd Spielesammlung
```

2. **Lokaler Server starten** (optional)
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

3. **Im Browser öffnen**
```
http://localhost:8000
```

### Alternativ: Direkt öffnen
Einfach `index.html` im Browser öffnen - keine Installation nötig!

---

## 🎮 Verwendung

### Spiel starten

1. **Spielmodus wählen** - KFZ-Kennzeichen, Hauptstädte (AT), Hauptstädte (International)
2. **Unterkategorie wählen** - Je nach Modus verfügbar
3. **Schwierigkeitsgrad wählen** - Quiz, Kombiniert oder Profi
4. **Spiel starten** - Los geht's!

### Während des Spiels

- **Antwort eingeben** - Je nach Modus tippen oder anklicken
- **Tipps nutzen** - Optional verschiedene Hilfen aktivieren
- **Timer beachten** - Wenn aktiviert, innerhalb der Zeit antworten
- **Punkte sammeln** - Bei richtigen Antworten

### Nach dem Spiel

- **Ergebnis ansehen** - Punkte, Prozentsatz, Bewertung
- **Statistik prüfen** - Detaillierte Auswertung in der Punkte-Seite
- **Nochmal spielen** - Zurück zum Start oder neues Spiel

---

## 📂 Projekt-Struktur

```
Spielesammlung/
├── index.html              # Hauptseite (Spielbereich)
├── points.html             # Punktestand & Statistiken
├── help.html               # Hilfe & Anleitung
├── faq.html               # Häufig gestellte Fragen
├── settings.html          # Einstellungen
├── wappen.html            # Wappen-Sammlung
├── entwickler.html        # Entwickler-Informationen
├── impressum.html         # Impressum & Rechtliches
│
├── style.css              # Haupt-Stylesheet (6900+ Zeilen)
├── script.js              # Hauptlogik (2200+ Zeilen)
├── world_capitals.js      # Internationale Hauptstädte
├── coats_of_arms.js       # Österreichische Wappen
│
└── README.md              # Diese Datei
```

### Datei-Beschreibungen

#### HTML-Seiten
- **index.html** - Spieloberfläche, Fragen, Antworten, Timer
- **points.html** - Punktestand, Verlauf, Statistiken, Charts
- **settings.html** - Umfassende Einstellungen mit Accordion-Struktur
- **wappen.html** - Übersicht aller österreichischen Wappen

#### JavaScript-Module
- **script.js** - Hauptklasse `AustriaQuiz`, Spiellogik, Punktesystem
- **world_capitals.js** - Datenbank mit 150+ internationalen Hauptstädten
- **coats_of_arms.js** - 54 österreichische Wappen mit Helper-Funktionen

#### Styling
- **style.css** - Umfassendes CSS mit:
  - CSS Variablen für Theming
  - Dark Mode Support
  - Responsive Breakpoints
  - Animationen & Transitions
  - Komponenten-Styles

---

## 🎲 Spielmodi

### 1. KFZ-Kennzeichen 🚗

Teste dein Wissen über österreichische KFZ-Kennzeichen!

**Datenquelle:** 93 offizielle Kennzeichen
- 9 Bundesländer
- 84 Bezirke

**Modi:**
- Bundesländer (9 Fragen)
- Bezirke (84 Fragen)
- Alle (93 Fragen)

### 2. Hauptstädte Österreich 🏛️

Lerne die Hauptstädte Österreichs kennen!

**Datenquelle:** Alle österreichischen Hauptstädte
- 9 Landeshauptstädte
- Bezirkshauptstädte

**Features:**
- Wappen-Anzeige als Tipp
- Mehrere Namen pro Stadt (z.B. "Wien" und "Vienna")

### 3. Internationale Hauptstädte 🌍

Erkunde Hauptstädte aus aller Welt!

**Datenquelle:** 150+ Hauptstädte
- Alle Kontinente
- Mehrsprachige Namen (Deutsch, Englisch, Native)

**Schwierigkeitsgrade:**
- Einfach - Bekannte Hauptstädte
- Mittel - Mittlere Schwierigkeit
- Schwer - Seltene und schwierige Hauptstädte

---

## ⚙️ Einstellungen

### Darstellung
```javascript
{
  theme: 'light' | 'dark',              // Dark Mode
  bottomNavEnabled: boolean,             // Bottom Navigation
  bottomNavFixed: boolean,               // Fixierte Position
  bottomNavSize: 'small' | 'normal' | 'large',
  bottomNavShow*: boolean                // Button-Sichtbarkeit
}
```

### Spieloptionen
```javascript
{
  typoTolerance: boolean,               // Tippfehler akzeptieren
  paidHints: boolean,                   // Tipps kosten Punkte
  balanceDisplayMode: 'widget' | 'header',
  timerEnabled: boolean,                // Timer aktivieren
  timerDuration: 5-120                  // Sekunden pro Frage
}
```

### Datenspeicherung
```javascript
{
  historyLimit: 50 | 100 | 200 | 500,  // Verlaufseinträge
  devMode: boolean                      // Entwicklermodus
}
```

---

## 🏅 Punktesystem

### Berechnung

```javascript
Basispunkte = 100
Punkte = max(10, Basispunkte - (Tipps * 30))
```

### Beispiele

| Tipps verwendet | Punkte |
|----------------|--------|
| 0 | 100 |
| 1 | 70 |
| 2 | 40 |
| 3 | 10 |

### Globales Punktekonto

Alle Punkte werden kumuliert und persistent gespeichert:
- Gesamtpunkte
- Punkte pro Spieltyp
- Verlauf mit Zeitstempel
- Statistiken

---

## 🔧 Entwicklung

### Lokale Entwicklung

```bash
# Repository klonen
git clone https://github.com/ochtii/Spielesammlung.git

# In Verzeichnis wechseln
cd Spielesammlung

# Server starten (z.B. mit Python)
python -m http.server 8000

# Im Browser öffnen
open http://localhost:8000
```

### Entwicklermodus

Aktiviere den Entwicklermodus in den Einstellungen für:
- **Storage-Analyse** - Detaillierte LocalStorage-Übersicht
- **Storage-Charts** - Visuelle Darstellung der Speichernutzung
- **Gefahrenbereich** - Reset-Funktionen für Testing
- **Footer-Toggles** - Zoom-Reset, Commit-Info

### Code-Struktur

#### Hauptklasse: `AustriaQuiz`

```javascript
class AustriaQuiz {
  constructor()           // Initialisierung
  selectGame(game)        // Spielauswahl
  startGame()             // Spiel starten
  loadNextQuestion()      // Nächste Frage laden
  submitAnswer(answer)    // Antwort prüfen
  checkAnswer()           // Antwort validieren
  startTimer()            // Timer starten
  stopTimer()             // Timer stoppen
  handleTimeOut()         // Zeitablauf behandeln
  useHint(type)           // Tipp verwenden
  endGame()               // Spiel beenden
  savePoints()            // Punkte speichern
}
```

### Browser-Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

### Performance

- Lazy Loading für Bilder
- Debounced Event Handlers
- Optimierte CSS (CSS Variables, Hardware Acceleration)
- Minimale DOM-Manipulationen

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile */
@media (max-width: 576px)

/* Tablet */
@media (min-width: 577px) and (max-width: 768px)

/* Desktop */
@media (min-width: 769px)
```

### Mobile Optimierungen
- Touch-optimierte Buttons
- Bottom Navigation für einfache Erreichbarkeit
- Angepasste Schriftgrößen
- Optimierte Layouts

---

## 🤝 Beitragen

Contributions sind willkommen! Bitte beachte:

1. Fork das Projekt
2. Erstelle einen Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

---

## 📄 Lizenz

Dieses Projekt ist unter der **MIT-Lizenz** lizenziert.

```
MIT License

Copyright (c) 2026 Österreich Spielesammlung

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 Autor

**ochtii**
- GitHub: [@ochtii](https://github.com/ochtii)
- Repository: [Spielesammlung](https://github.com/ochtii/Spielesammlung)

---

## 🙏 Danksagungen

- **Wikimedia Commons** - Für die Wappen-Bilder
- **Font Awesome** - Für die Icons
- **Google Fonts** - Für die Schriftarten
- **GitHub** - Für das Hosting und die API

---

## 📊 Statistiken

![GitHub repo size](https://img.shields.io/github/repo-size/ochtii/Spielesammlung)
![GitHub code size](https://img.shields.io/github/languages/code-size/ochtii/Spielesammlung)
![Lines of code](https://img.shields.io/tokei/lines/github/ochtii/Spielesammlung)

---

<div align="center">

**⭐ Wenn dir dieses Projekt gefällt, gib ihm einen Stern auf GitHub! ⭐**

Made with ❤️ in Austria 🇦🇹

[Nach oben ⬆️](#-österreich-spielesammlung-aut-quiz)

</div>
