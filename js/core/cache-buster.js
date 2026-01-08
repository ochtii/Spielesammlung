/**
 * Cache Buster - Force browser to load fresh files
 * Clears all caches and adds version parameters with full logging
 */
const CacheBuster = {
    STORAGE_KEY: 'cacheBusterEnabled',
    VERSION_KEY: 'appVersion',
    LOG_KEY: 'cacheBusterLogs',
    BUILD_VERSION: '2.1.5',
    MAX_LOGS: 100,
    
    // Session unique ID for tracking
    sessionId: null,
    
    /**
     * Initialize cache buster
     */
    init() {
        this.sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        this.log('INIT', 'CacheBuster initialized', { 
            version: this.BUILD_VERSION, 
            sessionId: this.sessionId,
            enabled: this.isEnabled(),
            userAgent: navigator.userAgent.substring(0, 50)
        });
        
        // Always patch fetch for cache-busting URLs
        this.patchFetch();
        this.patchXHR();
        
        // Check for version change
        const storedVersion = localStorage.getItem(this.VERSION_KEY);
        if (storedVersion !== this.BUILD_VERSION) {
            this.log('VERSION_CHANGE', 'Version change detected', { 
                from: storedVersion || 'none', 
                to: this.BUILD_VERSION 
            });
            localStorage.setItem(this.VERSION_KEY, this.BUILD_VERSION);
            this.bustCache();
        }
        
        // Always bust on page load for 100% freshness
        this.bustOnLoad();
        
        this.log('READY', 'CacheBuster ready', { 
            cacheNames: 'pending check',
            timestamp: new Date().toISOString()
        });
    },
    
    /**
     * Check if cache busting is enabled
     */
    isEnabled() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored === null ? true : stored === 'true';
    },
    
    /**
     * Enable/disable cache busting
     */
    setEnabled(enabled) {
        this.log('CONFIG', enabled ? 'CacheBuster enabled' : 'CacheBuster disabled');
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
     * Get unique version for each request (ensures 100% cache miss)
     */
    getVersion() {
        return this.BUILD_VERSION + '_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 4);
    },
    
    /**
     * Get stable version for URLs
     */
    getStableVersion() {
        return this.BUILD_VERSION;
    },
    
    /**
     * Bust cache on every page load
     */
    async bustOnLoad() {
        this.log('BUST_START', 'Starting cache bust on load');
        
        // Set no-cache headers via meta tags
        this.addNoCacheMetaTags();
        
        // Clear browser caches
        await this.clearAllCaches();
        
        // Force reload CSS with new version
        this.refreshStylesheets();
        
        this.log('BUST_COMPLETE', 'Cache bust completed');
    },
    
    /**
     * Add no-cache meta tags to head
     */
    addNoCacheMetaTags() {
        const head = document.head;
        const metas = [
            { 'http-equiv': 'Cache-Control', content: 'no-cache, no-store, must-revalidate' },
            { 'http-equiv': 'Pragma', content: 'no-cache' },
            { 'http-equiv': 'Expires', content: '0' }
        ];
        
        metas.forEach(attrs => {
            // Remove existing
            const existing = head.querySelector(`meta[http-equiv="${attrs['http-equiv']}"]`);
            if (existing) existing.remove();
            
            // Add new
            const meta = document.createElement('meta');
            Object.keys(attrs).forEach(key => meta.setAttribute(key, attrs[key]));
            head.appendChild(meta);
        });
        
        this.log('META_TAGS', 'No-cache meta tags added');
    },
    
    /**
     * Refresh all stylesheets with cache-busting params
     */
    refreshStylesheets() {
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        let refreshed = 0;
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http')) {
                const newHref = this.versionUrl(href.split('?')[0]);
                link.setAttribute('href', newHref);
                refreshed++;
                this.log('CSS_REFRESH', 'Refreshed stylesheet', { original: href, new: newHref });
            }
        });
        
        this.log('CSS_COMPLETE', `Refreshed ${refreshed} stylesheets`);
    },
    
    /**
     * Patch fetch to add version params
     */
    patchFetch() {
        if (window._fetchPatched) return;
        
        const originalFetch = window.fetch;
        const self = this;
        
        window.fetch = function(url, options = {}) {
            if (typeof url === 'string' && self.isLocalUrl(url)) {
                const newUrl = self.versionUrl(url);
                self.log('FETCH', 'Patched fetch URL', { original: url, patched: newUrl });
                
                // Add cache-busting headers
                options.cache = 'no-store';
                options.headers = {
                    ...options.headers,
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache'
                };
                
                return originalFetch.call(this, newUrl, options);
            }
            return originalFetch.call(this, url, options);
        };
        
        window._fetchPatched = true;
        this.log('PATCH', 'Fetch API patched');
    },
    
    /**
     * Patch XMLHttpRequest to add version params
     */
    patchXHR() {
        if (window._xhrPatched) return;
        
        const self = this;
        const originalOpen = XMLHttpRequest.prototype.open;
        
        XMLHttpRequest.prototype.open = function(method, url, ...args) {
            if (typeof url === 'string' && self.isLocalUrl(url)) {
                url = self.versionUrl(url);
                self.log('XHR', 'Patched XHR URL', { method, url });
            }
            return originalOpen.call(this, method, url, ...args);
        };
        
        window._xhrPatched = true;
        this.log('PATCH', 'XHR API patched');
    },
    
    /**
     * Check if URL is local (not CDN)
     */
    isLocalUrl(url) {
        return !url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('//') && !url.startsWith('data:');
    },
    
    /**
     * Clear all browser caches
     */
    async clearAllCaches() {
        const results = {
            serviceWorkerCaches: 0,
            serviceWorkers: 0,
            sessionStorage: false
        };
        
        try {
            // 1. Clear Service Worker caches
            if ('caches' in window) {
                const cacheNames = await caches.keys();
                results.serviceWorkerCaches = cacheNames.length;
                await Promise.all(cacheNames.map(name => {
                    this.log('CACHE_DELETE', 'Deleting cache', { name });
                    return caches.delete(name);
                }));
            }
            
            // 2. Unregister all Service Workers
            if ('serviceWorker' in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                results.serviceWorkers = registrations.length;
                await Promise.all(registrations.map(reg => {
                    this.log('SW_UNREGISTER', 'Unregistering service worker', { scope: reg.scope });
                    return reg.unregister();
                }));
            }
            
            // 3. Clear sessionStorage
            const sessionKeys = Object.keys(sessionStorage);
            sessionStorage.clear();
            results.sessionStorage = true;
            this.log('SESSION_CLEAR', 'Session storage cleared', { keysCleared: sessionKeys.length });
            
        } catch (error) {
            this.log('ERROR', 'Error clearing caches', { error: error.message });
        }
        
        this.log('CLEAR_COMPLETE', 'All caches cleared', results);
        return results;
    },
    
    /**
     * Full cache bust
     */
    async bustCache() {
        this.log('FULL_BUST', 'Starting full cache bust');
        await this.clearAllCaches();
        this.refreshStylesheets();
        this.log('FULL_BUST_COMPLETE', 'Full cache bust completed');
    },
    
    /**
     * Force reload with cache bypass
     */
    forceReload() {
        this.log('FORCE_RELOAD', 'Forcing hard reload');
        this.bustCache().then(() => {
            // Use cache-busting reload
            window.location.href = window.location.href.split('?')[0] + '?_cb=' + Date.now();
        });
    },
    
    /**
     * Add version query param to URL
     */
    versionUrl(url) {
        // Remove existing version params
        const baseUrl = url.split('?')[0];
        const existingParams = url.includes('?') ? url.split('?')[1] : '';
        const params = new URLSearchParams(existingParams);
        
        // Remove old version params
        params.delete('v');
        params.delete('_cb');
        
        // Add new unique version
        params.set('_cb', this.getVersion());
        
        return `${baseUrl}?${params.toString()}`;
    },
    
    // ========================================
    // LOGGING SYSTEM
    // ========================================
    
    /**
     * Log an action
     */
    log(type, message, data = null) {
        const entry = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
            timestamp: new Date().toISOString(),
            type,
            message,
            data,
            sessionId: this.sessionId,
            url: window.location.pathname
        };
        
        // Console output
        const style = this.getLogStyle(type);
        console.log(
            `%c[CacheBuster]%c ${type}: ${message}`,
            'background: #ed2939; color: white; padding: 2px 6px; border-radius: 3px;',
            style,
            data || ''
        );
        
        // Save to storage
        this.saveLog(entry);
        
        return entry;
    },
    
    /**
     * Get console style for log type
     */
    getLogStyle(type) {
        const styles = {
            INIT: 'color: #0a84ff; font-weight: bold;',
            VERSION_CHANGE: 'color: #ff9500; font-weight: bold;',
            BUST_START: 'color: #af52de;',
            BUST_COMPLETE: 'color: #30d158; font-weight: bold;',
            FULL_BUST: 'color: #ff453a; font-weight: bold;',
            FULL_BUST_COMPLETE: 'color: #30d158; font-weight: bold;',
            CACHE_DELETE: 'color: #ff6b6b;',
            SW_UNREGISTER: 'color: #ff6b6b;',
            SESSION_CLEAR: 'color: #ffd60a;',
            CLEAR_COMPLETE: 'color: #30d158;',
            CSS_REFRESH: 'color: #5ac8fa;',
            CSS_COMPLETE: 'color: #30d158;',
            FETCH: 'color: #64d2ff;',
            XHR: 'color: #64d2ff;',
            PATCH: 'color: #bf5af2;',
            META_TAGS: 'color: #a1a1a6;',
            READY: 'color: #30d158; font-weight: bold;',
            FORCE_RELOAD: 'color: #ff453a; font-weight: bold;',
            CONFIG: 'color: #ffd60a;',
            ERROR: 'color: #ff453a; font-weight: bold;'
        };
        return styles[type] || 'color: inherit;';
    },
    
    /**
     * Save log entry to localStorage
     */
    saveLog(entry) {
        try {
            let logs = this.getLogs();
            logs.unshift(entry);
            
            // Keep only last MAX_LOGS entries
            if (logs.length > this.MAX_LOGS) {
                logs = logs.slice(0, this.MAX_LOGS);
            }
            
            localStorage.setItem(this.LOG_KEY, JSON.stringify(logs));
        } catch (e) {
            // Storage full - clear old logs
            localStorage.setItem(this.LOG_KEY, JSON.stringify([entry]));
        }
    },
    
    /**
     * Get all logs from localStorage
     */
    getLogs() {
        try {
            const logs = localStorage.getItem(this.LOG_KEY);
            return logs ? JSON.parse(logs) : [];
        } catch (e) {
            return [];
        }
    },
    
    /**
     * Get logs for current session
     */
    getSessionLogs() {
        return this.getLogs().filter(log => log.sessionId === this.sessionId);
    },
    
    /**
     * Clear all logs
     */
    clearLogs() {
        localStorage.removeItem(this.LOG_KEY);
        this.log('LOGS_CLEARED', 'Log history cleared');
    },
    
    /**
     * Export logs as JSON
     */
    exportLogs() {
        const logs = this.getLogs();
        const data = {
            exported: new Date().toISOString(),
            version: this.BUILD_VERSION,
            totalLogs: logs.length,
            logs
        };
        return JSON.stringify(data, null, 2);
    },
    
    // Console State
    consoleState: {
        height: 250,
        locked: false,
        visible: false
    },
    
    CONSOLE_STATE_KEY: 'cacheBusterConsoleState',
    
    /**
     * Load console state from storage
     */
    loadConsoleState() {
        try {
            const saved = localStorage.getItem(this.CONSOLE_STATE_KEY);
            if (saved) {
                this.consoleState = { ...this.consoleState, ...JSON.parse(saved) };
            }
        } catch (e) {}
    },
    
    /**
     * Save console state to storage
     */
    saveConsoleState() {
        try {
            localStorage.setItem(this.CONSOLE_STATE_KEY, JSON.stringify(this.consoleState));
        } catch (e) {}
    },
    
    /**
     * Toggle console visibility
     */
    toggleConsole() {
        const existing = document.getElementById('cacheBusterConsole');
        if (existing) {
            this.hideConsole();
        } else {
            this.showConsole();
        }
    },
    
    /**
     * Hide console
     */
    hideConsole() {
        const existing = document.getElementById('cacheBusterConsole');
        if (existing) {
            existing.classList.add('cb-closing');
            setTimeout(() => existing.remove(), 200);
            this.consoleState.visible = false;
            this.saveConsoleState();
        }
    },
    
    /**
     * Show logs in a docked console at bottom of screen
     */
    showConsole() {
        // Remove existing console
        const existing = document.getElementById('cacheBusterConsole');
        if (existing) {
            existing.remove();
        }
        
        this.loadConsoleState();
        const logs = this.getLogs();
        
        const consoleEl = document.createElement('div');
        consoleEl.id = 'cacheBusterConsole';
        consoleEl.innerHTML = `
            <style>
                #cacheBusterConsole {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: ${this.consoleState.height}px;
                    min-height: 120px;
                    max-height: 80vh;
                    background: #1c1c1e;
                    border-top: 2px solid #ed2939;
                    z-index: 99999;
                    font-family: 'SF Mono', Monaco, Consolas, monospace;
                    font-size: 12px;
                    display: flex;
                    flex-direction: column;
                    animation: cb-slide-up 0.2s ease-out;
                    touch-action: none;
                }
                #cacheBusterConsole.cb-closing {
                    animation: cb-slide-down 0.2s ease-out forwards;
                }
                @keyframes cb-slide-up {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes cb-slide-down {
                    from { transform: translateY(0); opacity: 1; }
                    to { transform: translateY(100%); opacity: 0; }
                }
                
                /* Resize Handle */
                #cacheBusterConsole .cb-resize {
                    position: absolute;
                    top: -6px;
                    left: 0;
                    right: 0;
                    height: 12px;
                    cursor: ns-resize;
                    background: transparent;
                    z-index: 10;
                }
                #cacheBusterConsole .cb-resize::before {
                    content: '';
                    position: absolute;
                    top: 5px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 4px;
                    background: #48484a;
                    border-radius: 2px;
                    transition: background 0.2s;
                }
                #cacheBusterConsole .cb-resize:hover::before,
                #cacheBusterConsole .cb-resize:active::before {
                    background: #ed2939;
                }
                #cacheBusterConsole.cb-locked .cb-resize {
                    cursor: not-allowed;
                }
                #cacheBusterConsole.cb-locked .cb-resize::before {
                    background: #636366;
                }
                
                /* Header - Mobile First */
                #cacheBusterConsole .cb-header {
                    display: flex;
                    align-items: center;
                    padding: 8px 12px;
                    background: #2c2c2e;
                    border-bottom: 1px solid #38383a;
                    gap: 8px;
                    flex-wrap: wrap;
                }
                #cacheBusterConsole .cb-header-left {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex: 1;
                    min-width: 0;
                }
                #cacheBusterConsole .cb-title {
                    color: #fff;
                    font-weight: 600;
                    font-size: 13px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                #cacheBusterConsole .cb-badge {
                    background: #ed2939;
                    color: white;
                    padding: 2px 6px;
                    border-radius: 8px;
                    font-size: 9px;
                    flex-shrink: 0;
                }
                #cacheBusterConsole .cb-header-right {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                
                /* Icon Buttons */
                #cacheBusterConsole .cb-icon-btn {
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #3a3a3c;
                    border: none;
                    border-radius: 6px;
                    color: #a1a1a6;
                    cursor: pointer;
                    transition: all 0.15s;
                    font-size: 14px;
                }
                #cacheBusterConsole .cb-icon-btn:hover {
                    background: #48484a;
                    color: #fff;
                }
                #cacheBusterConsole .cb-icon-btn:active {
                    transform: scale(0.95);
                }
                #cacheBusterConsole .cb-icon-btn.active {
                    background: #ed2939;
                    color: white;
                }
                #cacheBusterConsole .cb-icon-btn.danger:hover {
                    background: #ff453a;
                    color: white;
                }
                
                /* Actions Bar - Scrollable on Mobile */
                #cacheBusterConsole .cb-actions {
                    display: flex;
                    gap: 6px;
                    padding: 8px 12px;
                    background: #252527;
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                    scrollbar-width: none;
                }
                #cacheBusterConsole .cb-actions::-webkit-scrollbar {
                    display: none;
                }
                #cacheBusterConsole .cb-btn {
                    background: #3a3a3c;
                    border: none;
                    color: #fff;
                    padding: 8px 12px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 11px;
                    font-family: inherit;
                    transition: all 0.15s;
                    white-space: nowrap;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                #cacheBusterConsole .cb-btn:hover {
                    background: #48484a;
                }
                #cacheBusterConsole .cb-btn:active {
                    transform: scale(0.98);
                }
                #cacheBusterConsole .cb-btn-primary {
                    background: #ed2939;
                }
                #cacheBusterConsole .cb-btn-primary:hover {
                    background: #d91e2c;
                }
                #cacheBusterConsole .cb-btn-danger {
                    background: #ff453a;
                }
                #cacheBusterConsole .cb-btn-danger:hover {
                    background: #ff6961;
                }
                
                /* Filter Tabs */
                #cacheBusterConsole .cb-filters {
                    display: flex;
                    gap: 4px;
                    padding: 6px 12px;
                    background: #1c1c1e;
                    border-bottom: 1px solid #38383a;
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                    scrollbar-width: none;
                }
                #cacheBusterConsole .cb-filters::-webkit-scrollbar {
                    display: none;
                }
                #cacheBusterConsole .cb-filter {
                    padding: 4px 10px;
                    border-radius: 12px;
                    font-size: 10px;
                    background: transparent;
                    border: 1px solid #38383a;
                    color: #a1a1a6;
                    cursor: pointer;
                    white-space: nowrap;
                    transition: all 0.15s;
                }
                #cacheBusterConsole .cb-filter:hover {
                    border-color: #636366;
                    color: #fff;
                }
                #cacheBusterConsole .cb-filter.active {
                    background: #ed2939;
                    border-color: #ed2939;
                    color: white;
                }
                
                /* Logs Container */
                #cacheBusterConsole .cb-logs {
                    flex: 1;
                    overflow-y: auto;
                    overflow-x: hidden;
                    padding: 8px;
                    -webkit-overflow-scrolling: touch;
                }
                #cacheBusterConsole .cb-log {
                    padding: 8px 10px;
                    margin-bottom: 4px;
                    background: #2c2c2e;
                    border-radius: 6px;
                    border-left: 3px solid #636366;
                }
                #cacheBusterConsole .cb-log.INIT { border-left-color: #0a84ff; }
                #cacheBusterConsole .cb-log.VERSION_CHANGE { border-left-color: #ff9500; }
                #cacheBusterConsole .cb-log.BUST_START,
                #cacheBusterConsole .cb-log.BUST_COMPLETE,
                #cacheBusterConsole .cb-log.READY,
                #cacheBusterConsole .cb-log.CLEAR_COMPLETE,
                #cacheBusterConsole .cb-log.FULL_BUST_COMPLETE { border-left-color: #30d158; }
                #cacheBusterConsole .cb-log.ERROR,
                #cacheBusterConsole .cb-log.FORCE_RELOAD,
                #cacheBusterConsole .cb-log.FULL_BUST { border-left-color: #ff453a; }
                #cacheBusterConsole .cb-log.FETCH,
                #cacheBusterConsole .cb-log.XHR { border-left-color: #64d2ff; }
                #cacheBusterConsole .cb-log.CSS_REFRESH,
                #cacheBusterConsole .cb-log.CSS_COMPLETE { border-left-color: #5ac8fa; }
                #cacheBusterConsole .cb-log.PATCH { border-left-color: #bf5af2; }
                #cacheBusterConsole .cb-log-header {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex-wrap: wrap;
                }
                #cacheBusterConsole .cb-log-time {
                    color: #636366;
                    font-size: 10px;
                }
                #cacheBusterConsole .cb-log-type {
                    color: #fff;
                    font-weight: 600;
                    font-size: 11px;
                }
                #cacheBusterConsole .cb-log-msg {
                    color: #a1a1a6;
                    margin-top: 4px;
                    font-size: 11px;
                    word-break: break-word;
                }
                #cacheBusterConsole .cb-log-data {
                    color: #5ac8fa;
                    margin-top: 4px;
                    font-size: 10px;
                    word-break: break-all;
                    background: #1c1c1e;
                    padding: 6px 8px;
                    border-radius: 4px;
                    max-height: 100px;
                    overflow: auto;
                }
                #cacheBusterConsole .cb-empty {
                    color: #636366;
                    text-align: center;
                    padding: 40px 20px;
                }
                
                /* Footer */
                #cacheBusterConsole .cb-footer {
                    padding: 6px 12px;
                    background: #2c2c2e;
                    border-top: 1px solid #38383a;
                    color: #636366;
                    font-size: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 8px;
                }
                #cacheBusterConsole .cb-footer-info {
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                }
                
                /* Desktop Styles */
                @media (min-width: 640px) {
                    #cacheBusterConsole {
                        font-size: 11px;
                    }
                    #cacheBusterConsole .cb-header {
                        padding: 10px 16px;
                    }
                    #cacheBusterConsole .cb-actions {
                        padding: 8px 16px;
                    }
                    #cacheBusterConsole .cb-filters {
                        padding: 6px 16px;
                    }
                    #cacheBusterConsole .cb-logs {
                        padding: 8px 16px;
                    }
                    #cacheBusterConsole .cb-footer {
                        padding: 8px 16px;
                    }
                }
            </style>
            
            <div class="cb-resize" id="cbResize"></div>
            
            <div class="cb-header">
                <div class="cb-header-left">
                    <span class="cb-title">🚀 CacheBuster</span>
                    <span class="cb-badge">v${this.BUILD_VERSION}</span>
                </div>
                <div class="cb-header-right">
                    <button class="cb-icon-btn ${this.consoleState.locked ? 'active' : ''}" id="cbLockBtn" title="Größe sperren">
                        ${this.consoleState.locked ? '🔒' : '🔓'}
                    </button>
                    <button class="cb-icon-btn" id="cbMinBtn" title="Minimieren">➖</button>
                    <button class="cb-icon-btn danger" id="cbCloseBtn" title="Schließen">✕</button>
                </div>
            </div>
            
            <div class="cb-actions">
                <button class="cb-btn cb-btn-primary" onclick="CacheBuster.forceReload()">
                    🔄 <span>Reload</span>
                </button>
                <button class="cb-btn" onclick="CacheBuster.bustCache()">
                    🧹 <span>Cache</span>
                </button>
                <button class="cb-btn" onclick="CacheBuster.refreshLogs()">
                    ↻ <span>Refresh</span>
                </button>
                <button class="cb-btn cb-btn-danger" onclick="CacheBuster.clearLogs(); CacheBuster.refreshLogs();">
                    🗑️ <span>Clear</span>
                </button>
                <button class="cb-btn" onclick="CacheBuster.downloadLogs()">
                    📥 <span>Export</span>
                </button>
            </div>
            
            <div class="cb-filters" id="cbFilters">
                <button class="cb-filter active" data-filter="all">Alle</button>
                <button class="cb-filter" data-filter="INIT,READY,CONFIG">System</button>
                <button class="cb-filter" data-filter="FETCH,XHR">Network</button>
                <button class="cb-filter" data-filter="BUST_START,BUST_COMPLETE,FULL_BUST,CLEAR_COMPLETE">Cache</button>
                <button class="cb-filter" data-filter="CSS_REFRESH,CSS_COMPLETE">CSS</button>
                <button class="cb-filter" data-filter="ERROR">Errors</button>
            </div>
            
            <div class="cb-logs" id="cbLogs">
                ${this.renderLogs(logs)}
            </div>
            
            <div class="cb-footer">
                <div class="cb-footer-info">
                    <span>Session: ${this.sessionId?.substring(0, 8) || 'N/A'}</span>
                    <span id="cbLogCount">${logs.length} logs</span>
                </div>
                <span>Strg+Shift+C zum Toggle</span>
            </div>
        `;
        
        document.body.appendChild(consoleEl);
        
        // Setup event listeners
        this.setupConsoleEvents(consoleEl);
        
        if (this.consoleState.locked) {
            consoleEl.classList.add('cb-locked');
        }
        
        this.consoleState.visible = true;
        this.saveConsoleState();
        this.log('CONSOLE', 'Debug console opened');
        
        // Scroll to bottom
        const logsContainer = document.getElementById('cbLogs');
        if (logsContainer) {
            logsContainer.scrollTop = 0;
        }
    },
    
    /**
     * Render logs HTML
     */
    renderLogs(logs, filter = 'all') {
        if (logs.length === 0) {
            return '<div class="cb-empty">📭 Keine Logs vorhanden</div>';
        }
        
        let filteredLogs = logs;
        if (filter !== 'all') {
            const types = filter.split(',');
            filteredLogs = logs.filter(log => types.includes(log.type));
        }
        
        if (filteredLogs.length === 0) {
            return '<div class="cb-empty">🔍 Keine Logs für diesen Filter</div>';
        }
        
        return filteredLogs.map(log => `
            <div class="cb-log ${log.type}">
                <div class="cb-log-header">
                    <span class="cb-log-time">${new Date(log.timestamp).toLocaleTimeString()}</span>
                    <span class="cb-log-type">${log.type}</span>
                </div>
                <div class="cb-log-msg">${log.message}</div>
                ${log.data ? `<div class="cb-log-data">${JSON.stringify(log.data, null, 2)}</div>` : ''}
            </div>
        `).join('');
    },
    
    /**
     * Refresh logs display
     */
    refreshLogs() {
        const logsContainer = document.getElementById('cbLogs');
        const countEl = document.getElementById('cbLogCount');
        const activeFilter = document.querySelector('#cbFilters .cb-filter.active');
        const filter = activeFilter?.dataset.filter || 'all';
        
        if (logsContainer) {
            const logs = this.getLogs();
            logsContainer.innerHTML = this.renderLogs(logs, filter);
            if (countEl) countEl.textContent = `${logs.length} logs`;
        }
    },
    
    /**
     * Download logs as file
     */
    downloadLogs() {
        const data = this.exportLogs();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cachebuster-logs-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        this.log('EXPORT', 'Logs exported');
    },
    
    /**
     * Setup console event listeners
     */
    setupConsoleEvents(consoleEl) {
        const resizeHandle = document.getElementById('cbResize');
        const lockBtn = document.getElementById('cbLockBtn');
        const minBtn = document.getElementById('cbMinBtn');
        const closeBtn = document.getElementById('cbCloseBtn');
        const filters = document.getElementById('cbFilters');
        
        // Close button
        closeBtn?.addEventListener('click', () => this.hideConsole());
        
        // Minimize button
        minBtn?.addEventListener('click', () => {
            const currentHeight = consoleEl.offsetHeight;
            if (currentHeight > 150) {
                this.consoleState.height = 120;
            } else {
                this.consoleState.height = 250;
            }
            consoleEl.style.height = this.consoleState.height + 'px';
            this.saveConsoleState();
        });
        
        // Lock button
        lockBtn?.addEventListener('click', () => {
            this.consoleState.locked = !this.consoleState.locked;
            lockBtn.innerHTML = this.consoleState.locked ? '🔒' : '🔓';
            lockBtn.classList.toggle('active', this.consoleState.locked);
            consoleEl.classList.toggle('cb-locked', this.consoleState.locked);
            this.saveConsoleState();
        });
        
        // Filter buttons
        filters?.addEventListener('click', (e) => {
            const btn = e.target.closest('.cb-filter');
            if (btn) {
                filters.querySelectorAll('.cb-filter').forEach(f => f.classList.remove('active'));
                btn.classList.add('active');
                const logs = this.getLogs();
                document.getElementById('cbLogs').innerHTML = this.renderLogs(logs, btn.dataset.filter);
            }
        });
        
        // Resize functionality
        let isResizing = false;
        let startY = 0;
        let startHeight = 0;
        
        const startResize = (clientY) => {
            if (this.consoleState.locked) return;
            isResizing = true;
            startY = clientY;
            startHeight = consoleEl.offsetHeight;
            document.body.style.cursor = 'ns-resize';
            document.body.style.userSelect = 'none';
        };
        
        const doResize = (clientY) => {
            if (!isResizing) return;
            const diff = startY - clientY;
            const newHeight = Math.max(120, Math.min(window.innerHeight * 0.8, startHeight + diff));
            consoleEl.style.height = newHeight + 'px';
            this.consoleState.height = newHeight;
        };
        
        const stopResize = () => {
            if (isResizing) {
                isResizing = false;
                document.body.style.cursor = '';
                document.body.style.userSelect = '';
                this.saveConsoleState();
            }
        };
        
        // Mouse events
        resizeHandle?.addEventListener('mousedown', (e) => startResize(e.clientY));
        document.addEventListener('mousemove', (e) => doResize(e.clientY));
        document.addEventListener('mouseup', stopResize);
        
        // Touch events for mobile
        resizeHandle?.addEventListener('touchstart', (e) => {
            e.preventDefault();
            startResize(e.touches[0].clientY);
        }, { passive: false });
        document.addEventListener('touchmove', (e) => {
            if (isResizing) {
                e.preventDefault();
                doResize(e.touches[0].clientY);
            }
        }, { passive: false });
        document.addEventListener('touchend', stopResize);
    }
};

// Auto-init immediately (not waiting for DOMContentLoaded for faster execution)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CacheBuster.init());
} else {
    CacheBuster.init();
}

// Keyboard shortcut: Ctrl+Shift+C to open console
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        CacheBuster.toggleConsole();
    }
});
