import { LuCircle, LuSparkles, LuTriangleAlert, LuCircleCheck } from 'react-icons/lu';

export default function DemoSection() {
  return (
    <section id="demo" className="py-20 px-5">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm font-semibold text-primary uppercase tracking-wide">See it in action</p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink dark:text-ink-dark mt-3">
          One dashboard for every meeting your team has ever had.
        </h2>

        <div className="mt-12 rounded-2xl border border-surface-border dark:border-surface-border-dark shadow-popover overflow-hidden bg-surface-card dark:bg-surface-card-dark text-left">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-surface-border dark:border-surface-border-dark">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
            <span className="ml-3 text-xs text-ink-subtle dark:text-ink-subtle-dark font-mono">app.meetmind.ai/dashboard</span>
          </div>
          <div className="flex">
            <div className="hidden sm:block w-44 border-r border-surface-border dark:border-surface-border-dark p-4 space-y-2">
              {['Dashboard', 'Meetings', 'AI Assistant', 'Analytics'].map((label, i) => (
                <div key={label} className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs ${i === 0 ? 'bg-primary-light dark:bg-blue-500/10 text-primary font-medium' : 'text-ink-subtle dark:text-ink-subtle-dark'}`}>
                  <LuCircle size={8} />
                  {label}
                </div>
              ))}
            </div>
            <div className="flex-1 p-4 sm:p-5 grid grid-cols-2 gap-3 bg-surface dark:bg-surface-dark">
              <div className="col-span-2 rounded-xl bg-surface-card dark:bg-surface-card-dark border border-surface-border dark:border-surface-border-dark p-3.5">
                <div className="flex items-center gap-2 mb-2">
                  <LuSparkles size={13} className="text-primary" />
                  <span className="text-xs font-semibold text-ink dark:text-ink-dark">AI Insights</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-ink-subtle dark:text-ink-subtle-dark">
                  <LuTriangleAlert size={12} className="text-danger" />
                  Acme Corp call flagged high-risk — competitor mentioned
                </div>
              </div>
              <div className="rounded-xl bg-surface-card dark:bg-surface-card-dark border border-surface-border dark:border-surface-border-dark p-3.5">
                <span className="text-xs font-semibold text-ink dark:text-ink-dark">Health score</span>
                <p className="font-display font-bold text-2xl text-success mt-2">81</p>
              </div>
              <div className="rounded-xl bg-surface-card dark:bg-surface-card-dark border border-surface-border dark:border-surface-border-dark p-3.5 space-y-1.5">
                <span className="text-xs font-semibold text-ink dark:text-ink-dark">Tasks</span>
                <div className="flex items-center gap-1.5 text-[11px] text-ink-subtle dark:text-ink-subtle-dark">
                  <LuCircleCheck size={11} className="text-success" /> Send Acme proposal
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-ink-subtle dark:text-ink-subtle-dark">
                  <LuCircle size={11} /> Escalate SLA ticket
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
