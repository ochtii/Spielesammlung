/**
 * App Configuration
 * Central configuration for the application
 */
const AppConfig = {
    // App Info
    name: 'AUT Quiz',
    version: '2.1.0',
    buildDate: '2026-01-08',
    
    // Game Settings
    defaultQuestionCount: 10,
    pointsPerCorrect: 10,
    streakBonus: 5,
    
    // UI Settings
    animationDuration: 300,
    toastDuration: 3000,
    questionDelay: 1000,
    
    // Storage Keys
    storageKeys: {
        theme: 'theme',
        fontScale: 'fontScale',
        accentColor: 'accentColor',
        totalPoints: 'totalPoints',
        gameStats: 'gameStats',
        gameTypeStats: 'gameTypeStats',
        recentGames: 'recentGames',
        cacheBuster: 'cacheBusterEnabled'
    },
    
    // Default Values
    defaults: {
        theme: 'light',
        fontScale: 1,
        accentColor: '#ed2939'
    }
};
