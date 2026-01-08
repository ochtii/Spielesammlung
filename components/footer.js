/**
 * Footer Component Loader
 * Lädt den gemeinsamen Footer in alle Seiten
 */

(function() {
    'use strict';

    // Easter Egg Helper Functions (global verwendbar)
    window.EasterEggHelper = {
        getFoundEasterEggs: function() {
            return JSON.parse(localStorage.getItem('foundEasterEggs') || '[]');
        },
        
        isEasterEggFound: function(eggId) {
            return this.getFoundEasterEggs().includes(eggId);
        },
        
        triggerEasterEgg: function(eggId, reward, name) {
            if (this.isEasterEggFound(eggId)) return false;
            
            // Als gefunden markieren
            const found = this.getFoundEasterEggs();
            found.push(eggId);
            localStorage.setItem('foundEasterEggs', JSON.stringify(found));
            
            // Punkte hinzufügen
            let pointsData = JSON.parse(localStorage.getItem('pointsData') || '{}');
            pointsData.totalPoints = (pointsData.totalPoints || 0) + reward;
            if (!pointsData.history) pointsData.history = [];
            pointsData.history.unshift({
                type: '🎁 Easter Egg',
                points: reward,
                timestamp: new Date().toISOString(),
                details: name
            });
            localStorage.setItem('pointsData', JSON.stringify(pointsData));
            
            // Notification anzeigen
            this.showEasterEggNotification(name, reward);
            
            return true;
        },
        
        showEasterEggNotification: function(name, reward) {
            // Entferne bestehende Notification
            const existing = document.querySelector('.easter-egg-notification');
            if (existing) existing.remove();
            
            const notification = document.createElement('div');
            notification.className = 'easter-egg-notification';
            notification.innerHTML = `
                <div class="easter-egg-notification-content">
                    <i class="fas fa-gift"></i>
                    <div class="easter-egg-notification-text">
                        <strong>🎉 Easter Egg gefunden!</strong>
                        <span>${name} (+${reward} Punkte)</span>
                    </div>
                </div>
            `;
            document.body.appendChild(notification);
            
            // Animation
            setTimeout(() => notification.classList.add('show'), 10);
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
    };

    // Footer laden
    async function loadFooter() {
        const footerContainer = document.getElementById('footer-container');
        if (!footerContainer) return;

        try {
            const response = await fetch('components/footer.html');
            if (!response.ok) throw new Error('Footer nicht gefunden');
            
            const footerHTML = await response.text();
            footerContainer.innerHTML = footerHTML;
            
            // Footer-Funktionen initialisieren
            initZoomReset();
            loadCommitInfo();
            initGlobalEasterEggs();
        } catch (error) {
            console.error('Footer konnte nicht geladen werden:', error);
            // Fallback: Minimaler Footer
            footerContainer.innerHTML = `
                <footer class="footer">
                    <div class="footer-content">
                        <p>© 2026 Österreich Spielesammlung</p>
                    </div>
                </footer>
            `;
            initGlobalEasterEggs();
        }
    }
    
    // Globale Easter Eggs (funktionieren auf allen Seiten)
    function initGlobalEasterEggs() {
        // Easter Egg: Logo Tap (10x auf Logo tippen)
        initLogoTapEasterEgg();
        
        // Easter Egg: Footer Secret (5x auf Copyright tippen)
        initFooterSecretEasterEgg();
    }
    
    // Logo Tap Easter Egg
    let logoTapCount = 0;
    let logoTapTimer = null;
    
    function initLogoTapEasterEgg() {
        const logo = document.querySelector('.navbar-brand');
        if (!logo || window.EasterEggHelper.isEasterEggFound('logoTap')) return;
        
        logo.addEventListener('click', (e) => {
            if (window.EasterEggHelper.isEasterEggFound('logoTap')) return;
            
            // Nur zählen wenn nicht navigiert wird
            logoTapCount++;
            
            // Visual Feedback
            logo.style.transform = `scale(${1 + logoTapCount * 0.02})`;
            
            clearTimeout(logoTapTimer);
            logoTapTimer = setTimeout(() => {
                logoTapCount = 0;
                logo.style.transform = '';
            }, 2000);
            
            if (logoTapCount >= 10) {
                e.preventDefault();
                window.EasterEggHelper.triggerEasterEgg('logoTap', 300, 'Logo Fan');
                logoTapCount = 0;
                logo.style.transform = '';
            }
        });
    }
    
    // Footer Secret Easter Egg
    let footerTapCount = 0;
    let footerTapTimer = null;
    
    function initFooterSecretEasterEgg() {
        // Warte kurz bis Footer geladen ist
        setTimeout(() => {
            const copyright = document.querySelector('.footer-content p, .footer p');
            if (!copyright || window.EasterEggHelper.isEasterEggFound('footerSecret')) return;
            
            copyright.style.cursor = 'default';
            copyright.addEventListener('click', () => {
                if (window.EasterEggHelper.isEasterEggFound('footerSecret')) return;
                
                footerTapCount++;
                
                // Visual Feedback
                copyright.style.color = `hsl(${footerTapCount * 40}, 70%, 50%)`;
                
                clearTimeout(footerTapTimer);
                footerTapTimer = setTimeout(() => {
                    footerTapCount = 0;
                    copyright.style.color = '';
                }, 2000);
                
                if (footerTapCount >= 5) {
                    window.EasterEggHelper.triggerEasterEgg('footerSecret', 200, 'Footer Finder');
                    footerTapCount = 0;
                    copyright.style.color = '';
                }
            });
        }, 500);
    }

    // Zoom Reset Button
    function initZoomReset() {
        const zoomBtn = document.getElementById('zoomResetBtn');
        if (!zoomBtn) return;

        zoomBtn.addEventListener('click', () => {
            const viewport = document.querySelector('meta[name="viewport"]');
            if (viewport) {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
                setTimeout(() => {
                    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
                }, 100);
            }
            zoomBtn.innerHTML = '<i class="fas fa-check"></i><span>Zurückgesetzt!</span>';
            setTimeout(() => {
                zoomBtn.innerHTML = '<i class="fas fa-search-minus"></i><span>Ansicht auf 100% zurücksetzen</span>';
            }, 2000);
        });
    }

    // Commit Info laden
    async function loadCommitInfo() {
        const commitInfoEl = document.getElementById('commitInfo');
        if (!commitInfoEl) return;

        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000);

            const response = await fetch(
                'https://api.github.com/repos/ochtii/Spielesammlung/commits?per_page=1',
                { signal: controller.signal }
            );
            clearTimeout(timeout);

            if (!response.ok) throw new Error('API Error');

            const data = await response.json();
            if (data.length > 0) {
                const commit = data[0];
                const commitDate = new Date(commit.commit.author.date);
                const options = {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'Europe/Vienna'
                };
                const formattedDate = new Intl.DateTimeFormat('de-AT', options).format(commitDate);

                // Versuche zusätzliche Commit-Details zu laden
                try {
                    const detailResponse = await fetch(
                        `https://api.github.com/repos/ochtii/Spielesammlung/commits/${commit.sha}`,
                        { signal: controller.signal }
                    );

                    let filesChanged = '';
                    if (detailResponse.ok) {
                        const detail = await detailResponse.json();
                        if (detail.files && detail.files.length > 0) {
                            const fileNames = detail.files.map(f => f.filename).slice(0, 3);
                            filesChanged = fileNames.join(', ');
                            if (detail.files.length > 3) {
                                filesChanged += ` (+${detail.files.length - 3})`;
                            }
                        }
                    }

                    let infoText = `<i class="fas fa-clock"></i> ${formattedDate}`;
                    if (filesChanged) {
                        infoText += ` <span class="footer-separator">|</span> <i class="fas fa-file-code"></i> ${filesChanged}`;
                    }
                    commitInfoEl.innerHTML = infoText;
                } catch {
                    commitInfoEl.innerHTML = `<i class="fas fa-clock"></i> ${formattedDate}`;
                }
            }
        } catch (error) {
            commitInfoEl.innerHTML = '<i class="fas fa-wifi"></i> Offline';
        }
    }

    // Initialisierung wenn DOM bereit
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadFooter);
    } else {
        loadFooter();
    }
})();
