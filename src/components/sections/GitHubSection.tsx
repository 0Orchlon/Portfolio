import GitHubContributions from '../GitHubContributions';

interface Props {
  githubUsers: string[];
}

export default function GitHubSection({ githubUsers }: Props) {
  return (
    <div className="h-full overflow-y-auto animate-fadeIn flex flex-col">
      <h2 className="text-xl font-bold text-amber-100 mb-4 flex-shrink-0">GitHub</h2>
      <div className="flex-1 flex items-center justify-center">
        <GitHubContributions users={githubUsers} />
      </div>
    </div>
  );
}
