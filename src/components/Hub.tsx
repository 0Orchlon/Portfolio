import { useState, useEffect } from "react";
import GitHubContributions from "./GitHubContributions";
import YouTubeLatestVideo from "./YouTubeLatestVideo";

type Section =
  | "home"
  | "about"
  | "skills"
  | "github"
  | "projects"
  | "youtube"
  | "contact";

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
}

const NAV_ITEMS: {
  id: Section;
  label: string;
  icon: string;
  side: "left" | "right";
}[] = [
  { id: "home", label: "Home", icon: "⬡", side: "left" },
  { id: "about", label: "About", icon: "◆", side: "left" },
  { id: "skills", label: "Skills", icon: "◇", side: "left" },
  { id: "github", label: "GitHub", icon: "⌥", side: "left" },
  { id: "projects", label: "Projects", icon: "▣", side: "right" },
  { id: "youtube", label: "YouTube", icon: "▶", side: "right" },
  { id: "contact", label: "Contact", icon: "◎", side: "right" },
];

const SECTION_ORDER: Section[] = [
  "home",
  "about",
  "skills",
  "github",
  "projects",
  "youtube",
  "contact",
];

// ---------- Markdown renderer ----------
function renderMd(md: string): string {
  return md
    .replace(
      /^### (.+)$/gm,
      '<h3 class="text-sm font-semibold text-amber-300 mt-3 mb-1">$1</h3>',
    )
    .replace(
      /^## (.+)$/gm,
      '<h2 class="text-lg font-bold text-amber-100 mt-4 mb-2">$1</h2>',
    )
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-amber-200">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="italic text-stone-300">$1</em>')
    .replace(
      /`(.+?)`/g,
      '<code class="px-1.5 py-0.5 bg-stone-700 rounded text-xs text-amber-300">$1</code>',
    )
    .replace(
      /^- (.+)$/gm,
      '<li class="ml-4 list-disc text-stone-400 text-sm">$1</li>',
    )
    .replace(/^(?!<[hl]|<li)(.+)$/gm, (m: string) =>
      m.trim()
        ? `<p class="text-stone-400 text-sm leading-relaxed mb-2">${m}</p>`
        : "",
    );
}

// ---------- Parse skills from MD ----------
function parseSkills(md: string): { title: string; items: string[] }[] {
  const groups: { title: string; items: string[] }[] = [];
  const lines = md.split("\n");
  let current: { title: string; items: string[] } | null = null;
  for (const line of lines) {
    const heading = line.match(/^## (.+)$/);
    if (heading) {
      if (current) groups.push(current);
      current = { title: heading[1], items: [] };
    } else if (current && line.trim()) {
      current.items = line
        .trim()
        .split("·")
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }
  if (current) groups.push(current);
  return groups;
}

// ---------- Nav Button ----------
function NavButton({
  label,
  icon,
  active,
  onClick,
  side,
  skew,
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
  side: "left" | "right";
  skew?: number;
}) {
  const clipPath =
    side === "left"
      ? 'path("M0,0 L86%,2% Q98%,50% 86%,98% L0,100% Z")'
      : 'path("M14%,2% Q2%,50% 14%,98% L100%,100% L100%,0% Z")';

  return (
    <button
      onClick={onClick}
      style={{
        clipPath,
        transform: skew ? `skewY(${skew}deg)` : undefined,
      }}
      className={`group relative flex flex-col items-center gap-1.5 py-3.5 px-4 transition-all duration-300 cursor-pointer whitespace-nowrap w-[68px] border
        ${
          active
            ? "text-amber-400 bg-amber-500/12 border-amber-500/30 shadow-[0_0_20px_rgba(201,168,76,0.12)]"
            : "text-white/40 bg-white/[0.04] backdrop-blur-sm border-white/[0.06] hover:bg-white/[0.08] hover:text-white/70"
        }`}
    >
      <span className="text-lg leading-none">{icon}</span>
      <span className="text-[10px] uppercase tracking-widest font-medium">
        {label}
      </span>
      {/* Connector line to circle */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 w-4 h-px
        ${active ? "bg-amber-500/40" : "bg-white/10"}
        ${side === "left" ? "right-[-14px]" : "left-[-14px]"}
      `}
      />
    </button>
  );
}

// ---------- Section content components ----------
function HomeSection({ github, email }: Pick<Props, "github" | "email">) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 animate-fadeIn">
      <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-5xl font-bold shadow-lg shadow-amber-900/30 flex-shrink-0">
        B
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-amber-100 mb-1">BleakRed</h1>
        <p className="text-amber-400/80 text-base mb-3">
          Developer · Student · Creator
        </p>
        <p className="text-stone-400 text-sm leading-relaxed max-w-xs mx-auto">
          Final-year developer crafting tools and experiences that feel alive.
          Currently based in Ulaanbaatar.
        </p>
      </div>
      <div className="flex gap-3">
        <a
          href={`https://github.com/${github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-lg text-xs hover:bg-amber-500/20 transition-colors"
        >
          GitHub
        </a>
        <a
          href={`mailto:${email}`}
          className="px-4 py-2 bg-stone-700 border border-stone-600 text-stone-300 rounded-lg text-xs hover:bg-stone-600 transition-colors"
        >
          Email
        </a>
      </div>
    </div>
  );
}

function AboutSection({
  location,
  education,
  hobbies,
  aboutMd,
}: Pick<Props, "location" | "education" | "hobbies" | "aboutMd">) {
  const html = renderMd(aboutMd);
  return (
    <div className="h-full overflow-y-auto animate-fadeIn text-left space-y-4">
      <h2 className="text-xl font-bold text-amber-100">About Me</h2>
      <div className="flex gap-4 items-start">
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-amber-600 to-orange-700 flex-shrink-0 flex items-center justify-center text-2xl font-bold text-amber-100">
          B
        </div>
        <div
          className="flex-1 min-w-0"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Location", value: location },
          { label: "Education", value: education },
          { label: "Languages", value: "JS · TS · Python · SQL" },
          { label: "Hobbies", value: hobbies },
        ].map((item) => (
          <div
            key={item.label}
            className="p-3 bg-stone-800/50 rounded-lg border border-stone-700/50"
          >
            <p className="text-amber-400/60 text-[10px] mb-1 uppercase tracking-wider">
              {item.label}
            </p>
            <p className="text-stone-300 text-xs">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsSection({ skillsMd }: { skillsMd: string }) {
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
      <div className="grid grid-cols-2 gap-3">
        {groups.map((group) => (
          <div
            key={group.title}
            className="p-3 bg-stone-800/50 rounded-lg border border-stone-700/50"
          >
            <p className="text-amber-400/60 text-[10px] mb-2 uppercase tracking-wider">
              {group.title}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 bg-stone-700/50 rounded text-[11px] text-stone-300 border border-stone-600/30 hover:border-amber-500/30 transition-colors cursor-default"
                >
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

function GitHubSection({ githubUsers }: { githubUsers: string[] }) {
  return (
    <div className="h-full overflow-y-auto animate-fadeIn flex flex-col">
      <h2 className="text-xl font-bold text-amber-100 mb-4 flex-shrink-0">
        GitHub
      </h2>
      <div className="flex-1 flex items-center justify-center">
        <GitHubContributions users={githubUsers} />
      </div>
    </div>
  );
}

function ProjectsSection({
  projects,
  github,
}: {
  projects: Props["projects"];
  github: string;
}) {
  return (
    <div className="h-full overflow-y-auto animate-fadeIn">
      <h2 className="text-xl font-bold text-amber-100 mb-4">Projects</h2>
      <div className="space-y-3">
        {projects.map((p) => (
          <div
            key={p.title}
            className="p-4 bg-stone-800/50 rounded-lg border border-stone-700/50 hover:border-amber-500/20 transition-colors"
          >
            <h3 className="font-semibold text-amber-100 text-sm mb-1">
              {p.title}
            </h3>
            <p className="text-stone-400 text-xs mb-3 leading-relaxed">
              {p.desc}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] px-1.5 py-0.5 bg-amber-500/10 text-amber-400/80 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              {p.live !== "#" && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-400/80 hover:text-amber-300 transition-colors"
                >
                  Live Demo
                </a>
              )}
              <a
                href={
                  p.source !== "#"
                    ? p.source
                    : `https://github.com/${github}/${p.title.toLowerCase().replace(/\s+/g, "-")}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-stone-500 hover:text-stone-300 transition-colors"
              >
                Source
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function YouTubeSection({
  apiKey,
  channelId,
}: {
  apiKey: string;
  channelId: string;
}) {
  return (
    <div className="h-full overflow-y-auto animate-fadeIn">
      <h2 className="text-xl font-bold text-amber-100 mb-4">Latest Video</h2>
      <YouTubeLatestVideo apiKey={apiKey} channelId={channelId} />
    </div>
  );
}

function ContactSection({
  email,
  github,
  linkedin,
}: Pick<Props, "email" | "github" | "linkedin">) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 animate-fadeIn">
      <div className="text-3xl opacity-30">◎</div>
      <div className="text-center">
        <h2 className="text-xl font-bold text-amber-100 mb-2">Get in Touch</h2>
        <p className="text-stone-400 text-sm leading-relaxed max-w-[200px]">
          Whether it's a project idea, a job opportunity, or just a chat — my
          inbox is always open.
        </p>
      </div>
      <div className="space-y-2.5 w-full max-w-[200px]">
        <a
          href={`mailto:${email}`}
          className="block w-full text-center px-5 py-2.5 bg-amber-500 text-stone-900 font-semibold rounded-lg text-sm hover:bg-amber-400 transition-colors"
        >
          Send an Email
        </a>
        <a
          href={`https://github.com/${github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center px-5 py-2.5 bg-stone-700 border border-stone-600 text-stone-300 rounded-lg text-sm hover:bg-stone-600 transition-colors"
        >
          GitHub
        </a>
        <a
          href={`https://linkedin.com/in/${linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center px-5 py-2.5 bg-stone-700 border border-stone-600 text-stone-300 rounded-lg text-sm hover:bg-stone-600 transition-colors"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}

// ---------- Main Hub ----------
export default function Hub(props: Props) {
  const [section, setSection] = useState<Section>("home");
  const [fading, setFading] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMouse({
        x: ((e.clientX - cx) / cx) * 4,
        y: ((e.clientY - cy) / cy) * 3,
      });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
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

  const renderSection = () => {
    const common = {
      github: props.github,
      linkedin: props.linkedin,
      email: props.email,
    };
    switch (section) {
      case "home":
        return <HomeSection {...common} />;
      case "about":
        return (
          <AboutSection
            location={props.location}
            education={props.education}
            hobbies={props.hobbies}
            aboutMd={props.aboutMd}
          />
        );
      case "skills":
        return <SkillsSection skillsMd={props.skillsMd} />;
      case "github":
        return <GitHubSection githubUsers={props.githubUsers} />;
      case "projects":
        return (
          <ProjectsSection projects={props.projects} github={props.github} />
        );
      case "youtube":
        return (
          <YouTubeSection
            apiKey={props.youtubeApiKey}
            channelId={props.youtubeChannelId}
          />
        );
      case "contact":
        return <ContactSection {...common} />;
    }
  };

  return (
    <div className="w-full h-screen bg-stone-950 flex items-center justify-center overflow-hidden">
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #c9a84c 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div
        className="relative flex items-center justify-center transition-all duration-300"
        style={{
          transform: `perspective(1200px) rotateX(${rotateX - 4}deg) rotateY(${rotateY}deg)`,
        }}
      >
        {/* Left Nav Column */}
        <div className="flex flex-col items-end gap-2 z-10">
          {(NAV_ITEMS.filter((i) => i.side === "left") as typeof NAV_ITEMS).map(
            (item, idx, arr) => {
              const spread = (idx - (arr.length - 1) / 2) * 55;
              const skew = (idx - (arr.length - 1) / 2) * 2.5;
              return (
                <div
                  key={item.id}
                  style={{ transform: `translateY(${spread}px)` }}
                >
                  <NavButton
                    {...item}
                    side="left"
                    skew={skew}
                    active={section === item.id}
                    onClick={() => handleNav(item.id)}
                  />
                </div>
              );
            },
          )}
        </div>

        {/* Left gap */}
        <div className="w-5 flex-shrink-0" />

        {/* Center Circle */}
        <div
          className="w-[80vh] h-[80vh] min-w-[480px] min-h-[480px] max-w-[780px] max-h-[780px] rounded-full bg-stone-900/80 backdrop-blur-md border border-stone-700/40 overflow-hidden relative shadow-2xl
          before:absolute before:inset-3 before:rounded-full before:border before:border-stone-700/20 before:pointer-events-none
          after:absolute after:inset-[18px] after:rounded-full after:border after:border-stone-600/10 after:pointer-events-none"
        >
          <div
            className={`w-full h-full p-[15%] transition-all duration-300 ${fading ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
          >
            {renderSection()}
          </div>
        </div>

        {/* Right gap */}
        <div className="w-5 flex-shrink-0" />

        {/* Right Nav Grid (2x3) */}
        <div className="z-10" style={{ transform: "rotate(4deg)" }}>
          <div className="grid grid-cols-2 gap-2">
            {(
              NAV_ITEMS.filter((i) => i.side === "right") as typeof NAV_ITEMS
            ).map((item, idx, arr) => {
              const skew = (idx - (arr.length - 1) / 2) * 2.5;
              return (
                <NavButton
                  key={item.id}
                  {...item}
                  side="right"
                  skew={skew}
                  active={section === item.id}
                  onClick={() => handleNav(item.id)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Corner accents */}
      {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => (
        <div
          key={pos}
          className={`fixed w-10 h-10 pointer-events-none
          ${pos === "top-left" ? "top-4 left-4 border-t border-l" : ""}
          ${pos === "top-right" ? "top-4 right-4 border-t border-r" : ""}
          ${pos === "bottom-left" ? "bottom-4 left-4 border-b border-l" : ""}
          ${pos === "bottom-right" ? "bottom-4 right-4 border-b border-r" : ""}
          border-amber-500/20`}
        />
      ))}
    </div>
  );
}
