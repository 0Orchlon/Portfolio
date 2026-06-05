import { useState, useCallback } from 'react';

const ROWS = 8;
const COLS = 8;
const MINES = 10;

type Cell = { mine: boolean; revealed: boolean; flagged: boolean; adjacent: number };

function initGrid(): Cell[][] {
  const g: Cell[][] = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ mine: false, revealed: false, flagged: false, adjacent: 0 }))
  );
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (!g[r][c].mine) { g[r][c].mine = true; placed++; }
  }
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (!g[r][c].mine)
        for (let dr = -1; dr <= 1; dr++)
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && g[nr][nc].mine) g[r][c].adjacent++;
          }
  return g;
}

export default function Minesweeper() {
  const [grid, setGrid] = useState<Cell[][]>(initGrid);
  const [over, setOver] = useState(false);
  const [won, setWon] = useState(false);

  const reveal = useCallback((r: number, c: number, g: Cell[][]): Cell[][] => {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS || g[r][c].revealed || g[r][c].flagged) return g;
    g[r][c].revealed = true;
    if (g[r][c].mine) { setOver(true); return g; }
    if (g[r][c].adjacent === 0)
      for (let dr = -1; dr <= 1; dr++)
        for (let dc = -1; dc <= 1; dc++)
          reveal(r + dr, c + dc, g);
    return g;
  }, []);

  const handleClick = (r: number, c: number) => {
    if (over || won) return;
    setGrid(prev => {
      const g = prev.map(row => row.map(cell => ({ ...cell })));
      reveal(r, c, g);
      const safe = g.flat().filter(x => !x.mine);
      if (safe.every(x => x.revealed)) setWon(true);
      return g;
    });
  };

  const toggleFlag = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (over || won || grid[r][c].revealed) return;
    setGrid(prev => prev.map((row, ri) => row.map((cell, ci) =>
      ri === r && ci === c ? { ...cell, flagged: !cell.flagged } : cell
    )));
  };

  const restart = () => { setGrid(initGrid()); setOver(false); setWon(false); };

  const cell = (v: Cell) => {
    if (v.flagged) return '⚑';
    if (!v.revealed) return '';
    if (v.mine) return '✕';
    return v.adjacent || '';
  };

  const cellColor = (v: Cell) => {
    if (!v.revealed || v.flagged) return 'bg-stone-700 hover:bg-stone-600';
    if (v.mine) return 'bg-red-900';
    return 'bg-stone-800';
  };

  const numColor = (n: number) => ['', 'text-blue-400', 'text-green-400', 'text-red-400', 'text-purple-400', 'text-amber-400', 'text-cyan-400', 'text-stone-400', 'text-stone-500'][n] || 'text-stone-400';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-4 text-sm text-stone-400">
        <span>{won ? 'You won!' : over ? 'Game over' : `${MINES} mines`}</span>
        <button onClick={restart} className="text-amber-400 hover:text-amber-300">Restart</button>
      </div>
      <div className="grid grid-cols-8 gap-0.5">
        {grid.flat().map((v, i) => {
          const r = Math.floor(i / COLS), c = i % COLS;
          return (
            <button key={i}
              onClick={() => handleClick(r, c)}
              onContextMenu={e => toggleFlag(e, r, c)}
              className={`w-7 h-7 text-xs flex items-center justify-center rounded ${cellColor(v)} ${numColor(v.adjacent)} transition-colors`}>
              {cell(v)}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-stone-500">Left-click to reveal, right-click to flag</p>
    </div>
  );
}
