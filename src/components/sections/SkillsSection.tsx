import { parseSkills } from './utils';

interface Props {
  skillsMd: string;
}

export default function SkillsSection({ skillsMd }: Props) {
  const groups = parseSkills(skillsMd);

  if (groups.length === 0) {
    return (
      <div className="h-full overflow-y-auto animate-fadeIn">
        <h2 className="text-xl font-bold text-amber-100 mb-4">Skills</h2>
        <p className="text-stone-500 text-sm">No skills data loaded.</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto animate-fadeIn">
      <h2 className="text-xl font-bold text-amber-100 mb-4">Skills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {groups.map(group => (
          <div key={group.title} className="p-3 bg-stone-800/50 rounded-lg border border-stone-700/50">
            <p className="text-amber-400/60 text-[10px] mb-2 uppercase tracking-wider">{group.title}</p>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map(s => (
                <span key={s} className="px-2 py-0.5 bg-stone-700/50 rounded text-[11px] text-stone-300 border border-stone-600/30 hover:border-amber-500/30 transition-colors cursor-default">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
