// Hero carousel functionality - DISABLED (showing only static slide 3)
// Carousel code kept for reference but not initialized
/*
let currentSlide = 0;
let slides, indicators, contentItems, totalSlides;
let carouselInterval;

function initCarousel() {
    slides = document.querySelectorAll('.hero-slide');
    indicators = document.querySelectorAll('.hero-indicator');
    contentItems = document.querySelectorAll('.hero-content-item');
    totalSlides = slides.length;
    
    console.log('Carousel initialized with', totalSlides, 'slides');
    
    // Show first slide immediately
    showSlide(0);
    
    // Auto-advance slides every 4 seconds
    startCarousel();
    
    // Manual slide control via indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            resetCarouselTimer();
        });
    });
}

function startCarousel() {
    carouselInterval = setInterval(nextSlide, 4000);
    console.log('Carousel auto-started');
}

function resetCarouselTimer() {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(nextSlide, 4000);
}

function showSlide(index) {
    console.log('Showing slide:', index);
    
    // Hide all slides and content
    slides.forEach(slide => slide.classList.add('opacity-0'));
    indicators.forEach(indicator => {
        indicator.classList.remove('bg-white');
        indicator.classList.add('bg-white/50');
    });
    contentItems.forEach(item => item.classList.add('hidden'));
    
    // Show current slide and content
    slides[index].classList.remove('opacity-0');
    indicators[index].classList.remove('bg-white/50');
    indicators[index].classList.add('bg-white');
    contentItems[index].classList.remove('hidden');
    
    // Trigger content animation
    contentItems[index].style.animation = 'none';
    setTimeout(() => {
        contentItems[index].style.animation = 'contentFadeIn 1s ease-out';
    }, 10);
    
    currentSlide = index;
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % totalSlides;
    console.log('Auto-advancing to slide:', nextIndex);
    showSlide(nextIndex);
}
*/

// Navbar scroll effect - DISABLED to maintain static white background
/*
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
*/

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('nav-item-active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('nav-item-active');
        }
    });
});

// Set initial active state for home page
document.addEventListener('DOMContentLoaded', function() {
    // Hero carousel disabled - showing only static slide 3
    // initCarousel();
    
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('nav-item-active');
    }
});

// About section scroll animations
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.3
});

// Why Choose Us section scroll animation
const whyChooseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Start looping typing animation when entire section is visible
            const typingElement = document.querySelector('.typing-animation');
            if (typingElement && !typingElement.classList.contains('animation-started')) {
                typingElement.classList.add('animation-started');
                startLoopingTyping(typingElement);
            }
        }
    });
}, {
    threshold: 0.4
});

// Services section scroll animation
const servicesObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered delay based on position in row (0, 1, 2 for 3 columns)
            const delay = (index % 3) * 150;
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, delay);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

// FAQ section scroll animations
const faqLeftObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animated');
            }, 200); // Slight delay for left side
        }
    });
}, {
    threshold: 0.3
});

const faqRightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animated');
            }, 400); // Slight delay for right side
        }
    });
}, {
    threshold: 0.3
});

// Stats counter animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    const startValue = 0;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Stats section observer
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach((counter, index) => {
                setTimeout(() => {
                    animateCounter(counter);
                }, index * 200); // Stagger animations
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

// Function to create looping typing animation with backspace
function startLoopingTyping(element) {
    console.log('Starting typing animation'); // Debug log
    
    function typeAndBackspace() {
        // Reset to initial state
        element.classList.remove('typing', 'backspacing');
        element.style.width = '0';
        element.offsetHeight; // Trigger reflow
        
        // Start typing animation
        element.classList.add('typing');
        
        // After typing completes (3s), wait 2s then start backspace
        setTimeout(() => {
            element.classList.remove('typing');
            element.offsetHeight; // Trigger reflow
            
            // Start backspace animation
            element.classList.add('backspacing');
            
            // After backspace completes (1.5s), wait 1s then restart
            setTimeout(() => {
                element.classList.remove('backspacing');
                element.offsetHeight; // Trigger reflow
                
                // Wait 1 second then restart the cycle
                setTimeout(() => {
                    typeAndBackspace();
                }, 1000);
            }, 1500);
        }, 5000); // 3s typing + 2s display
    }
    
    typeAndBackspace();
}

// Observe about section elements
document.addEventListener('DOMContentLoaded', function() {
    const aboutLeft = document.querySelector('.about-animate-left');
    const aboutRight = document.querySelector('.about-animate-right');
    
    if (aboutLeft) aboutObserver.observe(aboutLeft);
    if (aboutRight) aboutObserver.observe(aboutRight);
    
    // Observe Why Choose Us section elements
    const whyChooseLeft = document.querySelector('.why-choose-left');
    const whyChooseRight = document.querySelector('.why-choose-right');
    
    if (whyChooseLeft) whyChooseObserver.observe(whyChooseLeft);
    if (whyChooseRight) whyChooseObserver.observe(whyChooseRight);
    
    // Test typing animation immediately
    const typingElement = document.querySelector('.typing-animation');
    if (typingElement && !typingElement.classList.contains('animation-started')) {
        typingElement.classList.add('animation-started');
        setTimeout(() => {
            startLoopingTyping(typingElement);
        }, 1000); // Start after 1 second
    }
    
    // Observe Services section cards
    const serviceCardsLeft = document.querySelectorAll('.service-animate-left');
    const serviceCardsRight = document.querySelectorAll('.service-animate-right');
    serviceCardsLeft.forEach(card => {
        servicesObserver.observe(card);
    });
    serviceCardsRight.forEach(card => {
        servicesObserver.observe(card);
    });
    
    // Observe FAQ section elements
    const faqLeft = document.querySelector('.faq-left-section');
    const faqRight = document.querySelector('.faq-right-section');
    
    if (faqLeft) faqLeftObserver.observe(faqLeft);
    if (faqRight) faqRightObserver.observe(faqRight);
    
    // Observe Stats section
    const statsSection = document.getElementById('stats');
    if (statsSection) statsObserver.observe(statsSection);
});

// FAQ Toggle Function
function toggleFAQ(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('i');
    const allFAQs = document.querySelectorAll('.faq-content');
    const allIcons = document.querySelectorAll('.faq-toggle i');
    
    // Add click animation
    button.style.transform = 'translateX(2px) scale(0.98)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
    
    // Close all other FAQs first
    allFAQs.forEach((faq, index) => {
        if (faq !== content && !faq.classList.contains('hidden')) {
            faq.classList.add('hidden');
            allIcons[index].classList.remove('rotate-180');
        }
    });
    
    // Toggle current FAQ
    if (content.classList.contains('hidden')) {
        // Opening: Remove hidden class first, then force reflow for animation
        content.classList.remove('hidden');
        content.offsetHeight; // Force reflow
        icon.classList.add('rotate-180');
    } else {
        // Closing: Add hidden class to trigger closing animation
        content.classList.add('hidden');
        icon.classList.remove('rotate-180');
    }
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.animate-on-scroll');
animateElements.forEach(el => observer.observe(el));

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Show success notification
            showNotification('Message sent successfully! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Notification function
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    
    if (!notification || !notificationMessage) {
        console.log('Notification elements not found');
        return;
    }
    
    notificationMessage.textContent = message;
    notification.classList.remove('translate-x-full');
    
    setTimeout(() => {
        notification.classList.add('translate-x-full');
    }, 5000);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fix for mobile horizontal overflow issue
function fixMobileOverflow() {
    // Force document width to viewport width
    document.documentElement.style.width = window.innerWidth + 'px';
    document.body.style.width = window.innerWidth + 'px';
    
    // Find any elements causing overflow and fix them
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
            el.style.maxWidth = '100vw';
            el.style.overflowX = 'hidden';
        }
    });
}

// Run on load and resize
window.addEventListener('load', fixMobileOverflow);
window.addEventListener('resize', fixMobileOverflow);

// Run multiple times on initial load to catch any late-loading elements
setTimeout(fixMobileOverflow, 0);
setTimeout(fixMobileOverflow, 100);
setTimeout(fixMobileOverflow, 500);
setTimeout(fixMobileOverflow, 1000);

// ==================== DYNAMIC TESTIMONIALS FROM FIREBASE ====================

// Load testimonials from Firebase
async function loadTestimonialsFromFirebase() {
    console.log('=== Starting Firebase Load ===');
    try {
        // Check if Firebase is initialized
        if (!window.firebaseDB) {
            console.log('Firebase DB not available');
            return;
        }
        
        console.log('Firebase DB found, fetching testimonials...');
        const db = window.firebaseDB;
        
        // Try without orderBy first to see if data exists
        const snapshot = await db.collection('testimonials').get();
        
        console.log('Firebase response received, docs count:', snapshot.docs.length);
        
        const testimonials = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        console.log('Mapped testimonials:', testimonials);
        
        if (testimonials.length > 0) {
            console.log('Found testimonials in Firebase, rendering...');
            renderDynamicTestimonials(testimonials);
        } else {
            console.log('No testimonials found in Firebase collection');
        }
    } catch (error) {
        console.error('Error loading testimonials from Firebase:', error);
        console.error('Error details:', error.message);
    }
}

// Default testimonials fallback
const defaultTestimonials = [
    {
        name: "John Smith",
        service: "Real Estate Client",
        text: "Professional, efficient, and very helpful. Made the entire notarization process smooth and stress-free. Highly recommended!",
        rating: 5
    },
    {
        name: "Sarah Johnson",
        service: "Estate Planning Client",
        text: "Excellent service! They handled our estate planning documents with great care and attention to detail. Very knowledgeable staff.",
        rating: 5
    },
    {
        name: "Michael Chen",
        service: "Power of Attorney Client",
        text: "Quick turnaround time and professional service. They made the power of attorney process simple and straightforward. Great experience!",
        rating: 5
    },
    {
        name: "Emily Davis",
        service: "Document Notarization Client",
        text: "Outstanding service for document notarization. The team is professional, courteous, and very efficient. Will definitely use again!",
        rating: 5
    },
    {
        name: "Robert Wilson",
        service: "Mobile Service Client",
        text: "Mobile notary service was a lifesaver! They came to our office and handled everything professionally. Convenient and reliable!",
        rating: 5
    },
    {
        name: "Lisa Anderson",
        service: "Travel Consent Client",
        text: "Great experience with travel consent letters. They explained everything clearly and processed documents quickly. Highly recommend!",
        rating: 5
    }
];

// Get initials from name
function getInitials(name) {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
}

// Render stars HTML
function renderStars(rating) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(`<i class="fas fa-star${i < rating ? '' : ' text-gray-300'}"></i>`);
    }
    return stars.join('');
}

// Render testimonials dynamically
function renderDynamicTestimonials(testimonials) {
    const container = document.getElementById('testimonials-container');
    const dotsContainer = document.getElementById('testimonial-dots');
    
    if (!container || !dotsContainer) return;
    
    // Clear existing content
    container.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    // Render each testimonial card
    testimonials.forEach((testimonial, index) => {
        const card = document.createElement('div');
        card.className = 'w-full md:w-1/3 flex-shrink-0 px-4';
        card.innerHTML = `
            <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 h-[320px] overflow-hidden flex flex-col">
                <div class="flex items-center mb-3 flex-shrink-0">
                    <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-3 font-semibold text-sm">
                        ${getInitials(testimonial.name)}
                    </div>
                    <div class="min-w-0">
                        <p class="font-semibold text-gray-900 text-sm truncate">${testimonial.name}</p>
                        <p class="text-xs text-gray-500 truncate">${testimonial.service}</p>
                    </div>
                </div>
                <div class="flex items-center mb-3 flex-shrink-0">
                    <div class="flex text-yellow-400 text-sm">
                        ${renderStars(testimonial.rating || 5)}
                    </div>
                    <span class="ml-2 text-sm text-gray-500">${testimonial.rating || 5}.0</span>
                </div>
                <div class="text-gray-700 text-sm leading-relaxed flex-1 overflow-hidden relative">
                    <p style="display: -webkit-box; -webkit-line-clamp: 6; -webkit-box-orient: vertical; overflow: hidden;">
                        ${testimonial.text}
                    </p>
                    ${testimonial.text.length > 150 ? '<p class="text-primary text-xs mt-1 font-medium cursor-pointer hover:underline">Read more...</p>' : ''}
                </div>
            </div>
        `;
        container.appendChild(card);
    });
    
    // Create dots for carousel
    const isMobile = window.innerWidth < 768;
    const itemsPerView = isMobile ? 1 : 3;
    totalTestimonialSlides = Math.ceil(testimonials.length / itemsPerView);
    
    // Limit dots to 3 on mobile
    const dotsToShow = isMobile ? Math.min(3, totalTestimonialSlides) : totalTestimonialSlides;
    
    for (let i = 0; i < dotsToShow; i++) {
        const dot = document.createElement('button');
        dot.className = `testimonial-dot w-3 h-3 rounded-full transition-colors ${i === 0 ? 'bg-primary' : 'bg-gray-300'}`;
        if (i === 0) {
            dot.style.backgroundColor = '#1e3a5f';
        }
        dot.dataset.slide = i;
        dot.addEventListener('click', () => goToTestimonialSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    // Reset carousel position
    currentTestimonialSlide = 0;
    updateCarouselPosition(true);
}

// Load testimonials when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, about to render testimonials...');
    
    // First, render default testimonials immediately so something shows
    console.log('Rendering default testimonials immediately...');
    renderDynamicTestimonials(defaultTestimonials);
    
    // Try to load from Firebase with multiple retries
    let attempts = 0;
    const maxAttempts = 5;
    
    function tryLoadFromFirebase() {
        attempts++;
        console.log(`Firebase load attempt ${attempts}...`);
        
        if (window.firebaseDB) {
            console.log('Firebase DB is ready, loading testimonials...');
            loadTestimonialsFromFirebase();
        } else if (attempts < maxAttempts) {
            console.log('Firebase DB not ready, retrying...');
            setTimeout(tryLoadFromFirebase, 1000);
        } else {
            console.log('Max attempts reached, keeping default testimonials');
        }
    }
    
    // Start trying after initial delay
    setTimeout(tryLoadFromFirebase, 500);
});

// Also reload testimonials when page becomes visible
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible' && window.firebaseDB) {
        console.log('Page became visible, reloading testimonials...');
        loadTestimonialsFromFirebase();
    }
});

// ==================== CAROUSEL NAVIGATION ====================

let currentTestimonialSlide = 0;
let isTransitioning = false;
let totalTestimonialSlides = 0;

function updateCarouselPosition(instant = false) {
    const carousel = document.getElementById('testimonial-carousel');
    if (!carousel) return;
    
    if (instant) {
        carousel.style.transition = 'none';
    } else {
        carousel.style.transition = 'transform 0.5s ease-in-out';
    }
    
    const slideWidth = window.innerWidth >= 768 ? 33.333 : 100;
    const offset = -(currentTestimonialSlide * slideWidth);
    carousel.style.transform = `translateX(${offset}%)`;
    
    // Update dots
    const dots = document.querySelectorAll('.testimonial-dot');
    const dotIndex = currentTestimonialSlide % totalTestimonialSlides;
    dots.forEach((dot, index) => {
        if (index === dotIndex) {
            dot.classList.remove('bg-gray-300');
            dot.classList.add('bg-primary');
            dot.style.backgroundColor = '#1e3a5f';
        } else {
            dot.classList.remove('bg-primary');
            dot.classList.add('bg-gray-300');
            dot.style.backgroundColor = '#d1d5db';
        }
    });
}

function nextTestimonialSlide() {
    if (isTransitioning || totalTestimonialSlides === 0) return;
    isTransitioning = true;
    
    currentTestimonialSlide++;
    updateCarouselPosition();
    
    setTimeout(() => {
        if (currentTestimonialSlide >= totalTestimonialSlides) {
            currentTestimonialSlide = 0;
            updateCarouselPosition(true);
        }
        isTransitioning = false;
    }, 500);
}

function prevTestimonialSlide() {
    if (isTransitioning || totalTestimonialSlides === 0) return;
    isTransitioning = true;
    
    if (currentTestimonialSlide === 0) {
        currentTestimonialSlide = totalTestimonialSlides;
        updateCarouselPosition(true);
        
        setTimeout(() => {
            currentTestimonialSlide = totalTestimonialSlides - 1;
            updateCarouselPosition();
        }, 50);
    } else {
        currentTestimonialSlide--;
        updateCarouselPosition();
    }
    
    setTimeout(() => {
        isTransitioning = false;
    }, 500);
}

function goToTestimonialSlide(slideIndex) {
    currentTestimonialSlide = slideIndex;
    updateCarouselPosition();
}

// Event listeners for carousel navigation
document.addEventListener('DOMContentLoaded', function() {
    const nextBtn = document.getElementById('next-testimonial');
    const prevBtn = document.getElementById('prev-testimonial');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextTestimonialSlide);
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', prevTestimonialSlide);
    }
});

// Auto-play carousel
setInterval(nextTestimonialSlide, 5000);

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            // Toggle menu visibility
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icons
            if (mobileMenu.classList.contains('hidden')) {
                hamburgerIcon.classList.remove('opacity-0', 'rotate-90');
                closeIcon.classList.add('opacity-0', 'rotate-[-90deg]');
            } else {
                hamburgerIcon.classList.add('opacity-0', 'rotate-90');
                closeIcon.classList.remove('opacity-0', 'rotate-[-90deg]');
            }
        });
        
        // Close menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                hamburgerIcon.classList.remove('opacity-0', 'rotate-90');
                closeIcon.classList.add('opacity-0', 'rotate-[-90deg]');
            });
        });
    }
});
