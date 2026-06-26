import { LuArrowUpRight } from 'react-icons/lu';

export default function SuggestedPrompts({ prompts = [], onSelect }) {
  return (
    <div className="grid sm:grid-cols-2 gap-2.5">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          onClick={() => onSelect(prompt)}
          className="flex items-center justify-between gap-2 text-left text-sm text-ink dark:text-ink-dark bg-surface-card dark:bg-surface-card-dark border border-surface-border dark:border-surface-border-dark rounded-xl px-4 py-3 hover:border-primary/40 hover:bg-primary-light/40 dark:hover:bg-blue-500/5 transition-colors"
        >
          {prompt}
          <LuArrowUpRight size={14} className="text-ink-subtle dark:text-ink-subtle-dark shrink-0" />
        </button>
      ))}
    </div>
  );
}
