// ── 요일 탭 전환 ──
document.querySelectorAll('.day-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.day-tab').forEach(t => t.classList.remove('day-tab--active'));
    tab.classList.add('day-tab--active');
  });
});

// ── 바텀 네비 (미구독 플로우) ──
document.querySelector('[data-nav="home"]').addEventListener('click', () => {
  navigateTo('univ-eat_home_nosub.html', true);
});

// ── 지금 구독하기 ──
document.getElementById('btnSubscribe').addEventListener('click', () => {
  navigateTo('univ-eat_sub_nosub.html');
});

document.querySelector('[data-nav="sub"]').addEventListener('click', () => {
  navigateTo('univ-eat_sub_nosub.html');
});

document.querySelector('[data-nav="dining"]').addEventListener('click', () => {
  navigateTo('univ-eat_dining_nosub.html');
});

document.querySelector('[data-nav="mypage"]').addEventListener('click', () => {
  navigateTo('univ-eat_mypage_nosub.html');
});
