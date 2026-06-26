import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  LuArrowLeft, LuFileText, LuListChecks, LuShieldAlert, LuMessageSquare,
  LuDownload, LuUsers, LuClock, LuSparkles, LuLoaderCircle,
} from 'react-icons/lu';
import Card, { CardHeader } from '../components/common/Card';
import Badge from '../components/common/Badge';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import Tabs from '../components/common/Tabs';
import Dropdown, { DropdownItem } from '../components/common/Dropdown';
import EmptyState from '../components/common/EmptyState';
import TranscriptViewer from '../components/meetings/TranscriptViewer';
import ActionItemsList from '../components/meetings/ActionItemsList';
import RiskPanel from '../components/meetings/RiskPanel';
import CommentSection from '../components/meetings/CommentSection';
import Timeline from '../components/meetings/Timeline';
import { STATUS_CONFIG } from '../components/meetings/meetingHelpers';
import { formatRelativeDay, formatDuration } from '../utils/dateUtils';
import { ROUTES } from '../constants/routes';

const TABS = [
  { value: 'summary', label: 'Summary', icon: LuFileText },
  { value: 'transcript', label: 'Transcript', icon: LuMessageSquare },
  { value: 'actions', label: 'Action Items', icon: LuListChecks },
  { value: 'risk', label: 'Risk & Health', icon: LuShieldAlert },
  { value: 'comments', label: 'Comments', icon: LuMessageSquare },
];

export default function MeetingDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState('summary');
  const meeting = useSelector((s) => s.meetings.items.find((m) => m.id === id));
  const taskCount = useSelector((s) => s.tasks.items.filter((t) => t.meetingId === id).length);

  if (!meeting) {
    return (
      <EmptyState
        icon={LuFileText}
        title="Meeting not found"
        description="This meeting may have been removed."
        action={<Button variant="outline" onClick={() => navigate(ROUTES.MEETINGS)}>Back to meetings</Button>}
      />
    );
  }

  const status = STATUS_CONFIG[meeting.status];

  const exportSummary = (format) => {
    const isMarkdown = format === 'md';
    const bullet = isMarkdown ? '##' : '--';
    const lines = [
      isMarkdown ? `# ${meeting.title}` : meeting.title.toUpperCase(),
      `${meeting.type} · ${meeting.project} · ${formatRelativeDay(meeting.date)}`,
      '',
      `${bullet} Summary`,
      meeting.summary || 'No summary available.',
      '',
      `${bullet} Action Items`,
      ...(meeting.actionItems || []).map((a) =>
        isMarkdown
          ? `- [${a.status === 'done' ? 'x' : ' '}] ${a.text} (${a.owner}${a.dueDate ? `, due ${a.dueDate.slice(0, 10)}` : ''})`
          : `- ${a.text} (${a.owner}${a.dueDate ? `, due ${a.dueDate.slice(0, 10)}` : ''})`
      ),
    ];
    const blob = new Blob([lines.join('\n')], { type: isMarkdown ? 'text/markdown' : 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${meeting.title.replace(/\s+/g, '-').toLowerCase()}.${isMarkdown ? 'md' : 'txt'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      <button onClick={() => navigate(ROUTES.MEETINGS)} className="flex items-center gap-1.5 text-sm text-ink-subtle dark:text-ink-subtle-dark hover:text-ink dark:hover:text-ink-dark">
        <LuArrowLeft size={15} /> Back to meetings
      </button>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="font-display font-bold text-2xl text-ink dark:text-ink-dark">{meeting.title}</h1>
            {meeting.status === 'processing' ? (
              <Badge tone="warning" icon={LuLoaderCircle}>Processing</Badge>
            ) : (
              <Badge tone={status.tone}>{status.label}</Badge>
            )}
          </div>
          <p className="text-sm text-ink-subtle dark:text-ink-subtle-dark mt-1.5 flex items-center gap-1.5">
            {meeting.type} · {meeting.project} · <LuClock size={13} /> {formatRelativeDay(meeting.date)}
            {meeting.durationMinutes && ` · ${formatDuration(meeting.durationMinutes)}`}
          </p>
        </div>
        {meeting.status === 'completed' && (
          <Dropdown
            trigger={<Button variant="outline" icon={LuDownload}>Export</Button>}
          >
            <DropdownItem onClick={() => exportSummary('md')}>Export as Markdown</DropdownItem>
            <DropdownItem onClick={() => exportSummary('txt')}>Export as text</DropdownItem>
          </Dropdown>
        )}
      </div>

      {meeting.status !== 'completed' ? (
        <Card>
          <EmptyState
            icon={meeting.status === 'processing' ? LuSparkles : LuClock}
            title={meeting.status === 'processing' ? 'AI is still processing this meeting' : 'This meeting hasn\'t happened yet'}
            description={
              meeting.status === 'processing'
                ? "We're transcribing the recording and generating a summary. This usually takes under a minute."
                : 'Summary, transcript, and action items will appear here automatically once the meeting ends.'
            }
          />
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <Card>
              <Tabs tabs={TABS} active={tab} onChange={setTab} className="mb-5 -mt-1" />
              {tab === 'summary' && (
                <div className="space-y-5">
                  <p className="text-sm text-ink dark:text-ink-dark leading-relaxed">{meeting.summary}</p>
                  {meeting.keyDecisions?.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-ink dark:text-ink-dark mb-2">Key decisions</p>
                      <ul className="space-y-1.5">
                        {meeting.keyDecisions.map((d, i) => (
                          <li key={i} className="text-sm text-ink-subtle dark:text-ink-subtle-dark flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              {tab === 'transcript' && <TranscriptViewer transcript={meeting.transcript} />}
              {tab === 'actions' && <ActionItemsList meetingId={meeting.id} />}
              {tab === 'risk' && (
                <RiskPanel healthScore={meeting.healthScore} healthBreakdown={meeting.healthBreakdown} risks={meeting.risks} />
              )}
              {tab === 'comments' && <CommentSection meetingId={meeting.id} comments={meeting.comments} />}
            </Card>
          </div>

          <div className="space-y-5">
            <Card>
              <CardHeader title="Participants" action={<LuUsers size={16} className="text-ink-subtle dark:text-ink-subtle-dark" />} />
              <ul className="space-y-2.5">
                {(meeting.participants || []).map((name) => (
                  <li key={name} className="flex items-center gap-2.5">
                    <Avatar name={name} size="sm" />
                    <span className="text-sm text-ink dark:text-ink-dark">{name}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {meeting.timeline?.length > 0 && (
              <Card>
                <CardHeader title="Timeline" />
                <Timeline items={meeting.timeline} />
              </Card>
            )}

            <Card className="bg-primary-light/40 dark:bg-blue-500/5 border-primary/20">
              <p className="text-sm font-medium text-ink dark:text-ink-dark">{taskCount} action item{taskCount !== 1 ? 's' : ''}</p>
              <p className="text-xs text-ink-subtle dark:text-ink-subtle-dark mt-1">Tracked automatically from this meeting</p>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
