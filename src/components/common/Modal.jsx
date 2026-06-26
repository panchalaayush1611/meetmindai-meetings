import { AnimatePresence, motion } from 'framer-motion';
import { LuX } from 'react-icons/lu';
import { cn } from '../../utils/formatUtils';

export default function Modal({ isOpen, onClose, title, description, children, footer, size = 'md' }) {
  const widths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={cn(
              'relative w-full bg-surface-card dark:bg-surface-card-dark rounded-2xl shadow-popover border border-surface-border dark:border-surface-border-dark max-h-[85vh] overflow-y-auto scrollbar-thin',
              widths[size]
            )}
          >
            <div className="flex items-start justify-between px-5 pt-5">
              <div>
                {title && <h2 className="font-display font-semibold text-lg text-ink dark:text-ink-dark">{title}</h2>}
                {description && <p className="text-sm text-ink-subtle dark:text-ink-subtle-dark mt-1">{description}</p>}
              </div>
              <button
                onClick={onClose}
                className="text-ink-subtle dark:text-ink-subtle-dark hover:text-ink dark:hover:text-ink-dark rounded-lg p-1 hover:bg-surface-muted dark:hover:bg-surface-muted-dark"
              >
                <LuX size={18} />
              </button>
            </div>
            <div className="px-5 py-4">{children}</div>
            {footer && <div className="px-5 pb-5 pt-2 flex items-center justify-end gap-2">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
