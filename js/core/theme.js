/**
 * Theme Module - Theme & Appearance Management
 */
const Theme = {
    STORAGE_KEYS: {
        theme: 'theme',
        fontScale: 'fontScale',
        accentColor: 'accentColor'
    },

    /**
     * Initialize theme settings
     */
    init() {
        this.applyTheme();
        this.applyFontScale();
        this.applyAccentColor();
    },

    /**
     * Get current theme
     * @returns {'light'|'dark'|'auto'}
     */
    getTheme() {
        return Storage.get(this.STORAGE_KEYS.theme, 'light');
    },

    /**
     * Set theme
     * @param {'light'|'dark'|'auto'} theme 
     */
    setTheme(theme) {
        Storage.set(this.STORAGE_KEYS.theme, theme);
        this.applyTheme();
    },

    /**
     * Apply current theme to document
     */
    applyTheme() {
        const theme = this.getTheme();
        let effectiveTheme = theme;

        if (theme === 'auto') {
            effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
                ? 'dark' 
                : 'light';
        }

        document.documentElement.setAttribute('data-theme', effectiveTheme);
    },

    /**
     * Toggle between light and dark
     */
    toggle() {
        const current = this.getTheme();
        this.setTheme(current === 'dark' ? 'light' : 'dark');
    },

    /**
     * Get font scale
     * @returns {number} Scale factor (0.875, 1, 1.125)
     */
    getFontScale() {
        return Storage.get(this.STORAGE_KEYS.fontScale, 1);
    },

    /**
     * Set font scale
     * @param {number} scale 
     */
    setFontScale(scale) {
        Storage.set(this.STORAGE_KEYS.fontScale, scale);
        this.applyFontScale();
    },

    /**
     * Apply font scale to document
     */
    applyFontScale() {
        const scale = this.getFontScale();
        document.documentElement.style.setProperty('--font-scale', scale);
    },

    /**
     * Get accent color
     * @returns {string} Hex color
     */
    getAccentColor() {
        return Storage.get(this.STORAGE_KEYS.accentColor, '#ed2939');
    },

    /**
     * Set accent color
     * @param {string} color Hex color
     */
    setAccentColor(color) {
        Storage.set(this.STORAGE_KEYS.accentColor, color);
        this.applyAccentColor();
    },

    /**
     * Apply accent color to document
     */
    applyAccentColor() {
        const color = this.getAccentColor();
        document.documentElement.style.setProperty('--color-primary', color);
        // Generate hover color (darker)
        const hoverColor = this.adjustBrightness(color, -15);
        document.documentElement.style.setProperty('--color-primary-hover', hoverColor);
        // Generate light color
        const lightColor = color + '1a'; // 10% opacity
        document.documentElement.style.setProperty('--color-primary-light', lightColor);
    },

    /**
     * Adjust color brightness
     * @param {string} hex 
     * @param {number} percent 
     * @returns {string}
     */
    adjustBrightness(hex, percent) {
        const num = parseInt(hex.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.max(0, Math.min(255, (num >> 16) + amt));
        const G = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amt));
        const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
        return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
    }
};
