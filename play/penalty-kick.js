(function () {
  const SHOTS = 5;
  // Goal mouth in canvas coordinates
  const G = { x: 230, y: 110, w: 500, h: 210 };
  const SPOT = { x: 480, y: 470 };
  let k, s;

  k = Kit({
    reset() {
      s = { shot: 0, goals: 0, phase: "aim", aim: null, power: 0, pdir: 1, anim: 0, ball: { ...SPOT }, keeper: { x: G.x + G.w / 2, y: G.y + G.h - 60 }, kTarget: null, target: null, msg: "", msgT: 0, results: [] };
    },
    update(dt) {
      if (s.phase === "charge") {
        s.power += s.pdir * dt * 1.3;
        if (s.power > 1) { s.power = 1; s.pdir = -1; }
        if (s.power < 0) { s.power = 0; s.pdir = 1; }
      }
      if (s.phase === "fly") {
        s.anim = Math.min(1, s.anim + dt / 0.55);
        const e = 1 - Math.pow(1 - s.anim, 2);
        s.ball.x = SPOT.x + (s.target.x - SPOT.x) * e;
        s.ball.y = SPOT.y + (s.target.y - SPOT.y) * e - Math.sin(e * Math.PI) * 40;
        s.keeper.x += (s.kTarget.x - s.keeper.x) * Math.min(1, dt * 6);
        s.keeper.y += (s.kTarget.y - s.keeper.y) * Math.min(1, dt * 6);
        if (s.anim >= 1) resolve();
      }
      if (s.phase === "result") {
        s.msgT -= dt;
        if (s.msgT <= 0) {
          if (s.shot >= SHOTS) return k.over(s.goals, s.goals >= 4 ? "Champion!" : "Full time", `You scored ${s.goals} of ${SHOTS}`);
          s.phase = "aim"; s.ball = { ...SPOT }; s.keeper = { x: G.x + G.w / 2, y: G.y + G.h - 60 }; s.aim = null;
        }
      }
      k.setScore(`Shot ${Math.min(s.shot + 1, SHOTS)}/${SHOTS} · Goals ${s.goals}`);
    },
    draw() {
      const { ctx, W, H } = k;
      ctx.fillStyle = "#0f2a1f"; ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < 8; i++) { ctx.fillStyle = i % 2 ? "#123426" : "#0f2a1f"; ctx.fillRect(0, 200 + i * 45, W, 45); }
      // Crowd
      ctx.fillStyle = "#161127"; ctx.fillRect(0, 0, W, 90);
      for (let i = 0; i < 120; i++) { ctx.fillStyle = ["#ff4d6d", "#ffe14d", "#4dd2ff", "#3ddc97"][i % 4]; ctx.globalAlpha = .5; ctx.beginPath(); ctx.arc((i * 37) % W, 20 + (i * 13) % 60, 6, 0, 7); ctx.fill(); }
      ctx.globalAlpha = 1;
      // Net & posts
      ctx.fillStyle = "rgba(239,234,255,.06)"; ctx.fillRect(G.x, G.y, G.w, G.h);
      ctx.strokeStyle = "rgba(239,234,255,.15)"; ctx.lineWidth = 1;
      for (let x = G.x; x <= G.x + G.w; x += 20) { ctx.beginPath(); ctx.moveTo(x, G.y); ctx.lineTo(x, G.y + G.h); ctx.stroke(); }
      for (let y = G.y; y <= G.y + G.h; y += 20) { ctx.beginPath(); ctx.moveTo(G.x, y); ctx.lineTo(G.x + G.w, y); ctx.stroke(); }
      ctx.strokeStyle = "#efeaff"; ctx.lineWidth = 10;
      ctx.beginPath(); ctx.moveTo(G.x, G.y + G.h); ctx.lineTo(G.x, G.y); ctx.lineTo(G.x + G.w, G.y); ctx.lineTo(G.x + G.w, G.y + G.h); ctx.stroke();
      ctx.strokeStyle = "rgba(239,234,255,.5)"; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(0, G.y + G.h); ctx.lineTo(W, G.y + G.h); ctx.stroke();
      // Keeper
      const kp = s.keeper;
      ctx.save(); ctx.translate(kp.x, kp.y);
      const lean = (kp.x - (G.x + G.w / 2)) / 300;
      ctx.rotate(lean);
      ctx.fillStyle = "#ffe14d"; ctx.beginPath(); ctx.roundRect(-22, -30, 44, 70, 10); ctx.fill();
      ctx.fillStyle = "#efeaff"; ctx.beginPath(); ctx.arc(0, -46, 16, 0, 7); ctx.fill();
      ctx.strokeStyle = "#ffe14d"; ctx.lineWidth = 10; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(-20, -20); ctx.lineTo(-62, -50); ctx.moveTo(20, -20); ctx.lineTo(62, -50); ctx.stroke();
      ctx.fillStyle = "#ff4d6d"; ctx.beginPath(); ctx.arc(-64, -52, 10, 0, 7); ctx.arc(64, -52, 10, 0, 7); ctx.fill();
      ctx.restore();
      // Aim marker
      if (s.aim && s.phase !== "fly") {
        ctx.strokeStyle = "#ff4d6d"; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(s.aim.x, s.aim.y, 16, 0, 7); ctx.moveTo(s.aim.x - 24, s.aim.y); ctx.lineTo(s.aim.x + 24, s.aim.y); ctx.moveTo(s.aim.x, s.aim.y - 24); ctx.lineTo(s.aim.x, s.aim.y + 24); ctx.stroke();
      }
      // Ball
      const scale = s.phase === "fly" || s.phase === "result" ? 1 - 0.45 * (s.anim || 0) : 1;
      ctx.fillStyle = "#efeaff"; ctx.beginPath(); ctx.arc(s.ball.x, s.ball.y, 18 * scale, 0, 7); ctx.fill();
      ctx.fillStyle = "#0d0a1a"; ctx.beginPath(); ctx.arc(s.ball.x, s.ball.y, 6 * scale, 0, 7); ctx.fill();
      // Power bar
      if (s.phase === "charge" || s.phase === "aim") {
        const bx = 40, by = 160, bh = 260;
        ctx.fillStyle = "#161127"; ctx.fillRect(bx, by, 26, bh);
        ctx.fillStyle = "rgba(61,220,151,.35)"; ctx.fillRect(bx, by + bh * (1 - 0.85), 26, bh * 0.35);
        ctx.fillStyle = s.power > 0.85 ? "#ff4d6d" : s.power >= 0.5 ? "#3ddc97" : "#ffe14d";
        ctx.fillRect(bx, by + bh * (1 - s.power), 26, bh * s.power);
        ctx.strokeStyle = "#efeaff"; ctx.lineWidth = 2; ctx.strokeRect(bx, by, 26, bh);
        ctx.fillStyle = "#a69cc9"; ctx.font = "600 14px 'Chakra Petch', sans-serif"; ctx.textAlign = "center"; ctx.fillText("POWER", bx + 13, by + bh + 22);
      }
      // Shot history
      for (let i = 0; i < SHOTS; i++) {
        const r = s.results[i];
        ctx.fillStyle = r === undefined ? "#34295a" : r ? "#3ddc97" : "#ff4d6d";
        ctx.beginPath(); ctx.arc(W - 160 + i * 28, H - 30, 10, 0, 7); ctx.fill();
      }
      if (s.phase === "result") {
        ctx.fillStyle = s.results[s.results.length - 1] ? "#3ddc97" : "#ff4d6d";
        ctx.font = "64px Bungee, Impact, sans-serif"; ctx.textAlign = "center";
        ctx.fillText(s.msg, W / 2, H / 2 + 40);
      }
    }
  });

  function resolve() {
    const t = s.target;
    let goal = t.x > G.x + 6 && t.x < G.x + G.w - 6 && t.y > G.y + 6 && t.y < G.y + G.h;
    let msg = goal ? "GOAL!" : t.y <= G.y + 6 ? "Over the bar" : "Wide!";
    if (goal) {
      // Weak shots give the keeper more time to reach the ball.
      const reach = 70 + (1 - s.power) * 90;
      if (Math.hypot(t.x - s.keeper.x, t.y - (s.keeper.y - 30)) < reach) { goal = false; msg = "SAVED!"; }
    }
    s.shot++; if (goal) s.goals++;
    s.results.push(goal); s.msg = msg; s.msgT = 1.3; s.phase = "result";
  }

  k.canvas.addEventListener("pointerdown", (e) => {
    if (!k.running || s.phase !== "aim") return;
    s.aim = k.point(e);
    s.power = 0; s.pdir = 1; s.phase = "charge";
  });
  addEventListener("pointerup", () => {
    if (!k.running || s.phase !== "charge") return;
    // Overpowered shots rise; underpowered shots drift low and are easier to save.
    const lift = s.power > 0.85 ? (s.power - 0.85) * 900 : 0;
    const wobble = (1 - Math.min(1, s.power / 0.5)) * 30;
    s.target = { x: s.aim.x + (Math.random() - 0.5) * wobble, y: s.aim.y - lift + (Math.random() - 0.5) * wobble };
    // Keeper guesses a side; guesses right about 40% of the time.
    const guessRight = Math.random() < 0.4;
    const gx = guessRight ? s.target.x : G.x + 60 + Math.random() * (G.w - 120);
    s.kTarget = { x: Math.max(G.x + 40, Math.min(G.x + G.w - 40, gx)), y: Math.max(G.y + 70, Math.min(G.y + G.h - 40, guessRight ? s.target.y + 30 : G.y + G.h - 60)) };
    s.anim = 0; s.phase = "fly";
  });
  k.reset(); k.draw();
})();
