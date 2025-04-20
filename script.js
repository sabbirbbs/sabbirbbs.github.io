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
    // Dynamic content containers
    const aboutContentContainer = document.querySelector('#about .about-content');
    const skillsGridContainer = document.querySelector('#skills .skills-grid');
    const projectTabContainer = document.querySelector('#projects .tab-content-container'); // Container for all project grids
    const educationGridContainer = document.querySelector('#education .education-grid');
    const testimonialsContainer = document.querySelector('#testimonials .testimonials-container');

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
    handleScroll(); // Call once on load

    // --- Scroll Animations ---
    let observer; // Declare observer variable in the outer scope of DOMContentLoaded

    const animatedElements = document.querySelectorAll('.animate-on-scroll'); // Select initial elements

    // Define the callback function for the observer
    const handleIntersection = (entries, obs) => {
        entries.forEach((entry) => {
            // Check if the element is intersecting
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing the element once it's visible
                obs.unobserve(entry.target);
            }
        });
    };

    // Initialize the IntersectionObserver
    observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Observe the initial elements found on page load
    animatedElements.forEach(el => {
        if (observer) { // Ensure observer is initialized
           observer.observe(el);
        }
    });


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

                // Deactivate all buttons and content
                tabButtons.forEach(button => button.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Activate clicked button and target content
                clickedTab.classList.add('active');
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
            e.preventDefault(); // Prevent default submission

            const formData = new FormData(contactForm);

            // Basic Validation
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            if (!name || !email || !message) {
                 if (formStatus) {
                    formStatus.textContent = 'Please fill out all required fields.';
                    formStatus.style.color = '#f76e8c';
                 }
                 return;
            }

            // If validation passes:
            if (formStatus) {
                 formStatus.textContent = 'Sending...';
                 formStatus.style.color = 'inherit';
            }
            if (submitButton) submitButton.disabled = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    const result = await response.json();
                     if (formStatus) {
                        formStatus.textContent = 'Message sent successfully! Thank you.';
                        formStatus.style.color = 'var(--color-primary)';
                    }
                    contactForm.reset();
                    console.log("Formspree success:", result);
                    setTimeout(() => { if (formStatus) formStatus.textContent = ''; }, 6000);

                } else {
                     const errorResult = await response.json();
                     console.error('Form Submission Error (Formspree):', errorResult);
                     if (formStatus) {
                        let errorMsg = 'Oops! Something went wrong.';
                        if (errorResult && errorResult.errors && errorResult.errors.length > 0) {
                             errorMsg = errorResult.errors.map(err => err.message).join(', ');
                        } else if (errorResult && errorResult.error) {
                             errorMsg = errorResult.error;
                        }
                        formStatus.textContent = errorMsg;
                        formStatus.style.color = '#f76e8c';
                    }
                }

            } catch (error) {
                console.error('Network Error:', error);
                if (formStatus) {
                     formStatus.textContent = 'Network error. Could not send message.';
                     formStatus.style.color = '#f76e8c';
                }
            } finally {
                 if (submitButton) submitButton.disabled = false;
            }
        });
    }


    // --- Dynamic Content Loading ---

    /**
     * Fetches JSON data from a specified URL.
     * @param {string} url - The URL of the JSON file.
     * @returns {Promise<object|null>} - A promise that resolves with the JSON data or null on error.
     */
    async function fetchJSON(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching JSON from ${url}:`, error);
            return null;
        }
    }

    /**
     * Re-observes elements with the 'animate-on-scroll' class.
     * Call this after dynamically adding content that needs animation.
     */
     function reObserveAnimatedElements() {
         // Ensure the observer instance exists before trying to use it
        if (!observer) {
            console.warn("IntersectionObserver not initialized yet.");
            return;
        }

        // Find ALL elements that should be animated, including any newly added ones
        const potentiallyNewAnimatedElements = document.querySelectorAll('.animate-on-scroll');
        potentiallyNewAnimatedElements.forEach(el => {
            // IMPORTANT: Observe elements. If already observed or visible, it's handled by the IntersectionObserver logic.
            observer.observe(el);
        });

        // Re-apply staggered animation counters if necessary (for newly added grid items)
        // Select all grids where items might have been added dynamically
        const grids = document.querySelectorAll('.skills-grid, .projects-grid, .education-grid, .testimonials-container');
        grids.forEach(grid => {
            // Reset the CSS counter using the style property to ensure it applies dynamically
            grid.style.counterReset = 'item-counter';

            // Select the direct children items within the grid that should be counted/animated
            const items = grid.querySelectorAll(':scope > .skill-category, :scope > .project-card, :scope > .education-item, :scope > .testimonial-item');
            let count = 0;
            items.forEach(item => {
                count++;
                // Set the CSS variable for the animation delay
                item.style.setProperty('--animation-order', count);
                // Ensure these items are also observed if they have the animation class
                if (item.classList.contains('animate-on-scroll')) {
                    observer.observe(item);
                }
            });
        });
    }


    /**
     * Loads and renders the About section content.
     */
    async function loadAboutData() {
        if (!aboutContentContainer) return;
        const data = await fetchJSON('data/about.json');
        if (data && data.paragraphs) {
            aboutContentContainer.innerHTML = ''; // Clear existing or loading indicator
            data.paragraphs.forEach(text => {
                const p = document.createElement('p');
                p.textContent = text;
                aboutContentContainer.appendChild(p);
            });
            // Note: The '.about-content' itself has 'animate-on-scroll' in the HTML,
            // so it's already observed initially. No need to re-observe children here
            // unless paragraphs themselves were meant to animate individually.
        } else {
             aboutContentContainer.innerHTML = '<p>Error loading about content.</p>';
        }
    }

    /**
     * Loads and renders the Skills section content.
     */
    async function loadSkillsData() {
        if (!skillsGridContainer) return;
        const data = await fetchJSON('data/skills.json');
        if (data && data.categories) {
            skillsGridContainer.innerHTML = ''; // Clear existing or loading indicator
            data.categories.forEach(category => {
                const categoryDiv = document.createElement('div');
                // *** ADD 'animate-on-scroll' to dynamically added items ***
                categoryDiv.className = 'skill-category card-3d animate-on-scroll';

                const title = document.createElement('h3');
                const titleIcon = document.createElement('i');
                titleIcon.className = category.icon;
                title.appendChild(titleIcon);
                title.appendChild(document.createTextNode(` ${category.title}`));

                const skillList = document.createElement('ul');
                category.skills.forEach(skill => {
                    const listItem = document.createElement('li');
                    const skillIcon = document.createElement('i');
                    skillIcon.className = skill.icon;

                    // Apply specific styles if needed (like JS icon background)
                    if (skill.icon.includes('fa-js')) {
                         skillIcon.style.backgroundColor = 'black';
                         skillIcon.style.padding = '1px';
                         skillIcon.style.borderRadius = '2px';
                    }
                    // CSS should ideally handle brand colors via selectors like .fab.fa-html5 { color: #E34F26; }

                    listItem.appendChild(skillIcon);
                    listItem.appendChild(document.createTextNode(` ${skill.name}`));
                    skillList.appendChild(listItem);
                });

                categoryDiv.appendChild(title);
                categoryDiv.appendChild(skillList);
                skillsGridContainer.appendChild(categoryDiv);
            });
            // Call AFTER all skill categories are added to the DOM
            reObserveAnimatedElements();
        } else {
            skillsGridContainer.innerHTML = '<p>Error loading skills content.</p>';
        }
    }

     /**
     * Loads and renders the Projects section content for all tabs.
     */
     async function loadProjectsData() {
        if (!projectTabContainer) return;
        const data = await fetchJSON('data/projects.json');
        if (data) {
            Object.keys(data).forEach(tabId => {
                const targetContent = document.getElementById(tabId);
                const gridContainer = targetContent ? targetContent.querySelector('.projects-grid') : null;

                if (gridContainer && data[tabId]) {
                    gridContainer.innerHTML = ''; // Clear loading indicator or previous content
                    data[tabId].forEach(project => {
                        const projectCard = document.createElement('div');
                         // *** ADD 'animate-on-scroll' to dynamically added items ***
                        projectCard.className = 'project-card card-3d animate-on-scroll';

                        const imageWrapper = document.createElement('div');
                        imageWrapper.className = 'project-image-wrapper';
                        if (project.imageWrapperHidden || project.type === 'placeholder') {
                            imageWrapper.style.display = 'none';
                        }

                        if (project.type === 'image' && project.source) {
                            const img = document.createElement('img');
                            img.src = project.source;
                            img.alt = project.alt || project.title;
                            imageWrapper.appendChild(img);
                        } else if (project.type === 'video' && project.source) {
                            const video = document.createElement('video');
                            video.autoplay = true;
                            video.muted = true;
                            video.loop = true;
                            video.playsInline = true;
                            const source = document.createElement('source');
                            source.src = project.source;
                            source.type = 'video/mp4';
                            video.appendChild(source);
                            video.appendChild(document.createTextNode('Your browser does not support the video tag.'));
                            imageWrapper.appendChild(video);
                        }

                        const projectInfo = document.createElement('div');
                        projectInfo.className = 'project-info';

                        const title = document.createElement('h3');
                        title.textContent = project.title;

                        const description = document.createElement('p');
                        description.textContent = project.description;

                        const category = document.createElement('span');
                        category.className = 'project-category code-font';
                        category.textContent = project.category;

                        const link = document.createElement('a');
                        link.href = project.linkUrl;
                        link.className = 'btn btn-secondary btn-small';
                        if (project.linkUrl !== '#' && project.linkEnabled) {
                            link.target = '_blank';
                            link.rel = 'noopener noreferrer';
                        }
                        if (!project.linkEnabled) {
                            link.classList.add('disabled');
                            link.setAttribute('aria-disabled', 'true');
                        }

                        const linkIcon = document.createElement('i');
                        // Add appropriate icon based on link type/state
                        if (project.linkUrl !== '#' && project.linkEnabled && !project.linkText.toLowerCase().includes('watch')) {
                             linkIcon.className = 'fas fa-external-link-alt';
                        } else if (project.linkText.toLowerCase().includes('watch')) {
                             // linkIcon.className = 'fas fa-play-circle'; // Example if you want a play icon
                        }

                        link.appendChild(document.createTextNode(project.linkText + ' '));
                        if (linkIcon.className) {
                           link.appendChild(linkIcon);
                        }
                         // Handle link visibility based on JSON (like original HTML)
                         if (project.linkEnabled === false && (project.linkText.includes('(Soon)') || project.linkText.includes('(Private)'))) {
                             link.style.display = 'none'; // Match hidden links in original HTML
                         }


                        projectInfo.appendChild(title);
                        projectInfo.appendChild(description);
                        projectInfo.appendChild(category);
                        projectInfo.appendChild(link);

                        projectCard.appendChild(imageWrapper);
                        projectCard.appendChild(projectInfo);
                        gridContainer.appendChild(projectCard);
                    });
                }
            });
             // Call ONCE after potentially updating multiple grids
             reObserveAnimatedElements();
        } else {
            const firstGrid = projectTabContainer.querySelector('.projects-grid');
            if(firstGrid) firstGrid.innerHTML = '<p>Error loading projects content.</p>';
        }
    }


    /**
     * Loads and renders the Education section content.
     */
    async function loadEducationData() {
        if (!educationGridContainer) return;
        const data = await fetchJSON('data/education.json');
        if (data && data.items) {
            educationGridContainer.innerHTML = ''; // Clear loading indicator
            data.items.forEach(item => {
                const eduItem = document.createElement('div');
                // *** ADD 'animate-on-scroll' to dynamically added items ***
                eduItem.className = 'education-item card-3d-light animate-on-scroll';

                const title = document.createElement('h3');
                const titleIcon = document.createElement('i');
                titleIcon.className = item.icon;
                title.appendChild(titleIcon);
                title.appendChild(document.createTextNode(` ${item.title}`));

                const description = document.createElement('p');
                description.textContent = item.description;

                const institution = document.createElement('span');
                institution.className = 'institution';
                institution.textContent = item.institution;

                eduItem.appendChild(title);
                eduItem.appendChild(description);
                eduItem.appendChild(institution);
                educationGridContainer.appendChild(eduItem);
            });
            // Call AFTER all education items are added
            reObserveAnimatedElements();
        } else {
            educationGridContainer.innerHTML = '<p>Error loading education content.</p>';
        }
    }

    /**
     * Loads and renders the Testimonials section content.
     */
    async function loadTestimonialsData() {
        if (!testimonialsContainer) return;
        const data = await fetchJSON('data/testimonials.json');
        if (data && data.items) {
            testimonialsContainer.innerHTML = ''; // Clear loading indicator
            data.items.forEach(item => {
                const testimonialItem = document.createElement('div');
                 // *** ADD 'animate-on-scroll' to dynamically added items ***
                testimonialItem.className = 'testimonial-item card-3d animate-on-scroll';

                const quoteIcon = document.createElement('i');
                quoteIcon.className = 'fas fa-quote-left quote-icon';

                const quoteText = document.createElement('p');
                quoteText.textContent = item.quote;

                const authorDiv = document.createElement('div');
                authorDiv.className = 'testimonial-author';

                const authorName = document.createElement('h4');
                authorName.textContent = item.authorName;

                const authorTitle = document.createElement('span');
                authorTitle.textContent = item.authorTitle;

                authorDiv.appendChild(authorName);
                authorDiv.appendChild(authorTitle);

                testimonialItem.appendChild(quoteIcon);
                testimonialItem.appendChild(quoteText);
                testimonialItem.appendChild(authorDiv);
                testimonialsContainer.appendChild(testimonialItem);
            });
             // Call AFTER all testimonial items are added
             reObserveAnimatedElements();
        } else {
            testimonialsContainer.innerHTML = '<p>Error loading testimonials content.</p>';
        }
    }


    // --- Initial Load ---
    // Call the loading functions to populate the sections
    loadAboutData();
    loadSkillsData();
    loadProjectsData();
    loadEducationData();
    loadTestimonialsData();


}); // End DOMContentLoaded