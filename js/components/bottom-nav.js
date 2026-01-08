/**
 * Bottom Navigation Component
 */
const BottomNav = {
    element: null,
    pointsBadge: null,

    /**
     * Initialize bottom nav
     */
    init() {
        this.element = document.getElementById('bottomNav');
        this.pointsBadge = document.getElementById('pointsBadge');
        
        if (this.element) {
            document.body.classList.add('has-bottom-nav');
            this.setActiveItem();
            this.updatePointsBadge();
        }

        // Listen for points updates (safe check for EventBus)
        if (typeof EventBus !== 'undefined' && typeof Events !== 'undefined') {
            EventBus.on(Events.POINTS_UPDATE, () => this.updatePointsBadge());
        }
    },

    /**
     * Set active nav item based on current page
     */
    setActiveItem() {
        const currentPath = window.location.pathname;
        const items = this.element.querySelectorAll('.bottom-nav-item');
        
        items.forEach(item => {
            const href = item.getAttribute('href');
            const isActive = currentPath.endsWith(href) || 
                            (href === 'index.html' && (currentPath === '/' || currentPath.endsWith('/')));
            item.classList.toggle('active', isActive);
        });
    },

    /**
     * Update points badge
     */
    updatePointsBadge() {
        if (!this.pointsBadge) return;
        
        const points = Storage.get('totalPoints', 0);
        this.pointsBadge.textContent = points;
        this.pointsBadge.classList.toggle('hidden', points === 0);
    },

    /**
     * Show/hide bottom nav
     * @param {boolean} show 
     */
    setVisible(show) {
        if (this.element) {
            this.element.classList.toggle('hidden', !show);
            document.body.classList.toggle('has-bottom-nav', show);
        }
    }
};
