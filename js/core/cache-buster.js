/**
 * Cache Buster - Force browser to load fresh files
 * Clears all caches and adds version parameters with full logging
 */
const CacheBuster = {
    STORAGE_KEY: 'cacheBusterEnabled',
    VERSION_KEY: 'appVersion',
    LOG_KEY: 'cacheBusterLogs',
    BUILD_VERSION: '2.1.4',
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
    
    /**
     * Show logs in a popup console
     */
    showConsole() {
        // Remove existing console
        const existing = document.getElementById('cacheBusterConsole');
        if (existing) {
            existing.remove();
            return;
        }
        
        const logs = this.getLogs();
        
        const console = document.createElement('div');
        console.id = 'cacheBusterConsole';
        console.innerHTML = `
            <style>
                #cacheBusterConsole {
                    position: fixed;
                    bottom: 80px;
                    right: 16px;
                    width: 400px;
                    max-width: calc(100vw - 32px);
                    max-height: 60vh;
                    background: #1c1c1e;
                    border: 1px solid #38383a;
                    border-radius: 12px;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
                    z-index: 99999;
                    font-family: 'SF Mono', Monaco, monospace;
                    font-size: 11px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }
                #cacheBusterConsole .cb-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px 16px;
                    background: #2c2c2e;
                    border-bottom: 1px solid #38383a;
                }
                #cacheBusterConsole .cb-title {
                    color: #fff;
                    font-weight: 600;
                    font-size: 13px;
                }
                #cacheBusterConsole .cb-badge {
                    background: #ed2939;
                    color: white;
                    padding: 2px 8px;
                    border-radius: 10px;
                    font-size: 10px;
                }
                #cacheBusterConsole .cb-actions {
                    display: flex;
                    gap: 8px;
                }
                #cacheBusterConsole .cb-btn {
                    background: #3a3a3c;
                    border: none;
                    color: #fff;
                    padding: 6px 12px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 11px;
                    transition: background 0.2s;
                }
                #cacheBusterConsole .cb-btn:hover {
                    background: #48484a;
                }
                #cacheBusterConsole .cb-btn-danger {
                    background: #ff453a;
                }
                #cacheBusterConsole .cb-btn-danger:hover {
                    background: #ff6961;
                }
                #cacheBusterConsole .cb-logs {
                    flex: 1;
                    overflow-y: auto;
                    padding: 8px;
                }
                #cacheBusterConsole .cb-log {
                    padding: 8px;
                    margin-bottom: 4px;
                    background: #2c2c2e;
                    border-radius: 6px;
                    border-left: 3px solid #636366;
                }
                #cacheBusterConsole .cb-log.INIT { border-left-color: #0a84ff; }
                #cacheBusterConsole .cb-log.VERSION_CHANGE { border-left-color: #ff9500; }
                #cacheBusterConsole .cb-log.BUST_COMPLETE,
                #cacheBusterConsole .cb-log.READY,
                #cacheBusterConsole .cb-log.CLEAR_COMPLETE { border-left-color: #30d158; }
                #cacheBusterConsole .cb-log.ERROR,
                #cacheBusterConsole .cb-log.FORCE_RELOAD { border-left-color: #ff453a; }
                #cacheBusterConsole .cb-log.FETCH,
                #cacheBusterConsole .cb-log.XHR { border-left-color: #64d2ff; }
                #cacheBusterConsole .cb-log-time {
                    color: #636366;
                    font-size: 10px;
                }
                #cacheBusterConsole .cb-log-type {
                    color: #fff;
                    font-weight: 600;
                    margin-left: 8px;
                }
                #cacheBusterConsole .cb-log-msg {
                    color: #a1a1a6;
                    margin-top: 4px;
                }
                #cacheBusterConsole .cb-log-data {
                    color: #5ac8fa;
                    margin-top: 4px;
                    font-size: 10px;
                    word-break: break-all;
                }
                #cacheBusterConsole .cb-footer {
                    padding: 8px 16px;
                    background: #2c2c2e;
                    border-top: 1px solid #38383a;
                    color: #636366;
                    font-size: 10px;
                    display: flex;
                    justify-content: space-between;
                }
                #cacheBusterConsole .cb-close {
                    background: none;
                    border: none;
                    color: #636366;
                    cursor: pointer;
                    font-size: 18px;
                    padding: 0;
                    line-height: 1;
                }
                #cacheBusterConsole .cb-close:hover {
                    color: #fff;
                }
            </style>
            <div class="cb-header">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="cb-title">🚀 CacheBuster Console</span>
                    <span class="cb-badge">v${this.BUILD_VERSION}</span>
                </div>
                <button class="cb-close" onclick="document.getElementById('cacheBusterConsole').remove()">×</button>
            </div>
            <div class="cb-actions" style="padding: 8px 16px; background: #2c2c2e;">
                <button class="cb-btn" onclick="CacheBuster.forceReload()">🔄 Force Reload</button>
                <button class="cb-btn" onclick="CacheBuster.bustCache()">🧹 Clear Cache</button>
                <button class="cb-btn cb-btn-danger" onclick="CacheBuster.clearLogs(); CacheBuster.showConsole();">🗑️ Clear Logs</button>
            </div>
            <div class="cb-logs">
                ${logs.length === 0 ? '<div style="color: #636366; text-align: center; padding: 20px;">No logs yet</div>' : ''}
                ${logs.map(log => `
                    <div class="cb-log ${log.type}">
                        <span class="cb-log-time">${new Date(log.timestamp).toLocaleTimeString()}</span>
                        <span class="cb-log-type">${log.type}</span>
                        <div class="cb-log-msg">${log.message}</div>
                        ${log.data ? `<div class="cb-log-data">${JSON.stringify(log.data)}</div>` : ''}
                    </div>
                `).join('')}
            </div>
            <div class="cb-footer">
                <span>Session: ${this.sessionId}</span>
                <span>${logs.length} logs</span>
            </div>
        `;
        
        document.body.appendChild(console);
        this.log('CONSOLE', 'Debug console opened');
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
        CacheBuster.showConsole();
    }
});
