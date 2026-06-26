import { cn } from '../../utils/formatUtils';

const TONES = {
  neutral: 'bg-surface-muted dark:bg-surface-muted-dark text-ink-subtle dark:text-ink-subtle-dark',
  primary: 'bg-primary-light text-primary-hover dark:bg-blue-500/10 dark:text-blue-300',
  success: 'bg-success-light text-green-700 dark:bg-green-500/10 dark:text-green-300',
  warning: 'bg-warning-light text-amber-700 dark:bg-amber-500/10 dark:text-amber-300',
  danger: 'bg-danger-light text-red-700 dark:bg-red-500/10 dark:text-red-300',
  accent: 'bg-accent-light text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300',
};

export default function Badge({ children, tone = 'neutral', dot = false, className, icon: Icon }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap',
        TONES[tone],
        className
      )}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', DOT_COLORS[tone])} />}
      {Icon && <Icon size={12} />}
      {children}
    </span>
  );
}

const DOT_COLORS = {
  neutral: 'bg-gray-400',
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  accent: 'bg-accent',
};
