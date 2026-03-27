document.addEventListener('DOMContentLoaded', () => {

  // ── HAMBURGER / SIDE MENU ──
  const hamburger   = document.getElementById('hamburger');
  const sideMenu    = document.getElementById('sideMenu');
  const sideOverlay = document.getElementById('sideOverlay');
  const sideClose   = document.getElementById('sideClose');

  function openMenu() {
    sideMenu.classList.add('active');
    sideOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    sideMenu.classList.remove('active');
    sideOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger)   hamburger.addEventListener('click', openMenu);
  if (sideClose)   sideClose.addEventListener('click', closeMenu);
  if (sideOverlay) sideOverlay.addEventListener('click', closeMenu);

  // ── FOOTER ACCORDION ──
  document.querySelectorAll('.footer-col-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const col = btn.closest('.footer-col');
      if (col) col.classList.toggle('open');
    });
  });

  // ── ROW TEMPLATE ──
  function createRowEl() {
    const row = document.createElement('div');
    row.className = 'schedule-row';
    row.innerHTML = `
      <input class="task-input" type="text" placeholder="예: 운동, 작업" />
      <select class="task-select duration-select">
        <option>1시간</option>
        <option>2시간</option>
        <option>3시간</option>
        <option>4시간</option>
        <option>5시간</option>
      </select>
      <button class="time-btn" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span class="time-display">00:00</span>
      </button>
      <select class="task-select grade-select">
        <option value="">등급</option>
        <option value="high">높음</option>
        <option value="mid">중간</option>
        <option value="low">낮음</option>
      </select>
      <label class="toggle-switch">
        <input type="checkbox" />
        <span class="toggle-track">
          <span class="toggle-label off-label">OFF</span>
          <span class="toggle-thumb"></span>
          <span class="toggle-label on-label">ON</span>
        </span>
      </label>
      <button class="delete-row-btn" type="button" aria-label="삭제">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    `;
    bindDeleteBtn(row);
    bindTimeBtn(row);
    return row;
  }

  // ── DELETE ROW ──
  function bindDeleteBtn(row) {
    const btn = row.querySelector('.delete-row-btn');
    btn.addEventListener('click', () => {
      row.remove();
    });
  }

  // ── ADD ROW ──
  const scheduleRows = document.getElementById('scheduleRows');
  const addRowBtn    = document.getElementById('addRowBtn');

  if (addRowBtn) {
    addRowBtn.addEventListener('click', () => {
      scheduleRows.appendChild(createRowEl());
    });
  }

  // 초기 행에 삭제 버튼 바인딩
  document.querySelectorAll('.schedule-row').forEach(row => {
    bindDeleteBtn(row);
    bindTimeBtn(row);
  });

  // ── CUSTOM TIME PICKER ──
  const popup    = document.getElementById('timePickerPopup');
  const tpHour   = document.getElementById('tpHour');
  const tpMin    = document.getElementById('tpMin');
  const tpConfirm = document.getElementById('tpConfirm');

  let currentTimeBtn = null;
  let tpHourVal = 12;
  let tpMinVal  = 0;
  let tpAmpm    = '오전';

  // 오전/오후 버튼
  popup.querySelectorAll('.tp-ampm-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      popup.querySelectorAll('.tp-ampm-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tpAmpm = btn.dataset.val;
    });
  });

  // 시/분 화살표
  popup.querySelectorAll('.tp-arrow').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;
      const dir  = btn.dataset.dir === 'up' ? 1 : -1;
      if (type === 'hour') {
        tpHourVal = ((tpHourVal - 1 + dir + 12) % 12) + 1;
        tpHour.textContent = String(tpHourVal).padStart(2, '0');
      } else {
        tpMinVal = (tpMinVal + dir * 5 + 60) % 60;
        tpMin.textContent = String(tpMinVal).padStart(2, '0');
      }
    });
  });

  function openTimePicker(btn) {
    currentTimeBtn = btn;
    // 팝업 위치 계산
    const rect = btn.getBoundingClientRect();
    popup.style.top  = (rect.bottom + 8 + window.scrollY) + 'px';
    popup.style.left = rect.left + 'px';
    // 기존 값 파싱
    const text = btn.querySelector('.time-display').textContent;
    const match = text.match(/(\d+):(\d+)/);
    if (match) {
      tpHourVal = parseInt(match[1]);
      tpMinVal  = parseInt(match[2]);
      tpHour.textContent = String(tpHourVal).padStart(2, '0');
      tpMin.textContent  = String(tpMinVal).padStart(2, '0');
    }
    document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    popup.classList.add('open');
  }

  function closeTimePicker() {
    popup.classList.remove('open');
    if (currentTimeBtn) currentTimeBtn.classList.remove('active');
    currentTimeBtn = null;
  }

  function bindTimeBtn(row) {
    const btn = row.querySelector('.time-btn');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (popup.classList.contains('open') && currentTimeBtn === btn) {
        closeTimePicker();
      } else {
        openTimePicker(btn);
      }
    });
  }

  // 확인 버튼
  tpConfirm.addEventListener('click', () => {
    if (!currentTimeBtn) return;
    const h = String(tpHourVal).padStart(2, '0');
    const m = String(tpMinVal).padStart(2, '0');
    currentTimeBtn.querySelector('.time-display').textContent = `${tpAmpm} ${h}:${m}`;
    // 아이콘 색상을 텍스트 색상과 동일하게
    currentTimeBtn.querySelector('svg').setAttribute('stroke', '#a1a1aa');
    closeTimePicker();
  });

  // 팝업 외부 클릭 시 닫기
  document.addEventListener('click', (e) => {
    if (popup.classList.contains('open') && !popup.contains(e.target)) {
      closeTimePicker();
    }
  });
  popup.addEventListener('click', e => e.stopPropagation());

  // ── AI 일정 만들기 버튼 ──
  const aiBtn = document.getElementById('aiBtn');
  if (aiBtn) {
    aiBtn.addEventListener('click', () => {
      document.body.classList.add('page-exit');
      setTimeout(() => {
        window.location.href = 'dayflow_loading.html';
      }, 500);
    });
  }

});
