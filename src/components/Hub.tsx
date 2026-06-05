import { useState, useEffect } from 'react';
import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import GitHubSection from './sections/GitHubSection';
import ProjectsSection from './sections/ProjectsSection';
import YouTubeSection from './sections/YouTubeSection';
import ContactSection from './sections/ContactSection';
import LeetCodeSection from './sections/LeetCodeSection';
import HackerRankSection from './sections/HackerRankSection';

type Section = 'home' | 'about' | 'skills' | 'github' | 'leetcode' | 'hackerrank' | 'projects' | 'youtube' | 'contact';

interface Props {
  github: string;
  linkedin: string;
  email: string;
  location: string;
  education: string;
  hobbies: string;
  aboutMd: string;
  skillsMd: string;
  projects: {
    title: string;
    desc: string;
    tags: string[];
    live: string;
    source: string;
  }[];
  githubUsers: string[];
  youtubeApiKey: string;
  youtubeChannelId: string;
  leetcode: string;
  hackerrank: string;
}

const NAV_ITEMS: { id: Section; label: string; icon: string; side: 'left' | 'right' }[] = [
  { id: 'home', label: 'Home', icon: '⬡', side: 'left' },
  { id: 'about', label: 'About', icon: '◆', side: 'left' },
  { id: 'skills', label: 'Skills', icon: '◇', side: 'left' },
  { id: 'github', label: 'GitHub', icon: '⌥', side: 'left' },
  { id: 'leetcode', label: 'LeetCode', icon: '⚡', side: 'left' },
  { id: 'hackerrank', label: 'HackerRank', icon: '⌨', side: 'left' },
  { id: 'projects', label: 'Projects', icon: '▣', side: 'right' },
  { id: 'youtube', label: 'YouTube', icon: '▶', side: 'right' },
  { id: 'contact', label: 'Contact', icon: '◎', side: 'right' },
];

function NavButton({ label, icon, active, onClick, side, skew, mobile }: {
  label: string; icon: string; active: boolean; onClick: () => void; side: 'left' | 'right'; skew?: number; mobile?: boolean;
}) {
  if (mobile) {
    return (
      <button onClick={onClick}
        className={`flex flex-col items-center gap-0.5 py-2 px-3 transition-all duration-300 cursor-pointer whitespace-nowrap border-b-2
          ${active
            ? 'text-amber-400 border-amber-500'
            : 'text-white/40 border-transparent hover:text-white/70'
          }`}
      >
        <span className="text-base leading-none">{icon}</span>
        <span className="text-[9px] uppercase tracking-widest font-medium">{label}</span>
      </button>
    );
  }

  const clipPath = side === 'left'
    ? 'path("M0,0 L86%,2% Q98%,50% 86%,98% L0,100% Z")'
    : 'path("M14%,2% Q2%,50% 14%,98% L100%,100% L100%,0% Z")';

  return (
    <button onClick={onClick}
      style={{ clipPath, transform: skew ? `skewY(${skew}deg)` : undefined }}
      className={`group relative flex flex-col items-center gap-1.5 py-3.5 px-4 transition-all duration-300 cursor-pointer whitespace-nowrap w-[68px] border
        ${active
          ? 'text-amber-400 bg-amber-500/12 border-amber-500/30 shadow-[0_0_20px_rgba(201,168,76,0.12)]'
          : 'text-white/40 bg-white/[0.04] backdrop-blur-sm border-white/[0.06] hover:bg-white/[0.08] hover:text-white/70'
        }`}
    >
      <span className="text-lg leading-none">{icon}</span>
      <span className="text-[10px] uppercase tracking-widest font-medium">{label}</span>
      <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-px
        ${active ? 'bg-amber-500/40' : 'bg-white/10'}
        ${side === 'left' ? 'right-[-14px]' : 'left-[-14px]'}
      `} />
    </button>
  );
}

export default function Hub(props: Props) {
  const [section, setSection] = useState<Section>('home');
  const [fading, setFading] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMouse({
        x: ((e.clientX - cx) / cx) * 4,
        y: ((e.clientY - cy) / cy) * 3,
      });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const handleNav = (id: Section) => {
    if (id === section) return;
    setFading(true);
    setTimeout(() => { setSection(id); setFading(false); }, 200);
  };

  const rotateX = -mouse.y * 0.5;
  const rotateY = mouse.x * 0.5;

  const renderSection = () => {
    const common = { github: props.github, linkedin: props.linkedin, email: props.email };
    switch (section) {
      case 'home': return <HomeSection github={props.github} email={props.email} />;
      case 'about': return <AboutSection location={props.location} education={props.education} hobbies={props.hobbies} aboutMd={props.aboutMd} />;
      case 'skills': return <SkillsSection skillsMd={props.skillsMd} />;
      case 'github': return <GitHubSection githubUsers={props.githubUsers} />;
      case 'leetcode': return <LeetCodeSection username={props.leetcode} />;
      case 'hackerrank': return <HackerRankSection username={props.hackerrank} />;
      case 'projects': return <ProjectsSection projects={props.projects} github={props.github} />;
      case 'youtube': return <YouTubeSection apiKey={props.youtubeApiKey} channelId={props.youtubeChannelId} />;
      case 'contact': return <ContactSection {...common} />;
    }
  };

  return (
    <div className="w-full h-screen bg-stone-950 flex flex-col md:flex-row md:items-center md:justify-center overflow-hidden">
      <div className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #c9a84c 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

      {/* Main content area with perspective */}
      <div className="flex-1 md:flex-none flex items-center justify-center transition-all duration-300 min-h-0"
        style={{
          transform: isMobile ? 'none' : `perspective(1200px) rotateX(${rotateX - 4}deg) rotateY(${rotateY}deg)`,
        }}>

        {/* Desktop: Left Nav Column */}
        {!isMobile && (
          <>
            <div className="flex flex-col items-end gap-2 z-10">
              {(NAV_ITEMS.filter(i => i.side === 'left') as typeof NAV_ITEMS).map((item, idx, arr) => {
                const spread = (idx - (arr.length - 1) / 2) * 55;
                const skew = (idx - (arr.length - 1) / 2) * 2.5;
                return (
                  <div key={item.id} style={{ transform: `translateY(${spread}px)` }}>
                    <NavButton {...item} side="left" skew={skew} active={section === item.id} onClick={() => handleNav(item.id)} />
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Center Circle */}
        <div className="w-[85vw] h-[85vw] md:w-[75vh] md:h-[75vh] md:min-w-[400px] md:min-h-[400px] max-w-[780px] max-h-[780px] rounded-full bg-stone-900/80 backdrop-blur-md border border-stone-700/40 overflow-hidden relative shadow-2xl
          before:absolute before:inset-3 before:rounded-full before:border before:border-stone-700/20 before:pointer-events-none before:hidden md:before:block
          after:absolute after:inset-[18px] after:rounded-full after:border after:border-stone-600/10 after:pointer-events-none after:hidden md:after:block">
          <div className={`w-full h-full p-[10%] md:p-[15%] transition-all duration-300 ${fading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            {renderSection()}
          </div>
        </div>

        {/* Desktop: Right Nav Grid */}
        {!isMobile && (
          <>
            <div className="z-10" style={{ transform: 'rotate(4deg)' }}>
              <div className="grid grid-cols-2 gap-2">
                {(NAV_ITEMS.filter(i => i.side === 'right') as typeof NAV_ITEMS).map((item, idx, arr) => {
                  const skew = (idx - (arr.length - 1) / 2) * 2.5;
                  return (
                    <NavButton key={item.id} {...item} side="right" skew={skew} active={section === item.id} onClick={() => handleNav(item.id)} />
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Mobile: Bottom Nav Bar */}
      {isMobile && (
        <div className="flex-shrink-0 w-full overflow-x-auto bg-stone-950/90 backdrop-blur-md border-t border-stone-800/40 z-20">
          <div className="flex items-center justify-around px-1 py-1">
            {NAV_ITEMS.map(item => (
              <NavButton key={item.id} {...item} side={item.side} mobile active={section === item.id} onClick={() => handleNav(item.id)} />
            ))}
          </div>
        </div>
      )}

      {/* Corner accents */}
      {!isMobile && ['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(pos => (
        <div key={pos} className={`fixed w-10 h-10 pointer-events-none
          ${pos === 'top-left' ? 'top-4 left-4 border-t border-l' : ''}
          ${pos === 'top-right' ? 'top-4 right-4 border-t border-r' : ''}
          ${pos === 'bottom-left' ? 'bottom-4 left-4 border-b border-l' : ''}
          ${pos === 'bottom-right' ? 'bottom-4 right-4 border-b border-r' : ''}
          border-amber-500/20`}
        />
      ))}
    </div>
  );
}
