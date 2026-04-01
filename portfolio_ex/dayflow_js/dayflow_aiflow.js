document.addEventListener('DOMContentLoaded', () => {

  // ── 캘린더 데이터 ──
  const TIMES = ['9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM','9PM','10PM','11PM'];
  const DAYS  = ['월','화','수','목','금','토','일'];

  // 이벤트 데이터 [일~토 인덱스 0~6]
  // 각 배열은 TIMES 길이와 동일 (15개 슬롯)
  // 값: '' = 빈 슬롯, 'cont' = 이전 이벤트 연속(텍스트 없음)
  const BEFORE = [
    // 월
    ['','출근','','','','회의','','','','','운동','cont','','',''],
    // 화
    ['','출근','','업무','','','','','미팅','','','','','',''],
    // 수
    ['','출근','','','','','','회의','','','','','공부','',''],
    // 목
    ['','출근','','','','','','외근','','','','','','',''],
    // 금
    ['','출근','','','','','','','회식','','','','','',''],
    // 토
    ['','','','','','운동','','','','','','','','',''],
    // 일
    ['','','','','','','','','','','','','','',''],
  ];

  const AFTER = [
    // 월
    ['','출근','집중업무','','점심','회의','외근','cont','','운동','cont','','','',''],
    // 화
    ['','출근','집중업무','','점심','업무','','','미팅','업무 정리','','','','',''],
    // 수
    ['','출근','집중업무','','점심','','','회의','','업무 정리','','자기개발','','',''],
    // 목
    ['','출근','업무','','점심','','','외근','','휴식','가벼운 업무','','','',''],
    // 금
    ['','출근','주간 정리','','점심','','업무 마무리','','회식','','','','','',''],
    // 토
    ['','','기상','가벼운 활동','운동','','점심','취미 활동','','','','','','',''],
    // 일
    ['','','기상','휴식','','점심','다음주 계획','','','','휴식','','','',''],
  ];

  function getColor(name) {
    if (!name || name === 'cont') return '';
    if (['출근','기상'].includes(name)) return 'orange';
    if (['회의','미팅','회식'].includes(name)) return 'red';
    if (['운동','공부','자기개발','취미 활동','휴식'].includes(name)) return 'purple';
    if (['집중업무','업무','업무 마무리','가벼운 활동','다음주 계획'].includes(name)) return 'green';
    if (['점심'].includes(name)) return 'yellow';
    if (['외근','업무 정리','주간 정리','가벼운 업무'].includes(name)) return 'cyan';
    return 'green';
  }

  function buildTimCol(id) {
    const el = document.getElementById(id);
    if (!el) return;
    TIMES.forEach(t => {
      const div = document.createElement('div');
      div.className = 'time-label';
      div.textContent = t;
      el.appendChild(div);
    });
  }

  function buildDayHeaders(id) {
    const el = document.getElementById(id);
    if (!el) return;
    DAYS.forEach(d => {
      const div = document.createElement('div');
      div.className = 'day-header-cell';
      div.textContent = d;
      el.appendChild(div);
    });
  }

  function buildGrid(id, data) {
    const el = document.getElementById(id);
    if (!el) return;
    // data: [dayIndex][slotIndex]
    DAYS.forEach((_, di) => {
      const col = document.createElement('div');
      col.className = 'day-col';
      TIMES.forEach((_, si) => {
        const name  = data[di][si];
        const color = getColor(name);
        const slot  = document.createElement('div');
        slot.className = 'slot ' + (color || 'empty');
        if (name && name !== 'cont') slot.textContent = name;
        col.appendChild(slot);
      });
      el.appendChild(col);
    });
  }

  // 렌더링
  buildTimCol('timeCol');
  buildTimCol('timeCol2');
  buildDayHeaders('beforeDayHeaders');
  buildDayHeaders('afterDayHeaders');
  buildGrid('beforeGrid', BEFORE);
  buildGrid('afterGrid', AFTER);

  // ── 햄버거 / 사이드 메뉴 ──
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

  // ── 푸터 아코디언 ──
  document.querySelectorAll('.footer-col-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const col = btn.closest('.footer-col');
      if (col) col.classList.toggle('open');
    });
  });

});
