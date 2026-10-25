(function () {
  const CATS = window.CATEGORIES;
  const GAMES = window.GAMES;
  const catById = Object.fromEntries(CATS.map((c) => [c.id, c]));
  const page = document.body.dataset.page || "home";
  const currentCat = catById[page];

  const esc = (s) => String(s).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  const glyph = (title) => title.replace(/[^A-Za-z0-9 ]/g, "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "?";
  const countIn = (id) => GAMES.filter((g) => g.category === id).length;
  const modeLabel = (g) => (g.mode === "online" ? "Online" : "Digital");
  const playHref = (g) => (g.local ? "/" + g.local : g.url);

  // ---------- Header & footer ----------
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="header-inner">
      <a class="logo" href="/"><span class="logo-mark">▶</span>Pixel<span class="alt">Vault</span></a>
      <nav class="nav" aria-label="Game categories">
        <a href="/games" class="${page === "all" ? "active" : ""}">All games</a>
        ${CATS.map((c) => `<a href="/${c.id}" style="--c:${c.color}" class="${page === c.id ? "active" : ""}">${c.name}</a>`).join("")}
      </nav>
    </div>`;
  document.body.prepend(header);

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="footer-inner">
      <span>© ${new Date().getFullYear()} PixelVault — external games belong to their creators and open on their official sites.</span>
      <nav>${CATS.map((c) => `<a href="/${c.id}">${c.name}</a>`).join("")}</nav>
    </div>`;
  document.body.append(footer);

  // ---------- Cards ----------
  function card(g, i) {
    const c = catById[g.category];
    return `
      <button class="game-card" style="--c:${c.color};animation-delay:${Math.min(i, 12) * 40}ms" data-id="${g.id}" aria-label="${esc(g.title)} — details">
        <div class="thumb">
          <span class="badge ${g.mode}"><span class="dot"></span>${modeLabel(g)}</span>
          ${g.local ? `<span class="badge here">Play here</span>` : ""}
          <span class="glyph">${esc(glyph(g.title))}</span>
          <span class="cat-icon">${c.icon}</span>
        </div>
        <div class="card-body">
          <span class="card-cat">${c.name}</span>
          <h3>${esc(g.title)}</h3>
          <p>${esc(g.desc)}</p>
          <div class="tags">${g.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        </div>
      </button>`;
  }

  function renderGrid(el, list) {
    el.innerHTML = list.length
      ? list.map(card).join("")
      : `<div class="empty"><b>No games found</b>Try a different search or clear the filters.</div>`;
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".game-card");
    if (btn) openModal(btn.dataset.id);
  });

  // ---------- Modal ----------
  const modal = document.createElement("dialog");
  modal.className = "modal";
  document.body.append(modal);
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });

  function openModal(id) {
    const g = GAMES.find((x) => x.id === id);
    if (!g) return;
    const c = catById[g.category];
    const external = !g.local;
    modal.style.setProperty("--c", c.color);
    modal.innerHTML = `
      <div class="modal-card" style="position:relative">
        <button class="close-x" aria-label="Close">✕</button>
        <div class="thumb">
          <span class="badge ${g.mode}"><span class="dot"></span>${modeLabel(g)}</span>
          <span class="glyph">${esc(glyph(g.title))}</span>
          <span class="cat-icon">${c.icon}</span>
        </div>
        <div class="modal-body">
          <a class="card-cat" href="/${c.id}" style="text-decoration:none">${c.icon} ${c.name}</a>
          <h2>${esc(g.title)}</h2>
          <p>${esc(g.desc)}</p>
          <div class="tags">${g.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
          <div class="info-grid">
            <div><small>Type</small><strong>${g.mode === "online" ? "Online game" : "Digital game"}</strong></div>
            <div><small>Controls</small><strong>${esc(g.controls)}</strong></div>
            <div><small>Plays</small><strong>${external ? "Official site" : "Right here"}</strong></div>
          </div>
          <div class="modal-actions">
            <a class="btn" href="${esc(playHref(g))}" ${external ? 'target="_blank" rel="noopener noreferrer"' : ""}>▶ Play ${external ? "now ↗" : "now"}</a>
            <a class="btn ghost" href="/${c.id}">More ${c.name}</a>
            ${external ? `<span class="note">Opens on the game's official website in a new tab.</span>` : ""}
          </div>
        </div>
      </div>`;
    modal.querySelector(".close-x").onclick = () => modal.close();
    modal.showModal();
  }

  // ---------- Page renderers ----------
  const root = document.getElementById("app");

  if (page === "home") {
    const picks = ["krunker", "subway-surfers", "madalin"].map((id) => GAMES.find((g) => g.id === id));
    root.innerHTML = `
      <section class="hero">
        <div>
          <span class="eyebrow">${GAMES.length} games · ${CATS.length} categories</span>
          <h1>Press start on <em>every</em> genre.</h1>
          <p>PixelVault is a hand-picked arcade of free digital and online games — sorted by category, labelled with how they play, and ready to launch in one click.</p>
          <div class="hero-actions">
            <a class="btn" href="/games">Browse all games</a>
            <a class="btn ghost" href="#originals">Play on-site originals</a>
          </div>
        </div>
        <div class="hero-stack" aria-hidden="true">
          ${picks.map((g) => `<a class="tile" href="/${g.category}" style="--c:${catById[g.category].color}"><span>${catById[g.category].icon}</span><b>${esc(catById[g.category].name)}</b></a>`).join("")}
        </div>
      </section>

      <section class="section">
        <div class="section-head"><h2>Categories</h2><a href="/games">View all →</a></div>
        <div class="cat-grid">
          ${CATS.map((c) => `
            <a class="cat-tile" href="/${c.id}" style="--c:${c.color}">
              <span class="icon">${c.icon}</span>
              <span class="count">${countIn(c.id)} games</span>
              <h3>${c.name}</h3>
              <p>${c.blurb}</p>
            </a>`).join("")}
        </div>
      </section>

      <section class="section" id="originals">
        <div class="section-head"><h2>PixelVault originals</h2><span style="color:var(--muted)">Play instantly, right on this site</span></div>
        <div class="game-grid" id="originals-grid"></div>
      </section>

      <section class="section">
        <div class="section-head"><h2>Popular online</h2><a href="/multiplayer">Multiplayer →</a></div>
        <div class="game-grid" id="online-grid"></div>
      </section>`;
    renderGrid(document.getElementById("originals-grid"), GAMES.filter((g) => g.local));
    renderGrid(document.getElementById("online-grid"), GAMES.filter((g) => g.mode === "online").slice(0, 8));
    return;
  }

  if (page === "all" || currentCat) {
    const base = currentCat ? GAMES.filter((g) => g.category === currentCat.id) : GAMES;
    if (currentCat) document.body.style.setProperty("--c", currentCat.color);
    root.innerHTML = `
      <section class="page-head">
        <div>
          <span class="eyebrow">${currentCat ? `Category · ${base.length} games` : `${GAMES.length} games`}</span>
          <h1>${currentCat ? currentCat.name : "All games"}</h1>
          <p>${currentCat ? currentCat.blurb : "Every game in the vault. Search by name or tag, and filter by category or how it plays."}</p>
        </div>
        <div class="big-icon" aria-hidden="true">${currentCat ? currentCat.icon : "🎮"}</div>
      </section>
      <div class="toolbar">
        <label class="search"><span aria-hidden="true">🔍</span><input type="search" id="q" placeholder="Search games or tags…" aria-label="Search games"></label>
        <div class="chips" id="mode-chips">
          <button class="chip" data-mode="all" aria-pressed="true">All</button>
          <button class="chip" data-mode="online" aria-pressed="false">Online</button>
          <button class="chip" data-mode="digital" aria-pressed="false">Digital</button>
          <button class="chip" data-mode="local" aria-pressed="false">Play here</button>
        </div>
      </div>
      ${currentCat ? "" : `<div class="chips" id="cat-chips" style="margin-bottom:22px">
        <button class="chip" data-cat="all" aria-pressed="true">Every category</button>
        ${CATS.map((c) => `<button class="chip" data-cat="${c.id}" aria-pressed="false">${c.icon} ${c.name}</button>`).join("")}
      </div>`}
      <div class="legend">
        <span><i class="dot" style="background:#3ddc97"></i>Online — internet / multiplayer games</span>
        <span><i class="dot" style="background:#4dd2ff"></i>Digital — single-player browser games</span>
        <span><i class="dot" style="background:var(--hot)"></i>Play here — runs on PixelVault</span>
      </div>
      <div class="game-grid" id="grid"></div>`;

    const state = { q: "", mode: "all", cat: new URLSearchParams(location.search).get("cat") || "all" };
    const grid = document.getElementById("grid");
    const update = () => {
      const q = state.q.trim().toLowerCase();
      const list = base.filter((g) =>
        (state.mode === "all" || (state.mode === "local" ? !!g.local : g.mode === state.mode)) &&
        (state.cat === "all" || g.category === state.cat) &&
        (!q || [g.title, g.desc, ...g.tags].join(" ").toLowerCase().includes(q))
      );
      renderGrid(grid, list);
    };
    const wireChips = (id, key) => {
      const wrap = document.getElementById(id);
      if (!wrap) return;
      wrap.querySelectorAll(".chip").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset[key] === state[key])));
      wrap.addEventListener("click", (e) => {
        const b = e.target.closest(".chip");
        if (!b) return;
        state[key] = b.dataset[key];
        wrap.querySelectorAll(".chip").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        update();
      });
    };
    wireChips("mode-chips", "mode");
    wireChips("cat-chips", "cat");
    document.getElementById("q").addEventListener("input", (e) => { state.q = e.target.value; update(); });
    update();
    return;
  }

  // Player page for on-site originals: fill in title, info and related games.
  if (page === "play") {
    const g = GAMES.find((x) => x.id === document.body.dataset.game);
    const c = catById[g.category];
    document.body.style.setProperty("--c", c.color);
    document.title = `${g.title} — PixelVault`;
    document.getElementById("play-title").innerHTML = `
      <div><a class="eyebrow" href="/${c.id}" style="text-decoration:none">${c.icon} ${c.name} · Original</a><h1>${esc(g.title)}</h1></div>
      <a class="btn ghost" href="/${c.id}">← Back to ${c.name}</a>`;
    document.getElementById("play-info").innerHTML = `
      <div class="panel"><h3>About</h3><p>${esc(g.desc)}</p></div>
      <div class="panel"><h3>Controls</h3><p>${esc(g.controls)}</p></div>`;
    const related = GAMES.filter((x) => x.category === g.category && x.id !== g.id);
    const rel = document.getElementById("related");
    rel.insertAdjacentHTML("beforebegin", `<div class="section-head" style="margin-top:48px"><h2>More ${c.name} games</h2><a href="/${c.id}">See all →</a></div>`);
    renderGrid(rel, related);
  }
})();
