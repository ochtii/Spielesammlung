/**
 * AUT Quiz - Hauptspiel Script
 */

// ============================================
// GAME STATE
// ============================================

const GameState = {
    currentGame: null,
    questions: [],
    currentIndex: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    startTime: null,
    timerInterval: null
};

// ============================================
// GAME DATA
// ============================================

const districtData = [
    // Burgenland
    { code: 'E', name: 'Eisenstadt', state: 'Burgenland' },
    { code: 'EU', name: 'Eisenstadt-Umgebung', state: 'Burgenland' },
    { code: 'GS', name: 'Güssing', state: 'Burgenland' },
    { code: 'JE', name: 'Jennersdorf', state: 'Burgenland' },
    { code: 'MA', name: 'Mattersburg', state: 'Burgenland' },
    { code: 'ND', name: 'Neusiedl am See', state: 'Burgenland' },
    { code: 'OP', name: 'Oberpullendorf', state: 'Burgenland' },
    { code: 'OW', name: 'Oberwart', state: 'Burgenland' },
    // Kärnten
    { code: 'K', name: 'Klagenfurt', state: 'Kärnten' },
    { code: 'VI', name: 'Villach', state: 'Kärnten' },
    { code: 'SP', name: 'Spittal an der Drau', state: 'Kärnten' },
    { code: 'HE', name: 'Hermagor', state: 'Kärnten' },
    { code: 'FE', name: 'Feldkirchen', state: 'Kärnten' },
    { code: 'SV', name: 'Sankt Veit an der Glan', state: 'Kärnten' },
    { code: 'VK', name: 'Völkermarkt', state: 'Kärnten' },
    { code: 'WO', name: 'Wolfsberg', state: 'Kärnten' },
    // Niederösterreich
    { code: 'AM', name: 'Amstetten', state: 'Niederösterreich' },
    { code: 'BN', name: 'Baden', state: 'Niederösterreich' },
    { code: 'BL', name: 'Bruck an der Leitha', state: 'Niederösterreich' },
    { code: 'GD', name: 'Gmünd', state: 'Niederösterreich' },
    { code: 'GF', name: 'Gänserndorf', state: 'Niederösterreich' },
    { code: 'HL', name: 'Hollabrunn', state: 'Niederösterreich' },
    { code: 'HO', name: 'Horn', state: 'Niederösterreich' },
    { code: 'KR', name: 'Krems', state: 'Niederösterreich' },
    { code: 'KO', name: 'Korneuburg', state: 'Niederösterreich' },
    { code: 'LF', name: 'Lilienfeld', state: 'Niederösterreich' },
    { code: 'ME', name: 'Melk', state: 'Niederösterreich' },
    { code: 'MI', name: 'Mistelbach', state: 'Niederösterreich' },
    { code: 'MD', name: 'Mödling', state: 'Niederösterreich' },
    { code: 'NK', name: 'Neunkirchen', state: 'Niederösterreich' },
    { code: 'P', name: 'Sankt Pölten', state: 'Niederösterreich' },
    { code: 'PL', name: 'Sankt Pölten-Land', state: 'Niederösterreich' },
    { code: 'SB', name: 'Scheibbs', state: 'Niederösterreich' },
    { code: 'TU', name: 'Tulln', state: 'Niederösterreich' },
    { code: 'WB', name: 'Wiener Neustadt', state: 'Niederösterreich' },
    { code: 'WT', name: 'Waidhofen an der Thaya', state: 'Niederösterreich' },
    { code: 'ZT', name: 'Zwettl', state: 'Niederösterreich' },
    // Oberösterreich
    { code: 'BR', name: 'Braunau am Inn', state: 'Oberösterreich' },
    { code: 'EF', name: 'Eferding', state: 'Oberösterreich' },
    { code: 'FR', name: 'Freistadt', state: 'Oberösterreich' },
    { code: 'GM', name: 'Gmunden', state: 'Oberösterreich' },
    { code: 'GR', name: 'Grieskirchen', state: 'Oberösterreich' },
    { code: 'KI', name: 'Kirchdorf', state: 'Oberösterreich' },
    { code: 'L', name: 'Linz', state: 'Oberösterreich' },
    { code: 'LL', name: 'Linz-Land', state: 'Oberösterreich' },
    { code: 'PE', name: 'Perg', state: 'Oberösterreich' },
    { code: 'RI', name: 'Ried im Innkreis', state: 'Oberösterreich' },
    { code: 'RO', name: 'Rohrbach', state: 'Oberösterreich' },
    { code: 'SD', name: 'Schärding', state: 'Oberösterreich' },
    { code: 'SE', name: 'Steyr-Land', state: 'Oberösterreich' },
    { code: 'SR', name: 'Steyr', state: 'Oberösterreich' },
    { code: 'UU', name: 'Urfahr-Umgebung', state: 'Oberösterreich' },
    { code: 'VB', name: 'Vöcklabruck', state: 'Oberösterreich' },
    { code: 'WE', name: 'Wels', state: 'Oberösterreich' },
    { code: 'WL', name: 'Wels-Land', state: 'Oberösterreich' },
    // Salzburg
    { code: 'S', name: 'Salzburg', state: 'Salzburg' },
    { code: 'HA', name: 'Hallein', state: 'Salzburg' },
    { code: 'JO', name: 'Sankt Johann im Pongau', state: 'Salzburg' },
    { code: 'TA', name: 'Tamsweg', state: 'Salzburg' },
    { code: 'ZE', name: 'Zell am See', state: 'Salzburg' },
    // Steiermark
    { code: 'G', name: 'Graz', state: 'Steiermark' },
    { code: 'GU', name: 'Graz-Umgebung', state: 'Steiermark' },
    { code: 'BM', name: 'Bruck-Mürzzuschlag', state: 'Steiermark' },
    { code: 'DL', name: 'Deutschlandsberg', state: 'Steiermark' },
    { code: 'FF', name: 'Feldbach', state: 'Steiermark' },
    { code: 'HB', name: 'Hartberg-Fürstenfeld', state: 'Steiermark' },
    { code: 'JU', name: 'Judenburg', state: 'Steiermark' },
    { code: 'KF', name: 'Knittelfeld', state: 'Steiermark' },
    { code: 'LB', name: 'Leibnitz', state: 'Steiermark' },
    { code: 'LN', name: 'Leoben', state: 'Steiermark' },
    { code: 'LI', name: 'Liezen', state: 'Steiermark' },
    { code: 'MU', name: 'Murau', state: 'Steiermark' },
    { code: 'MT', name: 'Murtal', state: 'Steiermark' },
    { code: 'RA', name: 'Radkersburg', state: 'Steiermark' },
    { code: 'VO', name: 'Voitsberg', state: 'Steiermark' },
    { code: 'WZ', name: 'Weiz', state: 'Steiermark' },
    // Tirol
    { code: 'I', name: 'Innsbruck', state: 'Tirol' },
    { code: 'IL', name: 'Innsbruck-Land', state: 'Tirol' },
    { code: 'IM', name: 'Imst', state: 'Tirol' },
    { code: 'KB', name: 'Kitzbühel', state: 'Tirol' },
    { code: 'KU', name: 'Kufstein', state: 'Tirol' },
    { code: 'LA', name: 'Landeck', state: 'Tirol' },
    { code: 'LZ', name: 'Lienz', state: 'Tirol' },
    { code: 'RE', name: 'Reutte', state: 'Tirol' },
    { code: 'SZ', name: 'Schwaz', state: 'Tirol' },
    // Vorarlberg
    { code: 'B', name: 'Bregenz', state: 'Vorarlberg' },
    { code: 'DO', name: 'Dornbirn', state: 'Vorarlberg' },
    { code: 'FK', name: 'Feldkirch', state: 'Vorarlberg' },
    { code: 'BZ', name: 'Bludenz', state: 'Vorarlberg' },
    // Wien
    { code: 'W', name: 'Wien', state: 'Wien' }
];

const stateCapitals = [
    { state: 'Burgenland', capital: 'Eisenstadt' },
    { state: 'Kärnten', capital: 'Klagenfurt' },
    { state: 'Niederösterreich', capital: 'St. Pölten' },
    { state: 'Oberösterreich', capital: 'Linz' },
    { state: 'Salzburg', capital: 'Salzburg' },
    { state: 'Steiermark', capital: 'Graz' },
    { state: 'Tirol', capital: 'Innsbruck' },
    { code: 'Vorarlberg', capital: 'Bregenz' },
    { state: 'Wien', capital: 'Wien' }
];

// ============================================
// DOM ELEMENTS
// ============================================

const elements = {
    startScreen: () => document.getElementById('startScreen'),
    gameScreen: () => document.getElementById('gameScreen'),
    resultScreen: () => document.getElementById('resultScreen'),
    questionText: () => document.getElementById('questionText'),
    answersContainer: () => document.getElementById('answersContainer'),
    progressBar: () => document.getElementById('progressBar'),
    currentQuestion: () => document.getElementById('currentQuestion'),
    totalQuestions: () => document.getElementById('totalQuestions'),
    scoreDisplay: () => document.getElementById('scoreDisplay'),
    finalScore: () => document.getElementById('finalScore'),
    finalTotal: () => document.getElementById('finalTotal'),
    finalPercent: () => document.getElementById('finalPercent'),
    streakDisplay: () => document.getElementById('streakDisplay')
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(screenId);
    if (screen) screen.classList.add('active');
}

// ============================================
// GAME LOGIC
// ============================================

function selectGame(gameType) {
    document.querySelectorAll('.game-option').forEach(opt => {
        opt.classList.toggle('selected', opt.dataset.game === gameType);
    });
    GameState.currentGame = gameType;
    checkStartButton();
}

function selectDifficulty(difficulty) {
    document.querySelectorAll('.difficulty-option').forEach(opt => {
        opt.classList.toggle('selected', opt.dataset.difficulty === difficulty);
    });
    GameState.difficulty = difficulty;
    checkStartButton();
}

function checkStartButton() {
    const startBtn = document.getElementById('startGameBtn');
    if (startBtn) {
        startBtn.disabled = !(GameState.currentGame && GameState.difficulty);
    }
}

function generateQuestions(gameType, count = 10) {
    let data = [];
    let questionGenerator;
    
    switch (gameType) {
        case 'kennzeichen':
            data = shuffle(districtData).slice(0, count);
            questionGenerator = (item) => ({
                question: `Welcher Bezirk hat das Kennzeichen "${item.code}"?`,
                correct: item.name,
                options: shuffle([
                    item.name,
                    ...shuffle(districtData.filter(d => d.name !== item.name))
                        .slice(0, 3)
                        .map(d => d.name)
                ])
            });
            break;
            
        case 'hauptstaedte':
            data = shuffle(stateCapitals).slice(0, Math.min(count, 9));
            questionGenerator = (item) => ({
                question: `Was ist die Landeshauptstadt von ${item.state}?`,
                correct: item.capital,
                options: shuffle([
                    item.capital,
                    ...shuffle(stateCapitals.filter(s => s.capital !== item.capital))
                        .slice(0, 3)
                        .map(s => s.capital)
                ])
            });
            break;
            
        case 'welthauptstaedte':
            if (typeof worldCapitals !== 'undefined') {
                data = shuffle(worldCapitals).slice(0, count);
                questionGenerator = (item) => ({
                    question: `${item.emoji} Was ist die Hauptstadt von ${item.country}?`,
                    correct: item.capital,
                    options: shuffle([
                        item.capital,
                        ...shuffle(worldCapitals.filter(c => c.capital !== item.capital))
                            .slice(0, 3)
                            .map(c => c.capital)
                    ])
                });
            }
            break;
            
        default:
            return [];
    }
    
    return data.map(questionGenerator);
}

function startGame() {
    if (!GameState.currentGame) return;
    
    const questionCount = parseInt(localStorage.getItem('questionCount')) || 10;
    GameState.questions = generateQuestions(GameState.currentGame, questionCount);
    GameState.currentIndex = 0;
    GameState.score = 0;
    GameState.streak = 0;
    GameState.bestStreak = 0;
    GameState.startTime = Date.now();
    
    if (elements.totalQuestions()) {
        elements.totalQuestions().textContent = GameState.questions.length;
    }
    
    showScreen('gameScreen');
    showQuestion();
}

function showQuestion() {
    const question = GameState.questions[GameState.currentIndex];
    if (!question) return endGame();
    
    if (elements.questionText()) {
        elements.questionText().textContent = question.question;
    }
    
    if (elements.currentQuestion()) {
        elements.currentQuestion().textContent = GameState.currentIndex + 1;
    }
    
    if (elements.progressBar()) {
        const progress = ((GameState.currentIndex) / GameState.questions.length) * 100;
        elements.progressBar().style.width = `${progress}%`;
    }
    
    if (elements.answersContainer()) {
        elements.answersContainer().innerHTML = question.options.map(option => `
            <button class="answer-btn" onclick="checkAnswer('${option.replace(/'/g, "\\'")}')">
                ${option}
            </button>
        `).join('');
    }
}

function checkAnswer(selected) {
    const question = GameState.questions[GameState.currentIndex];
    const isCorrect = selected === question.correct;
    
    // Visual feedback
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent.trim() === question.correct) {
            btn.classList.add('correct');
        } else if (btn.textContent.trim() === selected && !isCorrect) {
            btn.classList.add('wrong');
        }
    });
    
    if (isCorrect) {
        GameState.score++;
        GameState.streak++;
        if (GameState.streak > GameState.bestStreak) {
            GameState.bestStreak = GameState.streak;
        }
        addPoints(10 + GameState.streak);
    } else {
        GameState.streak = 0;
    }
    
    updateScoreDisplay();
    
    // Next question after delay
    setTimeout(() => {
        GameState.currentIndex++;
        if (GameState.currentIndex < GameState.questions.length) {
            showQuestion();
        } else {
            endGame();
        }
    }, 1000);
}

function updateScoreDisplay() {
    if (elements.scoreDisplay()) {
        elements.scoreDisplay().textContent = GameState.score;
    }
    if (elements.streakDisplay()) {
        elements.streakDisplay().textContent = GameState.streak;
    }
}

function endGame() {
    const total = GameState.questions.length;
    const percent = Math.round((GameState.score / total) * 100);
    
    if (elements.finalScore()) elements.finalScore().textContent = GameState.score;
    if (elements.finalTotal()) elements.finalTotal().textContent = total;
    if (elements.finalPercent()) elements.finalPercent().textContent = percent;
    
    // Save statistics
    saveGameStats(GameState.score, total, GameState.bestStreak);
    
    showScreen('resultScreen');
}

function restartGame() {
    GameState.currentIndex = 0;
    GameState.score = 0;
    GameState.streak = 0;
    showScreen('startScreen');
}

// ============================================
// POINTS & STATISTICS
// ============================================

function addPoints(amount) {
    const current = parseInt(localStorage.getItem('totalPoints')) || 0;
    const newTotal = current + amount;
    localStorage.setItem('totalPoints', newTotal);
    updatePointsDisplay();
}

function saveGameStats(correct, total, bestStreak) {
    const stats = JSON.parse(localStorage.getItem('gameStatistics')) || {
        totalGames: 0,
        totalCorrect: 0,
        totalWrong: 0,
        bestStreak: 0,
        categoryStats: {}
    };
    
    stats.totalGames++;
    stats.totalCorrect += correct;
    stats.totalWrong += (total - correct);
    
    if (bestStreak > stats.bestStreak) {
        stats.bestStreak = bestStreak;
    }
    
    // Category stats
    const category = GameState.currentGame || 'unknown';
    if (!stats.categoryStats[category]) {
        stats.categoryStats[category] = { correct: 0, wrong: 0, games: 0 };
    }
    stats.categoryStats[category].correct += correct;
    stats.categoryStats[category].wrong += (total - correct);
    stats.categoryStats[category].games++;
    
    localStorage.setItem('gameStatistics', JSON.stringify(stats));
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Setup game option clicks
    document.querySelectorAll('.game-option').forEach(opt => {
        opt.addEventListener('click', () => selectGame(opt.dataset.game));
    });
    
    // Setup difficulty option clicks
    document.querySelectorAll('.difficulty-option').forEach(opt => {
        opt.addEventListener('click', () => selectDifficulty(opt.dataset.difficulty));
    });
    
    // Start button
    const startBtn = document.getElementById('startGameBtn');
    if (startBtn) {
        startBtn.addEventListener('click', startGame);
    }
    
    // Restart button
    const restartBtn = document.getElementById('restartBtn');
    if (restartBtn) {
        restartBtn.addEventListener('click', restartGame);
    }
    
    // Back to menu button
    const backBtn = document.getElementById('backToMenuBtn');
    if (backBtn) {
        backBtn.addEventListener('click', restartGame);
    }
});
