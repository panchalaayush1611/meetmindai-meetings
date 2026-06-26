import { useState } from 'react';
import Avatar from '../common/Avatar';
import SearchBar from '../common/SearchBar';
import EmptyState from '../common/EmptyState';
import { LuFileText } from 'react-icons/lu';

export default function TranscriptViewer({ transcript = [] }) {
  const [query, setQuery] = useState('');

  if (transcript.length === 0) {
    return <EmptyState icon={LuFileText} title="Transcript not available" description="This meeting doesn't have a transcript yet." />;
  }

  const filtered = query
    ? transcript.filter((line) => line.text.toLowerCase().includes(query.toLowerCase()))
    : transcript;

  return (
    <div className="space-y-4">
      <SearchBar value={query} onChange={setQuery} placeholder="Search transcript..." />
      <div className="space-y-4 max-h-[420px] overflow-y-auto scrollbar-thin pr-1">
        {filtered.map((line, i) => (
          <div key={i} className="flex gap-3">
            <Avatar name={line.speaker} size="sm" />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-medium text-ink dark:text-ink-dark">{line.speaker}</span>
                <span className="text-xs font-mono text-ink-subtle dark:text-ink-subtle-dark">{line.timestamp}</span>
              </div>
              <p className="text-sm text-ink-subtle dark:text-ink-subtle-dark mt-0.5 leading-relaxed">{line.text}</p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-ink-subtle dark:text-ink-subtle-dark text-center py-6">No matches for "{query}"</p>
        )}
      </div>
    </div>
  );
}
