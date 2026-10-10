import { useEffect, useRef } from 'react';

/** Pink, violet and pale-pink — the hero star's three rings. */
const COLORS = ['#fd5cc3', '#a66bff', '#ffb8e8'] as const;

const SPAWN_DISTANCE_PX = 14;
const MAX_SPAWN_PER_MOVE = 3;
const MAX_STARS = 120;
const MIN_SIZE = 5;
const MAX_SIZE = 12;
const MIN_LIFE_MS = 650;
const MAX_LIFE_MS = 1000;
const GRAVITY = 0.025;
const STAR_POINTS = 5;
const INNER_RADIUS_RATIO = 0.45;

type Star = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  spin: number;
  color: string;
  born: number;
  life: number;
};

const random = (min: number, max: number) => min + Math.random() * (max - min);

function drawStar(ctx: CanvasRenderingContext2D, star: Star, progress: number) {
  const radius = star.size * (1 - progress * 0.6);
  const inner = radius * INNER_RADIUS_RATIO;

  ctx.save();
  ctx.translate(star.x, star.y);
  ctx.rotate(star.rotation);
  ctx.globalAlpha = 1 - progress;
  ctx.fillStyle = star.color;
  ctx.shadowColor = star.color;
  ctx.shadowBlur = 12;

  ctx.beginPath();
  for (let i = 0; i < STAR_POINTS * 2; i++) {
    const r = i % 2 === 0 ? radius : inner;
    const angle = (i * Math.PI) / STAR_POINTS - Math.PI / 2;
    ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/**
 * A short trail of neon stars behind the cursor, echoing the hero star.
 * Mouse/trackpad only, skipped entirely under prefers-reduced-motion, and the
 * animation loop sleeps whenever no stars are alive.
 */
export default function StarTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Touch and pen are filtered per event (pointerType), so a touchscreen
    // laptop driven by a mouse still gets the trail.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let stars: Star[] = [];
    let frame = 0;
    let last: { x: number; y: number } | null = null;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const tick = (now: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      stars = stars.filter((star) => now - star.born < star.life);

      for (const star of stars) {
        star.vy += GRAVITY;
        star.x += star.vx;
        star.y += star.vy;
        star.rotation += star.spin;
        drawStar(ctx, star, (now - star.born) / star.life);
      }

      frame = stars.length > 0 ? requestAnimationFrame(tick) : 0;
    };

    const spawn = (x: number, y: number, now: number) => {
      stars.push({
        x: x + random(-4, 4),
        y: y + random(-4, 4),
        vx: random(-0.5, 0.5),
        vy: random(-0.8, 0.1),
        size: random(MIN_SIZE, MAX_SIZE),
        rotation: random(0, Math.PI * 2),
        spin: random(-0.08, 0.08),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        born: now,
        life: random(MIN_LIFE_MS, MAX_LIFE_MS),
      });
      if (stars.length > MAX_STARS) stars = stars.slice(-MAX_STARS);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const point = { x: event.clientX, y: event.clientY };
      if (!last) {
        last = point;
        return;
      }

      const distance = Math.hypot(point.x - last.x, point.y - last.y);
      const count = Math.min(Math.floor(distance / SPAWN_DISTANCE_PX), MAX_SPAWN_PER_MOVE);
      if (count === 0) return;

      const now = performance.now();
      for (let i = 1; i <= count; i++) {
        const t = i / count;
        spawn(last.x + (point.x - last.x) * t, last.y + (point.y - last.y) * t, now);
      }
      last = point;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      last = null;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 hidden h-screen w-screen md:block"
    />
  );
}
