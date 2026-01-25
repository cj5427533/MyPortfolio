# 📁 프로젝트 구조 및 아키텍처

## 디렉토리 구조

```
MyPortfolio/
├── 📄 index.html                 # 메인 페이지 (Entry Point)
├── 📄 server.js                  # 로컬 개발 서버 (Express)
├── 📄 netlify.toml              # Netlify 배포 설정 및 캐시 정책
│
├── 📁 css/
│   └── styles.css               # 전역 스타일 (Tailwind + 커스텀)
│
├── 📁 js/
│   ├── main.js                  # 핵심 기능 (이미지 Lazy Loading, 폼 처리, 동적 라이브러리 로딩)
│   ├── animations.js            # 스크롤 애니메이션 (Intersection Observer)
│   ├── projects-data.js         # 프로젝트 메타데이터 (51개 프로젝트)
│   └── projects-renderer.js     # 프로젝트 카드/모달 동적 렌더링
│
├── 📁 images/
│   ├── MyImage.png              # 프로필 이미지 (PNG 원본)
│   ├── MyImage.webp             # 프로필 이미지 (WebP, 90% 압축)
│   ├── og-thumbnail.jpg         # SNS 공유 썸네일
│   └── ...                      # 기타 아이콘 및 배경 이미지
│
├── 📁 Projects/                 # 51개 포트폴리오 프로젝트
│   ├── 3D_Maze/                 # Three.js 3D 미로 게임
│   ├── BilingualBuddy Project/  # 다국어 학습 플랫폼
│   ├── Bullet_Game/             # Unity WebGL 게임
│   ├── YGMK/                    # AI 쇼핑몰 신뢰도 분석
│   ├── Green_Connect/           # 친환경 커뮤니티
│   ├── CoCo/                    # AI 협력 플랫폼
│   └── ...                      # 기타 프로젝트
│
├── 📄 천규진의 이력서.pdf       # 이력서 (다운로드 가능)
├── 📄 천규진_자기소개서.pdf     # 자기소개서
│
├── 📄 README.md                 # 프로젝트 소개 문서
├── 📄 STRUCTURE.md             # 이 파일 (구조 및 아키텍처)
└── 📄 .gitignore               # Git 제외 파일 (분석/보고서 자동 제외)
```

---

## 🎯 핵심 파일 설명

### `index.html` - 메인 페이지
- **Hero 섹션**: 프로필 + 타이핑 애니메이션 (Typed.js)
- **프로젝트 섹션**: 동적 프로젝트 카드 렌더링
- **경력 섹션**: 경력 목록 및 상세 뷰
- **수상 섹션**: 수상 내역 (모달 팝업)
- **기술 스택**: 사용 기술 시각화 (Recharts)
- **댓글 시스템**: Giscus (비동기 로딩)
- **문의 폼**: Cloudflare Workers 연동

### `js/main.js` - 핵심 기능 모듈
```javascript
// 1. 이미지 Lazy Loading
- IntersectionObserver 기반 이미지 로드
- loading="lazy" 속성 + 데이터 속성 추적

// 2. 동적 라이브러리 로딩 (성능 최적화)
window.loadThreeJS()    // 3D 게임 필요 시만 로드
window.loadPDFJS()      // PDF 뷰어 필요 시만 로드
window.loadSwiper()     // 이미지 캐러셀 필요 시만 로드

// 3. 이미지 경로 자동 변환 (WebP 지원)
window.getOptimizedImagePath(imagePath) // PNG → WebP 자동 변환

// 4. 폼 처리 및 검증
- 연락처 폼 제출 (이메일 전송)
- 유효성 검사 및 에러 핸들링
```

### `js/projects-renderer.js` - 프로젝트 렌더링 엔진
```javascript
// 1. 프로젝트 카드 렌더링
- 썸네일 + WebP 자동 제공
- 반응형 레이아웃

// 2. 프로젝트 모달 상세 뷰
- 이미지 캐러셀 (Swiper)
- 기술 스택 + 문제 해결 스토리
- PDF 뷰어 (PDF.js)
- 비디오 및 외부 링크

// 3. 최적화 기능
- 모달 외부 클릭 시 메모리 정리
- 이미지 srcset으로 반응형 로드
- Swiper 인스턴스 재사용
```

### `js/projects-data.js` - 프로젝트 메타데이터
```javascript
// 51개 프로젝트 데이터 구조
{
  id: 고유 ID,
  title: 프로젝트명,
  thumbnail: PNG 썸네일,
  thumbnailWebp: WebP 썸네일,
  images: [원본 이미지들],
  imagesWebp: [WebP 이미지들],
  technologies: { frontend, backend, aiMl, infra },
  technicalTroubleshooting: [문제 해결 사례들],
  reflection: { achievements, learnings }
}
```

---

## ⚙️ 성능 최적화 전략

### 1️⃣ 초기 로드 (LCP 개선)
- **Giscus 비동기 로딩**: Intersection Observer로 댓글 섹션 진입 시에만 로드
- **Three.js/PDF.js 동적 로딩**: 필요할 때만 로드 (초기 로드 200KB+ 절감)
- **Tailwind CSS 비동기**: onload 콜백으로 스타일 적용 시 기존 화면 표시

### 2️⃣ 이미지 최적화
- **WebP 변환**: 51개 이미지 자동 변환 (-90% 용량)
- **Lazy Loading**: viewport 진입 시에만 로드
- **Responsive Image**: srcset으로 디바이스별 최적 크기 제공

### 3️⃣ 캐시 정책 (netlify.toml)
```toml
# CSS/JS/이미지: 1년 캐싱 (max-age=31536000)
# HTML: 변경 확인 캐싱 (max-age=0, must-revalidate)
# 반복 방문 50% 빠름
```

### 4️⃣ 코드 분할
- **CSS**: 전역 스타일만 main.css (Tailwind)
- **JavaScript**: 프로젝트 렌더러는 defer 로딩
- **라이브러리**: 동적 로드로 초기 번들 최소화

---

## 🚀 배포 및 성능 지표

### 현재 성능 (최적화 후)
| 항목 | 점수 | 상태 |
|------|------|------|
| **Performance** | 56→70+/100 | ⚠️→✓ (예상) |
| **Accessibility** | 85/100 | ✓ |
| **Best Practices** | 96/100 | ✓✓ |
| **SEO** | 100/100 | ✓✓ |

### Core Web Vitals (목표)
| 메트릭 | 현재 | 목표 | 상태 |
|--------|------|------|------|
| **LCP** (최대 콘텐츠 렌더링) | 9.95s | <2.5s | 개선 예상 |
| **CLS** (누적 레이아웃 이동) | 0.000 | <0.1 | ✓ 완벽 |
| **INP** (상호작용 응답) | - | <200ms | ✓ |

### 페이지 크기
- **HTML**: ~80KB
- **CSS**: ~200KB (Tailwind CDN)
- **JavaScript**: ~300KB (projects-data.js 포함)
- **이미지**: ~2MB (WebP 최적화)
- **총계**: ~2.5MB (최적화 후)

---

## 📚 기술 스택

### Frontend
- **HTML5** + **Tailwind CSS** (CDN 비동기 로딩)
- **Vanilla JavaScript** (동적 렌더링)
- **Typed.js** (타이핑 애니메이션)
- **Recharts** (데이터 시각화)

### 라이브러리 (동적 로드)
- **Three.js** (3D 렌더링)
- **PDF.js** (PDF 뷰어)
- **Swiper** (이미지 캐러셀)
- **Giscus** (댓글 시스템)

### 배포 & 인프라
- **Netlify** (정적 호스팅)
- **GitHub** (버전 관리)
- **Cloudflare Workers** (이메일 API)

### 개발 도구
- **Express.js** (로컬 개발 서버)
- **Sharp** (이미지 최적화)

---

## 🔧 로컬 개발 실행

```bash
# 1. 로컬 서버 실행
npm start
# 또는
node server.js

# 2. http://localhost:3000 접속

# 3. 개발 중 자동 새로고침 (라이브 서버 확장 설치)
```

---

## 📋 커밋 컨벤션

```
feat: 새 기능 추가
fix: 버그 수정
perf: 성능 개선 (이미지 최적화, 캐시 정책 등)
refactor: 코드 리팩토링
docs: 문서 작성/수정
```

**예:**
```
perf: Giscus 댓글 비동기 로딩 및 WebP 이미지 적용
```

---

## 🎓 학습 및 개선 사항

### ✅ 이미 적용된 최적화
1. **Giscus 비동기 로딩** - 초기 로드 50~100ms 단축
2. **WebP 이미지 변환** - 파일 크기 90% 감소
3. **동적 라이브러리 로딩** - 초기 스크립트 200KB 절감
4. **Netlify 캐시 정책** - 반복 방문 50% 빠름
5. **Intersection Observer 활용** - CPU/메모리 효율적 로딩

### 🔮 향후 개선 방향
- [ ] Image CDN 도입 (Cloudinary, ImgIX)
- [ ] Service Worker 구현 (오프라인 캐싱)
- [ ] Code Splitting으로 번들 최적화
- [ ] 동적 import()로 라우트별 코드 분할
- [ ] 데이터베이스 도입 (프로젝트 메타데이터 관리)

---

## 📞 문의 및 피드백

**포트폴리오 URL**: https://cj5427533-portfolio.netlify.app/

**GitHub**: https://github.com/cj5427533

**이메일**: cj542753303@gmail.com
