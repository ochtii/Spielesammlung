/**
 * AUT Quiz - Entwickler Page
 */

document.addEventListener('DOMContentLoaded', () => {
    loadDevInfo();
    setupCopyButtons();
});

function loadDevInfo() {
    setText('appVersion', 'v1.0.0');
    setText('lastUpdate', new Date().toLocaleDateString('de-DE'));
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

function setupCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.dataset.copy;
            if (!text) return;
            
            navigator.clipboard.writeText(text).then(() => {
                const original = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i> Kopiert!';
                setTimeout(() => {
                    btn.innerHTML = original;
                }, 2000);
            });
        });
    });
}
