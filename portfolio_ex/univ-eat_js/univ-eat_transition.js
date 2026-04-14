/* =========================================
   Univ-Eat — 페이지 전환 공통 유틸
   ========================================= */

/**
 * 슬라이드 전환 후 이동
 * @param {string} url      - 이동할 페이지 경로
 * @param {boolean} isBack  - true면 뒤로가기 방향
 */
function navigateTo(url, isBack = false) {
  const screen = document.querySelector('.screen');
  if (!screen) { location.href = url; return; }

  const outClass = isBack ? 'page-slide-out-back' : 'page-slide-out';
  screen.classList.add(outClass);

  // 애니메이션 끝나면 이동
  screen.addEventListener('animationend', () => {
    location.href = url;
  }, { once: true });
}
