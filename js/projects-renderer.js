// 프로젝트 카드/모달 렌더링

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
    },
    blue: {
        gradient: "from-blue-500 to-cyan-500",
        border: "border-blue-100",
        text: "text-blue-700",
        bg: "bg-blue-100",
        textColor: "text-blue-600",
        check: "text-blue-500",
        reflectionGradient: "from-blue-50 to-cyan-50",
        reflectionBorder: "border-blue-500"
    },
    teal: {
        gradient: "from-teal-500 to-cyan-500",
        border: "border-teal-100",
        text: "text-teal-700",
        bg: "bg-teal-100",
        textColor: "text-teal-600",
        check: "text-teal-500",
        reflectionGradient: "from-teal-50 to-cyan-50",
        reflectionBorder: "border-teal-500"
    }
};

function createProjectCard(project, index = 0) {
    const theme = colorThemes[project.colorTheme];
    const isFeatured = project.featured === true;
    const typeTag = project.typeTag;
    const typeTagStylesMap = {
        sky:   { bg: 'bg-sky-50',    text: 'text-sky-700',    border: 'border-sky-200' },
        indigo:{ bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
        purple:{ bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
        pink:  { bg: 'bg-pink-50',   text: 'text-pink-700',   border: 'border-pink-200' },
        emerald:{bg: 'bg-emerald-50',text: 'text-emerald-700',border: 'border-emerald-200' },
        amber: { bg: 'bg-amber-50',  text: 'text-amber-700',  border: 'border-amber-200' },
        blue:  { bg: 'bg-blue-50',   text: 'text-blue-700',   border: 'border-blue-200' },
        teal:  { bg: 'bg-teal-50',   text: 'text-teal-700',   border: 'border-teal-200' },
    };
    
    const hasImage = project.thumbnail && 
                     project.thumbnail !== "images/logo.png" && 
                     project.thumbnail.trim() !== "" &&
                     project.thumbnail.trim().length > 0;
    const thumbnailWebp = project.thumbnailWebp;
    
    const accentColorMap = {
        'sky': '#0ea5e9',
        'indigo': '#6366f1',
        'purple': '#a855f7',
        'pink': '#ec4899',
        'emerald': '#10b981',
        'amber': '#f59e0b',
        'blue': '#3b82f6',
        'teal': '#14b8a6'
    };
    const accentColor = accentColorMap[project.colorTheme] || '#0ea5e9';
    
    const cardEmphasisClasses = isFeatured
        ? 'ring-2 ring-blue-200 shadow-[0_10px_30px_-12px_rgba(59,130,246,0.6)] hover:-translate-y-1 hover:shadow-2xl'
        : 'shadow-md';
    const gradientBarHeight = isFeatured ? 'h-2.5' : 'h-1.5';
    const tagStyle = typeTag ? (typeTagStylesMap[project.colorTheme] || { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' }) : null;
    const typeTagHTMLInner = typeTag ? `
        <span class="project-type-tag inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold ${tagStyle.bg} ${tagStyle.text} ${tagStyle.border}">
            <span>${typeTag.emoji}</span>
            <span>${typeTag.label}</span>
        </span>
    ` : '';

    const badgeHTMLInner = isFeatured ? `
        <span class="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold shadow-md featured-badge-pulse">
            ✨ 주요 프로젝트
        </span>
    ` : '';

    const tagRowHTML = (typeTagHTMLInner || badgeHTMLInner) ? `
        <div class="tag-row flex items-center gap-1.5 mb-5 md:mb-6 w-full flex-wrap">
            ${badgeHTMLInner}
            ${typeTagHTMLInner}
        </div>
    ` : '';
    
    const isLogoImage = project.id === 7 || project.id === 4;
    const imageObjectFit = isLogoImage ? 'object-contain' : 'object-cover';
    const imageContainerClass = isLogoImage 
        ? 'aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden mb-4 md:mb-5 relative group/image project-image-container flex items-center justify-center'
        : 'aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden mb-4 md:mb-5 relative group/image project-image-container';
    
    const loadingAttr = index < 3 ? 'eager' : 'lazy';
    const fetchPriority = index < 3 ? 'high' : 'low';
    
    const imageHTML = hasImage ? `
        <div class="${imageContainerClass}">
            ${thumbnailWebp ? `
                <picture>
                    <source srcset="${thumbnailWebp}" type="image/webp">
                    <img src="${project.thumbnail}" alt="${project.title}"
                         class="w-full h-full ${imageObjectFit} object-center transition-transform duration-300 ease-out project-image"
                         loading="${loadingAttr}" decoding="async" fetchpriority="${fetchPriority}"
                         onload="this.setAttribute('width', this.naturalWidth); this.setAttribute('height', this.naturalHeight);">
                </picture>
            ` : `
                <img src="${project.thumbnail}" alt="${project.title}"
                     class="w-full h-full ${imageObjectFit} object-center transition-transform duration-300 ease-out project-image"
                     loading="${loadingAttr}" decoding="async" fetchpriority="${fetchPriority}"
                     onload="this.setAttribute('width', this.naturalWidth); this.setAttribute('height', this.naturalHeight);">
            `}
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 md:group-hover/image:opacity-100 transition-opacity duration-300 ease-out"></div>
        </div>
    ` : '';
    
    const valueStatement = project.valueStatement || '';
    
    return `
        <div class="project-card-preview bg-white rounded-xl overflow-hidden border-l-4 transition-all duration-300 ease-out opacity-0 translate-y-4 project-card-item cursor-pointer w-full ${cardEmphasisClasses}" 
             style="border-left-color: ${accentColor}; pointer-events: auto;"
             data-project-id="${project.id}">
            <div class="bg-gradient-to-r ${theme.gradient} ${gradientBarHeight}"></div>
            <div class="card-inner">
                ${tagRowHTML}
                ${imageHTML}
                
                <h3 class="text-xl md:text-2xl font-bold mb-2 ${theme.text} leading-tight">${project.title}</h3>
                
                ${valueStatement ? `
                    <p class="value-statement font-medium text-gray-500 mb-2 md:mb-3">${valueStatement}</p>
                ` : ''}
                
                <p class="short-description text-gray-700 mb-3 md:mb-4 leading-relaxed line-clamp-3 md:line-clamp-4">${project.shortDescription}</p>
                
                <div class="mb-3 md:mb-4 text-gray-500">
                    <span>${project.period}</span>
                </div>
                
                <div class="pt-3 md:pt-4 border-t border-gray-100 mt-auto">
                    <div class="group/cta flex items-center gap-2 ${theme.text} font-semibold min-h-[44px]">
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
            <div class="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-500 modal-section" data-section="executive-summary">
                <h4 class="font-bold text-blue-900 flex items-center gap-2">
                    <span>🔍</span>
                    <span>핵심 성과 요약</span>
                </h4>
                <ul class="space-y-2 mt-3">
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
            <div class="bg-violet-50 rounded-xl p-5 border-l-4 border-violet-500 modal-section" data-section="executive-summary">
                <h4 class="font-bold text-violet-900 flex items-center gap-2">
                    <span>🎮</span>
                    <span>핵심 포인트 요약</span>
                </h4>
                <ul class="space-y-2 mt-3">
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
            <div class="bg-rose-50 rounded-xl p-5 border-l-4 border-rose-500 modal-section" data-section="executive-summary">
                <h4 class="font-bold text-rose-900 flex items-center gap-2">
                    <span>🌟</span>
                    <span>핵심 성과 요약</span>
                </h4>
                <ul class="space-y-2 mt-3">
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

function createHeroSummary(project, theme) {
    if (!project.heroSummary) return '';
    
    const { purpose, roles, keyOutcomes } = project.heroSummary;
    
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
        },
        blue: {
            gradient: 'from-blue-50 to-cyan-50',
            border: 'border-blue-500',
            bg: 'bg-blue-100',
            text: 'text-blue-700',
            borderT: 'border-blue-200'
        },
        teal: {
            gradient: 'from-teal-50 to-cyan-50',
            border: 'border-teal-500',
            bg: 'bg-teal-100',
            text: 'text-teal-700',
            borderT: 'border-teal-200'
        }
    };
    
    const colors = colorMap[project.colorTheme] || colorMap.sky;
    
    const colorCodeMap = {
        sky: '#0ea5e9',
        purple: '#a855f7',
        pink: '#ec4899',
        emerald: '#10b981',
        indigo: '#6366f1',
        amber: '#f59e0b',
        blue: '#3b82f6',
        teal: '#14b8a6'
    };
    const accentColor = colorCodeMap[project.colorTheme] || colorCodeMap.sky;
    
    return `
        <div class="bg-white rounded-xl md:rounded-2xl p-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative modal-section" data-section="hero-summary">
            <div class="absolute top-0 left-0 w-8 md:w-16 h-8 md:h-16" style="background: ${accentColor}; clip-path: polygon(0 0, 100% 0, 0 100%);"></div>
            
            <div class="relative z-10 p-5 md:p-7 pt-8 md:pt-10">
                <div class="mb-4 md:mb-5">
                    <p class="text-lg md:text-xl font-semibold text-gray-800 leading-relaxed">${purpose}</p>
                </div>
                <div class="flex flex-wrap gap-2 mb-4 md:mb-5">
                    ${roles.map(role => `
                        <span class="px-3 py-1.5 md:px-4 md:py-2 ${colors.bg} ${colors.text} rounded-full font-medium shadow-sm">${role}</span>
                    `).join('')}
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 pt-4 md:pt-5 border-t-2 ${colors.borderT}">
                    ${keyOutcomes.map(outcome => `
                        <div class="text-center">
                            <div class="text-gray-600 mb-2">${outcome.label}</div>
                            <div class="text-lg md:text-xl font-bold ${outcome.bold ? colors.text : 'text-gray-800'}">${outcome.value}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function createCollapsibleChallenges(project, theme) {
    if (!project.technicalTroubleshooting || project.technicalTroubleshooting.length === 0) return '';
    
    return `
                <div class="modal-section" data-section="troubleshooting">
            <h4 class="font-semibold ${theme.textColor}"><span>🔧</span> 기술적 도전과 해결</h4>
            <div class="space-y-4">
                ${project.technicalTroubleshooting.map((item, index) => {
                    const cardId = `challenge-${project.id}-${index}`;
                    const isExpanded = item.expanded === true || (item.expanded !== false && index < 2);
                    const expandedClass = isExpanded ? '' : 'collapsed';
                    let resultHTML = item.result.replace(/\*\*/g, '');
                    
                    return `
                        <div class="challenge-card bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md ${expandedClass}" data-card-id="${cardId}">
                            <button class="challenge-toggle w-full text-left p-5 flex items-center justify-between hover:bg-gray-50 transition-colors" data-card-id="${cardId}">
                                <div class="flex-1">
                                    <div class="flex items-center gap-2 mb-2">
                                        <span class="text-emerald-400 font-semibold">문제</span>
                                    </div>
                                    <p class="text-gray-800 leading-relaxed">${item.problem}</p>
                                </div>
                                <svg class="w-5 h-5 text-gray-400 ml-4 flex-shrink-0 challenge-arrow transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}" data-arrow="${cardId}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <div class="challenge-content ${isExpanded ? '' : 'hidden'}" data-content="${cardId}" style="${isExpanded ? 'max-height: none;' : 'max-height: 0; overflow: hidden;'}">
                                <div class="px-5 pb-5 space-y-4 border-t border-gray-100">
                                    <div>
                                        <div class="flex items-center gap-2 mb-2 mt-4">
                                            <span class="text-blue-600 font-semibold">해결</span>
                                        </div>
                                        <p class="text-gray-700 leading-relaxed">${item.solution}</p>
                                    </div>
                                    <div class="bg-emerald-50 rounded-lg p-4 border-l-4 border-emerald-400">
                                        <div class="flex items-center gap-2 mb-2">
                                            <span class="text-emerald-700 font-semibold">성과</span>
                                        </div>
                                        <p class="text-gray-800 leading-relaxed">${resultHTML}</p>
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

function createGroupedTechStack(project, theme) {
    if (!project.technologies || typeof project.technologies !== 'object' || project.id !== 5) {
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
    
    const { frontend, backend, aiMl, infra, tools } = project.technologies;
    
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
                <h5 class="text-xs md:text-sm font-semibold text-gray-600 mb-2">Infra</h5>
                <div class="flex flex-wrap gap-2">
                    ${infra.map(tech => `
                        <span class="px-2 py-1 md:px-3 md:py-1.5 ${theme.bg} ${theme.text} rounded-full tech-tag text-xs md:text-sm font-medium">${tech}</span>
                    `).join('')}
                </div>
            </div>
            ${tools && tools.length > 0 ? `
            <div>
                <h5 class="text-xs md:text-sm font-semibold text-gray-600 mb-2">Tools</h5>
                <div class="flex flex-wrap gap-2">
                    ${tools.map(tech => `
                        <span class="px-2 py-1 md:px-3 md:py-1.5 ${theme.bg} ${theme.text} rounded-full tech-tag text-xs md:text-sm font-medium">${tech}</span>
                    `).join('')}
                </div>
            </div>
            ` : ''}
        </div>
    `;
}

function createTechnicalTroubleshooting(project, theme) {
    if (!project.technicalTroubleshooting || project.technicalTroubleshooting.length === 0) return '';
    
    const colorThemeMap = {
        sky: { bg: 'from-sky-50 to-blue-50', border: 'border-sky-400' },
        indigo: { bg: 'from-indigo-50 to-purple-50', border: 'border-indigo-400' },
        purple: { bg: 'from-purple-50 to-pink-50', border: 'border-purple-400' },
        pink: { bg: 'from-pink-50 to-rose-50', border: 'border-pink-400' },
        emerald: { bg: 'from-emerald-50 to-teal-50', border: 'border-emerald-400' },
        amber: { bg: 'from-amber-50 to-orange-50', border: 'border-amber-400' },
        blue: { bg: 'from-blue-50 to-cyan-50', border: 'border-blue-400' },
        teal: { bg: 'from-teal-50 to-cyan-50', border: 'border-teal-400' }
    };
    
    const themeColors = colorThemeMap[project.colorTheme] || colorThemeMap.sky;
    const bgColorResolved = themeColors.bg;
    const borderColorResolved = themeColors.border;
    const isBilingual = project.id === 4;
    
    return `
        <div class="modal-section" data-section="troubleshooting">
            <h4 class="font-semibold ${theme.textColor}"><span>🛠️</span> 트러블 슈팅</h4>
            <div class="space-y-3">
                ${project.technicalTroubleshooting.map((item, index) => {
                    const accordionId = `troubleshooting-${project.id}-${index}`;
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
                        solutionBullets = item.solution.split('.').filter(s => s.trim()).slice(0, 3).map(s => s.trim());
                    }
                    
                    let highlightedResult = item.result;
                    const performancePatterns = [
                        /(\d+%)/g,
                        /(\d+\.\d+%)/g,
                        /(\d+)배/g,
                        /(\d+)초/g,
                        /(\d+fps)/gi,
                        /(\d+\.\d+초)/g,
                        /(\d+%\s*(?:단축|감소|절감|향상|개선))/g
                    ];
                    
                    const performanceColorMap = {
                        sky: 'text-sky-700',
                        indigo: 'text-indigo-700',
                        purple: 'text-purple-700',
                        pink: 'text-pink-700',
                        emerald: 'text-emerald-700',
                        amber: 'text-amber-700',
                        blue: 'text-blue-700',
                        teal: 'text-teal-700'
                    };
                    const performanceColor = performanceColorMap[project.colorTheme] || 'text-blue-700';
                    
                    highlightedResult = highlightedResult
                        .replace(/(\d+%)/g, `<span class="font-bold ${performanceColor} text-base">$1</span>`)
                        .replace(/(\d+\.\d+%)/g, `<span class="font-bold ${performanceColor} text-base">$1</span>`)
                        .replace(/(\d+)배/g, `<span class="font-bold ${performanceColor} text-base">$1배</span>`)
                        .replace(/(\d+)초/g, `<span class="font-bold ${performanceColor} text-base">$1초</span>`)
                        .replace(/(\d+fps)/gi, `<span class="font-bold ${performanceColor} text-base">$1</span>`)
                        .replace(/(\d+\.\d+초)/g, `<span class="font-bold ${performanceColor} text-base">$1</span>`)
                        .replace(/(완전히 해결|완전 해결)/g, '<span class="font-bold text-green-700">$1</span>')
                        .replace(/(0건)/g, '<span class="font-bold text-green-700">$1</span>');
                    
                    const highlightColorMap = {
                        sky: 'text-sky-700',
                        indigo: 'text-indigo-700',
                        purple: 'text-purple-700',
                        pink: 'text-pink-700',
                        emerald: 'text-emerald-700',
                        amber: 'text-amber-700',
                        blue: 'text-blue-700',
                        teal: 'text-teal-700'
                    };
                    const highlightColor = highlightColorMap[project.colorTheme] || 'text-blue-700';
                    
                    highlightedResult = highlightedResult
                        .replace(/자연스럽게/g, `<span class="font-semibold ${highlightColor}">자연스럽게</span>`)
                        .replace(/안정적으로/g, `<span class="font-semibold ${highlightColor}">안정적으로</span>`)
                        .replace(/안정적인/g, `<span class="font-semibold ${highlightColor}">안정적인</span>`)
                        .replace(/실패율/g, `<span class="font-semibold ${highlightColor}">실패율</span>`)
                        .replace(/비용/g, `<span class="font-semibold ${highlightColor}">비용</span>`);
                    
                    return `
                        <div class="bg-gradient-to-r ${bgColorResolved} rounded-lg md:rounded-xl p-3 md:p-4 border-l-4 ${borderColorResolved} shadow-sm troubleshooting-item" data-item-index="${index}">
                            <div class="mb-2">
                                <h5 class="font-semibold text-red-600 mb-1.5 flex items-center gap-1.5">
                                    <span>⚠️</span>
                                    <span>문제 상황</span>
                                </h5>
                                <p class="text-gray-700 pl-4 md:pl-5 leading-relaxed">
                                    ${conciseProblem}
                                </p>
                            </div>
                            
                            <div class="mb-2">
                                <button class="troubleshooting-toggle w-full text-left flex items-center justify-between font-semibold ${theme.textColor} hover:opacity-80 transition-colors min-h-[40px]" data-accordion-id="${accordionId}">
                                    <span class="flex items-center gap-1.5">
                                        <span>💡</span>
                                        <span>해결 과정</span>
                                    </span>
                                    <span class="flex items-center justify-center w-6 h-6 rounded-full bg-white hover:bg-gray-100 transition-all duration-200 text-gray-700 font-bold text-sm leading-none" data-arrow style="line-height: 1;">
                                        <span class="plus-icon leading-none" style="line-height: 1;">+</span>
                                        <span class="minus-icon hidden leading-none" style="line-height: 1;">−</span>
                                    </span>
                                </button>
                                <div class="troubleshooting-content hidden pl-4 md:pl-5 mt-1.5" id="${accordionId}" data-mobile-collapsed="true">
                                    <div class="text-gray-700 leading-relaxed space-y-2">
                                        ${solutionBullets.map(step => {
                                            if (!step) return '';
                                            let highlighted = step
                                                .replace(/AABB/g, `<span class="font-semibold ${theme.textColor}">AABB</span>`)
                                                .replace(/requestAnimationFrame/g, `<span class="font-semibold ${theme.textColor}">requestAnimationFrame</span>`)
                                                .replace(/frustum culling/g, `<span class="font-semibold ${theme.textColor}">frustum culling</span>`)
                                                .replace(/InputManager/g, `<span class="font-semibold ${theme.textColor}">InputManager</span>`)
                                                .replace(/GLTFLoader/g, `<span class="font-semibold ${theme.textColor}">GLTFLoader</span>`)
                                                .replace(/LOD/g, `<span class="font-semibold ${theme.textColor}">LOD</span>`)
                                                .replace(/트랜잭션/g, `<span class="font-semibold ${theme.textColor}">트랜잭션</span>`)
                                                .replace(/SELECT FOR UPDATE/g, `<span class="font-semibold ${theme.textColor}">SELECT FOR UPDATE</span>`)
                                                .replace(/Raycasting/g, `<span class="font-semibold ${theme.textColor}">Raycasting</span>`);
                                            return `<p>• ${highlighted}</p>`;
                                        }).filter(s => s).join('')}
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h5 class="font-semibold text-green-600 mb-1.5 flex items-center gap-1.5">
                                    <span>📊</span>
                                    <span>성능 개선 및 결과</span>
                                </h5>
                                <p class="text-gray-700 pl-4 md:pl-5 leading-relaxed">
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

function createProjectModal(project) {
    const theme = colorThemes[project.colorTheme];
    
    const heroSummaryHTML = createHeroSummary(project, theme);
    const executiveSummaryHTML = createExecutiveSummary(project);
    
    let mainFeaturesHTML = '';
    if (Array.isArray(project.mainFeatures)) {
        mainFeaturesHTML = `
            <ul class="list-none text-gray-700 space-y-2">
                ${project.mainFeatures.slice(0, 5).map(feature => `
                    <li class="flex items-start">
                        <span class="flex-shrink-0 mr-2 ${theme.check} leading-none mt-0.5">•</span>
                        <span class="flex-1">${feature}</span>
                    </li>
                `).join('')}
            </ul>
        `;
    } else {
        if (project.id === 3) {
            mainFeaturesHTML = `
                <ul class="list-none text-gray-700 space-y-2">
                    <li class="flex items-start">
                        <span class="flex-shrink-0 mr-2 ${theme.check} leading-none mt-0.5">•</span>
                        <span class="flex-1">3D 미로 구조와 레벨 시스템</span>
                    </li>
                    <li class="flex items-start">
                        <span class="flex-shrink-0 mr-2 ${theme.check} leading-none mt-0.5">•</span>
                        <span class="flex-1">물리 기반 판 기울기 조작 (키보드·마우스·터치)</span>
                    </li>
                    <li class="flex items-start">
                        <span class="flex-shrink-0 mr-2 ${theme.check} leading-none mt-0.5">•</span>
                        <span class="flex-1">실시간 충돌 감지 및 공 움직임 시뮬레이션</span>
                    </li>
                    <li class="flex items-start">
                        <span class="flex-shrink-0 mr-2 ${theme.check} leading-none mt-0.5">•</span>
                        <span class="flex-1">레벨 진행 및 타이머 표시</span>
                    </li>
                </ul>
            `;
        } else if (project.id === 4) {
            mainFeaturesHTML = `
                <ul class="list-none text-gray-700 space-y-2">
                    <li class="flex items-start">
                        <span class="flex-shrink-0 mr-2 ${theme.check} leading-none mt-0.5">•</span>
                        <span class="flex-1">이중언어 AI 튜터 (모국어 → 한국어 단계적 설명)</span>
                    </li>
                    <li class="flex items-start">
                        <span class="flex-shrink-0 mr-2 ${theme.check} leading-none mt-0.5">•</span>
                        <span class="flex-1">가정통신문 자동 번역·알림</span>
                    </li>
                    <li class="flex items-start">
                        <span class="flex-shrink-0 mr-2 ${theme.check} leading-none mt-0.5">•</span>
                        <span class="flex-1">다국어 지원 (베트남어·중국어·우즈벡어·네팔어)</span>
                    </li>
                    <li class="flex items-start">
                        <span class="flex-shrink-0 mr-2 ${theme.check} leading-none mt-0.5">•</span>
                        <span class="flex-1">정서·문화 멘토링 기능</span>
                    </li>
                </ul>
            `;
        } else {
            const conciseFeatures = project.mainFeatures.replace(/서비스입니다/g, '').trim();
            mainFeaturesHTML = `<p class="text-gray-700 leading-relaxed">${conciseFeatures}</p>`;
        }
    }
    
    let imagesHTML = '';
    if (project.images && project.images.length > 0) {
        const imagesWebp = project.imagesWebp || [];
        const hasOnlyImages = !project.videos && !project.hasSpecialContent;
        const imageContainerId = `project-images-swiper-${project.id}`;
        
        // JEIU 캠퍼스 익스플로러 프로젝트(id: 1)는 드래그바 스타일 사용
        if (project.id === 1 && hasOnlyImages) {
            imagesHTML = `
                <div class="modal-section" data-section="media">
                    <h4 class="font-semibold ${theme.textColor}"><span>🖼️</span> 플랫폼 이미지</h4>
                    <div class="relative">
                        <div id="project-images-carousel-${project.id}" class="flex gap-6 overflow-x-auto overflow-y-hidden pb-2 scrollbar-hide snap-x snap-mandatory scroll-smooth" 
                             style="scrollbar-width: none; -ms-overflow-style: none;"
                             onscroll="updateProjectImagesDragBar(${project.id})">
                            ${project.images.map((img, index) => {
                                const webp = imagesWebp[index];
                                const preferredSrc = webp || img;
                                return `
                                <div class="flex-shrink-0 w-full sm:w-4/5 md:w-2/3 lg:w-1/2 snap-center">
                                    <div class="flex items-center justify-center bg-gray-50 p-2 md:p-4">
                                        <div class="bg-white shadow-lg rounded-lg md:rounded-xl overflow-hidden max-w-full cursor-pointer enlargeable-media" data-media-type="image" data-src="${preferredSrc}">
                                            ${webp ? `
                                            <picture>
                                                <source srcset="${webp}" type="image/webp">
                                                <img src="${img}" alt="${project.title} - 이미지 ${index + 1}"
                                                     onload="this.setAttribute('width', this.naturalWidth); this.setAttribute('height', this.naturalHeight);" 
                                                     class="max-w-full h-auto" 
                                                     style="max-height: 80vh; display: block;"
                                                     loading="${index === 0 ? 'eager' : 'lazy'}" 
                                                     decoding="async"
                                                     fetchpriority="${index === 0 ? 'high' : 'low'}">
                                            </picture>
                                            ` : `
                                            <img src="${img}" alt="${project.title} - 이미지 ${index + 1}"
                                                 onload="this.setAttribute('width', this.naturalWidth); this.setAttribute('height', this.naturalHeight);" 
                                                 class="max-w-full h-auto" 
                                                 style="max-height: 80vh; display: block;"
                                                 loading="${index === 0 ? 'eager' : 'lazy'}" 
                                                 decoding="async"
                                                 fetchpriority="${index === 0 ? 'high' : 'low'}">
                                            `}
                                        </div>
                                    </div>
                                </div>
                            `;
                            }).join('')}
                        </div>
                        <div class="flex items-center gap-3 mt-4">
                            <button id="project-images-prev-${project.id}" class="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-600 hover:text-primary transition-colors cursor-pointer">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                                </svg>
                            </button>
                            <div id="project-images-drag-bar-${project.id}" class="flex-1 h-2 bg-gray-200 rounded-full cursor-pointer relative">
                                <div id="project-images-drag-bar-thumb-${project.id}" class="h-full bg-gray-400 rounded-full transition-all duration-200 ease-out absolute left-0 cursor-grab active:cursor-grabbing" style="pointer-events: auto; box-shadow: 0 1px 2px rgba(0,0,0,0.1);"></div>
                            </div>
                            <button id="project-images-next-${project.id}" class="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-600 hover:text-primary transition-colors cursor-pointer">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        } else if (hasOnlyImages) {
            imagesHTML = `
                <div class="modal-section" data-section="media">
                    <h4 class="font-semibold ${theme.textColor}"><span>🖼️</span> 플랫폼 이미지</h4>
                    <div id="${imageContainerId}" class="project-images-swiper-container">
                        <div class="swiper project-images-swiper-${project.id}">
                            <div class="swiper-wrapper">
                                ${project.images.map((img, index) => {
                                    const webp = imagesWebp[index];
                                    const preferredSrc = webp || img;
                                    return `
                                    <div class="swiper-slide">
                                        <div class="flex items-center justify-center bg-gray-50 p-2 md:p-4">
                                            <div class="bg-white shadow-lg rounded-lg md:rounded-xl overflow-hidden max-w-full cursor-pointer enlargeable-media" data-media-type="image" data-src="${preferredSrc}">
                                                ${webp ? `
                                                <picture>
                                                    <source srcset="${webp}" type="image/webp">
                                                    <img src="${img}" alt="${project.title} - 이미지 ${index + 1}"
                                                         loading="lazy"
                                                         onload="this.setAttribute('width', this.naturalWidth); this.setAttribute('height', this.naturalHeight);" 
                                                         class="max-w-full h-auto" 
                                                         style="max-height: 80vh; display: block;"
                                                         loading="${index === 0 ? 'eager' : 'lazy'}" 
                                                         decoding="async"
                                                         fetchpriority="${index === 0 ? 'high' : 'low'}">
                                                </picture>
                                                ` : `
                                                <img src="${img}" alt="${project.title} - 이미지 ${index + 1}"
                                                     loading="lazy"
                                                     onload="this.setAttribute('width', this.naturalWidth); this.setAttribute('height', this.naturalHeight);" 
                                                     class="max-w-full h-auto" 
                                                     style="max-height: 80vh; display: block;"
                                                     loading="${index === 0 ? 'eager' : 'lazy'}" 
                                                     decoding="async"
                                                     fetchpriority="${index === 0 ? 'high' : 'low'}">
                                                `}
                                            </div>
                                        </div>
                                    </div>
                                `;
                                }).join('')}
                            </div>
                            <div class="swiper-pagination project-images-pagination-${project.id}"></div>
                            <div class="swiper-button-prev project-images-prev-${project.id}"></div>
                            <div class="swiper-button-next project-images-next-${project.id}"></div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            imagesHTML = `
                <div class="modal-section" data-section="media">
                    <h4 class="font-semibold ${theme.textColor}"><span>🖼️</span> 플랫폼 이미지</h4>
                    <div class="flex gap-3 md:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
                        ${project.images.map((img, index) => {
                            const webp = imagesWebp[index];
                            const preferredSrc = webp || img;
                            return `
                            <div class="flex-shrink-0 w-full sm:w-4/5 md:w-2/3 lg:w-1/2 snap-center">
                                <div class="aspect-video bg-gray-100 rounded-lg md:rounded-xl overflow-hidden shadow-md border ${theme.border} flex items-center justify-center transition-transform duration-300 md:hover:scale-[1.02]">
                                    ${webp ? `
                                    <picture>
                                        <source srcset="${webp}" type="image/webp">
                                        <img src="${img}" alt="${project.title}" 
                                             class="object-cover w-full h-full enlargeable-media cursor-pointer" 
                                             data-media-type="image" 
                                             data-src="${preferredSrc}"
                                             loading="${index === 0 ? 'eager' : 'lazy'}"
                                             decoding="async"
                                             fetchpriority="${index === 0 ? 'high' : 'low'}" />
                                    </picture>
                                    ` : `
                                    <img src="${img}" alt="${project.title}" 
                                         class="object-cover w-full h-full enlargeable-media cursor-pointer" 
                                         data-media-type="image" 
                                         data-src="${preferredSrc}"
                                         loading="${index === 0 ? 'eager' : 'lazy'}"
                                         decoding="async"
                                         fetchpriority="${index === 0 ? 'high' : 'low'}" />
                                    `}
                                </div>
                            </div>
                        `;
                        }).join('')}
                    </div>
                </div>
            `;
        }
    }
    
    let videosHTML = '';
    if (project.videos && project.videos.length > 0) {
        const aspectRatio = project.id === 4 ? 'aspect-video' : 'aspect-video';
        const maxWidth = project.id === 4 ? 'max-w-full md:max-w-3xl' : 'max-w-full md:max-w-3xl';
        const bgColor = project.id === 4 ? 'bg-black' : 'bg-gray-100';
        const objectFit = project.id === 4 ? 'object-contain' : 'object-cover';
        
        videosHTML = `
            <div class="modal-section" data-section="media">
                <h4 class="font-semibold ${theme.textColor}"><span>📹</span> 시연 영상</h4>
                ${project.videos.map(video => {
                    if (project.id === 4) {
                        return `
                    <div class="${maxWidth} mx-auto rounded-lg md:rounded-xl overflow-hidden shadow-md ${bgColor} mb-3 md:mb-4">
                        <div class="${aspectRatio}">
                            <video class="w-full h-full ${objectFit}" controls preload="metadata">
                                <source src="${video.src}" type="${video.type || 'video/mp4'}">
                                브라우저가 비디오를 지원하지 않습니다.
                            </video>
                        </div>
                    </div>
                `;
                    } else {
                        return `
                    <div class="${maxWidth} mx-auto rounded-lg md:rounded-xl overflow-hidden shadow-md ${bgColor} mb-3 md:mb-4">
                        <div class="${aspectRatio}">
                            <video class="w-full h-full ${objectFit} enlargeable-media" controls preload="metadata" data-media-type="video" data-src="${video.src}">
                                <source src="${video.src}" type="${video.type || 'video/mp4'}">
                                브라우저가 비디오를 지원하지 않습니다.
                            </video>
                        </div>
                    </div>
                `;
                    }
                }).join('')}
            </div>
        `;
    }
    
    let specialContentHTML = '';
    if (project.hasSpecialContent && project.specialContentType === 'game') {
        specialContentHTML = `
            <div class="w-full max-w-full mx-auto bg-gray-100 rounded-lg mb-6 overflow-hidden relative game-container-responsive" id="modal-game-container-${project.id}" style="max-height: 70vh; height: min(70vh, 480px);">
                <canvas id="modal-maze-game-${project.id}" class="w-full h-full" style="max-width: 100%; max-height: 100%; object-fit: contain;"></canvas>
                <div class="absolute top-2 right-2">
                    <button id="modal-pause-toggle-${project.id}" class="bg-gray-800 text-white text-[10px] sm:text-xs px-3 py-1.5 rounded shadow hover:bg-gray-700 transition-colors">
                        일시정지
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
        specialContentHTML = `
            <div class="modal-section" data-section="unity-game">
                <h4 class="font-semibold ${theme.textColor}"><span>🎮</span> 게임 플레이</h4>
                <div class="mb-4 md:mb-6 mt-3">
                    <p class="text-gray-600 p-3 bg-gray-50 rounded-lg border-l-4 ${theme.border}">
                        <strong>📝 참고:</strong> 이 게임은 PC를 기준으로 만들어진 게임입니다. 모바일 환경에서는 최적의 경험을 제공하지 못할 수 있습니다.
                    </p>
                </div>
                <div
                    class="w-full bg-gray-900 rounded-lg relative flex items-center justify-center unity-game-container-responsive"
                    id="unity-game-container-${project.id}"
                    style="aspect-ratio: 16/9; max-width: min(1200px, 90vw); max-height: 70vh; width: 100%; margin: 0 auto; overflow: hidden; border: 1px solid rgba(255,255,255,0.06);"
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
                            <p class="text-center text-gray-600 mt-3">WASD 또는 방향키로 이동하세요!</p>
            </div>
        `;
    }
    
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
                        <span class="font-medium">데모</span>
                    </a>
                ` : ''}
            </div>
        `;
    }
    
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
            return `<li class="flex items-center">
                <span class="inline-block mr-2 text-emerald-600">✓</span>
                <span class="text-sm text-gray-800">${formatted}</span>
            </li>`;
        }).join('');
        
        reflectionHTML = `
            <div class="bg-gradient-to-r ${theme.reflectionGradient} p-4 md:p-6 rounded-lg border-l-4 ${theme.reflectionBorder} reflection-box modal-section" data-section="reflection">
                <h4 class="font-semibold ${theme.textColor}"><span>📊</span> 성과 및 배운 점</h4>
                <div class="mb-5">
                    <h5 class="font-semibold text-gray-800">주요 성과</h5>
                    <ul class="list-none space-y-2">
                        ${achievementsHTML}
                    </ul>
                </div>
                <div class="pt-4 border-t border-gray-200">
                    <h5 class="font-semibold text-gray-800">회고 및 향후 계획</h5>
                    <p class="text-gray-700 leading-relaxed">${learnings}</p>
                </div>
            </div>
        `;
    } else {
        let conciseReflection = project.reflection || '';
        if (typeof conciseReflection === 'string') {
            conciseReflection = conciseReflection.split('.').filter(s => s.trim()).slice(0, 2).join('.') + '.';
        }
        
        reflectionHTML = `
            <div class="bg-gradient-to-r ${theme.reflectionGradient} p-4 md:p-6 rounded-lg border-l-4 ${theme.reflectionBorder} reflection-box modal-section" data-section="reflection">
                <h4 class="font-semibold ${theme.textColor}"><span>💬</span> 회고</h4>
                <p class="text-gray-700 leading-relaxed">${conciseReflection}</p>
            </div>
        `;
    }
    
    const technicalTroubleshootingHTML = createTechnicalTroubleshooting(project, theme);

    return `
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50 project-modal modal-overlay" data-project-id="${project.id}">
            <div class="bg-white rounded-lg md:rounded-xl shadow-2xl max-w-4xl w-full max-w-none sm:max-w-4xl max-h-[90vh] overflow-hidden flex flex-col modal-container">
                <div class="bg-gradient-to-r ${theme.gradient} h-2"></div>
                <button class="close-modal text-gray-400 hover:text-gray-600 text-2xl md:text-3xl leading-none min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors" data-project-id="${project.id}">&times;</button>
                <div class="overflow-y-auto flex-1 p-4 md:p-6">
                    <div class="static pb-2 mb-4 md:mb-6 md:pb-0 modal-section" data-section="header">
                        <div class="flex justify-between items-start">
                            <div class="flex-1 pr-2">
                                <h3 class="font-semibold ${theme.text} title-emphasis">${project.title}</h3>
                                <div class="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 md:gap-3">
                                    ${(() => {
                                        const isTeamProject = [1, 5, 6].includes(project.id);
                                        let teamRole = '';
                                        if (isTeamProject) {
                                            if (project.id === 1) {
                                                teamRole = '프론트엔드 전체 구현 / 백엔드 연동 / UI 기획 및 디버깅 주도';
                                            } else if (project.id === 5) {
                                                teamRole = '풀스택 개발 / AI 분석 시스템 구축 / 데이터베이스 설계 / UI/UX 기획';
                                            } else if (project.id === 6) {
                                                teamRole = '맵 제작 및 설계 / 충돌 판정 시스템 / 피격 처리 구현';
                                            }
                                            return `<span class="px-2 py-1 md:px-3 md:py-1 ${theme.bg} ${theme.text} rounded-full text-xs md:text-sm font-medium">팀 프로젝트 · ${teamRole}</span>`;
                                        } else {
                                            return `<span class="px-2 py-1 md:px-3 md:py-1 ${theme.bg} ${theme.text} rounded-full text-xs md:text-sm font-medium">개인 프로젝트</span>`;
                                        }
                                    })()}
                                    <span class="px-2 py-1 md:px-3 md:py-1 ${theme.bg} ${theme.text} rounded-full text-xs md:text-sm font-medium"><strong>기간</strong>: ${project.period}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    ${linksHTML}
                    
                    ${project.id === 1 ? `
                        <div class="mb-4 md:mb-6">
                            <p class="text-gray-600 p-3 bg-gray-50 rounded-lg border-l-4 border-sky-400">
                                <strong>📝 참고:</strong> 이 프로젝트는 <strong>로컬(Node.js + MySQL)</strong>에서 재현 가능하도록 공개했으며, <br>운영 리소스 이슈로 <strong>Live Demo는 현재 제공하지 않습니다.</strong> 실행 방법은 GitHub README를 참고해주세요.
                            </p>
                        </div>
                    ` : ''}
                    
                    ${project.id === 3 ? `
                        <div class="mb-4 md:mb-6">
                            <p class="text-gray-600 p-3 bg-gray-50 rounded-lg border-l-4 border-purple-400">
                                <strong>📝 참고:</strong> 이 게임은 포트폴리오 웹사이트에 내장된 데모입니다. GitHub 링크는 포트폴리오 웹 저장소를 가리키며, 게임 소스 코드는 <code class="px-1 py-0.5 bg-gray-200 rounded text-xs">Projects/3D_Maze/maze-game.js</code>에서 확인하실 수 있습니다.
                            </p>
                        </div>
                    ` : ''}
                    
                    ${heroSummaryHTML}
                    
                    <div class="modal-section" data-section="overview">
                        <h4 class="font-semibold ${theme.textColor}">프로젝트 개요</h4>
                        <p class="text-gray-700 leading-relaxed line-clamp-3 md:line-clamp-none">${conciseDescription}</p>
                    </div>
                    
                    <div class="modal-section" data-section="features">
                        <h4 class="font-semibold ${theme.textColor}"><span>📌</span> 주요 기능</h4>
                        ${project.id === 5 ? `
                            <ul class="list-none text-gray-700 space-y-3">
                                ${project.mainFeatures.map(feature => {
                                    // ":" 기준으로 분리하여 "무엇 + 왜" 구조로 표시
                                    const parts = feature.split(':');
                                    if (parts.length === 2) {
                                        return `
                                            <li class="flex items-start">
                                                <span class="flex-shrink-0 mr-3 ${theme.check} leading-none mt-0.5">•</span>
                                                <div class="flex-1">
                                                    <span class="font-medium text-gray-900">${parts[0]}:</span>
                                                    <span>${parts[1]}</span>
                                                </div>
                                            </li>
                                        `;
                                    }
                                    return `
                                        <li class="flex items-start">
                                            <span class="flex-shrink-0 mr-3 ${theme.check} leading-none mt-0.5">•</span>
                                            <span class="flex-1">${feature}</span>
                                        </li>
                                    `;
                                }).join('')}
                            </ul>
                        ` : mainFeaturesHTML}
                    </div>
                    
                    ${videosHTML}
                    ${!videosHTML && imagesHTML ? imagesHTML : ''}
                    ${videosHTML && imagesHTML ? imagesHTML.replace('data-section="media"', 'data-section="media-images"') : ''}
                    
                    ${project.id === 3 && project.hasSpecialContent ? `
                        <div class="modal-section" data-section="gameplay">
                            <h4 class="font-semibold ${theme.textColor}"><span>🎮</span> 게임 플레이</h4>
                            <div class="mb-4 md:mb-6 mt-3">
                                <p class="text-gray-600 p-3 bg-gray-50 rounded-lg border-l-4 ${theme.border}">
                                    <strong>📝 참고:</strong> 이 게임은 PC를 기준으로 만들어진 게임입니다. 모바일 환경에서는 최적의 경험을 제공하지 못할 수 있습니다.
                                </p>
                            </div>
                            ${specialContentHTML}
                            <p class="text-center text-gray-600 mt-3">방향키 또는 마우스로 판을 기울여 공을 굴리세요!</p>
                        </div>
                    ` : ''}
                    
                    ${project.hasSpecialContent && project.specialContentType === 'unity-game' ? specialContentHTML : ''}
                    
                    <div class="modal-section" data-section="technologies">
                        <h4 class="font-semibold ${theme.textColor}"><span>🔧</span> 사용 기술</h4>
                        ${project.id === 5 ? createGroupedTechStack(project, theme) : (() => {
                            if (!Array.isArray(project.technologies) || project.technologies.length === 0) {
                                return '<div class="flex flex-wrap gap-2 mb-3 md:mb-4"></div>';
                            }
                            
                            const techs = project.technologies;
                            const totalCount = techs.length;
                            
                            if (totalCount <= 6) {
                                return `
                                    <div class="flex flex-wrap gap-2 mb-3 md:mb-4">
                                        ${techs.map(tech => `
                                            <span class="px-2 py-1 md:px-3 md:py-1.5 ${theme.bg} ${theme.text} rounded-full tech-tag text-xs md:text-sm font-medium">${tech}</span>
                                        `).join('')}
                                    </div>
                                `;
                            }
                            
                            // 7개 이상이면 위아래로 나누기
                            // 짝수면 반으로 나누고, 홀수면 위쪽에 하나 더 많이
                            const firstRowCount = Math.ceil(totalCount / 2);
                            const secondRowCount = totalCount - firstRowCount;
                            
                            const firstRow = techs.slice(0, firstRowCount);
                            const secondRow = techs.slice(firstRowCount);
                            
                            return `
                                <div class="flex flex-col mb-3 md:mb-4" style="gap: 0;">
                                    <div class="flex flex-wrap gap-2">
                                        ${firstRow.map(tech => `
                                            <span class="px-2 py-1 md:px-3 md:py-1.5 ${theme.bg} ${theme.text} rounded-full tech-tag text-xs md:text-sm font-medium">${tech}</span>
                                        `).join('')}
                                    </div>
                                    ${secondRow.length > 0 ? `
                                        <div class="flex flex-wrap gap-2 -mt-1">
                                            ${secondRow.map(tech => `
                                                <span class="px-2 py-1 md:px-3 md:py-1.5 ${theme.bg} ${theme.text} rounded-full tech-tag text-xs md:text-sm font-medium">${tech}</span>
                                            `).join('')}
                                        </div>
                                    ` : ''}
                                </div>
                            `;
                        })()}
                        ${project.technologyRationale && project.technologyRationale.length > 0 ? `
                            <div class="mt-3 md:mt-4">
                                <h5 class="font-semibold ${theme.textColor}">왜 이 기술을 썼나요?</h5>
                                <ul class="list-none text-gray-700 space-y-1.5">
                                    ${project.technologyRationale.map(item => `
                                        <li class="flex items-start">
                                            <span class="flex-shrink-0 mr-2 ${theme.check} leading-none mt-0.5">•</span>
                                            <span class="flex-1">${item}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                    
                    ${technicalTroubleshootingHTML}
                    
                    <div class="modal-section" data-section="target-users">
                        <h4 class="font-semibold ${theme.textColor}"><span>👥</span> 대상 사용자</h4>
                        <p class="text-gray-700 leading-relaxed">${conciseTargetUsers}</p>
                    </div>
                    
                    ${reflectionHTML}
                    
                    ${project.pdfPath ? `
                        <div class="modal-section" data-section="pdf">
                            <h4 class="font-semibold ${theme.textColor}"><span>📄</span> 프로젝트 자료</h4>
                            <div class="bg-gray-100 rounded-lg md:rounded-xl overflow-hidden shadow-md">
                                <div class="p-2 md:p-3 bg-gray-200 border-b border-gray-300 flex items-center justify-between">
                                    <span class="font-medium text-gray-700">${project.title}</span>
                                    <div class="flex items-center gap-3">
                                        <span class="text-xs text-gray-500" id="project-pdf-page-info-${project.id}">로딩 중...</span>
                                        <a href="${encodeURI(project.pdfPath)}" target="_blank" class="text-xs ${theme.textColor} hover:underline">새 탭에서 열기</a>
                                    </div>
                                </div>
                                <div class="bg-white p-4">
                                    <div id="project-pdf-container-${project.id}" class="pdf-swiper-container"></div>
                                </div>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

function renderProjectCards() {
    const container = document.getElementById('projects-container');
    if (!container) return;
    
    const sortedProjects = projectsData
        .map((project, index) => ({ ...project, _originalIndex: index }))
        .sort((a, b) => {
            const aFeatured = a.featured ? 1 : 0;
            const bFeatured = b.featured ? 1 : 0;
            if (aFeatured !== bFeatured) return bFeatured - aFeatured;
            return a._originalIndex - b._originalIndex;
        })
        .map(({ _originalIndex, ...rest }) => rest);
    
    container.style.opacity = '0';
    container.style.visibility = 'hidden';
    container.style.pointerEvents = 'auto';
    
    container.innerHTML = sortedProjects.map((project, index) => createProjectCard(project, index)).join('');
    
    const cards = container.querySelectorAll('.project-card-preview');
    cards.forEach(card => {
        const existingHandler = card._clickHandler;
        if (existingHandler) {
            card.removeEventListener('click', existingHandler);
        }
        
        const clickHandler = function(e) {
            e.preventDefault();
            e.stopPropagation();
            const projectId = parseInt(card.dataset.projectId);
            if (projectId && !isNaN(projectId)) {
                showProjectModal(projectId);
            }
        };
        
        card._clickHandler = clickHandler;
        card.addEventListener('click', clickHandler);
    });
    
    initProjectCardAnimations();
    
    if (typeof window.reinitAnimations === 'function') {
        setTimeout(() => {
            window.reinitAnimations();
        }, 100);
    }
    
    requestAnimationFrame(() => {
        container.style.transition = 'opacity 0.3s ease-in, visibility 0.3s ease-in';
        container.style.opacity = '1';
        container.style.visibility = 'visible';
        container.style.pointerEvents = 'auto';
    });
}

function resetModalScroll(modal) {
    const scrollContainer = modal.querySelector('.overflow-y-auto');
    if (scrollContainer) {
        scrollContainer.scrollTop = 0;
    }
}

function initProjectCardAnimations() {
    const cards = document.querySelectorAll('.project-card-item');
    if (cards.length === 0) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

function showProjectModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;
    
    const existingModal = document.querySelector('.project-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modalHTML = createProjectModal(project);
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.querySelector(`.project-modal[data-project-id="${projectId}"]`);
    const overlay = modal;
    const container = modal.querySelector('.modal-container');
    
    modal.querySelector('.close-modal').addEventListener('click', () => {
        closeProjectModal(projectId);
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeProjectModal(projectId);
        }
    });
    
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeProjectModal(projectId);
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
    
    const isMobile = window.innerWidth < 768;
    
    // 배경 스크롤 방지
    if (isMobile) {
        // 현재 스크롤 위치 저장
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
        document.body.dataset.scrollY = scrollY;
    } else {
        // PC에서도 스크롤바 너비 보정하여 레이아웃 시프트 방지
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            document.body.dataset.scrollbarWidth = scrollbarWidth;
        }
    }
    
    // 모바일에서는 애니메이션 없이 즉시 표시하여 성능 개선
    if (isMobile) {
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
        container.style.opacity = '1';
        container.style.transform = 'none';
        container.style.pointerEvents = 'auto';
        overlay.style.transition = 'none';
        container.style.transition = 'none';
    } else {
        const yDistance = 8;
        const duration = 0.25;
        
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'auto';
        container.style.opacity = '0';
        container.style.transform = `scale(0.97) translateY(${yDistance}px)`;
        container.style.pointerEvents = 'auto';
        
        requestAnimationFrame(() => {
            overlay.style.transition = 'opacity 0.2s ease-out';
            container.style.transition = `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`;
            
            requestAnimationFrame(() => {
                overlay.style.opacity = '1';
                container.style.opacity = '1';
                container.style.transform = 'scale(1) translateY(0)';
            });
        });
    }
    
    resetModalScroll(modal);
    initModalSectionAnimations(modal);
    initTroubleshootingAccordions(modal);
    
    if (project.hasSpecialContent && project.specialContentType === 'game') {
        setTimeout(() => {
            const canvasId = `modal-maze-game-${projectId}`;
            const containerId = `modal-game-container-${projectId}`;
            const timerId = `modal-timer-${projectId}`;
            const levelId = `modal-level-${projectId}`;
            const instructionsId = `modal-game-instructions-${projectId}`;
            const pauseId = `modal-pause-toggle-${projectId}`;
            
            if (document.getElementById(canvasId) && document.getElementById(containerId)) {
                if (typeof initGame === 'function') {
                    initGame(canvasId, containerId, timerId, levelId, instructionsId, pauseId);
                } else {
                    console.error('initGame 함수를 찾을 수 없습니다.');
                }
            }
            
        }, 200);
    } else if (project.hasSpecialContent && project.specialContentType === 'unity-game') {
        setTimeout(() => {
            initUnityGame(projectId, project.unityGamePath);
        }, 300);
    }
    
    const hasOnlyImages = project.images && project.images.length > 0 && !project.videos && !project.hasSpecialContent;
    
    // JEIU 캠퍼스 익스플로러(id: 1)는 드래그바 방식 사용
    if (project.id === 1 && hasOnlyImages) {
        setTimeout(() => {
            initProjectImagesDragBar(project.id, project.images.length);
        }, 150);
    } else if (hasOnlyImages && typeof Swiper !== 'undefined') {
        setTimeout(() => {
            const swiperSelector = `.project-images-swiper-${project.id}`;
            const swiperElement = modal.querySelector(swiperSelector);
            
            if (swiperElement && !swiperElement.swiper) {
                new Swiper(swiperSelector, {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    pagination: {
                        el: `.project-images-pagination-${project.id}`,
                        clickable: true,
                        dynamicBullets: true,
                        renderBullet: function (index, className) {
                            return '<span class="' + className + '">' + (index + 1) + '</span>';
                        },
                    },
                    navigation: {
                        nextEl: `.project-images-next-${project.id}`,
                        prevEl: `.project-images-prev-${project.id}`,
                    },
                    keyboard: {
                        enabled: true,
                    },
                    mousewheel: {
                        forceToAxis: true,
                    },
                    loop: false,
                });
            }
        }, 150);
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
                    img.loading = 'lazy';
                    img.onload = function() {
                        this.setAttribute('width', this.naturalWidth);
                        this.setAttribute('height', this.naturalHeight);
                    };
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
    
    if (project.pdfPath && typeof window.renderPdfPages === 'function') {
        setTimeout(() => {
            const pdfContainerId = `project-pdf-container-${project.id}`;
            const pageInfoElementId = `project-pdf-page-info-${project.id}`;
            const pdfPath = encodeURI(project.pdfPath);
            window.renderPdfPages(pdfPath, pdfContainerId, pageInfoElementId);
        }, 200);
    }
}

const unityInstances = {};

function initUnityGame(projectId, gamePath) {
    const container = document.getElementById(`unity-game-container-${projectId}`);
    const canvasContainer = document.getElementById(`unity-canvas-container-${projectId}`);
    const loadingBar = document.getElementById(`unity-loading-bar-${projectId}`);
    const progressBar = document.getElementById(`unity-progress-bar-${projectId}`);
    
    if (!container || !canvasContainer) {
        console.error('Unity 게임 컨테이너를 찾을 수 없습니다.');
        return;
    }
    
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
    canvas.style.maxHeight = '100%';
    canvas.style.margin = '0 auto';
    canvas.setAttribute('tabindex', '-1');
    canvasContainer.innerHTML = '';
    canvasContainer.appendChild(canvas);
    
    const buildUrl = gamePath + "/Build";
    const loaderUrl = buildUrl + "/Build.loader.js";
    
    const existingScript = document.querySelector(`script[data-unity-loader="${projectId}"]`);
    if (existingScript) {
        existingScript.remove();
    }
    
    const script = document.createElement('script');
    script.src = loaderUrl;
    script.setAttribute('data-unity-loader', projectId);
    
    script.onload = () => {
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
        
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        
        createUnityInstance(canvas, config, (progress) => {
            if (progressBar) {
                progressBar.style.width = (100 * progress) + '%';
            }
        }).then((unityInstance) => {
            unityInstances[projectId] = unityInstance;
            
            setTimeout(() => {
                if (loadingBar) {
                    loadingBar.style.display = 'none';
                }
                console.log('Unity 게임이 준비되었습니다.');
            }, 1000);
        }).catch((message) => {
            console.error('Unity 게임 로드 실패:', message);
            if (loadingBar) {
                let errorMessage = message;
                let solutionText = '';
                
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
    
    const loaderScript = document.querySelector(`script[data-unity-loader="${projectId}"]`);
    if (loaderScript) {
        loaderScript.remove();
    }
}

function closeProjectModal(projectId) {
    const modal = document.querySelector(`.project-modal[data-project-id="${projectId}"]`);
    if (modal) {
        const project = projectsData.find(p => p.id === projectId);
        
        if (project && project.hasSpecialContent && project.specialContentType === 'unity-game') {
            cleanupUnityGame(projectId);
        }
        
        const pdfContainerId = `project-pdf-container-${projectId}`;
        if (typeof window.pdfSwiperInstances !== 'undefined' && window.pdfSwiperInstances[pdfContainerId]) {
            try {
                window.pdfSwiperInstances[pdfContainerId].destroy(true, true);
            } catch (e) {
                console.warn('PDF Swiper 인스턴스 정리 중 오류:', e);
            }
            delete window.pdfSwiperInstances[pdfContainerId];
        }
        
        const swiperElement = modal.querySelector(`.project-images-swiper-${projectId}`);
        if (swiperElement && swiperElement.swiper) {
            try {
                swiperElement.swiper.destroy(true, true);
            } catch (e) {
                console.warn('Swiper 인스턴스 정리 중 오류:', e);
            }
        }
        
        const overlay = modal;
        const container = modal.querySelector('.modal-container');
        const isMobile = window.innerWidth < 768;
        const yDistance = isMobile ? 4 : 8;
        const duration = isMobile ? 0.2 : 0.25;
        
        overlay.style.transition = 'opacity 0.2s ease-out';
        container.style.transition = `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`;
        
        overlay.style.opacity = '0';
        container.style.opacity = '0';
        container.style.transform = `scale(0.97) translateY(${yDistance}px)`;
        
        setTimeout(() => {
            modal.remove();
            
            // 스크롤 위치 및 스타일 복원
            if (isMobile) {
                const scrollY = document.body.dataset.scrollY || '0';
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                document.body.style.overflow = '';
                window.scrollTo(0, parseInt(scrollY, 10));
                delete document.body.dataset.scrollY;
            } else {
                // PC에서 스크롤바 관련 스타일 복원
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
                if (document.body.dataset.scrollbarWidth) {
                    document.body.style.paddingRight = '';
                    delete document.body.dataset.scrollbarWidth;
                }
            }
        }, duration * 1000);
    }
}

function initModalSectionAnimations(modal) {
    const sections = modal.querySelectorAll('.modal-section');
    const isMobile = window.innerWidth < 768;
    
    // 모바일에서는 섹션 애니메이션 비활성화하여 스크롤 성능 개선
    if (isMobile) {
        sections.forEach((section) => {
            section.style.opacity = '1';
            section.style.transform = 'none';
            section.style.transition = 'none';
        });
        return;
    }
    
    const yDistance = 16;
    const duration = 0.25;
    
    // 모달이 열릴 때 이미 보이는 섹션들은 즉시 표시
    const modalContainer = modal.querySelector('.modal-container');
    if (modalContainer) {
        const containerRect = modalContainer.getBoundingClientRect();
        sections.forEach((section) => {
            const sectionRect = section.getBoundingClientRect();
            // 이미 뷰포트에 보이는 섹션은 즉시 표시
            if (sectionRect.top < containerRect.bottom && sectionRect.bottom > containerRect.top) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
                section.style.transition = 'none';
            } else {
                section.style.opacity = '0';
                section.style.transform = `translateY(${yDistance}px)`;
                section.style.transition = `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`;
            }
        });
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // 이미 표시된 섹션은 건너뛰기
                if (entry.target.style.opacity !== '1') {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // 아직 표시되지 않은 섹션만 관찰
    sections.forEach((section) => {
        if (section.style.opacity !== '1') {
            observer.observe(section);
        }
    });
}

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

function initTroubleshootingAccordions(modal) {
    const toggles = modal.querySelectorAll('.troubleshooting-toggle');
    
    toggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
            const accordionId = toggle.getAttribute('data-accordion-id');
            const content = document.getElementById(accordionId);
            const arrow = toggle.querySelector('[data-arrow]');
            const plusIcon = arrow?.querySelector('.plus-icon');
            const minusIcon = arrow?.querySelector('.minus-icon');
            
            if (!content) return;
            
            const isHidden = content.classList.contains('hidden');
            
            if (isHidden) {
                content.classList.remove('hidden');
                content.style.maxHeight = '0';
                content.style.overflow = 'hidden';
                content.style.transition = 'max-height 0.3s ease-out, opacity 0.3s ease-out';
                content.style.opacity = '0';
                
                requestAnimationFrame(() => {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.style.opacity = '1';
                });
                
                // + 버튼을 - 버튼으로 변경
                if (plusIcon) plusIcon.classList.add('hidden');
                if (minusIcon) minusIcon.classList.remove('hidden');
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
                
                requestAnimationFrame(() => {
                    content.style.maxHeight = '0';
                    content.style.opacity = '0';
                });
                
                setTimeout(() => {
                    content.classList.add('hidden');
                }, 300);
                
                // - 버튼을 + 버튼으로 변경
                if (plusIcon) plusIcon.classList.remove('hidden');
                if (minusIcon) minusIcon.classList.add('hidden');
            }
        });
    });
}

// 프로젝트 이미지 드래그바 관련 함수
let projectImagesRafId = {};
let isDraggingProjectBar = {};
let projectDragBarStartX = {};
let projectDragBarStartScroll = {};

function updateProjectImagesDragBar(projectId) {
    if (projectImagesRafId[projectId]) {
        cancelAnimationFrame(projectImagesRafId[projectId]);
    }
    projectImagesRafId[projectId] = requestAnimationFrame(() => {
        const carousel = document.getElementById(`project-images-carousel-${projectId}`);
        const dragBarThumb = document.getElementById(`project-images-drag-bar-thumb-${projectId}`);
        if (!carousel || !dragBarThumb) return;
        
        const scrollWidth = carousel.scrollWidth - carousel.clientWidth;
        if (scrollWidth <= 0) {
            dragBarThumb.style.width = '100%';
            dragBarThumb.style.left = '0%';
            return;
        }
        
        const visibleRatio = carousel.clientWidth / carousel.scrollWidth;
        const thumbWidth = visibleRatio * 100;
        // 최소 너비는 15%, 최대 너비는 100%
        const minThumbWidth = 15;
        const maxThumbWidth = 100;
        const finalThumbWidth = Math.max(minThumbWidth, Math.min(maxThumbWidth, thumbWidth));
        
        const scrollPercent = (carousel.scrollLeft / scrollWidth) * 100;
        const maxLeft = 100 - finalThumbWidth;
        const finalLeft = Math.max(0, Math.min(maxLeft, scrollPercent));
        
        dragBarThumb.style.width = finalThumbWidth + '%';
        dragBarThumb.style.left = finalLeft + '%';
        
        projectImagesRafId[projectId] = null;
    });
}

function initProjectImagesDragBar(projectId, imageCount) {
    const dragBar = document.getElementById(`project-images-drag-bar-${projectId}`);
    const carousel = document.getElementById(`project-images-carousel-${projectId}`);
    const prevBtn = document.getElementById(`project-images-prev-${projectId}`);
    const nextBtn = document.getElementById(`project-images-next-${projectId}`);
    
    if (!dragBar || !carousel) return;
    
    const dragBarThumb = document.getElementById(`project-images-drag-bar-thumb-${projectId}`);
    
    // 초기 드래그바 업데이트
    setTimeout(() => updateProjectImagesDragBar(projectId), 100);
    
    // 화살표 버튼 클릭 이벤트
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const imageWidth = carousel.clientWidth > 768 ? carousel.clientWidth * 0.67 : carousel.clientWidth * 0.8;
            const gap = 24;
            const cardTotalWidth = imageWidth + gap;
            carousel.scrollBy({
                left: -cardTotalWidth,
                behavior: 'smooth'
            });
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const imageWidth = carousel.clientWidth > 768 ? carousel.clientWidth * 0.67 : carousel.clientWidth * 0.8;
            const gap = 24;
            const cardTotalWidth = imageWidth + gap;
            carousel.scrollBy({
                left: cardTotalWidth,
                behavior: 'smooth'
            });
        });
    }
    
    // 드래그바 클릭 시 스크롤
    dragBar.addEventListener('click', function(e) {
        if (e.target.id !== `project-images-drag-bar-thumb-${projectId}` && e.target !== dragBarThumb) {
            const dragBarRect = dragBar.getBoundingClientRect();
            const clickX = e.clientX - dragBarRect.left;
            const dragBarWidth = dragBarRect.width;
            const scrollWidth = carousel.scrollWidth - carousel.clientWidth;
            
            if (scrollWidth <= 0) return;
            
            // 클릭한 위치에 맞게 스크롤
            const clickPercent = clickX / dragBarWidth;
            const targetScroll = clickPercent * scrollWidth;
            
            carousel.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
            
            const updateInterval = setInterval(() => {
                updateProjectImagesDragBar(projectId);
            }, 16);
            
            setTimeout(() => {
                clearInterval(updateInterval);
                updateProjectImagesDragBar(projectId);
            }, 500);
        }
    });
    
    // thumb 드래그 시작
    if (dragBarThumb) {
        const startDrag = function(e) {
            isDraggingProjectBar[projectId] = true;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            projectDragBarStartX[projectId] = clientX;
            projectDragBarStartScroll[projectId] = carousel.scrollLeft;
            dragBarThumb.style.cursor = 'grabbing';
            e.preventDefault();
            e.stopPropagation();
        };
        
        dragBarThumb.addEventListener('mousedown', startDrag);
        dragBarThumb.addEventListener('touchstart', startDrag, { passive: false });
    }
    
    const handleMove = function(e) {
        if (!isDraggingProjectBar[projectId] || !carousel) return;
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const dragBarRect = dragBar.getBoundingClientRect();
        const dragBarWidth = dragBarRect.width;
        const scrollWidth = carousel.scrollWidth - carousel.clientWidth;
        
        if (scrollWidth <= 0) return;
        
        const deltaX = clientX - projectDragBarStartX[projectId];
        const scrollDelta = (deltaX / dragBarWidth) * scrollWidth;
        const newScrollLeft = Math.max(0, Math.min(scrollWidth, projectDragBarStartScroll[projectId] + scrollDelta));
        
        requestAnimationFrame(() => {
            carousel.scrollLeft = newScrollLeft;
            updateProjectImagesDragBar(projectId);
        });
        e.preventDefault();
    };
    
    const handleEnd = function() {
        if (isDraggingProjectBar[projectId]) {
            isDraggingProjectBar[projectId] = false;
            if (dragBarThumb) {
                dragBarThumb.style.cursor = 'grab';
            }
        }
    };
    
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);
    
    // 캐러셀 스크롤 이벤트
    carousel.addEventListener('scroll', () => {
        updateProjectImagesDragBar(projectId);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    renderProjectCards();
});

