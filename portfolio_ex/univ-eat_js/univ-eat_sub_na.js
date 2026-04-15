// ── 홈으로 돌아가기 ──
document.getElementById('btnBackHome').addEventListener('click', () => {
  navigateTo('univ-eat_home_na.html', true);
});

// ── 바텀 네비 ──
document.querySelector('[data-nav="home"]').addEventListener('click', () => {
  navigateTo('univ-eat_home_na.html', true);
});

document.querySelector('[data-nav="meal"]').addEventListener('click', () => {
  navigateTo('univ-eat_meal_na.html', true);
});

document.querySelector('[data-nav="dining"]').addEventListener('click', () => {
  navigateTo('univ-eat_dining_na.html');
});

document.querySelector('[data-nav="mypage"]').addEventListener('click', () => {
  navigateTo('univ-eat_mypage_na.html');
});
