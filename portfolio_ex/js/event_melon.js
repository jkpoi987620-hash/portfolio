// 검색창 포커스
  const si = document.querySelector('.bottom-nav__search input');
  if (si) {
    si.addEventListener('focus', () => si.closest('.bottom-nav__search').style.borderColor = '#00CD3C');
    si.addEventListener('blur',  () => si.closest('.bottom-nav__search').style.borderColor = '#6B7280');
  }

  // 카운트업 타이머
  let total = 0;
  const hEl = document.getElementById('ev-h');
  const mEl = document.getElementById('ev-m');
  const sEl = document.getElementById('ev-s');
  if (hEl) {
    hEl.textContent = '00'; mEl.textContent = '00'; sEl.textContent = '00';
    setInterval(() => {
      total++;
      hEl.textContent = String(Math.floor(total / 3600)).padStart(2,'0');
      mEl.textContent = String(Math.floor((total % 3600) / 60)).padStart(2,'0');
      sEl.textContent = String(total % 60).padStart(2,'0');
    }, 1000);
  }