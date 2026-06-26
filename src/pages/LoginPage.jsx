import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { BsMicrosoft } from 'react-icons/bs';
import { LuMail, LuLock, LuEye, LuEyeOff, LuArrowRight } from 'react-icons/lu';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { login } from '../redux/slices/authSlice';
import { ROUTES } from '../constants/routes';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: '', password: '', remember: true } });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 500));
    dispatch(login());
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-ink dark:text-ink-dark">Welcome back</h1>
      <p className="text-sm text-ink-subtle dark:text-ink-subtle-dark mt-1.5">Log in to your MeetMind AI workspace.</p>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <Button variant="outline" icon={FcGoogle} onClick={onSubmit}>Google</Button>
        <Button variant="outline" icon={BsMicrosoft} onClick={onSubmit}>Microsoft</Button>
      </div>

      <div className="flex items-center gap-3 my-6">
        <div className="h-px flex-1 bg-surface-border dark:bg-surface-border-dark" />
        <span className="text-xs text-ink-subtle dark:text-ink-subtle-dark">or continue with email</span>
        <div className="h-px flex-1 bg-surface-border dark:bg-surface-border-dark" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          icon={LuMail}
          placeholder="you@company.com"
          {...register('email', { required: 'Email is required' })}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          icon={LuLock}
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          iconRight={
            <button type="button" onClick={() => setShowPassword((s) => !s)} className="text-ink-subtle dark:text-ink-subtle-dark">
              {showPassword ? <LuEyeOff size={16} /> : <LuEye size={16} />}
            </button>
          }
          {...register('password', { required: 'Password is required' })}
          error={errors.password?.message}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-ink dark:text-ink-dark cursor-pointer">
            <input type="checkbox" {...register('remember')} className="rounded border-surface-border dark:border-surface-border-dark accent-primary" />
            Remember me
          </label>
          <Link to="#" className="text-sm text-primary font-medium hover:underline">Forgot password?</Link>
        </div>

        <Button type="submit" variant="primary" fullWidth loading={isSubmitting} iconRight={LuArrowRight}>
          Log in
        </Button>
      </form>

      <p className="text-sm text-ink-subtle dark:text-ink-subtle-dark text-center mt-6">
        Don't have an account?{' '}
        <Link to={ROUTES.REGISTER} className="text-primary font-medium hover:underline">Sign up</Link>
      </p>
    </div>
  );
}
