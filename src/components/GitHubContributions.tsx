import { useState, useEffect } from "react";

interface Day {
  date: string;
  count: number;
  level: number;
}

const LEVEL_COLORS: Record<number, string> = {
  0: "bg-stone-800",
  1: "bg-amber-900/60",
  2: "bg-amber-700/70",
  3: "bg-amber-600/80",
  4: "bg-amber-400",
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getMonthLabels(days: Day[]) {
  const labels: { month: string; col: number }[] = [];
  let lastMonth = "";
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
      <div className="flex gap-px mb-1" style={{ paddingLeft: "0px" }}>
        {weeks.map((_, wi) => {
          const label = labels.find((l) => l.col === wi);
          return (
            <div
              key={wi}
              className="w-2 sm:w-3 text-[8px] sm:text-[8px] text-stone-500 leading-none"
            >
              {label ? label.month : ""}
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
                title={`${day.date}: ${day.count} contributions`}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-sm ${LEVEL_COLORS[day.level] ?? "bg-stone-800"}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 mt-2 text-[10px] text-stone-500">
        <span>Less</span>
        {Object.values(LEVEL_COLORS).map((c, i) => (
          <div key={i} className={`w-2 h-2 sm:w-3 sm:h-3 rounded-sm ${c}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

function AccountGraph({ username }: { username: string }) {
  const [days, setDays] = useState<Day[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}`)
      .then((r) => r.json())
      .then((data) => {
        const contributions = data.contributions ?? [];
        setDays(contributions);
        setTotal(contributions.reduce((s: number, d: Day) => s + d.count, 0));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4 text-stone-600 text-sm">
        Loading...
      </div>
    );
  }

  if (days.length === 0) {
    return (
      <div className="flex items-center justify-center py-4 text-stone-500 text-sm">
        No data
      </div>
    );
  }

  const last26 = days.slice(-182);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-stone-400 hover:text-amber-400 transition-colors"
        >
          @{username} · {total.toLocaleString()} contributions
        </a>
      </div>
      <Heatmap days={last26} />
    </div>
  );
}

export default function GitHubContributions({ users }: { users: string[] }) {
  const [active, setActive] = useState(0);

  if (users.length === 0) {
    return (
      <div className="flex items-center justify-center py-4 text-stone-500 text-sm">
        No GitHub users configured
      </div>
    );
  }

  return (
    <div className="p-4 bg-stone-1000/30 rounded-lg border border-stone-800/30">
      <h3 className="text-sm font-semibold text-amber-100 mb-3">
        GitHub Activity
      </h3>

      {users.length > 1 && (
        <div className="flex gap-1 mb-3">
          {users.map((u, i) => (
            <button
              key={u}
              onClick={() => setActive(i)}
              className={`px-3 py-1 text-xs rounded transition-colors cursor-pointer ${
                i === active
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  : "bg-stone-800 text-stone-500 border border-stone-700/30 hover:text-stone-300"
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      )}

      <AccountGraph username={users[active]} />
    </div>
  );
}
