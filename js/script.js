// Blue Bird Call Driver - Professional Website Script
document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // FORM HANDLERS
    // ============================================

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.name.value;
            const phone = this.phone.value;
            const pickup = this.pickup.value;
            const destination = this.destination.value;
            const datetime = this.datetime.value;
            const message = this.message.value;

            // Create WhatsApp message
            const whatsappMessage = `Hi, I'd like to book a driver.
Name: ${name}
Phone: ${phone}
Pickup: ${pickup}
Destination: ${destination || 'Not specified'}
Date & Time: ${datetime || 'Not specified'}
Special Requirements: ${message || 'None'}`;

            // Send to WhatsApp
            const encodedMessage = encodeURIComponent(whatsappMessage);
            window.open(`https://wa.me/917510306223?text=${encodedMessage}`, '_blank');

            // Show success message
            showNotification('Request sent to WhatsApp! Hridhik will contact you shortly.', 'success');
            this.reset();
        });
    }

    // Review Form Handler
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.name.value;
            const rating = this.rating.value;
            const message = this.message.value;

            // Create WhatsApp message
            const whatsappMessage = `New Review:
Name: ${name}
Rating: ${rating} stars
Review: ${message}`;

            // Send to WhatsApp
            const encodedMessage = encodeURIComponent(whatsappMessage);
            window.open(`https://wa.me/917510306223?text=${encodedMessage}`, '_blank');

            // Show success message
            showNotification('Thank you for your review! It will be published after moderation.', 'success');
            this.reset();
        });
    }

    // ============================================
    // NOTIFICATION SYSTEM
    // ============================================

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: ${type === 'success' ? '#25D366' : '#ff4444'};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            animation: slideInRight 0.3s ease-out;
            font-weight: 600;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // ============================================
    // SMOOTH SCROLL EFFECT
    // ============================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // ============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ============================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.service-card, .review-card, .info-card').forEach(el => {
        observer.observe(el);
    });

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Parallax effect on hero
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        }
    });

    // ============================================
    // MOBILE OPTIMIZATION
    // ============================================

    function handleMobileOptimization() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Reduce animation complexity on mobile
            document.querySelectorAll('[style*="animation"]').forEach(el => {
                el.style.animationDuration = '0.5s';
            });
        }
    }

    handleMobileOptimization();
    window.addEventListener('resize', handleMobileOptimization);

    // ============================================
    // BUTTON RIPPLE EFFECT
    // ============================================

    document.querySelectorAll('.btn').forEach(button => {
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
                background: radial-gradient(circle, rgba(255,255,255,0.5), transparent);
                border-radius: 50%;
                transform: translate(${x}px, ${y}px);
                pointer-events: none;
                animation: ripple 0.6s ease-out;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ============================================
    // SERVICE ICONS ANIMATION
    // ============================================

    document.querySelectorAll('.service-icon, .info-icon').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'bounce 0.6s ease-out';
            }, 10);
        });
    });

    console.log('✓ Blue Bird website loaded successfully!');
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: translate(var(--x), var(--y)) scale(4);
            opacity: 0;
        }
    }
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);