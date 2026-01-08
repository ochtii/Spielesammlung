/**
 * AUT Quiz - Statistics Page
 */

document.addEventListener('DOMContentLoaded', () => {
    loadStatsOverview();
    initCharts();
    setupResetStats();
});

// ============================================
// STATS OVERVIEW
// ============================================

function loadStatsOverview() {
    const stats = JSON.parse(localStorage.getItem('gameStatistics')) || {
        totalGames: 0,
        totalCorrect: 0,
        totalWrong: 0,
        bestStreak: 0
    };
    
    setText('statsTotalGames', stats.totalGames);
    setText('statsTotalCorrect', stats.totalCorrect);
    setText('statsBestStreak', stats.bestStreak);
    
    const total = stats.totalCorrect + stats.totalWrong;
    const accuracy = total > 0 ? Math.round((stats.totalCorrect / total) * 100) : 0;
    setText('statsAccuracy', accuracy + '%');
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

// ============================================
// CHARTS
// ============================================

function initCharts() {
    if (typeof Chart === 'undefined') return;
    
    const stats = JSON.parse(localStorage.getItem('gameStatistics')) || {
        totalCorrect: 0,
        totalWrong: 0,
        categoryStats: {}
    };
    
    // Accuracy Doughnut Chart
    const doughnutCtx = document.getElementById('accuracyChart')?.getContext('2d');
    if (doughnutCtx) {
        new Chart(doughnutCtx, {
            type: 'doughnut',
            data: {
                labels: ['Richtig', 'Falsch'],
                datasets: [{
                    data: [
                        stats.totalCorrect || 1, 
                        stats.totalWrong || 0
                    ],
                    backgroundColor: ['#22c55e', '#ef4444'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Category Bar Chart
    const barCtx = document.getElementById('categoryChart')?.getContext('2d');
    if (barCtx) {
        const categories = Object.keys(stats.categoryStats || {});
        const labels = categories.length > 0 ? categories.map(formatCategory) : ['Keine Daten'];
        const correctData = categories.map(c => stats.categoryStats[c]?.correct || 0);
        const wrongData = categories.map(c => stats.categoryStats[c]?.wrong || 0);
        
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Richtig',
                        data: correctData.length > 0 ? correctData : [0],
                        backgroundColor: '#22c55e'
                    },
                    {
                        label: 'Falsch',
                        data: wrongData.length > 0 ? wrongData : [0],
                        backgroundColor: '#ef4444'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

function formatCategory(key) {
    const names = {
        'kennzeichen': 'Kennzeichen',
        'hauptstaedte': 'Hauptstädte',
        'welthauptstaedte': 'Welt-Hauptstädte',
        'wappen': 'Wappen'
    };
    return names[key] || key;
}

// ============================================
// RESET
// ============================================

function setupResetStats() {
    const btn = document.getElementById('resetStatsBtn');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        if (confirm('Alle Statistiken zurücksetzen?')) {
            localStorage.removeItem('gameStatistics');
            location.reload();
        }
    });
}
