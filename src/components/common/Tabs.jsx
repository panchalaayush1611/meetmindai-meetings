import { cn } from '../../utils/formatUtils';

export default function Tabs({ tabs, active, onChange, className }) {
  return (
    <div className={cn('flex items-center gap-1 border-b border-surface-border dark:border-surface-border-dark', className)}>
      {tabs.map((tab) => {
        const isActive = tab.value === active;
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={cn(
              'relative px-3.5 py-2.5 text-sm font-medium transition-colors flex items-center gap-1.5',
              isActive ? 'text-primary' : 'text-ink-subtle dark:text-ink-subtle-dark hover:text-ink dark:hover:text-ink-dark'
            )}
          >
            {tab.icon && <tab.icon size={15} />}
            {tab.label}
            {isActive && <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-primary rounded-full" />}
          </button>
        );
      })}
    </div>
  );
}

export function PillTabs({ tabs, active, onChange, className }) {
  return (
    <div className={cn('inline-flex items-center gap-1 bg-surface-muted dark:bg-surface-muted-dark rounded-lg p-1', className)}>
      {tabs.map((tab) => {
        const isActive = tab.value === active;
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={cn(
              'px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors',
              isActive
                ? 'bg-surface-card dark:bg-surface-card-dark text-ink dark:text-ink-dark shadow-soft'
                : 'text-ink-subtle dark:text-ink-subtle-dark hover:text-ink dark:hover:text-ink-dark'
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
