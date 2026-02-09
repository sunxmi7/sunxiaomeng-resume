/**
 * Personal Resume - Main JavaScript
 * Handles all interactive features and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initNavigation();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    initSmoothScroll();
    initScrollIndicator();
    initLightbox();
});

/**
 * Navigation Module
 * Handles mobile menu toggle and active state
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(function(section) {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector('.nav-link[href*=' + sectionId + ']');

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(function(link) {
                        link.classList.remove('active');
                    });
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
}

/**
 * Scroll Animations Module
 * Handles fade-in animations on scroll
 */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.section-header, .about-content, .timeline, .skills-grid, .projects-grid, .contact-content');

    // Create fade-in elements
    fadeElements.forEach(function(element) {
        element.classList.add('fade-in');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(function(element) {
        observer.observe(element);
    });

    // Stagger animation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(function(card, index) {
        card.style.transitionDelay = (index * 0.1) + 's';
    });

    // Stagger animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(function(item, index) {
        item.style.transitionDelay = (index * 0.15) + 's';
    });
}

/**
 * Skill Bars Module
 * Animates skill bar progress on scroll
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(function() {
                    entry.target.style.width = width;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillBars.forEach(function(bar) {
        observer.observe(bar);
    });
}

/**
 * Contact Form Module
 * Handles form validation and submission
 */
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = {};
        formData.forEach(function(value, key) {
            data[key] = value;
        });

        // Simple validation
        if (!data.name || !data.email || !data.message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        if (!isValidEmail(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        setTimeout(function() {
            showNotification('Message sent successfully!', 'success');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });

    // Input focus effects
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(function(input) {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

/**
 * Smooth Scroll Module
 * Enables smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll Indicator Module
 * Hides scroll indicator on scroll
 */
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (!scrollIndicator) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.visibility = 'hidden';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.visibility = 'visible';
        }
    });
}

/**
 * Utility Functions
 */

// Email validation
function isValidEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    var existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    var notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.innerHTML = '<span>' + message + '</span><button class="notification-close"><i class="fas fa-times"></i></button>';

    // Add styles
    notification.style.cssText = 'position: fixed; top: 100px; right: 20px; padding: 1rem 1.5rem; background: ' + (type === 'success' ? '#10b981' : '#ef4444') + '; color: white; border-radius: 0.5rem; display: flex; align-items: center; gap: 1rem; z-index: 10000; animation: slideIn 0.3s ease; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);';

    // Add animation keyframes if not exists
    if (!document.querySelector('#notification-styles')) {
        var style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = '@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } } @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }';
        document.head.appendChild(style);
    }

    // Add close button functionality
    var closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = 'background: none; border: none; color: white; cursor: pointer; padding: 0.25rem;';

    closeBtn.addEventListener('click', function() {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(function() {
            notification.remove();
        }, 300);
    });

    // Auto remove after 5 seconds
    setTimeout(function() {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(function() {
                notification.remove();
            }, 300);
        }
    }, 5000);

    document.body.appendChild(notification);
}

// Counter animation for stats
function animateCounter(element, target, duration) {
    var start = 0;
    var increment = target / (duration / 16);

    var timer = setInterval(function() {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    var scrolled = window.pageYOffset;
    var hero = document.querySelector('.hero');
    var avatar = document.querySelector('.avatar-container');

    if (hero && avatar) {
        avatar.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
    }
});

/**
 * Lightbox Module
 * Handles image and video gallery popup
 */
function initLightbox() {
    // Create lightbox element
    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '' +
        '<div class="lightbox-close"><i class="fas fa-times"></i></div>' +
        '<div class="lightbox-content"></div>' +
        '<div class="lightbox-counter"></div>';
    document.body.appendChild(lightbox);

    var lightboxContent = lightbox.querySelector('.lightbox-content');
    var lightboxClose = lightbox.querySelector('.lightbox-close');
    var lightboxCounter = lightbox.querySelector('.lightbox-counter');

    // Get all gallery images and videos
    var galleryItems = [];
    var currentIndex = 0;

    // Collect images
    document.querySelectorAll('.project-gallery img').forEach(function(img, index) {
        galleryItems.push({
            type: 'image',
            src: img.src,
            alt: img.alt || 'Gallery image'
        });
        var imgIndex = galleryItems.length - 1;
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            openLightbox(imgIndex);
        });
    });

    // Collect videos
    document.querySelectorAll('.project-video video').forEach(function(video, index) {
        var poster = video.getAttribute('poster') || '';
        var sources = video.querySelectorAll('source');
        var videoSrc = sources.length > 0 ? sources[0].src : '';

        galleryItems.push({
            type: 'video',
            src: videoSrc,
            poster: poster,
            label: video.parentElement.querySelector('.video-label') ? video.parentElement.querySelector('.video-label').textContent : 'Video'
        });
        var videoIndex = galleryItems.length - 1;
        video.addEventListener('click', function(e) {
            e.stopPropagation();
            openLightbox(videoIndex);
        });
    });

    function openLightbox(index) {
        currentIndex = index;
        var item = galleryItems[currentIndex];
        
        if (item.type === 'image') {
            lightboxContent.innerHTML = '<img src="' + item.src + '" alt="' + item.alt + '">';
        } else if (item.type === 'video' && item.src) {
            lightboxContent.innerHTML = '<video controls autoplay style="max-width:90vw;max-height:90vh;"><source src="' + item.src + '" type="video/mp4"></video>';
        }
        
        updateCounter();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function updateCounter() {
        lightboxCounter.textContent = (currentIndex + 1) + ' / ' + galleryItems.length;
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        lightboxContent.innerHTML = '';
    }

    function showPrev() {
        if (currentIndex > 0) {
            currentIndex--;
            openLightbox(currentIndex);
        }
    }

    function showNext() {
        if (currentIndex < galleryItems.length - 1) {
            currentIndex++;
            openLightbox(currentIndex);
        }
    }

    // Event listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
}

// Preload images for better performance
function preloadImages() {
    var images = document.querySelectorAll('img[data-src]');

    images.forEach(function(img) {
        var src = img.getAttribute('data-src');
        if (src) {
            var newImg = new Image();
            newImg.onload = function() {
                img.src = src;
                img.removeAttribute('data-src');
            };
            newImg.src = src;
        }
    });
}

// Debounce function for performance
function debounce(func, wait) {
    var timeout;
    return function() {
        var context = this;
        var args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}

// Lazy load images
var lazyImages = document.querySelectorAll('img[data-src]');

var imageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            var img = entry.target;
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(function(img) {
    imageObserver.observe(img);
});

// Add loading class to body
document.body.classList.add('loading');

window.addEventListener('load', function() {
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
});
