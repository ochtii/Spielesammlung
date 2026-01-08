/**
 * AUT Quiz - Footer Loader
 */

function initFooter() {
    const container = document.getElementById('footer-container');
    if (!container) return;
    
    const enabled = localStorage.getItem('footerEnabled') !== 'false';
    if (!enabled) {
        container.style.display = 'none';
        return;
    }
    
    container.innerHTML = `
        <footer class="footer">
            <div class="footer-content">
                <div class="footer-links">
                    <a href="impressum.html">Impressum</a>
                    <a href="entwickler.html">Entwickler</a>
                    <a href="faq.html">FAQ</a>
                </div>
                <p class="footer-copy">&copy; ${new Date().getFullYear()} AUT Quiz</p>
            </div>
        </footer>
    `;
}

// Auto-init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooter);
} else {
    initFooter();
}
