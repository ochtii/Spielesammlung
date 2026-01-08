/**
 * App - Main Application Entry Point
 */
const App = {
    currentGame: null,
    version: '2.1.3',
    buildDate: '2026-01-08',

    /**
     * Initialize the application
     */
    init() {
        // Initialize core modules individually to prevent cascade failures
        try {
            Theme.init();
        } catch (e) {
            console.error('Theme init failed:', e);
        }
        
        try {
            Navbar.init();
        } catch (e) {
            console.error('Navbar init failed:', e);
        }
        
        try {
            if (typeof BottomNav !== 'undefined') {
                BottomNav.init();
            }
        } catch (e) {
            console.error('BottomNav init failed:', e);
        }

        try {
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
        this.selectedGame = null;
        this.selectedMode = null;

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

            // Handle game selection - öffne direkt den Dialog
            gameGrid.querySelectorAll('.selection-card').forEach(card => {
                card.addEventListener('click', () => {
                    const gameId = card.dataset.game;
                    const game = GameRegistry.get(gameId);
                    if (game) {
                        this.showGameSettingsDialog(game);
                    }
                });
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

        // Hint button for Rainbow mode
        const hintBtn = document.getElementById('hintButton');
        if (hintBtn) {
            hintBtn.addEventListener('click', () => {
                if (this.currentGame) {
                    this.currentGame.purchaseHint();
                }
            });
        }

        // Joker button
        const jokerBtn = document.getElementById('jokerButton');
        if (jokerBtn) {
            jokerBtn.addEventListener('click', () => {
                if (this.currentGame) {
                    this.currentGame.useJoker();
                }
            });
        }
    },

    /**
     * Show game settings dialog
     * @param {Object} game 
     */
    showGameSettingsDialog(game) {
        GameSettingsDialog.show(game, (selectedGame, settings) => {
            this.startGameWithSettings(selectedGame, settings);
        });
    },

    /**
     * Start game with settings from dialog
     * @param {Object} game 
     * @param {Object} settings 
     */
    startGameWithSettings(game, settings) {
        // Set mode if supported
        if (gameSupportsMode(game.id)) {
            const mode = GameModes[settings.mode.toUpperCase()] || GameModes.AMATEUR;
            game.setMode(mode);
        }

        // Set other settings
        game.setSettings(settings);

        this.currentGame = game;
        game.init();
        game.start();
        this.showScreen('gameScreen');
    },

    /**
     * Setup mode selection screen (legacy - jetzt durch Dialog ersetzt)
     */
    setupModeSelection() {
        // Wird nicht mehr verwendet, Dialog übernimmt
    },

    /**
     * Show mode selection screen (legacy)
     */
    showModeSelection() {
        // Wird nicht mehr verwendet
    },

    /**
     * Start a game with a specific mode (legacy)
     * @param {string} gameId 
     * @param {string} modeId 
     */
    startGameWithMode(gameId, modeId) {
        const game = GameRegistry.get(gameId);
        if (!game) {
            Toast.error('Spiel nicht gefunden');
            return;
        }

        const mode = GameModes[modeId.toUpperCase()] || GameModes.AMATEUR;
        game.setMode(mode);

        this.currentGame = game;
        game.init();
        game.start();
        this.showScreen('gameScreen');
    },
            Toast.error('Spiel nicht gefunden');
            return;
        }

        // Set the mode
        const mode = GameModes[modeId.toUpperCase()] || GameModes.AMATEUR;
        game.setMode(mode);

        this.currentGame = game;
        game.init();
        game.start();
        this.showScreen('gameScreen');
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
        // Use new Statistics module if available
        if (typeof Statistics !== 'undefined') {
            const global = Statistics.getGlobal();
            
            this.setText('totalPoints', global.totalPointsEarned);
            this.setText('totalGames', global.totalGamesPlayed);
            this.setText('totalCorrect', global.totalCorrectAnswers);
            this.setText('bestStreak', global.bestStreak);
            this.setText('accuracy', global.averageAccuracy + '%');
            return;
        }

        // Fallback to legacy
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
        // Use new Statistics module if available
        if (typeof Statistics !== 'undefined') {
            this.setupStatsPageNew();
            return;
        }

        // Fallback to legacy stats
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
    },

    /**
     * Setup stats page with new Statistics module
     */
    setupStatsPageNew() {
        const global = Statistics.getGlobal();
        const daily = Statistics.getDaily();
        const gameStats = Statistics.getAllGames();
        const achievements = Statistics.getUnlockedAchievements();
        const sessions = Statistics.getSessions(10);

        // Overview Stats
        this.setText('totalGames', global.totalGamesPlayed);
        this.setText('totalQuestions', global.totalQuestionsAnswered);
        this.setText('correctAnswers', global.totalCorrectAnswers);
        this.setText('wrongAnswers', global.totalWrongAnswers);

        // Streaks & Time
        this.setText('bestStreak', global.bestStreak);
        this.setText('dailyStreak', global.currentDailyStreak);
        this.setText('totalTime', Statistics.formatTime(global.totalTimePlayedMs));
        this.setText('avgAccuracy', global.averageAccuracy + '%');

        // Daily Stats
        this.setText('dailyGames', daily.gamesPlayed);
        this.setText('dailyCorrect', daily.correctAnswers);
        this.setText('dailyPoints', daily.pointsEarned);

        // Game Type Stats
        const gameTypesList = document.getElementById('gameTypesList');
        if (gameTypesList) {
            const games = GameRegistry.getAll();
            const hasStats = Object.keys(gameStats).length > 0;
            
            if (hasStats) {
                gameTypesList.innerHTML = games
                    .filter(game => gameStats[game.id])
                    .map(game => {
                        const gs = gameStats[game.id];
                        const total = gs.correctAnswers + gs.wrongAnswers;
                        const accuracy = total > 0 ? Math.round((gs.correctAnswers / total) * 100) : 0;
                        return `
                            <div class="game-stat-item">
                                <div class="game-stat-info">
                                    <div class="game-stat-icon">
                                        <i class="fas ${game.icon}"></i>
                                    </div>
                                    <div>
                                        <div class="game-stat-name">${game.name}</div>
                                        <div class="game-stat-plays">${gs.timesPlayed} Spiele · ${gs.perfectGames}x Perfekt</div>
                                    </div>
                                </div>
                                <div class="game-stat-details">
                                    <div class="game-stat-accuracy">${accuracy}%</div>
                                    <div class="game-stat-streak">🔥 ${gs.bestStreak}</div>
                                </div>
                            </div>
                        `;
                    }).join('');
            } else {
                gameTypesList.innerHTML = '<p class="text-muted text-center">Noch keine Spiele gespielt.</p>';
            }
        }

        // Achievements
        const achievementsList = document.getElementById('achievementsList');
        const noAchievements = document.getElementById('noAchievements');
        if (achievementsList) {
            if (achievements.length > 0) {
                achievementsList.innerHTML = achievements.map(ach => {
                    const date = new Date(ach.unlockedAt);
                    const dateStr = date.toLocaleDateString('de-DE');
                    return `
                        <div class="achievement-item">
                            <div class="achievement-icon">🏆</div>
                            <div class="achievement-info">
                                <div class="achievement-name">${ach.name}</div>
                                <div class="achievement-date">${dateStr}</div>
                            </div>
                        </div>
                    `;
                }).join('');
                if (noAchievements) noAchievements.style.display = 'none';
            } else {
                achievementsList.innerHTML = '';
                if (noAchievements) noAchievements.style.display = 'block';
            }
        }

        // Recent Games
        const recentGamesList = document.getElementById('recentGamesList');
        const noRecentGames = document.getElementById('noRecentGames');
        if (recentGamesList) {
            if (sessions.length > 0) {
                recentGamesList.innerHTML = sessions.map(game => {
                    const date = new Date(game.timestamp);
                    const dateStr = date.toLocaleDateString('de-DE', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                    const isPerfect = game.percentage === 100;
                    return `
                        <div class="recent-game-item ${isPerfect ? 'perfect' : ''}">
                            <div class="recent-game-info">
                                <div class="recent-game-name">${game.gameName} ${isPerfect ? '⭐' : ''}</div>
                                <div class="recent-game-date">${dateStr}</div>
                            </div>
                            <div class="recent-game-score">
                                <div class="recent-game-points">+${game.points || 0}</div>
                                <div class="recent-game-result">${game.score}/${game.total}</div>
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

        // Reset Stats Button
        const resetStatsBtn = document.getElementById('resetStatsBtn');
        if (resetStatsBtn) {
            resetStatsBtn.addEventListener('click', () => {
                if (confirm('Alle Statistiken zurücksetzen?')) {
                    Statistics.resetAll();
                    // Also clear legacy stats
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
