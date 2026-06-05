import { renderMd } from './utils';

interface Props {
  location: string;
  education: string;
  hobbies: string;
  aboutMd: string;
}

export default function AboutSection({ location, education, hobbies, aboutMd }: Props) {
  const html = renderMd(aboutMd);
  return (
    <div className="h-full overflow-y-auto animate-fadeIn text-left space-y-4">
      <h2 className="text-xl font-bold text-amber-100">About Me</h2>
      <div className="flex gap-4 items-start">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-gradient-to-br from-amber-600 to-orange-700 flex-shrink-0 flex items-center justify-center text-lg md:text-2xl font-bold text-amber-100">
          B
        </div>
        <div className="flex-1 min-w-0" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { label: 'Location', value: location },
          { label: 'Education', value: education },
          { label: 'Languages', value: 'JS · TS · Python · SQL' },
          { label: 'Hobbies', value: hobbies },
        ].map(item => (
          <div key={item.label} className="p-3 bg-stone-800/50 rounded-lg border border-stone-700/50">
            <p className="text-amber-400/60 text-[10px] mb-1 uppercase tracking-wider">{item.label}</p>
            <p className="text-stone-300 text-xs">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
