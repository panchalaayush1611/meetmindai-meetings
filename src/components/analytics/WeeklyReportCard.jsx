import { LuClock, LuListChecks, LuActivity, LuTriangleAlert, LuDownload } from 'react-icons/lu';
import Card, { CardHeader } from '../common/Card';
import Button from '../common/Button';

export default function WeeklyReportCard({ report }) {
  const rows = [
    { icon: LuClock, label: 'Total meeting hours', value: `${report.totalMeetingHours}h` },
    { icon: LuActivity, label: 'Meetings held', value: report.meetingsHeld },
    { icon: LuListChecks, label: 'Action items completed', value: `${report.actionItemsCompleted} / ${report.actionItemsCreated}` },
    { icon: LuTriangleAlert, label: 'Top at-risk account', value: report.topRiskAccount },
  ];

  return (
    <Card>
      <CardHeader
        title="This week's report"
        description="Auto-generated every Monday at 9am"
        action={
          <Button variant="outline" size="sm" icon={LuDownload}>
            Export
          </Button>
        }
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {rows.map((row) => (
          <div key={row.label} className="rounded-xl bg-surface-muted dark:bg-surface-muted-dark p-3.5">
            <row.icon size={15} className="text-primary mb-2" />
            <p className="font-display font-bold text-lg text-ink dark:text-ink-dark">{row.value}</p>
            <p className="text-[11px] text-ink-subtle dark:text-ink-subtle-dark mt-0.5 leading-snug">{row.label}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-ink-subtle dark:text-ink-subtle-dark mt-4">
        Estimated <span className="font-semibold text-ink dark:text-ink-dark">{report.hoursSavedEstimate}h</span> saved this week by skipping manual note-taking and recap meetings.
      </p>
    </Card>
  );
}
