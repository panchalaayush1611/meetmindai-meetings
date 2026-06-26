import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import { ROUTES } from '../../constants/routes';

const COLUMNS = [
  {
    title: 'Product',
    links: ['Features', 'Pricing', 'Demo', 'Changelog'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Blog', 'Contact'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'API', 'Security', 'Status'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'DPA'],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-surface-border dark:border-surface-border-dark py-14 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <Logo />
            <p className="text-sm text-ink-subtle dark:text-ink-subtle-dark mt-3 max-w-xs">
              Transform every meeting into structured, actionable knowledge.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-ink dark:text-ink-dark mb-3">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-ink-subtle dark:text-ink-subtle-dark hover:text-ink dark:hover:text-ink-dark transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-12 pt-6 border-t border-surface-border dark:border-surface-border-dark">
          <p className="text-xs text-ink-subtle dark:text-ink-subtle-dark">© {new Date().getFullYear()} MeetMind AI. All rights reserved.</p>
          <Link to={ROUTES.LOGIN} className="text-xs text-ink-subtle dark:text-ink-subtle-dark hover:text-primary">
            Workspace login →
          </Link>
        </div>
      </div>
    </footer>
  );
}
