export function renderMd(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 class="text-sm font-semibold text-amber-300 mt-3 mb-1">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-lg font-bold text-amber-100 mt-4 mb-2">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-amber-200">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="italic text-stone-300">$1</em>')
    .replace(/`(.+?)`/g, '<code class="px-1.5 py-0.5 bg-stone-700 rounded text-xs text-amber-300">$1</code>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-stone-400 text-sm">$1</li>')
    .replace(/^(?!<)(.+)$/gm, (m: string) =>
      m.trim() ? `<p class="text-stone-400 text-sm leading-relaxed mb-2">${m}</p>` : '',
    );
}

export function parseSkills(md: string): { title: string; items: string[] }[] {
  const groups: { title: string; items: string[] }[] = [];
  const lines = md.split('\n');
  let current: { title: string; items: string[] } | null = null;
  for (const line of lines) {
    const heading = line.match(/^## (.+)$/);
    if (heading) {
      if (current) groups.push(current);
      current = { title: heading[1], items: [] };
    } else if (current && line.trim()) {
      current.items = line.trim().split('·').map(s => s.trim()).filter(Boolean);
    }
  }
  if (current) groups.push(current);
  return groups;
}
