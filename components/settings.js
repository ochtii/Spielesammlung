/**
 * AUT Quiz - Settings Page
 */

document.addEventListener('DOMContentLoaded', () => {
    initSettingsTabs();
    loadAllSettings();
    setupSettingsListeners();
});

// ============================================
// TAB NAVIGATION
// ============================================

function initSettingsTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(target)?.classList.add('active');
        });
    });
}

// ============================================
// LOAD SETTINGS
// ============================================

function loadAllSettings() {
    // Theme
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setCheckbox('themeToggle', darkMode);
    
    // Font Size
    setSelect('fontSizeSelect', localStorage.getItem('fontSize') || 'medium');
    
    // Accent Color
    setInput('accentColorPicker', localStorage.getItem('accentColor') || '#c8102e');
    
    // Bottom Nav
    setCheckbox('bottomNavToggle', localStorage.getItem('bottomNavEnabled') !== 'false');
    
    // Sound & Vibration
    setCheckbox('soundToggle', localStorage.getItem('soundEnabled') !== 'false');
    setCheckbox('vibrationToggle', localStorage.getItem('vibrationEnabled') !== 'false');
    
    // Game Settings
    setSelect('questionCountSelect', localStorage.getItem('questionCount') || '10');
    setSelect('difficultySelect', localStorage.getItem('difficulty') || 'normal');
    setCheckbox('timerToggle', localStorage.getItem('timerEnabled') === 'true');
    
    // Accessibility
    setCheckbox('animationsToggle', localStorage.getItem('animationsEnabled') !== 'false');
    
    // Developer
    setCheckbox('footerToggle', localStorage.getItem('footerEnabled') !== 'false');
    setCheckbox('debugToggle', localStorage.getItem('debugMode') === 'true');
}

function setCheckbox(id, checked) {
    const el = document.getElementById(id);
    if (el) el.checked = checked;
}

function setSelect(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value;
}

function setInput(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value;
}

// ============================================
// SETTINGS EVENT LISTENERS
// ============================================

function setupSettingsListeners() {
    // Theme
    listen('themeToggle', 'change', (e) => {
        localStorage.setItem('darkMode', e.target.checked);
        document.body.classList.toggle('dark-mode', e.target.checked);
    });
    
    // Font Size
    listen('fontSizeSelect', 'change', (e) => {
        localStorage.setItem('fontSize', e.target.value);
        applyFontSize(e.target.value);
    });
    
    // Accent Color
    listen('accentColorPicker', 'input', (e) => {
        localStorage.setItem('accentColor', e.target.value);
        applyAccentColor(e.target.value);
    });
    
    // Bottom Nav
    listen('bottomNavToggle', 'change', (e) => {
        localStorage.setItem('bottomNavEnabled', e.target.checked);
        const nav = document.getElementById('bottomNav');
        if (nav) nav.style.display = e.target.checked ? 'block' : 'none';
    });
    
    // Sound
    listen('soundToggle', 'change', (e) => {
        localStorage.setItem('soundEnabled', e.target.checked);
    });
    
    // Vibration
    listen('vibrationToggle', 'change', (e) => {
        localStorage.setItem('vibrationEnabled', e.target.checked);
    });
    
    // Question Count
    listen('questionCountSelect', 'change', (e) => {
        localStorage.setItem('questionCount', e.target.value);
    });
    
    // Difficulty
    listen('difficultySelect', 'change', (e) => {
        localStorage.setItem('difficulty', e.target.value);
    });
    
    // Timer
    listen('timerToggle', 'change', (e) => {
        localStorage.setItem('timerEnabled', e.target.checked);
    });
    
    // Animations
    listen('animationsToggle', 'change', (e) => {
        localStorage.setItem('animationsEnabled', e.target.checked);
        document.body.classList.toggle('no-animations', !e.target.checked);
    });
    
    // Footer
    listen('footerToggle', 'change', (e) => {
        localStorage.setItem('footerEnabled', e.target.checked);
        const footer = document.getElementById('footer-container');
        if (footer) footer.style.display = e.target.checked ? 'block' : 'none';
    });
    
    // Debug Mode
    listen('debugToggle', 'change', (e) => {
        localStorage.setItem('debugMode', e.target.checked);
    });
    
    // Reset All
    listen('resetAllBtn', 'click', () => {
        if (confirm('Alle Einstellungen und Daten zurücksetzen?')) {
            localStorage.clear();
            location.reload();
        }
    });
    
    // Export Data
    listen('exportDataBtn', 'click', exportData);
    
    // Import Data
    listen('importDataBtn', 'click', importData);
}

function listen(id, event, handler) {
    const el = document.getElementById(id);
    if (el) el.addEventListener(event, handler);
}

// ============================================
// DATA EXPORT / IMPORT
// ============================================

function exportData() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        data[key] = localStorage.getItem(key);
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aut-quiz-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                Object.keys(data).forEach(key => {
                    localStorage.setItem(key, data[key]);
                });
                alert('Daten erfolgreich importiert!');
                location.reload();
            } catch (err) {
                alert('Fehler beim Import: ' + err.message);
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}
