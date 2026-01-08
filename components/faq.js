/**
 * AUT Quiz - FAQ Page (Accordion)
 */

document.addEventListener('DOMContentLoaded', () => {
    initAccordion();
});

function initAccordion() {
    const items = document.querySelectorAll('.faq-item');
    
    items.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            
            // Close all others
            items.forEach(i => i.classList.remove('open'));
            
            // Toggle current
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });
}
