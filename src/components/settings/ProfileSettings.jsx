import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { LuUser, LuMail } from 'react-icons/lu';
import Card, { CardHeader } from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import Avatar from '../common/Avatar';

export default function ProfileSettings() {
  const user = useSelector((s) => s.auth.user);
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm({ defaultValues: { name: user.name, email: user.email, title: user.title } });

  return (
    <Card>
      <CardHeader title="Profile" description="Your personal information visible to the workspace" />
      <div className="flex items-center gap-4 mb-6">
        <Avatar name={user.name} size="lg" />
        <div>
          <Button variant="outline" size="sm">Upload photo</Button>
          <p className="text-xs text-ink-subtle dark:text-ink-subtle-dark mt-1.5">JPG or PNG, up to 2MB</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(() => {})} className="space-y-4 max-w-md">
        <Input label="Full name" icon={LuUser} {...register('name')} />
        <Input label="Email" icon={LuMail} type="email" {...register('email')} />
        <Input label="Job title" {...register('title')} />
        <Button type="submit" variant="primary" disabled={!isDirty}>Save changes</Button>
      </form>
    </Card>
  );
}
