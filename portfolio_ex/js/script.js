const searchInput = document.querySelector('.bottom-nav__search input');
if (searchInput) {
  searchInput.addEventListener('focus', () => searchInput.closest('.bottom-nav__search').style.borderColor = '#00CD3C');
  searchInput.addEventListener('blur', () => searchInput.closest('.bottom-nav__search').style.borderColor = '#6B7280');
}

// 장르 탭 active 토글
document.querySelectorAll('.genre-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.genre-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// 카운트업 타이머
let totalSeconds = 0;
const timerEl = document.getElementById('timer');
if (timerEl) {
  setInterval(() => {
    totalSeconds++;
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const s = String(totalSeconds % 60).padStart(2, '0');
    timerEl.textContent = `${h} : ${m} : ${s}`;
  }, 1000);
}