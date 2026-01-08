/* 1. SCROLL REVEAL ANIMATION */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el);
    });
});

/* 2. MOBILE MENU LOGIC (FIXED) */
const mobileBtn = document.getElementById('mobile-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = mobileMenu.querySelectorAll('a');

// Toggle Menu
if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Close menu when a link is clicked (The "Customer Fix")
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

/* 3. FAQ ACCORDION */
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
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

/* 5. SECURE FORM SUBMISSION */
async function submitForm(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button');
    const result = document.getElementById('result');
    const originalText = btn.innerText;

    btn.innerText = "Sending...";
    btn.disabled = true;
    btn.classList.add('opacity-70', 'cursor-wait');

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: json
        });
        
        const jsonResponse = await response.json();

        if (response.status == 200) {
            result.innerHTML = "Success! We will contact you shortly.";
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
