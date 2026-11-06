import React, { useEffect, useRef } from 'react';

export interface Lantern {
  id: number;
  x: number;
  y: number;
  speed: number;
  sway: number;
  swaySpeed: number;
  size: number;
  color: 'pink' | 'blue' | 'gold';
  opacity: number;
}

export interface Balloon {
  id: number;
  x: number;
  y: number;
  speed: number;
  sway: number;
  swaySpeed: number;
  swayAmplitude: number;
  size: number;
  color: 'pink' | 'blue' | 'purple' | 'gold' | 'peach';
  opacity: number;
  rotation: number;
  isPopped?: boolean;
}

interface TwinklingStarsProps {
  lanterns: Lantern[];
  balloons: Balloon[];
  onPopBalloon?: (id: number, x: number, y: number) => void;
}

export const TwinklingStars: React.FC<TwinklingStarsProps> = ({ lanterns, balloons, onPopBalloon }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate stars
    const starCount = Math.floor((width * height) / 8000);
    const stars = Array.from({ length: Math.max(70, starCount) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      hue: Math.random() > 0.6 ? 330 : Math.random() > 0.3 ? 210 : 50 // pink, blue, gold hints
    }));

    // Shooting stars
    const shootingStars: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      alpha: number;
      active: boolean;
    }> = [];

    const triggerShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.4,
        length: Math.random() * 80 + 50,
        speed: Math.random() * 8 + 6,
        angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.2,
        alpha: 1,
        active: true
      });
    };

    const shootingStarInterval = setInterval(() => {
      if (Math.random() > 0.4) triggerShootingStar();
    }, 4500);

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Draw dusk sky background
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#090d20');   // Deep night indigo
      skyGrad.addColorStop(0.35, '#15193b'); // Midnight blue
      skyGrad.addColorStop(0.65, '#2c1945'); // Twilight dusk purple
      skyGrad.addColorStop(0.88, '#4c1e4f'); // Magenta sunset glow
      skyGrad.addColorStop(1, '#662250');    // Soft dusk pink horizon
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Soft nebula glow spots
      const nebula1 = ctx.createRadialGradient(width * 0.8, height * 0.25, 10, width * 0.8, height * 0.25, width * 0.45);
      nebula1.addColorStop(0, 'rgba(236, 72, 153, 0.12)');
      nebula1.addColorStop(1, 'rgba(236, 72, 153, 0)');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      const nebula2 = ctx.createRadialGradient(width * 0.2, height * 0.65, 10, width * 0.2, height * 0.65, width * 0.4);
      nebula2.addColorStop(0, 'rgba(56, 189, 248, 0.09)');
      nebula2.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, width, height);

      // Draw twinkling stars
      stars.forEach((s) => {
        s.alpha += Math.sin(time * 30 * s.twinkleSpeed) * 0.01;
        const clampedAlpha = Math.max(0.1, Math.min(0.95, s.alpha));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 80%, 90%, ${clampedAlpha})`;
        ctx.shadowBlur = s.radius > 1.2 ? 6 : 0;
        ctx.shadowColor = `hsla(${s.hue}, 100%, 75%, ${clampedAlpha})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        if (!ss.active) continue;

        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        grad.addColorStop(1, `rgba(254, 240, 138, ${ss.alpha})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.alpha -= 0.018;

        if (ss.alpha <= 0 || ss.x > width + 100 || ss.y > height + 100) {
          shootingStars.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(shootingStarInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Floating Sky Lanterns & 3D Animated Balloons Overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
        {/* Floating Sky Lanterns */}
        {lanterns.map((l) => (
          <div
            key={l.id}
            className="absolute transition-transform will-change-transform"
            style={{
              left: `${l.x}px`,
              top: `${l.y}px`,
              opacity: l.opacity,
              transform: `scale(${l.size}) translateX(${Math.sin(l.sway) * 18}px)`,
            }}
          >
            {/* Glowing Lantern SVG */}
            <div className="relative flex flex-col items-center">
              {/* Soft halo */}
              <div
                className={`absolute -inset-3 rounded-full blur-md opacity-70 ${
                  l.color === 'pink'
                    ? 'bg-pink-500/40'
                    : l.color === 'blue'
                    ? 'bg-sky-400/40'
                    : 'bg-amber-400/40'
                }`}
              />

              {/* Lantern Body */}
              <svg
                width="34"
                height="44"
                viewBox="0 0 34 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative drop-shadow-[0_4px_12px_rgba(244,114,182,0.4)]"
              >
                {/* Top cap */}
                <path d="M12 2H22V4H12V2Z" fill="#fde047" />
                {/* Paper body */}
                <path
                  d="M5 6C5 6 3 18 7 32C10 40 14 42 17 42C20 42 24 40 27 32C31 18 29 6 29 6H5Z"
                  fill={
                    l.color === 'pink'
                      ? 'url(#pinkLantern)'
                      : l.color === 'blue'
                      ? 'url(#blueLantern)'
                      : 'url(#goldLantern)'
                  }
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="0.8"
                />
                {/* Inner flame candle */}
                <ellipse cx="17" cy="33" rx="3.5" ry="5.5" fill="#fef08a" className="animate-pulse" />
                <circle cx="17" cy="33" r="1.8" fill="#f97316" />

                {/* Gradients */}
                <defs>
                  <linearGradient id="pinkLantern" x1="17" y1="6" x2="17" y2="42" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#f472b6" />
                    <stop offset="0.6" stopColor="#fb7185" />
                    <stop offset="1" stopColor="#fda4af" />
                  </linearGradient>
                  <linearGradient id="blueLantern" x1="17" y1="6" x2="17" y2="42" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#38bdf8" />
                    <stop offset="0.6" stopColor="#60a5fa" />
                    <stop offset="1" stopColor="#93c5fd" />
                  </linearGradient>
                  <linearGradient id="goldLantern" x1="17" y1="6" x2="17" y2="42" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fbbf24" />
                    <stop offset="0.6" stopColor="#f59e0b" />
                    <stop offset="1" stopColor="#fef08a" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        ))}

        {/* Floating 3D-CSS Animated Balloons */}
        {balloons.map((b) => (
          <div
            key={b.id}
            className={`absolute will-change-transform pointer-events-auto cursor-pointer ${
              b.isPopped ? 'animate-balloon-pop pointer-events-none' : ''
            }`}
            style={{
              left: `${b.x}px`,
              top: `${b.y}px`,
              opacity: b.opacity,
              transform: `scale(${b.size}) translateX(${Math.sin(b.sway) * b.swayAmplitude}px) rotate(${Math.sin(b.sway) * 6}deg)`,
            }}
            onClick={() => onPopBalloon && onPopBalloon(b.id, b.x + 25, b.y + 30)}
            role="button"
            tabIndex={0}
            aria-label="Tap to pop balloon"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onPopBalloon && onPopBalloon(b.id, b.x + 25, b.y + 30);
              }
            }}
          >
            <div className="relative flex flex-col items-center select-none group">
              {/* Soft atmospheric glow behind balloon */}
              <div
                className={`absolute -inset-2 rounded-full blur-md opacity-40 transition-opacity group-hover:opacity-75 ${
                  b.color === 'pink'
                    ? 'bg-pink-500/50'
                    : b.color === 'blue'
                    ? 'bg-sky-400/50'
                    : b.color === 'purple'
                    ? 'bg-purple-500/50'
                    : b.color === 'gold'
                    ? 'bg-yellow-400/50'
                    : 'bg-rose-400/50'
                }`}
              />

              {/* 3D Balloon Body */}
              <div className={`balloon-3d balloon-${b.color}`}>
                {/* Knot at bottom */}
                <div
                  className={`balloon-knot ${
                    b.color === 'pink'
                      ? 'bg-pink-800'
                      : b.color === 'blue'
                      ? 'bg-sky-800'
                      : b.color === 'purple'
                      ? 'bg-purple-900'
                      : b.color === 'gold'
                      ? 'bg-amber-700'
                      : 'bg-rose-800'
                  }`}
                />
              </div>

              {/* Dangling Sinuous Balloon String */}
              <div className="balloon-string-wrapper">
                <svg width="22" height="58" viewBox="0 0 22 58" fill="none" className="overflow-visible">
                  <path
                    d="M11 0 C7 14, 15 26, 11 40 C8 48, 14 54, 11 58"
                    stroke="rgba(255, 255, 255, 0.55)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
