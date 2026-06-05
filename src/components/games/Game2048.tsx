import { useEffect, useState, useCallback } from 'react';

const COLORS: Record<number, string> = {
  2: '#efe8d6', 4: '#ede0c8', 8: '#f2b179', 16: '#f59563',
  32: '#f67c5f', 64: '#f65e3b', 128: '#edcf72', 256: '#edcc61',
  512: '#edc850', 1024: '#edc53f', 2048: '#edc22e',
};

function emptyGrid(): number[][] {
  return Array.from({ length: 4 }, () => Array(4).fill(0));
}

function addTile(grid: number[][]) {
  const cells: [number, number][] = [];
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++)
      if (!grid[r][c]) cells.push([r, c]);
  if (!cells.length) return;
  const [r, c] = cells[Math.floor(Math.random() * cells.length)];
  grid[r][c] = Math.random() < 0.9 ? 2 : 4;
}

function slide(row: number[]) {
  const f = row.filter(v => v);
  const missing = 4 - f.length;
  return [...Array(missing).fill(0), ...f];
}

function merge(row: number[]): [number[], number] {
  let score = 0;
  const r = slide(row);
  for (let i = 3; i > 0; i--) {
    if (r[i] && r[i] === r[i - 1]) {
      r[i] *= 2;
      score += r[i];
      r[i - 1] = 0;
    }
  }
  return [slide(r), score];
}

function transpose(g: number[][]) {
  return g[0].map((_, i) => g.map(r => r[i]));
}

export default function Game2048() {
  const [grid, setGrid] = useState<number[][]>(() => {
    const g = emptyGrid();
    addTile(g);
    addTile(g);
    return g;
  });
  const [score, setScore] = useState(0);

  const move = useCallback((dir: 'left' | 'right' | 'up' | 'down') => {
    setGrid(prev => {
      let g = prev.map(r => [...r]);
      let add = 0;
      if (dir === 'left') g = g.map(r => { const [n, s] = merge(r.reverse()); add += s; return n.reverse(); });
      if (dir === 'right') g = g.map(r => { const [n, s] = merge(r); add += s; return n; });
      if (dir === 'up') { g = transpose(g); g = g.map(r => { const [n, s] = merge(r.reverse()); add += s; return n.reverse(); }); g = transpose(g); }
      if (dir === 'down') { g = transpose(g); g = g.map(r => { const [n, s] = merge(r); add += s; return n; }); g = transpose(g); }
      setScore(s => s + add);
      const changed = prev.some((r, i) => r.some((v, j) => v !== g[i][j]));
      if (changed) addTile(g);
      return g;
    });
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const map: Record<string, 'left' | 'right' | 'up' | 'down'> = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down' };
      const d = map[e.key];
      if (d) { e.preventDefault(); move(d); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [move]);

  const restart = () => {
    const g = emptyGrid();
    addTile(g);
    addTile(g);
    setGrid(g);
    setScore(0);
  };

  const cellBg = (v: number) => COLORS[v] || '#3c2f1f';
  const textColor = (v: number) => (v <= 4 ? '#776e65' : '#f9f6f2');

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-4 text-sm text-stone-400">
        <span>Score: {score}</span>
        <button onClick={restart} className="text-amber-400 hover:text-amber-300">New</button>
      </div>
      <div className="grid grid-cols-4 gap-2 p-3 rounded bg-stone-800/80" style={{ width: 220 }}>
        {grid.flat().map((v, i) => (
          <div key={i}
            className="flex items-center justify-center rounded font-bold"
            style={{ backgroundColor: cellBg(v), color: textColor(v), aspectRatio: '1', fontSize: v > 999 ? 14 : v > 99 ? 16 : 20 }}>
            {v || ''}
          </div>
        ))}
      </div>
      <p className="text-xs text-stone-500">Arrow keys to slide</p>
    </div>
  );
}
