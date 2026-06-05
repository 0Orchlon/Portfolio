import { useEffect, useRef } from 'react';

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789<>[]{}()+-*/=<>';

interface Drop {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  len: number;
  opacity: number;
}

interface Pulse {
  x: number;
  y: number;
  radius: number;
  alpha: number;
}

export default function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const pulsesRef = useRef<Pulse[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let drops: Drop[] = [];
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const cols = Math.floor(canvas.width / 20);
      drops = Array.from({ length: cols }, (_, i) => {
        const len = 6 + Math.floor(Math.random() * 16);
        return {
          x: i * 20,
          y: Math.random() * canvas.height,
          speed: 0.4 + Math.random() * 1.2,
          chars: Array.from({ length: len }, () => CHARS[Math.floor(Math.random() * CHARS.length)]),
          len,
          opacity: 0.08 + Math.random() * 0.15,
        };
      });
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });

    const handleClick = (e: MouseEvent) => {
      pulsesRef.current.push({ x: e.clientX, y: e.clientY, radius: 0, alpha: 0.6 });
    };
    window.addEventListener('click', handleClick);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const drop of drops) {
        const size = 13;
        ctx.font = `${size}px monospace`;

        for (let i = 0; i < drop.chars.length; i++) {
          const cy = drop.y - i * size;
          if (cy < -size || cy > canvas.height + size) continue;

          const dx = drop.x - mx;
          const dy = cy - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 120);
          const bright = influence > 0 ? 0.4 + influence * 0.6 : drop.opacity;

          const alpha = i === 0 ? bright * 2 : bright * (1 - i / drop.chars.length);
          ctx.fillStyle = `rgba(201, 168, 76, ${Math.min(alpha, 0.9)})`;
          ctx.fillText(drop.chars[i], drop.x, cy);
        }

        drop.y += drop.speed;
        if (drop.y - drop.len * size > canvas.height) {
          drop.y = 0;
          drop.chars = Array.from({ length: drop.len }, () => CHARS[Math.floor(Math.random() * CHARS.length)]);
        }

        if (Math.random() < 0.005) {
          const idx = Math.floor(Math.random() * drop.chars.length);
          drop.chars[idx] = CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      const pulses = pulsesRef.current;
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.radius += 3;
        p.alpha -= 0.012;
        if (p.alpha <= 0) {
          pulses.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(201, 168, 76, ${p.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(201, 168, 76, ${p.alpha * 0.4})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.25 }} />
  );
}
