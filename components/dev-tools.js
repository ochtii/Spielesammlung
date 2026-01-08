/**
 * AUT Quiz - Developer Tools
 */

const DevTools = {
    enabled: false,
    
    init() {
        this.enabled = localStorage.getItem('debugMode') === 'true';
        if (this.enabled) {
            this.injectPanel();
        }
    },
    
    injectPanel() {
        const panel = document.createElement('div');
        panel.id = 'devToolsPanel';
        panel.className = 'dev-tools-panel';
        panel.innerHTML = `
            <div class="dev-tools-header">
                <span>🛠️ Dev Tools</span>
                <button onclick="DevTools.toggle()">×</button>
            </div>
            <div class="dev-tools-body">
                <button onclick="DevTools.hardReload()">Hard Reload</button>
                <button onclick="DevTools.clearStorage()">Clear Storage</button>
                <button onclick="DevTools.showStorage()">Show Storage</button>
                <button onclick="DevTools.addPoints(100)">+100 Points</button>
            </div>
        `;
        document.body.appendChild(panel);
    },
    
    toggle() {
        const panel = document.getElementById('devToolsPanel');
        if (panel) panel.classList.toggle('hidden');
    },
    
    hardReload() {
        location.reload(true);
    },
    
    clearStorage() {
        if (confirm('Clear all localStorage?')) {
            localStorage.clear();
            location.reload();
        }
    },
    
    showStorage() {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            data[key] = localStorage.getItem(key);
        }
        console.table(data);
        alert('Storage logged to console');
    },
    
    addPoints(amount) {
        const current = parseInt(localStorage.getItem('totalPoints')) || 0;
        localStorage.setItem('totalPoints', current + amount);
        updatePointsDisplay?.();
        this.toast(`+${amount} Points`);
    },
    
    toast(message) {
        const toast = document.createElement('div');
        toast.className = 'dev-toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    },
    
    log(...args) {
        if (this.enabled) {
            console.log('[DevTools]', ...args);
        }
    }
};

// Auto-init
document.addEventListener('DOMContentLoaded', () => DevTools.init());
