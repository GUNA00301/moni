/**
 * Generates and downloads a complete, self-contained single-file HTML version
 * (all HTML, CSS, SVG, Canvas, and JavaScript combined in ONE file with no external image dependencies).
 * Perfect for sending to Monisha over WhatsApp, AirDrop, or email to open anywhere offline!
 */

export function downloadStandaloneHTML() {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>Happy 21st Birthday Monisha! ✨</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Fraunces:opsz,wght@9..144,400;700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      background: #090d20;
      color: #f1f5f9;
      min-height: 100vh;
      overflow-x: hidden;
      line-height: 1.6;
    }
    .font-heading { font-family: 'Fraunces', Georgia, serif; }
    .font-handwriting { font-family: 'Caveat', cursive; }
    
    /* Background Twilight Dusk Gradient */
    .dusk-bg {
      background: linear-gradient(180deg, #090d20 0%, #15193b 25%, #2c1945 50%, #4c1e4f 75%, #662250 100%);
      min-height: 100vh;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 1.5rem 1rem 6rem;
      position: relative;
      z-index: 2;
    }

    /* Giant 21 Glow */
    .glow-number {
      font-size: 8rem;
      line-height: 1;
      font-weight: 900;
      background: linear-gradient(180deg, #ffffff 0%, #fbcfe8 50%, #38bdf8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 0 25px rgba(244,114,182,0.6));
      text-align: center;
      margin: 0.5rem 0;
    }

    /* Gift Gate Overlay */
    #giftGate {
      position: fixed;
      inset: 0;
      background: radial-gradient(circle at center, #26173d 0%, #120e29 60%, #060814 100%);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      text-align: center;
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    #giftGate.hidden {
      opacity: 0;
      transform: scale(1.05);
      pointer-events: none;
    }

    .bounce-box {
      animation: bounce 2s infinite ease-in-out;
      cursor: pointer;
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }

    /* Glass Panels */
    .glass-card {
      background: rgba(30, 27, 75, 0.6);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(244, 114, 182, 0.2);
      border-radius: 1.25rem;
      padding: 1.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }

    /* 3D Flip Card */
    .flip-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
      margin-top: 1rem;
    }
    @media (min-width: 600px) {
      .flip-grid { grid-template-columns: 1fr 1fr; }
    }
    .flip-card {
      perspective: 1000px;
      height: 240px;
      cursor: pointer;
    }
    .flip-card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      transform-style: preserve-3d;
    }
    .flip-card.flipped .flip-card-inner {
      transform: rotateY(180deg);
    }
    .flip-front, .flip-back {
      position: absolute;
      inset: 0;
      border-radius: 1rem;
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }
    .flip-front {
      background: linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(56, 189, 248, 0.15));
      border: 1px solid rgba(244, 114, 182, 0.3);
    }
    .flip-back {
      background: linear-gradient(135deg, #1c183b, #3a1843);
      border: 1px solid rgba(244, 114, 182, 0.5);
      transform: rotateY(180deg);
      overflow-y: auto;
    }

    /* Polaroid */
    .polaroid {
      background: #fdfbf7;
      color: #1e293b;
      padding: 1rem 1rem 1.75rem;
      border-radius: 0.5rem;
      box-shadow: 0 15px 35px rgba(0,0,0,0.5);
      max-width: 290px;
      margin: 1.5rem auto;
      transform: rotate(-2deg);
      cursor: pointer;
    }
    .polaroid-img {
      width: 100%;
      aspect-ratio: 1;
      background: #1b1c2e;
      border-radius: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
    }

    /* Candle Flame Animation */
    @keyframes flameFlicker {
      0%, 100% { transform: scale(1) skewX(0); }
      50% { transform: scale(1.1, 0.9) skewX(2deg); }
    }
    .flame {
      transform-origin: bottom center;
      animation: flameFlicker 0.4s infinite alternate;
    }
    .flame.out { display: none; }

    /* Button styles */
    .btn-magic {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border-radius: 9999px;
      background: linear-gradient(90deg, #ec4899, #8b5cf6);
      color: #fff;
      font-weight: 600;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(236, 72, 153, 0.4);
      transition: transform 0.2s;
    }
    .btn-magic:active { transform: scale(0.96); }

    /* 3D-CSS Balloons */
    .balloon-3d {
      width: 46px;
      height: 56px;
      border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
      position: relative;
      box-shadow: inset -5px -5px 12px rgba(0, 0, 0, 0.4), inset 5px 5px 12px rgba(255, 255, 255, 0.4), 0 10px 20px rgba(0, 0, 0, 0.4);
      transform-origin: bottom center;
      cursor: pointer;
    }
    .balloon-3d::before {
      content: '';
      position: absolute;
      top: 7px;
      left: 9px;
      width: 12px;
      height: 16px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.2) 60%, transparent 100%);
      transform: rotate(-30deg);
    }
    .balloon-knot {
      position: absolute;
      bottom: -4px;
      left: 50%;
      transform: translateX(-50%);
      width: 8px;
      height: 6px;
      clip-path: polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%);
      background: rgba(0,0,0,0.3);
    }
    .balloon-string {
      position: absolute;
      top: 52px;
      left: 50%;
      width: 1px;
      height: 50px;
      background: rgba(255,255,255,0.4);
      transform-origin: top center;
    }
    .balloon-pink { background: radial-gradient(circle at 40% 35%, #f472b6, #db2777 60%, #831843); }
    .balloon-blue { background: radial-gradient(circle at 40% 35%, #38bdf8, #0284c7 60%, #075985); }
    .balloon-gold { background: radial-gradient(circle at 40% 35%, #fef08a, #eab308 60%, #854d0e); }
    .balloon-purple { background: radial-gradient(circle at 40% 35%, #c084fc, #9333ea 60%, #581c87); }

    /* Canvas */
    #confettiCanvas {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9999;
    }
  </style>
</head>
<body class="dusk-bg">
  <canvas id="confettiCanvas"></canvas>

  <!-- 1. Gift Gate -->
  <div id="giftGate">
    <div style="font-size: 1.5rem; color: #f472b6;" class="font-handwriting">Surprise for Monisha ✨</div>
    <h1 class="font-heading" style="font-size: 2.2rem; margin: 0.5rem 0;">A Special Surprise!</h1>
    <p style="color: #cbd5e1; font-size: 0.95rem; margin-bottom: 1.5rem;">Unoda 21st birthday-ku oru chinna magical gift...</p>

    <div class="bounce-box" onclick="openGift(event)" style="font-size: 5.5rem;">
      🎁
    </div>

    <button class="btn-magic" onclick="openGift(event)" style="margin-top: 1.5rem;">
      Tap to Open 🎁✨
    </button>
    <div class="font-handwriting" style="color: #fbcfe8; margin-top: 0.5rem; font-size: 1.2rem;">
      (Don't forget to smile when it opens!)
    </div>
  </div>

  <!-- Main Website Content -->
  <main class="container">
    <!-- 2. Hero Section -->
    <header style="text-align: center; margin-bottom: 2.5rem;">
      <div style="display: inline-block; padding: 0.25rem 1rem; border-radius: 9999px; background: rgba(244,114,182,0.15); border: 1px solid rgba(244,114,182,0.3); color: #f472b6; font-size: 0.85rem; margin-bottom: 0.75rem;">
        06 · 11 · 2005 · Celebrating 21 Magical Years
      </div>
      <div class="glow-number font-heading">21</div>
      <div class="font-handwriting" style="font-size: 1.8rem; color: #f472b6;">Happy Birthday, My Friend!</div>
      <h2 class="font-heading" style="font-size: 2.8rem; color: #ffffff; letter-spacing: -0.02em;">Monisha</h2>
      <p style="color: #cbd5e1; font-size: 0.95rem; max-width: 440px; margin: 0.75rem auto;">
        21 years of pure chaotic energy, non-stop laughter, and the most golden heart.
      </p>
    </header>

    <!-- 3. Make a Wish (SVG Cake) -->
    <section class="glass-card" style="text-align: center;">
      <div class="font-handwriting" style="color: #38bdf8; font-size: 1.6rem;">Make a Silent Wish First...</div>
      <h3 class="font-heading" style="font-size: 1.8rem; margin: 0.25rem 0 0.5rem;">21st Birthday Cake 🎂</h3>
      <p style="font-size: 0.85rem; color: #cbd5e1; margin-bottom: 1rem;">
        Kannai moodi unoda wish-ah nenachukittu blow pannu!
      </p>

      <div style="display: flex; justify-content: center; margin: 1rem 0;">
        <svg width="220" height="220" viewBox="0 0 200 200" onclick="blowCandles()" style="cursor: pointer;">
          <!-- Stand -->
          <ellipse cx="100" cy="180" rx="85" ry="12" fill="#ca8a04"/>
          <!-- Base tier -->
          <path d="M30 130 C30 115 50 110 100 110 C150 110 170 115 170 130 L170 165 C170 175 150 180 100 180 C50 180 30 175 30 165 Z" fill="#ec4899"/>
          <ellipse cx="100" cy="130" rx="70" ry="12" fill="#fdf2f8"/>
          <!-- Top tier -->
          <path d="M55 75 C55 65 70 60 100 60 C130 60 145 65 145 75 L145 105 C145 115 130 120 100 120 C70 120 55 115 55 105 Z" fill="#38bdf8"/>
          <ellipse cx="100" cy="75" rx="45" ry="10" fill="#ffffff"/>
          <!-- Candle -->
          <rect x="97" y="50" width="6" height="22" rx="2" fill="#fef08a"/>
          <!-- Flame -->
          <g id="cakeFlame" class="flame">
            <ellipse cx="100" cy="42" rx="5" ry="8" fill="#fde047"/>
            <ellipse cx="100" cy="43" rx="2.5" ry="5" fill="#f97316"/>
          </g>
          <text x="100" y="145" text-anchor="middle" fill="#fff" font-size="14" font-weight="bold">21 ✨</text>
        </svg>
      </div>

      <button id="blowBtn" class="btn-magic" onclick="blowCandles()">
        Blow the Candles! 💨
      </button>

      <div id="wishMsg" style="display: none; margin-top: 1.25rem; padding: 1rem; border-radius: 1rem; background: rgba(244,114,182,0.15); border: 1px solid rgba(244,114,182,0.3);">
        <h4 class="font-heading" style="color: #fbcfe8; font-size: 1.2rem;">Wish Registered with the Universe! ✨</h4>
        <p style="font-size: 0.85rem; color: #f1f5f9; margin-top: 0.5rem;">
          Unoda wish kandippa niraverum Moni! May this 21st year give you all the peaceful sleep, unfiltered joy, and career milestones you deserve.
        </p>
      </div>
    </section>

    <!-- 4. Polaroid Section -->
    <section class="glass-card" style="text-align: center;">
      <div class="font-handwriting" style="color: #f472b6; font-size: 1.5rem;">Memory Lane</div>
      <h3 class="font-heading" style="font-size: 1.8rem; margin: 0.25rem 0 0.5rem;">Our Polaroid Keepsake 📸</h3>
      <p style="font-size: 0.85rem; color: #cbd5e1;">Tap below to upload a picture from your phone!</p>

      <input type="file" id="photoInput" accept="image/*" style="display: none;" onchange="previewPhoto(event)">

      <div class="polaroid" onclick="document.getElementById('photoInput').click()">
        <div class="polaroid-img" id="polaroidBox">
          <div style="font-size: 3rem;">✨👸✨</div>
        </div>
        <div class="font-handwriting" style="font-size: 1.4rem; color: #1e293b; margin-top: 0.75rem;">
          Monisha @ 21 · Pure Sunshine 💖
        </div>
        <div style="font-size: 0.7rem; color: #64748b;">06.11.2005 · Bestie Forever</div>
      </div>

      <button class="btn-magic" onclick="document.getElementById('photoInput').click()" style="margin-top: 0.5rem; font-size: 0.85rem; padding: 0.5rem 1.25rem;">
        Upload Photo 📷
      </button>
    </section>

    <!-- 5. Six Flip Cards -->
    <section style="margin-bottom: 2rem;">
      <div style="text-align: center; margin-bottom: 1.25rem;">
        <div class="font-handwriting" style="color: #f472b6; font-size: 1.5rem;">Tap Each Card to Flip ✨</div>
        <h3 class="font-heading" style="font-size: 1.8rem; color: #fff;">Reasons Why You're Irreplaceable</h3>
      </div>

      <div class="flip-grid">
        <!-- Card 1 -->
        <div class="flip-card" onclick="this.classList.toggle('flipped'); popSound();">
          <div class="flip-card-inner">
            <div class="flip-front">
              <div style="font-size: 2rem;">🤣</div>
              <div>
                <h4 class="font-heading" style="font-size: 1.2rem;">Unstoppable Laughs</h4>
                <div class="font-handwriting" style="color: #fbcfe8; font-size: 1.1rem;">Namma siricha stop-ey aagathu!</div>
              </div>
              <div style="font-size: 0.75rem; color: #94a3b8;">Tap to flip ↻</div>
            </div>
            <div class="flip-back">
              <h5 class="font-heading" style="color: #f472b6;">Stomach-Cramping Laughs</h5>
              <p style="font-size: 0.8rem; color: #e2e8f0;">Remember those serious places where someone said a lame word and both of us laughed until tears came out? Unkooda sirikira mathiri yaarkoodavum varaathu Moni!</p>
              <div class="font-handwriting" style="color: #fef08a; font-size: 1rem;">"Laughter with you is pure therapy."</div>
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="flip-card" onclick="this.classList.toggle('flipped'); popSound();">
          <div class="flip-card-inner">
            <div class="flip-front">
              <div style="font-size: 2rem;">🌙</div>
              <div>
                <h4 class="font-heading" style="font-size: 1.2rem;">Un Kooda Pesumbothu...</h4>
                <div class="font-handwriting" style="color: #38bdf8; font-size: 1.1rem;">Olarittey irunthaalum semma feeling 😁😜</div>
              </div>
              <div style="font-size: 0.75rem; color: #94a3b8;">Tap to flip ↻</div>
            </div>
            <div class="flip-back">
              <h5 class="font-heading" style="color: #38bdf8;">My No-Judgment Zone</h5>
              <p style="font-size: 0.8rem; color: #e2e8f0;">un kuda pesitu irunth okk antha feeling nalla  iruku , epayumae enna judge pana matta nanaikara , pesa start pana un vaai summa irukathu olaritae irupa yapyum , but athum nalla   thaan irukum 😁😜..  Namba elamae share panipom entha problem nalum serii ethuva irunthalum (apdi thaan nanaikara ) ,and enna yapyumae judge panama elamae share panra oru nalla  pullai  nee  😁</p>
              <div class="font-handwriting" style="color: #fef08a; font-size: 1rem;">"Enna eppayum judge pannaatha nalla pullai nee!"</div>
            </div>
          </div>
        </div>

        <!-- Card 5 -->
        <div class="flip-card" onclick="this.classList.toggle('flipped'); popSound();">
          <div class="flip-card-inner">
            <div class="flip-front">
              <div style="font-size: 2rem;">🛡️</div>
              <div>
                <h4 class="font-heading" style="font-size: 1.2rem;">Strongest Soul</h4>
                <div class="font-handwriting" style="color: #34d399; font-size: 1.1rem;">Grace, dignity & quiet strength</div>
              </div>
              <div style="font-size: 0.75rem; color: #94a3b8;">Tap to flip ↻</div>
            </div>
            <div class="flip-back">
              <h5 class="font-heading" style="color: #34d399;">Proud of You</h5>
              <p style="font-size: 0.8rem; color: #e2e8f0;">People see your laughter, but I know how bravely you've fought silent battles. You handle life with so much quiet dignity. Proud of the woman you are at 21!</p>
              <div class="font-handwriting" style="color: #fef08a; font-size: 1rem;">"A warrior queen."</div>
            </div>
          </div>
        </div>

        <!-- Card 6 -->
        <div class="flip-card" onclick="this.classList.toggle('flipped'); popSound();">
          <div class="flip-card-inner">
            <div class="flip-front">
              <div style="font-size: 2rem;">♾️</div>
              <div>
                <h4 class="font-heading" style="font-size: 1.2rem;">80 Vayasula Kooda</h4>
                <div class="font-handwriting" style="color: #c084fc; font-size: 1.1rem;">Till we have no teeth left!</div>
              </div>
              <div style="font-size: 0.75rem; color: #94a3b8;">Tap to flip ↻</div>
            </div>
            <div class="flip-back">
              <h5 class="font-heading" style="color: #c084fc;">A Lifetime Guarantee</h5>
              <p style="font-size: 0.8rem; color: #e2e8f0;">Boyfriends, jobs, or cities might change, but this friendship is locked forever. 80 years aanaalum naama rendu perum tea kudichukitte gossip pannanum!</p>
              <div class="font-handwriting" style="color: #fbcfe8; font-size: 1rem;">"Stuck with me forever, Moni!"</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Personal Letter -->
    <section class="glass-card" style="background: #fdfbf7; color: #1e293b; padding: 2rem 1.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(0,0,0,0.1); padding-bottom: 0.75rem; margin-bottom: 1rem;">
        <div style="font-weight: bold; font-size: 0.85rem; color: #be123c;">LETTER FROM YOUR FRIEND</div>
        <div style="font-size: 0.8rem; color: #64748b;">06.11.2005 · Turning 21</div>
      </div>
      <div class="font-handwriting" style="font-size: 1.8rem; color: #be123c; font-weight: bold;">
        Hey Monisha (My Friend),
      </div>
      <div style="font-size: 0.95rem; line-height: 1.7; margin-top: 0.75rem; color: #334155;">
        <p style="margin-bottom: 0.75rem;">
          Enaku therinchi un life la naraya kastam pattu iruka , and neraya vishiyam achive pannanum nanaipa but athulam silla reasons naala mudiyathu , anyway ithu un life unaku pudicha mari vazhthuko seriya yaar enna nanaipanga athulaam yapayumae yosikathaa seriya , just neeya iru ethukagavum unaa change panikanum nanaikatha and be happy always .
        </p>
      </div>
      <div style="text-align: right; margin-top: 1.5rem;">
        <div class="font-handwriting" style="font-size: 2rem; color: #be123c; font-weight: bold;">
          Your Friend ❤️
        </div>
        <div style="font-size: 0.75rem; color: #64748b;">Always wishing the best for you</div>
      </div>
    </section>

    <!-- 7. Final Grand Surprise Button -->
    <section style="text-align: center; margin: 3rem 0;">
      <button class="btn-magic" onclick="triggerGrandSurprise()" style="font-size: 1.1rem; padding: 1rem 2rem;">
        One More Surprise for You! 🎆✨
      </button>
      <div class="font-handwriting" style="color: #fbcfe8; font-size: 1.3rem; margin-top: 0.5rem;">
        (Tap for fireworks & glowing sky lanterns)
      </div>
    </section>
  </main>

  <script>
    // Procedural Sound Effects via Web Audio
    let audioCtx = null;
    function getAudio() {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      return audioCtx;
    }

    function popSound() {
      try {
        const ctx = getAudio();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.1);
        g.gain.setValueAtTime(0.2, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.1);
      } catch(e) {}
    }

    // Confetti Engine
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    function addConfetti(x, y, count) {
      const colors = ['#f472b6', '#38bdf8', '#fbbf24', '#c084fc', '#ffffff'];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 12 + 4;
        particles.push({
          x: x || window.innerWidth / 2,
          y: y || window.innerHeight / 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 3,
          size: Math.random() * 8 + 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          rot: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.2
        });
      }
    }

    function anim() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2;
        p.alpha -= 0.01;
        p.rot += p.vRot;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
        ctx.restore();
      }
      requestAnimationFrame(anim);
    }
    anim();

    // Gift gate open
    function openGift(e) {
      popSound();
      addConfetti(window.innerWidth / 2, window.innerHeight / 2, 100);
      document.getElementById('giftGate').classList.add('hidden');
    }

    // Candle blow
    function blowCandles() {
      popSound();
      const flame = document.getElementById('cakeFlame');
      if (flame) flame.classList.add('out');
      document.getElementById('wishMsg').style.display = 'block';
      document.getElementById('blowBtn').style.display = 'none';
      addConfetti(window.innerWidth / 2, window.innerHeight * 0.4, 60);
    }

    // Photo preview
    function previewPhoto(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('polaroidBox').innerHTML = '<img src="' + e.target.result + '" style="width: 100%; height: 100%; object-fit: cover;">';
        addConfetti(window.innerWidth / 2, window.innerHeight * 0.6, 40);
        popSound();
      };
      reader.readAsDataURL(file);
    }

    // Grand surprise fireworks
    function triggerGrandSurprise() {
      popSound();
      for (let i = 0; i < 4; i++) {
        setTimeout(() => {
          addConfetti(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.5, 70);
          popSound();
        }, i * 300);
      }
      const toast = document.createElement('div');
      toast.style.position = 'fixed';
      toast.style.bottom = '2rem';
      toast.style.left = '50%';
      toast.style.transform = 'translateX(-50%)';
      toast.style.background = 'linear-gradient(135deg, #ec4899, #8b5cf6)';
      toast.style.color = '#fff';
      toast.style.padding = '1rem 1.75rem';
      toast.style.borderRadius = '9999px';
      toast.style.fontWeight = 'bold';
      toast.style.zIndex = '10000';
      toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
      toast.innerText = 'Happy 21st Birthday, Monisha! 🎂✨ May all your wildest dreams come true!';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 4500);
    }
  </script>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Monisha_21st_Birthday_Surprise.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
