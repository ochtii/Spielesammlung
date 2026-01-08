/**
 * Footer Component Loader
 * Lädt den gemeinsamen Footer in alle Seiten
 */

(function() {
    'use strict';

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
        }
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
