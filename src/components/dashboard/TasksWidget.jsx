import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LuArrowRight, LuCircle, LuCircleCheck, LuListChecks } from 'react-icons/lu';
import Card, { CardHeader } from '../common/Card';
import EmptyState from '../common/EmptyState';
import { toggleTaskDone } from '../../redux/slices/tasksSlice';
import { formatDate } from '../../utils/dateUtils';
import { ROUTES } from '../../constants/routes';
import { cn } from '../../utils/formatUtils';

export default function TasksWidget() {
  const dispatch = useDispatch();
  const allTasks = useSelector((s) => s.tasks.items);
  const tasks = allTasks.filter((t) => t.status !== 'done').slice(0, 5);

  return (
    <Card>
      <CardHeader
        title="Pending action items"
        action={
          <Link to={ROUTES.TASKS} className="text-xs font-medium text-primary flex items-center gap-1 hover:underline">
            View all <LuArrowRight size={12} />
          </Link>
        }
      />
      {tasks.length === 0 ? (
        <EmptyState icon={LuListChecks} title="All caught up" description="No pending action items right now." className="py-6" />
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-start gap-2.5">
              <button onClick={() => dispatch(toggleTaskDone(task.id))} className="mt-0.5 text-ink-subtle dark:text-ink-subtle-dark hover:text-primary shrink-0">
                {task.status === 'done' ? <LuCircleCheck size={17} className="text-success" /> : <LuCircle size={17} />}
              </button>
              <div className="min-w-0">
                <p className={cn('text-sm text-ink dark:text-ink-dark leading-snug')}>{task.text}</p>
                <p className="text-xs text-ink-subtle dark:text-ink-subtle-dark mt-0.5">
                  {task.owner}{task.dueDate ? ` · Due ${formatDate(task.dueDate)}` : ''}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
