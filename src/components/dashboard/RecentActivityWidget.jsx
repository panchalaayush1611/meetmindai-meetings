import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LuMessageSquare, LuCircleCheck } from 'react-icons/lu';
import Card, { CardHeader } from '../common/Card';
import EmptyState from '../common/EmptyState';
import Avatar from '../common/Avatar';
import { timeAgo } from '../../utils/dateUtils';
import { ROUTES } from '../../constants/routes';

export default function RecentActivityWidget() {
  const meetings = useSelector((s) => s.meetings.items);

  const commentActivity = meetings.flatMap((m) =>
    (m.comments || []).map((c) => ({
      kind: 'comment',
      id: c.id,
      actor: c.author,
      text: `commented on `,
      meetingTitle: m.title,
      meetingId: m.id,
      at: c.createdAt,
      detail: c.text,
    }))
  );

  const decisionActivity = meetings
    .filter((m) => (m.keyDecisions || []).length > 0)
    .map((m) => ({
      kind: 'decision',
      id: `decision-${m.id}`,
      actor: 'MeetMind AI',
      text: `recorded ${m.keyDecisions.length} decision${m.keyDecisions.length > 1 ? 's' : ''} in `,
      meetingTitle: m.title,
      meetingId: m.id,
      at: m.date,
      detail: m.keyDecisions[0],
    }));

  const activity = [...commentActivity, ...decisionActivity]
    .sort((a, b) => new Date(b.at) - new Date(a.at))
    .slice(0, 6);

  return (
    <Card>
      <CardHeader title="Recent activity" />
      {activity.length === 0 ? (
        <EmptyState icon={LuMessageSquare} title="No recent activity" className="py-6" />
      ) : (
        <ul className="space-y-4">
          {activity.map((item) => (
            <li key={item.id} className="flex items-start gap-3">
              {item.kind === 'comment' ? (
                <Avatar name={item.actor} size="sm" />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary-light dark:bg-blue-500/10 flex items-center justify-center text-primary shrink-0">
                  <LuCircleCheck size={14} />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-sm text-ink dark:text-ink-dark leading-snug">
                  <span className="font-medium">{item.actor}</span> {item.text}
                  <Link to={ROUTES.meetingDetails(item.meetingId)} className="font-medium text-primary hover:underline">
                    {item.meetingTitle}
                  </Link>
                </p>
                <p className="text-xs text-ink-subtle dark:text-ink-subtle-dark mt-0.5 line-clamp-1">{item.detail}</p>
                <p className="text-[11px] text-ink-subtle dark:text-ink-subtle-dark mt-0.5">{timeAgo(item.at)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
