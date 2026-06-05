import { useState } from 'react';
import Snake from '../games/Snake';
import Game2048 from '../games/Game2048';
import Minesweeper from '../games/Minesweeper';
import Pong from '../games/Pong';

const GAMES = [
  { id: 'snake', label: 'Snake' },
  { id: '2048', label: '2048' },
  { id: 'minesweeper', label: 'Minesweeper' },
  { id: 'pong', label: 'Pong' },
] as const;

type GameId = (typeof GAMES)[number]['id'];

export default function GamesSection() {
  const [game, setGame] = useState<GameId | null>(null);

  if (game) {
    const Comp = { snake: Snake, '2048': Game2048, minesweeper: Minesweeper, pong: Pong }[game];
    return (
      <div className="h-full overflow-y-auto animate-fadeIn flex flex-col">
        <div className="flex items-center gap-3 mb-3 flex-shrink-0">
          <button onClick={() => setGame(null)}
            className="text-xs text-amber-400/60 hover:text-amber-300 transition-colors">← Back</button>
          <h2 className="text-xl font-bold text-amber-100">{GAMES.find(g => g.id === game)?.label}</h2>
        </div>
        <div className="flex-1 flex items-center justify-center min-h-0 py-2">
          <Comp />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto animate-fadeIn">
      <h2 className="text-xl font-bold text-amber-100 mb-3">Games</h2>
      <div className="grid grid-cols-1 gap-2">
        {GAMES.map(g => (
          <button key={g.id} onClick={() => setGame(g.id)}
            className="w-full p-4 bg-stone-800/50 rounded-lg border border-stone-700/50 hover:border-amber-500/20 text-left transition-colors cursor-pointer">
            <span className="text-base text-amber-100 font-medium">{g.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
