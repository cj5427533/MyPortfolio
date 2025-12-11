// 프로젝트 데이터 구조
const projectsData = [
    {
        id: 1,
        title: "JEIU 캠퍼스 익스플로러 3D",
        thumbnail: "images/JEIU_Campus_1.png",
        shortDescription: "3D 공간에서 캠퍼스 정보를 직관적으로 탐색할 수 있도록 설계한 웹 애플리케이션. Three.js로 구현한 인터랙티브 맵에서 건물 클릭 시 이벤트 정보 확인 및 강의실 예약 기능을 제공합니다.",
        valueStatement: "복잡한 캠퍼스 구조를 3D 시각화로 직관적으로 탐색",
        period: "2025.03.26 ～ 2025.04.16",
        contribution: "프론트엔드 전체 구현 / 백엔드 연동 / UI 기획 및 디버깅 주도",
        fullDescription: "재능대학교 캠퍼스를 3D로 구현한 웹 플랫폼입니다. 학생들이 강의실을 예약하고 각 건물의 이벤트·캠페인 정보를 시각적으로 확인할 수 있는 서비스입니다.",
        mainFeatures: "Three.js로 3D 캠퍼스를 시각화하고, 건물 클릭 시 이벤트 정보 확인 및 강의실 예약이 가능한 서비스입니다.",
        technologies: ["Express.js", "HTML/CSS", "JavaScript", "MySQL", "Three.js"],
        technologyRationale: [
            "Three.js: 캠퍼스 건물과 동선을 3D로 시각화하여 공간 맥락을 직관적으로 전달",
            "Express.js + MySQL: 강의실 예약·이벤트 데이터 CRUD를 안정적으로 처리하는 전통적 웹 스택",
            "HTML/CSS + JavaScript: 3D 인터랙션과 UI를 한 화면에서 가볍게 통합 구현"
        ],
        technicalTroubleshooting: [
            {
                problem: "Three.js 3D 모델 로딩 시 초기 렌더링이 너무 느리고, 건물이 순차적으로 나타나며 사용자 경험이 좋지 않았습니다.",
                solution: "GLTFLoader를 사용해 모델을 로드하되, 로딩 중 프로그레스 바를 추가하고, 건물별로 LOD(Level of Detail)를 적용했습니다. 또한 초기 카메라 위치를 최적화하여 첫 렌더링 시 보이는 건물만 우선 로드하도록 개선했습니다.",
                result: "초기 로딩 시간이 약 40% 단축되었고, 사용자가 로딩 진행 상황을 확인할 수 있어 체감 대기 시간이 줄어들었습니다."
            },
            {
                problem: "건물 클릭 이벤트가 정확하게 작동하지 않고, 특히 겹쳐있는 건물에서 원하지 않는 건물이 선택되는 문제가 발생했습니다.",
                solution: "Raycasting을 사용해 마우스 클릭 위치에서 카메라 방향으로 광선을 쏘아 가장 가까운 건물을 정확히 감지하도록 구현했습니다. 또한 건물별로 고유한 ID를 부여하고, 클릭 이벤트에 디바운싱을 적용해 중복 클릭을 방지했습니다.",
                result: "건물 선택 정확도가 크게 향상되었고, 사용자가 원하는 건물 정보를 정확하게 확인할 수 있게 되었습니다."
            },
            {
                problem: "강의실 예약 데이터를 MySQL에서 가져올 때, 동시에 여러 사용자가 같은 강의실을 예약하려 할 때 중복 예약이 발생하는 문제가 있었습니다.",
                solution: "트랜잭션과 SELECT FOR UPDATE를 사용해 예약 시 해당 강의실 레코드를 잠금 처리했습니다. 또한 프론트엔드에서도 예약 가능 여부를 실시간으로 체크하고, 백엔드에서 최종 검증을 거치도록 이중 체크 로직을 구현했습니다.",
                result: "중복 예약 문제가 완전히 해결되었고, 동시 접속자가 많아도 데이터 일관성이 유지되었습니다."
            }
        ],
        targetUsers: "재능대학교 학생과 방문객들을 위해 만들었습니다. 특히 처음 학교에 오는 신입생들이 복잡한 캠퍼스 건물을 쉽게 찾고, 강의실도 간편하게 예약할 수 있게 하고 싶었습니다.",
        reflection: {
            achievements: [
                "초기 로딩 시간 40% 단축 (LOD 적용 및 우선순위 로딩)",
                "건물 선택 정확도 대폭 향상 (Raycasting 기반 정확한 감지)",
                "중복 예약 문제 완전 해결 (트랜잭션 및 SELECT FOR UPDATE)"
            ],
            learnings: "3D 웹 개발에서 성능 최적화가 사용자 경험에 직접적인 영향을 미친다는 점을 깨달았습니다. Raycasting 같은 수학적 개념을 실제 문제 해결에 적용하며, 기술적 깊이와 실용성을 동시에 추구하는 개발 철학을 확립했습니다. 향후 3D 인터랙션 프로젝트에서도 LOD와 우선순위 로딩 전략을 우선 적용하겠습니다."
        },
        images: [
            "images/JEIU_Campus_1.png",
            "images/JEIU_Campus_2.png",
            "images/JEIU_Campus_3.png"
        ],
        videos: [],
        colorTheme: "sky",
        hasSpecialContent: false,
        heroSummary: {
            purpose: "3D 캠퍼스 맵과 강의실 예약, 이벤트 정보를 한 화면에서 직관적으로 제공하는 웹 플랫폼",
            roles: ["프론트엔드 개발", "백엔드 연동", "3D 시각화", "UI/UX 기획"],
            keyOutcomes: [
                { label: "초기 로딩 시간", value: "40% 단축", bold: true },
                { label: "건물 선택 정확도", value: "대폭 향상", bold: true },
                { label: "중복 예약 문제", value: "완전 해결", bold: true },
                { label: "사용자 만족도", value: "향상", bold: false }
            ]
        }
    },
    {
        id: 2,
        title: "Portfolio Web - 인터랙티브 개인 사이트",
        thumbnail: "images/portfolio-screenshot.png",
        shortDescription: "히어로·프로젝트·수상·연락처를 한 페이지에 담고, Three.js 데모, Unity WebGL, PDF 뷰어, Cloudflare Worker 폼을 통합한 인터랙티브 포트폴리오.",
        valueStatement: "실사용 가능한 3D·게임·폼·자료 뷰를 정적 페이지에 통합해 한눈에 역량을 보여주는 쇼케이스",
        period: "2025.05.20 ~ 현재까지",
        contribution: "기획·디자인·프론트엔드·3D/게임 데모 연동·백엔드 폼 연동을 단독 수행",
        heroSummary: {
            purpose: "인터랙티브 웹 포트폴리오로 프로젝트·수상·연락을 한 번에 전달",
            roles: ["기획/디자인", "프론트엔드 개발", "3D·게임 데모 통합", "CI/CD 구축", "배포/운영"],
            keyOutcomes: [
                { label: "CI/CD 파이프라인", value: "자동 배포 구축", bold: true },
                { label: "3D·게임 데모", value: "웹에 직접 탑재", bold: true },
                { label: "연락 폼 성공률", value: "100% (Worker)", bold: true },
                { label: "실서비스 운영", value: "성능 최적화", bold: true }
            ]
        },
        fullDescription: "정적 HTML 기반이지만 프로젝트 데이터 파일만 수정하면 카드와 모달이 자동 렌더링됩니다. Three.js 미로 게임, Unity WebGL 빌드, PDF.js 기반 수상 자료 뷰어, Cloudflare Worker/Discord 연동 연락처 폼 등을 한 페이지에 통합해 '보여줄 수 있는' 포트폴리오를 목표로 제작했습니다. Netlify에 배포하여 Git 기반 CI/CD 파이프라인을 구축하고, 실제 서비스 환경에서 운영하며 성능 최적화와 사용자 피드백을 수집하는 경험을 했습니다.",
        mainFeatures: [
            "프로젝트 카드/모달 자동 생성: `js/projects-data.js` 수정만으로 UI 갱신",
            "3D·게임 데모 통합: Three.js 미로 게임과 Unity WebGL 빌드를 동일 페이지에 제공",
            "수상/제출물 뷰어: PDF.js + Swiper.js로 페이지별 슬라이드 뷰어 제공",
            "이미지 갤러리: Swiper.js로 프로젝트 이미지를 슬라이드 형태로 표시",
            "타이핑 효과: Typed.js로 히어로 섹션 태그라인에 동적 타이핑 효과 적용",
            "연락처 폼: Cloudflare Worker → Discord 알림 + D1 저장(확장 가능 API)",
            "반응형/애니메이션: Tailwind 유틸리티와 커스텀 애니메이션 스크립트로 인터랙션 구현",
            "CI/CD 자동화: Netlify와 GitHub 연동으로 코드 푸시 시 자동 빌드 및 배포",
            "실서비스 운영: 실제 URL을 통한 배포로 사용자 피드백 수집 및 성능 모니터링"
        ],
        technologies: ["Cloudflare Workers", "Git", "Giscus", "HTML/CSS", "Netlify", "Node.js", "PDF.js", "Swiper.js", "Tailwind CSS", "Three.js", "Typed.js", "Vanilla JavaScript"],
        technologyRationale: [
            "Tailwind CSS + 커스텀 CSS: 빠른 UI 반복과 일관된 디자인 시스템 유지",
            "데이터 드리븐 렌더링: `projects-data.js` → `projects-renderer.js`로 카드/모달 자동 생성",
            "Cloudflare Worker: 폼 데이터를 서버 없이 수집·검증하고 Discord/D1로 전달",
            "Node 서버(gzip/wasm): Unity WebGL 빌드와 정적 리소스를 올바른 헤더로 서빙",
            "Three.js + PDF.js: 브라우저에서 3D 데모와 PDF 뷰를 모두 제공",
            "Swiper.js: PDF 페이지와 이미지 갤러리를 슬라이드 형태로 제공하여 사용자 경험 향상",
            "Typed.js: 히어로 섹션 태그라인에 타이핑 효과를 적용하여 인터랙티브한 첫인상 제공",
            "Netlify: GitHub 연동 CI/CD로 코드 변경 시 자동 빌드 및 배포 환경 구축",
            "Git: 버전 관리 및 배포 파이프라인 자동화"
        ],
        technicalTroubleshooting: [
            {
                problem: "Unity WebGL 빌드를 파일 프로토콜로 열 때 wasm/gzip가 깨지며 로딩 실패.",
                solution: "Node 정적 서버(`server.js`)에서 MIME 타입과 `Content-Encoding: gzip` 헤더를 설정해 서빙.",
                result: "WebGL 빌드가 브라우저에서 정상 로드되고, 로딩 오류가 해소됨."
            },
            {
                problem: "Netlify에 배포할 때 빌드 과정에서 submodule 및 리소스 경로 오류가 발생했습니다.",
                solution: "Netlify 빌드 설정에서 환경 변수와 빌드 명령어를 명시적으로 지정하고, 리소스 경로를 상대 경로로 통일했습니다. 또한 Netlify의 캐시 관리 설정을 활용하여 빌드 시간을 최적화했습니다.",
                result: "빌드 오류가 해소되고 배포 파이프라인이 안정적으로 동작하며, 빌드 시간도 단축되었습니다."
            },
            {
                problem: "연락처 폼 전송 시 실패 원인 확인이 어려웠음.",
                solution: "Cloudflare Worker에서 요청 검증/로깅 후 Discord 웹훅 알림과 에러 메시지 반환을 분리 처리.",
                result: "성공/실패 피드백이 명확해지고, 폼 성공률이 안정적으로 유지됨."
            },
            {
                problem: "실서비스 배포 후 이미지 로딩이 느리고, 특히 모바일에서 성능이 저하되었습니다.",
                solution: "이미지 최적화와 지연 로딩(lazy loading)을 적용하고, Netlify의 CDN 기능을 활용해 이미지 캐싱을 개선했습니다. 또한 라우팅 설정을 최적화하여 불필요한 리다이렉트를 제거했습니다.",
                result: "이미지 로딩 속도가 개선되고, 모바일 환경에서의 성능이 향상되었으며, 실제 사용자 피드백을 반영하여 지속적으로 개선했습니다."
            },
            {
                problem: "프로젝트 카드가 늘어날 때 스타일 일관성이 무너질 위험.",
                solution: "색상 테마 매핑과 데이터 기반 렌더러(`projects-renderer.js`)로 카드/모달 UI를 통일.",
                result: "데이터 추가만으로도 동일한 UI 패턴을 유지하며 확장 가능."
            }
        ],
        targetUsers: "채용 담당자와 협업자를 포함해, 한 번의 스크롤로 역량·프로젝트·연락처를 확인하고 싶은 방문자.",
        reflection: {
            achievements: [
                "데이터 기반 카드/모달 자동화로 신규 프로젝트 추가 시간 단축",
                "Unity WebGL/Three.js/PDF.js/Worker까지 한 페이지에 통합",
                "연락 폼 Discord 알림 연동으로 실시간 응답 가능",
                "Git 기반 CI/CD 파이프라인 구축으로 코드 변경 시 자동 배포 환경 완성",
                "실서비스 배포를 통해 이미지 최적화 및 성능 개선 적용"
            ],
            learnings: "정적 사이트에서도 데이터 주도 설계와 올바른 헤더 설정만으로 WebGL·3D·폼 백엔드를 안정적으로 제공할 수 있음을 확인했습니다. 배포 환경에 맞춰 CORS·헤더·리소스 경로를 일관되게 관리하는 중요성을 체감했습니다. Netlify와 GitHub를 연동한 CI/CD 파이프라인을 구축하며, 코드 변경 시 자동으로 빌드 및 배포가 이루어지는 자동화 경험을 했습니다. 특히 빌드 과정에서 발생하는 submodule 및 경로 오류를 해결하며 배포 환경 안정화 역량을 키웠습니다. 실제 서비스 운영을 통해 이미지 최적화, 라우팅 설정, 성능 모니터링 등을 적용하며 실전 프론트엔드 최적화 경험을 쌓았고, 실제 사용자 피드백을 반영하여 지속적으로 개선하는 프로세스를 경험했습니다."
        },
        images: [
            "images/portfolio-screenshot.png"
        ],
        videos: [],
        colorTheme: "indigo",
        hasSpecialContent: false
    },
    {
        id: 3,
        title: "공 굴리기 미로 게임",
        thumbnail: "Projects/3D_Maze/스크린샷 2025-12-11 192508.png",
        shortDescription: "사용자 입력에 반응하는 물리 기반 인터랙션을 구현한 3D 미로 게임. Three.js 물리 엔진으로 실시간 판 기울기와 공의 움직임을 시뮬레이션하며, 키보드·마우스·터치 입력을 모두 지원합니다.",
        valueStatement: "물리 시뮬레이션을 통한 실시간 인터랙션 구현",
        period: "2025.05.17 ～ 2025.05.20",
        contribution: "기획부터 구현까지 전체 개발",
        fullDescription: "Three.js를 활용한 인터랙티브 3D 공 굴리기 미로 게임입니다. 사용자의 마우스나 키보드 조작에 반응하여 판을 기울이고 공을 굴려 목적지에 도달하는 게임입니다.",
        mainFeatures: "Three.js를 활용한 3D 미로에서 물리 시뮬레이션을 통해 공을 굴려 목적지에 도달하는 인터랙티브 게임입니다.",
        technologies: ["HTML/CSS", "JavaScript", "물리 시뮬레이션", "Three.js"],
        technologyRationale: [
            "Three.js: 브라우저에서 실시간 3D 렌더링을 수행하고 카메라·조명·오브젝트 제어",
            "커스텀 물리 시뮬레이션: 간단한 수학 모델로 충돌·마찰을 직접 구현해 퍼포먼스와 제어권 확보",
            "JavaScript 입력 처리: 키보드·마우스·터치를 단일 입력 파이프라인으로 묶어 크로스플랫폼 대응"
        ],
        technicalTroubleshooting: [
            {
                problem: "물리 시뮬레이션에서 공이 벽을 뚫고 나가거나, 판을 기울였을 때 공이 떨어지지 않고 공중에 떠있는 현상이 발생했습니다.",
                solution: "충돌 감지를 위해 AABB(Axis-Aligned Bounding Box) 알고리즘을 구현하고, 공의 위치와 속도를 매 프레임마다 업데이트하도록 했습니다. 또한 중력 가속도를 적용하고, 판의 기울기 각도에 따라 공에 힘을 가하는 벡터 계산을 정확히 구현했습니다.",
                result: "공이 자연스럽게 굴러가고, 벽과의 충돌이 정확하게 감지되어 게임 플레이가 안정적으로 작동하게 되었습니다."
            },
            {
                problem: "키보드, 마우스, 터치 입력을 모두 지원하려 했지만, 각 입력 방식마다 다른 좌표계와 이벤트 처리가 필요해 코드가 복잡해졌습니다.",
                solution: "입력 이벤트를 통합하는 InputManager 클래스를 만들어, 모든 입력을 공통된 '기울기 벡터' 형식으로 변환했습니다. 키보드는 방향키를 벡터로, 마우스는 드래그 거리를 벡터로, 터치는 터치 이동 거리를 벡터로 변환하여 동일한 물리 계산 함수에 전달하도록 했습니다.",
                result: "코드 중복이 줄어들고 유지보수가 쉬워졌으며, 새로운 입력 방식을 추가할 때도 InputManager만 수정하면 되었습니다."
            },
            {
                problem: "모바일에서 게임을 실행하면 프레임이 떨어지고, 특히 여러 개의 공이나 복잡한 미로에서 렌더링이 버벅거렸습니다.",
                solution: "requestAnimationFrame을 사용해 프레임율을 최적화하고, 불필요한 렌더링을 줄이기 위해 카메라가 보이지 않는 오브젝트는 렌더링하지 않도록 frustum culling을 적용했습니다. 또한 모바일에서는 그림자와 조명을 간소화하고, 텍스처 해상도를 낮춰 성능을 개선했습니다.",
                result: "모바일에서도 30fps 이상의 안정적인 프레임율을 유지할 수 있게 되었고, 게임 플레이 경험이 크게 향상되었습니다."
            }
        ],
        targetUsers: "포트폴리오를 구경하는 모든 분들을 위한 작은 게임입니다. 기술적인 설명만 읽는 것보다 직접 게임을 플레이해보면서 제가 구현한 물리 효과와 인터랙션을 체험해보실 수 있게 만들었습니다.",
        reflection: {
            achievements: [
                "모바일 환경에서 30fps 이상 안정적 프레임율 유지 (frustum culling 및 최적화)",
                "코드 중복 대폭 감소 (InputManager로 입력 통합)",
                "물리 시뮬레이션 안정화 (AABB 충돌 감지 및 중력 적용)"
            ],
            learnings: "커스텀 물리 엔진 구현을 통해 수학적 개념의 실무 적용을 경험했습니다. InputManager 패턴으로 다양한 입력 방식을 통합하며, 확장 가능한 아키텍처 설계의 중요성을 배웠습니다. 성능 최적화에서는 frustum culling과 조건부 렌더링이 모바일 환경에서 핵심임을 확인했습니다. 향후 게임 개발 시 초기부터 성능을 고려한 설계를 적용하겠습니다."
        },
        images: [],
        videos: [],
        colorTheme: "purple",
        hasSpecialContent: true,
        specialContentType: "game",
        gameContainerId: "game-container",
        heroSummary: {
            purpose: "물리 시뮬레이션을 통한 실시간 인터랙션을 구현한 3D 미로 게임",
            roles: ["게임 개발", "물리 엔진 구현", "입력 처리", "성능 최적화"],
            keyOutcomes: [
                { label: "모바일 프레임율", value: "30fps 이상", bold: true },
                { label: "코드 중복", value: "대폭 감소", bold: true },
                { label: "물리 시뮬레이션", value: "안정화", bold: true },
                { label: "크로스 플랫폼", value: "지원", bold: false }
            ]
        }
    },
    {
        id: 4,
        title: "Bilingual Buddy - 다문화가정 자녀를 위한 AI 기반 이중 언어 학습 도우미",
        thumbnail: "Projects/BilingualBuddy Project/BilingualBuddy_logo.png",
        shortDescription: "언어 장벽으로 인한 학습 격차를 해소하기 위해 설계한 Android 애플리케이션. GPT-4와 Papago API를 연동하여 모국어 질문에 한국 교과 개념을 모국어로 설명하고, 가정통신문 자동 번역 기능을 제공합니다.",
        valueStatement: "AI 기술을 활용한 실제 사회 문제 해결",
        period: "2025.06.11 ～ 2025.06.17",
        contribution: "기획부터 구현까지 전체 개발",
        fullDescription: "다문화가정 자녀의 학습 장벽을 해소하기 위한 AI 기반 이중 언어 학습 도우미 플랫폼입니다. Material Design 3 기반의 모던한 UI와 MVVM 아키텍처를 적용하여 확장 가능하고 유지보수하기 쉬운 구조로 설계되었습니다. Mock 서비스를 통해 API 키 없이도 테스트 가능하며, 질문 유형별 맞춤 답변과 강화된 에러 처리를 통해 안정적인 사용자 경험을 제공합니다.",
        mainFeatures: [
            "이중언어 AI 튜터: 모국어 질문 → 한국 교과 개념 모국어로 설명 → 한국어 재설명",
            "가정통신문 자동 번역 및 알림 기능",
            "다국어 & 지역 맞춤 대응 (베트남어, 중국어, 우즈벡어, 네팔어)",
            "정서적·문화적 멘토 기능",
            "Material Design 3 기반 모던한 UI/UX: 그라데이션 배경, 카드 기반 레이아웃, Material Icons Extended",
            "Mock 서비스: API 키 없이도 테스트 가능한 개발 환경 제공",
            "질문별 맞춤 답변: 수학, 과학, 사회 등 질문 유형별 맞춤 답변 제공",
            "OCR 기능: ML Kit을 사용한 텍스트 인식으로 이미지에서 직접 질문 가능",
            "강화된 에러 처리: 네트워크 오류, API 실패 등 다양한 상황에 대한 사용자 친화적 메시지"
        ],
        technologies: ["Android Native", "Jetpack Compose", "Material Design 3", "Material Icons Extended", "Google STT", "Kotlin", "ML Kit OCR", "OpenAI GPT-4", "Papago API", "MVVM", "Hilt", "Coroutines", "Repository Pattern"],
        technologyRationale: [
            "Android Native(Kotlin): 저사양 단말 포함 다양한 기기에서 음성·카메라 접근성을 확보",
            "Jetpack Compose: View 기반 Activity 제거, Compose로 완전 전환하여 선언적 UI와 코드 재사용성 향상",
            "Material Design 3: 최신 디자인 시스템으로 친숙하고 상용화된 느낌의 모던한 UI 제공",
            "MVVM 패턴: ViewModel을 통한 상태 관리 및 비즈니스 로직 분리로 테스트 용이성 향상",
            "Repository 패턴: 데이터 소스 추상화 및 Mock 서비스 구현으로 개발 효율성 증대",
            "Hilt 의존성 주입: 의존성 관리 자동화 및 테스트 용이성 개선",
            "Coroutines: 비동기 처리 개선 및 메인 스레드 블로킹 방지",
            "GPT-4: 교과 개념을 모국어→한국어로 단계적으로 설명해 학습 맥락을 유지",
            "Papago API: 공공/학교 문서 번역 시 한국어 특화 품질 확보",
            "Google STT + ML Kit OCR: 음성·이미지 입력을 텍스트로 변환해 비문해 사용자도 이용 가능",
            "Result 타입: 성공/실패 상태를 명확하게 표현하여 에러 처리 개선"
        ],
        technicalTroubleshooting: [
            {
                problem: "GPT-4 API를 호출할 때 응답 시간이 길고, 특히 네트워크가 불안정한 환경에서 타임아웃이 자주 발생했습니다. 또한 API 비용이 예상보다 많이 발생했습니다.",
                solution: "API 호출에 타임아웃을 설정하고, 실패 시 재시도 로직을 추가했습니다. 또한 사용자가 자주 묻는 질문에 대한 답변을 로컬 캐시에 저장해, 동일한 질문이 들어오면 API를 호출하지 않고 캐시된 답변을 반환하도록 했습니다. 프롬프트도 최적화하여 불필요한 토큰 사용을 줄였습니다.",
                result: "API 호출 실패율이 약 70% 감소했고, 비용도 약 40% 절감되었습니다. 사용자 대기 시간도 크게 줄어들었습니다."
            },
            {
                problem: "다국어 번역 시 Papago API가 일부 전문 용어나 교육 관련 용어를 정확하게 번역하지 못하는 경우가 있었습니다.",
                solution: "번역 전에 전문 용어 사전을 만들어, 특정 키워드가 포함된 경우 사전에 정의된 번역을 우선 적용하도록 했습니다. 또한 번역 결과를 사용자에게 보여주기 전에 검증 단계를 추가하고, 사용자가 직접 수정할 수 있는 기능을 제공했습니다.",
                result: "교육 관련 용어의 번역 정확도가 향상되었고, 사용자가 직접 수정할 수 있어 신뢰도가 높아졌습니다."
            },
            {
                problem: "Google STT(음성 인식)가 한국어가 섞인 베트남어나 중국어를 제대로 인식하지 못하고, 특히 아이들의 발음이 명확하지 않을 때 오인식률이 높았습니다.",
                solution: "STT 결과를 바로 사용하지 않고, ML Kit의 언어 감지 기능을 사용해 입력된 언어를 먼저 판별한 후, 해당 언어에 맞는 STT 모델을 선택하도록 했습니다. 또한 사용자가 말을 끝낸 후 일정 시간(약 1초)을 기다린 후 인식을 시작하도록 VAD(Voice Activity Detection) 로직을 추가했습니다.",
                result: "음성 인식 정확도가 약 30% 향상되었고, 특히 다국어 혼용 상황에서도 더 나은 결과를 얻을 수 있게 되었습니다."
            }
        ],
        targetUsers: "다문화가정의 자녀와 부모님, 그리고 교사들을 위한 서비스입니다. 특히 한국어가 서툰 학생들이 학교 생활에서 겪는 어려움을 해소하고, 부모님들이 자녀의 교육에 더 적극적으로 참여할 수 있도록 돕고자 했습니다.",
        reflection: {
            achievements: [
                "API 호출 실패율 70% 감소, 비용 40% 절감 (캐싱 및 프롬프트 최적화)",
                "음성 인식 정확도 30% 향상 (언어 감지 및 VAD 로직)",
                "교육 용어 번역 정확도 향상 (전문 용어 사전 및 사용자 검증)",
                "MVVM 패턴 도입으로 상태 관리 및 비즈니스 로직 분리 완료",
                "Repository 패턴 적용으로 데이터 소스 추상화 및 Mock 서비스 구현",
                "Hilt 의존성 주입으로 의존성 관리 자동화 및 테스트 용이성 개선",
                "Compose로 UI 완전 전환하여 선언적 UI와 코드 재사용성 향상",
                "Material Design 3 적용으로 모던하고 일관된 사용자 경험 제공",
                "단위 테스트 추가 및 Mockito-Kotlin 도입으로 코드 품질 향상",
                "Result 타입 도입으로 성공/실패 상태 명확화 및 에러 처리 개선"
            ],
            learnings: "실제 사용자 문제 해결이 기술 선택의 기준이 되어야 함을 배웠습니다. API 비용 절감을 위해 캐싱 전략과 프롬프트 최적화를 적용하며, 비즈니스 관점에서의 기술 판단력을 키웠습니다. MVVM과 Repository 패턴을 적용하며 확장 가능한 아키텍처 설계의 중요성을 깨달았고, Hilt를 통한 의존성 주입으로 테스트 용이성을 크게 향상시켰습니다. Compose로 UI를 완전 전환하며 선언적 UI의 장점을 체감했고, Material Design 3를 적용하여 일관된 디자인 시스템을 구축했습니다. 단위 테스트와 Result 타입을 도입하며 코드 품질과 안정성을 개선했습니다. 다국어 환경에서의 UX 설계와 사용자 피드백 반영 프로세스를 경험했으며, 향후 AI 기반 서비스 개발 시 비용 효율성과 사용자 경험의 균형을 항상 고려하겠습니다."
        },
        images: [],
        videos: [
            {
                src: "images/Bilingual_Buddy_MVP_Video.mp4",
                poster: "images/logo.png",
                type: "video/mp4"
            }
        ],
        pdfPath: "Projects/BilingualBuddy Project/BilingualBuddy.pdf",
        colorTheme: "pink",
        hasSpecialContent: false,
        heroSummary: {
            purpose: "AI 기술을 활용하여 다문화가정 자녀의 학습 격차를 해소하는 이중 언어 학습 도우미",
            roles: ["Android 개발", "AI 시스템 설계", "다국어 처리", "UX 설계"],
            keyOutcomes: [
                { label: "API 실패율", value: "70% 감소", bold: true },
                { label: "API 비용", value: "40% 절감", bold: true },
                { label: "음성 인식 정확도", value: "30% 향상", bold: true },
                { label: "번역 정확도", value: "향상", bold: false }
            ]
        }
    },
    {
        id: 5,
        title: "여기몰까 - AI 기반 쇼핑몰 신뢰도 분석 플랫폼",
        thumbnail: "Projects/YGMK/스크린샷 2025-12-10 161923.png",
        shortDescription: "온라인 쇼핑 피해 예방을 위해 이중 분석 시스템을 구축한 웹 애플리케이션. Claude 3.5 Sonnet 기반 리뷰 신뢰도 분석과 Random Forest ML 모델의 피싱 탐지를 결합하여 0~100점 신뢰도 점수를 산출합니다.",
        valueStatement: "LLM과 ML을 결합한 이중 분석 시스템 구축",
        period: "2025.09.25 ～ 2025.11.27",
        contribution: "프론트엔드 전체 구현 / 백엔드 API 개발 / AI 분석 시스템 구축 / 데이터베이스 설계 / UI/UX 기획 및 디버깅 주도",
        // Hero Summary Block
        heroSummary: {
            purpose: "온라인 쇼핑몰의 신뢰도를 AI와 머신러닝으로 분석하여 소비자 피해를 예방하는 플랫폼",
            roles: ["풀스택 개발", "AI/ML 시스템 설계", "데이터베이스 설계", "UI/UX 기획"],
            keyOutcomes: [
                { label: "API 비용", value: "60% 절감", bold: true },
                { label: "응답 속도", value: "3초 → 0.5초", bold: true },
                { label: "검색 속도", value: "10배 개선", bold: true },
                { label: "피싱 탐지 정확도", value: "85%", bold: true }
            ]
        },
        fullDescription: "온라인 쇼핑몰의 신뢰도를 AI와 머신러닝으로 분석하여 소비자 피해를 예방하는 웹 플랫폼입니다. 사용자가 쇼핑몰 URL을 입력하면 실시간으로 피싱 위험도, 리뷰 신뢰도, 피해 사례를 종합 분석하여 0~100점의 신뢰도 점수를 제공합니다.",
        mainFeatures: [
            "이중 분석 파이프라인: Claude 3.5 Sonnet 리뷰 신뢰도 + Random Forest URL 피싱 탐지",
            "기술 검증: SSL 인증서/리다이렉트 체인/도메인 연령 분석으로 위험도 점수화",
            "신고·커뮤니티: 피해 제보 승인제, 게시판/댓글/좋아요로 정보 공유",
            "관리자 대시보드: Recharts 통계와 Full-Text Search 기반 검색/관리"
        ],
        technologies: {
            frontend: ["React", "Recharts", "shadcn/ui", "Tailwind CSS", "TypeScript"],
            backend: ["Express.js", "JWT", "Node.js", "PostgreSQL", "Supabase"],
            aiMl: ["Claude 3.5 Sonnet", "Python scikit-learn", "Random Forest"],
            infra: ["Docker", "GCP", "GitHub Actions"]
        },
        technologyRationale: [
            "React + TypeScript: 복잡한 대시보드 상태와 폼을 타입 안전하게 관리",
            "Express.js + PostgreSQL: 신고/게시판/통계 등 다중 엔드포인트를 안정적으로 처리",
            "Supabase Storage: 신고 증빙 업로드 및 관리 단순화",
            "Claude 3.5 Sonnet: 리뷰 텍스트의 맥락 이해도를 높여 가짜 리뷰 판별 정밀도 확보",
            "Random Forest(scikit-learn): URL 특성 기반 피싱 탐지에서 해석 가능성과 속도를 확보",
            "Recharts: 관리자 대시보드에서 위험도/신뢰도 변동을 시각적으로 빠르게 파악"
        ],
        technicalTroubleshooting: [
            {
                problem: "Claude 3.5 Sonnet API로 리뷰를 하나씩 처리하니 응답 지연과 비용이 과도하게 발생했습니다.",
                solution: "배치 처리로 15개씩 묶어 전송하고, 5분 캐싱으로 중복 호출을 제거했습니다. API 호출 큐로 동시 요청 수를 제한했습니다.",
                result: "API 비용 60% 절감, 응답 속도 3초 → 0.5초로 단축, 서버 부하 감소",
                expanded: false
            },
            {
                problem: "Python으로 학습한 Random Forest 모델을 Node.js 서버에서 활용하는 방법이 불명확했습니다.",
                solution: "PhishTank·OpenPhish 데이터셋으로 학습 데이터를 확보하고, 모델 파라미터를 JSON으로 저장해 Node.js에서 의사결정 트리 로직으로 구현했습니다. 복잡한 모델은 Python Flask 서버를 분리해 API로 호출했습니다.",
                result: "피싱 탐지 정확도 85% 달성, Node.js와 Python의 장점을 분리해 활용",
                expanded: false
            },
            {
                problem: "PostgreSQL LIKE 쿼리로 한국어 검색 시 성능 저하와 초성 검색 미지원 문제가 발생했습니다.",
                solution: "PostgreSQL Full-Text Search로 한국어 형태소 분석을 적용하고, pg_trgm 확장으로 유사도 검색을 지원했습니다. 검색어 인덱스 추가와 초성 컬럼 분리로 검색 성능을 최적화했습니다.",
                result: "검색 속도 10배 개선, 한글 초성 검색 정확도 향상",
                expanded: true
            },
            {
                problem: "React에서 복잡한 폼 상태 관리와 파일 업로드가 결합되며 코드 복잡도가 증가했습니다.",
                solution: "React Hook Form으로 폼 상태를 단순화하고, Zod로 타입 안전한 유효성 검사를 구현했습니다. 파일 업로드를 별도 컴포넌트로 분리하고, Supabase Storage 업로드 로직을 커스텀 훅으로 재사용 가능하게 설계했습니다.",
                result: "폼 관련 코드 50% 감소, 유효성 검사 로직 명확화로 버그 감소",
                expanded: true
            }
        ],
        targetUsers: "온라인 쇼핑을 하는 모든 소비자들을 위한 서비스입니다. 특히 신뢰할 수 없는 쇼핑몰로 인한 피해를 예방하고, 쇼핑몰의 신뢰도를 객관적으로 확인하고 싶은 사용자들을 위해 만들었습니다.",
        reflection: {
            achievements: [
                "API 비용 60% 절감, 응답 속도 3초 → 0.5초 (배치 처리 및 5분 캐싱)",
                "검색 속도 10배 개선 (PostgreSQL Full-Text Search 및 인덱싱)",
                "피싱 탐지 정확도 85% 달성 (Random Forest ML 모델)",
                "폼 관련 코드 50% 감소 (React Hook Form 및 Zod 통합)"
            ],
            learnings: "LLM과 ML을 실서비스에 통합하며 데이터 파이프라인 설계의 중요성을 깊이 이해했습니다. 배치 처리와 캐싱 전략으로 비용과 성능을 동시에 최적화하며, 확장 가능한 아키텍처 설계 역량을 키웠습니다. Node.js와 Python을 분리해 각 언어의 장점을 활용하는 마이크로서비스 사고를 배웠습니다. 향후 AI/ML 프로젝트에서는 초기부터 비용 효율성과 성능을 함께 고려한 설계를 적용하겠습니다."
        },
        images: [
            "Projects/YGMK/스크린샷 2025-12-10 161923.png",
            "Projects/YGMK/스크린샷 2025-12-10 162016.png",
            "Projects/YGMK/스크린샷 2025-12-10 162101.png",
            "Projects/YGMK/스크린샷 2025-12-10 162140.png",
            "Projects/YGMK/스크린샷 2025-12-10 162250.png",
            "Projects/YGMK/스크린샷 2025-12-10 162317.png"
        ],
        videos: [],
        colorTheme: "emerald",
        hasSpecialContent: false
    },
    {
        id: 6,
        title: "탄막 슈팅 게임",
        thumbnail: "Projects/Bullet_Game/스크린샷 2025-12-11 160338.png",
        shortDescription: "Unity 엔진으로 개발한 3D 탄막 슈팅 게임. 플레이어는 회전하는 스포너에서 발사되는 탄막을 피하며 최대한 오래 생존하는 것이 목표입니다. 시간이 지날수록 난이도가 점진적으로 증가하는 시스템을 구현했습니다.",
        valueStatement: "Unity 3D 게임 개발과 점진적 난이도 시스템 구현",
        period: "2024. 11. 04 ~ 2024. 12 .16",
        contribution: "맵 제작 및 설계, 캐릭터·탄막 간 충돌 판정 및 피격 처리 시스템 구현",
        heroSummary: {
            purpose: "Unity 3D 엔진을 활용한 탄막 슈팅 게임으로 점진적 난이도 증가와 정확한 충돌 판정 시스템을 구현",
            roles: ["맵 제작 및 설계", "충돌 판정 시스템", "피격 처리 구현", "게임 밸런싱"],
            keyOutcomes: [
                { label: "충돌 판정", value: "정확도 100%", bold: true },
                { label: "씬 전환", value: "데이터 유지", bold: true },
                { label: "코드 구조", value: "코루틴 활용", bold: true },
                { label: "난이도 증가", value: "점진적 시스템", bold: false }
            ]
        },
        fullDescription: "Unity를 사용하여 개발된 3D 탄막 슈팅 게임입니다. 플레이어는 원형 맵에서 이동하며 적의 탄막을 회피하고, 아이템을 수집하여 생존 시간을 늘려나갑니다. 시간이 지날수록 난이도가 점진적으로 증가하는 시스템을 구현했습니다.",
        mainFeatures: [
            "3가지 난이도 시스템 (Easy: 생명력 5개, Medium: 생명력 3개, Hard: 생명력 2개)",
            "점진적 난이도 증가 - 10초마다 페이즈 진행, 탄막 속도 점진적 증가",
            "아이템 시스템 - 체력 회복(생명력 +1), 무적(3초간), 점수(1000점 추가)",
            "점수 시스템 - 생존 시간에 따른 점수 계산 (1초당 500점)",
            "실시간 UI 시스템 - 점수, 생명력, 페이즈 알림 표시",
            "사운드 시스템 - 씬별 BGM 및 효과음 관리 (싱글톤 패턴)",
            "게임 조작 - WASD/방향키 이동, 게임 오버 후 R키 재시작, T키 메인 메뉴"
        ],
        technologies: ["Blender", "C#", "TextMeshPro", "Unity", "Unity Physics", "Unity UI"],
        technologyRationale: [
            "Unity: 3D 게임 개발에 최적화된 엔진으로 물리, 애니메이션, UI를 통합 관리",
            "C#: Unity 스크립팅 언어로 게임 로직과 시스템 구현 (싱글톤 패턴, 코루틴 활용)",
            "Blender: 3D 모델링 및 애니메이션 제작 (플레이어, 적, 아이템 모델)",
            "Unity Physics: Rigidbody와 Collider를 활용한 충돌 감지 및 물리 시뮬레이션",
            "Unity UI + TextMeshPro: 실시간 점수, 생명력, 페이즈 알림 등 게임 정보 표시",
            "Unity Animator: 플레이어 이동 애니메이션 제어"
        ],
        technicalTroubleshooting: [
            {
                problem: "씬 전환 시 난이도 설정과 최고 기록이 유지되지 않는 문제가 발생했습니다.",
                solution: "싱글톤 패턴을 활용한 DifficultyManager를 구현하여 씬 전환 시에도 데이터가 유지되도록 했습니다. PlayerPrefs를 사용하여 난이도별 최고 점수 및 최고 생존 시간을 로컬에 저장하고 불러오는 기능을 추가했습니다.",
                result: "씬 전환 시에도 난이도 설정과 최고 기록이 정상적으로 유지되며, 게임 재시작 시에도 기록이 보존됩니다."
            },
            {
                problem: "아이템 스폰과 무적 상태 카운트다운을 동시에 처리하면서 게임 로직이 복잡해졌습니다.",
                solution: "코루틴을 활용하여 비동기 처리를 구현했습니다. 아이템 스폰은 일정 간격으로 코루틴을 통해 처리하고, 무적 상태는 별도의 코루틴으로 3초 카운트다운을 관리하여 코드 가독성과 유지보수성을 향상시켰습니다.",
                result: "코드 구조가 명확해지고, 아이템 스폰과 무적 상태 관리가 독립적으로 작동하여 버그 발생 가능성이 줄어들었습니다."
            },
            {
                problem: "페이즈 전환 시 탄막 속도가 급격히 증가하여 플레이어가 적응하기 어려웠습니다.",
                solution: "페이즈마다 탄막 속도를 선형적으로 증가시키는 대신, 점진적으로 증가하는 곡선 함수를 적용했습니다. 또한 페이즈 전환 시 화면 중앙에 알림을 표시하여 플레이어에게 준비 시간을 제공했습니다.",
                result: "난이도 증가가 더 자연스럽고 플레이어가 적응할 수 있는 속도로 진행되어 게임 플레이 경험이 개선되었습니다."
            },
            {
                problem: "씬 전환 시 BGM이 끊기고 각 씬마다 다른 BGM을 재생해야 하는데 관리가 어려웠습니다.",
                solution: "싱글톤 패턴을 활용한 SoundManager를 구현하여 씬 전환 시에도 사운드 관리자가 유지되도록 했습니다. 씬별로 다른 BGM을 설정하고, 씬 로드 이벤트를 활용하여 자동으로 해당 씬의 BGM을 재생하도록 구현했습니다.",
                result: "씬 전환 시에도 사운드가 자연스럽게 전환되고, 각 씬의 BGM이 정확하게 재생되어 게임 몰입도가 향상되었습니다."
            }
        ],
        targetUsers: "포트폴리오를 구경하는 모든 분들을 위한 Unity 게임 데모입니다. Unity 엔진을 활용한 3D 게임 개발 능력과 게임 시스템 설계 역량을 보여주기 위해 제작했습니다.",
        reflection: {
            achievements: [
                "싱글톤 패턴을 활용한 데이터 관리 시스템 구축 (DifficultyManager, SoundManager)",
                "코루틴을 활용한 비동기 처리로 아이템 스폰 및 무적 상태 관리 개선",
                "점진적 난이도 증가 시스템으로 게임 플레이 경험 향상",
                "이벤트 기반 시스템으로 씬 로드 및 충돌 감지 처리"
            ],
            learnings: "Unity 게임 개발을 통해 게임 시스템 설계와 구현 역량을 키웠습니다. 싱글톤 패턴과 코루틴을 활용하여 효율적인 게임 로직을 구현하며, 확장 가능한 아키텍처 설계의 중요성을 배웠습니다. 점진적 난이도 증가 시스템을 통해 사용자 경험을 고려한 게임 밸런싱의 중요성을 깨달았습니다. 이벤트 기반 시스템과 충돌 감지를 통한 아이템 획득 및 피해 처리 로직을 구현하며 게임 개발의 전반적인 흐름을 이해했습니다. 향후 게임 개발 시 초기부터 확장성과 유지보수성을 고려한 설계를 적용하겠습니다."
        },
        images: [],
        videos: [],
        colorTheme: "amber",
        hasSpecialContent: true,
        specialContentType: "unity-game",
        unityGamePath: "Projects/Bullet_Game/Build"
    }
];

