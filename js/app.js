/**
 * App - Main Application Entry Point
 */
const App = {
    currentGame: null,
    version: '2.0.0',
    buildDate: '2026-01-08',

    /**
     * Initialize the application
     */
    init() {
        try {
            // Initialize core modules
            Theme.init();
            Navbar.init();
            BottomNav.init();

            // Register games
            this.registerGames();

            // Setup page-specific functionality
            this.setupPage();
            
            // Update version display
            this.updateVersionDisplay();
            
            console.log(`App v${this.version} initialized`);
        } catch (error) {
            console.error('App initialization error:', error);
        }
    },
    
    /**
     * Update version display in UI
     */
    updateVersionDisplay() {
        const versionEl = document.getElementById('appVersion');
        const buildEl = document.getElementById('buildDate');
        
        if (versionEl) versionEl.textContent = this.version;
        if (buildEl) buildEl.textContent = this.buildDate;
    },

    /**
     * Register all available games
     */
    registerGames() {
        // Kennzeichen Quiz
        const kennzeichenGame = new QuizGame({
            id: 'kennzeichen',
            name: 'Kennzeichen',
            icon: 'fa-car',
            description: 'Erkenne österreichische KFZ-Kennzeichen',
            questionCount: 10,
            data: DistrictData,
            questionGenerator: (item, allData) => {
                const wrongOptions = allData
                    .filter(d => d.name !== item.name)
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 3)
                    .map(d => d.name);

                return {
                    question: `Welcher Bezirk hat das Kennzeichen "${item.code}"?`,
                    correct: item.name,
                    options: [item.name, ...wrongOptions]
                };
            }
        });
        GameRegistry.register('kennzeichen', kennzeichenGame);

        // Landeshauptstädte Quiz
        const hauptstaedteGame = new QuizGame({
            id: 'hauptstaedte',
            name: 'Hauptstädte',
            icon: 'fa-city',
            description: 'Kenne die Landeshauptstädte',
            questionCount: 9,
            data: StateCapitals,
            questionGenerator: (item, allData) => {
                const wrongOptions = allData
                    .filter(d => d.capital !== item.capital)
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 3)
                    .map(d => d.capital);

                return {
                    question: `Was ist die Hauptstadt von ${item.state}?`,
                    correct: item.capital,
                    options: [item.capital, ...wrongOptions]
                };
            }
        });
        GameRegistry.register('hauptstaedte', hauptstaedteGame);

        // World Capitals Quiz (if data available)
        if (typeof worldCapitals !== 'undefined') {
            const weltGame = new QuizGame({
                id: 'welthauptstaedte',
                name: 'Welt-Hauptstädte',
                icon: 'fa-globe',
                description: 'Hauptstädte der Welt',
                questionCount: 10,
                data: worldCapitals,
                questionGenerator: (item, allData) => {
                    const wrongOptions = allData
                        .filter(d => d.capital !== item.capital)
                        .sort(() => Math.random() - 0.5)
                        .slice(0, 3)
                        .map(d => d.capital);

                    return {
                        question: `${item.emoji || ''} Was ist die Hauptstadt von ${item.country}?`,
                        correct: item.capital,
                        options: [item.capital, ...wrongOptions]
                    };
                }
            });
            GameRegistry.register('welthauptstaedte', weltGame);
        }
    },

    /**
     * Setup page-specific functionality
     */
    setupPage() {
        const page = document.body.dataset.page;
        
        switch (page) {
            case 'game':
                this.setupGamePage();
                break;
            case 'settings':
                this.setupSettingsPage();
                break;
            case 'points':
                this.setupPointsPage();
                break;
            case 'stats':
                this.setupStatsPage();
                break;
        }
    },

    /**
     * Setup game selection page
     */
    setupGamePage() {
        const gameGrid = document.getElementById('gameGrid');
        const startBtn = document.getElementById('startBtn');
        let selectedGame = null;

        // Render game selection cards (only if games exist)
        if (gameGrid) {
            const games = GameRegistry.getAll();
            
            // Only overwrite if we have games registered
            if (games.length > 0) {
                gameGrid.innerHTML = games.map(game => `
                    <div class="selection-card" data-game="${game.id}">
                        <div class="selection-card-icon">
                            <i class="fas ${game.icon}"></i>
                        </div>
                        <div class="selection-card-title">${game.name}</div>
                        <div class="selection-card-desc">${game.description}</div>
                    </div>
                `).join('');
            }

            // Handle game selection
            gameGrid.querySelectorAll('.selection-card').forEach(card => {
                card.addEventListener('click', () => {
                    gameGrid.querySelectorAll('.selection-card').forEach(c => 
                        c.classList.remove('selected'));
                    card.classList.add('selected');
                    selectedGame = card.dataset.game;
                    if (startBtn) startBtn.disabled = false;
                });
            });
        }

        // Start button
        if (startBtn) {
            startBtn.disabled = true;
            startBtn.addEventListener('click', () => {
                if (selectedGame) {
                    this.startGame(selectedGame);
                }
            });
        }

        // Restart button
        const restartBtn = document.getElementById('restartBtn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                this.showScreen('startScreen');
            });
        }

        // Play again button
        const playAgainBtn = document.getElementById('playAgainBtn');
        if (playAgainBtn) {
            playAgainBtn.addEventListener('click', () => {
                if (this.currentGame) {
                    this.currentGame.start();
                    this.showScreen('gameScreen');
                }
            });
        }
    },

    /**
     * Start a game
     * @param {string} gameId 
     */
    startGame(gameId) {
        const game = GameRegistry.get(gameId);
        if (!game) {
            Toast.error('Spiel nicht gefunden');
            return;
        }

        this.currentGame = game;
        game.init();
        game.start();
        this.showScreen('gameScreen');
    },

    /**
     * Show a screen
     * @param {string} screenId 
     */
    showScreen(screenId) {
        document.querySelectorAll('.game-screen').forEach(screen => {
            screen.classList.remove('active');
        });
        const screen = document.getElementById(screenId);
        if (screen) screen.classList.add('active');
    },

    /**
     * Setup settings page
     */
    setupSettingsPage() {
        // Theme toggle
        const themeSelect = document.getElementById('themeSelect');
        if (themeSelect) {
            themeSelect.value = Theme.getTheme();
            themeSelect.addEventListener('change', (e) => {
                Theme.setTheme(e.target.value);
            });
        }

        // Font scale
        const fontScaleSelect = document.getElementById('fontScaleSelect');
        if (fontScaleSelect) {
            fontScaleSelect.value = Theme.getFontScale();
            fontScaleSelect.addEventListener('change', (e) => {
                Theme.setFontScale(parseFloat(e.target.value));
            });
        }

        // Accent color
        const accentColor = document.getElementById('accentColor');
        if (accentColor) {
            accentColor.value = Theme.getAccentColor();
            accentColor.addEventListener('input', (e) => {
                Theme.setAccentColor(e.target.value);
            });
        }

        // Reset button
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('Alle Daten zurücksetzen?')) {
                    Storage.clear();
                    location.reload();
                }
            });
        }

        // Dev Tools - Cache Buster Toggle
        const cacheBusterToggle = document.getElementById('cacheBusterToggle');
        if (cacheBusterToggle && typeof CacheBuster !== 'undefined') {
            cacheBusterToggle.checked = CacheBuster.isEnabled();
            cacheBusterToggle.addEventListener('change', (e) => {
                CacheBuster.setEnabled(e.target.checked);
                Toast.show(e.target.checked ? 'Cache Buster aktiviert' : 'Cache Buster deaktiviert', {
                    type: e.target.checked ? 'success' : 'info'
                });
            });
        }

        // Dev Tools - Clear Cache Button
        const clearCacheBtn = document.getElementById('clearCacheBtn');
        if (clearCacheBtn && typeof CacheBuster !== 'undefined') {
            clearCacheBtn.addEventListener('click', async () => {
                await CacheBuster.bustCache();
                Toast.success('Cache geleert!');
            });
        }

        // Dev Tools - Hard Reload Button
        const hardReloadBtn = document.getElementById('hardReloadBtn');
        if (hardReloadBtn && typeof CacheBuster !== 'undefined') {
            hardReloadBtn.addEventListener('click', () => {
                CacheBuster.forceReload();
            });
        }
    },

    /**
     * Setup points page
     */
    setupPointsPage() {
        const stats = Storage.get('gameStats', {
            totalGames: 0,
            totalCorrect: 0,
            totalWrong: 0,
            bestStreak: 0
        });
        const points = Storage.get('totalPoints', 0);

        // Update displays
        this.setText('totalPoints', points);
        this.setText('totalGames', stats.totalGames);
        this.setText('totalCorrect', stats.totalCorrect);
        this.setText('bestStreak', stats.bestStreak);

        const total = stats.totalCorrect + stats.totalWrong;
        const accuracy = total > 0 ? Math.round((stats.totalCorrect / total) * 100) : 0;
        this.setText('accuracy', accuracy + '%');
    },

    /**
     * Setup stats page
     */
    setupStatsPage() {
        const stats = Storage.get('gameStats', {
            totalGames: 0,
            totalCorrect: 0,
            totalWrong: 0,
            bestStreak: 0
        });

        // Update overview stats
        this.setText('totalGames', stats.totalGames);
        this.setText('totalQuestions', stats.totalCorrect + stats.totalWrong);
        this.setText('correctAnswers', stats.totalCorrect);
        this.setText('wrongAnswers', stats.totalWrong);

        // Game type stats
        const gameTypesList = document.getElementById('gameTypesList');
        if (gameTypesList) {
            const gameStats = Storage.get('gameTypeStats', {});
            const games = GameRegistry.getAll();
            
            if (Object.keys(gameStats).length > 0) {
                gameTypesList.innerHTML = games
                    .filter(game => gameStats[game.id])
                    .map(game => {
                        const gs = gameStats[game.id] || { plays: 0, correct: 0, wrong: 0 };
                        const total = gs.correct + gs.wrong;
                        const accuracy = total > 0 ? Math.round((gs.correct / total) * 100) : 0;
                        return `
                            <div class="game-stat-item">
                                <div class="game-stat-info">
                                    <div class="game-stat-icon">
                                        <i class="fas ${game.icon}"></i>
                                    </div>
                                    <div>
                                        <div class="game-stat-name">${game.name}</div>
                                        <div class="game-stat-plays">${gs.plays} Spiele</div>
                                    </div>
                                </div>
                                <div class="game-stat-accuracy">${accuracy}%</div>
                            </div>
                        `;
                    }).join('');
            } else {
                gameTypesList.innerHTML = '<p class="text-muted text-center">Noch keine Spiele gespielt.</p>';
            }
        }

        // Recent games
        const recentGamesList = document.getElementById('recentGamesList');
        const noRecentGames = document.getElementById('noRecentGames');
        if (recentGamesList) {
            const recentGames = Storage.get('recentGames', []);
            
            if (recentGames.length > 0) {
                recentGamesList.innerHTML = recentGames.slice(0, 10).map(game => {
                    const date = new Date(game.timestamp);
                    const dateStr = date.toLocaleDateString('de-DE', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    return `
                        <div class="recent-game-item">
                            <div class="recent-game-info">
                                <div class="recent-game-name">${game.name}</div>
                                <div class="recent-game-date">${dateStr}</div>
                            </div>
                            <div class="recent-game-score">
                                <div class="recent-game-points">+${game.points}</div>
                                <div class="recent-game-result">${game.correct}/${game.total}</div>
                            </div>
                        </div>
                    `;
                }).join('');
                if (noRecentGames) noRecentGames.style.display = 'none';
            } else {
                recentGamesList.innerHTML = '';
                if (noRecentGames) noRecentGames.style.display = 'block';
            }
        }

        // Reset stats button
        const resetStatsBtn = document.getElementById('resetStatsBtn');
        if (resetStatsBtn) {
            resetStatsBtn.addEventListener('click', () => {
                if (confirm('Alle Statistiken zurücksetzen?')) {
                    Storage.remove('gameStats');
                    Storage.remove('gameTypeStats');
                    Storage.remove('recentGames');
                    Storage.remove('totalPoints');
                    Toast.success('Statistiken zurückgesetzt');
                    location.reload();
                }
            });
        }
    },

    /**
     * Utility: Set text content
     * @param {string} id 
     * @param {*} value 
     */
    setText(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => App.init());
