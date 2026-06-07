interface Props {
  avatar: string;
  github: string;
  email: string;
  name: string;
  tagline: string;
  bio: string;
}

export default function HomeSection({ avatar, github, email, name, tagline, bio }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 animate-fadeIn">
      <img src={avatar} alt={name}
        className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover shadow-lg shadow-amber-900/30 flex-shrink-0" />
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-amber-100 mb-1">{name}</h1>
        <p className="text-amber-400/80 text-sm md:text-base mb-3">{tagline}</p>
        <p className="text-stone-400 text-xs md:text-sm leading-relaxed max-w-xs mx-auto">
          {bio}
        </p>
      </div>
      <div className="flex gap-3">
        <a href={`https://github.com/${github}`} target="_blank" rel="noopener noreferrer"
          className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-lg text-xs hover:bg-amber-500/20 transition-colors">
          GitHub
        </a>
        <a href={`mailto:${email}`}
          className="px-4 py-2 bg-stone-700 border border-stone-600 text-stone-300 rounded-lg text-xs hover:bg-stone-600 transition-colors">
          Email
        </a>
      </div>
    </div>
  );
}
