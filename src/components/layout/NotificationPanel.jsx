import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LuTriangleAlert, LuCircleCheck, LuFileText, LuAtSign, LuUsers } from 'react-icons/lu';
import { markAsRead, markAllAsRead } from '../../redux/slices/notificationsSlice';
import { timeAgo } from '../../utils/dateUtils';
import { cn } from '../../utils/formatUtils';

const ICONS = {
  risk: { icon: LuTriangleAlert, tone: 'text-danger bg-danger-light dark:bg-red-500/10' },
  task: { icon: LuCircleCheck, tone: 'text-primary bg-primary-light dark:bg-blue-500/10' },
  summary: { icon: LuFileText, tone: 'text-accent bg-accent-light dark:bg-cyan-500/10' },
  mention: { icon: LuAtSign, tone: 'text-secondary bg-indigo-100 dark:bg-indigo-500/10' },
  workspace: { icon: LuUsers, tone: 'text-success bg-success-light dark:bg-green-500/10' },
};

export default function NotificationPanel() {
  const items = useSelector((s) => s.notifications.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sorted = [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="w-80">
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-surface-border dark:border-surface-border-dark">
        <span className="font-semibold text-sm text-ink dark:text-ink-dark">Notifications</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(markAllAsRead());
          }}
          className="text-xs text-primary font-medium hover:underline"
        >
          Mark all read
        </button>
      </div>
      <div className="max-h-[360px] overflow-y-auto scrollbar-thin">
        {sorted.map((n) => {
          const { icon: Icon, tone } = ICONS[n.type] || ICONS.summary;
          return (
            <button
              key={n.id}
              onClick={() => {
                dispatch(markAsRead(n.id));
                if (n.link) navigate(n.link);
              }}
              className="w-full flex items-start gap-3 px-3.5 py-3 text-left hover:bg-surface-muted dark:hover:bg-surface-muted-dark transition-colors"
            >
              <div className={cn('h-8 w-8 rounded-lg flex items-center justify-center shrink-0', tone)}>
                <Icon size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn('text-[13px] leading-snug', n.read ? 'text-ink-subtle dark:text-ink-subtle-dark' : 'text-ink dark:text-ink-dark font-medium')}>
                  {n.title}
                </p>
                <p className="text-xs text-ink-subtle dark:text-ink-subtle-dark mt-0.5 line-clamp-2">{n.description}</p>
                <p className="text-[11px] text-ink-subtle dark:text-ink-subtle-dark mt-1">{timeAgo(n.createdAt)}</p>
              </div>
              {!n.read && <span className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
