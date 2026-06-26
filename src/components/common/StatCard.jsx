import { LuTrendingUp, LuTrendingDown } from 'react-icons/lu';
import { cn } from '../../utils/formatUtils';
import Card from './Card';

export default function StatCard({ label, value, delta, trend, good = true, icon: Icon, className }) {
  const TrendIcon = trend === 'down' ? LuTrendingDown : LuTrendingUp;
  return (
    <Card className={cn('p-4', className)}>
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-ink-subtle dark:text-ink-subtle-dark">{label}</span>
        {Icon && (
          <div className="h-8 w-8 rounded-lg bg-primary-light dark:bg-blue-500/10 flex items-center justify-center text-primary">
            <Icon size={15} />
          </div>
        )}
      </div>
      <div className="flex items-end justify-between mt-2.5">
        <span className="font-display font-bold text-2xl text-ink dark:text-ink-dark">{value}</span>
        {delta && (
          <span
            className={cn(
              'flex items-center gap-0.5 text-xs font-semibold pb-1',
              good ? 'text-success' : 'text-danger'
            )}
          >
            <TrendIcon size={13} />
            {delta}
          </span>
        )}
      </div>
    </Card>
  );
}
