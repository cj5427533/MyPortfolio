// maze-game.js
document.addEventListener('DOMContentLoaded', function() {
    // 메인 페이지의 게임이 시작될 준비가 되었는지 확인
    if (document.getElementById('maze-game')) {
        // Three.js를 동적으로 로드 후 게임 시작
        if (window.loadThreeJS) {
            window.loadThreeJS().then(() => {
                initGame('maze-game', 'game-container', 'timer', 'level', 'game-instructions');
            });
        }
    }
});

// 게임 초기화 함수 (동적 ID 지원)
function initGame(canvasId, containerId, timerId, levelId, instructionsId, pauseButtonId = 'pause-toggle') {
    // 게임 관련 변수 선언
    let scene, camera, renderer;
    let plane, ball, walls = [], goal;
    const tiltMax = 0.25; // 최대 기울기
    const tiltLerp = 0.15; // 기울기 보간 속도
    const acceleration = 0.02; // 기울기에 따른 가속도
    const friction = 0.985; // 마찰로 서서히 감속
    const maxSpeed = 0.35; // 최대 속도 제한
    const keyState = { up: false, down: false, left: false, right: false };
    let isGameActive = true;
    let gameEnded = false;
    let timer = 0;
    let timerInterval;
    let particles = []; // 파티클 배열
    let bestTime = localStorage.getItem('maze-best-time') ? parseInt(localStorage.getItem('maze-best-time')) : null; // 최고 기록
    let cameraAnimation = null; // 카메라 애니메이션
    
    // 씬, 카메라, 렌더러 설정
    setupScene();
    
    // 게임 요소 생성
    createGameElements();
    
    // 이벤트 리스너 설정
    setupEventListeners();
    
    // 애니메이션 루프 시작
    animate();
    
    // 씬, 카메라, 렌더러를 설정하는 함수
    function setupScene() {
        // 게임 캔버스 가져오기
        const canvas = document.getElementById(canvasId);
        const container = document.getElementById(containerId);
        
        if (!canvas || !container) {
            console.error(`게임 요소를 찾을 수 없습니다: canvas=${canvasId}, container=${containerId}`);
            return;
        }
        
        // 씬 생성
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x87CEEB); // 하늘색 배경
        
        // 카메라 설정
        camera = new THREE.PerspectiveCamera(
            75, // 시야각
            container.clientWidth / container.clientHeight, // 화면 비율
            0.1, // 가까운 클리핑 평면
            1000 // 먼 클리핑 평면
        );
        // 카메라 설정 수정
        camera.position.set(0, 7, 7); 
        camera.lookAt(0, 0, 0); // 카메라가 바라보는 지점
        
        // 렌더러 설정
        renderer = new THREE.WebGLRenderer({ 
            canvas: canvas,
            antialias: true // 부드러운 렌더링
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.shadowMap.enabled = true; // 그림자 활성화
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 부드러운 그림자
        
        // 조명 추가
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 20, 10);
        directionalLight.castShadow = true; // 그림자 캐스팅 활성화
        directionalLight.shadow.mapSize.width = 2048; // 그림자 해상도
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;
        directionalLight.shadow.camera.left = -10;
        directionalLight.shadow.camera.right = 10;
        directionalLight.shadow.camera.top = 10;
        directionalLight.shadow.camera.bottom = -10;
        scene.add(directionalLight);
        
        // 창 크기 변경 시 대응
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }
    
    // 게임 요소(미로, 공, 골인 지점) 생성 함수
    function createGameElements() {
        // 기본 재질 설정
        const planeMaterial = new THREE.MeshStandardMaterial({
            color: 0x44aa88,
            roughness: 0.5
        });
        
        // 바닥 평면 생성
        const planeGeometry = new THREE.BoxGeometry(12, 0.2, 12); // 20% 확장된 바닥
        plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.y = -0.1; // 위치 조정
        plane.receiveShadow = true; // 그림자 받기
        scene.add(plane);
        
        // 공 생성 (반지름 0.5)
        const ballGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const ballMaterial = new THREE.MeshStandardMaterial({
            color: 0xff4400,
            metalness: 0.3,
            roughness: 0.2
        });
        ball = new THREE.Mesh(ballGeometry, ballMaterial);
        ball.position.set(-4.8, 0.5, -4.8); // 20% 확장에 맞춰 시작점 이동
        ball.castShadow = true;
        scene.add(ball);
        
        // 벽 생성
        createWalls();
        
        // 골인 지점 생성 (발광 효과 추가) - 노란색
        // 음료수 캔처럼 세로 원통형으로 높이 증가
        const goalGeometry = new THREE.CylinderGeometry(0.35, 0.35, 1.2, 32);
        const goalMaterial = new THREE.MeshStandardMaterial({
            color: 0xffff00, // 노란색
            roughness: 0.3,
            metalness: 0.2,
            emissive: 0xffff00, // 발광 색상 (노란색)
            emissiveIntensity: 0.3 // 발광 강도
        });
        goal = new THREE.Mesh(goalGeometry, goalMaterial);
        goal.position.set(4.8, 0.6, 4.8); // 20% 확장에 맞춰 목표 위치 이동
        goal.castShadow = true;
        goal.receiveShadow = true;
        scene.add(goal);
        
        // 골인 지점 주변에 포인트 라이트 추가 (발광 효과 강화) - 노란색
        const goalLight = new THREE.PointLight(0xffff00, 1, 5);
        goalLight.position.set(4, 1.2, 4);
        scene.add(goalLight);
        goal.userData.light = goalLight; // 라이트를 goal에 연결
    }
    
    // 벽 만들기 함수
    function createWalls() {
        const wallMaterial = new THREE.MeshStandardMaterial({
            color: 0x8844aa,
            roughness: 0.7
        });
        
        // 기본 미로 벽 배치 (원래 구조로 복원)
        // 가로 벽
        createWall(-2.4, 0, 2.4, 4.8, 0.5, wallMaterial);
        createWall(2.4, 0, -2.4, 4.8, 0.5, wallMaterial);
        
        // 세로 벽
        createWall(0, 0, 0, 0.5, 4.8, wallMaterial);
        createWall(-3.6, 0, -2.4, 0.5, 2.4, wallMaterial);
        createWall(3.6, 0, 2.4, 0.5, 2.4, wallMaterial);
    }
    
    // 벽 생성 헬퍼 함수
    function createWall(x, y, z, width, depth, material) {
        const wallGeometry = new THREE.BoxGeometry(width, 1, depth);
        const wall = new THREE.Mesh(wallGeometry, material);
        wall.position.set(x, y + 0.5, z); // y+0.5로 바닥 위에 위치
        wall.castShadow = true; // 그림자 캐스팅
        wall.receiveShadow = true; // 그림자 받기
        scene.add(wall);
        walls.push(wall); // 벽 배열에 추가하여 충돌 감지에 사용
    }
    
    // 타이머 시작 함수
    function startTimer() {
        clearInterval(timerInterval);
        timer = 0;
        const timerElement = document.getElementById(timerId);
        if (timerElement) {
            timerElement.textContent = timer;
        }
        
        timerInterval = setInterval(() => {
            timer++;
            if (timerElement) {
                timerElement.textContent = timer;
            }
        }, 1000);
    }

    function resumeTimer() {
        clearInterval(timerInterval);
        const timerElement = document.getElementById(timerId);
        timerInterval = setInterval(() => {
            timer++;
            if (timerElement) {
                timerElement.textContent = timer;
            }
        }, 1000);
    }
    
    // 이벤트 리스너 설정 함수
    function setupEventListeners() {
        const gameContainer = document.getElementById(containerId);
        if (!gameContainer) return;
        gameContainer.focus();
        const pauseButton = pauseButtonId ? document.getElementById(pauseButtonId) : null;
        
        // 마우스가 게임 영역에 들어올 때 타이머 시작
        let isTimerStarted = false;
        gameContainer.addEventListener('mouseenter', () => {
            if (!isTimerStarted && isGameActive) {
                startTimer();
                isTimerStarted = true;
            }
        });
        
        // 키보드 이벤트를 window에 연결 (전역으로 처리)
        window.addEventListener('keydown', (event) => {
            const key = event.key;
            if (!isGameActive && key.toLowerCase() === 'r') {
                resetGame();
                return;
            }
            
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(key)) {
                event.preventDefault();
                if (key === 'ArrowUp' || key === 'w') keyState.up = true;
                if (key === 'ArrowDown' || key === 's') keyState.down = true;
                if (key === 'ArrowLeft' || key === 'a') keyState.left = true;
                if (key === 'ArrowRight' || key === 'd') keyState.right = true;
            }
        });
        
        window.addEventListener('keyup', (event) => {
            const key = event.key;
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(key)) {
                event.preventDefault();
                if (key === 'ArrowUp' || key === 'w') keyState.up = false;
                if (key === 'ArrowDown' || key === 's') keyState.down = false;
                if (key === 'ArrowLeft' || key === 'a') keyState.left = false;
                if (key === 'ArrowRight' || key === 'd') keyState.right = false;
            }
        });

        // 일시정지 / 계속하기 토글
        if (pauseButton) {
            pauseButton.addEventListener('click', () => {
                if (gameEnded) return;
                if (isGameActive) {
                    isGameActive = false;
                    clearInterval(timerInterval);
                    pauseButton.textContent = '계속하기';
                } else {
                    isGameActive = true;
                    resumeTimer();
                    pauseButton.textContent = '정지';
                }
            });
        }
    }

    // 게임 리셋 함수
    function resetGame() {
        // 카메라 애니메이션 중지
        if (cameraAnimation) {
            clearInterval(cameraAnimation);
            cameraAnimation = null;
        }
        
        // 파티클 제거
        particles.forEach(particle => scene.remove(particle));
        particles = [];
        
        // 공 위치 초기화
        ball.position.set(-4.8, 0.5, -4.8);
        
        // 공 속도 초기화
        ball.userData.velocityX = 0;
        ball.userData.velocityZ = 0;
        
        // 판 회전 초기화
        plane.rotation.x = 0;
        plane.rotation.z = 0;
        
        // 카메라 위치 초기화
        camera.position.set(0, 7, 7);
        camera.lookAt(0, 0, 0);
        
        // 게임 상태 초기화
        isGameActive = true;
        gameEnded = false;
        
        // 안내 메시지 초기화
        const instructions = document.getElementById(instructionsId);
        if (instructions) {
            const message = '방향키 또는 마우스로 판을 기울여 공을 굴리세요!';
            instructions.textContent = message;
            instructions.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        }

        // 정지/계속 버튼 초기화
        const pauseButton = pauseButtonId ? document.getElementById(pauseButtonId) : null;
        if (pauseButton) {
            pauseButton.textContent = '정지';
            pauseButton.disabled = false;
        }
        
        // 이전에 생성된 재시작 버튼 제거 (pause 버튼 제외)
        const containerEl = document.getElementById(containerId);
        const existingRestart = containerEl?.querySelector('button[data-restart]');
        if (existingRestart) {
            existingRestart.remove();
        }
        
        // 타이머 재시작
        clearInterval(timerInterval);
        startTimer();
        
        // 게임 컨테이너에 다시 포커스
        const gameContainer = document.getElementById(containerId);
        if (gameContainer) {
            gameContainer.focus();
        }
    }
    
    // 파티클 생성 함수
    function createParticles(count, position) {
        for (let i = 0; i < count; i++) {
            const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
            const particleMaterial = new THREE.MeshStandardMaterial({
                color: new THREE.Color().setHSL(Math.random(), 1, 0.5),
                emissive: new THREE.Color().setHSL(Math.random(), 1, 0.3),
                emissiveIntensity: 0.5
            });
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            
            particle.position.copy(position);
            particle.userData.velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.2,
                Math.random() * 0.3 + 0.1,
                (Math.random() - 0.5) * 0.2
            );
            particle.userData.life = 1.0;
            particle.userData.decay = 0.02 + Math.random() * 0.02;
            
            scene.add(particle);
            particles.push(particle);
        }
    }
    
    // 파티클 업데이트 함수
    function updateParticles() {
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];
            
            // 위치 업데이트
            particle.position.add(particle.userData.velocity);
            particle.userData.velocity.y -= 0.01; // 중력
            
            // 생명력 감소
            particle.userData.life -= particle.userData.decay;
            
            // 투명도 및 크기 조절
            particle.material.opacity = particle.userData.life;
            particle.scale.setScalar(particle.userData.life);
            
            // 생명력이 0 이하면 제거
            if (particle.userData.life <= 0) {
                scene.remove(particle);
                particles.splice(i, 1);
            }
        }
    }
    
    // 카메라 애니메이션 함수
    function animateCamera() {
        const startPos = camera.position.clone();
        const startLook = new THREE.Vector3(0, 0, 0);
        const endPos = new THREE.Vector3(ball.position.x, 8, ball.position.z + 5);
        const endLook = ball.position.clone();
        
        let progress = 0;
        const duration = 2000; // 2초
        const startTime = Date.now();
        
        cameraAnimation = setInterval(() => {
            progress = Math.min((Date.now() - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            
            camera.position.lerpVectors(startPos, endPos, ease);
            const currentLook = new THREE.Vector3().lerpVectors(startLook, endLook, ease);
            camera.lookAt(currentLook);
            
            if (progress >= 1) {
                clearInterval(cameraAnimation);
                cameraAnimation = null;
            }
        }, 16);
    }
    
    function handleWin() {
        isGameActive = false;
        gameEnded = true;
        clearInterval(timerInterval);
        
        // 최고 기록 업데이트
        const isNewRecord = bestTime === null || timer < bestTime;
        if (isNewRecord) {
            bestTime = timer;
            localStorage.setItem('maze-best-time', timer.toString());
        }
        
        // 파티클 효과 생성
        createParticles(50, ball.position);
        
        // 카메라 애니메이션
        animateCamera();
        
        // 승리 메시지 표시
        const instructions = document.getElementById(instructionsId);
        if (instructions) {
            let message = `축하합니다! ${timer}초만에 클리어했습니다.`;
            if (isNewRecord) {
                message += ' 🎉 새로운 기록입니다!';
            } else if (bestTime !== null) {
                message += ` 최고 기록: ${bestTime}초`;
            }
            message += ' R키를 눌러 재시작하세요.';
            instructions.textContent = message;
            instructions.style.backgroundColor = 'rgba(0, 255, 0, 0.7)';
        }
        
        // 보다 뚜렷한 재시작 안내를 위해 추가 버튼 생성
        const gameContainer = document.getElementById(containerId);
        if (gameContainer) {
            const restartButton = document.createElement('button');
            restartButton.textContent = '재시작';
            restartButton.dataset.restart = 'true';
            restartButton.className = 'absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors';
            restartButton.onclick = resetGame;
            gameContainer.appendChild(restartButton);
        }

        // 정지 버튼 비활성화
        const pauseButton = pauseButtonId ? document.getElementById(pauseButtonId) : null;
        if (pauseButton) {
            pauseButton.textContent = '정지';
            pauseButton.disabled = true;
        }
    }
    
    // 공 움직임 업데이트 함수 (간단한 키보드 기반 물리)
    function updateBall() {
        if (!isGameActive) return;

        // 입력에 따라 목표 기울기 계산
        const targetTiltX = (keyState.up ? -tiltMax : 0) + (keyState.down ? tiltMax : 0);
        const targetTiltZ = (keyState.left ? -tiltMax : 0) + (keyState.right ? tiltMax : 0);

        // 부드럽게 기울기 적용
        plane.rotation.x += (targetTiltX - plane.rotation.x) * tiltLerp;
        plane.rotation.z += (targetTiltZ - plane.rotation.z) * tiltLerp;

        // 기울기에 따른 가속도 적용
        ball.userData.velocityX = (ball.userData.velocityX || 0) + (-plane.rotation.z * acceleration);
        ball.userData.velocityZ = (ball.userData.velocityZ || 0) + (plane.rotation.x * acceleration);

        // 최대 속도 제한
        const clampSpeed = (v) => Math.max(Math.min(v, maxSpeed), -maxSpeed);
        ball.userData.velocityX = clampSpeed(ball.userData.velocityX);
        ball.userData.velocityZ = clampSpeed(ball.userData.velocityZ);

        // 마찰 적용
        ball.userData.velocityX *= friction;
        ball.userData.velocityZ *= friction;

        // 이동
        ball.position.x += ball.userData.velocityX;
        ball.position.z += ball.userData.velocityZ;
        ball.position.y = 0.5; // 고정 높이

        // 경계 체크
        const boundaryLimit = 5.4;
        if (Math.abs(ball.position.x) > boundaryLimit) {
            ball.position.x = Math.sign(ball.position.x) * boundaryLimit;
            ball.userData.velocityX = 0;
        }
        if (Math.abs(ball.position.z) > boundaryLimit) {
            ball.position.z = Math.sign(ball.position.z) * boundaryLimit;
            ball.userData.velocityZ = 0;
        }

        // 벽 충돌 (단순 AABB + 반지름 보정)
        const ballRadius = 0.5;
        walls.forEach(wall => {
            const halfX = (wall.geometry.parameters.width / 2) + ballRadius;
            const halfZ = (wall.geometry.parameters.depth / 2) + ballRadius;
            const dx = ball.position.x - wall.position.x;
            const dz = ball.position.z - wall.position.z;

            if (Math.abs(dx) < halfX && Math.abs(dz) < halfZ) {
                const overlapX = halfX - Math.abs(dx);
                const overlapZ = halfZ - Math.abs(dz);

                if (overlapX < overlapZ) {
                    ball.position.x += Math.sign(dx) * overlapX;
                    ball.userData.velocityX *= -0.4;
                } else {
                    ball.position.z += Math.sign(dz) * overlapZ;
                    ball.userData.velocityZ *= -0.4;
                }
            }
        });

        // 골인 체크
        const ballToGoal = new THREE.Vector2(
            ball.position.x - goal.position.x,
            ball.position.z - goal.position.z
        );
        
        if (ballToGoal.length() < 0.9) {
            handleWin();
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        
        // 공 위치 업데이트
        updateBall();
        
        // 골인 지점 회전 애니메이션 (항상 회전)
        if (goal) {
            goal.rotation.y += 0.01;
            // 골인 지점 라이트도 함께 업데이트
            if (goal.userData.light) {
                goal.userData.light.position.set(
                    goal.position.x,
                    goal.position.y + 0.4,
                    goal.position.z
                );
            }
        }
        
        // 파티클 업데이트
        updateParticles();
        
        // 평면이 서서히 원래 위치로 돌아오게
        if (!isGameActive) {
            plane.rotation.x *= 0.95;
            plane.rotation.z *= 0.95;
        }
        
        // 씬 렌더링
        renderer.render(scene, camera);
    }
}