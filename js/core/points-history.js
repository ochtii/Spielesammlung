/**
 * Points History Module - Punkte-Transaktions-Logging
 * Verfolgt alle Punkte-Transaktionen mit Details
 */
const PointsHistory = {
    // Storage Key
    STORAGE_KEY: 'points_history',
    
    // Maximale Anzahl an Einträgen (um Speicher zu sparen)
    MAX_ENTRIES: 500,

    // Transaktionstypen
    TYPES: {
        GAME_WIN: 'game_win',           // Punkte durch Spielgewinn
        GAME_BONUS: 'game_bonus',       // Bonus-Punkte (Streak, Perfect, etc.)
        ACHIEVEMENT: 'achievement',      // Achievement freigeschaltet
        DAILY_BONUS: 'daily_bonus',     // Täglicher Login-Bonus
        STREAK_BONUS: 'streak_bonus',   // Streak-Bonus
        SPENT: 'spent',                 // Punkte ausgegeben
        CORRECTION: 'correction',       // Manuelle Korrektur
        IMPORT: 'import'                // Durch Import hinzugefügt
    },

    /**
     * Initialisiert das History-System
     */
    init() {
        if (!Storage.get(this.STORAGE_KEY)) {
            Storage.set(this.STORAGE_KEY, []);
        }
    },

    /**
     * Fügt eine neue Transaktion hinzu
     * @param {Object} transaction 
     * @returns {Object} Die erstellte Transaktion
     */
    add(transaction) {
        const history = this.getAll();
        
        const entry = {
            id: this.generateId(),
            timestamp: new Date().toISOString(),
            type: transaction.type || this.TYPES.GAME_WIN,
            amount: transaction.amount || 0,
            balance: this.getCurrentBalance() + (transaction.amount || 0),
            
            // Details
            source: transaction.source || 'Unbekannt',
            gameId: transaction.gameId || null,
            gameName: transaction.gameName || null,
            
            // Zusätzliche Informationen
            details: {
                score: transaction.score || null,
                total: transaction.total || null,
                percentage: transaction.percentage || null,
                streak: transaction.streak || null,
                timeMs: transaction.timeMs || null,
                achievementId: transaction.achievementId || null,
                achievementName: transaction.achievementName || null,
                reason: transaction.reason || null
            },
            
            // Metadaten
            meta: {
                userAgent: navigator.userAgent.substring(0, 100),
                sessionId: this.getSessionId()
            }
        };

        // Am Anfang einfügen (neueste zuerst)
        history.unshift(entry);

        // Auf max Einträge begrenzen
        if (history.length > this.MAX_ENTRIES) {
            history.splice(this.MAX_ENTRIES);
        }

        Storage.set(this.STORAGE_KEY, history);
        
        // Event emittieren
        if (typeof EventBus !== 'undefined') {
            EventBus.emit('POINTS_TRANSACTION', entry);
        }

        return entry;
    },

    /**
     * Loggt Punkte aus einem Spiel
     * @param {Object} gameData 
     */
    logGamePoints(gameData) {
        const { gameId, gameName, score, total, percentage, streak, timeMs, points } = gameData;
        
        if (points <= 0) return null;

        return this.add({
            type: this.TYPES.GAME_WIN,
            amount: points,
            source: gameName || gameId,
            gameId,
            gameName,
            score,
            total,
            percentage,
            streak,
            timeMs,
            reason: `${score}/${total} richtig (${percentage}%)`
        });
    },

    /**
     * Loggt Bonus-Punkte
     * @param {Object} bonusData 
     */
    logBonus(bonusData) {
        const { type, amount, reason, gameId, gameName, streak } = bonusData;
        
        return this.add({
            type: type || this.TYPES.GAME_BONUS,
            amount,
            source: gameName || 'Bonus',
            gameId,
            gameName,
            streak,
            reason
        });
    },

    /**
     * Loggt Achievement-Punkte
     * @param {Object} achievementData 
     */
    logAchievement(achievementData) {
        const { achievementId, achievementName, points } = achievementData;
        
        return this.add({
            type: this.TYPES.ACHIEVEMENT,
            amount: points,
            source: 'Achievement',
            achievementId,
            achievementName,
            reason: `Achievement "${achievementName}" freigeschaltet`
        });
    },

    /**
     * Loggt ausgegebene Punkte
     * @param {Object} spentData 
     */
    logSpent(spentData) {
        const { amount, reason, item } = spentData;
        
        return this.add({
            type: this.TYPES.SPENT,
            amount: -Math.abs(amount), // Immer negativ
            source: item || 'Ausgabe',
            reason
        });
    },

    /**
     * Hole alle Transaktionen
     * @param {number} limit - Optional: Anzahl begrenzen
     * @returns {Array}
     */
    getAll(limit = null) {
        const history = Storage.get(this.STORAGE_KEY, []);
        return limit ? history.slice(0, limit) : history;
    },

    /**
     * Hole Transaktionen nach Typ
     * @param {string} type 
     * @param {number} limit 
     * @returns {Array}
     */
    getByType(type, limit = null) {
        const filtered = this.getAll().filter(t => t.type === type);
        return limit ? filtered.slice(0, limit) : filtered;
    },

    /**
     * Hole Transaktionen eines bestimmten Spiels
     * @param {string} gameId 
     * @param {number} limit 
     * @returns {Array}
     */
    getByGame(gameId, limit = null) {
        const filtered = this.getAll().filter(t => t.gameId === gameId);
        return limit ? filtered.slice(0, limit) : filtered;
    },

    /**
     * Hole Transaktionen eines Zeitraums
     * @param {Date} startDate 
     * @param {Date} endDate 
     * @returns {Array}
     */
    getByDateRange(startDate, endDate) {
        return this.getAll().filter(t => {
            const date = new Date(t.timestamp);
            return date >= startDate && date <= endDate;
        });
    },

    /**
     * Hole Transaktionen von heute
     * @returns {Array}
     */
    getToday() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return this.getByDateRange(today, tomorrow);
    },

    /**
     * Berechnet Statistiken
     * @returns {Object}
     */
    getStats() {
        const history = this.getAll();
        
        const earned = history.filter(t => t.amount > 0);
        const spent = history.filter(t => t.amount < 0);
        
        return {
            totalTransactions: history.length,
            totalEarned: earned.reduce((sum, t) => sum + t.amount, 0),
            totalSpent: Math.abs(spent.reduce((sum, t) => sum + t.amount, 0)),
            earnedCount: earned.length,
            spentCount: spent.length,
            averageEarned: earned.length > 0 
                ? Math.round(earned.reduce((sum, t) => sum + t.amount, 0) / earned.length) 
                : 0,
            biggestWin: earned.length > 0 
                ? Math.max(...earned.map(t => t.amount)) 
                : 0,
            todayEarned: this.getToday().filter(t => t.amount > 0)
                .reduce((sum, t) => sum + t.amount, 0)
        };
    },

    /**
     * Hole aktuellen Punktestand
     * @returns {number}
     */
    getCurrentBalance() {
        return Storage.get('totalPoints', 0);
    },

    /**
     * Generiert eine eindeutige ID
     * @returns {string}
     */
    generateId() {
        return `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },

    /**
     * Hole oder erstelle Session-ID
     * @returns {string}
     */
    getSessionId() {
        let sessionId = sessionStorage.getItem('session_id');
        if (!sessionId) {
            sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
            sessionStorage.setItem('session_id', sessionId);
        }
        return sessionId;
    },

    /**
     * Lösche alle Historie
     */
    clear() {
        Storage.set(this.STORAGE_KEY, []);
    },

    /**
     * Exportiere Historie
     * @returns {Object}
     */
    export() {
        return {
            exportDate: new Date().toISOString(),
            version: '1.0',
            entries: this.getAll(),
            stats: this.getStats()
        };
    },

    /**
     * Importiere Historie
     * @param {Array} entries 
     */
    import(entries) {
        if (!Array.isArray(entries)) return;
        
        const current = this.getAll();
        const merged = [...entries, ...current]
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, this.MAX_ENTRIES);
        
        Storage.set(this.STORAGE_KEY, merged);
    }
};

// Initialisieren wenn DOM ready
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        PointsHistory.init();
    });
}
