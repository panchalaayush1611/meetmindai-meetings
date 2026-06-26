import { Link } from 'react-router-dom';
import { LuCompass } from 'react-icons/lu';
import Button from '../components/common/Button';
import { ROUTES } from '../constants/routes';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-5 bg-surface dark:bg-surface-dark">
      <div className="h-14 w-14 rounded-2xl bg-primary-light dark:bg-blue-500/10 flex items-center justify-center text-primary mb-5">
        <LuCompass size={26} />
      </div>
      <h1 className="font-display font-bold text-3xl text-ink dark:text-ink-dark">Page not found</h1>
      <p className="text-sm text-ink-subtle dark:text-ink-subtle-dark mt-2 max-w-sm">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link to={ROUTES.DASHBOARD} className="mt-6">
        <Button variant="primary">Back to dashboard</Button>
      </Link>
    </div>
  );
}
