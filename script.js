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
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.2
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

// Testimonial Carousel
let currentTestimonialSlide = 0;
const carousel = document.getElementById('testimonial-carousel');
const dots = document.querySelectorAll('.testimonial-dot');
let isTransitioning = false;

// Clone cards to create seamless loop
function initializeCarousel() {
    const cards = carousel.children;
    const cardCount = cards.length;
    
    // Clone all cards and append to create seamless loop
    for (let i = 0; i < cardCount; i++) {
        const clone = cards[i].cloneNode(true);
        carousel.appendChild(clone);
    }
}

function updateCarousel(instant = false) {
    if (instant) {
        carousel.style.transition = 'none';
    } else {
        carousel.style.transition = 'transform 0.5s ease-in-out';
    }
    
    const slideWidth = window.innerWidth >= 768 ? 33.333 : 100; // 3 cards on desktop, 1 on mobile
    const offset = -(currentTestimonialSlide * slideWidth);
    carousel.style.transform = `translateX(${offset}%)`;
    
    // Update dots based on actual position (mod 6 for circular behavior)
    const dotIndex = currentTestimonialSlide % 6;
    dots.forEach((dot, index) => {
        if (index === dotIndex) {
            dot.classList.remove('bg-gray-300');
            dot.classList.add('bg-primary');
        } else {
            dot.classList.remove('bg-primary');
            dot.classList.add('bg-gray-300');
        }
    });
}

function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    currentTestimonialSlide++;
    updateCarousel();
    
    // Check if we need to reset position (after transition)
    setTimeout(() => {
        // If we've gone through the original set, reset without animation
        if (currentTestimonialSlide >= 6) {
            currentTestimonialSlide = 0; // Reset to start
            updateCarousel(true); // Reset without animation
        }
        isTransitioning = false;
    }, 500);
}

function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    // If we're at the start, go to the cloned set
    if (currentTestimonialSlide === 0) {
        currentTestimonialSlide = 6; // Jump to cloned set
        updateCarousel(true); // Set position without animation
        
        setTimeout(() => {
            currentTestimonialSlide = 5;
            updateCarousel(); // Animate to previous position
        }, 50);
    } else {
        currentTestimonialSlide--;
        updateCarousel();
    }
    
    setTimeout(() => {
        isTransitioning = false;
    }, 500);
}

function goToSlide(slideIndex) {
    currentTestimonialSlide = slideIndex;
    updateCarousel();
}

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
    updateCarousel(true); // Set initial position without animation
    
    // Force recalculation after a short delay to fix mobile overflow issue
    setTimeout(() => {
        updateCarousel(true);
    }, 100);
    
    // Force recalculation after images load
    window.addEventListener('load', () => {
        updateCarousel(true);
    });
});

// Event listeners
document.getElementById('next-testimonial').addEventListener('click', nextSlide);
document.getElementById('prev-testimonial').addEventListener('click', prevSlide);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
});

// Auto-play carousel
setInterval(nextSlide, 5000);

// Handle window resize
window.addEventListener('resize', updateCarousel);

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

// Mobile service area toggle
function toggleMobileServiceArea() {
    const serviceArea = document.getElementById('mobile-service-area');
    serviceArea.classList.toggle('hidden');
}

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on links
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
    });
});

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

// Testimonials data
const testimonials = [
    {
        name: "John Smith",
        role: "Real Estate Client",
        content: "Professional, efficient, and very helpful. Made the entire notarization process smooth and stress-free. Highly recommended!",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
        name: "Sarah Johnson",
        role: "Estate Planning Client",
        content: "Excellent service! They took care of all our estate planning needs with great attention to detail and professionalism.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
        name: "Michael Chen",
        role: "Business Client",
        content: "Highly recommended! Professional, knowledgeable, and very reasonable rates for their services. Will definitely use again.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
];

let currentTestimonial = 0;
const testimonialSlider = document.getElementById('testimonial-slider');

function showTestimonial(index) {
    const testimonial = testimonials[index];
    testimonialSlider.innerHTML = `
        <div class="testimonial-slide">
            <div class="bg-light-gray p-8 rounded-lg shadow-lg">
                <div class="flex mb-4">
                    <i class="fas fa-star text-yellow-400"></i>
                    <i class="fas fa-star text-yellow-400"></i>
                    <i class="fas fa-star text-yellow-400"></i>
                    <i class="fas fa-star text-yellow-400"></i>
                    <i class="fas fa-star text-yellow-400"></i>
                </div>
                <p class="text-lg text-gray-600 mb-6 italic">
                    "${testimonial.content}"
                </p>
                <div class="flex items-center">
                    <img src="${testimonial.image}" 
                         alt="${testimonial.name}" 
                         class="w-12 h-12 rounded-full mr-4">
                    <div>
                        <p class="font-semibold text-primary">${testimonial.name}</p>
                        <p class="text-sm text-gray-500">${testimonial.role}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Testimonial slider controls
document.getElementById('prev-testimonial').addEventListener('click', function() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
});

document.getElementById('next-testimonial').addEventListener('click', function() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
});

// Auto-slide testimonials
setInterval(function() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Contact form submission
const contactForm = document.getElementById('contact-form');
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

// Notification function
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    
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

// Mobile menu toggle with hamburger animation
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
        // Toggle active class for hamburger animation
        this.classList.toggle('active');
        // Toggle mobile menu visibility
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.classList.remove('active');
        });
    });
}
setTimeout(fixMobileOverflow, 1000);
