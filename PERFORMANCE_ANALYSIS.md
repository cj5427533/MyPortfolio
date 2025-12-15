# PageSpeed Insights 성능 분석 및 개선안

## 📊 현재 성능 점수 (모바일 기준)

| 항목 | 점수 | 상태 |
|------|------|------|
| **성능 (Performance)** | 76점 | ⚠️ 개선 필요 |
| **접근성 (Accessibility)** | 86점 | ⚠️ 개선 필요 |
| **권장사항 (Best Practices)** | 96점 | ✅ 양호 |
| **검색엔진 최적화 (SEO)** | 100점 | ✅ 매우 우수 |

## 🔴 주요 성능 지표 (Core Web Vitals)

| 지표 | 현재 값 | 목표 값 | 상태 |
|------|---------|---------|------|
| **FCP (First Contentful Paint)** | 3.0초 | < 1.8초 | 🔴 개선 필요 |
| **LCP (Largest Contentful Paint)** | 3.3초 | < 2.5초 | 🔴 개선 필요 |
| **TBT (Total Blocking Time)** | 280ms | < 200ms | 🟠 개선 권장 |
| **CLS (Cumulative Layout Shift)** | 0.01 | < 0.1 | ✅ 양호 |
| **Speed Index** | 6.4초 | < 3.4초 | 🔴 개선 필요 |

## 🚨 심각한 문제점 (빨간색 경고)

### 1. 렌더링 차단 요청 (Render-blocking resources)
- **예상 절감 시간: 1,750ms**
- **원인:**
  - Tailwind CSS CDN (`https://cdn.tailwindcss.com`)이 `<head>`에서 동기적으로 로드됨
  - Typed.js 라이브러리 (`https://cdn.jsdelivr.net/npm/typed.js@2.0.12`)가 렌더링을 차단
- **영향:** 페이지 초기 렌더링이 1.75초 지연됨

### 2. 기본 스레드 작업 최소화 (Minimize main-thread work)
- **문제:** 기본 스레드에서 3.2초의 작업 시간
- **원인:**
  - 대량의 JavaScript 실행
  - 복잡한 애니메이션 로직
  - 동적 DOM 조작

### 3. 네트워크 페이로드 크기 (Keep request counts low and transfer sizes small)
- **현재 크기:** 6,695KiB (약 6.7MB)
- **문제:** 모바일 환경에서 로딩 시간이 매우 길어짐

### 4. 이미지 최적화 (Optimize images)
- **예상 절감 용량: 4,320KiB (약 4.3MB)**
- **문제:**
  - 이미지가 압축되지 않음
  - WebP/AVIF 형식 미사용
  - 적절한 크기로 리사이징되지 않음

### 5. 이미지 요소에 width/height 속성 부재
- **문제:** 이미지 로드 시 레이아웃 이동(CLS) 발생 가능
- **영향:** 사용자 경험 저하

## 🟠 개선 권장 사항 (주황색 경고)

### 1. 사용하지 않는 JavaScript 제거 (Remove unused JavaScript)
- **예상 절감 용량: 209KiB**
- **원인:** 프로젝트에서 사용하지 않는 라이브러리나 코드

### 2. JavaScript 압축 (Minimize JavaScript)
- **예상 절감 용량: 12KiB**
- **방법:** 코드 압축(minification) 적용

### 3. 효율적인 캐시 정책 (Serve static assets with an efficient cache policy)
- **예상 절감 용량: 23KiB**
- **문제:** 정적 리소스에 캐시 헤더가 없거나 짧음

## 🔵 접근성 문제

### 1. 색상 대비 부족
- **문제:** 텍스트와 배경의 대비율이 WCAG 기준 미달
- **영향:** 시각 장애인 사용자의 가독성 저하

### 2. iframe 제목 부재
- **문제:** PDF를 표시하는 `<iframe>` 요소에 `title` 속성이 없음
- **영향:** 스크린 리더 사용자가 콘텐츠를 이해하기 어려움
- **발견된 위치:** 6개의 PDF iframe

### 3. 문서 랜드마크 부족
- **문제:** `<main>`, `<header>`, `<nav>`, `<footer>` 등 시맨틱 랜드마크 요소 부족
- **영향:** 보조 기술 사용자가 페이지 구조를 파악하기 어려움

## ⚠️ 오류

### 1. MyImage.png 로드 실패
- **오류:** `Failed to load resource: net::ERR_CONNECTION_FAILED`
- **위치:** `/images/MyImage.png`
- **원인:** 파일 경로 문제 또는 네트워크 오류

---

## 🛠️ 개선안

### 우선순위 1: 즉시 개선 (High Priority)

#### 1.1 렌더링 차단 리소스 제거
```html
<!-- 현재 (문제) -->
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>

<!-- 개선안 -->
<!-- 방법 1: Tailwind CSS 빌드 버전 사용 -->
<link rel="stylesheet" href="css/tailwind.min.css">

<!-- 방법 2: 또는 비동기 로드 -->
<link rel="preload" href="https://cdn.tailwindcss.com" as="script">
<script src="https://cdn.tailwindcss.com" defer></script>
```

**예상 효과:** FCP 1.75초 개선

#### 1.2 이미지 최적화
- **WebP/AVIF 형식 변환**
- **이미지 압축** (TinyPNG, ImageOptim 등 사용)
- **반응형 이미지** (`<picture>` 태그 사용)
- **Lazy loading** (이미 적용됨, 확인 필요)

**예상 효과:** 4.3MB 용량 절감, LCP 개선

#### 1.3 이미지에 width/height 속성 추가
```html
<!-- 현재 -->
<img src="images/MyImage.png" alt="Profile">

<!-- 개선안 -->
<img src="images/MyImage.png" alt="Profile" width="192" height="192">
```

**예상 효과:** CLS 방지, 레이아웃 안정성 향상

#### 1.4 MyImage.png 로드 오류 수정
- 파일 경로 확인
- 파일 존재 여부 확인
- 네트워크 설정 확인

### 우선순위 2: 중기 개선 (Medium Priority)

#### 2.1 JavaScript 최적화
- **코드 분할 (Code Splitting)**
- **사용하지 않는 코드 제거** (Tree shaking)
- **JavaScript 압축** (Minification)
- **비동기/지연 로드** (`defer`, `async` 속성)

**예상 효과:** 221KiB 절감, TBT 개선

#### 2.2 접근성 개선
```html
<!-- iframe 제목 추가 -->
<iframe 
    src="Projects/YGMK/2025_재능대컴소과_캡스톤대상.pdf"
    title="2025 재능대 컴퓨터소프트웨어학과 캡스톤 대상 수상 증명서"
    loading="lazy">
</iframe>

<!-- 시맨틱 랜드마크 추가 -->
<header>...</header>
<main>...</main>
<footer>...</footer>
```

**색상 대비 개선:**
- 텍스트와 배경의 대비율을 최소 4.5:1 (일반 텍스트) 또는 3:1 (큰 텍스트)로 조정
- 대비 검사 도구 사용 (WebAIM Contrast Checker)

#### 2.3 캐시 정책 설정
```javascript
// server.js 또는 Netlify 설정
// Cache-Control 헤더 추가
app.use(express.static('public', {
    maxAge: '1y', // 1년 캐시
    immutable: true
}));
```

**Netlify 설정 (`netlify.toml`):**
```toml
[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/js/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 우선순위 3: 장기 개선 (Low Priority)

#### 3.1 기본 스레드 작업 최적화
- **Web Workers 활용** (무거운 계산 작업)
- **애니메이션 최적화** (CSS transforms, will-change 사용)
- **디바운싱/스로틀링** (스크롤 이벤트)

#### 3.2 리소스 우선순위 설정
```html
<!-- 중요한 리소스 -->
<link rel="preload" href="css/styles.css" as="style">
<link rel="preload" href="images/MyImage.png" as="image" fetchpriority="high">

<!-- 덜 중요한 리소스 -->
<script src="js/animations.js" defer></script>
```

#### 3.3 서비스 워커 및 오프라인 지원
- PWA 기능 추가
- 오프라인 캐싱
- 백그라운드 동기화

---

## 📈 예상 개선 효과

| 개선 항목 | 예상 개선 효과 |
|-----------|----------------|
| 렌더링 차단 제거 | FCP -1.75초, LCP -1.75초 |
| 이미지 최적화 | 네트워크 용량 -4.3MB, LCP -1.5초 |
| JavaScript 최적화 | TBT -100ms, 네트워크 용량 -221KiB |
| 이미지 width/height | CLS 유지 (현재 양호) |
| 접근성 개선 | 접근성 점수 +10점 |

**예상 최종 성능 점수:**
- 성능: 76점 → **90점 이상**
- 접근성: 86점 → **95점 이상**

---

## 🎯 실행 계획

### Phase 1: 즉시 적용 (1일)
1. ✅ 렌더링 차단 리소스 최적화
2. ✅ 이미지 width/height 속성 추가
3. ✅ iframe title 속성 추가
4. ✅ MyImage.png 오류 수정

### Phase 2: 단기 개선 (1주일)
1. ✅ 이미지 최적화 (WebP 변환, 압축)
2. ✅ JavaScript 압축 및 최적화
3. ✅ 캐시 정책 설정
4. ✅ 시맨틱 랜드마크 추가

### Phase 3: 중기 개선 (1개월)
1. ✅ 색상 대비 개선
2. ✅ 코드 분할 및 Tree shaking
3. ✅ 기본 스레드 작업 최적화

---

## 📚 참고 자료

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Web.dev Performance](https://web.dev/performance/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [MDN Web Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)
