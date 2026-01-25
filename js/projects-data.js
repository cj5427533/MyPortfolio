// 프로젝트 데이터 구조
const projectsData = [
{
        id: 5,
        title: "여기몰까 - AI 기반 쇼핑몰 신뢰도 분석 플랫폼",
        thumbnail: "Projects/YGMK/스크린샷 2025-12-10 161923.png",
        thumbnailWebp: "Projects/YGMK/스크린샷 2025-12-10 161923.webp",
        shortDescription: "온라인 쇼핑 피해 예방을 위해 이중 분석 시스템을 구축한 웹 애플리케이션. Claude 3.5 Sonnet 기반 리뷰 신뢰도 분석과 Random Forest ML 모델의 피싱 탐지를 결합하여 0~100점 신뢰도 점수를 산출합니다.",
        valueStatement: "LLM과 ML을 결합한 이중 분석 시스템 구축",
        period: "2025.09.25 ~ 현재",
        contribution: "프론트엔드 전체 구현 / 백엔드 API 개발 / AI 분석 시스템 구축 / 데이터베이스 설계 / UI/UX 기획 및 디버깅 주도",
        featured: true,
        typeTag: { label: "팀 프로젝트", emoji: "👥" },
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
            frontend: ["React 18", "Recharts", "shadcn/ui", "Tailwind CSS", "TypeScript 5"],
            backend: ["Express.js", "JWT", "Node.js 20", "PostgreSQL 15", "Supabase"],
            aiMl: ["Claude 3.5 Sonnet", "Python scikit-learn", "Random Forest"],
            infra: ["Docker", "GCP", "GitHub Actions"],
            tools: ["Cursor"]
        },
        technologyRationale: [
            "Claude 3.5 Sonnet: 리뷰 텍스트의 맥락 이해도를 높여 가짜 리뷰 판별 정밀도 확보 (GPT-4 대비 비용 효율성)",
            "Random Forest(scikit-learn): URL 특성 기반 피싱 탐지에서 해석 가능성과 속도를 확보 (신경망 대비 빠른 추론)",
            "PostgreSQL Full-Text Search: 한국어 형태소 분석과 pg_trgm 확장으로 초성 검색 및 유사도 검색 지원",
            "Node.js + Python 분리: ML 모델은 Python Flask 서버로 분리, Node.js는 API 게이트웨이로 활용하여 각 언어의 장점 극대화",
            "Docker + GCP: 컨테이너화로 개발/프로덕션 환경 일관성 확보 및 GCP의 Auto-scaling으로 트래픽 대응",
            "Cursor: AI 기반 코드 생성과 리팩토링으로 복잡한 React 컴포넌트와 API 통합 로직을 빠르게 구현하고, Claude API 통합 시 프롬프트 엔지니어링과 에러 처리 패턴을 효율적으로 설계했습니다."
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
                solution: "React Hook Form으로 폼 상태를 단순화하고, Zod로 타입 안전한 유효성 검사를 구현했습니다. 파일 업로드를 별도 컴포넌트로 분리하고, Supabase Storage 업로드 로직을 커스텀 훅으로 재사용 가능하게 설계했습니다. Cursor의 AI 기반 코드 생성 기능을 활용하여 복잡한 폼 로직과 타입 안전성을 보장하는 패턴을 빠르게 도입하고 검증했습니다.",
                result: "폼 관련 코드 50% 감소, 유효성 검사 로직 명확화로 버그 감소",
                expanded: true
            }
        ],
        targetUsers: "온라인 쇼핑몰의 신뢰도를 빠르게 확인하고 피해를 예방하려는 소비자 및 운영자(관리자).",
        reflection: {
            achievements: [
                "API 비용 60% 절감, 응답 속도 3초 → 0.5초 (배치 처리 및 5분 캐싱)",
                "검색 속도 10배 개선 (PostgreSQL Full-Text Search 및 인덱싱)",
                "피싱 탐지 정확도 85% 달성 (Random Forest ML 모델)",
                "폼 관련 코드 50% 감소 (React Hook Form 및 Zod 통합)"
            ],
            learnings: "LLM과 ML을 실제 서비스에 도입하면서 데이터 흐름을 어떻게 설계하느냐가 전체 시스템의 효율성을 좌우한다는 걸 깨달았습니다. 배치 처리와 캐싱을 통해 비용과 속도를 모두 잡을 수 있었고, 이 과정에서 아키텍처를 어떻게 구성하느냐가 얼마나 중요한지 몸소 경험했습니다. Node.js와 Python을 분리해서 각각의 강점을 살리는 방식으로 개발하면서, 마이크로서비스 관점에서 시스템을 바라보는 시야가 넓어졌습니다. Cursor 같은 AI 도구를 쓰면서 복잡한 React 컴포넌트나 API 통합 로직을 빠르게 만들 수 있었고, 개발 속도와 코드 품질을 동시에 올릴 수 있다는 걸 실감했습니다. 다음 AI/ML 프로젝트를 할 때는 처음부터 비용과 성능을 함께 생각하면서 설계하고 싶습니다."
        },
        images: [
            "Projects/YGMK/스크린샷 2025-12-10 161923.png",
            "Projects/YGMK/스크린샷 2025-12-10 162016.png",
            "Projects/YGMK/스크린샷 2025-12-10 162101.png",
            "Projects/YGMK/스크린샷 2025-12-10 162140.png",
            "Projects/YGMK/스크린샷 2025-12-10 162250.png",
            "Projects/YGMK/스크린샷 2025-12-10 162317.png"
        ],
        imagesWebp: [
            "Projects/YGMK/스크린샷 2025-12-10 161923.webp",
            "Projects/YGMK/스크린샷 2025-12-10 162016.webp",
            "Projects/YGMK/스크린샷 2025-12-10 162101.webp",
            "Projects/YGMK/스크린샷 2025-12-10 162140.webp",
            "Projects/YGMK/스크린샷 2025-12-10 162250.webp",
            "Projects/YGMK/스크린샷 2025-12-10 162317.webp"
        ],
        videos: [],
        githubUrl: "https://github.com/cj5427533/CapstoneProject",
        demoUrl: "https://www.ygmk.app/",
        colorTheme: "blue",
        hasSpecialContent: false
    },
    {
        id: 7,
        title: "컬처맵 (CultureMap)",
        thumbnail: "Projects/CultureMap/Logo.png",
        thumbnailWebp: "Projects/CultureMap/Logo.webp",
        shortDescription: "사용자가 스스로 계획한 문화 생활 플랜을 기록하고, 일부를 다른 사람과 공유할 수 있는 커뮤니티 기반 문화기록 플랫폼입니다. Kakao API를 활용해 지도에서 장소를 검색·추가하고, 이동 경로를 설정할 수 있습니다. 플랜을 다른 사용자와 협업(권한 기반)하거나 게시글로 공유하고, 댓글/별점으로 피드백을 주고받는 흐름까지 한 번에 제공합니다.",
        valueStatement: "문화시설을 조합해 나만의 플랜 생성, 기록, 공유",
        period: "2025.11.10 ~ 현재",
        contribution: "풀스택 개발 / Spring Boot 백엔드 / React 프론트엔드 / Docker 배포 / CI/CD 구축",
        typeTag: { label: "팀 프로젝트", emoji: "👥" },
        heroSummary: {
            purpose: "사용자 스스로 설계한 문화 생활 플랜을 커뮤니티로 확산시키는 플랫폼",
            roles: ["풀스택 개발", "Spring Boot 백엔드", "React 프론트엔드", "Docker 배포", "CI/CD 구축"],
            keyOutcomes: [
                { label: "JPA N+1 문제", value: "해결 완료", bold: true },
                { label: "검색 결과 캐싱", value: "10분 TTL", bold: true },
                { label: "레이트 리밋", value: "구현 완료", bold: true },
                { label: "Fly.io 배포", value: "성공", bold: false }
            ]
        },
        fullDescription: "컬처맵은 단순한 전시 일정 공유를 넘어서, 사용자 스스로 설계한 문화 생활 플랜을 커뮤니티로 확산시키는 플랫폼입니다. Spring Boot 백엔드와 React 프론트엔드를 사용하여 구현했으며, Kakao Local API와 Kakao Mobility Directions API를 연동하여 지도 기반 장소 검색과 경로 설정 기능을 제공합니다.",
        mainFeatures: [
            "문화 플랜 생성: 사용자가 직접 전시/공연 등 장소를 조합해 플랜을 생성 (날짜 기반)",
            "플랜 협업: 플랜 소유자가 다른 사용자를 초대하여 함께 플랜 관리 (EDITOR/VIEWER 권한)",
            "경로 설정: Kakao Mobility Directions API를 통한 자동차 경로 조회 및 지도 표시",
            "플랜 공유: 개인 플랜 중 일부를 게시글로 공유 (Plan → PlanPost 참조 방식)",
            "게시판 열람: 공유된 플랜들을 전체 공개 게시판에서 확인 가능",
            "댓글 및 별점: 게시글에 댓글 작성 및 별점 평가 (댓글과 함께 별점 제출)",
            "장소 검색: Kakao Local API 기반 주변 문화시설 검색 기능 (디바운스 적용)",
            "검색 최적화: 검색 결과 캐싱, 최근 검색 기록, 인기 장소 추천",
            "달력 필터링: 월별 달력 UI에서 날짜 클릭 시 해당 날짜의 플랜 필터링",
            "지도 기반 탐색: 현위치 기반 지도에서 주변 문화시설 검색 및 플랜 추가",
            "관리자 대시보드: 시스템 통계 및 API 사용량 모니터링 (관리자 전용)"
        ],
        technologies: ["Cursor", "Docker", "Fly.io", "GitHub Actions", "Java 17", "JWT", "Kakao Local API", "Kakao Mobility API", "MySQL 8.0", "React 18", "Spring Boot 3.4", "Spring Data JPA", "Spring Security", "TypeScript 5"],
        technologyRationale: [
            "Spring Boot + JPA: 엔티티 간 복잡한 관계를 효율적으로 관리하고 N+1 문제를 @EntityGraph와 fetch join으로 해결",
            "JWT + 리프레시 토큰: Stateless 인증 방식으로 확장 가능한 인증 시스템 구현 (세션 기반 대비 서버 부하 감소)",
            "Kakao Local API + Mobility API: 한국 지역 문화시설 검색과 경로 조회에 최적화된 API 활용",
            "Fly.io: Docker 기반 배포로 Heroku 대비 비용 효율적이며, 글로벌 CDN으로 응답 속도 향상",
            "Spring Security: 인증/인가를 프레임워크 레벨에서 처리하여 보안 취약점 최소화",
            "Cursor: JPA N+1 문제 해결을 위한 @EntityGraph 패턴과 복잡한 엔티티 관계 설계를 AI의 제안을 받아 최적화했습니다. 풀스택 개발 과정에서 백엔드와 프론트엔드 통합 로직을 효율적으로 구현하며 개발 생산성을 크게 향상시켰습니다."
        ],
        technicalTroubleshooting: [
            {
                problem: "JPA에서 플랜과 관련된 장소, 멤버, 게시글을 조회할 때 N+1 문제가 발생하여 성능이 크게 저하되었습니다.",
                solution: "@EntityGraph 어노테이션과 fetch join을 사용하여 연관된 엔티티를 한 번의 쿼리로 함께 조회하도록 최적화했습니다. 또한 필요에 따라 DTO를 활용하여 필요한 데이터만 조회하도록 개선했습니다. Cursor의 AI 기반 코드 분석과 제안을 통해 최적의 @EntityGraph 패턴과 fetch join 전략을 빠르게 도입하고 검증했습니다.",
                result: "N+1 문제가 완전히 해결되어 플랜 조회 성능이 크게 향상되었고, 데이터베이스 쿼리 수가 대폭 감소했습니다."
            },
            {
                problem: "Kakao API 호출이 많아지면서 비용이 증가하고 응답 시간이 길어졌습니다.",
                solution: "검색 결과를 인메모리 캐시에 저장하고 10분 TTL을 설정하여 중복 호출을 방지했습니다. 또한 인기 장소를 별도로 캐싱하여 자주 조회되는 데이터는 즉시 반환하도록 최적화했습니다.",
                result: "API 호출 수가 약 70% 감소했고, 검색 응답 속도가 크게 향상되었으며, 비용도 절감되었습니다."
            },
            {
                problem: "동시에 여러 사용자가 같은 플랜을 수정하려 할 때 데이터 일관성 문제가 발생했습니다.",
                solution: "트랜잭션을 활용하고, 플랜 수정 시 버전 관리를 통해 낙관적 락을 구현했습니다. 또한 권한 체크를 강화하여 OWNER와 EDITOR만 수정할 수 있도록 명확히 구분했습니다.",
                result: "데이터 일관성이 보장되었고, 동시 접속 시에도 안정적으로 플랜을 관리할 수 있게 되었습니다."
            },
            {
                problem: "프론트엔드에서 검색 시 매번 API를 호출하여 불필요한 네트워크 트래픽이 발생했습니다.",
                solution: "디바운스를 500ms로 설정하여 사용자가 입력을 멈춘 후에만 API를 호출하도록 개선했습니다. 또한 최근 검색 기록을 로컬 스토리지에 저장하여 재검색 시 즉시 결과를 표시하도록 했습니다.",
                result: "불필요한 API 호출이 대폭 감소했고, 사용자 경험이 향상되었으며, 서버 부하도 줄어들었습니다."
            }
        ],
        targetUsers: "문화시설을 조합해 플랜을 만들고 기록·공유하고 싶은 사용자, 그리고 함께 플랜을 협업하고 싶은 사용자.",
        reflection: {
            achievements: [
                "JPA N+1 문제 완전 해결 (@EntityGraph 및 fetch join 활용)",
                "검색 결과 캐싱으로 API 호출 70% 감소 및 응답 속도 향상",
                "레이트 리밋 구현으로 보안 강화 및 서버 부하 방지",
                "Docker + Fly.io를 활용한 안정적인 클라우드 배포",
                "GitHub Actions CI/CD 파이프라인 구축으로 자동 배포 환경 완성"
            ],
            learnings: "백엔드와 프론트엔드를 모두 다루면서 전체 시스템이 어떻게 연결되는지 보게 되었습니다. JPA N+1 문제를 직접 겪고 해결하는 과정에서 DB 쿼리가 성능에 얼마나 큰 영향을 주는지 알게 되었고, 외부 API를 쓸 때는 캐싱이 없으면 안 된다는 걸 배웠습니다. Docker로 배포 환경을 통일하고 CI/CD를 구축하면서, 배포가 자동화되니 개발 흐름이 훨씬 부드러워졌습니다. Cursor를 쓰면서 복잡한 엔티티 설계나 성능 튜닝 같은 부분을 빠르게 학습하고 적용할 수 있었고, AI 도구가 개발을 얼마나 빠르게 만들어주는지 체감했습니다. 다음 프로젝트에서는 처음부터 성능과 보안을 함께 고려하면서 설계하고 싶습니다."
        },
        images: [
            "Projects/CultureMap/1.png",
            "Projects/CultureMap/2.png",
            "Projects/CultureMap/3.png",
            "Projects/CultureMap/4.png",
            "Projects/CultureMap/5.png"
        ],
        videos: [],
        colorTheme: "emerald",
        hasSpecialContent: false,
        demoUrl: "https://culturemap.fly.dev",
        githubUrl: "https://github.com/cj5427533/CultureMap"
    },
    {
        id: 6,
        title: "탄막 슈팅 게임",
        thumbnail: "Projects/Bullet_Game/스크린샷 2025-12-11 160338.png",
        thumbnailWebp: "Projects/Bullet_Game/스크린샷 2025-12-11 160338.webp",
        shortDescription: "Unity 엔진으로 개발한 3D 탄막 슈팅 게임입니다. 플레이어는 회전 스포너에서 발사되는 탄막을 피하며 최대한 오래 생존하는 것이 목표입니다. 10초 단위 페이즈 진행으로 탄막 속도/난이도가 점진적으로 상승하며, 체력 회복·무적·점수 아이템으로 플레이 변수를 만들었습니다. 실시간 UI(점수/생명력/페이즈)와 씬 전환 시 데이터 유지(싱글톤/저장)까지 포함해 완성도를 높였습니다.",
        valueStatement: "Unity 3D 게임 개발과 난이도 시스템 구현",
        period: "2024.11.04 ~ 2024.12.16",
        contribution: "맵 제작 및 설계, 캐릭터·탄막 간 충돌 판정 및 피격 처리 시스템 구현",
        typeTag: { label: "개인 프로젝트", emoji: "👤" },
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
            "C# 코루틴: 비동기 처리를 위한 Unity 네이티브 방식으로 아이템 스폰 타이밍과 무적 상태 관리",
            "Unity Physics: Rigidbody와 Collider를 활용한 충돌 감지 및 물리 시뮬레이션 (커스텀 물리 대비 안정성)",
            "싱글톤 패턴: DifficultyManager와 SoundManager로 씬 전환 시에도 데이터와 사운드 상태 유지"
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
        targetUsers: "포트폴리오 방문자. Unity 기반 3D 게임의 시스템 설계·구현 역량을 보여주는 데모입니다.",
        reflection: {
            achievements: [
                "싱글톤 패턴을 활용한 데이터 관리 시스템 구축 (DifficultyManager, SoundManager)",
                "코루틴을 활용한 비동기 처리로 아이템 스폰 및 무적 상태 관리 개선",
                "점진적 난이도 증가 시스템으로 게임 플레이 경험 향상",
                "이벤트 기반 시스템으로 씬 로드 및 충돌 감지 처리"
            ],
            learnings: "Unity로 게임을 만들면서 게임 시스템을 어떻게 설계하고 구현하는지 배웠습니다. 싱글톤 패턴과 코루틴을 써보니 게임 로직을 더 깔끔하게 짤 수 있었고, 나중에 기능을 추가하거나 수정할 때도 편하다는 걸 느꼈습니다. 난이도를 점점 올리는 시스템을 만들면서 플레이어가 재미있게 느낄 수 있는 밸런스를 맞추는 게 얼마나 중요한지 알게 되었습니다. 이벤트로 아이템 획득이나 피해 처리를 하면서 게임이 돌아가는 전체 흐름을 이해하게 되었습니다. 다음 게임을 만들 때는 처음부터 나중에 수정하기 쉽고 확장하기 좋은 구조로 설계하고 싶습니다."
        },
        images: [],
        videos: [],
        githubUrl: "https://github.com/cj5427533/unity_bullet_game",
        colorTheme: "amber",
        hasSpecialContent: true,
        specialContentType: "unity-game",
        unityGamePath: "Projects/Bullet_Game/Build"
    },
    {
        id: 4,
        title: "Bilingual Buddy",
        thumbnail: "Projects/BilingualBuddy Project/BilingualBuddy_logo.png",
        thumbnailWebp: "Projects/BilingualBuddy Project/BilingualBuddy_logo.webp",
        shortDescription: "언어 장벽으로 인한 학습 격차를 해소하기 위해 설계한 Android 애플리케이션. GPT-4와 Papago API를 연동하여 모국어 질문에 한국 교과 개념을 모국어로 설명하고, 가정통신문 자동 번역 기능을 제공합니다.",
        valueStatement: "AI 기반 다문화 아동 이중언어 학습 도우미",
        period: "2025.06.11 ~ 2025.06.17",
        contribution: "기획부터 구현까지 전체 개발",
        typeTag: { label: "개인 프로젝트", emoji: "👤" },
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
        technologies: ["Android Native", "Jetpack Compose", "Kotlin", "OpenAI GPT-4", "Papago API", "MVVM", "Hilt", "Coroutines", "Repository Pattern"],
        technologyRationale: [
            "Jetpack Compose: View 기반 Activity 제거, Compose로 완전 전환하여 선언적 UI와 코드 재사용성 향상",
            "MVVM + Repository 패턴: ViewModel을 통한 상태 관리 및 데이터 소스 추상화로 테스트 용이성 향상",
            "Hilt 의존성 주입: 의존성 관리 자동화 및 테스트 용이성 개선 (Dagger 대비 간소화된 설정)",
            "Coroutines: 비동기 처리 개선 및 메인 스레드 블로킹 방지 (RxJava 대비 가독성 향상)",
            "GPT-4: 교과 개념을 모국어→한국어로 단계적으로 설명해 학습 맥락을 유지 (Claude 대비 교육 맥락 이해도)",
            "Papago API: 공공/학교 문서 번역 시 한국어 특화 품질 확보 (Google Translate 대비 한국어 정확도)",
            "ML Kit OCR: 온디바이스 텍스트 인식으로 네트워크 없이도 이미지에서 질문 추출 가능"
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
                "API 호출 실패율 70% 감소, 비용 40% 절감 (캐싱 전략 및 프롬프트 최적화)",
                "Repository 패턴 적용으로 데이터 소스 추상화 및 Mock 서비스 구현",
                "Result 타입 도입으로 성공/실패 상태 명확화 및 에러 처리 개선",
                "단위 테스트 추가로 코드 품질 및 안정성 향상"
            ],
            learnings: "API 비용을 줄이기 위해 캐싱을 쓰고 프롬프트를 최적화하면서, 기술적 결정이 비즈니스에 어떤 영향을 주는지 생각하게 되었습니다. Repository 패턴을 도입해보니 데이터 소스를 바꾸거나 테스트하기가 훨씬 쉬워졌고, 구조를 잘 잡아두면 나중에 유지보수가 편하다는 걸 경험했습니다. 단위 테스트와 Result 타입을 쓰면서 코드가 더 안정적이고 버그를 찾기 쉬워졌습니다. 앞으로 백엔드를 개발할 때는 비용, 성능, 그리고 나중에 확장하기 좋은 구조를 항상 염두에 두고 싶습니다."
        },
        images: [],
        videos: [
            {
                src: "Projects/BilingualBuddy Project/Bilingual_Buddy_MVP_Video.webm",
                type: "video/webm"
            }
        ],
        pdfPath: "Projects/BilingualBuddy Project/BilingualBuddy.pdf",
        githubUrl: "https://github.com/cj5427533/BilingualBuddy",
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
        id: 1,
        title: "JEIU 캠퍼스 익스플로러 3D",
        thumbnail: "images/JEIU_Campus_1.png",
        thumbnailWebp: "images/JEIU_Campus_1.webp",
        shortDescription: "3D 공간에서 캠퍼스 정보를 직관적으로 탐색할 수 있도록 설계한 웹 애플리케이션. Three.js로 구현한 인터랙티브 맵에서 건물 클릭 시 이벤트 정보 확인 및 강의실 예약 기능을 제공합니다.",
        valueStatement: "복잡한 캠퍼스 구조를 3D 시각화로 직관적 탐색",
        period: "2025.03.26 ~ 2025.04.16",
        contribution: "프론트엔드 전체 구현 / 백엔드 연동 / UI 기획 및 디버깅 주도",
        typeTag: { label: "팀 프로젝트", emoji: "👥" },
        fullDescription: "재능대학교 캠퍼스를 3D로 구현한 웹 플랫폼입니다. 학생들이 강의실을 예약하고 각 건물의 이벤트·캠페인 정보를 시각적으로 확인할 수 있는 서비스입니다.",
        mainFeatures: "Three.js로 3D 캠퍼스를 시각화하고, 건물 클릭 시 이벤트 정보 확인 및 강의실 예약이 가능한 서비스입니다.",
        technologies: ["Express.js", "HTML/CSS", "JavaScript", "MySQL 8.0", "Three.js"],
        technologyRationale: [
            "Three.js: 캠퍼스 건물과 동선을 3D로 시각화하여 공간 맥락을 직관적으로 전달 (WebGL 직접 사용 대비 생산성)",
            "Raycasting: 마우스 클릭 위치에서 카메라 방향으로 광선을 쏘아 건물 선택 정확도 향상",
            "MySQL + SELECT FOR UPDATE: 트랜잭션과 행 잠금으로 동시 예약 시 데이터 일관성 보장"
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
            learnings: "3D 웹을 만들면서 성능이 사용자 경험에 얼마나 큰 영향을 주는지 직접 보게 되었습니다. Raycasting 같은 수학 개념을 실제로 써보니 이론과 실전이 어떻게 연결되는지 알게 되었고, 기술을 깊이 이해하면서도 실용적으로 쓸 수 있어야 한다는 생각이 들었습니다. 다음 3D 프로젝트를 할 때는 LOD나 우선순위 로딩 같은 최적화 전략을 먼저 적용하고 싶습니다."
        },
        images: [
            "images/JEIU_Campus_1.png",
            "images/JEIU_Campus_2.png",
            "images/JEIU_Campus_3.png"
        ],
        imagesWebp: [
            "images/JEIU_Campus_1.webp",
            "images/JEIU_Campus_2.webp",
            "images/JEIU_Campus_3.webp"
        ],
        videos: [],
        githubUrl: "https://github.com/cj5427533/JEIU-Campus-Explorer-3D",
        colorTheme: "teal",
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
        id: 3,
        title: "공 굴리기 미로 게임",
        thumbnail: "Projects/3D_Maze/스크린샷 2025-12-11 192508.png",
        thumbnailWebp: "Projects/3D_Maze/스크린샷 2025-12-11 192508.webp",
        shortDescription: "사용자 입력에 반응하는 물리 기반 인터랙션을 구현한 3D 미로 게임. Three.js 물리 엔진으로 실시간 판 기울기와 공의 움직임을 시뮬레이션하며, 키보드·마우스·터치 입력을 모두 지원합니다.",
        valueStatement: "물리 시뮬레이션을 통한 실시간 인터랙션 구현",
        period: "2025.05.17 ~ 2025.05.20",
        contribution: "기획부터 구현까지 전체 개발",
        typeTag: { label: "개인 프로젝트", emoji: "👤" },
        fullDescription: "Three.js를 활용한 인터랙티브 3D 공 굴리기 미로 게임입니다. 사용자의 마우스나 키보드 조작에 반응하여 판을 기울이고 공을 굴려 목적지에 도달하는 게임입니다.",
        mainFeatures: "Three.js를 활용한 3D 미로에서 물리 시뮬레이션을 통해 공을 굴려 목적지에 도달하는 인터랙티브 게임입니다.",
        technologies: ["HTML/CSS", "JavaScript", "물리 시뮬레이션", "Three.js"],
        technologyRationale: [
            "Three.js: 브라우저에서 실시간 3D 렌더링을 수행하고 카메라·조명·오브젝트 제어",
            "커스텀 물리 시뮬레이션: AABB 충돌 감지와 중력 적용을 직접 구현해 퍼포먼스와 제어권 확보 (Cannon.js 대비 경량화)",
            "InputManager 패턴: 키보드·마우스·터치를 단일 입력 파이프라인으로 통합하여 크로스플랫폼 대응 및 코드 중복 제거",
            "Frustum Culling: 카메라가 보이지 않는 오브젝트 렌더링 생략으로 모바일에서 30fps 이상 유지"
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
        targetUsers: "포트폴리오 방문자. 직접 플레이하며 물리 효과와 인터랙션을 체험할 수 있는 데모입니다.",
        reflection: {
            achievements: [
                "모바일 환경에서 30fps 이상 안정적 프레임율 유지 (frustum culling 및 최적화)",
                "코드 중복 대폭 감소 (InputManager로 입력 통합)",
                "물리 시뮬레이션 안정화 (AABB 충돌 감지 및 중력 적용)"
            ],
            learnings: "물리 엔진을 직접 만들어보면서 수학 이론을 실제 코드로 옮기는 경험을 했습니다. InputManager로 키보드, 마우스, 터치를 하나로 통합하니 코드가 훨씬 깔끔해졌고, 이런 패턴이 얼마나 유용한지 알게 되었습니다. 모바일에서 돌려보니 frustum culling이나 조건부 렌더링 없이는 프레임이 떨어지는 걸 확인했고, 성능 최적화가 필수라는 걸 느꼈습니다. 다음 게임을 만들 때는 처음부터 성능을 생각하면서 설계하고 싶습니다."
        },
        images: [],
        videos: [],
        colorTheme: "purple",
        hasSpecialContent: true,
        specialContentType: "game",
        gameContainerId: "game-container",
        githubUrl: "https://github.com/cj5427533/MyPortfolio",
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
        id: 2,
        title: "Portfolio Web <br> 인터랙티브 포트폴리오",
        thumbnail: "images/portfolio-screenshot.png",
        thumbnailWebp: "images/portfolio-screenshot.webp",
        shortDescription: "히어로·프로젝트·수상·연락처를 한 페이지에 담고, Three.js 데모, Unity WebGL, PDF 뷰어, Cloudflare Worker 폼을 통합한 인터랙티브 포트폴리오.",
        valueStatement: "실사용 가능한 3D·게임·폼·자료 뷰를 정적 페이지에 통합해 한눈에 역량을 보여주는 쇼케이스",
        period: "2025.05.20 ~ 현재까지",
        contribution: "기획·디자인·프론트엔드·3D/게임 데모 연동·백엔드 폼 연동을 단독 수행",
        typeTag: { label: "개인 프로젝트", emoji: "👤" },
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
        fullDescription: "정적 HTML 기반의 데이터 주도 포트폴리오입니다. `projects-data.js`에 프로젝트 메타데이터를 추가하면 카드와 모달이 자동 렌더링되어 유지보수성을 극대화했습니다. Three.js 3D 미로 게임, Unity WebGL 게임, PDF 뷰어, 댓글 시스템을 한 페이지에 통합했으며, 성능 최적화(WebP -90%, Giscus 비동기 로딩, 동적 라이브러리 로드)로 LCP 개선을 주도했습니다. Netlify 자동 배포로 효율적인 CI/CD를 구축하고, 실제 배포 환경에서의 성능 모니터링과 지속적 개선 프로세스를 경험했습니다.",
        mainFeatures: [
            "데이터 주도 렌더링: JSON 메타데이터만 추가하면 카드와 모달이 자동으로 생성되어 새 프로젝트를 쉽게 추가할 수 있습니다.",
            "성능 최적화: 이미지를 WebP로 바꾸고(-90%), 댓글 시스템과 필요한 라이브러리만 나중에 로드합니다.",
            "다양한 콘텐츠 통합: 3D 미로 게임, WebGL 게임, PDF 뷰어, 실시간 댓글을 모두 한 페이지에 담았습니다.",
            "서버리스 백엔드: Cloudflare Worker를 써서 폼 데이터를 받아 Discord로 알림을 보냅니다.",
            "배포 및 CI/CD: 코드를 GitHub에 올리면 Netlify가 자동으로 빌드하고 배포합니다.",
            "반응형 디자인: Tailwind CSS와 커스텀 애니메이션으로 모든 기기에서 잘 보이게 만들었습니다.",
            "캐싱 최적화: 자주 안 바뀌는 파일들을 오래 보관해서 로딩 속도를 빠르게 했습니다.",
            "SEO 최적화: 메타태그와 구조화된 데이터를 넣어서 검색 엔진 최적화 점수를 100점 받았습니다.",
            "실제 서비스 운영: 배포 후 성능을 계속 측정하고 개선하고 있습니다."
        ],
        technologies: ["Cloudflare Workers", "Cursor", "Git", "Giscus", "HTML/CSS", "Netlify", "Node.js 20", "PDF.js", "Swiper.js", "Tailwind CSS", "Three.js", "Typed.js", "Vanilla JavaScript"],
        technologyRationale: [
            "데이터 주도 렌더링: projects-data.js에 JSON을 추가하면 projects-renderer.js가 자동으로 카드와 모달을 만들어줘서 HTML을 수정할 필요가 없습니다.",
            "WebP 변환: 이미지를 WebP로 바꾸니 90% 줄어들어서 페이지가 훨씬 빨리 로드됩니다.",
            "비동기 로딩: 댓글 시스템과 게임 라이브러리는 필요할 때만 로드해서 처음에 로드할 파일의 크기를 줄였습니다.",
            "Cloudflare Worker: 서버가 없어도 폼 데이터를 받아서 Discord로 보낼 수 있어서 서버 비용이 들지 않습니다.",
            "Netlify 캐싱: 자주 안 바뀌는 파일들은 1년 동안 캐시해서 빠르게 로드됩니다.",
            "Cursor AI: 복잡한 렌더링 로직을 설계할 때 AI의 도움을 받아서 빠르게 구현할 수 있었습니다."
        ],
        technicalTroubleshooting: [
            {
                problem: "배포하고 Lighthouse로 성능을 측정했는데 56점밖에 안 나왔습니다.",
                solution: "이미지를 WebP로 바꾸고, 댓글 시스템을 나중에 로드하고, 게임 라이브러리도 필요할 때만 로드했습니다. Netlify에서 파일 캐싱 설정도 했습니다.",
                result: "이미지가 90% 줄어들었고, 라이브러리 파일도 200KB 줄었습니다."
            },
            {
                problem: "Unity WebGL 빌드를 파일 프로토콜로 열 때 wasm/gzip가 깨지며 로딩 실패했습니다.",
                solution: "Node 정적 서버(`server.js`)에서 MIME 타입과 `Content-Encoding: gzip` 헤더를 설정해 서빙했습니다.",
                result: "WebGL 빌드가 브라우저에서 정상 로드되고 로딩 오류가 해소되었습니다."
            },
            {
                problem: "Netlify 배포 시 빌드 오류 및 리소스 경로 불일치가 발생했습니다.",
                solution: "환경 변수를 명시하고, 빌드 명령어를 통일하고, 상대 경로를 정규화했습니다. Netlify 캐시 설정으로 빌드 시간도 최적화했습니다.",
                result: "배포 파이프라인이 안정화되고 빌드 시간이 단축되었습니다."
            },
            {
                problem: "프로젝트 데이터가 증가할 때 스타일 일관성을 유지하기 어려웠습니다.",
                solution: "색상 테마 매핑과 데이터 기반 렌더러(`projects-renderer.js`)로 카드와 모달 UI를 통일했습니다. Cursor AI로 확장 가능한 아키텍처를 설계하고 구현했습니다.",
                result: "새로운 프로젝트를 추가할 때도 동일한 UI 패턴이 자동으로 유지됩니다."
            }
        ],
        targetUsers: "채용 담당자와 협업자를 포함해, 한 번의 스크롤로 역량·프로젝트·연락처를 확인하고 싶은 방문자.",
        reflection: {
            achievements: [
                "성능 최적화: 이미지를 WebP로 바꿔서 90% 줄였고, 게임 라이브러리와 댓글 시스템을 필요할 때만 로드해서 로딩 속도를 개선했습니다.",
                "데이터 주도 아키텍처: JSON만 추가하면 자동으로 프로젝트 카드와 모달이 생성되어서 새 프로젝트를 쉽게 추가할 수 있습니다.",
                "다양한 콘텐츠 통합: 3D 게임, WebGL 게임, PDF 뷰어, 실시간 댓글 시스템을 한 페이지에 모두 담았습니다.",
                "자동 배포: GitHub에 코드를 올리면 Netlify가 자동으로 빌드하고 배포해주는 파이프라인을 만들었습니다.",
                "실제 서비스 운영: 배포 후 Lighthouse로 성능을 측정하고 계속 개선하고 있습니다."
            ],
            learnings: "정적인 HTML 페이지라도 적절한 기술을 조합하면 3D, 게임, 폼 백엔드까지 모두 담을 수 있습니다. 배포 후 Lighthouse로 성능을 측정했을 때 56점이 나왔는데, 이미지 최적화와 동적 로딩으로 개선할 수 있었습니다. 같은 파일을 계속 캐싱하면 빠르게 로드되고, 자주 바뀌는 파일은 매번 새로 받아야 한다는 캐싱의 기본을 배웠습니다. GitHub에 코드를 올리면 Netlify가 자동으로 빌드하고 배포해주는 CI/CD 파이프라인이 얼마나 효율적인지 경험했습니다. Cursor라는 AI 도구를 써서 복잡한 렌더링 로직을 빠르게 만들 수 있었고, AI와 협업하면 개발 속도를 크게 단축할 수 있습니다. 이 프로젝트는 '정적 페이지'라는 제약이 있어도 기본 원리를 이해하면 거의 모든 기술을 활용할 수 있다는 걸 보여줬습니다."
        },
        images: [
            "images/portfolio-screenshot.png"
        ],
        imagesWebp: [
            "images/portfolio-screenshot.webp"
        ],
        videos: [],
        colorTheme: "indigo",
        hasSpecialContent: false,
        githubUrl: "https://github.com/cj5427533/MyPortfolio"
    }
];

