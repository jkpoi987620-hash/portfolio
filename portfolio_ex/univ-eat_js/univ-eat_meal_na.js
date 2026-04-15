// ── 요일 탭 전환 ──
document.querySelectorAll('.day-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.day-tab').forEach(t => t.classList.remove('day-tab--active'));
    tab.classList.add('day-tab--active');
  });
});

// ── 바텀 네비 ──
document.querySelector('[data-nav="home"]').addEventListener('click', () => {
  navigateTo('univ-eat_home_na.html', true);
});

document.querySelector('[data-nav="sub"]').addEventListener('click', () => {
  navigateTo('univ-eat_sub_na.html');
});

document.querySelector('[data-nav="dining"]').addEventListener('click', () => {
  navigateTo('univ-eat_dining_na.html');
});

document.querySelector('[data-nav="mypage"]').addEventListener('click', () => {
  navigateTo('univ-eat_mypage_na.html');
});
