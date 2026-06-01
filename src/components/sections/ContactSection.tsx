interface Props {
  email: string;
  github: string;
  linkedin: string;
}

export default function ContactSection({ email, github, linkedin }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 animate-fadeIn">
      <div className="text-3xl opacity-30">◎</div>
      <div className="text-center">
        <h2 className="text-xl font-bold text-amber-100 mb-2">Get in Touch</h2>
        <p className="text-stone-400 text-sm leading-relaxed max-w-[200px]">
          Whether it's a project idea, a job opportunity, or just a chat — my inbox is always open.
        </p>
      </div>
      <div className="space-y-2.5 w-full max-w-[200px]">
        <a href={`mailto:${email}`}
          className="block w-full text-center px-5 py-2.5 bg-amber-500 text-stone-900 font-semibold rounded-lg text-sm hover:bg-amber-400 transition-colors">
          Send an Email
        </a>
        <a href={`https://github.com/${github}`} target="_blank" rel="noopener noreferrer"
          className="block w-full text-center px-5 py-2.5 bg-stone-700 border border-stone-600 text-stone-300 rounded-lg text-sm hover:bg-stone-600 transition-colors">
          GitHub
        </a>
        <a href={`https://linkedin.com/in/${linkedin}`} target="_blank" rel="noopener noreferrer"
          className="block w-full text-center px-5 py-2.5 bg-stone-700 border border-stone-600 text-stone-300 rounded-lg text-sm hover:bg-stone-600 transition-colors">
          LinkedIn
        </a>
      </div>
    </div>
  );
}
