/**
 * Developer Tools Component
 * Globale Funktionen für Entwickler-Tools
 */

(function() {
    'use strict';

    // Verhindere Mehrfach-Initialisierung
    if (window.devToolsInitialized) return;
    window.devToolsInitialized = true;

    // Toast-Notification für Cache Clear
    function showCacheClearedToast() {
        // Entferne bestehende Toast
        const existingToast = document.querySelector('.cache-cleared-toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = 'cache-cleared-toast';
        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Cache geleert & Seite wird neu geladen!</span>
        `;
        document.body.appendChild(toast);

        // Animation starten
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);

        // Nach 3 Sekunden ausblenden
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) toast.remove();
            }, 300);
        }, 3000);
    }

    // Footer Settings Funktion
    window.applyFooterSettings = function(enabled) {
        const footer = document.getElementById('footer-container');
        if (footer) {
            // Footer-Details ein/ausschalten - zeige versteckte Informationen
            const footerDetails = footer.querySelectorAll('.footer-detail, #commitInfo, .footer-links, .footer-copyright');
            footerDetails.forEach(detail => {
                if (enabled) {
                    detail.style.display = detail.dataset.originalDisplay || 'block';
                } else {
                    // Verstecke Details, aber zeige immer das Copyright
                    if (detail.classList.contains('footer-copyright')) {
                        detail.style.display = 'block';
                    } else {
                        detail.dataset.originalDisplay = detail.style.display || window.getComputedStyle(detail).display;
                        detail.style.display = 'none';
                    }
                }
            });

            // Zusätzliche Debug-Info anzeigen wenn aktiviert
            if (enabled && !footer.querySelector('.footer-debug-info')) {
                const debugInfo = document.createElement('div');
                debugInfo.className = 'footer-debug-info footer-detail';
                debugInfo.innerHTML = `
                    <small style="color: var(--text-secondary); font-size: 0.8rem;">
                        Debug: Footer-Details aktiviert | Theme: ${localStorage.getItem('theme') || 'auto'} |
                        Zoom: ${localStorage.getItem('pageZoom') || '1'}x
                    </small>
                `;
                footer.appendChild(debugInfo);
            } else if (!enabled) {
                const debugInfo = footer.querySelector('.footer-debug-info');
                if (debugInfo) debugInfo.remove();
            }
        }
    };

    // Resize Button Settings Funktion
    window.applyResizeButtonSettings = function(enabled) {
        let resizeBtn = document.getElementById('resizeBtn');
        if (!resizeBtn && enabled) {
            // Resize-Button erstellen falls er nicht existiert
            resizeBtn = document.createElement('button');
            resizeBtn.id = 'resizeBtn';
            resizeBtn.className = 'resize-btn';
            resizeBtn.innerHTML = '<i class="fas fa-expand"></i>';
            resizeBtn.title = 'Seite zoomen';
            resizeBtn.addEventListener('click', () => {
                // Zoom-Funktionalität mit CSS transform
                const currentZoom = parseFloat(localStorage.getItem('pageZoom') || '1');
                const newZoom = currentZoom >= 1.5 ? 1 : currentZoom + 0.25;
                document.body.style.transform = `scale(${newZoom})`;
                document.body.style.transformOrigin = 'top left';
                document.body.style.width = `${100 / newZoom}%`;
                document.body.style.height = `${100 / newZoom}%`;
                localStorage.setItem('pageZoom', newZoom);

                // Debug-Nachricht
                if (window.debugSystem) {
                    window.debugSystem.log('info', `Zoom geändert auf ${newZoom}x`);
                }
            });
            document.body.appendChild(resizeBtn);
        } else if (resizeBtn && !enabled) {
            resizeBtn.remove();
        }

        // Stelle gespeicherten Zoom wieder her
        const savedZoom = parseFloat(localStorage.getItem('pageZoom') || '1');
        if (savedZoom !== 1) {
            document.body.style.transform = `scale(${savedZoom})`;
            document.body.style.transformOrigin = 'top left';
            document.body.style.width = `${100 / savedZoom}%`;
            document.body.style.height = `${100 / savedZoom}%`;
        }
    };

    // Hard Reload Button Settings Funktion
    window.applyHardReloadButtonSettings = function(enabled) {
        let hardReloadBtn = document.getElementById('hardReloadBtn');
        if (!hardReloadBtn && enabled) {
            // Hard Reload Button erstellen
            hardReloadBtn = document.createElement('button');
            hardReloadBtn.id = 'hardReloadBtn';
            hardReloadBtn.className = 'hard-reload-btn';
            hardReloadBtn.innerHTML = '<i class="fas fa-redo-alt"></i>';
            hardReloadBtn.title = 'Hard Reload & Cache leeren';
            hardReloadBtn.addEventListener('click', async () => {
                // Button deaktivieren und Animation starten
                hardReloadBtn.disabled = true;
                hardReloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                hardReloadBtn.style.opacity = '0.7';

                try {
                    // Cache leeren
                    if ('caches' in window) {
                        const cacheNames = await caches.keys();
                        await Promise.all(cacheNames.map(name => caches.delete(name)));
                    }

                    // Service Worker deregistrieren
                    if ('serviceWorker' in navigator) {
                        const registrations = await navigator.serviceWorker.getRegistrations();
                        await Promise.all(registrations.map(reg => reg.unregister()));
                    }

                    // localStorage und sessionStorage leeren (außer bestimmte Keys)
                    const keysToKeep = ['theme', 'accentColor', 'fontSize', 'pointsData', 'foundEasterEggs'];
                    const allKeys = Object.keys(localStorage);
                    allKeys.forEach(key => {
                        if (!keysToKeep.includes(key)) {
                            localStorage.removeItem(key);
                        }
                    });
                    sessionStorage.clear();

                    // Erfolgsmeldung anzeigen
                    showCacheClearedToast();

                    // Nach kurzer Verzögerung neu laden
                    setTimeout(() => {
                        window.location.reload(true);
                    }, 1000);

                } catch (error) {
                    console.error('Hard reload error:', error);
                    // Trotzdem neu laden
                    window.location.reload(true);
                }
            });
            document.body.appendChild(hardReloadBtn);
        } else if (hardReloadBtn && !enabled) {
            hardReloadBtn.remove();
        }
    };

    // Debug Settings Funktion
    window.applyDebugSettings = function(enabled) {
        if (enabled) {
            // Debug-System initialisieren falls es nicht existiert
            if (!window.debugSystem) {
                // Debug-UI Container erstellen
                let debugContainer = document.getElementById('debug-container');
                if (!debugContainer) {
                    debugContainer = document.createElement('div');
                    debugContainer.id = 'debug-container';
                    debugContainer.className = 'debug-container';
                    debugContainer.innerHTML = `
                        <div class="debug-header">
                            <span>Debug Console</span>
                            <button id="debug-clear-btn" title="Konsole leeren">
                                <i class="fas fa-trash"></i>
                            </button>
                            <button id="debug-toggle-btn" title="Konsole ein-/ausblenden">
                                <i class="fas fa-chevron-down"></i>
                            </button>
                        </div>
                        <div class="debug-messages" id="debug-messages"></div>
                    `;
                    document.body.appendChild(debugContainer);

                    // Event Listener für Debug-UI
                    const clearBtn = debugContainer.querySelector('#debug-clear-btn');
                    const toggleBtn = debugContainer.querySelector('#debug-toggle-btn');
                    const messagesDiv = debugContainer.querySelector('#debug-messages');

                    clearBtn.addEventListener('click', () => {
                        messagesDiv.innerHTML = '';
                    });

                    toggleBtn.addEventListener('click', () => {
                        const messages = debugContainer.querySelector('.debug-messages');
                        const icon = toggleBtn.querySelector('i');
                        if (messages.style.display === 'none') {
                            messages.style.display = 'block';
                            icon.className = 'fas fa-chevron-down';
                        } else {
                            messages.style.display = 'none';
                            icon.className = 'fas fa-chevron-up';
                        }
                    });
                }

                window.debugSystem = {
                    level: localStorage.getItem('debugLevel') || 'error',
                    consoleOutput: localStorage.getItem('debugConsoleOutputEnabled') === 'true',
                    messages: [],
                    log: function(level, message, ...args) {
                        const levels = { 'error': 0, 'warn': 1, 'info': 2, 'debug': 3 };
                        if (levels[level] <= levels[this.level]) {
                            const timestamp = new Date().toLocaleTimeString();
                            const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

                            // Zur Nachrichtenliste hinzufügen
                            this.messages.push({ level, message: logMessage, timestamp });

                            // In Konsole ausgeben wenn aktiviert
                            if (this.consoleOutput) {
                                console[level](logMessage, ...args);
                            }

                            // In UI anzeigen
                            this.displayMessage(level, logMessage);
                        }
                    },
                    displayMessage: function(level, message) {
                        const messagesDiv = document.getElementById('debug-messages');
                        if (messagesDiv) {
                            const messageEl = document.createElement('div');
                            messageEl.className = `debug-message debug-${level}`;
                            messageEl.textContent = message;
                            messagesDiv.appendChild(messageEl);
                            messagesDiv.scrollTop = messagesDiv.scrollHeight;
                        }
                    },
                    setLevel: function(level) {
                        this.level = level;
                        this.log('info', `Debug-Level geändert auf: ${level}`);
                    },
                    setConsoleOutput: function(enabled) {
                        this.consoleOutput = enabled;
                        this.log('info', `Konsole-Ausgabe ${enabled ? 'aktiviert' : 'deaktiviert'}`);
                    },
                    clear: function() {
                        this.messages = [];
                        const messagesDiv = document.getElementById('debug-messages');
                        if (messagesDiv) messagesDiv.innerHTML = '';
                    }
                };

                // Einige Beispiel-Nachrichten für Test
                window.debugSystem.log('info', 'Debug-System initialisiert');
                window.debugSystem.log('debug', 'Debug-Level: ' + window.debugSystem.level);
            }
        } else {
            // Debug-System deaktivieren
            if (window.debugSystem) {
                const debugContainer = document.getElementById('debug-container');
                if (debugContainer) debugContainer.remove();
                window.debugSystem = null;
            }
        }
    };

    // Initialisiere Entwickler-Tools beim Laden der Seite
    function initDevTools() {
        const footerEnabled = localStorage.getItem('footerSettingsEnabled') === 'true';
        const resizeEnabled = localStorage.getItem('resizeButtonEnabled') === 'true';
        const hardReloadEnabled = localStorage.getItem('hardReloadButtonEnabled') === 'true';
        const debugEnabled = localStorage.getItem('debugMessagesEnabled') === 'true';

        applyFooterSettings(footerEnabled);
        applyResizeButtonSettings(resizeEnabled);
        applyHardReloadButtonSettings(hardReloadEnabled);
        applyDebugSettings(debugEnabled);

        // Zoom wiederherstellen falls gespeichert
        const savedZoom = localStorage.getItem('pageZoom');
        if (savedZoom && savedZoom !== '1') {
            const zoomValue = parseFloat(savedZoom);
            document.body.style.transform = `scale(${zoomValue})`;
            document.body.style.transformOrigin = 'top left';
            document.body.style.width = `${100 / zoomValue}%`;
            document.body.style.height = `${100 / zoomValue}%`;
        }
    }

    // Warte bis DOM geladen ist
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDevTools);
    } else {
        initDevTools();
    }

})();