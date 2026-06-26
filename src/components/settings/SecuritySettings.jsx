import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuLock, LuShieldCheck, LuMonitorSmartphone } from 'react-icons/lu';
import Card, { CardHeader } from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import Switch from '../common/Switch';
import Badge from '../common/Badge';

const SESSIONS = [
  { device: 'Chrome on Windows', location: 'Surat, India', current: true },
  { device: 'Claude for iOS', location: 'Surat, India', current: false },
];

export default function SecuritySettings() {
  const [twoFactor, setTwoFactor] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader title="Password" description="Change your account password" />
        <form onSubmit={handleSubmit(() => reset())} className="space-y-4 max-w-md">
          <Input label="Current password" icon={LuLock} type="password" {...register('current', { required: true })} error={errors.current && 'Required'} />
          <Input label="New password" icon={LuLock} type="password" {...register('next', { required: true, minLength: 8 })} error={errors.next && 'Minimum 8 characters'} />
          <Button type="submit" variant="primary">Update password</Button>
        </form>
      </Card>

      <Card>
        <CardHeader title="Two-factor authentication" action={<LuShieldCheck className="text-primary" size={18} />} />
        <Switch
          checked={twoFactor}
          onChange={setTwoFactor}
          label="Require a verification code at login"
          description="Adds an extra layer of security to your account"
        />
      </Card>

      <Card>
        <CardHeader title="Active sessions" description="Devices currently signed in to your account" />
        <ul className="divide-y divide-surface-border dark:divide-surface-border-dark">
          {SESSIONS.map((s) => (
            <li key={s.device} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <LuMonitorSmartphone size={18} className="text-ink-subtle dark:text-ink-subtle-dark" />
                <div>
                  <p className="text-sm font-medium text-ink dark:text-ink-dark">{s.device}</p>
                  <p className="text-xs text-ink-subtle dark:text-ink-subtle-dark">{s.location}</p>
                </div>
              </div>
              {s.current ? <Badge tone="success">This device</Badge> : <Button variant="ghost" size="sm">Sign out</Button>}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
