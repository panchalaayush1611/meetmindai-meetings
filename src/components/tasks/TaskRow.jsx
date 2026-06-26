import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LuCircle, LuCircleCheck, LuFileText } from 'react-icons/lu';
import { toggleTaskDone } from '../../redux/slices/tasksSlice';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import { formatDate } from '../../utils/dateUtils';
import { PRIORITY_CONFIG, TASK_STATUS_CONFIG } from '../meetings/meetingHelpers';
import { ROUTES } from '../../constants/routes';
import { cn } from '../../utils/formatUtils';

export default function TaskRow({ task }) {
  const dispatch = useDispatch();
  const done = task.status === 'done';
  const priority = PRIORITY_CONFIG[task.priority];
  const status = TASK_STATUS_CONFIG[task.status];

  const overdue = task.dueDate && !done && new Date(task.dueDate) < new Date();

  return (
    <div className="flex items-center gap-3 py-3 px-1">
      <button onClick={() => dispatch(toggleTaskDone(task.id))} className="text-ink-subtle dark:text-ink-subtle-dark hover:text-primary shrink-0">
        {done ? <LuCircleCheck size={19} className="text-success" /> : <LuCircle size={19} />}
      </button>

      <div className="flex-1 min-w-0">
        <p className={cn('text-sm', done ? 'text-ink-subtle dark:text-ink-subtle-dark line-through' : 'text-ink dark:text-ink-dark')}>
          {task.text}
        </p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {task.owner && (
            <span className="flex items-center gap-1.5 text-xs text-ink-subtle dark:text-ink-subtle-dark">
              <Avatar name={task.owner} size="xs" /> {task.owner}
            </span>
          )}
          {task.dueDate && (
            <span className={cn('text-xs', overdue ? 'text-danger font-medium' : 'text-ink-subtle dark:text-ink-subtle-dark')}>
              · Due {formatDate(task.dueDate)}{overdue && ' (overdue)'}
            </span>
          )}
          {task.meetingId && (
            <Link
              to={ROUTES.meetingDetails(task.meetingId)}
              className="flex items-center gap-1 text-xs text-ink-subtle dark:text-ink-subtle-dark hover:text-primary"
            >
              <LuFileText size={11} /> {task.meetingTitle}
            </Link>
          )}
        </div>
      </div>

      <Badge tone={priority.tone} className="hidden sm:inline-flex">{priority.label}</Badge>
      <Badge tone={status.tone}>{status.label}</Badge>
    </div>
  );
}
