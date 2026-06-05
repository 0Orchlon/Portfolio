export default function HackerRankSection({ username }: { username: string }) {
  const cleanUser = username.replace(/^@/, '');

  if (!username) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-stone-500 text-sm gap-2 animate-fadeIn">
        <span className="opacity-50 text-lg">⌨</span>
        <span>HackerRank username not configured</span>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto animate-fadeIn">
      <h2 className="text-xl font-bold text-amber-100 mb-4">HackerRank</h2>
      <div className="p-4 bg-stone-800/50 rounded-lg border border-stone-700/50 text-center">
        <div className="text-3xl opacity-30 mb-3">⌨</div>
        <p className="text-sm text-amber-100 font-semibold mb-2">@{cleanUser}</p>
        <a
          href={`https://www.hackerrank.com/profile/${cleanUser}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-stone-700 border border-stone-600 text-stone-300 rounded-lg text-xs hover:bg-stone-600 transition-colors"
        >
          View Profile
        </a>
      </div>
    </div>
  );
}
