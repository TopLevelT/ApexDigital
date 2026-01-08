/* 1. PERFORMANCE-OPTIMIZED SCROLL REVEAL 
   Uses IntersectionObserver instead of scroll event listeners.
   Saves battery and runs at 60fps.
*/
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Stop watching after reveal to save memory
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el);
    });
});

/* 2. PACKAGE SELECTION LOGIC
   Updates the dropdown in the contact form when a user clicks "Get Started"
*/
function selectPackage(pkgName) {
    const select = document.getElementById('package-select');
    const contactSection = document.getElementById('contact');
    
    // Smooth scroll to contact section
    contactSection.scrollIntoView({ behavior: 'smooth' });

    // Find and select the correct option
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].text.includes(pkgName)) {
            select.selectedIndex = i;
            break;
        }
    }
}

/* 3. SECURE FORM SUBMISSION (Web3Forms)
   Handles the API request without reloading the page.
*/
async function submitForm(e) {
    e.preventDefault(); // Stop page reload

    const form = e.target;
    const btn = form.querySelector('button');
    const result = document.getElementById('result');
    const originalText = btn.innerText;

    // UI Loading State
    btn.innerText = "Sending Request...";
    btn.disabled = true;
    btn.classList.add('opacity-70', 'cursor-wait');

    // Prepare Data
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
            // Success
            result.innerHTML = "Message received! We'll be in touch shortly.";
            result.className = "text-center text-sm mt-4 text-green-400 font-bold";
            form.reset();
        } else {
            // API Error
            console.error(response);
            result.innerHTML = jsonResponse.message || "Something went wrong.";
            result.className = "text-center text-sm mt-4 text-red-400 font-bold";
        }
    } catch (error) {
        // Network Error
        console.error(error);
        result.innerHTML = "Network error! Please check your internet connection.";
        result.className = "text-center text-sm mt-4 text-red-400 font-bold";
    } finally {
        // Reset Button
        btn.innerText = originalText;
        btn.disabled = false;
        btn.classList.remove('opacity-70', 'cursor-wait');
        
        // Clear message after 5 seconds
        setTimeout(() => {
            result.innerHTML = "";
            result.className = "text-center text-sm mt-4";
        }, 5000);
    }
}
