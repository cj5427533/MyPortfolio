// 이미지 lazy loading
(function() {
    'use strict';
    
    function initLazyImageLoading() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]:not([data-lazy-loaded])');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (!img.complete || img.naturalHeight === 0) {
                            img.addEventListener('load', () => {
                                img.classList.add('loaded');
                                img.setAttribute('data-loaded', 'true');
                            });
                            img.addEventListener('error', () => {
                                img.classList.add('error');
                                img.setAttribute('data-loaded', 'true');
                            });
                        } else {
                            img.classList.add('loaded');
                            img.setAttribute('data-loaded', 'true');
                        }
                        img.setAttribute('data-lazy-loaded', 'true');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px'
            });
            
            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            lazyImages.forEach(img => {
                img.setAttribute('data-lazy-loaded', 'true');
            });
        }
    }
    
    function preloadCriticalImages() {
        const criticalImages = [
            'images/MyImage.png'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            link.fetchPriority = 'high';
            document.head.appendChild(link);
        });
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            preloadCriticalImages();
            initLazyImageLoading();
        });
    } else {
        preloadCriticalImages();
        initLazyImageLoading();
    }
    
    // 동적 추가된 이미지 처리
    const observer = new MutationObserver(() => {
        initLazyImageLoading();
    });
    
    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
})();

// 배경 그라데이션 스크롤 효과
window.addEventListener('scroll', function() {
    const dynamicBg = document.getElementById('dynamic-bg');
    if (!dynamicBg) return;
    
    const scrollPosition = window.scrollY;
    const documentHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollPosition / documentHeight) * 100;
    
    dynamicBg.style.backgroundPosition = `${scrollPercentage}% ${scrollPercentage/2}%`;
});

function initHeroAnimations() {
    // animations.js에서 처리
}

document.addEventListener('DOMContentLoaded', function() {
    initHeroAnimations();
    
    const typedElement = document.getElementById('typed-text');
    if (typedElement && typeof Typed !== 'undefined') {
        const heroSection = document.getElementById('hero-section');
        const heroTagline = document.getElementById('hero-tagline');
        
        if (heroSection && heroTagline) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !typedElement.dataset.typedInitialized) {
                        typedElement.dataset.typedInitialized = 'true';
                        
                        setTimeout(() => {
                            typedElement.textContent = '';
                            
                            new Typed('#typed-text', {
                                strings: [
                                    '협업과 열린 소통으로 함께 문제를 해결하는 개발자',
                                    'UX 중심의 문제 정의와 해결을 추구하는 개발자',
                                    'Agile 방식으로 빠르게 실행하고 개선하는 개발자',
                                    '최신 LLM 및 IT 트렌드를 학습하고 실전에 적용하는 개발자'
                                ],
                                typeSpeed: 50,
                                backSpeed: 30,
                                backDelay: 2000,
                                loop: true,
                                showCursor: false,
                                smartBackspace: true,
                                startDelay: 300
                            });
                        }, 600);
                        
                        observer.unobserve(heroSection);
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(heroSection);
        }
    }
    
    const sections = document.querySelectorAll('.section-animate');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        sections.forEach(function(section) {
            const elementHeight = section.offsetHeight;
            const elementTopPosition = section.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;
            
            if ((elementBottomPosition >= windowTopPosition) && 
                (elementTopPosition <= windowBottomPosition)) {
                section.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkIfInView);
    window.addEventListener('resize', checkIfInView);
    checkIfInView();

    const dynamicBg = document.getElementById('dynamic-bg');
    if (dynamicBg) {
        function updateBackground() {
            const scrollY = window.scrollY;
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const scrollFraction = scrollY / totalHeight;
            const opacity = Math.min(1, scrollFraction * 0.5);
        }

        updateBackground();
        window.addEventListener('scroll', updateBackground);
    }

    // smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 이미지/비디오 확대 모달
    const enlargeableMedia = document.querySelectorAll('.enlargeable-media');
    const enlargeModal = document.getElementById('enlargeModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalContent = document.getElementById('modalContent');

    function preventLayoutShift() {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            const awardModal = document.getElementById('awardModal');
            if (awardModal && !awardModal.classList.contains('hidden')) {
                awardModal.style.paddingRight = `${scrollbarWidth}px`;
            }
        }
    }
    
    function restoreLayoutShift() {
        document.body.style.paddingRight = '';
        const awardModal = document.getElementById('awardModal');
        if (awardModal && awardModal.classList.contains('hidden')) {
            awardModal.style.paddingRight = '';
        }
    }

    enlargeableMedia.forEach(media => {
        media.addEventListener('click', () => {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            const mediaSrc = media.dataset.src;
            const mediaType = media.dataset.mediaType;

            modalContent.innerHTML = '';

            if (mediaType === 'image') {
                const img = document.createElement('img');
                img.src = mediaSrc;
                img.classList.add('max-w-full', 'max-h-full', 'w-auto', 'h-auto', 'object-contain');
                modalContent.appendChild(img);
            } else if (mediaType === 'video') {
                const video = document.createElement('video');
                video.src = mediaSrc;
                video.controls = true;
                video.autoplay = true;
                video.loop = true;
                video.classList.add('max-w-full', 'max-h-full', 'w-auto', 'h-auto', 'object-contain');
                modalContent.appendChild(video);
            }

            enlargeModal.classList.remove('hidden');
            
            if (scrollbarWidth > 0) {
                document.body.style.paddingRight = `${scrollbarWidth}px`;
                const awardModal = document.getElementById('awardModal');
                if (awardModal && !awardModal.classList.contains('hidden')) {
                    awardModal.style.paddingRight = `${scrollbarWidth}px`;
                }
            }
            
            document.body.classList.add('overflow-hidden');
        });
    });

    function closeEnlargeModal() {
        enlargeModal.classList.add('hidden');
        modalContent.innerHTML = '';
        
        const awardModal = document.getElementById('awardModal');
        const isAwardModalOpen = awardModal && !awardModal.classList.contains('hidden');
        
        if (!isAwardModalOpen) {
            restoreLayoutShift();
            document.body.classList.remove('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }

    closeModalBtn.addEventListener('click', closeEnlargeModal);

    enlargeModal.addEventListener('click', (e) => {
        if (e.target === enlargeModal) {
            closeEnlargeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !enlargeModal.classList.contains('hidden')) {
            closeEnlargeModal();
        }
    });
});

// 연락처 폼
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formStatus = document.getElementById('formStatus');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('https://proud-lab-22e2.cj542753315.workers.dev/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        formStatus.classList.remove('hidden');
        if (response.ok) {
            successMessage.classList.remove('hidden');
            errorMessage.classList.add('hidden');
            
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translateY(20px)';
            successMessage.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
            
            setTimeout(() => {
                successMessage.style.opacity = '1';
                successMessage.style.transform = 'translateY(0)';
            }, 10);
            
            e.target.reset();
        } else {
            const errorText = await response.text();
            errorMessage.textContent = errorText;
            errorMessage.classList.remove('hidden');
            successMessage.classList.add('hidden');
        }
    } catch (error) {
        formStatus.classList.remove('hidden');
        errorMessage.textContent = '서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.';
        errorMessage.classList.remove('hidden');
        successMessage.classList.add('hidden');
    }
});

// 모바일 전용 스크롤 버튼
(function() {
    'use strict';
    
    const mobileScrollBar = document.getElementById('mobile-scroll-bar');
    const mobileScrollBtn = document.getElementById('mobile-scroll-btn');
    const heroSection = document.getElementById('hero-section');
    const projectsSection = document.querySelector('section:has(h2:contains("🚀 Project"))');
    const skillsSection = document.getElementById('skills-section');
    
    if (!mobileScrollBar || !mobileScrollBtn || !heroSection || !skillsSection) return;
    
    // Project 섹션 찾기 (더 안전한 방법)
    let projectSectionElement = null;
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const h2 = section.querySelector('h2');
        if (h2 && h2.textContent.includes('🚀 Project')) {
            projectSectionElement = section;
        }
    });
    
    if (!projectSectionElement) return;
    
    // 모바일 체크 함수
    function isMobile() {
        return window.innerWidth < 768;
    }
    
    // 스크롤 감지 함수
    function handleScroll() {
        if (!isMobile()) {
            mobileScrollBar.classList.add('hidden');
            mobileScrollBar.classList.remove('visible');
            return;
        }
        
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const heroTop = heroSection.offsetTop;
        const heroBottom = heroTop + heroSection.offsetHeight;
        const projectTop = projectSectionElement.offsetTop;
        const projectBottom = projectTop + projectSectionElement.offsetHeight;
        
        // 현재 뷰포트의 상단과 하단 위치
        const viewportTop = scrollY;
        const viewportBottom = scrollY + windowHeight;
        
        // 히어로 섹션의 하단을 지나갔고, Project 섹션의 하단을 지나가지 않았을 때
        // 즉, 히어로 섹션을 지나서 Project 섹션을 보고 있는 동안
        const pastHero = viewportTop >= heroBottom - 50; // 약간의 여유 공간
        const beforeProjectEnd = viewportTop < projectBottom;
        const isInRange = pastHero && beforeProjectEnd;
        
        if (isInRange) {
            mobileScrollBar.classList.remove('hidden');
            mobileScrollBar.classList.add('visible');
        } else {
            mobileScrollBar.classList.remove('visible');
            // 약간의 딜레이 후 숨김 (애니메이션 완료 대기)
            setTimeout(() => {
                if (!mobileScrollBar.classList.contains('visible')) {
                    mobileScrollBar.classList.add('hidden');
                }
            }, 300);
        }
    }
    
    // 버튼 클릭 이벤트
    mobileScrollBtn.addEventListener('click', function() {
        if (skillsSection) {
            skillsSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
    
    // 스크롤 이벤트 리스너
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
        handleScroll();
    });
    
    // DOMContentLoaded 후 초기 체크
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(handleScroll, 100);
        });
    } else {
        setTimeout(handleScroll, 100);
    }
    
    // 초기 체크
    handleScroll();
})(); 