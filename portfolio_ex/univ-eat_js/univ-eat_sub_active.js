// ── 바텀 네비 (구독 완료 플로우) ──
document.querySelector('[data-nav="home"]').addEventListener('click', () => {
  navigateTo('univ-eat_home.html', true);
});

document.querySelector('[data-nav="meal"]').addEventListener('click', () => {
  navigateTo('univ-eat_meal.html');
});

document.querySelector('[data-nav="dining"]').addEventListener('click', () => {
  navigateTo('univ-eat_dining.html');
});

document.querySelector('[data-nav="mypage"]').addEventListener('click', () => {
  navigateTo('univ-eat_mypage.html');
});
