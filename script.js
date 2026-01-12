// Apex Digital V3.5 Script
// Combined: Safety Checks, Plan Selection, and AJAX Form Handling

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
    
    // 3. Contact Form AJAX Handling (New Feature: Confirmation Message)
    const form = document.getElementById('contact-form');
    const result = document.getElementById('result');
    const submitBtn = document.getElementById('submit-btn');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop page reload

            // Basic Client-side Validation
            if(!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            // UI Feedback: Loading
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-50', 'cursor-not-allowed');

            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    // UI Feedback: Success
                    result.innerHTML = `<span class="text-green-400">✓ Message Sent! We will be in touch shortly.</span>`;
                    result.classList.remove('hidden', 'text-red-400');
                    result.classList.add('block', 'success-message');
                    form.reset(); // Clear form
                } else {
                    console.log(response);
                    result.innerHTML = `<span class="text-red-400">⚠ Error: ${json.message}</span>`;
                    result.classList.remove('hidden', 'text-green-400');
                    result.classList.add('block');
                }
            })
            .catch(error => {
                console.log(error);
                result.innerHTML = `<span class="text-red-400">⚠ Something went wrong. Please try again.</span>`;
                result.classList.remove('hidden');
                result.classList.add('block');
            })
            .finally(() => {
                // Reset Button
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    result.classList.add('hidden');
                }, 5000);
            });
        });
    }

});

// 4. Plan Selection Logic
// This must be outside the EventListener so the HTML 'onclick' can see it
window.selectPlan = function(planName) {
    const form = document.getElementById('contact-form'); // Updated ID to match new form
    
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
