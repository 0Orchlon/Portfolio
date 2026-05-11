import { useState, useEffect, useRef } from 'react';

type Section = 'home' | 'about' | 'skills' | 'projects' | 'contact';

const NAV_ITEMS: { id: Section; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: '⬡' },
  { id: 'about', label: 'About', icon: '◆' },
  { id: 'skills', label: 'Skills', icon: '◇' },
  { id: 'projects', label: 'Projects', icon: '▣' },
  { id: 'contact', label: 'Contact', icon: '◎' },
];

// ---------- Home ----------
function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 p-8 animate-fadeIn">
      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-5xl font-bold shadow-lg shadow-amber-900/30">
        B
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-amber-100 mb-2">BleakRed</h1>
        <p className="text-amber-400/80 text-lg mb-4">Developer · Student · Creator</p>
        <p className="text-stone-400 max-w-sm leading-relaxed">
          Final-year developer crafting tools and experiences that feel alive.
          Currently based in Ulaanbaatar.
        </p>
      </div>
      <div className="flex gap-4 mt-2">
        <a href="https://github.com/bleakred" target="_blank" rel="noopener noreferrer"
          className="px-5 py-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-lg text-sm hover:bg-amber-500/20 transition-colors">
          GitHub
        </a>
        <a href="mailto:bleakred@example.com"
          className="px-5 py-2.5 bg-stone-700 border border-stone-600 text-stone-300 rounded-lg text-sm hover:bg-stone-600 transition-colors">
          Email
        </a>
      </div>
    </div>
  );
}

// ---------- About ----------
function About() {
  return (
    <div className="flex flex-col h-full p-8 overflow-y-auto animate-fadeIn">
      <h2 className="text-2xl font-bold text-amber-100 mb-6">About Me</h2>
      <div className="flex gap-6 mb-6">
        <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-amber-600 to-orange-700 flex-shrink-0 flex items-center justify-center text-3xl font-bold text-amber-100">
          B
        </div>
        <div>
          <p className="text-stone-400 leading-relaxed mb-4">
            Final-year university student with a passion for full-stack development. I've built
            collaborative web apps with real-time features, real-time drawing tools, and kanban
            systems — the kind of projects that become real tools people actually use.
          </p>
          <p className="text-stone-400 leading-relaxed mb-4">
            I enjoy the full cycle: from designing the data model to shipping the UI. My stack
            of choice is TypeScript with React/Next.js on the frontend and Node.js/Prisma on
            the backend. Comfortable with databases, REST APIs, and socket-based real-time
            features.
          </p>
          <p className="text-stone-400 leading-relaxed">
            When I'm not coding, I game. Simple as that.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {[
          { label: 'Location', value: 'Ulaanbaatar, Mongolia' },
          { label: 'Education', value: 'Final Year, CS' },
          { label: 'Languages', value: 'JS, TS, Python, SQL' },
          { label: 'Hobbies', value: 'Gaming, Automation, Side Projects' },
        ].map(item => (
          <div key={item.label} className="p-4 bg-stone-800/50 rounded-lg border border-stone-700/50">
            <p className="text-amber-400/60 text-xs mb-1 uppercase tracking-wider">{item.label}</p>
            <p className="text-stone-300 text-sm">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Skills ----------
function Skills() {
  const skillGroups = [
    {
      title: 'Frontend',
      items: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'Astro', 'Vite'],
    },
    {
      title: 'Backend',
      items: ['Node.js', 'Express', 'Prisma', 'Socket.io', 'REST APIs'],
    },
    {
      title: 'Tools & Ops',
      items: ['Git', 'Docker', 'PostgreSQL', 'Supabase', 'GitHub Actions', 'Figma'],
    },
    {
      title: 'Other',
      items: ['TypeScript', 'Python', 'Bash', 'Vitest', 'Playwright', 'Linux'],
    },
  ];

  return (
    <div className="flex flex-col h-full p-8 overflow-y-auto animate-fadeIn">
      <h2 className="text-2xl font-bold text-amber-100 mb-6">Skills</h2>
      <div className="grid grid-cols-2 gap-4">
        {skillGroups.map(group => (
          <div key={group.title} className="p-4 bg-stone-800/50 rounded-lg border border-stone-700/50">
            <p className="text-amber-400/60 text-xs mb-3 uppercase tracking-wider">{group.title}</p>
            <div className="flex flex-wrap gap-2">
              {group.items.map(skill => (
                <span key={skill}
                  className="px-3 py-1 bg-stone-700/50 rounded text-sm text-stone-300 border border-stone-600/30 hover:border-amber-500/30 transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Projects ----------
function Projects() {
  const projects = [
    {
      name: 'Notion Clone',
      desc: 'Collaborative workspace app with real-time canvas, pages, kanban, and chat. Features auth, file management, and live co-op drawing.',
      tags: ['Next.js', 'TypeScript', 'Socket.io', 'Prisma', 'PostgreSQL'],
      live: '#',
      source: '#',
    },
    {
      name: 'Portfolio',
      desc: 'This site. Built with Astro + Tailwind, deployed on GitHub Pages. Minimal JS, fast loading, responsive.',
      tags: ['Astro', 'Tailwind CSS', 'React'],
      live: '#',
      source: '#',
    },
  ];

  return (
    <div className="flex flex-col h-full p-8 overflow-y-auto animate-fadeIn">
      <h2 className="text-2xl font-bold text-amber-100 mb-6">Projects</h2>
      <div className="space-y-4">
        {projects.map(p => (
          <div key={p.name}
            className="p-5 bg-stone-800/50 rounded-lg border border-stone-700/50 hover:border-amber-500/20 transition-colors">
            <h3 className="font-semibold text-amber-100 mb-1">{p.name}</h3>
            <p className="text-stone-400 text-sm mb-4 leading-relaxed">{p.desc}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {p.tags.map(t => (
                <span key={t} className="text-xs px-2 py-0.5 bg-amber-500/10 text-amber-400/80 rounded">{t}</span>
              ))}
            </div>
            <div className="flex gap-4">
              <a href={p.live} className="text-sm text-amber-400/80 hover:text-amber-300 transition-colors">Live Demo</a>
              <a href={p.source} className="text-sm text-stone-500 hover:text-stone-300 transition-colors">Source</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Contact ----------
function Contact() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 p-8 animate-fadeIn">
      <div className="text-4xl opacity-30">◎</div>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-amber-100 mb-3">Get in Touch</h2>
        <p className="text-stone-400 max-w-xs leading-relaxed">
          Whether it's a project idea, a job opportunity, or just a chat — my inbox is always open.
        </p>
      </div>
      <div className="space-y-3 w-full max-w-xs">
        <a href="mailto:bleakred@example.com"
          className="block w-full text-center px-6 py-3 bg-amber-500 text-stone-900 font-semibold rounded-lg hover:bg-amber-400 transition-colors">
          Send an Email
        </a>
        <a href="https://github.com/bleakred" target="_blank" rel="noopener noreferrer"
          className="block w-full text-center px-6 py-3 bg-stone-700 border border-stone-600 text-stone-300 rounded-lg hover:bg-stone-600 transition-colors">
          GitHub
        </a>
        <a href="https://linkedin.com/in/bleakred" target="_blank" rel="noopener noreferrer"
          className="block w-full text-center px-6 py-3 bg-stone-700 border border-stone-600 text-stone-300 rounded-lg hover:bg-stone-600 transition-colors">
          LinkedIn
        </a>
      </div>
    </div>
  );
}

// ---------- Content panels ----------
const CONTENT: Record<Section, () => JSX.Element> = {
  home: Home,
  about: About,
  skills: Skills,
  projects: Projects,
  contact: Contact,
};

// ---------- Nav Button ----------
function NavButton({ id, label, icon, active, onClick }: {
  id: Section;
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        group flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg transition-all duration-300 cursor-pointer
        ${active
          ? 'text-amber-400 bg-amber-500/10 border border-amber-500/40 shadow-[0_0_15px_rgba(201,168,76,0.15)]'
          : 'text-stone-500 hover:text-amber-300/80 hover:bg-stone-800/50 border border-transparent'
        }
      `}
    >
      <span className="text-lg leading-none">{icon}</span>
      <span className="text-[10px] uppercase tracking-widest font-medium">{label}</span>
    </button>
  );
}

// ---------- Main Hub ----------
export default function Hub() {
  const [section, setSection] = useState<Section>('home');
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [prevSection, setPrevSection] = useState(section);
  const [fading, setFading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMouse({
        x: ((e.clientX - cx) / cx) * 4,  // -4 to 4 deg
        y: ((e.clientY - cy) / cy) * 3,   // -3 to 3 deg
      });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const handleNav = (id: Section) => {
    if (id === section) return;
    setFading(true);
    setTimeout(() => {
      setSection(id);
      setFading(false);
    }, 200);
  };

  const rotateX = -mouse.y * 0.5;
  const rotateY = mouse.x * 0.5;
  const shadowX = -mouse.x * 1.5;
  const shadowY = -mouse.y * 1.5;

  const ContentComponent = CONTENT[section];

  return (
    <div className="w-full h-screen bg-stone-950 flex items-center justify-center overflow-hidden">
      {/* Background grid / texture */}
      <div className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #c9a84c 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />

      <div
        ref={containerRef}
        className="relative w-full max-w-6xl h-[85vh] mx-4 flex items-stretch gap-4 transition-all duration-300"
        style={{
          transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          boxShadow: `${shadowX}px ${shadowY}px 60px rgba(0,0,0,0.6), ${shadowX * 0.3}px ${shadowY * 0.3}px 20px rgba(201,168,76,0.05)`,
        }}
      >
        {/* Left Sidebar */}
        <nav className="flex flex-col justify-center gap-2 w-20 flex-shrink-0">
          {NAV_ITEMS.map(item => (
            <NavButton
              key={item.id}
              {...item}
              active={section === item.id}
              onClick={() => handleNav(item.id)}
            />
          ))}
        </nav>

        {/* Center Panel */}
        <div className="flex-1 bg-stone-900/80 backdrop-blur-md rounded-2xl border border-stone-700/40 overflow-hidden">
          <div
            className={`w-full h-full transition-opacity duration-200 ${fading ? 'opacity-0' : 'opacity-100'}`}
          >
            <ContentComponent />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-20 flex-shrink-0 flex flex-col justify-center gap-2 opacity-50">
          {['GitHub', 'Email', 'LinkedIn'].map((label, i) => (
            <div key={label}
              className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg border border-stone-700/30 text-stone-600 cursor-pointer hover:text-stone-400 transition-colors">
              <span className="text-lg">{i === 0 ? '⌥' : i === 1 ? '✉' : '⛁'}</span>
              <span className="text-[10px] uppercase tracking-widest">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Corner accents */}
      <div className="fixed top-4 left-4 w-12 h-12 border-t border-l border-amber-500/20 rounded-tl-lg pointer-events-none" />
      <div className="fixed top-4 right-4 w-12 h-12 border-t border-r border-amber-500/20 rounded-tr-lg pointer-events-none" />
      <div className="fixed bottom-4 left-4 w-12 h-12 border-b border-l border-amber-500/20 rounded-bl-lg pointer-events-none" />
      <div className="fixed bottom-4 right-4 w-12 h-12 border-b border-r border-amber-500/20 rounded-br-lg pointer-events-none" />
    </div>
  );
}