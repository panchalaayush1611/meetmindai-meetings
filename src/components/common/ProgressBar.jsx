import { cn } from '../../utils/formatUtils';

export function ProgressBar({ value, max = 100, tone = 'primary', className, trackClassName }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const TONES = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
    accent: 'bg-accent',
  };
  return (
    <div className={cn('h-1.5 w-full rounded-full bg-surface-muted dark:bg-surface-muted-dark overflow-hidden', trackClassName)}>
      <div
        className={cn('h-full rounded-full transition-all duration-500', TONES[tone], className)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

const scoreToTone = (score) => {
  if (score >= 80) return { stroke: '#22C55E', tone: 'success' };
  if (score >= 60) return { stroke: '#F59E0B', tone: 'warning' };
  return { stroke: '#EF4444', tone: 'danger' };
};

export function HealthScoreGauge({ score = 0, size = 96, strokeWidth = 8, label = 'Health score' }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const { stroke } = scoreToTone(score);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            className="stroke-surface-muted dark:stroke-surface-muted-dark"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display font-bold text-xl text-ink dark:text-ink-dark">{score}</span>
        </div>
      </div>
      {label && <span className="text-xs text-ink-subtle dark:text-ink-subtle-dark">{label}</span>}
    </div>
  );
}
