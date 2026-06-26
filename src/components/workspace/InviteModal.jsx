import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { LuUserPlus } from 'react-icons/lu';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { setInviteModalOpen } from '../../redux/slices/uiSlice';
import { inviteMember } from '../../redux/slices/workspaceSlice';

export default function InviteModal() {
  const isOpen = useSelector((s) => s.ui.inviteModalOpen);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { email: '', role: 'Employee' } });

  const close = () => {
    dispatch(setInviteModalOpen(false));
    reset();
  };

  const onSubmit = (data) => {
    dispatch(inviteMember(data.email, data.role));
    close();
  };

  return (
    <Modal isOpen={isOpen} onClose={close} title="Invite a teammate" description="They'll get access based on the role you choose.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email address"
          placeholder="teammate@company.com"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
          })}
          error={errors.email?.message}
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink dark:text-ink-dark">Role</label>
          <select
            {...register('role')}
            className="h-10 rounded-lg border border-surface-border dark:border-surface-border-dark bg-surface-card dark:bg-surface-card-dark text-sm px-3.5 outline-none focus:border-primary"
          >
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={close}>Cancel</Button>
          <Button type="submit" variant="primary" icon={LuUserPlus}>Send invite</Button>
        </div>
      </form>
    </Modal>
  );
}
