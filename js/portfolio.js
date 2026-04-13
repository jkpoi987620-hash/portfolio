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
   Works 그리드 클릭
════════════════════════════════ */


/* ── Works 상세 페이지 추가 ── */
const pageWorks = document.getElementById('page-works');
const workPdfImg = document.getElementById('workPdfImg');
const workCtaBtn = document.getElementById('workCtaBtn');



// 초기 숨김 (resetPage와 동일 방식)
pageWorks.style.cssText = 'position:absolute;top:0;left:0;width:100%;transform:translateX(100%);opacity:0;pointer-events:none;z-index:1;visibility:hidden;height:0;overflow:hidden;';

const BASE = window.location.pathname.includes('/portfolio') ? '/portfolio' : '';
const workData = {
  cineq: {
    pdf: `${BASE}/img/CINEQ_PORTFOLIO.jpg`,
    link: `${BASE}/portfolio_ex/movie.html`,
    bg: `${BASE}/img/CINEQ_CTA-bg.png`,
    text: '본 프로젝트는 Figma로 디자인하고 HTML, CSS로 구현되었습니다.'
  },
  tempur: {
    pdf: `${BASE}/img/TEMPUR_PORTFOLIO.png`,
    link: `${BASE}/portfolio_ex/index.html`,
    bg: `${BASE}/img/TEMPUR_CTA-bg.png`,
    text: '본 프로젝트는 Figma로 디자인하고 HTML, CSS, JavaScript로 구현되었습니다.'
  },
  melon: {
    pdf: `${BASE}/img/MELON_PORTFOLIO.jpg`,
    link: `${BASE}/portfolio_ex/melon.html`,
    bg: `${BASE}/img/MELON_CTA-bg.png`,
    text: '본 프로젝트는 Figma로 디자인하고 HTML, CSS, JavaScript로 구현되었습니다.'
  },
  aquaderm: {
    pdf: `${BASE}/img/AQUADREM_PORTFOLIO.jpg`,
    link: `${BASE}/portfolio_ex/aquadrem_index/aquaderm.html`,
    bg: `${BASE}/img/AQUA_CTA-bg.png`,
    text: '본 프로젝트는 Figma로 디자인하고 HTML, CSS, JavaScript로 구현되었습니다.'
  },
  ssense: {
    pdf: `${BASE}/img/SSENSE_PORTFOLIO.png`,
    link: `${BASE}/portfolio_ex/teamProject-main/index.html`,
    bg: `${BASE}/img/SSENSE_CTA-bg.png`,
    text: '본 프로젝트는 Figma로 디자인하고 HTML, CSS, JavaScript로 구현되었습니다.'
  },
  dayflow: {
    pdf: `${BASE}/img/DAYFLOW_PORTFOLIO.jpg`,
    link: `${BASE}/portfolio_ex/dayflow_index/dayflow_main.html`,
    bg: `${BASE}/img/DAYFLOW_CTA-bg.png`,
    text: '본 프로젝트는 Figma로 디자인하고 HTML, CSS, JavaScript로 구현되었습니다.'
  },
  univeat
  : {
    pdf: `${BASE}/img/UNIV-EAT_PORTFOLIO.png`,
    link: `${BASE}/portfolio_ex/dayflow_index/dayflow_main.html`,
    bg: `${BASE}/img/UNIV_CTA-bg.png`,
    text: '본 프로젝트는 Figma로 디자인하고 HTML, CSS, JavaScript로 구현되었습니다.'
  },
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
    document.querySelector('.work-cta-text').innerHTML = data.text;
  }
  document.querySelectorAll('.subnav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.work === workKey);
  });
  const activeSubnavItem = document.querySelector(`.subnav-item[data-work="${workKey}"]`);
  if (activeSubnavItem) setTimeout(() => scrollSubnavToActive(activeSubnavItem), 760);
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

document.querySelectorAll('.work-item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    openWork(item.dataset.work);
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
      document.querySelector('.work-cta-text').innerHTML = data.text;
    }
    document.querySelectorAll('.subnav-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    scrollSubnavToActive(item);
    window.scrollTo(0, 0);
  });
});

function scrollSubnavToActive(item) {
  const inner = document.querySelector('.works-subnav-inner');
  if (!inner) return;
  const itemLeft = item.offsetLeft;
  const itemWidth = item.offsetWidth;
  const innerWidth = inner.offsetWidth;
  inner.scrollTo({ left: itemLeft - innerWidth / 2 + itemWidth / 2, behavior: 'smooth' });
}

// page-works 햄버거
setupHamburger('hamburgerBtn3', 'mobileMenu3');
