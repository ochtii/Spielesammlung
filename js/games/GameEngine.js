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
            streakDisplay: document.getElementById('streakDisplay')
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

        if (this.elements.totalQuestions) {
            this.elements.totalQuestions.textContent = this.state.questions.length;
        }

        EventBus.emit(Events.GAME_START, { game: this.config.id });
        this.showQuestion();
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

        // Update UI
        if (this.elements.questionText) {
            this.elements.questionText.textContent = question.question;
        }

        if (this.elements.currentQuestion) {
            this.elements.currentQuestion.textContent = this.state.currentIndex + 1;
        }

        this.updateProgress();
        this.renderAnswers(question.options);
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
     * Handle answer selection
     * @param {string} selected 
     */
    handleAnswer(selected) {
        const question = this.state.questions[this.state.currentIndex];
        const isCorrect = selected === question.correct;

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
            this.addPoints(10 + this.state.streak);
        } else {
            this.state.streak = 0;
        }

        this.updateStats();

        EventBus.emit(Events.QUESTION_ANSWERED, {
            game: this.config.id,
            correct: isCorrect,
            question: question.question,
            selected,
            correctAnswer: question.correct
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

        // Per-game type stats
        const gameTypeStats = Storage.get('gameTypeStats', {});
        if (!gameTypeStats[result.game]) {
            gameTypeStats[result.game] = { plays: 0, correct: 0, wrong: 0 };
        }
        gameTypeStats[result.game].plays++;
        gameTypeStats[result.game].correct += result.score;
        gameTypeStats[result.game].wrong += (result.total - result.score);
        Storage.set('gameTypeStats', gameTypeStats);

        // Recent games history
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
