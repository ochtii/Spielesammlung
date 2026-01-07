// ============================================
// ÖSTERREICH-QUIZ - SPIELDATEN
// ============================================

/**
 * Array mit österreichischen KFZ-Kennzeichen (Bezirkskürzel)
 * Quelle: Offizielle österreichische Behördenregistratur
 */
const districtData = [
    // Burgenland
    { code: 'B', name: 'Burgenland', state: 'Burgenland', wappen: '🛡️' },
    
    // Kärnten
    { code: 'K', name: 'Klagenfurt-Land', state: 'Kärnten', wappen: '🦅' },
    { code: 'KL', name: 'Klagenfurt-Stadt', state: 'Kärnten', wappen: '🦅' },
    { code: 'VV', name: 'Villach-Land', state: 'Kärnten', wappen: '🦅' },
    { code: 'V', name: 'Villach-Stadt', state: 'Kärnten', wappen: '🦅' },
    { code: 'ST', name: 'Spittal an der Drau', state: 'Kärnten', wappen: '🦅' },
    { code: 'HE', name: 'Hermagor-Pressegger See', state: 'Kärnten', wappen: '🦅' },
    { code: 'FE', name: 'Feldkirchen', state: 'Kärnten', wappen: '🦅' },
    
    // Niederösterreich
    { code: 'N', name: 'Niederösterreich (allg.)', state: 'Niederösterreich', wappen: '🏰' },
    { code: 'GF', name: 'Gmünd', state: 'Niederösterreich', wappen: '🏰' },
    { code: 'WR', name: 'Waidhofen an der Thaya', state: 'Niederösterreich', wappen: '🏰' },
    { code: 'KO', name: 'Korneuburg', state: 'Niederösterreich', wappen: '🏰' },
    { code: 'MA', name: 'Melk', state: 'Niederösterreich', wappen: '🏰' },
    { code: 'MI', name: 'Mistelbach', state: 'Niederösterreich', wappen: '🏰' },
    { code: 'MZ', name: 'Mödling', state: 'Niederösterreich', wappen: '🏰' },
    { code: 'WZ', name: 'Waidhofen an der Ybbs', state: 'Niederösterreich', wappen: '🏰' },
    { code: 'KS', name: 'Krems an der Donau', state: 'Niederösterreich', wappen: '🏰' },
    { code: 'ZH', name: 'Zwettl', state: 'Niederösterreich', wappen: '🏰' },
    
    // Oberösterreich
    { code: 'O', name: 'Oberösterreich (allg.)', state: 'Oberösterreich', wappen: '👑' },
    { code: 'AM', name: 'Urfahr-Umgebung', state: 'Oberösterreich', wappen: '👑' },
    { code: 'AD', name: 'Altmünster/Bad Ischl', state: 'Oberösterreich', wappen: '👑' },
    { code: 'BR', name: 'Braunau am Inn', state: 'Oberösterreich', wappen: '👑' },
    { code: 'EF', name: 'Eferding', state: 'Oberösterreich', wappen: '👑' },
    { code: 'FR', name: 'Freistadt', state: 'Oberösterreich', wappen: '👑' },
    { code: 'GD', name: 'Grieskirchen', state: 'Oberösterreich', wappen: '👑' },
    { code: 'GM', name: 'Gmunden', state: 'Oberösterreich', wappen: '👑' },
    { code: 'LI', name: 'Linz', state: 'Oberösterreich', wappen: '👑' },
    { code: 'PE', name: 'Perg', state: 'Oberösterreich', wappen: '👑' },
    { code: 'RI', name: 'Ried im Innkreis', state: 'Oberösterreich', wappen: '👑' },
    { code: 'RO', name: 'Rohrbach', state: 'Oberösterreich', wappen: '👑' },
    
    // Salzburg
    { code: 'S', name: 'Salzburg-Stadt', state: 'Salzburg', wappen: '🎵' },
    { code: 'SL', name: 'Salzburg-Umgebung', state: 'Salzburg', wappen: '🎵' },
    { code: 'HA', name: 'Hallein', state: 'Salzburg', wappen: '🎵' },
    { code: 'SZ', name: 'Saalfelden', state: 'Salzburg', wappen: '🎵' },
    { code: 'TL', name: 'Tamsweg', state: 'Salzburg', wappen: '🎵' },
    { code: 'ZE', name: 'Zell am See', state: 'Salzburg', wappen: '🎵' },
    
    // Steiermark
    { code: 'ST', name: 'Steiermark (allg.)', state: 'Steiermark', wappen: '🦁' },
    { code: 'G', name: 'Graz', state: 'Steiermark', wappen: '🦁' },
    { code: 'GU', name: 'Graz-Umgebung', state: 'Steiermark', wappen: '🦁' },
    { code: 'DL', name: 'Deutschlandsberg', state: 'Steiermark', wappen: '🦁' },
    { code: 'FB', name: 'Feldbach', state: 'Steiermark', wappen: '🦁' },
    { code: 'FU', name: 'Fürstenfeld', state: 'Steiermark', wappen: '🦁' },
    { code: 'HB', name: 'Hartberg-Fürstenfeld', state: 'Steiermark', wappen: '🦁' },
    { code: 'JU', name: 'Judenburg', state: 'Steiermark', wappen: '🦁' },
    { code: 'KF', name: 'Kapfenberg', state: 'Steiermark', wappen: '🦁' },
    { code: 'KN', name: 'Knittelfeld', state: 'Steiermark', wappen: '🦁' },
    { code: 'LB', name: 'Leibnitz', state: 'Steiermark', wappen: '🦁' },
    { code: 'LI', name: 'Liezen', state: 'Steiermark', wappen: '🦁' },
    { code: 'MU', name: 'Murau', state: 'Steiermark', wappen: '🦁' },
    { code: 'VO', name: 'Voitsberg', state: 'Steiermark', wappen: '🦁' },
    { code: 'WZ', name: 'Weiz', state: 'Steiermark', wappen: '🦁' },
    
    // Tirol
    { code: 'T', name: 'Tirol (allg.)', state: 'Tirol', wappen: '⛏️' },
    { code: 'IB', name: 'Imst', state: 'Tirol', wappen: '⛏️' },
    { code: 'IN', name: 'Innsbruck-Stadt', state: 'Tirol', wappen: '⛏️' },
    { code: 'KB', name: 'Kufstein', state: 'Tirol', wappen: '⛏️' },
    { code: 'KI', name: 'Kitzbühel', state: 'Tirol', wappen: '⛏️' },
    { code: 'LL', name: 'Landeck', state: 'Tirol', wappen: '⛏️' },
    { code: 'RO', name: 'Reutte', state: 'Tirol', wappen: '⛏️' },
    { code: 'SB', name: 'Schwaz', state: 'Tirol', wappen: '⛏️' },
    { code: 'IU', name: 'Innsbruck-Land', state: 'Tirol', wappen: '⛏️' },
    
    // Vorarlberg
    { code: 'V', name: 'Vorarlberg', state: 'Vorarlberg', wappen: '📍' },
    { code: 'BL', name: 'Bludenz', state: 'Vorarlberg', wappen: '📍' },
    { code: 'BR', name: 'Bregenz', state: 'Vorarlberg', wappen: '📍' },
    { code: 'DO', name: 'Dornbirn', state: 'Vorarlberg', wappen: '📍' },
    { code: 'FE', name: 'Feldkirch', state: 'Vorarlberg', wappen: '📍' },
    { code: 'GO', name: 'Götzis', state: 'Vorarlberg', wappen: '📍' },
    { code: 'HO', name: 'Hohenems', state: 'Vorarlberg', wappen: '📍' },
    
    // Wien
    { code: 'W', name: 'Wien', state: 'Wien', wappen: '🏛️' },
];

/**
 * Bundesland-Informationen mit Wappen-Emojis
 */
const stateCoats = {
    'Burgenland': { emoji: '🛡️', color: '#DC241F' },
    'Kärnten': { emoji: '🦅', color: '#FFD700' },
    'Niederösterreich': { emoji: '🏰', color: '#003399' },
    'Oberösterreich': { emoji: '👑', color: '#ED2939' },
    'Salzburg': { emoji: '🎵', color: '#6B8E23' },
    'Steiermark': { emoji: '🦁', color: '#006600' },
    'Tirol': { emoji: '⛏️', color: '#FF0000' },
    'Vorarlberg': { emoji: '📍', color: '#0052CC' },
    'Wien': { emoji: '🏛️', color: '#ED2939' },
};

/**
 * Österreichische Bundesländer und ihre Hauptstädte
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
    { city: 'Eisenstadt', population: 14000 },
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
];

// ============================================
// HAUPTANWENDUNGSLOGIK
// ============================================

class AustriaQuiz {
    constructor() {
        this.currentGame = null;
        this.currentDifficulty = null;
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
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const difficulty = e.currentTarget.dataset.difficulty;
                this.selectDifficulty(difficulty);
            });
        });

        // Back Button
        document.getElementById('backBtn').addEventListener('click', () => {
            this.backToStart();
        });

        // End Button
        document.getElementById('endBtn').addEventListener('click', () => {
            this.endGame();
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
        document.getElementById('difficultySection').style.display = 'block';
        window.scrollTo(0, 0);
    }

    /**
     * Schwierigkeitsgrad auswählen und Spiel starten
     */
    selectDifficulty(difficulty) {
        this.currentDifficulty = difficulty;
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
                question: `Welcher Bezirk hat das Kennzeichen "${district.code}"?`,
                licensePlate: this.generateRandomPlate(district.code),
                answer: district.name,
                state: district.state,
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
        // Format: 2-3 Buchstaben, 5-6 Ziffern (z.B. "AB 123456")
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
        const shuffled = [...capitalsData].sort(() => 0.5 - Math.random());

        shuffled.forEach(item => {
            const options = [item.capital];
            
            // Falsche Optionen hinzufügen
            while (options.length < 4) {
                const randomCapital = capitalsData[
                    Math.floor(Math.random() * capitalsData.length)
                ].capital;
                if (!options.includes(randomCapital)) {
                    options.push(randomCapital);
                }
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

        // Feedback verstecken
        document.getElementById('feedbackArea').classList.add('feedback-hidden');
        document.getElementById('answerArea').innerHTML = '';

        // Frage anzeigen
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

        if (this.currentDifficulty === 'quiz') {
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
        } else if (question.type === 'capitals') {
            const otherCapitals = capitalsData
                .filter(c => c.capital !== question.answer)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);
            return otherCapitals.map(c => c.capital);
        } else if (question.type === 'population') {
            const otherCity = question.city1 === question.answer ? question.city2 : question.city1;
            return [otherCity];
        }

        return [];
    }

    /**
     * Antwort prüfen
     */
    submitAnswer(userAnswer) {
        if (!this.gameActive) return;
        this.gameActive = false;

        // Antwort normalisieren
        const normalizedAnswer = userAnswer.trim().toLowerCase();
        const correctAnswer = this.currentQuestion.answer.toLowerCase();
        const isCorrect = normalizedAnswer === correctAnswer;

        // Buttons deaktivieren
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
            if (btn.textContent.toLowerCase() === correctAnswer) {
                btn.classList.add('correct');
            } else if (btn.textContent.toLowerCase() === normalizedAnswer && !isCorrect) {
                btn.classList.add('incorrect');
            }
        });

        // Score aktualisieren
        if (isCorrect) {
            this.score += 1;
        } else if (this.currentDifficulty === 'profi') {
            this.score = 0; // Hardcore: Score zurücksetzen
        }

        // Feedback anzeigen
        this.showFeedback(isCorrect);

        // Score-Display aktualisieren
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

        // Wappen anzeigen
        const stateInfo = stateCoats[this.currentQuestion.state];
        if (stateInfo) {
            html += `<div class="feedback-answer"><strong>Bundesland:</strong> ${stateInfo.emoji} ${this.currentQuestion.state}</div>`;
        }

        html += `<div class="feedback-answer"><strong>Antwort:</strong> ${this.currentQuestion.answer}</div>`;

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
        document.getElementById('gameSelectionSection').style.display = 'block';
        document.getElementById('difficultySection').style.display = 'none';
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
 * Letzte Commit-Zeit von GitHub API abrufen
 */
async function loadCommitTime() {
    try {
        const response = await fetch('https://api.github.com/repos/ochtii/Spielesammlung/commits?per_page=1');
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
        }
    } catch (error) {
        console.log('Commit-Zeit konnte nicht geladen werden:', error);
        document.getElementById('commitTime').textContent = 'v1.0';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AustriaQuiz();
    loadCommitTime();
});
