# 3D 공 굴리기 미로 게임

Three.js로 만든 간단한 물리 퍼즐 게임입니다. 판을 기울여 공을 굴려 노란 목표 지점에 도달하면 클리어됩니다.

## 특징
- 키보드(화살표/WASD)로 판 기울이기
- 일시정지/계속하기 토글 및 타이머 표시
- 승리 시 파티클 효과와 재시작 버튼
- 가로·세로 20% 확장된 맵, 완화된 골인 판정(반경 0.9)

## 조작법
- 이동: `화살표` 또는 `W/A/S/D`
- 일시정지/계속하기: 오른쪽 상단 `정지` 버튼
- 재시작: `R` 키 (클리어 후에도 가능)

## 실행 방법
1) 루트 `index.html`을 브라우저로 열면 페이지 내 3D Maze 섹션에서 바로 플레이할 수 있습니다.  
2) 다른 페이지나 모달에서 사용할 경우:
   - 컨테이너에 `<canvas id="maze-game"></canvas>`와 `game-container`, `timer`, `level`, `game-instructions`, `pause-toggle` 요소를 배치
   - 스크립트 로드: Three.js(CDN) → `Projects/3D_Maze/maze-game.js`
   - 초기화: `initGame('maze-game', 'game-container', 'timer', 'level', 'game-instructions', 'pause-toggle');`

## 주요 파일
- `maze-game.js`: 게임 로직

## 주의사항
- 로컬 스토리지에 최고 기록(`maze-best-time`)을 저장합니다. 기록을 초기화하려면 브라우저 로컬 스토리지를 지우세요.
