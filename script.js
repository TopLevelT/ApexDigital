// Apex Digital V2.0 Script
// Optimized for performance and error prevention

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Logic (Wrapped in safety check)
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 2. Dynamic Year in Footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 3. Plan Selection Logic
    // This allows the "Select Plan" buttons to auto-fill the contact form
    window.selectPlan = function(planName) {
        const selectBox = document.getElementById('service-select');
        if (selectBox) {
            selectBox.value = planName;
            // Add a small visual flash to show it updated
            selectBox.classList.add('ring-2', 'ring-indigo-500');
            setTimeout(() => selectBox.classList.remove('ring-2', 'ring-indigo-500'), 500);
        }
    };
});
