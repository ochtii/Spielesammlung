/**
 * JokerSystem - Erweitertes Joker/Hinweis-System
 * Verschiedene Joker für Amateur und Pro Modi mit Punktekosten
 */
const JokerSystem = {
    // Joker-Definitionen für Amateur-Modus (Multiple Choice)
    AMATEUR_JOKERS: {
        fiftyFifty: {
            id: 'fiftyFifty',
            name: '50:50',
            icon: 'fa-percent',
            description: 'Entfernt 2 falsche Antworten',
            cost: 50,
            color: '#7c3aed'
        },
        removeOne: {
            id: 'removeOne',
            name: '1 Weg',
            icon: 'fa-minus-circle',
            description: 'Entfernt 1 falsche Antwort',
            cost: 25,
            color: '#0ea5e9'
        },
        randomHint: {
            id: 'randomHint',
            name: 'Hinweis',
            icon: 'fa-lightbulb',
            description: 'Zufälliger hilfreicher Hinweis',
            cost: 30,
            color: '#f59e0b'
        }
    },

    // Joker-Definitionen für Pro-Modus (Texteingabe)
    PRO_JOKERS: {
        firstLetter: {
            id: 'firstLetter',
            name: 'Anfang',
            icon: 'fa-font',
            description: 'Zeigt den Anfangsbuchstaben',
            cost: 20,
            color: '#10b981'
        },
        length: {
            id: 'length',
            name: 'Länge',
            icon: 'fa-ruler',
            description: 'Zeigt die Wortlänge',
            cost: 15,
            color: '#06b6d4'
        },
        oneLetter: {
            id: 'oneLetter',
            name: '1 Buchst.',
            icon: 'fa-spell-check',
            description: 'Zeigt einen zufälligen Buchstaben',
            cost: 30,
            color: '#8b5cf6'
        },
        twoLetters: {
            id: 'twoLetters',
            name: '2 Buchst.',
            icon: 'fa-text-width',
            description: 'Zeigt zwei zufällige Buchstaben',
            cost: 50,
            color: '#ec4899'
        },
        randomHint: {
            id: 'randomHint',
            name: 'Hinweis',
            icon: 'fa-lightbulb',
            description: 'Hilfreicher Hinweis zur Antwort',
            cost: 40,
            color: '#f59e0b'
        }
    },

    // Status der verwendeten Joker pro Frage
    usedJokers: {},
    revealedPositions: [], // Für Buchstaben-Joker

    /**
     * Joker für aktuellen Modus holen
     */
    getJokersForMode(mode) {
        if (mode.inputType === 'choice') {
            return this.AMATEUR_JOKERS;
        } else {
            return this.PRO_JOKERS;
        }
    },

    /**
     * Reset für neue Frage
     */
    resetForQuestion() {
        this.usedJokers = {};
        this.revealedPositions = [];
    },

    /**
     * Prüfen ob Joker bereits verwendet
     */
    isUsed(jokerId) {
        return this.usedJokers[jokerId] === true;
    },

    /**
     * Joker als verwendet markieren
     */
    markUsed(jokerId) {
        this.usedJokers[jokerId] = true;
    },

    /**
     * Punkte vom Spieler abziehen
     */
    deductPoints(cost) {
        const currentPoints = Storage.get('totalPoints', 0);
        if (currentPoints < cost) {
            return false;
        }
        Storage.set('totalPoints', currentPoints - cost);
        
        // Log in PointsHistory
        if (typeof PointsHistory !== 'undefined') {
            PointsHistory.logSpent({
                amount: cost,
                reason: 'Joker verwendet',
                item: 'Joker'
            });
        }
        
        return true;
    },

    /**
     * Kann sich der Spieler den Joker leisten?
     */
    canAfford(cost) {
        return Storage.get('totalPoints', 0) >= cost;
    },

    // ==========================================
    // AMATEUR JOKER IMPLEMENTIERUNGEN
    // ==========================================

    /**
     * 50:50 - Entfernt 2 falsche Antworten
     */
    useFiftyFifty(answersGrid, correctAnswer) {
        const buttons = answersGrid.querySelectorAll('.answer-btn:not(.joker-removed)');
        const wrongButtons = Array.from(buttons).filter(btn => 
            btn.dataset.answer !== correctAnswer
        );
        
        const toRemove = wrongButtons.sort(() => Math.random() - 0.5).slice(0, 2);
        toRemove.forEach(btn => {
            btn.classList.add('joker-removed');
            btn.disabled = true;
        });
        
        return true;
    },

    /**
     * 1 Weg - Entfernt 1 falsche Antwort
     */
    useRemoveOne(answersGrid, correctAnswer) {
        const buttons = answersGrid.querySelectorAll('.answer-btn:not(.joker-removed)');
        const wrongButtons = Array.from(buttons).filter(btn => 
            btn.dataset.answer !== correctAnswer
        );
        
        if (wrongButtons.length > 0) {
            const toRemove = wrongButtons[Math.floor(Math.random() * wrongButtons.length)];
            toRemove.classList.add('joker-removed');
            toRemove.disabled = true;
            return true;
        }
        return false;
    },

    /**
     * Random Hint für Amateur - Zeigt einen Hinweis
     */
    useRandomHintAmateur(correctAnswer, questionData) {
        const hints = [];
        
        // Anfangsbuchstabe
        hints.push(`Beginnt mit "${correctAnswer.charAt(0).toUpperCase()}"`);
        
        // Länge
        hints.push(`Hat ${correctAnswer.length} Buchstaben`);
        
        // Enthält bestimmten Buchstaben
        const midChar = correctAnswer.charAt(Math.floor(correctAnswer.length / 2));
        if (midChar.match(/[a-zA-ZäöüÄÖÜß]/)) {
            hints.push(`Enthält den Buchstaben "${midChar.toUpperCase()}"`);
        }
        
        // Endet mit
        hints.push(`Endet mit "${correctAnswer.slice(-2)}"`);
        
        return hints[Math.floor(Math.random() * hints.length)];
    },

    // ==========================================
    // PRO JOKER IMPLEMENTIERUNGEN
    // ==========================================

    /**
     * Anfangsbuchstabe zeigen
     */
    useFirstLetter(correctAnswer) {
        return correctAnswer.charAt(0).toUpperCase();
    },

    /**
     * Wortlänge zeigen
     */
    useLength(correctAnswer) {
        return correctAnswer.length;
    },

    /**
     * 1 zufälligen Buchstaben zeigen
     */
    useOneLetter(correctAnswer) {
        const availablePositions = [];
        for (let i = 0; i < correctAnswer.length; i++) {
            if (!this.revealedPositions.includes(i) && correctAnswer[i].match(/[a-zA-ZäöüÄÖÜß]/)) {
                availablePositions.push(i);
            }
        }
        
        if (availablePositions.length === 0) return null;
        
        const pos = availablePositions[Math.floor(Math.random() * availablePositions.length)];
        this.revealedPositions.push(pos);
        
        return {
            position: pos + 1, // 1-basiert für Anzeige
            letter: correctAnswer[pos].toUpperCase()
        };
    },

    /**
     * 2 zufällige Buchstaben zeigen
     */
    useTwoLetters(correctAnswer) {
        const results = [];
        for (let i = 0; i < 2; i++) {
            const result = this.useOneLetter(correctAnswer);
            if (result) results.push(result);
        }
        return results;
    },

    /**
     * Random Hint für Pro - Hilfreicher Hinweis
     */
    useRandomHintPro(correctAnswer, questionData) {
        const hints = [];
        
        // Vokal-Anzahl
        const vowels = correctAnswer.match(/[aeiouäöü]/gi) || [];
        hints.push(`Enthält ${vowels.length} Vokale`);
        
        // Erster und letzter Buchstabe
        hints.push(`"${correctAnswer[0].toUpperCase()}...${correctAnswer.slice(-1).toUpperCase()}"`);
        
        // Silbenanzahl (grobe Schätzung)
        const syllables = correctAnswer.split(/[aeiouäöü]/i).length - 1;
        if (syllables > 0) {
            hints.push(`Etwa ${Math.max(1, syllables)} Silbe${syllables > 1 ? 'n' : ''}`);
        }
        
        // Großbuchstaben-Info
        if (correctAnswer[0] === correctAnswer[0].toUpperCase()) {
            hints.push('Wird großgeschrieben');
        }
        
        return hints[Math.floor(Math.random() * hints.length)];
    },

    /**
     * Joker-Ergebnis als Template für Anzeige
     */
    formatHintDisplay(jokerId, result, correctAnswer) {
        switch (jokerId) {
            case 'firstLetter':
                return `<div class="hint-reveal"><i class="fas fa-font"></i> Anfangsbuchstabe: <strong>${result}</strong></div>`;
            
            case 'length':
                return `<div class="hint-reveal"><i class="fas fa-ruler"></i> Länge: <strong>${result} Buchstaben</strong></div>`;
            
            case 'oneLetter':
                if (result) {
                    return `<div class="hint-reveal"><i class="fas fa-spell-check"></i> Position ${result.position}: <strong>${result.letter}</strong></div>`;
                }
                return '';
            
            case 'twoLetters':
                if (result && result.length > 0) {
                    const letters = result.map(r => `Pos. ${r.position}: <strong>${r.letter}</strong>`).join(', ');
                    return `<div class="hint-reveal"><i class="fas fa-text-width"></i> ${letters}</div>`;
                }
                return '';
            
            case 'randomHint':
                return `<div class="hint-reveal"><i class="fas fa-lightbulb"></i> ${result}</div>`;
            
            default:
                return '';
        }
    }
};

// Global verfügbar machen
window.JokerSystem = JokerSystem;
