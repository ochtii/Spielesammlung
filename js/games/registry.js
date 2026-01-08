/**
 * Game Registry - Central registry for all games
 * Makes it easy to add new games
 */
const GameRegistry = {
    games: new Map(),

    /**
     * Register a new game
     * @param {string} id - Unique game identifier
     * @param {Object} game - Game instance or config
     */
    register(id, game) {
        this.games.set(id, game);
    },

    /**
     * Get a game by ID
     * @param {string} id 
     * @returns {Object|null}
     */
    get(id) {
        return this.games.get(id) || null;
    },

    /**
     * Get all registered games
     * @returns {Array}
     */
    getAll() {
        return Array.from(this.games.entries()).map(([id, game]) => ({
            id,
            ...game.config
        }));
    },

    /**
     * Check if a game is registered
     * @param {string} id 
     * @returns {boolean}
     */
    has(id) {
        return this.games.has(id);
    },

    /**
     * Remove a game
     * @param {string} id 
     */
    remove(id) {
        this.games.delete(id);
    },

    /**
     * Clear all games
     */
    clear() {
        this.games.clear();
    }
};
