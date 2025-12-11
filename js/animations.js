// Framer Motion 스타일 애니메이션 헬퍼 함수들
// React 없이도 사용할 수 있도록 Intersection Observer와 CSS transitions를 활용

// Fade In On Scroll 애니메이션
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

// Stagger Children 애니메이션
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

// Hover Scale 애니메이션
function initHoverScale(selector, options = {}) {
    const {
        scale = 1.03,
        duration = 0.2
    } = options;

    const elements = document.querySelectorAll(selector);
    
    elements.forEach((el) => {
        // 기존 transition이 있으면 유지, 없으면 추가
        const existingTransition = el.style.transition || '';
        el.style.transition = `${existingTransition ? existingTransition + ', ' : ''}transform ${duration}s ease-out`;
        
        el.addEventListener('mouseenter', () => {
            el.style.transform = `scale(${scale})`;
        });
        
        // Tap/Click 효과
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

// Hover Lift 애니메이션 (y축 이동 + shadow)
function initHoverLift(selector, options = {}) {
    const {
        yOffset = -4,
        scale = 1.01,
        duration = 0.3
    } = options;

    const elements = document.querySelectorAll(selector);
    
    elements.forEach((el) => {
        // 기존 transition이 있으면 유지, 없으면 추가
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

// Slide In From Left 애니메이션
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

// Image Zoom on Hover (container에 overflow-hidden 필요)
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

// data-animate 속성을 기반으로 자동 애니메이션 초기화
function initAnimationsFromAttributes() {
    // Fade In 애니메이션
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

    // Stagger Parent 애니메이션
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

    // Stagger Child (개별 인덱스 기반)
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

    // Slide In Left 애니메이션
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

// 모든 애니메이션 초기화
function initAllAnimations() {
    // data-animate 속성 기반 자동 초기화 (가장 먼저 실행)
    initAnimationsFromAttributes();
    
    // 프로젝트 카드 애니메이션 (동적으로 생성되므로 별도 처리)
    initFadeInOnScroll('.project-card-item', { threshold: 0.3, duration: 0.35, yOffset: 24 });
    
    // Awards cards (동적으로 생성될 수 있으므로 별도 처리)
    initFadeInOnScroll('.award-card', { threshold: 0.3, duration: 0.35, yOffset: 24 });
    
    // Hover 애니메이션 (항상 적용)
    initHoverScale('.cta-button', { scale: 1.03, duration: 0.2 });
    initHoverLift('.project-card-preview', { yOffset: -4, scale: 1.01, duration: 0.3 });
    initHoverScale('.skill-pill-strong', { scale: 1.04, duration: 0.2 });
    initHoverLift('.award-card', { yOffset: -4, scale: 1.01, duration: 0.3 });
    initHoverScale('.submit-button', { scale: 1.03, duration: 0.2 });
    
    // 프로젝트 이미지 zoom (overflow-hidden이 있는 컨테이너 내부)
    initImageZoom('.project-image-container .project-image', { scale: 1.05, duration: 0.3 });
}

// DOM 로드 완료 시 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllAnimations);
} else {
    initAllAnimations();
}

// 동적으로 추가된 요소를 위한 재초기화 함수
window.reinitAnimations = function() {
    initAllAnimations();
};

