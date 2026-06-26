import { useDispatch } from 'react-redux';
import { LuEllipsisVertical, LuShieldCheck, LuUserCog, LuUser, LuTrash2 } from 'react-icons/lu';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import Dropdown, { DropdownItem, DropdownDivider } from '../common/Dropdown';
import { updateMemberRole, removeMember } from '../../redux/slices/workspaceSlice';
import { formatDate } from '../../utils/dateUtils';

const ROLE_ICON = { Admin: LuShieldCheck, Manager: LuUserCog, Employee: LuUser };
const ROLE_TONE = { Admin: 'primary', Manager: 'accent', Employee: 'neutral' };

export default function MembersTable({ members }) {
  const dispatch = useDispatch();

  return (
    <div className="overflow-x-auto -mx-5">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-ink-subtle dark:text-ink-subtle-dark border-b border-surface-border dark:border-surface-border-dark">
            <th className="font-medium px-5 py-2.5">Member</th>
            <th className="font-medium px-3 py-2.5">Role</th>
            <th className="font-medium px-3 py-2.5">Status</th>
            <th className="font-medium px-3 py-2.5 hidden sm:table-cell">Joined</th>
            <th className="font-medium px-3 py-2.5 hidden md:table-cell">Meetings</th>
            <th className="px-3 py-2.5" />
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-border dark:divide-surface-border-dark">
          {members.map((m) => {
            const RoleIcon = ROLE_ICON[m.role];
            return (
              <tr key={m.id} className="hover:bg-surface-muted dark:hover:bg-surface-muted-dark transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={m.name} size="sm" />
                    <div className="min-w-0">
                      <p className="font-medium text-ink dark:text-ink-dark truncate">{m.name}</p>
                      <p className="text-xs text-ink-subtle dark:text-ink-subtle-dark truncate">{m.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <Badge tone={ROLE_TONE[m.role]} icon={RoleIcon}>{m.role}</Badge>
                </td>
                <td className="px-3 py-3">
                  <Badge tone={m.status === 'active' ? 'success' : 'warning'} dot>
                    {m.status === 'active' ? 'Active' : 'Invited'}
                  </Badge>
                </td>
                <td className="px-3 py-3 text-ink-subtle dark:text-ink-subtle-dark hidden sm:table-cell">
                  {m.joinedAt ? formatDate(m.joinedAt) : '—'}
                </td>
                <td className="px-3 py-3 text-ink-subtle dark:text-ink-subtle-dark hidden md:table-cell">{m.meetingsAttended}</td>
                <td className="px-3 py-3 text-right">
                  <Dropdown
                    trigger={
                      <button className="h-8 w-8 flex items-center justify-center rounded-lg text-ink-subtle dark:text-ink-subtle-dark hover:bg-surface-border dark:hover:bg-surface-border-dark">
                        <LuEllipsisVertical size={16} />
                      </button>
                    }
                  >
                    <div className="px-3.5 py-1.5 text-[11px] uppercase tracking-wide text-ink-subtle dark:text-ink-subtle-dark font-semibold">
                      Change role
                    </div>
                    {['Admin', 'Manager', 'Employee'].map((role) => (
                      <DropdownItem key={role} onClick={() => dispatch(updateMemberRole({ id: m.id, role }))}>
                        {role}
                      </DropdownItem>
                    ))}
                    <DropdownDivider />
                    <DropdownItem icon={LuTrash2} danger onClick={() => dispatch(removeMember(m.id))}>
                      Remove member
                    </DropdownItem>
                  </Dropdown>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
