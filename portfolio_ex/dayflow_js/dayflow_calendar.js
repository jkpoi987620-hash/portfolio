document.addEventListener('DOMContentLoaded', () => {

  // ── 현재 날짜 ──
  const today = new Date();
  let currentYear  = today.getFullYear();
  let currentMonth = today.getMonth();

  // ── 이벤트 저장소 { "YYYY-MM-DD": [{task, duration, time}] } ──
  const events = {};

  function dateKey(year, month, date) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
  }

  // ── 캘린더 렌더링 ──
  function renderCalendar(year, month) {
    const monthLabel = document.getElementById('monthLabel');
    const calGrid    = document.getElementById('calGrid');

    const mm = String(month + 1).padStart(2, '0');
    monthLabel.textContent = `${year}.${mm}`;

    const firstDay   = new Date(year, month, 1).getDay();
    const lastDate   = new Date(year, month + 1, 0).getDate();
    const prevLast   = new Date(year, month, 0).getDate();
    const totalCells = Math.ceil((firstDay + lastDate) / 7) * 7;

    calGrid.innerHTML = '';

    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement('div');
      cell.className = 'cal-cell';

      let dateNum;
      let isOtherMonth = false;
      let cellYear = year;
      let cellMonth = month;

      if (i < firstDay) {
        dateNum = prevLast - firstDay + 1 + i;
        isOtherMonth = true;
        cellMonth = month - 1;
        if (cellMonth < 0) { cellMonth = 11; cellYear = year - 1; }
      } else if (i >= firstDay + lastDate) {
        dateNum = i - firstDay - lastDate + 1;
        isOtherMonth = true;
        cellMonth = month + 1;
        if (cellMonth > 11) { cellMonth = 0; cellYear = year + 1; }
      } else {
        dateNum = i - firstDay + 1;
      }

      const dayOfWeek = i % 7;
      if (dayOfWeek === 0) cell.classList.add('sun-cell');
      if (dayOfWeek === 6) cell.classList.add('sat-cell');
      if (isOtherMonth)   cell.classList.add('other-month');
      if (i >= totalCells - 7) cell.classList.add('last-row');

      if (
        !isOtherMonth &&
        dateNum === today.getDate() &&
        year === today.getFullYear() &&
        month === today.getMonth()
      ) {
        cell.classList.add('today');
      }

      // 내부 구조
      const inner = document.createElement('div');
      inner.className = 'cal-cell-inner';

      const dateSpan = document.createElement('span');
      dateSpan.className = 'cal-date';
      dateSpan.textContent = dateNum;
      inner.appendChild(dateSpan);

      // 이벤트 태그
      const key = dateKey(cellYear, cellMonth, dateNum);
      if (events[key] && events[key].length > 0) {
        const evWrap = document.createElement('div');
        evWrap.className = 'cal-events';
        const showCount = events[key].length > 2 ? 1 : 2;
        events[key].slice(0, showCount).forEach(ev => {
          const tag = document.createElement('span');
          tag.className = 'cal-event-tag';
          tag.textContent = ev.task || '일정';
          evWrap.appendChild(tag);
        });
        if (events[key].length > 2) {
          const more = document.createElement('span');
          more.className = 'cal-event-tag';
          more.style.background = 'rgba(79,70,229,0.4)';
          more.textContent = `+${events[key].length - 1}`;
          evWrap.appendChild(more);
        }
        inner.appendChild(evWrap);
      }

      cell.appendChild(inner);

      // 이전/다음 달 클릭 불가
      if (!isOtherMonth) {
        const capturedKey = key;
        cell.addEventListener('click', () => openModal(capturedKey, year, month, dateNum));
      }

      calGrid.appendChild(cell);
    }
  }

  // ── 연도/월 선택 팝업 ──
  const ymPopup      = document.getElementById('ymPopup');
  const ymYearLabel  = document.getElementById('ymYearLabel');
  const ymMonthGrid  = document.getElementById('ymMonthGrid');
  const monthLabel   = document.getElementById('monthLabel');
  const MONTHS       = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];

  let ymYear = currentYear;

  function buildMonthGrid() {
    ymYearLabel.textContent = ymYear;
    ymMonthGrid.innerHTML = '';
    MONTHS.forEach((name, idx) => {
      const btn = document.createElement('button');
      btn.className = 'ym-month-btn';
      btn.textContent = name;
      if (ymYear === currentYear && idx === currentMonth) btn.classList.add('active');
      btn.addEventListener('click', () => {
        currentYear  = ymYear;
        currentMonth = idx;
        closeYmPopup();
        renderCalendar(currentYear, currentMonth);
      });
      ymMonthGrid.appendChild(btn);
    });
  }

  function openYmPopup() {
    ymYear = currentYear;
    buildMonthGrid();
    ymPopup.classList.add('open');
  }

  function closeYmPopup() {
    ymPopup.classList.remove('open');
  }

  monthLabel.addEventListener('click', (e) => {
    e.stopPropagation();
    ymPopup.classList.contains('open') ? closeYmPopup() : openYmPopup();
  });

  document.getElementById('ymPrevYear').addEventListener('click', (e) => {
    e.stopPropagation();
    ymYear--;
    buildMonthGrid();
  });

  document.getElementById('ymNextYear').addEventListener('click', (e) => {
    e.stopPropagation();
    ymYear++;
    buildMonthGrid();
  });

  document.addEventListener('click', (e) => {
    if (ymPopup.classList.contains('open') && !ymPopup.contains(e.target)) {
      closeYmPopup();
    }
  });
  ymPopup.addEventListener('click', e => e.stopPropagation());

  // ── 월 이동 ──
  document.getElementById('prevMonth').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendar(currentYear, currentMonth);
  });

  document.getElementById('nextMonth').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    renderCalendar(currentYear, currentMonth);
  });

  renderCalendar(currentYear, currentMonth);

  // ── 모달 ──
  const modalOverlay   = document.getElementById('modalOverlay');
  const modalDateLabel = document.getElementById('modalDateLabel');
  const modalRows      = document.getElementById('modalRows');
  const modalAddBtn    = document.getElementById('modalAddBtn');
  const modalConfirmBtn = document.getElementById('modalConfirmBtn');
  const modalClose     = document.getElementById('modalClose');

  let activeModalKey = null;

  function openModal(key, year, month, date) {
    activeModalKey = key;
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(date).padStart(2, '0');
    modalDateLabel.textContent = `${year}.${mm}.${dd} 일정 추가`;

    // 기존 이벤트 불러오기
    modalRows.innerHTML = '';
    if (events[key] && events[key].length > 0) {
      events[key].forEach(ev => addModalRow(ev));
    } else {
      addModalRow();
    }

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
    activeModalKey = null;
    closeTimePicker();
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // ── 모달 행 생성 ──
  function addModalRow(prefill) {
    const row = document.createElement('div');
    row.className = 'modal-row';
    row.innerHTML = `
      <input class="modal-task-input" type="text" placeholder="일정 이름" value="${prefill?.task || ''}" />
      <select class="modal-select modal-duration-select">
        <option ${prefill?.duration === '1시간' ? 'selected' : ''}>1시간</option>
        <option ${prefill?.duration === '2시간' ? 'selected' : ''}>2시간</option>
        <option ${prefill?.duration === '3시간' ? 'selected' : ''}>3시간</option>
        <option ${prefill?.duration === '4시간' ? 'selected' : ''}>4시간</option>
        <option ${prefill?.duration === '5시간' ? 'selected' : ''}>5시간</option>
      </select>
      <button class="modal-time-btn" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span class="modal-time-display">${prefill?.time || '00:00'}</span>
      </button>
      <select class="modal-select modal-grade-select">
        <option value="">등급</option>
        <option value="high" ${prefill?.grade === 'high' ? 'selected' : ''}>높음</option>
        <option value="mid"  ${prefill?.grade === 'mid'  ? 'selected' : ''}>중간</option>
        <option value="low"  ${prefill?.grade === 'low'  ? 'selected' : ''}>낮음</option>
      </select>
      <button class="modal-delete-btn" type="button" aria-label="삭제">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    `;

    row.querySelector('.modal-delete-btn').addEventListener('click', () => row.remove());
    row.querySelector('.modal-time-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      const btn = row.querySelector('.modal-time-btn');
      if (popup.classList.contains('open') && currentTimeBtn === btn) {
        closeTimePicker();
      } else {
        openTimePicker(btn, '.modal-time-display');
      }
    });

    modalRows.appendChild(row);
  }

  modalAddBtn.addEventListener('click', () => addModalRow());

  // ── 확인: 이벤트 저장 후 캘린더 리렌더링 ──
  modalConfirmBtn.addEventListener('click', () => {
    if (!activeModalKey) return;

    const rows = modalRows.querySelectorAll('.modal-row');
    const collected = [];
    rows.forEach(row => {
      const task     = row.querySelector('.modal-task-input').value.trim();
      const duration = row.querySelector('.modal-duration-select').value;
      const time     = row.querySelector('.modal-time-display').textContent;
      const grade    = row.querySelector('.modal-grade-select').value;
      if (task) collected.push({ task, duration, time, grade });
    });

    if (collected.length > 0) {
      events[activeModalKey] = collected;
    } else {
      delete events[activeModalKey];
    }

    closeModal();
    renderCalendar(currentYear, currentMonth);
  });

  // ── 타임피커 ──
  const popup    = document.getElementById('timePickerPopup');
  const tpHour   = document.getElementById('tpHour');
  const tpMin    = document.getElementById('tpMin');
  const tpConfirm = document.getElementById('tpConfirm');

  let currentTimeBtn     = null;
  let currentDisplaySel  = '.modal-time-display';
  let tpHourVal = 12;
  let tpMinVal  = 0;
  let tpAmpm    = '오전';

  popup.querySelectorAll('.tp-ampm-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      popup.querySelectorAll('.tp-ampm-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tpAmpm = btn.dataset.val;
    });
  });

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

  function openTimePicker(btn, displaySel) {
    currentTimeBtn    = btn;
    currentDisplaySel = displaySel;
    const rect = btn.getBoundingClientRect();
    popup.style.top  = (rect.bottom + 8 + window.scrollY) + 'px';
    popup.style.left = rect.left + 'px';
    const text  = btn.querySelector(displaySel).textContent;
    const match = text.match(/(\d+):(\d+)/);
    if (match) {
      tpHourVal = parseInt(match[1]);
      tpMinVal  = parseInt(match[2]);
      tpHour.textContent = String(tpHourVal).padStart(2, '0');
      tpMin.textContent  = String(tpMinVal).padStart(2, '0');
    }
    btn.classList.add('active');
    popup.classList.add('open');
  }

  function closeTimePicker() {
    popup.classList.remove('open');
    if (currentTimeBtn) currentTimeBtn.classList.remove('active');
    currentTimeBtn = null;
  }

  tpConfirm.addEventListener('click', () => {
    if (!currentTimeBtn) return;
    const h = String(tpHourVal).padStart(2, '0');
    const m = String(tpMinVal).padStart(2, '0');
    currentTimeBtn.querySelector(currentDisplaySel).textContent = `${tpAmpm} ${h}:${m}`;
    closeTimePicker();
  });

  document.addEventListener('click', (e) => {
    if (popup.classList.contains('open') && !popup.contains(e.target)) {
      closeTimePicker();
    }
  });
  popup.addEventListener('click', e => e.stopPropagation());

  // ── 햄버거 / 사이드 메뉴 ──
  const hamburger   = document.getElementById('hamburger');
  const sideMenu    = document.getElementById('sideMenu');
  const sideOverlay = document.getElementById('sideOverlay');
  const sideClose   = document.getElementById('sideClose');

  function openSideMenu() {
    sideMenu.classList.add('active');
    sideOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeSideMenu() {
    sideMenu.classList.remove('active');
    sideOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger)   hamburger.addEventListener('click', openSideMenu);
  if (sideClose)   sideClose.addEventListener('click', closeSideMenu);
  if (sideOverlay) sideOverlay.addEventListener('click', (e) => {
    // 모달 오버레이와 사이드 오버레이가 동일 ID 충돌 방지
    closeSideMenu();
  });

  // ── 푸터 아코디언 ──
  document.querySelectorAll('.footer-col-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const col = btn.closest('.footer-col');
      if (col) col.classList.toggle('open');
    });
  });

});
