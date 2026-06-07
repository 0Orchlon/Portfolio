interface Project {
  title: string;
  desc: string;
  tags: string[];
  live: string;
  source: string;
  android?: string;
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
                <span key={t} className="text-[11px] px-1.5 py-0.5 bg-amber-500/10 text-amber-400/80 rounded">{t}</span>
              ))}
            </div>
            <div className="flex gap-3">
              {p.live !== '#' && (
                <a href={p.live} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-amber-400/80 hover:text-amber-300 transition-colors">Live Demo</a>
              )}
              <a href={p.source !== '#' ? p.source : `https://github.com/${github}/${p.title.toLowerCase().replace(/\s+/g, '-')}`}
                target="_blank" rel="noopener noreferrer"
                className="text-stone-500 hover:text-stone-300 transition-colors"
                title="Source">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
              {p.android && (
                <a href={p.android} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-green-400/80 hover:text-green-300 transition-colors flex items-center gap-1">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.523 16.435a1.79 1.79 0 1 1 0 3.58 1.79 1.79 0 0 1 0-3.58zm-11.046 0a1.79 1.79 0 1 1 0 3.58 1.79 1.79 0 0 1 0-3.58zM5.295 8.78l.453 7.7h12.504l.453-7.7H5.295zm5.212-6.689c.582-.07 1.168-.07 1.75 0l4.722-2.303a.546.546 0 0 1 .732.254.508.508 0 0 1-.263.714l-4.942 2.411a6.124 6.124 0 0 1 2.55 1.75 1.224 1.224 0 0 1-.639 2.062 1.267 1.267 0 0 1-1.35-.673 1.988 1.988 0 0 0-3.47 0 1.267 1.267 0 0 1-1.35.673 1.224 1.224 0 0 1-.639-2.062 6.124 6.124 0 0 1 2.55-1.75L5.322.756a.508.508 0 0 1-.263-.714.546.546 0 0 1 .732-.254l4.716 2.303z"/>
                  </svg>
                  APK
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
