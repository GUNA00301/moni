/**
 * Canvas Confetti with Glowing Hearts, Stars, and Dusk-Colored Ribbons.
 * High-performance, zero-external-dependencies, supports prefers-reduced-motion.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vRot: number;
  size: number;
  color: string;
  type: 'heart' | 'star' | 'ribbon' | 'circle';
  alpha: number;
  decay: number;
  wobble: number;
  wobbleSpeed: number;
}

class ConfettiManager {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private animId: number | null = null;
  private colors = [
    '#f472b6', // Pink
    '#ec4899', // Rose
    '#38bdf8', // Sky Blue
    '#60a5fa', // Blue
    '#c084fc', // Purple
    '#fde047', // Warm Gold
    '#ffffff', // Sparkle White
    '#fbcfe8'  // Soft Rose
  ];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initCanvas();
      window.addEventListener('resize', this.handleResize.bind(this));
    }
  }

  private initCanvas() {
    if (this.canvas) return;
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'birthday-confetti-canvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');
    this.handleResize();
  }

  private handleResize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth * window.devicePixelRatio;
    this.canvas.height = window.innerHeight * window.devicePixelRatio;
    if (this.ctx) {
      this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
  }

  private prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Blast confetti from a coordinate or centered
   */
  public blast(options?: {
    x?: number;
    y?: number;
    count?: number;
    spread?: number;
    velocity?: number;
  }) {
    if (!this.canvas) this.initCanvas();
    if (this.prefersReducedMotion()) {
      // Reduced motion: fewer particles and slower speed
      options = { ...options, count: Math.min(options?.count || 40, 15), velocity: 4 };
    }

    const originX = options?.x ?? window.innerWidth / 2;
    const originY = options?.y ?? window.innerHeight / 2;
    const count = options?.count ?? 90;
    const spread = options?.spread ?? Math.PI * 2;
    const baseVel = options?.velocity ?? 14;

    const types: Particle['type'][] = ['heart', 'heart', 'star', 'ribbon', 'circle'];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * spread - (spread === Math.PI * 2 ? 0 : Math.PI / 2 + spread / 2);
      const speed = (Math.random() * 0.7 + 0.3) * baseVel;
      const type = types[Math.floor(Math.random() * types.length)];
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];

      this.particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
        vy: Math.sin(angle) * speed - (Math.random() * 4 + 2),
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.15,
        size: type === 'heart' ? Math.random() * 8 + 10 : Math.random() * 7 + 8,
        color,
        type,
        alpha: 1,
        decay: Math.random() * 0.007 + 0.006,
        wobble: Math.random() * Math.PI,
        wobbleSpeed: Math.random() * 0.1 + 0.05
      });
    }

    if (!this.animId) {
      this.animate();
    }
  }

  /** Special double-cannon blast for opening gate or grand finale */
  public grandBlast() {
    this.blast({ x: window.innerWidth * 0.2, y: window.innerHeight * 0.7, count: 80, spread: Math.PI / 1.5 });
    setTimeout(() => {
      this.blast({ x: window.innerWidth * 0.8, y: window.innerHeight * 0.7, count: 80, spread: Math.PI / 1.5 });
    }, 150);
    setTimeout(() => {
      this.blast({ x: window.innerWidth * 0.5, y: window.innerHeight * 0.4, count: 120, spread: Math.PI * 2 });
    }, 350);
  }

  private drawHeart(ctx: CanvasRenderingContext2D, size: number) {
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    // top left curve
    ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
    // bottom left curve
    ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.2);
    // bottom right curve
    ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
    // top right curve
    ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
    ctx.closePath();
    ctx.fill();
  }

  private drawStar(ctx: CanvasRenderingContext2D, size: number) {
    ctx.beginPath();
    const spikes = 5;
    const outerRadius = size;
    const innerRadius = size * 0.45;
    let rot = (Math.PI / 2) * 3;
    let x = 0;
    let y = 0;
    const step = Math.PI / spikes;

    ctx.moveTo(0, -outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = Math.cos(rot) * outerRadius;
      y = Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = Math.cos(rot) * innerRadius;
      y = Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(0, -outerRadius);
    ctx.closePath();
    ctx.fill();
  }

  private animate() {
    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      // Physics
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22; // gravity
      p.vx *= 0.985;
      p.rot += p.vRot;
      p.wobble += p.wobbleSpeed;
      p.alpha -= p.decay;

      if (p.alpha <= 0 || p.y > window.innerHeight + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.fillStyle = p.color;
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rot);
      this.ctx.scale(Math.sin(p.wobble), 1);

      if (p.type === 'heart') {
        this.drawHeart(this.ctx, p.size);
      } else if (p.type === 'star') {
        this.drawStar(this.ctx, p.size * 0.7);
      } else if (p.type === 'ribbon') {
        this.ctx.fillRect(-p.size / 2, -p.size, p.size * 0.6, p.size * 1.6);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animId = requestAnimationFrame(this.animate.bind(this));
    } else {
      this.animId = null;
    }
  }
}

export const confetti = new ConfettiManager();
