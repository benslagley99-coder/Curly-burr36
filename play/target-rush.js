(function () {
  const ROUND = 30, LIFE = 1.8;
  let k, s;
  const COLORS = ["#ff4d6d", "#ffe14d", "#4dd2ff"];

  k = Kit({
    reset() { s = { t: ROUND, score: 0, combo: 1, hits: 0, shots: 0, targets: [], spawn: 0, pops: [] }; },
    update(dt) {
      s.t -= dt;
      if (s.t <= 0) {
        const acc = s.shots ? Math.round((s.hits / s.shots) * 100) : 0;
        return k.over(s.score, "Time!", `Score: ${s.score} · Accuracy ${acc}%`);
      }
      s.spawn -= dt;
      if (s.spawn <= 0 && s.targets.length < 4) {
        s.targets.push({ x: 70 + Math.random() * (k.W - 140), y: 90 + Math.random() * (k.H - 160), age: 0, c: COLORS[Math.floor(Math.random() * 3)] });
        s.spawn = 0.35 + Math.random() * 0.4;
      }
      s.targets.forEach((t) => (t.age += dt));
      const expired = s.targets.filter((t) => t.age >= LIFE).length;
      if (expired) s.combo = 1;
      s.targets = s.targets.filter((t) => t.age < LIFE);
      s.pops.forEach((p) => (p.age += dt));
      s.pops = s.pops.filter((p) => p.age < 0.6);
      k.setScore(`${s.score} pts · x${s.combo} combo · ${Math.ceil(s.t)}s`);
    },
    draw() {
      const { ctx, W, H } = k;
      ctx.fillStyle = "#120d22"; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(255,77,109,.08)"; ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      s.targets.forEach((t) => {
        const r = radius(t);
        [1, 0.66, 0.33].forEach((f, i) => {
          ctx.fillStyle = i % 2 ? "#efeaff" : t.c;
          ctx.beginPath(); ctx.arc(t.x, t.y, r * f, 0, 7); ctx.fill();
        });
        ctx.strokeStyle = "rgba(239,234,255,.4)"; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(t.x, t.y, r + 8, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * (1 - t.age / LIFE)); ctx.stroke();
      });
      s.pops.forEach((p) => {
        ctx.globalAlpha = 1 - p.age / 0.6;
        ctx.fillStyle = p.miss ? "#ff4d6d" : "#ffe14d";
        ctx.font = "700 26px 'Chakra Petch', sans-serif"; ctx.textAlign = "center";
        ctx.fillText(p.text, p.x, p.y - p.age * 60);
        ctx.globalAlpha = 1;
      });
      // Timer bar
      ctx.fillStyle = "#ff4d6d"; ctx.fillRect(0, H - 6, W * (s.t / ROUND), 6);
    }
  });

  const radius = (t) => 46 * (1 - (t.age / LIFE) * 0.65);

  k.canvas.addEventListener("pointerdown", (e) => {
    if (!k.running) return;
    const p = k.point(e);
    s.shots++;
    const hit = s.targets.find((t) => Math.hypot(t.x - p.x, t.y - p.y) <= radius(t));
    if (hit) {
      const bull = Math.hypot(hit.x - p.x, hit.y - p.y) <= radius(hit) * 0.33;
      const pts = Math.round((bull ? 150 : 100) * (1 - hit.age / LIFE * 0.5)) * s.combo;
      s.score += pts; s.hits++; s.combo = Math.min(8, s.combo + 1);
      s.targets = s.targets.filter((t) => t !== hit);
      s.pops.push({ x: p.x, y: p.y, age: 0, text: (bull ? "BULLSEYE +" : "+") + pts });
    } else {
      s.combo = 1;
      s.pops.push({ x: p.x, y: p.y, age: 0, text: "miss", miss: true });
    }
  });
  k.canvas.style.cursor = "crosshair";
  k.reset(); k.draw();
})();
