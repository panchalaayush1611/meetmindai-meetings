import { cn } from '../../utils/formatUtils';

export default function Logo({ size = 28, showWordmark = true, className, wordmarkClassName }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <defs>
          <linearGradient id="mm-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563EB" />
            <stop offset="1" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill="url(#mm-grad)" />
        <path
          d="M9 20.5V13l5 4.2 5-4.2v7.5"
          stroke="white"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="23.5" cy="9.5" r="1.6" fill="white" />
      </svg>
      {showWordmark && (
        <span className={cn('font-display font-bold text-[15px] text-ink dark:text-ink-dark tracking-tight', wordmarkClassName)}>
          MeetMind <span className="text-primary">AI</span>
        </span>
      )}
    </div>
  );
}
