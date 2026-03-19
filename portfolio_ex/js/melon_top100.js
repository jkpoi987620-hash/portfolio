const si = document.querySelector('.bottom-nav__search input');
  if (si) {
    si.addEventListener('focus', () => si.closest('.bottom-nav__search').style.borderColor = '#00CD3C');
    si.addEventListener('blur',  () => si.closest('.bottom-nav__search').style.borderColor = '#6B7280');
  }