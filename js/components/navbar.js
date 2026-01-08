/**
 * Navbar Component
 */
const Navbar = {
    menuToggle: null,
    menuDropdown: null,

    /**
     * Initialize navbar
     */
    init() {
        this.menuToggle = document.getElementById('menuToggle');
        this.menuDropdown = document.getElementById('menuDropdown');

        if (this.menuToggle && this.menuDropdown) {
            this.setupMenu();
        }
    },

    /**
     * Setup menu toggle functionality
     */
    setupMenu() {
        // Toggle on button click
        this.menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!this.menuDropdown.contains(e.target) && 
                !this.menuToggle.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeMenu();
        });

        // Close on menu item click
        this.menuDropdown.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', () => this.closeMenu());
        });
    },

    /**
     * Toggle menu open/closed
     */
    toggleMenu() {
        const isOpen = this.menuDropdown.classList.toggle('open');
        this.menuToggle.setAttribute('aria-expanded', isOpen);
    },

    /**
     * Close menu
     */
    closeMenu() {
        this.menuDropdown.classList.remove('open');
        this.menuToggle.setAttribute('aria-expanded', 'false');
    },

    /**
     * Open menu
     */
    openMenu() {
        this.menuDropdown.classList.add('open');
        this.menuToggle.setAttribute('aria-expanded', 'true');
    }
};
