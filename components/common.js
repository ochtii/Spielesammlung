/**
 * AUT Quiz - Gemeinsame Funktionen
 * Wird auf allen Seiten verwendet
 */

// ============================================
// THEME MANAGEMENT
// ============================================

function loadTheme() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark-mode', darkMode);
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);
    return isDark;
}

// ============================================
// FONT SIZE
// ============================================

function applyFontSize(size) {
    const scaleMap = { small: 0.875, medium: 1, large: 1.125 };
    const scale = scaleMap[size] || 1;
    document.documentElement.style.setProperty('--font-scale', scale);
    document.documentElement.setAttribute('data-font-size', size);
}

function loadFontSize() {
    const size = localStorage.getItem('fontSize') || 'medium';
    applyFontSize(size);
}

// ============================================
// ACCENT COLOR
// ============================================

function applyAccentColor(color) {
    if (color) {
        document.documentElement.style.setProperty('--primary', color);
        document.documentElement.style.setProperty('--accent', color);
    }
}

function loadAccentColor() {
    const color = localStorage.getItem('accentColor');
    if (color) applyAccentColor(color);
}

// ============================================
// MENU TOGGLE
// ============================================

function setupMenu() {
    const toggle = document.getElementById('menuToggle');
    const dropdown = document.getElementById('menuDropdown');
    
    if (!toggle || !dropdown) return;
    
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
        toggle.classList.toggle('active');
    });
    
    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('show');
            toggle.classList.remove('active');
        }
    });
}

// ============================================
// BOTTOM NAVIGATION
// ============================================

function setupBottomNav() {
    const bottomNav = document.getElementById('bottomNav');
    if (!bottomNav) return;
    
    const enabled = localStorage.getItem('bottomNavEnabled') !== 'false';
    bottomNav.style.display = enabled ? 'block' : 'none';
    
    // Update points badge
    updatePointsDisplay();
}

// ============================================
// POINTS DISPLAY
// ============================================

function updatePointsDisplay() {
    const points = parseInt(localStorage.getItem('totalPoints')) || 0;
    
    const menuPoints = document.getElementById('menuPointsDisplay');
    const bottomPoints = document.getElementById('bottomNavPoints');
    
    if (menuPoints) menuPoints.textContent = points;
    if (bottomPoints) bottomPoints.textContent = points;
}

// ============================================
// FOOTER
// ============================================

function loadFooter() {
    const container = document.getElementById('footer-container');
    if (!container) return;
    
    const enabled = localStorage.getItem('footerEnabled') !== 'false';
    if (!enabled) {
        container.style.display = 'none';
        return;
    }
    
    fetch('components/footer.html')
        .then(res => res.text())
        .then(html => {
            container.innerHTML = html;
        })
        .catch(() => {
            container.innerHTML = '';
        });
}

// ============================================
// INITIALIZATION
// ============================================

function initCommon() {
    loadTheme();
    loadFontSize();
    loadAccentColor();
    setupMenu();
    setupBottomNav();
    loadFooter();
}

// Auto-init when DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCommon);
} else {
    initCommon();
}
