// ── 요일 탭 전환 ──
document.querySelectorAll('.day-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.day-tab').forEach(t => t.classList.remove('day-tab--active'));
    tab.classList.add('day-tab--active');
  });
});

// ── 바텀 네비 ──
document.querySelector('[data-nav="home"]').addEventListener('click', () => {
  navigateTo('univ-eat_home.html', true);
});

// ── 지금 구독하기 ──
document.getElementById('btnSubscribe').addEventListener('click', () => {
  navigateTo('univ-eat_sub.html');
});

// ── 바텀 네비: 구독 탭 ──
document.querySelector('[data-nav="sub"]').addEventListener('click', () => {
  navigateTo('univ-eat_sub.html');
});

// ── 바텀 네비: 외식정보 탭 ──
document.querySelector('[data-nav="dining"]').addEventListener('click', () => {
  navigateTo('univ-eat_dining.html');
});

// ── 바텀 네비: 마이페이지 탭 ──
document.querySelector('[data-nav="mypage"]').addEventListener('click', () => {
  navigateTo('univ-eat_mypage.html');
});
