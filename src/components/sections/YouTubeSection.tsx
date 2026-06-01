import YouTubeLatestVideo from '../YouTubeLatestVideo';

interface Props {
  apiKey: string;
  channelId: string;
}

export default function YouTubeSection({ apiKey, channelId }: Props) {
  return (
    <div className="h-full overflow-y-auto animate-fadeIn">
      <h2 className="text-xl font-bold text-amber-100 mb-4">Latest Video</h2>
      <YouTubeLatestVideo apiKey={apiKey} channelId={channelId} />
    </div>
  );
}
