// Hero carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.hero-indicator');
const contentItems = document.querySelectorAll('.hero-content-item');
const totalSlides = slides.length;

function showSlide(index) {
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
    showSlide(nextIndex);
}

// Auto-advance slides every 4 seconds
setInterval(nextSlide, 4000);

// Manual slide control via indicators
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

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
            
            // Start typing animation when entire section is visible
            const typingElement = document.querySelector('.typing-animation');
            if (typingElement && !typingElement.classList.contains('typing-started')) {
                typingElement.classList.add('typing-started');
                setTimeout(() => {
                    typingElement.classList.add('finished');
                }, 3000);
            }
        }
    });
}, {
    threshold: 0.4
});

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
});

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
