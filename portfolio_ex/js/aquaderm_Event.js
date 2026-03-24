/* ───────── NAV 3dot (태블릿) ───────── */
const navDotsBtn = document.getElementById('navDotsBtn');
const navDotsMenu = document.getElementById('navDotsMenu');

if (navDotsBtn && navDotsMenu) {
  navDotsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navDotsMenu.classList.toggle('open');
  });

  document.addEventListener('click', () => {
    navDotsMenu.classList.remove('open');
  });
}

/* ───────── NAV 햄버거 (모바일) ───────── */
const navHamburger = document.getElementById('navHamburger');
const navMobileMenu = document.getElementById('navMobileMenu');
const navMobileClose = document.getElementById('navMobileClose');

if (navHamburger && navMobileMenu) {
  navHamburger.addEventListener('click', () => {
    navMobileMenu.classList.add('open');
  });
}

if (navMobileClose && navMobileMenu) {
  navMobileClose.addEventListener('click', () => {
    navMobileMenu.classList.remove('open');
  });
}

/* ───────── FOOTER 아코디언 (태블릿/모바일) ───────── */
document.querySelectorAll('.footer-accordion-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const list = btn.nextElementSibling;
    if (!list) return;
    const isOpen = list.classList.contains('open');
    document.querySelectorAll('.footer-menu-list').forEach(l => l.classList.remove('open'));
    document.querySelectorAll('.footer-accordion-btn').forEach(b => b.classList.remove('open'));
    if (!isOpen) {
      list.classList.add('open');
      btn.classList.add('open');
    }
  });
});
