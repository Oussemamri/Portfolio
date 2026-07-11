import { useEffect, useRef } from 'react';

export function Sparkles({ className, color = '#8350e8', density = 80, speed = 0.6 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    let raf;
    let particles = [];

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particles = Array.from({ length: density }, () => makeParticle(canvas));
    };

    function makeParticle(canvas) {
      return {
        x:       Math.random() * canvas.width,
        y:       Math.random() * canvas.height,
        r:       Math.random() * 1.2 + 0.3,
        alpha:   Math.random(),
        delta:   (Math.random() * 0.012 + 0.004) * (Math.random() < 0.5 ? 1 : -1),
        vx:      (Math.random() - 0.5) * speed * 0.4,
        vy:      (Math.random() - 0.5) * speed * 0.4,
      };
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        if (!reduceMotion) {
          p.alpha += p.delta;
          if (p.alpha <= 0 || p.alpha >= 1) p.delta *= -1;
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      // Reduced motion: paint one static frame instead of looping forever.
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    }

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [color, density, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}
