import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LuPanelLeftClose, LuPanelLeftOpen, LuPlus } from 'react-icons/lu';
import { toggleSidebar, setUploadDialogOpen } from '../../redux/slices/uiSlice';
import { navItems } from '../../constants/nav';
import Logo from '../common/Logo';
import Button from '../common/Button';
import { cn } from '../../utils/formatUtils';

export default function Sidebar() {
  const dispatch = useDispatch();
  const collapsed = useSelector((s) => s.ui.sidebarCollapsed);
  const workspaceName = useSelector((s) => s.auth.workspaceName);

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col h-screen sticky top-0 shrink-0 border-r border-surface-border dark:border-surface-border-dark bg-surface-card dark:bg-surface-card-dark transition-all duration-200',
        collapsed ? 'w-[72px]' : 'w-[248px]'
      )}
    >
      <div className={cn('flex items-center h-16 px-4 shrink-0', collapsed && 'justify-center px-0')}>
        <Logo showWordmark={!collapsed} />
      </div>

      <div className="px-3 pb-3">
        <Button
          variant="primary"
          size="md"
          icon={LuPlus}
          fullWidth
          className={cn(collapsed && 'px-0 justify-center')}
          onClick={() => dispatch(setUploadDialogOpen(true))}
        >
          {!collapsed && 'Upload Meeting'}
        </Button>
      </div>

      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors group relative',
                collapsed && 'justify-center px-0',
                isActive
                  ? 'bg-primary-light dark:bg-blue-500/10 text-primary'
                  : 'text-ink-subtle dark:text-ink-subtle-dark hover:bg-surface-muted dark:hover:bg-surface-muted-dark hover:text-ink dark:hover:text-ink-dark'
              )
            }
            title={collapsed ? item.label : undefined}
          >
            <item.icon size={18} className="shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-surface-border dark:border-surface-border-dark">
        {!collapsed && (
          <div className="px-1.5 mb-2">
            <p className="text-[11px] uppercase tracking-wide text-ink-subtle dark:text-ink-subtle-dark font-semibold">Workspace</p>
            <p className="text-sm text-ink dark:text-ink-dark font-medium truncate">{workspaceName}</p>
          </div>
        )}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className={cn(
            'flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm text-ink-subtle dark:text-ink-subtle-dark hover:bg-surface-muted dark:hover:bg-surface-muted-dark hover:text-ink dark:hover:text-ink-dark',
            collapsed && 'justify-center px-0'
          )}
        >
          {collapsed ? <LuPanelLeftOpen size={18} /> : <LuPanelLeftClose size={18} />}
          {!collapsed && 'Collapse'}
        </button>
      </div>
    </aside>
  );
}
