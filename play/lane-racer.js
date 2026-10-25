(function () {
  const LANES = 4, ROAD_W = 480;
  let k, s;
  const roadX = () => (k.W - ROAD_W) / 2;
  const laneX = (i) => roadX() + ROAD_W / LANES * (i + 0.5);
  const COLORS = ["#ff4d6d", "#4dd2ff", "#ffe14d", "#3ddc97"];

  k = Kit({
    reset() {
      s = { lane: 1, x: laneX(1), speed: 380, dist: 0, cars: [], spawn: 0, stripe: 0 };
    },
    update(dt) {
      s.speed += dt * 14;
      s.dist += s.speed * dt;
      s.stripe = (s.stripe + s.speed * dt) % 60;
      s.x += (laneX(s.lane) - s.x) * Math.min(1, dt * 14);
      s.spawn -= dt;
      if (s.spawn <= 0) {
        // Leave at least one lane open in each wave.
        const open = Math.floor(Math.random() * LANES);
        const n = Math.random() < Math.min(0.6, s.dist / 20000) ? 2 : 1;
        const lanes = [...Array(LANES).keys()].filter((l) => l !== open).sort(() => Math.random() - 0.5).slice(0, n);
        lanes.forEach((l) => s.cars.push({ lane: l, y: -100, v: 0.35 + Math.random() * 0.3, c: COLORS[Math.floor(Math.random() * 4)] }));
        s.spawn = Math.max(0.45, 1.1 - s.dist / 15000);
      }
      s.cars.forEach((c) => (c.y += s.speed * c.v * dt + s.speed * 0.4 * dt));
      s.cars = s.cars.filter((c) => c.y < k.H + 120);
      const py = k.H - 100;
      if (s.cars.some((c) => Math.abs(laneX(c.lane) - s.x) < 50 && Math.abs(c.y - py) < 80)) {
        k.over(Math.floor(s.dist / 10), "Crashed!", "Distance: " + Math.floor(s.dist / 10) + " m");
      }
      k.setScore(Math.floor(s.dist / 10) + " m · " + Math.floor(s.speed / 4) + " km/h");
    },
    draw() {
      const { ctx, W, H } = k;
      ctx.fillStyle = "#0d0a1a"; ctx.fillRect(0, 0, W, H);
      // City glow at the sides
      for (let i = 0; i < 14; i++) {
        const y = ((i * 90 + s.stripe * 3) % (H + 90)) - 90;
        ctx.fillStyle = i % 2 ? "#221a3b" : "#161127";
        ctx.fillRect(20, y, roadX() - 60, 60);
        ctx.fillRect(roadX() + ROAD_W + 40, y + 30, roadX() - 60, 60);
      }
      ctx.fillStyle = "#1b1530"; ctx.fillRect(roadX(), 0, ROAD_W, H);
      ctx.fillStyle = "#c77dff"; ctx.fillRect(roadX() - 6, 0, 6, H); ctx.fillRect(roadX() + ROAD_W, 0, 6, H);
      ctx.fillStyle = "rgba(239,234,255,.35)";
      for (let l = 1; l < LANES; l++) {
        const x = roadX() + ROAD_W / LANES * l - 2;
        for (let y = -60 + s.stripe; y < H; y += 60) ctx.fillRect(x, y, 4, 30);
      }
      s.cars.forEach((c) => car(laneX(c.lane), c.y, c.c, true));
      car(s.x, H - 100, "#c77dff", false);
    }
  });

  function car(x, y, color, down) {
    const { ctx } = k;
    ctx.save();
    ctx.translate(x, y);
    ctx.shadowColor = color; ctx.shadowBlur = 20;
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.roundRect(-28, -48, 56, 96, 12); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#0d0a1a";
    ctx.fillRect(-20, down ? 10 : -30, 40, 18);
    ctx.fillStyle = down ? "#ff4d6d" : "#fff6b0";
    ctx.fillRect(-24, down ? 40 : -46, 12, 5); ctx.fillRect(12, down ? 40 : -46, 12, 5);
    ctx.restore();
  }

  const move = (d) => { if (k.running) s.lane = Math.max(0, Math.min(LANES - 1, s.lane + d)); };
  addEventListener("keydown", (e) => {
    if (["ArrowLeft", "a", "A"].includes(e.key)) { move(-1); e.preventDefault(); }
    if (["ArrowRight", "d", "D"].includes(e.key)) { move(1); e.preventDefault(); }
  });
  k.canvas.addEventListener("pointerdown", (e) => move(k.point(e).x < s.x ? -1 : 1));
  k.reset(); k.draw();
})();
