/**
 * Settings Page - Futuristic Settings Controller
 */
const SettingsPage = {
    // Storage keys for settings
    KEYS: {
        PARTICLES: 'settings_particles',
        TRANSITIONS: 'settings_transitions',
        HIGH_CONTRAST: 'settings_highContrast',
        REDUCED_MOTION: 'settings_reducedMotion',
        LARGE_TARGETS: 'settings_largeTargets',
        SOUND: 'settings_sound',
        VIBRATION: 'settings_vibration',
        SCREENREADER: 'settings_screenreader',
        COLORBLIND: 'settings_colorblind',
        DEBUG_MODE: 'settings_debugMode',
        PERF_MONITOR: 'settings_perfMonitor',
        EVENT_LOGGER: 'settings_eventLogger'
    },

    // Chart colors
    chartColors: [
        '#ed2939', '#3b82f6', '#22c55e', '#a855f7', 
        '#f97316', '#ec4899', '#14b8a6', '#eab308'
    ],

    // Console history
    consoleHistory: [],
    historyIndex: -1,

    /**
     * Initialize settings page
     */
    init() {
        this.initTabs();
        this.initAppearance();
        this.initAccessibility();
        this.initData();
        this.initDevTools();
        this.loadAllSettings();
        this.updateSystemInfo();
    },

    /**
     * Initialize tab navigation
     */
    initTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const panels = document.querySelectorAll('.tab-panel');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;

                // Update buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update panels
                panels.forEach(p => p.classList.remove('active'));
                document.getElementById(`panel-${tab}`)?.classList.add('active');

                // Trigger chart redraw if data tab
                if (tab === 'data') {
                    setTimeout(() => this.renderStorageChart(), 100);
                }
            });
        });
    },

    /**
     * Initialize appearance settings
     */
    initAppearance() {
        // Theme selector
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(opt => {
            opt.addEventListener('click', () => {
                const theme = opt.dataset.theme;
                Theme.setTheme(theme);
                this.updateThemeSelection();
                Toast.success(`Theme: ${opt.querySelector('span').textContent}`);
            });
        });
        this.updateThemeSelection();

        // Color presets
        const colorBtns = document.querySelectorAll('.color-btn');
        colorBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const color = btn.dataset.color;
                Theme.setAccentColor(color);
                document.getElementById('accentColor').value = color;
                this.updateColorSelection();
                Toast.success('Akzentfarbe geändert');
            });
        });

        // Custom color picker
        const accentColor = document.getElementById('accentColor');
        if (accentColor) {
            accentColor.value = Theme.getAccentColor();
            accentColor.addEventListener('input', (e) => {
                Theme.setAccentColor(e.target.value);
                this.updateColorSelection();
            });
        }
        this.updateColorSelection();

        // Particles toggle
        this.initToggle('particlesToggle', this.KEYS.PARTICLES, true, (enabled) => {
            const bg = document.querySelector('.settings-bg');
            if (bg) bg.style.display = enabled ? 'block' : 'none';
        });

        // Transitions toggle
        this.initToggle('transitionsToggle', this.KEYS.TRANSITIONS, true, (enabled) => {
            document.body.classList.toggle('no-transitions', !enabled);
        });
    },

    /**
     * Update theme selection UI
     */
    updateThemeSelection() {
        const currentTheme = Theme.getTheme();
        document.querySelectorAll('.theme-option').forEach(opt => {
            opt.classList.toggle('active', opt.dataset.theme === currentTheme);
        });
    },

    /**
     * Update color selection UI
     */
    updateColorSelection() {
        const currentColor = Theme.getAccentColor();
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.color === currentColor);
        });
    },

    /**
     * Initialize accessibility settings
     */
    initAccessibility() {
        // Font size slider
        const fontSlider = document.getElementById('fontSizeSlider');
        const fontPreview = document.getElementById('fontPreview');
        if (fontSlider) {
            fontSlider.value = Theme.getFontScale();
            fontSlider.addEventListener('input', (e) => {
                const scale = parseFloat(e.target.value);
                Theme.setFontScale(scale);
                if (fontPreview) {
                    fontPreview.style.fontSize = `${scale}em`;
                }
            });
            // Set initial preview
            if (fontPreview) {
                fontPreview.style.fontSize = `${Theme.getFontScale()}em`;
            }
        }

        // High contrast
        this.initToggle('highContrastToggle', this.KEYS.HIGH_CONTRAST, false, (enabled) => {
            document.body.classList.toggle('high-contrast', enabled);
        });

        // Reduced motion
        this.initToggle('reducedMotionToggle', this.KEYS.REDUCED_MOTION, false, (enabled) => {
            document.body.classList.toggle('reduced-motion', enabled);
        });

        // Large targets
        this.initToggle('largeTargetsToggle', this.KEYS.LARGE_TARGETS, false, (enabled) => {
            document.body.classList.toggle('large-targets', enabled);
        });

        // Sound
        this.initToggle('soundToggle', this.KEYS.SOUND, false);

        // Vibration
        this.initToggle('vibrationToggle', this.KEYS.VIBRATION, false);

        // Screenreader
        this.initToggle('screenreaderToggle', this.KEYS.SCREENREADER, false, (enabled) => {
            document.body.classList.toggle('screenreader-mode', enabled);
        });

        // Colorblind selector
        const colorblindOptions = document.querySelectorAll('.colorblind-option');
        colorblindOptions.forEach(opt => {
            opt.addEventListener('click', () => {
                const mode = opt.dataset.mode;
                Storage.set(this.KEYS.COLORBLIND, mode);
                this.applyColorblindMode(mode);
                colorblindOptions.forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
                Toast.success(`Farbmodus: ${opt.querySelector('span').textContent}`);
            });
        });
    },

    /**
     * Apply colorblind mode
     */
    applyColorblindMode(mode) {
        document.body.dataset.colorblind = mode;
        // Could add CSS filters here for actual colorblind simulation
    },

    /**
     * Initialize data management
     */
    initData() {
        // Render storage chart
        this.renderStorageChart();

        // Render storage keys
        this.renderStorageKeys();

        // Export button
        const exportBtn = document.getElementById('exportDataBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportData());
        }

        // Import button
        const importInput = document.getElementById('importDataInput');
        if (importInput) {
            importInput.addEventListener('change', (e) => this.importData(e));
        }

        // Reset buttons
        document.getElementById('resetStatsBtn')?.addEventListener('click', () => {
            if (confirm('Statistiken wirklich zurücksetzen?')) {
                if (typeof Statistics !== 'undefined') {
                    Statistics.resetAll();
                }
                Storage.remove('gameStats');
                Storage.remove('gameTypeStats');
                Storage.remove('recentGames');
                Toast.success('Statistiken zurückgesetzt');
                this.renderStorageChart();
                this.renderStorageKeys();
            }
        });

        document.getElementById('resetSettingsBtn')?.addEventListener('click', () => {
            if (confirm('Einstellungen wirklich zurücksetzen?')) {
                Object.values(this.KEYS).forEach(key => Storage.remove(key));
                Storage.remove('theme');
                Storage.remove('fontScale');
                Storage.remove('accentColor');
                Toast.success('Einstellungen zurückgesetzt');
                setTimeout(() => location.reload(), 500);
            }
        });

        document.getElementById('resetAllBtn')?.addEventListener('click', () => {
            if (confirm('⚠️ ALLE DATEN LÖSCHEN?\n\nDies kann nicht rückgängig gemacht werden!')) {
                if (confirm('Wirklich ALLES löschen?')) {
                    Storage.clear();
                    Toast.error('Alle Daten gelöscht');
                    setTimeout(() => location.reload(), 500);
                }
            }
        });
    },

    /**
     * Render storage chart using Canvas
     */
    renderStorageChart() {
        const canvas = document.getElementById('storageChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const data = this.getStorageData();
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw donut chart
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 80;
        const innerRadius = 50;

        let startAngle = -Math.PI / 2;
        const totalSize = data.reduce((sum, item) => sum + item.size, 0);

        data.forEach((item, index) => {
            const sliceAngle = (item.size / totalSize) * 2 * Math.PI;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
            ctx.lineTo(centerX, centerY);
            ctx.fillStyle = this.chartColors[index % this.chartColors.length];
            ctx.fill();

            startAngle += sliceAngle;
        });

        // Draw inner circle (donut hole)
        ctx.beginPath();
        ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
        ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--card-bg') || '#fff';
        ctx.fill();

        // Update total
        document.getElementById('storageTotal').textContent = this.formatBytes(totalSize);

        // Update legend
        const legend = document.getElementById('storageLegend');
        if (legend) {
            legend.innerHTML = data.map((item, index) => `
                <div class="legend-item">
                    <span class="legend-color" style="background: ${this.chartColors[index % this.chartColors.length]}"></span>
                    <span>${item.name}: ${this.formatBytes(item.size)}</span>
                </div>
            `).join('');
        }
    },

    /**
     * Get storage data grouped by category
     */
    getStorageData() {
        const categories = {
            'Statistiken': ['stats_global', 'stats_games', 'stats_sessions', 'stats_achievements', 'stats_daily', 'gameStats', 'gameTypeStats', 'recentGames'],
            'Einstellungen': ['theme', 'fontScale', 'accentColor', 'settings_'],
            'Cache': ['cacheBuster', 'cacheVersion'],
            'Punkte': ['totalPoints'],
            'Sonstiges': []
        };

        const result = [];
        const processedKeys = new Set();

        for (const [category, prefixes] of Object.entries(categories)) {
            let totalSize = 0;
            
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (processedKeys.has(key)) continue;

                const matchesCategory = prefixes.some(prefix => 
                    key === prefix || key.startsWith(prefix)
                );

                if (matchesCategory || (category === 'Sonstiges' && !processedKeys.has(key))) {
                    if (matchesCategory) {
                        totalSize += (localStorage.getItem(key) || '').length * 2; // UTF-16
                        processedKeys.add(key);
                    }
                }
            }

            if (totalSize > 0 || category !== 'Sonstiges') {
                result.push({ name: category, size: Math.max(totalSize, 1) });
            }
        }

        // Add remaining as "Sonstiges"
        let otherSize = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (!processedKeys.has(key)) {
                otherSize += (localStorage.getItem(key) || '').length * 2;
            }
        }
        if (otherSize > 0) {
            result.push({ name: 'Sonstiges', size: otherSize });
        }

        return result.length > 0 ? result : [{ name: 'Leer', size: 1 }];
    },

    /**
     * Render storage keys list
     */
    renderStorageKeys() {
        const list = document.getElementById('storageKeysList');
        if (!list) return;

        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key) || '';
            keys.push({ key, size: value.length * 2 });
        }

        keys.sort((a, b) => b.size - a.size);

        list.innerHTML = keys.length > 0 
            ? keys.map(item => `
                <div class="key-item">
                    <span class="key-name">${item.key}</span>
                    <span class="key-size">${this.formatBytes(item.size)}</span>
                    <button class="key-delete" data-key="${item.key}" title="Löschen">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('')
            : '<p class="text-muted text-center">Keine Daten gespeichert</p>';

        // Add delete handlers
        list.querySelectorAll('.key-delete').forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.dataset.key;
                if (confirm(`"${key}" löschen?`)) {
                    Storage.remove(key);
                    Toast.success(`"${key}" gelöscht`);
                    this.renderStorageKeys();
                    this.renderStorageChart();
                }
            });
        });
    },

    /**
     * Export all data
     */
    exportData() {
        const data = {
            exportDate: new Date().toISOString(),
            version: App.version,
            storage: Storage.getAll()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `aut-quiz-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);

        Toast.success('Daten exportiert');
    },

    /**
     * Import data from file
     */
    importData(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (!data.storage) {
                    throw new Error('Ungültiges Dateiformat');
                }

                if (confirm(`Daten vom ${new Date(data.exportDate).toLocaleDateString('de-DE')} importieren?\n\nAchtuelle Daten werden überschrieben!`)) {
                    // Clear and import
                    Storage.clear();
                    for (const [key, value] of Object.entries(data.storage)) {
                        Storage.set(key, value);
                    }
                    
                    Toast.success('Daten importiert');
                    setTimeout(() => location.reload(), 500);
                }
            } catch (err) {
                Toast.error('Fehler beim Importieren: ' + err.message);
            }
        };
        reader.readAsText(file);
        event.target.value = ''; // Reset input
    },

    /**
     * Initialize dev tools
     */
    initDevTools() {
        // Cache Buster toggle
        const cacheBusterToggle = document.getElementById('cacheBusterToggle');
        if (cacheBusterToggle && typeof CacheBuster !== 'undefined') {
            cacheBusterToggle.checked = CacheBuster.isEnabled();
            cacheBusterToggle.addEventListener('change', (e) => {
                CacheBuster.setEnabled(e.target.checked);
                Toast.show(e.target.checked ? 'Cache Buster aktiviert' : 'Cache Buster deaktiviert', {
                    type: e.target.checked ? 'success' : 'info'
                });
            });
        }

        // Cache buttons
        document.getElementById('clearCacheBtn')?.addEventListener('click', async () => {
            if (typeof CacheBuster !== 'undefined') {
                await CacheBuster.bustCache();
            }
            Toast.success('Cache geleert');
        });

        document.getElementById('hardReloadBtn')?.addEventListener('click', () => {
            location.reload(true);
        });

        document.getElementById('clearServiceWorkerBtn')?.addEventListener('click', async () => {
            if ('serviceWorker' in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                for (const reg of registrations) {
                    await reg.unregister();
                }
                Toast.success('Service Worker entfernt');
            } else {
                Toast.info('Keine Service Worker gefunden');
            }
        });

        // CacheBuster Console Toggle
        document.getElementById('cacheBusterConsoleBtn')?.addEventListener('click', () => {
            if (typeof CacheBuster !== 'undefined') {
                CacheBuster.toggleConsole();
            } else {
                Toast.error('CacheBuster nicht verfügbar');
            }
        });

        // Debug toggles
        this.initToggle('debugModeToggle', this.KEYS.DEBUG_MODE, false, (enabled) => {
            window.DEBUG = enabled;
            this.consoleLog(enabled ? 'Debug-Modus aktiviert' : 'Debug-Modus deaktiviert', 'info');
        });

        this.initToggle('perfMonitorToggle', this.KEYS.PERF_MONITOR, false, (enabled) => {
            const monitor = document.getElementById('perfMonitor');
            if (monitor) {
                monitor.style.display = enabled ? 'block' : 'none';
                if (enabled) this.startPerfMonitor();
            }
        });

        this.initToggle('eventLoggerToggle', this.KEYS.EVENT_LOGGER, false, (enabled) => {
            if (enabled && typeof EventBus !== 'undefined') {
                EventBus.on('*', (data, event) => {
                    this.consoleLog(`Event: ${event} - ${JSON.stringify(data)}`, 'info');
                });
            }
        });

        // Test buttons
        document.getElementById('testToastBtn')?.addEventListener('click', () => {
            const types = ['success', 'error', 'info', 'warning'];
            const type = types[Math.floor(Math.random() * types.length)];
            Toast.show(`Test ${type} Toast`, { type });
        });

        document.getElementById('testAchievementBtn')?.addEventListener('click', () => {
            Toast.success('🏆 Achievement: Test Achievement');
        });

        document.getElementById('addTestDataBtn')?.addEventListener('click', () => {
            if (typeof Statistics !== 'undefined') {
                Statistics.recordGame({
                    gameId: 'test',
                    gameName: 'Test-Spiel',
                    score: Math.floor(Math.random() * 10),
                    total: 10,
                    percentage: Math.floor(Math.random() * 100),
                    streak: Math.floor(Math.random() * 5),
                    timeMs: Math.floor(Math.random() * 60000),
                    points: Math.floor(Math.random() * 100)
                });
                Toast.success('Test-Daten hinzugefügt');
                this.renderStorageChart();
                this.renderStorageKeys();
            }
        });

        document.getElementById('simulateGameBtn')?.addEventListener('click', () => {
            for (let i = 0; i < 10; i++) {
                if (typeof Statistics !== 'undefined') {
                    Statistics.recordAnswer({
                        gameId: 'simulation',
                        question: `Frage ${i + 1}`,
                        correct: Math.random() > 0.3,
                        answerTimeMs: Math.floor(Math.random() * 5000) + 1000
                    });
                }
            }
            Toast.success('10 Antworten simuliert');
        });

        // Console
        this.initConsole();
    },

    /**
     * Initialize dev console
     */
    initConsole() {
        const input = document.getElementById('consoleInput');
        const output = document.getElementById('consoleOutput');

        if (!input || !output) return;

        // Command buttons
        document.querySelectorAll('.cmd-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.executeCommand(btn.dataset.cmd);
            });
        });

        // Input handling
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = input.value.trim();
                if (cmd) {
                    this.consoleHistory.push(cmd);
                    this.historyIndex = this.consoleHistory.length;
                    this.executeCommand(cmd);
                    input.value = '';
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (this.historyIndex > 0) {
                    this.historyIndex--;
                    input.value = this.consoleHistory[this.historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (this.historyIndex < this.consoleHistory.length - 1) {
                    this.historyIndex++;
                    input.value = this.consoleHistory[this.historyIndex];
                } else {
                    this.historyIndex = this.consoleHistory.length;
                    input.value = '';
                }
            }
        });

        // Initial timestamp
        output.querySelector('.timestamp').textContent = this.getTimestamp();
    },

    /**
     * Execute console command
     */
    executeCommand(cmd) {
        this.consoleLog(`❯ ${cmd}`, 'input');

        const parts = cmd.toLowerCase().split(' ');
        const command = parts[0];
        const args = parts.slice(1);

        switch (command) {
            case 'help':
                this.consoleLog('Verfügbare Befehle:', 'info');
                this.consoleLog('  help     - Diese Hilfe', 'info');
                this.consoleLog('  stats    - Statistik anzeigen', 'info');
                this.consoleLog('  clear    - Console leeren', 'info');
                this.consoleLog('  storage  - Storage Info', 'info');
                this.consoleLog('  version  - Version anzeigen', 'info');
                this.consoleLog('  games    - Spiele auflisten', 'info');
                this.consoleLog('  theme    - Theme wechseln', 'info');
                this.consoleLog('  reset    - Daten zurücksetzen', 'warn');
                break;

            case 'stats':
                if (typeof Statistics !== 'undefined') {
                    const global = Statistics.getGlobal();
                    this.consoleLog(`Spiele: ${global.totalGamesPlayed}`, 'success');
                    this.consoleLog(`Fragen: ${global.totalQuestionsAnswered}`, 'success');
                    this.consoleLog(`Richtig: ${global.totalCorrectAnswers}`, 'success');
                    this.consoleLog(`Punkte: ${global.totalPointsEarned}`, 'success');
                    this.consoleLog(`Streak: ${global.bestStreak}`, 'success');
                } else {
                    this.consoleLog('Statistics nicht verfügbar', 'error');
                }
                break;

            case 'clear':
                const output = document.getElementById('consoleOutput');
                if (output) output.innerHTML = '';
                this.consoleLog('Console geleert', 'info');
                break;

            case 'storage':
                this.consoleLog(`Keys: ${localStorage.length}`, 'info');
                let totalSize = 0;
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    const size = (localStorage.getItem(key) || '').length * 2;
                    totalSize += size;
                    this.consoleLog(`  ${key}: ${this.formatBytes(size)}`, 'info');
                }
                this.consoleLog(`Gesamt: ${this.formatBytes(totalSize)}`, 'success');
                break;

            case 'version':
                this.consoleLog(`AUT Quiz v${App.version}`, 'success');
                this.consoleLog(`Build: ${App.buildDate}`, 'info');
                break;

            case 'games':
                if (typeof GameRegistry !== 'undefined') {
                    const games = GameRegistry.getAll();
                    this.consoleLog(`Registrierte Spiele: ${games.length}`, 'info');
                    games.forEach(g => this.consoleLog(`  - ${g.name} (${g.id})`, 'info'));
                }
                break;

            case 'theme':
                const themes = ['light', 'dark', 'auto'];
                const current = Theme.getTheme();
                const nextIndex = (themes.indexOf(current) + 1) % themes.length;
                Theme.setTheme(themes[nextIndex]);
                this.updateThemeSelection();
                this.consoleLog(`Theme: ${themes[nextIndex]}`, 'success');
                break;

            case 'reset':
                if (args[0] === 'confirm') {
                    Storage.clear();
                    this.consoleLog('Alle Daten gelöscht', 'warn');
                    setTimeout(() => location.reload(), 1000);
                } else {
                    this.consoleLog('Tippe "reset confirm" zum Bestätigen', 'warn');
                }
                break;

            default:
                this.consoleLog(`Unbekannter Befehl: ${command}`, 'error');
                this.consoleLog('Tippe "help" für Hilfe', 'info');
        }
    },

    /**
     * Log to dev console
     */
    consoleLog(message, type = 'info') {
        const output = document.getElementById('consoleOutput');
        if (!output) return;

        const line = document.createElement('div');
        line.className = `console-line ${type}`;
        line.innerHTML = `
            <span class="timestamp">${this.getTimestamp()}</span>
            <span class="message">${message}</span>
        `;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    },

    /**
     * Get current timestamp
     */
    getTimestamp() {
        const now = new Date();
        return `[${now.toTimeString().split(' ')[0]}]`;
    },

    /**
     * Start performance monitor
     */
    startPerfMonitor() {
        let lastTime = performance.now();
        let frames = 0;

        const update = () => {
            frames++;
            const now = performance.now();
            
            if (now - lastTime >= 1000) {
                const fps = Math.round(frames * 1000 / (now - lastTime));
                document.getElementById('perfFps').textContent = fps;
                
                if (performance.memory) {
                    const usedMB = Math.round(performance.memory.usedJSHeapSize / 1048576);
                    document.getElementById('perfMemory').textContent = `${usedMB}MB`;
                }
                
                frames = 0;
                lastTime = now;
            }

            if (Storage.get(this.KEYS.PERF_MONITOR)) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    },

    /**
     * Update system info
     */
    updateSystemInfo() {
        // Browser info
        const browserInfo = document.getElementById('browserInfo');
        if (browserInfo) {
            const ua = navigator.userAgent;
            let browser = 'Unbekannt';
            if (ua.includes('Chrome')) browser = 'Chrome';
            else if (ua.includes('Firefox')) browser = 'Firefox';
            else if (ua.includes('Safari')) browser = 'Safari';
            else if (ua.includes('Edge')) browser = 'Edge';
            browserInfo.textContent = browser;
        }

        // Viewport
        const viewportInfo = document.getElementById('viewportInfo');
        if (viewportInfo) {
            viewportInfo.textContent = `${window.innerWidth}×${window.innerHeight}`;
            window.addEventListener('resize', () => {
                viewportInfo.textContent = `${window.innerWidth}×${window.innerHeight}`;
            });
        }

        // Theme
        const currentTheme = document.getElementById('currentTheme');
        if (currentTheme) {
            currentTheme.textContent = Theme.getTheme();
        }

        // Games
        const registeredGames = document.getElementById('registeredGames');
        if (registeredGames && typeof GameRegistry !== 'undefined') {
            registeredGames.textContent = GameRegistry.getAll().length;
        }
    },

    /**
     * Initialize a toggle setting
     */
    initToggle(id, key, defaultValue, callback) {
        const toggle = document.getElementById(id);
        if (!toggle) return;

        const savedValue = Storage.get(key, defaultValue);
        toggle.checked = savedValue;
        if (callback) callback(savedValue);

        toggle.addEventListener('change', (e) => {
            Storage.set(key, e.target.checked);
            if (callback) callback(e.target.checked);
        });
    },

    /**
     * Load all saved settings
     */
    loadAllSettings() {
        // Apply colorblind mode
        const colorblindMode = Storage.get(this.KEYS.COLORBLIND, 'none');
        this.applyColorblindMode(colorblindMode);
        document.querySelectorAll('.colorblind-option').forEach(opt => {
            opt.classList.toggle('active', opt.dataset.mode === colorblindMode);
        });

        // Apply high contrast
        if (Storage.get(this.KEYS.HIGH_CONTRAST)) {
            document.body.classList.add('high-contrast');
        }

        // Apply reduced motion
        if (Storage.get(this.KEYS.REDUCED_MOTION)) {
            document.body.classList.add('reduced-motion');
        }

        // Apply large targets
        if (Storage.get(this.KEYS.LARGE_TARGETS)) {
            document.body.classList.add('large-targets');
        }

        // Apply particles setting
        if (!Storage.get(this.KEYS.PARTICLES, true)) {
            const bg = document.querySelector('.settings-bg');
            if (bg) bg.style.display = 'none';
        }
    },

    /**
     * Format bytes to human readable
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    SettingsPage.init();
});
