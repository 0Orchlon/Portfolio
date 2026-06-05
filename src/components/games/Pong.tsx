import { useEffect, useRef, useState } from 'react';

const W = 300;
const H = 180;
const PAD_W = 6;
const PAD_H = 28;
const BALL_S = 5;

export default function Pong() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState([0, 0]);
  const [over, setOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const state = {
      px: 10, py: H / 2 - PAD_H / 2,
      bx: W / 2, by: H / 2, bdx: 1.8, bdy: (Math.random() - 0.5) * 1.5,
      ai: H / 2 - PAD_H / 2,
      scr: [0, 0],
      running: true,
    };

    const keys: Record<string, boolean> = {};

    const handleKey = (e: KeyboardEvent) => {
      keys[e.key] = e.type === 'keydown';
      if (['ArrowUp', 'ArrowDown'].includes(e.key)) e.preventDefault();
    };
    window.addEventListener('keydown', handleKey);
    window.addEventListener('keyup', handleKey);

    const loop = setInterval(() => {
      if (!state.running) return;

      if (keys['ArrowUp']) state.py = Math.max(0, state.py - 3);
      if (keys['ArrowDown']) state.py = Math.min(H - PAD_H, state.py + 3);

      const target = state.by - PAD_H / 2;
      state.ai += (target - state.ai) * 0.06;
      state.ai = Math.max(0, Math.min(H - PAD_H, state.ai));

      state.bx += state.bdx;
      state.by += state.bdy;

      if (state.by <= 0 || state.by >= H - BALL_S) state.bdy = -state.bdy;

      if (state.bx <= PAD_W + 2 &&
        state.by + BALL_S > state.py && state.by < state.py + PAD_H) {
        state.bdx = Math.abs(state.bdx);
        state.bdy += (state.by - (state.py + PAD_H / 2)) * 0.03;
      }

      if (state.bx >= W - PAD_W - 2 - BALL_S &&
        state.by + BALL_S > state.ai && state.by < state.ai + PAD_H) {
        state.bdx = -Math.abs(state.bdx);
        state.bdy += (state.by - (state.ai + PAD_H / 2)) * 0.03;
      }

      if (state.bx < -BALL_S) { state.scr[1]++; reset(state); }
      if (state.bx > W + BALL_S) { state.scr[0]++; reset(state); }

      if (state.scr[0] >= 5 || state.scr[1] >= 5) {
        state.running = false;
        setOver(true);
      }

      setScore([...state.scr]);
      draw(ctx, state);
    }, 16);

    return () => {
      clearInterval(loop);
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('keyup', handleKey);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-4 text-sm text-stone-400">
        <span>{score[0]} - {score[1]}</span>
        {over && (
          <button onClick={() => window.location.reload()} className="text-amber-400 hover:text-amber-300">Restart</button>
        )}
      </div>
      <canvas ref={canvasRef} width={W} height={H} className="rounded border border-stone-700" />
      <p className="text-xs text-stone-500">Arrow Up/Down to move</p>
    </div>
  );
}

function reset(s: any) {
  s.bx = W / 2;
  s.by = H / 2;
  s.bdx = (Math.random() > 0.5 ? 1 : -1) * 1.8;
  s.bdy = (Math.random() - 0.5) * 1.5;
}

function draw(ctx: CanvasRenderingContext2D, s: any) {
  ctx.fillStyle = '#1c1917';
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = '#c9a84c';
  ctx.fillRect(s.px, s.py, PAD_W, PAD_H);
  ctx.fillRect(W - s.px - PAD_W, s.ai, PAD_W, PAD_H);
  ctx.fillRect(s.bx, s.by, BALL_S, BALL_S);

  ctx.strokeStyle = '#292524';
  ctx.beginPath();
  ctx.setLineDash([4, 4]);
  ctx.moveTo(W / 2, 0);
  ctx.lineTo(W / 2, H);
  ctx.stroke();
  ctx.setLineDash([]);
}
