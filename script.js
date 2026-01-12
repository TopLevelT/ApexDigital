// Apex Digital V2.1 Script
// Bulletproofed for Null Element Errors

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Logic (With "Optional Chaining" Checks)
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Only run if both elements actually exist
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

    // 2. Dynamic Year in Footer (Safe Check)
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 3. Plan Selection Logic (Safe Check)
    window.selectPlan = function(planName) {
        const selectBox = document.getElementById('service-select');
        // If the select box doesn't exist, stop immediately
        if (!selectBox) return;

        selectBox.value = planName;
        // Visual feedback
        selectBox.classList.add('ring-2', 'ring-indigo-500');
        setTimeout(() => {
            if (selectBox) selectBox.classList.remove('ring-2', 'ring-indigo-500');
        }, 500);
    };
});
