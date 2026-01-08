// ============================================
// ÖSTERREICH-QUIZ - SPIELDATEN
// ============================================

/**
 * Offizielle österreichische KFZ-Kennzeichen
 */
const districtData = [
    // Burgenland
    { code: 'E', name: 'Eisenstadt', state: 'Burgenland' },
    { code: 'EU', name: 'Eisenstadt-Umgebung', state: 'Burgenland' },
    { code: 'GS', name: 'Güssing', state: 'Burgenland' },
    { code: 'JE', name: 'Jennersdorf', state: 'Burgenland' },
    { code: 'MA', name: 'Mattersburg', state: 'Burgenland' },
    { code: 'ND', name: 'Neusiedl am See', state: 'Burgenland' },
    { code: 'OP', name: 'Oberpullendorf', state: 'Burgenland' },
    { code: 'OW', name: 'Oberwart', state: 'Burgenland' },
    
    // Kärnten
    { code: 'K', name: 'Klagenfurt', state: 'Kärnten' },
    { code: 'VI', name: 'Villach', state: 'Kärnten' },
    { code: 'SP', name: 'Spittal an der Drau', state: 'Kärnten' },
    { code: 'HE', name: 'Hermagor', state: 'Kärnten' },
    { code: 'FE', name: 'Feldkirchen', state: 'Kärnten' },
    { code: 'SV', name: 'Sankt Veit an der Glan', state: 'Kärnten' },
    { code: 'VK', name: 'Völkermarkt', state: 'Kärnten' },
    { code: 'WO', name: 'Wolfsberg', state: 'Kärnten' },
    
    // Niederösterreich
    { code: 'AM', name: 'Amstetten', state: 'Niederösterreich' },
    { code: 'BN', name: 'Baden', state: 'Niederösterreich' },
    { code: 'BL', name: 'Bruck an der Leitha', state: 'Niederösterreich' },
    { code: 'GD', name: 'Gmünd', state: 'Niederösterreich' },
    { code: 'GF', name: 'Gänserndorf', state: 'Niederösterreich' },
    { code: 'HL', name: 'Hollabrunn', state: 'Niederösterreich' },
    { code: 'HO', name: 'Horn', state: 'Niederösterreich' },
    { code: 'KR', name: 'Krems', state: 'Niederösterreich' },
    { code: 'KO', name: 'Korneuburg', state: 'Niederösterreich' },
    { code: 'LF', name: 'Lilienfeld', state: 'Niederösterreich' },
    { code: 'ME', name: 'Melk', state: 'Niederösterreich' },
    { code: 'MI', name: 'Mistelbach', state: 'Niederösterreich' },
    { code: 'MD', name: 'Mödling', state: 'Niederösterreich' },
    { code: 'NK', name: 'Neunkirchen', state: 'Niederösterreich' },
    { code: 'P', name: 'Sankt Pölten', state: 'Niederösterreich' },
    { code: 'PL', name: 'Sankt Pölten-Land', state: 'Niederösterreich' },
    { code: 'SB', name: 'Scheibbs', state: 'Niederösterreich' },
    { code: 'TU', name: 'Tulln', state: 'Niederösterreich' },
    { code: 'WB', name: 'Wiener Neustadt', state: 'Niederösterreich' },
    { code: 'WT', name: 'Waidhofen an der Thaya', state: 'Niederösterreich' },
    { code: 'ZT', name: 'Zwettl', state: 'Niederösterreich' },
    
    // Oberösterreich
    { code: 'BR', name: 'Braunau am Inn', state: 'Oberösterreich' },
    { code: 'EF', name: 'Eferding', state: 'Oberösterreich' },
    { code: 'FR', name: 'Freistadt', state: 'Oberösterreich' },
    { code: 'GM', name: 'Gmunden', state: 'Oberösterreich' },
    { code: 'GR', name: 'Grieskirchen', state: 'Oberösterreich' },
    { code: 'KI', name: 'Kirchdorf', state: 'Oberösterreich' },
    { code: 'L', name: 'Linz', state: 'Oberösterreich' },
    { code: 'LL', name: 'Linz-Land', state: 'Oberösterreich' },
    { code: 'PE', name: 'Perg', state: 'Oberösterreich' },
    { code: 'RI', name: 'Ried im Innkreis', state: 'Oberösterreich' },
    { code: 'RO', name: 'Rohrbach', state: 'Oberösterreich' },
    { code: 'SD', name: 'Schärding', state: 'Oberösterreich' },
    { code: 'SE', name: 'Steyr-Land', state: 'Oberösterreich' },
    { code: 'SR', name: 'Steyr', state: 'Oberösterreich' },
    { code: 'UU', name: 'Urfahr-Umgebung', state: 'Oberösterreich' },
    { code: 'VB', name: 'Vöcklabruck', state: 'Oberösterreich' },
    { code: 'WE', name: 'Wels', state: 'Oberösterreich' },
    { code: 'WL', name: 'Wels-Land', state: 'Oberösterreich' },
    
    // Salzburg
    { code: 'S', name: 'Salzburg', state: 'Salzburg' },
    { code: 'HA', name: 'Hallein', state: 'Salzburg' },
    { code: 'JO', name: 'Sankt Johann im Pongau', state: 'Salzburg' },
    { code: 'TA', name: 'Tamsweg', state: 'Salzburg' },
    { code: 'ZE', name: 'Zell am See', state: 'Salzburg' },
    
    // Steiermark
    { code: 'G', name: 'Graz', state: 'Steiermark' },
    { code: 'GU', name: 'Graz-Umgebung', state: 'Steiermark' },
    { code: 'BM', name: 'Bruck-Mürzzuschlag', state: 'Steiermark' },
    { code: 'DL', name: 'Deutschlandsberg', state: 'Steiermark' },
    { code: 'FF', name: 'Feldbach', state: 'Steiermark' },
    { code: 'HB', name: 'Hartberg-Fürstenfeld', state: 'Steiermark' },
    { code: 'JU', name: 'Judenburg', state: 'Steiermark' },
    { code: 'KF', name: 'Knittelfeld', state: 'Steiermark' },
    { code: 'LB', name: 'Leibnitz', state: 'Steiermark' },
    { code: 'LN', name: 'Leoben', state: 'Steiermark' },
    { code: 'LI', name: 'Liezen', state: 'Steiermark' },
    { code: 'MU', name: 'Murau', state: 'Steiermark' },
    { code: 'MT', name: 'Murtal', state: 'Steiermark' },
    { code: 'RA', name: 'Radkersburg', state: 'Steiermark' },
    { code: 'VO', name: 'Voitsberg', state: 'Steiermark' },
    { code: 'WZ', name: 'Weiz', state: 'Steiermark' },
    
    // Tirol
    { code: 'I', name: 'Innsbruck', state: 'Tirol' },
    { code: 'IL', name: 'Innsbruck-Land', state: 'Tirol' },
    { code: 'IM', name: 'Imst', state: 'Tirol' },
    { code: 'KB', name: 'Kitzbühel', state: 'Tirol' },
    { code: 'KU', name: 'Kufstein', state: 'Tirol' },
    { code: 'LA', name: 'Landeck', state: 'Tirol' },
    { code: 'LZ', name: 'Lienz', state: 'Tirol' },
    { code: 'RE', name: 'Reutte', state: 'Tirol' },
    { code: 'SZ', name: 'Schwaz', state: 'Tirol' },
    
    // Vorarlberg
    { code: 'B', name: 'Bregenz', state: 'Vorarlberg' },
    { code: 'BZ', name: 'Bludenz', state: 'Vorarlberg' },
    { code: 'DO', name: 'Dornbirn', state: 'Vorarlberg' },
    { code: 'FK', name: 'Feldkirch', state: 'Vorarlberg' },
    
    // Wien
    { code: 'W', name: 'Wien', state: 'Wien' },
];

/**
 * Bundesländer mit Hauptstädten
 */
const capitalsData = [
    { state: 'Burgenland', capital: 'Eisenstadt' },
    { state: 'Kärnten', capital: 'Klagenfurt' },
    { state: 'Niederösterreich', capital: 'Sankt Pölten' },
    { state: 'Oberösterreich', capital: 'Linz' },
    { state: 'Salzburg', capital: 'Salzburg' },
    { state: 'Steiermark', capital: 'Graz' },
    { state: 'Tirol', capital: 'Innsbruck' },
    { state: 'Vorarlberg', capital: 'Bregenz' },
    { state: 'Wien', capital: 'Wien' },
];

/**
 * Bundesländer-Wappen aus neuer Datenbank
 */
function getCoatOfArms(name) {
    if (typeof austrianCoatsOfArms !== 'undefined' && typeof coatsOfArmsHelpers !== 'undefined') {
        const coat = coatsOfArmsHelpers.findByName(name);
        if (coat && coat.wappen) {
            // Wappen kann ein Array sein - nimm die erste URL
            return Array.isArray(coat.wappen) ? coat.wappen[0] : coat.wappen;
        }
    }
    return null;
}

const stateCoats = {
    'Burgenland': getCoatOfArms('Burgenland'),
    'Kärnten': getCoatOfArms('Kärnten'),
    'Niederösterreich': getCoatOfArms('Niederösterreich'),
    'Oberösterreich': getCoatOfArms('Oberösterreich'),
    'Salzburg': getCoatOfArms('Salzburg'),
    'Steiermark': getCoatOfArms('Steiermark'),
    'Tirol': getCoatOfArms('Tirol'),
    'Vorarlberg': getCoatOfArms('Vorarlberg'),
    'Wien': getCoatOfArms('Wien')
};

/**
 * Bezirks-Hauptstädte (zusätzlich für erweitertes Quiz)
 */
const districtCapitals = [
    { city: 'Eisenstadt', state: 'Burgenland', district: 'Eisenstadt-Umgebung' },
    { city: 'Klagenfurt', state: 'Kärnten', district: 'Klagenfurt-Land' },
    { city: 'Villach', state: 'Kärnten', district: 'Villach-Land' },
    { city: 'Sankt Pölten', state: 'Niederösterreich', district: 'Sankt Pölten-Land' },
    { city: 'Linz', state: 'Oberösterreich', district: 'Linz-Land' },
    { city: 'Wels', state: 'Oberösterreich', district: 'Wels-Land' },
    { city: 'Salzburg', state: 'Salzburg', district: 'Salzburg-Umgebung' },
    { city: 'Graz', state: 'Steiermark', district: 'Graz-Umgebung' },
    { city: 'Innsbruck', state: 'Tirol', district: 'Innsbruck-Land' },
    { city: 'Bregenz', state: 'Vorarlberg', district: 'Bregenz' },
    { city: 'Wien', state: 'Wien', district: 'Wien' },
    // Zusätzliche Bezirks-Hauptstädte (erweitert)
    { city: 'Amstetten', state: 'Niederösterreich', district: 'Amstetten' },
    { city: 'Krems', state: 'Niederösterreich', district: 'Krems an der Donau' },
    { city: 'Traun', state: 'Oberösterreich', district: 'Linz-Land' },
    { city: 'Steyr', state: 'Oberösterreich', district: 'Steyr' },
    { city: 'Kapfenberg', state: 'Steiermark', district: 'Bruck-Mürzzuschlag' },
    { city: 'Leoben', state: 'Steiermark', district: 'Leoben' },
    { city: 'Sankt Johann im Pongau', state: 'Salzburg', district: 'Sankt Johann im Pongau' },
    { city: 'Hallein', state: 'Salzburg', district: 'Hallein' },
    { city: 'Dornbirn', state: 'Vorarlberg', district: 'Dornbirn' },
    { city: 'Bludenz', state: 'Vorarlberg', district: 'Bludenz' },
    { city: 'Kufstein', state: 'Tirol', district: 'Kufstein' },
    { city: 'Schwaz', state: 'Tirol', district: 'Schwaz' }
];

/**
 * Große österreichische Städte mit Einwohnerzahlen
 */
const populationData = [
    { city: 'Wien', population: 1920000 },
    { city: 'Graz', population: 280000 },
    { city: 'Linz', population: 208000 },
    { city: 'Salzburg', population: 161000 },
    { city: 'Innsbruck', population: 138000 },
    { city: 'Klagenfurt', population: 100000 },
    { city: 'Wels', population: 62000 },
    { city: 'Sankt Pölten', population: 55000 },
    { city: 'Dornbirn', population: 48000 },
    { city: 'Hallein', population: 56000 },
    { city: 'Villach', population: 59000 },
    { city: 'Feldkirch', population: 32000 },
    { city: 'Bregenz', population: 28000 },
    { city: 'Krems', population: 24000 },
    { city: 'Steyr', population: 38000 },
    { city: 'Kapfenberg', population: 21000 },
    { city: 'Kufstein', population: 18000 },
    { city: 'Saalfelden', population: 16000 },
    { city: 'Tamsweg', population: 8000 },
    { city: 'Eisenstadt', population: 14000 },
];

// ============================================
// HAUPTANWENDUNGSLOGIK
// ============================================

class AustriaQuiz {
    constructor() {
        this.currentGame = null;
        this.currentDifficulty = null;
        this.capitalMode = 'all'; // 'federal', 'district', 'all'
        this.score = 0;
        this.totalPossiblePoints = 0; // Maximale mögliche Punkte
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.currentQuestion = null;
        this.gameActive = false;
        this.hintsUsedThisQuestion = 0; // Anzahl verwendeter Tipps pro Frage
        this.usedHintTypes = []; // Bereits verwendete Tipp-Typen pro Frage
        this.maxHints = 3; // Maximale Tipps pro Frage
        this.typoTolerance = localStorage.getItem('typoTolerance') !== 'false'; // Tippfehler-Toleranz aktivierbar
        this.paidHints = localStorage.getItem('paidHints') === 'true'; // Kostenpflichtige Tipps
        this.balanceDisplayMode = localStorage.getItem('balanceDisplayMode') || 'widget'; // 'widget' or 'header'
        
        // Tipp-Preise nach Nützlichkeit
        this.hintPrices = {
            '5050': 30,          // Sehr hilfreich
            'removeOne': 20,     // Hilfreich
            'firstLetter': 15,   // Mittel
            'randomLetter': 15,  // Mittel
            'length': 10,        // Weniger hilfreich
            'coat': 15           // Mittel
        };
        
        // Punktesystem-Konstanten
        this.basePoints = 100; // Basispunkte ohne Tipp
        this.hintPenalty = 30; // Punktabzug pro Tipp
        
        // Timer-Einstellungen
        this.timerEnabled = localStorage.getItem('timerEnabled') === 'true';
        this.timerDuration = parseInt(localStorage.getItem('timerDuration') || '30');
        this.timerVisual = localStorage.getItem('timerVisual') !== 'false'; // Standard: aktiviert
        this.timerInterval = null;
        this.timeRemaining = 0;
        this.timerBonus = 0; // Bonus-Punkte für schnelle Antworten
        
        // Lade globale Punkte-Daten
        this.loadPointsData();
        
        this.init();
    }

    /**
     * Globale Punkte-Daten aus localStorage laden
     */
    loadPointsData() {
        const data = JSON.parse(localStorage.getItem('pointsData')) || {
            totalPoints: 0,
            gamesPlayed: 0,
            correctAnswers: 0,
            hintsUsed: 0,
            history: []
        };
        // Stelle sicher, dass history existiert (für bestehende Daten)
        if (!data.history) {
            data.history = [];
        }
        this.globalPoints = data;
        this.updateMenuPointsDisplay();
    }

    /**
     * Globale Punkte-Daten in localStorage speichern
     */
    savePointsData() {
        localStorage.setItem('pointsData', JSON.stringify(this.globalPoints));
        this.updateMenuPointsDisplay();
        this.updateFloatingBalance();
    }

    /**
     * Punkte im Menü aktualisieren
     */
    updateMenuPointsDisplay() {
        const menuPointsDisplay = document.getElementById('menuPointsDisplay');
        if (menuPointsDisplay) {
            menuPointsDisplay.textContent = this.globalPoints.totalPoints;
        }
    }

    /**
     * Punkte zum globalen Konto hinzufügen
     */
    addGlobalPoints(points, questionData = null) {
        this.globalPoints.totalPoints += points;
        
        // Füge zur Historie hinzu
        if (questionData) {
            this.addToHistory({
                type: 'earned',
                points: points,
                timestamp: Date.now(),
                game: this.getGameName(),
                difficulty: this.currentDifficulty,
                question: questionData.question,
                answer: questionData.answer,
                userAnswer: questionData.userAnswer,
                isCorrect: questionData.isCorrect,
                hintsUsed: this.hintsUsedThisQuestion
            });
        }
        
        this.savePointsData();
    }

    /**
     * Globale Punkte ausgeben (für Tipps)
     */
    spendGlobalPoints(amount, hintType = null) {
        if (this.globalPoints.totalPoints >= amount) {
            this.globalPoints.totalPoints -= amount;
            
            // Füge zur Historie hinzu
            this.addToHistory({
                type: 'spent',
                points: -amount,
                timestamp: Date.now(),
                game: this.getGameName(),
                difficulty: this.currentDifficulty,
                question: this.currentQuestion ? this.currentQuestion.question : 'Tipp verwendet',
                hintType: hintType
            });
            
            this.savePointsData();
            return true;
        }
        return false;
    }

    /**
     * Statistik aktualisieren
     */
    updateStats(correct) {
        if (correct) {
            this.globalPoints.correctAnswers++;
        }
        this.savePointsData();
    }

    /**
     * Eintrag zur Historie hinzufügen
     */
    addToHistory(entry) {
        if (!this.globalPoints.history) {
            this.globalPoints.history = [];
        }
        this.globalPoints.history.unshift(entry); // Neueste zuerst
        
        // Begrenze Historie auf eingestelltes Limit
        const limit = this.getHistoryLimit();
        if (this.globalPoints.history.length > limit) {
            this.globalPoints.history = this.globalPoints.history.slice(0, limit);
        }
    }

    /**
     * Spielname für Historie abrufen
     */
    getGameName() {
        const gameNames = {
            'license-plates': 'Kennzeichen',
            'capitals': 'Hauptstädte',
            'world-capitals': 'Welt-Hauptstädte',
            'population': 'Einwohner'
        };
        return gameNames[this.currentGame] || 'Quiz';
    }

    /**
     * Spiel-Statistik aktualisieren
     */
    incrementGamesPlayed() {
        this.globalPoints.gamesPlayed++;
        this.savePointsData();
    }

    /**
     * Hinweis-Statistik aktualisieren
     */
    incrementHintsUsed() {
        this.globalPoints.hintsUsed++;
        this.savePointsData();
    }

    /**
     * Initialisierung der Anwendung
     */
    init() {
        this.setupEventListeners();
        this.loadTheme();
        this.initFloatingBalance();
    }

    /**
     * Floating Balance Widget initialisieren
     */
    initFloatingBalance() {
        const floatingBalance = document.getElementById('floatingBalance');
        if (!floatingBalance) return;

        // Lade gespeicherte Position
        const savedPos = JSON.parse(localStorage.getItem('floatingBalancePos') || '{}');
        if (savedPos.top) floatingBalance.style.top = savedPos.top;
        if (savedPos.left) floatingBalance.style.left = savedPos.left;
        if (savedPos.left) floatingBalance.style.right = 'auto';

        // Drag & Drop Funktionalität
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        floatingBalance.addEventListener('mousedown', dragStart);
        floatingBalance.addEventListener('touchstart', dragStart, { passive: false });

        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag, { passive: false });

        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('touchend', dragEnd);

        function dragStart(e) {
            isDragging = true;
            floatingBalance.classList.add('dragging');

            const rect = floatingBalance.getBoundingClientRect();
            
            if (e.type === 'touchstart') {
                offsetX = e.touches[0].clientX - rect.left;
                offsetY = e.touches[0].clientY - rect.top;
            } else {
                offsetX = e.clientX - rect.left;
                offsetY = e.clientY - rect.top;
            }
        }

        function drag(e) {
            if (!isDragging) return;

            e.preventDefault();

            let clientX, clientY;
            if (e.type === 'touchmove') {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }

            let newX = clientX - offsetX;
            let newY = clientY - offsetY;

            // Begrenze auf Viewport mit Padding
            const maxX = window.innerWidth - floatingBalance.offsetWidth - 10;
            const maxY = window.innerHeight - floatingBalance.offsetHeight - 10;

            newX = Math.max(10, Math.min(newX, maxX));
            newY = Math.max(10, Math.min(newY, maxY));

            floatingBalance.style.left = newX + 'px';
            floatingBalance.style.top = newY + 'px';
            floatingBalance.style.right = 'auto';
        }

        function dragEnd() {
            if (!isDragging) return;

            isDragging = false;
            floatingBalance.classList.remove('dragging');

            // Speichere Position
            localStorage.setItem('floatingBalancePos', JSON.stringify({
                top: floatingBalance.style.top,
                left: floatingBalance.style.left
            }));
        }
    }

    /**
     * Aktualisiere Floating Balance
     */
    updateFloatingBalance() {
        const floatingBalance = document.getElementById('floatingBalance');
        const floatingBalanceAmount = document.getElementById('floatingBalanceAmount');
        const headerBalance = document.getElementById('headerBalance');
        const headerBalanceAmount = document.getElementById('headerBalanceAmount');
        
        if (this.paidHints && this.gameActive) {
            const amount = this.globalPoints.totalPoints;
            
            if (this.balanceDisplayMode === 'widget') {
                // Zeige Widget
                if (floatingBalance && floatingBalanceAmount) {
                    floatingBalanceAmount.textContent = amount;
                    floatingBalance.style.display = 'block';
                }
                // Verstecke Header
                if (headerBalance) {
                    headerBalance.style.display = 'none';
                }
            } else {
                // Zeige Header
                if (headerBalance && headerBalanceAmount) {
                    headerBalanceAmount.textContent = amount;
                    headerBalance.style.display = 'flex';
                }
                // Verstecke Widget
                if (floatingBalance) {
                    floatingBalance.style.display = 'none';
                }
            }
        } else {
            // Verstecke beide
            if (floatingBalance) floatingBalance.style.display = 'none';
            if (headerBalance) headerBalance.style.display = 'none';
        }
    }

    /**
     * Update Balance Display (für Settings-Änderungen)
     */
    updateBalanceDisplay() {
        this.updateFloatingBalance();
    }

    // ============================================
    // TIMER-FUNKTIONEN
    // ============================================

    /**
     * Timer starten für aktuelle Frage
     */
    startTimer() {
        // Vorherigen Timer stoppen falls noch aktiv
        this.stopTimer();
        
        // Timer-Einstellungen neu laden (falls in Settings geändert)
        this.timerEnabled = localStorage.getItem('timerEnabled') === 'true';
        this.timerDuration = parseInt(localStorage.getItem('timerDuration') || '30');
        this.timerVisual = localStorage.getItem('timerVisual') !== 'false';
        
        if (!this.timerEnabled) {
            this.showTimerDisplay(false);
            return;
        }
        
        this.timeRemaining = this.timerDuration;
        this.initTimerMode();
        this.updateTimerDisplay();
        this.showTimerDisplay(true);
        
        // Neuen Timer starten
        this.timerInterval = setInterval(() => {
            this.timeRemaining--;
            this.updateTimerDisplay();
            
            if (this.timeRemaining <= 0) {
                this.onTimerExpired();
            }
        }, 1000);
    }

    /**
     * Timer-Modus initialisieren (visuell oder einfach)
     */
    initTimerMode() {
        const timerDisplay = document.getElementById('timerDisplay');
        if (!timerDisplay) return;
        
        // Modus-Klassen entfernen und neu setzen
        timerDisplay.classList.remove('visual-mode', 'simple-mode');
        
        if (this.timerVisual) {
            timerDisplay.classList.add('visual-mode');
            // Ring-Fortschritt initialisieren
            this.updateTimerRing(1);
        } else {
            timerDisplay.classList.add('simple-mode');
        }
    }

    /**
     * Timer-Ring Fortschritt aktualisieren (für visuellen Modus)
     */
    updateTimerRing(progress) {
        const ringProgress = document.getElementById('timerRingProgress');
        if (!ringProgress) return;
        
        // Der Umfang des Kreises ist 2 * PI * r = 2 * 3.14159 * 45 ≈ 283
        const circumference = 283;
        const offset = circumference * (1 - progress);
        ringProgress.style.strokeDashoffset = offset;
    }

    /**
     * Timer stoppen
     */
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    /**
     * Timer-Anzeige aktualisieren
     */
    updateTimerDisplay() {
        const timerValue = document.getElementById('timerValue');
        const timerDisplay = document.getElementById('timerDisplay');
        
        if (timerValue && timerDisplay) {
            timerValue.textContent = this.timeRemaining;
            
            // Fortschritt für visuellen Ring berechnen
            if (this.timerVisual) {
                const progress = this.timeRemaining / this.timerDuration;
                this.updateTimerRing(progress);
            }
            
            // Farb-Klassen basierend auf verbleibender Zeit
            timerDisplay.classList.remove('warning', 'danger');
            
            const warningThreshold = Math.ceil(this.timerDuration * 0.33); // 33% der Zeit
            const dangerThreshold = Math.ceil(this.timerDuration * 0.15);  // 15% der Zeit
            
            if (this.timeRemaining <= dangerThreshold) {
                timerDisplay.classList.add('danger');
            } else if (this.timeRemaining <= warningThreshold) {
                timerDisplay.classList.add('warning');
            }
        }
    }

    /**
     * Timer-Anzeige ein-/ausblenden
     */
    showTimerDisplay(show) {
        const timerDisplay = document.getElementById('timerDisplay');
        if (timerDisplay) {
            timerDisplay.style.display = show && this.timerEnabled ? 'flex' : 'none';
        }
    }

    /**
     * Timer abgelaufen - automatisch als falsch werten
     */
    onTimerExpired() {
        this.stopTimer();
        
        if (!this.gameActive) return;
        
        // Zeit abgelaufen - als falsche Antwort werten
        this.gameActive = false;
        
        // Markiere alle Buttons als disabled
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
            const btnText = btn.textContent.trim().toLowerCase();
            const correctText = this.currentQuestion.answer.toLowerCase();
            
            if (btnText === correctText) {
                btn.classList.add('correct');
            }
        });
        
        // Zeige Zeit-Ablauf-Feedback
        this.showTimerExpiredFeedback();
        
        // Zur Historie hinzufügen
        this.addGlobalPoints(0, {
            question: this.currentQuestion.question,
            answer: this.currentQuestion.answer,
            userAnswer: '⏱️ Zeit abgelaufen',
            isCorrect: false
        });
        
        this.totalPossiblePoints += this.basePoints;
        this.updateStats(false);
        
        document.getElementById('scoreValue').textContent = this.score;
        this.currentQuestionIndex++;
    }

    /**
     * Feedback anzeigen wenn Timer abgelaufen
     */
    showTimerExpiredFeedback() {
        const feedbackArea = document.getElementById('feedbackArea');
        const feedbackContent = document.getElementById('feedbackContent');
        feedbackArea.classList.remove('feedback-hidden');
        
        let html = `
            <div class="feedback-incorrect feedback-timeout">
                <i class="fas fa-clock"></i> Zeit abgelaufen! +0 Punkte
            </div>
            <div class="feedback-answer"><strong>Richtige Antwort:</strong> ${this.currentQuestion.answer}</div>
        `;
        
        // Spezielle Anzeige für Population-Fragen
        if (this.currentQuestion.type === 'population') {
            html += this.renderPopulationComparison(false);
        }
        
        feedbackContent.innerHTML = html;
        window.scrollTo(0, feedbackArea.offsetTop);
    }

    /**
     * Berechne Timer-Bonus Punkte für schnelle Antworten
     */
    calculateTimerBonus() {
        if (!this.timerEnabled || this.timeRemaining <= 0) return 0;
        
        // Bonus basierend auf verbleibender Zeit (max 20 Punkte)
        const percentRemaining = this.timeRemaining / this.timerDuration;
        const bonus = Math.floor(percentRemaining * 20);
        return bonus;
    }

    /**
     * Bestätige Spielende
     */
    confirmEndGame() {
        const modal = document.createElement('div');
        modal.className = 'settings-modal';
        modal.innerHTML = `
            <div class="settings-content" style="max-width: 400px;">
                <div class="settings-header">
                    <h3><i class="fas fa-exclamation-triangle"></i> Spiel beenden?</h3>
                </div>
                <div class="settings-body">
                    <p style="text-align: center; color: var(--text-secondary); margin: 1.5rem 0;">
                        Möchtest du das Spiel wirklich beenden? Dein Fortschritt wird gespeichert.
                    </p>
                </div>
                <div class="settings-footer" style="display: flex; gap: 0.75rem;">
                    <button id="confirmCancel" class="settings-save-btn" style="background: var(--text-secondary); flex: 1;" type="button">
                        <i class="fas fa-times"></i> Abbrechen
                    </button>
                    <button id="confirmEnd" class="settings-save-btn" style="background: var(--error-color); flex: 1;" type="button">
                        <i class="fas fa-check"></i> Beenden
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('confirmCancel').addEventListener('click', () => modal.remove());
        document.getElementById('confirmEnd').addEventListener('click', () => {
            modal.remove();
            this.backToStart();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    /**
     * Event Listener Setup
     */
    setupEventListeners() {
        // Menu Toggle
        const menuToggle = document.getElementById('menuToggle');
        const menuDropdown = document.getElementById('menuDropdown');
        
        if (menuToggle && menuDropdown) {
            menuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                menuToggle.classList.toggle('active');
                menuDropdown.classList.toggle('show');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!menuToggle.contains(e.target) && !menuDropdown.contains(e.target)) {
                    menuToggle.classList.remove('active');
                    menuDropdown.classList.remove('show');
                }
            });
            
            // Close menu when clicking a menu item
            menuDropdown.querySelectorAll('.menu-item').forEach(item => {
                item.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    menuDropdown.classList.remove('show');
                });
            });
        }

        // Game Selection
        document.querySelectorAll('.game-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const game = e.currentTarget.dataset.game;
                this.selectGame(game);
            });
        });

        // Difficulty Selection
        document.querySelectorAll('[data-difficulty]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.currentTarget.dataset.difficulty) {
                    document.querySelectorAll('[data-difficulty]').forEach(b => b.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    this.selectDifficulty(e.currentTarget.dataset.difficulty);
                }
            });
        });

        // Start Game Button
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.startGame();
            });
        }

        // Restart Button
        document.getElementById('restartBtn').addEventListener('click', () => {
            this.restartGame();
        });

        // End Game Button
        const endGameBtn = document.getElementById('endGameBtn');
        if (endGameBtn) {
            endGameBtn.addEventListener('click', () => {
                this.confirmEndGame();
            });
        }

        // Next Button
        document.getElementById('nextBtn').addEventListener('click', () => {
            this.loadNextQuestion();
        });

        // Hint Buttons
        document.querySelectorAll('.hint-btn-compact').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const hintType = e.currentTarget.dataset.hint;
                this.useHint(hintType);
            });
        });
    }

    /**
     * Hole Historie-Limit aus localStorage
     */
    getHistoryLimit() {
        return parseInt(localStorage.getItem('historyLimit')) || 100;
    }

    /**
     * Bereinige Historie auf angegebenes Limit
     */
    trimHistory(limit) {
        if (this.globalPoints.history && this.globalPoints.history.length > limit) {
            this.globalPoints.history = this.globalPoints.history.slice(0, limit);
            this.savePointsData();
        }
    }

    /**
     * Levenshtein-Distanz für Tippfehler-Toleranz
     */
    levenshteinDistance(a, b) {
        const matrix = [];
        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        return matrix[b.length][a.length];
    }

    /**
     * Normalisierung und Fuzzy-Matching für Antwort-Prüfung
     */
    checkAnswer(userAnswer, question) {
        const normalize = (str) => str.trim().toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue');
        const userNorm = normalize(userAnswer);
        const correctNorm = normalize(question.answer);
        const correctEnNorm = normalize(question.capitalEn || '');
        const correctNativeNorm = normalize(question.capitalNative || '');

        // Exakte Treffer in alle 3 Sprachen
        if (userNorm === correctNorm || userNorm === correctEnNorm || userNorm === correctNativeNorm) {
            return true;
        }

        // Tippfehler-Toleranz: max 2 Zeichen Abweichung (bis 20% der Länge)
        if (this.typoTolerance) {
            const maxDist = Math.max(2, Math.ceil(Math.max(correctNorm.length, userNorm.length) * 0.2));
            const dist1 = this.levenshteinDistance(userNorm, correctNorm);
            const dist2 = this.levenshteinDistance(userNorm, correctEnNorm);
            const dist3 = this.levenshteinDistance(userNorm, correctNativeNorm);
            const minDist = Math.min(dist1, dist2, dist3);
            if (minDist <= maxDist) {
                return true;
            }
        }

        return false;
    }

    loadTheme() {
        const theme = localStorage.getItem('theme') || 'light';
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        }
    }

    /**
     * Spiel auswählen
     */
    selectGame(game) {
        this.currentGame = game;
        
        // Toggle "kombiniert" Button für Capitals
        const combinedBtn = document.getElementById('combinedBtn');
        if (game === 'capitals' || game === 'world-capitals') {
            combinedBtn.style.display = 'block';
        } else {
            combinedBtn.style.display = 'none';
        }
        
        if (game === 'capitals') {
            // Für Hauptstädte: zeige Inline-Modus-Auswahl (Modal bleibt als Fallback)
            this.showCapitalModeInline();
        } else if (game === 'world-capitals') {
            // Internationaler Modus: direkt Schwierigkeitsgrad anzeigen
            document.getElementById('gameSelectionSection').style.display = 'none';
            document.getElementById('difficultySection').style.display = 'block';
            document.getElementById('startGameSection').classList.remove('active');
        } else {
            // Für andere Spiele: zeige direkt Schwierigkeitsgrad
            document.getElementById('gameSelectionSection').style.display = 'none';
            document.getElementById('difficultySection').style.display = 'block';
            document.getElementById('startGameSection').classList.remove('active');
        }
        window.scrollTo(0, 0);
    }

    /**
     * Zeigt eine Inline-Auswahl für Hauptstädte im Difficulty-Abschnitt
     */
    showCapitalModeInline() {
        // Schrittweiser Auswahl-Dialog für Capitals
        const startScreen = document.getElementById('startScreen');
        document.getElementById('gameSelectionSection').style.display = 'none';

        // Entferne alte Inline-Selection falls vorhanden
        const old = document.getElementById('capitalModeInline');
        if (old) old.remove();

        const container = document.createElement('div');
        container.id = 'capitalModeInline';
        container.className = 'capital-inline-modal';
        container.innerHTML = `
            <div class="capital-card">
                <h3>Hauptstädte-Modus</h3>
                <p class="capital-instruction">Wähle, welche Art von Hauptstädten du spielen möchtest. Danach wähle den Schwierigkeitsgrad.</p>
                <div class="capital-options">
                    <button class="capital-option" data-capital-mode="federal">
                        <strong>Bundesländer</strong>
                        <span class="capital-sub">Nur die 9 Landeshauptstädte</span>
                    </button>
                    <button class="capital-option" data-capital-mode="district">
                        <strong>Bezirke</strong>
                        <span class="capital-sub">Größere Bezirks-/Stadt-Hauptstädte</span>
                    </button>
                    <button class="capital-option" data-capital-mode="all">
                        <strong>Gemischt</strong>
                        <span class="capital-sub">Beides kombiniert</span>
                    </button>
                </div>
                <div class="capital-actions">
                    <button id="capitalModeBack" class="back-btn">Abbrechen</button>
                    <button id="capitalModeNext" class="start-btn" disabled>Weiter</button>
                </div>
            </div>
        `;

        startScreen.prepend(container);

        const options = container.querySelectorAll('.capital-option');
        const nextBtn = container.querySelector('#capitalModeNext');
        const backBtn = container.querySelector('#capitalModeBack');

        options.forEach(opt => {
            opt.addEventListener('click', (e) => {
                options.forEach(o => o.classList.remove('selected'));
                e.currentTarget.classList.add('selected');
                this.capitalMode = e.currentTarget.dataset.capitalMode;
                nextBtn.disabled = false;
                // Update instruction text
                const desc = container.querySelector('.capital-instruction');
                if (this.capitalMode === 'federal') desc.textContent = 'Bundeslands-Hauptstädte: 9 einfache Fragen.';
                else if (this.capitalMode === 'district') desc.textContent = 'Bezirks-Hauptstädte: größere Auswahl an Städten.';
                else desc.textContent = 'Gemischt: Kombination aus beidem.';
            });
            opt.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') opt.click();
            });
        });

        backBtn.addEventListener('click', () => {
            container.remove();
            document.getElementById('gameSelectionSection').style.display = 'block';
        });

        nextBtn.addEventListener('click', () => {
            // Entferne Modal und zeige Difficulty
            container.remove();
            document.getElementById('difficultySection').style.display = 'block';
            // Stelle sicher, dass Start-Button erst nach Difficulty-Auswahl erscheint
            document.getElementById('startGameSection').classList.remove('active');
            window.scrollTo(0, document.getElementById('difficultySection').offsetTop - 20);
        });
    }

    /**
     * Capital Mode Selection (Bundes- vs. Bezirks-Hauptstädte)
     */
    showCapitalModeSelection() {
        // Entferne alte Modal/Overlay wenn es existiert
        let modeModal = document.getElementById('capitalModeModal');
        if (modeModal) modeModal.remove();

        // Erstelle neuen Modal
        modeModal = document.createElement('div');
        modeModal.id = 'capitalModeModal';
        modeModal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;';
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = 'background: var(--bg-primary); padding: 2rem; border-radius: 12px; max-width: 500px; width: 90%; box-shadow: var(--shadow-hover);';
        modalContent.innerHTML = `
            <h3 style="margin-bottom: 1.5rem; text-align: center;">Hauptstädte-Auswahl</h3>
            <div style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
                <button class="difficulty-btn" style="width: 100%; padding: 1.2rem;" data-capital-mode="federal">
                    <i class="fas fa-flag"></i>
                    <span>Bundeslands-Hauptstädte<br><small>9 Bundesländer</small></span>
                </button>
                <button class="difficulty-btn" style="width: 100%; padding: 1.2rem;" data-capital-mode="district">
                    <i class="fas fa-city"></i>
                    <span>Bezirks-Hauptstädte<br><small>Größere Städte</small></span>
                </button>
                <button class="difficulty-btn" style="width: 100%; padding: 1.2rem;" data-capital-mode="all">
                    <i class="fas fa-globe"></i>
                    <span>Gemischt<br><small>Beides kombiniert</small></span>
                </button>
            </div>
        `;
        
        modeModal.appendChild(modalContent);
        document.body.appendChild(modeModal);

        // Event Listener
        modalContent.querySelectorAll('[data-capital-mode]').forEach(btn => {
            btn.addEventListener('click', () => {
                this.capitalMode = btn.dataset.capitalMode;
                modeModal.remove();
                document.getElementById('difficultySection').style.display = 'block';
                document.querySelector('.start-game-section').classList.remove('active');
                window.scrollTo(0, 0);
            });
        });
    }

    /**
     * Schwierigkeitsgrad auswählen
     */
    selectDifficulty(difficulty) {
        this.currentDifficulty = difficulty;
        // Zeige den "Spiel starten" Button
        document.getElementById('startGameSection').classList.add('active');
        window.scrollTo(0, document.getElementById('startGameSection').offsetTop - 50);
    }

    /**
     * Spiel tatsächlich starten
     */
    startGame() {
        this.score = 0;
        this.totalPossiblePoints = 0;
        this.currentQuestionIndex = 0;
        this.hintUsed = false;
        this.timerBonus = 0;
        
        // Timer-Einstellungen neu laden
        this.timerEnabled = localStorage.getItem('timerEnabled') === 'true';
        this.timerDuration = parseInt(localStorage.getItem('timerDuration') || '30');
        this.timerVisual = localStorage.getItem('timerVisual') !== 'false';
        
        this.generateQuestions();
        this.loadNextQuestion();
        this.switchScreen('gameScreen');
        window.scrollTo(0, 0);
    }

    /**
     * Spiel neustarten (mit gleichen Einstellungen)
     */
    restartGame() {
        // Timer stoppen vor dem Neustart
        this.stopTimer();
        this.startGame();
    }

    /**
     * Fragen generieren
     */
    generateQuestions() {
        this.questions = [];

        switch (this.currentGame) {
            case 'license-plates':
                this.generateLicensePlateQuestions();
                break;
            case 'capitals':
            case 'world-capitals':
                this.generateCapitalQuestions();
                break;
            case 'population':
                this.generatePopulationQuestions();
                break;
        }
    }

    /**
     * Kennzeichen-Fragen generieren
     */
    generateLicensePlateQuestions() {
        const shuffled = [...districtData].sort(() => 0.5 - Math.random()).slice(0, 15);

        shuffled.forEach(district => {
            this.questions.push({
                type: 'license-plates',
                question: `Welcher Bezirk/Bundesland hat das Kennzeichen "${district.code}"?`,
                answer: district.name,
                state: district.state,
                code: district.code,
            });
        });
    }

    /**
     * Hauptstädte-Fragen generieren
     */
    generateCapitalQuestions() {
        let dataToUse = [];

        if (this.currentGame === 'world-capitals' && typeof worldCapitals !== 'undefined') {
            // Internationale Hauptstädte
            dataToUse = worldCapitals.map(w => ({ 
                state: `${w.emoji} ${w.country}`, 
                capital: w.capital, 
                capitalEn: w.capitalEn,
                capitalNative: w.capitalNative,
                country: w.country, 
                emoji: w.emoji 
            }));
        } else {
            if (this.capitalMode === 'federal') {
                dataToUse = [...capitalsData];
            } else if (this.capitalMode === 'district') {
                dataToUse = districtCapitals.map(d => ({ state: d.district, capital: d.city }));
            } else {
                dataToUse = [...capitalsData, ...districtCapitals.map(d => ({ state: d.district, capital: d.city }))];
            }
        }

        const shuffled = dataToUse.sort(() => 0.5 - Math.random()).slice(0, 15);

        shuffled.forEach(item => {
            // Multiple-Choice-Optionen immer erstellen (für nationale und internationale Modi)
            const options = [item.capital];
            let allCities = [];
            
            if (this.currentGame === 'world-capitals' && typeof worldCapitals !== 'undefined') {
                allCities = worldCapitals.map(w => w.capital).filter(c => c !== item.capital);
            } else if (this.capitalMode === 'federal') {
                allCities = capitalsData.map(c => c.capital).filter(c => c !== item.capital);
            } else if (this.capitalMode === 'district') {
                allCities = districtCapitals.map(d => d.city).filter(c => c !== item.capital);
            } else {
                // Combined mode (federal + district)
                allCities = [
                    ...capitalsData.map(c => c.capital),
                    ...districtCapitals.map(d => d.city)
                ].filter(c => c !== item.capital);
            }

            // Mische und nimm bis zu 3 weitere Optionen
            const shuffledCities = allCities.sort(() => 0.5 - Math.random());
            for (let i = 0; i < shuffledCities.length && options.length < 4; i++) {
                if (!options.includes(shuffledCities[i])) {
                    options.push(shuffledCities[i]);
                }
            }

            this.questions.push({
                type: 'capitals',
                question: `Was ist die Hauptstadt von ${item.state}?`,
                answer: item.capital,
                capitalEn: item.capitalEn || item.capital,
                capitalNative: item.capitalNative || item.capital,
                options: options.sort(() => 0.5 - Math.random()),
                state: item.state,
            });
        });
    }

    /**
     * Einwohner-Vergleich-Fragen generieren
     */
    generatePopulationQuestions() {
        const shuffled = [...populationData].sort(() => 0.5 - Math.random()).slice(0, 10);

        shuffled.forEach(item => {
            const otherCities = populationData.filter(c => c.city !== item.city);
            const wrongCity = otherCities[Math.floor(Math.random() * otherCities.length)];

            this.questions.push({
                type: 'population',
                question: `Welche Stadt hat mehr Einwohner?`,
                city1: item.city,
                city2: wrongCity.city,
                answer: item.population > wrongCity.population ? item.city : wrongCity.city,
                population1: item.population,
                population2: wrongCity.population,
            });
        });
    }

    /**
     * Nächste Frage laden
     */
    loadNextQuestion() {
        // Reset Tipps für neue Frage
        this.hintsUsedThisQuestion = 0;
        this.usedHintTypes = [];
        this.timerBonus = 0; // Timer-Bonus für neue Frage zurücksetzen
        
        // Reset Tipp-Button und Dropdown
        const hintCount = document.getElementById('hintCount');
        
        let countText = `(${this.maxHints} verfügbar`;
        if (this.paidHints) {
            countText += `, ${this.hintCost}P`;
        }
        countText += ')';
        hintCount.textContent = countText;
        
        // Reset alle Tipp-Buttons
        document.querySelectorAll('.hint-btn-compact').forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('used');
        });
        
        if (this.currentQuestionIndex >= this.questions.length) {
            this.endGame();
            return;
        }

        this.currentQuestion = this.questions[this.currentQuestionIndex];
        this.gameActive = true;

        document.getElementById('feedbackArea').classList.add('feedback-hidden');
        document.getElementById('feedbackContent').innerHTML = '';
        document.getElementById('answerArea').innerHTML = '';

        this.renderQuestion();
        this.renderAnswerArea();
        this.updateAvailableHints();
        
        // Timer starten wenn aktiviert
        this.startTimer();
        
        window.scrollTo(0, 0);
    }

    /**
     * Frage rendern
     */
    renderQuestion() {
        const content = document.getElementById('questionContent');
        content.innerHTML = '';

        let html = `<h3>${this.currentQuestion.question}</h3>`;

        if (this.currentQuestion.type === 'license-plates') {
            html += this.renderLicensePlate(this.currentQuestion.code);
        } else if (this.currentQuestion.type === 'population') {
            html += `<p style="font-size: 1.2rem; margin-top: 1.5rem;">
                <strong>${this.currentQuestion.city1}</strong> vs <strong>${this.currentQuestion.city2}</strong>
            </p>`;
        }

        content.innerHTML = html;
    }

    /**
     * Kennzeichen rendern - zeigt nur den Bezirkscode
     */
    renderLicensePlate(code) {
        return `
            <div class="license-plate">
                <div class="plate-eu">AT</div>
                <div class="plate-content">${code}</div>
            </div>
        `;
    }

    /**
     * Antwortbereich rendern
     */
    renderAnswerArea() {
        const area = document.getElementById('answerArea');
        area.innerHTML = '';

        // Population-Fragen: immer 2 Städte als Buttons
        if (this.currentQuestion.type === 'population') {
            this.renderPopulationChoice(area);
            return;
        }

        // Für Capitals: Quiz-Modus oder Kombiniert/Profi
        if (this.currentQuestion.type === 'capitals') {
            if (this.currentDifficulty === 'quiz') {
                // Quiz-Modus: immer Multiple Choice
                this.renderMultipleChoice(area);
            } else if (this.currentDifficulty === 'kombiniert') {
                // Kombiniert: Eingabe + Button zum Anzeigen der Optionen
                this.renderCombinedMode(area);
            } else {
                // Profi-Modus: nur Eingabefeld
                this.renderTextInput(area);
            }
        } else if (this.currentDifficulty === 'quiz') {
            // Andere Spiele im Quiz-Modus: MC
            this.renderMultipleChoice(area);
        } else {
            // Andere Spiele im Profi-Modus: Textfeld
            this.renderTextInput(area);
        }
    }

    /**
     * Multiple-Choice Antwortoptionen rendern
     */
    renderMultipleChoice(area) {
        const options = this.currentQuestion.options || [
            this.currentQuestion.answer,
            ...this.getWrongAnswers(this.currentQuestion)
        ];

        const shuffledOptions = options.sort(() => 0.5 - Math.random());

        shuffledOptions.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            btn.textContent = option;
            btn.addEventListener('click', () => this.submitAnswer(option));
            area.appendChild(btn);
        });
    }

    /**
     * Population-Fragen: 2 Städte zur Auswahl
     */
    renderPopulationChoice(area) {
        const cities = [this.currentQuestion.city1, this.currentQuestion.city2];
        const shuffled = cities.sort(() => 0.5 - Math.random());

        shuffled.forEach(city => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            btn.textContent = city;
            btn.addEventListener('click', () => this.submitAnswer(city));
            area.appendChild(btn);
        });
    }

    /**
     * Textfeld Antwortmodus rendern
     */
    renderTextInput(area) {
        const container = document.createElement('div');
        container.className = 'text-input-container';

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Deine Antwort...';
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.submitAnswer(input.value);
            }
        });

        const btn = document.createElement('button');
        btn.textContent = 'Antwort';
        btn.addEventListener('click', () => this.submitAnswer(input.value));

        container.appendChild(input);
        container.appendChild(btn);
        area.appendChild(container);

        input.focus();
    }

    /**
     * Kombiniert-Modus: Eingabefeld + "Antworten anzeigen" Button
     */
    renderCombinedMode(area) {
        const container = document.createElement('div');
        container.className = 'combined-container';

        const inputSection = document.createElement('div');
        inputSection.className = 'text-input-container';
        inputSection.id = 'combinedInputSection';

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Deine Antwort...';
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.submitAnswer(input.value);
            }
        });

        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'Antwort';
        submitBtn.addEventListener('click', () => this.submitAnswer(input.value));

        const helpBtn = document.createElement('button');
        helpBtn.className = 'help-btn options-cost-btn';
        helpBtn.innerHTML = '<i class="fas fa-list-check"></i> 4 Möglichkeiten anzeigen <span class="cost-badge">-100 <i class="fas fa-coins"></i></span>';
        helpBtn.id = 'showOptionsBtn';
        helpBtn.addEventListener('click', () => {
            // Prüfe ob genug Punkte vorhanden sind
            const currentPoints = this.pointsManager.getTotalPoints();
            const optionsCost = 100;
            
            if (currentPoints < optionsCost) {
                this.showFeedback('Nicht genug Punkte! Du benötigst 100 Punkte, um die Optionen anzuzeigen.', false);
                return;
            }
            
            // Punkte abziehen
            this.pointsManager.updatePoints(-optionsCost, 'Optionen anzeigen (Kombi-Modus)');
            
            // Zeige Optionen und verstecke Eingabefeld
            inputSection.style.display = 'none';
            optionsSection.style.display = 'block';
            this.renderMultipleChoice(optionsSection);
            
            // Feedback über Punkteabzug
            this.showFeedback(`${optionsCost} Punkte abgezogen. Wähle eine der 4 Optionen.`, true);
        });

        inputSection.appendChild(input);
        inputSection.appendChild(submitBtn);
        inputSection.appendChild(helpBtn);
        container.appendChild(inputSection);

        const optionsSection = document.createElement('div');
        optionsSection.className = 'options-container';
        optionsSection.id = 'combinedOptionsSection';
        optionsSection.style.display = 'none';
        container.appendChild(optionsSection);

        area.appendChild(container);
        input.focus();
    }

    /**
     * Falsche Antworten generieren
     */
    getWrongAnswers(question) {
        if (question.type === 'license-plates') {
            const correctAnswer = question.answer;
            const correctCode = question.code;
            const firstLetter = correctAnswer.charAt(0).toUpperCase();
            
            // Nur Bezirke aus districtData verwenden (alle haben gültige Kennzeichen)
            // Filtere die richtige Antwort raus (nach Code UND Name)
            const availableDistricts = districtData.filter(d => 
                d.code !== correctCode && d.name !== correctAnswer
            );
            
            // Zuerst Bezirke mit gleichem Anfangsbuchstaben suchen
            const sameLetterDistricts = availableDistricts
                .filter(d => d.name.charAt(0).toUpperCase() === firstLetter)
                .sort(() => 0.5 - Math.random());
            
            // Dann andere Bezirke als Fallback
            const otherDistricts = availableDistricts
                .filter(d => d.name.charAt(0).toUpperCase() !== firstLetter)
                .sort(() => 0.5 - Math.random());
            
            // Bevorzugt gleiche Anfangsbuchstaben, Rest auffüllen
            const wrongAnswers = [];
            
            // Zuerst mit gleichem Anfangsbuchstaben nehmen (max 3)
            for (let i = 0; i < Math.min(3, sameLetterDistricts.length); i++) {
                wrongAnswers.push(sameLetterDistricts[i].name);
            }
            
            // Falls nicht genug, mit anderen auffüllen
            let otherIndex = 0;
            while (wrongAnswers.length < 3 && otherIndex < otherDistricts.length) {
                wrongAnswers.push(otherDistricts[otherIndex].name);
                otherIndex++;
            }
            
            return wrongAnswers;
        }

        return [];
    }

    /**
     * Antwort prüfen
     */
    submitAnswer(userAnswer) {
        if (!this.gameActive) return;
        this.gameActive = false;
        
        // Timer stoppen und Bonus berechnen
        this.stopTimer();
        this.timerBonus = this.calculateTimerBonus();

        // Nutze neue Prüfmethode für Multi-Language + Tippfehler-Toleranz
        const isCorrect = this.checkAnswer(userAnswer, this.currentQuestion);

        // Markiere Buttons mit Feedback
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
            const btnText = btn.textContent.trim().toLowerCase();
            const correctText = this.currentQuestion.answer.toLowerCase();
            
            if (btnText === correctText) {
                btn.classList.add('correct');
            } else if (btnText === userAnswer.trim().toLowerCase() && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });

        // Dynamisches Punktesystem
        let earnedPoints = 0;
        if (isCorrect) {
            // Punkte basierend auf verwendeten Tipps berechnen
            let baseEarned = Math.max(10, this.basePoints - (this.hintsUsedThisQuestion * this.hintPenalty));
            // Timer-Bonus hinzufügen wenn Timer aktiviert
            earnedPoints = baseEarned + this.timerBonus;
            this.score += earnedPoints;
            // Füge Punkte zum globalen Konto hinzu mit Frage-Daten
            this.addGlobalPoints(earnedPoints, {
                question: this.currentQuestion.question,
                answer: this.currentQuestion.answer,
                userAnswer: userAnswer,
                isCorrect: true,
                timerBonus: this.timerBonus
            });
        } else {
            // Auch falsche Antworten in Historie aufnehmen (0 Punkte)
            this.addGlobalPoints(0, {
                question: this.currentQuestion.question,
                answer: this.currentQuestion.answer,
                userAnswer: userAnswer,
                isCorrect: false
            });
        }
        this.totalPossiblePoints += this.basePoints;
        
        // Aktualisiere Statistik
        this.updateStats(isCorrect);

        this.showFeedback(isCorrect, earnedPoints);
        document.getElementById('scoreValue').textContent = this.score;

        this.currentQuestionIndex++;
    }

    /**
     * Feedback anzeigen
     */
    showFeedback(isCorrect, earnedPoints = 0) {
        const feedbackArea = document.getElementById('feedbackArea');
        const feedbackContent = document.getElementById('feedbackContent');
        feedbackArea.classList.remove('feedback-hidden');

        let html = '';

        if (isCorrect) {
            let pointsInfo = `+${earnedPoints} Punkte`;
            let extraInfo = [];
            if (this.hintsUsedThisQuestion > 0) {
                extraInfo.push(`${this.hintsUsedThisQuestion} Tipp${this.hintsUsedThisQuestion > 1 ? 's' : ''} verwendet`);
            }
            if (this.timerBonus > 0) {
                extraInfo.push(`+${this.timerBonus} Zeitbonus`);
            }
            if (extraInfo.length > 0) {
                pointsInfo += ` <small>(${extraInfo.join(', ')})</small>`;
            }
            html += `<div class="feedback-correct"><i class="fas fa-check-circle"></i> Richtig! ${pointsInfo}</div>`;
        } else {
            html += '<div class="feedback-incorrect"><i class="fas fa-times-circle"></i> Falsch! +0 Punkte</div>';
        }

        html += `<div class="feedback-answer"><strong>Antwort:</strong> ${this.currentQuestion.answer}</div>`;

        // Spezielle Anzeige für Population-Fragen
        if (this.currentQuestion.type === 'population') {
            html += this.renderPopulationComparison(isCorrect);
        }

        feedbackContent.innerHTML = html;

        window.scrollTo(0, feedbackArea.offsetTop);
    }

    /**
     * Grafischer Vergleich für Population-Fragen
     */
    renderPopulationComparison(isCorrect) {
        const city1 = this.currentQuestion.city1;
        const city2 = this.currentQuestion.city2;
        const pop1 = this.currentQuestion.population1;
        const pop2 = this.currentQuestion.population2;
        const maxPop = Math.max(pop1, pop2);
        const percentage1 = (pop1 / maxPop) * 100;
        const percentage2 = (pop2 / maxPop) * 100;
        
        const isCity1Winner = pop1 > pop2;
        
        return `
            <div class="population-comparison">
                <h4 class="comparison-title">
                    <i class="fas fa-chart-bar"></i>
                    Einwohner-Vergleich
                </h4>
                
                <div class="comparison-items">
                    <div class="comparison-item ${isCity1Winner ? 'winner' : ''}">
                        <div class="comparison-header">
                            <span class="city-name">${city1}</span>
                            ${isCity1Winner ? '<i class="fas fa-crown winner-icon"></i>' : ''}
                        </div>
                        <div class="comparison-bar-container">
                            <div class="comparison-bar" style="width: ${percentage1}%">
                                <span class="bar-label">${pop1.toLocaleString('de-AT')}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="comparison-item ${!isCity1Winner ? 'winner' : ''}">
                        <div class="comparison-header">
                            <span class="city-name">${city2}</span>
                            ${!isCity1Winner ? '<i class="fas fa-crown winner-icon"></i>' : ''}
                        </div>
                        <div class="comparison-bar-container">
                            <div class="comparison-bar" style="width: ${percentage2}%">
                                <span class="bar-label">${pop2.toLocaleString('de-AT')}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="comparison-stats">
                    <div class="stat-item">
                        <i class="fas fa-users"></i>
                        <span>Differenz: <strong>${Math.abs(pop1 - pop2).toLocaleString('de-AT')}</strong> Einwohner</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-percentage"></i>
                        <span>${isCity1Winner ? city1 : city2} ist <strong>${((maxPop / Math.min(pop1, pop2)) - 1).toFixed(1)}x</strong> größer</span>
                    </div>
                </div>
                
                <div class="comparison-note">
                    <i class="fas fa-info-circle"></i>
                    Einwohnerzahlen basieren auf den letzten verfügbaren Daten
                </div>
            </div>
        `;
    }

    /**
     * Tipp verwenden
     */
    useHint(hintType) {
        if (this.hintsUsedThisQuestion >= this.maxHints) {
            alert('Du hast bereits alle Tipps für diese Frage verwendet!');
            return;
        }

        // Prüfe ob dieser Tipp-Typ für diese Frage verfügbar ist
        if (!this.isHintAvailable(hintType)) {
            alert('Dieser Tipp ist für diese Frage nicht verfügbar!');
            return;
        }

        // Prüfe ob Tipps kostenpflichtig sind
        if (this.paidHints) {
            const hintPrice = this.hintPrices[hintType] || 20;
            if (this.globalPoints.totalPoints < hintPrice) {
                alert(`Du hast nicht genug Punkte! (Benötigt: ${hintPrice}P, Vorhanden: ${this.globalPoints.totalPoints}P)`);
                return;
            }
            this.spendGlobalPoints(hintPrice, hintType);
        }

        this.hintsUsedThisQuestion++;
        this.incrementHintsUsed();
        
        // Markiere diesen Tipp als verwendet
        this.usedHintTypes = this.usedHintTypes || [];
        this.usedHintTypes.push(hintType);
        
        // Deaktiviere den verwendeten Tipp-Button
        const hintOption = document.querySelector(`[data-hint="${hintType}"]`);
        if (hintOption) {
            hintOption.disabled = true;
        }

        // Führe den Tipp aus
        this.executeHint(hintType);
        
        // Update Tipp-Anzeige
        this.updateHintDisplay();
    }

    /**
     * Prüft ob ein Tipp-Typ für die aktuelle Frage verfügbar ist
     */
    isHintAvailable(hintType) {
        const q = this.currentQuestion;
        const isQuizMode = this.currentDifficulty === 'quiz';
        const isInputMode = this.currentDifficulty === 'profi' || this.currentDifficulty === 'kombiniert';
        
        // Bereits verwendete Tipps
        if (this.usedHintTypes && this.usedHintTypes.includes(hintType)) {
            return false;
        }

        switch (hintType) {
            case '5050':
            case 'removeOne':
                // Nur bei Multiple Choice (Quiz-Modus) oder Population
                return isQuizMode || q.type === 'population';
            case 'firstLetter':
                // Immer verfügbar
                return true;
            case 'randomLetter':
            case 'length':
                // Nur bei Eingabe-Modus
                return isInputMode || q.type === 'population' === false;
            case 'coat':
                // Nur bei Kennzeichen oder Hauptstädten mit verfügbarem Wappen
                // Prüfe dynamisch ob Wappen verfügbar ist
                if (!q.state) return false;
                if (q.type !== 'license-plates' && q.type !== 'capitals') return false;
                
                // Prüfe ob Wappen vorhanden (statisch oder dynamisch)
                let hasCoat = !!stateCoats[q.state];
                if (!hasCoat && typeof coatsOfArmsHelpers !== 'undefined') {
                    const coatData = coatsOfArmsHelpers.findByName(q.state);
                    hasCoat = coatData && coatData.wappen;
                }
                return hasCoat;
            default:
                return false;
        }
    }

    /**
     * Führt den Tipp aus
     */
    executeHint(hintType) {
        const q = this.currentQuestion;
        const feedbackContent = document.getElementById('feedbackContent');
        let hintText = '';

        switch (hintType) {
            case '5050':
                this.execute5050Hint();
                hintText = '50/50: Zwei falsche Antworten wurden entfernt.';
                break;
            case 'removeOne':
                this.executeRemoveOneHint();
                hintText = 'Eine falsche Antwort wurde entfernt.';
                break;
            case 'firstLetter':
                hintText = `Anfangsbuchstabe: Die Antwort beginnt mit "<strong>${q.answer.charAt(0)}</strong>".`;
                break;
            case 'randomLetter':
                const randomIndex = Math.floor(Math.random() * q.answer.length);
                const letter = q.answer.charAt(randomIndex);
                hintText = `Zufälliger Buchstabe: Position ${randomIndex + 1} ist "<strong>${letter}</strong>".`;
                break;
            case 'length':
                hintText = `Länge: Die Antwort hat <strong>${q.answer.length}</strong> Buchstaben.`;
                break;
            case 'coat':
                // Wappen dynamisch aus coatsOfArmsHelpers holen
                let coat = stateCoats[q.state] || '';
                if (!coat && typeof coatsOfArmsHelpers !== 'undefined') {
                    const coatData = coatsOfArmsHelpers.findByName(q.state);
                    if (coatData && coatData.wappen) {
                        coat = Array.isArray(coatData.wappen) ? coatData.wappen[0] : coatData.wappen;
                    }
                }
                if (coat) {
                    hintText = `Wappen: <div style="margin: 0.5rem 0;"><img src="${coat}" alt="Wappen ${q.state}" class="coat-display" onerror="this.style.display='none'"></div><strong>${q.state}</strong>`;
                } else {
                    hintText = `Bundesland: <strong>${q.state}</strong>`;
                }
                break;
        }

        // Berechne aktuelle mögliche Punkte
        const currentPossiblePoints = Math.max(10, this.basePoints - (this.hintsUsedThisQuestion * this.hintPenalty));

        const hintHtml = `
            <div class="feedback-hint">
                <i class="fas fa-info-circle"></i> <strong>Tipp ${this.hintsUsedThisQuestion}:</strong> ${hintText}
            </div>
            <div class="hint-points-info" style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.3rem;">
                <i class="fas fa-coins"></i> Mögliche Punkte: ${currentPossiblePoints}
            </div>
        `;

        feedbackContent.innerHTML += hintHtml;
        document.getElementById('feedbackArea').classList.remove('feedback-hidden');
    }

    /**
     * 50/50 Tipp: Entfernt 2 falsche Antworten
     */
    execute5050Hint() {
        const answerBtns = document.querySelectorAll('.answer-btn:not(.removed)');
        const correctAnswer = this.currentQuestion.answer.toLowerCase();
        const wrongBtns = Array.from(answerBtns).filter(btn => 
            btn.textContent.trim().toLowerCase() !== correctAnswer
        );
        
        // Entferne 2 zufällige falsche Antworten
        const shuffled = wrongBtns.sort(() => 0.5 - Math.random());
        const toRemove = shuffled.slice(0, Math.min(2, shuffled.length));
        
        toRemove.forEach(btn => {
            btn.classList.add('removed');
            btn.disabled = true;
            btn.style.opacity = '0.3';
            btn.style.textDecoration = 'line-through';
        });
    }

    /**
     * Eine weg Tipp: Entfernt 1 falsche Antwort
     */
    executeRemoveOneHint() {
        const answerBtns = document.querySelectorAll('.answer-btn:not(.removed)');
        const correctAnswer = this.currentQuestion.answer.toLowerCase();
        const wrongBtns = Array.from(answerBtns).filter(btn => 
            btn.textContent.trim().toLowerCase() !== correctAnswer
        );
        
        if (wrongBtns.length > 0) {
            const randomWrong = wrongBtns[Math.floor(Math.random() * wrongBtns.length)];
            randomWrong.classList.add('removed');
            randomWrong.disabled = true;
            randomWrong.style.opacity = '0.3';
            randomWrong.style.textDecoration = 'line-through';
        }
    }

    /**
     * Aktualisiert die Tipp-Anzeige
     */
    updateHintDisplay() {
        const remainingHints = this.maxHints - this.hintsUsedThisQuestion;
        const hintCount = document.getElementById('hintCount');
        
        if (remainingHints > 0) {
            let text = `(${remainingHints} übrig`;
            if (this.paidHints) {
                text += `, ${this.hintCost}P`;
            }
            text += ')';
            hintCount.textContent = text;
        } else {
            hintCount.textContent = '(keine mehr)';
        }

        // Aktualisiere verfügbare Tipp-Optionen
        this.updateAvailableHints();
    }

    /**
     * Aktualisiert welche Tipps verfügbar sind
     */
    updateAvailableHints() {
        // Update floating balance
        this.updateFloatingBalance();
        
        document.querySelectorAll('.hint-btn-compact').forEach(btn => {
            const hintType = btn.dataset.hint;
            const hintPrice = this.hintPrices[hintType] || 20;
            
            // Preis-Anzeige aktualisieren
            const priceSpan = btn.querySelector('.hint-price');
            if (priceSpan && this.paidHints) {
                priceSpan.textContent = `${hintPrice}P`;
                priceSpan.style.display = 'inline-block';
            } else if (priceSpan) {
                priceSpan.style.display = 'none';
            }
            
            // Deaktivieren und als "used" markieren wenn bereits verwendet
            if (this.usedHintTypes && this.usedHintTypes.includes(hintType)) {
                btn.disabled = true;
                btn.classList.add('used');
                btn.style.display = '';
                return;
            }
            
            // Prüfe ob verfügbar für diesen Modus
            const isAvailable = this.isHintAvailable(hintType);
            if (!isAvailable) {
                // Nicht verfügbare Tipps ausblenden
                btn.style.display = 'none';
            } else {
                // Verfügbare Tipps anzeigen
                btn.style.display = '';
                btn.classList.remove('used');
                
                // Bei kostenpflichtigen Tipps: Prüfen ob genug Punkte vorhanden
                if (this.paidHints && this.globalPoints.totalPoints < hintPrice) {
                    btn.disabled = true;
                    btn.classList.add('unaffordable');
                } else {
                    btn.disabled = false;
                    btn.classList.remove('unaffordable');
                }
            }
        });
    }

    /**
     * Spiel beenden
     */
    endGame() {
        // Timer stoppen
        this.stopTimer();
        this.showTimerDisplay(false);
        
        // Spiel-Statistik aktualisieren
        this.incrementGamesPlayed();
        
        const finalScore = this.score;
        const maxScore = this.totalPossiblePoints;
        const totalQuestions = this.currentQuestionIndex;
        const percentage = maxScore > 0 ? Math.round((finalScore / maxScore) * 100) : 0;

        let message = `
            <h3>Spiel beendet!</h3>
            <p><i class="fas fa-coins"></i> Punkte: <strong>${finalScore}</strong> von <strong>${maxScore}</strong> möglichen</p>
            <p><i class="fas fa-wallet"></i> Gesamte Punkte: <strong>${this.globalPoints.totalPoints}</strong></p>
            <p><i class="fas fa-percentage"></i> Erfolgsquote: <strong>${percentage}%</strong></p>
            <p><i class="fas fa-list"></i> Fragen: <strong>${totalQuestions}</strong></p>
        `;

        if (percentage >= 90) {
            message += '<p style="color: var(--success-color); font-size: 1.2rem;"><i class="fas fa-trophy"></i> Perfekt!</p>';
        } else if (percentage >= 70) {
            message += '<p style="color: var(--success-color); font-size: 1.2rem;"><i class="fas fa-star"></i> Ausgezeichnet!</p>';
        } else if (percentage >= 50) {
            message += '<p style="color: var(--info-color); font-size: 1.2rem;"><i class="fas fa-thumbs-up"></i> Gut gemacht!</p>';
        } else {
            message += '<p style="color: var(--warning-color); font-size: 1.2rem;"><i class="fas fa-smile"></i> Weiter so!</p>';
        }

        document.getElementById('feedbackContent').innerHTML = message;
        document.getElementById('feedbackArea').classList.remove('feedback-hidden');
        document.getElementById('nextBtn').innerHTML = '<i class="fas fa-home"></i> Zurück zum Start';
        document.getElementById('nextBtn').onclick = () => this.backToStart();
    }

    /**
     * Zurück zum Start
     */
    backToStart() {
        // Timer stoppen und ausblenden
        this.stopTimer();
        this.showTimerDisplay(false);
        
        this.switchScreen('startScreen');
        this.currentGame = null;
        this.currentDifficulty = null;
        this.capitalMode = 'all';
        document.getElementById('gameSelectionSection').style.display = 'block';
        document.getElementById('difficultySection').style.display = 'none';
        document.getElementById('startGameSection').classList.remove('active');
        document.getElementById('nextBtn').innerHTML = '<i class="fas fa-forward"></i> Nächste Frage';
        document.getElementById('nextBtn').onclick = () => this.loadNextQuestion();
        window.scrollTo(0, 0);
    }

    /**
     * Screen wechseln
     */
    switchScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }
}

// ============================================
// ANWENDUNG INITIALISIEREN
// ============================================

/**
 * Letzte Commit-Info anzeigen (Zeit + geänderte Datei)
 */
async function loadCommitTime() {
    const commitInfoEl = document.getElementById('commitInfo');
    
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        
        // Hole letzten Commit mit Datei-Informationen
        const response = await fetch(
            'https://api.github.com/repos/ochtii/Spielesammlung/commits?per_page=1',
            { signal: controller.signal }
        );
        clearTimeout(timeout);
        
        if (!response.ok) throw new Error('API Error');
        
        const data = await response.json();
        if (data.length > 0) {
            const commit = data[0];
            const commitDate = new Date(commit.commit.author.date);
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Europe/Vienna'
            };
            const formattedDate = new Intl.DateTimeFormat('de-AT', options).format(commitDate);
            
            // Hole Datei-Details vom Commit
            const commitDetailResponse = await fetch(
                `https://api.github.com/repos/ochtii/Spielesammlung/commits/${commit.sha}`,
                { signal: controller.signal }
            );
            
            let filesChanged = '';
            if (commitDetailResponse.ok) {
                const commitDetail = await commitDetailResponse.json();
                if (commitDetail.files && commitDetail.files.length > 0) {
                    const fileNames = commitDetail.files.map(f => f.filename).slice(0, 3);
                    filesChanged = fileNames.join(', ');
                    if (commitDetail.files.length > 3) {
                        filesChanged += ` (+${commitDetail.files.length - 3})`;
                    }
                }
            }
            
            let infoText = `<i class="fas fa-clock"></i> ${formattedDate}`;
            if (filesChanged) {
                infoText += ` <span class="footer-separator">|</span> <i class="fas fa-file-code"></i> ${filesChanged}`;
            }
            
            commitInfoEl.innerHTML = infoText;
            return;
        }
    } catch (error) {
        // API nicht erreichbar
        commitInfoEl.innerHTML = '<i class="fas fa-wifi"></i> Offline';
    }
}

// Punkteanzeige in Bottom Nav aktualisieren
function updateBottomNavPoints() {
    const pointsDisplay = document.getElementById('bottomNavPoints');
    if (pointsDisplay) {
        const globalPoints = parseInt(localStorage.getItem('globalPoints') || '0');
        pointsDisplay.textContent = globalPoints > 999 ? '999+' : globalPoints;
    }
}

// Bottom Nav Einstellungen anwenden
function applyBottomNavSettings() {
    const bottomNav = document.getElementById('bottomNav');
    if (!bottomNav) return;
    
    const enabled = localStorage.getItem('bottomNavEnabled') !== 'false';
    const fixed = localStorage.getItem('bottomNavFixed') !== 'false';
    const size = localStorage.getItem('bottomNavSize') || 'normal';
    const showHome = localStorage.getItem('bottomNavShowHome') !== 'false';
    const showPoints = localStorage.getItem('bottomNavShowPoints') !== 'false';
    const showHelp = localStorage.getItem('bottomNavShowHelp') !== 'false';
    const showFaq = localStorage.getItem('bottomNavShowFaq') === 'true';
    const showSettings = localStorage.getItem('bottomNavShowSettings') !== 'false';
    
    // Enabled/Disabled
    if (enabled) {
        bottomNav.style.display = '';
    } else {
        bottomNav.style.display = 'none';
    }
    
    // Fixed/Static
    bottomNav.classList.remove('position-static');
    if (!fixed) {
        bottomNav.classList.add('position-static');
    }
    
    // Größe
    bottomNav.classList.remove('size-small', 'size-normal', 'size-large');
    bottomNav.classList.add('size-' + size);
    
    // Items anzeigen/ausblenden
    const items = bottomNav.querySelectorAll('.bottom-nav-item');
    items.forEach(item => {
        const nav = item.getAttribute('data-nav');
        item.classList.remove('hidden');
        
        if (nav === 'home' && !showHome) item.classList.add('hidden');
        if (nav === 'points' && !showPoints) item.classList.add('hidden');
        if (nav === 'help' && !showHelp) item.classList.add('hidden');
        if (nav === 'faq' && !showFaq) item.classList.add('hidden');
        if (nav === 'settings' && !showSettings) item.classList.add('hidden');
    });
}

// Zoom Reset Funktion
function initZoomReset() {
    const zoomBtn = document.getElementById('zoomResetBtn');
    if (zoomBtn) {
        zoomBtn.addEventListener('click', () => {
            // Setze Viewport Zoom auf 100%
            const viewport = document.querySelector('meta[name="viewport"]');
            if (viewport) {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
                
                // Nach kurzer Zeit wieder normale Einstellung
                setTimeout(() => {
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
                }, 100);
            }
            
            // Visuelles Feedback
            zoomBtn.innerHTML = '<i class="fas fa-check"></i><span>Zurückgesetzt!</span>';
            setTimeout(() => {
                zoomBtn.innerHTML = '<i class="fas fa-search-minus"></i><span>Ansicht auf 100% zurücksetzen</span>';
            }, 2000);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AustriaQuiz();
    loadCommitTime();
    updateBottomNavPoints();
    applyBottomNavSettings();
    initZoomReset();
});
