// 애니메이션 헬퍼 함수들

function initFadeInOnScroll(selector, options = {}) {
    const {
        threshold = 0.1,
        rootMargin = '0px 0px -50px 0px',
        duration = 0.4,
        delay = 0,
        yOffset = 24
    } = options;

    const elements = document.querySelectorAll(selector);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay + (index * 50));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold, rootMargin });

    elements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = `translateY(${yOffset}px)`;
        el.style.transition = `opacity ${duration}s ease-out, transform ${duration}s ease-out`;
        observer.observe(el);
    });
}

function initStaggerChildren(parentSelector, childSelector, options = {}) {
    const {
        staggerDelay = 0.1,
        duration = 0.3,
        yOffset = 8,
        threshold = 0.1
    } = options;

    const parents = document.querySelectorAll(parentSelector);
    
    parents.forEach((parent) => {
        const children = parent.querySelectorAll(childSelector);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * staggerDelay * 1000);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold });

        children.forEach((child) => {
            child.style.opacity = '0';
            child.style.transform = `translateY(${yOffset}px)`;
            child.style.transition = `opacity ${duration}s ease-out, transform ${duration}s ease-out`;
        });

        observer.observe(parent);
    });
}

function initHoverScale(selector, options = {}) {
    const {
        scale = 1.03,
        duration = 0.2
    } = options;

    const elements = document.querySelectorAll(selector);
    
    elements.forEach((el) => {
        const existingTransition = el.style.transition || '';
        el.style.transition = `${existingTransition ? existingTransition + ', ' : ''}transform ${duration}s ease-out`;
        
        el.addEventListener('mouseenter', () => {
            el.style.transform = `scale(${scale})`;
        });
        
        el.addEventListener('mousedown', () => {
            el.style.transform = `scale(${scale * 0.97})`;
        });
        
        el.addEventListener('mouseup', () => {
            if (el.matches(':hover')) {
                el.style.transform = `scale(${scale})`;
            } else {
                el.style.transform = 'scale(1)';
            }
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'scale(1)';
        });
    });
}

function initHoverLift(selector, options = {}) {
    const {
        yOffset = -4,
        scale = 1.01,
        duration = 0.3
    } = options;

    const elements = document.querySelectorAll(selector);
    
    elements.forEach((el) => {
        const existingTransition = el.style.transition || '';
        el.style.transition = `${existingTransition ? existingTransition + ', ' : ''}transform ${duration}s ease-out, box-shadow ${duration}s ease-out`;
        
        el.addEventListener('mouseenter', () => {
            el.style.transform = `translateY(${yOffset}px) scale(${scale})`;
            el.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translateY(0) scale(1)';
            el.style.boxShadow = '';
        });
    });
}

function initSlideInLeft(selector, options = {}) {
    const {
        threshold = 0.1,
        duration = 0.35,
        xOffset = -16
    } = options;

    const elements = document.querySelectorAll(selector);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold });

    elements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = `translateX(${xOffset}px)`;
        el.style.transition = `opacity ${duration}s ease-out, transform ${duration}s ease-out`;
        observer.observe(el);
    });
}

function initImageZoom(selector, options = {}) {
    const {
        scale = 1.05,
        duration = 0.3
    } = options;

    const images = document.querySelectorAll(selector);
    
    images.forEach((img) => {
        img.style.transition = `transform ${duration}s ease-out`;
        
        img.addEventListener('mouseenter', () => {
            img.style.transform = `scale(${scale})`;
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
}

function initAnimationsFromAttributes() {
    const fadeInElements = document.querySelectorAll('[data-animate="fade-in"]');
    fadeInElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 50);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        observer.observe(el);
    });

    const staggerParents = document.querySelectorAll('[data-animate="stagger-parent"]');
    staggerParents.forEach((parent) => {
        const children = parent.querySelectorAll('[data-animate="stagger-child"]');
        
        children.forEach((child) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(8px)';
            child.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const children = entry.target.querySelectorAll('[data-animate="stagger-child"]');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 30);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(parent);
    });

    const staggerChildren = document.querySelectorAll('[data-animate="stagger-child"][data-stagger-index]');
    if (staggerChildren.length > 0) {
        const parent = staggerChildren[0].closest('[data-animate="fade-in"], [data-animate="stagger-parent"]');
        if (parent) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        staggerChildren.forEach((child) => {
                            const index = parseInt(child.getAttribute('data-stagger-index') || '0');
                            setTimeout(() => {
                                child.style.opacity = '1';
                                child.style.transform = 'translateY(0)';
                            }, 200 + (index * 100));
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            staggerChildren.forEach((child) => {
                child.style.opacity = '0';
                child.style.transform = 'translateY(20px)';
                child.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
            });
            
            observer.observe(parent);
        }
    }

    const slideInLeftElements = document.querySelectorAll('[data-animate="slide-in-left"]');
    slideInLeftElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-16px)';
        el.style.transition = 'opacity 0.35s ease-out, transform 0.35s ease-out';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(el);
    });
}

function initRippleEffect(selector = 'body', options = {}) {
    const {
        color = 'rgba(255, 255, 255, 0.6)',
        duration = 600
    } = options;

    function createRipple(event) {
        const element = event.currentTarget;
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        const clientY = event.touches ? event.touches[0].clientY : event.clientY;
        
        const rect = element.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: ${color};
            transform: scale(0);
            animation: ripple ${duration}ms ease-out;
            left: ${x - size / 2}px;
            top: ${y - size / 2}px;
            pointer-events: none;
            z-index: 1000;
        `;
        
        const existingRipples = element.querySelectorAll('.ripple-effect');
        existingRipples.forEach(r => r.remove());
        
        ripple.classList.add('ripple-effect');
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, duration);
    }

    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
        el.addEventListener('click', createRipple);
        el.addEventListener('touchstart', createRipple, { passive: true });
    });
}

function initAllAnimations() {
    initAnimationsFromAttributes();
    
    initFadeInOnScroll('.project-card-item', { threshold: 0.3, duration: 0.35, yOffset: 24 });
    initFadeInOnScroll('.award-card', { threshold: 0.3, duration: 0.35, yOffset: 24 });
    
    initHoverScale('.cta-button', { scale: 1.03, duration: 0.2 });
    initHoverLift('.project-card-preview', { yOffset: -4, scale: 1.01, duration: 0.3 });
    initHoverScale('.skill-pill-strong', { scale: 1.04, duration: 0.2 });
    initHoverLift('.award-card', { yOffset: -4, scale: 1.01, duration: 0.3 });
    initHoverScale('.submit-button', { scale: 1.03, duration: 0.2 });
    
    initImageZoom('.project-image-container .project-image', { scale: 1.05, duration: 0.3 });
    
    initRippleEffect('button, a, .cta-button, .submit-button, .project-card-preview, .award-card', {
        color: 'rgba(14, 165, 233, 0.4)',
        duration: 600
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllAnimations);
} else {
    initAllAnimations();
}

window.reinitAnimations = function() {
    initAllAnimations();
};

