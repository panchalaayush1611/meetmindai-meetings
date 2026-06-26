import { Outlet, Link } from 'react-router-dom';
import Logo from '../components/common/Logo';
import { heroStats } from '../data/landing';
import { ROUTES } from '../constants/routes';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex bg-surface dark:bg-surface-dark">
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12">
        <Link to={ROUTES.LANDING} className="mb-10">
          <Logo />
        </Link>
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>

      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div>
            <p className="text-2xl font-display font-semibold leading-snug max-w-md">
              "Transform Meetings into Action."
            </p>
            <p className="text-white/70 text-sm mt-3 max-w-sm">
              Every meeting becomes structured knowledge — summaries, owners, and deadlines, automatically.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-display font-bold">{stat.value}</p>
                <p className="text-white/70 text-xs mt-1 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
