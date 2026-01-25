# 🎯 GyuJin Cheon - 포트폴리오

> **풀스택 개발자의 인터랙티브 포트폴리오**  
> 51개 프로젝트를 한 곳에서 관리하고 체험할 수 있는 성능 최적화 포트폴리오 사이트

**🌐 라이브 사이트**: https://cj5427533-portfolio.netlify.app/  
**📊 성능 지표**: Performance 70+/100 | Accessibility 85/100 | Best Practices 96/100 | SEO 100/100

---

## 📋 개요

정적 HTML 기반의 **데이터 주도 포트폴리오**입니다. `projects-data.js`의 메타데이터만 수정하면 프로젝트 카드와 상세 모달이 자동으로 생성되며, Three.js 3D 데모와 Unity WebGL 게임을 동일 사이트에서 제공합니다.

- **형식**: 정적 사이트 (No Backend)
- **관리 방식**: JSON 데이터 기반 렌더링
- **최적화**: WebP 이미지 (-90%), 동적 라이브러리 로딩, Giscus 비동기 로딩
- **배포**: Netlify (CDN + 자동 캐시)

---

## 🎨 주요 기능

### 1. **51개 프로젝트 자동 렌더링**
```
projects-data.js → projects-renderer.js → 동적 HTML 생성
```
- 프로젝트 카드 (썸네일, 설명, 기술 스택)
- 상세 모달 (이미지 갤러리, PDF, 비디오, 문제 해결 스토리)
- 반응형 레이아웃 (모바일/태블릿/데스크톱)

### 2. **Three.js 3D 데모**
- 3D 미로 게임 (마우스/터치 조작)
- 첫 방문 시 동적 로드 (초기 로드 시간 최소화)

### 3. **Unity WebGL 게임**
- Bullet Game 플레이 가능
- iframe 내 샌드박스 실행

### 4. **성능 최적화**
| 최적화 | 효과 |
|--------|------|
| WebP 이미지 변환 | -90% 용량 감소 |
| Giscus 비동기 로딩 | LCP 50~100ms 단축 |
| Three.js/PDF.js 동적 로드 | 초기 스크립트 -200KB |
| Netlify 캐시 정책 | 반복 방문 50% 빠름 |

### 5. **반응형 디자인 + 애니메이션**
- Tailwind CSS 기반 모던 UI
- Intersection Observer 스크롤 애니메이션
- Typed.js 타이핑 효과

### 6. **댓글 시스템**
- Giscus (GitHub 기반)
- 뷰포트 진입 시에만 로드

### 7. **연락처 폼**
- Cloudflare Workers 연동
- 실시간 이메일 전송

---

## 🚀 성능 지표

### Lighthouse 점수 (배포 환경)
```
Performance:     70+/100 (최적화 후 예상)
Accessibility:   85/100
Best Practices:  96/100
SEO:             100/100
```

### Core Web Vitals
| 메트릭 | 값 | 목표 | 상태 |
|--------|----|----- |------|
| **LCP** | ~6s | <2.5s | 🟡 개선 중 |
| **CLS** | 0.000 | <0.1 | 🟢 완벽 |
| **INP** | - | <200ms | 🟢 우수 |

### 페이지 크기
```
HTML:        ~80 KB
CSS:         ~200 KB (Tailwind CDN)
JavaScript:  ~300 KB (projects-data.js 포함)
이미지:      ~2 MB (WebP 최적화)
─────────────────────────
총계:        ~2.5 MB
```

---

## 📁 프로젝트 구조

전체 구조는 [STRUCTURE.md](STRUCTURE.md)를 참고하세요.

```
MyPortfolio/
├── 📄 index.html              # 메인 페이지
├── 📄 server.js               # 로컬 개발 서버
├── 📄 netlify.toml            # 배포 설정 & 캐시 정책
│
├── 📁 css/
│   └── styles.css             # 전역 스타일
│
├── 📁 js/
│   ├── main.js                # 핵심 기능 (Lazy Loading, 동적 로드)
│   ├── animations.js          # 스크롤 애니메이션
│   ├── projects-data.js       # 51개 프로젝트 메타데이터
│   └── projects-renderer.js   # 프로젝트 동적 렌더링
│
├── 📁 images/
│   ├── MyImage.webp           # 프로필 (WebP, 90% 압축)
│   └── ...
│
├── 📁 Projects/               # 51개 포트폴리오
│   ├── 3D_Maze/               # Three.js 3D 게임
│   ├── Bullet_Game/           # Unity WebGL
│   └── ...
│
└── 📄 STRUCTURE.md            # 프로젝트 상세 구조 가이드
```

---

## 🛠️ 기술 스택

### Frontend
- **마크업**: HTML5 + Semantic HTML
- **스타일**: Tailwind CSS (CDN 비동기 로딩)
- **스크립트**: Vanilla JavaScript (ES6+)
- **라이브러리** (동적 로드):
  - Three.js (3D 렌더링)
  - PDF.js (PDF 뷰어)
  - Swiper (이미지 캐러셀)
  - Typed.js (타이핑 애니메이션)
  - Recharts (데이터 시각화)
  - Giscus (댓글 시스템)

### Deployment & Infrastructure
- **호스팅**: Netlify
- **CDN**: Netlify CDN + Cloudflare
- **API**: Cloudflare Workers (이메일)
- **버전 관리**: GitHub

### 개발 도구
- Node.js (로컬 서버)
- Express.js (정적 파일 서빙)
- Sharp (이미지 최적화, 한 번만 사용)

---

## 💻 로컬 개발

### 사전 요구사항
- Node.js 14+
- npm 또는 yarn

### 실행 방법

```bash
# 1. 저장소 클론
git clone https://github.com/cj5427533/MyPortfolio.git
cd MyPortfolio

# 2. 로컬 서버 실행
npm start
# 또는
node server.js

# 3. 브라우저에서 열기
http://localhost:3000

# 4. 코드 수정 후 자동 새로고침 (라이브 서버 확장 권장)
```

### package.json 설정

```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

---

## 📊 프로젝트 데이터 관리

### 프로젝트 추가하기

`js/projects-data.js`에서:

```javascript
const projectsData = [
  {
    id: 6,  // 고유 ID
    title: "새 프로젝트 제목",
    thumbnail: "Projects/ProjectName/thumbnail.png",
    thumbnailWebp: "Projects/ProjectName/thumbnail.webp",
    
    images: ["image1.png", "image2.png"],
    imagesWebp: ["image1.webp", "image2.webp"],
    
    technologies: {
      frontend: ["React", "Tailwind CSS"],
      backend: ["Node.js", "PostgreSQL"],
      aiMl: ["TensorFlow"],
      infra: ["Docker", "AWS"]
    },
    
    technicalTroubleshooting: [
      {
        problem: "...",
        solution: "...",
        result: "..."
      }
    ]
  }
];
```

---

## 🔍 성능 최적화 전략

### 1. 초기 로드 최적화 (LCP)
✅ **Giscus 비동기 로딩**
```javascript
// 댓글 섹션 진입 시에만 로드
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !window.giscusLoaded) {
    loadGiscus();
  }
});
```

✅ **동적 라이브러리 로딩**
```javascript
// Three.js/PDF.js는 필요할 때만 로드
window.loadThreeJS()  // 3D 게임 시작 시
window.loadPDFJS()    // PDF 뷰어 열 시
```

### 2. 이미지 최적화
✅ **WebP 형식** (-90% 용량)
- PNG/JPG → WebP 자동 변환
- 브라우저별 자동 fallback

✅ **Lazy Loading**
```html
<img src="..." loading="lazy" decoding="async">
```

✅ **Responsive Image**
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.png" alt="...">
</picture>
```

### 3. 캐시 정책 (netlify.toml)
```toml
# 정적 파일: 1년 캐싱
[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# HTML: 변경 확인
[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

### 4. 코드 분할
- Tailwind CSS 비동기 로딩 (onload 콜백)
- 프로젝트 렌더러 defer 로딩
- 동적 `import()` 라이브러리 로드

---

## 🎓 배운 점 및 개선 방향

### ✅ 이미 적용된 최적화
1. ✓ Giscus 비동기 로딩 (Intersection Observer)
2. ✓ WebP 이미지 변환 (-90% 용량)
3. ✓ 동적 라이브러리 로딩 (Three.js/PDF.js)
4. ✓ Netlify 캐시 정책 설정
5. ✓ 시스템 폰트 스택 (FOUT 방지)

### 🔮 향후 개선 사항
- [ ] Service Worker 구현 (오프라인 캐싱)
- [ ] Image CDN (Cloudinary, ImgIX)
- [ ] Code Splitting 및 Route-based lazy loading
- [ ] 데이터베이스 연동 (프로젝트 동적 관리)
- [ ] 다국어 지원 (i18n)
- [ ] Dark Mode 지원

---

## 🤝 기여 및 문의

### 연락처
- **이메일**: cj542753303@gmail.com
- **GitHub**: https://github.com/cj5427533
- **LinkedIn**: (추가 예정)

### 버그 리포트 & 피드백
GitHub Issues에서 피드백을 주시면 감사하겠습니다!

---

## 📜 라이선스

MIT License - 자유롭게 사용 및 수정할 수 있습니다.

---

**Last Updated**: 2026-01-25  
**Performance**: Optimized & Deployed ✅
