/* 1. SCROLL REVEAL ANIMATION */
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    
    // Auto-update availability to current month (FOMO tactic)
    const month = new Date().toLocaleString('default', { month: 'long' });
    const availabilityText = document.getElementById('availability-text');
    if(availabilityText) availabilityText.innerText = `Limited Spots for ${month}`;

    // Auto-update Footer Year
    document.getElementById('current-year').innerText = new Date().getFullYear();
});

/* 2. MOBILE MENU LOGIC (With 'X' Animation) */
const mobileBtn = document.getElementById('mobile-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = mobileMenu.querySelectorAll('a');

const iconHamburger = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
const iconClose = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';

if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const isOpen = !mobileMenu.classList.contains('hidden');
        mobileBtn.querySelector('svg').innerHTML = isOpen ? iconClose : iconHamburger;
    });
}

// Close menu when link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        if (mobileBtn) mobileBtn.querySelector('svg').innerHTML = iconHamburger;
    });
});

/* 3. FAQ ACCORDION */
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        // Close others (Optional - keeps it clean)
        document.querySelectorAll('.faq-answer').forEach(a => {
            if(a !== answer) a.classList.add('hidden');
        });
        document.querySelectorAll('.faq-icon').forEach(i => {
            if(i !== icon) i.style.transform = 'rotate(0deg)';
        });

        if (answer.classList.contains('hidden')) {
            answer.classList.remove('hidden');
            icon.style.transform = 'rotate(180deg)';
        } else {
            answer.classList.add('hidden');
            icon.style.transform = 'rotate(0deg)';
        }
    });
});

/* 4. PACKAGE SELECTION HELPER */
function selectPackage(pkgName) {
    const select = document.getElementById('package-select');
    const contactSection = document.getElementById('contact');
    
    contactSection.scrollIntoView({ behavior: 'smooth' });

    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].text.includes(pkgName)) {
            select.selectedIndex = i;
            break;
        }
    }
}

/* 5. FORM SUBMISSION */
async function submitForm(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button');
    const result = document.getElementById('result');
    const originalText = btn.innerText;

    btn.innerText = "Processing...";
    btn.disabled = true;
    btn.classList.add('opacity-70', 'cursor-wait');

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: json
        });
        const jsonResponse = await response.json();

        if (response.status == 200) {
            result.innerHTML = "Request Received! We'll reach out shortly.";
            result.className = "text-center text-sm mt-4 text-green-400 font-bold";
            form.reset();
        } else {
            result.innerHTML = jsonResponse.message || "Error sending message.";
            result.className = "text-center text-sm mt-4 text-red-400 font-bold";
        }
    } catch (error) {
        result.innerHTML = "Network error. Please try again.";
        result.className = "text-center text-sm mt-4 text-red-400 font-bold";
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
        btn.classList.remove('opacity-70', 'cursor-wait');
        setTimeout(() => { result.innerHTML = ""; }, 5000);
    }
}
