import { cn } from '../../utils/formatUtils';
import { LuLoaderCircle } from 'react-icons/lu';

const VARIANTS = {
  primary: 'bg-primary text-white hover:bg-primary-hover shadow-soft',
  secondary: 'bg-secondary text-white hover:bg-secondary-hover shadow-soft',
  outline:
    'bg-transparent border border-surface-border dark:border-surface-border-dark text-ink dark:text-ink-dark hover:bg-surface-muted dark:hover:bg-surface-muted-dark',
  ghost: 'bg-transparent text-ink-subtle dark:text-ink-subtle-dark hover:bg-surface-muted dark:hover:bg-surface-muted-dark hover:text-ink dark:hover:text-ink-dark',
  danger: 'bg-danger text-white hover:bg-red-600 shadow-soft',
  subtle: 'bg-surface-muted dark:bg-surface-muted-dark text-ink dark:text-ink-dark hover:bg-surface-border dark:hover:bg-surface-border-dark',
};

const SIZES = {
  sm: 'h-8 px-3 text-[13px] gap-1.5',
  md: 'h-9 px-4 text-sm gap-2',
  lg: 'h-11 px-5 text-[15px] gap-2',
  icon: 'h-9 w-9 justify-center',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  loading = false,
  disabled = false,
  fullWidth = false,
  className,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center font-medium rounded-lg transition-all duration-150 active:scale-[0.98]',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
        VARIANTS[variant],
        SIZES[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading ? (
        <LuLoaderCircle className="animate-spin" size={16} />
      ) : (
        Icon && <Icon size={16} />
      )}
      {children}
      {!loading && IconRight && <IconRight size={16} />}
    </button>
  );
}
