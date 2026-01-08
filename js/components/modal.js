/**
 * Modal Component - Wiederverwendbares Modal-System
 */
const Modal = {
    activeModal: null,
    
    /**
     * Zeigt ein Modal an
     * @param {Object} options 
     */
    show(options = {}) {
        const {
            title = '',
            content = '',
            icon = null,
            iconClass = '',
            footer = null,
            size = 'md', // sm, md, lg
            closable = true,
            onClose = null
        } = options;

        // Altes Modal entfernen falls vorhanden
        this.close();

        // Modal-Overlay erstellen
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay open';
        overlay.innerHTML = `
            <div class="modal modal-${size}">
                <div class="modal-header">
                    ${icon ? `<span class="modal-icon ${iconClass}"><i class="fas fa-${icon}"></i></span>` : ''}
                    <h3 class="modal-title">${title}</h3>
                    ${closable ? '<button class="modal-close" aria-label="Schließen"><i class="fas fa-times"></i></button>' : ''}
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
            </div>
        `;

        // Event Listeners
        if (closable) {
            overlay.querySelector('.modal-close')?.addEventListener('click', () => {
                this.close();
                if (onClose) onClose();
            });

            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.close();
                    if (onClose) onClose();
                }
            });
        }

        // ESC zum Schließen
        this.escHandler = (e) => {
            if (e.key === 'Escape' && closable) {
                this.close();
                if (onClose) onClose();
            }
        };
        document.addEventListener('keydown', this.escHandler);

        // Zum DOM hinzufügen
        document.body.appendChild(overlay);
        document.body.classList.add('modal-open');
        this.activeModal = overlay;

        // Animation triggern
        requestAnimationFrame(() => {
            overlay.classList.add('visible');
        });

        return overlay;
    },

    /**
     * Schließt das aktive Modal
     */
    close() {
        if (!this.activeModal) return;

        this.activeModal.classList.remove('visible');
        document.body.classList.remove('modal-open');
        
        // ESC Handler entfernen
        if (this.escHandler) {
            document.removeEventListener('keydown', this.escHandler);
        }

        // Nach Animation entfernen
        setTimeout(() => {
            if (this.activeModal) {
                this.activeModal.remove();
                this.activeModal = null;
            }
        }, 300);
    },

    /**
     * Zeigt ein Bestätigungs-Modal
     * @param {Object} options 
     * @returns {Promise<boolean>}
     */
    confirm(options = {}) {
        const {
            title = 'Bestätigen',
            message = 'Bist du sicher?',
            confirmText = 'Ja',
            cancelText = 'Abbrechen',
            confirmClass = 'btn-primary',
            icon = 'question-circle'
        } = options;

        return new Promise((resolve) => {
            this.show({
                title,
                icon,
                content: `<p class="modal-message">${message}</p>`,
                footer: `
                    <button class="btn btn-secondary modal-cancel">${cancelText}</button>
                    <button class="btn ${confirmClass} modal-confirm">${confirmText}</button>
                `,
                closable: true,
                onClose: () => resolve(false)
            });

            this.activeModal.querySelector('.modal-cancel')?.addEventListener('click', () => {
                this.close();
                resolve(false);
            });

            this.activeModal.querySelector('.modal-confirm')?.addEventListener('click', () => {
                this.close();
                resolve(true);
            });
        });
    },

    /**
     * Zeigt ein Info-Modal
     * @param {Object} options 
     */
    info(options = {}) {
        const {
            title = 'Information',
            message = '',
            icon = 'info-circle'
        } = options;

        return this.show({
            title,
            icon,
            iconClass: 'text-info',
            content: typeof message === 'string' ? `<p>${message}</p>` : message,
            closable: true
        });
    },

    /**
     * Zeigt ein Erfolgs-Modal
     * @param {Object} options 
     */
    success(options = {}) {
        const {
            title = 'Erfolg',
            message = '',
            icon = 'check-circle'
        } = options;

        return this.show({
            title,
            icon,
            iconClass: 'text-success',
            content: typeof message === 'string' ? `<p>${message}</p>` : message,
            closable: true
        });
    },

    /**
     * Zeigt ein Fehler-Modal
     * @param {Object} options 
     */
    error(options = {}) {
        const {
            title = 'Fehler',
            message = '',
            icon = 'exclamation-circle'
        } = options;

        return this.show({
            title,
            icon,
            iconClass: 'text-error',
            content: typeof message === 'string' ? `<p>${message}</p>` : message,
            closable: true
        });
    }
};

// Global verfügbar machen
window.Modal = Modal;
