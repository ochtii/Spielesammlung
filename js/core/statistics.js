/**
 * Statistics Module - Umfassendes Statistik-System
 * Speichert und verwaltet alle Spielstatistiken unabhängig pro Spiel
 */
const Statistics = {
    // Storage Keys
    KEYS: {
        GLOBAL: 'stats_global',
        GAMES: 'stats_games',
        SESSIONS: 'stats_sessions',
        ACHIEVEMENTS: 'stats_achievements',
        DAILY: 'stats_daily'
    },

    /**
     * Initialisiert das Statistik-System
     */
    init() {
        this.ensureStructure();
        this.checkDailyReset();
    },

    /**
     * Stellt sicher, dass die Datenstruktur existiert
     */
    ensureStructure() {
        // Globale Statistiken
        if (!Storage.get(this.KEYS.GLOBAL)) {
            Storage.set(this.KEYS.GLOBAL, this.getDefaultGlobalStats());
        }

        // Spiel-spezifische Statistiken
        if (!Storage.get(this.KEYS.GAMES)) {
            Storage.set(this.KEYS.GAMES, {});
        }

        // Session-Historie
        if (!Storage.get(this.KEYS.SESSIONS)) {
            Storage.set(this.KEYS.SESSIONS, []);
        }

        // Achievements
        if (!Storage.get(this.KEYS.ACHIEVEMENTS)) {
            Storage.set(this.KEYS.ACHIEVEMENTS, {});
        }

        // Tägliche Statistiken
        if (!Storage.get(this.KEYS.DAILY)) {
            Storage.set(this.KEYS.DAILY, this.getDefaultDailyStats());
        }
    },

    /**
     * Standard-Struktur für globale Statistiken
     */
    getDefaultGlobalStats() {
        return {
            // Allgemeine Counter
            totalGamesPlayed: 0,
            totalQuestionsAnswered: 0,
            totalCorrectAnswers: 0,
            totalWrongAnswers: 0,
            totalPointsEarned: 0,
            totalTimePlayedMs: 0,

            // Streaks
            currentStreak: 0,
            bestStreak: 0,
            currentDailyStreak: 0,
            bestDailyStreak: 0,

            // Zeitstempel
            firstPlayedAt: null,
            lastPlayedAt: null,

            // Durchschnitte (werden berechnet)
            averageAccuracy: 0,
            averageTimePerQuestion: 0,
            averageScorePerGame: 0
        };
    },

    /**
     * Standard-Struktur für spiel-spezifische Statistiken
     */
    getDefaultGameStats(gameId) {
        return {
            gameId: gameId,
            
            // Grundlegende Counter
            timesPlayed: 0,
            questionsAnswered: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            pointsEarned: 0,
            totalTimePlayedMs: 0,

            // Streaks
            currentStreak: 0,
            bestStreak: 0,

            // Beste/Schlechteste Runden
            bestScore: 0,
            bestScoreTotal: 0,
            bestPercentage: 0,
            worstScore: null,
            worstPercentage: 100,

            // Zeitstatistiken
            fastestGameMs: null,
            slowestGameMs: null,
            fastestAnswerMs: null,
            slowestAnswerMs: null,
            averageAnswerTimeMs: 0,

            // Antwort-Tracking (für häufige Fehler)
            answerHistory: {}, // { "frage": { correct: 0, wrong: 0 } }

            // Zeitstempel
            firstPlayedAt: null,
            lastPlayedAt: null,

            // Perfekte Spiele (100%)
            perfectGames: 0
        };
    },

    /**
     * Standard-Struktur für tägliche Statistiken
     */
    getDefaultDailyStats() {
        return {
            date: this.getTodayString(),
            gamesPlayed: 0,
            questionsAnswered: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            pointsEarned: 0,
            timePlayedMs: 0
        };
    },

    /**
     * Prüft und setzt tägliche Statistiken zurück wenn nötig
     */
    checkDailyReset() {
        const daily = Storage.get(this.KEYS.DAILY);
        const today = this.getTodayString();
        
        if (daily.date !== today) {
            // Neuer Tag - Daily Streak aktualisieren
            const global = Storage.get(this.KEYS.GLOBAL);
            
            if (daily.gamesPlayed > 0) {
                // Gestern wurde gespielt
                global.currentDailyStreak++;
                if (global.currentDailyStreak > global.bestDailyStreak) {
                    global.bestDailyStreak = global.currentDailyStreak;
                }
            } else {
                // Gestern wurde nicht gespielt - Streak zurücksetzen
                global.currentDailyStreak = 0;
            }
            
            Storage.set(this.KEYS.GLOBAL, global);
            Storage.set(this.KEYS.DAILY, this.getDefaultDailyStats());
        }
    },

    /**
     * Heutiges Datum als String
     */
    getTodayString() {
        return new Date().toISOString().split('T')[0];
    },

    /**
     * Zeichnet eine beantwortete Frage auf
     * @param {Object} data - { gameId, question, correct, answerTimeMs }
     */
    recordAnswer(data) {
        const { gameId, question, correct, answerTimeMs } = data;

        // Globale Stats
        const global = Storage.get(this.KEYS.GLOBAL);
        global.totalQuestionsAnswered++;
        if (correct) {
            global.totalCorrectAnswers++;
            global.currentStreak++;
            if (global.currentStreak > global.bestStreak) {
                global.bestStreak = global.currentStreak;
            }
        } else {
            global.totalWrongAnswers++;
            global.currentStreak = 0;
        }
        Storage.set(this.KEYS.GLOBAL, global);

        // Spiel-spezifische Stats
        const games = Storage.get(this.KEYS.GAMES);
        if (!games[gameId]) {
            games[gameId] = this.getDefaultGameStats(gameId);
        }
        const gameStats = games[gameId];
        
        gameStats.questionsAnswered++;
        if (correct) {
            gameStats.correctAnswers++;
            gameStats.currentStreak++;
            if (gameStats.currentStreak > gameStats.bestStreak) {
                gameStats.bestStreak = gameStats.currentStreak;
            }
        } else {
            gameStats.wrongAnswers++;
            gameStats.currentStreak = 0;
        }

        // Antwortzeit tracken
        if (answerTimeMs) {
            if (!gameStats.fastestAnswerMs || answerTimeMs < gameStats.fastestAnswerMs) {
                gameStats.fastestAnswerMs = answerTimeMs;
            }
            if (!gameStats.slowestAnswerMs || answerTimeMs > gameStats.slowestAnswerMs) {
                gameStats.slowestAnswerMs = answerTimeMs;
            }
            // Rolling average
            const totalAnswers = gameStats.questionsAnswered;
            gameStats.averageAnswerTimeMs = Math.round(
                ((gameStats.averageAnswerTimeMs * (totalAnswers - 1)) + answerTimeMs) / totalAnswers
            );
        }

        // Fragen-Historie (für häufige Fehler)
        if (!gameStats.answerHistory[question]) {
            gameStats.answerHistory[question] = { correct: 0, wrong: 0 };
        }
        if (correct) {
            gameStats.answerHistory[question].correct++;
        } else {
            gameStats.answerHistory[question].wrong++;
        }

        Storage.set(this.KEYS.GAMES, games);

        // Tägliche Stats
        const daily = Storage.get(this.KEYS.DAILY);
        daily.questionsAnswered++;
        if (correct) {
            daily.correctAnswers++;
        } else {
            daily.wrongAnswers++;
        }
        Storage.set(this.KEYS.DAILY, daily);
    },

    /**
     * Zeichnet ein abgeschlossenes Spiel auf
     * @param {Object} result - { gameId, gameName, score, total, percentage, streak, timeMs, points }
     */
    recordGame(result) {
        const { gameId, gameName, score, total, percentage, streak, timeMs, points } = result;
        const now = Date.now();

        // Globale Stats
        const global = Storage.get(this.KEYS.GLOBAL);
        global.totalGamesPlayed++;
        global.totalTimePlayedMs += timeMs || 0;
        global.totalPointsEarned += points || 0;
        global.lastPlayedAt = now;
        if (!global.firstPlayedAt) {
            global.firstPlayedAt = now;
        }
        
        // Durchschnitte neu berechnen
        global.averageAccuracy = Math.round(
            (global.totalCorrectAnswers / global.totalQuestionsAnswered) * 100
        ) || 0;
        global.averageTimePerQuestion = Math.round(
            global.totalTimePlayedMs / global.totalQuestionsAnswered
        ) || 0;
        global.averageScorePerGame = Math.round(
            global.totalCorrectAnswers / global.totalGamesPlayed
        ) || 0;
        
        Storage.set(this.KEYS.GLOBAL, global);

        // Spiel-spezifische Stats
        const games = Storage.get(this.KEYS.GAMES);
        if (!games[gameId]) {
            games[gameId] = this.getDefaultGameStats(gameId);
        }
        const gameStats = games[gameId];

        gameStats.timesPlayed++;
        gameStats.pointsEarned += points || 0;
        gameStats.totalTimePlayedMs += timeMs || 0;
        gameStats.lastPlayedAt = now;
        if (!gameStats.firstPlayedAt) {
            gameStats.firstPlayedAt = now;
        }

        // Beste/Schlechteste Runden
        if (score > gameStats.bestScore || 
            (score === gameStats.bestScore && total < gameStats.bestScoreTotal)) {
            gameStats.bestScore = score;
            gameStats.bestScoreTotal = total;
        }
        if (percentage > gameStats.bestPercentage) {
            gameStats.bestPercentage = percentage;
        }
        if (gameStats.worstScore === null || score < gameStats.worstScore) {
            gameStats.worstScore = score;
        }
        if (percentage < gameStats.worstPercentage) {
            gameStats.worstPercentage = percentage;
        }

        // Perfekte Spiele
        if (percentage === 100) {
            gameStats.perfectGames++;
        }

        // Zeit-Records
        if (timeMs) {
            if (!gameStats.fastestGameMs || timeMs < gameStats.fastestGameMs) {
                gameStats.fastestGameMs = timeMs;
            }
            if (!gameStats.slowestGameMs || timeMs > gameStats.slowestGameMs) {
                gameStats.slowestGameMs = timeMs;
            }
        }

        Storage.set(this.KEYS.GAMES, games);

        // Session-Historie
        const sessions = Storage.get(this.KEYS.SESSIONS);
        sessions.unshift({
            gameId,
            gameName,
            score,
            total,
            percentage,
            streak,
            timeMs,
            points,
            timestamp: now
        });
        // Maximal 100 Sessions behalten
        Storage.set(this.KEYS.SESSIONS, sessions.slice(0, 100));

        // Tägliche Stats
        const daily = Storage.get(this.KEYS.DAILY);
        daily.gamesPlayed++;
        daily.pointsEarned += points || 0;
        daily.timePlayedMs += timeMs || 0;
        Storage.set(this.KEYS.DAILY, daily);

        // Achievements prüfen
        this.checkAchievements();
    },

    /**
     * Punkte hinzufügen
     * @param {number} amount
     */
    addPoints(amount) {
        const global = Storage.get(this.KEYS.GLOBAL);
        global.totalPointsEarned += amount;
        Storage.set(this.KEYS.GLOBAL, global);

        const daily = Storage.get(this.KEYS.DAILY);
        daily.pointsEarned += amount;
        Storage.set(this.KEYS.DAILY, daily);
    },

    /**
     * Prüft und vergibt Achievements
     */
    checkAchievements() {
        const global = Storage.get(this.KEYS.GLOBAL);
        const games = Storage.get(this.KEYS.GAMES);
        const achievements = Storage.get(this.KEYS.ACHIEVEMENTS);

        // Liste aller möglichen Achievements
        const achievementChecks = [
            { id: 'first_game', name: 'Erster Schritt', check: () => global.totalGamesPlayed >= 1 },
            { id: 'games_10', name: 'Anfänger', check: () => global.totalGamesPlayed >= 10 },
            { id: 'games_50', name: 'Fortgeschritten', check: () => global.totalGamesPlayed >= 50 },
            { id: 'games_100', name: 'Experte', check: () => global.totalGamesPlayed >= 100 },
            { id: 'games_500', name: 'Meister', check: () => global.totalGamesPlayed >= 500 },
            { id: 'streak_5', name: 'Auf Kurs', check: () => global.bestStreak >= 5 },
            { id: 'streak_10', name: 'Unaufhaltsam', check: () => global.bestStreak >= 10 },
            { id: 'streak_25', name: 'Fehlerfrei', check: () => global.bestStreak >= 25 },
            { id: 'streak_50', name: 'Perfektionist', check: () => global.bestStreak >= 50 },
            { id: 'points_100', name: 'Punktesammler', check: () => global.totalPointsEarned >= 100 },
            { id: 'points_1000', name: 'Punktejäger', check: () => global.totalPointsEarned >= 1000 },
            { id: 'points_10000', name: 'Punktekönig', check: () => global.totalPointsEarned >= 10000 },
            { id: 'daily_streak_3', name: 'Regelmäßig', check: () => global.bestDailyStreak >= 3 },
            { id: 'daily_streak_7', name: 'Wochenstreak', check: () => global.bestDailyStreak >= 7 },
            { id: 'daily_streak_30', name: 'Monatsstreak', check: () => global.bestDailyStreak >= 30 },
            { id: 'perfect_game', name: 'Perfektes Spiel', check: () => 
                Object.values(games).some(g => g.perfectGames >= 1) },
            { id: 'perfect_10', name: '10x Perfekt', check: () => 
                Object.values(games).reduce((sum, g) => sum + g.perfectGames, 0) >= 10 },
            { id: 'all_games_played', name: 'Allrounder', check: () => 
                Object.keys(games).length >= 3 }
        ];

        let newAchievements = [];
        
        achievementChecks.forEach(ach => {
            if (!achievements[ach.id] && ach.check()) {
                achievements[ach.id] = {
                    unlockedAt: Date.now(),
                    name: ach.name
                };
                newAchievements.push(ach.name);
            }
        });

        Storage.set(this.KEYS.ACHIEVEMENTS, achievements);

        // Benachrichtigung bei neuen Achievements
        if (newAchievements.length > 0 && typeof Toast !== 'undefined') {
            newAchievements.forEach(name => {
                Toast.success(`🏆 Achievement: ${name}`);
            });
        }

        return newAchievements;
    },

    // ========== GETTER ==========

    /**
     * Holt globale Statistiken
     */
    getGlobal() {
        return Storage.get(this.KEYS.GLOBAL, this.getDefaultGlobalStats());
    },

    /**
     * Holt Statistiken für ein spezifisches Spiel
     * @param {string} gameId
     */
    getGame(gameId) {
        const games = Storage.get(this.KEYS.GAMES, {});
        return games[gameId] || this.getDefaultGameStats(gameId);
    },

    /**
     * Holt alle Spiel-Statistiken
     */
    getAllGames() {
        return Storage.get(this.KEYS.GAMES, {});
    },

    /**
     * Holt Session-Historie
     * @param {number} limit - Optional: Max Anzahl
     */
    getSessions(limit = 50) {
        const sessions = Storage.get(this.KEYS.SESSIONS, []);
        return sessions.slice(0, limit);
    },

    /**
     * Holt tägliche Statistiken
     */
    getDaily() {
        this.checkDailyReset();
        return Storage.get(this.KEYS.DAILY, this.getDefaultDailyStats());
    },

    /**
     * Holt alle Achievements
     */
    getAchievements() {
        return Storage.get(this.KEYS.ACHIEVEMENTS, {});
    },

    /**
     * Holt freigeschaltete Achievements als Array
     */
    getUnlockedAchievements() {
        const achievements = this.getAchievements();
        return Object.entries(achievements).map(([id, data]) => ({
            id,
            ...data
        }));
    },

    /**
     * Holt die schwierigsten Fragen für ein Spiel
     * @param {string} gameId
     * @param {number} limit
     */
    getHardestQuestions(gameId, limit = 5) {
        const gameStats = this.getGame(gameId);
        const history = gameStats.answerHistory;

        return Object.entries(history)
            .map(([question, stats]) => ({
                question,
                correct: stats.correct,
                wrong: stats.wrong,
                total: stats.correct + stats.wrong,
                accuracy: Math.round((stats.correct / (stats.correct + stats.wrong)) * 100)
            }))
            .filter(q => q.total >= 2) // Mindestens 2x beantwortet
            .sort((a, b) => a.accuracy - b.accuracy)
            .slice(0, limit);
    },

    /**
     * Berechnet Gesamtpunkte (Kompatibilität mit altem System)
     */
    getTotalPoints() {
        return this.getGlobal().totalPointsEarned;
    },

    /**
     * Formatiert Zeit in lesbares Format
     * @param {number} ms
     */
    formatTime(ms) {
        if (!ms) return '0s';
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        if (hours > 0) {
            return `${hours}h ${minutes % 60}m`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds % 60}s`;
        } else {
            return `${seconds}s`;
        }
    },

    // ========== RESET ==========

    /**
     * Setzt alle Statistiken zurück
     */
    resetAll() {
        Storage.set(this.KEYS.GLOBAL, this.getDefaultGlobalStats());
        Storage.set(this.KEYS.GAMES, {});
        Storage.set(this.KEYS.SESSIONS, []);
        Storage.set(this.KEYS.ACHIEVEMENTS, {});
        Storage.set(this.KEYS.DAILY, this.getDefaultDailyStats());
    },

    /**
     * Setzt Statistiken für ein spezifisches Spiel zurück
     * @param {string} gameId
     */
    resetGame(gameId) {
        const games = Storage.get(this.KEYS.GAMES, {});
        if (games[gameId]) {
            delete games[gameId];
            Storage.set(this.KEYS.GAMES, games);
        }
    },

    /**
     * Exportiert alle Statistiken als JSON
     */
    exportAll() {
        return {
            global: this.getGlobal(),
            games: this.getAllGames(),
            sessions: this.getSessions(100),
            achievements: this.getAchievements(),
            daily: this.getDaily(),
            exportedAt: new Date().toISOString()
        };
    },

    /**
     * Importiert Statistiken aus JSON
     * @param {Object} data
     */
    importAll(data) {
        if (data.global) Storage.set(this.KEYS.GLOBAL, data.global);
        if (data.games) Storage.set(this.KEYS.GAMES, data.games);
        if (data.sessions) Storage.set(this.KEYS.SESSIONS, data.sessions);
        if (data.achievements) Storage.set(this.KEYS.ACHIEVEMENTS, data.achievements);
        if (data.daily) Storage.set(this.KEYS.DAILY, data.daily);
    }
};

// Auto-Init wenn DOM bereit
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => Statistics.init());
}
