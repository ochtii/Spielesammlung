/**
 * Game Modes - Spielmodi Konfiguration
 */
const GameModes = {
    AMATEUR: {
        id: 'amateur',
        name: 'Amateur Quizzer',
        icon: 'fa-graduation-cap',
        description: '4 Antwortmöglichkeiten',
        inputType: 'choice', // Multiple Choice
        optionCount: 4,
        color: '#30d158' // Grün
    },
    PRO: {
        id: 'pro',
        name: 'Pro Quizzer',
        icon: 'fa-trophy',
        description: 'Texteingabe ohne Hilfe',
        inputType: 'text', // Text Input
        optionCount: 0,
        color: '#ff9500' // Orange
    },
    RAINBOW: {
        id: 'rainbow',
        name: 'Regenbogen Quizzer',
        icon: 'fa-rainbow',
        description: 'Texteingabe, Hinweise kaufbar',
        inputType: 'rainbow', // Text Input with purchasable hints
        optionCount: 0,
        hintCost: 100, // Kosten für 4 Antwortmöglichkeiten
        color: '#af52de' // Lila
    }
};

/**
 * Spiele die Modi unterstützen
 */
const GAMES_WITH_MODES = ['hauptstaedte', 'welthauptstaedte'];

/**
 * Prüft ob ein Spiel Modi unterstützt
 */
function gameSupportsMode(gameId) {
    return GAMES_WITH_MODES.includes(gameId);
}

// Global verfügbar machen
window.GameModes = GameModes;
window.GAMES_WITH_MODES = GAMES_WITH_MODES;
window.gameSupportsMode = gameSupportsMode;
