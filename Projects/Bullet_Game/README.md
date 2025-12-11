# 탄막 슈팅 게임 (Dodge Game)

Unity 엔진을 사용하여 개발한 3D 탄막 슈팅 게임입니다. 플레이어는 회전하는 스포너에서 발사되는 탄막을 피하며 최대한 오래 생존하는 것이 목표입니다.

## 📋 프로젝트 개요

이 프로젝트는 Unity 2022.3.42f1 버전을 사용하여 개발된 3D 탄막 슈팅 게임입니다. 플레이어는 원형 맵에서 이동하며 적의 탄막을 회피하고, 아이템을 수집하여 생존 시간을 늘려나갑니다. 시간이 지날수록 난이도가 점진적으로 증가하는 시스템을 구현했습니다.

## 🎮 주요 기능

### 1. 게임플레이 시스템
- **플레이어 이동**: WASD 키 또는 방향키를 사용한 부드러운 3D 이동
- **탄막 시스템**: 회전하는 스포너에서 플레이어를 향해 발사되는 탄막
- **생명 시스템**: 하트 UI로 표시되는 생명력 시스템 (난이도별 초기 생명력 다름)
- **점수 시스템**: 생존 시간에 따른 점수 계산 (1초당 500점)

### 2. 난이도 시스템
- **3가지 난이도**: Easy, Medium, Hard
- **난이도별 차별화**:
  - Easy: 초기 생명력 5개
  - Medium: 초기 생명력 3개
  - Hard: 초기 생명력 2개
- **페이즈 시스템**: 10초마다 페이즈가 진행되며 탄막 속도가 점진적으로 증가

### 3. 아이템 시스템
- **체력 회복 아이템**: 생명력을 1 회복 (최대 생명력까지)
- **무적 아이템**: 3초간 무적 상태 (탄막 피해 무시)
- **점수 아이템**: 점수 1000점 추가

### 4. UI/UX 시스템
- **실시간 점수 표시**: 현재 점수 및 생존 시간 표시
- **생명력 UI**: 하트 아이콘으로 현재 생명력 표시
- **페이즈 알림**: 페이즈 전환 시 화면 중앙에 알림 표시
- **게임 오버 화면**: 최고 점수 및 최고 생존 시간 표시
- **메뉴 시스템**: 시작 화면, 옵션 화면, 규칙 설명 화면

### 5. 사운드 시스템
- **BGM 관리**: 씬별로 다른 BGM 재생
- **효과음**: 버튼 클릭 효과음
- **사운드 매니저**: 싱글톤 패턴으로 구현된 사운드 관리 시스템

### 6. 데이터 관리
- **최고 기록 저장**: 난이도별 최고 점수 및 최고 생존 시간 저장
- **씬 전환 관리**: DifficultyManager를 통한 씬 간 데이터 유지

## 🛠️ 기술 스택

- **엔진**: Unity
- **언어**: C#
- **3D 모델링**: Blender
- **UI**: Unity UI, TextMeshPro
- **물리**: Unity Physics (Rigidbody, Collider)
- **애니메이션**: Unity Animator

## 📁 프로젝트 구조

```
탄막게임(Unity)/
├── Assets/
│   ├── Scripts/              # 게임 로직 스크립트
│   │   ├── GameManager.cs           # 게임 전체 관리 (점수, 생명력, 아이템 스폰)
│   │   ├── PlayerContriior.cs       # 플레이어 이동 및 애니메이션 제어
│   │   ├── BulletSpawner.cs         # 탄막 스포너 회전 및 발사 로직
│   │   ├── Bullet.cs                # 탄막 이동 및 충돌 처리
│   │   ├── ItemManager.cs           # 아이템 효과 처리
│   │   ├── DifficultyManager.cs     # 난이도 및 기록 관리 (싱글톤)
│   │   ├── SoundManager.cs          # 사운드 관리 (싱글톤)
│   │   ├── ButtonClickHandler.cs    # UI 버튼 이벤트 처리
│   │   ├── Button.cs                # 버튼 이벤트 처리
│   │   └── Rotator.cs               # 회전 로직
│   ├── Scenes/              # 게임 씬
│   │   ├── StartScene.unity         # 시작 화면
│   │   ├── MainScene.unity          # 메인 메뉴
│   │   ├── InGameScene.unity        # 인게임 화면
│   │   ├── OptionScene.unity        # 옵션 화면
│   │   └── RuleScene.unity          # 규칙 설명 화면
│   ├── Prefabs/             # 게임 오브젝트 프리팹
│   │   ├── Player.prefab
│   │   ├── Bullet.prefab
│   │   ├── Bullet Spawner.prefab
│   │   ├── Enemy A/B/C/D.prefab
│   │   ├── HealItem.prefab
│   │   ├── Invincibility.prefab
│   │   ├── ScoreItem.prefab
│   │   └── Life.prefab
│   ├── Materials/           # 머티리얼
│   │   ├── Player Color.mat
│   │   ├── Bullet Color.mat
│   │   ├── Enemy B/D.mat
│   │   ├── Floor Color.mat
│   │   ├── HealItem Color.mat
│   │   ├── Invincibility Color.mat
│   │   └── ScoreItem Color.mat
│   ├── Models/              # 3D 모델 및 관련 리소스
│   │   ├── Simple Player.fbx
│   │   ├── Simple Enemy A/D.fbx
│   │   ├── Wall.fbx
│   │   └── UI 텍스처 (이동 예정)
│   ├── Textures/            # 텍스처 리소스
│   │   ├── Player.png
│   │   ├── Enemy B/D.png
│   │   ├── Floor.png
│   │   ├── Item Heart.png
│   │   ├── _Pattern.png
│   │   └── UI/               # UI 텍스처
│   │       └── (UI 관련 텍스처들)
│   ├── Animator/            # 애니메이션 컨트롤러
│   │   └── Player animator.controller
│   ├── BGM/                 # 배경음악
│   │   └── coverbgm.prefab
│   ├── SOUND/               # 효과음
│   │   ├── BGM1.wav
│   │   ├── BGM2.mp3
│   │   ├── Click.mp3
│   │   └── (기타 효과음 파일들)
│   └── TextMesh Pro/        # TextMeshPro 리소스
├── ProjectSettings/         # Unity 프로젝트 설정
├── Packages/                # 패키지 관리
├── Library/                 # Unity 라이브러리 (자동 생성)
├── Temp/                    # 임시 파일 (자동 생성)
├── UserSettings/            # 사용자 설정
├── Logs/                    # 로그 파일
├── Dodge.sln               # Visual Studio 솔루션 파일
└── README.md               # 프로젝트 문서
```

## 🎯 핵심 구현 사항

### 1. 싱글톤 패턴 활용
- `DifficultyManager`: 난이도 설정 및 최고 기록 관리
- `SoundManager`: 씬 전환 시에도 유지되는 사운드 관리

### 2. 코루틴을 활용한 비동기 처리
- 아이템 스폰 시스템
- 무적 상태 카운트다운
- 페이즈 전환 알림

### 3. 이벤트 기반 시스템
- 씬 로드 이벤트를 활용한 초기화
- 충돌 감지를 통한 아이템 획득 및 피해 처리

### 4. 점진적 난이도 증가
- 페이즈마다 탄막 속도 증가
- 시간에 따른 게임 난이도 자동 조절

## 🎮 게임 조작법

- **이동**: WASD 키 또는 방향키
- **재시작**: 게임 오버 후 R 키
- **메인 메뉴로**: 게임 오버 후 T 키

## 📸 게임 화면

게임 플레이 스크린샷은 `Assets/화면 캡처 2024-12-01 210405.jpg` 파일에서 확인할 수 있습니다.

**참고**: 스크린샷은 프로젝트 정리 과정에서 별도의 `Screenshots/` 폴더로 이동될 예정입니다.

## 🚀 실행 방법

1. Unity Hub를 통해 Unity 2022.3.42f1 버전 설치
2. 프로젝트 폴더를 Unity Hub에 추가
3. 프로젝트 열기
4. `Assets/Scenes/StartScene.unity` 씬을 열고 Play 버튼 클릭

## 💡 개선 가능한 사항

- [ ] 모바일 플랫폼 지원 (터치 조작)
- [ ] 파티클 효과 추가
- [ ] 보스 전 시스템 추가
- [ ] 온라인 리더보드 연동
- [ ] 다양한 탄막 패턴 추가
- [ ] 플레이어 스킬 시스템

## 📝 개발 기간

2024년 개발 (정확한 기간은 프로젝트 일정에 따라 다를 수 있습니다)

## 👨‍💻 개발자

개발자 포트폴리오 프로젝트

---

**참고**: 이 프로젝트는 Unity 학습 및 포트폴리오 목적으로 제작되었습니다.

