import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { LuListChecks } from 'react-icons/lu';
import Card from '../components/common/Card';
import { PillTabs } from '../components/common/Tabs';
import EmptyState from '../components/common/EmptyState';
import TaskProgressSummary from '../components/tasks/TaskProgressSummary';
import TaskRow from '../components/tasks/TaskRow';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Open', value: 'open' },
  { label: 'In progress', value: 'in-progress' },
  { label: 'Done', value: 'done' },
];

export default function TasksPage() {
  const [filter, setFilter] = useState('all');
  const tasks = useSelector((s) => s.tasks.items);

  const filtered = useMemo(() => {
    const list = filter === 'all' ? tasks : tasks.filter((t) => t.status === filter);
    return [...list].sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  }, [tasks, filter]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display font-bold text-2xl text-ink dark:text-ink-dark">Tasks</h1>
        <p className="text-sm text-ink-subtle dark:text-ink-subtle-dark mt-1">Action items detected and tracked across every meeting</p>
      </div>

      <TaskProgressSummary tasks={tasks} />

      <PillTabs tabs={FILTERS} active={filter} onChange={setFilter} />

      <Card>
        {filtered.length === 0 ? (
          <EmptyState icon={LuListChecks} title="No tasks here" description="Nothing matches this filter." />
        ) : (
          <div className="divide-y divide-surface-border dark:divide-surface-border-dark">
            {filtered.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
