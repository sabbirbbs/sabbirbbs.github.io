document.addEventListener('DOMContentLoaded', () => {

    // --- Element Selectors ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const htmlElement = document.documentElement;
    const backToTopButton = document.getElementById('back-to-top');
    const currentYearSpan = document.getElementById('current-year');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.getElementById('header');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

    // --- Theme Toggle ---
    const applyTheme = (theme) => {
        htmlElement.className = theme + '-mode'; // Simpler class assignment
        themeToggleButton.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    };
    themeToggleButton.addEventListener('click', () => {
        const isDarkMode = htmlElement.classList.contains('dark-mode');
        const newTheme = isDarkMode ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme ? savedTheme : 'dark'; // Default dark
    applyTheme(initialTheme);

    // --- Mobile Menu Toggle ---
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isActive = navLinks.classList.contains('active');
        mobileMenuToggle.setAttribute('aria-expanded', isActive.toString());
        mobileMenuToggle.querySelector('i').className = isActive ? 'fas fa-times' : 'fas fa-bars';
    });
     navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
            }
        });
    });

    // --- Header Shadow & Back to Top ---
    const handleScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 10);
        backToTopButton.classList.toggle('visible', window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // --- Scroll Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));

    // --- Set Current Year ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Project Tabs Logic ---
    if (tabButtons.length > 0 && tabContents.length > 0) {
        const tabContainer = document.querySelector('.project-tabs');
        if(tabContainer) {
            tabContainer.addEventListener('click', (e) => {
                const clickedTab = e.target.closest('.tab-button');
                if (!clickedTab || clickedTab.classList.contains('active')) return;
                tabButtons.forEach(button => button.classList.remove('active'));
                clickedTab.classList.add('active');
                tabContents.forEach(content => content.classList.remove('active'));
                const targetId = clickedTab.dataset.tabTarget;
                const targetContent = document.querySelector(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        }
    }

     // --- Contact Form Handling (Formspree AJAX) ---
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevent default submission to handle via JS

            const formData = new FormData(contactForm);

            // Basic Validation (Optional but recommended)
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            if (!name || !email || !message) {
                 if (formStatus) {
                    formStatus.textContent = 'Please fill out all required fields.';
                    formStatus.style.color = '#f76e8c'; // Error color
                 }
                 return; // Stop if basic validation fails
            }

            // If validation passes:
            if (formStatus) {
                 formStatus.textContent = 'Sending...';
                 formStatus.style.color = 'inherit'; // Reset color
            }
            if (submitButton) submitButton.disabled = true; // Disable during sending

            try {
                const response = await fetch(contactForm.action, { // Use form's action URL for Formspree
                    method: 'POST',
                    body: formData,
                    headers: {
                       'Accept': 'application/json' // Request JSON response from Formspree
                    }
                });

                if (response.ok) {
                    // Formspree typically returns {ok: true} on success with Accept: application/json
                    const result = await response.json();
                     if (formStatus) {
                        formStatus.textContent = 'Message sent successfully! Thank you.';
                        formStatus.style.color = 'var(--color-primary)';
                    }
                    contactForm.reset(); // Clear the form on success
                    console.log("Formspree success:", result);
                    setTimeout(() => { if (formStatus) formStatus.textContent = ''; }, 6000); // Clear status after delay

                } else {
                     // Handle HTTP errors & Formspree specific errors
                     const errorResult = await response.json();
                     console.error('Form Submission Error (Formspree):', errorResult);
                     if (formStatus) {
                        // Formspree often puts detailed errors in errorResult.errors
                        let errorMsg = 'Oops! Something went wrong.';
                        if (errorResult && errorResult.errors && errorResult.errors.length > 0) {
                            // Take the first error message
                             errorMsg = errorResult.errors.map(err => err.message).join(', ');
                        } else if (errorResult && errorResult.error) {
                             errorMsg = errorResult.error; // Sometimes error is directly in .error
                        }
                        formStatus.textContent = errorMsg;
                        formStatus.style.color = '#f76e8c';
                    }
                }

            } catch (error) {
                // Handle network errors
                console.error('Network Error:', error);
                if (formStatus) {
                     formStatus.textContent = 'Network error. Could not send message.';
                     formStatus.style.color = '#f76e8c';
                }
            } finally {
                 // Re-enable the button after the attempt completes
                 if (submitButton) submitButton.disabled = false;
            }
        });
    }

}); // End DOMContentLoaded