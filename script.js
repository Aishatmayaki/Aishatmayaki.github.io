/* ============================================================
   PORTFOLIO WEBSITE - JAVASCRIPT
   Interactive Functionality & Animations
   ============================================================ */

// ============================================================
// NAVIGATION - HAMBURGER MENU
// ============================================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle hamburger menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================================
// DARK MODE TOGGLE
// ============================================================

const darkToggle = document.getElementById('dark-mode-toggle');
const DARK_CLASS = 'dark-mode';
const THEME_KEY = 'theme';

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add(DARK_CLASS);
        if (darkToggle) {
            darkToggle.setAttribute('aria-pressed', 'true');
            darkToggle.innerHTML = '<span class="toggle-icon">☀️</span>';
        }
    } else {
        document.body.classList.remove(DARK_CLASS);
        if (darkToggle) {
            darkToggle.setAttribute('aria-pressed', 'false');
            darkToggle.innerHTML = '<span class="toggle-icon">🌙</span>';
        }
    }
}

function toggleTheme() {
    const isDark = document.body.classList.contains(DARK_CLASS);
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    try {
        localStorage.setItem(THEME_KEY, newTheme);
    } catch (e) {
        // ignore storage errors
    }
}

// Initialize theme on load
function initTheme() {
    let saved = null;
    try {
        saved = localStorage.getItem(THEME_KEY);
    } catch (e) {
        saved = null;
    }

    // If saved preference exists, use it; otherwise respect prefers-color-scheme
    if (saved === 'dark' || saved === 'light') {
        applyTheme(saved);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    if (darkToggle) {
        darkToggle.addEventListener('click', toggleTheme);
        darkToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
    }
}

// run theme initializer early
initTheme();

// ============================================================
// STICKY NAVBAR
// ============================================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================================
// SCROLL TO TOP BUTTON
// ============================================================

// Create scroll-to-top button
const scrollBtn = document.createElement('button');
scrollBtn.className = 'scroll-to-top';
scrollBtn.innerHTML = '↑';
scrollBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollBtn);

// Show/hide scroll button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
});

// Smooth scroll to top
scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================================
// INTERSECTION OBSERVER - FADE-IN ON SCROLL
// ============================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in-on-scroll elements
document.querySelectorAll('.fade-in-on-scroll').forEach(element => {
    observer.observe(element);
});

// ============================================================
// SKILL BARS ANIMATION
// ============================================================

const skillObserverOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, skillObserverOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// ============================================================
// CONTACT FORM
// ============================================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate API call with timeout
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        }, 1500);
    });
}

// ============================================================
// EMAIL VALIDATION
// ============================================================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================================
// NOTIFICATION TOAST
// ============================================================

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        background: ${type === 'success' ? '#E989A3' : type === 'error' ? '#E989A3' : '#FFE4E9'};
        color: ${type === 'success' || type === 'error' ? '#fff' : '#2C2C2C'};
        box-shadow: 0 4px 15px rgba(233, 137, 163, 0.2);
        z-index: 10000;
        animation: slideDown 0.3s ease-out;
        font-weight: 600;
        max-width: 90%;
    `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease-out reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============================================================
// SMOOTH SCROLL LINKS
// ============================================================

// Enhance smooth scrolling with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just '#'
        if (href === '#') return;

        e.preventDefault();
        const targetElement = document.querySelector(href);

        if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================================
// DYNAMIC YEAR IN FOOTER
// ============================================================

const footerElements = document.querySelectorAll('.footer p');
if (footerElements.length > 0) {
    const currentYear = new Date().getFullYear();
    footerElements.forEach(el => {
        if (el.textContent.includes('2024')) {
            el.textContent = el.textContent.replace('2024', currentYear);
        }
    });
}

// ============================================================
// PROJECT CARDS HOVER EFFECT
// ============================================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================================
// ACTIVE NAV LINK INDICATOR
// ============================================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ============================================================
// PAGE LOAD ANIMATIONS
// ============================================================

window.addEventListener('load', () => {
    // Trigger fade-in animations for initial elements
    document.querySelectorAll('.fade-in').forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
        }, index * 200);
    });
});

// ============================================================
// KEYBOARD NAVIGATION SUPPORT
// ============================================================

// Allow keyboard navigation for hamburger menu
hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hamburger.click();
    }
});

// ============================================================
// PREVENT BODY SCROLL WHEN MENU IS OPEN
// ============================================================

function toggleBodyScroll(disable) {
    if (disable) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

const originalToggle = hamburger.click;
hamburger.addEventListener('click', function() {
    const isActive = navMenu.classList.contains('active');
    toggleBodyScroll(isActive);
});

// Also close menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        toggleBodyScroll(false);
    }
});

// ============================================================
// ACCESSIBILITY - FOCUS MANAGEMENT
// ============================================================

// Improve focus visibility for keyboard users
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('theme-dark');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('theme-dark');
});

// ============================================================
// LAZY LOAD IMAGES (If you add images in the future)
// ============================================================

if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('loading');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================================
// ANALYTICS - TRACK SECTION VIEWS (Optional)
// ============================================================

// Uncomment if you want to track which sections users view
/*
const analyticsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log(`User viewed section: ${entry.target.id}`);
            // Send to analytics service
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section').forEach(section => {
    analyticsObserver.observe(section);
});
*/

// ============================================================
// CONSOLE MESSAGE
// ============================================================

console.log('%cWelcome to the Portfolio!', 'color: #E989A3; font-size: 14px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'color: #FFE4E9; font-size: 12px;');
