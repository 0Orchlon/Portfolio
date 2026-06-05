function videoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

interface Props {
  videos: string[];
}

export default function YouTubeSection({ videos }: Props) {
  return (
    <div className="h-full overflow-y-auto animate-fadeIn">
      <h2 className="text-xl font-bold text-amber-100 mb-4">Videos</h2>
      <div className="space-y-4">
        {videos.map((url, i) => {
          const id = videoId(url);
          if (!id) {
            return (
              <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                className="block text-xs text-amber-400/80 hover:text-amber-300 transition-colors truncate">
                {url}
              </a>
            );
          }
          return (
            <div key={id} className="flex flex-col gap-1">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-stone-800">
                <iframe
                  src={`https://www.youtube.com/embed/${id}`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
