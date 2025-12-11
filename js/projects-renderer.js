// 프로젝트 카드 및 모달 렌더링 관리

// 색상 테마 매핑
const colorThemes = {
    sky: {
        gradient: "from-sky-500 to-indigo-500",
        border: "border-sky-100",
        text: "text-sky-700",
        bg: "bg-sky-100",
        textColor: "text-sky-600",
        check: "text-sky-500",
        reflectionGradient: "from-indigo-50 to-purple-50",
        reflectionBorder: "border-indigo-500"
    },
    indigo: {
        gradient: "from-indigo-500 to-purple-500",
        border: "border-indigo-100",
        text: "text-indigo-700",
        bg: "bg-indigo-100",
        textColor: "text-indigo-600",
        check: "text-indigo-500",
        reflectionGradient: "from-indigo-50 to-purple-50",
        reflectionBorder: "border-indigo-500"
    },
    purple: {
        gradient: "from-purple-500 to-pink-500",
        border: "border-purple-100",
        text: "text-purple-700",
        bg: "bg-purple-100",
        textColor: "text-purple-600",
        check: "text-purple-500",
        reflectionGradient: "from-purple-50 to-pink-50",
        reflectionBorder: "border-purple-500"
    },
    pink: {
        gradient: "from-pink-500 to-rose-500",
        border: "border-pink-100",
        text: "text-pink-700",
        bg: "bg-pink-100",
        textColor: "text-pink-600",
        check: "text-pink-500",
        reflectionGradient: "from-pink-50 to-rose-50",
        reflectionBorder: "border-pink-500"
    },
    emerald: {
        gradient: "from-emerald-500 to-teal-500",
        border: "border-emerald-100",
        text: "text-emerald-700",
        bg: "bg-emerald-100",
        textColor: "text-emerald-600",
        check: "text-emerald-500",
        reflectionGradient: "from-emerald-50 to-teal-50",
        reflectionBorder: "border-emerald-500"
    },
    amber: {
        gradient: "from-amber-500 to-orange-500",
        border: "border-amber-100",
        text: "text-amber-700",
        bg: "bg-amber-100",
        textColor: "text-amber-600",
        check: "text-amber-500",
        reflectionGradient: "from-amber-50 to-orange-50",
        reflectionBorder: "border-amber-500"
    }
};

// 프로젝트 카드 프리뷰 생성
function createProjectCard(project) {
    const theme = colorThemes[project.colorTheme];
    
    // 이미지가 없거나 logo.png이거나 빈 문자열인 경우 이미지 영역을 비움
    const hasImage = project.thumbnail && 
                     project.thumbnail !== "images/logo.png" && 
                     project.thumbnail.trim() !== "" &&
                     project.thumbnail.trim().length > 0;
    
    // 프로젝트별 악센트 색상 (그라데이션에서 첫 번째 색상 사용)
    const accentColorMap = {
        'sky': '#0ea5e9',
        'indigo': '#6366f1',
        'purple': '#a855f7',
        'pink': '#ec4899',
        'emerald': '#10b981',
        'amber': '#f59e0b'
    };
    const accentColor = accentColorMap[project.colorTheme] || '#0ea5e9';
    
    // 이미지 HTML (인터랙티브 호버 효과 포함) - 모바일 최적화
    const imageHTML = hasImage ? `
        <div class="aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden mb-4 md:mb-5 relative group/image project-image-container">
            <img src="${project.thumbnail}" alt="${project.title}" 
                 class="w-full h-full object-cover transition-transform duration-300 ease-out project-image">
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 md:group-hover/image:opacity-100 transition-opacity duration-300 ease-out"></div>
        </div>
    ` : '';
    
    // Value statement (한 줄 요약)
    const valueStatement = project.valueStatement || '';
    
    return `
        <div class="project-card-preview bg-white rounded-xl shadow-md overflow-hidden border-l-4 transition-all duration-300 ease-out opacity-0 translate-y-4 project-card-item cursor-pointer w-full" 
             style="border-left-color: ${accentColor};"
             data-project-id="${project.id}">
            <!-- 그라데이션 상단 바 -->
            <div class="bg-gradient-to-r ${theme.gradient} h-1.5"></div>
            <div class="p-4 md:p-6">
                ${imageHTML}
                
                <!-- 프로젝트 제목 (시각적 앵커) -->
                <h3 class="text-xl md:text-2xl font-bold mb-2 ${theme.text} leading-tight">${project.title}</h3>
                
                <!-- 한 줄 가치 설명 -->
                ${valueStatement ? `
                    <p class="text-xs md:text-sm font-medium text-gray-500 mb-2 md:mb-3">${valueStatement}</p>
                ` : ''}
                
                <!-- 짧은 설명 (1-2줄) -->
                <p class="text-gray-700 text-sm md:text-base mb-3 md:mb-4 leading-relaxed line-clamp-2">${project.shortDescription}</p>
                
                <!-- 메타데이터 -->
                <div class="mb-3 md:mb-4 text-xs md:text-sm text-gray-500">
                    <span>${project.period}</span>
                </div>
                
                <!-- CTA 링크 -->
                <div class="pt-3 md:pt-4 border-t border-gray-100">
                    <div class="group/cta flex items-center gap-2 text-sm md:text-base ${theme.text} font-semibold min-h-[44px]">
                        <span>자세히 보기</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover/cta:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Executive Summary 생성 (JEIU 캠퍼스 / 3D 공 굴리기 / Bilingual Buddy용)
function createExecutiveSummary(project) {
    if (project.id === 1) {
        // JEIU 캠퍼스 프로젝트
        const outcomes = [];
        if (project.technicalTroubleshooting && project.technicalTroubleshooting.length > 0) {
            project.technicalTroubleshooting.forEach(item => {
                if (item.result.includes('40%')) {
                    outcomes.push('Three.js 로딩 최적화로 초기 렌더링 시간 <span class="font-semibold text-blue-700">약 40%</span> 단축');
                }
                if (item.result.includes('중복 예약') || item.result.includes('완전히 해결')) {
                    outcomes.push('강의실 동시 예약 시 중복 예약 문제를 트랜잭션으로 <span class="font-semibold text-green-700">완전히 해결</span>');
                }
                if (item.result.includes('선택 정확도')) {
                    outcomes.push('Raycasting 기반 정확한 건물 선택으로 사용자 경험 개선');
                }
            });
        }
        outcomes.push('3D 캠퍼스 맵과 강의실 예약, 이벤트 정보를 한 화면에서 직관적으로 제공');
        
        return `
            <div class="bg-blue-50 rounded-xl p-5 mb-6 border-l-4 border-blue-500 modal-section" data-section="executive-summary">
                <h4 class="font-bold text-lg mb-3 text-blue-900 flex items-center gap-2">
                    <span>🔍</span>
                    <span>핵심 성과 요약</span>
                </h4>
                <ul class="space-y-2 text-sm">
                    ${outcomes.map(outcome => `
                        <li class="flex items-start text-gray-800">
                            <span class="text-blue-600 mr-2 mt-1">•</span>
                            <span>${outcome}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    } else if (project.id === 3) {
        // 3D 공 굴리기 미로 게임
        const outcomes = [
            'Three.js 기반 3D 미로에서 공을 굴려 목표 지점에 도달하는 인터랙티브 게임',
            'AABB 충돌 감지와 중력/기울기 연산으로 <span class="font-semibold text-indigo-700">자연스러운 공 움직임</span> 구현',
            'requestAnimationFrame·frustum culling으로 모바일에서도 <span class="font-semibold text-indigo-700">30fps 이상</span> 유지',
            '키보드·마우스·터치 입력을 통합 처리해 다양한 환경에서 플레이 가능'
        ];
        
        return `
            <div class="bg-violet-50 rounded-xl p-5 mb-6 border-l-4 border-violet-500 modal-section" data-section="executive-summary">
                <h4 class="font-bold text-lg mb-3 text-violet-900 flex items-center gap-2">
                    <span>🎮</span>
                    <span>핵심 포인트 요약</span>
                </h4>
                <ul class="space-y-2 text-sm">
                    ${outcomes.map(outcome => `
                        <li class="flex items-start text-gray-800">
                            <span class="text-violet-600 mr-2 mt-1">•</span>
                            <span>${outcome}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    } else if (project.id === 4) {
        const outcomes = [
            '다문화가정 자녀·부모·교사를 위한 AI 기반 이중 언어 학습 도우미',
            'GPT-4 호출 구조 개선으로 API 실패율 <span class="font-semibold text-rose-700">약 70%</span> 감소, 비용 <span class="font-semibold text-rose-700">약 40%</span> 절감',
            'Papago 번역 한계 보완으로 교육·가정통신문 번역 품질 향상',
            '실제 베트남 가정 사용자 피드백을 반영해 UX와 기능을 반복 개선'
        ];

        return `
            <div class="bg-rose-50 rounded-xl p-5 mb-6 border-l-4 border-rose-500 modal-section" data-section="executive-summary">
                <h4 class="font-bold text-lg mb-3 text-rose-900 flex items-center gap-2">
                    <span>🌟</span>
                    <span>핵심 성과 요약</span>
                </h4>
                <ul class="space-y-2 text-sm">
                    ${outcomes.map(outcome => `
                        <li class="flex items-start text-gray-800">
                            <span class="text-rose-600 mr-2 mt-1">•</span>
                            <span>${outcome}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
    
    return '';
}

// Hero Summary Block 생성 - 모든 프로젝트 동일 UI
function createHeroSummary(project, theme) {
    if (!project.heroSummary) return '';
    
    const { purpose, roles, keyOutcomes } = project.heroSummary;
    
    // 프로젝트별 색상 테마에 맞는 그라데이션과 색상 설정
    const colorMap = {
        sky: {
            gradient: 'from-sky-50 to-blue-50',
            border: 'border-sky-500',
            bg: 'bg-sky-100',
            text: 'text-sky-700',
            borderT: 'border-sky-200'
        },
        purple: {
            gradient: 'from-purple-50 to-violet-50',
            border: 'border-purple-500',
            bg: 'bg-purple-100',
            text: 'text-purple-700',
            borderT: 'border-purple-200'
        },
        pink: {
            gradient: 'from-pink-50 to-rose-50',
            border: 'border-pink-500',
            bg: 'bg-pink-100',
            text: 'text-pink-700',
            borderT: 'border-pink-200'
        },
        emerald: {
            gradient: 'from-emerald-50 to-teal-50',
            border: 'border-emerald-500',
            bg: 'bg-emerald-100',
            text: 'text-emerald-700',
            borderT: 'border-emerald-200'
        },
        indigo: {
            gradient: 'from-indigo-50 to-purple-50',
            border: 'border-indigo-500',
            bg: 'bg-indigo-100',
            text: 'text-indigo-700',
            borderT: 'border-indigo-200'
        },
        amber: {
            gradient: 'from-amber-50 to-orange-50',
            border: 'border-amber-500',
            bg: 'bg-amber-100',
            text: 'text-amber-700',
            borderT: 'border-amber-200'
        }
    };
    
    const colors = colorMap[project.colorTheme] || colorMap.sky;
    
    return `
        <div class="bg-gradient-to-br ${colors.gradient} rounded-lg md:rounded-xl p-4 md:p-6 mb-6 md:mb-8 border-l-4 ${colors.border} shadow-sm modal-section" data-section="hero-summary">
            <div class="mb-3 md:mb-4">
                <p class="text-base md:text-lg font-semibold text-gray-800 leading-relaxed">${purpose}</p>
            </div>
            <div class="flex flex-wrap gap-2 mb-3 md:mb-4">
                ${roles.map(role => `
                    <span class="px-2 py-1 md:px-3 md:py-1.5 ${colors.bg} ${colors.text} rounded-full text-xs md:text-sm font-medium">${role}</span>
                `).join('')}
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-3 md:pt-4 border-t ${colors.borderT}">
                ${keyOutcomes.map(outcome => `
                    <div class="text-center">
                        <div class="text-xs text-gray-600 mb-1">${outcome.label}</div>
                        <div class="text-base md:text-lg font-bold ${outcome.bold ? colors.text : 'text-gray-800'}">${outcome.value}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Collapsible Challenge Cards 생성 (여기몰까 프로젝트용)
function createCollapsibleChallenges(project, theme) {
    if (!project.technicalTroubleshooting || project.technicalTroubleshooting.length === 0) return '';
    
    return `
        <div class="mb-8 modal-section" data-section="troubleshooting">
            <h4 class="font-semibold mb-6 ${theme.textColor} text-xl">🔧 Engineering Challenges & Solutions</h4>
            <div class="space-y-4">
                ${project.technicalTroubleshooting.map((item, index) => {
                    const cardId = `challenge-${project.id}-${index}`;
                    // 첫 2개는 expanded, 나머지는 collapsed
                    const isExpanded = item.expanded === true || (item.expanded !== false && index < 2);
                    const expandedClass = isExpanded ? '' : 'collapsed';
                    
                    // 결과에서 ** 기호 제거
                    let resultHTML = item.result.replace(/\*\*/g, '');
                    
                    return `
                        <div class="challenge-card bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md ${expandedClass}" data-card-id="${cardId}">
                            <button class="challenge-toggle w-full text-left p-5 flex items-center justify-between hover:bg-gray-50 transition-colors" data-card-id="${cardId}">
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-2">
                                        <span class="text-emerald-400 font-semibold text-sm">문제</span>
                                    </div>
                                    <p class="text-gray-800 text-sm leading-relaxed">${item.problem}</p>
                                </div>
                                <svg class="w-5 h-5 text-gray-400 ml-4 flex-shrink-0 challenge-arrow transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}" data-arrow="${cardId}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <div class="challenge-content ${isExpanded ? '' : 'hidden'}" data-content="${cardId}" style="${isExpanded ? 'max-height: none;' : 'max-height: 0; overflow: hidden;'}">
                                <div class="px-5 pb-5 space-y-4 border-t border-gray-100">
                                    <div>
                                        <div class="flex items-center gap-2 mb-2 mt-4">
                                            <span class="text-blue-600 font-semibold text-sm">해결</span>
                                        </div>
                                        <p class="text-gray-700 text-sm leading-relaxed">${item.solution}</p>
                                    </div>
                                    <div class="bg-emerald-50 rounded-lg p-4 border-l-4 border-emerald-400">
                                        <div class="flex items-center gap-2 mb-2">
                                            <span class="text-emerald-700 font-semibold text-sm">성과</span>
                                        </div>
                                        <p class="text-gray-800 text-sm leading-relaxed">${resultHTML}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

// Tech Stack 그룹화 렌더링 (여기몰까 프로젝트용)
function createGroupedTechStack(project, theme) {
    if (!project.technologies || typeof project.technologies !== 'object' || project.id !== 5) {
        // 기존 방식 (배열)
        if (Array.isArray(project.technologies)) {
            return `
                <div class="flex flex-wrap gap-2 mb-4">
                    ${project.technologies.map(tech => `
                        <span class="px-3 py-1.5 ${theme.bg} ${theme.text} rounded-full tech-tag text-sm font-medium">${tech}</span>
                    `).join('')}
                </div>
            `;
        }
        return '';
    }
    
    const { frontend, backend, aiMl, infra } = project.technologies;
    
    return `
        <div class="space-y-4">
            <div>
                <h5 class="text-sm font-semibold text-gray-600 mb-2">Frontend</h5>
                <div class="flex flex-wrap gap-2">
                    ${frontend.map(tech => `
                        <span class="px-2 py-1 md:px-3 md:py-1.5 ${theme.bg} ${theme.text} rounded-full tech-tag text-xs md:text-sm font-medium">${tech}</span>
                    `).join('')}
                </div>
            </div>
            <div>
                <h5 class="text-xs md:text-sm font-semibold text-gray-600 mb-2">Backend</h5>
                <div class="flex flex-wrap gap-2">
                    ${backend.map(tech => `
                        <span class="px-2 py-1 md:px-3 md:py-1.5 ${theme.bg} ${theme.text} rounded-full tech-tag text-xs md:text-sm font-medium">${tech}</span>
                    `).join('')}
                </div>
            </div>
            <div>
                <h5 class="text-xs md:text-sm font-semibold text-gray-600 mb-2">AI / ML</h5>
                <div class="flex flex-wrap gap-2">
                    ${aiMl.map(tech => `
                        <span class="px-2 py-1 md:px-3 md:py-1.5 ${theme.bg} ${theme.text} rounded-full tech-tag text-xs md:text-sm font-medium">${tech}</span>
                    `).join('')}
                </div>
            </div>
            <div>
                <h5 class="text-xs md:text-sm font-semibold text-gray-600 mb-2">Infra & Tools</h5>
                <div class="flex flex-wrap gap-2">
                    ${infra.map(tech => `
                        <span class="px-2 py-1 md:px-3 md:py-1.5 ${theme.bg} ${theme.text} rounded-full tech-tag text-xs md:text-sm font-medium">${tech}</span>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

    // 기술적 문제 해결 섹션 생성 (Accordion 포함) - 모든 프로젝트 동일 구조
function createTechnicalTroubleshooting(project, theme) {
    if (!project.technicalTroubleshooting || project.technicalTroubleshooting.length === 0) return '';
    
    // 모든 프로젝트 동일한 구조 사용 (⚠️ 문제, 💡 해결, ✅ 결과 + 아코디언)
    
    // 게임 프로젝트는 다른 배경색 사용
    const bgColor = project.id === 3 ? 'from-violet-50 to-purple-50' : 'from-sky-50 to-blue-50';
    const borderColor = project.id === 3 ? 'border-violet-400' : 'border-blue-400';
        const isBilingual = project.id === 4;
        const bgColorResolved = isBilingual ? 'from-rose-50 to-rose-100' : bgColor;
        const borderColorResolved = isBilingual ? 'border-rose-400' : borderColor;
    
    return `
        <div class="mb-6 md:mb-8 modal-section" data-section="troubleshooting">
            <h4 class="font-semibold mb-4 md:mb-6 ${theme.textColor} text-base md:text-xl">🔧 기술적 문제 해결</h4>
            <div class="space-y-4">
                ${project.technicalTroubleshooting.map((item, index) => {
                    const accordionId = `troubleshooting-${project.id}-${index}`;
                    
                    // 문제 상황 간결화
                    let conciseProblem = item.problem.split('.').slice(0, 2).join('.').trim();
                    if (project.id === 3 && index === 0) {
                        conciseProblem = "물리 시뮬레이션에서 공이 벽을 뚫고 나가거나, 판을 기울였을 때 공이 떨어지지 않고 공중에 떠있는 현상이 발생했습니다.";
                    } else if (project.id === 3 && index === 1) {
                        conciseProblem = "키보드, 마우스, 터치 입력을 모두 지원하려 했지만, 각 입력 방식마다 다른 좌표계와 이벤트 처리가 필요해 코드가 복잡해졌습니다.";
                    } else if (project.id === 3 && index === 2) {
                        conciseProblem = "모바일에서 게임을 실행하면 프레임이 떨어지고, 특히 여러 개의 공이나 복잡한 미로에서 렌더링이 버벅거렸습니다.";
                    } else if (isBilingual && index === 0) {
                        conciseProblem = "네트워크가 불안정한 환경에서 GPT-4 호출이 자주 타임아웃되고, 응답 지연과 비용이 크게 발생했습니다.";
                    } else if (isBilingual && index === 1) {
                        conciseProblem = "Papago가 다국어 교육 용어와 가정통신문을 번역할 때 정확도가 낮아 신뢰성이 떨어졌습니다.";
                    }
                    
                    // 해결 과정 bullet 추출
                    let solutionBullets = [];
                    if (project.id === 3 && index === 0) {
                        solutionBullets = [
                            'AABB(Axis-Aligned Bounding Box) 알고리즘으로 충돌 감지 구현',
                            '중력 가속도 적용 및 판 기울기 각도에 따른 힘 벡터 계산',
                            '공의 위치와 속도를 매 프레임마다 업데이트'
                        ];
                    } else if (project.id === 3 && index === 1) {
                        solutionBullets = [
                            'InputManager 클래스로 모든 입력을 공통된 기울기 벡터 형식으로 변환',
                            '키보드·마우스·터치를 각각 벡터로 변환하여 동일한 물리 계산 함수에 전달'
                        ];
                    } else if (project.id === 3 && index === 2) {
                        solutionBullets = [
                            'requestAnimationFrame으로 프레임율 최적화',
                            'frustum culling으로 카메라가 보이지 않는 오브젝트 렌더링 제외',
                            '모바일 환경에서 그림자·조명 간소화 및 텍스처 해상도 조정'
                        ];
                    } else if (isBilingual && index === 0) {
                        solutionBullets = [
                            '요청 재시도 및 타임아웃 설정으로 불안정한 네트워크 대응',
                            '응답 캐싱으로 반복 호출을 줄이고 비용 절감',
                            '프롬프트 최적화와 호출 구조 개선으로 지연 시간 단축'
                        ];
                    } else if (isBilingual && index === 1) {
                        solutionBullets = [
                            '교육·가정통신문 용어에 대한 사전 후처리로 번역 품질 보완',
                            'AI 튜터가 번역 맥락을 추가 설명하도록 설계',
                            '사용자 피드백 기반으로 번역 결과를 반복 검증'
                        ];
                    } else {
                        // 다른 프로젝트는 기존 방식
                        solutionBullets = item.solution.split('.').filter(s => s.trim()).slice(0, 3).map(s => s.trim());
                    }
                    
                    // 결과 강조 (게임 프로젝트)
                    let highlightedResult = item.result;
                    if (project.id === 3) {
                        highlightedResult = item.result
                            .replace(/30fps/g, '<span class="font-semibold text-indigo-700">30fps</span>')
                            .replace(/자연스럽게/g, '<span class="font-semibold text-indigo-700">자연스럽게</span>')
                            .replace(/안정적으로/g, '<span class="font-semibold text-indigo-700">안정적으로</span>')
                            .replace(/안정적인/g, '<span class="font-semibold text-indigo-700">안정적인</span>');
                    } else if (isBilingual) {
                        highlightedResult = item.result
                            .replace(/70%/g, '<span class="font-semibold text-rose-700">70%</span>')
                            .replace(/40%/g, '<span class="font-semibold text-rose-700">40%</span>')
                            .replace(/실패율/g, '<span class="font-semibold text-rose-700">실패율</span>')
                            .replace(/비용/g, '<span class="font-semibold text-rose-700">비용</span>');
                    } else {
                        highlightedResult = item.result
                            .replace(/(\d+%)/g, '<span class="font-semibold text-blue-700">$1</span>')
                            .replace(/(완전히 해결|0건)/g, '<span class="font-semibold text-green-700">$1</span>');
                    }
                    
                    return `
                        <div class="bg-gradient-to-r ${bgColorResolved} rounded-lg md:rounded-xl p-4 md:p-5 border-l-4 ${borderColorResolved} shadow-sm troubleshooting-item" data-item-index="${index}">
                            <div class="mb-3">
                                <h5 class="font-semibold text-red-600 mb-2 flex items-center gap-2 text-sm md:text-base">
                                    <span class="text-base md:text-lg">⚠️</span>
                                    <span>문제 상황</span>
                                </h5>
                                <p class="text-gray-700 pl-5 md:pl-6 text-xs md:text-sm leading-relaxed">
                                    ${conciseProblem}
                                </p>
                            </div>
                            
                            <div class="mb-3">
                                <button class="troubleshooting-toggle w-full text-left flex items-center justify-between font-semibold text-blue-600 hover:text-blue-700 transition-colors min-h-[44px] text-sm md:text-base" data-accordion-id="${accordionId}">
                                    <span class="flex items-center gap-2">
                                        <span class="text-base md:text-lg">💡</span>
                                        <span>해결 과정</span>
                                    </span>
                                    <span class="text-lg md:text-xl transition-transform duration-200" data-arrow>▼</span>
                                </button>
                                <div class="troubleshooting-content hidden pl-5 md:pl-6 mt-2" id="${accordionId}" data-mobile-collapsed="true">
                                    <div class="text-gray-700 text-xs md:text-sm leading-relaxed space-y-2">
                                        ${solutionBullets.map(step => {
                                            if (!step) return '';
                                            // 핵심 키워드 강조
                                            let highlighted = step
                                                .replace(/AABB/g, '<span class="font-semibold text-blue-600">AABB</span>')
                                                .replace(/requestAnimationFrame/g, '<span class="font-semibold text-blue-600">requestAnimationFrame</span>')
                                                .replace(/frustum culling/g, '<span class="font-semibold text-blue-600">frustum culling</span>')
                                                .replace(/InputManager/g, '<span class="font-semibold text-blue-600">InputManager</span>')
                                                .replace(/GLTFLoader/g, '<span class="font-semibold text-blue-600">GLTFLoader</span>')
                                                .replace(/LOD/g, '<span class="font-semibold text-blue-600">LOD</span>')
                                                .replace(/트랜잭션/g, '<span class="font-semibold text-blue-600">트랜잭션</span>')
                                                .replace(/SELECT FOR UPDATE/g, '<span class="font-semibold text-blue-600">SELECT FOR UPDATE</span>')
                                                .replace(/Raycasting/g, '<span class="font-semibold text-blue-600">Raycasting</span>');
                                            return `<p>• ${highlighted}</p>`;
                                        }).filter(s => s).join('')}
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h5 class="font-semibold text-green-600 mb-2 flex items-center gap-2 text-sm md:text-base">
                                    <span class="text-base md:text-lg">✅</span>
                                    <span>결과 및 개선 효과</span>
                                </h5>
                                <p class="text-gray-700 pl-5 md:pl-6 text-xs md:text-sm leading-relaxed">
                                    ${highlightedResult}
                                </p>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

// 프로젝트 모달 생성
function createProjectModal(project) {
    const theme = colorThemes[project.colorTheme];
    
    // Hero Summary (여기몰까 프로젝트만)
    const heroSummaryHTML = createHeroSummary(project, theme);
    
    // Executive Summary (JEIU 캠퍼스만)
    const executiveSummaryHTML = createExecutiveSummary(project);
    
    // 주요 기능이 배열인지 문자열인지 확인
    let mainFeaturesHTML = '';
    if (Array.isArray(project.mainFeatures)) {
        mainFeaturesHTML = `
            <ul class="list-none text-gray-700 space-y-2">
                ${project.mainFeatures.slice(0, 5).map(feature => `
                    <li class="flex items-start">
                        <span class="inline-block mr-2 mt-1 ${theme.check}">✓</span>
                        <span class="text-sm">${feature}</span>
                    </li>
                `).join('')}
            </ul>
        `;
    } else {
        // 문자열인 경우 간결하게 재작성
        if (project.id === 3) {
            // 3D 공 굴리기 게임의 경우 bullet list로 변환
            mainFeaturesHTML = `
                <ul class="list-none text-gray-700 space-y-2 text-sm">
                    <li class="flex items-start">
                        <span class="inline-block mr-2 mt-1 ${theme.check}">✓</span>
                        <span>3D 미로 구조와 레벨 시스템</span>
                    </li>
                    <li class="flex items-start">
                        <span class="inline-block mr-2 mt-1 ${theme.check}">✓</span>
                        <span>물리 기반 판 기울기 조작 (키보드·마우스·터치)</span>
                    </li>
                    <li class="flex items-start">
                        <span class="inline-block mr-2 mt-1 ${theme.check}">✓</span>
                        <span>실시간 충돌 감지 및 공 움직임 시뮬레이션</span>
                    </li>
                    <li class="flex items-start">
                        <span class="inline-block mr-2 mt-1 ${theme.check}">✓</span>
                        <span>레벨 진행 및 타이머 표시</span>
                    </li>
                </ul>
            `;
        } else if (project.id === 4) {
            mainFeaturesHTML = `
                <ul class="list-none text-gray-700 space-y-2 text-sm">
                    <li class="flex items-start">
                        <span class="inline-block mr-2 mt-1 ${theme.check}">✓</span>
                        <span>이중언어 AI 튜터 (모국어 → 한국어 단계적 설명)</span>
                    </li>
                    <li class="flex items-start">
                        <span class="inline-block mr-2 mt-1 ${theme.check}">✓</span>
                        <span>가정통신문 자동 번역·알림</span>
                    </li>
                    <li class="flex items-start">
                        <span class="inline-block mr-2 mt-1 ${theme.check}">✓</span>
                        <span>다국어 지원 (베트남어·중국어·우즈벡어·네팔어)</span>
                    </li>
                    <li class="flex items-start">
                        <span class="inline-block mr-2 mt-1 ${theme.check}">✓</span>
                        <span>정서·문화 멘토링 기능</span>
                    </li>
                </ul>
            `;
        } else {
            const conciseFeatures = project.mainFeatures.replace(/서비스입니다/g, '').trim();
            mainFeaturesHTML = `<p class="text-gray-700 text-sm leading-relaxed">${conciseFeatures}</p>`;
        }
    }
    
    // 이미지 갤러리 (스크린샷 캐러셀) - 모바일 최적화
    let imagesHTML = '';
    if (project.images && project.images.length > 0) {
        imagesHTML = `
            <div class="mb-6 md:mb-8 modal-section" data-section="media">
                <h4 class="font-semibold mb-3 md:mb-4 ${theme.textColor} text-base md:text-lg">🖼️ Media</h4>
                <div class="flex gap-3 md:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
                    ${project.images.map(img => `
                        <div class="flex-shrink-0 w-full sm:w-4/5 md:w-2/3 lg:w-1/2 snap-center">
                            <div class="aspect-video bg-gray-100 rounded-lg md:rounded-xl overflow-hidden shadow-md border ${theme.border} flex items-center justify-center transition-transform duration-300 md:hover:scale-[1.02]">
                                <img src="${img}" alt="${project.title}" class="object-cover w-full h-full enlargeable-media cursor-pointer" data-media-type="image" data-src="${img}" />
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    // 비디오 - 모바일 최적화: max-w-full, aspect-video, centered
    let videosHTML = '';
    if (project.videos && project.videos.length > 0) {
        // Bilingual Buddy 프로젝트는 세로 스마트폰 비율, 다른 프로젝트는 가로 비율
        const aspectRatio = project.id === 4 ? 'aspect-[9/16]' : 'aspect-video';
        const maxWidth = project.id === 4 ? 'max-w-xs sm:max-w-sm' : 'max-w-full md:max-w-3xl';
        
        videosHTML = `
            <div class="mb-6 md:mb-8 modal-section" data-section="media">
                <h4 class="font-semibold mb-3 md:mb-4 ${theme.textColor} text-base md:text-lg">📹 Media</h4>
                ${project.videos.map(video => `
                    <div class="${maxWidth} mx-auto rounded-lg md:rounded-xl overflow-hidden shadow-md bg-gray-100 mb-3 md:mb-4">
                        <div class="${aspectRatio}">
                            <video class="w-full h-full object-cover enlargeable-media" controls preload="metadata" data-media-type="video" data-src="${video.src}" poster="${video.poster || ''}">
                                <source src="${video.src}" type="${video.type || 'video/mp4'}">
                                브라우저가 비디오를 지원하지 않습니다.
                            </video>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    // 특수 콘텐츠 (게임 등)
    let specialContentHTML = '';
    if (project.hasSpecialContent && project.specialContentType === 'game') {
        specialContentHTML = `
            <div class="w-full h-96 md:h-[480px] bg-gray-100 rounded-lg mb-6 overflow-hidden relative" id="modal-game-container-${project.id}">
                <canvas id="modal-maze-game-${project.id}" class="w-full h-full"></canvas>
                <div class="absolute top-2 right-2">
                    <button id="modal-pause-toggle-${project.id}" class="bg-gray-800 text-white text-[10px] sm:text-xs px-3 py-1.5 rounded shadow hover:bg-gray-700 transition-colors">
                        정지
                    </button>
                </div>
                <div id="modal-game-ui-${project.id}" class="absolute top-2 left-2 bg-white/70 p-1 rounded text-xs">
                    레벨: <span id="modal-level-${project.id}">1</span> | 시간: <span id="modal-timer-${project.id}">0</span>초
                </div>
                <div id="modal-game-instructions-${project.id}" class="absolute bottom-2 left-0 right-0 mx-auto w-4/5 text-center bg-white/70 p-1 rounded text-xs">
                    방향키 또는 마우스로 판을 기울여 공을 굴리세요!
                </div>
            </div>
        `;
    } else if (project.hasSpecialContent && project.specialContentType === 'unity-game') {
        // Unity WebGL 게임 컨테이너
        specialContentHTML = `
            <div class="mb-6 md:mb-8 modal-section" data-section="unity-game">
                <h4 class="font-semibold mb-3 md:mb-4 ${theme.textColor} text-base md:text-lg">🎮 게임 플레이</h4>
                <div
                    class="w-full bg-gray-900 rounded-lg relative flex items-center justify-center"
                    id="unity-game-container-${project.id}"
                    style="aspect-ratio: 16/9; max-width: 1200px; margin: 0 auto; overflow: hidden; border: 1px solid rgba(255,255,255,0.06);"
                >
                    <div id="unity-loading-bar-${project.id}" class="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white z-10">
                        <div class="mb-4">
                            <div class="w-32 h-32 bg-white/10 rounded-lg flex items-center justify-center">
                                <div class="text-4xl">🎮</div>
                            </div>
                        </div>
                        <div class="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div id="unity-progress-bar-${project.id}" class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300" style="width: 0%"></div>
                        </div>
                        <p class="mt-4 text-sm text-gray-400">게임을 로딩 중입니다...</p>
                    </div>
                    <div
                        id="unity-canvas-container-${project.id}"
                        class="w-full h-full flex items-center justify-center"
                        style="position: relative;"
                    ></div>
                </div>
                <p class="text-center text-sm text-gray-600 mt-3">WASD 또는 방향키로 이동하세요!</p>
            </div>
        `;
    }
    
    // 링크 버튼 HTML
    let linksHTML = '';
    if (project.githubUrl || project.demoUrl) {
        linksHTML = `
            <div class="flex gap-3 mb-4">
                ${project.githubUrl ? `
                    <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" 
                       class="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 shadow-md hover:shadow-lg">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                        <span class="font-medium">GitHub</span>
                    </a>
                ` : ''}
                ${project.demoUrl ? `
                    <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" 
                       class="flex items-center gap-2 px-4 py-2 ${theme.bg} ${theme.text} rounded-lg hover:opacity-90 transition-opacity duration-200 shadow-md hover:shadow-lg">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                        </svg>
                        <span class="font-medium">Live Demo</span>
                    </a>
                ` : ''}
            </div>
        `;
    }

    // 간결한 프로젝트 개요 (2-3줄)
    let conciseDescription = project.fullDescription;
    if (project.id === 1) {
        conciseDescription = "재능대학교 캠퍼스를 3D로 구현한 웹 플랫폼. 학생들이 강의실을 예약하고 각 건물의 이벤트·캠페인 정보를 시각적으로 확인할 수 있습니다.";
    } else if (project.id === 3) {
        conciseDescription = "Three.js를 활용한 인터랙티브 3D 물리 퍼즐 게임. 사용자가 판을 기울여 공을 굴려 목적지에 도달하는 경험을 제공합니다. 물리 시뮬레이션과 인터랙션을 직접 체험할 수 있는 포트폴리오 데모입니다.";
    } else if (project.id === 4) {
        conciseDescription = "다문화가정 자녀와 부모, 교사를 위한 AI 이중 언어 학습 도우미 앱. 학교 생활에서 한국어가 서툰 사용자들이 교과 개념을 모국어로 이해하고, 가정통신문을 빠르게 번역해 학습 참여도를 높입니다.";
    } else if (project.id === 5) {
        conciseDescription = "온라인 쇼핑몰의 신뢰도를 AI와 머신러닝으로 분석하여 소비자 피해를 예방하는 웹 플랫폼. 쇼핑몰 URL 입력 시 실시간으로 피싱 위험도, 리뷰 신뢰도, 피해 사례를 종합 분석하여 0~100점 신뢰도 점수를 제공합니다.";
    } else {
        conciseDescription = project.fullDescription
            .replace(/입니다/g, '')
            .replace(/서비스입니다/g, '')
            .replace(/플랫폼입니다/g, '')
            .trim();
    }
    
    // 간결한 대상 사용자 (2-3줄)
    let conciseTargetUsers = project.targetUsers;
    if (project.id === 1) {
        conciseTargetUsers = "재능대학교 학생과 방문객. 특히 처음 학교에 오는 신입생들이 복잡한 캠퍼스 건물을 쉽게 찾고, 강의실도 간편하게 예약할 수 있습니다.";
    } else if (project.id === 3) {
        conciseTargetUsers = "포트폴리오를 구경하는 모든 분들을 위한 데모 게임. 기술적인 설명만 읽는 것보다 직접 플레이하면서 구현한 물리 효과와 인터랙션을 체험할 수 있습니다.";
    } else if (project.id === 4) {
        conciseTargetUsers = "다문화가정 자녀, 부모, 교사. 학교 생활과 학습 자료를 모국어와 한국어로 쉽게 이해하고 소통하려는 사용자들에게 제공됩니다.";
    } else {
        conciseTargetUsers = project.targetUsers
            .replace(/을 위해 만들었습니다/g, '')
            .replace(/을 위해/g, '')
            .replace(/특히/g, '')
            .replace(/하고 싶었습니다/g, '')
            .trim();
    }
    
    // 성과 및 배운 점 렌더링
    let reflectionHTML = '';
    if (project.reflection && typeof project.reflection === 'object' && project.reflection.achievements) {
        // 새로운 형식 (객체)
        const { achievements, learnings } = project.reflection;
        const achievementsHTML = achievements.map(achievement => {
            // ** 기호 제거
            const formatted = achievement.replace(/\*\*/g, '');
            return `<li class="flex items-start">
                <span class="inline-block mr-2 mt-1 text-emerald-600">✓</span>
                <span class="text-sm text-gray-800">${formatted}</span>
            </li>`;
        }).join('');
        
        reflectionHTML = `
            <div class="bg-gradient-to-r ${theme.reflectionGradient} p-4 md:p-6 rounded-lg border-l-4 ${theme.reflectionBorder} reflection-box modal-section" data-section="reflection">
                <h4 class="font-semibold mb-3 md:mb-4 ${theme.textColor} text-base md:text-lg">📊 성과 및 배운 점</h4>
                <div class="mb-5">
                    <h5 class="font-semibold mb-3 text-gray-800 text-base">주요 성과</h5>
                    <ul class="list-none space-y-2">
                        ${achievementsHTML}
                    </ul>
                </div>
                <div class="pt-4 border-t border-gray-200">
                    <h5 class="font-semibold mb-3 text-gray-800 text-base">회고 및 향후 계획</h5>
                    <p class="text-gray-700 text-sm leading-relaxed">${learnings}</p>
                </div>
            </div>
        `;
    } else {
        // 기존 형식 (문자열) - 하위 호환성 유지
        let conciseReflection = project.reflection || '';
        if (typeof conciseReflection === 'string') {
            conciseReflection = conciseReflection.split('.').filter(s => s.trim()).slice(0, 2).join('.') + '.';
        }
        
        reflectionHTML = `
            <div class="bg-gradient-to-r ${theme.reflectionGradient} p-4 md:p-6 rounded-lg border-l-4 ${theme.reflectionBorder} reflection-box modal-section" data-section="reflection">
                <h4 class="font-semibold mb-2 md:mb-3 ${theme.textColor} text-base md:text-lg">💬 회고</h4>
                <p class="text-gray-700 text-sm leading-relaxed">${conciseReflection}</p>
            </div>
        `;
    }
    
    // 기술적 문제 해결 섹션
    const technicalTroubleshootingHTML = createTechnicalTroubleshooting(project, theme);

    return `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50 project-modal modal-overlay" data-project-id="${project.id}" style="opacity: 0;">
            <div class="bg-white rounded-lg md:rounded-xl shadow-2xl max-w-4xl w-full max-w-none sm:max-w-4xl max-h-[90vh] overflow-hidden flex flex-col modal-container" style="opacity: 0; transform: scale(0.97) translateY(8px);">
                <div class="bg-gradient-to-r ${theme.gradient} h-2"></div>
                <div class="overflow-y-auto flex-1 p-4 md:p-6">
                    <!-- Header - 모바일 최적화 -->
                    <div class="sticky top-0 bg-white z-10 pb-2 mb-4 md:mb-6 md:static md:pb-0 modal-section" data-section="header">
                        <div class="flex justify-between items-start">
                            <div class="flex-1 pr-2">
                                <h3 class="text-xl md:text-2xl font-semibold ${theme.text} title-emphasis mb-2 md:mb-3">${project.title}</h3>
                                <div class="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 md:gap-3">
                                    <span class="px-2 py-1 md:px-3 md:py-1 ${theme.bg} ${theme.text} rounded-full text-xs md:text-sm font-medium"><strong>기간</strong>: ${project.period}</span>
                                    <span class="px-2 py-1 md:px-3 md:py-1 ${theme.bg} ${theme.text} rounded-full text-xs md:text-sm font-medium">${project.contribution}</span>
                                </div>
                            </div>
                            <button class="close-modal text-gray-400 hover:text-gray-600 text-2xl md:text-3xl leading-none min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors" data-project-id="${project.id}">&times;</button>
                        </div>
                    </div>
                    
                    ${linksHTML}
                    
                    <!-- Hero Summary - 모든 프로젝트 동일 UI -->
                    ${heroSummaryHTML}
                    
                    <!-- 1) 프로젝트 개요 / 요약 - 모든 프로젝트 동일 (모바일 최적화) -->
                    <div class="mb-6 md:mb-8 modal-section" data-section="overview">
                        <h4 class="font-semibold mb-2 md:mb-3 ${theme.textColor} text-base md:text-lg">프로젝트 개요</h4>
                        <p class="text-gray-700 text-sm leading-relaxed line-clamp-3 md:line-clamp-none">${conciseDescription}</p>
                    </div>
                    
                    <!-- 2) 주요 기능 (bullet list) - 모든 프로젝트 동일 (모바일 최적화) -->
                    <div class="mb-6 md:mb-8 modal-section" data-section="features">
                        <h4 class="font-semibold mb-3 md:mb-4 ${theme.textColor} text-base md:text-lg">📌 주요 기능</h4>
                        ${project.id === 5 ? `
                            <ul class="list-none text-gray-700 space-y-3">
                                ${project.mainFeatures.map(feature => {
                                    // ":" 기준으로 분리하여 "무엇 + 왜" 구조로 표시
                                    const parts = feature.split(':');
                                    if (parts.length === 2) {
                                        return `
                                            <li class="flex items-start">
                                                <span class="inline-block mr-3 mt-1 ${theme.check} text-base">•</span>
                                                <div>
                                                    <span class="font-medium text-gray-900">${parts[0]}:</span>
                                                    <span class="text-sm">${parts[1]}</span>
                                                </div>
                                            </li>
                                        `;
                                    }
                                    return `
                                        <li class="flex items-start">
                                            <span class="inline-block mr-3 mt-1 ${theme.check} text-base">•</span>
                                            <span class="text-sm">${feature}</span>
                                        </li>
                                    `;
                                }).join('')}
                            </ul>
                        ` : mainFeaturesHTML}
                    </div>
                    
                    <!-- 3) Media (image or video) - 모든 프로젝트 동일 순서 -->
                    ${videosHTML}
                    ${!videosHTML && imagesHTML ? imagesHTML : ''}
                    ${videosHTML && imagesHTML ? imagesHTML.replace('data-section="media"', 'data-section="media-images"') : ''}
                    
                    <!-- Gameplay / Screenshot (게임 프로젝트의 경우) -->
                    ${project.id === 3 && project.hasSpecialContent ? `
                        <div class="mb-6 modal-section" data-section="gameplay">
                            <h4 class="font-semibold mb-3 ${theme.textColor} text-lg">🎮 게임 플레이</h4>
                            ${specialContentHTML}
                            <p class="text-center text-sm text-gray-600 mt-3">방향키 또는 마우스로 판을 기울여 공을 굴리세요!</p>
                        </div>
                    ` : ''}
                    
                    <!-- Unity Game (Unity 게임 프로젝트의 경우) -->
                    ${project.hasSpecialContent && project.specialContentType === 'unity-game' ? specialContentHTML : ''}
                    
                    <!-- 4) 사용 기술 & 왜 이 기술을 썼나요? - 모든 프로젝트 동일 (모바일 최적화) -->
                    <div class="mb-6 md:mb-8 modal-section" data-section="technologies">
                        <h4 class="font-semibold mb-3 md:mb-4 ${theme.textColor} text-base md:text-lg">🔧 사용 기술</h4>
                        ${project.id === 5 ? createGroupedTechStack(project, theme) : `
                            <div class="flex flex-wrap gap-2 mb-3 md:mb-4">
                                ${Array.isArray(project.technologies) ? project.technologies.map(tech => `
                                    <span class="px-2 py-1 md:px-3 md:py-1.5 ${theme.bg} ${theme.text} rounded-full tech-tag text-xs md:text-sm font-medium">${tech}</span>
                                `).join('') : ''}
                            </div>
                        `}
                        ${project.technologyRationale && project.technologyRationale.length > 0 ? `
                            <div class="mt-3 md:mt-4">
                                <h5 class="font-semibold mb-2 ${theme.textColor} text-sm md:text-base">왜 이 기술을 썼나요?</h5>
                                <ul class="list-none text-gray-700 space-y-1.5 text-xs md:text-sm">
                                    ${project.technologyRationale.map(item => `
                                        <li class="flex items-start">
                                            <span class="inline-block mr-2 mt-1 ${theme.check}">•</span>
                                            <span>${item}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                    
                    <!-- 5) 기술적 문제 해결 - 모든 프로젝트 동일 구조 -->
                    ${technicalTroubleshootingHTML}
                    
                    <!-- 6) 대상 사용자 - 모든 프로젝트 동일 (모바일 최적화) -->
                    <div class="mb-6 md:mb-8 modal-section" data-section="target-users">
                        <h4 class="font-semibold mb-2 md:mb-3 ${theme.textColor} text-base md:text-lg">👥 대상 사용자</h4>
                        <p class="text-gray-700 text-sm leading-relaxed">${conciseTargetUsers}</p>
                    </div>
                    
                    <!-- 7) 회고 - 모든 프로젝트 동일 -->
                    ${reflectionHTML}
                </div>
            </div>
        </div>
    `;
}

// 프로젝트 카드 렌더링
function renderProjectCards() {
    const container = document.getElementById('projects-container');
    if (!container) return;
    
    container.innerHTML = projectsData.map(project => createProjectCard(project)).join('');
    
    // 카드 클릭 이벤트 추가 - 전체 카드 클릭 가능
    container.querySelectorAll('.project-card-preview').forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const projectId = parseInt(this.dataset.projectId);
            showProjectModal(projectId);
        });
    });
    
    // 스크롤 애니메이션 초기화
    initProjectCardAnimations();
    
    // 동적으로 추가된 카드에 대한 애니메이션 재초기화
    if (typeof window.reinitAnimations === 'function') {
        setTimeout(() => {
            window.reinitAnimations();
        }, 100);
    }
}

// 모달 열 때 스크롤을 맨 위로 리셋
function resetModalScroll(modal) {
    const scrollContainer = modal.querySelector('.overflow-y-auto');
    if (scrollContainer) {
        scrollContainer.scrollTop = 0;
    }
}

// 프로젝트 카드 스크롤 애니메이션
function initProjectCardAnimations() {
    const cards = document.querySelectorAll('.project-card-item');
    if (cards.length === 0) return;
    
    // Intersection Observer 설정
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered 애니메이션 적용
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100); // 각 카드마다 100ms 지연
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 각 카드 관찰 시작
    cards.forEach(card => {
        observer.observe(card);
    });
}

// 프로젝트 모달 표시
function showProjectModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;
    
    // 기존 모달 제거
    const existingModal = document.querySelector('.project-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // 새 모달 생성
    const modalHTML = createProjectModal(project);
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.querySelector(`.project-modal[data-project-id="${projectId}"]`);
    const overlay = modal;
    const container = modal.querySelector('.modal-container');
    
    // 모달 닫기 이벤트
    modal.querySelector('.close-modal').addEventListener('click', () => {
        closeProjectModal(projectId);
    });
    
    // 배경 클릭 시 닫기
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeProjectModal(projectId);
        }
    });
    
    // ESC 키로 닫기
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeProjectModal(projectId);
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
    
    // body 스크롤 방지
    document.body.style.overflow = 'hidden';
    
    // 모달 표시 애니메이션 - Framer Motion 스타일 (모바일 최적화)
    // Backdrop: opacity 0 → 1, duration ~0.2s
    // Modal panel: opacity 0 → 1, scale 0.97 → 1, y 8 → 0 (모바일: y 4 → 0), duration ~0.25s (모바일: ~0.2s), easeOut
    const isMobile = window.innerWidth < 768;
    const yDistance = isMobile ? 4 : 8;
    const duration = isMobile ? 0.2 : 0.25;
    
    overlay.style.opacity = '0';
    container.style.opacity = '0';
    container.style.transform = `scale(0.97) translateY(${yDistance}px)`;
    
    requestAnimationFrame(() => {
        overlay.style.transition = 'opacity 0.2s ease-out';
        container.style.transition = `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`;
        
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            container.style.opacity = '1';
            container.style.transform = 'scale(1) translateY(0)';
        });
    });
    
    // 모달 스크롤 리셋
    resetModalScroll(modal);
    
    // 섹션 스크롤 reveal 애니메이션
    initModalSectionAnimations(modal);
    
    // Accordion 기능 초기화 - 모든 프로젝트 동일
    initTroubleshootingAccordions(modal);
    
    // 게임 초기화 (해당하는 경우)
    if (project.hasSpecialContent && project.specialContentType === 'game') {
        // 게임은 모달 내에서 별도로 초기화 필요
        setTimeout(() => {
            const canvasId = `modal-maze-game-${projectId}`;
            const containerId = `modal-game-container-${projectId}`;
            const timerId = `modal-timer-${projectId}`;
            const levelId = `modal-level-${projectId}`;
            const instructionsId = `modal-game-instructions-${projectId}`;
            const pauseId = `modal-pause-toggle-${projectId}`;
            
            // 게임 요소가 존재하는지 확인
            if (document.getElementById(canvasId) && document.getElementById(containerId)) {
                // initGame 함수가 전역 스코프에 있는지 확인 후 호출
                if (typeof initGame === 'function') {
                    initGame(canvasId, containerId, timerId, levelId, instructionsId, pauseId);
                } else {
                    console.error('initGame 함수를 찾을 수 없습니다.');
                }
            }
        }, 200);
    } else if (project.hasSpecialContent && project.specialContentType === 'unity-game') {
        // Unity 게임 초기화
        setTimeout(() => {
            initUnityGame(projectId, project.unityGamePath);
        }, 300);
    }
    
    // 이미지 확대 기능 초기화 (동적으로 추가된 요소에도 적용)
    setTimeout(() => {
        const enlargeableMedia = modal.querySelectorAll('.enlargeable-media');
        const enlargeModal = document.getElementById('enlargeModal');
        const closeModalBtn = document.getElementById('closeModal');
        const modalContent = document.getElementById('modalContent');
        
        enlargeableMedia.forEach(media => {
            media.addEventListener('click', (e) => {
                e.stopPropagation(); // 프로젝트 모달 닫기 이벤트 방지
                const mediaSrc = media.dataset.src;
                const mediaType = media.dataset.mediaType;
                
                modalContent.innerHTML = '';
                
                if (mediaType === 'image') {
                    const img = document.createElement('img');
                    img.src = mediaSrc;
                    img.classList.add('max-w-full', 'max-h-[80vh]', 'object-contain', 'rounded-lg');
                    modalContent.appendChild(img);
                } else if (mediaType === 'video') {
                    const video = document.createElement('video');
                    video.src = mediaSrc;
                    video.controls = true;
                    video.autoplay = true;
                    video.loop = true;
                    video.classList.add('max-w-full', 'max-h-[80vh]', 'object-contain', 'rounded-lg');
                    modalContent.appendChild(video);
                }
                
                enlargeModal.classList.remove('hidden');
                document.body.classList.add('overflow-hidden');
            });
        });
    }, 100);
}

// Unity 게임 인스턴스 저장
const unityInstances = {};

// Unity 게임 초기화 함수
function initUnityGame(projectId, gamePath) {
    const container = document.getElementById(`unity-game-container-${projectId}`);
    const canvasContainer = document.getElementById(`unity-canvas-container-${projectId}`);
    const loadingBar = document.getElementById(`unity-loading-bar-${projectId}`);
    const progressBar = document.getElementById(`unity-progress-bar-${projectId}`);
    
    if (!container || !canvasContainer) {
        console.error('Unity 게임 컨테이너를 찾을 수 없습니다.');
        return;
    }
    
    // 기존 인스턴스가 있으면 정리
    if (unityInstances[projectId]) {
        try {
            unityInstances[projectId].Quit().then(() => {
                unityInstances[projectId] = null;
            });
        } catch (e) {
            console.warn('Unity 인스턴스 정리 중 오류:', e);
        }
    }
    
    // Canvas 생성
    const canvas = document.createElement('canvas');
    canvas.id = `unity-canvas-${projectId}`;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.objectFit = 'contain';
    canvas.style.maxWidth = '100%';
    canvas.style.maxHeight = '80vh';
    canvas.style.margin = '0 auto';
    canvas.setAttribute('tabindex', '-1');
    canvasContainer.innerHTML = '';
    canvasContainer.appendChild(canvas);
    
    // Unity 로더 스크립트 로드
    // 실제 빌드 구조: Projects/Bullet_Game/Build/Build/Build.loader.js
    const buildUrl = gamePath + "/Build";
    const loaderUrl = buildUrl + "/Build.loader.js";
    
    // 기존 스크립트가 있으면 제거
    const existingScript = document.querySelector(`script[data-unity-loader="${projectId}"]`);
    if (existingScript) {
        existingScript.remove();
    }
    
    const script = document.createElement('script');
    script.src = loaderUrl;
    script.setAttribute('data-unity-loader', projectId);
    
    script.onload = () => {
        // 압축 해제된(Disabled) 빌드 파일 사용
        const config = {
            dataUrl: buildUrl + "/Build.data",
            frameworkUrl: buildUrl + "/Build.framework.js",
            codeUrl: buildUrl + "/Build.wasm",
            streamingAssetsUrl: gamePath + "/StreamingAssets",
            companyName: "DefaultCompany",
            productName: "Bullet_Game",
            productVersion: "0.1",
            showBanner: (msg, type) => {
                if (type === 'error') {
                    console.error('Unity Error:', msg);
                    if (loadingBar) {
                        loadingBar.innerHTML = `
                            <div class="text-center p-4">
                                <p class="text-red-400 mb-2 font-semibold">게임 로드 오류</p>
                                <p class="text-sm text-gray-400 mb-2">${msg}</p>
                                <p class="text-xs text-gray-500 mt-4">
                                    <strong>해결 방법:</strong><br>
                                    1. 로컬 서버를 사용 중이라면 Live Server나 Python http.server를 사용하세요.<br>
                                    2. 서버가 gzip 파일을 올바르게 처리하도록 설정되어 있는지 확인하세요.<br>
                                    3. Unity에서 압축 해제된 파일로 다시 빌드하거나, 서버 설정을 확인하세요.
                                </p>
                            </div>
                        `;
                    }
                } else if (type === 'warning') {
                    console.warn('Unity Warning:', msg);
                } else {
                    console.log('Unity Banner:', msg);
                }
            }
        };
        
        // 모바일/데스크톱 모두 비율 유지하며 전체 표시
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        
        // Unity 인스턴스 생성
        createUnityInstance(canvas, config, (progress) => {
            if (progressBar) {
                progressBar.style.width = (100 * progress) + '%';
            }
        }).then((unityInstance) => {
            unityInstances[projectId] = unityInstance;
            
            // Unity 게임이 완전히 초기화될 때까지 대기
            // 게임 씬이 로드되고 UI 요소가 준비될 시간을 줍니다
            setTimeout(() => {
                if (loadingBar) {
                    loadingBar.style.display = 'none';
                }
                console.log('Unity 게임이 준비되었습니다.');
            }, 1000); // 1초 대기 (Unity 씬 로드 및 초기화 시간)
        }).catch((message) => {
            console.error('Unity 게임 로드 실패:', message);
            if (loadingBar) {
                let errorMessage = message;
                let solutionText = '';
                
                // gzip 관련 오류인지 확인
                if (typeof message === 'string' && (message.includes('gzip') || message.includes('Content-Encoding'))) {
                    solutionText = `
                        <div class="mt-4 p-3 bg-yellow-900/30 rounded border border-yellow-700/50">
                            <p class="text-yellow-300 text-xs font-semibold mb-2">💡 해결 방법:</p>
                            <ul class="text-xs text-yellow-200/80 space-y-1 text-left list-disc list-inside">
                                <li>로컬 서버를 사용 중이라면 Live Server 확장 프로그램을 사용하세요</li>
                                <li>Python 서버: <code class="bg-black/30 px-1 rounded">python -m http.server 8000</code></li>
                                <li>Node.js 서버: <code class="bg-black/30 px-1 rounded">npx http-server -p 8000</code></li>
                                <li>서버가 gzip 파일을 올바르게 처리하도록 설정되어 있는지 확인하세요</li>
                            </ul>
                        </div>
                    `;
                }
                
                loadingBar.innerHTML = `
                    <div class="text-center p-4">
                        <p class="text-red-400 mb-2 font-semibold">게임 로드에 실패했습니다</p>
                        <p class="text-sm text-gray-400 mb-2">${errorMessage}</p>
                        ${solutionText}
                    </div>
                `;
            }
        });
    };
    
    script.onerror = () => {
        console.error('Unity 로더 스크립트 로드 실패');
        if (loadingBar) {
            loadingBar.innerHTML = `
                <div class="text-center p-4">
                    <p class="text-red-400 mb-2">게임 파일을 찾을 수 없습니다.</p>
                    <p class="text-sm text-gray-400">파일 경로를 확인해주세요: ${loaderUrl}</p>
                </div>
            `;
        }
    };
    
    document.body.appendChild(script);
}

// Unity 게임 정리 함수
function cleanupUnityGame(projectId) {
    if (unityInstances[projectId]) {
        try {
            unityInstances[projectId].Quit().then(() => {
                unityInstances[projectId] = null;
            });
        } catch (e) {
            console.warn('Unity 인스턴스 정리 중 오류:', e);
            unityInstances[projectId] = null;
        }
    }
    
    // 로더 스크립트 제거
    const loaderScript = document.querySelector(`script[data-unity-loader="${projectId}"]`);
    if (loaderScript) {
        loaderScript.remove();
    }
}

// 프로젝트 모달 닫기 - Framer Motion 스타일 (모바일 최적화)
function closeProjectModal(projectId) {
    const modal = document.querySelector(`.project-modal[data-project-id="${projectId}"]`);
    if (modal) {
        const project = projectsData.find(p => p.id === projectId);
        
        // Unity 게임 정리
        if (project && project.hasSpecialContent && project.specialContentType === 'unity-game') {
            cleanupUnityGame(projectId);
        }
        
        const overlay = modal;
        const container = modal.querySelector('.modal-container');
        const isMobile = window.innerWidth < 768;
        const yDistance = isMobile ? 4 : 8;
        const duration = isMobile ? 0.2 : 0.25;
        
        // Backdrop: opacity 1 → 0, duration ~0.2s
        // Modal panel: opacity 1 → 0, scale 1 → 0.97, y 0 → 8 (모바일: y 0 → 4), duration ~0.25s (모바일: ~0.2s), easeOut
        overlay.style.transition = 'opacity 0.2s ease-out';
        container.style.transition = `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`;
        
        overlay.style.opacity = '0';
        container.style.opacity = '0';
        container.style.transform = `scale(0.97) translateY(${yDistance}px)`;
        
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, duration * 1000);
    }
}

// 모달 섹션 스크롤 reveal 애니메이션 - 모바일 최적화
// opacity 0 → 1, y 16 → 0 (모바일: y 8 → 0), duration ~0.25s (모바일: ~0.2s), easeOut, once per section
function initModalSectionAnimations(modal) {
    const sections = modal.querySelectorAll('.modal-section');
    const isMobile = window.innerWidth < 768;
    const yDistance = isMobile ? 8 : 16;
    const duration = isMobile ? 0.2 : 0.25;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -30px 0px'
    });
    
    sections.forEach((section) => {
        section.style.opacity = '0';
        section.style.transform = `translateY(${yDistance}px)`;
        section.style.transition = `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`;
        observer.observe(section);
    });
}

// Collapsible Challenges 초기화 (여기몰까 프로젝트용)
function initCollapsibleChallenges(modal) {
    const toggles = modal.querySelectorAll('.challenge-toggle');
    
    toggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
            const cardId = toggle.getAttribute('data-card-id');
            const content = modal.querySelector(`[data-content="${cardId}"]`);
            const arrow = modal.querySelector(`[data-arrow="${cardId}"]`);
            const card = modal.querySelector(`[data-card-id="${cardId}"].challenge-card`);
            
            if (!content || !arrow) return;
            
            const isHidden = content.classList.contains('hidden');
            
            if (isHidden) {
                // 열기
                content.classList.remove('hidden');
                content.style.maxHeight = '0';
                content.style.overflow = 'hidden';
                content.style.transition = 'max-height 0.4s ease-out, opacity 0.3s ease-out';
                content.style.opacity = '0';
                
                requestAnimationFrame(() => {
                    const scrollHeight = content.scrollHeight;
                    content.style.maxHeight = scrollHeight + 'px';
                    content.style.opacity = '1';
                });
                
                arrow.style.transform = 'rotate(180deg)';
                if (card) card.classList.remove('collapsed');
            } else {
                // 닫기
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
                
                requestAnimationFrame(() => {
                    content.style.maxHeight = '0';
                    content.style.opacity = '0';
                });
                
                setTimeout(() => {
                    content.classList.add('hidden');
                }, 400);
                
                arrow.style.transform = 'rotate(0deg)';
                if (card) card.classList.add('collapsed');
            }
        });
    });
}

// Troubleshooting Accordion 초기화
function initTroubleshootingAccordions(modal) {
    const toggles = modal.querySelectorAll('.troubleshooting-toggle');
    
    toggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
            const accordionId = toggle.getAttribute('data-accordion-id');
            const content = document.getElementById(accordionId);
            const arrow = toggle.querySelector('[data-arrow]');
            
            if (!content) return;
            
            const isHidden = content.classList.contains('hidden');
            
            if (isHidden) {
                // 열기
                content.classList.remove('hidden');
                content.style.maxHeight = '0';
                content.style.overflow = 'hidden';
                content.style.transition = 'max-height 0.3s ease-out, opacity 0.3s ease-out';
                content.style.opacity = '0';
                
                requestAnimationFrame(() => {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.style.opacity = '1';
                });
                
                arrow.style.transform = 'rotate(180deg)';
            } else {
                // 닫기
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
                
                requestAnimationFrame(() => {
                    content.style.maxHeight = '0';
                    content.style.opacity = '0';
                });
                
                setTimeout(() => {
                    content.classList.add('hidden');
                }, 300);
                
                arrow.style.transform = 'rotate(0deg)';
            }
        });
    });
}

// 페이지 로드 시 프로젝트 카드 렌더링
document.addEventListener('DOMContentLoaded', function() {
    renderProjectCards();
});

