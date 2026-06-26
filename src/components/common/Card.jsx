import { cn } from '../../utils/formatUtils';

export default function Card({ children, className, hoverable = false, padding = true, as: Comp = 'div', ...props }) {
  return (
    <Comp
      className={cn(
        'bg-surface-card dark:bg-surface-card-dark border border-surface-border dark:border-surface-border-dark rounded-2xl shadow-card',
        hoverable && 'transition-shadow duration-200 hover:shadow-card-hover',
        padding && 'p-5',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function CardHeader({ title, description, action, className }) {
  return (
    <div className={cn('flex items-start justify-between gap-3 mb-4', className)}>
      <div>
        <h3 className="font-display font-semibold text-[15px] text-ink dark:text-ink-dark">{title}</h3>
        {description && <p className="text-sm text-ink-subtle dark:text-ink-subtle-dark mt-0.5">{description}</p>}
      </div>
      {action}
    </div>
  );
}
