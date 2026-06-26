import { cn } from '../../utils/formatUtils';

export default function Switch({ checked, onChange, label, description }) {
  return (
    <label className="flex items-center justify-between gap-4 cursor-pointer py-2">
      {(label || description) && (
        <div>
          {label && <p className="text-sm font-medium text-ink dark:text-ink-dark">{label}</p>}
          {description && <p className="text-xs text-ink-subtle dark:text-ink-subtle-dark mt-0.5">{description}</p>}
        </div>
      )}
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={cn(
          'relative h-6 w-11 rounded-full transition-colors shrink-0',
          checked ? 'bg-primary' : 'bg-surface-border dark:bg-surface-border-dark'
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-soft transition-transform',
            checked && 'translate-x-5'
          )}
        />
      </button>
    </label>
  );
}
