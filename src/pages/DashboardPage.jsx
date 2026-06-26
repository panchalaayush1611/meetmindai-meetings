import { useSelector, useDispatch } from 'react-redux';
import { LuUpload, LuClock4, LuGauge, LuListChecks, LuTriangleAlert } from 'react-icons/lu';
import StatCard from '../components/common/StatCard';
import Button from '../components/common/Button';
import QuickSearchWidget from '../components/dashboard/QuickSearchWidget';
import MeetingListWidget from '../components/dashboard/MeetingListWidget';
import AIInsightsWidget from '../components/dashboard/AIInsightsWidget';
import TasksWidget from '../components/dashboard/TasksWidget';
import NotificationsWidget from '../components/dashboard/NotificationsWidget';
import CalendarPreviewWidget from '../components/dashboard/CalendarPreviewWidget';
import RecentActivityWidget from '../components/dashboard/RecentActivityWidget';
import { summaryStats } from '../data/analytics';
import { setUploadDialogOpen } from '../redux/slices/uiSlice';
import { ROUTES } from '../constants/routes';

const STAT_ICONS = [LuClock4, LuGauge, LuListChecks, LuTriangleAlert];

export default function DashboardPage() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);
  const meetings = useSelector((s) => s.meetings.items);

  const upcoming = meetings
    .filter((m) => m.status === 'upcoming')
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 4);

  const recent = meetings
    .filter((m) => m.status === 'completed')
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-ink dark:text-ink-dark">{greeting}, {user.name.split(' ')[0]}</h1>
          <p className="text-sm text-ink-subtle dark:text-ink-subtle-dark mt-1">Here's what's happening across your meetings.</p>
        </div>
        <Button variant="primary" icon={LuUpload} onClick={() => dispatch(setUploadDialogOpen(true))}>
          Upload meeting
        </Button>
      </div>

      <QuickSearchWidget />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {summaryStats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} icon={STAT_ICONS[i]} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <MeetingListWidget title="Upcoming meetings" meetings={upcoming} emptyText="No upcoming meetings scheduled." viewAllLink={ROUTES.MEETINGS} />
          <MeetingListWidget title="Recent meetings" meetings={recent} emptyText="No completed meetings yet." viewAllLink={ROUTES.MEETINGS} />
          <RecentActivityWidget />
        </div>
        <div className="space-y-5">
          <AIInsightsWidget />
          <TasksWidget />
          <CalendarPreviewWidget />
          <NotificationsWidget />
        </div>
      </div>
    </div>
  );
}
