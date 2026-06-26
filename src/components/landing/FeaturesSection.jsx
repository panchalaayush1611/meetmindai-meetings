import { LuFileText, LuListChecks, LuTriangleAlert, LuSearch, LuGauge, LuPlug } from 'react-icons/lu';
import { features } from '../../data/landing';

const ICONS = {
  summary: LuFileText,
  tasks: LuListChecks,
  risk: LuTriangleAlert,
  search: LuSearch,
  health: LuGauge,
  integration: LuPlug,
};

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">What it does</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink dark:text-ink-dark mt-3">
            Everything that should happen after a meeting, automatically.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => {
            const Icon = ICONS[f.icon];
            return (
              <div
                key={f.title}
                className="rounded-2xl border border-surface-border dark:border-surface-border-dark p-6 hover:shadow-card-hover hover:border-primary/30 transition-all duration-200"
              >
                <div className="h-10 w-10 rounded-xl bg-primary-light dark:bg-blue-500/10 text-primary flex items-center justify-center mb-4">
                  <Icon size={18} />
                </div>
                <p className="font-display font-semibold text-ink dark:text-ink-dark">{f.title}</p>
                <p className="text-sm text-ink-subtle dark:text-ink-subtle-dark mt-1.5 leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
