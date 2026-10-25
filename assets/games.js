// Game catalog. To add a game, copy an entry and edit it.
// mode: "online" = needs internet / plays against real people, "digital" = single-player browser game.
// url: external official site (opens in a new tab). local: a game hosted on this site (in /play).
window.CATEGORIES = [
  { id: "sports",      name: "Sports",      color: "#3ddc97", icon: "⚽", blurb: "Hoops, footy, pool and penalty kicks — competitive games built around real sports." },
  { id: "adventure",   name: "Adventure",   color: "#ffb84d", icon: "🗺️", blurb: "Explore worlds, uncover secrets and build your way through story-driven quests." },
  { id: "shooting",    name: "Shooting",    color: "#ff4d6d", icon: "🎯", blurb: "First-person shooters, tank battles and aim trainers. Fast reflexes required." },
  { id: "parkour",     name: "Parkour",     color: "#4dd2ff", icon: "🧗", blurb: "Run, jump, swing and slide. Endless runners and precision platformers." },
  { id: "driving",     name: "Driving",     color: "#c77dff", icon: "🏎️", blurb: "Stunt cars, drifting, motorbikes and kart battles. Put your foot down." },
  { id: "puzzle",      name: "Puzzle",      color: "#ffe14d", icon: "🧩", blurb: "Brain teasers, word games and classic logic puzzles to sharpen your mind." },
  { id: "multiplayer", name: ".io & Multiplayer", color: "#ff7ac6", icon: "🌐", blurb: "Jump into live arenas with players from around the world." },
  { id: "arcade",      name: "Arcade",      color: "#7cff4d", icon: "🕹️", blurb: "Quick-hit retro classics. One more try, every time." }
];

window.GAMES = [
  // ---------- Originals (play on this site) ----------
  { id: "lane-racer", title: "Neon Lanes", category: "driving", mode: "digital", local: "play/lane-racer.html",
    tags: ["Original", "Single-player", "2D", "Keyboard / Touch"],
    desc: "Weave through traffic on a neon highway. Speed climbs every second — how far can you get before you crash?",
    controls: "← → or A / D to switch lanes. Tap left/right side on mobile." },
  { id: "rooftop-runner", title: "Rooftop Runner", category: "parkour", mode: "digital", local: "play/rooftop-runner.html",
    tags: ["Original", "Single-player", "2D", "Keyboard / Touch"],
    desc: "Free-run across a city skyline at night. Leap the gaps between rooftops and vault over vents to chase a high score.",
    controls: "Space, ↑ or tap to jump. Hold for a longer jump." },
  { id: "target-rush", title: "Target Rush", category: "shooting", mode: "digital", local: "play/target-rush.html",
    tags: ["Original", "Single-player", "Aim trainer", "Mouse / Touch"],
    desc: "A 30-second aim trainer. Targets shrink as they age — hit them fast for big combos and avoid missing.",
    controls: "Click or tap targets." },
  { id: "penalty-kick", title: "Penalty Kick", category: "sports", mode: "digital", local: "play/penalty-kick.html",
    tags: ["Original", "Single-player", "2D", "Mouse / Touch"],
    desc: "Five shots, one keeper. Pick your corner and time your power to beat the goalie in a sudden-death shootout.",
    controls: "Click the goal to aim, release when the power bar is right." },

  // ---------- Sports ----------
  { id: "basketball-stars", title: "Basketball Stars", category: "sports", mode: "online", url: "https://poki.com/en/g/basketball-stars",
    tags: ["1v1", "2-player", "3D"], desc: "Street basketball duels. Dribble, fake and dunk your way past opponents in quick 1v1 matches.", controls: "Keyboard" },
  { id: "football-legends", title: "Football Legends", category: "sports", mode: "online", url: "https://poki.com/en/g/football-legends",
    tags: ["Soccer", "2-player", "2D"], desc: "Big-headed soccer showdowns with superstar players, special kicks and couch co-op.", controls: "Keyboard" },
  { id: "8-ball", title: "8 Ball Billiards Classic", category: "sports", mode: "digital", url: "https://www.crazygames.com/game/8-ball-billiards-classic",
    tags: ["Pool", "Single-player", "2D"], desc: "Classic pool against the computer or a friend. Line up shots and sink the 8 ball last.", controls: "Mouse" },
  { id: "soccer-skills", title: "Soccer Skills World Cup", category: "sports", mode: "digital", url: "https://poki.com/en/g/soccer-skills-world-cup",
    tags: ["Soccer", "Tournament", "2D"], desc: "Pick a nation and play through a full world tournament with quick-fire matches.", controls: "Keyboard" },

  // ---------- Adventure ----------
  { id: "minecraft-classic", title: "Minecraft Classic", category: "adventure", mode: "online", url: "https://classic.minecraft.net/",
    tags: ["Sandbox", "Building", "3D"], desc: "The original 2009 creative mode in your browser. Build anything with 32 blocks, alone or with friends.", controls: "Keyboard + mouse" },
  { id: "a-dark-room", title: "A Dark Room", category: "adventure", mode: "digital", url: "https://adarkroom.doublespeakgames.com/",
    tags: ["Text adventure", "Story", "Single-player"], desc: "A minimalist text adventure that slowly unfolds into a sprawling survival story. Start by lighting a fire.", controls: "Mouse" },
  { id: "candy-box-2", title: "Candy Box 2", category: "adventure", mode: "digital", url: "https://candybox2.github.io/",
    tags: ["RPG", "ASCII art", "Single-player"], desc: "Collect candy, buy gear and explore a charming ASCII-art world full of quests and secrets.", controls: "Mouse + keyboard" },
  { id: "bloxd", title: "Bloxd.io", category: "adventure", mode: "online", url: "https://bloxd.io/",
    tags: ["Voxel", "Multiplayer", "3D"], desc: "Blocky multiplayer worlds with survival, parkour, bed wars and creative game modes.", controls: "Keyboard + mouse" },
  { id: "geoguessr", title: "GeoGuessr", category: "adventure", mode: "online", url: "https://www.geoguessr.com/",
    tags: ["Exploration", "Geography", "Street View"], desc: "Dropped somewhere on Earth — use clues from Street View to guess where you are.", controls: "Mouse" },

  // ---------- Shooting ----------
  { id: "krunker", title: "Krunker.io", category: "shooting", mode: "online", url: "https://krunker.io/",
    tags: ["FPS", "Multiplayer", "3D"], desc: "Fast-paced pixel-style first-person shooter with slide-hopping movement and many classes.", controls: "Keyboard + mouse" },
  { id: "shell-shockers", title: "Shell Shockers", category: "shooting", mode: "online", url: "https://shellshock.io/",
    tags: ["FPS", "Multiplayer", "3D"], desc: "Egg-themed multiplayer shooter. Crack the competition before they scramble you.", controls: "Keyboard + mouse" },
  { id: "diep", title: "Diep.io", category: "shooting", mode: "online", url: "https://diep.io/",
    tags: ["Tanks", "Top-down", "Multiplayer"], desc: "Command a tank, destroy shapes to level up and upgrade into dozens of tank classes.", controls: "Keyboard + mouse" },
  { id: "bullet-force", title: "Bullet Force", category: "shooting", mode: "online", url: "https://www.crazygames.com/game/bullet-force-multiplayer",
    tags: ["FPS", "Military", "3D"], desc: "Modern military shooter with loadouts, ranked matches and multiple maps.", controls: "Keyboard + mouse" },
  { id: "ev-io", title: "ev.io", category: "shooting", mode: "online", url: "https://ev.io/",
    tags: ["FPS", "Arena", "3D"], desc: "Sci-fi arena shooter inspired by Halo, with jump pads, sniper duels and team modes.", controls: "Keyboard + mouse" },

  // ---------- Parkour ----------
  { id: "subway-surfers", title: "Subway Surfers", category: "parkour", mode: "digital", url: "https://poki.com/en/g/subway-surfers",
    tags: ["Endless runner", "3D", "Single-player"], desc: "Dash along the subway tracks, dodge trains and grab coins while escaping the inspector.", controls: "Arrow keys" },
  { id: "temple-run-2", title: "Temple Run 2", category: "parkour", mode: "digital", url: "https://poki.com/en/g/temple-run-2",
    tags: ["Endless runner", "3D", "Single-player"], desc: "Grab the idol and run! Jump, slide and turn through cliffs, mines and jungle ruins.", controls: "Arrow keys" },
  { id: "stickman-hook", title: "Stickman Hook", category: "parkour", mode: "digital", url: "https://poki.com/en/g/stickman-hook",
    tags: ["Swinging", "Physics", "2D"], desc: "Swing like Spider-Man from hook to hook through hundreds of momentum-based levels.", controls: "Click / Space" },
  { id: "vex-4", title: "Vex 4", category: "parkour", mode: "digital", url: "https://poki.com/en/g/vex-4",
    tags: ["Platformer", "Precision", "2D"], desc: "Tough stickman platformer full of spikes, saws and wall-jumps. Precision is everything.", controls: "Arrow keys" },

  // ---------- Driving ----------
  { id: "madalin", title: "Madalin Stunt Cars 2", category: "driving", mode: "online", url: "https://www.crazygames.com/game/madalin-stunt-cars-2",
    tags: ["Stunts", "Open world", "3D"], desc: "Supercars, giant ramps and loop-the-loops in a free-roam stunt playground.", controls: "Keyboard" },
  { id: "drift-hunters", title: "Drift Hunters", category: "driving", mode: "digital", url: "https://www.crazygames.com/game/drift-hunters",
    tags: ["Drifting", "Tuning", "3D"], desc: "Earn points by drifting, then tune and upgrade a garage of iconic cars.", controls: "Keyboard" },
  { id: "moto-x3m", title: "Moto X3M", category: "driving", mode: "digital", url: "https://poki.com/en/g/moto-x3m",
    tags: ["Motorbike", "Stunts", "2D"], desc: "Flip and wheelie through obstacle-packed bike courses against the clock.", controls: "Arrow keys" },
  { id: "smash-karts", title: "Smash Karts", category: "driving", mode: "online", url: "https://smashkarts.io/",
    tags: ["Kart battle", "Multiplayer", "3D"], desc: "Multiplayer kart combat — grab weapons from mystery boxes and blast other drivers.", controls: "Keyboard" },

  // ---------- Puzzle ----------
  { id: "2048", title: "2048", category: "puzzle", mode: "digital", url: "https://play2048.co/",
    tags: ["Numbers", "Single-player", "Classic"], desc: "Slide tiles and merge matching numbers to reach the 2048 tile.", controls: "Arrow keys / swipe" },
  { id: "little-alchemy-2", title: "Little Alchemy 2", category: "puzzle", mode: "digital", url: "https://littlealchemy2.com/",
    tags: ["Crafting", "Discovery", "Relaxing"], desc: "Start with air, earth, fire and water — combine elements to discover hundreds of items.", controls: "Drag & drop" },
  { id: "wordle", title: "Wordle", category: "puzzle", mode: "online", url: "https://www.nytimes.com/games/wordle/index.html",
    tags: ["Word game", "Daily", "Single-player"], desc: "Guess the hidden five-letter word in six tries. A new puzzle every day.", controls: "Keyboard" },
  { id: "lichess", title: "Lichess Chess", category: "puzzle", mode: "online", url: "https://lichess.org/",
    tags: ["Chess", "Multiplayer", "Strategy"], desc: "Free, ad-free chess against players worldwide or the computer, plus daily puzzles.", controls: "Mouse" },

  // ---------- .io & Multiplayer ----------
  { id: "agar", title: "Agar.io", category: "multiplayer", mode: "online", url: "https://agar.io/",
    tags: [".io", "Massive multiplayer", "2D"], desc: "Eat smaller cells to grow, split to attack and avoid anything bigger than you.", controls: "Mouse" },
  { id: "slither", title: "Slither.io", category: "multiplayer", mode: "online", url: "https://slither.io/",
    tags: [".io", "Snake", "2D"], desc: "Grow the longest snake on the server. Cut others off to collect their glowing remains.", controls: "Mouse" },
  { id: "paper-io-2", title: "Paper.io 2", category: "multiplayer", mode: "online", url: "https://paper-io.com/",
    tags: [".io", "Territory", "2D"], desc: "Claim territory by drawing loops — but if someone crosses your tail, you're out.", controls: "Mouse / keyboard" },
  { id: "skribbl", title: "skribbl.io", category: "multiplayer", mode: "online", url: "https://skribbl.io/",
    tags: ["Drawing", "Party", "Guessing"], desc: "Draw-and-guess party game. Play with friends in private rooms or with strangers.", controls: "Mouse" },

  // ---------- Arcade ----------
  { id: "chrome-dino", title: "Chrome Dino", category: "arcade", mode: "digital", url: "https://chromedino.com/",
    tags: ["Runner", "Retro", "Single-player"], desc: "The famous offline dinosaur. Jump over cacti and duck under pterodactyls.", controls: "Space / ↑" },
  { id: "pacman", title: "PAC-MAN Doodle", category: "arcade", mode: "digital", url: "https://www.google.com/logos/2010/pacman10-i.html",
    tags: ["Maze", "Retro", "Classic"], desc: "Google's playable PAC-MAN anniversary doodle. Eat the dots, dodge the ghosts.", controls: "Arrow keys" },
  { id: "tetris", title: "Tetris", category: "arcade", mode: "digital", url: "https://tetris.com/play-tetris",
    tags: ["Blocks", "Classic", "Single-player"], desc: "The official browser version of the all-time classic falling-block puzzle.", controls: "Arrow keys" }
];
