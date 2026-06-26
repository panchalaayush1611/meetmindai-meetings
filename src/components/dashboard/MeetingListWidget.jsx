import { Link } from 'react-router-dom';
import { LuArrowRight, LuVideo } from 'react-icons/lu';
import Card, { CardHeader } from '../common/Card';
import EmptyState from '../common/EmptyState';
import Badge from '../common/Badge';
import { AvatarStack } from '../common/Avatar';
import { formatRelativeDay, formatDuration } from '../../utils/dateUtils';
import { STATUS_CONFIG } from '../meetings/meetingHelpers';
import { ROUTES } from '../../constants/routes';

export default function MeetingListWidget({ title, meetings = [], emptyText, viewAllLink }) {
  return (
    <Card>
      <CardHeader
        title={title}
        action={
          viewAllLink && (
            <Link to={viewAllLink} className="text-xs font-medium text-primary flex items-center gap-1 hover:underline">
              View all <LuArrowRight size={12} />
            </Link>
          )
        }
      />
      {meetings.length === 0 ? (
        <EmptyState icon={LuVideo} title="Nothing here yet" description={emptyText} className="py-6" />
      ) : (
        <ul className="divide-y divide-surface-border dark:divide-surface-border-dark -mx-1">
          {meetings.map((m) => {
            const status = STATUS_CONFIG[m.status];
            return (
              <li key={m.id}>
                <Link
                  to={ROUTES.meetingDetails(m.id)}
                  className="flex items-center gap-3 px-1 py-3 hover:bg-surface-muted dark:hover:bg-surface-muted-dark rounded-lg transition-colors -mx-1"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink dark:text-ink-dark truncate">{m.title}</p>
                    <p className="text-xs text-ink-subtle dark:text-ink-subtle-dark mt-0.5">
                      {formatRelativeDay(m.date)}
                      {m.durationMinutes ? ` · ${formatDuration(m.durationMinutes)}` : ''}
                    </p>
                  </div>
                  <AvatarStack names={m.participants || []} max={3} size="xs" />
                  <Badge tone={status.tone} className="hidden sm:inline-flex">{status.label}</Badge>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
