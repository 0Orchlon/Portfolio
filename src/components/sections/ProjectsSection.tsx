interface Project {
  title: string;
  desc: string;
  tags: string[];
  live: string;
  source: string;
}

interface Props {
  projects: Project[];
  github: string;
}

export default function ProjectsSection({ projects, github }: Props) {
  return (
    <div className="h-full overflow-y-auto animate-fadeIn">
      <h2 className="text-xl font-bold text-amber-100 mb-4">Projects</h2>
      <div className="space-y-3">
        {projects.map(p => (
          <div key={p.title}
            className="p-4 bg-stone-800/50 rounded-lg border border-stone-700/50 hover:border-amber-500/20 transition-colors">
            <h3 className="font-semibold text-amber-100 text-sm mb-1">{p.title}</h3>
            <p className="text-stone-400 text-xs mb-3 leading-relaxed">{p.desc}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {p.tags.map(t => (
                <span key={t} className="text-[10px] px-1.5 py-0.5 bg-amber-500/10 text-amber-400/80 rounded">{t}</span>
              ))}
            </div>
            <div className="flex gap-3">
              {p.live !== '#' && (
                <a href={p.live} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-amber-400/80 hover:text-amber-300 transition-colors">Live Demo</a>
              )}
              <a href={p.source !== '#' ? p.source : `https://github.com/${github}/${p.title.toLowerCase().replace(/\s+/g, '-')}`}
                target="_blank" rel="noopener noreferrer"
                className="text-xs text-stone-500 hover:text-stone-300 transition-colors">Source</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
