// Apex Digital V5.0 Script
// Features: Dynamic Nav, Smooth Scroll, Form Logic, Animations

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

    // 2. Dynamic Sticky Navigation (Glass Effect on Scroll)
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('glass-nav');
            navbar.classList.remove('nav-transparent', 'py-4');
            navbar.classList.add('py-2'); // Shrink slightly
        } else {
            navbar.classList.remove('glass-nav', 'py-2');
            navbar.classList.add('nav-transparent', 'py-4');
        }
    });

    // 3. Dynamic Year Update
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // 4. Contact Form AJAX Handling
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

    // 5. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up-element');
    fadeElements.forEach(el => observer.observe(el));

    // 6. Newsletter Form Placeholder Logic
    const newsForm = document.getElementById('newsletter-form');
    if(newsForm) {
        newsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = newsForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Subscribed!';
            btn.classList.add('bg-green-600');
            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.remove('bg-green-600');
                newsForm.reset();
            }, 3000);
        });
    }

});

// 7. Plan Selection Logic
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
