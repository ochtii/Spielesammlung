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
    { code: 'GF', name: 'Gmünd', state: 'Niederösterreich' },
    { code: 'GM', name: 'Gänserndorf', state: 'Niederösterreich' },
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
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.currentQuestion = null;
        this.gameActive = false;
        this.hintUsed = false;
        
        this.init();
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
        // Theme Toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

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
     * Theme-Management
     */
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
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    /**
     * Spiel auswählen
     */
    selectGame(game) {
        this.currentGame = game;
        
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
     * Fragen generieren
     */
    generateQuestions() {
        this.questions = [];

        switch (this.currentGame) {
            case 'license-plates':
                this.generateLicensePlateQuestions();
                break;
            case 'capitals':
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
     * Zufälliges Kennzeichen generieren
     */
    generateRandomPlate(code) {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        
        let plate = '';
        const numLetters = Math.random() > 0.5 ? 2 : 3;
        for (let i = 0; i < numLetters; i++) {
            plate += letters[Math.floor(Math.random() * letters.length)];
        }
        plate += ' ';
        for (let i = 0; i < 6; i++) {
            plate += numbers[Math.floor(Math.random() * numbers.length)];
        }
        
        return `${code} ${plate}`;
    }

    /**
     * Hauptstädte-Fragen generieren
     */
    generateCapitalQuestions() {
        let dataToUse = [];

        if (this.currentGame === 'world-capitals' && typeof worldCapitals !== 'undefined') {
            // Internationale Hauptstädte
            dataToUse = worldCapitals.map(w => ({ state: `${w.emoji} ${w.country}`, capital: w.capital, country: w.country, emoji: w.emoji }));
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
                allCities = worldCapitals.map(w => w.capital);
            } else {
                allCities = this.capitalMode === 'federal' 
                    ? capitalsData.map(c => c.capital)
                    : districtCapitals.map(d => d.city);
            }

            while (options.length < 4 && allCities.length > 0) {
                const randomCity = allCities[Math.floor(Math.random() * allCities.length)];
                if (!options.includes(randomCity)) options.push(randomCity);
            }

            this.questions.push({
                type: 'capitals',
                question: `Was ist die Hauptstadt von ${item.state}?`,
                answer: item.capital,
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
        this.hintUsed = false;
        
        if (this.currentQuestionIndex >= this.questions.length) {
            this.endGame();
            return;
        }

        this.currentQuestion = this.questions[this.currentQuestionIndex];
        this.gameActive = true;

        document.getElementById('feedbackArea').classList.add('feedback-hidden');
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
            if (this.currentQuestion.coat) {
                html += `<div class="plate-meta">${this.currentQuestion.coat} <span class="plate-state">${this.currentQuestion.state}</span></div>`;
            }
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
        const [code, rest] = plate.split(' ');
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

        // Capitals always multiple-choice; otherwise Quiz/Profi decide
        if (this.currentQuestion.type === 'capitals' || this.currentDifficulty === 'quiz') {
            // Quiz-Modus: Buttons
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
        } else {
            // Profi-Modus: Textfeld
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

        const normalizedAnswer = userAnswer.trim().toLowerCase();
        const correctAnswer = this.currentQuestion.answer.toLowerCase();
        const isCorrect = normalizedAnswer === correctAnswer;

        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
            if (btn.textContent.toLowerCase() === correctAnswer) {
                btn.classList.add('correct');
            } else if (btn.textContent.toLowerCase() === normalizedAnswer && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });

        if (isCorrect) {
            this.score += 1;
        } else if (this.currentDifficulty === 'profi') {
            this.score = 0;
        }

        this.showFeedback(isCorrect);
        document.getElementById('scoreValue').textContent = this.score;

        this.currentQuestionIndex++;
    }

    /**
     * Feedback anzeigen
     */
    showFeedback(isCorrect) {
        const feedbackArea = document.getElementById('feedbackArea');
        const feedbackContent = document.getElementById('feedbackContent');
        feedbackArea.classList.remove('feedback-hidden');

        let html = '';

        if (isCorrect) {
            html += '<div class="feedback-correct"><i class="fas fa-check-circle"></i> Richtig!</div>';
        } else {
            html += '<div class="feedback-incorrect"><i class="fas fa-times-circle"></i> Falsch!</div>';
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
        if (this.hintUsed) {
            alert('Du hast bereits einen Tipp verwendet!');
            return;
        }

        if (this.score < 10) {
            alert('Du benötigst mindestens 10 Punkte für einen Tipp!');
            return;
        }

        this.hintUsed = true;
        this.score -= 10;
        document.getElementById('scoreValue').textContent = this.score;

        const feedbackArea = document.getElementById('feedbackArea');
        const feedbackContent = document.getElementById('feedbackContent');

        let existingContent = feedbackContent.innerHTML;
        existingContent += `<div class="feedback-hint"><i class="fas fa-info-circle"></i> <strong>Tipp:</strong> ${this.currentQuestion.hint}</div>`;

        feedbackContent.innerHTML = existingContent;
    }

    /**
     * Spiel beenden
     */
    endGame() {
        const finalScore = this.score;
        const totalQuestions = this.currentQuestionIndex;
        const percentage = Math.round((finalScore / totalQuestions) * 100);

        let message = `
            <h3>Spiel beendet!</h3>
            <p>Du hast <strong>${finalScore}</strong> von <strong>${totalQuestions}</strong> Fragen richtig beantwortet.</p>
            <p>Erfolgsquote: <strong>${percentage}%</strong></p>
        `;

        if (percentage === 100) {
            message += '<p style="color: var(--success-color); font-size: 1.2rem;"><i class="fas fa-trophy"></i> Perfekt!</p>';
        } else if (percentage >= 80) {
            message += '<p style="color: var(--success-color); font-size: 1.2rem;"><i class="fas fa-star"></i> Ausgezeichnet!</p>';
        } else if (percentage >= 60) {
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
 * Letzte Commit-Zeit anzeigen
 */
async function loadCommitTime() {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);
        
        const response = await fetch(
            'https://api.github.com/repos/ochtii/Spielesammlung/commits?per_page=1',
            { signal: controller.signal }
        );
        clearTimeout(timeout);
        
        if (!response.ok) throw new Error('API Error');
        
        const data = await response.json();
        if (data.length > 0) {
            const commitDate = new Date(data[0].commit.author.date);
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZone: 'Europe/Vienna'
            };
            const formattedDate = new Intl.DateTimeFormat('de-AT', options).format(commitDate);
            document.getElementById('commitTime').textContent = `${formattedDate} CET`;
            return;
        }
    } catch (error) {
        console.log('GitHub API nicht erreichbar');
    }
    
    const lastCommit = '2026-01-07 19:22:00';
    try {
        const commitDate = new Date(lastCommit);
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Europe/Vienna'
        };
        const formattedDate = new Intl.DateTimeFormat('de-AT', options).format(commitDate);
        document.getElementById('commitTime').textContent = `${formattedDate} CET`;
    } catch (e) {
        document.getElementById('commitTime').textContent = 'v1.0';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AustriaQuiz();
    loadCommitTime();
});
