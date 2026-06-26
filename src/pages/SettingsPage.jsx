import { useState } from 'react';
import { LuUser, LuBell, LuBuilding2, LuShieldCheck, LuPalette, LuCreditCard, LuKey } from 'react-icons/lu';
import Tabs from '../components/common/Tabs';
import ProfileSettings from '../components/settings/ProfileSettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import WorkspaceSettings from '../components/settings/WorkspaceSettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import ThemeSettings from '../components/settings/ThemeSettings';
import BillingSettings from '../components/settings/BillingSettings';
import ApiKeysSettings from '../components/settings/ApiKeysSettings';

const TABS = [
  { value: 'profile', label: 'Profile', icon: LuUser, Panel: ProfileSettings },
  { value: 'notifications', label: 'Notifications', icon: LuBell, Panel: NotificationSettings },
  { value: 'workspace', label: 'Workspace', icon: LuBuilding2, Panel: WorkspaceSettings },
  { value: 'security', label: 'Security', icon: LuShieldCheck, Panel: SecuritySettings },
  { value: 'theme', label: 'Theme', icon: LuPalette, Panel: ThemeSettings },
  { value: 'billing', label: 'Billing', icon: LuCreditCard, Panel: BillingSettings },
  { value: 'api', label: 'API Keys', icon: LuKey, Panel: ApiKeysSettings },
];

export default function SettingsPage() {
  const [tab, setTab] = useState('profile');
  const ActivePanel = TABS.find((t) => t.value === tab)?.Panel;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display font-bold text-2xl text-ink dark:text-ink-dark">Settings</h1>
        <p className="text-sm text-ink-subtle dark:text-ink-subtle-dark mt-1">Manage your account, workspace, and integrations</p>
      </div>

      <Tabs tabs={TABS} active={tab} onChange={setTab} className="overflow-x-auto scrollbar-thin" />

      <div className="max-w-3xl">{ActivePanel && <ActivePanel />}</div>
    </div>
  );
}
