import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { LuMail, LuLock, LuUser, LuBuilding2, LuArrowRight, LuUserPlus, LuCheck, LuX } from 'react-icons/lu';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { login, setWorkspaceName } from '../redux/slices/authSlice';
import { ROUTES } from '../constants/routes';
import { cn } from '../utils/formatUtils';

const STEPS = ['Account', 'Workspace', 'Invite team'];

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [invites, setInvites] = useState(['']);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: { name: '', email: '', password: '', workspaceName: '' } });

  const next = async () => {
    const fields = step === 0 ? ['name', 'email', 'password'] : ['workspaceName'];
    const valid = await trigger(fields);
    if (valid) setStep((s) => s + 1);
  };

  const finish = () => {
    const values = getValues();
    dispatch(setWorkspaceName(values.workspaceName || 'My Workspace'));
    dispatch(login());
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-ink dark:text-ink-dark">Create your workspace</h1>
      <p className="text-sm text-ink-subtle dark:text-ink-subtle-dark mt-1.5">Takes about a minute. No credit card required.</p>

      <div className="flex items-center gap-2 mt-6 mb-7">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2 flex-1">
            <div
              className={cn(
                'h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0',
                i < step ? 'bg-success text-white' : i === step ? 'bg-primary text-white' : 'bg-surface-muted dark:bg-surface-muted-dark text-ink-subtle dark:text-ink-subtle-dark'
              )}
            >
              {i < step ? <LuCheck size={13} /> : i + 1}
            </div>
            {i < STEPS.length - 1 && <div className={cn('h-px flex-1', i < step ? 'bg-success' : 'bg-surface-border dark:bg-surface-border-dark')} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(finish)} className="space-y-4">
        {step === 0 && (
          <>
            <Input label="Full name" icon={LuUser} placeholder="Aayush Patel" {...register('name', { required: 'Name is required' })} error={errors.name?.message} />
            <Input label="Work email" icon={LuMail} placeholder="you@company.com" {...register('email', { required: 'Email is required' })} error={errors.email?.message} />
            <Input label="Password" icon={LuLock} type="password" placeholder="At least 8 characters" {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Minimum 8 characters' } })} error={errors.password?.message} />
            <Button type="button" variant="primary" fullWidth iconRight={LuArrowRight} onClick={next}>Continue</Button>
          </>
        )}

        {step === 1 && (
          <>
            <Input
              label="Workspace name"
              icon={LuBuilding2}
              placeholder="e.g. Team Codeverse"
              {...register('workspaceName', { required: 'Workspace name is required' })}
              error={errors.workspaceName?.message}
              hint="You can change this later in Settings"
            />
            <div className="flex gap-2">
              <Button type="button" variant="ghost" onClick={() => setStep(0)}>Back</Button>
              <Button type="button" variant="primary" fullWidth iconRight={LuArrowRight} onClick={next}>Continue</Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <label className="text-sm font-medium text-ink dark:text-ink-dark">Invite teammates (optional)</label>
            <div className="space-y-2">
              {invites.map((val, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={val}
                    onChange={(e) => setInvites((arr) => arr.map((v, idx) => (idx === i ? e.target.value : v)))}
                    placeholder="teammate@company.com"
                    className="flex-1 h-10 rounded-lg border border-surface-border dark:border-surface-border-dark bg-surface-card dark:bg-surface-card-dark text-sm px-3.5 outline-none focus:border-primary"
                  />
                  {invites.length > 1 && (
                    <button type="button" onClick={() => setInvites((arr) => arr.filter((_, idx) => idx !== i))} className="text-ink-subtle dark:text-ink-subtle-dark hover:text-danger">
                      <LuX size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setInvites((arr) => [...arr, ''])}
              className="flex items-center gap-1.5 text-sm text-primary font-medium"
            >
              <LuUserPlus size={14} /> Add another
            </button>

            <div className="flex gap-2 pt-2">
              <Button type="button" variant="ghost" onClick={() => setStep(1)}>Back</Button>
              <Button type="submit" variant="primary" fullWidth iconRight={LuArrowRight}>Create workspace</Button>
            </div>
          </>
        )}
      </form>

      {step === 0 && (
        <p className="text-sm text-ink-subtle dark:text-ink-subtle-dark text-center mt-6">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="text-primary font-medium hover:underline">Log in</Link>
        </p>
      )}
    </div>
  );
}
