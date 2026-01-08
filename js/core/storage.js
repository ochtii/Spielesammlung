/**
 * Storage Module - LocalStorage Wrapper
 * Provides type-safe access to localStorage
 */
const Storage = {
    /**
     * Get value from storage
     * @param {string} key 
     * @param {*} defaultValue 
     * @returns {*}
     */
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            if (item === null) return defaultValue;
            return JSON.parse(item);
        } catch {
            return defaultValue;
        }
    },

    /**
     * Set value in storage
     * @param {string} key 
     * @param {*} value 
     */
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('Storage.set failed:', e);
        }
    },

    /**
     * Remove item from storage
     * @param {string} key 
     */
    remove(key) {
        localStorage.removeItem(key);
    },

    /**
     * Clear all storage
     */
    clear() {
        localStorage.clear();
    },

    /**
     * Get all data as object
     * @returns {Object}
     */
    getAll() {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            data[key] = this.get(key);
        }
        return data;
    }
};

// Export for modules
if (typeof module !== 'undefined') module.exports = Storage;
