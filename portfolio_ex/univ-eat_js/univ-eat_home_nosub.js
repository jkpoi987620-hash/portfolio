// ── 구독 플랜 선택하기 버튼 ──
document.getElementById('btnGoSub').addEventListener('click', () => {
  navigateTo('univ-eat_sub_nosub.html');
});

// ── 바텀 네비 (미구독 플로우) ──
document.querySelector('[data-nav="meal"]').addEventListener('click', () => {
  navigateTo('univ-eat_meal_nosub.html');
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
