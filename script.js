// ============================================
// ÖSTERREICH-QUIZ - SPIELDATEN
// ============================================

/**
 * Offizielle österreichische KFZ-Kennzeichen
 */
const districtData = [
    // Burgenland
    { code: 'B', name: 'Burgenland', state: 'Burgenland' },
    { code: 'BZ', name: 'Bruck an der Leitha', state: 'Burgenland' },
    { code: 'GS', name: 'Güssing', state: 'Burgenland' },
    { code: 'JE', name: 'Jennersdorf', state: 'Burgenland' },
    { code: 'MO', name: 'Mattersburg', state: 'Burgenland' },
    { code: 'OP', name: 'Oberpullendorf', state: 'Burgenland' },
    { code: 'OW', name: 'Oberwart', state: 'Burgenland' },
    
    // Kärnten
    { code: 'K', name: 'Klagenfurt-Land', state: 'Kärnten' },
    { code: 'KL', name: 'Klagenfurt-Stadt', state: 'Kärnten' },
    { code: 'VV', name: 'Villach-Land', state: 'Kärnten' },
    { code: 'VS', name: 'Villach-Stadt', state: 'Kärnten' },
    { code: 'SP', name: 'Spittal an der Drau', state: 'Kärnten' },
    { code: 'HE', name: 'Hermagor', state: 'Kärnten' },
    { code: 'F', name: 'Feldkirchen', state: 'Kärnten' },
    
    // Niederösterreich
    { code: 'N', name: 'Niederösterreich', state: 'Niederösterreich' },
    { code: 'AU', name: 'Amstetten', state: 'Niederösterreich' },
    { code: 'GD', name: 'Gmünd', state: 'Niederösterreich' },
    { code: 'GF', name: 'Gänserndorf', state: 'Niederösterreich' },
    { code: 'HO', name: 'Horn', state: 'Niederösterreich' },
    { code: 'KO', name: 'Korneuburg', state: 'Niederösterreich' },
    { code: 'KS', name: 'Krems-Land', state: 'Niederösterreich' },
    { code: 'MA', name: 'Melk', state: 'Niederösterreich' },
    { code: 'MI', name: 'Mistelbach', state: 'Niederösterreich' },
    { code: 'MZ', name: 'Mödling', state: 'Niederösterreich' },
    { code: 'TR', name: 'Traiskirchen', state: 'Niederösterreich' },
    { code: 'TL', name: 'Tulln', state: 'Niederösterreich' },
    { code: 'WZ', name: 'Wiener Neustadt', state: 'Niederösterreich' },
    { code: 'YB', name: 'Ybbs an der Donau', state: 'Niederösterreich' },
    { code: 'ZH', name: 'Zwettl', state: 'Niederösterreich' },
    
    // Oberösterreich
    { code: 'O', name: 'Oberösterreich', state: 'Oberösterreich' },
    { code: 'AM', name: 'Urfahr-Umgebung', state: 'Oberösterreich' },
    { code: 'BR', name: 'Braunau am Inn', state: 'Oberösterreich' },
    { code: 'EF', name: 'Eferding', state: 'Oberösterreich' },
    { code: 'FR', name: 'Freistadt', state: 'Oberösterreich' },
    { code: 'GD', name: 'Grieskirchen', state: 'Oberösterreich' },
    { code: 'GM', name: 'Gmunden', state: 'Oberösterreich' },
    { code: 'L', name: 'Linz-Stadt', state: 'Oberösterreich' },
    { code: 'PE', name: 'Perg', state: 'Oberösterreich' },
    { code: 'RI', name: 'Ried im Innkreis', state: 'Oberösterreich' },
    { code: 'RH', name: 'Rohrbach', state: 'Oberösterreich' },
    { code: 'ST', name: 'Steyr', state: 'Oberösterreich' },
    { code: 'SU', name: 'Scheibbs', state: 'Oberösterreich' },
    
    // Salzburg
    { code: 'S', name: 'Salzburg-Stadt', state: 'Salzburg' },
    { code: 'SL', name: 'Salzburg-Umgebung', state: 'Salzburg' },
    { code: 'HA', name: 'Hallein', state: 'Salzburg' },
    { code: 'SZ', name: 'Saalfelden-Leogang', state: 'Salzburg' },
    { code: 'TL', name: 'Tamsweg', state: 'Salzburg' },
    { code: 'ZE', name: 'Zell am See', state: 'Salzburg' },
    
    // Steiermark
    { code: 'G', name: 'Graz-Stadt', state: 'Steiermark' },
    { code: 'GU', name: 'Graz-Umgebung', state: 'Steiermark' },
    { code: 'DL', name: 'Deutschlandsberg', state: 'Steiermark' },
    { code: 'FB', name: 'Feldbach', state: 'Steiermark' },
    { code: 'FU', name: 'Fürstenfeld', state: 'Steiermark' },
    { code: 'HB', name: 'Hartberg-Fürstenfeld', state: 'Steiermark' },
    { code: 'JU', name: 'Judenburg', state: 'Steiermark' },
    { code: 'KF', name: 'Kapfenberg', state: 'Steiermark' },
    { code: 'KN', name: 'Knittelfeld', state: 'Steiermark' },
    { code: 'LB', name: 'Leibnitz', state: 'Steiermark' },
    { code: 'LE', name: 'Liezen', state: 'Steiermark' },
    { code: 'MU', name: 'Murau', state: 'Steiermark' },
    { code: 'VO', name: 'Voitsberg', state: 'Steiermark' },
    { code: 'WZ', name: 'Weiz', state: 'Steiermark' },
    
    // Tirol
    { code: 'I', name: 'Innsbruck-Stadt', state: 'Tirol' },
    { code: 'IU', name: 'Innsbruck-Land', state: 'Tirol' },
    { code: 'IB', name: 'Imst', state: 'Tirol' },
    { code: 'KB', name: 'Kufstein', state: 'Tirol' },
    { code: 'KI', name: 'Kitzbühel', state: 'Tirol' },
    { code: 'LL', name: 'Landeck', state: 'Tirol' },
    { code: 'RE', name: 'Reutte', state: 'Tirol' },
    { code: 'SB', name: 'Schwaz', state: 'Tirol' },
    
    // Vorarlberg
    { code: 'BL', name: 'Bludenz', state: 'Vorarlberg' },
    { code: 'BR', name: 'Bregenz', state: 'Vorarlberg' },
    { code: 'DO', name: 'Dornbirn', state: 'Vorarlberg' },
    { code: 'FK', name: 'Feldkirch', state: 'Vorarlberg' },
    { code: 'GO', name: 'Götzis', state: 'Vorarlberg' },
    { code: 'HE', name: 'Hohenems', state: 'Vorarlberg' },
    
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
 * Bundesländer-Wappen (Emojis als Fallback)
 */
const stateCoats = {
    'Burgenland': '🦅',
    'Kärnten': '🏰',
    'Niederösterreich': '🌾',
    'Oberösterreich': '🚜',
    'Salzburg': '🏰',
    'Steiermark': '🌿',
    'Tirol': '🏔️',
    'Vorarlberg': '🌊',
    'Wien': '🏛️'
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
        this.maxHints = 3; // Maximale Tipps pro Frage
        this.typoTolerance = localStorage.getItem('typoTolerance') !== 'false'; // Tippfehler-Toleranz aktivierbar
        this.paidHints = localStorage.getItem('paidHints') === 'true'; // Kostenpflichtige Tipps
        this.hintCost = 20; // Kosten pro Tipp in gesammelten Punkten
        
        // Punktesystem-Konstanten
        this.basePoints = 100; // Basispunkte ohne Tipp
        this.hintPenalty = 30; // Punktabzug pro Tipp
        
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
            hintsUsed: 0
        };
        this.globalPoints = data;
        this.updateMenuPointsDisplay();
    }

    /**
     * Globale Punkte-Daten in localStorage speichern
     */
    savePointsData() {
        localStorage.setItem('pointsData', JSON.stringify(this.globalPoints));
        this.updateMenuPointsDisplay();
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
    addGlobalPoints(points) {
        this.globalPoints.totalPoints += points;
        this.savePointsData();
    }

    /**
     * Globale Punkte ausgeben (für Tipps)
     */
    spendGlobalPoints(amount) {
        if (this.globalPoints.totalPoints >= amount) {
            this.globalPoints.totalPoints -= amount;
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

        // Settings Button
        const settingsBtn = document.getElementById('settingsBtn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.showSettings();
                // Close menu after clicking
                if (menuToggle && menuDropdown) {
                    menuToggle.classList.remove('active');
                    menuDropdown.classList.remove('show');
                }
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

        // Back Button
        document.getElementById('backBtn').addEventListener('click', () => {
            this.backToStart();
        });

        // Next Button
        document.getElementById('nextBtn').addEventListener('click', () => {
            this.loadNextQuestion();
        });

        // Hint Button
        document.getElementById('hintBtn').addEventListener('click', () => {
            this.showHint();
        });
    }

    /**
     * Settings Modal anzeigen
     */
    showSettings() {
        let modal = document.getElementById('settingsModal');
        if (modal) modal.remove();

        const isDarkMode = document.body.classList.contains('dark-mode');

        modal = document.createElement('div');
        modal.id = 'settingsModal';
        modal.className = 'settings-modal';

        const content = document.createElement('div');
        content.className = 'settings-content';
        content.innerHTML = `
            <div class="settings-header">
                <h3><i class="fas fa-cog"></i> Einstellungen</h3>
                <button class="settings-close-btn" id="settingsClose" type="button">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="settings-body">
                <div class="settings-section">
                    <h4><i class="fas fa-palette"></i> Darstellung</h4>
                    <div class="settings-option">
                        <div class="settings-option-info">
                            <span class="settings-option-label">Dark Mode</span>
                            <span class="settings-option-desc">Dunkles Farbschema aktivieren</span>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="darkModeCheck" ${isDarkMode ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                <div class="settings-section">
                    <h4><i class="fas fa-gamepad"></i> Spieloptionen</h4>
                    <div class="settings-option">
                        <div class="settings-option-info">
                            <span class="settings-option-label">Tippfehler akzeptieren</span>
                            <span class="settings-option-desc">Erlaubt kleine Abweichungen bei Antworten</span>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="typoToleranceCheck" ${this.typoTolerance ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    <div class="settings-option">
                        <div class="settings-option-info">
                            <span class="settings-option-label">Kostenpflichtige Tipps</span>
                            <span class="settings-option-desc">Tipps kosten ${this.hintCost} gesammelte Punkte</span>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="paidHintsCheck" ${this.paidHints ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>

            <div class="settings-footer">
                <button id="settingsSave" class="settings-save-btn" type="button">
                    <i class="fas fa-check"></i> Speichern
                </button>
            </div>
        `;

        modal.appendChild(content);
        document.body.appendChild(modal);

        // Event: Dark Mode Toggle (sofort anwenden)
        document.getElementById('darkModeCheck').addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
            this.updateThemeIcon();
        });

        // Event: Schließen
        document.getElementById('settingsClose').addEventListener('click', () => modal.remove());
        
        // Event: Außerhalb klicken schließt Modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        // Event: Speichern
        document.getElementById('settingsSave').addEventListener('click', () => {
            const darkMode = document.getElementById('darkModeCheck').checked;
            this.typoTolerance = document.getElementById('typoToleranceCheck').checked;
            this.paidHints = document.getElementById('paidHintsCheck').checked;
            
            localStorage.setItem('theme', darkMode ? 'dark' : 'light');
            localStorage.setItem('typoTolerance', this.typoTolerance);
            localStorage.setItem('paidHints', this.paidHints);
            
            modal.remove();
        });
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
    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        this.updateThemeIcon();
    }

    loadTheme() {
        const theme = localStorage.getItem('theme') || 'light';
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        }
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const icon = document.querySelector('#themeToggle i');
        const themeText = document.getElementById('themeText');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            if (themeText) themeText.textContent = 'Light Mode';
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            if (themeText) themeText.textContent = 'Dark Mode';
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
        this.currentQuestionIndex = 0;
        this.hintUsed = false;
        this.generateQuestions();
        this.loadNextQuestion();
        this.switchScreen('gameScreen');
        window.scrollTo(0, 0);
    }

    /**
     * Spiel neustarten (mit gleichen Einstellungen)
     */
    restartGame() {
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
                licensePlate: this.generateRandomPlate(district.code),
                answer: district.name,
                state: district.state,
                coat: stateCoats[district.state] || '',
                hint: `Das liegt im Bundesland ${district.state}.`,
                code: district.code,
            });
        });
    }

    /**
     * Zufälliges Kennzeichen generieren (österreichisches Format)
     */
    generateRandomPlate(code) {
        const numbers = '123456789';
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        
        // Österreichisches Format: CODE 123AB oder CODE 1234A
        let numPart = '';
        let letterPart = '';
        
        // 1-4 Ziffern
        const numDigits = Math.floor(Math.random() * 4) + 1;
        for (let i = 0; i < numDigits; i++) {
            numPart += numbers[Math.floor(Math.random() * numbers.length)];
        }
        
        // 1-3 Buchstaben am Ende
        const numLetters = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < numLetters; i++) {
            letterPart += letters[Math.floor(Math.random() * letters.length)];
        }
        
        return `${code} ${numPart}${letterPart}`;
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
                hint: `Der erste Buchstabe ist "${item.capital.charAt(0)}".`,
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
                hint: `${item.city} hat etwa ${item.population.toLocaleString('de-AT')} Einwohner.`,
            });
        });
    }

    /**
     * Nächste Frage laden
     */
    loadNextQuestion() {
        // Reset Tipps für neue Frage
        this.hintsUsedThisQuestion = 0;
        
        // Reset Tipp-Button
        const hintBtn = document.getElementById('hintBtn');
        let hintText = `<i class="fas fa-lightbulb"></i> Tipp (${this.maxHints} verfügbar`;
        if (this.paidHints) {
            hintText += `, ${this.hintCost}P`;
        }
        hintText += `)`;
        hintBtn.innerHTML = hintText;
        hintBtn.disabled = false;
        
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
            html += this.renderLicensePlate(this.currentQuestion.licensePlate);
        } else if (this.currentQuestion.type === 'population') {
            html += `<p style="font-size: 1.2rem; margin-top: 1.5rem;">
                <strong>${this.currentQuestion.city1}</strong> vs <strong>${this.currentQuestion.city2}</strong>
            </p>`;
        }

        content.innerHTML = html;
    }

    /**
     * Kennzeichen rendern
     */
    renderLicensePlate(plate) {
        const parts = plate.split(' ');
        const code = parts[0];
        const rest = parts.slice(1).join(' ');
        return `
            <div class="license-plate">
                <div class="plate-eu">AT</div>
                <div class="plate-content">${code} ${rest}</div>
            </div>
        `;
    }

    /**
     * Antwortbereich rendern
     */
    renderAnswerArea() {
        const area = document.getElementById('answerArea');
        area.innerHTML = '';

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
        helpBtn.className = 'help-btn';
        helpBtn.textContent = 'Antworten anzeigen';
        helpBtn.id = 'showOptionsBtn';
        helpBtn.addEventListener('click', () => {
            // Zeige Optionen und verstecke Eingabefeld
            inputSection.style.display = 'none';
            optionsSection.style.display = 'block';
            this.renderMultipleChoice(optionsSection);
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
        const answers = [];

        if (question.type === 'license-plates') {
            const otherDistricts = districtData
                .filter(d => d.code !== question.code)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);
            return otherDistricts.map(d => d.name);
        }

        return [];
    }

    /**
     * Antwort prüfen
     */
    submitAnswer(userAnswer) {
        if (!this.gameActive) return;
        this.gameActive = false;

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
            earnedPoints = Math.max(10, this.basePoints - (this.hintsUsedThisQuestion * this.hintPenalty));
            this.score += earnedPoints;
            // Füge Punkte zum globalen Konto hinzu
            this.addGlobalPoints(earnedPoints);
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
            if (this.hintsUsedThisQuestion > 0) {
                pointsInfo += ` <small>(${this.hintsUsedThisQuestion} Tipp${this.hintsUsedThisQuestion > 1 ? 's' : ''} verwendet)</small>`;
            }
            html += `<div class="feedback-correct"><i class="fas fa-check-circle"></i> Richtig! ${pointsInfo}</div>`;
        } else {
            html += '<div class="feedback-incorrect"><i class="fas fa-times-circle"></i> Falsch! +0 Punkte</div>';
        }

        html += `<div class="feedback-answer"><strong>Antwort:</strong> ${this.currentQuestion.answer}`;

        if (this.currentQuestion.type === 'license-plates' && this.currentQuestion.coat) {
            html += ` <span class="feedback-wappen">${this.currentQuestion.coat}</span>`;
        }

        html += `</div>`;

        feedbackContent.innerHTML = html;

        window.scrollTo(0, feedbackArea.offsetTop);
    }

    /**
     * Tipp anzeigen
     */
    showHint() {
        if (this.hintsUsedThisQuestion >= this.maxHints) {
            alert('Du hast bereits alle Tipps für diese Frage verwendet!');
            return;
        }

        // Prüfe ob Tipps kostenpflichtig sind
        if (this.paidHints) {
            if (this.globalPoints.totalPoints < this.hintCost) {
                alert(`Du hast nicht genug Punkte! (Benötigt: ${this.hintCost}, Vorhanden: ${this.globalPoints.totalPoints})`);
                return;
            }
            // Ziehe Punkte ab
            this.spendGlobalPoints(this.hintCost);
        }

        this.hintsUsedThisQuestion++;
        this.incrementHintsUsed();
        
        // Berechne aktuelle mögliche Punkte
        const currentPossiblePoints = Math.max(10, this.basePoints - (this.hintsUsedThisQuestion * this.hintPenalty));
        
        // Update Tipp-Button Text
        const hintBtn = document.getElementById('hintBtn');
        const remainingHints = this.maxHints - this.hintsUsedThisQuestion;
        
        let buttonText = '';
        if (remainingHints > 0) {
            buttonText = `<i class="fas fa-lightbulb"></i> Tipp (${remainingHints} übrig`;
            if (this.paidHints) {
                buttonText += `, ${this.hintCost}P`;
            }
            buttonText += `)`;
        } else {
            buttonText = `<i class="fas fa-lightbulb"></i> Keine Tipps mehr`;
            hintBtn.disabled = true;
        }
        hintBtn.innerHTML = buttonText;

        const feedbackContent = document.getElementById('feedbackContent');
        
        // Generiere verschiedene Tipps basierend auf Tipp-Nummer
        let hintText = this.getHintForLevel(this.hintsUsedThisQuestion);

        let hintHtml = `<div class="feedback-hint"><i class="fas fa-info-circle"></i> <strong>Tipp ${this.hintsUsedThisQuestion}:</strong> ${hintText}`;
        
        // Bei Kennzeichen-Fragen: Wappen als zusätzlichen visuellen Tipp anzeigen (beim 2. oder 3. Tipp)
        if (this.hintsUsedThisQuestion >= 2 && this.currentQuestion.type === 'license-plates' && this.currentQuestion.coat) {
            hintHtml += ` <span class="hint-wappen" style="font-size: 1.5rem; margin-left: 0.5rem;">${this.currentQuestion.coat}</span>`;
        }
        
        hintHtml += `</div>`;
        hintHtml += `<div class="hint-points-info" style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.3rem;"><i class="fas fa-coins"></i> Mögliche Punkte: ${currentPossiblePoints}</div>`;

        let existingContent = feedbackContent.innerHTML;
        existingContent += hintHtml;

        feedbackContent.innerHTML = existingContent;
    }

    /**
     * Generiere Tipp basierend auf Level
     */
    getHintForLevel(level) {
        const q = this.currentQuestion;
        
        if (q.type === 'license-plates') {
            if (level === 1) return `Das liegt im Bundesland ${q.state}.`;
            if (level === 2) return `Der Bezirk beginnt mit "${q.answer.charAt(0)}".`;
            if (level === 3) return `Die Antwort hat ${q.answer.length} Buchstaben: ${q.answer.substring(0, 2)}...`;
        } else if (q.type === 'capitals' || q.type === 'world-capitals') {
            if (level === 1) return `Die Hauptstadt beginnt mit "${q.answer.charAt(0)}".`;
            if (level === 2) return `Die Antwort hat ${q.answer.length} Buchstaben.`;
            if (level === 3) return `${q.answer.substring(0, Math.ceil(q.answer.length / 2))}...`;
        } else if (q.type === 'population') {
            if (level === 1) return `Denke an die Größe der Bundesländer.`;
            if (level === 2) return `Einer der Städte ist deutlich größer.`;
            if (level === 3) return `Der Unterschied beträgt etwa ${Math.abs(q.pop1 - q.pop2).toLocaleString()} Einwohner.`;
        }
        
        return q.hint || 'Kein weiterer Tipp verfügbar.';
    }

    /**
     * Spiel beenden
     */
    endGame() {
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

document.addEventListener('DOMContentLoaded', () => {
    new AustriaQuiz();
    loadCommitTime();
});
