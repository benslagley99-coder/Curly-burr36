(function () {
  const GRAV = 2600, JUMP = -880, PX = 200;
  let k, s, holding = false;

  function addRoof(x) {
    const w = 260 + Math.random() * 360;
    const y = 330 + Math.random() * 140;
    const vents = [];
    if (w > 380 && Math.random() < 0.7) vents.push(120 + Math.random() * (w - 240));
    s.roofs.push({ x, w, y, vents, shade: Math.random() });
  }

  k = Kit({
    reset() {
      s = { y: 300, vy: 0, ground: false, speed: 360, dist: 0, roofs: [], stars: [...Array(60)].map(() => [Math.random() * 960, Math.random() * 300, Math.random()]) };
      s.roofs.push({ x: -50, w: 700, y: 400, vents: [], shade: 0.5 });
      while (s.roofs.length < 5) gapAndAdd();
    },
    update(dt) {
      s.speed += dt * 10;
      s.dist += s.speed * dt;
      s.roofs.forEach((r) => (r.x -= s.speed * dt));
      if (s.roofs[0].x + s.roofs[0].w < -50) s.roofs.shift();
      while (s.roofs.length < 5) gapAndAdd();

      // Variable jump: releasing early cuts the rise short.
      s.vy += GRAV * dt * (!holding && s.vy < 0 ? 2.2 : 1);
      const prevY = s.y;
      s.y += s.vy * dt;
      s.ground = false;
      for (const r of s.roofs) {
        if (PX + 14 > r.x && PX - 14 < r.x + r.w && prevY <= r.y && s.y >= r.y) {
          s.y = r.y; s.vy = 0; s.ground = true;
        }
        // Hitting the side of a taller roof ends the run.
        if (PX + 14 > r.x && PX < r.x + 20 && s.y > r.y + 8) return end();
        for (const v of r.vents) {
          const vx = r.x + v;
          if (PX + 12 > vx && PX - 12 < vx + 34 && s.y > r.y - 34) return end();
        }
      }
      if (s.y > k.H + 60) return end();
      k.setScore(Math.floor(s.dist / 10) + " m");
    },
    draw() {
      const { ctx, W, H } = k;
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#0d0a1a"); g.addColorStop(1, "#2a1846");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      s.stars.forEach(([x, y, t]) => { ctx.fillStyle = `rgba(239,234,255,${0.2 + t * 0.5})`; ctx.fillRect((x - s.dist * 0.02 * t) % W + (x - s.dist * 0.02 * t < 0 ? W : 0), y, 2, 2); });
      ctx.fillStyle = "#ffe14d"; ctx.beginPath(); ctx.arc(780, 110, 46, 0, 7); ctx.fill();
      // Far skyline parallax
      ctx.fillStyle = "#1d1435";
      for (let i = 0; i < 16; i++) {
        const x = ((i * 90 - s.dist * 0.2) % (W + 90) + W + 90) % (W + 90) - 90;
        ctx.fillRect(x, 260 + (i * 53 % 120), 70, H);
      }
      s.roofs.forEach((r) => {
        ctx.fillStyle = r.shade > 0.5 ? "#161127" : "#1a1430"; ctx.fillRect(r.x, r.y, r.w, H - r.y);
        ctx.fillStyle = "#4dd2ff"; ctx.fillRect(r.x, r.y, r.w, 4);
        ctx.fillStyle = "rgba(255,225,77,.5)";
        for (let wx = r.x + 24; wx < r.x + r.w - 30; wx += 46)
          for (let wy = r.y + 30; wy < H; wy += 50) if ((wx * 7 + wy) % 3 < 1.2) ctx.fillRect(wx, wy, 18, 24);
        r.vents.forEach((v) => { ctx.fillStyle = "#ff4d6d"; ctx.fillRect(r.x + v, r.y - 30, 34, 30); ctx.fillStyle = "#0d0a1a"; ctx.fillRect(r.x + v + 5, r.y - 24, 24, 4); ctx.fillRect(r.x + v + 5, r.y - 14, 24, 4); });
      });
      runner(ctx);
    }
  });

  function gapAndAdd() {
    const lastR = s.roofs[s.roofs.length - 1];
    const gap = 90 + Math.random() * Math.min(170, 60 + s.dist / 60);
    addRoof(lastR.x + lastR.w + gap);
  }

  function runner(ctx) {
    const t = s.dist / 18;
    const leg = s.ground ? Math.sin(t) * 12 : 8;
    ctx.save(); ctx.translate(PX, s.y);
    ctx.strokeStyle = "#efeaff"; ctx.lineWidth = 6; ctx.lineCap = "round";
    ctx.shadowColor = "#4dd2ff"; ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.moveTo(0, -26); ctx.lineTo(leg, 0); ctx.moveTo(0, -26); ctx.lineTo(-leg, 0);
    ctx.moveTo(0, -26); ctx.lineTo(4, -50);
    ctx.moveTo(2, -44); ctx.lineTo(14 - leg * 0.6, -30); ctx.moveTo(2, -44); ctx.lineTo(-10 + leg * 0.6, -32);
    ctx.stroke();
    ctx.fillStyle = "#efeaff"; ctx.beginPath(); ctx.arc(6, -60, 9, 0, 7); ctx.fill();
    ctx.restore();
  }

  function end() { k.over(Math.floor(s.dist / 10), "Wiped out!", "Distance: " + Math.floor(s.dist / 10) + " m"); }
  function press() { holding = true; if (k.running && s.ground) { s.vy = JUMP; s.ground = false; } }
  function release() { holding = false; }
  addEventListener("keydown", (e) => { if ([" ", "ArrowUp", "w", "W"].includes(e.key) && k.running) { e.preventDefault(); if (!e.repeat) press(); } });
  addEventListener("keyup", (e) => { if ([" ", "ArrowUp", "w", "W"].includes(e.key)) release(); });
  k.canvas.addEventListener("pointerdown", press);
  addEventListener("pointerup", release);
  k.reset(); k.draw();
})();
