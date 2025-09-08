// Portfolio Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initTypingAnimation();
    initSmoothScrolling();
    initScrollEffects();
    initMobileMenu();
    initProjectFilters();
    initContactForm();
    initScrollProgress();
});

// Typing Animation
function initTypingAnimation() {
    const textElement = document.getElementById('typing-text');
    if (!textElement) return;

    const texts = [
        'Software Engineer',
        'MERN Stack Developer',
        'Problem Solver',
        'Creative Thinker'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before next word
        }

        setTimeout(typeText, typingSpeed);
    }

    // Start typing animation after a delay
    setTimeout(typeText, 1000);
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Effects and Animations
function initScrollEffects() {
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('.main-header');
    
    // Header background change on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 100) {
            header.style.background = 'rgba(102, 126, 234, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            header.style.backdropFilter = 'none';
        }
    });

    // Intersection Observer for section animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        sectionObserver.observe(section);
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const header = document.querySelector('.main-header');
    const nav = document.querySelector('.nav-links');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.style.display = 'none';
    
    header.querySelector('.container').appendChild(mobileMenuBtn);
    
    // Mobile menu functionality
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('mobile-open');
        this.innerHTML = nav.classList.contains('mobile-open') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking on a link
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('mobile-open');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Show/hide mobile menu button based on screen size
    function toggleMobileMenu() {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
            nav.classList.add('mobile-nav');
        } else {
            mobileMenuBtn.style.display = 'none';
            nav.classList.remove('mobile-nav', 'mobile-open');
        }
    }
    
    toggleMobileMenu();
    window.addEventListener('resize', toggleMobileMenu);
}

// Project Filters (for future enhancement)
function initProjectFilters() {
    // This function can be expanded to add filtering capabilities
    // for different project categories (Frontend, Backend, Full-stack, etc.)
    console.log('Project filters initialized');
}

// Contact Form Handling
function initContactForm() {
    // Add contact form functionality if needed
    // This can be expanded to include form validation and submission
    console.log('Contact form initialized');
}

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(45deg, #ffd700, #ffed4e);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Add CSS for mobile menu
const mobileStyles = `
    @media (max-width: 768px) {
        .mobile-nav {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(102, 126, 234, 0.95);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 1rem 0;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .mobile-nav.mobile-open {
            transform: translateY(0);
            opacity: 1;
        }
        
        .mobile-menu-btn {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        }
    }
`;

// Inject mobile styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileStyles;
document.head.appendChild(styleSheet);

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Add click effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px)';
            }, 150);
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple animation CSS
const rippleStyles = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

const rippleStyleSheet = document.createElement('style');
rippleStyleSheet.textContent = rippleStyles;
document.head.appendChild(rippleStyleSheet);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations can be optimized here
}, 16)); // 60fps



function downloadPDF() {
      const element = document.getElementById("content");
      html2pdf()
        .from(element)
        .set({
          margin: 10,
          filename: "image/umesh_resume.pdf",  // <-- File name when downloaded
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
        })
        .save();
    }