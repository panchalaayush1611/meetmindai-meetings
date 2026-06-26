import { Link } from 'react-router-dom';
import { LuClock, LuLoaderCircle } from 'react-icons/lu';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { AvatarStack } from '../common/Avatar';
import { formatRelativeDay, formatDuration } from '../../utils/dateUtils';
import { STATUS_CONFIG, RISK_CONFIG } from './meetingHelpers';
import { ROUTES } from '../../constants/routes';

export default function MeetingCard({ meeting }) {
  const status = STATUS_CONFIG[meeting.status];
  const risk = meeting.riskLevel ? RISK_CONFIG[meeting.riskLevel] : null;

  return (
    <Link to={ROUTES.meetingDetails(meeting.id)}>
      <Card hoverable className="h-full flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-display font-semibold text-[15px] text-ink dark:text-ink-dark truncate">{meeting.title}</p>
            <p className="text-xs text-ink-subtle dark:text-ink-subtle-dark mt-0.5">{meeting.type} · {meeting.project}</p>
          </div>
          {meeting.status === 'processing' ? (
            <Badge tone="warning" icon={LuLoaderCircle}>Processing</Badge>
          ) : (
            <Badge tone={status.tone}>{status.label}</Badge>
          )}
        </div>

        <div className="flex items-center gap-3 text-xs text-ink-subtle dark:text-ink-subtle-dark mt-3">
          <span className="flex items-center gap-1">
            <LuClock size={12} />
            {formatRelativeDay(meeting.date)}
          </span>
          {meeting.durationMinutes && <span>{formatDuration(meeting.durationMinutes)}</span>}
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {(meeting.tags || []).slice(0, 3).map((tag) => (
            <Badge key={tag} tone="neutral">{tag}</Badge>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto pt-4">
          <AvatarStack names={meeting.participants || []} size="xs" max={4} />
          <div className="flex items-center gap-2">
            {risk && <Badge tone={risk.tone}>{risk.label}</Badge>}
            {meeting.healthScore != null && (
              <span className="text-xs font-semibold text-ink dark:text-ink-dark">{meeting.healthScore}/100</span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
