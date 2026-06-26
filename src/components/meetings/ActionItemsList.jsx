import { useDispatch, useSelector } from 'react-redux';
import { LuCircle, LuCircleCheck } from 'react-icons/lu';
import { toggleTaskDone } from '../../redux/slices/tasksSlice';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import EmptyState from '../common/EmptyState';
import { formatDate } from '../../utils/dateUtils';
import { PRIORITY_CONFIG } from './meetingHelpers';
import { cn } from '../../utils/formatUtils';

export default function ActionItemsList({ meetingId }) {
  const dispatch = useDispatch();
  const allTasks = useSelector((s) => s.tasks.items);
  const items = allTasks.filter((t) => t.meetingId === meetingId);

  if (items.length === 0) {
    return <EmptyState icon={LuCircleCheck} title="No action items" description="MeetMind didn't detect any action items in this meeting." />;
  }

  return (
    <ul className="divide-y divide-surface-border dark:divide-surface-border-dark">
      {items.map((item) => {
        const done = item.status === 'done';
        const priority = PRIORITY_CONFIG[item.priority];
        return (
          <li key={item.id} className="flex items-start gap-3 py-3">
            <button onClick={() => dispatch(toggleTaskDone(item.id))} className="mt-0.5 text-ink-subtle dark:text-ink-subtle-dark hover:text-primary shrink-0">
              {done ? <LuCircleCheck size={18} className="text-success" /> : <LuCircle size={18} />}
            </button>
            <div className="flex-1 min-w-0">
              <p className={cn('text-sm', done ? 'text-ink-subtle dark:text-ink-subtle-dark line-through' : 'text-ink dark:text-ink-dark')}>
                {item.text}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                {item.owner && (
                  <span className="flex items-center gap-1.5 text-xs text-ink-subtle dark:text-ink-subtle-dark">
                    <Avatar name={item.owner} size="xs" />
                    {item.owner}
                  </span>
                )}
                {item.dueDate && (
                  <span className="text-xs text-ink-subtle dark:text-ink-subtle-dark">· Due {formatDate(item.dueDate)}</span>
                )}
              </div>
            </div>
            <Badge tone={priority.tone}>{priority.label}</Badge>
          </li>
        );
      })}
    </ul>
  );
}
