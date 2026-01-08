/**
 * Toast Component - Notification Messages
 */
const Toast = {
    container: null,

    /**
     * Initialize toast container
     */
    init() {
        if (this.container) return;
        
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);
    },

    /**
     * Show a toast message
     * @param {string} message 
     * @param {Object} options 
     */
    show(message, options = {}) {
        this.init();

        const { 
            type = 'default', // 'success', 'error', 'warning', 'info'
            duration = 3000,
            icon = null 
        } = options;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        if (icon) {
            toast.innerHTML = `<i class="fas fa-${icon}"></i> ${message}`;
        } else {
            toast.textContent = message;
        }

        this.container.appendChild(toast);

        // Auto-remove
        setTimeout(() => {
            toast.classList.add('toast-out');
            setTimeout(() => toast.remove(), 200);
        }, duration);
    },

    /**
     * Show success toast
     */
    success(message, duration = 3000) {
        this.show(message, { type: 'success', icon: 'check', duration });
    },

    /**
     * Show error toast
     */
    error(message, duration = 3000) {
        this.show(message, { type: 'error', icon: 'times', duration });
    },

    /**
     * Show warning toast
     */
    warning(message, duration = 3000) {
        this.show(message, { type: 'warning', icon: 'exclamation', duration });
    },

    /**
     * Show info toast
     */
    info(message, duration = 3000) {
        this.show(message, { type: 'info', icon: 'info', duration });
    }
};
