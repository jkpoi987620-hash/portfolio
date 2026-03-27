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

  // ── 로딩 텍스트 순차 변경 ──
  const texts = [
    'AI가 하루를 분석 중입니다',
    '일정을 정리하고 있어요',
    '최적화 중입니다',
  ];
  const loadingText = document.querySelector('.loading-text');
  const dotsEl = document.querySelector('.loading-dots');
  let idx = 0;

  function changeText() {
    idx++;
    if (!loadingText || idx >= texts.length) return;
    loadingText.classList.add('fade-out');
    setTimeout(() => {
      loadingText.childNodes[0].textContent = texts[idx];
      loadingText.classList.remove('fade-out');
    }, 300);
  }

  setTimeout(() => changeText(), 3500);
  setTimeout(() => changeText(), 7000);

  // ── 점(dot) 애니메이션 ──
  const dotSteps = ['.', '..', '...'];
  let dotIdx = 0;
  if (dotsEl) {
    dotsEl.textContent = dotSteps[0];
    setInterval(() => {
      dotIdx = (dotIdx + 1) % dotSteps.length;
      dotsEl.textContent = dotSteps[dotIdx];
    }, 400);
  }

  // ── 자동 페이지 이동 (10초 후) ──
  setTimeout(() => {
    document.body.classList.add('page-exit');
    setTimeout(() => {
      window.location.href = 'dayflow_dashboard.html';
    }, 500);
  }, 10000);

});
