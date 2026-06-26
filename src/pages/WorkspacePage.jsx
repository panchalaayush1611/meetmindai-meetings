import { useDispatch, useSelector } from 'react-redux';
import { LuUserPlus } from 'react-icons/lu';
import Card, { CardHeader } from '../components/common/Card';
import Button from '../components/common/Button';
import MembersTable from '../components/workspace/MembersTable';
import RolesPanel from '../components/workspace/RolesPanel';
import InviteModal from '../components/workspace/InviteModal';
import RecentActivityWidget from '../components/dashboard/RecentActivityWidget';
import { setInviteModalOpen } from '../redux/slices/uiSlice';

export default function WorkspacePage() {
  const dispatch = useDispatch();
  const { members, roleDefinitions } = useSelector((s) => s.workspace);
  const workspaceName = useSelector((s) => s.auth.workspaceName);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-ink dark:text-ink-dark">{workspaceName}</h1>
          <p className="text-sm text-ink-subtle dark:text-ink-subtle-dark mt-1">{members.length} members</p>
        </div>
        <Button variant="primary" icon={LuUserPlus} onClick={() => dispatch(setInviteModalOpen(true))}>
          Invite member
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <Card>
            <CardHeader title="Team members" />
            <MembersTable members={members} />
          </Card>
          <RolesPanel roleDefinitions={roleDefinitions} />
        </div>
        <RecentActivityWidget />
      </div>

      <InviteModal />
    </div>
  );
}
