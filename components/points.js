/**
 * AUT Quiz - Points Page
 */

document.addEventListener('DOMContentLoaded', () => {
    loadPointsData();
    loadAchievements();
    setupResetButton();
});

// ============================================
// LOAD POINTS DATA
// ============================================

function loadPointsData() {
    const points = parseInt(localStorage.getItem('totalPoints')) || 0;
    const stats = JSON.parse(localStorage.getItem('gameStatistics')) || {
        totalGames: 0,
        totalCorrect: 0,
        totalWrong: 0,
        bestStreak: 0
    };
    
    // Display points
    setText('pointsDisplay', points.toLocaleString('de-DE'));
    
    // High Score (best game)
    const highScore = parseInt(localStorage.getItem('highScore')) || 0;
    setText('highScoreDisplay', highScore);
    
    // Games played
    setText('gamesPlayedDisplay', stats.totalGames);
    
    // Accuracy
    const total = stats.totalCorrect + stats.totalWrong;
    const accuracy = total > 0 ? Math.round((stats.totalCorrect / total) * 100) : 0;
    setText('accuracyDisplay', accuracy + '%');
    
    // Level calculation
    const level = Math.floor(points / 100) + 1;
    setText('levelDisplay', level);
    
    // Level progress
    const progress = points % 100;
    const progressBar = document.getElementById('levelProgress');
    if (progressBar) progressBar.style.width = progress + '%';
    
    setText('levelProgressText', `${progress}/100 bis Level ${level + 1}`);
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

// ============================================
// ACHIEVEMENTS
// ============================================

function loadAchievements() {
    const container = document.getElementById('achievementsList');
    if (!container) return;
    
    const points = parseInt(localStorage.getItem('totalPoints')) || 0;
    const stats = JSON.parse(localStorage.getItem('gameStatistics')) || {
        totalGames: 0,
        totalCorrect: 0,
        bestStreak: 0
    };
    
    const achievements = [
        { 
            name: 'Erster Schritt', 
            desc: 'Erstes Spiel gespielt', 
            icon: 'fa-play', 
            unlocked: stats.totalGames >= 1 
        },
        { 
            name: 'Fleißig', 
            desc: '10 Spiele gespielt', 
            icon: 'fa-fire', 
            unlocked: stats.totalGames >= 10 
        },
        { 
            name: 'Punktejäger', 
            desc: '100 Punkte erreicht', 
            icon: 'fa-star', 
            unlocked: points >= 100 
        },
        { 
            name: 'Experte', 
            desc: '500 Punkte erreicht', 
            icon: 'fa-trophy', 
            unlocked: points >= 500 
        },
        { 
            name: 'Meister', 
            desc: '1000 Punkte erreicht', 
            icon: 'fa-crown', 
            unlocked: points >= 1000 
        },
        { 
            name: 'Perfektionist', 
            desc: '10 richtige Antworten in Folge', 
            icon: 'fa-check-double', 
            unlocked: stats.bestStreak >= 10 
        },
        { 
            name: 'Wissend', 
            desc: '50 richtige Antworten', 
            icon: 'fa-brain', 
            unlocked: stats.totalCorrect >= 50 
        },
        { 
            name: 'Gelehrt', 
            desc: '100 richtige Antworten', 
            icon: 'fa-graduation-cap', 
            unlocked: stats.totalCorrect >= 100 
        }
    ];
    
    container.innerHTML = achievements.map(a => `
        <div class="achievement ${a.unlocked ? 'unlocked' : 'locked'}">
            <div class="achievement-icon">
                <i class="fas ${a.icon}"></i>
            </div>
            <div class="achievement-info">
                <h4>${a.name}</h4>
                <p>${a.desc}</p>
            </div>
            <i class="fas ${a.unlocked ? 'fa-check' : 'fa-lock'} achievement-status"></i>
        </div>
    `).join('');
}

// ============================================
// RESET
// ============================================

function setupResetButton() {
    const btn = document.getElementById('resetPointsBtn');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        if (confirm('Alle Punkte und Fortschritt zurücksetzen?')) {
            localStorage.removeItem('totalPoints');
            localStorage.removeItem('highScore');
            localStorage.removeItem('gameStatistics');
            location.reload();
        }
    });
}
