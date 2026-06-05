import { useEffect, useRef, useState } from 'react';

interface Props {
  src: string;
}

export default function AudioPlayer({ src }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !src) return;
    audio.volume = volume;

    const play = () => {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    };

    play();

    const handleFirst = () => {
      play();
      document.removeEventListener('click', handleFirst);
    };
    document.addEventListener('click', handleFirst, { once: true });

    return () => document.removeEventListener('click', handleFirst);
  }, [src, volume]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
      if (v === 0) setMuted(true);
      else setMuted(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (muted) {
      audio.volume = volume || 0.3;
      setMuted(false);
    } else {
      audio.volume = 0;
      setMuted(true);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio ref={audioRef} src={src} loop preload="auto" />
      <div className="group flex items-center gap-1 bg-stone-900/60 backdrop-blur-sm border border-stone-700/40 rounded-full px-1 py-1">
        <button onClick={toggle}
          className="p-1.5 text-stone-400 hover:text-amber-400 transition-colors text-sm rounded-full hover:bg-stone-800"
          title={playing ? 'Pause' : 'Play'}>
          {playing ? '⏸' : '▶'}
        </button>

        <div className="w-0 group-hover:w-20 overflow-hidden transition-all duration-200 flex items-center">
          <input type="range" min="0" max="1" step="0.05" value={muted ? 0 : volume}
            onChange={handleVolume}
            className="w-20 h-1.5 accent-amber-500 cursor-pointer mx-1.5" />
        </div>

        <button onClick={toggleMute}
          className="p-1.5 text-stone-400 hover:text-amber-400 transition-colors text-xs rounded-full hover:bg-stone-800"
          title={muted ? 'Unmute' : 'Mute'}>
          {muted || volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
        </button>
      </div>
    </div>
  );
}
