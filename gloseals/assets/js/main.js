/* ===================================
   GLOSEALS PREMIUM WEBSITE - MAIN JAVASCRIPT
   =================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initAOS();
    initSmoothScroll();
    initModernNavigation();
    initCarousel();
    initTestimonialSlider();
    initFormSubmissions();
    generateCaptcha();
    initCaptchaRefresh();
    initCounterAnimation();
    initSubdropdowns();
    initScrollToTop();
    initFixedActionPopups();
    initVideoFallback();
    initEnquiryModal();
    initNavbarScroll();
});

// Initialize Bootstrap Carousel
function initCarousel() {
    const carouselElement = document.getElementById('carouselExampleControlsNoTouching');
    if (carouselElement && typeof bootstrap !== 'undefined') {
        // Initialize Bootstrap carousel
        new bootstrap.Carousel(carouselElement, {
            interval: 2500,
            ride: 'carousel',
            touch: true,
            wrap: true
        });
    }
}

// Initialize AOS (Animate On Scroll)
function initAOS() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
        return;
    }

    const assignAOSFade = () => {
        const downSelectors = [
            '.page-title',
            '.page-subtitle',
            '.breadcrumb'
        ].join(', ');
        const upSelectors = [
            '.about-modern', '.why-modern', '.products-modern', '.blog-modern', '.testimonial-modern', '.contact-modern',
            '.why-feature-card', '.product-clean-card', '.blog-clean-card', '.job-card', '.contact-item',
            '.products-modern-head', '.blog-modern-head', '.testimonial-modern-head', '.contact-modern-head',
            '.blog-detail-content', '.sidebar-widget', '.recent-post-item',
            '.section .row > [class*="col-"]', '.section .container > .row', '.section .container > div'
        ].join(', ');

        document.querySelectorAll(downSelectors).forEach((el) => {
            if (!el.hasAttribute('data-aos')) {
                el.setAttribute('data-aos', 'zoom-in-down');
            }
            if (!el.hasAttribute('data-aos-duration')) {
                el.setAttribute('data-aos-duration', '450');
            }
            if (!el.hasAttribute('data-aos-delay')) {
                el.setAttribute('data-aos-delay', '0');
            }
        });
        document.querySelectorAll(upSelectors).forEach((el) => {
            if (!el.hasAttribute('data-aos')) {
                el.setAttribute('data-aos', 'zoom-in-up');
            }
            if (!el.hasAttribute('data-aos-duration')) {
                el.setAttribute('data-aos-duration', '450');
            }
            if (!el.hasAttribute('data-aos-delay')) {
                el.setAttribute('data-aos-delay', '0');
            }
        });
    };

    const startAOS = () => {
        assignAOSFade();

        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 450,
                once: true,
                offset: 40,
                easing: 'ease-out',
                delay: 0,
                disableMutationObserver: false
            });

            if (typeof AOS.refreshHard === 'function') {
                AOS.refreshHard();
            }
            if (typeof AOS.refresh === 'function') {
                setTimeout(() => AOS.refresh(), 300);
            }
        }
    };

    if (typeof AOS !== 'undefined') {
        startAOS();
        return;
    }

    const aosCssId = 'aos-css-dynamic';
    if (!document.getElementById(aosCssId)) {
        const aosCss = document.createElement('link');
        aosCss.id = aosCssId;
        aosCss.rel = 'stylesheet';
        aosCss.href = 'https://unpkg.com/aos@2.3.1/dist/aos.css';
        document.head.appendChild(aosCss);
    }

    const aosJsId = 'aos-js-dynamic';
    const existingScript = document.getElementById(aosJsId);

    if (existingScript) {
        existingScript.addEventListener('load', startAOS, { once: true });
        return;
    }

    const aosScript = document.createElement('script');
    aosScript.id = aosJsId;
    aosScript.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';
    aosScript.defer = true;
    aosScript.onload = startAOS;
    document.body.appendChild(aosScript);
}



// Smooth scrolling for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (this.hasAttribute('data-bs-toggle') || href === '#') {
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
            }
        });
    });
}

// Modern Navigation Functionality
function initModernNavigation() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown-toggle');
    const mobileSubdropdowns = document.querySelectorAll('.mobile-subdropdown-toggle');
    
    // Function to close mobile menu
    function closeMobileMenu() {
        if (mobileToggle && mobileMenu) {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Mobile menu toggle
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Mobile dropdown toggles (Products button)
    mobileDropdowns.forEach(function(dropdown) {
        dropdown.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const parent = this.closest('.mobile-dropdown');
            parent.classList.toggle('active');
        });
    });
    
    // Mobile subdropdown toggles (Floor Cable Protectors, etc.)
    mobileSubdropdowns.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const parent = this.closest('.mobile-subdropdown');
            parent.classList.toggle('active');
        });
    });
    
    // Close mobile menu when clicking navigation links (but let them navigate)
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-list > li > a');
    mobileNavLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            // Only close menu, don't prevent navigation
            if (mobileToggle && mobileMenu) {
                setTimeout(function() {
                    closeMobileMenu();
                }, 100);
            }
        });
    });
}

// Form submissions - Contact Form with Captcha
function initFormSubmissions() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const captchaInput = parseInt(document.getElementById('captchaAnswer').value);
            
            if (captchaInput !== captchaAnswer) {
                alert('Incorrect captcha answer. Please try again.');
                generateCaptcha();
                return false;
            }
            
            alert('Thank you! Your message has been sent successfully.');
            contactForm.reset();
            generateCaptcha();
        });
    }
}

// Captcha functionality
let captchaAnswer = 0;

function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    captchaAnswer = num1 + num2;
    const questionElement = document.getElementById('captchaQuestion');
    if (questionElement) {
        questionElement.textContent = `${num1} + ${num2} = ?`;
    }
    const captchaInput = document.getElementById('captchaAnswer');
    if (captchaInput) {
        captchaInput.value = '';
    }
}

// Add event listener for refresh captcha button
function initCaptchaRefresh() {
    const refreshBtn = document.getElementById('refreshCaptcha');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', generateCaptcha);
    }
}

// Testimonial Slider
function initTestimonialSlider() {
    let currentSlide = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    const totalSlides = testimonials.length;
    const track = document.querySelector('.testimonial-track');
    
    if (!track || totalSlides === 0) return;
    
    function updateSlider() {
        const offset = currentSlide * -100;
        track.style.transform = `translateX(${offset}%)`;
    }
    
    const nextBtn = document.querySelector('.testimonial-next');
    const prevBtn = document.querySelector('.testimonial-prev');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
    }
    
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }, 5000);
}

// Counter Animation for Stats
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Animation speed
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / speed;
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer to trigger animation when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter); // Animate only once
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Nested Subdropdown Functionality
function initSubdropdowns() {
    const subdropdownToggles = document.querySelectorAll('.has-subdropdown');
    
    subdropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const subdropdown = this.nextElementSibling;
            
            // Close other subdropdowns in the same section
            const parentSection = this.closest('.dropdown-section');
            const otherSubdropdowns = parentSection.querySelectorAll('.subdropdown');
            otherSubdropdowns.forEach(sub => {
                if (sub !== subdropdown) {
                    sub.classList.remove('active');
                }
            });
            
            // Toggle current subdropdown
            subdropdown.classList.toggle('active');
        });
    });
    
    // Close subdropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown-content')) {
            document.querySelectorAll('.subdropdown').forEach(sub => {
                sub.classList.remove('active');
            });
        }
    });
}

function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    
    if (scrollBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        }, { passive: true });
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function initFixedActionPopups() {
    const actionButtons = document.querySelectorAll('.fixed-action-buttons .action-btn');
    const isTouchInteraction = window.matchMedia('(hover: none), (pointer: coarse)').matches;

    if (!actionButtons.length) return;

    const closeAllPopups = () => {
        actionButtons.forEach((btn) => btn.classList.remove('is-open'));
    };

    actionButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            if (!isTouchInteraction) {
                return;
            }

            // First tap opens the label popup; second tap follows the link.
            if (!button.classList.contains('is-open')) {
                event.preventDefault();
                closeAllPopups();
                button.classList.add('is-open');
                window.setTimeout(() => {
                    button.classList.remove('is-open');
                }, 1600);
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.fixed-action-buttons')) {
            closeAllPopups();
        }
    });
}

// Video Fallback Handler (supports all banner videos)
function initVideoFallback() {
    const videos = document.querySelectorAll('video.banner-video');
    videos.forEach((video) => {
        const wrapper = video.closest('.hero-video-wrapper, .page-banner-video-wrapper') || video.parentElement;
        const fallback = wrapper ? wrapper.querySelector('.video-fallback') : null;
        if (!video) return;
        // Show fallback if error
        video.addEventListener('error', function() {
            if (fallback) {
                video.style.display = 'none';
                fallback.style.display = 'block';
            }
        });
        // Hide fallback when loaded
        video.addEventListener('loadeddata', function() {
            if (fallback) {
                fallback.style.display = 'none';
            }
        });
    });
}

/* ===================================
   ENQUIRY MODAL FUNCTIONALITY
   =================================== */

// Enquiry form captcha variables
let enquiryCaptchaAnswer = 0;

// Initialize enquiry modal
function initEnquiryModal() {
    const modal = document.getElementById('enquiryModal');
    const form = document.getElementById('enquiryForm');
    
    if (!modal || !form) return;
    
    // Generate captcha when modal opens
    modal.addEventListener('shown.bs.modal', (event) => {
        generateEnquiryCaptcha();
        
        // Update modal heading based on trigger button
        const button = event.relatedTarget;
        const modalHeading = document.getElementById('enquiryModalHeading');
        
        if (button && modalHeading) {
            const enquiryType = button.getAttribute('data-enquiry-type');
            const position = button.getAttribute('data-position');
            
            if (enquiryType === 'career') {
                modalHeading.textContent = 'Career Enquiry';
                // Update position dropdown if position is specified
                if (position) {
                    const productSelect = document.getElementById('enquiryProduct');
                    if (productSelect) {
                        // Try to select the matching position
                        const options = productSelect.options;
                        for (let i = 0; i < options.length; i++) {
                            if (options[i].text === position) {
                                productSelect.selectedIndex = i;
                                break;
                            }
                        }
                    }
                }
            } else {
                modalHeading.textContent = 'Product Enquiry';
            }
        }
    });
    
    // Reset form when modal closes
    modal.addEventListener('hidden.bs.modal', () => {
        form.reset();
        form.classList.remove('was-validated');
        clearFormErrors();
    });
    
    // Handle form submission
    form.addEventListener('submit', handleEnquirySubmit);
    
    // Refresh captcha button
    const refreshBtn = document.getElementById('refreshEnquiryCaptcha');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', generateEnquiryCaptcha);
    }
    
    // Pre-fill product field if on product page
    prefillProductField();
}

// Generate captcha for enquiry form
function generateEnquiryCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    enquiryCaptchaAnswer = num1 + num2;
    
    const questionElement = document.getElementById('enquiryCaptchaQuestion');
    if (questionElement) {
        questionElement.textContent = `${num1} + ${num2} = ?`;
    }
    
    const answerInput = document.getElementById('enquiryCaptchaAnswer');
    if (answerInput) {
        answerInput.value = '';
    }
}

// Handle enquiry form submission
function handleEnquirySubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    
    // Validate form
    if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        return false;
    }
    
    // Validate captcha
    const userAnswer = parseInt(document.getElementById('enquiryCaptchaAnswer').value);
    if (userAnswer !== enquiryCaptchaAnswer) {
        alert('Incorrect security answer. Please try again.');
        generateEnquiryCaptcha();
        return false;
    }
    
    // Collect form data
    const formData = collectFormData(form);
    
    // Submit enquiry
    submitEnquiry(formData);
}

// Collect form data into object
function collectFormData(form) {
    return {
        name: form.querySelector('#enquiryName').value,
        email: form.querySelector('#enquiryEmail').value,
        phone: form.querySelector('#enquiryPhone').value,
        company: form.querySelector('#enquiryCompany').value,
        product: form.querySelector('#enquiryProduct').value,
        message: form.querySelector('#enquiryMessage').value,
        timestamp: new Date().toISOString(),
        source: window.location.href,
        userAgent: navigator.userAgent
    };
}

// Submit enquiry (placeholder for backend integration)
function submitEnquiry(data) {
    // For static site: show success message
    showSuccessToast('Thank you! Your enquiry has been submitted successfully. We will contact you soon.');
    
    // Close modal
    const modalElement = document.getElementById('enquiryModal');
    if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
            modal.hide();
        }
    }
}

function showSuccessToast(message) {
    const toast = createToast(message, 'success');
    document.body.appendChild(toast);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// Create toast element
function createToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
    toast.style.zIndex = '9999';
    toast.style.minWidth = '300px';
    toast.style.maxWidth = '500px';
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    
    toast.innerHTML = `
        <i class="fas ${icon}"></i> 
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    return toast;
}

// Clear form validation errors
function clearFormErrors() {
    const form = document.getElementById('enquiryForm');
    if (!form) return;
    
    const invalidInputs = form.querySelectorAll('.is-invalid');
    invalidInputs.forEach(input => input.classList.remove('is-invalid'));
    
    const errorMessages = form.querySelectorAll('.invalid-feedback');
    errorMessages.forEach(msg => msg.style.display = 'none');
}

// Pre-fill product field based on current page
function prefillProductField() {
    const productSelect = document.getElementById('enquiryProduct');
    if (!productSelect) return;
    
    // Check if on Monad product page
    if (window.location.pathname.includes('monad-product')) {
        productSelect.value = 'monad';
    }
    
    // Check if on careers page - update label
    if (window.location.pathname.includes('careers')) {
        const label = productSelect.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
            label.textContent = 'Position of Interest';
        }
    }
}




/* ===================================
   NAVBAR SCROLL - FIXED POSITION
   =================================== */

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const hasHeroVideo = !!document.querySelector('.hero .hero-video-wrapper');
    document.body.classList.toggle('has-hero-video', hasHeroVideo);

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    // Keep navbar transparent over hero video and switch to white once scrolled.
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}
