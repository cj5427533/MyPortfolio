// 스크롤에 따라 배경 그라데이션 변경
window.addEventListener('scroll', function() {
    const dynamicBg = document.getElementById('dynamic-bg');
    if (!dynamicBg) return;
    
    const scrollPosition = window.scrollY;
    const documentHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollPosition / documentHeight) * 100;
    
    // 스크롤 위치에 따라 배경 위치 변경
    dynamicBg.style.backgroundPosition = `${scrollPercentage}% ${scrollPercentage/2}%`;
});

// HERO 섹션 애니메이션 (animations.js에서 처리됨)
function initHeroAnimations() {
    // animations.js의 initAllAnimations에서 처리되므로 여기서는 제거
    // 기존 코드는 animations.js로 이동됨
}

// 스크롤 애니메이션
document.addEventListener('DOMContentLoaded', function() {
    // HERO 섹션 애니메이션 초기화
    initHeroAnimations();
    
    // Typed.js 초기화 (태그라인)
    const typedElement = document.getElementById('typed-text');
    if (typedElement && typeof Typed !== 'undefined') {
        // 히어로 섹션이 화면에 보일 때 시작하도록 Intersection Observer 사용
        const heroSection = document.getElementById('hero-section');
        const heroTagline = document.getElementById('hero-tagline');
        
        if (heroSection && heroTagline) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !typedElement.dataset.typedInitialized) {
                        typedElement.dataset.typedInitialized = 'true';
                        
                        // 애니메이션이 완료된 후 Typed.js 시작 (stagger-index가 1이므로 약 300ms + 여유)
                        setTimeout(() => {
                            // 기존 텍스트를 숨기고 Typed.js 시작
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
                                showCursor: false, // 커서는 CSS로 직접 제어
                                smartBackspace: true,
                                startDelay: 300 // 애니메이션 완료 후 추가 딜레이
                            });
                        }, 600); // 애니메이션 완료 대기 시간
                        
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
            
            // Element is in view if its top is visible or its bottom is visible
            if ((elementBottomPosition >= windowTopPosition) && 
                (elementTopPosition <= windowBottomPosition)) {
                section.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkIfInView);
    window.addEventListener('resize', checkIfInView);
    
    // Trigger once at load
    checkIfInView();

    const dynamicBg = document.getElementById('dynamic-bg');
    if (dynamicBg) {
        // Function to update background based on scroll position
        function updateBackground() {
            const scrollY = window.scrollY;
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const scrollFraction = scrollY / totalHeight;

            // Example: Change hue based on scroll (0-360)
            // const hue = scrollFraction * 360;
            // dynamicBg.style.filter = `hue-rotate(${hue}deg)`;

            // Example: Change opacity of a subtle overlay based on scroll
            // This creates a depth effect or shifts mood
            const opacity = Math.min(1, scrollFraction * 0.5); // Max 0.5 opacity
            // dynamicBg.style.setProperty('--bg-overlay-opacity', opacity);
        }

        // Call once on load and then on scroll
        updateBackground();
        window.addEventListener('scroll', updateBackground);
    }

    // 프로젝트 카드 애니메이션은 projects-renderer.js의 initProjectCardAnimations에서 처리

    // Smooth scroll for internal links (optional, if you have any)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Modal functionality for enlarging images/videos
    const enlargeableMedia = document.querySelectorAll('.enlargeable-media');
    const enlargeModal = document.getElementById('enlargeModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalContent = document.getElementById('modalContent');

    enlargeableMedia.forEach(media => {
        media.addEventListener('click', () => {
            const mediaSrc = media.dataset.src;
            const mediaType = media.dataset.mediaType;

            modalContent.innerHTML = ''; // Clear previous content

            if (mediaType === 'image') {
                const img = document.createElement('img');
                img.src = mediaSrc;
                img.classList.add('max-w-full', 'max-h-full', 'w-auto', 'h-auto', 'object-contain');
                modalContent.appendChild(img);
            } else if (mediaType === 'video') {
                const video = document.createElement('video');
                video.src = mediaSrc;
                video.controls = true;
                video.autoplay = true; // Autoplay when enlarged
                video.loop = true;
                video.classList.add('max-w-full', 'max-h-full', 'w-auto', 'h-auto', 'object-contain');
                modalContent.appendChild(video);
            }

            enlargeModal.classList.remove('hidden');
            document.body.classList.add('overflow-hidden'); // Prevent scrolling body when modal is open
        });
    });

    closeModalBtn.addEventListener('click', () => {
        enlargeModal.classList.add('hidden');
        modalContent.innerHTML = ''; // Clear content when closing
        document.body.classList.remove('overflow-hidden'); // Restore body scrolling
    });

    // Close modal when clicking outside of the content (on the overlay)
    enlargeModal.addEventListener('click', (e) => {
        if (e.target === enlargeModal) {
            enlargeModal.classList.add('hidden');
            modalContent.innerHTML = '';
            document.body.classList.remove('overflow-hidden');
        }
    });
});

// 연락처 폼 제출
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
            
            // 성공 메시지 토스트 애니메이션
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