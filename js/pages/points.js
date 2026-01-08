/**
 * Points Page - Geschichte und Transaktions-Anzeige
 */
const PointsPage = {
    ITEMS_PER_PAGE: 20,
    currentPage: 1,
    currentFilter: 'all',
    
    /**
     * Initialisiert die Punkte-Seite
     */
    init() {
        this.loadStats();
        this.renderTodaySummary();
        this.renderHistory();
        this.setupEventListeners();
        
        // Auf neue Transaktionen lauschen
        if (typeof EventBus !== 'undefined') {
            EventBus.on('POINTS_TRANSACTION', () => {
                this.loadStats();
                this.renderTodaySummary();
                this.prependNewItem();
            });
        }
    },
    
    /**
     * Lädt die Statistiken
     */
    loadStats() {
        const stats = PointsHistory.getStats();
        const global = typeof Statistics !== 'undefined' ? Statistics.getGlobal() : {};
        
        // Hero-Wert aktualisieren
        const totalEl = document.getElementById('totalPoints');
        if (totalEl) {
            totalEl.textContent = this.formatNumber(PointsHistory.getCurrentBalance());
        }
        
        // Quick Stats aktualisieren
        this.updateElement('todayEarned', '+' + this.formatNumber(stats.todayEarned));
        this.updateElement('totalEarned', this.formatNumber(stats.totalEarned));
        this.updateElement('totalSpent', this.formatNumber(stats.totalSpent));
        this.updateElement('transactionCount', stats.totalTransactions);
        
        // Legacy Stats (falls vorhanden)
        this.updateElement('totalGames', global.totalGamesPlayed || 0);
        this.updateElement('accuracy', Math.round(global.averageAccuracy || 0) + '%');
        this.updateElement('totalCorrect', global.totalCorrectAnswers || 0);
        this.updateElement('bestStreak', global.bestStreak || 0);
    },
    
    /**
     * Rendert die Heute-Zusammenfassung
     */
    renderTodaySummary() {
        const container = document.getElementById('todaySummary');
        if (!container) return;
        
        const todayTransactions = PointsHistory.getToday();
        const todayEarned = todayTransactions
            .filter(t => t.amount > 0)
            .reduce((sum, t) => sum + t.amount, 0);
        
        container.innerHTML = `
            <div class="today-summary-header">
                <i class="fas fa-calendar-day"></i>
                Heute
            </div>
            <div class="today-summary-content">
                <div class="today-earned">
                    <span class="today-earned-value">+${this.formatNumber(todayEarned)}</span>
                    <span class="today-earned-label">Punkte</span>
                </div>
                <div class="today-transactions">
                    <div class="today-transactions-value">${todayTransactions.length}</div>
                    <div class="today-transactions-label">Transaktionen</div>
                </div>
            </div>
        `;
    },
    
    /**
     * Rendert die History-Liste
     */
    renderHistory() {
        const container = document.getElementById('historyList');
        if (!container) return;
        
        let history = PointsHistory.getAll();
        
        // Filter anwenden
        if (this.currentFilter !== 'all') {
            history = history.filter(t => t.type === this.currentFilter);
        }
        
        // Paginierung
        const items = history.slice(0, this.currentPage * this.ITEMS_PER_PAGE);
        const hasMore = history.length > items.length;
        
        if (items.length === 0) {
            container.innerHTML = `
                <div class="history-empty">
                    <div class="history-empty-icon">
                        <i class="fas fa-receipt"></i>
                    </div>
                    <div class="history-empty-text">Noch keine Transaktionen</div>
                    <div class="history-empty-hint">Spiele ein Quiz um Punkte zu sammeln!</div>
                </div>
            `;
            return;
        }
        
        // Items mit Datumstrennern gruppieren
        let html = '';
        let lastDate = '';
        
        items.forEach((item, index) => {
            const date = this.formatDate(item.timestamp);
            
            // Datumstrenner einfügen
            if (date !== lastDate) {
                html += `<div class="history-date-separator">${date}</div>`;
                lastDate = date;
            }
            
            html += this.renderHistoryItem(item);
        });
        
        // Mehr laden Button
        if (hasMore) {
            html += `
                <button class="history-load-more" id="loadMoreBtn">
                    <i class="fas fa-chevron-down"></i>
                    Mehr laden (${history.length - items.length} weitere)
                </button>
            `;
        }
        
        container.innerHTML = html;
        
        // Event Listener für Items
        container.querySelectorAll('.history-item').forEach(el => {
            el.addEventListener('click', () => {
                const id = el.dataset.id;
                this.showTransactionDetail(id);
            });
        });
        
        // Load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.currentPage++;
                this.renderHistory();
            });
        }
    },
    
    /**
     * Rendert ein einzelnes History-Item
     */
    renderHistoryItem(item) {
        const isPositive = item.amount > 0;
        const icon = this.getTypeIcon(item.type);
        const typeLabel = this.getTypeLabel(item.type);
        
        return `
            <div class="history-item" data-id="${item.id}">
                <div class="history-icon ${item.type}">
                    <i class="fas fa-${icon}"></i>
                </div>
                <div class="history-content">
                    <div class="history-source">${item.source || typeLabel}</div>
                    <div class="history-time">${this.formatTime(item.timestamp)}</div>
                </div>
                <div class="history-amount ${isPositive ? 'positive' : 'negative'}">
                    ${isPositive ? '+' : ''}${this.formatNumber(item.amount)}
                </div>
                <button class="history-info" aria-label="Details anzeigen">
                    <i class="fas fa-info-circle"></i>
                </button>
            </div>
        `;
    },
    
    /**
     * Zeigt die Transaktionsdetails im Modal
     */
    showTransactionDetail(id) {
        const history = PointsHistory.getAll();
        const item = history.find(t => t.id === id);
        
        if (!item) return;
        
        const isPositive = item.amount > 0;
        const typeLabel = this.getTypeLabel(item.type);
        const icon = this.getTypeIcon(item.type);
        
        // Detail-Inhalt zusammenstellen
        let detailRows = [];
        
        // Typ
        detailRows.push({
            icon: 'tag',
            label: 'Typ',
            value: `<span class="transaction-badge ${item.type}"><i class="fas fa-${icon}"></i> ${typeLabel}</span>`
        });
        
        // Zeitpunkt
        detailRows.push({
            icon: 'clock',
            label: 'Zeitpunkt',
            value: this.formatDateTime(item.timestamp)
        });
        
        // Quelle
        if (item.source) {
            detailRows.push({
                icon: 'gamepad',
                label: 'Quelle',
                value: item.source
            });
        }
        
        // Spieldetails
        if (item.details) {
            if (item.details.score !== null && item.details.total !== null) {
                detailRows.push({
                    icon: 'check-double',
                    label: 'Ergebnis',
                    value: `${item.details.score}/${item.details.total} (${item.details.percentage}%)`
                });
            }
            
            if (item.details.streak) {
                detailRows.push({
                    icon: 'fire',
                    label: 'Streak',
                    value: item.details.streak
                });
            }
            
            if (item.details.timeMs) {
                detailRows.push({
                    icon: 'stopwatch',
                    label: 'Zeit',
                    value: this.formatDuration(item.details.timeMs)
                });
            }
            
            if (item.details.achievementName) {
                detailRows.push({
                    icon: 'medal',
                    label: 'Achievement',
                    value: item.details.achievementName
                });
            }
            
            if (item.details.reason) {
                detailRows.push({
                    icon: 'comment',
                    label: 'Grund',
                    value: item.details.reason
                });
            }
        }
        
        // HTML generieren
        const content = `
            <div class="transaction-detail">
                <div class="transaction-amount ${isPositive ? 'positive' : 'negative'}">
                    <span class="transaction-amount-value">${isPositive ? '+' : ''}${this.formatNumber(item.amount)}</span>
                    <span class="transaction-amount-label">Punkte</span>
                </div>
                
                <div class="transaction-info-grid">
                    ${detailRows.map(row => `
                        <div class="transaction-info-row">
                            <span class="transaction-info-label">
                                <i class="fas fa-${row.icon}"></i>
                                ${row.label}
                            </span>
                            <span class="transaction-info-value">${row.value}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="balance-indicator">
                    <i class="fas fa-wallet"></i>
                    Stand nach Transaktion: ${this.formatNumber(item.balance)} Punkte
                </div>
            </div>
        `;
        
        // Modal anzeigen
        Modal.show({
            title: 'Transaktionsdetails',
            icon: 'receipt',
            iconClass: 'text-primary',
            content: content,
            size: 'md'
        });
    },
    
    /**
     * Event Listeners einrichten
     */
    setupEventListeners() {
        // Filter Dropdown
        const filterEl = document.getElementById('historyFilter');
        if (filterEl) {
            filterEl.addEventListener('change', (e) => {
                this.currentFilter = e.target.value;
                this.currentPage = 1;
                this.renderHistory();
            });
        }
    },
    
    /**
     * Fügt ein neues Item am Anfang ein (Animation)
     */
    prependNewItem() {
        const container = document.getElementById('historyList');
        if (!container) return;
        
        const history = PointsHistory.getAll();
        if (history.length === 0) return;
        
        const newItem = history[0];
        const existingFirst = container.querySelector('.history-item');
        
        if (existingFirst && existingFirst.dataset.id === newItem.id) return;
        
        // Komplett neu rendern für korrekte Datumstrenner
        this.renderHistory();
        
        // Erstes Item animieren
        const firstItem = container.querySelector('.history-item');
        if (firstItem) {
            firstItem.classList.add('new');
            setTimeout(() => firstItem.classList.remove('new'), 300);
        }
    },
    
    // === Hilfsfunktionen ===
    
    updateElement(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    },
    
    formatNumber(num) {
        return num.toLocaleString('de-DE');
    },
    
    formatDate(timestamp) {
        const date = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (date.toDateString() === today.toDateString()) {
            return 'Heute';
        }
        if (date.toDateString() === yesterday.toDateString()) {
            return 'Gestern';
        }
        
        return date.toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    },
    
    formatTime(timestamp) {
        return new Date(timestamp).toLocaleTimeString('de-DE', {
            hour: '2-digit',
            minute: '2-digit'
        });
    },
    
    formatDateTime(timestamp) {
        return new Date(timestamp).toLocaleString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    },
    
    formatDuration(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        if (minutes > 0) {
            return `${minutes}:${remainingSeconds.toString().padStart(2, '0')} min`;
        }
        return `${seconds} Sek.`;
    },
    
    getTypeIcon(type) {
        const icons = {
            game_win: 'trophy',
            game_bonus: 'star',
            achievement: 'medal',
            daily_bonus: 'calendar-check',
            streak_bonus: 'fire',
            spent: 'shopping-cart',
            correction: 'edit',
            import: 'download'
        };
        return icons[type] || 'coins';
    },
    
    getTypeLabel(type) {
        const labels = {
            game_win: 'Spielgewinn',
            game_bonus: 'Bonus',
            achievement: 'Achievement',
            daily_bonus: 'Tagesbonus',
            streak_bonus: 'Streak-Bonus',
            spent: 'Ausgegeben',
            correction: 'Korrektur',
            import: 'Import'
        };
        return labels[type] || 'Sonstiges';
    }
};

// Initialisieren wenn DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Nur auf der Punkte-Seite initialisieren
    if (document.body.dataset.page === 'points') {
        PointsPage.init();
    }
});
