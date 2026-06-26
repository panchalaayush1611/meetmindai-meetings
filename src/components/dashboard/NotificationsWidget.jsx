import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LuArrowRight, LuBell } from 'react-icons/lu';
import Card, { CardHeader } from '../common/Card';
import EmptyState from '../common/EmptyState';
import { markAsRead } from '../../redux/slices/notificationsSlice';
import { timeAgo } from '../../utils/dateUtils';
import { ROUTES } from '../../constants/routes';
import { cn } from '../../utils/formatUtils';

export default function NotificationsWidget() {
  const items = useSelector((s) => s.notifications.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sorted = [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);

  return (
    <Card>
      <CardHeader
        title="Notifications"
        action={
          <Link to={ROUTES.NOTIFICATIONS} className="text-xs font-medium text-primary flex items-center gap-1 hover:underline">
            View all <LuArrowRight size={12} />
          </Link>
        }
      />
      {sorted.length === 0 ? (
        <EmptyState icon={LuBell} title="No notifications" className="py-6" />
      ) : (
        <ul className="space-y-3.5">
          {sorted.map((n) => (
            <li key={n.id}>
              <button
                onClick={() => {
                  dispatch(markAsRead(n.id));
                  if (n.link) navigate(n.link);
                }}
                className="flex items-start gap-2.5 text-left w-full group"
              >
                <span className={cn('h-1.5 w-1.5 rounded-full mt-1.5 shrink-0', n.read ? 'bg-transparent' : 'bg-primary')} />
                <div className="min-w-0">
                  <p className={cn('text-sm leading-snug group-hover:text-primary transition-colors', n.read ? 'text-ink-subtle dark:text-ink-subtle-dark' : 'text-ink dark:text-ink-dark font-medium')}>
                    {n.title}
                  </p>
                  <p className="text-xs text-ink-subtle dark:text-ink-subtle-dark mt-0.5">{timeAgo(n.createdAt)}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
