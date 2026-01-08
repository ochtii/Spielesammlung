/**
 * Event Bus - Simple Pub/Sub for App Events
 */
const EventBus = {
    listeners: {},

    /**
     * Subscribe to an event
     * @param {string} event 
     * @param {Function} callback 
     * @returns {Function} Unsubscribe function
     */
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
        
        // Return unsubscribe function
        return () => this.off(event, callback);
    },

    /**
     * Unsubscribe from an event
     * @param {string} event 
     * @param {Function} callback 
     */
    off(event, callback) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    },

    /**
     * Emit an event
     * @param {string} event 
     * @param {*} data 
     */
    emit(event, data) {
        if (!this.listeners[event]) return;
        this.listeners[event].forEach(callback => {
            try {
                callback(data);
            } catch (e) {
                console.error(`Error in event listener for "${event}":`, e);
            }
        });
    },

    /**
     * Subscribe to an event once
     * @param {string} event 
     * @param {Function} callback 
     */
    once(event, callback) {
        const unsubscribe = this.on(event, (data) => {
            unsubscribe();
            callback(data);
        });
    }
};

// Event Types
const Events = {
    // Game Events
    GAME_START: 'game:start',
    GAME_END: 'game:end',
    QUESTION_ANSWERED: 'question:answered',
    SCORE_UPDATE: 'score:update',
    
    // UI Events
    THEME_CHANGE: 'theme:change',
    TOAST_SHOW: 'toast:show',
    MODAL_OPEN: 'modal:open',
    MODAL_CLOSE: 'modal:close',
    
    // Data Events
    POINTS_UPDATE: 'points:update',
    STATS_UPDATE: 'stats:update'
};
