// =============================================
//  EmerX — Animatsiyali fon (IT Park uslubida)
// =============================================
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [], animId;
  const COUNT = 26;
  const COLORS = ['#1f9c4a', '#3fd674', '#c8790e'];
  const MAX_DIST = 130;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function mkParticle() {
    return {
      x: rand(0, W), y: rand(0, H),
      vx: rand(-0.35, 0.35), vy: rand(-0.35, 0.35),
      r: rand(1.2, 2.6),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: rand(0.12, 0.28),
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, mkParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Zarralar harakati
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
    }

    // Chiziqlar (yaqin zarralar orasida)
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const opacity = (1 - dist / MAX_DIST) * 0.07;
          ctx.beginPath();
          ctx.strokeStyle = a.color;
          ctx.globalAlpha = opacity;
          ctx.lineWidth = 0.8;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Zarrachalar
    for (const p of particles) {
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    ctx.globalAlpha = 1;
    animId = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); });
  init();
  draw();

  // Sichqoncha harakati — zarralarni tortadi
  window.addEventListener('mousemove', (e) => {
    for (const p of particles) {
      const dx = e.clientX - p.x, dy = e.clientY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        p.vx += dx * 0.0003;
        p.vy += dy * 0.0003;
        // Tezlikni cheklash
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.2) { p.vx /= speed; p.vy /= speed; }
      }
    }
  });
})();
