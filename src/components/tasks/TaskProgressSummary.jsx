import Card from '../common/Card';
import { ProgressBar } from '../common/ProgressBar';

export default function TaskProgressSummary({ tasks }) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === 'done').length;
  const overdue = tasks.filter((t) => t.status !== 'done' && t.dueDate && new Date(t.dueDate) < new Date()).length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <Card>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-ink dark:text-ink-dark">
          {done} of {total} action items completed
        </p>
        <span className="text-sm font-semibold text-ink dark:text-ink-dark">{pct}%</span>
      </div>
      <ProgressBar value={pct} tone="success" />
      {overdue > 0 && (
        <p className="text-xs text-danger mt-2.5 font-medium">{overdue} overdue</p>
      )}
    </Card>
  );
}
