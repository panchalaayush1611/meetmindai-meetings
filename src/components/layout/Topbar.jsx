import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  LuSearch,
  LuBell,
  LuChevronDown,
  LuMoon,
  LuSun,
  LuUser,
  LuSettings,
  LuLogOut,
  LuPlus,
  LuCheck,
} from 'react-icons/lu';
import { useTheme } from '../../context/ThemeContext';
import { logout } from '../../redux/slices/authSlice';
import { getInitials, getAvatarColor } from '../../utils/formatUtils';
import Dropdown, { DropdownItem, DropdownDivider } from '../common/Dropdown';
import NotificationPanel from './NotificationPanel';
import { ROUTES } from '../../constants/routes';

export default function Topbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();
  const user = useSelector((s) => s.auth.user);
  const workspaceName = useSelector((s) => s.auth.workspaceName);
  const unreadCount = useSelector((s) => s.notifications.items.filter((n) => !n.read).length);

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between gap-4 px-4 md:px-6 border-b border-surface-border dark:border-surface-border-dark bg-surface-card/80 dark:bg-surface-card-dark/80 backdrop-blur-md">
      <div className="flex items-center gap-3 min-w-0">
        <Dropdown
          align="left"
          trigger={
            <button className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-surface-muted dark:hover:bg-surface-muted-dark transition-colors">
              <div className="h-7 w-7 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                {getInitials(workspaceName)}
              </div>
              <span className="text-sm font-semibold text-ink dark:text-ink-dark truncate max-w-[140px] hidden sm:inline">
                {workspaceName}
              </span>
              <LuChevronDown size={14} className="text-ink-subtle dark:text-ink-subtle-dark hidden sm:inline" />
            </button>
          }
        >
          <div className="px-3.5 py-2 text-[11px] uppercase tracking-wide text-ink-subtle dark:text-ink-subtle-dark font-semibold">
            Workspaces
          </div>
          <DropdownItem icon={LuCheck}>{workspaceName}</DropdownItem>
          <DropdownDivider />
          <DropdownItem icon={LuPlus}>Create workspace</DropdownItem>
        </Dropdown>
      </div>

      <button
        onClick={() => navigate(ROUTES.ASSISTANT)}
        className="hidden md:flex items-center gap-2 flex-1 max-w-md h-9 rounded-lg border border-surface-border dark:border-surface-border-dark bg-surface dark:bg-surface-dark px-3 text-sm text-ink-subtle dark:text-ink-subtle-dark hover:border-primary/40 transition-colors"
      >
        <LuSearch size={15} />
        <span className="flex-1 text-left">Ask MeetMind about any meeting...</span>
        <kbd className="text-[10px] px-1.5 py-0.5 rounded border border-surface-border dark:border-surface-border-dark bg-surface-muted dark:bg-surface-muted-dark font-mono">
          ⌘K
        </kbd>
      </button>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={toggleTheme}
          className="h-9 w-9 flex items-center justify-center rounded-lg text-ink-subtle dark:text-ink-subtle-dark hover:bg-surface-muted dark:hover:bg-surface-muted-dark transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <LuSun size={17} /> : <LuMoon size={17} />}
        </button>

        <Dropdown
          trigger={
            <button className="relative h-9 w-9 flex items-center justify-center rounded-lg text-ink-subtle dark:text-ink-subtle-dark hover:bg-surface-muted dark:hover:bg-surface-muted-dark transition-colors">
              <LuBell size={17} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-danger ring-2 ring-surface-card dark:ring-surface-card-dark" />
              )}
            </button>
          }
          className="!p-0"
        >
          <NotificationPanel />
        </Dropdown>

        <Dropdown
          trigger={
            <button className="flex items-center gap-2 pl-1.5 pr-1 py-1 rounded-lg hover:bg-surface-muted dark:hover:bg-surface-muted-dark transition-colors">
              <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold ${getAvatarColor(user.name)}`}>
                {getInitials(user.name)}
              </div>
            </button>
          }
        >
          <div className="px-3.5 py-2.5">
            <p className="text-sm font-semibold text-ink dark:text-ink-dark">{user.name}</p>
            <p className="text-xs text-ink-subtle dark:text-ink-subtle-dark">{user.email}</p>
          </div>
          <DropdownDivider />
          <DropdownItem icon={LuUser} onClick={() => navigate(ROUTES.SETTINGS)}>
            Profile
          </DropdownItem>
          <DropdownItem icon={LuSettings} onClick={() => navigate(ROUTES.SETTINGS)}>
            Settings
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem
            icon={LuLogOut}
            danger
            onClick={() => {
              dispatch(logout());
              navigate(ROUTES.LANDING);
            }}
          >
            Log out
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
}
