import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LuBell, LuTriangleAlert, LuCircleCheck, LuFileText, LuAtSign, LuUsers } from 'react-icons/lu';
import Card from '../components/common/Card';
import { PillTabs } from '../components/common/Tabs';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import { markAsRead, markAllAsRead } from '../redux/slices/notificationsSlice';
import { timeAgo } from '../utils/dateUtils';
import { cn } from '../utils/formatUtils';

const TYPE_FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Risk', value: 'risk' },
  { label: 'Tasks', value: 'task' },
  { label: 'Summaries', value: 'summary' },
  { label: 'Mentions', value: 'mention' },
];

const ICONS = {
  risk: { icon: LuTriangleAlert, tone: 'text-danger bg-danger-light dark:bg-red-500/10' },
  task: { icon: LuCircleCheck, tone: 'text-primary bg-primary-light dark:bg-blue-500/10' },
  summary: { icon: LuFileText, tone: 'text-accent bg-accent-light dark:bg-cyan-500/10' },
  mention: { icon: LuAtSign, tone: 'text-secondary bg-indigo-100 dark:bg-indigo-500/10' },
  workspace: { icon: LuUsers, tone: 'text-success bg-success-light dark:bg-green-500/10' },
};

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all');
  const items = useSelector((s) => s.notifications.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const list = filter === 'all' ? items : items.filter((n) => n.type === filter);
    return [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [items, filter]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-ink dark:text-ink-dark">Notifications</h1>
          <p className="text-sm text-ink-subtle dark:text-ink-subtle-dark mt-1">{items.filter((n) => !n.read).length} unread</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => dispatch(markAllAsRead())}>Mark all read</Button>
      </div>

      <PillTabs tabs={TYPE_FILTERS} active={filter} onChange={setFilter} />

      <Card padding={false}>
        {filtered.length === 0 ? (
          <EmptyState icon={LuBell} title="Nothing here" className="py-10" />
        ) : (
          <ul className="divide-y divide-surface-border dark:divide-surface-border-dark">
            {filtered.map((n) => {
              const { icon: Icon, tone } = ICONS[n.type] || ICONS.summary;
              return (
                <li key={n.id}>
                  <button
                    onClick={() => {
                      dispatch(markAsRead(n.id));
                      if (n.link) navigate(n.link);
                    }}
                    className="w-full flex items-start gap-3.5 px-5 py-4 text-left hover:bg-surface-muted dark:hover:bg-surface-muted-dark transition-colors"
                  >
                    <div className={cn('h-9 w-9 rounded-lg flex items-center justify-center shrink-0', tone)}>
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn('text-sm', n.read ? 'text-ink-subtle dark:text-ink-subtle-dark' : 'text-ink dark:text-ink-dark font-medium')}>
                        {n.title}
                      </p>
                      <p className="text-sm text-ink-subtle dark:text-ink-subtle-dark mt-0.5">{n.description}</p>
                      <p className="text-xs text-ink-subtle dark:text-ink-subtle-dark mt-1">{timeAgo(n.createdAt)}</p>
                    </div>
                    {!n.read && <span className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
}
