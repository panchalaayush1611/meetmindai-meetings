import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { LuBuilding2, LuGlobe } from 'react-icons/lu';
import Card, { CardHeader } from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import { setWorkspaceName } from '../../redux/slices/authSlice';

export default function WorkspaceSettings() {
  const dispatch = useDispatch();
  const workspaceName = useSelector((s) => s.auth.workspaceName);
  const { register, handleSubmit } = useForm({ defaultValues: { workspaceName, domain: 'codeverse.io' } });

  const onSubmit = (data) => dispatch(setWorkspaceName(data.workspaceName));

  return (
    <Card>
      <CardHeader title="Workspace" description="General settings for your entire organization" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <Input label="Workspace name" icon={LuBuilding2} {...register('workspaceName')} />
        <Input label="Domain" icon={LuGlobe} {...register('domain')} hint="Used for AI configuration and SSO matching" />
        <Button type="submit" variant="primary">Save changes</Button>
      </form>

      <div className="mt-8 pt-6 border-t border-surface-border dark:border-surface-border-dark">
        <p className="text-sm font-medium text-danger">Danger zone</p>
        <p className="text-xs text-ink-subtle dark:text-ink-subtle-dark mt-1 mb-3">Deleting a workspace removes all meetings, summaries, and member access permanently.</p>
        <Button variant="danger" size="sm">Delete workspace</Button>
      </div>
    </Card>
  );
}
