/**
 * GameEngine - Base class for all games
 * Extend this class to create new game types
 */
class GameEngine {
    constructor(config) {
        this.config = {
            id: config.id || 'game',
            name: config.name || 'Game',
            icon: config.icon || 'fa-gamepad',
            description: config.description || '',
            questionCount: config.questionCount || 10,
            ...config
        };

        // Game Mode (default: Amateur/Multiple Choice)
        this.mode = GameModes ? GameModes.AMATEUR : { id: 'amateur', inputType: 'choice' };
        this.hintPurchased = false; // Für Rainbow-Modus

        // Game Settings
        this.settings = {
            timer: { enabled: false, seconds: 30 },
            joker: { enabled: true },
            hardcore: false
        };

        // Timer
        this.timerInterval = null;
        this.timeRemaining = 0;

        this.state = {
            status: 'idle', // idle, playing, paused, finished
            questions: [],
            currentIndex: 0,
            score: 0,
            streak: 0,
            bestStreak: 0,
            startTime: null,
            endTime: null
        };

        this.elements = {};
    }

    /**
     * Set game mode
     * @param {Object} mode - GameModes.AMATEUR, GameModes.PRO, or GameModes.RAINBOW
     */
    setMode(mode) {
        this.mode = mode;
        this.hintPurchased = false;
    }

    /**
     * Set game settings
     * @param {Object} settings 
     */
    setSettings(settings) {
        this.settings = {
            timer: settings.timer || { enabled: false, seconds: 30 },
            joker: { enabled: settings.joker?.enabled ?? true },
            hardcore: settings.hardcore || false
        };

        // Hardcore überschreibt andere Settings
        if (this.settings.hardcore) {
            this.settings.timer = { enabled: true, seconds: 10 };
            this.settings.joker = { enabled: false, count: 0, used: 0 };
        }
    }

    /**
     * Generate questions for the game
     * Override in subclass
     * @returns {Array<{question: string, correct: string, options: string[]}>}
     */
    generateQuestions() {
        throw new Error('generateQuestions() must be implemented in subclass');
    }

    /**
     * Initialize the game
     */
    init() {
        this.bindElements();
        this.bindEvents();
    }

    /**
     * Bind DOM elements
     */
    bindElements() {
        this.elements = {
            gameScreen: document.getElementById('gameScreen'),
            resultScreen: document.getElementById('resultScreen'),
            questionText: document.getElementById('questionText'),
            answersGrid: document.getElementById('answersGrid'),
            progressFill: document.getElementById('progressFill'),
            currentQuestion: document.getElementById('currentQuestion'),
            totalQuestions: document.getElementById('totalQuestions'),
            scoreDisplay: document.getElementById('scoreDisplay'),
            streakDisplay: document.getElementById('streakDisplay'),
            hintButton: document.getElementById('hintButton'),
            hintCost: document.getElementById('hintCost'),
            timerDisplay: document.getElementById('timerDisplay'),
            timerBar: document.getElementById('timerBar'),
            timerContainer: document.getElementById('timerContainer'),
            jokerBar: document.getElementById('jokerBar'),
            hintDisplay: document.getElementById('hintDisplay')
        };
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Override in subclass if needed
    }

    /**
     * Start the game
     */
    start() {
        this.state.questions = this.generateQuestions();
        this.state.currentIndex = 0;
        this.state.score = 0;
        this.state.streak = 0;
        this.state.bestStreak = 0;
        this.state.startTime = Date.now();
        this.state.status = 'playing';
        this.hintPurchased = false;
        
        // Reset joker
        if (this.settings.joker) {
            this.settings.joker.used = 0;
        }

        if (this.elements.totalQuestions) {
            this.elements.totalQuestions.textContent = this.state.questions.length;
        }

        // Update UI elements based on settings
        this.updateHintButton();
        this.updateTimerDisplay();

        EventBus.emit(Events.GAME_START, { game: this.config.id, mode: this.mode.id, settings: this.settings });
        this.showQuestion();
    }

    /**
     * Update timer display visibility
     */
    updateTimerDisplay() {
        const timerEl = document.getElementById('timerContainer');
        if (timerEl) {
            timerEl.classList.toggle('hidden', !this.settings.timer.enabled);
        }
    }

    /**
     * Render Joker Bar mit verfügbaren Jokern
     */
    renderJokerBar() {
        const jokerBar = this.elements.jokerBar;
        if (!jokerBar) return;

        // Keine Joker im Hardcore-Modus oder wenn deaktiviert
        if (this.settings.hardcore || !this.settings.joker.enabled) {
            jokerBar.classList.add('hidden');
            return;
        }

        // Joker für aktuellen Modus holen
        const jokers = JokerSystem.getJokersForMode(this.mode);
        const currentPoints = Storage.get('totalPoints', 0);

        // Joker-Buttons rendern
        jokerBar.innerHTML = Object.values(jokers).map(joker => {
            const isUsed = JokerSystem.isUsed(joker.id);
            const canAfford = currentPoints >= joker.cost;
            const priceClass = joker.cost <= 20 ? 'cheap' : (joker.cost >= 50 ? 'expensive' : 'medium');
            
            return `
                <button class="joker-btn ${isUsed ? 'used' : ''} ${!canAfford ? 'cant-afford' : ''}" 
                        data-joker="${joker.id}"
                        title="${joker.description}"
                        ${isUsed || !canAfford ? 'disabled' : ''}>
                    <div class="joker-btn-icon" style="background: ${joker.color}">
                        <i class="fas ${joker.icon}"></i>
                    </div>
                    <span class="joker-btn-name">${joker.name}</span>
                    <span class="joker-btn-price ${priceClass}">
                        <i class="fas fa-coins"></i>${joker.cost}
                    </span>
                </button>
            `;
        }).join('');

        jokerBar.classList.remove('hidden');

        // Event Listeners für Joker-Buttons
        jokerBar.querySelectorAll('.joker-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (!btn.disabled) {
                    this.useJoker(btn.dataset.joker);
                }
            });
        });
    }

    /**
     * Joker verwenden
     * @param {string} jokerId 
     */
    useJoker(jokerId) {
        if (JokerSystem.isUsed(jokerId)) return;

        const jokers = JokerSystem.getJokersForMode(this.mode);
        const joker = jokers[jokerId];
        if (!joker) return;

        // Punkte prüfen und abziehen
        if (!JokerSystem.canAfford(joker.cost)) {
            Toast.error('Nicht genug Punkte!');
            return;
        }

        if (!JokerSystem.deductPoints(joker.cost)) {
            Toast.error('Fehler beim Abziehen der Punkte');
            return;
        }

        const question = this.state.questions[this.state.currentIndex];
        let result = null;
        let hintHtml = '';

        // Joker ausführen basierend auf Typ
        if (this.mode.inputType === 'choice') {
            // Amateur-Modus Joker
            switch (jokerId) {
                case 'fiftyFifty':
                    JokerSystem.useFiftyFifty(this.elements.answersGrid, question.correct);
                    Toast.show('50:50 - 2 Antworten entfernt!', { type: 'success' });
                    break;
                case 'removeOne':
                    JokerSystem.useRemoveOne(this.elements.answersGrid, question.correct);
                    Toast.show('1 falsche Antwort entfernt!', { type: 'success' });
                    break;
                case 'randomHint':
                    result = JokerSystem.useRandomHintAmateur(question.correct, question);
                    hintHtml = JokerSystem.formatHintDisplay('randomHint', result, question.correct);
                    break;
            }
        } else {
            // Pro-Modus Joker
            switch (jokerId) {
                case 'firstLetter':
                    result = JokerSystem.useFirstLetter(question.correct);
                    hintHtml = JokerSystem.formatHintDisplay('firstLetter', result, question.correct);
                    break;
                case 'length':
                    result = JokerSystem.useLength(question.correct);
                    hintHtml = JokerSystem.formatHintDisplay('length', result, question.correct);
                    break;
                case 'oneLetter':
                    result = JokerSystem.useOneLetter(question.correct);
                    hintHtml = JokerSystem.formatHintDisplay('oneLetter', result, question.correct);
                    break;
                case 'twoLetters':
                    result = JokerSystem.useTwoLetters(question.correct);
                    hintHtml = JokerSystem.formatHintDisplay('twoLetters', result, question.correct);
                    break;
                case 'randomHint':
                    result = JokerSystem.useRandomHintPro(question.correct, question);
                    hintHtml = JokerSystem.formatHintDisplay('randomHint', result, question.correct);
                    break;
            }
        }

        // Hinweis anzeigen falls vorhanden
        if (hintHtml) {
            this.showHint(hintHtml);
        }

        // Joker als verwendet markieren
        JokerSystem.markUsed(jokerId);
        
        // Joker-Bar aktualisieren
        this.renderJokerBar();
        
        // Punkte-Anzeige aktualisieren
        EventBus.emit(Events.POINTS_UPDATE, { 
            points: Storage.get('totalPoints', 0) 
        });
    }

    /**
     * Hinweis im Hint-Display anzeigen
     * @param {string} html 
     */
    showHint(html) {
        const hintDisplay = this.elements.hintDisplay;
        if (!hintDisplay) return;

        hintDisplay.innerHTML += html;
        hintDisplay.classList.remove('hidden');
    }

    /**
     * Hint-Display zurücksetzen
     */
    clearHints() {
        const hintDisplay = this.elements.hintDisplay;
        if (hintDisplay) {
            hintDisplay.innerHTML = '';
            hintDisplay.classList.add('hidden');
        }
    }

    /**
     * Start timer for current question
     */
    startTimer() {
        if (!this.settings.timer.enabled) return;

        this.stopTimer();
        this.timeRemaining = this.settings.timer.seconds;
        
        const timerDisplay = this.elements.timerDisplay;
        const timerBar = this.elements.timerBar;
        
        if (timerDisplay) timerDisplay.textContent = this.timeRemaining;
        if (timerBar) timerBar.style.width = '100%';

        this.timerInterval = setInterval(() => {
            this.timeRemaining--;
            
            if (timerDisplay) timerDisplay.textContent = this.timeRemaining;
            if (timerBar) {
                const percent = (this.timeRemaining / this.settings.timer.seconds) * 100;
                timerBar.style.width = `${percent}%`;
                
                // Farbe ändern bei wenig Zeit
                if (this.timeRemaining <= 5) {
                    timerBar.classList.add('danger');
                } else if (this.timeRemaining <= 10) {
                    timerBar.classList.add('warning');
                } else {
                    timerBar.classList.remove('warning', 'danger');
                }
            }

            if (this.timeRemaining <= 0) {
                this.stopTimer();
                this.handleTimeout();
            }
        }, 1000);
    }

    /**
     * Stop timer
     */
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    /**
     * Handle timeout (no answer given in time)
     */
    handleTimeout() {
        const question = this.state.questions[this.state.currentIndex];
        
        // Zeige richtige Antwort
        const buttons = this.elements.answersGrid.querySelectorAll('.answer-btn');
        buttons.forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.answer === question.correct) {
                btn.classList.add('correct');
            }
        });

        // Streak zurücksetzen
        this.state.streak = 0;
        this.updateStats();

        Toast.error('Zeit abgelaufen!');

        // Nächste Frage
        setTimeout(() => this.nextQuestion(), 1500);
    }

    /**
     * Update hint button for Rainbow mode
     */
    updateHintButton() {
        const hintBtn = this.elements.hintButton;
        if (!hintBtn) return;

        if (this.mode.inputType === 'rainbow' && !this.hintPurchased) {
            hintBtn.classList.remove('hidden');
            const costEl = this.elements.hintCost;
            if (costEl) costEl.textContent = this.mode.hintCost || 100;
            
            // Check if player can afford hint
            const currentPoints = Storage.get('totalPoints', 0);
            hintBtn.disabled = currentPoints < (this.mode.hintCost || 100);
        } else {
            hintBtn.classList.add('hidden');
        }
    }

    /**
     * Purchase hint (Rainbow mode)
     */
    purchaseHint() {
        if (this.mode.inputType !== 'rainbow' || this.hintPurchased) return;

        const cost = this.mode.hintCost || 100;
        const currentPoints = Storage.get('totalPoints', 0);

        if (currentPoints < cost) {
            Toast.error('Nicht genug Punkte!');
            return;
        }

        // Deduct points
        Storage.set('totalPoints', currentPoints - cost);
        
        // Log in PointsHistory
        if (typeof PointsHistory !== 'undefined') {
            PointsHistory.logSpent({
                amount: cost,
                reason: 'Hinweis gekauft (Regenbogen-Modus)',
                item: 'Hinweis'
            });
        }

        this.hintPurchased = true;
        Toast.show('Hinweis freigeschaltet!', { type: 'success' });

        // Re-render answers as multiple choice
        const question = this.state.questions[this.state.currentIndex];
        this.renderAnswers(question.options);
        this.updateHintButton();
    }

    /**
     * Show current question
     */
    showQuestion() {
        const question = this.state.questions[this.state.currentIndex];
        if (!question) {
            this.finish();
            return;
        }

        // Reset hint for new question (Rainbow mode)
        this.hintPurchased = false;
        this.updateHintButton();

        // Reset Joker für neue Frage und Joker-Bar rendern
        JokerSystem.resetForQuestion();
        this.renderJokerBar();
        this.clearHints();

        // Start timer for this question
        this.state.questionStartTime = Date.now();

        // Update UI
        if (this.elements.questionText) {
            this.elements.questionText.textContent = question.question;
        }

        if (this.elements.currentQuestion) {
            this.elements.currentQuestion.textContent = this.state.currentIndex + 1;
        }

        this.updateProgress();
        
        // Render based on mode
        if (this.mode.inputType === 'choice') {
            // Hardcore: Verzögerte Antworten
            if (this.settings.hardcore) {
                this.renderDelayedAnswers(question.options);
            } else {
                this.renderAnswers(question.options);
            }
        } else if (this.mode.inputType === 'text' || this.mode.inputType === 'rainbow') {
            this.renderTextInput(question);
        }

        // Start timer after rendering
        if (this.settings.timer.enabled) {
            this.startTimer();
        }
    }

    /**
     * Render delayed answers (Hardcore mode)
     * @param {string[]} options 
     */
    renderDelayedAnswers(options) {
        if (!this.elements.answersGrid) return;

        // Zeige Platzhalter
        this.elements.answersGrid.innerHTML = `
            <div class="answers-loading">
                <div class="answers-loading-spinner"></div>
                <span>Antworten laden...</span>
                <div class="answers-loading-countdown" id="answersCountdown">4</div>
            </div>
        `;

        let countdown = 4;
        const countdownEl = document.getElementById('answersCountdown');
        
        const countdownInterval = setInterval(() => {
            countdown--;
            if (countdownEl) countdownEl.textContent = countdown;
            
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                this.renderAnswers(options);
            }
        }, 1000);
    }

    /**
     * Render answer buttons
     * @param {string[]} options 
     */
    renderAnswers(options) {
        if (!this.elements.answersGrid) return;

        this.elements.answersGrid.innerHTML = options.map(option => `
            <button class="answer-btn" data-answer="${this.escapeHtml(option)}">
                ${this.escapeHtml(option)}
            </button>
        `).join('');

        // Bind click events
        this.elements.answersGrid.querySelectorAll('.answer-btn').forEach(btn => {
            btn.addEventListener('click', () => this.handleAnswer(btn.dataset.answer));
        });
    }

    /**
     * Render text input for Pro/Rainbow mode
     * @param {Object} question 
     */
    renderTextInput(question) {
        if (!this.elements.answersGrid) return;

        this.elements.answersGrid.innerHTML = `
            <div class="text-input-container">
                <input 
                    type="text" 
                    id="answerInput" 
                    class="answer-input" 
                    placeholder="Antwort eingeben..."
                    autocomplete="off"
                    autocapitalize="words"
                    spellcheck="false"
                >
                <button id="submitAnswer" class="btn btn-primary btn-submit">
                    <i class="fas fa-check"></i> Bestätigen
                </button>
            </div>
            <div id="textFeedback" class="text-feedback hidden"></div>
        `;

        const input = document.getElementById('answerInput');
        const submitBtn = document.getElementById('submitAnswer');

        // Focus input
        setTimeout(() => input.focus(), 100);

        // Submit on Enter
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleTextAnswer(input.value);
            }
        });

        // Submit on button click
        submitBtn.addEventListener('click', () => {
            this.handleTextAnswer(input.value);
        });
    }

    /**
     * Handle text answer (Pro/Rainbow mode)
     * @param {string} userAnswer 
     */
    handleTextAnswer(userAnswer) {
        // Timer stoppen
        this.stopTimer();

        const question = this.state.questions[this.state.currentIndex];
        const normalizedUser = this.normalizeAnswer(userAnswer);
        const normalizedCorrect = this.normalizeAnswer(question.correct);
        
        const isCorrect = normalizedUser === normalizedCorrect;
        const answerTimeMs = this.state.questionStartTime ? Date.now() - this.state.questionStartTime : null;

        // Show feedback
        const feedback = document.getElementById('textFeedback');
        const input = document.getElementById('answerInput');
        const submitBtn = document.getElementById('submitAnswer');

        if (input) input.disabled = true;
        if (submitBtn) submitBtn.disabled = true;

        if (feedback) {
            feedback.classList.remove('hidden');
            if (isCorrect) {
                feedback.className = 'text-feedback correct';
                feedback.innerHTML = `<i class="fas fa-check-circle"></i> Richtig!`;
            } else {
                feedback.className = 'text-feedback wrong';
                feedback.innerHTML = `<i class="fas fa-times-circle"></i> Falsch! Richtig: <strong>${question.correct}</strong>`;
            }
        }

        // Update score and streak
        if (isCorrect) {
            this.state.score++;
            this.state.streak++;
            if (this.state.streak > this.state.bestStreak) {
                this.state.bestStreak = this.state.streak;
            }
            // Pro mode: more points for text input
            let basePoints = this.mode.inputType === 'text' ? 20 : 10;
            basePoints += this.state.streak;
            // Hardcore: 2x Punkte
            if (this.settings.hardcore) {
                basePoints *= 2;
            }
            this.addPoints(basePoints);
        } else {
            this.state.streak = 0;
        }

        this.updateStats();

        // Record answer in Statistics
        if (typeof Statistics !== 'undefined') {
            Statistics.recordAnswer({
                gameId: this.config.id,
                question: question.question,
                correct: isCorrect,
                answerTimeMs: answerTimeMs
            });
        }

        EventBus.emit(Events.QUESTION_ANSWERED, {
            game: this.config.id,
            correct: isCorrect,
            question: question.question,
            selected: userAnswer,
            correctAnswer: question.correct,
            answerTimeMs: answerTimeMs,
            mode: this.mode.id
        });

        // Next question after delay
        setTimeout(() => this.nextQuestion(), 1500);
    }

    /**
     * Normalize answer for comparison
     * @param {string} answer 
     * @returns {string}
     */
    normalizeAnswer(answer) {
        return answer
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
            .replace(/[^a-z0-9]/g, ''); // Remove special chars
    }

    /**
     * Handle answer selection
     * @param {string} selected 
     */
    handleAnswer(selected) {
        // Timer stoppen
        this.stopTimer();

        const question = this.state.questions[this.state.currentIndex];
        const isCorrect = selected === question.correct;
        const answerTimeMs = this.state.questionStartTime ? Date.now() - this.state.questionStartTime : null;

        // Disable all buttons
        const buttons = this.elements.answersGrid.querySelectorAll('.answer-btn');
        buttons.forEach(btn => {
            btn.disabled = true;
            const answer = btn.dataset.answer;
            if (answer === question.correct) {
                btn.classList.add('correct');
            } else if (answer === selected && !isCorrect) {
                btn.classList.add('wrong');
            }
        });

        // Update score and streak
        if (isCorrect) {
            this.state.score++;
            this.state.streak++;
            if (this.state.streak > this.state.bestStreak) {
                this.state.bestStreak = this.state.streak;
            }
            // Berechne Punkte: Hardcore = 2x
            let basePoints = 10 + this.state.streak;
            if (this.settings.hardcore) {
                basePoints *= 2;
            }
            this.addPoints(basePoints);
        } else {
            this.state.streak = 0;
        }

        this.updateStats();

        // Record answer in Statistics
        if (typeof Statistics !== 'undefined') {
            Statistics.recordAnswer({
                gameId: this.config.id,
                question: question.question,
                correct: isCorrect,
                answerTimeMs: answerTimeMs
            });
        }

        EventBus.emit(Events.QUESTION_ANSWERED, {
            game: this.config.id,
            correct: isCorrect,
            question: question.question,
            selected,
            correctAnswer: question.correct,
            answerTimeMs: answerTimeMs
        });

        // Next question after delay
        setTimeout(() => this.nextQuestion(), 1000);
    }

    /**
     * Go to next question
     */
    nextQuestion() {
        this.state.currentIndex++;
        
        if (this.state.currentIndex < this.state.questions.length) {
            this.showQuestion();
        } else {
            this.finish();
        }
    }

    /**
     * Update progress bar
     */
    updateProgress() {
        if (!this.elements.progressFill) return;
        const progress = (this.state.currentIndex / this.state.questions.length) * 100;
        this.elements.progressFill.style.width = `${progress}%`;
    }

    /**
     * Update score/streak display
     */
    updateStats() {
        if (this.elements.scoreDisplay) {
            this.elements.scoreDisplay.textContent = this.state.score;
        }
        if (this.elements.streakDisplay) {
            this.elements.streakDisplay.textContent = this.state.streak;
        }
    }

    /**
     * Finish the game
     */
    finish() {
        this.state.status = 'finished';
        this.state.endTime = Date.now();

        const result = this.getResult();
        this.saveStats(result);
        
        EventBus.emit(Events.GAME_END, result);
        this.showResult(result);
    }

    /**
     * Get game result
     * @returns {Object}
     */
    getResult() {
        const total = this.state.questions.length;
        return {
            game: this.config.id,
            score: this.state.score,
            total,
            percentage: Math.round((this.state.score / total) * 100),
            streak: this.state.bestStreak,
            time: this.state.endTime - this.state.startTime
        };
    }

    /**
     * Show result screen
     * @param {Object} result 
     */
    showResult(result) {
        // Update result elements
        const finalScore = document.getElementById('finalScore');
        const finalTotal = document.getElementById('finalTotal');
        const finalPercent = document.getElementById('finalPercent');
        const finalStreak = document.getElementById('finalStreak');

        if (finalScore) finalScore.textContent = result.score;
        if (finalTotal) finalTotal.textContent = result.total;
        if (finalPercent) finalPercent.textContent = result.percentage;
        if (finalStreak) finalStreak.textContent = result.streak;

        // Show result screen
        this.showScreen('resultScreen');
    }

    /**
     * Show a specific screen
     * @param {string} screenId 
     */
    showScreen(screenId) {
        document.querySelectorAll('.game-screen').forEach(screen => {
            screen.classList.remove('active');
        });
        const screen = document.getElementById(screenId);
        if (screen) screen.classList.add('active');
    }

    /**
     * Add points to total
     * @param {number} amount 
     */
    addPoints(amount) {
        const current = Storage.get('totalPoints', 0);
        Storage.set('totalPoints', current + amount);
        EventBus.emit(Events.POINTS_UPDATE, { points: current + amount });
    }

    /**
     * Save game statistics
     * @param {Object} result 
     */
    saveStats(result) {
        // Overall stats
        const stats = Storage.get('gameStats', {
            totalGames: 0,
            totalCorrect: 0,
            totalWrong: 0,
            bestStreak: 0
        });

        stats.totalGames++;
        stats.totalCorrect += result.score;
        stats.totalWrong += (result.total - result.score);
        
        if (result.streak > stats.bestStreak) {
            stats.bestStreak = result.streak;
        }

        Storage.set('gameStats', stats);

        // Per-game type stats (legacy)
        const gameTypeStats = Storage.get('gameTypeStats', {});
        if (!gameTypeStats[result.game]) {
            gameTypeStats[result.game] = { plays: 0, correct: 0, wrong: 0 };
        }
        gameTypeStats[result.game].plays++;
        gameTypeStats[result.game].correct += result.score;
        gameTypeStats[result.game].wrong += (result.total - result.score);
        Storage.set('gameTypeStats', gameTypeStats);

        // Recent games history (legacy)
        const recentGames = Storage.get('recentGames', []);
        recentGames.unshift({
            gameId: result.game,
            name: this.config.name,
            correct: result.score,
            total: result.total,
            points: result.score * 10,
            timestamp: Date.now()
        });
        // Keep only last 50 games
        Storage.set('recentGames', recentGames.slice(0, 50));

        // NEW: Record in Statistics module
        if (typeof Statistics !== 'undefined') {
            Statistics.recordGame({
                gameId: result.game,
                gameName: this.config.name,
                score: result.score,
                total: result.total,
                percentage: result.percentage,
                streak: result.streak,
                timeMs: result.time,
                points: result.score * 10
            });
        }

        // NEW: Log in Points History
        if (typeof PointsHistory !== 'undefined') {
            const basePoints = result.score * 10;
            
            // Log game win points
            if (basePoints > 0) {
                PointsHistory.logGamePoints({
                    gameId: result.game,
                    gameName: this.config.name,
                    score: result.score,
                    total: result.total,
                    percentage: result.percentage,
                    streak: result.streak,
                    timeMs: result.time,
                    points: basePoints
                });
            }
            
            // Log streak bonus (if streak > 3)
            if (result.streak >= 5) {
                const streakBonus = result.streak * 2;
                PointsHistory.logBonus({
                    type: PointsHistory.TYPES.STREAK_BONUS,
                    amount: streakBonus,
                    gameId: result.game,
                    gameName: this.config.name,
                    streak: result.streak,
                    reason: `${result.streak}er Streak Bonus`
                });
            }
            
            // Log perfect game bonus
            if (result.percentage === 100 && result.total >= 5) {
                const perfectBonus = 50;
                PointsHistory.logBonus({
                    type: PointsHistory.TYPES.GAME_BONUS,
                    amount: perfectBonus,
                    gameId: result.game,
                    gameName: this.config.name,
                    reason: 'Perfektes Spiel!'
                });
            }
        }

        EventBus.emit(Events.STATS_UPDATE, stats);
    }

    /**
     * Reset the game to initial state
     */
    reset() {
        this.state = {
            status: 'idle',
            questions: [],
            currentIndex: 0,
            score: 0,
            streak: 0,
            bestStreak: 0,
            startTime: null,
            endTime: null
        };
    }

    /**
     * Utility: Shuffle array
     * @param {Array} array 
     * @returns {Array}
     */
    shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    /**
     * Utility: Escape HTML
     * @param {string} str 
     * @returns {string}
     */
    escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}
