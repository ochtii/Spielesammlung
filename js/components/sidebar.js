/**
 * Sidebar Navigation Component
 * Modern side menu - Desktop always open, mobile expandable
 */
const Sidebar = {
    sidebar: null,
    overlay: null,
    toggle: null,
    isOpen: false,

    /**
     * Initialize sidebar
     */
    init() {
        this.sidebar = document.getElementById('sidebar');
        this.overlay = document.getElementById('sidebarOverlay');
        this.toggle = document.getElementById('sidebarToggle');
        
        if (!this.sidebar) {
            console.warn('Sidebar element not found');
            return;
        }

        this.setupEvents();
        this.setActiveLink();
        this.initThemeToggle();
        this.updatePointsDisplay();
        
        // Listen for points updates
        if (typeof EventBus !== 'undefined') {
            EventBus.on('POINTS_UPDATE', () => this.updatePointsDisplay());
        }
    },

    /**
     * Setup event listeners
     */
    setupEvents() {
        // Toggle button
        this.toggle?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleSidebar();
        });

        // Close button inside sidebar
        const closeBtn = this.sidebar?.querySelector('.sidebar-close');
        closeBtn?.addEventListener('click', () => this.closeSidebar());

        // Overlay click to close
        this.overlay?.addEventListener('click', () => this.closeSidebar());

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeSidebar();
            }
        });

        // Close on link click (mobile only)
        this.sidebar?.querySelectorAll('.sidebar-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 1024) {
                    this.closeSidebar();
                }
            });
        });

        // Handle resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (window.innerWidth >= 1024) {
                    this.closeSidebar(false);
                }
            }, 100);
        });
    },

    /**
     * Toggle sidebar open/closed
     */
    toggleSidebar() {
        if (this.isOpen) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    },

    /**
     * Open sidebar
     */
    openSidebar() {
        this.isOpen = true;
        this.sidebar?.classList.add('open');
        this.overlay?.classList.add('visible');
        this.toggle?.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    /**
     * Close sidebar
     * @param {boolean} animate - Whether to animate the close
     */
    closeSidebar(animate = true) {
        this.isOpen = false;
        this.sidebar?.classList.remove('open');
        this.overlay?.classList.remove('visible');
        this.toggle?.classList.remove('active');
        document.body.style.overflow = '';
    },

    /**
     * Set active link based on current page
     */
    setActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        this.sidebar?.querySelectorAll('.sidebar-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },

    /**
     * Initialize theme toggle in sidebar
     */
    initThemeToggle() {
        const themeSwitch = this.sidebar?.querySelector('.theme-switch');
        if (!themeSwitch) return;

        themeSwitch.addEventListener('click', () => {
            if (typeof Theme !== 'undefined') {
                const currentTheme = Theme.getTheme();
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                Theme.setTheme(newTheme);
            }
        });
    },

    /**
     * Update points display in footer
     */
    updatePointsDisplay() {
        const pointsValue = this.sidebar?.querySelector('.sidebar-footer-value');
        if (pointsValue && typeof Storage !== 'undefined') {
            const points = Storage.get('totalPoints', 0);
            pointsValue.textContent = points.toLocaleString('de-DE') + ' Punkte';
        }
    },

    /**
     * Generate sidebar HTML
     * @param {string} activePage - Current page identifier
     * @returns {string} Sidebar HTML
     */
    generateHTML(activePage = '') {
        const version = typeof AppConfig !== 'undefined' ? AppConfig.BUILD_VERSION : '2.1.4';
        
        return `
            <!-- Sidebar Toggle Button -->
            <button class="sidebar-toggle" id="sidebarToggle" aria-label="Menü öffnen">
                <div class="sidebar-toggle-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>

            <!-- Sidebar Overlay -->
            <div class="sidebar-overlay" id="sidebarOverlay"></div>

            <!-- Sidebar -->
            <aside class="sidebar" id="sidebar">
                <div class="sidebar-header">
                    <a href="index.html" class="sidebar-brand">
                        <div class="sidebar-brand-icon">
                            <i class="fas fa-flag"></i>
                        </div>
                        <div>
                            <div class="sidebar-brand-text">AUT Quiz</div>
                            <div class="sidebar-brand-version">v${version}</div>
                        </div>
                    </a>
                    <button class="sidebar-close" aria-label="Menü schließen">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <nav class="sidebar-nav">
                    <div class="sidebar-section">
                        <div class="sidebar-section-title">Navigation</div>
                        <a href="index.html" class="sidebar-link ${activePage === 'game' ? 'active' : ''}">
                            <i class="fas fa-gamepad"></i>
                            <span>Spiele</span>
                        </a>
                        <a href="points.html" class="sidebar-link ${activePage === 'points' ? 'active' : ''}">
                            <i class="fas fa-coins"></i>
                            <span>Punkte</span>
                        </a>
                        <a href="stats.html" class="sidebar-link ${activePage === 'stats' ? 'active' : ''}">
                            <i class="fas fa-chart-bar"></i>
                            <span>Statistiken</span>
                        </a>
                    </div>

                    <div class="sidebar-section">
                        <div class="sidebar-section-title">Mehr</div>
                        <a href="settings.html" class="sidebar-link ${activePage === 'settings' ? 'active' : ''}">
                            <i class="fas fa-cog"></i>
                            <span>Einstellungen</span>
                        </a>
                        <a href="help.html" class="sidebar-link ${activePage === 'help' ? 'active' : ''}">
                            <i class="fas fa-question-circle"></i>
                            <span>Hilfe & FAQ</span>
                        </a>
                        <a href="impressum.html" class="sidebar-link ${activePage === 'impressum' ? 'active' : ''}">
                            <i class="fas fa-info-circle"></i>
                            <span>Impressum</span>
                        </a>
                    </div>

                    <div class="sidebar-theme-toggle">
                        <span class="sidebar-theme-label">
                            <i class="fas fa-moon"></i>
                            Theme
                        </span>
                        <div class="theme-switch" role="button" aria-label="Theme wechseln"></div>
                    </div>
                </nav>

                <div class="sidebar-footer">
                    <div class="sidebar-footer-info">
                        <div class="sidebar-footer-icon">
                            <i class="fas fa-trophy"></i>
                        </div>
                        <div class="sidebar-footer-text">
                            <div class="sidebar-footer-label">Gesamtpunkte</div>
                            <div class="sidebar-footer-value">0 Punkte</div>
                        </div>
                    </div>
                </div>
            </aside>
        `;
    },

    /**
     * Inject sidebar into page
     * @param {string} activePage - Current page identifier
     */
    inject(activePage = '') {
        // Detect active page from body data attribute or URL
        if (!activePage) {
            activePage = document.body.dataset.page || '';
        }

        // Insert at beginning of body
        document.body.insertAdjacentHTML('afterbegin', this.generateHTML(activePage));
        
        // Add sidebar class to body
        document.body.classList.add('has-sidebar');
        
        // Initialize after injection
        this.init();
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Sidebar;
}
