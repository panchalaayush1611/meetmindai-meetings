import { cn, getInitials, getAvatarColor } from '../../utils/formatUtils';

const SIZES = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-9 w-9 text-sm',
  lg: 'h-12 w-12 text-base',
};

export default function Avatar({ name, size = 'sm', className, ring = false }) {
  return (
    <div
      title={name}
      className={cn(
        'flex items-center justify-center rounded-full font-semibold shrink-0 select-none',
        SIZES[size],
        getAvatarColor(name),
        ring && 'ring-2 ring-surface-card dark:ring-surface-card-dark',
        className
      )}
    >
      {getInitials(name)}
    </div>
  );
}

export function AvatarStack({ names = [], max = 4, size = 'sm' }) {
  const visible = names.slice(0, max);
  const remaining = names.length - visible.length;
  return (
    <div className="flex items-center -space-x-2">
      {visible.map((name) => (
        <Avatar key={name} name={name} size={size} ring />
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            'flex items-center justify-center rounded-full font-semibold shrink-0 bg-surface-muted dark:bg-surface-muted-dark text-ink-subtle dark:text-ink-subtle-dark ring-2 ring-surface-card dark:ring-surface-card-dark',
            SIZES[size]
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
