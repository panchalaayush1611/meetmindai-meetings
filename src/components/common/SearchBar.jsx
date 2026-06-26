import { LuSearch, LuX } from 'react-icons/lu';
import { cn } from '../../utils/formatUtils';

export default function SearchBar({ value, onChange, placeholder = 'Search...', className, onClear, autoFocus = false }) {
  return (
    <div className={cn('relative flex items-center', className)}>
      <LuSearch size={15} className="absolute left-3 text-ink-subtle dark:text-ink-subtle-dark" />
      <input
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-9 rounded-lg border border-surface-border dark:border-surface-border-dark bg-surface-card dark:bg-surface-card-dark text-sm text-ink dark:text-ink-dark placeholder:text-ink-subtle dark:placeholder:text-ink-subtle-dark pl-9 pr-8 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors"
      />
      {value && (
        <button
          onClick={() => (onClear ? onClear() : onChange(''))}
          className="absolute right-2.5 text-ink-subtle dark:text-ink-subtle-dark hover:text-ink dark:hover:text-ink-dark"
        >
          <LuX size={14} />
        </button>
      )}
    </div>
  );
}
