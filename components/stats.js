// ============================================
// STATISTIK MANAGER
// ============================================

/**
 * Statistik-Datenstruktur im LocalStorage:
 * 
 * gameStatistics: {
 *   global: {
 *     totalGames: number,
 *     totalRounds: number,
 *     correctAnswers: number,
 *     wrongAnswers: number,
 *     totalPoints: number,
 *     currentStreak: number,
 *     bestStreak: number,
 *     perfectGames: number,
 *     fastestAnswer: number (ms),
 *     hintsUsed: number,
 *     lastPlayed: timestamp
 *   },
 *   games: {
 *     'license-plates': { games, rounds, correct, wrong, points, bestScore },
 *     'capitals': { ... },
 *     'world-capitals': { ... },
 *     'population': { ... }
 *   },
 *   daily: {
 *     '2026-01-08': { rounds, correct, wrong, points },
 *     ...
 *   },
 *   activities: [
 *     { type, game, question, answer, userAnswer, correct, points, timestamp },
 *     ...
 *   ]
 * }
 */

class StatsManager {
    constructor() {
        this.stats = this.loadStats();
        this.charts = {};
        this.init();
    }

    /**
     * Standard-Statistik-Struktur
     */
    getDefaultStats() {
        return {
            global: {
                totalGames: 0,
                totalRounds: 0,
                correctAnswers: 0,
                wrongAnswers: 0,
                totalPoints: 0,
                currentStreak: 0,
                bestStreak: 0,
                perfectGames: 0,
                fastestAnswer: null,
                hintsUsed: 0,
                lastPlayed: null
            },
            games: {
                'license-plates': this.getDefaultGameStats(),
                'capitals': this.getDefaultGameStats(),
                'world-capitals': this.getDefaultGameStats(),
                'population': this.getDefaultGameStats()
            },
            daily: {},
            activities: []
        };
    }

    /**
     * Standard-Statistik für ein Spiel
     */
    getDefaultGameStats() {
        return {
            games: 0,
            rounds: 0,
            correct: 0,
            wrong: 0,
            points: 0,
            bestScore: 0,
            bestStreak: 0,
            averageScore: 0
        };
    }

    /**
     * Statistiken aus LocalStorage laden
     */
    loadStats() {
        const saved = localStorage.getItem('gameStatistics');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Merge mit Default-Struktur für neue Felder
                return this.mergeWithDefaults(parsed);
            } catch (e) {
                console.error('Fehler beim Laden der Statistiken:', e);
                return this.getDefaultStats();
            }
        }
        return this.getDefaultStats();
    }

    /**
     * Merge gespeicherte Daten mit Default-Struktur
     */
    mergeWithDefaults(saved) {
        const defaults = this.getDefaultStats();
        
        // Global mergen
        defaults.global = { ...defaults.global, ...(saved.global || {}) };
        
        // Games mergen
        if (saved.games) {
            for (const game of Object.keys(defaults.games)) {
                if (saved.games[game]) {
                    defaults.games[game] = { ...defaults.games[game], ...saved.games[game] };
                }
            }
        }
        
        // Daily und Activities übernehmen
        defaults.daily = saved.daily || {};
        defaults.activities = saved.activities || [];
        
        return defaults;
    }

    /**
     * Statistiken speichern
     */
    saveStats() {
        localStorage.setItem('gameStatistics', JSON.stringify(this.stats));
    }

    /**
     * Initialisierung
     */
    init() {
        this.setupMenuToggle();
        this.setupTabs();
        this.updateDisplay();
        this.initCharts();
        this.loadTheme();
    }

    /**
     * Theme laden
     */
    loadTheme() {
        const theme = localStorage.getItem('theme') || 'light';
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        }
    }

    /**
     * Menü-Toggle einrichten
     */
    setupMenuToggle() {
        const menuToggle = document.getElementById('menuToggle');
        const menuDropdown = document.getElementById('menuDropdown');
        
        if (menuToggle && menuDropdown) {
            menuToggle.addEventListener('click', () => {
                menuDropdown.classList.toggle('active');
            });
            
            document.addEventListener('click', (e) => {
                if (!menuToggle.contains(e.target) && !menuDropdown.contains(e.target)) {
                    menuDropdown.classList.remove('active');
                }
            });
        }
    }

    /**
     * Tabs einrichten
     */
    setupTabs() {
        const tabs = document.querySelectorAll('.game-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.updateGameStats(tab.dataset.game);
            });
        });
    }

    /**
     * Alle Anzeigen aktualisieren
     */
    updateDisplay() {
        this.updateOverview();
        this.updateSuccessRate();
        this.updateGameStats('all');
        this.updateActivities();
        this.updateRecords();
    }

    /**
     * Übersicht aktualisieren
     */
    updateOverview() {
        const g = this.stats.global;
        
        document.getElementById('totalGames').textContent = g.totalGames;
        document.getElementById('totalRounds').textContent = g.totalRounds;
        document.getElementById('totalCorrect').textContent = g.correctAnswers;
        document.getElementById('totalWrong').textContent = g.wrongAnswers;
    }

    /**
     * Erfolgsquote aktualisieren
     */
    updateSuccessRate() {
        const g = this.stats.global;
        const total = g.correctAnswers + g.wrongAnswers;
        const rate = total > 0 ? Math.round((g.correctAnswers / total) * 100) : 0;
        
        // Kreis animieren
        const progress = document.getElementById('rateProgress');
        const circumference = 283; // 2 * π * r (r=45)
        const offset = circumference - (rate / 100) * circumference;
        
        setTimeout(() => {
            progress.style.strokeDashoffset = offset;
        }, 100);
        
        // Werte setzen
        document.getElementById('successRate').textContent = rate;
        document.getElementById('correctPercent').textContent = `${rate}%`;
        document.getElementById('wrongPercent').textContent = `${100 - rate}%`;
        document.getElementById('bestStreak').textContent = g.bestStreak;
        document.getElementById('currentStreak').textContent = g.currentStreak;
    }

    /**
     * Spielstatistiken aktualisieren
     */
    updateGameStats(gameFilter) {
        const container = document.getElementById('gameStatsContent');
        let data;
        
        if (gameFilter === 'all') {
            data = this.stats.global;
        } else {
            data = this.stats.games[gameFilter] || this.getDefaultGameStats();
        }
        
        const successRate = (data.correct || data.correctAnswers || 0) + (data.wrong || data.wrongAnswers || 0) > 0
            ? Math.round(((data.correct || data.correctAnswers || 0) / ((data.correct || data.correctAnswers || 0) + (data.wrong || data.wrongAnswers || 0))) * 100)
            : 0;
        
        container.innerHTML = `
            <div class="game-stat-item">
                <div class="game-stat-icon"><i class="fas fa-gamepad"></i></div>
                <span class="game-stat-value">${data.games || data.totalGames || 0}</span>
                <span class="game-stat-label">Spiele</span>
            </div>
            <div class="game-stat-item">
                <div class="game-stat-icon"><i class="fas fa-circle-play"></i></div>
                <span class="game-stat-value">${data.rounds || data.totalRounds || 0}</span>
                <span class="game-stat-label">Runden</span>
            </div>
            <div class="game-stat-item">
                <div class="game-stat-icon"><i class="fas fa-check"></i></div>
                <span class="game-stat-value">${data.correct || data.correctAnswers || 0}</span>
                <span class="game-stat-label">Richtig</span>
            </div>
            <div class="game-stat-item">
                <div class="game-stat-icon"><i class="fas fa-times"></i></div>
                <span class="game-stat-value">${data.wrong || data.wrongAnswers || 0}</span>
                <span class="game-stat-label">Falsch</span>
            </div>
            <div class="game-stat-item">
                <div class="game-stat-icon"><i class="fas fa-percentage"></i></div>
                <span class="game-stat-value">${successRate}%</span>
                <span class="game-stat-label">Quote</span>
            </div>
            <div class="game-stat-item">
                <div class="game-stat-icon"><i class="fas fa-coins"></i></div>
                <span class="game-stat-value">${data.points || data.totalPoints || 0}</span>
                <span class="game-stat-label">Punkte</span>
            </div>
        `;
    }

    /**
     * Aktivitäten aktualisieren
     */
    updateActivities() {
        const container = document.getElementById('activityList');
        const emptyState = document.getElementById('activityEmpty');
        
        if (this.stats.activities.length === 0) {
            container.style.display = 'none';
            emptyState.style.display = 'flex';
            return;
        }
        
        container.style.display = 'flex';
        emptyState.style.display = 'none';
        
        // Letzte 20 Aktivitäten anzeigen
        const recent = this.stats.activities.slice(0, 20);
        
        container.innerHTML = recent.map(activity => {
            const iconClass = activity.correct ? 'correct' : (activity.type === 'game' ? 'game' : 'wrong');
            const icon = activity.correct ? 'fa-check' : (activity.type === 'game' ? 'fa-gamepad' : 'fa-times');
            const pointsClass = activity.points >= 0 ? 'positive' : 'negative';
            const pointsText = activity.points >= 0 ? `+${activity.points}` : activity.points;
            const timeAgo = this.formatTimeAgo(activity.timestamp);
            const gameName = this.getGameDisplayName(activity.game);
            
            return `
                <div class="activity-item">
                    <div class="activity-icon ${iconClass}">
                        <i class="fas ${icon}"></i>
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">${activity.question || gameName}</div>
                        <div class="activity-subtitle">${gameName}${activity.answer ? ` • ${activity.answer}` : ''}</div>
                    </div>
                    <div class="activity-meta">
                        <div class="activity-points ${pointsClass}">${pointsText}</div>
                        <div class="activity-time">${timeAgo}</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * Rekorde aktualisieren
     */
    updateRecords() {
        const g = this.stats.global;
        
        // Höchste Punktzahl aus allen Spielen
        let highestScore = 0;
        for (const game of Object.values(this.stats.games)) {
            if (game.bestScore > highestScore) {
                highestScore = game.bestScore;
            }
        }
        
        document.getElementById('highestScore').textContent = highestScore;
        document.getElementById('longestStreak').textContent = g.bestStreak;
        document.getElementById('perfectGames').textContent = g.perfectGames;
        
        // Schnellste Antwort formatieren
        if (g.fastestAnswer) {
            const seconds = (g.fastestAnswer / 1000).toFixed(1);
            document.getElementById('fastestAnswer').textContent = `${seconds}s`;
        } else {
            document.getElementById('fastestAnswer').textContent = '-';
        }
    }

    /**
     * Charts initialisieren
     */
    initCharts() {
        this.initDistributionChart();
        this.initWeeklyChart();
    }

    /**
     * Verteilungs-Chart
     */
    initDistributionChart() {
        const ctx = document.getElementById('gameDistributionChart');
        if (!ctx) return;
        
        const games = this.stats.games;
        const data = [
            games['license-plates'].rounds,
            games['capitals'].rounds,
            games['world-capitals'].rounds,
            games['population'].rounds
        ];
        
        const isDark = document.body.classList.contains('dark-mode');
        const textColor = isDark ? '#e5e5e5' : '#374151';
        
        this.charts.distribution = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Kennzeichen', 'Hauptstädte', 'Welt-Hauptstädte', 'Einwohner'],
                datasets: [{
                    data: data,
                    backgroundColor: [
                        '#3b82f6',
                        '#22c55e',
                        '#a855f7',
                        '#f59e0b'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: textColor,
                            padding: 15,
                            usePointStyle: true
                        }
                    }
                },
                cutout: '60%'
            }
        });
    }

    /**
     * Wochen-Chart
     */
    initWeeklyChart() {
        const ctx = document.getElementById('weeklyChart');
        if (!ctx) return;
        
        // Letzte 7 Tage
        const labels = [];
        const correctData = [];
        const wrongData = [];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            const dayName = date.toLocaleDateString('de-DE', { weekday: 'short' });
            
            labels.push(dayName);
            
            const dayStats = this.stats.daily[dateStr] || { correct: 0, wrong: 0 };
            correctData.push(dayStats.correct);
            wrongData.push(dayStats.wrong);
        }
        
        const isDark = document.body.classList.contains('dark-mode');
        const textColor = isDark ? '#e5e5e5' : '#374151';
        const gridColor = isDark ? '#374151' : '#e5e5e5';
        
        this.charts.weekly = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Richtig',
                        data: correctData,
                        backgroundColor: '#22c55e',
                        borderRadius: 4
                    },
                    {
                        label: 'Falsch',
                        data: wrongData,
                        backgroundColor: '#ef4444',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: textColor }
                    },
                    y: {
                        beginAtZero: true,
                        grid: { color: gridColor },
                        ticks: { 
                            color: textColor,
                            stepSize: 1
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            color: textColor,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }

    /**
     * Spielname für Anzeige
     */
    getGameDisplayName(game) {
        const names = {
            'license-plates': 'Kennzeichen',
            'capitals': 'Hauptstädte',
            'world-capitals': 'Welt-Hauptstädte',
            'population': 'Einwohner'
        };
        return names[game] || game || 'Quiz';
    }

    /**
     * Zeit formatieren
     */
    formatTimeAgo(timestamp) {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        
        if (seconds < 60) return 'Gerade eben';
        if (seconds < 3600) return `Vor ${Math.floor(seconds / 60)} Min.`;
        if (seconds < 86400) return `Vor ${Math.floor(seconds / 3600)} Std.`;
        if (seconds < 604800) return `Vor ${Math.floor(seconds / 86400)} Tagen`;
        
        return new Date(timestamp).toLocaleDateString('de-DE');
    }

    // ==========================================
    // TRACKING METHODEN (von script.js aufgerufen)
    // ==========================================

    /**
     * Spiel gestartet
     */
    trackGameStart(game) {
        this.stats.global.totalGames++;
        this.stats.games[game].games++;
        this.stats.global.lastPlayed = Date.now();
        this.saveStats();
    }

    /**
     * Runde gespielt
     */
    trackRound(game, data) {
        const g = this.stats.global;
        const gameStats = this.stats.games[game];
        const today = new Date().toISOString().split('T')[0];
        
        // Globale Stats
        g.totalRounds++;
        
        if (data.correct) {
            g.correctAnswers++;
            g.currentStreak++;
            if (g.currentStreak > g.bestStreak) {
                g.bestStreak = g.currentStreak;
            }
        } else {
            g.wrongAnswers++;
            g.currentStreak = 0;
        }
        
        g.totalPoints += data.points || 0;
        
        // Schnellste Antwort tracken
        if (data.answerTime && data.correct) {
            if (!g.fastestAnswer || data.answerTime < g.fastestAnswer) {
                g.fastestAnswer = data.answerTime;
            }
        }
        
        if (data.hintUsed) {
            g.hintsUsed++;
        }
        
        // Spiel-spezifische Stats
        gameStats.rounds++;
        if (data.correct) {
            gameStats.correct++;
        } else {
            gameStats.wrong++;
        }
        gameStats.points += data.points || 0;
        
        // Tägliche Stats
        if (!this.stats.daily[today]) {
            this.stats.daily[today] = { rounds: 0, correct: 0, wrong: 0, points: 0 };
        }
        this.stats.daily[today].rounds++;
        this.stats.daily[today].correct += data.correct ? 1 : 0;
        this.stats.daily[today].wrong += data.correct ? 0 : 1;
        this.stats.daily[today].points += data.points || 0;
        
        // Aktivität hinzufügen
        this.stats.activities.unshift({
            type: 'answer',
            game: game,
            question: data.question,
            answer: data.answer,
            userAnswer: data.userAnswer,
            correct: data.correct,
            points: data.points || 0,
            timestamp: Date.now()
        });
        
        // Max 100 Aktivitäten behalten
        if (this.stats.activities.length > 100) {
            this.stats.activities = this.stats.activities.slice(0, 100);
        }
        
        this.saveStats();
    }

    /**
     * Spiel beendet
     */
    trackGameEnd(game, score, totalQuestions, correctCount) {
        const gameStats = this.stats.games[game];
        
        // Beste Punktzahl aktualisieren
        if (score > gameStats.bestScore) {
            gameStats.bestScore = score;
        }
        
        // Durchschnitt berechnen
        const totalGames = gameStats.games;
        gameStats.averageScore = Math.round((gameStats.averageScore * (totalGames - 1) + score) / totalGames);
        
        // Beste Serie für dieses Spiel
        if (this.stats.global.currentStreak > gameStats.bestStreak) {
            gameStats.bestStreak = this.stats.global.currentStreak;
        }
        
        // Perfektes Spiel?
        if (correctCount === totalQuestions && totalQuestions > 0) {
            this.stats.global.perfectGames++;
        }
        
        // Spiel-Ende als Aktivität
        this.stats.activities.unshift({
            type: 'game',
            game: game,
            question: `Spiel beendet: ${score} Punkte`,
            correct: correctCount === totalQuestions,
            points: score,
            timestamp: Date.now()
        });
        
        this.saveStats();
    }

    // ==========================================
    // EXPORT & RESET
    // ==========================================

    /**
     * Statistiken exportieren
     */
    exportStats() {
        const exportData = {
            exportDate: new Date().toISOString(),
            statistics: this.stats
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `aut-quiz-statistik-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    /**
     * Reset bestätigen
     */
    confirmReset() {
        if (confirm('Möchtest du wirklich alle Statistiken zurücksetzen? Diese Aktion kann nicht rückgängig gemacht werden.')) {
            this.resetStats();
        }
    }

    /**
     * Statistiken zurücksetzen
     */
    resetStats() {
        this.stats = this.getDefaultStats();
        this.saveStats();
        this.updateDisplay();
        
        // Charts neu initialisieren
        if (this.charts.distribution) this.charts.distribution.destroy();
        if (this.charts.weekly) this.charts.weekly.destroy();
        this.initCharts();
        
        alert('Statistiken wurden zurückgesetzt.');
    }
}

// Globale Instanz erstellen
const statsManager = new StatsManager();

// Für andere Skripte verfügbar machen
window.statsManager = statsManager;
