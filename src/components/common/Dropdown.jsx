import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { cn } from '../../utils/formatUtils';

export default function Dropdown({ trigger, children, align = 'right', className }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOutsideClick(ref, () => setOpen(false), open);

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.14 }}
            onClick={() => setOpen(false)}
            className={cn(
              'absolute z-40 mt-2 min-w-[200px] bg-surface-card dark:bg-surface-card-dark border border-surface-border dark:border-surface-border-dark rounded-xl shadow-popover py-1.5 overflow-hidden',
              align === 'right' ? 'right-0' : 'left-0',
              className
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DropdownItem({ icon: Icon, children, onClick, danger = false, className }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-left transition-colors',
        danger
          ? 'text-danger hover:bg-danger-light dark:hover:bg-red-500/10'
          : 'text-ink dark:text-ink-dark hover:bg-surface-muted dark:hover:bg-surface-muted-dark',
        className
      )}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}

export function DropdownDivider() {
  return <div className="h-px bg-surface-border dark:bg-surface-border-dark my-1.5" />;
}
