// 전역 변수
let currentSection = 0;
let currentSlide = 0;
let memoryPhotos = [];
let videoStream = null;

// 추억 사진 데이터 (실제 사진 파일명과 메시지)
const memories = [
    { img: 'assets/stickers/KakaoTalk_20260202_211810489.jpg', caption: '2021년 벚꽃 사진 찍던 날' },
    { img: 'assets/stickers/KakaoTalk_20260202_211810489_02.jpg', caption: '처음으로 꾸미고 놀았던 날' },
    { img: 'assets/stickers/KakaoTalk_20260202_211810489_03.jpg', caption: '체육 끝나고 그 시절 감성으로..' },
    { img: 'assets/stickers/KakaoTalk_20260202_211810489_04.jpg', caption: '추석 연휴에도 만난 부지런한 우리' },
    { img: 'assets/stickers/KakaoTalk_20260202_211810489_06.jpg', caption: '야자할 때 나름 감성샷이라고 찌거줌' },
    { img: 'assets/stickers/KakaoTalk_20260202_211810489_07.jpg', caption: '셤 끝나고였나??<br>우리 넘 풋풋하네' },
    { img: 'assets/stickers/KakaoTalk_20260202_211810489_09.jpg', caption: '우리의 첫 (당일치기)여행지였던 경주!' },
    { img: 'assets/stickers/KakaoTalk_20260202_211810489_10.jpg', caption: '크리스마스에도 우리는 만난다' },
    { img: 'assets/stickers/KakaoTalk_20260202_211810489_11.jpg', caption: '안녕하세요? 18살 김경은입니다.<br><br>(이때부터였어요.당신사진에진심이된것이)' },
    { img: 'assets/stickers/KakaoTalk_20260202_211810489_14.jpg', caption: '포토그레이 처음으로 맛봤던 날' },
    { img: 'assets/stickers/KakaoTalk_20260202_211810489_15.jpg', caption: '와 진짜 어리다 우리,,<br>저 때는 되게 잘 나왔다고 생각했는데' },
    { img: 'assets/stickers/KakaoTalk_20260202_211810489_16.png', caption: '애기애기한 믕과 갱' },
    { img: 'assets/stickers/KakaoTalk_20260202_211810489_17.jpg', caption: '수학여행!<br><br>같이 찍은 사진이 부족해서 아쉬워..' },
    { img: 'assets/stickers/KakaoTalk_20260202_211810489_18.jpg', caption: '우리 집에서 엽떡 먹은 날' },
    { img: 'assets/stickers/KakaoTalk_20260202_211810489_19.jpg', caption: '18살 크리스마스도 그녀와 함께' },
    { img: 'assets/stickers/KakaoTalk_20260202_211810489_20.jpg', caption: '시간이 지나 우리는 고사미가 돼뿟어요' },
    { img: 'assets/stickers/KakaoTalk_20260202_211810489_21.jpg', caption: '수능 끝나고!<br>(다시 시작된 포토그래퍼 기믕치)' },
    { img: 'assets/stickers/KakaoTalk_20260202_211810489_22.jpg', caption: '아레전드죠?이거레전드죠?' },
    { img: 'assets/stickers/KakaoTalk_20260202_211810489_23.jpg', caption: '헤헿 20살이 되었어요~~' },
    { img: 'assets/stickers/KakaoTalk_20260202_211810489_24.jpg', caption: '레전드 술찌 토마토들' },
    { img: 'assets/stickers/KakaoTalk_20260202_211810489_25.jpg', caption: '우리 점점 예뻐진다' },
    { img: 'assets/stickers/KakaoTalk_20260202_211810489_26.jpg', caption: '큐트하네요' },
    { img: 'assets/stickers/KakaoTalk_20260202_211810489_27.jpg', caption: '급으로 널 만나러 전포로 갔던 날' },
    { img: 'assets/stickers/KakaoTalk_20260202_211810489_28.jpg', caption: '광안리 갔던 날이지롱' },
    { img: 'assets/stickers/KakaoTalk_20260202_211845148.jpg', caption: '썬구리 뭐가 어울리는지 보러 젠몬 간 날' },
    { img: 'assets/stickers/KakaoTalk_20260202_211845148_01.jpg', caption: '우리의 첫 해외여행!<br>(아주기욥지요)' },
    { img: 'assets/stickers/KakaoTalk_20260202_211845148_02.png', caption: '진짜 특별한 사진이야' },
    { img: 'assets/stickers/KakaoTalk_20260202_211845148_03.jpg', caption: '8월의 우리<br>(공실에 갔던 날입니다)' },
    { img: 'assets/stickers/KakaoTalk_20260202_211845148_04.jpg', caption: '경은이 영국 가기 전 마지막 만남' },
    { img: 'assets/stickers/KakaoTalk_20260202_211845148_06.jpg', caption: '21살의 우리를 기록했었죠' },
    { img: 'assets/stickers/KakaoTalk_20260202_211845148_07.jpg', caption: '우리 또 찍으러 가야 하는데!' },
    { img: 'assets/stickers/KakaoTalk_20260202_211845148_08.jpg', caption: '레전드오징어순대강릉' },
    { img: 'assets/stickers/KakaoTalk_20260202_211845148_09.jpg', caption: '벚꽃 데이트를 경은이랑!' },
    { img: 'assets/stickers/KakaoTalk_20260202_211845148_10.jpg', caption: '대박적 라틴 음악 카페를 갔었죠..' },
    { img: 'assets/stickers/KakaoTalk_20260202_211845148_11.jpg', caption: '망미를 가겠노라 했지만..<br>비 폭탄이..' },
    { img: 'assets/stickers/KakaoTalk_20260202_211845148_12.jpg', caption: '에겐녀가 되어 만났던 날' },
    { img: 'assets/stickers/KakaoTalk_20260202_211845148_13.jpg', caption: '경은이미모레종두였던날' },
    { img: 'assets/stickers/KakaoTalk_20260202_211845148_14.jpg', caption: '수원!!!' },
    { img: 'assets/stickers/KakaoTalk_20260202_211845148_15.jpg', caption: '대전!!!' },
    { img: 'assets/stickers/KakaoTalk_20260202_211845148_16.jpg', caption: '뀨' },
    { img: 'assets/stickers/KakaoTalk_20260202_211845148_17.jpg', caption: '오랜만에 남포동포동 갔던 날' },
    { img: 'assets/stickers/KakaoTalk_20260202_211845148_18.jpg', caption: '나 왜 이렇게 찍어줬을까.. 미안타' },
    { img: 'assets/stickers/KakaoTalk_20260202_211845148_19.jpg', caption: '아싸랑해요난늑대고넌미녀' },
    { img: 'assets/stickers/KakaoTalk_20260202_211845148_20.jpg', caption: '나 기말 끝난 날 갱이랑 ㄷㅔ이투' },
    { img: 'assets/stickers/KakaoTalk_20260202_211845148_21.jpg', caption: '경으나 생일 축하해♡♡' },
    { img: 'assets/stickers/KakaoTalk_20260202_211845148_22.jpg', caption: '22살도 행복만 가득하길!' }
];

// 오디오 요소
const bgMusic = document.getElementById('bgMusic');

// 섹션 요소
const sections = {
    opening: document.getElementById('opening'),
    memories: document.getElementById('memories'),
    camera: document.getElementById('camera'),
    cake: document.getElementById('cake')
};

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    initOpening();
    createMemorySlides();
});

// ========== 오프닝 섹션 ==========
function initOpening() {
    const tapToContinue = document.querySelector('#opening .tap-to-continue');

    // 페이지 로드 즉시 음악 재생 시도
    bgMusic.play().catch(err => {
        console.log('자동 재생 차단됨:', err);
        // 모바일 자동재생 차단 시 첫 터치/클릭으로 재생
        const playOnInteraction = () => {
            bgMusic.play().catch(e => console.log('음악 재생 실패:', e));
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('touchstart', playOnInteraction);
        };
        document.addEventListener('click', playOnInteraction);
        document.addEventListener('touchstart', playOnInteraction);
    });

    // 3초 후 TAP TO START 표시 (애니메이션 완료 시점)
    setTimeout(() => {
        tapToContinue.style.opacity = '1';
    }, 3000);

    // 클릭하여 다음 섹션으로
    tapToContinue.addEventListener('click', () => {
        goToSection('memories');
    });
}

// ========== 추억 사진 슬라이드 ==========
function createMemorySlides() {
    const filmSlides = document.getElementById('filmSlides');

    memories.forEach((memory, index) => {
        const slide = document.createElement('div');
        slide.className = 'memory-slide';
        slide.style.display = index === 0 ? 'block' : 'none';

        slide.innerHTML = `
            <div class="memory-content">
                <img src="${memory.img}" alt="Memory ${index + 1}" class="memory-photo">
                <p class="memory-caption">${memory.caption}</p>
            </div>
        `;

        slide.addEventListener('click', () => nextSlide());
        filmSlides.appendChild(slide);
    });
}

function nextSlide() {
    const slides = document.querySelectorAll('.memory-slide');

    if (currentSlide >= slides.length) {
        return; // 이미 모든 슬라이드 완료
    }

    const currentSlideElem = slides[currentSlide];

    // 현재 슬라이드 위로 올라가는 애니메이션
    currentSlideElem.classList.add('exit');

    setTimeout(() => {
        currentSlideElem.style.display = 'none';
        currentSlideElem.classList.remove('exit');
        currentSlide++;

        // 다음 슬라이드 표시
        if (currentSlide < slides.length) {
            slides[currentSlide].style.display = 'block';
        } else {
            // 모든 슬라이드 완료 → 카메라 섹션으로
            goToSection('camera');
        }
    }, 600);
}

// ========== 카메라 섹션 ==========
async function initCamera() {
    const video = document.getElementById('video');
    const captureBtn = document.getElementById('captureBtn');
    const canvas = document.getElementById('canvas');
    const filmResultFrame = document.getElementById('filmResultFrame');
    const filmResultImg = document.getElementById('filmResultImg');
    const cameraOverlay = document.getElementById('cameraOverlay');

    // 현재 날짜/시간 표시
    updateCameraOverlay();

    try {
        // 전면 카메라 (세로 모드)
        videoStream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'user',
                aspectRatio: { ideal: 0.5625 },  // 세로 비율 (9:16 = 0.5625)
                height: { ideal: 1920 },
                width: { ideal: 1080 }
            },
            audio: false
        });

        video.srcObject = videoStream;
        video.play();
    } catch (err) {
        console.error('카메라 접근 오류:', err);
        alert('카메라에 접근할 수 없습니다. 권한을 확인해주세요.');
        goToSection('cake');
        return;
    }

    // 사진 촬영
    captureBtn.addEventListener('click', () => {
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // 좌우 반전 적용 (미러 효과 유지)
        context.save();
        context.scale(-1, 1);
        context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
        context.restore();

        const imageDataUrl = canvas.toDataURL('image/png');

        // 비디오 스트림 정지
        if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop());
        }

        // 프레임 포함된 이미지 생성 (canvas로 직접 그리기)
        setTimeout(() => {
            const frameCanvas = document.createElement('canvas');
            const frameContext = frameCanvas.getContext('2d');

            // 프레임 크기 설정 (테두리 포함)
            const borderWidth = 40; // 20px 테두리를 2배로
            frameCanvas.width = canvas.width + borderWidth * 2;
            frameCanvas.height = canvas.height + borderWidth * 2;

            // 흰색 배경 (테두리)
            frameContext.fillStyle = '#ffffff';
            frameContext.fillRect(0, 0, frameCanvas.width, frameCanvas.height);

            // 사진 그리기
            frameContext.drawImage(canvas, borderWidth, borderWidth);

            // 스프로킷 홀 그리기 (필름 카메라 구멍)
            const drawSprocketHole = (x, y) => {
                const holeWidth = 20;  // 10px × 2
                const holeHeight = 32; // 16px × 2
                const radius = 6;      // 3px × 2

                frameContext.fillStyle = '#1a1a1a';
                frameContext.beginPath();
                frameContext.roundRect(x, y, holeWidth, holeHeight, radius);
                frameContext.fill();
            };

            // 스프로킷 홀 위치 계산
            const holeX_left = 6;  // 왼쪽
            const holeX_right = frameCanvas.width - 26; // 오른쪽
            const centerY = frameCanvas.height / 2;
            const holeOffsets = [0, -110, 110, -220, 220, -330, 330, -440, 440]; // ±55px × 2 간격

            // 왼쪽 스프로킷 홀
            holeOffsets.forEach(offset => {
                const y = centerY + offset - 16; // 16 = holeHeight / 2
                if (y >= 0 && y + 32 <= frameCanvas.height) {
                    drawSprocketHole(holeX_left, y);
                }
            });

            // 오른쪽 스프로킷 홀
            holeOffsets.forEach(offset => {
                const y = centerY + offset - 16;
                if (y >= 0 && y + 32 <= frameCanvas.height) {
                    drawSprocketHole(holeX_right, y);
                }
            });

            // 날짜/시간 텍스트 그리기 (오른쪽 하단)
            const now = new Date();
            const year = String(now.getFullYear()).slice(2);
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const date = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const dateText = `${year}.${month}.${date} ${hours}:${minutes}`;

            frameContext.font = 'bold 28px "Courier New", monospace';
            frameContext.fillStyle = '#ff9500';
            frameContext.textAlign = 'right';
            frameContext.shadowColor = 'rgba(0, 0, 0, 0.8)';
            frameContext.shadowBlur = 8;
            frameContext.shadowOffsetX = 2;
            frameContext.shadowOffsetY = 2;
            frameContext.fillText(dateText, frameCanvas.width - borderWidth - 20, frameCanvas.height - borderWidth - 20);

            // 그림자 리셋
            frameContext.shadowColor = 'transparent';
            frameContext.shadowBlur = 0;

            // 프레임 이미지로 변환
            const frameImageUrl = frameCanvas.toDataURL('image/png');

            // 결과 화면에 날짜 포함된 프레임 이미지 표시
            filmResultImg.src = frameImageUrl;

            // UI 변경 - 카메라 화면 숨기고 결과 프레임 표시
            document.querySelector('.camera-body').style.display = 'none';
            filmResultFrame.style.display = 'block';

            // 자동 저장
            const link = document.createElement('a');
            link.download = `birthday-photo-${Date.now()}.png`;
            link.href = frameImageUrl;
            link.click();

            // 저장 후 5초 뒤 자동으로 케이크 섹션으로
            setTimeout(() => {
                goToSection('cake');
            }, 5000);
        }, 500);
    });
}

// ========== 섹션 전환 ==========
function goToSection(sectionName) {
    // 모든 섹션 숨기기
    Object.values(sections).forEach(section => {
        section.classList.remove('active');
    });

    // 선택한 섹션 표시
    sections[sectionName].classList.add('active');

    // 섹션별 음악 제어
    handleMusic(sectionName);

    // 카메라 섹션이면 카메라 초기화
    if (sectionName === 'camera') {
        initCamera();
    }
}

// ========== 음악 제어 ==========
function handleMusic(sectionName) {
    // 오프닝 섹션부터 음악 재생 시작 (계속 반복)
    if (sectionName === 'opening') {
        bgMusic.play().catch(err => {
            console.log('자동 재생 차단됨. 사용자 상호작용 필요:', err);
            // 모바일에서 자동재생 차단 시 첫 터치로 재생
            document.addEventListener('click', () => {
                bgMusic.play();
            }, { once: true });
        });
    }
    // 다른 섹션에서도 음악 계속 재생 (정지하지 않음)
}

// ========== 터치/스와이프 지원 (모바일 최적화) ==========
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;

    // 위로 스와이프 (50px 이상)
    if (diff > 50 && sections.memories.classList.contains('active')) {
        nextSlide();
    }
}, { passive: true });

// ========== 날짜/시간 업데이트 ==========
function updateCameraOverlay() {
    const now = new Date();
    const year = String(now.getFullYear()).slice(2);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const overlayElem = document.getElementById('cameraOverlay');
    if (overlayElem) {
        overlayElem.textContent = `${year}.${month}.${date} ${hours}:${minutes}`;
        // 매 초마다 업데이트
        setInterval(() => {
            const now = new Date();
            const year = String(now.getFullYear()).slice(2);
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const date = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            overlayElem.textContent = `${year}.${month}.${date} ${hours}:${minutes}`;
        }, 1000);
    }
}

// ========== 화면 회전 방지 (세로 모드 고정) ==========
if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock('portrait').catch(err => {
        console.log('화면 회전 잠금 실패:', err);
    });
}

// ========== 특별 선물 팝업 (새로 추가된 코드 - 기존 코드는 건드리지 않음) ==========
const giftPopup = document.getElementById('giftPopup');
const closePopupBtn = document.getElementById('closePopup');
const listenMusicBtn = document.getElementById('listenMusicBtn');
const watchVideoBtn = document.getElementById('watchVideoBtn');
const videoModal = document.getElementById('videoModal');
const closeVideoBtn = document.getElementById('closeVideo');
const behindVideo = document.getElementById('behindVideo');
const cakeEmoji = document.querySelector('.cake-emoji');

// 음악 플레이어 요소
const musicModal = document.getElementById('musicModal');
const closeMusicBtn = document.getElementById('closeMusic');
const musicPlayer = document.getElementById('musicPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const musicProgress = document.getElementById('musicProgress');
const volumeSlider = document.querySelector('.volume-slider');

// 케이크 이모티콘 클릭 시 팝업 표시
if (cakeEmoji) {
    cakeEmoji.addEventListener('click', () => {
        if (giftPopup) {
            giftPopup.classList.add('active');
        }
    });
}

// 팝업 닫기
if (closePopupBtn) {
    closePopupBtn.addEventListener('click', () => {
        if (giftPopup) {
            giftPopup.classList.remove('active');
        }
    });
}

// 팝업 배경 클릭 시 닫기
if (giftPopup) {
    giftPopup.addEventListener('click', (e) => {
        if (e.target === giftPopup) {
            giftPopup.classList.remove('active');
        }
    });
}

// 음원 듣기 버튼
if (listenMusicBtn) {
    listenMusicBtn.addEventListener('click', () => {
        // 팝업 닫기
        if (giftPopup) {
            giftPopup.classList.remove('active');
        }

        // 음악 플레이어 모달 열기
        if (musicModal) {
            musicModal.classList.add('active');
        }

        // 음악 재생
        if (musicPlayer) {
            musicPlayer.play();
            updatePlayButton(true);
        }

        // 음원 자동 다운로드
        const link = document.createElement('a');
        link.href = 'assets/music/22.mp3';
        link.download = '22.mp3';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

// 비하인드 영상 보기 버튼
if (watchVideoBtn) {
    watchVideoBtn.addEventListener('click', () => {
        // 팝업 닫기
        if (giftPopup) {
            giftPopup.classList.remove('active');
        }

        // 비디오 모달 열기
        if (videoModal) {
            videoModal.classList.add('active');
        }

        // 비디오 재생
        if (behindVideo) {
            behindVideo.play();
        }

        // 비디오 자동 다운로드
        const videoLink = document.createElement('a');
        videoLink.href = 'assets/music/비하인드영상.mp4';
        videoLink.download = '비하인드영상.mp4';
        document.body.appendChild(videoLink);
        videoLink.click();
        document.body.removeChild(videoLink);
    });
}

// 비디오 모달 닫기
if (closeVideoBtn && videoModal && behindVideo) {
    closeVideoBtn.addEventListener('click', () => {
        videoModal.classList.remove('active');
        behindVideo.pause();
        behindVideo.currentTime = 0;
    });
}

// 비디오 모달 배경 클릭 시 닫기
if (videoModal && behindVideo) {
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            behindVideo.pause();
            behindVideo.currentTime = 0;
        }
    });
}

// ========== 음악 플레이어 제어 ==========
// 재생 버튼 아이콘 업데이트 함수
function updatePlayButton(isPlaying) {
    if (playPauseBtn) {
        playPauseBtn.innerHTML = isPlaying ?
            '<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>' :
            '<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
    }
}

// 재생/일시정지 버튼
if (playPauseBtn && musicPlayer) {
    playPauseBtn.addEventListener('click', () => {
        if (musicPlayer.paused) {
            musicPlayer.play();
            updatePlayButton(true);
        } else {
            musicPlayer.pause();
            updatePlayButton(false);
        }
    });
}

// 진행바 업데이트
if (musicPlayer) {
    musicPlayer.addEventListener('timeupdate', () => {
        const progress = (musicPlayer.currentTime / musicPlayer.duration) * 100;
        if (musicProgress) {
            musicProgress.value = progress || 0;
        }

        // 시간 표시 업데이트
        const currentMinutes = Math.floor(musicPlayer.currentTime / 60);
        const currentSeconds = Math.floor(musicPlayer.currentTime % 60);
        const durationMinutes = Math.floor(musicPlayer.duration / 60) || 0;
        const durationSeconds = Math.floor(musicPlayer.duration % 60) || 0;

        const progressTimeElem = document.querySelector('.progress-time');
        const progressDurationElem = document.querySelector('.progress-duration');

        if (progressTimeElem) {
            progressTimeElem.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
        }
        if (progressDurationElem) {
            progressDurationElem.textContent = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
        }
    });
}

// 진행바 클릭 시 위치 이동
if (musicProgress && musicPlayer) {
    musicProgress.addEventListener('input', () => {
        const seekTime = (musicProgress.value / 100) * musicPlayer.duration;
        musicPlayer.currentTime = seekTime;
    });
}

// 볼륨 조절
if (volumeSlider && musicPlayer) {
    volumeSlider.addEventListener('input', () => {
        musicPlayer.volume = volumeSlider.value / 100;
    });
}

// 이전/다음 버튼
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (prevBtn && musicPlayer) {
    prevBtn.addEventListener('click', () => {
        musicPlayer.currentTime = 0;
    });
}

if (nextBtn && musicPlayer) {
    nextBtn.addEventListener('click', () => {
        musicPlayer.currentTime = 0;
    });
}

// 음악 플레이어 닫기
if (closeMusicBtn && musicModal && musicPlayer) {
    closeMusicBtn.addEventListener('click', () => {
        musicModal.classList.remove('active');
        musicPlayer.pause();
        musicPlayer.currentTime = 0;
        updatePlayButton(false);
    });
}

// 음악 플레이어 배경 클릭 시 닫기
if (musicModal && musicPlayer) {
    musicModal.addEventListener('click', (e) => {
        if (e.target === musicModal) {
            musicModal.classList.remove('active');
            musicPlayer.pause();
            musicPlayer.currentTime = 0;
            updatePlayButton(false);
        }
    });
}
