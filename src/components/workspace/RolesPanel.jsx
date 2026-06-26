import { LuCheck } from 'react-icons/lu';
import Card, { CardHeader } from '../common/Card';

export default function RolesPanel({ roleDefinitions }) {
  return (
    <Card>
      <CardHeader title="Roles & permissions" description="What each role can do in this workspace" />
      <div className="grid sm:grid-cols-3 gap-4">
        {roleDefinitions.map((role) => (
          <div key={role.role} className="rounded-xl border border-surface-border dark:border-surface-border-dark p-4">
            <p className="font-display font-semibold text-sm text-ink dark:text-ink-dark">{role.role}</p>
            <p className="text-xs text-ink-subtle dark:text-ink-subtle-dark mt-1 leading-snug">{role.description}</p>
            <ul className="mt-3 space-y-1.5">
              {role.permissions.map((perm) => (
                <li key={perm} className="flex items-center gap-2 text-xs text-ink dark:text-ink-dark">
                  <LuCheck size={13} className="text-success shrink-0" />
                  {perm}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  );
}
