// ── 요소 참조 ──
const overlay      = document.getElementById('overlay');
const modal        = document.getElementById('modal');
const modalDesc    = document.getElementById('modalDesc');
const modalConfirm = document.getElementById('modalConfirm');
const modalCancel  = document.getElementById('modalCancel');
const searchInput  = document.getElementById('searchInput');
const btnNextArea  = document.getElementById('btnNextArea');
const btnNextLabel = document.getElementById('btnNextLabel');

// ── 현재 선택된 학교 타입 ──
let selectedType = null;


// ── 다음 버튼 표시 ──
function showNextBtn(schoolName, type) {
  selectedType = type;
  const btnNext = document.getElementById('btnNext');

  if (type === 'affiliated') {
    btnNextLabel.textContent = `${schoolName} · 다음으로`;
    btnNext.className = 'btn-next btn-next--affiliated';
  } else {
    // 미가맹/협의중 - 나중에 미가맹 페이지 헤더 색상으로 업데이트 예정
    btnNextLabel.textContent = `${schoolName} · 기본 서비스로 이용하기`;
    btnNext.className = 'btn-next btn-next--unaffiliated';
  }

  btnNextArea.classList.add('btn-next-area--show');
}

// ── 모달 열기 (미가맹 경고) ──
function openModal(schoolName) {
  modalDesc.innerHTML =
    `<strong>${schoolName}</strong>는 현재 제휴 협의 중이에요.<br>오픈 알림을 신청하시면 가장 먼저 알려드릴게요!`;
  overlay.classList.add('overlay--show');
  modal.classList.add('modal--show');
  modal.setAttribute('aria-hidden', 'false');
}

// ── 모달 닫기 ──
function closeModal() {
  overlay.classList.remove('overlay--show');
  modal.classList.remove('modal--show');
  modal.setAttribute('aria-hidden', 'true');
}

// ── 학교 카드 클릭 ──
document.querySelectorAll('.school-card').forEach(card => {
  card.addEventListener('click', () => {
    const type = card.dataset.type;
    const name = card.dataset.name;

    // 선택 상태 전환
    document.querySelectorAll('.school-card').forEach(c => c.classList.remove('school-card--selected'));
    card.classList.add('school-card--selected');

    if (type === 'affiliated') {
      showNextBtn(name, 'affiliated');
    } else {
      // 경고 모달 + 버튼도 표시
      openModal(name);
      showNextBtn(name, 'unaffiliated');
    }
  });
});

// ── 모달 버튼 ──
modalConfirm.addEventListener('click', closeModal);
modalCancel.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// ── 검색 필터 ──
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  let hasResult = false;

  document.querySelectorAll('.school-card').forEach(card => {
    const name = card.dataset.name.toLowerCase();
    const show = !query || name.includes(query);
    card.style.display = show ? '' : 'none';
    if (show) hasResult = true;
  });
});

// ── 다음으로 버튼 클릭 ──
document.getElementById('btnNext').addEventListener('click', () => {
  if (selectedType === 'affiliated') {
    navigateTo('univ-eat_plan.html');
  } else {
    navigateTo('univ-eat_home_na.html');
  }
});

// ── 뒤로가기 ──
document.getElementById('btnBack').addEventListener('click', () => {
  navigateTo('univ-eat_signup3.html', true);
});
