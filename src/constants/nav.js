import {
  LuLayoutDashboard,
  LuVideo,
  LuSparkles,
  LuUsers,
  LuChartBar,
  LuListChecks,
  LuBell,
  LuSettings,
} from 'react-icons/lu';
import { ROUTES } from './routes';

export const navItems = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: LuLayoutDashboard },
  { label: 'Meetings', path: ROUTES.MEETINGS, icon: LuVideo },
  { label: 'AI Assistant', path: ROUTES.ASSISTANT, icon: LuSparkles },
  { label: 'Workspace', path: ROUTES.WORKSPACE, icon: LuUsers },
  { label: 'Analytics', path: ROUTES.ANALYTICS, icon: LuChartBar },
  { label: 'Tasks', path: ROUTES.TASKS, icon: LuListChecks },
  { label: 'Notifications', path: ROUTES.NOTIFICATIONS, icon: LuBell },
  { label: 'Settings', path: ROUTES.SETTINGS, icon: LuSettings },
];
