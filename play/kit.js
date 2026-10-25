// Tiny shared helper for PixelVault original games.
window.Kit = function (opts) {
  const canvas = document.getElementById("c");
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;
  const ov = document.getElementById("ov");
  const scoreEl = document.getElementById("score");
  const bestEl = document.getElementById("best");
  const key = "pv-best-" + document.body.dataset.game;
  let best = Number(localStorage.getItem(key) || 0);
  let running = false, last = 0;

  const kit = {
    canvas, ctx, W, H,
    get running() { return running; },
    setScore(text) { scoreEl.textContent = text; },
    best() { return best; },
    showBest() { bestEl.textContent = "Best " + best; },
    // Convert a pointer event to canvas coordinates.
    point(e) {
      const r = canvas.getBoundingClientRect();
      return { x: (e.clientX - r.left) * (W / r.width), y: (e.clientY - r.top) * (H / r.height) };
    },
    start() {
      ov.hidden = true;
      opts.reset();
      running = true;
      last = performance.now();
      requestAnimationFrame(frame);
    },
    over(score, title, text) {
      running = false;
      const isBest = score > best;
      if (isBest) { best = score; localStorage.setItem(key, String(best)); }
      kit.showBest();
      document.getElementById("ov-title").textContent = isBest ? "New best!" : title || "Game over";
      document.getElementById("ov-text").textContent = (text || "Score: " + score) + (isBest ? "" : " · Best: " + best);
      document.getElementById("start").textContent = "Play again";
      ov.hidden = false;
      document.getElementById("start").focus();
    }
  };

  function frame(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    opts.update(dt);
    opts.draw();
    if (running) requestAnimationFrame(frame);
  }

  document.getElementById("start").addEventListener("click", kit.start);
  kit.showBest();
  return kit;
};
