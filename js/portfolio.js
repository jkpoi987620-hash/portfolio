/* ════════════════════════════════
   햄버거 메뉴
════════════════════════════════ */
const dim = document.getElementById('menuDim');
let activeMenu = null;
let activeBtn = null;

const HAMBURGER_SVG = `<svg viewBox="0 0 24 24" style="width:24px;height:24px;stroke:#111827;fill:none;stroke-width:2;stroke-linecap:round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
const CLOSE_SVG = `<svg viewBox="0 0 24 24" style="width:24px;height:24px;stroke:#111827;fill:none;stroke-width:2;stroke-linecap:round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

function closeMenu() {
  if (!activeMenu) return;
  activeMenu.classList.remove('open');
  dim.classList.remove('active');
  if (activeBtn) activeBtn.innerHTML = HAMBURGER_SVG;
  activeMenu = null;
  activeBtn = null;
}

function setupHamburger(btnId, menuId) {
  const btn = document.getElementById(btnId);
  const menu = document.getElementById(menuId);
  if (!btn || !menu) return;
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = menu.classList.contains('open');
    closeMenu();
    if (!isOpen) {
      menu.classList.add('open');
      btn.innerHTML = CLOSE_SVG;
      activeMenu = menu;
      activeBtn = btn;

      let tracking = true;
      function trackMenuBottom() {
        if (!tracking) return;
        dim.style.top = menu.getBoundingClientRect().bottom + 'px';
        requestAnimationFrame(trackMenuBottom);
      }
      setTimeout(() => { tracking = false; }, 420);
      trackMenuBottom();
      dim.classList.add('active');
    }
  });
}
setupHamburger('hamburgerBtn', 'mobileMenu');
setupHamburger('hamburgerBtn2', 'mobileMenu2');

dim.addEventListener('click', closeMenu);

// 767px 초과 시 메뉴 강제 닫기
window.matchMedia('(max-width: 767px)').addEventListener('change', (e) => {
  if (!e.matches) closeMenu();
});


/* ════════════════════════════════
   BOOK-FLIP 페이지 전환
════════════════════════════════ */
const pageMain = document.getElementById('page-main');
const pageAbout = document.getElementById('page-about');
let currentPage = 'main';
let isAnimating = false;
const dirClasses = ['from-left', 'from-right', 'from-bottom'];

function randomDir() { return dirClasses[Math.floor(Math.random() * dirClasses.length)]; }

function assignRandomDirs() {
  pageAbout.querySelectorAll('.anim-el').forEach(el => {
    el.classList.remove('from-left', 'from-right', 'from-bottom', 'appeared');
    el.classList.add(randomDir());
  });
}

function triggerEntranceAnimations() {
  Array.from(pageAbout.querySelectorAll('.anim-el')).forEach((el, i) => {
    setTimeout(() => el.classList.add('appeared'), 120 + i * 85);
  });
}

function showPage(name) {
  if (isAnimating || name === currentPage) return;
  isAnimating = true;
  closeMenu();

  document.querySelectorAll('.nav-left a[data-page], .mobile-menu a[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === name);
  });

  if (name === 'about') {
    assignRandomDirs();
    pageAbout.style.cssText = 'position:absolute;top:0;left:0;width:100%;opacity:0;pointer-events:none;z-index:1;transform:translateX(100%);animation:none;display:block;';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      pageMain.style.cssText = 'position:relative;z-index:2;animation:mainOut 0.72s cubic-bezier(0.77,0,0.18,1) forwards;';
      pageAbout.style.cssText = 'position:absolute;top:0;left:0;width:100%;z-index:3;pointer-events:none;animation:aboutIn 0.72s cubic-bezier(0.77,0,0.18,1) forwards;';
    }));
    setTimeout(() => {
      pageMain.style.cssText = 'position:absolute;top:0;left:0;width:100%;transform:translateX(-28%);opacity:0;pointer-events:none;z-index:1;display:none;';
      pageAbout.style.cssText = 'position:relative;transform:translateX(0);opacity:1;pointer-events:auto;z-index:2;';
      pageWorks.style.cssText = 'position:absolute;top:0;left:0;width:100%;transform:translateX(100%);opacity:0;pointer-events:none;z-index:1;visibility:hidden;height:0;overflow:hidden;';
      window.scrollTo(0, 0);
      currentPage = 'about';
      isAnimating = false;
      triggerEntranceAnimations();
    }, 750);
  } else {
    // works 페이지에서 오는 경우 pageWorks를 from으로 사용
    const fromEl = currentPage === 'works' ? pageWorks : pageAbout;
    fromEl.style.cssText = 'position:absolute;top:0;left:0;width:100%;z-index:2;animation:aboutOut 0.72s cubic-bezier(0.77,0,0.18,1) forwards;';
    if (currentPage !== 'works') {
      pageAbout.style.cssText = 'position:absolute;top:0;left:0;width:100%;z-index:2;animation:aboutOut 0.72s cubic-bezier(0.77,0,0.18,1) forwards;';
    }
    pageMain.style.cssText = 'position:relative;z-index:3;animation:mainIn 0.72s cubic-bezier(0.77,0,0.18,1) forwards;display:block;';
    setTimeout(() => {
      pageAbout.style.cssText = 'position:absolute;top:0;left:0;width:100%;transform:translateX(100%);opacity:0;pointer-events:none;z-index:1;display:none;';
      pageWorks.style.cssText = 'position:absolute;top:0;left:0;width:100%;transform:translateX(100%);opacity:0;pointer-events:none;z-index:1;visibility:hidden;height:0;overflow:hidden;';
      pageMain.style.cssText = 'position:relative;transform:translateX(0);opacity:1;pointer-events:auto;z-index:2;';
      window.scrollTo(0, 0);
      currentPage = 'main';
      isAnimating = false;
    }, 750);
  }
}

document.querySelectorAll('[data-page]').forEach(el => {
  el.addEventListener('click', e => { e.preventDefault(); showPage(el.dataset.page); });
});

// 새로고침 시 항상 메인 페이지 표시
function resetPage() {
  pageAbout.style.cssText = 'position:absolute;top:0;left:0;width:100%;transform:translateX(100%);opacity:0;pointer-events:none;z-index:1;display:none;';
  pageMain.style.cssText = 'position:relative;transform:translateX(0);opacity:1;pointer-events:auto;z-index:2;';
  // 메인 페이지에서 Works 항상 active
  document.querySelectorAll('.nav-left a[data-page], .mobile-menu a[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === 'main');
  });
}
resetPage();


/* ════════════════════════════════
   슬라이더 – 버튼 + 터치 스와이프
════════════════════════════════ */
const TOTAL = 5;
let current = 0;
const stage = document.getElementById('sliderStage');
const caption = document.getElementById('sliderCaption');
const cards = Array.from(stage.querySelectorAll('.slide-card'));
const caps = Array.from(caption.querySelectorAll('.caption-item'));
const dots = Array.from(document.querySelectorAll('.swipe-dot'));

function posClass(offset) {
  const m = ((offset % TOTAL) + TOTAL) % TOTAL;
  if (m === 0) return 'pos-center';
  if (m === 1) return 'pos-right';
  if (m === TOTAL - 1) return 'pos-left';
  if (m === 2) return 'pos-hidden-right';
  return 'pos-hidden-left';
}

function updatePositions() {
  cards.forEach((c, i) => { c.className = 'slide-card ' + posClass(((i - current) % TOTAL + TOTAL) % TOTAL); });
  caps.forEach((c, i) => { c.classList.toggle('visible', i === current); });
  dots.forEach((d, i) => { d.classList.toggle('active', i === current); });
}

function goTo(idx) {
  current = ((idx % TOTAL) + TOTAL) % TOTAL;
  updatePositions();
}

// 카드 클릭은 아래 Works 추가 코드에서 처리

document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));

let touchStartX = 0, touchStartY = 0, isSwiping = false;

stage.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  isSwiping = false;
}, { passive: true });

stage.addEventListener('touchmove', e => {
  const dx = e.touches[0].clientX - touchStartX;
  const dy = e.touches[0].clientY - touchStartY;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) isSwiping = true;
}, { passive: true });

stage.addEventListener('touchend', e => {
  if (!isSwiping) return;
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 40) goTo(dx < 0 ? current + 1 : current - 1);
});

updatePositions();


/* ── Works 상세 페이지 추가 ── */
const pageWorks = document.getElementById('page-works');
const workPdfImg = document.getElementById('workPdfImg');
const workCtaBtn = document.getElementById('workCtaBtn');
const isLocal = location.hostname === 'localhost';
const base = isLocal ? './' : '/portfolio/';

function path(p) {
  return isLocal ? p : `${base}${p}`;
}


// 초기 숨김 (resetPage와 동일 방식)
pageWorks.style.cssText = 'position:absolute;top:0;left:0;width:100%;transform:translateX(100%);opacity:0;pointer-events:none;z-index:1;visibility:hidden;height:0;overflow:hidden;';

const workData = {
  cineq: { pdf: path('img/CINEQ_PORTFOLIO.jpg'), link: path('portfolio_ex/movie.html'), bg: path('img/CINEQ_CTA-bg.png') },
  tempur: { pdf: path('img/TEMPUR_PORTFOLIO.png'), link: path('portfolio_ex/index.html'), bg: path('img/TEMPUR_CTA-bg.png') },
  melon: { pdf: path('img/MELON_PORTFOLIO.jpg'), link: path('portfolio_ex/melon.html'), bg: path('img/MELON_CTA-bg.png') },
  aquaderm: { pdf: path('img/AQUADREM_PORTFOLIO.jpg'), link: path('portfolio_ex/aquadrem_index/aquaderm.html'), bg: path('img/AQUA_CTA-bg.png') },
  ssense: { pdf: path('img/SSENSE_PORTFOLIO.png'), link: path('portfolio_ex/teamProject-main/index.html'), bg: path('img/SSENSE_CTA-bg.png') }
};

function openWork(workKey) {
  if (isAnimating) return;
  isAnimating = true;
  closeMenu();
  const data = workData[workKey];
  if (data) {
    workPdfImg.src = data.pdf;
    workCtaBtn.href = data.link;
    document.querySelector('.work-cta').style.backgroundImage = data.bg ? `url(${data.bg})` : '';
  }
  document.querySelectorAll('.subnav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.work === workKey);
  });
  pageWorks.style.cssText = 'position:absolute;top:0;left:0;width:100%;opacity:0;pointer-events:none;z-index:1;transform:translateX(100%);animation:none;visibility:visible;height:auto;';
  requestAnimationFrame(() => requestAnimationFrame(() => {
    pageMain.style.cssText = 'position:relative;z-index:2;animation:mainOut 0.72s cubic-bezier(0.77,0,0.18,1) forwards;';
    pageWorks.style.cssText = 'position:absolute;top:0;left:0;width:100%;z-index:3;pointer-events:none;animation:aboutIn 0.72s cubic-bezier(0.77,0,0.18,1) forwards;visibility:visible;';
  }));
  setTimeout(() => {
    pageMain.style.cssText = 'position:absolute;top:0;left:0;width:100%;transform:translateX(-28%);opacity:0;pointer-events:none;z-index:1;display:none;';
    pageWorks.style.cssText = 'position:relative;transform:translateX(0);opacity:1;pointer-events:auto;z-index:2;visibility:visible;height:auto;';
    window.scrollTo(0, 0);
    currentPage = 'works';
    isAnimating = false;
  }, 750);
}

// 카드 클릭 이벤트 재등록 (기존 이벤트 위에 덮어씀)
cards.forEach((c, i) => {
  c.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    const off = ((i - current) % TOTAL + TOTAL) % TOTAL;
    if (off === 0) { openWork(c.dataset.work); } else { goTo(i); }
  });
});

// 서브 네비 클릭
document.querySelectorAll('.subnav-item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    const data = workData[item.dataset.work];
    if (data) {
      workPdfImg.src = data.pdf;
      workCtaBtn.href = data.link;
      document.querySelector('.work-cta').style.backgroundImage = data.bg ? `url(${data.bg})` : '';
    }
    document.querySelectorAll('.subnav-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    window.scrollTo(0, 0);
  });
});

// page-works 햄버거
setupHamburger('hamburgerBtn3', 'mobileMenu3');
