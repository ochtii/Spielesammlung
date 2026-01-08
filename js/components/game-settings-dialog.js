/**
 * Game Settings Dialog - Interaktive Spielkonfiguration
 */
const GameSettingsDialog = {
    // Default Settings
    defaults: {
        mode: 'amateur',
        timer: {
            enabled: false,
            seconds: 30
        },
        joker: {
            enabled: true,
            count: 2
        },
        hardcore: false
    },

    // Current Settings (wird bei Dialog-Öffnung zurückgesetzt)
    current: null,

    /**
     * Öffnet den Game-Settings Dialog
     * @param {Object} game - Das ausgewählte Spiel
     * @param {Function} onStart - Callback beim Start
     */
    show(game, onStart) {
        // Reset auf Defaults
        this.current = JSON.parse(JSON.stringify(this.defaults));
        
        const supportsMode = gameSupportsMode(game.id);

        const content = `
            <div class="game-settings-dialog">
                <!-- Spiel-Header -->
                <div class="gsd-header">
                    <div class="gsd-game-icon">
                        <i class="fas ${game.icon}"></i>
                    </div>
                    <div class="gsd-game-info">
                        <h3 class="gsd-game-name">${game.name}</h3>
                        <p class="gsd-game-desc">${game.description}</p>
                    </div>
                </div>

                ${supportsMode ? this.renderModeSelection() : ''}

                <!-- Quick Settings -->
                <div class="gsd-section">
                    <div class="gsd-section-title">
                        <i class="fas fa-sliders-h"></i>
                        Spieleinstellungen
                    </div>
                    
                    <!-- Timer -->
                    <div class="gsd-setting">
                        <div class="gsd-setting-info">
                            <div class="gsd-setting-icon timer">
                                <i class="fas fa-clock"></i>
                            </div>
                            <div class="gsd-setting-text">
                                <span class="gsd-setting-label">Timer</span>
                                <span class="gsd-setting-desc">Zeitlimit pro Frage</span>
                            </div>
                        </div>
                        <div class="gsd-setting-control">
                            <label class="toggle-switch">
                                <input type="checkbox" id="gsdTimerToggle">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    
                    <!-- Timer Zeit -->
                    <div class="gsd-setting gsd-sub-setting hidden" id="gsdTimerOptions">
                        <div class="gsd-time-selector">
                            <button class="gsd-time-btn" data-time="15">15s</button>
                            <button class="gsd-time-btn active" data-time="30">30s</button>
                            <button class="gsd-time-btn" data-time="45">45s</button>
                            <button class="gsd-time-btn" data-time="60">60s</button>
                        </div>
                    </div>

                    <!-- Joker -->
                    <div class="gsd-setting">
                        <div class="gsd-setting-info">
                            <div class="gsd-setting-icon joker">
                                <i class="fas fa-magic"></i>
                            </div>
                            <div class="gsd-setting-text">
                                <span class="gsd-setting-label">Joker</span>
                                <span class="gsd-setting-desc">50:50 Hilfe (2x pro Spiel)</span>
                            </div>
                        </div>
                        <div class="gsd-setting-control">
                            <label class="toggle-switch">
                                <input type="checkbox" id="gsdJokerToggle" checked>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Hardcore Mode -->
                <div class="gsd-section">
                    <div class="gsd-hardcore-card" id="gsdHardcoreCard">
                        <div class="gsd-hardcore-header">
                            <div class="gsd-hardcore-icon">
                                <i class="fas fa-skull-crossbones"></i>
                            </div>
                            <div class="gsd-hardcore-info">
                                <span class="gsd-hardcore-title">Hardcore Modus</span>
                                <span class="gsd-hardcore-badge">2x Punkte</span>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" id="gsdHardcoreToggle">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        <ul class="gsd-hardcore-features">
                            <li><i class="fas fa-bolt"></i> 10 Sekunden pro Frage</li>
                            <li><i class="fas fa-ban"></i> Keine Joker</li>
                            <li><i class="fas fa-eye-slash"></i> Antworten erscheinen verzögert</li>
                            <li><i class="fas fa-fire"></i> Doppelte Punkte</li>
                        </ul>
                    </div>
                </div>

                <!-- Start Button -->
                <button class="gsd-start-btn" id="gsdStartBtn">
                    <span class="gsd-start-btn-bg"></span>
                    <span class="gsd-start-btn-content">
                        <i class="fas fa-play"></i>
                        <span>Spiel starten</span>
                    </span>
                </button>
            </div>
        `;

        Modal.show({
            title: '',
            content: content,
            size: 'md',
            closable: true
        });

        // Event Listeners
        this.bindEvents(game, onStart, supportsMode);
    },

    /**
     * Rendert die Modus-Auswahl
     */
    renderModeSelection() {
        return `
            <div class="gsd-section">
                <div class="gsd-section-title">
                    <i class="fas fa-gamepad"></i>
                    Spielmodus
                </div>
                <div class="gsd-modes">
                    <div class="gsd-mode selected" data-mode="amateur">
                        <div class="gsd-mode-icon amateur">
                            <i class="fas fa-graduation-cap"></i>
                        </div>
                        <div class="gsd-mode-content">
                            <span class="gsd-mode-name">Amateur</span>
                            <span class="gsd-mode-desc">4 Optionen</span>
                        </div>
                    </div>
                    <div class="gsd-mode" data-mode="pro">
                        <div class="gsd-mode-icon pro">
                            <i class="fas fa-trophy"></i>
                        </div>
                        <div class="gsd-mode-content">
                            <span class="gsd-mode-name">Pro</span>
                            <span class="gsd-mode-desc">Texteingabe</span>
                        </div>
                    </div>
                    <div class="gsd-mode" data-mode="rainbow">
                        <div class="gsd-mode-icon rainbow">
                            <i class="fas fa-rainbow"></i>
                        </div>
                        <div class="gsd-mode-content">
                            <span class="gsd-mode-name">Rainbow</span>
                            <span class="gsd-mode-desc">Mit Hinweisen</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Bindet Event Listeners
     */
    bindEvents(game, onStart, supportsMode) {
        // Mode Selection
        if (supportsMode) {
            document.querySelectorAll('.gsd-mode').forEach(el => {
                el.addEventListener('click', () => {
                    document.querySelectorAll('.gsd-mode').forEach(m => m.classList.remove('selected'));
                    el.classList.add('selected');
                    this.current.mode = el.dataset.mode;
                });
            });
        }

        // Timer Toggle
        const timerToggle = document.getElementById('gsdTimerToggle');
        const timerOptions = document.getElementById('gsdTimerOptions');
        if (timerToggle && timerOptions) {
            timerToggle.addEventListener('change', () => {
                this.current.timer.enabled = timerToggle.checked;
                timerOptions.classList.toggle('hidden', !timerToggle.checked);
                
                // Hardcore deaktivieren wenn Timer manuell gesetzt
                if (timerToggle.checked) {
                    document.getElementById('gsdHardcoreToggle').checked = false;
                    this.current.hardcore = false;
                    document.getElementById('gsdHardcoreCard').classList.remove('active');
                }
            });
        }

        // Timer Zeit Buttons
        document.querySelectorAll('.gsd-time-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.gsd-time-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.current.timer.seconds = parseInt(btn.dataset.time);
            });
        });

        // Joker Toggle
        const jokerToggle = document.getElementById('gsdJokerToggle');
        if (jokerToggle) {
            jokerToggle.addEventListener('change', () => {
                this.current.joker.enabled = jokerToggle.checked;
            });
        }

        // Hardcore Toggle
        const hardcoreToggle = document.getElementById('gsdHardcoreToggle');
        const hardcoreCard = document.getElementById('gsdHardcoreCard');
        if (hardcoreToggle && hardcoreCard) {
            hardcoreToggle.addEventListener('change', () => {
                this.current.hardcore = hardcoreToggle.checked;
                hardcoreCard.classList.toggle('active', hardcoreToggle.checked);
                
                if (hardcoreToggle.checked) {
                    // Hardcore aktiviert: Timer auf 10s, Joker aus
                    timerToggle.checked = true;
                    this.current.timer.enabled = true;
                    this.current.timer.seconds = 10;
                    timerOptions.classList.remove('hidden');
                    document.querySelectorAll('.gsd-time-btn').forEach(b => b.classList.remove('active'));
                    
                    jokerToggle.checked = false;
                    this.current.joker.enabled = false;
                } else {
                    // Hardcore aus: zurück zu Defaults
                    timerToggle.checked = false;
                    this.current.timer.enabled = false;
                    timerOptions.classList.add('hidden');
                    
                    jokerToggle.checked = true;
                    this.current.joker.enabled = true;
                }
            });
        }

        // Start Button
        const startBtn = document.getElementById('gsdStartBtn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                Modal.close();
                if (onStart) {
                    onStart(game, this.current);
                }
            });
        }
    }
};

// Global verfügbar machen
window.GameSettingsDialog = GameSettingsDialog;
