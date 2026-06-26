import { Link } from 'react-router-dom';
import { LuCheck } from 'react-icons/lu';
import { pricingPlans } from '../../data/landing';
import Button from '../common/Button';
import { ROUTES } from '../../constants/routes';
import { cn } from '../../utils/formatUtils';

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-5 bg-surface-muted/60 dark:bg-surface-muted-dark/40">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">Pricing</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink dark:text-ink-dark mt-3">Simple pricing that scales with your team.</h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 items-stretch">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'rounded-2xl p-6 flex flex-col border',
                plan.highlighted
                  ? 'bg-ink dark:bg-surface-card-dark border-ink dark:border-primary text-white shadow-glow scale-[1.02]'
                  : 'bg-surface-card dark:bg-surface-card-dark border-surface-border dark:border-surface-border-dark'
              )}
            >
              {plan.highlighted && (
                <span className="self-start text-[11px] font-semibold uppercase tracking-wide text-accent mb-3">Most popular</span>
              )}
              <p className={cn('font-display font-semibold text-lg', !plan.highlighted && 'text-ink dark:text-ink-dark')}>{plan.name}</p>
              <p className={cn('text-sm mt-1', plan.highlighted ? 'text-white/70' : 'text-ink-subtle dark:text-ink-subtle-dark')}>{plan.description}</p>
              <div className="mt-5 flex items-baseline gap-1">
                {plan.price !== null ? (
                  <>
                    <span className={cn('font-display font-bold text-3xl', !plan.highlighted && 'text-ink dark:text-ink-dark')}>${plan.price}</span>
                    <span className={cn('text-sm', plan.highlighted ? 'text-white/70' : 'text-ink-subtle dark:text-ink-subtle-dark')}>/{plan.period}</span>
                  </>
                ) : (
                  <span className={cn('font-display font-bold text-3xl', !plan.highlighted && 'text-ink dark:text-ink-dark')}>Custom</span>
                )}
              </div>

              <ul className="mt-6 space-y-2.5 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm">
                    <LuCheck size={15} className={cn('mt-0.5 shrink-0', plan.highlighted ? 'text-accent' : 'text-success')} />
                    <span className={plan.highlighted ? 'text-white/90' : 'text-ink dark:text-ink-dark'}>{feat}</span>
                  </li>
                ))}
              </ul>

              <Link to={ROUTES.REGISTER} className="mt-6">
                <Button variant={plan.highlighted ? 'primary' : 'outline'} fullWidth className={plan.highlighted ? '' : ''}>
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
