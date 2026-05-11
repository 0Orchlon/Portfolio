import { useState, useEffect } from 'react';

function parseDuration(d: string): number {
  const m = d.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return 0;
  return (parseInt(m[1] || '0') * 3600) + (parseInt(m[2] || '0') * 60) + parseInt(m[3] || '0');
}

export default function YouTubeLatestVideo({ apiKey, channelId }: { apiKey: string; channelId: string }) {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!apiKey || !channelId) {
      setLoading(false);
      setError(true);
      return;
    }

    const fetchVideo = async () => {
      try {
        const ch = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
        );
        const chData = await ch.json();
        const uploadsId = chData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
        if (!uploadsId) throw new Error('no uploads');

        const pl = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=10&playlistId=${uploadsId}&key=${apiKey}`
        );
        const plData = await pl.json();
        const ids = (plData.items || []).map((i: any) => i.contentDetails.videoId).join(',');

        const vids = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${ids}&key=${apiKey}`
        );
        const vidsData = await vids.json();

        const found = (vidsData.items || []).find((v: any) => {
          const dur = parseDuration(v.contentDetails.duration);
          const live = v.snippet.liveBroadcastContent;
          return dur >= 60 && live !== 'live' && live !== 'upcoming';
        });

        if (found) {
          setVideoId(found.id);
          setTitle(found.snippet.title);
        }
        setLoading(false);
      } catch {
        setLoading(false);
        setError(true);
      }
    };

    fetchVideo();
  }, [apiKey, channelId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-stone-600 text-sm">
        Loading latest video...
      </div>
    );
  }

  if (error || !videoId) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-stone-500 text-sm gap-2">
        <span className="opacity-50 text-lg">▶</span>
        {!apiKey || !channelId
          ? <span>YouTube API key or channel ID not configured</span>
          : <span>Could not load latest video</span>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-stone-800">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <p className="text-sm text-stone-300 truncate">{title}</p>
    </div>
  );
}
