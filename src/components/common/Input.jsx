import { forwardRef } from 'react';
import { cn } from '../../utils/formatUtils';

const Input = forwardRef(function Input(
  { label, error, icon: Icon, iconRight: IconRight, className, containerClassName, hint, ...props },
  ref
) {
  return (
    <div className={cn('flex flex-col gap-1.5', containerClassName)}>
      {label && (
        <label className="text-sm font-medium text-ink dark:text-ink-dark">{label}</label>
      )}
      <div className="relative">
        {Icon && (
          <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle dark:text-ink-subtle-dark" />
        )}
        <input
          ref={ref}
          className={cn(
            'w-full h-10 rounded-lg border bg-surface-card dark:bg-surface-card-dark text-sm text-ink dark:text-ink-dark placeholder:text-ink-subtle dark:placeholder:text-ink-subtle-dark px-3.5 transition-colors',
            'border-surface-border dark:border-surface-border-dark focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none',
            Icon && 'pl-9',
            IconRight && 'pr-9',
            error && 'border-danger focus:border-danger focus:ring-danger/15',
            className
          )}
          {...props}
        />
        {IconRight && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{IconRight}</div>
        )}
      </div>
      {hint && !error && <span className="text-xs text-ink-subtle dark:text-ink-subtle-dark">{hint}</span>}
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
});

export default Input;
