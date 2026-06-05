import { useEffect, useRef } from 'react';

export default function MouseTracker() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const update = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const animate = () => {
      trailPos.current.x += (pos.current.x - trailPos.current.x) * 0.12;
      trailPos.current.y += (pos.current.y - trailPos.current.y) * 0.12;
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trailPos.current.x - 16}px, ${trailPos.current.y - 16}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    let raf = requestAnimationFrame(animate);
    window.addEventListener('mousemove', update, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', update);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-amber-400 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{ transition: 'transform 0.02s' }} />
      <div ref={trailRef}
        className="fixed top-0 left-0 w-8 h-8 border border-amber-400/40 rounded-full pointer-events-none z-[9998] hidden md:block"
        style={{ transition: 'transform 0.08s' }} />
    </>
  );
}
