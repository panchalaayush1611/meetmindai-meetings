import { LuTriangleAlert } from 'react-icons/lu';
import Badge from '../common/Badge';
import EmptyState from '../common/EmptyState';
import { HealthScoreGauge } from '../common/ProgressBar';
import { ProgressBar } from '../common/ProgressBar';

const SEVERITY_TONE = { high: 'danger', medium: 'warning', low: 'neutral' };

export default function RiskPanel({ healthScore, healthBreakdown = [], risks = [] }) {
  return (
    <div className="space-y-6">
      {healthScore != null && (
        <div className="flex items-center gap-6">
          <HealthScoreGauge score={healthScore} size={88} />
          <div className="flex-1 space-y-3">
            {healthBreakdown.map((b) => (
              <div key={b.label}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-ink dark:text-ink-dark font-medium">{b.label}</span>
                  <span className="text-ink-subtle dark:text-ink-subtle-dark">{b.score}/100</span>
                </div>
                <ProgressBar value={b.score} tone={b.score >= 75 ? 'success' : b.score >= 50 ? 'warning' : 'danger'} />
                <p className="text-[11px] text-ink-subtle dark:text-ink-subtle-dark mt-1">{b.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-sm font-semibold text-ink dark:text-ink-dark mb-2.5">Detected risks</p>
        {risks.length === 0 ? (
          <EmptyState
            icon={LuTriangleAlert}
            title="No risks detected"
            description="MeetMind didn't flag any blockers, churn signals, or unresolved concerns in this meeting."
            className="py-6"
          />
        ) : (
          <ul className="space-y-2.5">
            {risks.map((risk) => (
              <li key={risk.id} className="flex items-start gap-2.5 text-sm">
                <Badge tone={SEVERITY_TONE[risk.severity]} className="mt-0.5">{risk.severity}</Badge>
                <span className="text-ink dark:text-ink-dark">{risk.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
