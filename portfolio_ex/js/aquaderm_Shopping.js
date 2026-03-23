document.addEventListener('DOMContentLoaded', () => {

  /* 스크롤 시 네비 그림자 강조 */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10
      ? '0 2px 12px rgba(0,0,0,.10)'
      : '0 1px 6px rgba(0,0,0,.06)';
  });

  /* 3dot 메뉴 토글 */
  const dotsBtn = document.getElementById('navDotsBtn');
  const dotsMenu = document.getElementById('navDotsMenu');
  if (dotsBtn && dotsMenu) {
    dotsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dotsMenu.classList.toggle('open');
    });
    document.addEventListener('click', () => {
      dotsMenu.classList.remove('open');
    });
  }

  /* 햄버거 메뉴 토글 */
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('navMobileMenu');
  const mobileClose = document.getElementById('navMobileClose');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    mobileClose.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* 커스텀 정렬 드롭다운 */
  const sortWrap = document.getElementById('sortWrap');
  const sortBtn = document.getElementById('sortBtn');
  const sortLabel = document.getElementById('sortLabel');
  const sortDropdown = document.getElementById('sortDropdown');

  if (sortBtn && sortDropdown) {
    sortBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sortWrap.classList.toggle('open');
    });

    sortDropdown.querySelectorAll('.sort-item').forEach(item => {
      item.addEventListener('click', () => {
        sortDropdown.querySelectorAll('.sort-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        sortLabel.textContent = item.textContent;
        sortWrap.classList.remove('open');
        sortProducts(item.dataset.value);
      });
    });

    document.addEventListener('click', () => {
      sortWrap.classList.remove('open');
    });
  }

  /* 푸터 아코디언 */
  document.querySelectorAll('.footer-accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const list = btn.nextElementSibling;
      const isOpen = list.classList.contains('open');
      document.querySelectorAll('.footer-menu-list').forEach(l => l.classList.remove('open'));
      document.querySelectorAll('.footer-accordion-btn').forEach(b => b.classList.remove('open'));
      if (!isOpen) {
        list.classList.add('open');
        btn.classList.add('open');
      }
    });
  });

});

/* 카테고리 필터 */
function filterProducts(btn, category) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.product-card').forEach(card => {
    const cat = card.dataset.category;
    card.style.display = (category === '전체' || cat === category) ? '' : 'none';
  });
}

/* 정렬 */
function sortProducts(value) {
  const grids = [document.getElementById('popularGrid'), document.getElementById('allGrid')];

  grids.forEach(grid => {
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll('.product-card'));

    cards.sort((a, b) => {
      if (value === 'price_asc' || value === 'price_desc') {
        const priceA = parseInt(a.querySelector('.card-price').textContent.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.querySelector('.card-price').textContent.replace(/[^0-9]/g, ''));
        return value === 'price_asc' ? priceA - priceB : priceB - priceA;
      }
      if (value === 'rating') {
        const ratingA = parseFloat(a.querySelector('.rating-num').textContent);
        const ratingB = parseFloat(b.querySelector('.rating-num').textContent);
        return ratingB - ratingA;
      }
      return 0;
    });

    cards.forEach(card => grid.appendChild(card));
  });
}