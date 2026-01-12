// Apex Digital V3.0 Script
// Combined: Safety Checks + New Hidden Input Logic

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Logic
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Safety Check: Only run if elements exist
    if (menuBtn && mobileMenu) {
        const menuLinks = mobileMenu.querySelectorAll('a');

        // Toggle Menu
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu when clicking a link
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 2. Dynamic Year Update
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});

// 3. Plan Selection Logic
// This must be outside the EventListener so the HTML 'onclick' can see it
window.selectPlan = function(planName) {
    const form = document.getElementById('form');
    
    if (!form) return; // Safety check if form is missing

    // Look for existing hidden input
    let packageInput = document.getElementById('package-input');
    
    // If it doesn't exist, create it
    if (!packageInput) {
        packageInput = document.createElement('input');
        packageInput.type = 'hidden';
        packageInput.name = 'Selected Package'; // This shows up in your email
        packageInput.id = 'package-input';
        form.appendChild(packageInput);
    }
    
    // Set the value (e.g., "Dominance")
    packageInput.value = planName;
    
    // Visual Feedback (Console log for testing)
    console.log(`Package Selected: ${planName}`);
};
