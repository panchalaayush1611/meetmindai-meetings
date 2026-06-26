import { useState } from 'react';
import Card, { CardHeader } from '../common/Card';
import Switch from '../common/Switch';

const DEFAULT_PREFS = [
  { key: 'summaryReady', label: 'Summary ready', description: 'When an AI summary finishes generating', value: true },
  { key: 'riskDetected', label: 'Risk detected', description: 'When a meeting is flagged medium or high risk', value: true },
  { key: 'taskDue', label: 'Task due soon', description: 'Reminders for action items due within 24 hours', value: true },
  { key: 'mentions', label: 'Mentions & comments', description: 'When someone mentions you or comments on a meeting', value: true },
  { key: 'weeklyDigest', label: 'Weekly digest', description: 'A Monday-morning summary of last week\'s meetings', value: false },
  { key: 'productUpdates', label: 'Product updates', description: 'New features and announcements from MeetMind', value: false },
];

export default function NotificationSettings() {
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);

  return (
    <Card>
      <CardHeader title="Notifications" description="Choose what you want to be notified about" />
      <div className="divide-y divide-surface-border dark:divide-surface-border-dark">
        {prefs.map((pref) => (
          <Switch
            key={pref.key}
            label={pref.label}
            description={pref.description}
            checked={pref.value}
            onChange={(val) => setPrefs((p) => p.map((x) => (x.key === pref.key ? { ...x, value: val } : x)))}
          />
        ))}
      </div>
    </Card>
  );
}
