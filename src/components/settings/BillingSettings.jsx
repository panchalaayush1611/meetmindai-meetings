import { LuCreditCard, LuDownload, LuCheck } from 'react-icons/lu';
import Card, { CardHeader } from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';

const INVOICES = [
  { id: 'INV-0042', date: 'Jun 1, 2026', amount: '$168.00', status: 'Paid' },
  { id: 'INV-0041', date: 'May 1, 2026', amount: '$168.00', status: 'Paid' },
  { id: 'INV-0040', date: 'Apr 1, 2026', amount: '$144.00', status: 'Paid' },
];

export default function BillingSettings() {
  return (
    <div className="space-y-5">
      <Card>
        <CardHeader title="Current plan" />
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2">
              <p className="font-display font-semibold text-lg text-ink dark:text-ink-dark">Team plan</p>
              <Badge tone="primary">Active</Badge>
            </div>
            <p className="text-sm text-ink-subtle dark:text-ink-subtle-dark mt-1">$24/user/month · 7 members · billed monthly</p>
          </div>
          <Button variant="outline">Change plan</Button>
        </div>
        <ul className="grid sm:grid-cols-2 gap-2 mt-5">
          {['Unlimited meetings', 'Risk detection & health scores', 'AI Assistant knowledge search', 'Analytics dashboard'].map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-ink dark:text-ink-dark">
              <LuCheck size={14} className="text-success" /> {f}
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <CardHeader title="Payment method" action={<Button variant="outline" size="sm">Update</Button>} />
        <div className="flex items-center gap-3">
          <div className="h-10 w-14 rounded-lg bg-surface-muted dark:bg-surface-muted-dark flex items-center justify-center">
            <LuCreditCard size={18} className="text-ink-subtle dark:text-ink-subtle-dark" />
          </div>
          <div>
            <p className="text-sm font-medium text-ink dark:text-ink-dark">Visa ending in 4242</p>
            <p className="text-xs text-ink-subtle dark:text-ink-subtle-dark">Expires 09/28</p>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Billing history" />
        <ul className="divide-y divide-surface-border dark:divide-surface-border-dark">
          {INVOICES.map((inv) => (
            <li key={inv.id} className="flex items-center justify-between py-3 text-sm">
              <div>
                <p className="font-medium text-ink dark:text-ink-dark">{inv.id}</p>
                <p className="text-xs text-ink-subtle dark:text-ink-subtle-dark">{inv.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-ink dark:text-ink-dark">{inv.amount}</span>
                <Badge tone="success">{inv.status}</Badge>
                <button className="text-ink-subtle dark:text-ink-subtle-dark hover:text-primary">
                  <LuDownload size={15} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
