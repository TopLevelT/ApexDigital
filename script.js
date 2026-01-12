// Apex Digital V4.0 Script
// Combined: Safety Checks, Plan Selection, AJAX Form Handling, and Scroll Animations

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Logic
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
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
    
    // 3. Contact Form AJAX Handling
    const form = document.getElementById('contact-form');
    const result = document.getElementById('result');
    const submitBtn = document.getElementById('submit-btn');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            if(!form.checkValidity()) {
                form.reportValidity();
                return;
            }

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
                    result.innerHTML = `<span class="text-green-400">✓ Message Sent! We will be in touch shortly.</span>`;
                    result.classList.remove('hidden', 'text-red-400');
                    result.classList.add('block', 'success-message');
                    form.reset();
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
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                setTimeout(() => {
                    result.classList.add('hidden');
                }, 5000);
            });
        });
    }

    // 4. NEW FEATURE: Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up-element');
    fadeElements.forEach(el => observer.observe(el));

});

// 5. Plan Selection Logic
window.selectPlan = function(planName) {
    const form = document.getElementById('contact-form');
    if (!form) return;

    let packageInput = document.getElementById('package-input');
    if (!packageInput) {
        packageInput = document.createElement('input');
        packageInput.type = 'hidden';
        packageInput.name = 'Selected Package';
        packageInput.id = 'package-input';
        form.appendChild(packageInput);
    }
    packageInput.value = planName;
    console.log(`Package Selected: ${planName}`);
};
