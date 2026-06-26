import { cn } from '../../utils/formatUtils';

export default function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-12 px-6', className)}>
      {Icon && (
        <div className="h-11 w-11 rounded-xl bg-surface-muted dark:bg-surface-muted-dark flex items-center justify-center text-ink-subtle dark:text-ink-subtle-dark mb-3">
          <Icon size={20} />
        </div>
      )}
      <h3 className="font-display font-semibold text-ink dark:text-ink-dark text-[15px]">{title}</h3>
      {description && <p className="text-sm text-ink-subtle dark:text-ink-subtle-dark mt-1 max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
