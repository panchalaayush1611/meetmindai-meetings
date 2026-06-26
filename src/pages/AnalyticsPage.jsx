import { PillTabs } from '../components/common/Tabs';
import { useState } from 'react';
import WeeklyReportCard from '../components/analytics/WeeklyReportCard';
import MeetingHoursChart from '../components/analytics/MeetingHoursChart';
import ProductivityTrendChart from '../components/analytics/ProductivityTrendChart';
import TaskCompletionChart from '../components/analytics/TaskCompletionChart';
import RiskTrendChart from '../components/analytics/RiskTrendChart';
import AttendanceChart from '../components/analytics/AttendanceChart';
import {
  weeklyReport,
  meetingHoursByWeek,
  productivityTrend,
  taskCompletion,
  riskTrend,
  attendanceByTeam,
} from '../data/analytics';

const RANGES = [
  { label: '4 weeks', value: '4w' },
  { label: '8 weeks', value: '8w' },
  { label: 'Quarter', value: 'q' },
];

export default function AnalyticsPage() {
  const [range, setRange] = useState('8w');

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl text-ink dark:text-ink-dark">Analytics</h1>
          <p className="text-sm text-ink-subtle dark:text-ink-subtle-dark mt-1">Meeting productivity and risk trends across your workspace</p>
        </div>
        <PillTabs tabs={RANGES} active={range} onChange={setRange} />
      </div>

      <WeeklyReportCard report={weeklyReport} />

      <div className="grid lg:grid-cols-2 gap-5">
        <MeetingHoursChart data={meetingHoursByWeek} />
        <ProductivityTrendChart data={productivityTrend} />
        <TaskCompletionChart data={taskCompletion} />
        <RiskTrendChart data={riskTrend} />
        <AttendanceChart data={attendanceByTeam} />
      </div>
    </div>
  );
}
