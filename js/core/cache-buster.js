/**
 * Cache Buster - Force browser to load fresh files
 * Clears all caches and adds version parameters
 */
const CacheBuster = {
    STORAGE_KEY: 'cacheBusterEnabled',
    VERSION_KEY: 'appVersion',
    BUILD_VERSION: '2.1.3', // Sync with AppConfig.version
    
    /**
     * Check if cache busting is enabled
     */
    isEnabled() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        // Default: enabled (true) if not set
        return stored === null ? true : stored === 'true';
    },
    
    /**
     * Enable/disable cache busting
     */
    setEnabled(enabled) {
        localStorage.setItem(this.STORAGE_KEY, enabled.toString());
        if (enabled) {
            this.bustCache();
        }
    },
    
    /**
     * Toggle cache busting
     */
    toggle() {
        const newState = !this.isEnabled();
        this.setEnabled(newState);
        return newState;
    },
    
    /**
     * Get current version
     */
    getVersion() {
        return this.BUILD_VERSION + '_' + Date.now().toString(36);
    },
    
    /**
     * Get stable version for URLs (based on build version)
     */
    getStableVersion() {
        return this.BUILD_VERSION;
    },
    
    /**
     * Initialize cache buster
     */
    init() {
        // Always add version to dynamically loaded resources
        this.patchFetch();
        
        // Check for version change
        const storedVersion = localStorage.getItem(this.VERSION_KEY);
        if (storedVersion !== this.BUILD_VERSION) {
            console.log('CacheBuster: Version change detected', storedVersion, '->', this.BUILD_VERSION);
            localStorage.setItem(this.VERSION_KEY, this.BUILD_VERSION);
            this.bustCache();
        }
        
        if (!this.isEnabled()) {
            console.log('CacheBuster: Disabled');
            return;
        }
        
        console.log('CacheBuster: Active, version:', this.BUILD_VERSION);
    },
    
    /**
     * Patch fetch to add version params
     */
    patchFetch() {
        const originalFetch = window.fetch;
        const self = this;
        
        window.fetch = function(url, options) {
            if (typeof url === 'string' && self.isLocalUrl(url)) {
                url = self.versionUrl(url);
            }
            return originalFetch.call(this, url, options);
        };
    },
    
    /**
     * Check if URL is local (not CDN)
     */
    isLocalUrl(url) {
        return !url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('//');
    },
    
    /**
     * Clear all caches
     */
    async bustCache() {
        try {
            // 1. Clear Service Worker caches
            if ('caches' in window) {
                const cacheNames = await caches.keys();
                await Promise.all(
                    cacheNames.map(name => caches.delete(name))
                );
                console.log('CacheBuster: Service Worker caches cleared');
            }
            
            // 2. Unregister all Service Workers
            if ('serviceWorker' in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                await Promise.all(
                    registrations.map(reg => reg.unregister())
                );
                console.log('CacheBuster: Service Workers unregistered');
            }
            
            // 3. Clear sessionStorage (but keep localStorage settings)
            sessionStorage.clear();
            console.log('CacheBuster: Session storage cleared');
            
            // 4. Set new version marker
            const newVersion = this.getVersion();
            const oldVersion = localStorage.getItem(this.VERSION_KEY);
            
            if (oldVersion !== newVersion) {
                localStorage.setItem(this.VERSION_KEY, newVersion);
            }
            
            console.log('CacheBuster: Cache bust complete, version:', newVersion);
            
        } catch (error) {
            console.error('CacheBuster: Error clearing caches:', error);
        }
    },
    
    /**
     * Force reload with cache bypass
     */
    forceReload() {
        // Clear caches first
        this.bustCache().then(() => {
            // Force hard reload
            location.reload(true);
        });
    },
    
    /**
     * Add version query param to URL
     */
    versionUrl(url) {
        if (!this.isEnabled()) return url;
        
        const separator = url.includes('?') ? '&' : '?';
        return `${url}${separator}v=${this.getVersion()}`;
    }
};

// Auto-init on load
document.addEventListener('DOMContentLoaded', () => {
    CacheBuster.init();
});
