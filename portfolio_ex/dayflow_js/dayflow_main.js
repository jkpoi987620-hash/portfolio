// ── STAR FIELD & PLANETS ──
(function () {
  const canvas = document.getElementById('heroStars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [], planets = [], shootingStars = [], lastShoot = 0;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    initPlanets();
  }

  function initStars() {
    stars = [];
    const count = Math.floor((canvas.width * canvas.height) / 2800);
    for (let i = 0; i < count; i++) {
      stars.push({
        x:      Math.random() * canvas.width,
        y:      Math.random() * canvas.height,
        r:      Math.random() * 1.3 + 0.2,
        alpha:  Math.random(),
        twinkleSpeed: Math.random() * 0.007 + 0.002,
        twinkleDir:   Math.random() > 0.5 ? 1 : -1,
        vx:     (Math.random() - 0.5) * 0.12,
        vy:     (Math.random() - 0.5) * 0.12,
      });
    }
  }

  function initPlanets() {
    planets = [
      {
        x: canvas.width * 0.78,
        y: canvas.height * 0.22,
        r: 28,
        color: '#4a6fa5',
        glowColor: 'rgba(100,160,255,0.35)',
        glowSize: 55,
        vx: 0.018, vy: 0.010,
      },
      {
        x: canvas.width * 0.18,
        y: canvas.height * 0.68,
        r: 18,
        color: '#7c4fa0',
        glowColor: 'rgba(180,100,255,0.3)',
        glowSize: 42,
        vx: -0.012, vy: -0.015,
      },
      {
        x: canvas.width * 0.55,
        y: canvas.height * 0.82,
        r: 11,
        color: '#2d7a6e',
        glowColor: 'rgba(60,200,180,0.25)',
        glowSize: 30,
        vx: 0.022, vy: -0.008,
      },
    ];
  }

  function spawnShootingStar() {
    const angle = (Math.random() * 30 + 20) * (Math.PI / 180); // 20~50도 대각선
    const speed = Math.random() * 6 + 7;
    const startX = Math.random() * canvas.width * 0.8;
    const startY = Math.random() * canvas.height * 0.4;
    const len    = Math.random() * 120 + 80;
    shootingStars.push({
      x: startX, y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      len, alpha: 1,
      tail: [],
    });
  }

  function drawShootingStar(s) {
    s.tail.push({ x: s.x, y: s.y });
    if (s.tail.length > 18) s.tail.shift();

    for (let i = 0; i < s.tail.length; i++) {
      const t = i / s.tail.length;
      ctx.beginPath();
      ctx.arc(s.tail[i].x, s.tail[i].y, 1.2 * t, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,240,${t * s.alpha * 0.8})`;
      ctx.fill();
    }

    // head glow
    const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 5);
    grd.addColorStop(0, `rgba(255,255,255,${s.alpha})`);
    grd.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(s.x, s.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();
  }

  function drawPlanet(p) {
    // glow
    const grd = ctx.createRadialGradient(p.x, p.y, p.r * 0.5, p.x, p.y, p.r + p.glowSize);
    grd.addColorStop(0, p.glowColor);
    grd.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r + p.glowSize, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();

    // body
    const body = ctx.createRadialGradient(p.x - p.r * 0.3, p.y - p.r * 0.3, p.r * 0.1, p.x, p.y, p.r);
    body.addColorStop(0, lighten(p.color, 60));
    body.addColorStop(1, p.color);
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = body;
    ctx.fill();
  }

  function lighten(hex, amount) {
    const n = parseInt(hex.slice(1), 16);
    const r = Math.min(255, (n >> 16) + amount);
    const g = Math.min(255, ((n >> 8) & 0xff) + amount);
    const b = Math.min(255, (n & 0xff) + amount);
    return `rgb(${r},${g},${b})`;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // stars
    for (const s of stars) {
      s.alpha += s.twinkleSpeed * s.twinkleDir;
      if (s.alpha >= 1)   { s.alpha = 1; s.twinkleDir = -1; }
      if (s.alpha <= 0.05){ s.alpha = 0.05; s.twinkleDir = 1; }
      s.x += s.vx;
      s.y += s.vy;
      if (s.x < 0) s.x = canvas.width;
      if (s.x > canvas.width) s.x = 0;
      if (s.y < 0) s.y = canvas.height;
      if (s.y > canvas.height) s.y = 0;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
      ctx.fill();
    }

    // shooting stars
    const now = Date.now();
    if (now - lastShoot > Math.random() * 3000 + 2000) {
      spawnShootingStar();
      lastShoot = now;
    }
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const s = shootingStars[i];
      s.x += s.vx;
      s.y += s.vy;
      s.alpha -= 0.022;
      drawShootingStar(s);
      if (s.alpha <= 0 || s.x > canvas.width || s.y > canvas.height) {
        shootingStars.splice(i, 1);
      }
    }

    // planets
    for (const p of planets) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -80) p.x = canvas.width + 80;
      if (p.x > canvas.width + 80) p.x = -80;
      if (p.y < -80) p.y = canvas.height + 80;
      if (p.y > canvas.height + 80) p.y = -80;
      drawPlanet(p);
    }

    requestAnimationFrame(draw);
  }

  resize();
  initStars();
  draw();
  window.addEventListener('resize', () => { resize(); initStars(); });
})();

document.addEventListener('DOMContentLoaded', () => {

  // ── PAGE TRANSITION ──
  const startBtn = document.getElementById('startBtn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      document.body.classList.add('page-exit');
      setTimeout(() => {
        window.location.href = 'dayflow_schedule.html';
      }, 500);
    });
  }

  // ── HAMBURGER / SIDE MENU ──
  const hamburger   = document.getElementById('hamburger');
  const sideMenu    = document.getElementById('sideMenu');
  const sideOverlay = document.getElementById('sideOverlay');
  const sideClose   = document.getElementById('sideClose');

  function openMenu() {
    sideMenu.classList.add('active');
    sideOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    sideMenu.classList.remove('active');
    sideOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger)    hamburger.addEventListener('click', openMenu);
  if (sideClose)    sideClose.addEventListener('click', closeMenu);
  if (sideOverlay)  sideOverlay.addEventListener('click', closeMenu);

  // ── FOOTER ACCORDION ──
  document.querySelectorAll('.footer-col-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const col = btn.closest('.footer-col');
      if (col) col.classList.toggle('open');
    });
  });

});
