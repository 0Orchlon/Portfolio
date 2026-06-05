import { useEffect, useRef, useState } from 'react';

const SIZE = 15;
const TILE = 18;
const W = SIZE * TILE;

type Dir = 'up' | 'down' | 'left' | 'right';

export default function Snake() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [over, setOver] = useState(false);
  const stateRef = useRef({ dir: 'right' as Dir, nextDir: 'right' as Dir, snake: [[7, 7]], food: [10, 10], alive: true });

  useEffect(() => {
    placeFood(stateRef.current);

    const handleKey = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' };
      const d = map[e.key];
      if (!d) return;
      e.preventDefault();
      const s = stateRef.current;
      const opposites = { up: 'down', down: 'up', left: 'right', right: 'left' };
      if (opposites[d] !== s.dir) s.nextDir = d;
    };
    window.addEventListener('keydown', handleKey);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = setInterval(() => {
      const s = stateRef.current;
      if (!s.alive) return;
      s.dir = s.nextDir;
      const head = s.snake[0].slice();
      if (s.dir === 'up') head[1]--;
      if (s.dir === 'down') head[1]++;
      if (s.dir === 'left') head[0]--;
      if (s.dir === 'right') head[0]++;

      if (head[0] < 0 || head[0] >= SIZE || head[1] < 0 || head[1] >= SIZE || s.snake.some(p => p[0] === head[0] && p[1] === head[1])) {
        s.alive = false;
        setOver(true);
        draw(ctx, s);
        return;
      }

      s.snake.unshift(head as [number, number]);
      if (head[0] === s.food[0] && head[1] === s.food[1]) {
        setScore(v => v + 1);
        placeFood(s);
      } else {
        s.snake.pop();
      }
      draw(ctx, s);
    }, 120);

    return () => {
      clearInterval(loop);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  const restart = () => {
    const s = stateRef.current;
    s.snake = [[7, 7]];
    s.dir = 'right';
    s.nextDir = 'right';
    s.alive = true;
    setOver(false);
    setScore(0);
    placeFood(s);
    const canvas = canvasRef.current;
    if (canvas) draw(canvas.getContext('2d')!, s);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-4 text-sm text-stone-400">
        <span>Score: {score}</span>
        {over && <button onClick={restart} className="text-amber-400 hover:text-amber-300">Restart</button>}
      </div>
      <canvas ref={canvasRef} width={W} height={W} className="rounded border border-stone-700" />
      <p className="text-xs text-stone-500">Arrow keys to move</p>
    </div>
  );
}

function placeFood(s: { snake: number[][]; food: number[] }) {
  let f: number[];
  do {
    f = [Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE)];
  } while (s.snake.some(p => p[0] === f[0] && p[1] === f[1]));
  s.food = f;
}

function draw(ctx: CanvasRenderingContext2D, s: { snake: number[][]; food: number[]; alive: boolean }) {
  ctx.clearRect(0, 0, W, W);
  ctx.fillStyle = '#1c1917';
  ctx.fillRect(0, 0, W, W);

  for (let x = 0; x < SIZE; x++) {
    for (let y = 0; y < SIZE; y++) {
      ctx.strokeStyle = '#292524';
      ctx.strokeRect(x * TILE, y * TILE, TILE, TILE);
    }
  }

  s.snake.forEach((p, i) => {
    ctx.fillStyle = i === 0 ? '#c9a84c' : '#a3873d';
    ctx.fillRect(p[0] * TILE + 1, p[1] * TILE + 1, TILE - 2, TILE - 2);
  });

  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.arc(s.food[0] * TILE + TILE / 2, s.food[1] * TILE + TILE / 2, 4, 0, Math.PI * 2);
  ctx.fill();
}
