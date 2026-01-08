/**
 * AUT Quiz - Wappen Gallery
 */

document.addEventListener('DOMContentLoaded', () => {
    initWappenGallery();
});

function initWappenGallery() {
    const list = document.getElementById('wappenList');
    const alphabetButtons = document.getElementById('alphabetButtons');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const totalCount = document.getElementById('totalCount');
    
    // Check for data
    if (typeof austrianCoatsOfArms === 'undefined') {
        if (list) list.innerHTML = '<p class="no-results">Wappen-Daten nicht gefunden.</p>';
        return;
    }
    
    // Flatten data
    const allCoats = [];
    
    // Bundesländer
    Object.values(austrianCoatsOfArms.bundeslaender || {}).forEach(item => {
        allCoats.push({ ...item, type: 'Bundesland' });
    });
    
    // Landeshauptstädte
    Object.values(austrianCoatsOfArms.landeshauptstaedte || {}).forEach(item => {
        allCoats.push({ ...item, type: 'Landeshauptstadt' });
    });
    
    // Städte
    Object.values(austrianCoatsOfArms.staedte || {}).forEach(item => {
        allCoats.push({ ...item, type: 'Stadt' });
    });
    
    if (totalCount) totalCount.textContent = allCoats.length;
    
    // Get unique letters
    const letters = [...new Set(allCoats.map(c => c.name.charAt(0).toUpperCase()))].sort();
    
    // Create alphabet navigation
    if (alphabetButtons) {
        alphabetButtons.innerHTML = letters.map(l => 
            `<button class="alphabet-btn" data-letter="${l}">${l}</button>`
        ).join('');
        
        alphabetButtons.addEventListener('click', (e) => {
            if (e.target.classList.contains('alphabet-btn')) {
                const letter = e.target.dataset.letter;
                const group = document.getElementById(`group-${letter}`);
                if (group) group.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Render function
    function renderWappen(filter = 'all') {
        let filtered = allCoats;
        
        if (filter !== 'all') {
            filtered = allCoats.filter(c => c.type === filter);
        }
        
        if (filtered.length === 0) {
            list.innerHTML = '<p class="no-results">Keine Wappen gefunden.</p>';
            return;
        }
        
        // Group by letter
        const grouped = {};
        filtered.forEach(coat => {
            const letter = coat.name.charAt(0).toUpperCase();
            if (!grouped[letter]) grouped[letter] = [];
            grouped[letter].push(coat);
        });
        
        list.innerHTML = Object.keys(grouped).sort().map(letter => `
            <div class="wappen-group" id="group-${letter}">
                <h2 class="group-header">${letter}</h2>
                <div class="wappen-grid">
                    ${grouped[letter].map(coat => `
                        <div class="wappen-card">
                            <div class="wappen-image">
                                <img src="${coat.wappen?.[0] || ''}" 
                                     alt="${coat.name}" 
                                     loading="lazy"
                                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 120%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22100%22 height=%22120%22/%3E%3Ctext x=%2250%22 y=%2260%22 text-anchor=%22middle%22 fill=%22%23999%22%3EWappen%3C/text%3E%3C/svg%3E'">
                            </div>
                            <div class="wappen-info">
                                <h3>${coat.name}</h3>
                                <span class="wappen-type">${coat.typ || coat.type}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
        
        // Update alphabet visibility
        document.querySelectorAll('.alphabet-btn').forEach(btn => {
            btn.style.display = grouped[btn.dataset.letter] ? 'inline-block' : 'none';
        });
    }
    
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderWappen(btn.dataset.filter);
        });
    });
    
    // Initial render
    renderWappen();
}
