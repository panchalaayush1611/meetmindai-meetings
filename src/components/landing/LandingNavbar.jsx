import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuMenu, LuX } from 'react-icons/lu';
import Logo from '../common/Logo';
import Button from '../common/Button';
import { ROUTES } from '../../constants/routes';

const LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Demo', href: '#demo' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export default function LandingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-surface-border dark:border-surface-border-dark bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-5">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-ink-subtle dark:text-ink-subtle-dark hover:text-ink dark:hover:text-ink-dark transition-colors">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Link to={ROUTES.LOGIN}>
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link to={ROUTES.REGISTER}>
            <Button variant="primary" size="sm">Start for free</Button>
          </Link>
        </div>
        <button className="md:hidden text-ink dark:text-ink-dark" onClick={() => setOpen((o) => !o)}>
          {open ? <LuX size={22} /> : <LuMenu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-surface-border dark:border-surface-border-dark px-5 py-4 space-y-3 bg-surface-card dark:bg-surface-card-dark">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block text-sm text-ink dark:text-ink-dark">
              {link.label}
            </a>
          ))}
          <div className="flex gap-2 pt-2">
            <Link to={ROUTES.LOGIN} className="flex-1"><Button variant="outline" size="sm" fullWidth>Log in</Button></Link>
            <Link to={ROUTES.REGISTER} className="flex-1"><Button variant="primary" size="sm" fullWidth>Start for free</Button></Link>
          </div>
        </div>
      )}
    </header>
  );
}
