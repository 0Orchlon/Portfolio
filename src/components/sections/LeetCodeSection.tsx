import { useState, useEffect } from 'react';

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
}

interface Day {
  date: string;
  count: number;
  level: number;
}

const LEVEL_COLORS: Record<number, string> = {
  0: 'bg-stone-800',
  1: 'bg-amber-900/60',
  2: 'bg-amber-700/70',
  3: 'bg-amber-600/80',
  4: 'bg-amber-400',
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getMonthLabels(days: Day[]) {
  const labels: { month: string; col: number }[] = [];
  let lastMonth = '';
  days.forEach((day, i) => {
    const m = day.date.slice(5, 7);
    if (m !== lastMonth) {
      labels.push({ month: MONTHS[parseInt(m) - 1], col: Math.floor(i / 7) });
      lastMonth = m;
    }
  });
  return labels;
}

function Heatmap({ days }: { days: Day[] }) {
  const weeks: Day[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  const labels = getMonthLabels(days);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-px mb-1">
        {weeks.map((_, wi) => {
          const label = labels.find(l => l.col === wi);
          return (
            <div key={wi} className="w-2 sm:w-3 text-[7px] sm:text-[8px] text-stone-600 leading-none">
              {label ? label.month : ''}
            </div>
          );
        })}
      </div>
      <div className="flex gap-px overflow-x-auto pb-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-px">
            {week.map((day, di) => (
              <div
                key={di}
                title={`${day.date}: ${day.count} submissions`}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-sm ${LEVEL_COLORS[day.level] ?? 'bg-stone-800'}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 mt-1 text-[10px] text-stone-500">
        <span>Less</span>
        {Object.values(LEVEL_COLORS).map((c, i) => (
          <div key={i} className={`w-2 h-2 sm:w-3 sm:h-3 rounded-sm ${c}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

interface CalendarData {
  submissionCalendar: string;
  streak: number;
  totalActiveDays: number;
}

function buildDays(calendarStr: string): Day[] {
  const cal: Record<string, number> = JSON.parse(calendarStr);
  const now = new Date();
  const days: Day[] = [];

  for (let i = 181; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const midnight = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
    const ts = Math.floor(midnight / 1000);
    const dateStr = new Date(midnight).toISOString().slice(0, 10);
    const count = cal[String(ts)] ?? 0;
    const level = count === 0 ? 0 : count <= 1 ? 1 : count <= 2 ? 2 : count <= 3 ? 3 : 4;
    days.push({ date: dateStr, count, level });
  }

  return days;
}

export default function LeetCodeSection({ username }: { username: string }) {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [calendar, setCalendar] = useState<CalendarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!username) {
      setLoading(false);
      setError('not_configured');
      return;
    }

    const controller = new AbortController();

    Promise.all([
      fetch(`https://alfa-leetcode-api.onrender.com/${username}`, { signal: controller.signal }),
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`, { signal: controller.signal }),
      fetch(`https://alfa-leetcode-api.onrender.com/${username}/calendar`, { signal: controller.signal }),
    ])
      .then(async ([profileRes, solvedRes, calRes]) => {
        const profile = profileRes.ok ? await profileRes.json() : {};
        if (!solvedRes.ok) throw new Error(`stats HTTP ${solvedRes.status}`);
        const s = await solvedRes.json();
        setStats({
          totalSolved: s.solvedProblem ?? s.totalSolved ?? 0,
          easySolved: s.easySolved ?? 0,
          mediumSolved: s.mediumSolved ?? 0,
          hardSolved: s.hardSolved ?? 0,
          ranking: profile.ranking ?? 0,
        });

        if (calRes.ok) {
          const c = await calRes.json();
          if (c.submissionCalendar) {
            setCalendar({
              submissionCalendar: c.submissionCalendar,
              streak: c.streak ?? 0,
              totalActiveDays: c.totalActiveDays ?? 0,
            });
          }
        }

        setLoading(false);
      })
      .catch((err: any) => {
        if (err.name === 'AbortError') return;
        setLoading(false);
        setError('fetch_failed');
      });

    return () => controller.abort();
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32 text-stone-600 text-sm">
        Loading LeetCode stats...
      </div>
    );
  }

  if (error || !stats) {
    const msg = error === 'not_configured'
      ? 'LeetCode username not configured'
      : 'Could not load LeetCode stats';
    return (
      <div className="flex flex-col items-center justify-center h-32 text-stone-500 text-sm gap-2">
        <span className="opacity-50 text-lg">⚡</span>
        <span>{msg}</span>
      </div>
    );
  }

  const difficulties = [
    { label: 'Easy', count: stats.easySolved, color: 'bg-emerald-500', text: 'text-emerald-400' },
    { label: 'Medium', count: stats.mediumSolved, color: 'bg-amber-500', text: 'text-amber-400' },
    { label: 'Hard', count: stats.hardSolved, color: 'bg-red-500', text: 'text-red-400' },
  ];

  const days = calendar ? buildDays(calendar.submissionCalendar) : [];

  return (
    <div className="h-full overflow-y-auto animate-fadeIn">
      <h2 className="text-xl font-bold text-amber-100 mb-4">LeetCode</h2>
      <div className="p-4 bg-stone-800/50 rounded-lg border border-stone-700/50 mb-3">
        <div className="flex items-center justify-between mb-3">
          <a
            href={`https://leetcode.com/u/${username}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-stone-400 hover:text-amber-400 transition-colors"
          >
            @{username} · Rank #{stats.ranking.toLocaleString()}
          </a>
          <span className="text-xs text-stone-500">{stats.totalSolved} solved</span>
        </div>

        <div className="space-y-2">
          {difficulties.map(d => (
            <div key={d.label} className="flex items-center gap-3">
              <span className={`text-xs w-14 ${d.text}`}>{d.label}</span>
              <div className="flex-1 h-2 bg-stone-700/50 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${d.color} transition-all duration-500`}
                  style={{ width: `${stats.totalSolved > 0 ? (d.count / stats.totalSolved) * 100 : 0}%` }}
                />
              </div>
              <span className="text-xs text-stone-400 w-8 text-right">{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      {calendar && days.length > 0 && (
        <div className="p-4 bg-stone-800/50 rounded-lg border border-stone-700/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-stone-400">
              {calendar.streak} day streak · {calendar.totalActiveDays} active days
            </span>
          </div>
          <Heatmap days={days} />
        </div>
      )}
    </div>
  );
}
